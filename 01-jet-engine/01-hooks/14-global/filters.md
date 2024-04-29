# Global JetEngine Filters (not directly related to any component)

## jet-engine/template-path

Allows rewriting the path to templates that can be overridden within the theme. Not actually used.

**Args:**
- `$template_path` - The default folder where you should place JetEngine templates in the theme if you want to override these templates.

**Location:**
/jet-engine.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/template-path', function( $path ) {
  return 'my-dir-name';
} );
```

## jet-engine/accessibility/contrast-ui

Allows to include an additional CSS file that adds more contrast to the JetEngine UI. Not actually used.

**Args:**
- `true/false` - Whether to include the additional CSS or not. Default is false.

**Location:**
/includes/core/accessibility.php

**Access:**
Admin-only

**Example:**

```php
add_action( 'jet-engine/accessibility/contrast-ui', '__return_true' );
```

## jet-engine/listings/icon-html-format

Allows filtering the HTML format of the icon returned by the `jet_engine_icon_html()` function. Currently, this function is used as a callback in those components where the result can be filtered using a callback.

**Args:**
- `$format` - The format of the final HTML markup of the icon. Default is `<i class="fa %s"></i>`
- `$value` - The icon itself as it comes as an argument to the function.

**Location:**
/includes/core/functions.php

**Access:**
Global

**Example:**

```php
add_action( 'jet-engine/listings/icon-html-format', function( $format, $icon ) {
  return '<span class="material-icons">%s</span>';
}, 10, 2 );
```

## jet-engine/listings/icon-html-format

Allows filtering the HTML format of the icon returned by the `jet_engine_icon_html()` function. Currently, this function is used as a callback in those components where the result can be filtered using a callback.

**Args:**
- `$format` - The format of the final HTML markup of the icon. Default is `<i class="fa %s"></i>`
- `$value` - The icon itself as it comes as an argument to the function.

**Location:**
/includes/core/functions.php

**Access:**
Global

**Example:**

```php
add_action( 'jet-engine/listings/icon-html-format', function( $format, $icon ) {
  return '<span class="material-icons">%s</span>';
}, 10, 2 );
```

## jet-engine/compatibility/translate-string

Filter allows registering admin texts for possible further translation using third-party plugins (WPML, Polylang).

**Args:**
- `$text` - string - The text to be translated.

**Location:**

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/compatibility/translate-string', function( $text ) {

    pll_register_string( 'jet-engine', $text, 'JetEngine', true );

    return pll__( $text );
} );
```