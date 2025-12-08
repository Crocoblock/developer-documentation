# Filters

## jet-engine/query-builder/types/posts-query/random-seed

Allows filtering of the random seed used in a query with a random order.
A typical use case is caching the random number to ensure consistent pagination on page reload.

**Args:**
- `$seed` - int - Random number
- `$query` - Jet_Engine\Query_Builder\Queries\Posts_Query - Query instance

**Location:**
[includes/components/query-builder/queries/posts.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/query-builder/queries/posts.php)

**Access:**
Global

**Example:**
```php
add_filter( 'jet-engine/query-builder/types/posts-query/random-seed', function ( $seed, $query ) {

	$transient_key  = 'jet_posts_random_seed_' . $query->id;
	$transient_time = 5 * MINUTE_IN_SECONDS;

	$seed = get_transient( $transient_key );

	if ( empty( $seed ) ) {
		$seed = rand();
		set_transient( $transient_key, $seed, $transient_time );
	}

	return $seed;
}, 10, 2 );
```

## jet-engine/query-builder/query/items

Allows filtering the array of query results.

**Args:**
- `$items` - The query results, an array of objects.
- `$query` - An instance of one of the subclasses of `\Jet_Engine\Query_Builder\Query_Editor\Base_Query`.

**Location:**
includes/components/query-builder/queries/base.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/query-builder/query/items', function( $items, $query ) {
  
  //if query ID is 128 or query name contains '--filter-result' substring - return post with ID of 256
  if ( $query->id == 128 || false !== strpos( $query->name, '--filter-result' ) ) {
    $items = array( get_post( 256 ) );
  }
  
  return $items;
  
}, 0, 2 );
```

## jet-engine/query-builder/types/sql-query/cast-objects

Allows to filter a list of options in the SQL query parameter `Cast result to instance of object`

**Args:**
<pre>
- $options - An array of options, $class_or_function => $option_label
             the first element is a placeholder. 
</pre>

**Location:**
includes/components/query-builder/editor/sql.php

**Access:**
Global

**Example:**

```php
function _your_prefix_prepare_object( $object ) {
	if ( ! $object || empty( $object->ID ) ) {
		return ( object ) array(
			'id' => '-1',
			'title' => 'Invalid object'
		);
	}

	return ( object ) array(
		'id' => $object->ID,
		'title' => $object->post_title ?? 'Untitled',
	);
}

class Some_Class {
	public function __construct( $obj ) {
		foreach ( get_object_vars( $obj ) as $key => $value ) {
			$this->$key = $value;
		}
	}
}

add_filter( 'jet-engine/query-builder/types/sql-query/cast-objects', function( $options ) {

	$options['_your_prefix_prepare_object'] = 'Prepare object';
	$options['Some_Class'] = 'Some Class';

	return $options;

}, 1000 );
```

## jet-engine/query-builder/query/replace-array-props

Allows determining whether a parameter that is an array will be merged with the existing parameter or replace it.

**Args:**
- `$replace` - bool - Whether to replace the existing parameter (default `false`).
- `$prop` - string - The parameter key.
- `$value` - mixed - The parameter value.
- `$query` - An instance of one of the subclasses of \Jet_Engine\Query_Builder\Query_Editor\Base_Query

**Location:**
includes/components/query-builder/editor/sql.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/query-builder/query/replace-array-props', function( $replace, $prop, $value ) {
	if ( $replace === 'post__in' ) {
		$replace = true;
	}

	return $replace;
}, 10, 3 );
```

## jet-engine/query-builder/query-editor/use_codemirror

Allows determining whether CodeMirror will be used for the Advanced SQL editor.

**Args:**
- `$use` - bool - Whether CodeMirror will be used (default `true`).

**Location:**
includes/components/query-builder/pages/edit.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/query-builder/query-editor/use_codemirror', '__return_false' );
```

## jet-engine/query-builder/query-editor/code_mirror_config

Allows to filter the parameters of Code Mirror ([list of parameters](https://codemirror.net/docs/ref/))

**Args:**
- `$args` - array - An array of parameters
default values:
```
			array(
				'lineNumbers'    => true,
				'indentUnit'     => 2,
				'tabSize'        => 2,
				'matchBrackets'  => true,
				'indentWithTabs' => false,
				'direction'      => 'ltr',
				'lineWrapping'   => true,
				'jeReplaceTabs'  => true,
				//height in lines if set to number (like 20) or in pixels (like '20px')
				'jeCustomHeight' => false,
			)
```

**Location:**
includes/components/query-builder/pages/edit.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/query-builder/query-editor/code_mirror_config', '__return_false' );
```