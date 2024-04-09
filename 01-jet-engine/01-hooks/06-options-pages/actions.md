# Actions

## jet-engine/options-pages/updated/{$slug}

Виконується після успішного оновлення значень певної сторінки опцій.
Динамічна частина хука `$slug`, посилається на слаг сторінки опцій https://tppr.me/VncGB.

**Since: 3.2.7**

**Args:**
- `$page` - Jet_Engine_Options_Page_Factory - Менеджер сторінки опцій

**Location:**
[includes/components/options-pages/options-page.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/options-pages/options-page.php)


**Access:**
Admin-only

**Example:**

```php
add_action( 'jet-engine/options-pages/updated/my-options', function( $page ) {
    // your custom code
} );
```

## jet-engine/options-pages/updated

Виконується після успішного оновлення значень сторінки опцій.

**Since: 3.2.7**

**Args:**
- `$page` - Jet_Engine_Options_Page_Factory - Менеджер сторінки опцій

**Location:**
[includes/components/options-pages/options-page.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/components/options-pages/options-page.php)


**Access:**
Admin-only

**Example:**

```php
add_action( 'jet-engine/options-pages/updated', function( $page ) {
    // your custom code
} );
```