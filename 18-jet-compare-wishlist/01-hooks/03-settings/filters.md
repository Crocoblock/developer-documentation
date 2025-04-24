# Settings related filters

## jet-cw/admin/settings-page/localized-config

Allows registering custom data and modifying existing plugin settings for JavaScript variables in the localized script.

**Args:**

- `$localized_data` - array - list of data

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/settings/subpage-modules/avaliable-addons.php">
includes/settings/subpage-modules/avaliable-addons.php</a>
, <a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/settings/subpage-modules/compare.php">
includes/settings/subpage-modules/compare.php</a>
, <a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/settings/subpage-modules/wishlist.php">
includes/settings/subpage-modules/wishlist.php</a>

**Access:**
Admin only

**Example:**

```php
add_filter( 'jet-cw/admin/settings-page/localized-config', function( $localized_data ) {
    $localized_data['settingsData']['enable_compare']      = false;
    $localized_data['settingsData']['wishlist_store_type'] = 'cookies';
    
    return $localized_data;
} );
```

## jet-cw/dashboard/settings/ . $setting

Allows access to view and modify the settings page for the example panel by the page key `$setting`.

**Args:**

- `$page_id` - string - the settings page key

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/class-jet-cw-settings.php">
includes/class-jet-cw-settings.php</a>

**Access:**
Admin only

**Example:**

```php
add_filter( 'jet-cw/dashboard/settings/compare_page', function( $page_id ) {
    if ( defined( 'WPML_ST_VERSION' ) ) {
        return apply_filters( 'wpml_object_id', $page_id, 'page', true );
    }
    
    if ( function_exists( 'pll_get_post' ) ) {
        $translated_template_id = pll_get_post( $page_id );
        
        if ( null === $translated_template_id || false === $translated_template_id ) {
            return $page_id;
        } elseif ( $translated_template_id > 0 ) {
            return $translated_template_id;
        }
    }
    
    return $page_id;
} );
```

## jet-cw/rest/frontend/url

Allows modifying the REST endpoint URL on the site.

**Args:**

- `$url` - string - the full URL of the endpoint

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/class-jet-cw-settings.php">
includes/class-jet-cw-settings.php</a>

**Access:**
Admin only

**Example:**

```php
add_filter( 'jet-cw/rest/frontend/url', function( $url ) {
    if ( is_admin() ) {
        $url = '';
    }
	
    return $url;
} );
```

## jet-cw/settings/registered-subpage-modules

Allows registering custom subpage modules for the settings section in the admin panel, as well as modifying existing subpage modules.

**Args:**

- `$subpage_modules` - array - list of subpage modules

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/settings/manager.php">
includes/settings/manager.php</a>

**Access:**
Admin only

**Example:**

```php
add_filter( 'jet-cw/settings/registered-subpage-modules', function( $subpage_modules ) {
    $subpage_modules['jet-cw-custom-labels'] = [
        'class' => '\\Jet_CW\\Settings\\Labels',
        'args'  => [],
    ];
	
    return $subpage_modules;
} );
```