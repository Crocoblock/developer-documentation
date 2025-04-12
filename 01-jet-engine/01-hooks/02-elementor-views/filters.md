# Filters

## jet-engine/elementor-view/icons/json-patch

Allows you to modify the path to the JSON file that contains the icon list for the icon library.

**Arguments:**

`$json_path` — boolean|string — Path to the JSON file containing the list of icons.

`$json_url` — string — URL to the JSON file containing the list of icons.

`$icons_data` — array — Array of icon library data.

**Location:**
[includes/components/elementor-views/icons.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/elementor-views/icons.php)

**Access:**
Admin-only

**Example:**

```php
add_action( 'jet-engine/elementor-view/icons/json-patch', function( $json_path, $json_url, $icons_data ) {
    
   if ( false !== strpos( $json_url, content_url() ) ) {
        $json_path = str_replace( content_url(), wp_normalize_path( WP_CONTENT_DIR ), $json_url );
    }

    return $json_path;
}, 10, 3 );
```

## jet-engine/filter-name

General description

**Args:**
- `$arg_name` - arg description

**Location:**
Path-to-file-with-hook.php

**Access:**
Global, frontend-only, admin-only

**Example:**

```php
code of the example
```