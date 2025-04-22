# List of actions related to Wishlist widgets

## jet-cw/wishlist/render/get-content/{$widget_type}

Спрацьовує в момент оновлення списку бажаного. Призначений для рендеру контенту віджета пов'язаного зі списком бажаного,
обробка якого не передбачено логікою плагіну.

**Args:**

- `$widget_setting` - array - список налаштувань віджета
- `$product_id` - string|int - ID продукту

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/wishlist/class-jet-cw-wishlist-render.php">
includes/wishlist/class-jet-cw-wishlist-render.php</a>

**Access:**
Frontend only

**Example:**

```php
add_action( 'jet-cw/wishlist/render/get-content/{$widget_type}', function( $widget_setting, $product_id ) {
    // обробка параметрів переданих хуком.
    ?>
    <div class="...">
        <!-- структура віджета, основана на оброблених параметрах. -->
    </div>
    <?php
}, 10, 2 );
```

## jet-cw/wishlist/render/before-add-to-wishlist

Спрацьовує в момент перед оновленням списку бажаного. Призначений для додаткової обробки даних та введення нової логіки.

**Args:**

- `$product_id` - string|int - ID продукту
- `$context` - string - Контекст типу оновлення списку (додавання або видалення)
- `$render` - Jet_CW_Wishlist_Render - екземпляр класу Jet_CW_Wishlist_Render

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/wishlist/class-jet-cw-wishlist-render.php">
includes/wishlist/class-jet-cw-wishlist-render.php</a>

**Access:**
Frontend only

**Example:**

```php
add_action( 'jet-cw/wishlist/render/before-add-to-wishlist', function( $product_id, $context, $render ) {
    // Перевірити, чи користувач увійшов в систему.
    if ( ! is_user_logged_in() ) {
        wp_redirect( 'https://example.com/new-page' ); // Перенаправлення на іншу сторінку за допомогою функції WordPress.
        exit; // Переконайтеся, що після `wp_redirect` вказано вихід.
    }
}, 10, 3 );
```