# JetEngine. Listing-related actions

## jet-engine/listings/renderers/registered

Triggers after registration of all render classes (classes responsible for cross-editor rendering of JetEngine elements). This hook can be used to register custom render classes. Also, using this hook, you can override default render classes and, for example, render the Dynamic Field in all builders using your own class.


**Args:**
- `$listings_manager` - Instance of the listings manager class. Contains the register_render_class method for registering your own render.

**Location:**
/includes/listings/manager.php

**Access:**
Global

**Example:**

```php
add_action( 'jet-engine/listings/renderers/registered', function( $listing_manager ) {
	$listing_manager->register_render_class( 'dynamic-field', array(
		'class_name' => 'My_Jet_Engine_Dynamic_Field',
		'path'       => 'path-to-my-render-class.php',
	) );
} );
```

## jet-engine/templates/created

Triggers after creating a new Listing Item. It can be used to add custom meta fields for the listing item when created.

**Args:**
- `$template_id` - ID of the newly created listing item.
- `$post_data` - Array with data of the listing item. Its structure is similar to the parameters array for creating or updating a post - https://developer.wordpress.org/reference/functions/wp_insert_post/#parameters

**Location:**
/includes/listings/admin-screen.php

**Access:**
Admin-only

**Example:**

```php
add_action( 'jet-engine/templates/created', function( $template_id = 0, $post_data = array() ) {

	$source = ! empty( $_REQUEST['listing_source'] ) ? esc_attr( $_REQUEST['listing_source'] ) : 'posts';

	if ( 'query-builder' === $source && ! empty( $_REQUEST['query_id'] ) ) {
		update_post_meta( $template_id, '_jet_engine_query_id', absint( $_REQUEST['query_id'] ) );
	}

}, 10, 2 );
```

## jet-engine/templates/created/{$view_type}

This action works similarly to the previous one. The only difference is the $view_type dynamic part. It isolates the action for a specific builder under which the listing item was created. This hook is best used when you need to perform certain actions only for a specific builder, rather than globally for the listing item.

**Args:**
- `$template_id` - ID of the newly created listing item.
- `$post_data` - Array with data of the listing item. Its structure is similar to the parameters array for creating or updating a post - https://developer.wordpress.org/reference/functions/wp_insert_post/#parameters

**Location:**
/includes/listings/admin-screen.php

**Access:**
Admin-only

**Example:**

```php
add_action( 'jet-engine/templates/created/bricks', function( $template_id ) {
	update_post_meta( $template_id, '_bricks_editor_mode', 'bricks' );
} );
```

## jet-engine/ajax-handlers/referrer/request

Triggers on AJAX requests related to listings, such as Load more, Lazy load, etc. The hook fires after global variables have been set but before listing settings are added to the global $_REQUEST variable.

**Args:**
None

**Location:**
/includes/listings/ajax-handlers.php

**Access:**
JetEngine listing AJAX request

**Example:**

```php
/**
 * Register custom load more handler instead of default
 */
add_action( 'jet-engine/ajax-handlers/referrer/request', function() {
	if ( 'listing_load_more' === $_REQUEST['handler'] ) {
		remove_action( 'wp_ajax_jet_engine_ajax', array( jet_engine()->listings->ajax_handlers, 'handle_ajax' ) );
		add_action( 'wp_ajax_jet_engine_ajax', 'my_handle_listing_load_more' );
	}
} );
```

## jet-engine/ajax-handlers/before-do-ajax

Triggers on AJAX requests related to listings, such as Load More, Lazy load, etc. The hook fires after global variables have been set and after listing settings are added to the global $_REQUEST variable. It can be used to add custom listing actions.

**Args:**
* `$ajax_handlers` - Jet_Engine_Listings_Ajax_Handlers - the object manager of AJAX requests.
* `$request` - array - the content of the global $_REQUEST variable after adding listing settings to it.

**Location:**
/includes/listings/ajax-handlers.php

**Access:**
JetEngine listing AJAX request

**Example:**

```php
/**
 * Register custom load more handler instead of default
 */
add_action( 'jet-engine/ajax-handlers/before-do-ajax', function() {
	
	if ( ! empty( $_REQUEST['handler'] ) && 'reload_table_on_interval' === $_REQUEST['handler'] ) {

		$table_id = absint( $_REQUEST['table_id'] );
		$settings = [ 'table_id' => $table_id ];

		$render = jet_engine()->listings->get_render_instance( 'dynamic-table', $settings );

		ob_start();
		$render->setup_table( $table_id, array(), $render->get_settings() );
		$render->table_body();
		$content = ob_get_clean();

		wp_send_json_success( $content );

	}

} );
```

## jet-engine/ajax-handlers/before-call-handler

Triggers on AJAX requests related to listings, such as Load More, lazy load, etc. The hook fires just before calling one of the default callbacks - listing_load_more or get_listing.

**Args:**
* `$ajax_handlers` - Jet_Engine_Listings_Ajax_Handlers - the object manager of AJAX requests.
* `$request` - array - the content of the global $_REQUEST variable after adding listing settings to it

**Location:**
/includes/listings/ajax-handlers.php

**Access:**
JetEngine listing AJAX request

**Example:**

```php
/**
 * Register custom load more handler instead of default
 */
add_action( 'jet-engine/ajax-handlers/before-call-handler', function() {
	
	if ( isset( $_REQUEST['isEditMode'] ) && filter_var( $_REQUEST['isEditMode'], FILTER_VALIDATE_BOOLEAN ) ) {
		return;
	}

	\Elementor\Plugin::instance()->frontend->register_styles();
	\Elementor\Plugin::instance()->frontend->register_scripts();

} );
```

## jet-engine/listings/ajax/load-more

Triggers before getting content for the load more callback. Very specific hook. Better not to use it unless absolutely necessary.

**Args:**
None

**Location:**
/includes/listings/ajax-handlers.php

**Access:**
JetEngine listing AJAX request

**Example:**

Better not to use it unless absolutely necessary and replace it with one of the hooks `jet-engine/ajax-handlers/before-call-handler`, `jet-engine/ajax-handlers/before-do-ajax`, `jet-engine/ajax-handlers/referrer/request`

## jet-engine/callbacks/register

Triggers at the time of registering callbacks. Designed for registering custom callbacks through an optimized API, without using additional hooks.

**Args:**
* `$callbacks_manager` - Jet_Engine_Listings_Callbacks - the object manager of callbacks

**Location:**
/includes/listings/callbacks.php

**Access:**
Global

**Example:**

```php
/**
 * Register custom load more handler instead of default
 */
add_action( 'jet-engine/callbacks/register', function( $callbacks_manager ) {
	
	$callbacks_manager->register_callback(
		// Callback function name. Should be callable from global scope
		'jet_engine_get_user_data_by_id',
		// Callback label for callbacks options list
		__( 'Get user data by ID', 'jet-engine' ),
		// Optional callback arguments list for callbacks UI
		[
			'user_data_to_get' => [
				'label'     => __( 'User Data to get', 'jet-engine' ),
				'type'      => 'select',
				'default'   => 'display_name',
				'options'   => jet_engine()->listings->data->get_user_object_fields(),
			]
		]
	);

} );
```

## jet-engine/listings/data/set-current-object

Triggers after setting the current $current_object for the listing. In the case of JetEngine in general, and listings in particular, $current_object is similar to the global $post object in WP. But in the case of $post, it is always an object of WP_Post, while in the case of a listing, it will be the current listing item. Outside the listing, $current_object usually coincides with the global $post object. This object is available externally via the method `jet_engine()->listings->data->get_current_object()`.

**Args:**
* `$current_object` - the object that was just set as `$current_object`
* `$data` - the same object as jet_engine()->listings->data

**Location:**
/includes/listings/data.php

**Access:**
Global

**Example:**

```php
/**
 * Setup global $product var if instance of WC_Product currently set as $current_object
 */
add_action( 'jet-engine/listings/data/set-current-object', function( $object ) {
	global $product;

	if ( ! $product && is_a( $object, 'WC_Product' ) ) {
		$product = $object;
	}
} );
```

## jet-engine/listings/data/reset-current-object

Triggers before `$current_object` will be reset. More details about `$current_object` [here.](/01-jet-engine/01-hooks/01-listings/actions.md#jet-enginelistingsdataset-current-object)

**Args:**
* `$data` - the same object as jet_engine()->listings->data

**Location:**
/includes/listings/data.php

**Access:**
Global

**Example:**

```php
/**
 * Restore global $product object for WC single product page 
 * if this product was changed by any listings inside this page
 */
add_action( 'jet-engine/listings/data/reset-current-object', function() {
	$object = jet_engine()->listings->objects_stack->get_restored_object();

	if ( $object && is_a( $object, 'WC_Product' ) ) {
		global $product;
		$product = $object;
	}
} );
```


