# JetSmartFilters indexer

## jet-smart-filters/indexer/indexing-filter-data

Data of the filter that will be indexed and written to the indexed table.

**Location:**
/includes/indexer/manager.php

**Access:**
Admin-only

**Example:**

```php
add_filter( 'jet-smart-filters/indexer/indexing-filter-data', function( $filter_data ) {
    // indexing filter data
    var_dump( $filter_data );

    return $filter_data;
} );
```

---

## jet-smart-filters/indexer/indexing-filter-data

Data of the filter that will be indexed and written to the indexed table.

**Location:**
/includes/indexer/manager.php

**Access:**
Admin-only

**Example:**

```php
add_filter( 'jet-smart-filters/indexer/indexing-filter-data', function( $filter_data ) {
    // indexing filter data
    var_dump( $filter_data );

    return $filter_data;
} );
```

---

## jet-smart-filters/indexer/custom-args

Filter for setting the data of the indexed filter with a custom source.

**Location:**
/includes/indexer/manager.php

**Access:**
Admin-only

**Example:**

```php
add_filter( 'jet-smart-filters/indexer/custom-args', function( $filter_data ) {
    // custom source filter data
    var_dump( $filter_data );

    return $filter_data;
} );
```

---

## jet-smart-filters/indexer/get-post-meta

The filter returns all metadata for the index during indexing.

**Args:**

*   `$result` - indexed metadata.
*   `$metadata` - metadata for indexing.

**Location:**
/includes/indexer/manager.php

**Access:**
Admin-only

**Example:**

```php
add_filter( 'jet-smart-filters/indexer/get-post-meta', function( $result, $metadata ) {
    // indexed metadata
    var_dump( $result );
    // metadata for indexing
    var_dump( $metadata );

    return $result;
}, 10, 2 );
```

---

## jet-smart-filters/indexer/get-user-meta

The filter returns all user's metadata for the index during indexing.

**Args:**

*   `$result` - indexed user's metadata.
*   `$metadata` - user's metadata for indexing.

**Location:**
/includes/indexer/manager.php

**Access:**
Admin-only

**Example:**

```php
add_filter( 'jet-smart-filters/indexer/get-user-meta', function( $result, $metadata ) {
    // indexed user's metadata
    var_dump( $result );
    // user's metadata for indexing
    var_dump( $metadata );

    return $result;
}, 10, 2 );
```

---

## jet-smart-filters/indexer/single-item-data

Data for the index during creation or update of a single post. Used when the "Use auto re-indexing" option is enabled to modify not all indexer data, but only the data related to the updated post.

**Args:**

*   `$new_rows` - indexed data.
*   `$filters_data` - filter data to be indexed. 
*   `$type` - post/user type.
*   `$id` - post ID.

**Location:**
/includes/indexer/manager.php

**Access:**
Admin-only

**Example:**

```php
add_filter( 'jet-smart-filters/indexer/single-item-data', function( $new_rows, $filters_data, $type, $id ) {
    // indexed data
    print_r( $new_rows );
    // filter data
    print_r( $filters_data );
    // post/user type
    var_dump( $type );
    // post ID
    var_dump( $id );

    return $new_rows;
}, 10, 4 );
```

---

## jet-smart-filters/indexer/group_concat_max_len

Filter for `group_concat_max_len`, a MySQL setting that defines the maximum length of the string returned by the `GROUP_CONCAT()` function.
Default value = 262144.

**Location:**
/includes/indexer/manager.php

**Access:**
Admin-only

**Example:**

```php
add_filter( 'jet-smart-filters/indexer/group_concat_max_len', function( $max_len ) {
    // group_concat_max_len
    var_dump( $max_len );

    return $max_len;
} );
```

---

## jet-smart-filters/filters/indexed-data

Filter for the indexed provider data.

**Args:**

*   `$indexed_data` - indexed data.
*   `$indexed_array_data` - array with indexer data.  
    array(  
        'provider_key' => provider key,  
        'query_args' => provider query arguments,  
        'type' => type of indexed data, 
        'queried_ids' => IDs of posts being indexed, 
        'indexing_data' => indexed data 
    )


**Location:**
/includes/indexer/data.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-smart-filters/filters/indexed-data', function( $indexed_data, $indexed_array_data ) {
    // array with indexed data
    print_r( $indexed_array_data );

    return $indexed_data;
}, 10, 2 );
```

---

## jet-smart-filters/filters/indexed-data/query-type-data

Filter for indexed data by type.

**Args:**

*   `$query_type_indexed_data` - indexed data by type.
*   `$query_type` - type of indexed data.
*   `$key` - data source key for indexing.
*   `$data` - data from the source for indexing.
*   `$indexer_data_instance` - Instance of the Jet\_Smart\_Filters\_Indexer\_Data class.
*   `$queried_ids` - IDs of posts being indexed.
*   `$provider_key` - provider key (Provider Name/Query ID).

**Location:**
/includes/indexer/data.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-smart-filters/filters/indexed-data/query-type-data', function( $query_type_indexed_data, $query_type, $key, $data, $indexer_data_instance, $queried_ids, $provider_key ) {
    // indexed data by type
    print_r( $query_type_indexed_data );
    // type of indexed data
    var_dump( $query_type );
    // data source key for indexing
    var_dump( $key );
    // data from the source
    print_r( $data );
    // Instance of the Jet_Smart_Filters_Indexer_Data
    print_r( $indexer_data_instance );
    // post IDs 
    print_r( $queried_ids );
    // provider key
    var_dump( $provider_key );

    return $query_type_indexed_data;
}, 10, 7 );
```

---

## jet-smart-filters/filters/indexed-data

Filter for indexed data by type.

**Args:**

*   `$query_type_indexed_data` - indexed data by type.
*   `$query_type` - type of indexed data.
*   `$key` - data source key for indexing.
*   `$data` - data from the source for indexing.
*   `$indexer_data_instance` - instance of the Jet\_Smart\_Filters\_Indexer\_Data class.
*   `$queried_ids` - IDs of posts being indexed.
*   `$provider_key` - provider key (Provider Name/Query ID).

**Location:**
/includes/indexer/data.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-smart-filters/filters/indexed-data', function( $query_type_indexed_data, $query_type, $key, $data, $indexer_data_instance, $queried_ids, $provider_key ) {
    // indexed data by type
    print_r( $query_type_indexed_data );
    // type of indexed data
    var_dump( $query_type );
    // data source key for indexing
    var_dump( $key );
    // data from the source
    print_r( $data );
    // instance of the Jet_Smart_Filters_Indexer_Data
    print_r( $indexer_data_instance );
    // post IDs
    print_r( $queried_ids );
    // provider key
    var_dump( $provider_key );

    return $query_type_indexed_data;
}, 10, 7 );
```

---

## jet-smart-filters/pre-get-indexed-data

Filter for setting custom indexed data for the provider.

**Args:**

*   `$pre_get_data` - custom indexed data (always false).
*   `$provider_key` - provider key (Provider Name/Query ID).
*   `$query_args` - provider query arguments.
*   `$indexer_data_instance` - instance of the Jet\_Smart\_Filters\_Indexer\_Data class.

**Location:**
/includes/indexer/data.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-smart-filters/pre-get-indexed-data', function( $pre_get_data, $provider_key, $query_args, $indexer_data_instance ) {
    if ( $provider_key === 'jet-engine/default' ) {
        // query arguments
        print_r( $query_args );
        // instance of the Jet_Smart_Filters_Indexer_Data
        print_r( $indexer_data_instance );
    }

    return $pre_get_data;
}, 10, 4 );
```

---

## jet-smart-filters/indexer/filter-source

Filter for the indexed filter data.

**Location:**
/includes/indexer/data.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-smart-filters/indexer/filter-source', function( $filter_data ) {
    // filter data
    print_r( $filter_data );

    return $filter_data;
} );
```

---

## jet-smart-filter/templates/counter/format

Filter when outputting the indexer counter on the frontend in the filter.

**Location:**
/includes/indexer/data.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-smart-filter/templates/counter/format', function( $filter_data ) {
    // filter data
    print_r( $filter_data );

    return $filter_data;
} );
```