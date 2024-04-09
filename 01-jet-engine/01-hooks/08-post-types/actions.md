# Actions

## jet-engine/post-types/admin-filters/custom-filter/{$type}

Дозволяє рендерити кастомний Адмін фільтр по динамічній частині фільтра `$type`, що відповідає типу фільтра https://tppr.me/P94lK.

**Args:**
- `$filter` - array - налаштування фільтра
- `$index` - int - індекс фільтра
- `$admin_filters` - Jet_Engine_CPT_Admin_Filters - менеджер адмін фільтрів

**Location:**
[includes/components/post-types/admin-filters.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/post-types/admin-filters.php)

**Access:**
Admin-only

**Example:**

```php
add_action( 'jet-engine/post-types/admin-filters/custom-filter/related_items', function( $filter, $index, $admin_filters ) {
	$rel_id = ! empty( $filter['rel_id'] ) ? $filter['rel_id'] : false;

	if ( ! $rel_id ) {
		return;
	}

	$rel = jet_engine()->relations->get_active_relations( $rel_id );

	if ( ! $rel ) {
		return;
	}

	$screen = get_current_screen();

	if ( empty( $screen->post_type ) ) {
		return;
	}

	if ( $rel->is_parent( 'posts', $screen->post_type ) ) {
		$options_from = 'child_object_id';
		$type_from    = $rel->get_args( 'child_object' );
	} else {
		$options_from = 'parent_object_id';
		$type_from    = $rel->get_args( 'parent_object' );
	}

	$ids = $rel->db->raw_query( "SELECT DISTINCT $options_from AS id FROM %table% WHERE rel_id = $rel_id;" );

	$options = $admin_filters->add_placeholder( $filter );
	$value   = $admin_filters->get_active_filter_value( $index );

	if ( ! empty( $ids ) ) {
		foreach ( $ids as $id ) {
			$options .= sprintf(
				'<option value="%1$s" %3$s>%2$s</option>',
				$id->id,
				jet_engine()->relations->types_helper->get_type_item_title( $type_from, $id->id, $rel ),
				( $value == $id->id ) ? 'selected' : ''
			);
		}
	}

	printf( '<select name="%1$s">%2$s</select>', $admin_filters->get_filter_name( $index ), $options );

}, 10, 3 );
```

## jet-engine/post-types/deleted-post-type

Виконується після того, як видаляється кастомний пост-тип.

**Args:**
- `$post_type` - string - слаг пост-типа, який видаляється

**Location:**
[includes/components/post-types/rest-api/delete-post-type.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/post-types/rest-api/delete-post-type.php)

**Access:**
Admin-only, Rest API

**Example:**

```php
add_action( 'jet-engine/post-types/deleted-post-type', function( $post_type ) {
    jet_engine()->meta_boxes->update_object_type_in_meta_boxes( false, $post_type );
} );
```

## jet-engine/post-types/updated-post-type-slug

Виконується після того, як змінюється слаг кастомного пост-типу.

**Args:**
- `$new_slug` - string - новий слаг
- `$old_slug` - string - старий слаг

**Location:**
[includes/components/post-types/rest-api/edit-post-type.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/post-types/rest-api/edit-post-type.php)

**Access:**
Admin-only, Rest API

**Example:**

```php
add_action( 'jet-engine/post-types/updated-post-type-slug', function( $new_slug, $old_slug ) {
	jet_engine()->meta_boxes->update_object_type_in_meta_boxes( $new_slug, $old_slug );
}, 10, 2 );
```

## jet-engine/post-type/edit/before-enqueue-assets

Виконується перед тим, як будуть підключені основні скрипти для Edit Post Type сторінки.
Використовується для підключення скриптів кастомних Vue компонентів.

**Location:**
[includes/components/post-types/pages/edit.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/post-types/pages/edit.php)

**Access:**
Admin-only

**Example:**

```php
add_action( 'jet-engine/post-type/edit/before-enqueue-assets', function() {
	jet_engine()->register_jet_plugins_js();

	wp_enqueue_script( 'jet-plugins' );

	wp_enqueue_script(
		'jet-engine-meta-fields',
		jet_engine()->plugin_url( 'includes/components/meta-boxes/assets/js/fields.js' ),
		array( 'cx-vue-ui', 'wp-api-fetch' ),
		jet_engine()->get_version(),
		true
	);
} );
```

## jet-engine/post-types/meta-fields

Виконується після рендеру Advanced Settings секції на Edit Post Type сторінці https://tppr.me/uVAdf
Використовується для рендеру `jet-meta-fields` Vue компонента.

**Location:**
[includes/components/post-types/templates/edit.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/post-types/templates/edit.php)

**Access:**
Admin-only

**Example:**

```php
add_action( 'jet-engine/post-types/meta-fields', function() {
	echo '<jet-meta-fields v-model="metaFields"></jet-meta-fields>';
} );
```

## jet-engine/post-types/admin-filters/custom-controls

Використовується для рендеру кастомних Vue компонентів в репітер айтемі `jet-engine-admin-filters` компонента.

**Location:**
[includes/components/post-types/templates/filters.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/post-types/templates/filters.php)

**Access:**
Admin-only

**Example:**

```php
add_action( 'jet-engine/post-types/admin-filters/custom-controls', function() {
	$allowed_relations = array(
		array(
			'value' => '',
			'label' => __( 'Select relation...', 'jet-engine' ),
		)
	);

	foreach ( $this->allowed_relations as $rel_id => $rel ) {
		$allowed_relations[] = array(
			'value' => $rel_id,
			'label' => $rel->get_relation_name(),
		);
	}

	?>
	<cx-vui-select
		label="<?php _e( 'Relation', 'jet-engine' ); ?>"
		description="<?php _e( 'Select JetEngine relation to get items from', 'jet-engine' ); ?>"
		:wrapper-css="[ 'equalwidth' ]"
		size="fullwidth"
		v-if="'related_items' === filter.type"
		:options-list="<?php echo htmlspecialchars( json_encode( $allowed_relations ) ); ?>"
		:value="adminFilters[ index ].rel_id"
		@input="setFieldProp( filter._id, 'rel_id', $event, adminFilters )"
	></cx-vui-select>
	<?php
} );
```