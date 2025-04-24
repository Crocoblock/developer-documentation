# Filters

## jet-engine/options-pages/raw-fields

Allows modifying the array of option page fields before they are processed.

**Args:**
- `$fields` - array - Array of fields
- `$page` - Jet_Engine_Options_Page_Factory - Options page object

**Location:**
/includes/components/options-pages/options-page.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/options-pages/raw-fields', function( $fields, $page ) {

    if ( 'my_options_page' !== $page->slug ) {
        return $fields;
    }

    $fields[] = array(
        'title'       => 'Hidden Field',
        'name'        => '_hidden_field',
        'object_type' => 'field',
        'type'        => 'hidden',
        'default_val' => '',
    );

    return $fields;
}, 10, 2 );
```

## jet-engine/options-pages/available-capabilities

Allows modifying the list of available capabilities for the `Access capability` option https://tppr.me/W9BMl on the options page.

**Args:**
- `$caps_list` - array - List of capabilities in the format `array( 'value' => '', 'label' => '' )`

**Location:**
/includes/components/options-pages/pages/edit.php

**Access:**
Admin-only

**Example:**

```php
add_filter( 'jet-engine/options-pages/available-capabilities', function( $caps_list ) {

    $caps_list[] = array(
        'value' => 'install_plugins',
        'label' => 'Install plugins',
    );

    return $caps_list;
} );
```

## jet-engine/options-pages/available-positions

Allows modifying the list of available positions for the `Menu position` option https://tppr.me/OcN9H on the options page.

**Args:**
- `$positions` - array - List of available positions in the format `array( 'value' => 3, 'label' => 'Dashboard' )`

**Location:**
/includes/components/options-pages/pages/edit.php

**Access:**
Admin-only

**Example:**

```php
add_filter( 'jet-engine/options-pages/available-positions', function( $positions ) {

    $positions[] = array(
        'value' => -1,
        'label' => 'Crocoblock Section'
    );

    return $positions;
} );
```

## jet-engine/options-pages/rest-api/fields/value

Allows modifying the option value retrieved via the Rest API.

**Args:**
- `$value` - mixed - Option value
- `$field` - array - Array of field arguments.

**Location:**
/includes/components/options-pages/rest-api/fields/pages/site-settings.php

**Access:**
Rest-API-only

**Example:**

```php
add_filter( 'jet-engine/options-pages/rest-api/fields/value', function( $value, $field ) {
    
    if ( empty( $field['type'] ) || 'text' !== $field['type'] ) {
        return $value;
    }

    if ( empty( $field['input_type'] ) || 'hidden' !== $field['input_type'] ) {
        return $value;
    }

    if ( empty( $field['map_value_format'] ) ) {
        return $value;
    }
    
    if ( 'location_array' === $field['map_value_format'] ) {
        return json_decode( wp_unslash( $value ), true );
    }

    return $value;
} );
```