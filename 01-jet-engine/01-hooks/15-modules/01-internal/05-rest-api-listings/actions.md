# JetEngine. REST API Listings. Actions

## jet-engine/rest-api-listings/request/before-send

Fires before sending a request

**Args:**
- `$request` - \Jet_Engine\Modules\Rest_API_Listings\Request

**Location:**
includes/modules/rest-api-listings/inc/request.php

**Access:**
Global

**Example:**


Process JetEngine's macros in each endpoint string parameter

```php
add_action( 'jet-engine/rest-api-listings/request/before-send', function( $request ) {
	
	$endpoint = $request->get_endpoint();
	
	foreach ( $endpoint as $key => $value ) {
		
		if ( ! is_string( $value ) ) {
			continue;
		}
		
		$endpoint[ $key ] = jet_engine()->listings->macros->do_macros( $value );
		
	}
	
	$request->set_endpoint( $endpoint );
	
} );
```