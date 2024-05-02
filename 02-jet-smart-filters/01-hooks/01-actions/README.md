# JetSmartFilters actions

## jet-smart-filters/init

Fires after the initialization of the main class `Jet_Smart_Filters` and all modules. Custom code should be written on this hook or on the default WordPress action `init` to avoid situations where an object is accessed before it is initialized.

**Args:**

- `$jet_smart_filters` - Instance of the main `Jet_Smart_Filters` class.

**Location:**  
/jet-smart-filters.php

**Access:**  
Global

**Example:**

```php
add_action( 'jet-smart-filters/init', function( $jet_smart_filters ) {
    // get a list of all filter types
    $filter_types = $jet_smart_filters->data->filter_types();
} );
```

---

## jet-smart-filters/query/store-query-props/{$provider_name}

Fires before setting the query properties. On this hook, you can get an instance of the class `Jet_Smart_Filters_Query_Manager` for a specific provider.

**Args:**

- `$query` - Instance of the `Jet_Smart_Filters_Query_Manager` class.
- `$query_id` - Provider ID.

**Location:**  
/includes/query.php

**Access:**  
Global

**Example:**

```php
add_action( 'jet-smart-filters/query/store-query-props/jet-engine', function( $query, $query_id ) {
    // jet-engine provider ID
    print_r( $query_id );
    // instance of class Jet_Smart_Filters_Query_Manager
    print_r( $query );
}, 10, 2 );
```
