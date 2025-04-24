# JetEngine. Borlabs Cookie Compatibility

Here we describe our specific integration with the Borlabs Cookie plugin.

In JetEngine, compatibility with Borlabs Cookie is implemented for the Map Listing widget/block.  
Therefore, when Borlabs Cookie Status is activated [screenshot](https://prnt.sc/xnRck2vNN1Bb),  
the Map Listing and its scripts will not load on the frontend until the user gives consent.

Starting from version 3.0, the Borlabs Cookie plugin was completely rewritten, and so the compatibility had to be rewritten as well.  
After installing Borlabs Cookie v3, there are no preinstalled content blockers, services,  
and providers anymore like before – [screenshot](https://prnt.sc/XMOKnx9vrW_L), so you need to add your own content blockers.

To simplify this, JetEngine added an option to install the Borlabs Cookie Compatibility Package in the Maps Settings – [screenshot](https://prnt.sc/EeRs2_07Q7oh)

After installation, Borlabs Cookie will include:
- **Content Blocker:** JetEngine – Map Listing [screenshot](https://prnt.sc/0x4xzLeTR6SL)  
- **Script Blocker:** JetEngine – Map Listing [screenshot](https://prnt.sc/XQ91iKRfj3jv)  
- Additional **services and providers** for the map if they were not installed previously:  
  [screenshot 1](https://prnt.sc/TG6_E7FAGYvK) | [screenshot 2](https://prnt.sc/r-8vqptW0A3s)

### JetEngine – Map Listing Content Blocker [screenshot](https://prnt.sc/p-IiGXZFyXr-)

Responsible for rendering the placeholder for the map on the frontend, and for registering the scripts  
required to initialize the map after the user gives consent to load the map – [screenshot](https://prnt.sc/kZQVmVZWeOAC)

To output the content blocker placeholder, the `jet-engine/maps-listings/content` filter is used.
```php
add_filter( 'jet-engine/maps-listings/content', array( $this, 'add_handle_content_blocking' ) );

public function add_handle_content_blocking( $html ) {

	if ( is_admin() ) {
		return $html;
	}

	$content_blocker     = $this->app_container->get( ContentBlockerManager::class );
	$map_content_blocker = $content_blocker->getContentBlockerByKey( self::CONTENT_BLOCKER_KEY );

	if ( $map_content_blocker ) {
		$html = $content_blocker->handleContentBlocking( $html, '', self::CONTENT_BLOCKER_KEY );
	}

	return $html;
}
```
### JetEngine – Script Blocker [screenshot](https://prnt.sc/D7AFXvYcBOuC)

Responsible for blocking map scripts and loading them after the user gives consent  
to load the map [screenshot](https://prnt.sc/iNgIUBGx-SwU).

During the installation of the script blocker, the list of script handlers is generated  
based on the selected map provider [screenshot](https://prnt.sc/_rIlQDJkVJ39).

When changing the provider, the list of script blocker handlers updates automatically.

### Possible Issues

Borlabs Cookie has its own compatibility addon library.  
When installing those, there might be conflicts if our additional services and providers were already added beforehand:  
[screenshot 1](https://prnt.sc/4Ax5lUngt_1N) | [screenshot 2](https://prnt.sc/XO0hvu157T5A)  
In such cases, you will need to manually delete the conflicting services or providers  
[screenshot](https://prnt.sc/Bvo_jhDWkuZR), and then install the required addons from their library.

Ideally, in the future, we should contact Borlabs to include our compatibility addon in their official library.
