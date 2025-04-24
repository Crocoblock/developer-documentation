# List of actions related to Compare widgets

## jet-cw/compare/render/get-content/{$widget_type}

Triggers when the comparison list is updated. It is intended for rendering the widget content related to the comparison list, which is not handled by the plugin's logic.

**Args:**

- `$widget_setting` - array - list of widget settings
- `$product_id` - string|int - product ID

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/compare/class-jet-cw-compare-render.php">
includes/compare/class-jet-cw-compare-render.php</a>

**Access:**
Frontend only

**Example:**

```php
add_action( 'jet-cw/compare/render/get-content/{$widget_type}', function( $widget_setting, $product_id ) {
  // processing parameters passed via the hook.
    ?>
    <div class="...">
        <!-- структура віджета, основана на оброблених параметрах. -->
    </div>
    <?php
}, 10, 2 );
```

## jet-cw/compare/render/before-add-to-compare

Triggered right before the comparison list is updated. Intended for additional data processing or injecting custom logic.

**Args:**

- `$product_id` - string|int - Product ID  
- `$context` - string - The context of the list update (add or remove)  
- `$render` - Jet_CW_Compare_Render - Instance of the Jet_CW_Compare_Render class

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/compare/class-jet-cw-compare-render.php">
includes/compare/class-jet-cw-compare-render.php</a>

**Access:**
Frontend only

**Example:**

```php
add_action( 'jet-cw/compare/render/before-add-to-compare', function( $product_id, $context, $render ) {
    // Check if the user logged in
    if ( ! is_user_logged_in() ) {
        wp_redirect( 'https://example.com/new-page' ); // Redirect to another page using the WordPress function.
    exit; // Make sure `exit` is called after `wp_redirect`.

    }
}, 10, 3 );
```