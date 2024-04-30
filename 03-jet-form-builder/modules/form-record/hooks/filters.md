## Table of Contents

- [`jet-form-builder/export/form-record/row`](#jet-form-builderexportform-recordrow)
- [`jet-form-builder/table-form-fields/column-value/control-options`](#jet-form-buildertable-form-fieldscolumn-valuecontrol-options)
- [`jet-form-builder/on-save-record/field-attributes`](#jet-form-builderon-save-recordfield-attributes)
- [`jet-form-builder/table-form-fields/column-value/control`](#jet-form-buildertable-form-fieldscolumn-valuecontrol)
- [`jet-form-builder/form-record/list`](#jet-form-builderform-recordlist)


## `jet-form-builder/export/form-record/row`
This filter allows modification of the form record row data during export.

### Parameters
- **$row_data (array)**: The data for the current row in the form record.

### Usage

```php
add_filter( 'jet-form-builder/export/form-record/row', function( $row_data ) {
    // Modify $row_data as needed
    return $row_data;
});
```

### Source
https://github.com/Crocoblock/jetformbuilder/modules/form-record/export/base-export-controller.php


## `jet-form-builder/table-form-fields/column-value/control-options`
This filter allows modification of the control options for table form fields column values.

### Parameters
- **$options (array)**: An array of control options for the column value.

### Usage

```php
add_filter( 'jet-form-builder/table-form-fields/column-value/control-options', function( $options ) {
    // Modify $options as needed
    return $options;
});
```

### Source
https://github.com/Crocoblock/jetformbuilder/modules/form-record/admin/view-columns/field-value-column.php


## `jet-form-builder/on-save-record/field-attributes`
This filter is used to modify the field attributes when saving a record.

### Parameters
- **$attributes (array)**: An array of field attributes.

### Usage

```php
add_filter( 'jet-form-builder/on-save-record/field-attributes', function( $attributes ) {
    // Modify $attributes as needed
    return $attributes;
});
```

### Source
https://github.com/Crocoblock/jetformbuilder/modules/form-record/controller.php



## `jet-form-builder/table-form-fields/column-value/control`
Modify the control value for a column in table form fields.

### Parameters
- **$control_value (mixed)**: The control value for the column.

### Usage

```php
add_filter( 'jet-form-builder/table-form-fields/column-value/control', function( $control_value ) {
    // Modify $control_value as needed
    return $control_value;
});
```

### Source
https://github.com/Crocoblock/jetformbuilder/modules/form-record/admin/view-columns/field-value-column.php


## `jet-form-builder/form-record/list`
This filter is used to alter the list of form records.

### Parameters
- **$records_list (array)**: An array of form records.

### Usage

```php
add_filter( 'jet-form-builder/form-record/list', function( $records_list ) {
    // Modify $records_list as needed
    return $records_list;
});
```

### Source
https://github.com/Crocoblock/jetformbuilder/modules/form-record/admin/table-views/records-table-view.php
