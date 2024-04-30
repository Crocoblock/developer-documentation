# JetEngine. Register new link source for Listing Item link

This case allows you to add a new option to the Link source setting, which is part of the URL configuration for the listing item, as well as handle this source on the frontend.

To achieve this, you need 2 filters:

- <a href="/01-jet-engine/01-hooks/01-listings/filters.md#jet-enginelistingsdynamic-linkfields">jet-engine/listings/dynamic-link/fields</a> - to register a new option
- <a href="/01-jet-engine/01-hooks/01-listings/filters.md#jet-enginelistingsfrontendcustom-listing-url">jet-engine/listings/frontend/custom-listing-url</a> - to process the new option on the frontend.

Below is the basic scenario, for example, adding the Author Archive URL source - a link to the default WP author archive (makes sense for user listings)

```php
/**
 * Register new source for the options.
 * 'author_archive_link' - is a name of your source. It will be required on the next step.
 */
add_filter( 'jet-engine/listings/dynamic-link/fields', function( $link_sources ) {

	// [0] - means we registering new source into General group
	// we don't recommend to register your sources to any other groups, because they are dynamic and depends on your website structure
	$link_sources[0]['options']['author_archive_link'] = 'Author Archive URL';
	return $link_sources;
} );

/**
 * Apply new source ont the frontend
 */
add_filter( 'jet-engine/listings/frontend/custom-listing-url', function( $url, $settings = [] ) {
	
	// Make sure we processing 'author_archive_link' source added on previous step.
	// In your case you need to replace 'author_archive_link' with your actual source name
	if ( ! empty( $settings['listing_link_source'] ) && 'author_archive_link' === $settings['listing_link_source'] ) {
		$current_object = jet_engine()->listings->data->get_current_object();

		// Optional. Make sure we working with Users listing.
		// This check is required for this exact case, for your custom source such check will be different
		if ( $current_object && 'WP_User' === get_class( $current_object ) ) {
			$url = get_author_posts_url( $current_object->ID );
		}
		
	}
	
	return $url;

}, 10, 2 );
```

The more advanced version of implementing the same case, with wrapping a code in a class. This way, it's easier to reuse it. 

```php
/**
 * Change class name to your unique name to avoid naming collisions
 */
class My_Custom_Listing_Link_Source {

	/**
	 * Set here your actual source name (value of the new option)
	 */
	private $source_name  = 'author_archive_link';

	/**
	 * Set here your actual source label (visual label of the new option)
	 */
	private $source_label = 'Author Archive URL';

	/**
	 * Plain callback to get your exact source value.
	 * Rewrite body of this method with you own code to get required URL
	 */
	public function get_source_callback( $url, $settings = [] ) {

		$current_object = jet_engine()->listings->data->get_current_object();

		// Optional. Make sure we working with Users listing.
		// This check is required for this exact case, for your custom source such check will be different
		if ( $current_object && 'WP_User' === get_class( $current_object ) ) {
			$url = get_author_posts_url( $current_object->ID );
		}

		return $url;
	}

	public function __construct() {
		add_filter( 'jet-engine/listings/dynamic-link/fields', [ $this, 'register_source' ] );
		add_filter( 'jet-engine/listings/frontend/custom-listing-url', [ $this, 'apply_source' ], 10, 2 );
	}

	/**
	 * Register new source for the options.
	 * No need to change this function.
	 */
	public function register_source( $link_sources = [] ) {
		// [0] - means we registering new source into General group
		// we don't recommend to register your sources to any other groups, because they are dynamic and depends on your website structure
		$link_sources[0]['options'][ $this->source_name ] = $this->source_label;
		return $link_sources;
	}

	/**
	 * Apply source.
	 * No need to change this function
	 */
	public function apply_source( $url, $settings = [] ) {
		
		if ( 
			! empty( $settings['listing_link_source'] ) 
			&& $this->source_name === $settings['listing_link_source'] 
		) {
			$url = $this->get_source_callback( $url, $settings );
		}

		return $url;
	}

}

/**
 * Don't forget to call your new class
 */
new My_Custom_Listing_Link_Source();
```

