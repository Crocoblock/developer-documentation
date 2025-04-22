# List of filters related to plugin templates

## jet-cw/template-functions/add-to-cart-settings

Дозволяє модифікувати аргументи для кнопки додавання в кошик яка використовується в віджетах.

**Args:**

- `$settings` - object - список налаштувань

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

Дозволяє модифікувати розмітку та зовнішній вигляд категорій продуктів у віджетах.

**Args:**

- `$categories` - string - розмітка категорій

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

Дозволяє модифікувати значення поля по заданому ідентифікатору поля `$field_key`, а також змінювати зовнішній вигляд та
спосіб виводу.

**Args:**

- `$field_value` - mixed - значення поля

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

Дозволяє модифікувати розмітку та зовнішній вигляд кнопки видалення зі списку порівняння.

**Args:**

- `$button` - string - розмітка кнопки

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

Дозволяє модифікувати розмітку та зовнішній вигляд опису продуктів у віджетах.

**Args:**

- `$description` - string - розмітка опису

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

Дозволяє модифікувати розмітку та зовнішній вигляд вимірів продуктів у віджетах.

**Args:**

- `$dimensions` - string - розмітка вимірів

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

Дозволяє модифікувати розмітку та зовнішній вигляд короткого опису продуктів у віджетах.

**Args:**

- `$excerpt` - string - розмітка короткого опису

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

Дозволяє модифікувати список виключених атрибутів продукту які зображаються в віджетах.

**Args:**

- `$exclude_attributes` - array - список виключених атрибутів
- `$products` - array - список продуктів

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

Дозволяє модифікувати розмітку та зовнішній вигляд ціни продуктів у віджетах.

**Args:**

- `$price` - string - розмітка ціни

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

Дозволяє модифікувати розмітку та зовнішній вигляд рейтингу продуктів у віджетах.

**Args:**

- `$rating` - string - розмітка рейтингу

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

Дозволяє модифікувати розмітку та зовнішній вигляд ідентифікатору товарної позиції продуктів у віджетах.

**Args:**

- `$sku` - string - розмітка ідентифікатору товарної позиції

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

Дозволяє модифікувати розмітку та зовнішній вигляд стану запасів продуктів у віджетах.

**Args:**

- `$stock_status` - string - розмітка стану запасів

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

Дозволяє модифікувати розмітку та зовнішній вигляд тегів продуктів у віджетах.

**Args:**

- `$tags` - string - розмітка тегів

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

Дозволяє модифікувати розмітку та зовнішній вигляд мініатюр продуктів у віджетах.

**Args:**

- `$thumbnail` - string - розмітка мініатюр

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

Дозволяє модифікувати розмітку та зовнішній вигляд назви продуктів у віджетах.

**Args:**

- `$title` - string - розмітка назви

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

Дозволяє модифікувати список видимих атрибутів продукту які зображаються в віджетах.

**Args:**

- `$visible_attributes` - array - список видимих атрибутів
- `$products` - array - список продуктів

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

Дозволяє модифікувати розмітку та зовнішній вигляд ваги продуктів у віджетах.

**Args:**

- `$weight` - string - розмітка ваги

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

Дозволяє модифікувати розмітку та зовнішній вигляд кнопки видалення продуктів зі списку бажаного.

**Args:**

- `$button` - string - розмітка кнопки

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

Дозволяє модифікувати шлях до темплейтів плагіну.

**Args:**

- `$template_path` - string - шлях до темплейтів

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
