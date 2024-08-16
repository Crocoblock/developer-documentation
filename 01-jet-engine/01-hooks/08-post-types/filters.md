# Filters

## jet-engine/admin-filters/apply-filter/{$type}

Allows changing the query for admin filters for the dynamic part of the hook `$type`, corresponding to the filter type https://tppr.me/P94lK.

**Args:**
- `$query` - WP_Query
- `$filter` - array - Filter settings. 
- `$value` - mixed - Filter value. 
- `$admin_filters` - Jet_Engine_CPT_Admin_Filters - Admin filters manager. 

**Location:**
includes/components/post-types/admin-filters.php

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

Allows changing the filter option value during the filter rendering. 

**Args:**
- `$value` - mixed - The filter option value.
- `$filter` - array - The filter settings. 
- `$admin_filters` - Jet_Engine_CPT_Admin_Filters - Admin filters manager. 

**Location:**
includes/components/post-types/admin-filters.php

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

Allows changing the filter option label during the filter rendering.

**Args:**
- `$label` - mixed - Filter option label.
- `$filter` - array - Filter settings. 
- `$admin_filters` - Jet_Engine_CPT_Admin_Filters - Admin filters manager. 

**Location:**
includes/components/post-types/admin-filters.php

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

Allows registering new callbacks for Admin columns https://tppr.me/mNTDN.

**Args:**
- `$callbacks` - array - The list of callbacks in the format `array( $callback => $callback_args, ... )`
    - `$callback` - string - Callback name. 
    - `$callback_args` - array - Callback arguments. 
        - `$description` - string - A short description of callback. 
        - `args` - array|false - callback arguments (fields) in the format `array( $arg_name => $arg_settings, ... )`
            - `$arg_name` - string - Argument slug. 
            - `$arg_settings` - array - Argument settings. 
                - `label` - string - Argument name. 
                - `description` - string - Argument short description. 
                - `value` - string - Argument value. 

**Location:**
includes/components/post-types/pages/edit.php

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

Allows changing the list of excluded built-in post types that cannot be edited in Post Types UI https://tppr.me/ETA6M.

**Args:**
- `$post_types` - array - The list of excluded post types.

**Location:**
includes/components/post-types/pages/list.php

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

Allows registering new types of Admin filters https://tppr.me/YYBs6. 

**Args:**
- `$types` - array -  List of Admin filter types in the format `array( 'value' => '', 'label' => '' )`

**Location:**
includes/components/post-types/manager.php

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

Allows registering additional meta fields for dynamic parts of the filter `$object_type`(post-type, taxonomy, user) and
`$object`(post, page, category, post_tag, ...), which will be used through the `get_meta_fields_for_object` method.

**Args:**
- `$fields` - array - The list of meta fields. 

**Location:**
includes/components/post-types/manager.php

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