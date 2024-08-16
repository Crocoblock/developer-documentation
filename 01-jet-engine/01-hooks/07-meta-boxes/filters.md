# Filters

## jet-engine/meta-boxes/sources

Allows changing the list of sources for the meta box component.
**Args:**
- `$sources` - list of sources for the meta box component in the format `array( 'value' => 'post', 'label' => 'Post' )`

**Location:**
includes/components/meta-boxes/manager.php

**Access:**
Admin-only

**Example:**

```php
add_filter( 'jet-engine/meta-boxes/sources', function( $sources ) {

    $sources[] = array(
        'value' => 'wcfm',
        'label' => 'WCFM - WooCommerce Multivendor Marketplace',
    );

    return $sources;
} );
```

## jet-engine/meta-boxes/raw-fields

Allows changing the array of meta box fields before they are processed.

**Args:**
- `$fields` - array - Array of fields.
- `$meta_boxes` - Jet_Engine_Meta_Boxes - Meta box manager object.

**Location:**<br>
includes/components/meta-boxes/manager.php<br>
includes/components/post-types/manager.php<br>
includes/components/taxonomies/manager.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/meta-boxes/raw-fields', function( $fields, $meta_boxes ) {

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

## jet-engine/meta-boxes/fields-for-select/name

Allows changing the format of the field's Name/ID value for the select field. Typically, it is the Name/ID of the field.

**Args:**
- `$name` - string - `Name/ID` of the field.
- `$field` - array - The field's arguments array.
- `$object_name` - string - The name of the object to which the field belongs (post, page, category, ...).

**Location:**
includes/components/meta-boxes/manager.php
**Access:**
Admin-only

**Example:**

```php
add_filter( 'jet-engine/meta-boxes/fields-for-select/name', function( $name, $field, $object_name ) {
    return $object_name . '::' . $name;
}, 10, 3 );
```

## jet-engine/meta-fields/config

Allows changing the array of localized data used in JavaScript on the meta box edit page.

**Args:**
- `$config` - array - The array of localized data.

**Location:**
includes/components/meta-boxes/pages/edit.php

**Access:**
Admin-only

**Example:**

```php
add_filter( 'jet-engine/meta-fields/config', function( $config ) {

    $config['field_types'][] = array(
        'value' => 'map',
        'label' => 'Map',
    );

    return $config;
} );
```

## jet-engine/meta-fields/{$field_type}/args

Allows preparing an array of arguments for a new field to be used later in the builder interface based on the dynamic part of the  `$field_type filter`, which corresponds to the field type.

**Args:**
- `$args` - array - The resulting field arguments.
- `$field` - array - The initial field arguments.
- `$meta_instance` - Jet_Engine_CPT_Meta - The CPT meta manager object.

**Location:**
includes/components/meta-boxes/post.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/meta-fields/map/args', function( $args, $field, $meta_instance ) {
    $args['type']         = 'text';
    $args['input_type']   = 'hidden';
    $args['autocomplete'] = 'off';
    $args['class']        = 'jet-engine-map-field';

    $value_format = ! empty( $field['map_value_format'] ) ? $field['map_value_format'] : 'location_string';
    $args['map_value_format'] = $value_format;

    return $args;
}, 10, 3 );
```

## jet-engine/meta-fields/field/args

Allows changing the array of field arguments for later use in the builder interface.

**Args:**
- `$args` - array - The resulting field arguments.
- `$field` - array - The initial field arguments.
- `$meta_instance` - Jet_Engine_CPT_Meta - The CPT meta manager object.

**Location:**
includes/components/meta-boxes/post.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/meta-fields/field/args', function( $args, $field, $meta_instance ) {
    
    if ( 'text' === $field['type'] ) {
        $args['class'] = 'text-field';
    }

    return $args;
}, 10, 3 );
```

## jet-engine/meta-fields/repeater/{$field_type}/args

Allows preparing an array of arguments for a new field for the repeater for later use in the builder interface based on the dynamic part of the `$field_type filter`, which corresponds to the field type.

**Args:**
- `$args` - array - The resulting field arguments.
- `$field` - array - The initial field arguments.
- `$meta_instance` - Jet_Engine_CPT_Meta - The CPT meta manager object.

**Location:**
includes/components/meta-boxes/post.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/meta-fields/repeater/map/args', function( $args, $field, $meta_instance ) {
    $args['type']         = 'text';
    $args['input_type']   = 'hidden';
    $args['autocomplete'] = 'off';
    $args['class']        = 'jet-engine-map-field';

    $value_format = ! empty( $field['map_value_format'] ) ? $field['map_value_format'] : 'location_string';
    $args['map_value_format'] = $value_format;

    return $args;
}, 10, 3 );
```

## jet-engine/meta-fields/repeater/field/args

Allows changing the array of field arguments for the repeater for later use in the builder interface.

**Args:**
- `$args` - array - The resulting field arguments.
- `$field` - array - The initial field arguments
- `$meta_instance` - Jet_Engine_CPT_Meta - The CPT meta manager object.

**Location:**
includes/components/meta-boxes/post.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/meta-fields/repeater/field/args', function( $args, $field, $meta_instance ) {
    
    if ( 'text' === $field['type'] ) {
        $args['class'] = 'text-field';
    }

    return $args;
}, 10, 3 );
```

## jet-engine/meta-fields/field-options

Allows filtering the options array for checkbox, radio, select fields before they are processed for later use in the builder interface.

**Args:**
- `$options` - array - The options array in the  `array( 'key' => '', 'value' => '', 'is_checked' => false )` format.
- `$field` - array - The field arguments.
- `$meta_instance` - Jet_Engine_CPT_Meta - The CPT meta manager object.

**Location:**
includes/components/meta-boxes/post.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/meta-fields/field-options', function( $options, $field, $meta_instance ) {
    
    if ( 'select' === $field['type'] ) {
        array_unshift( 
            $options, 
            array(
                'key' => '',
                'value' => 'Select...',
            ) 
        );
    }

    return $options;
}, 10, 3 );
```

## jet-engine/user-meta/current-user-id

Allows filtering the User ID on user-edit, profile pages for later retrieval of user meta field values.

**Args:**
- `$user_id` - int | false - User ID
- `$meta_instance` - Jet_Engine_CPT_User_Meta - The User meta manager object.

**Location:**
includes/components/meta-boxes/user.php

**Access:**
Admin-only

**Example:**

```php
add_filter( 'jet-engine/user-meta/current-user-id', function ( $user_id ) {

    global $current_screen;
    
    if ( ! $user_id && $current_screen && 'user-edit' === $current_screen->base ) {
        $user_id = isset( $_REQUEST['user_id'] ) ? absint( $_REQUEST['user_id'] ) : false;
    }

    return $user_id;
} );
```

## jet-engine/user-meta/pre-get-meta/{$key}

Allows returning the user meta value before it is fetched from the database based on the dynamic part of the `$key` filter, which corresponds to the field key.

**Args:**
- `$pre_value` - bool - Default: false.
- `$user_id` - int - User ID.
- `$key` - string - The field key.
- `$default` - mixed - Default field value. 
- `$field` - array - Field arguments.

**Location:**
includes/components/meta-boxes/user.php

**Access:**
Admin-only

**Example:**

```php
add_filter( 'jet-engine/user-meta/pre-get-meta/my-custom-number-field', function ( $pre_value, $user_id, $key, $default, $field ) {

    $value = get_user_meta( $user_id, $key, true );
    
    if ( ! empty( $value ) ) {
        
        if ( $value > 100 ) {
            $value = 100;
        }
        
        if ( $value < -100 ) {
            $value = -100;
        }
    
        return $value;
    }

    return $pre_value;
}, 10, 5 );
```

## jet-engine/user-meta/preprocess/{$key}

Allows writing custom logic for saving user field values. The dynamic part of the `$key` filter corresponds to the field key.

**Args:**
- `$pre_processed` - bool - Default: false.
- `$user_id` - int - User ID.
- `$meta_instance` - Jet_Engine_CPT_User_Meta - The User meta manager object.

**Location:**
includes/components/meta-boxes/user.php

**Access:**
Admin-only

**Example:**

```php
add_filter( 'jet-engine/user-meta/preprocess/my-custom-field', function ( $pre_processed, $user_id ) {
    
    if ( ! isset( $_POST['my-custom-field'] ) || '' === $_POST['my-custom-field'] ) {
        $value = null;
    } else {
        $value = wp_kses_post( $_POST['my-custom-field'] );
    }
   
    update_user_meta( $user_id, 'my-custom-field', $value );
    
    return true;
}, 10, 2 );
```

## cx_user_meta/date

Allows filtering the date value for display in user meta.

**Args:**
- `$date` - string - The date in the corresponding format.
- `$time` - string | int - Timestamp time.
- `$format` - string - Date format. 

**Location:**
includes/components/meta-boxes/user.php

**Access:**
Admin-only

**Example:**

```php
add_filter( 'cx_user_meta/date', function ( $date, $time, $format ) {
    return wp_date( $format, $time );
}, 10, 3 );
```

## cx_user_meta/strtotime

Allows changing the method of converting a date to a time timestamp for later saving in user meta.

**Args:**
- `$time` - int - Timestamp time.
- `$date` - string - Date.

**Location:**
includes/components/meta-boxes/user.php

**Access:**
Admin-only

**Example:**

```php
add_filter( 'cx_user_meta/strtotime', function ( $time, $date ) {
    $date = new DateTime( $date, wp_timezone() );
    return $date->format( 'U' );
}, 10, 2 );
```

## jet-engine/meta-boxes/conditions/get-ajax-screen/{$source}

Allows adding screen names for new sources based on the dynamic part of the `$source` filter, corresponding to the new source.

**Args:**
- `$screen` - string | array - The screen names. Default: null.
- `$args` - array - The condition arguments.
- `$manager` - Jet_Engine_Meta_Boxes_Conditions - The conditions manager.

**Location:**
includes/components/meta-boxes/conditions-manager.php

**Access:**
Admin-only

**Example:**

```php
add_filter( 'jet-engine/meta-boxes/conditions/get-ajax-screen/custom-source', function ( $screen, $args ) {
    return ! empty( $args['allowed_pages'] ) ? $args['allowed_pages'] : array();
}, 10, 2 );
```

## jet-engine/meta-boxes/conditions/post-has-terms/check-terms

Allows filtering the array of term IDs for checking in the `Post Has Terms` condition.

**Args:**
- `$terms_to_check` - array - The array of term IDs to check.
- `$tax_to_check` - string - Taxonomy slug. 

**Location:**
includes/components/meta-boxes/conditions/post-has-terms.php

**Access:**
Admin-only

**Example:**

```php
add_filter( 'jet-engine/meta-boxes/conditions/post-has-terms/check-terms', function ( $terms, $tax ) {
    return array_map( function ( $term ) use ( $tax ) {
        return apply_filters( 'wpml_object_id', $term, $tax, true );
    }, $terms );
} , 10, 2 );
```

## jet-engine/meta-boxes/rest-api/fields/field-type

Allows filtering the field type for the Rest API.

**Args:**
- `$type` - string - Field type.
- `$field` - array - Field arguments. 

**Location:**
includes/components/meta-boxes/rest-api/fields/post-meta.php

**Access:**
Rest API

**Example:**

```php
add_filter( 'jet-engine/meta-boxes/rest-api/fields/field-type', function ( $type, $field ) {

    if ( isset( $field['map_value_format'] ) && 'location_array' === $field['map_value_format'] ) {
        $type = 'object';
    }

    return $type;
} , 10, 2 );
```

## jet-engine/meta-boxes/rest-api/fields/schema

Allows filtering the field schema for the Rest API.

**Args:**
- `$schema` - mixed - The field type.
- `$type` - string - The field type.
- `$field` - array - The field arguments.

**Location:**<br>
includes/components/meta-boxes/rest-api/fields/post-meta.php<br>
includes/components/options-pages/rest-api/fields/site-settings.php

**Access:**
Rest API

**Example:**

```php
add_filter( 'jet-engine/meta-boxes/rest-api/fields/schema', function ( $schema, $type, $field ) {

    if ( isset( $field['map_value_format'] ) && 'location_array' === $field['map_value_format'] ) {
        $schema = array( 
            'type'       => 'object',
            'properties' => array(
                'lat' => array( 'type' => array( 'string', 'float' ) ),
                'lng' => array( 'type' => array( 'string', 'float' ) ),
            ),
            'prepare_callback' => function( $value, $request, $args ) {
                return json_decode( $value );
            }
        );
    }

    return $schema;
} , 10, 3 );
```
