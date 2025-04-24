# Actions

## jet-engine/options-pages/updated/{$slug}

Fires after successfully updating the values of a specific options page.  
The dynamic part of the `$slug` hook refers to the slug of the options page https://tppr.me/VncGB.

**Since: 3.2.7**

**Args:**
- `$page` - Jet_Engine_Options_Page_Factory - Options page manager

**Location:**
includes/components/options-pages/options-page.php

**Access:**
Admin-only

**Example:**

```php
add_action( 'jet-engine/options-pages/updated/my-options', function( $page ) {
    // your custom code
} );

```

## jet-engine/options-pages/updated

Fires after successfully updating the values of the options page.

**Since: 3.2.7**

**Args:**
- `$page` - Jet_Engine_Options_Page_Factory - Options page manager

**Location:**
includes/components/options-pages/options-page.php

**Access:**
Admin-only

**Example:**

```php
add_action( 'jet-engine/options-pages/updated', function( $page ) {
    // your custom code
} );
```