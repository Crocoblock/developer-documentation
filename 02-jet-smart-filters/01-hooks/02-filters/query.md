# JetSmartFilters query filters

## jet-smart-filters/query/final-query

Prepared array with data for Query filtering.

**Location:**  
/includes/query.php

**Access:**  
Global

**Example:**

```php
add_filter( 'jet-smart-filters/query/final-query', function( $query ) {
    // data for Query
    print_r( $query );

    return $query;
} );
```

---

## jet-smart-filters/query/vars

List of all variables for Query

**Location:**  
/includes/query.php

**Access:**  
Global

**Example:**

```php
add_filter( 'jet-smart-filters/query/vars', function( $query_vars ) {
    // list of all variables
    print_r( $query_vars );

    return $query_vars;
} );
```

---

## jet-smart-filters/query/add-var

Filter for processing custom variables for Query.

**Args:**

*   `$value` - variable value.
*   `$key` - variable key.
*   `$var` - variable name.
*   `$query_instance` - Instance of the Jet\_Smart\_Filters\_Query\_Manager class.

**Location:**  
/includes/query.php

**Access:**  
Global

**Example:**

```php
add_filter( 'jet-smart-filters/query/add-var', function( $value, $key, $var, $query_instance ) {
    // variable value
    var_dump( $value );
    // variable key
    var_dump( $key );
    // variable name
    var_dump( $var );
    // instance of the Jet_Smart_Filters_Query_Manager
    var_dump( $query_instance );

    return $value;
} );
```

---

## jet-smart-filters/apply-suffix/{$filter_type}

Filter for processing the suffix of custom variables for Query.

**Args:**

*   `$value` - variable value.
*   `$query_instance` - Instance of the Jet\_Smart\_Filters\_Query\_Manager class.

**Location:**  
/includes/query.php

**Access:**  
Global

**Example:**

```php
add_filter( 'jet-smart-filters/apply-suffix/my-filter', function( $value, $query_instance ) {
    // variable value
    var_dump( $value );
    // instance for the Jet_Smart_Filters_Query_Manager
    var_dump( $query_instance );
    // convert the row to an array
    $value = explode( '_', $value );

    return $value;
} );
```

---

## jet-smart-filters/query/meta-query-row

Filter for the generated row for meta_query.

**Args:**

*   `$current_row` - generated row for the meta_query.
*   `$query_instance` - instance of the Jet\_Smart\_Filters\_Query\_Manager class.
*   `$additional_options` - additional option for generating the meta_query row.

**Location:**  
/includes/query.php

**Access:**  
Global

**Example:**

```php
add_filter( 'jet-smart-filters/query/meta-query-row', function( $current_row, $query_instance, $additional_options ) {
    // generated row
    print_r( $current_row );
    // instance of the Jet_Smart_Filters_Query_Manager
    var_dump( $query_instance );
    // additional options
    print_r( $additional_options );

    return $current_row;
} );
```

---

## jet-smart-filters/query/allowed-ajax-actions

List of allowed action names for AJAX requests.

**Location:**  
/includes/query.php

**Access:**  
Global

**Example:**

```php
add_filter( 'jet-smart-filters/query/allowed-ajax-actions', function( $allowed_ajax_actions ) {
    // list of allowed action names
    print_r( $allowed_ajax_actions );

    return $allowed_ajax_actions;
} );
```

---

## jet-smart-filters/query/request

Data from REQUEST for Query.

**Location:**  
/includes/query.php

**Access:**  
Global

**Example:**

```php
add_filter( 'jet-smart-filters/query/request', function( $request ) {  
    // data from REQUEST
    print_r( $request );

    return $request;
} );
```