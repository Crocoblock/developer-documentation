# JetFormBuilder - Реєстрація кастомних рендер-стейтів

В наведеному прикладі буде реєстрація двух стейтів - для авторизованого користувача та гостя.

## Steps
Для цього потрібно виконати наступні кроки:
1. До `functions.php` вашої дочірньої теми додаємо [цей код](#PHP-Code).
2. Застосовуємо ці стейти в Conditional Block
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