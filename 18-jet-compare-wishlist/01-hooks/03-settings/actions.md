# Settings related actions

## jet-cw/rest/init-endpoints

Triggers after the plugin's endpoints registration.

**Args:**

- `$rest_api` - Jet_CW\Rest_Api - Rest API class object

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/rest-api/rest-api.php">
includes/rest-api/rest-api.php</a>

**Access:**
Admin only

```php
add_action( 'jet-cw/rest/init-endpoints', function( $rest_api ) {
    // do something after endpoint registration
} );
```