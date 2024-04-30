# JetFormBuilder. Block parsers module actions

## Table of contents

* [`jet-form-builder/parsers-request/register`](#jet-form-builderparsers-requestregister)

## `jet-form-builder/parsers-request/register`
Використовується для реєстрації власних обробників полів. Можна робити модифікації наявних парсерів.


### Parameters

* $parsers [`\JFB_Modules\Block_Parsers\Field_Data_Parser[]`](https://github.com/Crocoblock/jetformbuilder/blob/main/modules/block-parsers/field-data-parser.php)

### Usage

```php
add_action(
	'jet-form-builder/parsers-request/register',
	/**
	 * @var \JFB_Modules\Block_Parsers\Field_Data_Parser[] $parsers
	 */
	function ( $parsers ) {
		array_push(
			$parsers,
			new class extends \JFB_Modules\Block_Parsers\Field_Data_Parser {
				/**
				 * Second part in blockName (after "jet-forms/")
				 *
				 * Or return "default" to replace the default parser that applies
				 * to all fields that do not have a personal parser
				 *
				 * @return string
				 */
				public function type() {
					return 'number-field';
				}
			}
		);

		return $parsers;
	}
);
```

### Source
https://github.com/Crocoblock/jetformbuilder/blob/main/modules/block-parsers/module.php

