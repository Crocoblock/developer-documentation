# JetEngine. Listing-related filters

## jet-engine/listings/allowed-context-list

Allows registering a custom context (an object that will be used as the current one when retrieving data). This filter only adds the context to all lists of available contexts wherever they are used. Next, you need to return an object that corresponds to this context through the filter <a href="/01-jet-engine/01-hooks/01-listings/filters.md#jet-enginelistingsdataobject-by-context">'jet-engine/listings/data/object-by-context/{$context}'</a>.

For more details, see the section <a href="/01-jet-engine/02-common-use-cases/01-context/">jet-engine/usage-cases/context</a>.

**Args:**

* `$context_list` - Available contexts

**Location:** /includes/listings/manager.php

**Access:** Global

**Example:**

```php
add_filter( 'jet-engine/listings/allowed-context-list', function( $context_list ) {
	$context_list['current_wc_order'] = 'Current WC Order';
	return $context_list;
} );
```

## jet-engine/listings/dynamic-link/fields

Allows adding custom options for controlling the Source of the Dynamic Link widget, regardless of the builder.

**Args:**

* `$groups` - Available fields grouped by type

**Location:** /includes/listings/manager.php

**Access:** Global

**Example:**

```php
add_filter( 'jet-engine/listings/dynamic-link/fields', function( $groups ) {

	// Iterate through all existing instances from JetEngine Content Types
	foreach ( \Jet_Engine\Modules\Custom_Content_Types\Module::instance()->manager->get_content_types() as $type => $instance ) {

		// Get all fields for each content type
		$fields = $instance->get_fields_list();
		$prefixed_fields = array(
			$type . '___ID' => __( 'Item ID', 'jet-engine' ),
		);

		foreach ( $fields as $key => $label ) {
			$prefixed_fields[ $type . '__' . $key ] = $label;
		}

		// Add these fields under this Content Type group into allowed links sources
		$groups[] = array(
			'label'   => __( 'Content Type:', 'jet-engine' ) . ' ' . $instance->get_arg( 'name' ),
			'options' => $prefixed_fields,
		);

	}

	return $groups;

} );
```

## jet-engine/listing/repeater-sources

Allows adding support for custom sources for repeater fields (for the dynamic Repeater widget and listings with the Repeater source). You then need to add the appropriate processing.

**Args:**

* `$sources` - Available sources

**Location:** /includes/listings/manager.php

**Access:** Global

**Example:**

```php
add_filter( 'jet-engine/listing/repeater-sources', function( $sources ) {

	$sources['meta-box'] = 'Meta Box';

	return $sources;

} );
```

## jet-engine/listing/grid/widget-hide-options

Allows adding options under which the current Listing Grid widget will not be rendered. Before the implementation of Dynamic Visibility feature, it was used as a simplified analog of this functionality. It is now outdated.

**Args:**

* `$options` - Available options

**Location:** /includes/listings/manager.php

**Access:** Global

## jet-engine/listings/taxonomies-for-options

Allows adding new taxonomies for the dynamic terms widget. By default, only public taxonomies are fetched there, but through this hook, you can add private taxonomies if needed.

**Args:**

* `$taxonomies` - array - List of taxonomies in the slug => label format

**Location:** /includes/listings/manager.php

**Access:** Global

**Example:**

```php
add_filter( 'jet-engine/listings/taxonomies-for-options', function( $taxonomies ) {

	$new_taxonomies = get_taxonomies( array( 'public' => false ), 'objects', 'and' );

	if ( ! empty( $new_taxonomies ) ) {
		$taxonomies = array_merge( $taxonomies, wp_list_pluck( $new_taxonomies, 'label', 'name' ) )
	}

	return $taxonomies;

} );
```

## jet-engine/templates/create/data

Allows modifying the data of a listing item before creation. The structure is similar to the array of parameters for creating/updating a post - https://developer.wordpress.org/reference/functions/wp_insert_post/#parameters

**Args:**

* `$post_data` - array - Data for creating a listing item. A detailed description of all possible parameters can be found in the official documentation for the wp_insert_post function - https://developer.wordpress.org/reference/functions/wp_insert_post/#parameters 

**Location:**
/includes/listings/admin-screen.php

**Access:**
Admin-only

**Example:**

```php
add_filter( 'jet-engine/templates/create/data', function() {

	if ( ! isset( $_REQUEST['listing_source'] ) ) {
		return $post_data;
	}

	if ( 'custom_content_type' !== $_REQUEST['listing_source'] ) {
		return $post_data;
	}

	if ( empty( $post_data['meta_input']['_listing_data'] ) ) {
		return $post_data;
	}

	if ( empty( $_REQUEST['listing_content_type'] ) ) {
		return $post_data;
	}

	$cct = esc_attr( $_REQUEST['listing_content_type'] );

	$post_data['meta_input']['_listing_data']['post_type']                    = $cct;
	$post_data['meta_input']['_elementor_page_settings']['listing_post_type'] = $cct;
	$post_data['meta_input']['_elementor_page_settings']['cct_type']          = $cct;

	return $post_data;

} );
```

## jet-engine/templates/edit-url/{$view_type}

Allows changing the URL of the listing item editing page depending on the builder used to build the current listing item. $view_type is the dynamic part of the filter that passes the name of the corresponding builder. The filter is triggered during the automatic redirect to the newly created listing item.

**Args:**

* `$redirect` - string - The URL of the listing item editing page. Each callback should always return this URL regardless of the task it performs.
* `$template_id` - integer - The ID of the listing item to be edited in the URL in $redirect

**Location:**
/includes/listings/admin-screen.php

**Access:**
Admin-only

**Example:**

```php
add_filter( 'jet-engine/templates/edit-url/bricks', function( $redirect = '', $template_id = 0 ) {
	return add_query_arg( [ 'bricks' => 'run' ], get_permalink( $template_id ) );
}, 10, 2 );
```

## jet-engine/templates/admin-columns/type/{$source}

Allows displaying custom information in the Source column in the table of listing items in the admin area, depending on the listing source. $source is the dynamic part of the filter name, used to apply your callback only to the source you need.

**Args:**

* `$result` - string - by default '--'. The content to display in the column for the corresponding source.
* `$settings` - array - listing settings.
* `$template_id` - integer - ID of the listing item.

**Location:**
/includes/listings/admin-screen.php

**Access:**
Admin-only

**Example:**

```php
add_filter( 'jet-engine/templates/admin-columns/type/custom_content_type', function( $result, $settings ) {

	$type = isset( $settings['cct_type'] ) ? $settings['cct_type'] : $settings['listing_post_type'];

	if ( ! $type ) {
		return $result;
	}

	$type_instance = \Jet_Engine\Modules\Custom_Content_Types\Module::instance()->manager->get_content_types( $type );

	if ( ! $type_instance ) {
		return $result;
	}

	return $type_instance->get_arg( 'name' );

}, 10, 2 );
```

## jet-engine/ajax/get_listing/response

Allows changing the result of the AJAX callback get_listing before sending the results to the frontend.

**Args:**

* `$response` - array - By default, contains only the 'html' key, which stores the result of the callback execution. You can add your keys that will be passed to the frontend in JSON format.
* `$widget_settings` - array - The settings of the listing.
* `$query` - array - The listing query arguments.

**Location:**
/includes/listings/ajax-handlers.php

**Access:**
JetEngine listing AJAX request

**Example:**

```php
add_filter( 'jet-engine/ajax/get_listing/response', funciton( $response, $widget_settings, $query ) {
	
	if ( empty( $widget_settings['lazy_load'] ) ) {
		return $response;
	}

	if ( empty( $widget_settings['_element_id'] ) ) {
		$query_id = 'default';
	} else {
		$query_id = $widget_settings['_element_id'];
	}

	$filters_data = array();

	$filters_settings = array(
		'queries'   => jet_smart_filters()->query->get_default_queries(),
		'settings'  => jet_smart_filters()->providers->get_provider_settings(),
		'props'     => jet_smart_filters()->query->get_query_props(),
	);

	foreach ( $filters_settings as $param => $data ) {
		if ( ! empty( $data['jet-engine'][ $query_id ] ) ) {
			$filters_data[ $param ][ $query_id ] = $data['jet-engine'][ $query_id ];
		}
	}

	if ( ! empty( $filters_data ) ) {
		$response['filters_data'] = $filters_data;
	}

	if ( jet_smart_filters()->indexer->data ) {
		$response['indexer_data'] = array(
			'provider' => 'jet-engine/' . $query_id,
			'query'    => wp_parse_args(
				$query,
				isset( $filters_data['queries'][$query_id] ) ? $filters_data['queries'][$query_id] : array()
			)
		);
	}

	return $response;

}, 10, 3 );
```

## jet-engine/listings/ajax/settings-by-id/{$listing_type}

Allows changing the settings of the listing depending on the builder type used to render this listing. $listing_type is the dynamic part that passes the name of the builder used to build the page where this listing is used, and, accordingly, the type of the listing element itself. In the JetEngine core, it is used to find the necessary widget by its $element_id (the 2nd argument of the filter) on the page with $post_id (the 3rd argument).

**Args:**

* `$settings` - array - The settings of the listing item according to the builder.
* `$element_id` - string - The element's ID. It refers to the internal ID in the logic of the builder used to build this page and, accordingly, this widget.
* `$post_id` - integer - The ID of the page where the listing is displayed and from which the AJAX request for its rendering was made.

**Location:**
/includes/listings/ajax-handlers.php

**Access:**
JetEngine listing AJAX request

**Example:**

```php
add_filter( 'jet-engine/listings/ajax/settings-by-id/bricks', ( $settings = [], $element_id = null, $post_id = 0 ) {

	if ( ! $element_id || ! $post_id ) {
		return $settings;
	}

	$bricks_data = get_post_meta( $post_id, BRICKS_DB_PAGE_CONTENT, true );

	if ( empty( $bricks_data ) ) {
		return $settings;
	}

	foreach ( $bricks_data as $el_id => $element ) {
		if ( $element['id'] === $element_id ) {
			return $element['settings'];
		}
	}

	return $settings;
}, 10, 3 );
```

## jet-engine/listings/allowed-callbacks

Allows changing and adding new callbacks to the list of allowed Engine callbacks. Currently, it is better to use the unified API for adding new callbacks through the action [jet-engine/callbacks/register](/01-jet-engine/01-hooks/01-listings/actions.md#jet-enginecallbacksregister)

**Args:**

* `$callbacks` - array - The list of available callbacks.

**Location:**
/includes/listings/callbacks.php

**Access:**
Global

**Example:**

As of now, it is better to use the unified API for adding new callbacks through the action [jet-engine/callbacks/register](/01-jet-engine/01-hooks/01-listings/actions.md#jet-enginecallbacksregister)

## jet-engine/listings/allowed-callbacks-args

Allows you to modify and add new arguments for existing JetEngine callbacks. These arguments will be registered as controls for corresponding interfaces. Currently, it is better to use the unified API to add new callbacks via the action [jet-engine/callbacks/register](/01-jet-engine/01-hooks/01-listings/actions.md#jet-enginecallbacksregister)

**Args:**

* `$callbacks_args` - array - List of all available arguments for all callbacks.

**Location:**
/includes/listings/callbacks.php

**Access:**
Global

**Example:**

Currently, it is better to use the unified API to add new callbacks via the action [jet-engine/callbacks/register](/01-jet-engine/01-hooks/01-listings/actions.md#jet-enginecallbacksregister)

## jet-engine/listing/dynamic-field/callback-args

Allows you to apply custom arguments for the current callback. Currently, it is better to use the unified API to add new callbacks via the action [jet-engine/callbacks/register](/01-jet-engine/01-hooks/01-listings/actions.md#jet-enginecallbacksregister)

**Args:**

* `$args` - array - List of arguments passed to the callback. The first argument is always the current value to which the callback is applied. Further arguments should be added to the array in the order expected by the callback.

**Location:**
/includes/listings/callbacks.php

**Access:**
Global

**Example:**

Currently, it is better to use the unified API to add new callbacks via the action [jet-engine/callbacks/register](/01-jet-engine/01-hooks/01-listings/actions.md#jet-enginecallbacksregister)

## jet-engine/data/listing-type

Allows you to set a custom type for rendering the listing (the builder for rendering the current listing items). In this case, you can set a custom name for the listing rendering type based on what is saved for the current listing, and the processing of the set type is done through the hook `jet-engine/listing/content/{$type}`

**Args:**

* `$listing_type` - string - The default type saved in the `_listing_type` meta field of the current listing.

**Location:**
/includes/listings/data.php

**Access:**
Global

**Example:**

```php
/**
 * Reset Elementor listing type to Blocks to avoid errors if Elemntor not installed
 * Type changed 'on the fly' so initial meta value with listing type not affected
 */
if ( ! jet_engine()->has_elementor() ) {
	add_filter( 'jet-engine/data/listing-type', function( $listing_type ) {
			
		if ( 'elementor' === $listing_type ) {
			$listing_type = 'blocks';
		}
		
		return $listing_type;
	} );
}
```

## jet-engine/listing/data/object-fields-groups

Available data groups that are included in the Object field list where these fields are encountered (for example, in the Dynamic Field widget). You should use this hook to add custom names of object fields, which will then be automatically retrieved from the current object.

**Args:**

* `$groups` - array - Defaul list of fields.

**Location:**
/includes/listings/data.php

**Access:**
Global

**Example:**

```php
/**
 * Add WC product fields and methods to allowed object fields
 */
add_filter( 'jet-engine/data/listing-type', function( $groups ) {

	$groups[] = [
		'label'   => __( 'WooCommerce', 'jet-engine' ),
		'options' => [
			'get_id'                       => __( 'Product ID', 'jet-engine' ),
			'get_permalink'                => __( 'Product URL', 'jet-engine' ),
			'get_title'                    => __( 'Title', 'jet-engine' ),
			'get_slug'                     => __( 'Product Slug', 'jet-engine' ),
			'get_type'                     => __( 'Type', 'jet-engine' ),
			'get_status'                   => __( 'Product Status', 'jet-engine' ),
			'get_sku'                      => __( 'SKU', 'jet-engine' ),
			'get_description'              => __( 'Description', 'jet-engine' ),
			'get_short_description'        => __( 'Short Description', 'jet-engine' ),
			'get_price_html'               => __( 'Price HTML String', 'jet-engine' ),
			'get_price'                    => __( 'Plain Price', 'jet-engine' ),
			'get_regular_price'            => __( 'Plain Regular Price', 'jet-engine' ),
			'get_sale_price'               => __( 'Plain Sale Price', 'jet-engine' ),
			'get_stock_status'             => __( 'Stock Status', 'jet-engine' ),
			'get_stock_quantity'           => __( 'Stock Quantity', 'jet-engine' ),
			'wc_get_product_category_list' => __( 'Categories', 'jet-engine' ),
			'wc_get_product_tag_list'      => __( 'Tags', 'jet-engine' ),
			'get_average_rating'           => __( 'Average Rating', 'jet-engine' ),
			'get_review_count'             => __( 'Review Count', 'jet-engine' ),
			'get_total_sales'              => __( 'Total Sales', 'jet-engine' ),
			'get_date_on_sale_from'        => __( 'Date on Sale from', 'jet-engine' ),
			'get_date_on_sale_to'          => __( 'Date on Sale to', 'jet-engine' ),
			'get_height'                   => __( 'Height', 'jet-engine' ),
			'get_length'                   => __( 'Length', 'jet-engine' ),
			'get_weight'                   => __( 'Weight', 'jet-engine' ),
			'get_width'                    => __( 'Width', 'jet-engine' ),
			'get_max_purchase_quantity'    => __( 'Max Purchase Quantity', 'jet-engine' ),
			'get_tax_status'               => __( 'Tax Status', 'jet-engine' ),
			'add_to_cart_url'              => __( 'Add to Cart URL', 'jet-engine' ),
			'add_to_cart_text'             => __( 'Add to Cart Text', 'jet-engine' ),
		],
	];

	return $groups;

} );
```

## jet-engine/listing/data/post-fields

Allows you to modify the set of available fields for the post object for use in options. This filter only adds new fields as options; you need to add them directly to the post object manually.

**Args:**

* `$fields` - array - Default list of fields.

**Location:**
/includes/listings/data.php

**Access:**
Global

**Example:**

```php
/**
 * Add geo_query_distance as post field. 
 * This field can be presented in post object in some cases when Geo query is used
 */
add_filter( 'jet-engine/listing/data/post-fields', function( $fields ) {
	$fields['geo_query_distance'] = __( 'Distance (for Geo queries)', 'jet-engine' );
	return $fields;
} );
```

## jet-engine/listing/data/term-fields

Allows you to modify the set of available fields for the term taxonomy object for use in options. This filter only adds new fields as options; you need to add them directly to the term object manually.

**Args:**

* `$fields` - array - Default list of fields.

**Location:**
/includes/listings/data.php

**Access:**
Global

**Example:**

```php
/**
 * Add some random field for demonstration purposes
 */
add_filter( 'jet-engine/listing/data/term-fields', function( $fields ) {
	$fields['my_term_field'] = __( 'My Term Field', 'jet-engine' );
	return $fields;
} );
```

## jet-engine/listing/data/user-fields

Allows you to modify the set of available fields for the user object to use in options. This filter only adds new fields as options; you need to add them directly to the user object manually.

**Args:**

* `$fields` - array - Default list of fields.

**Location:**
/includes/listings/data.php

**Access:**
Global

**Example:**

```php
/**
 * Add some random field for demonstration purposes
 */
add_filter( 'jet-engine/listing/data/term-fields', function( $fields ) {
	$fields['my_user_field'] = __( 'My User Field', 'jet-engine' );
	return $fields;
} );
```

## jet-engine/listing/data/custom-listing

Allows you to change the parameters of the listing when setup_default_listing() is called. This happens when the plugin tries to get the listing data on standard WP archive pages. The filter is used for compatibility with theme builders (JetThemeCore and ElementorPro).

**Args:**

* `$listing` - array|false - Listing data.
* `$data_manager` - Jet_Engine_Listings_Data.
* `$default_object` - object - Current default object.

**Location:**
/includes/listings/data.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/listing/data/custom-listing',  function( $listing, $data_manager, $default_object ) {

	if ( ! isset( $default_object->post_type ) ) {
		return $listing;
	}

	if ( 'elementor_library' !== $default_object->post_type ) {
		return $listing;
	}

	$elementor = Elementor\Plugin::instance();

	if ( ! $elementor->editor->is_edit_mode() ) {
		return $listing;
	}

	$document = $elementor->documents->get_doc_or_auto_save( $default_object->ID );

	if ( ! $document ) {
		return $listing;
	}

	$settings = $document->get_settings();

	if ( empty( $settings['preview_type'] ) ) {
		return $listing;
	}

	if ( false === strpos( $settings['preview_type'], 'single' ) ) {
		return $listing;
	}

	$preview = explode( '/', $settings['preview_type'] );

	if ( empty( $preview[1] ) ) {
		return $listing;
	}

	return array(
		'listing_source'    => 'posts',
		'listing_post_type' => $preview[1],
		'listing_tax'       => 'category',
	);

}, 10, 3 );
```

## jet-engine/listings/data/queried-user

Allows you to set a custom queried user. Queried user is the user whose page we are currently viewing. For example, on an author archive page, the queried user is the author whose archive we are currently viewing. If the queried user cannot be determined, the current user will be returned. Can be used with third-party membership plugins to determine the public user page.

**Args:**

* `$queried_user` - WP_User|false - Queried user.

**Location:**
/includes/listings/data.php

**Access:**
Global

**Example:**

```php
/**
 * Set current vendoer as current queried user for WCFM plugin
 *
 * @param [type] $queried_user [description]
 */
add_filter( 'jet-engine/listings/data/queried-user',  function( $queried_user ) {

	$wcfm_store_url = wcfm_get_option( 'wcfm_store_url', 'store' );
	$store_name = apply_filters( 'wcfmmp_store_query_var', get_query_var( $wcfm_store_url ) );

	if ( ! empty( $store_name ) ) {

		$store_user = get_user_by( 'slug', $store_name );

		if ( $store_user ) {
			$queried_user = $store_user;
		}
	}

	return $queried_user;

} );
```

## jet-engine/listings/data/current-author

Used in the function get_current_author_object(). This function attempts to get the object with data of the author of the current content. Therefore, the filter allows you to change/set the author of the content (post, page, archive page, etc.).

**Args:**

* `$author` - WP_User|false - queried user.

**Location:**
/includes/listings/data.php

**Access:**
Global

## jet-engine/listing/current-object-title

Used for custom data objects and allows you to set what will be the title of the current object. For example, for a post, it is the post title, while for a custom object, the plugin cannot clearly determine what will be the title.

**Args:**

* `$title` - string - Name.
* `$object` - object - Object.

**Location:**
/includes/listings/data.php

**Access:**
Global

**Example:**

```php
/**
 * Set current current booking object title
 *
 * @param [type] $queried_user [description]
 */
add_filter( 'jet-engine/listing/current-object-title', function( $title, $object ) {

	if ( ! $object || empty( $object->apartment_id ) ) {
		return $title;
	}

	return get_the_title( $object->apartment_id );

}, 10, 2 );
```

## jet-engine/listing/custom-post-id

Used in the jet_engine()->listings->data->get_current_object_id() method to retrieve the ID of the current object. For standard objects like posts, users, terms, etc., we know exactly which property of the object holds its ID. However, for custom objects, this is not always the case. But the get_current_object_id method is used in many places to accurately determine the object's ID. Thanks to this filter, we can determine this ID for custom objects.

This hook is triggered in cases where jet_engine()->listings->data->get_current_object_id() encounters an object whose processing is not directly specified in this method. This is any object except for WP_Post, WP_User, WP_Term, WP_Comment, Jet_Engine_Queried_Repeater_Item.

**Args:**

* `$post_id` - int|false - The default ID from the get_the_ID() function.
* `$object` - object - The object for which we are retrieving the ID.

**Location:**
/includes/listings/data.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/listing/custom-post-id', function( $id, $object ) {

	if ( $object && is_object( $object ) && is_a( $object, '\JET_ABAF\Resources\Booking' ) ) {
		$id = $object->get_id();
	}

	return $id;

}, 10, 2 );
```

## jet-engine/listing/current-object-id

This hook, like the previous one, is used in the jet_engine()->listings->data->get_current_object_id() method to retrieve the ID of the current object. The only difference is that this hook is triggered whenever jet_engine()->listings->data->get_current_object_id() is called, and it allows you to change the final result returned by this method, regardless of the object for which we are getting the ID.

**Args:**

* `$obj_id` - int|false - The default ID obtained by the jet_engine()->listings->data->get_current_object_id() method.
* `$object` - object - The object for which we are retrieving the ID.

**Location:**
/includes/listings/data.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/listing/current-object-id', function( $id, $object ) {

	if ( $object && is_object( $object ) && is_a( $object, '\JET_ABAF\Resources\Booking' ) ) {
		$id = $object->get_id();
	}

	return $id;

}, 10, 2 );
```

## jet-engine/listings/data/default-object

Allows you to change the current default object. This is useful for non-standard use cases of using pages in WordPress. For example, in the case of a profile builder, for WordPress, the default current object is the profile builder page, but we need a user the profile builder is currently displaying instead, not the page. 

**Args:**

* `$object` - object - The default object that JetEngine was able to track automatically.
* `$jet_engine_data` - object - An instance of the Jet_Engine_Listings_Data class, similar to what is stored in jet_engine()->listings->data, so instead of the second argument, you can use jet_engine()->listings->data.

**Location:**
/includes/listings/data.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/listings/data/default-object', function( $default_object ) {

	$profile_builder = \Jet_Engine\Modules\Profile_Builder\Module::instance();

	if ( $profile_builder->query->is_account_page() ) {
		return wp_get_current_user();
	}

	if ( $profile_builder->query->is_single_user_page() ) {
		return $profile_builder->query->get_queried_user();
	}

	return $default_object;
} );
```

## jet-engine/listings/data/object-by-context/{$context}

Used to replace the current object with a new one, obtained according to the dynamic part of the hook - {$context}. This functionality is useful for simplifying work with different objects within the same listing or post. Without context, you would have to use nested listings. With context, you can simply use dynamic widgets with a changed context.

Докладніше в розділі <a href="/01-jet-engine/02-common-use-cases/01-context/">jet-engine/usage-cases/context</a>

**Args:**

* `$context_list` - Available contexts

**Location:** /includes/listings/manager.php

**Access:** Global

**Example**
In the <a href="/01-jet-engine/02-common-use-cases/01-context/">jet-engine/usage-cases/context</a> section

## jet-engine/listings/data/object-vars

## jet-engine/listings/data/prop-not-found

## jet-engine/listings/data/prevent-prop

## jet-engine/listings/data/object-date

## jet-engine/listing/data/get-user-meta

## jet-engine/listing/data/get-post-meta

## jet-engine/listing/data/get-term-meta

## jet-engine/listing/data/get-user-meta

## jet-engine/listing/data/get-comment-meta

## jet-engine/listings/data/get-meta/{$source}

## jet-engine/listings/data/repeater-value/{$repeater_source}

## jet-engine/listings/data/user-permalink

## jet-engine/listing/repeater-listing-sources

## jet-engine/listings/data/sources

## jet-engine/listing/grid/lazy-load/post-id

This filter allows you to change the template ID where lazy-load listing is used, for correctly obtaining widget settings during an AJAX request. The filter is used for compatibility with theme builders' templates (JetThemeCore and ElementorPro).

**Args:**
* `$post_id` - int - The ID of the template where lazy-load listing is used.

**Location:**
includes/components/listings/render/listing-grid.php

**Access:**
Global

**Example:**

```php
add_action( 'jet-theme-core/theme-builder/render/location/before',  function( $location, $template_id, $content_type ) {
    $this->current_template = array(
        'template_id'  => $template_id,
        'location'     => $location,
        'content_type' => $content_type,
    );
}, 10, 3 );

add_filter( 'jet-engine/listing/grid/lazy-load/post-id', function( $post_id ) {
    
    if ( empty( $this->current_template ) ) {
        return $post_id;
    }

    if ( empty( $this->current_template['content_type'] ) || 'default' !== $this->current_template['content_type'] ) {
        return $post_id;
    }

    if ( empty( $this->current_template['template_id'] ) ) {
        return $post_id;
    }

    return $this->current_template['template_id'];
} );
```

## jet-engine/listings/frontend/custom-listing-url

This filter allows you to return a custom URL for a listing item. Used in combination with adding a new source for listing item URLs. More about this case <a href="/01-jet-engine/02-common-use-cases/05-register-custom-link-source-for-the-listing">here</a>.

**Args:**
* `$url` - string - By default, an empty string. If you return your value instead of an empty string, it will be used as the URL for the current listing item.
* `$settings` - array - An array with the settings of the listing item. The listing_link_source key in this array stores the name of the current source for URLs.

**Location:**
includes/components/listings/frontend.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/listings/frontend/custom-listing-url', function( $url, $settings = [] ) {
	
	// Make sure we processing 'author_archive_link' source.
	// In your case you need to replace 'author_archive_link' with your actual source name
	if ( ! empty( $settings['listing_link_source'] ) && 'author_archive_link' === $settings['listing_link_source'] ) {
		$current_object = jet_engine()->listings->data->get_current_object();

		// Optional. Make sure we working with Users listing.
		// This check is required for this exact case, for your custom source such check will be different
		if ( $current_object && 'WP_User' === get_class( $current_object ) ) {
			$url = get_author_posts_url( $current_object->ID );
		}
		
	}
	
	return $url;

}, 10, 2 );
```