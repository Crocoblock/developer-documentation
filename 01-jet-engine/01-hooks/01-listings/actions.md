# JetEngine. Listing-related actions

## jet-engine/listings/renderers/registered

Спрацьовіє після реєстрації всіх рендер-класів (класи які відповідають за кросс-редакторний рендер елементів ДжетЕнжин). На цей хук можна реєструвати власні рендер-класи. Також через цей хук можна переписати дефолтні рендер-класи і наприклад рендерити Dynamic Field у всіх білдерах через власний клас.

**Args:**
- `$listings_manager` - Екземпляр класу менедджера лістингів. Містить метод register_render_class для реєстрації власного рендеру.

**Location:**
/includes/listings/manager.php

**Access:**
Global

**Example:**

```php
add_action( 'jet-engine/listings/renderers/registered', function( $listing_manager ) {
	$listing_manager->register_render_class( 'dynamic-field', array(
		'class_name' => 'My_Jet_Engine_Dynamic_Field',
		'path'       => 'path-to-my-render-class.php',
	) );
} );
```

## jet-engine/templates/created

Спрацьовує після створення нового Listing Item. Може вкироситовуватись для додавання власних мета полів для лістинг айтему при створенні

**Args:**
- `$template_id` - ID щойно створеного лістинг айтему
- `$post_data` - масив з даними лістинг айтем. За структурую аналогчний масиву параметрів для створення-оновлення поста - https://developer.wordpress.org/reference/functions/wp_insert_post/#parameters

**Location:**
/includes/listings/admin-screen.php

**Access:**
Admin-only

**Example:**

```php
add_action( 'jet-engine/templates/created', function( $template_id = 0, $post_data = array() ) {

	$source = ! empty( $_REQUEST['listing_source'] ) ? esc_attr( $_REQUEST['listing_source'] ) : 'posts';

	if ( 'query-builder' === $source && ! empty( $_REQUEST['query_id'] ) ) {
		update_post_meta( $template_id, '_jet_engine_query_id', absint( $_REQUEST['query_id'] ) );
	}

}, 10, 2 );
```

## jet-engine/templates/created/{$view_type}

Екшн працює аналогіно попередньому. Єдинна відмінність - динамічна частина $view_type. Ізолює екшн для конкретного біладера під який створювався лістинг айтем. Цей хук краще використовувати у випадках коли вам треба вкионади певні дії тільки для певного білдера, а не глобально для лістинг айтема.

**Args:**
- `$template_id` - ID щойно створеного лістинг айтему
- `$post_data` - масив з даними лістинг айтем. За структурую аналогчний масиву параметрів для створення-оновлення поста - https://developer.wordpress.org/reference/functions/wp_insert_post/#parameters

**Location:**
/includes/listings/admin-screen.php

**Access:**
Admin-only

**Example:**

```php
add_action( 'jet-engine/templates/created/bricks', function( $template_id ) {
	update_post_meta( $template_id, '_bricks_editor_mode', 'bricks' );
} );
```

## jet-engine/ajax-handlers/referrer/request

Спрацьовує при Аякс запитах, пов'язаних з лістингом. Load more, lazy load і т.п. Хук спрацьовує після того як засетились глобальні змінні але до того як в глобальну змінну $\_REQUEST додались налаштування лістингу.

**Args:**
Немає

**Location:**
/includes/listings/ajax-handlers.php

**Access:**
JetEngine listing AJAX request

**Example:**

```php
/**
 * Register custom load more handler instead of default
 */
add_action( 'jet-engine/ajax-handlers/referrer/request', function() {
	if ( 'listing_load_more' === $_REQUEST['handler'] ) {
		remove_action( 'wp_ajax_jet_engine_ajax', array( jet_engine()->listings->ajax_handlers, 'handle_ajax' ) );
		add_action( 'wp_ajax_jet_engine_ajax', 'my_handle_listing_load_more' );
	}
} );
```

## jet-engine/ajax-handlers/before-do-ajax

Спрацьовує при Аякс запитах, пов'язаних з лістингом. Load more, lazy load і т.п. Хук спрацьовує після того як засетились глобальні змінні та після того як в глобальну змінну $\_REQUEST додались налаштування лістингу. Може використовуватись для додавання кастомних лістинг екшенів.

**Args:**
* `$ajax_handlers` - Jet_Engine_Listings_Ajax_Handlers - об'єкт манеджеру аякс ріквестів
* `$request` - array - зміст глоабльной змінної $\_REQUEST після додавання в неї налаштувань лістингу

**Location:**
/includes/listings/ajax-handlers.php

**Access:**
JetEngine listing AJAX request

**Example:**

```php
/**
 * Register custom load more handler instead of default
 */
add_action( 'jet-engine/ajax-handlers/before-do-ajax', function() {
	
	if ( ! empty( $_REQUEST['handler'] ) && 'reload_table_on_interval' === $_REQUEST['handler'] ) {

		$table_id = absint( $_REQUEST['table_id'] );
		$settings = [ 'table_id' => $table_id ];

		$render = jet_engine()->listings->get_render_instance( 'dynamic-table', $settings );

		ob_start();
		$render->setup_table( $table_id, array(), $render->get_settings() );
		$render->table_body();
		$content = ob_get_clean();

		wp_send_json_success( $content );

	}

} );
```

## jet-engine/ajax-handlers/before-call-handler

Спрацьовує при Аякс запитах, пов'язаних з лістингом. Load more, lazy load і т.п. Хук спрацьовує безпосередньо перед викликом якогось з дефолтних колбеків - listing_load_more або get_listing.

**Args:**
* `$ajax_handlers` - Jet_Engine_Listings_Ajax_Handlers - об'єкт манеджеру аякс ріквестів
* `$request` - array - зміст глоабльной змінної $\_REQUEST після додавання в неї налаштувань лістингу

**Location:**
/includes/listings/ajax-handlers.php

**Access:**
JetEngine listing AJAX request

**Example:**

```php
/**
 * Register custom load more handler instead of default
 */
add_action( 'jet-engine/ajax-handlers/before-call-handler', function() {
	
	if ( isset( $_REQUEST['isEditMode'] ) && filter_var( $_REQUEST['isEditMode'], FILTER_VALIDATE_BOOLEAN ) ) {
		return;
	}

	\Elementor\Plugin::instance()->frontend->register_styles();
	\Elementor\Plugin::instance()->frontend->register_scripts();

} );
```

## jet-engine/listings/ajax/load-more

Спрацьовує перед отриманням контенту для load more колбека. Дуже специфічний хук. Краще не вкиористовувати без крайньої необхідності.

**Args:**
немає

**Location:**
/includes/listings/ajax-handlers.php

**Access:**
JetEngine listing AJAX request

**Example:**

Краще не використовувати без крайньої необхідності і замінити якимось з хуків `jet-engine/ajax-handlers/before-call-handler`, `jet-engine/ajax-handlers/before-do-ajax`, `jet-engine/ajax-handlers/referrer/request`

## jet-engine/callbacks/register

Спрацьовує в момент реєстрації колбеків (додати лінку на статтю про колбеки). Призначений для реєстрації кастомних колбеків через оптимізований АПІ, без вкиористання додаткових хуків.

**Args:**
* `$callbacks_manager` - Jet_Engine_Listings_Callbacks - об'єкт манеджеру колбеків

**Location:**
/includes/listings/callbacks.php

**Access:**
Global

**Example:**

```php
/**
 * Register custom load more handler instead of default
 */
add_action( 'jet-engine/callbacks/register', function( $callbacks_manager ) {
	
	$callbacks_manager->register_callback(
		// Callback function name. Should be callable from global scope
		'jet_engine_get_user_data_by_id',
		// Callback label for callbacks options list
		__( 'Get user data by ID', 'jet-engine' ),
		// Optional callback arguments list for callbacks UI
		[
			'user_data_to_get' => [
				'label'     => __( 'User Data to get', 'jet-engine' ),
				'type'      => 'select',
				'default'   => 'display_name',
				'options'   => jet_engine()->listings->data->get_user_object_fields(),
			]
		]
	);

} );
```

## jet-engine/listings/data/set-current-object

Спрацьовує після того як лістинг сетить поточний `$current_object`. У випадку ДжетЕнжин загалом та лістингів зокрема, `$current_object` це аналог глобального об'єкту `$post` у ВП. Тільки у випадку `$post` це завжди об'єкт WP_Post, у випадку лістингу це буде поточний айтем лістингу. Поза лістингом зазвичай `$current_object` співпадає з глобальним об'єктом `$post`. Цей об'єкт достпний зовні через метод `jet_engine()->listings->data->get_current_object()`.

**Args:**
* `$current_object` - об'єкт який щойно було встановлено як `$current_object`
* `$data` - той самий об'ект що і jet_engine()->listings->data

**Location:**
/includes/listings/data.php

**Access:**
Global

**Example:**

```php
/**
 * Setup global $product var if instance of WC_Product currently set as $current_object
 */
add_action( 'jet-engine/listings/data/set-current-object', function( $object ) {
	global $product;

	if ( ! $product && is_a( $object, 'WC_Product' ) ) {
		$product = $object;
	}
} );
```

## jet-engine/listings/data/reset-current-object

Спрацьовує перед тем як `$current_object` буде ресетнуто. Докладніше про `$current_object` [тут](/01-jet-engine/01-hooks/01-listings/actions.md#jet-enginelistingsdataset-current-object)

**Args:**
* `$data` - той самий об'ект що і jet_engine()->listings->data

**Location:**
/includes/listings/data.php

**Access:**
Global

**Example:**

```php
/**
 * Restore global $product object for WC single product page 
 * if this product was changed by any listings inside this page
 */
add_action( 'jet-engine/listings/data/reset-current-object', function() {
	$object = jet_engine()->listings->objects_stack->get_restored_object();

	if ( $object && is_a( $object, 'WC_Product' ) ) {
		global $product;
		$product = $object;
	}
} );
```