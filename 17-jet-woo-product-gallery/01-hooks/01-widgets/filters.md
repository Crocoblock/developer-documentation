# List of filters related to widgets

## jet-woo-product-gallery/base/css-scheme
Allows registering additional or modifying existing base selectors for gallery widgets used in Elementor editor controls to style different widget elements.

**Args:**

- `$selectors` - array - list of selectors

**Location:**
<a href="https://github.com/ZemezLab/jet-woo-product-gallery/blob/master/includes/components/elementor-views/widget-base.php">
includes/components/elementor-views/widget-base.php</a>

**Access:**
Elementor editor only

**Example:**

```php
add_filter( 'jet-woo-product-gallery/base/css-scheme', function( $selectors ) {
    $selectors['item'] = '.jet-gallery-item';
    
    return $selectors;
} );
```

## jet-woo-product-gallery-anchor-nav/css-scheme
Allows registering additional or modifying existing base selectors for the Anchor Nav Gallery widget used in Elementor editor controls to style different elements of the widget.

**Args:**

- `$selectors` - array - list of selectors

**Location:**
<a href="https://github.com/ZemezLab/jet-woo-product-gallery/blob/master/includes/components/elementor-views/widgets/jet-woo-product-gallery-anchor-nav.php">
includes/components/elementor-views/widgets/jet-woo-product-gallery-anchor-nav.php</a>

**Access:**
Elementor editor only

**Example:**

```php
add_filter( 'jet-woo-product-gallery-anchor-nav/css-scheme', function( $selectors ) {
    $selectors['item'] = '.jet-gallery-anchor-nav-item';
    
    return $selectors;
} );
```

## jet-woo-product-gallery-grid/css-scheme
Allows registering additional or modifying existing base selectors for the Gallery Grid widget used in Elementor editor controls to style different elements of the widget.

**Args:**

- `$selectors` - array - list of selectors

**Location:**
<a href="https://github.com/ZemezLab/jet-woo-product-gallery/blob/master/includes/components/elementor-views/widgets/jet-woo-product-gallery-grid.php">
includes/components/elementor-views/widgets/jet-woo-product-gallery-grid.php</a>

**Access:**
Elementor editor only

**Example:**

```php
add_filter( 'jet-woo-product-gallery-grid/css-scheme', function( $selectors ) {
    $selectors['item'] = '.jet-gallery-grid-item';
    
    return $selectors;
} );
```

## jet-woo-product-gallery-modern/css-scheme
Allows registering additional or modifying existing base selectors for the Gallery Modern widget used in Elementor editor controls to style different elements of the widget.

**Args:**

- `$selectors` - array - list of selectors

**Location:**
<a href="https://github.com/ZemezLab/jet-woo-product-gallery/blob/master/includes/components/elementor-views/widgets/jet-woo-product-gallery-modern.php">
includes/components/elementor-views/widgets/jet-woo-product-gallery-modern.php</a>

**Access:**
Elementor editor only

**Example:**

```php
add_filter( 'jet-woo-product-gallery-modern/css-scheme', function( $selectors ) {
    $selectors['item'] = '.jet-gallery-modern-item';
    
    return $selectors;
} );
```

## jet-woo-product-gallery-slider/css-scheme
Allows registering additional or modifying existing base selectors for the Gallery Slider widget used in Elementor editor controls to style different elements of the widget.

**Args:**

- `$selectors` - array - list of selectors

**Location:**
<a href="https://github.com/ZemezLab/jet-woo-product-gallery/blob/master/includes/components/elementor-views/widgets/jet-woo-product-gallery-slider.php">
includes/components/elementor-views/widgets/jet-woo-product-gallery-slider.php</a>

**Access:**
Elementor editor only

**Example:**

```php
add_filter( 'jet-woo-product-gallery-slider/css-scheme', function( $selectors ) {
    $selectors['item'] = '.jet-gallery-slider-item';
    
    return $selectors;
} );
```
