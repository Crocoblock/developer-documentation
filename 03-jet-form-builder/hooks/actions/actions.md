# JetFormBuilder. Action-related actions

## Table of contents
* [`jet-form-builder/actions/before-send`](#jet-form-builderactionsbefore-send)
* [`jet-form-builder/actions/after-send`](#jet-form-builderactionsafter-send)
* [`jet-form-builder/actions/register`](#jet-form-builderactionsregister)
* [`jet-form-builder/action/after-post-insert`](#jet-form-builderactionafter-post-insert)
* [`jet-form-builder/action/after-post-update`](#jet-form-builderactionafter-post-update)
* [`jet-form-builder/action/webhook/response`](#jet-form-builderactionwebhookresponse)
* [`jet-form-builder/custom-action/{$hook_name}`](#jet-form-buildercustom-actionhook_name)


## `jet-form-builder/actions/before-send`
Analogue of [`jet-form-builder/before-trigger-event`](#jet-form-builderbefore-trigger-event). But this hook is executed only on the `DEFAULT.PROCESS` event.

### Usage
```php
add_action(
	'jet-form-builder/actions/before-send',
	function() {
		// your code
	}
);
```

### Source
https://github.com/Crocoblock/jetformbuilder/blob/main/includes/actions/events/default-process/default-process-executor.php

## `jet-form-builder/actions/after-send`
Analogue of [`jet-form-builder/after-trigger-event`](#jet-form-builderafter-trigger-event). But this hook is executed only on the `DEFAULT.PROCESS` event.\
**Note**: _if one of the actions returns an error (exception) during execution, this hook will not be executed._

### Usage
```php
add_action(
	'jet-form-builder/actions/after-send',
	function() {
		// your code
	}
);
```

### Source
https://github.com/Crocoblock/jetformbuilder/blob/main/includes/actions/events/default-process/default-process-executor.php

## `jet-form-builder/actions/register`
It is performed after registration of all actions on hook `init` with priority `99`.\
Usually used to register additional actions with `$manager->register_action_type( $action_instance )`

### Parameters
* $manager [`\Jet_Form_Builder\Actions\Manager`](https://github.com/Crocoblock/jetformbuilder/blob/main/includes/actions/manager.php)

### Usage
```php
add_action(
	'jet-form-builder/actions/register',
	/**
	 * @var \Jet_Form_Builder\Actions\Manager $manager
	 */
	function( $manager ) {
		$manager->register_action_type( /* instance of \Jet_Form_Builder\Actions\Types\Base */ );
	},
	10,
	1
);
```

### Source
https://github.com/Crocoblock/jetformbuilder/blob/main/includes/actions/manager.php

## `jet-form-builder/action/after-post-insert`
Executed after creating a new post through the Insert/Update Post action.

### Parameters
* $action [`\Jet_Form_Builder\Actions\Types\Base`](https://github.com/Crocoblock/jetformbuilder/blob/main/includes/actions/types/base.php)
  (This will be an object, a class that extends from Base)
* $handler [`\Jet_Form_Builder\Actions\Action_Handler`](https://github.com/Crocoblock/jetformbuilder/blob/main/includes/actions/action-handler.php)

### Usage
```php
add_action(
	'jet-form-builder/action/after-post-insert',
	/**
	 * @var \Jet_Form_Builder\Actions\Types\Base $action
	 * @var \Jet_Form_Builder\Actions\Action_Handler $handler
	 */
	function( $action, $handler ) {
		// Get the inserted post ID
		$ID = $handler->get_inserted_post_id( $action->_id );

		// your code
	},
	10,
	2
);
```

### Source
https://github.com/Crocoblock/jetformbuilder/blob/main/includes/actions/methods/post-modification/base-post-action.php

## `jet-form-builder/action/after-post-update`
Executed after updating the post through the Insert/Update Post action.

### Parameters
* $action [`\Jet_Form_Builder\Actions\Types\Base`](https://github.com/Crocoblock/jetformbuilder/blob/main/includes/actions/types/base.php)
  (This will be an object, a class that extends from Base)
* $handler [`\Jet_Form_Builder\Actions\Action_Handler`](https://github.com/Crocoblock/jetformbuilder/blob/main/includes/actions/action-handler.php)

### Usage
```php
add_action(
	'jet-form-builder/action/after-post-update',
	/**
	 * @var \Jet_Form_Builder\Actions\Types\Base $action
	 * @var \Jet_Form_Builder\Actions\Action_Handler $handler
	 */
	function( $action, $handler ) {
		// Get the inserted post ID
		$ID = $handler->get_inserted_post_id( $action->_id );

		// your code
	},
	10,
	2
);
```

### Source
https://github.com/Crocoblock/jetformbuilder/blob/main/includes/actions/methods/post-modification/base-post-action.php

## `jet-form-builder/action/webhook/response`
Runs after executing [wp_remote_post](https://developer.wordpress.org/reference/functions/wp_remote_post/) if the result did not return [WP_Error](https://developer.wordpress.org/reference/classes/wp_error/).

### Parameters
* $response `array` (response from wp_remote_post)
* $settings `array` (settings of current action)
* $action [`\Jet_Form_Builder\Actions\Types\Base`](https://github.com/Crocoblock/jetformbuilder/blob/main/includes/actions/types/base.php) (Call_Webhook instance)

### Usage
```php
add_action(
	'jet-form-builder/action/webhook/response',
	/**
	 * @var array $response
	 * @var array $settings
	 * @var \Jet_Form_Builder\Actions\Types\Base $action
	 */
	function( $response, $settings, $action ) {
		// your code
	},
	10,
	3
);
```

### Source
https://github.com/Crocoblock/jetformbuilder/blob/main/includes/actions/types/call-webhook.php

## `jet-form-builder/custom-action/{$hook_name}`
This hook is executed only if there is a Call Hook action form. With its help, you can perform any actions.
But if your logic involves some complex operations that might cause an error, then you should throw `\Jet_Form_Builder\Exceptions\Action_Exception` in such cases.

When an exception is thrown, the form interrupts further execution of actions.

### Parameters
* $request `array`
* $handler [`\Jet_Form_Builder\Actions\Action_Handler`](https://github.com/Crocoblock/jetformbuilder/blob/main/includes/actions/action-handler.php)

### Usage
_If hook name is: `test_action`_
```php
add_action(
	'jet-form-builder/custom-action/test_action',
	function () {
		/**
		 * In order to do this, you must pass to the `update_request`
		 * method from the `jet_fb_context` function - the field name is the first parameter, and the second
		 * is the new value. If you need to change the value inside the repeater, then see the example below.
		 */
		jet_fb_context()->update_request( 'field_name', 'new field value' );

		/**
		 * How to change value inside specific row in the repeater
		 *
		 * Where: 0 - first row in th repeater
		 */
		jet_fb_context()->update_request( 'repeater_name.0.field_name', 'new inner field value' );

		// or this way
		jet_fb_context()->update_request( array( 'repeater_name', 0, 'field_name' ), 'new inner field value' );

		/**
		 * Or you can update specific field in each row of repeater
		 *
		 * @var \Jet_Form_Builder\Request\Parser_Context $context
		 */
		foreach ( jet_fb_context()->iterate_inner( 'repeater_name' ) as $context ) {
			$context->update_request( 'field_name', 'new inner field value' );
		}

		if ( empty( jet_fb_context()->get_value( 'age' ) ) ) {
			/**
			 * You can use one of the default statuses
			 * 'success' => 'Form successfully submitted.',
			 * 'failed' => 'There was an error trying to submit form. Please try again later.',
			 * 'validation_failed' => 'One or more fields have an error. Please check and try again.',
			 * 'captcha_failed' => 'Captcha validation failed',
			 * 'invalid_email' => 'The e-mail address entered is invalid.',
			 * 'empty_field' => 'The field is required.',
			 * 'internal_error' => 'Internal server error. Please try again later.',
			 * 'upload_max_files' => 'Maximum upload files limit is reached.',
			 * 'upload_max_size' => 'Upload max size exceeded.',
			 * 'upload_mime_types' => 'File type is not allowed.',
			 */
			throw new \Jet_Form_Builder\Exceptions\Action_Exception( 'empty_field' );
		}

		if ( absint( jet_fb_context()->get_value( 'age' ) ) < 18 ) {
			throw new \Jet_Form_Builder\Exceptions\Action_Exception( 'Your age is less than necessary' );
		}

		/**
		 * If all checks are passed, you just need to do Nothing,
		 * so that the form would continue its work or successfully complete it.
		 *
		 * In rare cases, you can interrupt the execution of the form with a successful status.
		 */
		if ( 199 === jet_fb_context()->get_value( 'age' ) ) {
			// or throw new Action_Exception( 'success' );
			throw ( new \Jet_Form_Builder\Exceptions\Action_Exception( 'Lucky!' ) )->dynamic_success();
		}
	}
);
```

### Source
https://github.com/Crocoblock/jetformbuilder/blob/main/includes/actions/types/call-hook.php

