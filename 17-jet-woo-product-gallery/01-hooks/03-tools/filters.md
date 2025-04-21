# List of filters related to plugin tools

## jet-gallery/blocks-views/editor/config

## jet-gallery/tools/product-types

## jet-woo-product-gallery/admin/settings-page/localized-config
Allows registering and modifying the localized plugin settings data for JavaScript.

**Args:**

- `$localized_data` - array - list of initial localized data

**Location:**
<a href="https://github.com/ZemezLab/jet-woo-product-gallery/tree/master/includes/settings/jet-dashboard-settings/subpage-modules/avaliable-addons.php">
includes/settings/jet-dashboard-settings/subpage-modules/avaliable-addons.php</a>

**Access:**
Admin

**Example:**
```php
add_filter( 'jet-woo-product-gallery/admin/settings-page/localized-config', function( $localized_data ) {
    // Масив даних, що локалізуються.
    print_r( $localized_data );

    return $localized_data;
} );
```

## jet-woo-product-gallery/in-elementor
Allows modifying the status of being in the Elementor editor.

**Args:**

- `$result` - bool - status of being in the editor

**Location:**
<a href="https://github.com/ZemezLab/jet-woo-product-gallery/tree/master/includes/components/elementor-views/manager.php">
includes/components/elementor-views/manager.php</a>

**Access:**
Elementor editor

**Example:**
```php
add_filter( 'jet-woo-product-gallery/in-elementor', function( $result ) {
    if ( is_admin() ) {
        return true;
    }
	
    return $result;
} );
```

## jet-woo-product-gallery/rest/frontend/url
Allows modifying the REST API endpoint URL of the plugin on the site.

**Args:**

- `$url` - string - full URL of the endpoint

**Location:**
<a href="https://github.com/ZemezLab/jet-woo-product-gallery/tree/master/includes/settings/class-jet-woo-product-gallery-settings.php">
includes/settings/class-jet-woo-product-gallery-settings.php</a>

**Access:**
Admin

**Example:**
```php
add_filter( 'jet-woo-product-gallery/rest/frontend/url', function( $url ) {
    if ( is_admin() ) {
        $url = '';
    }
	
    return $url;
} );
```

## jet-woo-product-gallery/settings/registered-subpage-modules
Allows registering and modifying subpage modules for the settings section in the admin panel.

**Args:**

- `$subpage_modules` - array - list of subpage modules

**Location:**
<a href="https://github.com/ZemezLab/jet-woo-product-gallery/tree/master/includes/settings/jet-dashboard-settings/manager.php">
includes/settings/jet-dashboard-settings/manager.php</a>

**Access:**
Admin

**Example:**
```php
add_filter( 'jet-woo-product-gallery/settings/registered-subpage-modules', function( $subpage_modules ) {
    $subpage_modules['jet-gallery-custom-labels'] = [
        'class' => '\\Jet_Gallery\\Settings\\Labels',
        'args'  => [],
    ];
	
    return $subpage_modules;
} );
```