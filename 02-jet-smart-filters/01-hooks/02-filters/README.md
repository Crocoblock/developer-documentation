# JetSmartFilters filters

## jet-smart-filters/filters/localized-data

Список всіх локалізованих даних для JavaScript.

**Location:**  
/includes/filters/manager.php

**Access:**  
Global

**Example:**

```php
add_filter( 'jet-smart-filters/filters/localized-data', function( $localized_data ) {
    // масив даних, що локалізуються
    print_r( $localized_data );

    return $localized_data;
} );
```

---

## jet-smart-filters/filters/valid-url-params

Список дійсних параметрів URL, які вважаються як URL параметри плагіна.

**Location:**  
/includes/filters/manager.php

**Access:**  
Global

**Example:**

```php
add_filter( 'jet-smart-filters/filters/valid-url-params', function( $valid_url_params ) {
	// масив дійсних параметрів URL плагіна
	print_r( $valid_url_params );

	return $valid_url_params;
} );
```

## jet-smart-filters/range-filter/string-callback-callable

Фільтр, який дозволяє конвертувати текстове ім'я колбеку для Range фільтру у відповідний callable об'єкт, що повертає данні. Це корисно для випадків, коли нам потрібно додати новий колбек для Get min/max dynamically опції, але цей колбек локалізований в класі або може бути лише анонімною функцією.

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
