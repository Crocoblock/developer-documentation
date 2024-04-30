# JetFormBuilder - Реєстрація кастомного "сорсу" для Hidden Field.

Наведений код нижче дозволяє зареєструвати власний ресурс для отримання значення у формі.

Перенесіть [цей код](#php-code) у `functions.php` вашої дочірньої теми або у власний плагін.

У результаті в редакторі форми при виділенні Hidden Field вам буде доступний новая опція Field Value: 

![image](/03-jet-form-builder/common-use-cases/register-hidden-field-source/assets/hidden-field.png)

### PHP Code
```php
const JFB_CUSTOM_HIDDEN_SOURCE = '_generated_password';

add_filter(
	'jet-form-builder/editor/hidden-field/config',
	function ( array $config ) {
		$config['sources'][] = array(
			'value' => JFB_CUSTOM_HIDDEN_SOURCE,
			'label' => __( 'Generated Password', 'jet-form-builder' ),
		);

		return $config;
	}
);

add_filter(
	'jet-form-builder/fields/hidden-field/value-cb',
	function ( $callback, $field_value ) {
		if ( JFB_CUSTOM_HIDDEN_SOURCE !== $field_value ) {
			return $callback;
		}

		// return callback, which returns the random string
		return function () {
			return \Jet_Form_Builder\Classes\Security\Csrf_Tools::generate();
		};
	},
	10,
	2
);
```