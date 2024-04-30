# JetEngine Context

## What Does the Concept of Context Mean and How Is It Used?

By default, widgets and JetEngine dynamic tags work with the current object. For example, in the content of a page, this will be the current page; in a listing, it will be the current listing item. However, there are many cases when we need to change the object for one or more widgets. For instance, in a post listing, we display the name and email of the author. Without the context change functionality, we would have to use a nested listing, which complicates the logic, increases the number of elements on the page, and negatively affects performance. With context, we can simply add a Dynamic Field widget to the content of the current listing item, change the context for it - instead of the current post, use the context of the author of the current post. In this case, for this widget, the current object will change from a post to a user, who is the author of this post. And in the widget, we can output any data of this user.

## Adding a New Context

Adding a new context boils down to 2 operations - directly adding a new option to the list of available contexts and processing the selected context.

Processing the context in this case means replacing the default object with a new one that we received for the selected context.

Adding an option:

```php
add_filter( 'jet-engine/listings/allowed-context-list', function() {
	$context_list['prev-post'] = 'Previous Post Object';
	return $context_list;
} );
```

Processing the context from the previous example:
```php
$context_name = 'prev-post';

add_filter( 'jet-engine/listings/data/object-by-context/' . $context_name, function() {

	$current_object = jet_engine()->listings->data->get_current_object();

	if ( 'WP_Post' !== get_class( $current_object ) ) {
		global $post;
		$current_object = $post;
	}

	if ( ! $current_object || 'WP_Post' !== get_class( $current_object ) ) {
		return false;
	}

	$in_same_term = false;
	$taxonomy     = false;

	$adjacent_post = get_adjacent_post( $in_same_term, '', true, $taxonomy );

	if ( ! $adjacent_post ) {
		return false;
	}

	return $adjacent_post;

} );
```

A template plugin for quickly starting work with custom contexts - https://github.com/MjHead/jet-engine-context-boilerplate

## Related hooks

* <a href="/01-jet-engine/01-hooks/01-listings/filters.md#jet-enginelistingsallowed-context-list">jet-engine/listings/allowed-context-list</a>
* <a href="/01-jet-engine/01-hooks/01-listings/filters.md#jet-enginelistingsdataobject-by-context">jet-engine/listings/data/object-by-context/</a>
