# JetEngine. Listing-related filters

## jet-engine/listings/allowed-context-list

Дозволяє зареєструвати власний контекст (об'єкт який буде використано як поточний при отриманні данних). Цей фльтр тільки додає контекст до всіх списків доступних контекстів у всіх місцях де вони використовуються. Далі потрібно повернути об'єкт який відповідає даному контексту через фільтр <a href="/01-jet-engine/01-hooks/01-listings/filters.md#jet-enginelistingsdataobject-by-context">'jet-engine/listings/data/object-by-context/{$context}'</a>.

Докладніше в розділі <a href="/01-jet-engine/02-common-use-cases/01-context/">jet-engine/usage-cases/context</a>

**Args:**

* `$context_list` - Доступні контексти

**Location:** /includes/listings/manager.php

**Access:** Global

**Example:**

```php
add_filter( 'jet-engine/listings/allowed-context-list', function( $context_list ) {
	$context_list['current_wc_order'] = 'Current WC Order';
	return $context_list;
} );
```

## jet-engine/listings/dynamic-link/fields

Дозволяє додати власні опції для контролу Сорс віджету Dynamic Link, незалежно від білдера

**Args:**

* `$groups` - Доступні поля сгруповані по типам

**Location:** /includes/listings/manager.php

**Access:** Global

**Example:**

```php
add_filter( 'jet-engine/listings/dynamic-link/fields', function( $groups ) {

	// Iterate through all existing instances from JetEngine Content Types
	foreach ( \Jet_Engine\Modules\Custom_Content_Types\Module::instance()->manager->get_content_types() as $type => $instance ) {

		// Get all fields for each content type
		$fields = $instance->get_fields_list();
		$prefixed_fields = array(
			$type . '___ID' => __( 'Item ID', 'jet-engine' ),
		);

		foreach ( $fields as $key => $label ) {
			$prefixed_fields[ $type . '__' . $key ] = $label;
		}

		// Add these fields under this Content Type group into allowed links sources
		$groups[] = array(
			'label'   => __( 'Content Type:', 'jet-engine' ) . ' ' . $instance->get_arg( 'name' ),
			'options' => $prefixed_fields,
		);

	}

	return $groups;

} );
```

## jet-engine/listing/repeater-sources

Дозволяє додати підтримку власних сорсів для репітер полів (для dynamic Repeater віджету та лістингів з сорсом Репітер). Далі потрібно додати відповідну обробку (дописати в кейси повноцінний приклад)

**Args:**

* `$sources` - Доступні сорси

**Location:** /includes/listings/manager.php

**Access:** Global

**Example:**

```php
add_filter( 'jet-engine/listing/repeater-sources', function( $sources ) {

	$sources['meta-box'] = 'Meta Box';

	return $sources;

} );
```

## jet-engine/listing/grid/widget-hide-options

Дозволяє додати опції за яких поточний віджет Лістинг Гріда не буде рендеритись. До появи Dynamic Visibility використовувалось як спрощений аналог цієї функциональності. Зараз втратив акутальність

**Args:**

* `$options` - Доступні опції

**Location:** /includes/listings/manager.php

**Access:** Global

## jet-engine/listings/taxonomies-for-options

Дозволяє додати нові такосномії для віджету dynamic terms. За замовчанням там иводяться лише публічні таксономії, через цей хук можна додати приватні якщо потрібно.

**Args:**

* `$taxonomies` - array - Список таксономій у форматі slug => label

**Location:** /includes/listings/manager.php

**Access:** Global

**Example:**

```php
add_filter( 'jet-engine/listings/taxonomies-for-options', function( $taxonomies ) {

	$new_taxonomies = get_taxonomies( array( 'public' => false ), 'objects', 'and' );

	if ( ! empty( $new_taxonomies ) ) {
		$taxonomies = array_merge( $taxonomies, wp_list_pluck( $new_taxonomies, 'label', 'name' ) )
	}

	return $taxonomies;

} );
```

## jet-engine/templates/create/data

Дозволяє змінювати дані лістинг айтему до створення. За структурую аналогчний масиву параметрів для створення-оновлення поста - https://developer.wordpress.org/reference/functions/wp_insert_post/#parameters

**Args:**

* `$post_data` - array - Дані для створення лістинг айтему. Докладніше опис всіх можливих параметрів в офіційній документації для функції wp_insert_post - https://developer.wordpress.org/reference/functions/wp_insert_post/#parameters

**Location:**
/includes/listings/admin-screen.php

**Access:**
Admin-only

**Example:**

```php
add_filter( 'jet-engine/templates/create/data', function() {

	if ( ! isset( $_REQUEST['listing_source'] ) ) {
		return $post_data;
	}

	if ( 'custom_content_type' !== $_REQUEST['listing_source'] ) {
		return $post_data;
	}

	if ( empty( $post_data['meta_input']['_listing_data'] ) ) {
		return $post_data;
	}

	if ( empty( $_REQUEST['listing_content_type'] ) ) {
		return $post_data;
	}

	$cct = esc_attr( $_REQUEST['listing_content_type'] );

	$post_data['meta_input']['_listing_data']['post_type']                    = $cct;
	$post_data['meta_input']['_elementor_page_settings']['listing_post_type'] = $cct;
	$post_data['meta_input']['_elementor_page_settings']['cct_type']          = $cct;

	return $post_data;

} );
```

## jet-engine/templates/edit-url/{$view_type}

Дозволяє змінювати УРЛ сторінки редагування лістинг айтему в залежності від білдера яким побудовано поточний лістинг айтем. $view_type - динамічна частина фільтра яка як раз і передає назву відповідного білдера. Фільтр спрацьовує при автоматичному редіректі на щойно створений лістинг айтем.

**Args:**

* `$redirect` - string - УРЛ сторінки редагування лістинг айтема. Кожний колбек повинен завжди повертати цей УРЛ незалежно від задачі яку виконує сам колбек.
* `$template_id` - integer - ID лістинг айтему який буде редагуватися по УРЛ в $redirect

**Location:**
/includes/listings/admin-screen.php

**Access:**
Admin-only

**Example:**

```php
add_filter( 'jet-engine/templates/edit-url/bricks', function( $redirect = '', $template_id = 0 ) {
	return add_query_arg( [ 'bricks' => 'run' ], get_permalink( $template_id ) );
}, 10, 2 );
```

## jet-engine/templates/admin-columns/type/{$source}

Дозволяє виводити кастомну інформацію в стовбчику Source в таблиці зі списком лістинг айтемів в адмінці в залежності від сорса лістинга. $source - динамічна частина назви фільтру, потрібна щоб застосовувати ваш колбек тільки для сорсу який вам потрібен.

**Args:**

* `$result` - string - за замовчанням '--'. Конетнт який потрібно показати у стовбчику для відповіного сорсу.
* `$settings` - array - масив з налаштуваннями лістингу.
* `$template_id` - integer - ID лістинг айтему.

**Location:**
/includes/listings/admin-screen.php

**Access:**
Admin-only

**Example:**

```php
add_filter( 'jet-engine/templates/admin-columns/type/custom_content_type', function( $result, $settings ) {

	$type = isset( $settings['cct_type'] ) ? $settings['cct_type'] : $settings['listing_post_type'];

	if ( ! $type ) {
		return $result;
	}

	$type_instance = \Jet_Engine\Modules\Custom_Content_Types\Module::instance()->manager->get_content_types( $type );

	if ( ! $type_instance ) {
		return $result;
	}

	return $type_instance->get_arg( 'name' );

}, 10, 2 );
```

## jet-engine/ajax/get_listing/response

Дозволяє змінювати результат виконання AJAX колбеку get_listing до відправки результатів на фронт.

**Args:**

* `$response` - array - За замовчнням містить лише ключ 'html' в якому зберігається результат вкионання колбеку. Можна додавати свої ключі які буде передано на фронт у JSON форматі.
* `$widget_settings` - array - масив з налаштуваннями лістингу.
* `$query` - array - аргументи квері лістингу.

**Location:**
/includes/listings/ajax-handlers.php

**Access:**
JetEngine listing AJAX request

**Example:**

```php
add_filter( 'jet-engine/ajax/get_listing/response', funciton( $response, $widget_settings, $query ) {
	
	if ( empty( $widget_settings['lazy_load'] ) ) {
		return $response;
	}

	if ( empty( $widget_settings['_element_id'] ) ) {
		$query_id = 'default';
	} else {
		$query_id = $widget_settings['_element_id'];
	}

	$filters_data = array();

	$filters_settings = array(
		'queries'   => jet_smart_filters()->query->get_default_queries(),
		'settings'  => jet_smart_filters()->providers->get_provider_settings(),
		'props'     => jet_smart_filters()->query->get_query_props(),
	);

	foreach ( $filters_settings as $param => $data ) {
		if ( ! empty( $data['jet-engine'][ $query_id ] ) ) {
			$filters_data[ $param ][ $query_id ] = $data['jet-engine'][ $query_id ];
		}
	}

	if ( ! empty( $filters_data ) ) {
		$response['filters_data'] = $filters_data;
	}

	if ( jet_smart_filters()->indexer->data ) {
		$response['indexer_data'] = array(
			'provider' => 'jet-engine/' . $query_id,
			'query'    => wp_parse_args(
				$query,
				isset( $filters_data['queries'][$query_id] ) ? $filters_data['queries'][$query_id] : array()
			)
		);
	}

	return $response;

}, 10, 3 );
```

## jet-engine/listings/ajax/settings-by-id/{$listing_type}

Дозволяє змінювати налаштування лістингу в залужності від типу білдера в якому рендериться даний лістинг. $listing_type - динамічна частина яка передає назву білдера яким побудовано сторінку на який використовується даний лістинг, а відповідно і тип самого елементу лістинга. В самому ядрі Енжина використовується щоб знайти потрібний віджет за його $element_id (2й аргумент фільтра) на сторінці $post_id (3й аргумент)

**Args:**

* `$settings` - array - налаштування елемента лістингу відповідно до білдера.
* `$element_id` - string - ІД елемента. Мається на увазі саме внутрішній ІД у лозіці білдера яким побудовано дану сторінку і віповідно даний віджет.
* `$post_id` - integer - ІД сторінки на якій відображається лістинг і з якої був аякс запит на його рендер.

**Location:**
/includes/listings/ajax-handlers.php

**Access:**
JetEngine listing AJAX request

**Example:**

```php
add_filter( 'jet-engine/listings/ajax/settings-by-id/bricks', ( $settings = [], $element_id = null, $post_id = 0 ) {

	if ( ! $element_id || ! $post_id ) {
		return $settings;
	}

	$bricks_data = get_post_meta( $post_id, BRICKS_DB_PAGE_CONTENT, true );

	if ( empty( $bricks_data ) ) {
		return $settings;
	}

	foreach ( $bricks_data as $el_id => $element ) {
		if ( $element['id'] === $element_id ) {
			return $element['settings'];
		}
	}

	return $settings;
}, 10, 3 );
```

## jet-engine/listings/allowed-callbacks

Дозволяє змінювати та додавати нові колбеки до списку дозволених колбеків Енжина. На даний момент краще використовувати уніфікований АПІ для додавання нових колбеків через екшн [jet-engine/callbacks/register](/01-jet-engine/01-hooks/01-listings/actions.md#jet-enginecallbacksregister)

**Args:**

* `$callbacks` - array - список доступних колбеків.

**Location:**
/includes/listings/callbacks.php

**Access:**
Global

**Example:**

На даний момент краще використовувати уніфікований АПІ для додавання нових колбеків через екшн [jet-engine/callbacks/register](/01-jet-engine/01-hooks/01-listings/actions.md#jet-enginecallbacksregister)

## jet-engine/listings/allowed-callbacks-args

Дозволяє змінювати та додавати нові аргументи для існуючіх колбеків Енжина. За цим списком аргументи колбеків будуть реєструватись як контроли для відповідних інтерфейсів. На даний момент краще використовувати уніфікований АПІ для додавання нових колбеків через екшн [jet-engine/callbacks/register](/01-jet-engine/01-hooks/01-listings/actions.md#jet-enginecallbacksregister)

**Args:**

* `$callbacks_args` - array - список всіх доступних аргументів для всіх колбеків.

**Location:**
/includes/listings/callbacks.php

**Access:**
Global

**Example:**

На даний момент краще використовувати уніфікований АПІ для додавання нових колбеків через екшн [jet-engine/callbacks/register](/01-jet-engine/01-hooks/01-listings/actions.md#jet-enginecallbacksregister)

## jet-engine/listing/dynamic-field/callback-args

Дозволяє застосувати кастомні аргументи для поточного колбеку. На даний момент краще використовувати уніфікований АПІ для додавання нових колбеків через екшн [jet-engine/callbacks/register](/01-jet-engine/01-hooks/01-listings/actions.md#jet-enginecallbacksregister)

**Args:**

* `$args` - array - Список аргументів які передаються в колбек. 1й аргумент - завжди поточне значення до якого застосовується колбек. Далі аргменти треба додавати до масиву у тому порядку як на їх очікує колбек.

**Location:**
/includes/listings/callbacks.php

**Access:**
Global

**Example:**

На даний момент краще використовувати уніфікований АПІ для додавання нових колбеків через екшн [jet-engine/callbacks/register](/01-jet-engine/01-hooks/01-listings/actions.md#jet-enginecallbacksregister)

## jet-engine/data/listing-type

Дозволяє встановлювати власний тип рендеру лістингу (яким біледром рендеряться елементи поточного лістингу). В даному випадку мається на увазі що можна встановити власну назву типу рендеру лістинга в залежності від збереженої для даного лістингу, обробка встановленого типу здійснються через хук `jet-engine/listing/content/{$type}`

**Args:**

* `$listing_type` - string - Дефолтний тип, збережений у метаполі `_listing_type` поточного лістинга.

**Location:**
/includes/listings/data.php

**Access:**
Global

**Example:**

```php
/**
 * Reset Elementor listing type to Blocks to avoid errors if Elemntor not installed
 * Type changed 'on the fly' so initial meta value with listing type not affected
 */
if ( ! jet_engine()->has_elementor() ) {
	add_filter( 'jet-engine/data/listing-type', function( $listing_type ) {
			
		if ( 'elementor' === $listing_type ) {
			$listing_type = 'blocks';
		}
		
		return $listing_type;
	} );
}
```

## jet-engine/listing/data/object-fields-groups

Доступні групи даних які потрапляють у список полів Object field, там де ці поля зустрічаються (наприклад віджет Dynamic Field). Через цей хук треба додавати власні назви полів об‘єктів, які потім автоматично будуть отримуватися з поточного об‘єкту

**Args:**

* `$groups` - array - Дефолтний список полів.

**Location:**
/includes/listings/data.php

**Access:**
Global

**Example:**

```php
/**
 * Add WC product fields and methods to allowed object fields
 */
add_filter( 'jet-engine/data/listing-type', function( $groups ) {

	$groups[] = [
		'label'   => __( 'WooCommerce', 'jet-engine' ),
		'options' => [
			'get_id'                       => __( 'Product ID', 'jet-engine' ),
			'get_permalink'                => __( 'Product URL', 'jet-engine' ),
			'get_title'                    => __( 'Title', 'jet-engine' ),
			'get_slug'                     => __( 'Product Slug', 'jet-engine' ),
			'get_type'                     => __( 'Type', 'jet-engine' ),
			'get_status'                   => __( 'Product Status', 'jet-engine' ),
			'get_sku'                      => __( 'SKU', 'jet-engine' ),
			'get_description'              => __( 'Description', 'jet-engine' ),
			'get_short_description'        => __( 'Short Description', 'jet-engine' ),
			'get_price_html'               => __( 'Price HTML String', 'jet-engine' ),
			'get_price'                    => __( 'Plain Price', 'jet-engine' ),
			'get_regular_price'            => __( 'Plain Regular Price', 'jet-engine' ),
			'get_sale_price'               => __( 'Plain Sale Price', 'jet-engine' ),
			'get_stock_status'             => __( 'Stock Status', 'jet-engine' ),
			'get_stock_quantity'           => __( 'Stock Quantity', 'jet-engine' ),
			'wc_get_product_category_list' => __( 'Categories', 'jet-engine' ),
			'wc_get_product_tag_list'      => __( 'Tags', 'jet-engine' ),
			'get_average_rating'           => __( 'Average Rating', 'jet-engine' ),
			'get_review_count'             => __( 'Review Count', 'jet-engine' ),
			'get_total_sales'              => __( 'Total Sales', 'jet-engine' ),
			'get_date_on_sale_from'        => __( 'Date on Sale from', 'jet-engine' ),
			'get_date_on_sale_to'          => __( 'Date on Sale to', 'jet-engine' ),
			'get_height'                   => __( 'Height', 'jet-engine' ),
			'get_length'                   => __( 'Length', 'jet-engine' ),
			'get_weight'                   => __( 'Weight', 'jet-engine' ),
			'get_width'                    => __( 'Width', 'jet-engine' ),
			'get_max_purchase_quantity'    => __( 'Max Purchase Quantity', 'jet-engine' ),
			'get_tax_status'               => __( 'Tax Status', 'jet-engine' ),
			'add_to_cart_url'              => __( 'Add to Cart URL', 'jet-engine' ),
			'add_to_cart_text'             => __( 'Add to Cart Text', 'jet-engine' ),
		],
	];

	return $groups;

} );
```

## jet-engine/listing/data/post-fields

Дозволяє змінювати набір доступних полів о‘бєкту поста для використання в опціях. Цей фільтр тільки додає нові поля як опції, додавати їх безпосердньо в об‘єкт поста треба власноруч.

**Args:**

* `$fields` - array - Дефолтний список полів.

**Location:**
/includes/listings/data.php

**Access:**
Global

**Example:**

```php
/**
 * Add geo_query_distance as post field. 
 * This field can be presented in post object in some cases when Geo query is used
 */
add_filter( 'jet-engine/listing/data/post-fields', function( $fields ) {
	$fields['geo_query_distance'] = __( 'Distance (for Geo queries)', 'jet-engine' );
	return $fields;
} );
```

## jet-engine/listing/data/term-fields

Дозволяє змінювати набір доступних полів о‘бєкту терма таксономії для використання в опціях. Цей фільтр тільки додає нові поля як опції, додавати їх безпосердньо в об‘єкт терма треба власноруч.

**Args:**

* `$fields` - array - Дефолтний список полів.

**Location:**
/includes/listings/data.php

**Access:**
Global

**Example:**

```php
/**
 * Add some random field for demonstration purposes
 */
add_filter( 'jet-engine/listing/data/term-fields', function( $fields ) {
	$fields['my_term_field'] = __( 'My Term Field', 'jet-engine' );
	return $fields;
} );
```

## jet-engine/listing/data/user-fields

Дозволяє змінювати набір доступних полів о‘бєкту юзера для використання в опціях. Цей фільтр тільки додає нові поля як опції, додавати їх безпосердньо в об‘єкт юзера треба власноруч.

**Args:**

* `$fields` - array - Дефолтний список полів.

**Location:**
/includes/listings/data.php

**Access:**
Global

**Example:**

```php
/**
 * Add some random field for demonstration purposes
 */
add_filter( 'jet-engine/listing/data/term-fields', function( $fields ) {
	$fields['my_user_field'] = __( 'My User Field', 'jet-engine' );
	return $fields;
} );
```

## jet-engine/listing/data/custom-listing

Дозволяє змінювати парметри лістингу в момент виклику setup_default_listing(). Це відбувається коли плагін намагається отримати данні лістингу на стандартних архівних сторінках ВП. Фільтр використовується для сумісності з тем білдерами (JetThemeCore та elementorPro)

**Args:**

* `$listing` - array|false - Данні лістингу.
* `$data_manager` - Jet_Engine_Listings_Data.
* `$default_object` - object - Поточний дефолтний об'єкт.

**Location:**
/includes/listings/data.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/listing/data/custom-listing',  function( $listing, $data_manager, $default_object ) {

	if ( ! isset( $default_object->post_type ) ) {
		return $listing;
	}

	if ( 'elementor_library' !== $default_object->post_type ) {
		return $listing;
	}

	$elementor = Elementor\Plugin::instance();

	if ( ! $elementor->editor->is_edit_mode() ) {
		return $listing;
	}

	$document = $elementor->documents->get_doc_or_auto_save( $default_object->ID );

	if ( ! $document ) {
		return $listing;
	}

	$settings = $document->get_settings();

	if ( empty( $settings['preview_type'] ) ) {
		return $listing;
	}

	if ( false === strpos( $settings['preview_type'], 'single' ) ) {
		return $listing;
	}

	$preview = explode( '/', $settings['preview_type'] );

	if ( empty( $preview[1] ) ) {
		return $listing;
	}

	return array(
		'listing_source'    => 'posts',
		'listing_post_type' => $preview[1],
		'listing_tax'       => 'category',
	);

}, 10, 3 );
```

## jet-engine/listings/data/queried-user

Дозволяє задати власного queried юзера. Queried юзер, це юзер сторінку якого ми переглядаємо в даний момент. Наприклад на сторінці архів по автору queried юзер це автор, архів якого ми зараз переглядаємо. Якщо не можна визначити queried юзер, то повернеться поточний юзер. Може використовуватись зі сторонніми мембершіп плагінами для того щоб визначити публічну сторінку юзера

**Args:**

* `$queried_user` - WP_User|false - queried юзер.

**Location:**
/includes/listings/data.php

**Access:**
Global

**Example:**

```php
/**
 * Set current vendoer as current queried user for WCFM plugin
 *
 * @param [type] $queried_user [description]
 */
add_filter( 'jet-engine/listings/data/queried-user',  function( $queried_user ) {

	$wcfm_store_url = wcfm_get_option( 'wcfm_store_url', 'store' );
	$store_name = apply_filters( 'wcfmmp_store_query_var', get_query_var( $wcfm_store_url ) );

	if ( ! empty( $store_name ) ) {

		$store_user = get_user_by( 'slug', $store_name );

		if ( $store_user ) {
			$queried_user = $store_user;
		}
	}

	return $queried_user;

} );
```

## jet-engine/listings/data/current-author

Використовується в функції get_current_author_object(). Ця функція намагається отримати об'єкт з даними автора поточного контенту. Відповідно фільтр дозволяє змінити/задати автора контенту (поста, сторінки, архівної сторінки і т.п.)

**Args:**

* `$author` - WP_User|false - queried юзер.

**Location:**
/includes/listings/data.php

**Access:**
Global

## jet-engine/listing/current-object-title

Використовується в для кастомних об'єктів з даними і дозволяє задати те що буде назвою поточного об'єкту. Напримкла для поста - це тайтл поста, тоді як для кастомного об'єкту плагін не може чітко визначити що буде назвою

**Args:**

* `$title` - string - назва.
* `$object` - object - об'єкт.

**Location:**
/includes/listings/data.php

**Access:**
Global

**Example:**

```php
/**
 * Set current current booking object title
 *
 * @param [type] $queried_user [description]
 */
add_filter( 'jet-engine/listing/current-object-title', function( $title, $object ) {

	if ( ! $object || empty( $object->apartment_id ) ) {
		return $title;
	}

	return get_the_title( $object->apartment_id );

}, 10, 2 );
```

## jet-engine/listing/custom-post-id

Використвується у методі jet_engine()->listings->data->get_current_object_id() для отримання ID поточного об'єкта. У випадку зі стандартними об'єктами - пост, юзер, терм і т.п. - ми точно знаємо який проперті об'єкта зберігає його ІД. У випалку з кастомними - ні. Але метод get_current_object_id використовуються у багатьох місцях для точного визначення ІД об'єкта. І завдяки даному фільтру ми можемо визначати цей ІД для кастомних об'єктів.

Цей хук спрацьовує у випадках, коли jet_engine()->listings->data->get_current_object_id() зіткнувся з об'єктом, обробка якого не прописана в цьому методі напряму. Це будь-який об'єкт крім WP_Post, WP_User, WP_Term, WP_Comment, Jet_Engine_Queried_Repeater_Item

**Args:**

* `$post_id` - int|false - дефолтний ІД з функції get_the_ID().
* `$object` - object - об'єкт для якого ми отримуємо ІД.

**Location:**
/includes/listings/data.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/listing/custom-post-id', function( $id, $object ) {

	if ( $object && is_object( $object ) && is_a( $object, '\JET_ABAF\Resources\Booking' ) ) {
		$id = $object->get_id();
	}

	return $id;

}, 10, 2 );
```

## jet-engine/listing/current-object-id

Цей хук, як і попреденій використвується у методі jet_engine()->listings->data->get_current_object_id() для отримання ID поточного об'єкта. Єдина відмінність - цей хук спрацьовує при будь-якому зверенні до jet_engine()->listings->data->get_current_object_id() і за допомогою нього можна змінити фінальний результат який повертає цей метод, незалежно від об'єкта для якого ми отримуємо ІД.

**Args:**

* `$obj_id` - int|false - дефолтний ІД який вдалося отримати методу jet_engine()->listings->data->get_current_object_id().
* `$object` - object - об'єкт для якого ми отримуємо ІД.

**Location:**
/includes/listings/data.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/listing/current-object-id', function( $id, $object ) {

	if ( $object && is_object( $object ) && is_a( $object, '\JET_ABAF\Resources\Booking' ) ) {
		$id = $object->get_id();
	}

	return $id;

}, 10, 2 );
```

## jet-engine/listings/data/default-object

Дозволяє змінити поточний дефолтний об'єкт. Це акту цьогоально для нестандартних кейсів використання сторінок у ВП. Наприклад, у випадку профайл білдера - для ВП дефолтний поточний об'єкт це сторінка профайл білдера, але нам замість потрібен юзер, якого зараз виводить профайл білдер.

**Args:**

* `$object` - object - дефолтний об'єкт, який JetEngine зміг вирахувати автоматично.
* `$jet_engine_data` - object - екземпляр класу Jet_Engine_Listings_Data, він аналогчіний тому, що зберігається в jet_engine()->listings->data, тому замість 2го аргумнету можна використовувати jet_engine()->listings->data.

**Location:**
/includes/listings/data.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/listings/data/default-object', function( $default_object ) {

	$profile_builder = \Jet_Engine\Modules\Profile_Builder\Module::instance();

	if ( $profile_builder->query->is_account_page() ) {
		return wp_get_current_user();
	}

	if ( $profile_builder->query->is_single_user_page() ) {
		return $profile_builder->query->get_queried_user();
	}

	return $default_object;
} );
```

## jet-engine/listings/data/object-by-context/{$context}

Використовується для заміни поточного об'єкта на новий, отриманий загдно динамічній частині хука - `{$context}`. Ця функціональність корисна для спрощення роботи з разними об'єктами в середині одного лістинга чи поста. Без контектсу необхідно було б використовувати вкладений лістинг. У випадку з контекстом можна просто використовувати динамічні віджети зі зміненим контекстом.

Докладніше в розділі <a href="/01-jet-engine/02-common-use-cases/01-context/">jet-engine/usage-cases/context</a>

**Args:**

* `$context_list` - Доступні контексти

**Location:** /includes/listings/manager.php

**Access:** Global

**Example**
В розділі <a href="/01-jet-engine/02-common-use-cases/01-context/">jet-engine/usage-cases/context</a>

## jet-engine/listings/data/object-vars

## jet-engine/listings/data/prop-not-found

## jet-engine/listings/data/prevent-prop

## jet-engine/listings/data/object-date

## jet-engine/listing/data/get-user-meta

## jet-engine/listing/data/get-post-meta

## jet-engine/listing/data/get-term-meta

## jet-engine/listing/data/get-user-meta

## jet-engine/listing/data/get-comment-meta

## jet-engine/listings/data/get-meta/{$source}

## jet-engine/listings/data/repeater-value/{$repeater_source}

## jet-engine/listings/data/user-permalink

## jet-engine/listing/repeater-listing-sources

## jet-engine/listings/data/sources

## jet-engine/listing/grid/lazy-load/post-id

Цей фільтр дозволяє змінити ID темплейта, де використовується лейзі-лоад лістінг, для правильного отримання налаштувань віджета при аякс запиті.
Фільтр використовується для сумісності з темплейтами тім білдерів (JetThemeCore та ElementorPro)

**Args:**
* `$post_id` - int - ID темплейта, де використовується лейзі-лоад лістінг.

**Location:**
includes/components/listings/render/listing-grid.php

**Access:**
Global

**Example:**

```php
add_action( 'jet-theme-core/theme-builder/render/location/before',  function( $location, $template_id, $content_type ) {
    $this->current_template = array(
        'template_id'  => $template_id,
        'location'     => $location,
        'content_type' => $content_type,
    );
}, 10, 3 );

add_filter( 'jet-engine/listing/grid/lazy-load/post-id', function( $post_id ) {
    
    if ( empty( $this->current_template ) ) {
        return $post_id;
    }

    if ( empty( $this->current_template['content_type'] ) || 'default' !== $this->current_template['content_type'] ) {
        return $post_id;
    }

    if ( empty( $this->current_template['template_id'] ) ) {
        return $post_id;
    }

    return $this->current_template['template_id'];
} );
```

## jet-engine/listings/frontend/custom-listing-url

Цей фільтр дозволяє повернути кастомний УРЛ для лістинг айтему. Використувується в кобінації з додаванням нового сорсу для УРЛів лістигнг айтемів. Доклданіше про цей кейс <a href="/01-jet-engine/02-common-use-cases/05-register-custom-link-source-for-the-listing">тут</a>

**Args:**
* `$url` - string - По замовчанню порожня строка. Якщо замість неє повернути своє значення - воно буде використане як УРЛ поточного лістинг айтема.
* `$settings` - array - масив з налаштуваннями лістинг айтема. В цьому масиві під ключем `listing_link_source`  зберігається назва поточного сорсу для УРЛ

**Location:**
includes/components/listings/frontend.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/listings/frontend/custom-listing-url', function( $url, $settings = [] ) {
	
	// Make sure we processing 'author_archive_link' source.
	// In your case you need to replace 'author_archive_link' with your actual source name
	if ( ! empty( $settings['listing_link_source'] ) && 'author_archive_link' === $settings['listing_link_source'] ) {
		$current_object = jet_engine()->listings->data->get_current_object();

		// Optional. Make sure we working with Users listing.
		// This check is required for this exact case, for your custom source such check will be different
		if ( $current_object && 'WP_User' === get_class( $current_object ) ) {
			$url = get_author_posts_url( $current_object->ID );
		}
		
	}
	
	return $url;

}, 10, 2 );
```