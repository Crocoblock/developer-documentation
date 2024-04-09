# JetEngine. Profile Builder. Filters.

## jet-engine/profile-builder/settings/template-sources

Дозволяє реєструвати нові СПТ для використання в якості темплейтів для Профайл сторінок

**Args:**
- `$sources` - Список сорсів у форматі cpt-slug => CPT Label. CPT Label буде використано щоб додатково помітити Пости з цього СПТ в результатах пошуку. cpt-slug буде безпосередньо використовуватись для пошуку.

**Location:**
/includes/modules/profile-builder/inc/settings.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/profile-builder/settings/template-sources', function( $sources ) {
	$sources['elementor_library'] = __( 'Elementor Template', 'jet-engine' );
	return $sources;
} );
```

## jet-engine/profile-builder/create-template/{$template_source}

Дозволяє додати обробку створення темплейтів для профайл білдера для кастомних сорсів, зареєстрованих через `jet-engine/profile-builder/settings/template-sources` фільтр. Динамічна частина - `{$template_source}` має співпадати зі слагом вашого сорса і використовується щоб розділити обробку різних сорсів. Колбек обов'язково має повертати результату у такому форматі: 
```php
return [
	'template_url' => $url, // URL of edit page for created template.
	'template_id'  => $template_id, // Created template ID.
];
```

**Args:**
- `$result` - Змінна в яку треба зберегти результат та повернути.
- `$template_name` - Назва нового темпелйта, яку вказав юзер в інтерфейсі
- `$template_view` - Додатковий параметр з listing view, який обрав юзер, має сенс тільки для сорсу Listing.

**Location:**
/includes/modules/profile-builder/inc/settings.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/profile-builder/create-template/elementor_library', function( $result = [], $template_name = '' ) {
	
	if ( ! $template_name ) {
		return $result;
	}

	$template_id = wp_insert_post( [
		'post_title' => $template_name,
		'post_type'   => 'elementor_library',
		'post_status' => 'publish',
	] );

	if ( ! $template_id ) {
		return $result;
	}

	update_post_meta(
		$template_id,
		'_elementor_source',
		'post'
	);

	$document = \Elementor\Plugin::instance()->documents->get( $template_id );

	$template_url = ( $document ) ? $document->get_edit_url() : add_query_arg( [ 
		'post'   => $template_id,
		'action' => 'elementor' 
	], admin_url( 'post.php' ) );

	return [
		'template_url' => $template_url,
		'template_id'  => $template_id,
	];
}, 10, 2 );
```

## jet-engine/profile-builder/subpage-url

Дозволяє змінити або додати якісь паарметри до УРЛ під-сторінок профайл білдера.

**Args:**
- `$url` - default URL
- `$slug` - subpage slug
- `$page` - page type - account or user
- `$page_data` - additional arguments of current subpage
- `$settings_instance` - instance of Settings class

**Location:**
/includes/modules/profile-builder/inc/settings.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/profile-builder/subpage-url', function( $url, $slug, $parent_page, $page_data, $settings ) {
	
	if ( 'my-slug' === $slug ) {
		$url = add_query_arg( [ 'my_param' => 1 ], $url );
	}

	return $url;
}, 10, 5 );
```

More advanced example - https://gist.github.com/Crocoblock/7669eb507cb3742836bbec67fc908eef#file-custom-profile-builder-rewrite-php-L37-L52

## jet-engine/profile-builder/rewrite-rules

Дозволяє додати свої варіанти правил для обробки УРЛ. Дозволяю видозмінювати структуру УРЛів Профайл Білдера. Якщо вам треба повністю змінити формат цих УРЛів, даний фільтр потрібно викоритстовувати у парі з `jet-engine/profile-builder/subpage-url`, щоб змінити не тільки оброку УРЛів, а і їх генерацію (більш детальний приклад за посиланям нижче)

**Args:**
- `$rewrite_rules` - дефолтний список rewrite rules для профайл біллдера
- `$rewrite_instance` - екземпляр класу Rewrite

**Location:**
/includes/modules/profile-builder/inc/rewrite.php

**Access:**
Global

**Example:**

https://gist.github.com/Crocoblock/7669eb507cb3742836bbec67fc908eef#file-custom-profile-builder-rewrite-php-L8-L34

## jet-engine/profile-builder/render/profile-menu-items

Фільтр дозволяє змінювати/додавати/прибирати пункти з меню профайл білдера, яке генерується для відображення на фронт-енді. Наприклад сам профайл білдер використовує цей фільтр для розділення структури меня за ролями юзерів, якщо це налаштвоано.

**Args:**
- `$items` - array - Пункти меню профайл білдера для використання на фронт-енді
- `$args` - array - Додаткові аргументи, отримані з віджета, який має рендерити дане меню на фронт-енді.

**Location:**
/includes/modules/profile-builder/inc/menu.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/profile-builder/render/profile-menu-items', function( $items, $args ) {

	if ( empty( $args['menu_context'] ) || 'account_page' === $args['menu_context'] ) {
		foreach ( $items as $index => $item ) {
			if ( 
				! empty( $item['slug'] )
				&& 'admin-settings' === $item['slug']
				&& ! current_user_can( 'manage_options' )
			) {
				unset( $items[ $index ] );
			}
		}
	}

	return $items;
} );
```

## jet-engine/profile-builder/render/profile-menu-item

Фільтр дозволяє змінити ХТМЛ згенерованого пункта меню.

**Args:**
- `$item_html` - string - ХТМЛ розмтіка поточного пункта меню, яку сформував сам Профайл Білдер
- `$item` - array - Пункти меню профайл білдера для використання на фронт-енді
- `$args` - array - Додаткові аргументи, отримані з віджета, який має рендерити дане меню на фронт-енді.

**Location:**
/includes/modules/profile-builder/inc/menu.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/profile-builder/render/profile-menu-item', function( $item_html = '', $item = [], $args = [] ) {
	if ( 'admin-settings' === $item['slug'] ) {
		$item_html = str_replace( '</a>', '<i class="my-admin-settings-icon"></i></a>', $item_html );
	}
	return $item_html;
}, 10, 3 );
```

## jet-engine/profile-builder/query/pre-get-queried-user

Фільтр дозволяє

**Args:**
- `$user` - null - За замовчанням значення порожнє, якщо замість нього повернути свій об'єкт юзера, його буде використано замість дефолтного.

**Location:**
/includes/modules/profile-builder/inc/query.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/profile-builder/query/pre-get-queried-user', function( $user ) {

	if ( current_user_can( 'manage_options' ) && ! empty( $_GET['replace_user'] ) ) {
		$user = get_user_by( 'ID', absint( $_GET['replace_user'] ) );
	}

	return $user;
} );
```

## jet-engine/profile-builder/template-id

Фільтр дозволяє змінити ІД темплейта профайл білдера безпосередньо перед його рендером. Може використовуватись наприклад для перекладів, щоб замінити дефолтний ІД перекладеним.

**Args:**
- `$template_id` - int - ІД темплейта отримане з профайл білдера.

**Location:**
/includes/modules/profile-builder/inc/frontend.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/profile-builder/template-id', function( $template_id ) {
	
	global $sitepress;

	$obj_type = get_post_type( $template_id );
	$new_id = $sitepress->get_object_id( $template_id, $obj_type );

	if ( $new_id ) {
		return $new_id;
	}

	return $template_id;
} );
```

## jet-engine/profile-builder/template/content

Дозволяє рендерити контент 

**Args:**
- `$content` - string - Дефолтний контент.
- `$template_id` - int - ІД темплейта отримане з профайл білдера.
- `$frontend_instance` - object - екземпляр класу Frontend.
- `$template` - WP_Post - повний об'єкт поточного темплейту.

**Location:**
/includes/modules/profile-builder/inc/frontend.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/profile-builder/template/content', function( $content, $template_id, $frontend, $template ) {

	if ( ! 'elementor_library' === $template->post_type ) {
		return $content;
	}
	
	$elementor_content = \Elementor\Plugin::instance()->frontend->get_builder_content( $template_id );

	if ( $elementor_content ) {
		return $elementor_content;
	}

	return $content;
}, 10, 4 );
```

## jet-engine/profile-builder/not-logged-redirect-query-args

Фільтр дозволяє додати аргументи для УРЛ на який буде здійснено редірект назалогінених юзерів.

**Args:**
- `$query_args` - array - список аргументів які будуть додані до УРЛ.

**Location:**
/includes/modules/profile-builder/inc/access.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/profile-builder/not-logged-redirect-query-args', function( $args ) {
	$args['error'] = 'not_logged_in';
	retrun $args;
} );
```

## jet-engine/profile-builder/check-user-access

Фільтр дозволяє додати додаткові перевірки - чи має юзер доступ до даної сторінки профайл білдера.

**Args:**
- `$has_access` - bool - список контекстів для профайл сторінок.
- `$profile_builder` - object - об'єкт з єкземпляром профайл білдер модуля.

**Location:**
/includes/modules/profile-builder/inc/access.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/profile-builder/check-user-access', function( $result ) {
	
	if ( current_user_can( 'manage_options' ) ) {
		$result = true;
	}

	retrun $result;
} );
```

## jet-engine/profile-builder/not-accessible-redireсt-query-args

Фільтр дозволяє додати аргументи до УРЛ на який буде перенаправлено юзера у випадку, якщо він не має доступа до поточної сторінки профайла

**Args:**
- `$query_args` - array - список аргументів які будуть додані до УРЛ.

**Location:**
/includes/modules/profile-builder/inc/access.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/profile-builder/not-accessible-redireсt-query-args', function( $args ) {
	$args['error'] = 'access_denied';
	retrun $args;
} );
```