# JetEngine. Query Builder actions

## jet-engine/query-builder/queries/register

Хук для реєстрації кастомних квері. Цей хук призначений сам для додавання нового типу квері а не конкретной квері. Конкретна квері даного типу потім створюється через інтерфейс Jet Engine -> Query Builder

**Args:**
- `$manager` - Class Query_Factory в якому є метод register_query(), через який і відбувається реєстрація нового типу квері.

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

Хук для реєстрації компоненту який відповідає за інтерфейс едітора кастомної квері.

**Args:**
- `$manager` - Екземпляр класу що керує едітором та містить метод register_type() для реєстрації новог компоненту

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