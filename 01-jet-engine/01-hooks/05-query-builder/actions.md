# JetEngine. Query Builder actions

## jet-engine/query-builder/queries/register

Hook for registering custom queries. This hook is designed for adding a new query type, not a specific query. The specific query of this type is then created through the Jet Engine interface -> Query Builder.

**Args:**
- `$manager` - The Query_Factory class which has the `register_query()` method, through which the registration of a new query type takes place.

**Location:**
includes/components/query-builder/query-factory.php

**Access:**
Global

**Example:**

```php
add_action( 'jet-engine/query-builder/queries/register', function( $manager ) {

	require_once 'full/path/to/query.php' );
	$type  = 'custom-query-slug';
	$class = '\Full_Name\Of_Custom_Query_Class';

	$manager::register_query( $type, $class );

} );
```

## jet-engine/query-builder/query-editor/register

Hook for registering the component responsible for the custom query editor interface.

**Args:**
- `$manager` - An instance of the class that manages the editor and contains the `register_type()` method for registering a new component.

**Location:**
includes/components/query-builder/query-factory.php

**Access:**
Global

**Example:**

```php
add_action( 'jet-engine/query-builder/query-editor/register', function( $manager ) {
	require_once 'full/path/to/editor-component.php' );
	$manager->register_type( new Editor_Component_Class() );
} );
```

<a href="/01-jet-engine/02-common-use-cases/02-custom-query-for-query-editor/">Full example of new query type registration</a>