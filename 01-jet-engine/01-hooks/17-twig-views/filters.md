# JetEngine. List of filters related to Timber/Twig view only

## jet-engine/twig-views/dangerous-block-tags
## jet-engine/twig-views/dangerous-selfclosing-tags

Two filters identical in essence. They allow managing the list of forbidden functions/tags for use in the Twig editor. These lists are needed to eliminate the risk of unauthorized execution of dangerous code in Twig templates. However, if the user is confident in their actions, they can add or remove certain elements from these lists.

**Args:**
- `$tags` - List of forbidden elements

**Location:**
includes/components/timber-views/timber.php

**Access:**
Global

**Example:**

```php
// Remove 'set' from the list of dangerous block tags
add_filter( 'jet-engine/twig-views/dangerous-block-tags', function( $tags ) {
	return array_diff( $tags, [ 'set' ] );
}, 10 );

// Remove 'set' from the list of dangerous self-closing tags
add_filter( 'jet-engine/twig-views/dangerous-selfclosing-tags', function( $tags ) {
	return array_diff( $tags, [ 'set' ] );
}, 10 );
```