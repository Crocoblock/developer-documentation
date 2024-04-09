# JetEngine. Register new macros

Макрос - це строка яка згудно свого формату конвертиться в якісь динамічні дані. Макроси викорстовуються в багатьох місцях - як динамиічні дані в деяких полях Елементора, як варіант данмічних тегів для Блочного Редактора, як динамічні параметри квері, тощо. Вкористувуючи метод `jet_engine()->listings->macros->do_macros( $string )` можна додати обробку макросів JetEngine в будь-якому місці. Макроси JetEngine працюють на основі reusable модуля `\Crocoblock\Macros_Handler`. За допомогую цього модуля можна додати вланий механізм роботи за макросами будь де. Докладніше про це можна почитати у відповідному [розділі](/01-jet-engine/03-components/01-macros-handler)

## Реєстрація власного макроса

У випадку макросів JetEngine ми можемо зареєструвати новий макрос з вланими аргументами для будь-якого ЮІ де використовуються макроси через єдиний АПІ. Ось приклад такої реєстрації

```php
add_action( 'jet-engine/register-macros', function() {
	// Include file with macros class. In current example class itself added below
	require_once 'path/to/my-macros.php' );
	new My_Macros();
} );

/**
 * It's only example of Macros class.
 * Real-world classes should be included only on jet-engine/register-macros hook,
 * because earlier Jet_Engine_Base_Macros class is not accessible and your code will throw a fatal error
 */
class My_Macros extends \Jet_Engine_Base_Macros {
	/**
	 * Required method. Defines macros slug. This name is used in string to parse
	 */
	public function macros_tag() {
		return 'my_macros';
	}

	/**
	 * Required method. Defines macros name. Name will be visible in any UI of macros insertion
	 */
	public function macros_name() {
		return 'My Macros';
	}

	/**
	 * Optional method. Used to define macros arguments if needed.
	 * 
	 * @return array
	 */
	public function macros_args() {
		return [
			'my_arg_1' => [
				'label'   => __( 'Field', 'jet-engine' ),
				'type'    => 'select', // Supported types: text, select, textarea, number, switcher
				'options' => function() {
					$meta_fields = jet_engine()->meta_boxes->get_fields_for_select( 'plain' );
					unset( $meta_fields[''] );
					return array_values( $meta_fields );
				], // could be plain array of value => label format or callback which returns the same formatted aray only when needed. For heavy options list callback method is better to use.
			),
			'my_arg_2' => [
				'label'   => __( 'Return', 'jet-engine' ),
				'type'    => 'select',
				'options' => [
					'field_name'  => __( 'Field name/key/ID', 'jet-engine' ),
					'field_value' => __( 'Field value', 'jet-engine' ),
				],
			],
		);

	/**
	 * Required method. It's main function which returns macros value by arguments
	 */
	public function macros_callback( $args = array() ) {

		$arg_1 = ! empty( $args['my_arg_1'] ) ? $args['my_arg_1'] : '';
		$arg_2 = ! empty( $args['my_arg_2'] ) ? $args['my_arg_2'] : '';
		$result = $arg_1 . ' ' . $arg_2;

		return $result;
	}
}
```

Important notes:
- You need to prefix arg names to avoid the overlaps with other 3rd party or core macros args
- Make sure you moved all heavy options lists for arguments into callbacks
