# JetSmartFilters actions

## jet-smart-filters/init

Спрацьовує після ініціалізаціі головного класу Jet_Smart_Filters та усіх модулей. На цей хук потрібно писати власний код, або на дефолтний WordPress екшн ‘init’, щоб уникнути ситуацій коли звертаємося до об'єкта, а він ще непроініціалізований.

**Args:**

- `$jet_smart_filters` - Екземпляр головного класу Jet_Smart_Filters.

**Location:**  
/jet-smart-filters.php

**Access:**  
Global

**Example:**

```php
add_action( 'jet-smart-filters/init', function( $jet_smart_filters ) {
    // отримати список всіх типів фільтрів
    $filter_types = $jet_smart_filters->data->filter_types();
} );
```

---

## jet-smart-filters/query/store-query-props/{$provider_name}

Спрацьовує перед встановленням властивостей запиту. На цей хук можна отримати екземпляр класу Jet_Smart_Filters_Query_Manager для конкретного провайдера.

**Args:**

- `$query` - Екземпляр класу Jet_Smart_Filters_Query_Manager.
- `$query_id` - id провайдера.

**Location:**  
/includes/query.php

**Access:**  
Global

**Example:**

```php
add_action( 'jet-smart-filters/query/store-query-props/jet-engine', function( $query, $query_id ) {
    // id провайдера jet-engine
    print_r( $query_id );
    // екземпляр класу Jet_Smart_Filters_Query_Manager
    print_r( $query );
}, 10, 2 );
```
