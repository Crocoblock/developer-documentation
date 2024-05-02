# JetFormBuilder - Deleting files after executing actions

This can be useful for cases where files are sent as attachments in an email and there is no need to keep them on the server.

## Steps
To achieve this, follow these steps:

1. Add the `remove-after-execute` class to your Media Field.

   ![image](/03-jet-form-builder/common-use-cases/delete-uploaded-files-after-actions/assets/add-class.png)

2. Add [this code](#PHP-Code) to the `functions.php` of your child theme.

## PHP Code
```php
add_action(
	'jet-form-builder/after-trigger-event',
	function ( $event ) {
		if ( ! is_a( $event, \Jet_Form_Builder\Actions\Events\Default_Process\Default_Process_Event::class ) ) {
			return;
		}

		/** @var \JFB_Modules\Block_Parsers\Field_Data_Parser $parser */
		foreach ( jet_fb_context()->iterate_parsers_list() as $parser ) {
			$class_name = \Jet_Form_Builder\Classes\Tools::to_string(
				$parser->get_setting( 'class_name' )
			);

			if ( 'media-field' !== $parser->get_type() ||
				false === strpos( $class_name, 'remove-after-execute' )
			) {
				continue;
			}

			/** @var \Jet_Form_Builder\Classes\Resources\Uploaded_File_Path $file */
			$file = $parser->get_file();

			if ( ! $file ) {
				continue;
			}

			$file_paths = explode( ',', $file->get_attachment_file() );

			foreach ( $file_paths as $path ) {
				wp_delete_file( $path );
			}
		}
	}
);
```