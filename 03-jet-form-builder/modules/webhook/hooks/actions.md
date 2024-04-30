## Table of Contents

- [`jet-form-builder/webhook/{$action}`](#jet-form-builderwebhookaction)


## `jet-form-builder/webhook/{$action}`
This action hook is triggered within the `confirm` method of the Webhook module for a specific action, represented here by "sample-action". It allows custom handling for this particular action. The argument passed to the hook is an instance of the module class, providing context and data related to the webhook event.

### Parameters
- **$module_instance (object)**: An instance of the Webhook module class.

### Usage

```php
add_action( 'jet-form-builder/webhook/sample-action', function( $module_instance ) {
    // Custom handling for the 'sample-action' webhook event
    // $module_instance provides context and data
});
```

### Source
[Link to file in GitHub repository](https://github.com/Crocoblock/jetformbuilder)