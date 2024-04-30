# JetFormBuilder. Gateways-related actions

## Table of contents
* [`jet-form-builder/gateways/register`](#jet-form-buildergatewaysregister)

## `jet-form-builder/gateways/register`
It is launched after the installation of basic payment gateways. Currently it is only PayPal.\
Runs on the `init` hook.\
You can register your own gateway on it. A full example of how to do it can be found here https://github.com/girafffee/jfb-custom-gateway

### Parameters
* $module [`\JFB_Modules\Gateways\Module`](https://github.com/Crocoblock/jetformbuilder/blob/main/modules/gateways/module.php)

### Usage
```php
add_action(
	'jet-form-builder/gateways/register',
	/**
	 * Full example here
	 * @link https://github.com/girafffee/jfb-custom-gateway
	 * 
	 * @var \JFB_Modules\Gateways\Module $manager
	 */
	function( $manager ) {
		// your code
	},
	10,
	2
);
```

### Source
https://github.com/Crocoblock/jetformbuilder/blob/main/modules/gateways/module.php


## `jet-form-builder/gateways/before-create`
Запускається перед тим, як виконати запит на API платіжної системи, що використовується.
Це універсальний хук, що виконується для різних платіжних систем і різних сценаріїв.

### Parameters
* $request [`\JFB_Modules\Gateways\Base_Gateway_Action`](https://github.com/Crocoblock/jetformbuilder/blob/main/modules/gateways/base-gateway-action.php)
  (This will be an object, a class that extends `Base_Gateway_Action`)
  
### Usage
```php
add_action(
	'jet-form-builder/gateways/before-create',
	/**
	 * @var \JFB_Modules\Gateways\Base_Gateway_Action $request
	 */
	function ( $request ) {
		if ( ! is_a(
			$request,
			\Jet_FB_Stripe_Gateway\Compatibility\Jet_Form_Builder\Actions\Create_Checkout_Session::class
		) ) {
			return;
		}

		$request->set_payment_name( 'My custom payment name' );
	}
);
```

### Source
PayPal Pay Now: https://github.com/Crocoblock/jetformbuilder/blob/main/modules/gateways/paypal/scenarios-logic/pay-now.php

PayPal Create Subscription: `jet-form-builder-paypal-subscriptions/includes/Resources/Subscription.php`

Stripe Pay Now: `jet-form-builder-stripe-gateway/includes/compatibility/jet-form-builder/logic/pay-now-logic.php`