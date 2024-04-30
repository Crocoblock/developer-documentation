# Settings related actions

## jet-cw/rest/init-endpoints

Спрацьовує після того я відбулася реєстрація ендпоінтів плагіну.

**Args:**

- `$rest_api` - Jet_CW\Rest_Api - об'єкт Rest API класу

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