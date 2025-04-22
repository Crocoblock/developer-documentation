## jet-cw/in-elementor

Дозволяє модифікувати статус находження в редакторі Elementor.

**Args:**

- `$result` - bool - статус находження в редакторі

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/class-jet-cw-integration.php">
includes/class-jet-cw-integration.php</a>

**Access:**
Elementor editor only

**Example:**

```php
add_filter( 'jet-cw/in-elementor', function( $result ) {
    if ( is_admin() ) {
        return true;
    }
	
    return $result;
} );
```

## jet-cw/localized-data

Дозволяє зареєструвати власні, а також модифікувати вже наявні дані для JavaScript змінних у локалізованому скрипті.

**Args:**

- `$localized_data` - array - список даних

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/class-jet-cw-widgets-store.php">
includes/class-jet-cw-widgets-store.php</a>

**Access:**
Frontend only

**Example:**

```php
add_filter( 'jet-cw/localized-data', function( $localized_data ) {
    $localized_data['ajaxurl'] = esc_url( admin_url( 'admin-ajax.php' ) );
    
    return $localized_data;
} );
```

## jet-cw/tools/rating/available-icons

Дозволяє модифікувати список наявних іконок для рейтингу.

**Args:**

- `$available_icons` - array - список іконок

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/class-jet-cw-tools.php">
includes/class-jet-cw-tools.php</a>

**Access:**
Frontend and editor

**Example:**

```php
add_filter( 'jet-cw/tools/rating/available-icons', function( $available_icons ) {
    $available_icons['jetcomparewishlist-icon-rating-15'] = __( 'Rating 15', 'jet-cw' );
	
    return $available_icons;
} );
```

## jet-cw/tools/compare-table/data-list

Дозволяє модифікувати список доступних даних, що виводяться у віджеті Compare Table.

**Args:**

- `$data_list` - array - список даних

**Location:**
<a href="https://github.com/ZemezLab/jet-compare-wishlist/blob/master/includes/class-jet-cw-tools.php">
includes/class-jet-cw-tools.php</a>

**Access:**
Frontend and editor

**Example:**

```php
add_filter( 'jet-cw/tools/compare-table/data-list', function( $data_list ) {
    unset( $data_list['stock_status'] );
    unset( $data_list['weight'] );
	
    return $data_list;
} );
```