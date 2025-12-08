# Filters

## jet-engine/bricks-views/query-builder/query-id

Used to get or modify the JetEngine Query Builder ID during the execution of a Bricks Query.
Allows overriding the query that will be executed in Bricks or implementing custom query-selection logic.

**Args:**
- `$query_id` - (int) A current JetEngine Query Builder ID.
- `$listing_id` - (int) A listing ID (optional).
- `$settings` - (array) An array of query settings.

**Location:**  
includes/components/bricks-views/query-loop.php

**Access:**  
Frontend-only

**Example:**

```php
add_filter( 'jet-engine/bricks-views/query-builder/query-id', function( $query_id, $listing_id, $settings ) {

	// Example: replacing a query with another one under a certain condition
	if ( ! empty( $settings['use_custom_query'] ) && $settings['use_custom_query'] ) {
		$query_id = 123; // ID of your custom query
	}

	return $query_id;

}, 10, 3 );
```

## jet-engine/bricks-views/dynamic_data/register_providers

Used to register additional dynamic data providers in Bricks Views.
Allows adding custom provider classes that will be available as sources of dynamic content in Bricks.

**Args:**
- `$providers` - (array) An array of registered providers in the format `'provider_key' => 'Provider_Class_Name'`.

**Location:**  
includes/components/bricks-views/manager.php

**Access:**  
Global

**Example:**

```php
add_filter( 'jet-engine/bricks-views/dynamic_data/register_providers', function( $providers ) {

	// Connecting the providers file
	require plugin_dir_path( __FILE__ ) . 'dynamic-data/my-custom-provider.php';

	// Registering a new provider with the key 'my-custom-data'
	$providers['my-custom-data'] = '\My_Plugin\Bricks_Views\Dynamic_Data\My_Custom_Provider';

	return $providers;

}, 10, 1 );
```

## jet-engine/bricks-views/dynamic-data/show-hidden-fields

Used to control the display of hidden fields in the dynamic data list of Bricks Views for Custom Content Types (CCT).
Allows including or excluding hidden fields when registering dynamic data fields.

**Args:**
- `$show_hidden` - (bool) A current value. Defaults to `true`.
- `$type` - (string) A slug (key) of the current Custom Content Type.

**Location:**  
includes/modules/custom-content-types/inc/bricks-views/dynamic-data/provider.php

**Access:**  
Global

**Example:**

```php
add_filter( 'jet-engine/bricks-views/dynamic-data/show-hidden-fields', function( $show_hidden, $type ) {

	// Example: hide all hidden fields for CCT with key 'my_content_type'
	if ( 'my_content_type' === $type ) {
		return false;
	}

	return $show_hidden;

}, 10, 2 );
```

## jet-engine/bricks-views/element/parsed-attrs

Allows modifying the attributes of a Bricks Views element after parsing and before rendering.
Can be used to add or change element parameters.

**Args:**
- `$attrs` - (array) An array of element’s attributes after parsing.
- `$element` - (object) An instance of the Bricks Views element class.

**Location:**  
includes/components/bricks-views/elements/base.php

**Access:**  
Global

**Example:**

```php
add_filter( 'jet-engine/bricks-views/element/parsed-attrs', function( $attrs, $element ) {

	// Example: for a map, replace the marker image field with a specific type
	if ( 'jet-engine-maps-listing' === $element->name ) {
		if ( ! empty( $attrs['marker_type'] ) && 'dynamic_image_cct' === $attrs['marker_type'] ) {
			$attrs['marker_cct_field'] = ! empty( $attrs['marker_cct_field__image'] )
				? $attrs['marker_cct_field__image']
				: '';
		}
	}

	return $attrs;

}, 10, 2 );
```

## jet-engine/bricks-views/listing/render-assets

Used to control the rendering of listing CSS styles in Bricks Views.
Allows disabling or modifying the logic for enqueuing inline styles for a specific listing.

**Args:**
- `$allow_render` - (bool) Whether rendering styles is allowed (default `true`).
- `$listing_id` - (int|string) The listing ID being rendered.

**Location:**  
includes/components/bricks-views/listing/manager.php

**Access:**  
Frontend-only

**Example:**

```php
// Completely disable style rendering for all listings
add_filter( 'jet-engine/bricks-views/listing/render-assets', '__return_false' );

// Conditionally disable styles for a specific listing only
add_filter( 'jet-engine/bricks-views/listing/render-assets', function( $allow_render, $listing_id ) {
	if ( 456 === (int) $listing_id ) {
		return false; // Switching off styles with a listing with ID 456
	}
	return $allow_render;
}, 10, 2 );
```

