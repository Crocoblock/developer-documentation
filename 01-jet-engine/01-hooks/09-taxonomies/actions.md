# Actions

## jet-engine/taxonomies/deleted-taxonomy

Executed after a custom taxonomy is deleted.

**Args:**
- `$taxonomy` - string - The slug of the deleted taxonomy.

**Location:**
includes/components/taxonomies/rest-api/delete-taxonomy.php

**Access:**
Admin-only, Rest API

**Example:**

```php
add_action( 'jet-engine/taxonomies/deleted-taxonomy', function( $taxonomy ) {
    jet_engine()->meta_boxes->update_object_type_in_meta_boxes( false, $taxonomy, 'tax' );
} );
```

## jet-engine/taxonomies/updated-taxonomy-slug

Executed after the slug of a custom taxonomy is updated.

**Args:**
- `$new_slug` - string - new slag
- `$old_slug` - string - old slug

**Location:**
includes/components/taxonomies/rest-api/edit-taxonomy.php

**Access:**
Admin-only, Rest API

**Example:**

```php
add_action( 'jet-engine/taxonomies/updated-taxonomy-slug', function( $new_slug, $old_slug ) {
	jet_engine()->meta_boxes->update_object_type_in_meta_boxes( $new_slug, $old_slug, 'tax' );
}, 10, 2 );
```

## jet-engine/taxonomies/edit/before-enqueue-assets

Executed before the main scripts are enqueued for the Edit Taxonomy page.
Used for enqueuing scripts of custom Vue components.

**Location:**
includes/components/taxonomies/pages/edit.php

**Access:**
Admin-only

**Example:**

```php
add_action( 'jet-engine/taxonomies/edit/before-enqueue-assets', function() {
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

## jet-engine/taxonomies/meta-fields

Executed after rendering the Advanced Settings section on the Edit Taxonomy page https://tppr.me/Hpead
Used for rendering the `jet-meta-fields` Vue component.

**Location:**
includes/components/taxonomies/templates/edit.php

**Access:**
Admin-only

**Example:**

```php
add_action( 'jet-engine/taxonomies/meta-fields', function() {
	echo '<jet-meta-fields v-model="metaFields" :hide-options="[ \'quick_editable\', \'revision_support\' ]"></jet-meta-fields>';
} );
```