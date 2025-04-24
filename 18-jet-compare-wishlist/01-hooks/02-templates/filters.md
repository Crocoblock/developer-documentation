# List of filters related to plugin templates

## jet-cw/template-functions/add-to-cart-settings

Allows modifying the arguments for the add to cart button used in widgets.

**Args:**

- `$settings` - object - list of settings

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/class-jet-cw-functions.php">
includes/class-jet-cw-functions.php</a>

**Access:**
Frontend only

**Example:**

```php
add_filter( 'jet-cw/template-functions/add-to-cart-settings', function( $settings ) {
    $settings['attributes']['target'] = '_blank';
    return $settings;
} );
```

## jet-cw/template-functions/categories

Allows modifying the markup and appearance of product categories in widgets.

**Args:**

- `$categories` - string - categories markup

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/class-jet-cw-functions.php">
includes/class-jet-cw-functions.php</a>

**Access:**
Frontend only

**Example:**

```php
add_filter( 'jet-cw/template-functions/categories', function( $categories ) {
    $categories = sprintf( '<div class="custom-wrapper">%s</div>', $categories );
    return $categories;
} );
```

## jet-cw/template-functions/compare-custom-field/ . $field_key

Allows modifying the field value by the specified field identifier `$field_key`, as well as changing the appearance and output method.

**Args:**

- `$field_value` - mixed - field value

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/class-jet-cw-functions.php">
includes/class-jet-cw-functions.php</a>

**Access:**
Frontend only

**Example:**

```php
add_filter( 'jet-cw/template-functions/compare-custom-field/__additional_params', function( $field_value ) {
    $field_value = jet_engine_render_checkbox_values($field_value);
    return $field_value;
} );
```

## jet-cw/template-functions/compare-remove

Allows modifying the markup and appearance of the remove button from the comparison list.

**Args:**

- `$button` - string - button markup

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/class-jet-cw-functions.php">
includes/class-jet-cw-functions.php</a>

**Access:**
Frontend only

**Example:**

```php
add_filter( 'jet-cw/template-functions/compare-remove', function( $button ) {
    $button = sprintf( '<div class="custom-wrapper">%s</div>', $button );
    return $button;
} );
```

## jet-cw/template-functions/description

Allows modifying the markup and appearance of product descriptions in widgets.

**Args:**

- `$description` - string - description markup

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/class-jet-cw-functions.php">
includes/class-jet-cw-functions.php</a>

**Access:**
Frontend only

**Example:**

```php
add_filter( 'jet-cw/template-functions/description', function( $description ) {
    $description = sprintf( '<div class="custom-wrapper">%s</div>', $description );
    return $description;
} );
```

## jet-cw/template-functions/dimension

Allows modifying the markup and appearance of product dimensions in widgets.

**Args:**

- `$dimensions` - string - dimensions markup

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/class-jet-cw-functions.php">
includes/class-jet-cw-functions.php</a>

**Access:**
Frontend only

**Example:**

```php
add_filter( 'jet-cw/template-functions/dimension', function( $dimensions ) {
    $dimensions = sprintf( '<div class="custom-wrapper">%s</div>', $dimensions );
    return $dimensions;
} );
```

## jet-cw/template-functions/excerpt

Allows modifying the markup and appearance of product short descriptions in widgets.

**Args:**

- `$excerpt` - string - short description markup

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/class-jet-cw-functions.php">
includes/class-jet-cw-functions.php</a>

**Access:**
Frontend only

**Example:**

```php
add_filter( 'jet-cw/template-functions/excerpt', function( $excerpt ) {
    $excerpt = sprintf( '<div class="custom-wrapper">%s</div>', $excerpt );
    return $excerpt;
} );
```

## jet-cw/template-functions/exclude-attributes

Allows modifying the list of excluded product attributes displayed in widgets.

**Args:**

- `$exclude_attributes` - array - list of excluded attributes
- `$products` - array - list of products

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/class-jet-cw-widgets-functions.php">
includes/class-jet-cw-widgets-functions.php</a>

**Access:**
Frontend only

**Example:**

```php
add_filter( 'jet-cw/template-functions/exclude-attributes', function( $exclude_attributes, $products ) {
    foreach ( $products as $product ) {
        if ( '123' === $product->get_id() ) {
            $exclude_attributes = [];
        }
    }
    
    return $exclude_attributes;
}, 10, 2 );
```

## jet-cw/template-functions/price

Allows modifying the markup and appearance of product prices in widgets.

**Args:**

- `$price` - string - price markup

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/class-jet-cw-functions.php">
includes/class-jet-cw-functions.php</a>

**Access:**
Frontend only

**Example:**

```php
add_filter( 'jet-cw/template-functions/price', function( $price ) {
    $price = sprintf( '<div class="custom-wrapper">%s</div>', $price );
    return $price;
} );
```

## jet-cw/template-functions/rating

Allows modifying the markup and appearance of product ratings in widgets.

**Args:**

- `$rating` - string - rating markup

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/class-jet-cw-functions.php">
includes/class-jet-cw-functions.php</a>

**Access:**
Frontend only

**Example:**

```php
add_filter( 'jet-cw/template-functions/rating', function( $rating ) {
    $rating = sprintf( '<div class="custom-wrapper">%s</div>', $rating );
    return $rating;
} );
```

## jet-cw/template-functions/sku

Allows modifying the markup and appearance of the product SKU (Stock Keeping Unit) in widgets.

**Args:**

- `$sku` - string - SKU markup

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/class-jet-cw-functions.php">
includes/class-jet-cw-functions.php</a>

**Access:**
Frontend only

**Example:**

```php
add_filter( 'jet-cw/template-functions/sku', function( $sku ) {
    $sku = sprintf( '<div class="custom-wrapper">%s</div>', $sku );
    return $sku;
} );
```

## jet-cw/template-functions/stock-status

Allows modifying the markup and appearance of the stock status of products in widgets.

**Args:**

- `$stock_status` - string - stock status markup

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/class-jet-cw-functions.php">
includes/class-jet-cw-functions.php</a>

**Access:**
Frontend only

**Example:**

```php
add_filter( 'jet-cw/template-functions/stock-status', function( $stock_status ) {
    $stock_status = sprintf( '<div class="custom-wrapper">%s</div>', $stock_status );
    return $stock_status;
} );
```

## jet-cw/template-functions/tags

Allows modifying the markup and appearance of product tags in widgets.

**Args:**

- `$tags` - string - tags markup

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/class-jet-cw-functions.php">
includes/class-jet-cw-functions.php</a>

**Access:**
Frontend only

**Example:**

```php
add_filter( 'jet-cw/template-functions/tags', function( $tags ) {
    $tags = sprintf( '<div class="custom-wrapper">%s</div>', $tags );
    return $tags;
} );
```

## jet-cw/template-functions/thumbnail

Allows modifying the markup and appearance of product thumbnails in widgets.

**Args:**

- `$thumbnail` - string - thumbnail markup

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/class-jet-cw-functions.php">
includes/class-jet-cw-functions.php</a>

**Access:**
Frontend only

**Example:**

```php
add_filter( 'jet-cw/template-functions/thumbnail', function( $thumbnail ) {
    $thumbnail = sprintf( '<div class="custom-wrapper">%s</div>', $thumbnail );
    return $thumbnail;
} );
```

## jet-cw/template-functions/title

Allows modifying the markup and appearance of product titles in widgets.

**Args:**

- `$title` - string - title markup

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/class-jet-cw-functions.php">
includes/class-jet-cw-functions.php</a>

**Access:**
Frontend only

**Example:**

```php
add_filter( 'jet-cw/template-functions/title', function( $title ) {
    $title = sprintf( '<div class="custom-wrapper">%s</div>', $title );
    return $title;
} );
```

## jet-cw/template-functions/visible-attributes

Allows modifying the list of visible product attributes displayed in widgets.

**Args:**

- `$visible_attributes` - array - list of visible attributes
- `$products` - array - list of products

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/class-jet-cw-functions.php">
includes/class-jet-cw-functions.php</a>

**Access:**
Frontend only

**Example:**

```php
add_filter( 'jet-cw/template-functions/visible-attributes', function( $visible_attributes, $products ) {
    foreach ( $products as $product ) {
        if ( '123' === $product->get_id() ) {
            $exclude_attributes = [];
        }
    }
    
    return $exclude_attributes;
}, 10, 2 );
```

## jet-cw/template-functions/weight

Allows modifying the markup and appearance of product weights in widgets.

**Args:**

- `$weight` - string - weight markup

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/class-jet-cw-functions.php">
includes/class-jet-cw-functions.php</a>

**Access:**
Frontend only

**Example:**

```php
add_filter( 'jet-cw/template-functions/weight', function( $weight ) {
    $weight = sprintf( '<div class="custom-wrapper">%s</div>', $weight );
    return $weight;
} );
```

## jet-cw/template-functions/wishlist-remove

Allows modifying the markup and appearance of the product removal button from the wishlist.

**Args:**

- `$button` - string - button markup

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/class-jet-cw-functions.php">
includes/class-jet-cw-functions.php</a>

**Access:**
Frontend only

**Example:**

```php
add_filter( 'jet-cw/template-functions/wishlist-remove', function( $button ) {
    $button = sprintf( '<div class="custom-wrapper">%s</div>', $button );
    return $button;
} );
```

## jet-cw/template-path

Allows modifying the path to the plugin's templates.

**Args:**

- `$template_path` - string - path to the templates

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/jet-cw.php">jet-cw.php</a>

**Access:**
Global

**Example:**

```php
add_filter( 'jet-cw/template-path', function( $template_path ) {
    $template_path .= '/widgets/';
    return $template_path;
} );
```
