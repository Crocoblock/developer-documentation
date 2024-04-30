# JetFormBuilder - Надання дозволу для гостей на додавання аттачментів

Річ в тому, що Media Field неможливо налаштувати так, щоб гість міг завантажити свої файли, кожен з яких збережеться як аттачмент.

> Трохи про те, [що таке аттачмент](https://developer.wordpress.org/themes/template-files-section/attachment-template-files/#:~:text=Attachments%20are%20a%20special%20post,post%20type%20%E2%80%93%20attachment%20template%20files.)

## Як подолати це обмеження?
Для цього потрібно виконати наступні кроки:
1. До вашого Media Field додаємо клас `allow-insert-attachments`

   ![Image](/03-jet-form-builder/common-use-cases/allow-add-attachment-by-guest/assets/add-class.png)

2. До `functions.php` вашої дочірньої теми додаємо [цей код](#PHP-Code).
3. На останньому рядку функції-колбеку вам слід змінити другий параметр за необхідності. 
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