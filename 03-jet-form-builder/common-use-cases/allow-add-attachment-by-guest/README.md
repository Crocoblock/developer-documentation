# JetFormBuilder - Allowing adding attachments by guests

The Media Field cannot be configured to allow guests to upload their files, each of which will be saved as an attachment.

> A bit about what an attachment is [here](https://developer.wordpress.org/themes/template-files-section/attachment-template-files/#:~:text=Attachments%20are%20a%20special%20post,post%20type%20%E2%80%93%20attachment%20template%20files.)

## How to Overcome This Limitation

To overcome this limitation, follow these steps:

1. Add the class `allow-insert-attachments` to your Media Field.

   ![Image](/03-jet-form-builder/common-use-cases/allow-add-attachment-by-guest/assets/add-class.png)

2. Add [this code](#PHP-Code) to the `functions.php` file of your child theme.
3. In the callback function, on the last line, change the second parameter if necessary
(`id`, `url` або `both`)
   
## PHP Code
```php
add_action(
	'jet-form-builder/media-field/before-upload',
	/**
	 * @var \JFB_Modules\Block_Parsers\Fields\Media_Field_Parser $parser
	 */
	function ( $parser ) {
		$class_name = \Jet_Form_Builder\Classes\Tools::to_string(
			$parser->get_setting( 'class_name' )
		);

		// We need to add 'allow-insert-attachments' to the Advanced -> CSS Class Name option
		if ( ! $class_name || false === strpos( $class_name, 'allow-insert-attachments' ) ) {
			return;
		}

		$parser->get_context()->allow_for_guest();
		$parser->set_setting( 'insert_attachment', true );

		// for second param you can use 'id', 'url' or 'both'
		$parser->set_setting( 'value_format', 'id' );
	}
);
```