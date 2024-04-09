# Filters

## jet-engine/admin-filters/apply-filter/{$type}

Дозволяє змінювати квері для адмін фільтрів по динамичній частині хука `$type`, що відповідає типу фільтра https://tppr.me/P94lK.

**Args:**
- `$query` - WP_Query
- `$filter` - array - налаштування фільтра
- `$value` - mixed - значення фільтра
- `$admin_filters` - Jet_Engine_CPT_Admin_Filters - менеджер адмін фільтрів

**Location:**
[includes/components/post-types/admin-filters.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/post-types/admin-filters.php)

**Access:**
Admin-only 

**Example:**

```php
add_filter( 'jet-engine/admin-filters/apply-filter/related_items', function ( $query, $filter, $value, $admin_filters ) {
	if ( ! $value ) {
		return $query;
	}

	$rel_id = ! empty( $filter['rel_id'] ) ? $filter['rel_id'] : false;

	if ( ! $rel_id ) {
		return $query;
	}

	$rel = jet_engine()->relations->get_active_relations( $rel_id );

	if ( ! $rel ) {
		return $query;
	}

	$screen = get_current_screen();

	if ( empty( $screen->post_type ) ) {
		return $query;
	}

	if ( $rel->is_parent( 'posts', $screen->post_type ) ) {
		$ids = $rel->get_parents( $value, 'ids' );
	} else {
		$ids = $rel->get_children( $value, 'ids' );
	}

	if ( empty( $ids ) ) {
		$ids = 'not-found';
	}
	
	$stack = isset( $query->query_vars['post__in'] ) ? $query->query_vars['post__in'] : array();

	if ( empty( $stack ) || 'not-found' === $ids ) {
		$stack = $ids;
	} elseif ( is_array( $stack ) ) {
		$stack = array_intersect( $stack, $ids );
	}

	$query->query_vars['post__in'] = $stack;

	return $query;
}, 10, 4 );
```

## jet-engine/admin-filters/filter-value

Дозволяє змінювати значення варіанта фільтра під час рендеру самого фільтра. 

**Args:**
- `$value` - mixed - значення варіанта фільтра
- `$filter` - array - налаштування фільтра
- `$admin_filters` - Jet_Engine_CPT_Admin_Filters - менеджер адмін фільтрів

**Location:**
[includes/components/post-types/admin-filters.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/post-types/admin-filters.php)

**Access:**
Admin-only

**Example:**

```php
add_filter( 'jet-engine/admin-filters/filter-value', function ( $value, $filter, $admin_filters ) {
    // As an example here, you can use the functions of translation plugins to translate a value
    return $value;
}, 10, 3 );
```

## jet-engine/admin-filters/filter-label

Дозволяє змінювати лейбл варіанта фільтра під час рендеру самого фільтра.

**Args:**
- `$label` - mixed - значення варіанта фільтра
- `$filter` - array - налаштування фільтра
- `$admin_filters` - Jet_Engine_CPT_Admin_Filters - менеджер адмін фільтрів

**Location:**
[includes/components/post-types/admin-filters.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/post-types/admin-filters.php)

**Access:**
Admin-only

**Example:**

```php
add_filter( 'jet-engine/admin-filters/filter-label', function ( $label, $filter, $admin_filters ) {
    // As an example here, you can use the functions of translation plugins to translate a label
    return $label;
}, 10, 3 );
```

## jet-engine/post-type/predifined-columns-cb-for-js

Дозволяє реєструвати нові колбеки для Адмін колонок https://tppr.me/mNTDN.

**Args:**
- `$callbacks` - array - список колбеків в форматі `array( $callback => $callback_args, ... )`
    - `$callback` - string - ім'я колбека
    - `$callback_args` - array - аргументи колбека
        - `$description` - string - короткий опис колбека
        - `args` - array|false - аргумети( поля ) колбека в форматі `array( $arg_name => $arg_settings, ... )`
            - `$arg_name` - string - слаг аргумента
            - `$arg_settings` - array - налаштування аргумента
                - `label` - string - ім'я аргумента
                - `description` - string - короткий опис аргумента
                - `value` - string - значення аргумента

**Location:**
[includes/components/post-types/pages/edit.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/post-types/pages/edit.php)

**Access:**
Admin-only

**Example:**

```php
add_filter( 'jet-engine/post-type/predifined-columns-cb-for-js', function ( $callbacks ) {
    $callbacks['jet_engine_custom_cb_render_select'] = array(
        'description' => __( 'Render human-readable value from select field or radio field', 'jet-engine' ),
        'args'        => array(
            'field' => array(
                'label'       => __( 'Set field', 'jet-engine' ),
                'description' => __( 'Meta field to get value from', 'jet-engine' ),
                'value'       => '',
            ),
            'delimiter' => array(
                'label'       => __( 'Delimiter', 'jet-engine' ),
                'description' => __( 'If multiple values checked - them will be separated with this', 'jet-engine' ),
                'value'       => ', ',
            ),
        ),
    );

    return $callbacks;
} );
```

## jet-engine/cpt/excluded-built-in-types

Дозволяє змінювати список виключених вбудованих пост-типів, які не можна редагувати в Post Types UI https://tppr.me/ETA6M.

**Args:**
- `$post_types` - array - список виключених пост-типів

**Location:**
[includes/components/post-types/pages/list.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/post-types/pages/list.php)

**Access:**
Admin-only

**Example:**

```php
add_filter( 'jet-engine/cpt/excluded-built-in-types', function ( $post_types ) {
    $post_types[] = 'wp_global_styles';
    return $post_types;
} );
```

## jet-engine/post-types/admin-filters-types

Дозволяє реєструвати нові типи Адмін фільтрів https://tppr.me/YYBs6.

**Args:**
- `$types` - array - список типів Адмін фільтрів в форматі `array( 'value' => '', 'label' => '' )`

**Location:**
[includes/components/post-types/manager.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/post-types/manager.php)

**Access:**
Admin-only

**Example:**

```php
add_filter( 'jet-engine/post-types/admin-filters-types', function ( $types ) {
    $types[] = array(
        'value' => 'related_items',
        'label' => __( 'Filter by related items', 'jet-engine' ),
    );
    return $types;
} );
```

## jet-engine/{$object_type}/{$object}/meta-fields

Дозволяє реєструвати додаткові мета поля по динамічним частинам фільтра `$object_type`(post-type, taxonomy, user) та
`$object`(post, page, category, post_tag, ...), які будуть використовуватися через метод `get_meta_fields_for_object`

**Args:**
- `$fields` - array - список мета полів

**Location:**
[includes/components/post-types/manager.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/post-types/manager.php)

**Access:**
Admin-only

**Example:**

```php
add_filter( 'jet-engine/post-type/product/meta-fields', function ( $fields ) {
    if ( empty( $fields ) ) {
        $fields = array();
    }

    $fields[] = array(
        'name'  => '_regular_price',
        'type'  => 'text',
        'title' => __( 'Price', 'jet-engine' ),
    );

    $fields[] = array(
        'name'  => '_sale_price',
        'type'  => 'text',
        'title' => __( 'Sale Price', 'jet-engine' ),
    );
    return $fields;
} );
```