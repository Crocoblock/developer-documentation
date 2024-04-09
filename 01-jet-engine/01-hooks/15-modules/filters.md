# Global JetEngine Filters (not directly related to any component)

## jet-engine/template-path

Дозволяє переписувати шлях до темплейтів, які можна перезаписівати в середині теми. Фактично не використовується

**Args:**
- `$template_path` - дефолтна папка в яку терба класти темплейти Енжина в темі, якщо ви хочете переписати ці темплейти

**Location:**
/jet-engine.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/template-path', function( $path ) {
  return 'my-dir-name';
} );
```

## jet-engine/accessibility/contrast-ui

Дозволяє підключити додатковий ЦСС файл, який робить ЮІ Енжина більш контрастним. Практично не використовується

**Args:**
- `true/false` - Підключати або ні додатковий ЦСС. По дефолту false

**Location:**
/includes/core/accessibility.php

**Access:**
Admin-only

**Example:**

```php
add_action( 'jet-engine/accessibility/contrast-ui', '__return_true' );
```

## jet-engine/listings/icon-html-format

Дозволяє фільтрувати ХТМЛ формат іконки, яку повертає функція jet_engine_icon_html() На данний момент ця функція використовується як колбек в тих компонентах де можна фільтрувати результат за допомогою колбеку

**Args:**
- `$format` - Формат фінальної ХТМЛ розмітки іконки. По дефолту - `<i class="fa %s"></i>`
- `$value` - сама іконка в тому вигляді як вона приходить аргументом у функцію

**Location:**
/includes/core/functions.php

**Access:**
Global

**Example:**

```php
add_action( 'jet-engine/listings/icon-html-format', function( $format, $icon ) {
  return '<span class="material-icons">%s</span>';
}, 10, 2 );
```

## jet-engine/listings/icon-html-format

Дозволяє фільтрувати ХТМЛ формат іконки, яку повертає функція jet_engine_icon_html() На данний момент ця функція використовується як колбек в тих компонентах де можна фільтрувати результат за допомогою колбеку

**Args:**
- `$format` - Формат фінальної ХТМЛ розмітки іконки. По дефолту - `<i class="fa %s"></i>`
- `$value` - сама іконка в тому вигляді як вона приходить аргументом у функцію

**Location:**
/includes/core/functions.php

**Access:**
Global

**Example:**

```php
add_action( 'jet-engine/listings/icon-html-format', function( $format, $icon ) {
  return '<span class="material-icons">%s</span>';
}, 10, 2 );
```