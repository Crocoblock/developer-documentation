# JetPopup
**Location:** /includes/compatibility/packages/jet-popup.php

## jet-engine/compatibility/popup-package/set-queried-object

Determines whether to attempt setting the queried object when loading a popup with the Is Listing Popup option enabled.
Was added in https://github.com/Crocoblock/issues-tracker/issues/9853
 in case it ever becomes necessary to disable this feature
(so far there has been no need, we’ll see if there will be cases in support)

**Args:**

* `$set` - boolean, whether to set the object or not
* `$popup_data` - array, query parameters passed from JetPopup

**Example:**

Do not set the object in the popup with ID 12345
```php
add_filter( 'jet-engine/compatibility/popup-package/set-queried-object', function( $set, $popup_data ) {
    $popup_id = ( int ) $popup_data['popup_id'];

    if ( $popup_id === 12345 ) {
        $set = false;
    }

    return $set;
}, 10, 2 );
```

## jet-engine/compatibility/popup-package/query/{$query->query_type}/post-object

Determines which object will be used in the listing popup as the current object if the source in the listing is a query

**Args:**

* `$post_obj` - object, the object that will be set as the current object
* `$popup_data` - array, query parameters passed from JetPopup
* `$query` - \Jet_Engine\Query_Builder\Queries\Base_Query includes/components/query-builder/queries/base.php


**Example:**

Suppose that in a `custom-type` query each object has a unique ID in the `index` property in the format `{$query_id}-{$index}`, i.e. `123-0`, `123-1`, `123-2`, ...

```php
add_filter( 'jet-engine/compatibility/popup-package/query/custom-type/post-object', function( $post_obj, $popup_data, $query ) {
    //object ID in listing, e.g., 123-1
    $item_index = $popup_data['postId'];

    //go through query items untill find an item with the required index
    foreach ( $query->get_items() as $item ) {
        if ( $item->index === $item_index ) {
            $post_obj = $item;
            break;
        }
    }

    return $post_obj;
}, 10, 2 );
```

## jet-engine/compatibility/popup-package/query/{$query->query_type}/post-object

Determines which object will be used in the listing popup as the current object.
Since this filter appears in the code later than `jet-engine/compatibility/popup-package/query/{$query->query_type}/post-object`, it overrides its result.

**Args:**

* `$post_obj` - object, the object that will be set as the current object
* `$popup_data` - array, query parameters passed from JetPopup

**Example:**

Get a WooCommerce product by post ID, and if it exists — set it as the current object

```php
add_filter(
  'jet-engine/compatibility/popup-package/post-object',
  function( $post_obj, $popup_data) {
    $source = ! empty( $popup_data['listingSource'] ) ? $popup_data['listingSource'] : 'posts';

    if ( ! in_array( $source, array( 'posts', 'WP_Post' ) ) ) {
        return $post_obj;
    }

    $product = wc_get_product( $popup_data['postId'] );
    
    if ( $product ) {
        $post_obj = $product;
    }
    
    return $post_obj;
  }, 10, 2
);
```

