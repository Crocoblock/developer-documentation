# JetEngine. Data Stores. Filters.

#jet-engine/blocks-views/data-store-button/attributes

Allows registering additional attributes for the `Data Store Button` block.

**Args:**
- `$attributes` - array - An array of block attributes.

**Location:**
includes/modules/data-stores/inc/block-types/button.php

**Access:**
Admin-only

**Example:**
```php
add_filter( 'jet-engine/blocks-views/data-store-button/attributes', function( $attributes ) { 
    
    $attributes['custom_attr'] = [
        'type'    => 'string',
        'default' => '',
    ];

    return $attributes;
 } );
```

#jet-engine/data-stores/store-post-id

Allows filtering the ID of the current object that will be added to the data store.

**Args:**
- `$post_id` - int - The ID of the current object.
- `$store_instance` - Jet_Engine\Modules\Data_Stores\Stores\Factory - The data store instance.

**Location:** <br>
includes/modules/data-stores/inc/block-types/button.php <br>
includes/modules/data-stores/inc/render-links.php

**Access:**
Global

**Example:**
```php
add_filter( 'jet-engine/data-stores/store-post-id', function( $post_id, $store_instance ) { 
    
    $listing_object = jet_engine()->listings->data->get_current_object();

    if ( $listing_object && is_a( $listing_object, 'WC_Product' ) ) {
        $post_id = $listing_object->get_id();
    }

    return $post_id;
 }, 10, 2 );
```

## jet-engine/data-stores/store/data

Allows filtering the current value of the store when retrieving it through the `$store_instance->get_store()` method. For example, for compatibility with translation plugins.

**Args:**
- `$store` - array - The store value.
- `$store_id` - string - The store slug.

**Location:** <br>
includes/modules/data-stores/inc/stores/cookies.php <br>
includes/modules/data-stores/inc/stores/session.php<br>
includes/modules/data-stores/inc/stores/user-ip.php<br>
includes/modules/data-stores/inc/stores/user-meta.php

**Access:**
Global

**Example:**
```php
add_filter( 'jet-engine/data-stores/store/data', function( $store, $store_id ) {
    
    if ( empty( $store ) ) {
        return $store;
    }

    $store_instance = Jet_Engine\Modules\Data_Stores\Module::instance()->stores->get_store( $store_id );

    if ( $store_instance->is_user_store() || $store_instance->get_arg( 'is_cct' ) ) {
        return $store;
    }

    $store = array_map( function( $item ) {
        if ( ! is_array( $item ) ) {
            $item = apply_filters( 'wpml_object_id', $item, get_post_type( $item ), true );
        }

        return $item;
    }, $store );

    return $store;
}, 10, 2 );
```

#jet-engine/data-stores/pre-get-post-count

By default, the data store counter value is stored in post meta. This filter allows getting the counter value from another custom location if logic has been added to store this value using the `jet-engine/data-stores/post-count-increased` and `jet-engine/data-stores/post-count-decreased` actions.

**Args:**
- `$count` - false|int - The counter value. Default: false.
- `$item_id` - int - The object ID.
- `$store` - Jet_Engine\Modules\Data_Stores\Stores\Factory - The data store instance.

**Location:**
includes/modules/data-stores/inc/stores/factory.php

**Access:**
Global

**Example:**
```php
add_filter( 'jet-engine/data-stores/pre-get-post-count', function( $count, $item_id, $store ) {
    
    if ( ! $item_id ) {
        return $count;
    }

    $is_cct      = $store->get_arg( 'is_cct' );
    $related_cct = $store->get_arg( 'related_cct' );

    if ( ! $is_cct || ! $related_cct ) {
        return $count;
    }

    $content_type = Jet_Engine\Modules\Custom_Content_Types\Module::instance()->manager->get_content_types( $related_cct );

    if ( ! $content_type ) {
    	return $count;
    }

    $item        = $content_type->db->get_item( $item_id );
    $count_field = str_replace( array( ' ', '-' ), '_', $store->get_slug() ) . '_count';

    if ( ! $item ) {
        return 0;
    } else {
        if ( is_array( $item ) ) {
            $count = isset( $item[ $count_field ] ) ? $item[ $count_field ] : 0;
            return absint( $count );
        } else {
            return absint( $item->$count_field );
        }
    }
    
}, 10, 3 );
```

#jet-engine/data-stores/ajax-store-fragments

Allows filtering the list of fragments (selectors) to update counters on the frontend when adding an item to the store or removing an item from the store.

**Args:**
- `$fragments` - array - An array of fragments to update.
- `$store` - Jet_Engine\Modules\Data_Stores\Stores\Factory - The data store instance.
- `$item_id` - int - The object ID.

**Location:**
includes/modules/data-stores/inc/stores/factory.php

**Access:**
Global

**Example:**
```php
add_filter( 'jet-engine/data-stores/ajax-store-fragments', function( $fragments, $store, $item_id ) {

    $selector = '.my-custom-selector[data-store="' . $store->get_slug() . '"][data-post="' . $item_id . '"]';

    $fragments[ $selector ] = $store->get_count();

    return $fragments;
}, 10, 3 );
```

#jet-engine/data-stores/get-users-macros/context/{ $context }

Allows filtering the item ID for the `get_users_for_store_item` macro based on the dynamic part of the `$context filter`, which corresponds to the selected context.

**Args:**
- `$item_id` - int - ID of the object.

**Location:**
includes/modules/data-stores/inc/macros/get-users-for-store-item.php

**Access:**
Global

**Example:**
```php
add_filter( 'jet-engine/data-stores/get-users-macros/context/post_author', function( $item_id ) {
    $user = jet_engine()->listings->data->get_current_author_object();

    if ( $user ) {
        $item_id = $user->ID;
    }
    
    return $item_id;
} );
```

#jet-engine/data-stores/remove-from-store/settings

Allows filtering the settings of the widget/block before rendering the link for removing an item from the store.

**Args:**
- `$settings` - array - The widget/block settings.
- `$store` - Jet_Engine\Modules\Data_Stores\Stores\Factory - The data store instance.

**Location:**
includes/modules/data-stores/inc/render-links.php

**Access:**
Global

**Example:**
```php
add_filter( 'jet-engine/data-stores/remove-from-store/settings', function( $settings, $store ) {
    // do something
    return $settings;
}, 10, 2 );
```

#jet-engine/data-stores/add-to-store/settings

Allows filtering the settings of the widget/block before rendering the link for adding an item to the store.

**Args:**
- `$settings` - array - The widget/block settings.
- `$store` - Jet_Engine\Modules\Data_Stores\Stores\Factory - The data store instance.

**Location:**
includes/modules/data-stores/inc/render-links.php

**Access:**
Global

**Example:**
```php
add_filter( 'jet-engine/data-stores/add-to-store/settings', function( $settings, $store ) {
    // do something
    return $settings;
}, 10, 2 );
```

#jet-engine/data-stores/settings/args-to-save

Allows modifying the settings of the store item that will be saved in the database.

**Args:**
- `$args` - array - The data array to be saved in the database.
- `$item` - array - The settings array of the store item that is being saved.

**Location:**
includes/modules/data-stores/inc/settings.php

**Access:**
Global

**Example:**
```php
add_filter( 'jet-engine/data-stores/add-to-store/settings', function( $args, $item ) {
    $args['is_cct'] = ! empty( $item['is_cct'] ) ? filter_var( $item['is_cct'], FILTER_VALIDATE_BOOLEAN ) : false;
    $args['related_cct'] = ! empty( $item['related_cct'] ) ? $item['related_cct'] : '';

    return $args;
}, 10, 2 );
```

# User IP Schedules Hooks

User IP data store saves its data in a separate table, so the functionality of cleaning this table from time to time is provided. For now, this feature can be enabled and configured using WP filters; perhaps in the future, we will add options in the data store settings. WP Schedule API is used for periodic cleaning.

##jet-engine/data-stores/user-ip/schedules/auto-clear-store

Allows enabling the automatic periodic clearing of the User IP data store.

**Args:**
- `$auto_clear` - boolean - Whether to automatically clear the store. Default: `false`.
- `$store_slug` - string - The data store slug.
- `$store` - Jet_Engine\Modules\Data_Stores\Stores\Factory - The data store instance.

**Location:**
includes/modules/data-stores/inc/stores/user-ip-schedules.php

**Access:**
Global

##jet-engine/data-stores/user-ip/schedules/clear-expiration

Allows changing the period after which records in the database will be deleted. By default, this period is set to 1 year, meaning records in the database that were added over a year ago will be deleted.

**Args:**
- `$clear_expiration` - int - The period after which records in the database will be deleted. Default: `YEAR_IN_SECONDS`.
- `$store_slug` - string - The data store slug.
- `$store` - Jet_Engine\Modules\Data_Stores\Stores\Factory - The data store instance.

**Location:**
includes/modules/data-stores/inc/stores/user-ip-schedules.php

**Access:**
Global

##jet-engine/data-stores/user-ip/schedules/event-timestamp

Allows changing the event timestamp for checking outdated records in the database.

**Args:**
- `$event_timestamp` - int - The event timestamp. 
- `$store_slug` - string - The data store slug.
- `$store` - Jet_Engine\Modules\Data_Stores\Stores\Factory - The data store instance.

**Location:**
includes/modules/data-stores/inc/stores/user-ip-schedules.php

**Access:**
Global

##jet-engine/data-stores/user-ip/schedules/event-interval

Allows changing the event interval for checking outdated records in the database.

**Args:**
- `$event_interval` - string - The event interval. Available values:  `wp_get_schedules()`. Default: `daily`.
- `$store_slug` - string - The data store slug.
- `$store` - Jet_Engine\Modules\Data_Stores\Stores\Factory - The data store instance.

**Location:**
includes/modules/data-stores/inc/stores/user-ip-schedules.php

**Access:**
Global

**Example:**
```php
add_filter( 'jet-engine/data-stores/user-ip/schedules/auto-clear-store', function( $auto_clear, $store_slug ) {

    if ( 'likes-ip-store' === $store_slug ) {
        return true;
    }
   
   return $auto_clear;
}, 10, 2 );

add_filter( 'jet-engine/data-stores/user-ip/schedules/clear-expiration', function( $clear_expiration, $store_slug ) {

    if ( 'likes-ip-store' === $store_slug ) {
        return 2 * YEAR_IN_SECONDS;
    }
   
   return $clear_expiration;
   
}, 10, 2 );

add_filter( 'jet-engine/data-stores/user-ip/schedules/event-timestamp', function( $event_timestamp, $store_slug ) {

   if ( 'likes-ip-store' === $store_slug ) {
        return 1704067200; // 2024-01-01
    }

    return $event_timestamp;
}, 10, 2 );

add_filter( 'jet-engine/data-stores/user-ip/schedules/event-interval', function( $event_interval, $store_slug ) {

    if ( 'likes-ip-store' === $store_slug ) {
        return 'weekly';
    }
   
   return $event_interval;
}, 10, 2 );
```

