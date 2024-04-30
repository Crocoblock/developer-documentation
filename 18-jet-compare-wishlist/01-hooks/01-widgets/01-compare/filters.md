# List of filters related to Compare widgets

## jet-compare-button/compare-button/css-scheme

Дозволяє зареєструвати додаткові або модифікувати вже наявні селектори віджета Compare Button, які використовуються в
контролах редактору Elementor для стилізації різних елементів віджета.

**Args:**

- `$selectors` - array - список селекторів

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

Дозволяє зареєструвати додаткові або модифікувати вже наявні селектори віджета Compare Count Button, які
використовуються в контролах редактору Elementor для стилізації різних елементів віджета.

**Args:**

- `$selectors` - array - список селекторів

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

Дозволяє зареєструвати додаткові або модифікувати вже наявні селектори віджета Compare, які використовуються в контролах
редактору Elementor для стилізації різних елементів віджета.

**Args:**

- `$selectors` - array - список селекторів

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

Дозволяє редагувати повідомлення про відсутність продуктів в списку порівняння. Повідомлення зображатися в віджеті
таблиці порівняння, якщо в список порівняння не було додано жодного продукту.

**Args:**

- `$empty_text` - string - повідомлення про порожній список

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

Дозволяє перевірити та модифікувати статус продукту в списку порівняння.

**Args:**

- `$status` - boolean - статус продукту відповідно списку порівняння
- `$product_id` - string/id - ідентифікатор продукту
- `$compare_products` - array - список продуктів для порівняння

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

Дозволяє зареєструвати власні, а також модифікувати вже наявні дані для JavaScript змінних у локалізованому скрипті.

**Args:**

- `$localized_data` - array - список даних

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

Дозволяє модифікувати ідентифікатор продукту зі списку порівняння перед тим як отримати повний список продуктів порівняння.

**Args:**

- `$product_id` - string/id - ідентифікатор продукту

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