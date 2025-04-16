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