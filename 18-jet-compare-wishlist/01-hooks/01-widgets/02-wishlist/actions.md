# List of actions related to Wishlist widgets

## jet-cw/wishlist/render/get-content/{$widget_type}

Fires when the wishlist list is updated. It is designed for rendering content of the widget related to the wishlist, the processing of which is not covered by the plugin's logic.

**Args:**

- `$widget_setting` - array - list of widget settings
- `$product_id` - string|int - product ID

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/wishlist/class-jet-cw-wishlist-render.php">
includes/wishlist/class-jet-cw-wishlist-render.php</a>

**Access:**
Frontend only

**Example:**

```php
add_action( 'jet-cw/wishlist/render/get-content/{$widget_type}', function( $widget_setting, $product_id ) {
    // Processing parameters passed by the hook.
    ?>
    <div class="...">
        <!-- структура віджета, основана на оброблених параметрах. -->
    </div>
    <?php
}, 10, 2 );
```

## jet-cw/wishlist/render/before-add-to-wishlist

Fires right before the wishlist list is updated. It is designed for additional data processing and introducing new logic.

**Args:**

- `$product_id` - string|int - product ID
- `$context` - string - context of the update type (addition or removal)
- `$render` - Jet_CW_Wishlist_Render - instance of the Jet_CW_Wishlist_Render class

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/wishlist/class-jet-cw-wishlist-render.php">
includes/wishlist/class-jet-cw-wishlist-render.php</a>

**Access:**
Frontend only

**Example:**

```php
add_action( 'jet-cw/wishlist/render/before-add-to-wishlist', function( $product_id, $context, $render ) {
    // Checks if the user logged in.
    if ( ! is_user_logged_in() ) {
        wp_redirect( 'https://example.com/new-page' ); // Redirect to another page using the WordPress function.
    exit; // Make sure `exit` is called after `wp_redirect`.
    }
}, 10, 3 );
```