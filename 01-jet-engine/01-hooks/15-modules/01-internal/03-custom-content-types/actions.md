# JetEngine. Custom Content Types. Actions

## Hooks before/after updating/creating/deleting CCT item 
Have arguments common to all:

- `$item` - an array of new item field values in the format 'field name' => 'value';
           also have service fields:
            _ID                  item id
            cct_status           status - publish / draft
            cct_author_id        ID item author
            cct_created          item creation date, in the format Y-m-d H:i:s
            cct_modified         item modification date, in the format Y-m-d H:i:s

            optionalо, if the ССТ has the `Has single post` option on
            cct_single_post_id   ID of the post that works as a Single for the CCT item 

- `$prev_item` - an array of previous item field values in the format 'field name' => 'value';  
                    contains the same service fields

- `$item_handler` - object of the class \Jet_Engine\Modules\Custom_Content_Types\Item_Handler 
                    (includes/modules/custom-content-types/inc/item-handler.php)

### jet-engine/custom-content-types/update-item/{$cct_slug}

Hook fires before the CCT item update 

**Args:**
described in the beginning of the section

**Location:**
/includes/modules/custom-content-types/inc/item-handler.php

**Access:**
Global

**Example:**

```php
add_action( 
  'jet-engine/custom-content-types/update-item/' . $cct_slug, 
  function( $item, $prev_item, $item_handler ) {
    //do something
  }, 
  0, 
  3 
);
```

### jet-engine/custom-content-types/updated-item/{$cct_slug}

Hook fires after updating the CCT item

**Args:**
- `$item` - described in the beginning of the section

- `$prev_item` - described in the beginning of the section

- `$item_handler` - described in the beginning of the section

**Location:**
/includes/modules/custom-content-types/inc/item-handler.php

**Access:**
Global

**Example:**

```php
add_action( 
  'jet-engine/custom-content-types/updated-item/' . $cct_slug, 
  function( $item, $item_handler ) {
    //do something
  }, 
  0, 
  3 
);
```

### jet-engine/custom-content-types/create-item/{$cct_slug}

Hook fires before the CCT item creation 

**Args:**
- `$item` - described in the beginning of the section

- `$item_handler` - described in the beginning of the section

**Location:**
/includes/modules/custom-content-types/inc/item-handler.php

**Access:**
Global

**Example:**

```php
add_action( 
  'jet-engine/custom-content-types/create-item/' . $cct_slug, 
  function( $item, $item_handler ) {
    //do something
  }, 
  0, 
  2 
);
```

### jet-engine/custom-content-types/created-item/{$cct_slug}

Hook fires after the CCT item creation 

**Args:**
- `$item` - described in the beginning of the section

- `$item_id` - described in the beginning of the section

- `$item_handler` - described in the beginning of the section

**Location:**
/includes/modules/custom-content-types/inc/item-handler.php

**Access:**
Global

**Example:**

```php
add_action( 
  'jet-engine/custom-content-types/created-item/' . $cct_slug, 
  function( $item, $item_id, $item_handler ) {
    //do something
  }, 
  0, 
  3 
);
```

### jet-engine/custom-content-types/delete-item/{$cct_slug}

Hook fires after deleting a CCT item

**Args:**
- `$item_id` - ID of the created item 

- `$item` - described in the beginning of the section

- `$item_handler` - described in the beginning of the section

**Location:**
/includes/modules/custom-content-types/inc/item-handler.php

**Access:**
Global

**Example:**

```php
add_action( 
  'jet-engine/custom-content-types/delete-item/' . $cct_slug, 
  function( $item_id, $item, $item_handler ) {
    //do something
  }, 
  0, 
  3 
);
```
