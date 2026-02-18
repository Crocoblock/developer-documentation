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
---
---

## jet-smart-filters/filter-types/register

Action for custom filters registering

**Args:**

*   `$manager` - Instance of the Jet\_Smart\_Filters\\Filter\_Manager class.

**Location:**  
/includes/filters/manager.php

**Access:**  
Global

```php
add_action( 'jet-smart-filters/filter-types/register', function( $manager ) {
    $filter_class = 'Custom_Filter';
    $filter_file = '...path/custom-filter.php';

    $manager->register_filter_type(  $filter_class, $filter_file);
}, 10 );
```

---

## jet-smart-filters/render/ajax/before

Fires before rendering the provider during an AJAX request

**Args:**

*   `$render` - Instance of the Jet\_Smart\_Filters\_Render class.
*   `$provider_id` - provider ID.
*   `$query_id` - query ID of the provider.
*   `$provider` - provider instance.

**Location:**  
/includes/render.php

**Access:**  
Frontend

```php
add_action( 'jet-smart-filters/render/ajax/before', function( $render, $provider_id, $query_id, $provider ) {
    // Instance of the Jet_Smart_Filters_Render class
    print_r( $render );
    // provider ID
    print_r( $provider_id );
    // query ID of the provider
    print_r( $query_id );
    // provider instance
    print_r( $provider );
}, 10, 4 );
```

---

## jet-smart-filters/filters/before-render

Fires before filter rendering

**Args:**

*   `$args` - filter arguments
*   `$filter` - instance of the Jet\_Smart\_Filters\_Filter\_Instance class.

**Location:**  
/includes/filters/instance.php

**Access:**  
Frontend

```php
add_action( 'jet-smart-filters/filters/before-render', function( $args, $filter ) {
    // Filter arguments
    print_r( $args );
    // Instance of the  Jet_Smart_Filter_Instance
     print_r( $filter );
}, 10, 2 );
```

---

## jet-smart-filters/providers/register

Action for registering custom providers

**Args:**

*   `$providers_manager` - Instance of the Jet\_Smart\_Filters\_Filter\_Providers\_Manager class.

**Location:**  
/includes/providers/manager.php

**Access:**  
Global

```php
add_action( 'jet-smart-filters/filters/before-render', function( $providers_manager ) {
    $provider_class = 'Custom_Provider';
    $provider_file  = '...path/custom-provider.php';

    $providers_manager->register_provider( $provider_class, $provider_file );
}, 10 );
```

---

## Actions for Elementor Pro Archive Products in Ajax

**jet-smart-filters/providers/epro-archive-products/before-ajax-content** - action before rendering the provider   
**jet-smart-filters/providers/epro-archive-products/after-ajax-content** -  action after rendering the provider

**Location:**  
/includes/providers/epro-archive-products.php

**Access:**  
Frontend

---

## jet-smart-filter/templates/counter

The action is used to output the HTML of the indexer counter

**Args:**

*   `$args` - filter arguments

**Location:**  
/templates/filters/check-range.php  
/templates/filters/checkboxes-item.php  
/templates/filters/color-image-item.php  
/templates/filters/radio-item.php

**Access:**  
Frontend

```php
add_action( 'jet-smart-filter/templates/counter', function( $args ) {
    $counter_html = '<span class="jet-filters-counter">';
    $counter_html .= '[<span class="value">0</span>]';
    $counter_html .= '</span>';

    echo $counter_html;
}, 99 );
```

---

## Actions for Ajax Request Types

**jet-smart-filters/referrer/ajax/before** - before setting the global variables змінних Referrer (ajax admin-ajax.php request + referrer)  
**jet-smart-filters/referrer/self/before** - before setting the global variables Self (request for the current page)  
**jet-smart-filters/referrer/request** - after setting the global variables

**Location:**  
/includes/referrer.php

**Access:**  
Global

---

## Actions for indexer prepare data

**jet-smart-filters/indexer/before-prepare-data** - action before preparing the indexer data 
**jet-smart-filters/indexer/after-prepare-data** - action after preparing the indexer data 

**Location:**  
/includes/indexer/data.php

**Access:**  
Global

---

## jet-smart-filters/seo/frontend/init-rule

Fires before the SEO rules initialization 

**Args:**

*   `$filters_SEO` - Instance of the Jet\_Smart\_Filters\_Filter\_SEO\_Frontend class.

**Location:**  
/includes/SEO/frontend.php

**Access:**  
Frontend

```php
add_action( 'jet-smart-filters/seo/frontend/init-rule', function( $filters_SEO ) {
    // Instance of the Jet_Smart_Filters_SEO_Frontend class
    print_r( $filters_SEO );
}, 10 );
```