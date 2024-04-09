# Filters

## jet-engine/meta-boxes/sources

Дозволяє змінювати список сорсів для мета-бокс компонента.

**Args:**
- `$sources` - список сорсів для мета-бокс компонента в форматі `array( 'value' => 'post', 'label' => 'Post' )`

**Location:**
[includes/components/meta-boxes/manager.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/meta-boxes/manager.php)

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

Дозволяє змінювати масив полів мета-бокса, перед тим як вони будуть оброблені.

**Args:**
- `$fields` - array - Масив полів
- `$meta_boxes` - Jet_Engine_Meta_Boxes - Об'єкт мета-бокс менеджера

**Location:**<br>
[includes/components/meta-boxes/manager.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/meta-boxes/manager.php) <br>
[includes/components/post-types/manager.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/post-types/manager.php) <br>
[includes/components/taxonomies/manager.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/taxonomies/manager.php)

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

Дозволяє змінити формат значення опції списка полів для селекта. Типово це `Name/ID` поля.

**Args:**
- `$name` - string - `Name/ID` поля
- `$field` - array - Масив аргументів поля
- `$object_name` - string - Ім'я об'єкта до якого відноситься поле ( post, page, category, ... )

**Location:**
[includes/components/meta-boxes/manager.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/meta-boxes/manager.php)

**Access:**
Admin-only

**Example:**

```php
add_filter( 'jet-engine/meta-boxes/fields-for-select/name', function( $name, $field, $object_name ) {
    return $object_name . '::' . $name;
}, 10, 3 );
```

## jet-engine/meta-fields/config

Дозволяє змінювати масив локалізованих даних, які використовуються в js на сторінці редагування мета-бокса.

**Args:**
- `$config` - array - Масив локалізованих даних.

**Location:**
[includes/components/meta-boxes/pages/edit.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/meta-boxes/pages/edit.php)

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

Дозволяє підготувати масив аргументів нового поля для подальшого використання в інтерфейс білдері по динамічній частині фільтра `$field_type`, що відповідає типу поля. 

**Args:**
- `$args` - array - Результуючі аргументи поля
- `$field` - array - Первинні агрументи поля
- `$meta_instance` - Jet_Engine_CPT_Meta - Об'єкт менеджера для CPT мети

**Location:**
[includes/components/meta-boxes/post.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/meta-boxes/post.php)

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

Дозволяє змінити масив аргументів поля для подальшого використання в інтерфейс білдері.

**Args:**
- `$args` - array - Результуючі аргументи поля
- `$field` - array - Первинні агрументи поля
- `$meta_instance` - Jet_Engine_CPT_Meta - Об'єкт менеджера для CPT мети

**Location:**
[includes/components/meta-boxes/post.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/meta-boxes/post.php)

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

Дозволяє підготувати масив аргументів нового поля для репітера для подальшого використання в інтерфейс білдері по динамічній частині фільтра `$field_type`, що відповідає типу поля.

**Args:**
- `$args` - array - Результуючі аргументи поля
- `$field` - array - Первинні агрументи поля
- `$meta_instance` - Jet_Engine_CPT_Meta - Об'єкт менеджера для CPT мети

**Location:**
[includes/components/meta-boxes/post.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/meta-boxes/post.php)

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

Дозволяє змінити масив аргументів поля для репітера для подальшого використання в інтерфейс білдері.

**Args:**
- `$args` - array - Результуючі аргументи поля
- `$field` - array - Первинні агрументи поля
- `$meta_instance` - Jet_Engine_CPT_Meta - Об'єкт менеджера для CPT мети

**Location:**
[includes/components/meta-boxes/post.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/meta-boxes/post.php)

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

Дозволяє фільтрувати масив опцій для чекбокс, радіо, селект полів перед тим, як вони будуть оброблені для подальшого використання в інтерфейс білдері.

**Args:**
- `$options` - array - Масив опцій в форматі `array( 'key' => '', 'value' => '', 'is_checked' => false )`
- `$field` - array - Агрументи поля
- `$meta_instance` - Jet_Engine_CPT_Meta - Об'єкт менеджера для CPT мети

**Location:**
[includes/components/meta-boxes/post.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/meta-boxes/post.php)

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

Дозволяє фільтрувати User ID на user-edit, profile сторінках для подальшого отримання значення мета полів користувача.

**Args:**
- `$user_id` - int | false - User ID
- `$meta_instance` - Jet_Engine_CPT_User_Meta - Об'єкт менеджера User мети

**Location:**
[includes/components/meta-boxes/user.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/meta-boxes/user.php)

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

Дозволяє повернути значення мети користувача перед тим, як вона буде отримана з бази по динамічній частині фільтра `$key`, що відповідає ключу поля. 

**Args:**
- `$pre_value` - bool - Типово: false.
- `$user_id` - int - User ID
- `$key` - string - Ключ поля
- `$default` - mixed - Типове значення поля
- `$field` - array - Аргументи поля

**Location:**
[includes/components/meta-boxes/user.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/meta-boxes/user.php)

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

Дозволяє написати іншу логіку для збереження значення поля користувача. Динамічна частина фільтра `$key` відповідає ключу поля.

**Args:**
- `$pre_processed` - bool - Типово: false.
- `$user_id` - int - User ID.
- `$meta_instance` - Jet_Engine_CPT_User_Meta - Об'єкт менеджера User мети.

**Location:**
[includes/components/meta-boxes/user.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/meta-boxes/user.php)

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

Дозволяє фільтрувати значення дати для показу в меті користувача.

**Args:**
- `$date` - string - Дата у відповідному форматі
- `$time` - string | int - Таймстемп час
- `$format` - string - Формат дати

**Location:**
[includes/components/meta-boxes/user.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/meta-boxes/user.php)

**Access:**
Admin-only

**Example:**

```php
add_filter( 'cx_user_meta/date', function ( $date, $time, $format ) {
    return wp_date( $format, $time );
}, 10, 3 );
```

## cx_user_meta/strtotime

Дозволяє змінити метод конвертації дати в таймстемп час для подальшого збереження в меті користувача.

**Args:**
- `$time` - int - Таймстемп час
- `$date` - string - Дата

**Location:**
[includes/components/meta-boxes/user.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/meta-boxes/user.php)

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

Дозволяє додати імена скрінів для нових сорсів по динамічній частині фільтра `$source`, що відповідає новому сорсу.

**Args:**
- `$screen` - string | array - Імена скрінів. Типово: null
- `$args` - array - Аргументи кондішена
- `$manager` - Jet_Engine_Meta_Boxes_Conditions - Кондішен менеджер

**Location:**
[includes/components/meta-boxes/conditions-manager.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/meta-boxes/conditions-manager.php)

**Access:**
Admin-only

**Example:**

```php
add_filter( 'jet-engine/meta-boxes/conditions/get-ajax-screen/custom-source', function ( $screen, $args ) {
    return ! empty( $args['allowed_pages'] ) ? $args['allowed_pages'] : array();
}, 10, 2 );
```

## jet-engine/meta-boxes/conditions/post-has-terms/check-terms

Дозволяє фільтрувати масив ідентифікаторів термів для перевірки в кондішені `Post Has Terms`.

**Args:**
- `$terms_to_check` - array - Масив ідентифікаторів термів для перевірки
- `$tax_to_check` - string - Слаг таксономії

**Location:**
[includes/components/meta-boxes/conditions/post-has-terms.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/meta-boxes/conditions/post-has-terms.php)

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

Дозволяє фільтрувати тип поля для Rest API.

**Args:**
- `$type` - string - Тип поля
- `$field` - array - Аргументи поля

**Location:**
[includes/components/meta-boxes/rest-api/fields/post-meta.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/meta-boxes/rest-api/fields/post-meta.php)

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

Дозволяє фільтрувати схему поля для Rest API.

**Args:**
- `$schema` - mixed - Тип поля
- `$type` - string - Тип поля
- `$field` - array - Аргументи поля

**Location:**<br>
[includes/components/meta-boxes/rest-api/fields/post-meta.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/meta-boxes/rest-api/fields/post-meta.php) <br>
[includes/components/options-pages/rest-api/fields/site-settings.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/options-pages/rest-api/fields/site-settings.php)

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
