# Filters

## jet-engine/taxonomies/excluded-built-in-types

Allows modifying the list of excluded built-in taxonomies that cannot be edited in the Taxonomies UI https://tppr.me/x7HpB. 

**Args:**
- `$excluded_types` - array - The list of excluded taxonomies.

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

Allows registering additional meta fields for dynamic parts of the filter $object_type (post-type, taxonomy, user) and `$object` (post, page, category, post_tag, ...) that will be used via the `get_meta_fields_for_object` method.

**Args:**
- `$fields` - array - The list of meta fields. 

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