# JetEngine. Data Stores. Filters.

#jet-engine/blocks-views/data-store-button/attributes

Дозволяє реєструвати додаткові атрибути для `Data Store Button` блока

**Args:**
- `$attributes` - array - Масив атрибутів блока

**Location:**
[includes/modules/data-stores/inc/block-types/button.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/modules/data-stores/inc/block-types/button.php)

**Access:**
Admin-only

**Example:**
```php
add_filter( 'jet-engine/blocks-views/data-store-button/attributes', function( $attributes ) { 
    
    $attributes['custom_attr'] = [
        'type'    => 'string',
        'default' => '',
    ];

    return $attributes;
 } );
```

#jet-engine/data-stores/store-post-id

Дозволяє фільтрувати ID поточного об'єкта, який буде доданий в дата стор.

**Args:**
- `$post_id` - int - ID поточного об'єкта.
- `$store_instance` - Jet_Engine\Modules\Data_Stores\Stores\Factory - Інстанс дата стора

**Location:** <br>
[includes/modules/data-stores/inc/block-types/button.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/modules/data-stores/inc/block-types/button.php) <br>
[includes/modules/data-stores/inc/render-links.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/modules/data-stores/inc/render-links.php)

**Access:**
Global

**Example:**
```php
add_filter( 'jet-engine/data-stores/store-post-id', function( $post_id, $store_instance ) { 
    
    $listing_object = jet_engine()->listings->data->get_current_object();

    if ( $listing_object && is_a( $listing_object, 'WC_Product' ) ) {
        $post_id = $listing_object->get_id();
    }

    return $post_id;
 }, 10, 2 );
```

## jet-engine/data-stores/store/data

Дозволяє фільтрувати поточне значення стора, при отриманні його через метод `$store_instance->get_store()`.
Наприклад, для сумісності з плагінами перекладу.

**Args:**
- `$store` - array - Значення стора
- `$store_id` - string - Слаг стора

**Location:** <br>
[includes/modules/data-stores/inc/stores/cookies.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/modules/data-stores/inc/stores/cookies.php) <br>
[includes/modules/data-stores/inc/stores/session.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/modules/data-stores/inc/stores/session.php) <br>
[includes/modules/data-stores/inc/stores/user-ip.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/modules/data-stores/inc/stores/user-ip.php) <br>
[includes/modules/data-stores/inc/stores/user-meta.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/modules/data-stores/inc/stores/user-meta.php)

**Access:**
Global

**Example:**
```php
add_filter( 'jet-engine/data-stores/store/data', function( $store, $store_id ) {
    
    if ( empty( $store ) ) {
        return $store;
    }

    $store_instance = Jet_Engine\Modules\Data_Stores\Module::instance()->stores->get_store( $store_id );

    if ( $store_instance->is_user_store() || $store_instance->get_arg( 'is_cct' ) ) {
        return $store;
    }

    $store = array_map( function( $item ) {
        if ( ! is_array( $item ) ) {
            $item = apply_filters( 'wpml_object_id', $item, get_post_type( $item ), true );
        }

        return $item;
    }, $store );

    return $store;
}, 10, 2 );
```

#jet-engine/data-stores/pre-get-post-count

По дефолту значення лічильника дата стора зберігається в пост меті, цей фільтр дає можливість отримати значення 
лічильника з іншого кастомного місця, якщо попередньо була додана логіка для зберігання цього значення через екшени
`jet-engine/data-stores/post-count-increased` та `jet-engine/data-stores/post-count-decreased`

**Args:**
- `$count` - false|int - Значення лічильника. По дефолту: false.
- `$item_id` - int - ID об'єкта
- `$store` - Jet_Engine\Modules\Data_Stores\Stores\Factory - Інстанс дата стора

**Location:**
[includes/modules/data-stores/inc/stores/factory.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/modules/data-stores/inc/stores/factory.php)

**Access:**
Global

**Example:**
```php
add_filter( 'jet-engine/data-stores/pre-get-post-count', function( $count, $item_id, $store ) {
    
    if ( ! $item_id ) {
        return $count;
    }

    $is_cct      = $store->get_arg( 'is_cct' );
    $related_cct = $store->get_arg( 'related_cct' );

    if ( ! $is_cct || ! $related_cct ) {
        return $count;
    }

    $content_type = Jet_Engine\Modules\Custom_Content_Types\Module::instance()->manager->get_content_types( $related_cct );

    if ( ! $content_type ) {
    	return $count;
    }

    $item        = $content_type->db->get_item( $item_id );
    $count_field = str_replace( array( ' ', '-' ), '_', $store->get_slug() ) . '_count';

    if ( ! $item ) {
        return 0;
    } else {
        if ( is_array( $item ) ) {
            $count = isset( $item[ $count_field ] ) ? $item[ $count_field ] : 0;
            return absint( $count );
        } else {
            return absint( $item->$count_field );
        }
    }
    
}, 10, 3 );
```

#jet-engine/data-stores/ajax-store-fragments

Дозволяє фільтрувати список фрагментів (селекторів) для оновлення лічильників на фронті при додаванні айтема в стор чи видаленні айтема зі стора.

**Args:**
- `$fragments` - array - Масив фрагментів для оновлення
- `$store` - Jet_Engine\Modules\Data_Stores\Stores\Factory - Інстанс дата стора
- `$item_id` - int - ID об'єкта

**Location:**
[includes/modules/data-stores/inc/stores/factory.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/modules/data-stores/inc/stores/factory.php)

**Access:**
Global

**Example:**
```php
add_filter( 'jet-engine/data-stores/ajax-store-fragments', function( $fragments, $store, $item_id ) {

    $selector = '.my-custom-selector[data-store="' . $store->get_slug() . '"][data-post="' . $item_id . '"]';

    $fragments[ $selector ] = $store->get_count();

    return $fragments;
}, 10, 3 );
```

#jet-engine/data-stores/get-users-macros/context/{ $context }

Дозволяє фільтрувати ID айтема для макроса `get_users_for_store_item` по динамічній частині фільтра `$context`, що 
відповідає вибраному контексту.

**Args:**
- `$item_id` - int - ID об'єкта

**Location:**
[includes/modules/data-stores/inc/macros/get-users-for-store-item.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/modules/data-stores/inc/macros/get-users-for-store-item.php)

**Access:**
Global

**Example:**
```php
add_filter( 'jet-engine/data-stores/get-users-macros/context/post_author', function( $item_id ) {
    $user = jet_engine()->listings->data->get_current_author_object();

    if ( $user ) {
        $item_id = $user->ID;
    }
    
    return $item_id;
} );
```

#jet-engine/data-stores/remove-from-store/settings

Дозволяє фільтрувати налаштування віджета/блока перед рендером посилання для видалення айтема зі стору

**Args:**
- `$settings` - array - налаштування віджета/блока
- `$store` - Jet_Engine\Modules\Data_Stores\Stores\Factory - Інстанс дата стора

**Location:**
[includes/modules/data-stores/inc/render-links.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/modules/data-stores/inc/render-links.php)

**Access:**
Global

**Example:**
```php
add_filter( 'jet-engine/data-stores/remove-from-store/settings', function( $settings, $store ) {
    // do something
    return $settings;
}, 10, 2 );
```

#jet-engine/data-stores/add-to-store/settings

Дозволяє фільтрувати налаштування віджета/блока перед рендером посилання для додавання айтема до стору

**Args:**
- `$settings` - array - налаштування віджета/блока
- `$store` - Jet_Engine\Modules\Data_Stores\Stores\Factory - Інстанс дата стора

**Location:**
[includes/modules/data-stores/inc/render-links.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/modules/data-stores/inc/render-links.php)

**Access:**
Global

**Example:**
```php
add_filter( 'jet-engine/data-stores/add-to-store/settings', function( $settings, $store ) {
    // do something
    return $settings;
}, 10, 2 );
```

#jet-engine/data-stores/settings/args-to-save

Дозволяє модифікувати налаштування стор айтема, які будуть збереженні в базі даних.

**Args:**
- `$args` - array - Масив даних, які будуть зберігатися в базі даних
- `$item` - array - Масив налаштувань стор айтема, який заходить під час збереження

**Location:**
[includes/modules/data-stores/inc/settings.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/modules/data-stores/inc/settings.php)

**Access:**
Global

**Example:**
```php
add_filter( 'jet-engine/data-stores/add-to-store/settings', function( $args, $item ) {
    $args['is_cct'] = ! empty( $item['is_cct'] ) ? filter_var( $item['is_cct'], FILTER_VALIDATE_BOOLEAN ) : false;
    $args['related_cct'] = ! empty( $item['related_cct'] ) ? $item['related_cct'] : '';

    return $args;
}, 10, 2 );
```

# User IP Schedules Hooks

User IP дата стор зберігає свої дані в окремій таблиці, тому заздалегідь було передбачено можливість цю таблицю 
періодично очищати. Поки що цю можливість можна включити та налаштувати за допомогою wp фільтрів, можливо в майбутньому 
додамо опції в налаштуванні дата стора. Для періодичного очищення використовується WP Schedule API.

##jet-engine/data-stores/user-ip/schedules/auto-clear-store

Дозволяє увімкнути можливість автоматичного періодичного очищення User IP дата стора.

**Args:**
- `$auto_clear` - boolean - Чи очищати автоматично стор. По дефолту: `false`.
- `$store_slug` - string - Слаг дата стора
- `$store` - Jet_Engine\Modules\Data_Stores\Stores\Factory - Інстанс дата стора

**Location:**
[includes/modules/data-stores/inc/stores/user-ip-schedules.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/modules/data-stores/inc/stores/user-ip-schedules.php)

**Access:**
Global

##jet-engine/data-stores/user-ip/schedules/clear-expiration

Дозволяє змінити період після якого будуть видалятися записи в базі даних. По дефолту цей період становить 1 рік, тобто
записи в базі даних, які були додані понад року тому будуть видалені.

**Args:**
- `$clear_expiration` - int - Період після якого будуть видалятися записи в базі даних. По дефолту: `YEAR_IN_SECONDS`.
- `$store_slug` - string - Слаг дата стора
- `$store` - Jet_Engine\Modules\Data_Stores\Stores\Factory - Інстанс дата стора

**Location:**
[includes/modules/data-stores/inc/stores/user-ip-schedules.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/modules/data-stores/inc/stores/user-ip-schedules.php)

**Access:**
Global

##jet-engine/data-stores/user-ip/schedules/event-timestamp

Дозволяє змінити таймстемп запуску події, для перевірки застарілих записів в базі даних.

**Args:**
- `$event_timestamp` - int - Таймстемп запуску події.
- `$store_slug` - string - Слаг дата стора
- `$store` - Jet_Engine\Modules\Data_Stores\Stores\Factory - Інстанс дата стора

**Location:**
[includes/modules/data-stores/inc/stores/user-ip-schedules.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/modules/data-stores/inc/stores/user-ip-schedules.php)

**Access:**
Global

##jet-engine/data-stores/user-ip/schedules/event-interval

Дозволяє змінити інтервал запуску події, для перевірки застарілих записів в базі даних.

**Args:**
- `$event_interval` - string - Інтервал запуску події. Доступні значення: `wp_get_schedules()`. По дефолту: `daily`.
- `$store_slug` - string - Слаг дата стора
- `$store` - Jet_Engine\Modules\Data_Stores\Stores\Factory - Інстанс дата стора

**Location:**
[includes/modules/data-stores/inc/stores/user-ip-schedules.php](https://github.com/ZemezLab/jet-engine/blob/master/includes/modules/data-stores/inc/stores/user-ip-schedules.php)

**Access:**
Global

**Example:**
```php
add_filter( 'jet-engine/data-stores/user-ip/schedules/auto-clear-store', function( $auto_clear, $store_slug ) {

    if ( 'likes-ip-store' === $store_slug ) {
        return true;
    }
   
   return $auto_clear;
}, 10, 2 );

add_filter( 'jet-engine/data-stores/user-ip/schedules/clear-expiration', function( $clear_expiration, $store_slug ) {

    if ( 'likes-ip-store' === $store_slug ) {
        return 2 * YEAR_IN_SECONDS;
    }
   
   return $clear_expiration;
   
}, 10, 2 );

add_filter( 'jet-engine/data-stores/user-ip/schedules/event-timestamp', function( $event_timestamp, $store_slug ) {

   if ( 'likes-ip-store' === $store_slug ) {
        return 1704067200; // 2024-01-01
    }

    return $event_timestamp;
}, 10, 2 );

add_filter( 'jet-engine/data-stores/user-ip/schedules/event-interval', function( $event_interval, $store_slug ) {

    if ( 'likes-ip-store' === $store_slug ) {
        return 'weekly';
    }
   
   return $event_interval;
}, 10, 2 );
```

