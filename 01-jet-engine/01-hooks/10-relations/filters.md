# Filters

## jet-engine/relations/raw-relations

Дозволяє фільтрувати масив створених релейшенів та їх аргументів, перед тим, як вони будуть реєструватися.

**Args:**
- `$relations` - array - Список створених релейшенів.

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

Дозволяє реєструвати сторонні легасі релейшени.

**Args:**
- `$relations` - array - Список сторонніх легасі релейшенів.

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

Дозволяє фільтрувати контент кастомної колонки в таблиці релейшенів https://prnt.sc/JzM1WuAWpFp9 по динамічній частині фільтра `$key`.

**Args:**
- `$content` - string - Контент колонки.
- `$item_id` - integer - ID релейтед айтема ( Post ID, Term ID, ... ).
- `$type` - string - Тип айтема ( post-type, taxonomy, ... ).
- `$relation` - object - Релейшен об'єкт.

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

Дозволяє змінити алтернативний текст для релейшен мета картинки, яка виводиться через Dynamic Image.

**Args:**
- `$alt` - boolean | string - Алтернативний текст картинки.
- `$current_object` - object - Поточний об'єкт.

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

Дозволяє змінити механізм формування унікального кеш ключа для запиту релейшенів.

**Args:**
- `$cache_key` - string - Кеш ключ.
- `$args` - array - Аргументи запиту.
- `$limit` - integer - Ліміт запиту.
- `$offset` - integer - Офсет запиту.
- `$order` - array - Ордер запиту.
- `$rel` - string - Релейшен для аргументів запиту. `AND` або `OR`.

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

Legacy. Дозволяє змінити список релейтед постів.

**Args:**
- `$ids` - array | string - Список ID релейтед постів.

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

Дозволяє реєструвати нові об'єкти для Mix типу.

**Args:**
- `$objects` - array - Список об'єктів в форматі
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

Дозволяє встановити чи мaє поточний користувач права змінити або видалити цей об'єкт в релейшенах.

**Args:**
- `$result` - bool - Default: false.
- `$cap` - string - Капабіліті, може бути `edit` або `delete`.
- `$item_id` - int|string - ID об'єкта.

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
