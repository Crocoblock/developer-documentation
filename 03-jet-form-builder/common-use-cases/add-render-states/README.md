# JetFormBuilder - Registering custom render states 

In the example below, you can see a registration of two states: for authorized user and for a guest. 

## Steps

Follow these steps:
1. Add [this code](#PHP-Code) to the `functions.php` of your child theme.  
2. Apply these states in the Conditional Block
   ![image](/03-jet-form-builder/common-use-cases/add-render-states/assets/logged-in-render-state.png)
   ![image](/03-jet-form-builder/common-use-cases/add-render-states/assets/guest-render-state.png)

## PHP Code

```php
<?php

add_filter( 'jet-form-builder/render-states', 'custom_jfb_add_states' );

function custom_jfb_add_states( array $states ): array {

	class Logged_In_Render_State extends \Jet_Form_Builder\Blocks\Conditional_Block\Render_States\Base_Render_State {

		public function get_title(): string {
			return 'On user logged in';
		}

		public function is_supported(): bool {
			return is_user_logged_in();
		}

		public function get_id(): string {
			return 'LOGGED.IN';
		}
	}

	class Guest_Render_State extends \Jet_Form_Builder\Blocks\Conditional_Block\Render_States\Base_Render_State {

		public function get_title(): string {
			return 'On user not logged in';
		}

		public function is_supported(): bool {
			return !is_user_logged_in();
		}

		public function get_id(): string {
			return 'GUEST';
		}
	}

	array_push(
		$states,
		new Logged_In_Render_State(),
		new Guest_Render_State()
	);

	return $states;
}
```