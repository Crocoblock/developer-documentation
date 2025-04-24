## jet-cw/in-elementor

Allows modifying the status of being in the Elementor editor.

**Args:**

- `$result` - bool - status of being in the editor

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

Allows registering custom, as well as modifying existing data for JavaScript variables in the localized script.

**Args:**

- `$localized_data` - array - list of data

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

Allows modifying the list of available icons for the rating.

**Args:**

- `$available_icons` - array - list of icons

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

Allows modifying the list of available data displayed in the Compare Table widget.

**Args:**

- `$data_list` - array - list of data

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