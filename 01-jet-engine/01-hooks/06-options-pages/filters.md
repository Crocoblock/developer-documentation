# Filters

## jet-engine/options-pages/raw-fields

Дозволяє змінювати масив полів сторінки опцій, перед тим як вони будуть оброблені.

**Args:**
- `$fields` - array - Масив полів
- `$page` - Jet_Engine_Options_Page_Factory - Об'єкт сторінки опцій

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

Дозволяє змінювати список доступних capabilities для опції `Access capability` https://tppr.me/W9BMl на сторінці опцій.

**Args:**
- `$caps_list` - array - Список capabilities в форматі `array( 'value' => '', 'label' => '' )`

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

Дозволяє змінювати список доступних позицій для опції `Menu position` https://tppr.me/OcN9H на сторінці опцій.

**Args:**
- `$positions` - array - Список доступних позицій в форматі `array( 'value' => 3, 'label' => 'Dashboard' )`

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

Дозволяє змінювати значення опції, яке отримується через Rest API.

**Args:**
- `$value` - mixed - Значення опції.
- `$field` - array - Массив аргументів поля.

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