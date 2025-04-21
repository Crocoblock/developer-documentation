# JetEngine. WPML Compatibility

Here we describe a few common cases when working with WPML compatibility.

### 1. Translating Posts

There are 2 ways to translate posts:

1) In the main code, add a filter for the post, for example https://prnt.sc/4z3oFr9Q2ukq, and then in the compatibility file  
`includes/compatibility/packeges/wpml.php` attach the `set_translated_object` callback to it https://prnt.sc/lslNmh9vZrJc

```php
add_filter( 'jet-engine/listings/frontend/rendered-listing-id', array( $this, 'set_translated_object' ) );
add_filter( 'jet-engine/forms/render/form-id',                  array( $this, 'set_translated_object' ) );
add_filter( 'jet-engine/profile-builder/template-id',           array( $this, 'set_translated_object' ) );
```
2)Directly in the main code for a post that may be translated in the future, add the filter `jet-engine/compatibility/translate/post`.
In the compatibility file, the required callback is already attached to this filter, so nothing else needs to be done.
```php
$listing_id = apply_filters( 'jet-engine/compatibility/translate/post', $listing_id );
```
### 2. Translating Terms
Directly in the main code for a term that may be translated in the future, add the filter jet-engine/compatibility/translate/term.
Pass $term_id and $taxonomy as arguments to this filter https://prnt.sc/jU1LouufkJG4.
In the compatibility file, the required callback is already attached to this filter, so nothing else needs to be done.
```php
$term = apply_filters( 'jet-engine/compatibility/translate/term', $term, $taxonomy );
```
### 3. Translating Strings
To translate strings that are filled in by users in various admin settings (for example, CPT labels https://prnt.sc/9S_QI1FDqzKI,
meta field labels, etc.), use the `jet-engine/compatibility/translate-string` filter.
The compatibility file already has the required callback attached to this filter, so nothing else needs to be done.
To add a translation for these strings, go to the WPML → String Translation page and, after filtering
the strings by domain `Jet Engine Admin Labels`, you will see the list of strings ready for translation https://prnt.sc/5JxOqxPRCwRW.

```php
$title = apply_filters( 'jet-engine/compatibility/translate-string', $title );
```

```php
$description = apply_filters( 'jet-engine/compatibility/translate-string', $field['description'] );
```

```php
$key   = apply_filters( 'jet-engine/compatibility/translate-string', $key );
$value = apply_filters( 'jet-engine/compatibility/translate-string', $value );
```