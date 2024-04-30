# JetFormBuilder. Blocks-related filters

## Table of contents
* [`jet-form-builder/editor/hidden-field/config`](#jet-form-buildereditorhidden-fieldconfig)
* [`jet-form-builder/fields/hidden-field/value-cb`](jet-form-builderfieldshidden-fieldvalue-cb)
* [`jet-form-builder/fields/wysiwyg-field/config`](#jet-form-builderfieldswysiwyg-fieldconfig)


## `jet-form-builder/editor/hidden-field/config`
Must return an object listing the available functions for the "Field Value" option in the Hidden Field.

### Parameters
* $config `array`

### Usage
```php
add_filter(
	'jet-form-builder/editor/hidden-field/config',
	function ( array $config ) {
		$config['sources'][] = array(
			'value' => 'custom_value',
			'label' => __( 'My custom value', 'jet-form-builder' ),
		);

		return $config;
	}
);
```

### Source
https://github.com/Crocoblock/jetformbuilder/blob/main/includes/blocks/types/hidden-field.php

## `jet-form-builder/fields/hidden-field/value-cb`
Must return a function that at some point returns some value for a hidden form field.

### Parameters
* $callback `false|callable`
* $field_value `string` (slug of field value)

### Usage
```php
add_filter(
	'jet-form-builder/fields/hidden-field/value-cb',
	function ( $callback, $field_value ) {
		if ( 'custom_value' !== $field_value ) {
			return $callback;
		}

		return function () {
			return 'value_for_hidden_field';
		};
	},
	10,
	2
);
```

### Source
https://github.com/Crocoblock/jetformbuilder/blob/main/includes/blocks/types/hidden-field.php

## `jet-form-builder/fields/wysiwyg-field/config`
Should return an array with settings for the wp_editor function

### Parameters
* $settings `array` ([$settings param](https://developer.wordpress.org/reference/functions/wp_editor/#parameters))

### Usage
```php
add_filter(
	'jet-form-builder/fields/wysiwyg-field/config',
	function ( $config ) {
		/**
		 * You can find a list of all available plugins as folder names
		 * in wp-includes/js/tinymce/plugins
		 */
		$plugins         = array(
			'colorpicker',
			'textcolor',
		);
		$toolbar_buttons = array(
			'|',
			'fontselect',
			'fontsizeselect',
			'|',
			'forecolor',
			'backcolor'
		);

		$config['tinymce']['plugins']  .= ',' . implode( ',', $plugins );
		$config['tinymce']['toolbar1'] .= ',' . implode( ',', $toolbar_buttons );
		
		// add button for upload images
		$config['media_buttons']       = true;

		// make wysiwyg responsive to paragraphs from Microsoft Word, Google Docs etc.
		$config['tinymce'] = array_merge(
			$config['tinymce'],
			array(
				'paste_as_text' => false,
				'paste_auto_cleanup_on_paste' => false,
				'paste_remove_spans' => false,
				'paste_remove_styles' => false,
				'paste_remove_styles_if_webkit' => false,
				'paste_strip_class_attributes' => false,
			)
		);

		return $config;
	}
);
```

## Source
https://github.com/Crocoblock/jetformbuilder/blob/main/templates/fields/wysiwyg-field.php
