# List of filters related to Wishlist widgets

## jet-compare-wishlist/jet-wishlist/css-scheme

Allows you to register additional or modify existing selectors of the Wishlist widget, which are used in the Elementor editor controls for styling various elements of the widget.

**Args:**

- `$selectors` - array - list of selectors

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/widgets/wishlist/jet-wishlist-widget.php">
includes/widgets/wishlist/jet-wishlist-widget.php</a>

**Access:**
Elementor editor only

**Example:**

```php
add_filter( 'jet-compare-wishlist/jet-wishlist/css-scheme', function( $selectors ) {
    $selectors['item'] = '.jet-wishlist .jet-wishlist-item';
    return $selectors;
} );
```

## jet-wishlist-button/wishlist-button/css-scheme

Allows you to register additional or modify existing selectors of the Wishlist Button widget, which are used in the Elementor editor controls for styling various elements of the widget.

**Args:**

- `$selectors` - array - list of selectors

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/wishlist/class-jet-cw-wishlist-integration.php">
includes/wishlist/class-jet-cw-wishlist-integration.php</a>

**Access:**
Elementor editor only

**Example:**

```php
add_filter( 'jet-wishlist-button/wishlist-button/css-scheme', function( $selectors ) {
    $selectors['button'] = '.jet-wishlist-button__link';
    return $selectors;
} );
```

## jet-wishlist-button/wishlist-count-button/css-scheme

Allows you to register additional or modify existing selectors of the Wishlist Count Button widget, which are used in the Elementor editor controls for styling various elements of the widget.

**Args:**

- `$selectors` - array - list of selectors

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/widgets/wishlist/jet-wishlist-count-button.php">
includes/widgets/wishlist/jet-wishlist-count-button.php</a>

**Access:**
Elementor editor only

**Example:**

```php
add_filter( 'jet-wishlist-button/wishlist-count-button/css-scheme', function( $selectors ) {
    $selectors['button'] = '.jet-wishlist-count-button__link';
    return $selectors;
} );
```

## jet-compare-wishlist/wishlist-template/template-content

Allows you to set custom templates for product card content in the wishlist widget.

**Args:**

- `$content` - string - product card content
- `$product` - object - product instance

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/class-jet-cw-widgets-functions.php">
includes/class-jet-cw-widgets-functions.php</a>

**Access:**
Frontend only

**Example:**

```php
add_filter( 'jet-compare-wishlist/wishlist-template/template-content', function( $content, $product ) {
    if ( ! $product ) {
        return $content;
    }
    
    global $post;
    
    $post    = get_post( $product->get_id() );
    $classes = [ 'jet-woo-builder-product', 'jet-woo-builder-archive-item-' . $product->get_id() ];
    
    if ( filter_var( jet_woo_builder_settings()->get( 'enable_product_thumb_effect' ), FILTER_VALIDATE_BOOLEAN ) ) {
        $classes[] = 'jet-woo-thumb-with-effect';
    }
    
    setup_postdata( $post );
    
    $content = jet_woo_builder()->parser->get_template_content( $this->current_wishlist_template, false, $product );
    $content = apply_filters( 'jet-woo-builder/elementor-views/frontend/archive-item-content', $content, $this->current_wishlist_template, $product );
    
    wp_reset_postdata();
    
    return sprintf( '<div class="%s" data-product-id="%s">%s</div>', implode( ' ', $classes ), $product->get_id(), $content );
} );
```

## jet-cw/wishlist/empty_text

Allows you to edit the message shown when there are no products in the wishlist. The message is displayed in the wishlist widget if no products have been added to the wishlist.

**Args:**

- `$empty_text` - string - message for an empty list

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/class-jet-cw-widgets-functions.php">
includes/class-jet-cw-widgets-functions.php</a>

**Access:**
Frontend only

**Example:**

```php
add_filter( 'jet-cw/wishlist/empty_text', function( $empty_text ) {
    $empty_text = str_replace( '&quot;', '"', $empty_text );
    $empty_text = str_replace( '\\', '"', $empty_text );
    
    return do_shortcode( $empty_text );
} );
```

## jet-cw/wishlist/in-wishlist

Allows checking and modifying the status of a product in the wishlist.

**Args:**

- `$status` - boolean - product status according to the wishlist
- `$product_id` - string/id - product identifier
- `$compare_products` - array - list of products for comparison

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/class-jet-cw-widgets-functions.php">
includes/class-jet-cw-widgets-functions.php</a>

**Access:**
Frontend only

**Example:**

```php
add_filter( 'jet-cw/wishlist/in-wishlist', function( $status, $product_id, $compare_products ) {
    $type         = apply_filters( 'wpml_element_type', get_post_type( $product_id ) );
    $trid         = apply_filters( 'wpml_element_trid', false, $product_id, $type );
    $translations = apply_filters( 'wpml_get_element_translations', [], $trid, $type );
    
    foreach ( $translations as $lang => $translation ) {
        if ( in_array( $translation->element_id, $compare_products ) ) {
            $status = true;
        }
    }
    
    return $status;
} );
```

## jet-cw/wishlist/localized-data

Allows registering custom and modifying existing data for JavaScript variables in the localized script.

**Args:**

- `$localized_data` - array - list of data

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/wishlist/class-jet-cw-wishlist-data.php">
includes/wishlist/class-jet-cw-wishlist-data.php</a>

**Access:**
Frontend only

**Example:**

```php
add_filter( 'jet-cw/wishlist/localized-data', function( $localized_data ) {
    if ( isset( $localized_data['wishlistItemsCount'] ) ) {
        unset( $localized_data['wishlistItemsCount'] );
    }
    
    return $localized_data;
} );
```

## jet-cw/wishlist/product-id

Allows modifying the product ID from the wishlist before retrieving the full list of wishlist products.

**Args:**

- `$product_id` - string/id - product identifier

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/class-jet-cw-widgets-functions.php">
includes/class-jet-cw-widgets-functions.php</a>

**Access:**
Global

**Example:**

```php
add_filter( 'jet-cw/wishlist/product-id', function( $product_id ) {
    return apply_filters( 'wpml_object_id', $product_id, 'product', true );
} );
```