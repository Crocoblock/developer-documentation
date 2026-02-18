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

## jet-smart-filters/filters/predefined-value

Default value for the filter. 

**Args:**

*   `$predefined_value` - default value.
*   `$filter_id` - filter ID.
*   `$filter_name` - filter name.

**Location:**  
/includes/filters/base.php

**Access:**  
Global

**Example:**

```php
add_filter( 'jet-smart-filters/filters/predefined-value', function( $predefined_value, $filter_id, $filter_name ) {
    // default value
    var_dump( $predefined_value );
    // filter ID
    var_dump( $filter_id );
    // filter name
    var_dump( $vfilter_namear );

    return $predefined_value;
} );
```

---

## jet-smart-filters/filter-instance/args

Filter arguments for editing and adding third-party ones. 

**Args:**

*   `$args` - arguments.
*   `$filter_instance` - instance of the Jet\_Smart\_Filters\_Filter\_Instance class.

**Location:**  
/includes/filters/instance.php

**Access:**  
Global

**Example:**

```php
add_filter( 'jet-smart-filters/filter-instance/args', function( $args, $filter_instance ) {
    // argument
    var_dump( $args );
    // instance of the Jet_Smart_Filters_Filter_Instance
    var_dump( $filter_instance );

    return $args;
} );
```

---

## jet-smart-filters/filters/posts-source/args

Arguments for get_posts in a filter with the post_type source.

**Location:**  
/includes/filters/checkboxes.php
/includes/filters/select.php
/includes/filters/radio.php

**Access:**  
Global

**Example:**

```php
add_filter( 'jet-smart-filters/filters/posts-source/args', function( $args ) {
    // arguments
    var_dump( $args );

    return $args;
} );
```

---

## jet-smart-filters/filters/filter-options

Фільтр для редагування опцій, що виводяться

**Args:**

*   `$options` - options.
*   `$filter_id` - filter ID.
*   `$filter_instance` - filter class instance.

**Location:**  
/includes/filters/checkboxes.php
/includes/filters/select.php
/includes/filters/radio.php
/includes/filters/check-range.php
/includes/filters/color-image.php

**Access:**  
Global

**Example:**

```php
add_filter( 'jet-smart-filters/range-filter/string-callback-callable', function( $options, $filter_id, $filter_instance ) {
	// options
    var_dump( $options );
	// filter ID
    var_dump( $filter_id );
    // filter class instance
    var_dump( $filter_instance );

	return $options;
} );
```

---


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