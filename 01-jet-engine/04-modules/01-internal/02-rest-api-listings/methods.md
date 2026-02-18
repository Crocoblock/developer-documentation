## Description of the class \Jet_Engine\Modules\Rest_API_Listings\Request

```php
namespace \Jet_Engine\Modules\Rest_API_Listings;

class Request {
    /**
     * Set endpoint parameters
     * 
     * @param array $endpoint          Array of endpoint parameters
	 * @param bool  $is_sample_request Whether request is a sample request
     */
    public function set_endpoint( $endpoint = array(), $is_sample_request = false ) {}

    /**
	 * Get endpoint URL
	 * 
	 * @return string Endpoint URL
	 */
    public function get_url() {
		return apply_filters( 'jet-engine/rest-api-listings/request/url', $this->url, $this );
	}

	/**
	 * Get endpoint URL with URL parameters
	 * 
	 * @return string Endpoint URL with URL parameters
	 */
	public function get_url_with_query_args( $query_args = array() ) {}

	/**
	 * Get endpoint parameters
	 * 
	 * @return array Endpoint parameters
	 */
	public function get_endpoint() {}

    /**
	 * Get results
	 *
	 * @param  array  $query_args  Array of URL parameters
	 * @param  bool   $force       Whether to bypass cache
	 * 
	 * @return array|false         Array of items received from endpoint
	 */
    public function get_items( $query_args = array(), $force = false ) {}
}
```