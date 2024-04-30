# JetFormBuilder. Blocks-related actions

## Table of contents
* [`jet-form-builder/before-page-start`](#jet-form-builderbefore-page-start)
* [`jet-form-builder/before-start-form-row`](#jet-form-builderbefore-start-form-row)
* [`jet-form-builder/after-start-form-row`](#jet-form-builderafter-start-form-row)
* [`jet-form-builder/before-end-form-row`](#jet-form-builderbefore-end-form-row)
* [`jet-form-builder/after-end-form-row`](#jet-form-builderafter-end-form-row)
* [`jet-form-builder/media-field/before-upload`](#jet-form-buildermedia-fieldbefore-upload)
* [`jet-form-builder/inserted-attachment`](#jet-form-builderinserted-attachment)

## `jet-form-builder/before-page-start`
Executed before rendering the opening HTML tag of the page with the `jet-form-builder-page` css-class.\
Currently in this hook we can change the scroll offset when going to the current page.

> You must have the "Scroll to the top on page change" option enabled on the JetFormBuilder -> Settings page

### Parameters
* $break [`\Jet_Form_Builder\Form_Break`](https://github.com/Crocoblock/jetformbuilder/blob/main/includes/form-break.php)

### Usage
```php
add_action(
	'jet-form-builder/before-page-start',
	/**
	 * @var \Jet_Form_Builder\Form_Break $break
	 */
	function ( $break ) {
		// Check form ID.
		if ( 77 !== jet_fb_live()->form_id ) {
			return;
		}

		/**
		 * Depending on the order of the page, we can determine the offset.
		 * The larger the offset, the higher the scroll will be
		 */
		switch ( $break->get_current() ) {
			case 1:
				$break->set_page_offset( 100 );
				break;
			case 2:
				$break->set_page_offset( 0 );
				break;
		}
	}
);
```

### Source
https://github.com/Crocoblock/jetformbuilder/blob/main/includes/form-break.php

## `jet-form-builder/before-start-form-row`
It is executed before rendering the markup with the opening `div` tag for each field.\
This element can be accessed using the `jet-form-builder-row` or `field-type-{$block_type}` class

### Parameters
* $block [`\Jet_Form_Builder\Blocks\Types\Base`](https://github.com/Crocoblock/jetformbuilder/blob/main/includes/blocks/types/base.php)

### Usage
```php
add_action(
	'jet-form-builder/before-start-form-row',
	/**
	 * @var \Jet_Form_Builder\Blocks\Types\Base $block
	 */
	function( $block ) {
		// you could use "echo" or "$block->add_attribute" here
		// echo will add content outside the `div`
	},
	10,
	1
);
```

### Source
https://github.com/Crocoblock/jetformbuilder/blob/main/includes/blocks/types/base.php

## `jet-form-builder/after-start-form-row`
It is executed after rendering the markup with the opening `div` tag for each field.\
This element can be accessed using the `jet-form-builder-row` or `field-type-{$block_type}` class

### Parameters
* $block [`\Jet_Form_Builder\Blocks\Types\Base`](https://github.com/Crocoblock/jetformbuilder/blob/main/includes/blocks/types/base.php)

### Usage
```php
add_action(
	'jet-form-builder/after-start-form-row',
	/**
	 * @var \Jet_Form_Builder\Blocks\Types\Base $block
	 */
	function( $block ) {
		// you could use "echo" or "$block->add_attribute" here
		// echo will add content inside the `div`
	},
	10,
	1
);
```

### Source
https://github.com/Crocoblock/jetformbuilder/blob/main/includes/blocks/types/base.php

## `jet-form-builder/before-end-form-row`
Executed before rendering the markup with the closing `div` tag for each field that opens on the [`jet-form-builder/before-start-form-row`](#jet-form-builderbefore-start-form-row) hook

### Parameters
* $block [`\Jet_Form_Builder\Blocks\Types\Base`](https://github.com/Crocoblock/jetformbuilder/blob/main/includes/blocks/types/base.php)

### Usage
```php
add_action(
	'jet-form-builder/before-end-form-row',
	/**
	 * @var \Jet_Form_Builder\Blocks\Types\Base $block
	 */
	function( $block ) {
		// you could use "echo" here
		// echo will add content inside the `div`
	},
	10,
	1
);
```

### Source
https://github.com/Crocoblock/jetformbuilder/blob/main/includes/blocks/types/base.php

## `jet-form-builder/after-end-form-row`
Executed after rendering the markup with the closing `div` tag for each field that opens on the [`jet-form-builder/before-start-form-row`](#jet-form-builderbefore-start-form-row) hook

### Parameters
* $block [`\Jet_Form_Builder\Blocks\Types\Base`](https://github.com/Crocoblock/jetformbuilder/blob/main/includes/blocks/types/base.php)

### Usage
```php
add_action(
	'jet-form-builder/after-end-form-row',
	/**
	 * @var \Jet_Form_Builder\Blocks\Types\Base $block
	 */
	function( $block ) {
		// you could use "echo" here
		// echo will add content outside the `div`
	},
	10,
	1
);
```

### Source
https://github.com/Crocoblock/jetformbuilder/blob/main/includes/blocks/types/base.php

## `jet-form-builder/media-field/before-upload`
Runs before the image upload process begins

### Parameters
* $parser [`\Jet_Form_Builder\Request\Fields\Media_Field_Parser`](https://github.com/Crocoblock/jetformbuilder/blob/main/includes/request/fields/media-field-parser.php)

### Usage
```php
add_action(
	'jet-form-builder/media-field/before-upload',
	/**
	 * @var \Jet_Form_Builder\Request\Fields\Media_Field_Parser $parser
	 */
	function ( $parser ) {
	}
);
```

### Source
https://github.com/Crocoblock/jetformbuilder/blob/main/includes/request/fields/media-field-parser.php

## `jet-form-builder/inserted-attachment`
Executed after adding an attachment, namely `wp_insert_attachment`

### Parameters
* $uploaded [`\Jet_Form_Builder\Classes\Resources\Uploaded_File`](https://github.com/Crocoblock/jetformbuilder/blob/main/includes/classes/resources/uploaded-file.php)
* $file_uploader [`\Jet_Form_Builder\Request\File_Uploader`](https://github.com/Crocoblock/jetformbuilder/blob/main/includes/request/file-uploader.php)

### Usage
```php
add_action(
	'jet-form-builder/inserted-attachment',
	/**
	 * @var \Jet_Form_Builder\Classes\Resources\Uploaded_File $uploaded
	 * @var \Jet_Form_Builder\Request\File_Uploader $file_uploader
	 */
	function( $uploaded, $file_uploader ) {
		// your code
		$attachment_ID = $uploaded->get_attachment_id();
	},
	10,
	2
);
```

### Source
https://github.com/Crocoblock/jetformbuilder/blob/main/includes/request/file-uploader.php
