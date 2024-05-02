# Class: Jet_Form_Builder\Actions\Types\Base

This abstract class serves as the base for all action types within the Jet Form Builder plugin. It handles common properties and methods required by all inheriting action classes.

## Usage
Used for implementing the particular action type. More details [here](/03-jet-form-builder/common-use-cases/add-action/README.md).

## Methods
| Name                                                   | Description                                                                                                                                                                                                                                                                    |
|:-------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| \Jet_Form_Builder\Actions\Types\Base::get_id           | Returns a unique slug. Used to determine the type of action both when submitting a form and when editing a form in the editor.                                                                                                                                            |
| \Jet_Form_Builder\Actions\Types\Base::get_name         | Пeturns a unique slug. Used to determine the type of action both when submitting a form and when editing a form in the editor                                                                                                                                            |
| \Jet_Form_Builder\Actions\Types\Base::do_action        |  Executed only during form submission.                                                                                                                                                                                                                                         |
| \Jet_Form_Builder\Actions\Types\Base::action_data      | Here you can return an associative array with data needed for the interface to work on the editor side.                                                                                                                                                                      |
| \Jet_Form_Builder\Actions\Types\Base::self_script_name |  Returns the name of the global variable that will be available on the form editing page `(window.[var_name])`. By default, the abstract class already has an implementation of this method and returns `JetFormAction_{action_slug}`, where action_slug is the result of executing the `get_id` method. |

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

