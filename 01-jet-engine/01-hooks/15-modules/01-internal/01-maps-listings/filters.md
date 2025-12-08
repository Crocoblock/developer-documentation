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

## jet-engine/maps-listings/autocomplete-request-body/google

Allows modifying the request body when using the new Google provider's autocomplete API.

**Args:**

- `$body` - the request body. [List of available parameters](https://developers.google.com/maps/documentation/places/web-service/place-autocomplete#supported-parameters)

**Location:**
includes/modules/maps-listings/inc/geocode-providers/google.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/maps-listings/autocomplete-request-body/google', function( $body ) {
	$body['includedRegionCodes'] = [ 'au' ];
	return $body;
} );
```

## jet-engine/maps-listings/autocomplete-url-args/openstreetmap

Allows changing the request parameters when using the OpenStreetMap provider autocomplete

**Args:**

- `$args` - an array of request parameters in the format 'Parameter Name' => 'value'. [List of available parameters] (https://nominatim.org/release-docs/develop/api/Search/#parameters)

**Location:**
includes/modules/maps-listings/inc/geocode-providers/openstreetmap.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/maps-listings/autocomplete-url-args/openstreetmap', function($args){
	$args['countrycodes'] = 'de'; // comma-separated list of country codes

	return $args;
} );
```

