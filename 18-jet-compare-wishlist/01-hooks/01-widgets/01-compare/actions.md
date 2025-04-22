# List of actions related to Compare widgets

## jet-cw/compare/render/get-content/{$widget_type}

Triggers when the comparison list is updated. It is intended for rendering the widget content related to the comparison list, which is not handled by the plugin's logic.

**Args:**

- `$widget_setting` - array - list of widget settings
- `$product_id` - string|int - product ID

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/compare/class-jet-cw-compare-render.php">
includes/compare/class-jet-cw-compare-render.php</a>

**Access:**
Frontend only

**Example:**

```php
add_action( 'jet-cw/compare/render/get-content/{$widget_type}', function( $widget_setting, $product_id ) {
    // обробка параметрів переданих хуком.
    ?>
    <div class="...">
        <!-- структура віджета, основана на оброблених параметрах. -->
    </div>
    <?php
}, 10, 2 );
```

## jet-cw/compare/render/before-add-to-compare

Спрацьовує в момент перед оновленням списку порівняння. Призначений для додаткової обробки даних та введення нової логіки.

**Args:**

- `$product_id` - string|int - ID продукту
- `$context` - string - Контекст типу оновлення списку (додавання або видалення)
- `$render` - Jet_CW_Compare_Render - екземпляр класу Jet_CW_Compare_Render

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/compare/class-jet-cw-compare-render.php">
includes/compare/class-jet-cw-compare-render.php</a>

**Access:**
Frontend only

**Example:**

```php
add_action( 'jet-cw/compare/render/before-add-to-compare', function( $product_id, $context, $render ) {
    // Перевірити, чи користувач увійшов в систему.
    if ( ! is_user_logged_in() ) {
        wp_redirect( 'https://example.com/new-page' ); // Перенаправлення на іншу сторінку за допомогою функції WordPress.
        exit; // Переконайтеся, що після `wp_redirect` вказано вихід.
    }
}, 10, 3 );
```