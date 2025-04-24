# How to Register Custom Filters for Macros

This documentation will guide you through registering custom filters for macros by extending the `Base_Filter` and `Base_Multiple_Filter` classes. We'll explore the differences between these two classes and provide examples to help you understand their usage.

## Overview

**Base_Filter**: This class is designed for single value transformations. It allows you to apply custom logic to a single input value and return the transformed result.

**Base_Multiple_Filter**: This class extends `Base_Filter` and is used for transforming multiple values. It handles arrays or comma-separated strings and applies custom logic to each item in the collection.

## Extending the `Base_Filter` Class

To create a custom filter by extending the `Base_Filter` class, follow these steps:

1. **Create a New Filter Class**: Define a new class that extends `Base_Filter`.
2. **Implement Required Methods**: Implement the `get_id`, `apply_macros`, and other necessary methods.

Here’s an example of extending the `Base_Filter` class:

```php
<?php

namespace My_Plugin\Filters;

use Jet_Form_Builder\Classes\Filters\Base_Filter;

class My_Custom_Filter extends Base_Filter {

	public function get_id(): string {
		return 'my_custom_filter';
	}

	public function apply_macros( $value, ...$args ): string {
		// Custom logic to transform the value
		return strtoupper($value); // Example: Convert to uppercase
	}
}
```

## Extending the `Base_Multiple_Filter` Class

To create a custom filter by extending the `Base_Multiple_Filter` class, follow these steps:

1. **Create a New Filter Class**: Define a new class that extends `Base_Multiple_Filter`.
2. **Implement Required Methods**: Implement the `get_id`, `apply_item`, and other necessary methods.

Here’s an example of extending the `Base_Multiple_Filter` class:

```php
<?php

namespace My_Plugin\Filters;

use Jet_Form_Builder\Classes\Filters\Base_Multiple_Filter;

class My_Custom_Multiple_Filter extends Base_Multiple_Filter {

	public function get_id(): string {
		return 'my_custom_multiple_filter';
	}

	protected function apply_item( $item, ...$args ): string {
		// Custom logic to transform each item
		return ucfirst(trim($item)); // Example: Capitalize first letter and trim spaces
	}
}
```

## Differences Between `Base_Filter` and `Base_Multiple_Filter`

1. **Single vs. Multiple Values**:
    - `Base_Filter` is used for single value transformations.
    - `Base_Multiple_Filter` handles multiple values (arrays or comma-separated strings). For example, it can Checkbox or Advanced Choices Field

2. **Method Implementation**:
    - `Base_Filter` requires the implementation of `apply_macros` for the main transformation logic.
    - `Base_Multiple_Filter` requires the implementation of `apply_item` to transform each item in a collection, and `apply_macros` handles the collection transformation.

3. **Callback Arguments**:
    - `Base_Filter` uses the `callback_args` method to provide default arguments for the filter.
    - `Base_Multiple_Filter` overrides `callback_args` to include a delimiter for joining multiple transformed items.

## Registering the Filters

To register your custom filters, you need to hook them into the relevant filter actions provided by your plugin or WordPress.

Example registration:

```php

add_filter(
	'jet-form-builder/content-filters',
	function ( $filters ) {
		array_push(
			$filters,
			new \My_Plugin\Filters\My_Custom_Filter(),
			new \My_Plugin\Filters\My_Custom_Multiple_Filter()
		);

		return $filters;
	}
);
```

By following these steps, you can create and register custom filters for single and multiple value transformations, allowing you to apply specific macros to content within your WordPress plugin.