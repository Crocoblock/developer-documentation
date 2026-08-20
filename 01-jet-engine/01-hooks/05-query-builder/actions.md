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

<a href="../../02-common-use-cases/02-custom-query-for-query-editor/">Full example of new query type registration</a>

## jet-engine/query-builder/query/after-query-setup

A hook that runs after the `$final_query` property of a subclass of `\Jet_Engine\Query_Builder\Query_Editor\Base_Query` has been populated.
The `$final_query` contains all query parameters that will later be used to retrieve results; this hook allows modifying them.

**Args:**
- `$query` - An instance of one of the subclasses of `\Jet_Engine\Query_Builder\Query_Editor\Base_Query`.

**Location:**
includes/components/query-builder/queries/base.php

**Access:**
Global

**Example:**


```php
add_action( 'jet-engine/query-builder/query/after-query-setup', function( $query ) {
    
    if ( false === strpos( $query->name ?? '', '--current-record' ) ) {
        return;
    }
    
    $object = jet_engine()->listings->data->get_current_object();
    
    if ( empty( $object->id ) ) {
        return;
    }
    
    $query->final_query['record__in'] = array( $object->id );
    
} );
```

## jet-engine/query-builder/query/before-get-items

A hook that runs before the query results are retrieved.

**Args:**
- `$query` - An instance of one of the subclasses of `\Jet_Engine\Query_Builder\Query_Editor\Base_Query`
- `$is_cached` - bool - If `true`, the results are being retrieved from the cache.

**Location:**
includes/components/query-builder/queries/base.php

**Access:**
Global

**Example:**


```php
add_action( 'jet-engine/query-builder/query/before-get-items', function( $query, $is_cached ) {
    //your code
}, 10, 2 );
```