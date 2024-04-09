# JetEngine. Interactive Tutorials

**Location:** /framework/workflows/workflows.php

Interactive Tutorials - це компонент фреймворку, який відповідає за реєстрацію і обробку інтерактивних туторіалів для певного плагіну. В коді ця функціональність називається workflows - це була робоча назва фічі, але ближче до релізу було вирішено змінити її оскільки термін workflows вже використовуються в Апойнтментах в іншому контексті.

Interactive Tutorials - це уніфікований інструмент запуску в адмінці сайту будь-яких покрокових туторіалів, які окрім безпосередньо текстової інформації, можут також взаємодіяти з сайтом і виконувати певні прості дії замість юзера, або вести його на потрібні сторінки в потрібний момент.

За замовчанням, всі туторіали для всіх наших плагінів зберігаються на https://api.crocoblock.com/interactive-tutorials/tutorials.json. Але є можливість додати свої до стандартних, або взагалі замінити АПІ сорс для туторіалів та зареєструвати цей модуль окремо від наших основних плагінів. Докладніше про це нижче.

### Реєстрація Interactive Tutorials у власному плагіні

Якщо для вашого плагіну вже є інтерактивні туторіали на https://api.crocoblock.com/, ви можете зарєструвати цей моудль у вашому плагіні, щоб вивести ці туторіали на загальну сторінку з туторіалами. Для цього треба виконати наступні кроки:

1. Додати модуль workflows.php у лоадер фреймворка, що використовується у вашому плагіні. На прикладі JetEngine:

```php
...

$this->framework = new Jet_Engine_CX_Loader( [
	... // include other used modules
	$this->plugin_path( 'framework/workflows/workflows.php' ),
] );

...
```

2. Створити новий екземпляр класу `\Croblock\Workflows\Manager`. Рекомендовано створювати його разом з ініціалізацією `Jet_Dashboard` у вашому плагіні, т.я. за замовчанням ми додаємо сторінку туторіалів у меню дешборда, і для цього вам потріб слаг батьківської сторінки дешборда:

```php
...

$workflows_module_data = $this->framework->get_included_module_data( 'workflows.php' );

$workflows = new \Croblock\Workflows\Manager( [
	'namespace' => 'jet-engine',
	'label' => 'JetEngine',
	'path' => $workflows_module_data['path'],
	'url' => $workflows_module_data['url'],
	'parent_page' => $jet_dashboard->dashboard_slug,
] );

$workflows->run();

...
```

Всі можливі аргументи для ініціалізації:

- `prefix` - по дефолту `crocoblock` - базовий префікс, який визначає де зберігаються туторіали і їх стан. За допомогою цього параметра можна відокремлювати ваш набір туторіалів від загального.
- `namespace` - по дефолту порожній, **обов'язоково передавати** - неймпспейс вашого плагіну. Кожен туторіал має свй неймспейс, цим параметром ви визначаєете, які туторіали з загального списку буде віднесено до вашого плагіну. Всі доступні туторіали виводяться на сторінці туторіалів за списком зареєстрованих неймспейсів.
- `label` - по дефолту порожній, **обов'язоково передавати** - лейбл вашого неймспейса для візуального відображення на сторінці.
- `path` - по дефолту порожній, **обов'язоково передавати** - шлях до найсвіжішої версії модуля з усіх встановлених, отримується з екземпляру лоадера.
- `url` - по дефолту порожній, **обов'язоково передавати** - УРЛ найсвіжішої версії модуля з усіх встановлених, отримується з екземпляру лоадера.
- `parent_page` - по дефолту порожній, **обов'язоково передавати** - батьківська сторінка
- `page_slug` - по дефолту `crocoblock-workflows` - слаг поточної сторінки туторіалів, можна змінити і тим сами зареєструвати власну сторінку.
- `page_name` - по дефолту `Interactive Tutorials` - назва поточної сторінки туторіалів в меню, можна змінити якщо ви змінили саму сторінку, інакше немає сенсу.

### Кастомні кейси

**Реєстрація нових туторіалів для вашого плагіну з коду**

В цьому випадку туторіали буде додано до вже існуючих

```php
$workflows->storage()->register_workflows( [ [
	'id' => 999,
	'workflow' => 'My Custom Tutorial',
	'description' => 'Tutorial Description.',
	'namespace' => 'my-namespace',
	'relatedWorkflows' => [],
	'steps' => [
		[
			'name' => 'Step 1',
			'help' => 'Step 1 body',
			'tutorial' => 'https://crocoblock.com/knowledge-base/jetengine/how-to-create-a-custom-post-type-based-on-jetengine-plugin/',
			'stepURL' => [
				'url'   => 'admin.php?page=jet-engine-cpt&cpt_action=add',
				'label' => 'Create new CPT',
			],
			'minTime' => 3,
			'maxTime' => 10,
		],
		[
			'name' => 'Step 2',
			'help' => 'Step 2 Body',
			'tutorial' => 'https://crocoblock.com/knowledge-base/jetengine/query-builder-posts-query-type/',
			'stepURL' => [
				'url'   => 'admin.php?page=jet-engine-query&query_action=add',
				'label' => 'Create a new Query',
			],
			'minTime' => 2,
			'maxTime' => 4,
		],
	],
] ] );
```

**Реєстрація туторіалів на новій сторінці**

```php
$workflows_module_data = $this->module_loader->get_included_module_data( 'workflows.php' );
$workflows = new \Croblock\Workflows\Manager( [
	'namespace' => 'jet-theme-core',
	'label' => 'JetThemeCore',
	'prefix' => 'my_workflows',
	'path' => $workflows_module_data['path'],
	'url' => $workflows_module_data['url'],
	'parent_page' => 'tools.php',
	'page_slug' => 'my-workflows',
] );
```

у цьому випадку додасться нова сторінка з туторіалами, але вона буде намагатись отримати туторіали з того ж місця що й дефолтна, щоб змінити це, треба зараєструвати новий api_url для даного екземпляру `$workflows`:

```php
$workflows->remote_api()->set_api_url( 'https://api.crocoblock.com/interactive-tutorials/tutorials-test.json' );
```