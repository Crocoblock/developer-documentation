# JetEngine Context

## Що означає поняття Context. Як і де використовується

За замовчанням динамічні віджети та динамічні теги Енжина працюють з поточним об'єктом. Наприклад в контенті сторінки це буде поточна сторінка, в лістингу - поточний елемент лістингу. Але часто виникають ситуацію коли нам треба змінити об'єкт для одного обо декількох віджетів. Наприклад, в лістингу постів ми виводимо ім'я та емейл автора. Без функціональності зміни контексту, нам довелось би віикористовувати вкладений лістинг, що ускладнює логіку, зібльшую кількість елементів на сторінці нта негативно відбивається на швидкодії. За допомогою контектсу ми просто можемо додати Dynamic Field віджет у контент поточного лістинг елементу, змінити для нього контекст - замість поточного поста використати контекст автора поточного поста. В такому випадку для даного віджета зміниться поточний об'єкт - з поста на юзера, який є автором цього поста. І у віджеті ми можемо вивести будь-якиі дані цього юзера.

## Додавання нового контексту

Додавання нового контексту зводится до 2х операцій - безпосередньо додавання нової опції у перелік доступних контекстів та опрацювання обраного контексту.

Опрацювання контексту в даному випадку - це заміни дефолтного об'єкту новим, який ми отримали для обраного контексту.

Додавання опції:
```php
add_filter( 'jet-engine/listings/allowed-context-list', function() {
	$context_list['prev-post'] = 'Previous Post Object';
	return $context_list;
} );
```

Опрацюання контексту з попреднього прикладу
```php
$context_name = 'prev-post';

add_filter( 'jet-engine/listings/data/object-by-context/' . $context_name, function() {

	$current_object = jet_engine()->listings->data->get_current_object();

	if ( 'WP_Post' !== get_class( $current_object ) ) {
		global $post;
		$current_object = $post;
	}

	if ( ! $current_object || 'WP_Post' !== get_class( $current_object ) ) {
		return false;
	}

	$in_same_term = false;
	$taxonomy     = false;

	$adjacent_post = get_adjacent_post( $in_same_term, '', true, $taxonomy );

	if ( ! $adjacent_post ) {
		return false;
	}

	return $adjacent_post;

} );
```

Плагін-заготовка для швидкого старту роботи з кастомними контекстами - https://github.com/MjHead/jet-engine-context-boilerplate

## Пов'язані хуки

* <a href="/01-jet-engine/01-hooks/01-listings/filters.md#jet-enginelistingsallowed-context-list">jet-engine/listings/allowed-context-list</a>
* <a href="/01-jet-engine/01-hooks/01-listings/filters.md#jet-enginelistingsdataobject-by-context">jet-engine/listings/data/object-by-context/</a>
