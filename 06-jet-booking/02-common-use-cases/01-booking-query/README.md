# JetBooking Booking Query

## Зміст
* [Опис](#опис)
* [Використання](#використання)
* [Методи Booking_Query](#методи-booking_query)
* [Параметри](#параметри)

## Опис

`jet_abaf_get_bookings` та `JET_ABAF\Resources\Booking_Query` забезпечують стандартний спосіб отримання бронювань, який є безпечним у використанні та не 
зламається через зміни в базі даних у майбутніх версіях JetBooking. Створення власних запитів до бази даних, швидше за все, 
порушить ваш код у майбутніх версіях JetBooking, оскільки дані пожуть переміщуватьсь та змінюватись в таблицях для кращої продуктивності. 
Це найкращий спосіб для розробників плагінів і тем для отримання декількох бронювань. `jet_abaf_get_bookings` та `JET_ABAF\Resources\Booking_Query` схожі 
на WordPress `get_posts` `WP_Query`. Так само, як і в них, ви передаєте масив аргументів, що визначають критерії пошуку.

## Використання

Ось кілька прикладів:

```php
// Отримайте бронювання, в періоді між 12-01-2013 та 12-31-2023.
$bookings = jet_abaf_get_bookings( [
    'date_query' => [
        [
            'column'   => 'check_in_date',
            'operator' => 'BETWEEN',
            'value'    => [
                '12-01-2013',
                '12-31-2023'
            ]   
        ]   
    ]
] );
```

```php
// Отримати 10 останніх бронювань у порядку створення.
$query = new \JET_ABAF\Resources\Booking_Query( [
    'limit'   => 10,
    'orderby' => 'booking_id',
    'order'   => 'DESC'
] );

$bookings = $query->get_bookings();
```

```php
// Отримати бронювання з спицефічним статусом.
$query = new \JET_ABAF\Resources\Booking_Query( [
    'status'   => [
        'on-hold',
        'pending'
    ]   
] );

$bookings = $query->get_bookings();
```

## Методи Booking_Query

`get_query_vars()` - Отримати масив усіх поточних змінних запиту, встановлених на об'єкті запиту.

`get_bookings()` - Отримайте всі бронювання, що відповідають поточним змінним запиту.

## Параметри

* **status** - (_array/string_) - Приймає масив рядків або рядок: один або декілька статусів 'pending', 'processing', 'completed', 'on-hold', 'cancelled', 'refunded',
'failed', 'created'. За замовчуванням включає порожній рядок (при порожньому параметрі будуть повернуть бронювання з будь-яким статусом).

```php
$args = [
    'status' => 'on-hold' // [ 'on-hold', 'completed', 'pending' ]
];

$bookings = jet_abaf_get_bookings( $args );
```

* **include** - (_array/string/int_) - Приймає масив цілих чисел/рядків, ціле число ябо рядок: Включає тільки бронювання з ідентифікаторами бронювань.

```php
$args = [
    'include' => [ 134, 200, 210, 340 ] // [ '34', '47', '88' ] or '123' or '3, 7, 13' or 43
];

$query    = new \JET_ABAF\Resources\Booking_Query( $args );
$bookings = $query->get_bookings();
```

* **exclude** - (_array/string/int_) - Приймає масив цілих чисел/рядків, ціле число ябо рядок: Виключає бронювання з ідентифікаторами бронювань.
  Цей параметр буде проігноровано, якщо ви використовуєте параметр `include`.

```php
$args = [
    'exclude' => $booking->get_id() // [ 134, 200, 210, 340 ] or [ '34', '47', '88' ] or '123' or '3, 7, 13'
];

$bookings = jet_abaf_get_bookings( $args );
```

* **apartment_id** - (_array/string/int_) - Приймає масив цілих чисел/рядків, ціле число ябо рядок: Включає бронювання з
  ідентифікаторами пост типу бронювання.

```php
$args = [
    'apartment_id' => [ 255, 256 ] // [ '34', '47', '88' ] or '123' or '3, 7, 13' or 43   
];

$bookings = jet_abaf_get_bookings( $args );
```

* **apartment_unit** - (_array/string/int_) - Приймає масив цілих чисел/рядків, ціле число ябо рядок: Включає бронювання з 
  ідентифікаторами комірок пост типу бронювання. Цей параметр не працює без параметра `apartment_id`.

```php
$args = [
    'apartment_id'   => 255,
    'apartment_unit' => [ 1, 3, 5 ] // [ '34', '47', '88' ] or '123' or '3, 7, 13' or 43
];

$bookings = jet_abaf_get_bookings( $args );
```

* **order_id** - (_array/string/int_) - Приймає масив цілих чисел/рядків, ціле число ябо рядок: Включає тільки бронювання з
  ідентифікаторами замовлень.

```php
$args = [
    'order_id' => [ 3334, 1245, 1129 ] // [ '34', '47', '88' ] or '123' or '3, 7, 13' or 43
];

$bookings = jet_abaf_get_bookings( $args );
```

* **user_id** - (_array/string/int_) - Приймає масив цілих чисел/рядків, ціле число ябо рядок: Включає тільки бронювання з
  ідентифікаторами користувачів.

```php
$args = [
    'user_id' => [ 3334, 1245, 1129 ] // [ '34', '47', '88' ] or '123' or '3, 7, 13' or 43
];

$bookings = jet_abaf_get_bookings( $args );
```

* **date_query** - (_array_) - Приймає масив параметрів: один або декілька масивів умов для дат заїзду та виїзду з додаванням параметру зв'язку.
  - `relation`  - (_string_) - Приймає рядок: 'AND' або 'OR'.
  - `column`  - (_string_) - Приймає рядок: 'check_in_date' або 'check_out_date'. 
  - `operator`  - (_string_) - Приймає рядок: Оператори порівняння SQL та/або логічні оператори SQL.
  - `value`  - (_string/array/int_) - Приймає рядок, ціле число або масив з двох елементів.

```php
$args = [
    'date_query' => [
        'relation' => 'OR',
        [
            'column'   => 'check_in_date',
            'operator' => 'BETWEEN',
            'value'    => [
                '12-01-2013',
                '12-31-2023'
            ]   
        ],
        [
            'column'   => 'check_out_date',
            'operator' => '<=',
            'value'    => '12-31-2023' // 1752267600
        ]  
    ]
];

$bookings = jet_abaf_get_bookings( $args );
```

* **meta_query** - (_array_) - Приймає масив параметрів: один або декілька масивів умов для додаткових колонок бази данних бронювань з додаванням параметру 
зв'язку.
    - `relation`  - (_string_) - Приймає рядок: 'AND' або 'OR'.
    - `column`  - (_string_) - Приймає рядок: Назви додаткових колонок таблиці бронювань.
    - `operator`  - (_string_) - Приймає рядок: Оператори порівняння SQL та/або логічні оператори SQL.
    - `value`  - (_string/array/int_) - Приймає рядок, ціле число або масив з двох елементів.

```php
$args = [
    'meta_query' => [
        'relation' => 'AND',
        [
            'column'   => 'guests',
            'operator' => 'BETWEEN',
            'value'    => [
                '3',
                '6'
            ]   
        ],
        [
            'column'   => 'kids',
            'operator' => '>=',
            'value'    => 2 
        ]  
    ]
];

$bookings = jet_abaf_get_bookings( $args );
```

* **sorting** - (_array_) - Приймає масив параметрів: один або декілька масивів умов сортування.
    - `orderby`  - (_string_) - Приймає рядок: Назви колонок таблиці бази данних бронювань.
    - `order`  - (_string_) - Приймає рядок: 'DESC' або 'ASC'. Використовуйте з `orderby`.

```php
$args = [
    'sorting' => [
        [
            'orderby' => 'booking_id',
            'order'  => 'DESC', 
        ],
        [
            'orderby' => 'apartment_id',
            'order'  => 'ASC', 
        ],  
    ]
];

$bookings = jet_abaf_get_bookings( $args );
```

* **limit**  - (_int/string_) - Приймає ціле число або рядок: Максимальна кількість результатів для отримання або 0 для необмеженої кількості.

```php
$args = [
    'limit' => 10 // '15'
];

$bookings = jet_abaf_get_bookings( $args );
```

* **offset**  - (_int/string_) - Приймає ціле число або рядок: Сума для компенсації результатів бронювань. Цей параметр не працює без `limit`. Цей параметр перевизначає/ігнорує 
параметр page і перериває пагінацію.

```php
$args = [
    'limit'  => 10,
    'offset' => 2 // '3'
];

$bookings = jet_abaf_get_bookings( $args );
```

* **return**  - (_string_) - Приймає рядок: `arrays` або `objects`. За замовчуванням: `objects`.

```php
$args = [
    'limit'   => 10,
    'orderby' => 'booking_id',
    'order'   => 'DESC',
    'return' => 'arrays'
];

$bookings = jet_abaf_get_bookings( $args );
```