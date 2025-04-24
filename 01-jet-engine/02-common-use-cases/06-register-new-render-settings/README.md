# JetEngine. Register new settings for \Jet_Engine_Render_Base instance

For example, you need to add extra settings to the Listing Grid:
- `listing_items_wrapper_tag` to set the wrapper tag for `.jet-listing-grid__items`,  
- `listing_item_tag` to set the tag for items `.jet-listing-grid__item`,  
- `empty_items_wrapper_tag` for the wrapper of the empty listing `.jet-listing-not-found.jet-listing-grid__items`

The listing grid is rendered by the \Jet_Engine_Render_Listing_Grid class, which inherits from \Jet_Engine_Render_Base \
The \Jet_Engine_Render_Base class has the filter `jet-engine/listing/render/{$render_name}/settings` \
For Listing Grid, the filter looks like `jet-engine/listing/render/jet-listing-grid/settings` \
This can be used to set the values for the `listing_items_wrapper_tag` and `listing_item_tag` settings.

To make these settings work not only when rendering the page, but also correctly apply during listing filtering with JetSmartFilters / rendering items on Load More trigger, they need to be added to:
- the array returned by the `default_settings()` method of the \Jet_Engine_Render_Listing_Grid class;  \
  you can use the `jet-engine/listing/render/default-settings` filter to add a default value for the setting \
  this is needed for correct filter behavior
- the `$result` array inside `$result['widget_settings']` — for Load More to work correctly  \
  you can use the `jet-engine/listing/grid/nav-widget-settings` filter, which filters `$result['widget_settings']`

In this case, it was decided not to add the settings to the UI immediately, but only make them work during render. \ 
In the future, if there are requests from users, the settings may be added to the interface.

To allow users to change tags via code not in all listings, but for example only in those that have a specific class/attribute, you can use the following snippet:

```php
class JEC_Change_Tags {
	
	public function __construct() {
		add_filter( 'jet-engine/listing/render/jet-listing-grid/settings', array( $this, 'apply_settings' ) );
		add_filter( 'jet-engine/listing/grid/nav-widget-settings', array( $this, 'nav_settings' ), 10, 2 );
		add_filter( 'jet-engine/listing/render/default-settings', array( $this, 'default_settings' ) );
	}
	
	//set 'is-ul-listing' setting to 1 if tags need to be changed to ul / li
	//change tags
	public function apply_settings( $settings ) {
		$settings['is-ul-listing'] = $this->is_ul_listing( $settings );
			
		if ( ! empty( $settings['is-ul-listing'] ) ) {
			$settings['list_items_wrapper_tag'] = 'ul';
			$settings['list_item_tag'] = 'li';
		}

		return $settings;
	}
	
	//set default value for compatibility with JetSmartFilters
	public function default_settings( $settings ) {
		$settings['is-ul-listing'] = '';
		return $settings;
	}
	
	//save 'is-ul-listing' to nav settings for compatibility with Load More
	public function nav_settings( $widget_settings, $settings ) {
		$widget_settings['is-ul-listing'] = $this->is_ul_listing( $settings );
		return $widget_settings;
	}
	
	//check if 'is-ul-listing' setting should be set for block / widget / element 
	//
	//for Elementor and Block Editor - widget / block must have 'listing-ul' class
	//for Bricks Builder - element must have a 'data-listing-ul' attribute
	public function is_ul_listing( $settings ) {
		if ( ! empty( $settings['is-ul-listing'] ) ) {
			return 1;
		}
		
		$class = '';
		
		if ( ! empty( $settings['_css_classes'] ) ) {
			$class = $settings['_css_classes'];
		} elseif ( ! empty( $settings['className'] ) ) {
			$class = $settings['className'];
		} elseif( ! empty( $settings['_attributes'] ) && is_array( $settings['_attributes'] ) ) {
			foreach ( $settings['_attributes'] as $attr ) {
				if ( ! empty( $attr['name'] ) && $attr['name'] === 'data-listing-ul' ) {
					$class = 'listing-ul';
					break;
				}
			}
		}
		
		return false !== strpos( $class, 'listing-ul' ) ? 1 : '';
	}
}

//create an instance of a class
new JEC_Change_Tags();
```
If this snippet is added, then in Elementor and Block Editor you need to assign the class listing-ul to the listing,
in Bricks Builder — add the data-listing-ul attribute with any value (e.g., 1).
