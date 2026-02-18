# JetEngine. List of actions related to Timber/Twig view only

## jet-engine/twig-views/register-functions

Allows registering custom functions for the Twig instance used in Timber/Twig Views

**Args:**
- `$functions_registry` - Instance of the `Functions_Registry` class in which the hook is called.
- `$twig` - Twig instance where the functions will be registered

**Location:**
includes/components/timber-views/inc/view/functions-registry.php

**Access:**
Global

**Example:**

```php
add_action( 'jet-engine/twig-views/register-functions', function( $functions_registry, $twig ) {
	$twig->addFunction( new \Twig\TwigFunction(
		// Function name to use inside Twig editor
		'function_name',
		// Function callback
		function( $args ) {
			return 'Function result';
		}
	) );
}, 10, 2 );
```