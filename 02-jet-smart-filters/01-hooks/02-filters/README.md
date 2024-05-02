# JetSmartFilters filters

## jet-smart-filters/filters/localized-data

List of all localized data for JavaScript.

**Location:**  
/includes/filters/manager.php

**Access:**  
Global

**Example:**

```php
add_filter( 'jet-smart-filters/filters/localized-data', function( $localized_data ) {
    // array of localized data
    print_r( $localized_data );

    return $localized_data;
} );
```

---

## jet-smart-filters/filters/valid-url-params

List of valid URL parameters that are considered as plugin URL parameters.

**Location:**  
/includes/filters/manager.php

**Access:**  
Global

**Example:**

```php
add_filter( 'jet-smart-filters/filters/valid-url-params', function( $valid_url_params ) {
	// array of valid plugin URL parameters
	print_r( $valid_url_params );

	return $valid_url_params;
} );
```

## jet-smart-filters/range-filter/string-callback-callable

Filter that allows converting the string name of a callback for the Range filter into a corresponding callable object that returns data. This is useful for cases where we need to add a new callback for the `Get min/max dynamically` option, but this callback is localized in a class or can only be an anonymous function.

**Location:**  
/includes/filters/range.php

**Access:**  
Global

**Example:**

```php
add_filter( 'jet-smart-filters/range-filter/string-callback-callable', function( $callback ) {
	
	if ( 'test_callback' === $callback ) {
		$callback = function( $args ) {
			return [
				'min' => 0,
				'max' => 100,
			];
		}
	}

	return $callback;
} );
```
