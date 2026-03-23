# Custom Listing Builder Query Types

## Overview

JetSmartFilters Listing Builder supports extensible query types.

A query type has two parts:

1. A PHP runtime class that executes the query on render.
2. A JavaScript UI descriptor that renders the query settings inside Listing Builder.

The same query type ID must be used in both places.

Current core behavior:

- Saved listing query settings live under the `query` branch.
- `query.type` selects the runtime/UI implementation.
- If `type` is missing, JetSmartFilters falls back to `posts`.
- If a saved type is not registered anymore, runtime falls back to an empty safe handler instead of fatally failing.

## Data Shape

Example saved listing data for a custom query type:

```json
{
  "query": {
    "type": "my_custom_query",
    "limit": 6,
    "label": "Featured content"
  }
}
```

Rules:

- `type` must be a stable string ID.
- All other keys under `query` are owned by that query type.
- Your UI should only edit keys that belong to your query type.

## Registration Flow

### PHP runtime registration

Register your PHP query type on:

```php
jet-smart-filters/listing/render/query-types/register
```

The registration API is:

```php
\Jet_Smart_Filters\Listing\Render\Query_Factory::register_query_type( $type, $class );
```

### Builder UI registration

Register your UI descriptor through the global builder registry:

```js
window.JSFListings.registerQueryType( descriptor )
```

To enqueue your UI descriptor before the builder app boots, hook into:

```php
jet-smart-filters/listing/before-editor-assets
```

This is the same phase JetSmartFilters uses to prepare the public `window.JSFListings` queue stub.

## PHP Query Type Contract

Your class must extend:

```php
\Jet_Smart_Filters\Listing\Render\Query_Types\Base
```

Required methods:

- `get_type()`
- `_get_items()`
- `get_item_id()`

Optional methods you may override:

- `prepare_query_args()`
- `get_query_args()`
- `add_query_args()`
- `get_stats()`

Recommendations:

- Sanitize all saved query arguments in `prepare_query_args()`.
- Return posts or post IDs when possible, because the current listing runtime is post-oriented.
- Return an empty array for invalid or unavailable states instead of throwing errors.

## JS UI Descriptor Contract

The descriptor shape is:

```js
window.JSFListings.registerQueryType({
  id: 'my_custom_query',
  name: 'My Custom Query',
  defaults: {
    limit: 6,
    label: ''
  },
  uiRender: function( context ) {
    return null;
  }
});
```

Descriptor fields:

- `id`: query type ID, must match PHP `get_type()`
- `name`: label shown in the `Query Type` selector
- `defaults`: initial saved state used when the user switches to this type
- `uiRender( context )`: function that returns UI

`context` contains:

- `queryArgs`: current saved arguments for this listing query
- `onChange( partialArgs )`: callback for updating this type's saved query args

Important:

- `queryArgs` should be treated as read-only input.
- `onChange()` should only send keys owned by your query type.
- Do not execute the listing query from the UI component.

## Minimal End-To-End Example

This example registers:

- a PHP query type called `my_custom_query`
- a simple Listing Builder UI with two fields

### 1. Bootstrap class

```php
<?php
namespace My_Plugin\JSF;

use Jet_Smart_Filters\Listing\Render\Query_Factory;

class My_Custom_Query_Bootstrap {

	public function __construct() {
		add_action( 'jet-smart-filters/listing/render/query-types/register', [ $this, 'register_php_query_type' ] );
		add_action( 'jet-smart-filters/listing/before-editor-assets', [ $this, 'register_js_query_type' ] );
	}

	public function register_php_query_type() {
		require_once __DIR__ . '/class-my-custom-query-type.php';

		Query_Factory::register_query_type(
			Query_Types\My_Custom_Query_Type::get_type(),
			Query_Types\My_Custom_Query_Type::class
		);
	}

	public function register_js_query_type() {
		$handle = \Jet_Smart_Filters\Listing\Controller::instance()->listing_key;

		wp_add_inline_script( $handle, <<<'JS'
window.JSFListings.registerQueryType({
	id: 'my_custom_query',
	name: 'My Custom Query',
	defaults: {
		limit: 6,
		label: ''
	},
	uiRender: function( context ) {
		var createElement = window.wp.element.createElement;
		var TextControl = window.wp.components.TextControl;
		var __experimentalNumberControl = window.wp.components.__experimentalNumberControl;

		return createElement(
			'div',
			{ className: 'jsf-listings-edit__content' },
			createElement( 'h2', null, 'My Custom Query' ),
			createElement( TextControl, {
				label: 'Label',
				value: context.queryArgs.label || '',
				onChange: function( nextValue ) {
					context.onChange({ label: nextValue });
				}
			} ),
			createElement( __experimentalNumberControl, {
				label: 'Limit',
				value: context.queryArgs.limit || 6,
				min: 1,
				onChange: function( nextValue ) {
					context.onChange({ limit: Number( nextValue ) || 1 });
				}
			} )
		);
	}
});
JS, 'before' );
	}
}
```

### 2. PHP query type class

```php
<?php
namespace My_Plugin\JSF\Query_Types;

use Jet_Smart_Filters\Listing\Render\Query_Types\Base;

class My_Custom_Query_Type extends Base {

	public static function get_type() {
		return 'my_custom_query';
	}

	protected function prepare_query_args( $query_args = [] ) {
		$args = parent::prepare_query_args( $query_args );

		$args['type']  = self::get_type();
		$args['limit'] = ! empty( $args['limit'] ) ? absint( $args['limit'] ) : 6;
		$args['label'] = ! empty( $args['label'] ) ? sanitize_text_field( $args['label'] ) : '';

		return $args;
	}

	protected function _get_items() {
		$query = new \WP_Query( [
			'post_type'      => [ 'post' ],
			'post_status'    => 'publish',
			'posts_per_page' => $this->query_args['limit'],
		] );

		return is_array( $query->posts ) ? $query->posts : [];
	}

	public function get_item_id( $item ) {
		if ( ! is_object( $item ) || ! isset( $item->ID ) ) {
			return null;
		}

		return (int) $item->ID;
	}
}
```

## Example With Async UI Data

If your UI needs remote options, create your own endpoint and load data inside `uiRender()`.

### 1. Register a custom AJAX endpoint

```php
add_action( 'wp_ajax_my_plugin_jsf_query_options', function() {
	if ( ! current_user_can( 'manage_options' ) ) {
		wp_send_json_error( [ 'message' => 'Access denied' ], 403 );
	}

	check_ajax_referer( 'my_plugin_jsf_query_ui', 'nonce' );

	wp_send_json_success( [
		[ 'value' => 101, 'label' => 'Option 101' ],
		[ 'value' => 202, 'label' => 'Option 202' ],
	] );
} );
```

### 2. Localize endpoint data

```php
add_action( 'jet-smart-filters/listing/before-editor-assets', function() {
	$handle = \Jet_Smart_Filters\Listing\Controller::instance()->listing_key;

	wp_add_inline_script(
		$handle,
		'window.MyPluginJSF = ' . wp_json_encode( [
			'ajaxurl' => admin_url( 'admin-ajax.php' ),
			'nonce'   => wp_create_nonce( 'my_plugin_jsf_query_ui' ),
		] ) . ';',
		'before'
	);
} );
```

### 3. Load options inside the UI descriptor

```js
window.JSFListings.registerQueryType({
	id: 'my_remote_query',
	name: 'My Remote Query',
	defaults: {
		source_id: null
	},
	uiRender: function( context ) {
		var createElement = window.wp.element.createElement;
		var useEffect = window.wp.element.useEffect;
		var useState = window.wp.element.useState;
		var SelectControl = window.wp.components.SelectControl;

		function RemoteQueryFields() {
			var state = useState([]);
			var options = state[0];
			var setOptions = state[1];

			useEffect(function() {
				fetch(window.MyPluginJSF.ajaxurl + '?action=my_plugin_jsf_query_options', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					},
					body: new URLSearchParams({
						nonce: window.MyPluginJSF.nonce
					}).toString()
				})
					.then(function(response) {
						return response.json();
					})
					.then(function(payload) {
						setOptions(Array.isArray(payload && payload.data) ? payload.data : []);
					});
			}, []);

			return createElement( SelectControl, {
				label: 'Source',
				value: context.queryArgs.source_id || '',
				options: [{ label: 'Select', value: '' }].concat(
					options.map(function(item) {
						return {
							label: item.label,
							value: String(item.value)
						};
					})
				),
				onChange: function(nextValue) {
					context.onChange({
						source_id: nextValue ? Number(nextValue) : null
					});
				}
			} );
		}

		return createElement( RemoteQueryFields );
	}
});
```

## JetSmartFilters Internal Example

JetSmartFilters already includes an internal example fixture you can use as a reference:

- `includes/listing/examples/query-type-example.php`
- `includes/listing/examples/query-types/example-posts.php`

Those files demonstrate:

- PHP registration through `jet-smart-filters/listing/render/query-types/register`
- JS registration through `jet-smart-filters/listing/before-editor-assets`
- a minimal custom UI rendered through `window.JSFListings.registerQueryType()`

## Best Practices

- Keep the query type ID stable after release.
- Keep `defaults` minimal and explicit.
- Sanitize all saved values in PHP, even if your UI already validates them.
- Return empty results for invalid states instead of fatal errors.
- Avoid storing transient UI state in saved query args.
- If your query type needs async data, load it on demand when that UI is active.
- If your query returns something other than posts or post IDs, verify compatibility with the current listing runtime before shipping it.

## Testing Checklist

- The query type appears in the `Query Type` selector.
- Switching to the type applies the expected defaults.
- Saving and reopening the listing preserves the custom query args.
- Frontend rendering uses your PHP query type.
- Invalid saved values do not cause fatal errors.
- Disabling your plugin does not break the builder page or frontend listing page.

## Relevant Core Files

- `includes/listing/render/query-factory.php`
- `includes/listing/render/query-types/base.php`
- `includes/listing/builder/view.php`
- `_dev_builder/src/query-types/registry.js`
- `includes/listing/examples/query-type-example.php`
- `includes/listing/examples/query-types/example-posts.php`
