# List of filters related to Compare widgets

## jet-compare-button/compare-button/css-scheme

Allows you to register additional or modify existing selectors of the Compare Button widget, which are used in  
Elementor editor controls to style various elements of the widget.

**Args:**

- `$selectors` - array - list of selectors

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/compare/class-jet-cw-compare-integration.php">
includes/compare/class-jet-cw-compare-integration.php</a>

**Access:**
Elementor editor only

**Example:**

```php
add_filter( 'jet-compare-button/compare-button/css-scheme', function( $selectors ) {
    $selectors['button'] = '.jet-compare-button__link';
    return $selectors;
} );
```

## jet-compare-button/compare-count-button/css-scheme

Allows you to register additional or modify existing selectors of the Compare Count Button widget, which  
are used in the Elementor editor controls to style various elements of the widget.

**Args:**

- `$selectors` - array - list of selectors

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/widgets/compare/jet-compare-count-button.php">
includes/widgets/compare/jet-compare-count-button.php</a>

**Access:**
Elementor editor only

**Example:**

```php
add_filter( 'jet-compare-button/compare-count-button/css-scheme', function( $selectors ) {
    $selectors['button'] = '.jet-compare-count-button__link';
    return $selectors;
} );
```

## jet-compare-wishlist/jet-compare/css-scheme

Allows you to register additional or modify existing selectors of the Compare widget, which are used in the Elementor editor controls to style various elements of the widget.

**Args:**

- `$selectors` - array - list of selectors

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/widgets/compare/jet-compare-widget.php">
includes/widgets/compare/jet-compare-widget.php</a>

**Access:**
Elementor editor only

**Example:**

```php
add_filter( 'jet-compare-wishlist/jet-compare/css-scheme', function( $selectors ) {
    $selectors['compare-table'] = '.jet-compare-table';
    return $selectors;
} );
```

## jet-cw/compare/empty_text

Allows you to edit the message about the absence of products in the comparison list. The message is displayed in the comparison table widget if no products have been added to the comparison list.

**Args:**

- `$empty_text` - string - empty list message

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/class-jet-cw-widgets-functions.php">
includes/class-jet-cw-widgets-functions.php</a>

**Access:**
Frontend only

**Example:**

```php
add_filter( 'jet-cw/compare/empty_text', function( $empty_text ) {
    $empty_text = str_replace( '&quot;', '"', $empty_text );
    $empty_text = str_replace( '\\', '"', $empty_text );
    
    return do_shortcode( $empty_text );
} );
```

## jet-cw/compare/in-compare

Allows you to check and modify the product status in the comparison list.

**Args:**

- `$status` - boolean - product status according to the comparison list  
- `$product_id` - string/id - product identifier  
- `$compare_products` - array - list of products for comparison

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/class-jet-cw-widgets-functions.php">
includes/class-jet-cw-widgets-functions.php</a>

**Access:**
Frontend only

**Example:**

```php
add_filter( 'jet-cw/compare/in-compare', function( $status, $product_id, $compare_products ) {
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

## jet-cw/compare/localized-data

Allows you to register your own data and modify existing ones for JavaScript variables in the localized script.

**Args:**

- `$localized_data` - array - list of data

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/compare/class-jet-cw-compare-data.php">
includes/compare/class-jet-cw-compare-data.php</a>

**Access:**
Frontend only

**Example:**

```php
add_filter( 'jet-cw/compare/localized-data', function( $localized_data ) {
    if ( isset( $localized_data['compareMaxItems'] ) ) {
        unset( $localized_data['compareMaxItems'] );
    }
    
    return $localized_data;
} );
```

## jet-cw/compare/product-id

Allows modifying the product ID from the comparison list before retrieving the full comparison list of products.

**Args:**

- `$product_id` - string/id - product identifier

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/class-jet-cw-widgets-functions.php">
includes/class-jet-cw-widgets-functions.php</a>

**Access:**
Global

**Example:**

```php
add_filter( 'jet-cw/compare/product-id', function( $product_id ) {
    return apply_filters( 'wpml_object_id', $product_id, 'product', true );
} );
```

## jet-cw/widgets/compare/empty-item-fallback

Allows modifying the fallback value for what will be displayed when a product has no attributes in the comparison table.

**Args:**

- `$fallback` - string - fallback output string
- `$product` - WC_Product - product instance in the comparison

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/class-jet-cw-widgets-functions.php">
includes/class-jet-cw-widgets-functions.php</a>

**Access:**
Elementor editor, Frontend

**Example:**

```php
add_filter( 'jet-cw/widgets/compare/empty-item-fallback', function ( $fallback, $product ) {
    $fallback = __( 'Empty item fallback', 'jet-cw' );
    
    return $fallback;
}, 10, 2);
```