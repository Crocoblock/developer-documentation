# JetEngine. Maps Listings. Filters.

## jet-engine/maps-listings/autocomplete-url-args/google

Allows changing the request parameters when using the Google provider autocomplete.

**Args:**
- `$args` - an array of request parameters in the format 'Parameter Name' => 'value'. [List of available parameters](https://developers.google.com/maps/documentation/places/web-service/autocomplete#optional-parameters)  

**Location:**
includes/modules/maps-listings/inc/geocode-providers/google.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/maps-listings/autocomplete-url-args/google', function( $args ){
	$args['components'] = 'country:fr';

	return $args;
} );
```