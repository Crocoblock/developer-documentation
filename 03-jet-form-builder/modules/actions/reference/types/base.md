# Class: Jet_Form_Builder\Actions\Types\Base

This abstract class serves as the base for all action types within the Jet Form Builder plugin. It handles common properties and methods required by all inheriting action classes.

## Usage
Використовується для реалізації встаного типу екшена.
Детальніше про це [тут](/03-jet-form-builder/common-use-cases/add-action/README.md).

## Methods
| Name                                                   | Description                                                                                                                                                                                                                                                                    |
|:-------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| \Jet_Form_Builder\Actions\Types\Base::get_id           | Повертає унікальний слаг. Служить для визначення типу екшена як при виконанні сабміту форми, так і при редагуванні форми в едіторі.                                                                                                                                            |
| \Jet_Form_Builder\Actions\Types\Base::get_name         | Повертає унікальний слаг. Служить для визначення типу екшена як при виконанні сабміту форми, так і при редагуванні форми в едіторі.                                                                                                                                            |
| \Jet_Form_Builder\Actions\Types\Base::do_action        | Виконується лише під час сабміту форми                                                                                                                                                                                                                                         |
| \Jet_Form_Builder\Actions\Types\Base::action_data      | Тут можна повернути асоціативний массив з данними, які потрібні для роботи інтерфейсу на стороні едітора.                                                                                                                                                                      |
| \Jet_Form_Builder\Actions\Types\Base::self_script_name | Повертає назву глобальної змінної, що буде доступна на сторінці редагуванні форми (`window.[var_name]`).За замовчуванням абстрактний клас вже має реалізацію цього методу і від повертає `JetFormAction_{action_slug}`. Де action_slug - це результат виконання методу `get_id`. |

## Example of extending
```php
<?php

namespace MyCustomNamespace\Action;

// used in the `do_action` method
use Jet_Form_Builder\Actions\Action_Handler;

class MyAction extends \Jet_Form_Builder\Actions\Types\Base {

    /**
     * This should be a unique string, 
     * which shortly describes what the action does
     * 
     * @return string  
     */
    public function get_id() {  
        return 'my_action';  
    }
    
    /**
     * This string will display on the editor's side
     * 
     * @return string  
     */
    public function get_name() {  
        return __( 'My Action', 'jet-forms-addon-simple-boilerplate' );  
    }
	
    /**
     * Here you have $request, which have all incoming user-data.
     * But you can use `jet_fb_context()` function as well
     * 
     * @param array $request  
     * @param Action_Handler $handler  
     *  
     * @return void  
     */
    public function do_action( array $request, Action_Handler $handler ) {  
        // ...  
    }
}
```

