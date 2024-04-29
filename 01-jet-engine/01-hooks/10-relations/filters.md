# Filters

## jet-engine/relations/raw-relations

Allows filtering the array of created relations and their arguments before they are registered.

**Args:**
- `$relations` - array - List of created relations.

**Location:**
[includes/components/relations/manager.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/relations/manager.php)

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/relations/raw-relations', function( $relations ) {
    // do something
    return $relations;
} );
```

## jet-engine/relations/registered-relation

Allows registering third-party legacy relations.

**Args:**
- `$relations` - array - List of third-party legacy relations.

**Location:**
[includes/components/relations/manager.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/relations/manager.php) <br>
[includes/components/relations/legacy/manager.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/relations/legacy/manager.php)

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/relations/registered-relation', function( $relations ) {

    if ( empty( $relations ) ) {
        $relations = array();
    }

    $relations['item-0'] = array(
         'id'                  => 'item-0',
        'name'                => 'services to providers',
        'post_type_1'         => 'services_post_type',
        'post_type_2'         => 'providers_post_type',
        'type'                => 'many_to_many',
        'post_type_1_control' => 1,
        'post_type_2_control' => 1,
        'parent_relation'     => '',
    );
    
    return $relations;
} );
```

## jet-engine/relations/column-content/{$key}

Allows filtering the content of a custom column in the relations table https://prnt.sc/JzM1WuAWpFp9 based on the dynamic part of the `$key` filter.

**Args:**
- `$content` - string - Column content.
- `$item_id` - integer - ID of the related item (Post ID, Term ID, ...).
- `$type` - string - Type of the item (post-type, taxonomy, ...).
- `$relation` - object - Relation object.

**Location:**
[includes/components/relations/ajax-handlers.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/relations/ajax-handlers.php)

**Access:**
Admin-only

**Example:**

```php
add_filter( 'jet-engine/relations/column-content/custom-column', function( $content, $item_id, $type, $relation ) {
    // do something
    return $content;
}, 10, 4 );
```

## jet-engine/relations/meta/image-alt/

Allows changing the alternative text for the relation meta image displayed via Dynamic Image.

**Args:**
- `$alt` - boolean | string - Image ALT text.
- `$current_object` - object - Current object.

**Location:**
[includes/components/relations/listing.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/relations/listing.php)

**Access:**
Frontend-only

**Example:**

```php
add_filter( 'jet-engine/relations/meta/image-alt/', function( $alt, $current_object ) {
    // do something
    return $alt;
}, 10, 2 );
```

## jet-engine/relations/db/cache-key

Allows changing the mechanism of forming a unique cache key for relations query.

**Args:**
- `$cache_key` - string - Cache key.
- `$args` - array - Query arguments.
- `$limit` - integer - Query limit.
- `$offset` - integer - Query offset.
- `$order` - array - Query order.
- `$rel` - string - Relation for query arguments. `AND` or `OR`.

**Location:**
[includes/components/relations/storage/db.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/relations/storage/db.php)

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/relations/db/cache-key', function( $cache_key, $args, $limit, $offset, $order, $rel ) {
    $cache_key = md5( 'my-prefix-' . json_encode( $args ) . json_encode( $order ) . $limit . $offset . $rel );
    return $cache_key;
}, 10, 6 );
```

## jet-engine/relations/get_related_posts

Legacy. Allows changing the list of related posts.

**Args:**
- `$ids` - array | string - List of related post IDs.

**Location:**
[includes/components/relations/legacy/manager.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/relations/legacy/manager.php)

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/relations/get_related_posts', function( $ids ) {
    if ( is_array( $ids ) ) {
        foreach ( $ids as $id ) {
            $ids[ $id ] = apply_filters( 'wpml_object_id', $id, get_post_type( $id ), true );
        }
    } else {
        $ids = apply_filters( 'wpml_object_id', $ids, get_post_type( $ids ), true );
    }

    return $ids;
} );
```

## jet-engine/relations/types/mix

Allows registering new objects for the Mix type.

**Args:**
- `$objects` - array - List of objects in the following format:
  ```php
  array( 
    'value' => 'users', 
    'label' => 'Users', 
    'label_single' => 'Users' 
  );
  ```

**Location:**
[includes/components/relations/types/mix.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/relations/types/mix.php)

**Access:**
Admin-only

**Example:**

```php
add_filter( 'jet-engine/relations/types/mix', function ( $objects ) {

    $objects['object_name'] = array(
        'value'        => 'object_name',
        'label'        => 'Object Label',
        'label_single' => 'Object Label Single',
    );

    return $objects;
} );
```

## jet-engine/relations/types/mix/check-cap/{$object_name}

Allows determining whether the current user has the rights to edit or delete this object in relations.

**Args:**
- `$result` - bool - Default: false.
- `$cap` - string - Capability, can be `edit` або `delete`.
- `$item_id` - int|string - ID of the object.

**Location:**
[includes/components/relations/types/mix.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/relations/types/mix.php)

**Access:**
Admin-only

**Example:**

```php
add_filter( 'jet-engine/relations/types/mix/check-cap/my_custom_object_name', function ( $result, $cap, $item_id ) {
    switch ( $cap ) {
        case 'edit':
            return current_user_can( 'edit_users' );

        case 'delete':
            return false;
    }
    
    return $result;
}, 10, 3 );
```

## jet-engine/relations/types/mix/items/{$object_name}

General description

**Args:**
- `$arg_name` - arg description

**Location:**
[includes/components/relations/types/mix.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/relations/types/mix.php)

**Access:**
Global, frontend-only, admin-only

**Example:**

```php
code of the example
```

## jet-engine/relations/types/mix/item-title/{$object_name}

General description

**Args:**
- `$arg_name` - arg description

**Location:**
[includes/components/relations/types/mix.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/relations/types/mix.php)

**Access:**
Global, frontend-only, admin-only

**Example:**

```php
code of the example
```

## jet-engine/relations/types/mix/item-edit-url/{$object_name}

General description

**Args:**
- `$arg_name` - arg description

**Location:**
[includes/components/relations/types/mix.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/relations/types/mix.php)

**Access:**
Global, frontend-only, admin-only

**Example:**

```php
code of the example
```

## jet-engine/relations/types/mix/item-view-url/{$object_name}

General description

**Args:**
- `$arg_name` - arg description

**Location:**
[includes/components/relations/types/mix.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/relations/types/mix.php)

**Access:**
Global, frontend-only, admin-only

**Example:**

```php
code of the example
```

## jet-engine/relations/types/mix/delete-item/{$object_name}

General description

**Args:**
- `$arg_name` - arg description

**Location:**
[includes/components/relations/types/mix.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/relations/types/mix.php)

**Access:**
Global, frontend-only, admin-only

**Example:**

```php
code of the example
```

## jet-engine/relations/types/mix/create-fields/users

General description

**Args:**
- `$arg_name` - arg description

**Location:**
[includes/components/relations/types/mix.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/relations/types/mix.php)

**Access:**
Global, frontend-only, admin-only

**Example:**

```php
code of the example
```

## jet-engine/relations/types/mix/create-fields/{$object_name}

General description

**Args:**
- `$arg_name` - arg description

**Location:**
[includes/components/relations/types/mix.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/relations/types/mix.php)

**Access:**
Global, frontend-only, admin-only

**Example:**

```php
code of the example
```

## jet-engine/relations/types/mix/create-item/{$object_name}

General description

**Args:**
- `$arg_name` - arg description

**Location:**
[includes/components/relations/types/mix.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/relations/types/mix.php)

**Access:**
Global, frontend-only, admin-only

**Example:**

```php
code of the example
```

## jet-engine/relations/types/mix/get-object-by-id/{$object_name}

General description

**Args:**
- `$arg_name` - arg description

**Location:**
[includes/components/relations/types/mix.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/relations/types/mix.php)

**Access:**
Global, frontend-only, admin-only

**Example:**

```php
code of the example
```

## jet-engine/relations/types/mix/is-object-of-type/{$object_name}

General description

**Args:**
- `$arg_name` - arg description

**Location:**
[includes/components/relations/types/mix.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/relations/types/mix.php)

**Access:**
Global, frontend-only, admin-only

**Example:**

```php
code of the example
```

## jet-engine/relations/types/mix/filtered-query-args/{$object_name}

General description

**Args:**
- `$arg_name` - arg description

**Location:**
[includes/components/relations/types/mix.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/relations/types/mix.php)

**Access:**
Global, frontend-only, admin-only

**Example:**

```php
code of the example
```

## jet-engine/relations/types/posts/get-items

General description

**Args:**
- `$arg_name` - arg description

**Location:**
[includes/components/relations/types/posts.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/relations/types/posts.php)

**Access:**
Global, frontend-only, admin-only

**Example:**

```php
code of the example
```

## jet-engine/relations/types/posts/create-fields

General description

**Args:**
- `$arg_name` - arg description

**Location:**
[includes/components/relations/types/posts.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/relations/types/posts.php)

**Access:**
Global, frontend-only, admin-only

**Example:**

```php
code of the example
```

## jet-engine/relations/types/terms/create-fields

General description

**Args:**
- `$arg_name` - arg description

**Location:**
[includes/components/relations/types/terms.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/relations/types/terms.php)

**Access:**
Global, frontend-only, admin-only

**Example:**

```php
code of the example
```

## jet-engine/relations/raw-args

General description

**Args:**
- `$arg_name` - arg description

**Location:**
[includes/components/relations/relation.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/relations/relation.php)

**Access:**
Global, frontend-only, admin-only

**Example:**

```php
code of the example
```

## jet-engine/relations/get-children

General description

**Args:**
- `$arg_name` - arg description

**Location:**
[includes/components/relations/relation.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/relations/relation.php)

**Access:**
Global, frontend-only, admin-only

**Example:**

```php
code of the example
```

## jet-engine/relations/get-parents

General description

**Args:**
- `$arg_name` - arg description

**Location:**
[includes/components/relations/relation.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/relations/relation.php)

**Access:**
Global, frontend-only, admin-only

**Example:**

```php
code of the example
```

## jet-engine/relations/get-siblings

General description

**Args:**
- `$arg_name` - arg description

**Location:**
[includes/components/relations/relation.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/relations/relation.php)

**Access:**
Global, frontend-only, admin-only

**Example:**

```php
code of the example
```

## jet-engine/relations/sources-list

General description

**Args:**
- `$arg_name` - arg description

**Location:**
[includes/components/relations/sources.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/relations/sources.php)

**Access:**
Global, frontend-only, admin-only

**Example:**

```php
code of the example
```

## jet-engine/relations/object-id-by-source/{$source}

General description

**Args:**
- `$arg_name` - arg description

**Location:**
[includes/components/relations/sources.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/relations/sources.php)

**Access:**
Global, frontend-only, admin-only

**Example:**

```php
code of the example
```

## jet-engine/relations/types

General description

**Args:**
- `$arg_name` - arg description

**Location:**
[includes/components/relations/types-helper.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/relations/types-helper.php)

**Access:**
Global, frontend-only, admin-only

**Example:**

```php
code of the example
```

## jet-engine/relations/user-meta-control/show-on-profile

General description

**Args:**
- `$arg_name` - arg description

**Location:**
[includes/components/relations/controls/user-meta.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/relations/controls/user-meta.php)

**Access:**
Global, frontend-only, admin-only

**Example:**

```php
code of the example
```
