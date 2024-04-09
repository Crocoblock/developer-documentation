# Actions

## jet-engine/meta-boxes/register-instances

Спрацьовує перед тим як будуть реєструватися мета-бокси. На цей хук можна реєструвати кастомні мета-бокси.

**Args:**
- `$meta_manager` - Jet_Engine_Meta_Boxes - Мета бокс менеджер

**Location:**
[includes/components/meta-boxes/manager.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/meta-boxes/manager.php)

**Access:**
Global

**Example:**

```php
add_action( 'jet-engine/meta-boxes/register-instances', function ( $meta_manager ) {
   
    if ( ! class_exists( 'Jet_Engine_CPT_Meta' ) ) {
        require jet_engine()->plugin_path( 'includes/components/meta-boxes/post.php' );
    }
    
    $meta_fields = array(
        array(
            'title' => 'Custom Text field',
            'name' => 'custom-text-field',
            'object_type' => 'field',
            'width' => '100%',
            'type' => 'text',
      ),
    );
    
    new Jet_Engine_CPT_Meta( 'my-custom-post-type', $meta_fields, '', 'normal', 'high', array() );
    
    $meta_manager->store_fields( 'my-custom-post-type', $meta_fields );
} );
```

## jet-engine/meta-boxes/register-custom-source/{$object_type}

На цей хук можна реєструвати мета-бокси для кастомного сорса по динамічній частині хука `$object_type`.
Сам сорс потрібно реєструвати через фільтр `jet-engine/meta-boxes/sources`

**Args:**
- `$meta_box` - array - Аргументи мета-бокса
- `$meta_manager` - Jet_Engine_Meta_Boxes - Мета бокс менеджер

**Location:**
[includes/components/meta-boxes/manager.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/meta-boxes/manager.php)
**Access:**
Global

**Example:**

```php
add_action( 'jet-engine/meta-boxes/register-custom-source/wcfm', function( $meta_box, $meta_manager ) {
    $args   = $meta_box['args'];
    $fields = $meta_box['meta_fields'];
    $hook   = ! empty( $meta_box['wcfm_position'] ) ? $meta_box['wcfm_position'] : 'end_wcfm_marketplace_settings';

    $name        = ! empty( $meta_box['name'] ) ? $meta_box['name'] : 'jet-engine-meta';
    $object_name = 'WCFM: ' . $name;
    $meta_manager->store_fields( $object_name, $fields );
    
    add_action( $hook, function( $user_id ) use ( $args, $fields ) {
        // Render fields logic
    } );
    
}, 10, 2 );
```

## jet-engine/meta-boxes/save-custom-value

Спрацьовує перед тим як буде збережено в налаштуваннях мета-бокса кастомне значення для чекбокс/радіо полів.

**Args:**
- `$field` - string - Ім'я / слаг поля
- `$field_args` - array - Аргументи поля

**Location:**<br>
[includes/components/meta-boxes/manager.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/meta-boxes/manager.php) <br>
[includes/components/taxonomies/manager.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/taxonomies/manager.php) <br>
[includes/components/post-types/manager.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/post-types/manager.php) <br>
[includes/components/options-pages/manager.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/options-pages/manager.php) <br>
[includes/modules/custom-content-types/inc/factory.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/modules/custom-content-types/inc/factory.php)

**Access:**
Admin-only

**Example:**

```php
add_action( 'jet-engine/meta-boxes/save-custom-value', function ( $field, $field_args ) {
	
	if ( empty( $field_args['options_from_glossary'] ) || empty( $field_args['glossary_id'] ) ) {
		return;
	}

	$glossary = jet_engine()->glossaries->data->get_item_for_edit( absint( $field_args['glossary_id'] ) );

	if ( ! $glossary ) {
		return;
	}

	$new_fields = ! empty( $_REQUEST[ $field ] ) ? $_REQUEST[ $field ] : array();
	$fields     = $glossary['fields'];
	$existing   = array();

	if ( ! is_array( $new_fields ) ) {
		$new_fields = array( $new_fields );
	}

	if ( ( in_array( 'true', $new_fields ) || in_array( 'false', $new_fields ) ) && empty( $new_fields[0] ) ) {
		$new_fields = array_keys( $new_fields );
	}

	foreach ( $fields as $gl_field ) {
		$existing[] = $gl_field['value'];
	}

	$to_add = array_diff( $new_fields, $existing );

	if ( empty( $to_add ) ) {
		return;
	}

	foreach ( $to_add as $value ) {
		$fields[] = array(
			'value' => $value,
			'label' => $value,
		);
	}

	$new_item = array(
		'id' => absint( $field_args['glossary_id'] ),
		'name' => $glossary['name'],
		'fields' => $fields,
	);

	jet_engine()->glossaries->data->set_request( $new_item );
	jet_engine()->glossaries->data->edit_item( false );

}, 10, 2 );
```

## jet-engine/meta-boxes/source-custom-controls

Дозволяє додавати кастомні контроли до vue темплейта `edit.php` в `General Settings` секцію.

**Args:**

**Location:**
[includes/components/meta-boxes/templates/edit.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/meta-boxes/templates/edit.php)

**Access:**
Admin-only

**Example:**

```php
add_action( 'jet-engine/meta-boxes/source-custom-controls', function () {
    ?>
    <cx-vui-switcher
        label="<?php _e( 'Custom Setting', 'jet-engine' ); ?>"
        description="<?php _e( 'Description', 'jet-engine' ); ?>"
        :wrapper-css="[ 'equalwidth' ]"
        v-model="generalSettings.custom_setting"
    ></cx-vui-switcher>
    <?php
} );
```

## jet-engine/meta-boxes/condition-controls

Дозволяє додавати кастомні контроли до vue темплейта `edit.php` в `Visibility Conditions` секцію.

**Args:**

**Location:**
[includes/components/meta-boxes/templates/edit.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/meta-boxes/templates/edit.php)

**Access:**
Admin-only

**Example:**

```php
add_action( 'jet-engine/meta-boxes/condition-controls', function () {
    ?>
    <cx-vui-switcher
        label="<?php _e( 'Show Meta Box', 'jet-engine' ); ?>"
        description="<?php _e( 'Description', 'jet-engine' ); ?>"
        :wrapper-css="[ 'equalwidth' ]"
        v-model="generalSettings.show_meta_box"
    ></cx-vui-switcher>
    <?php
} );
```

## jet-engine/meta-boxes/templates/fields/controls

Дозволяє додавати кастомні контроли для додаткових налаштувань мета-полів в vue темплейті `fields.php`.

**Args:**

**Location:**
[includes/components/meta-boxes/templates/fields.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/meta-boxes/templates/fields.php)

**Access:**
Admin-only

**Example:**

```php
add_action( 'jet-engine/meta-boxes/templates/fields/controls', function () {
    ?>
    <cx-vui-input
		label="<?php _e( 'Map Height', 'jet-engine' ); ?>"
		description="<?php _e( 'Set the height of the map. Default is 300px.', 'jet-engine' ); ?>"
		type="number"
		:min="100"
		:step="10"
		:wrapper-css="[ 'equalwidth' ]"
		:size="'fullwidth'"
		:value="fieldsList[ index ].map_height"
		@input="setFieldProp( index, 'map_height', $event )"
		:conditions="[
			{
				'input':   fieldsList[ index ].object_type,
				'compare': 'equal',
				'value':   'field',
			},
			{
				'input':   fieldsList[ index ].type,
				'compare': 'equal',
				'value':   'map',
			}
		]"
	></cx-vui-input>
    <?php
} );
```

## jet-engine/meta-boxes/templates/fields/repeater/controls

Дозволяє додавати кастомні контроли для додаткових налаштувань мета-полів репітера в vue темплейті `fields.php`.

**Args:**

**Location:**
[includes/components/meta-boxes/templates/fields.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/meta-boxes/templates/fields.php)

**Access:**
Admin-only

**Example:**

```php
add_action( 'jet-engine/meta-boxes/templates/fields/repeater/controls', function () {
    ?>
    <cx-vui-input
		label="<?php _e( 'Map Height', 'jet-engine' ); ?>"
		description="<?php _e( 'Set the height of the map. Default is 300px.', 'jet-engine' ); ?>"
		type="number"
		:min="100"
		:step="10"
		:wrapper-css="[ 'equalwidth' ]"
		:size="'fullwidth'"
		:value="fieldsList[ index ]['repeater-fields'][ rFieldIndex ].map_height"
		@input="setRepeaterFieldProp( index, rFieldIndex, 'map_height', $event )"
		:conditions="[
			{
				'input':   fieldsList[ index ]['repeater-fields'][ rFieldIndex ].type,
				'compare': 'equal',
				'value':   'map',
			}
		]"
	></cx-vui-input>
    <?php
} );
```

## jet-engine/meta-boxes/conditions/register

Спрацьовує після реєстрації всіх кондішен-класів. На цей хук можна реєструвати власні кондішен-класи.

**Args:**
- `$condition_manager` - Jet_Engine_Meta_Boxes_Conditions - Кондішен менеджер

**Location:**
[includes/components/meta-boxes/conditions-manager.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/meta-boxes/conditions-manager.php)

**Access:**
Admin-only

**Example:**

```php
add_action( 'jet-engine/meta-boxes/conditions/register', function( $condition_manager ) {
    $condition_manager->register_condition_type( new My_Jet_Engine_Custom_Condition() );
} );
```

## jet-engine/user-meta/before-save/

Спрацьовує перед тим, як мета користувача буде збережена.

**Args:**
- `$user_id` - int - User ID.
- `$meta_instance` - Jet_Engine_CPT_User_Meta - Об'єкт менеджера User мети.

**Location:**
[includes/components/meta-boxes/user.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/meta-boxes/user.php)

**Access:**
Admin-only

**Example:**

```php
add_action( 'jet-engine/user-meta/before-save/', function ( $user_id, $meta_instance ) {

}, 10, 2 );
```

## jet-engine/user-meta/before-delete/{$key}

Спрацьовує перед тим, як певний ключ `$key` мети користувача буде видалено.

**Args:**
- `$user_id` - int - User ID.
- `$value` - bool - Типово: false.
- `$meta_instance` - Jet_Engine_CPT_User_Meta - Об'єкт менеджера User мети.

**Location:**
[includes/components/meta-boxes/user.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/meta-boxes/user.php)

**Access:**
Admin-only

**Example:**

```php
add_action( 'jet-engine/user-meta/before-delete/custom_field', function ( $user_id ) {

} );
```

## jet-engine/user-meta/before-save/{$key}

Спрацьовує перед тим, як певний ключ `$key` мети користувача буде збережено.

**Args:**
- `$user_id` - int - User ID.
- `$value` - mixed - Значення мета поля.
- `$key` - string - Ключ поля.
- `$meta_instance` - Jet_Engine_CPT_User_Meta - Об'єкт менеджера User мети.

**Location:**
[includes/components/meta-boxes/user.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/meta-boxes/user.php)

**Access:**
Admin-only

**Example:**

```php
add_action( 'jet-engine/user-meta/before-save/custom_field', function ( $user_id, $value, $key ) {

}, 10, 3 );
```

## jet-engine/user-meta/after-save

Спрацьовує після того, як мета користувача була збережена.

**Args:**
- `$user_id` - int - User ID.
- `$meta_instance` - Jet_Engine_CPT_User_Meta - Об'єкт менеджера User мети.

**Location:**
[includes/components/meta-boxes/user.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/meta-boxes/user.php)

**Access:**
Admin-only

**Example:**

```php
add_action( 'jet-engine/user-meta/after-save', function ( $user_id, $meta_instance ) {

}, 10, 2 );
```