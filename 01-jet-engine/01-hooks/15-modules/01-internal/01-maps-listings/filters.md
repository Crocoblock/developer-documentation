# JetEngine. Maps Listings. Filters.

## jet-engine/maps-listings/autocomplete-url-args/google

Дозволяє змінювати параметри запиту під час використання автокомпліту Google провайдера

**Args:**
- `$args` - масив параметрів запиту у форматі 'Назва параметру' => 'значення'. [Список доступних параметрів](https://developers.google.com/maps/documentation/places/web-service/autocomplete#optional-parameters)  

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