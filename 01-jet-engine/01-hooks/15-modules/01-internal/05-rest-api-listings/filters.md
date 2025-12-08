# JetEngine. REST API Listings. Filters.

## jet-engine/rest-api-listings/request/type

Allows to determine what type of request will be - GET or POST

**Args:**
- `$type` - string - тип запиту, get чи post
- `$request` - \Jet_Engine\Modules\Rest_API_Listings\Request

**Location:**
includes/modules/rest-api-listings/inc/request.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/rest-api-listings/request/type', function( $type, $request ) {
    
	$endpoint = $request->get_endpoint();
    
	if ( false !== strpos( $endpoint['name'], '--POST' ) ) {
		$type = 'post';
    }
    
	return $type;
    
}, 0, 2 );
```

## jet-engine/rest-api-listings/request/args

Allows you to filter query parameters (e.g., change headers or query body) that are passed as the second argument to wp_remote_get() or wp_remote_post() depending on the query type

**Args:**
- `$args` - array - параметри запиту
- `$request` - \Jet_Engine\Modules\Rest_API_Listings\Request

**Location:**
includes/modules/rest-api-listings/inc/request.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/rest-api-listings/request/args', function( $args, $request ) {
    
	$endpoint = $request->get_endpoint();
    
	if ( false !== strpos( $endpoint['name'], '--custom-body' ) ) {
		$args['body'] = '{"arg1":"1", "arg2":"2"}';
	}
    
	return $args;
    
}, 100, 2 );
```

## jet-engine/rest-api-listings/response/body

Allows you to filter the response body, for example if you need to parse XML (currently only JSON is supported out of the box)

**Args:**
- `$body` - mixed - тіло відповіді
- `$request` - \Jet_Engine\Modules\Rest_API_Listings\Request
- `$query_args` - array - масив URL параметрів
- `$response` - array|\WP_Error - HTTP відповідь

**Location:**
includes/modules/rest-api-listings/inc/request.php

**Access:**
Global

**Example:**

Convert a property in the response body from an object to an array

```php
add_filter( 'jet-engine/rest-api-listings/response/body', function( $body, $request, $query_args, $response ) {
	
	if ( false === strpos( $request->get_endpoint()['name'] ?? '', '--data-property-to-array' ) ) {
		return $body;
	}
	
	if ( is_object( $body->data ?? false ) ) {
		$body->data = array_values( ( array ) $body->data );
	}
	
	return $body;
	
}, 0, 4 );
```

