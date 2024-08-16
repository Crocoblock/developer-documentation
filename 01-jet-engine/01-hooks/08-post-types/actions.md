# Actions

## jet-engine/post-types/admin-filters/custom-filter/{$type}

Allows rendering a custom Admin filter for the dynamic part of the filter `$type`, corresponding to the filter type https://tppr.me/P94lK.

**Args:**
- `$filter` - array - The filter settings.
- `$index` - int - The filter index.
- `$admin_filters` - Jet_Engine_CPT_Admin_Filters - The admin filter manager. 

**Location:**
includes/components/post-types/admin-filters.php

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

Executes after a custom post type is deleted.

**Args:**
- `$post_type` - string - The slug of the post type being deleted. 

**Location:**
includes/components/post-types/rest-api/delete-post-type.php

**Access:**
Admin-only, Rest API

**Example:**

```php
add_action( 'jet-engine/post-types/deleted-post-type', function( $post_type ) {
    jet_engine()->meta_boxes->update_object_type_in_meta_boxes( false, $post_type );
} );
```

## jet-engine/post-types/updated-post-type-slug

Executes after the slug of a custom post type is updated.

**Args:**
- `$new_slug` - string - The new slug. 
- `$old_slug` - string - The old slug. 

**Location:**
includes/components/post-types/rest-api/edit-post-type.php

**Access:**
Admin-only, Rest API

**Example:**

```php
add_action( 'jet-engine/post-types/updated-post-type-slug', function( $new_slug, $old_slug ) {
	jet_engine()->meta_boxes->update_object_type_in_meta_boxes( $new_slug, $old_slug );
}, 10, 2 );
```

## jet-engine/post-type/edit/before-enqueue-assets

Executes before the main scripts are enqueued for the Edit Post Type page.
Used for enqueuing scripts of custom Vue components.

**Location:**
includes/components/post-types/pages/edit.php

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

Executes after rendering the Advanced Settings section on the Edit Post Type page https://tppr.me/uVAdf
Used for rendering the `jet-meta-fields` Vue component.

**Location:**
includes/components/post-types/templates/edit.php

**Access:**
Admin-only

**Example:**

```php
add_action( 'jet-engine/post-types/meta-fields', function() {
	echo '<jet-meta-fields v-model="metaFields"></jet-meta-fields>';
} );
```

## jet-engine/post-types/admin-filters/custom-controls

Used for rendering custom Vue components in the repeater item of the `jet-engine-admin-filters` component.

**Location:**
includes/components/post-types/templates/filters.php

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