# List of filters related to widgets

## jet-woo-product-gallery/base/css-scheme
Дозволяє зареєструвати додаткові або модифікувати вже наявні базові селектори для віджетів галереї, які використовуються в контролах редактору Elementor для стилізації різних елементів віджетів.

**Args:**

- `$selectors` - array - список селекторів

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
Дозволяє зареєструвати додаткові або модифікувати вже наявні базові селектори для віджету Anchor Nav Gallery, які використовуються в контролах редактору Elementor для стилізації різних елементів віджету.

**Args:**

- `$selectors` - array - список селекторів

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
Дозволяє зареєструвати додаткові або модифікувати вже наявні базові селектори для віджету Gallery Grid, які використовуються в контролах редактору Elementor для стилізації різних елементів віджету.

**Args:**

- `$selectors` - array - список селекторів

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
Дозволяє зареєструвати додаткові або модифікувати вже наявні базові селектори для віджету Gallery Modern, які використовуються в контролах редактору Elementor для стилізації різних елементів віджету.

**Args:**

- `$selectors` - array - список селекторів

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
Дозволяє зареєструвати додаткові або модифікувати вже наявні базові селектори для віджету Gallery Slider, які використовуються в контролах редактору Elementor для стилізації різних елементів віджету.

**Args:**

- `$selectors` - array - список селекторів

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
