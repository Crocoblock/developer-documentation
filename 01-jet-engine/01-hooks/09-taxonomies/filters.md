# Filters

## jet-engine/taxonomies/excluded-built-in-types

Дозволяє змінювати список виключених вбудованих таксономій, які не можна редагувати в Taxonomies UI https://tppr.me/x7HpB.

**Args:**
- `$excluded_types` - array - список виключених таксономій

**Location:**
[includes/components/taxonomies/pages/list.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/taxonomies/pages/list.php)

**Access:**
Admin-only

**Example:**

```php
add_filter( 'jet-engine/taxonomies/excluded-built-in-types', function( $excluded_types ) {
    $excluded_types[] = 'wp_template_part_area';
    return $excluded_types;
} );
```

## jet-engine/{$object_type}/{$object}/meta-fields

Дозволяє реєструвати додаткові мета поля по динамічним частинам фільтра `$object_type`(post-type, taxonomy, user) та
`$object`(post, page, category, post_tag, ...), які будуть використовуватися через метод `get_meta_fields_for_object`

**Args:**
- `$fields` - array - список мета полів

**Location:**
[includes/components/taxonomies/manager.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/taxonomies/manager.php)

**Access:**
Admin-only

**Example:**

```php
add_filter( 'jet-engine/taxonomy/product_cat/meta-fields', function ( $fields ) {

    if ( empty( $fields ) ) {
        $fields = array();
    }

    $fields[] = array(
        'name'  => 'thumbnail_id',
        'type'  => 'media',
        'title' => __( 'Thumbnail', 'jet-engine' ),
    );
    
    return $fields;
} );
```