# JetEngine. Macros Handler

**Location:** /framework/macros/macros-handler.php

Class `\Crocoblock\Macros_Handler` is actually a part of the framework, not JetEngine itself, so it can be used in any other plugin where custom macros processing is needed.

Class methods:

`__construct( $namespace )`
The constructor sets the `$namespace` for the current instance. If `$namespace` is specified, hooks will be called based on it to register custom macros for the current instance of `Macros_Handler`. JetEngine itself currently does not use this in favor of its own hook for compatibility with legacy macros.

`register_macros_list( $list = [] )`
Method for batch registration of macros for the current instance of `Macros_Handler`. Each instance of `Macros_Handler` can handle only the macros registered in it. The format of the registration list is as follows:

```php
[
	'macros_tag' => [
		'label' => 'Macros Name',
		'cb'    => 'callback_function_name',
		'args'  => [
			'arg_1' => [
				'label'   => __( 'Field', 'jet-engine' ),
				'type'    => 'select',
				'options' => $options, // This could be an array or callable function to retrieve options list only for UI
			]
			'arg_2' => [
				'label'   => __( 'Return', 'jet-engine' ),
				'type'    => 'text',
			],
		],
	],
]
```
Also, if a namespace is specified, this method calls the hook `$this->namespace . '/register-macros'` to register custom macros in this instance of `Macros_Handler`.

`register_macros( $macros_instance )`
Registers a single macro using the macro class. The macro class must extend the base `\Crocoblock\Base_Macros` class. Example of using this method with a hook from the previous method:

```php
add_action( 'my-namespace/register-macros', function( $handler ) {

	if ( ! class_exists( '\Crocoblock\Base_Macros' ) ) {
		require_once 'path/to/base-macros.php';
	}

	require_once 'path/to/my-macros-1.php';
	require_once 'path/to/my-macros-2.php';

	$handler->register_macros( new My_Macros_1() );
	$handler->register_macros( new My_Macros_2() );

} );
```
This method can be used to register all macros for your environment, but after that, you must call the register_macros_list() method on the current instance of `Macros_Handler` to trigger the hook.

Class `\Crocoblock\Base_Macros` can also be included as a framework module.

`get_raw_list()`
Returns the list of macros as is. This method is preferable to use where you need to get a list of all macros without adding UI for them.

`get_escaped_list()`
Returns the list of macros with prepared argument options (for cases where a callback was passed as an option). This method is preferable to use where you plan to create UI for macros.

`get_macros_for_js()`
Returns the list of macros in a format prepared for use in JavaScript components.

`set_macros_context( $context )`
Sets the context of the macro. Only text context can be set from the macro string, which can only be processed by JetEngine. However, programmatically you can set any context by passing the required object as the context, not just the context name.

`get_macros_context()`
Returns the current context - either the textual name of the context or the object.

`set_fallback( $fallback )`
Sets the text to be used as the macro value if the actual value is empty. The fallback can be passed with the macro string in this format - `%my_macros%{"fallback":"My Fallback"}`.

`get_fallback()`
Returns the current fallback.

`set_before( $before )`
Sets the text to be added before the macro value. This value can be passed with the macro string in this format - `%my_macros%{"before":"Text before macros value"}`.

`get_before()`
Returns the current value of before.

`set_after( $after )`
Sets the text to be added after the macro value. This value can be passed with the macro string in this format - `%my_macros%{"after":"Text after macros value"}`.

`get_after()`
Returns the current value of after.

`get_macros_list_for_options()`
Returns a list of macros for use as options in the format `macros_slug => Macros name`.

`verbose_macros_list()`
Returns a list of available macros as a comma-separated string.

`get_macros_object()`
Returns the current object for the macro, which is determined by the context (or the context itself if a ready-made object was passed through set_macros_context before this).

`call_macros_func( $macros, $args = array() )`
Calls the function for the passed macro in the first argument with the list of arguments passed in the second argument.

`do_macros( $string, $field_value )`
Executes all macros in the passed argument `$string`. This method must be added wherever you want to add support for macros from the current instance of `\Crocoblock\Macros_Handler`. `$field_value` is mostly a legacy parameter pulled from the implementation of macros in JetEngine, but if desired, you can pass any global arguments through it that are needed for all macros.
