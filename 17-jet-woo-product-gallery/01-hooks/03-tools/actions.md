# List of actions related to plugin tools

## jet-woo-product-gallery-api/rest/init-endpoints
Triggers after the plugin's endpoints have been registered.

**Args:**

- `$rest_api` - Jet_Woo_Product_Gallery\Rest_Api - об'єкт Rest API класу

**Location:**
<a href="https://github.com/ZemezLab/jet-woo-product-gallery/tree/master/includes/rest-api/rest-api.php">
includes/rest-api/rest-api.php</a>

**Access:**
Admin

**Example:**
```php
add_action( 'jet-cw/rest/init-endpoints', function( $rest_api ) {
    // do something after endpoint registration
    $rest_api->register_endpoint( new Endpoint_Class() );
} );
```