Before using any method from the CCT module, make sure it is enabled
`jet_engine()->modules->is_module_active( 'custom-content-types' )`

## Get CCT Factory by slug

`\Jet_Engine\Modules\Custom_Content_Types\Module::instance()->manager->get_content_types( $cct_slug );`

### Parameters:
- `$cct_slug` *(string)* – слаг ССТ

### Returns
`\Jet_Engine\Modules\Custom_Content_Types\Factory`

### Usage example:
```php
$type_object = \Jet_Engine\Modules\Custom_Content_Types\Module::instance()->manager->get_content_types( $cct_slug );
```

## Get Item_Handler
Method of the `\Jet_Engine\Modules\Custom_Content_Types\Factory` class, \
which returns an instance of the `\Jet_Engine\Modules\Custom_Content_Types\Item_handler` class that can be used to create/update/delete CCT items

### Description of the Item_Handler class

```php
class Item_Handler {
    /**
     * Insert or update item
     * 
     * @param array $item_array Array of fields that need to be filled/updated
     *                          If this array contains _ID element - item with that ID will be updated.
     *                          Otherwise, a new item will be created.
	 * @return int|WP_Error     Returns item ID on success, or WP_Error on failure.
     */
    public function update_item( $item_array ) {}

    /**
	 * Delete CCT item without additional access checks.
	 * Used to delete CCT items programatically from anywhere.
	 * 
	 * All user access checks must be implemented before calling of this method!
	 * 
	 * @param  int $item_id Item ID to delete
	 * @return void
	 */
    public function raw_delete_item( $item_id ) {}

    /**
	 * Process single post
	 * This method is used to create or update a single post associated with the CCT item.
	 *
	 * @param  array  $item CCT item data. 'cct_single_post_id' key is used to store the ID of the single post.
	 *                      If this key is not set/is not valid, a new single post will be created.
	 * @return int|false    Returns the ID of the created/updated single post on success, or false on failure.
	 */
    public function process_single_post( $item_array ) {}
}
```

### Usage Example:
```php
$handler = $type_object->get_item_handler();
$item_id = $handler->update_item( array( 'f1' => 'test' ) );
$item_id = $handler->update_item( array( '_ID' => $item_id, 'f1' => 'test2' ) );
$handler->raw_delete_item( $item_id );
```


