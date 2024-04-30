# Table of contents
* [`jet-form-builder/before-init`](#jet-form-builderbefore-init)
* [`jet-form-builder/after-init`](#jet-form-builderafter-init)
* [`jet-form-builder/request`](#jet-form-builderrequest)
* [`jet-form-builder/form-handler/before-send`](#jet-form-builderform-handlerbefore-send)
* [`jet-form-builder/form-handler/after-send`](#jet-form-builderform-handlerafter-send)
* [`jet-form-builder/before-trigger-event`](#jet-form-builderbefore-trigger-event)
* [`jet-form-builder/after-trigger-event`](#jet-form-builderafter-trigger-event)
* [`jet-form-builder/gateways/register`](#jet-form-buildergatewaysregister)
* [`jet-form-builder/gateways/before-send`](#jet-form-buildergatewaysbefore-send)
* [`jet-form-builder/editor-package/before`](#jet-form-buildereditor-packagebefore)
* [`jet-form-builder/editor-assets/before`](#jet-form-buildereditor-assetsbefore)
* [`jet-form-builder/editor-assets/after`](#jet-form-buildereditor-assetsafter)
* [`jet-form-builder/blocks/register`](#jet-form-builderblocksregister)
* [`jet-fb/admin-pages/before-assets/{$current_page_slug}`](#jet-fbadmin-pagesbefore-assetscurrent_page_slug)


## `jet-form-builder/before-init`
Executed before plugin initialization on hook `after_setup_theme` with priority 0.

### Usage
```php
add_action(
	'jet-form-builder/before-init',
	function() {
		// your code
	}
);
```

### Source
https://github.com/Crocoblock/jetformbuilder/blob/main/includes/plugin.php#L210

## `jet-form-builder/after-init`
Executed after plugin initialization on hook `after_setup_theme` with priority 0.

### Usage
```php
add_action(
	'jet-form-builder/after-init',
	function() {
		// your code
	}
);
```

### Source
https://github.com/Crocoblock/jetformbuilder/blob/main/includes/plugin.php#L214

## `jet-form-builder/request`
It is executed before executing actions on the event `DEFAULT.PROCESS` (with a regular submission). 
This event initializes the global request context. (See function `jet_fb_context()`)

### Usage
```php
add_action(
	'jet-form-builder/request',
	function() {
		// your code
	}
);
```

### Source
https://github.com/Crocoblock/jetformbuilder/blob/main/includes/request/request-handler.php

## `jet-form-builder/form-handler/before-send`
It is performed before the execution of all actions in the normal submission of the form. In other words, before running the event `DEFAULT.PROCESS`

### Parameters
* $handler [`\Jet_Form_Builder\Form_Handler`](https://github.com/Crocoblock/jetformbuilder/blob/main/includes/form-handler.php)

### Usage
```php
add_action(
	'jet-form-builder/form-handler/before-send',
	/**
	 * @var \Jet_Form_Builder\Form_Handler $handler
	 */
	function( $handler ) {
		// your code
	},
	10,
	1
);
```

### Source
https://github.com/Crocoblock/jetformbuilder/blob/main/includes/form-handler.php#L295

## `jet-form-builder/form-handler/after-send`
It is executed after all actions are executed during the normal submission of the form. In other words, after running the `DEFAULT.REQUIRED` event

### Parameters
* $handler [`\Jet_Form_Builder\Form_Handler`](https://github.com/Crocoblock/jetformbuilder/blob/main/includes/form-handler.php)
* $is_success `boolean` (The result of form processing)

### Usage
```php
add_action(
	'jet-form-builder/form-handler/after-send',
	/**
	 * @var \Jet_Form_Builder\Form_Handler $handler
	 */
	function( $handler, bool $is_success ) {
		// your code
	},
	10,
	2
);
```

### Source
https://github.com/Crocoblock/jetformbuilder/blob/main/includes/form-handler.php#L338

## `jet-form-builder/before-trigger-event`
It is executed before starting the actions that belong to the event passed in the first parameter.

### Parameters
* $event [`\Jet_Form_Builder\Actions\Events\Base_Event`](https://github.com/Crocoblock/jetformbuilder/blob/main/includes/actions/events/base-event.php) (This will be an object, a class that extends from Base_Event)

### Usage
```php
add_action(
	'jet-form-builder/before-trigger-event',
	/**
	 * @var \Jet_Form_Builder\Actions\Events\Base_Event $event
	 */
	function( $event ) {
		// your code
	},
	10,
	1
);
```

### Source
https://github.com/Crocoblock/jetformbuilder/blob/main/includes/actions/events-manager.php#L71

## `jet-form-builder/after-trigger-event`
Executed after launching the actions that belong to the event passed in the first parameter.\
**Note**: _if one of the actions returns an error (exception) during execution, this hook will not be executed._

### Parameters
* $event [`\Jet_Form_Builder\Actions\Events\Base_Event`](https://github.com/Crocoblock/jetformbuilder/blob/main/includes/actions/events/base-event.php) (This will be an object, a class that extends from Base_Event)

### Usage
```php
add_action(
	'jet-form-builder/after-trigger-event',
	/**
	 * @var \Jet_Form_Builder\Actions\Events\Base_Event $event
	 */
	function( $event ) {
		// your code
	},
	10,
	1
);
```

### Source
https://github.com/Crocoblock/jetformbuilder/blob/main/includes/actions/events-manager.php#L73

## `jet-form-builder/gateways/register`
It is launched after the installation of basic payment gateways. Currently it is only PayPal.\
Runs on the `init` hook.\
You can register your own gateway on it. A full example of how to do it can be found here https://github.com/girafffee/jfb-custom-gateway

### Parameters
* $manager [`\Jet_Form_Builder\Gateways\Gateway_Manager`](https://github.com/Crocoblock/jetformbuilder/blob/main/includes/gateways/gateway-manager.php)

### Usage
```php
add_action(
	'jet-form-builder/gateways/register',
	/**
	 * Full example here
	 * @link https://github.com/girafffee/jfb-custom-gateway
	 * 
	 * @var \Jet_Form_Builder\Gateways\Gateway_Manager $manager
	 */
	function( $manager ) {
		// your code
	},
	10,
	2
);
```

### Source
https://github.com/Crocoblock/jetformbuilder/blob/main/includes/gateways/gateway-manager.php#L112

## `jet-form-builder/gateways/before-send`
It is launched after passing the payment gateway. Event trigger `GATEWAY.SUCCESS` or `GATEWAY.FAILED` occurs before this hook.


## `jet-form-builder/editor-package/before`
Runs before enqueuing package scripts on the edit page of the form. At this point, the JetFormBuilder has not added any scripts to the queue

### Parameters
* $editor [`\Jet_Form_Builder\Admin\Editor`](https://github.com/Crocoblock/jetformbuilder/blob/main/includes/admin/editor.php)
* $handle `string` ('jet-form-builder-editor-package')

### Usage
```php
add_action(
	'jet-form-builder/editor-package/before',
	/**
	 * @var \Jet_Form_Builder\Admin\Editor $editor
         * @var string $handle
	 */
	function( $editor, $handle ) {
		// your code
	},
	10,
	2
);
```

### Source
https://github.com/Crocoblock/jetformbuilder/blob/main/includes/admin/editor.php#L315

## `jet-form-builder/editor-assets/before`
Runs before adding the final scripts to the form edit page. At this point, JetFormBuilder has added the package scripts to the queue

### Parameters
* $editor [`\Jet_Form_Builder\Admin\Editor`](https://github.com/Crocoblock/jetformbuilder/blob/main/includes/admin/editor.php)
* $handle `string` ('jet-form-builder-editor')

### Usage
```php
add_action(
    'jet-form-builder/editor-assets/before',
     /**
     * @var \Jet_Form_Builder\Admin\Editor $editor
     * @var string $handle
     */
    function( $editor, $handle ) {
        // your code
    },
    10,
    2
);
```

### Source
https://github.com/Crocoblock/jetformbuilder/blob/main/includes/admin/editor.php#L350

## `jet-form-builder/editor-assets/after`
Executed at the very end after adding all the scripts to the edit page of the form.

### Parameters
* $editor [`\Jet_Form_Builder\Admin\Editor`](https://github.com/Crocoblock/jetformbuilder/blob/main/includes/admin/editor.php)
* $handle `string` ('jet-form-builder-editor')

### Usage
```php
add_action(
	'jet-form-builder/editor-assets/after',
	/**
	 * @var \Jet_Form_Builder\Admin\Editor $editor
         * @var string $handle
	 */
	function( $editor, $handle ) {
		// your code
	},
	10,
	2
);
```

### Source
https://github.com/Crocoblock/jetformbuilder/blob/main/includes/admin/editor.php#L401

## `jet-form-builder/blocks/register`
Runs after registering all main blocks, including the form block itself. On this hook, we can register a custom field for the form.

### Parameters
* $manager [`\Jet_Form_Builder\Blocks\Manager`](https://github.com/Crocoblock/jetformbuilder/blob/main/includes/blocks/manager.php)

### Usage
```php
add_action(
	'jet-form-builder/blocks/register',
	/**
	 * @var \Jet_Form_Builder\Blocks\Manager $manager
	 */
	function ( $manager ) {
        // $manager->register_block_type( $block_instance );
	}
);
```

### Source
https://github.com/Crocoblock/jetformbuilder/blob/main/includes/blocks/manager.php#L97

## `jet-fb/admin-pages/before-assets/{$current_page_slug}`
Executed before adding scripts to the queue, and after registering them on the page for each JetFormBuilder child page.

### Parameters
* $manager [`\Jet_Form_Builder\Admin\Pages\Pages_Manager`](https://github.com/Crocoblock/jetformbuilder/blob/main/includes/admin/pages/pages-manager.php)

### Usage
```php
add_action(
	'jet-fb/admin-pages/before-assets/jfb-settings',
	/**
	 * @var \Jet_Form_Builder\Admin\Pages\Pages_Manager $manager
	 */
	function ( $manager ) {
		// your code
	}
);
```

### Source
https://github.com/Crocoblock/jetformbuilder/blob/main/includes/admin/pages/pages-manager.php#L147
