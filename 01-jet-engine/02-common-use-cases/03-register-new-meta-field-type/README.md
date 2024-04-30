# JetEngine. New Meta Field Type

**This is an instruction template. The full instruction will follow after the refactoring**

This document describes the mechanism for registering new types of meta fields for JetEngine.

## Add a new field type to the list of available types

Adding a new field type using the `jet-engine/meta-fields/config` filter:

```php
/**
 * Place hook on you class init
 */
public function __construct() {
	add_filter( 'jet-engine/meta-fields/config', array( $this, 'register_field_type' ) );
}

/**
 * Register field type for JetEngine options
 * 
 * @param  array $config Meta fields editor config
 * @return array
 */
public function register_field_type( $config = [] ) {

	/**
	 * Add field new field type to existing types list.
	 */
	$config['field_types'][] = [
		'value'         => 'my_field_type',
		'label'         => 'Field Type Lable',
		'skip_repeater' => true, // skip this field from allowed types for nested repeater fields.
	];

	/**
	 * Allow to use this field type in conditional settings.
	 */
	foreach ( $config['condition_operators'] as &$condition_operator ) {

		if ( empty( $condition_operator['value'] ) ) {
			continue;
		}

		if ( in_array( $condition_operator['value'], array( 'equal', 'not_equal' ) ) 
			&& isset( $condition_operator['not_fields'] ) 
		) {
			$condition_operator['not_fields'][] = 'my_field_type';
		}

		if ( in_array( $condition_operator['value'], array( 'contains', '!contains' ) ) 
			&& isset( $condition_operator['fields'] ) 
		) {
			$condition_operator['fields'][] = 'my_field_type';
		}

	}

	unset( $condition_operator );

	return $config;
}
```
