# List of filters related to widgets render

## jet-gallery/render/attachments-id
Allows adding image IDs for their subsequent display in gallery widgets when the gallery source is a custom solution.

**Args:**

- `$attachment_ids` - array - list of image IDs
- `$settings` - array - list of gallery widget settings

**Location:**
<a href="https://github.com/ZemezLab/jet-woo-product-gallery/blob/master/includes/render/base.php">
includes/render/base.php</a>

**Access:**
Global

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
Allows modifying the placeholder for the main gallery image.

**Args:**

- `$placeholder_image` - string - image URL

**Location:**
<a href="https://github.com/ZemezLab/jet-woo-product-gallery/blob/master/includes/render/base.php">
includes/render/base.php</a>

**Access:**
Global

**Example:**

```php
add_filter( 'jet-gallery/render/get_placeholder_image_src', function( $placeholder_image ) {
    $placeholder_image = wp_get_attachment_url( 12 );
    
    return $placeholder_image;
} );
```

## jet-gallery/render/image-attr
Allows modifying the list of HTML attributes (add, update, remove) for gallery images.

**Args:**

- `$attr` - array - list of initial attributes
- `$id` - string|int - image ID
- `$size` - string - image size
- `$main` - boolean - image type identifier

**Location:**
<a href="https://github.com/ZemezLab/jet-woo-product-gallery/blob/master/includes/render/base.php">
includes/render/base.php</a>

**Access:**
Global

**Example:**

```php
add_filter( 'jet-gallery/render/image-attr', function( $attr, $id, $size, $main ) {
    if ( ! $main && 'thumbnail' === $size ) {
        $attr['data-lazy-load'] = true;
    }
    
    return $attr;
}, 10, 4 );
```

## jet-gallery/render/variation-images
Allows modifying variation product image information in HTML attributes of gallery widgets.

**Args:**

- `$variation_images` - array - list of product variation images
- `$post` - WP_Post - current post
- `$size` - WC_Product - current product
- `$settings` - array - list of gallery widget settings

**Location:**
<a href="https://github.com/ZemezLab/jet-woo-product-gallery/blob/master/includes/render/base.php">
includes/render/base.php</a>

**Access:**
Global

**Example:**

```php
add_filter( 'jet-gallery/render/image-attr', function( $variation_images, $post, $_product, $settings ) {
    if ( $_product->is_type( 'variable' ) ) {
        $variation_images = [];
    }
    
    return $variation_images;
}, 10, 4 );
```

## jet-gallery/render/wrapper-attrs
Allows modifying the HTML attributes of the gallery widget wrapper.

**Args:**

- `$attrs` - array - list of attributes
- `$render_instance` - Jet_Gallery_Render_Base - render instance

**Location:**
<a href="https://github.com/ZemezLab/jet-woo-product-gallery/blob/master/includes/render/base.php">
includes/render/base.php</a>

**Access:**
Global

**Example:**

```php
add_filter( 'jet-gallery/render/wrapper-attrs', function( $attrs, $render_instance ) {
    if ( 'blocks' !== $render_instance->get_editor_type() ) {
        return $attrs;
    }

    $attrs['class'] .= ' blocks-jet-woo-product-' . $render_instance->get_gallery_type();

    return $attrs;
}, 10, 2 );
```

## jet-woo-product-gallery/slider/arrows-format
Allows changing the HTML format for the gallery carousel navigation arrows.

**Args:**

- `$arrow_format` - string - format string

**Location:**
<a href="https://github.com/ZemezLab/jet-woo-product-gallery/blob/master/includes/render/base.php">
includes/render/base.php</a>

**Access:**
Global

**Example:**

```php
add_filter( 'jet-woo-product-gallery/slider/arrows-format', function( $arrow_format ) {
    $arrow_format = '<div class="arrow-wrapper">' . $arrow_format . '</div>';

    return $arrow_format;
} );
```

## jet-woo-product-gallery/slider/options
Allows changing the gallery carousel parameters. For a more detailed understanding of which options and how they can be modified, refer to [Swiper API](https://swiperjs.com/swiper-api).

**Args:**

- `$options` - array - list of gallery parameters
- `$settings` - array - list of gallery widget settings

**Location:**
<a href="https://github.com/ZemezLab/jet-woo-product-gallery/blob/master/includes/render/gallery-slider.php">
includes/render/gallery-slider.php</a>

**Access:**
Frontend

**Example:**

```php
add_filter( 'jet-woo-product-gallery/slider/options', function( $options, $settings ) {
    $options['autoplay'] = [ 'delay' => 1000 ];
    
    return $options;
}, 10, 2 );
```

## jet-woo-product-gallery/slider/pre-options
Allows modifying the carousel settings list before the main parameter list is formed.

**Args:**

- `$slider_settings` - array - list of carousel settings
- `$settings` - array - list of gallery widget settings

**Location:**
<a href="https://github.com/ZemezLab/jet-woo-product-gallery/blob/master/includes/render/gallery-slider.php">
includes/render/gallery-slider.php</a>

**Access:**
Frontend

**Example:**

```php
add_filter( 'jet-woo-product-gallery/slider/pre-options', function( $slider_settings, $settings ) {
    if ( wp_is_mobile() ) {
        $slider_settings['show_pagination'] = false;
    }
    
    return $slider_settings;
}, 10, 2 );
```

## jet-woo-product-gallery/slider/thumb-options
Allows modifying the image pagination carousel parameters for the main gallery. For more detailed understanding of the available options and how to modify them, check https://swiperjs.com/swiper-api.

**Args:**

- `$thumb_options` - array - list of image pagination parameters for the gallery
- `$settings` - array - list of gallery widget settings

**Location:**
<a href="https://github.com/ZemezLab/jet-woo-product-gallery/blob/master/includes/render/gallery-slider.php">
includes/render/gallery-slider.php</a>

**Access:**
Frontend

**Example:**

```php
add_filter( 'jet-woo-product-gallery/slider/options', function( $thumb_options, $settings ) {
    $thumb_options['loop'] = false;
    
    return $thumb_options;
}, 10, 2 );
```

## jet-woo-product-gallery/frontend/localize-data
Allows registering and modifying localized data for JavaScript.

**Args:**

- `$localized_data` - array - list of initial localized data

**Location:**
<a href="https://github.com/ZemezLab/jet-woo-product-gallery/blob/master/includes/class-jet-woo-product-gallery-assets.php">
includes/class-jet-woo-product-gallery-assets.php</a>

**Access:**
Frontend

**Example:**

```php
add_filter( 'jet-woo-product-gallery/frontend/localize-data', function( $localized_data ) {
    // Масив даних, що локалізуються.
    print_r( $localized_data );

    return $localized_data;
}, 10, 2 );
```