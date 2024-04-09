# Actions

## jet-engine/taxonomies/deleted-taxonomy

Виконується після того, як видаляється кастомна таксономія.

**Args:**
- `$taxonomy` - string - слаг таксономії, яка видаляється

**Location:**
[includes/components/taxonomies/rest-api/delete-taxonomy.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/taxonomies/rest-api/delete-taxonomy.php)

**Access:**
Admin-only, Rest API

**Example:**

```php
add_action( 'jet-engine/taxonomies/deleted-taxonomy', function( $taxonomy ) {
    jet_engine()->meta_boxes->update_object_type_in_meta_boxes( false, $taxonomy, 'tax' );
} );
```

## jet-engine/taxonomies/updated-taxonomy-slug

Виконується після того, як змінюється слаг кастомної кастономії.

**Args:**
- `$new_slug` - string - новий слаг
- `$old_slug` - string - старий слаг

**Location:**
[includes/components/taxonomies/rest-api/edit-taxonomy.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/taxonomies/rest-api/edit-taxonomy.php)

**Access:**
Admin-only, Rest API

**Example:**

```php
add_action( 'jet-engine/taxonomies/updated-taxonomy-slug', function( $new_slug, $old_slug ) {
	jet_engine()->meta_boxes->update_object_type_in_meta_boxes( $new_slug, $old_slug, 'tax' );
}, 10, 2 );
```

## jet-engine/taxonomies/edit/before-enqueue-assets

Виконується перед тим, як будуть підключені основні скрипти для Edit Taxonomy сторінки.
Використовується для підключення скриптів кастомних Vue компонентів.

**Location:**
[includes/components/taxonomies/pages/edit.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/taxonomies/pages/edit.php)

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

Виконується після рендеру Advanced Settings секції на Edit Taxonomy сторінці https://tppr.me/Hpead
Використовується для рендеру `jet-meta-fields` Vue компонента.

**Location:**
[includes/components/taxonomies/templates/edit.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/taxonomies/templates/edit.php)

**Access:**
Admin-only

**Example:**

```php
add_action( 'jet-engine/taxonomies/meta-fields', function() {
	echo '<jet-meta-fields v-model="metaFields" :hide-options="[ \'quick_editable\', \'revision_support\' ]"></jet-meta-fields>';
} );
```