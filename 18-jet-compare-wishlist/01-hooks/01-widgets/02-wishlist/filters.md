# List of filters related to Wishlist widgets

## jet-compare-wishlist/jet-wishlist/css-scheme

Дозволяє зареєструвати додаткові або модифікувати вже наявні селектори віджета Wishlist, які використовуються в
контролах редактору Elementor для стилізації різних елементів віджета.

**Args:**

- `$selectors` - array - список селекторів

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

Дозволяє зареєструвати додаткові або модифікувати вже наявні селектори віджета Wishlist Button, які використовуються в
контролах редактору Elementor для стилізації різних елементів віджета.

**Args:**

- `$selectors` - array - список селекторів

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

Дозволяє зареєструвати додаткові або модифікувати вже наявні селектори віджета Wishlist Count Button, які
використовуються в контролах редактору Elementor для стилізації різних елементів віджета.

**Args:**

- `$selectors` - array - список селекторів

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

Дозволяє встановлювати кастомні темплейти для контенту карток продуктів у віджеті списку бажаного. 

**Args:**

- `$content` - string - контент картки продукту
- `$product` - object - екземпляр продукту

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

Дозволяє редагувати повідомлення про відсутність продуктів в списку бажаного. Повідомлення зображатися в віджеті
бажаного, якщо в список бажаного не було додано жодного продукту.

**Args:**

- `$empty_text` - string - повідомлення про порожній список

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

Дозволяє перевірити та модифікувати статус продукту в списку бажаного.

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

Дозволяє зареєструвати власні, а також модифікувати вже наявні дані для JavaScript змінних у локалізованому скрипті.

**Args:**

- `$localized_data` - array - список даних

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

Дозволяє модифікувати ідентифікатор продукту зі списку бажаного перед тим як отримати повний список бажаних продуктів.

**Args:**

- `$product_id` - string/id - ідентифікатор продукту

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