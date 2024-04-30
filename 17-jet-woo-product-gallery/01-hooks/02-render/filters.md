# List of filters related to widgets render

## jet-gallery/render/attachments-id
Дозволяє додати ідентифікатори картинок для їх подальшого показу в віджетах галереї в випадку коли джерелом галереї виступає
кастомне рішення.

**Args:**

- `$attachment_ids` - array - список ідентифікаторів картинок
- `$settings` - array - список налаштувань віджету галереї

**Location:**
<a href="https://github.com/ZemezLab/jet-woo-product-gallery/blob/master/includes/render/base.php">
includes/render/base.php</a>

**Access:**
global

**Example:**

```php
add_filter( 'jet-gallery/render/attachments-id', function( $attachment_ids, $settings ) {

    if ( '__gallery_source_key' === $settings['gallery_source'] ) { // for example - options_page
        $attachment_ids = get_option( '__option_gallery_attachments_key' ); // your options gallery key.
    }
    
    return $attachment_ids;
    
}, 10, 2 );
```

## jet-gallery/render/get_placeholder_image_src
Дає можливість модифікувати заповнювач головного зображення галереї.

**Args:**

- `$placeholder_image` - string - адреса зображення

**Location:**
<a href="https://github.com/ZemezLab/jet-woo-product-gallery/blob/master/includes/render/base.php">
includes/render/base.php</a>

**Access:**
global

**Example:**

```php
add_filter( 'jet-gallery/render/get_placeholder_image_src', function( $placeholder_image ) {

    $placeholder_image = wp_get_attachment_url( 12 );
    
    return $placeholder_image;
    
} );
```

## jet-gallery/render/image-attr
Дозволяє модифікувати список HTML атрибутів (додати, оновити, видалити) для зображень галереї.

**Args:**

- `$attr` - array - список початкових атрибутів
- `$id` - string|int - ідентифікатор зображення
- `$size` - string - розмір зображення
- `$main` - boolean - ідентифікатор типу зображення

**Location:**
<a href="https://github.com/ZemezLab/jet-woo-product-gallery/blob/master/includes/render/base.php">
includes/render/base.php</a>

**Access:**
global

**Example:**

```php
add_filter( 'jet-gallery/render/image-attr', function( $attr, $id, $size, $main ) {

    if ( ! $main && 'thumbnail' === $size ) {
        $attr['data-lazy-load'] = true;
    }
    
    return $attr;
    
} );
```

## jet-gallery/render/variation-images
Дозволяє модифікувати інформацію про зображення варіації продукту в HTML атрибутах віджетів галерей.

**Args:**

- `$variation_images` - array - список зображень варіацій продукту
- `$post` - WP_Post - поточний пост
- `$size` - WC_Product - поточний продукт
- `$settings` - array - список налаштувань віджету галереї

**Location:**
<a href="https://github.com/ZemezLab/jet-woo-product-gallery/blob/master/includes/render/base.php">
includes/render/base.php</a>

**Access:**
global

**Example:**

```php
add_filter( 'jet-gallery/render/image-attr', function( $variation_images, $post, $_product, $settings ) {

    if ( $_product->is_type( 'variable' ) ) {
        $variation_images = [];
    }
    
    return $variation_images;
    
} );
```

## jet-gallery/render/wrapper-attrs

## jet-woo-product-gallery/slider/arrows-format

## jet-woo-product-gallery/slider/options

## jet-woo-product-gallery/slider/pre-options

## jet-woo-product-gallery/slider/thumb-options
