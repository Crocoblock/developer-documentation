# JetEngine. Custom Content Types. Filters.

## jet-engine/custom-content-types/item-to-update

Allows filtering the item content before it is updated

**Args:**
- `$item` - an array of new item field values in the format 'field name' => 'value';

            містить також і службові поля:
            _ID                  item ID
            cct_status           status - publish / draft
            cct_author_id        ID of the item author
            cct_created          item creation date, in the format Y-m-d H:i:s
            cct_modified         item modifiction date, in the format Y-m-d H:i:s

            optional, if the ССТ has the `Has single post` option is on
            cct_single_post_id   ID of the post that works as a Single for the CCT item 

- `$fields` - масив параметрів мета полів ССТ у форматі 'назва поля' => 'масив параметрів'

- `$item_handler` - object of the class \Jet_Engine\Modules\Custom_Content_Types\Item_Handler 
                    (includes/modules/custom-content-types/inc/item-handler.php)

**Location:**
/includes/modules/custom-content-types/inc/item-handler.php

**Access:**
Global

**Example:**

```php
add_filter( 
  'jet-engine/custom-content-types/item-to-update', 
  function( $item, $fields, $item_handler ) {
    //do something with $item
    return $item;
  }, 
  0, 
  3 
);
```

## jet-engine/custom-content-types/update-item/sanitize-field-value

Allows filtering the value of the particular field before updating it 

**Args:**
- `$value` - field value

- `$field_name` - field name

- `$field_data` - field parameters

**Location:**
/includes/modules/custom-content-types/inc/item-handler.php

**Access:**
Global

**Example:**

```php
//save empty numeric fields as NULL instead of 0
add_filter( 'jet-engine/custom-content-types/update-item/sanitize-field-value', function( $value, $$field_name, $field_data ) {
	if ( ! empty( $field_data['type'] ) && $field_data['type'] === 'number' && \Jet_Engine_Tools::is_empty( $value ) ) {
		$value = null;
	}
	
	return $value;
}, 10, 3  );
```
