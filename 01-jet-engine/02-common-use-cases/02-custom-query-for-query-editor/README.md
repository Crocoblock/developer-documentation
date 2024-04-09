# JetEngine Custom Query Types For Query Builder

Розберемо реєстрацію нового типу квері на прикладі того як реєструється новий тип квері для CCT в самому JetEngine.

## Реєструеємо компонент для редактора

Реєструеємо компонент для реадтора на хук <a href="/01-jet-engine/01-hooks/05-query-builder/actions.md#jet-enginequery-builderquery-editorregister" target="_blank">jet-engine/query-builder/query-editor/register</a>:

```php
/**
 * Place hook on you class init
 */
public function __construct() {
	add_action( 'jet-engine/query-builder/query-editor/register', array( $this, 'register_editor_component' ) );
}

/**
 * Register editor componenet for the query builder
 *
 * @param object $manager Instance of manager for ediotr components
 */
public function register_editor_component( $manager ) {
	require_once Module::instance()->module_path( 'query-builder/editor.php' );
	$manager->register_type( new CCT_Query_Editor() );
}
```

Як виглядає сам класс `CCT_Query_Editor`:

```php
/**
 * Always must be extended from base class \Jet_Engine\Query_Builder\Query_Editor\Base_Query
 */
class CCT_Query_Editor extends \Jet_Engine\Query_Builder\Query_Editor\Base_Query {

	/**
	 * Qery type ID
	 */
	public function get_id() {
		// Should be the same as slug for Query itself
		return 'custom-content-type';
	}

	/**
	 * Qery type name
	 */
	public function get_name() {
		return __( 'Custom Content Type Query', 'jet-engine' );
	}

	/**
	 * Returns Vue component name for the Query editor for the current type.
	 * 
	 * @return string
	 */
	public function editor_component_name() {
		return 'jet-cct-query';
	}

	/**
	 * Returns Vue component template for the Query editor for the current type.
	 *
	 * @return
	 */
	public function editor_component_data() {

		$types  = array();
		$fields = array();

		foreach ( Module::instance()->manager->get_content_types() as $type => $instance ) {
			$types[] = array(
				'value' => $type,
				'label' => $instance->get_arg( 'name' ),
			);

			$fields[ $type ] = $instance->get_fields_list( 'all', 'blocks' );

		}

		return array(
			'content_types'    => $types,
			'types_fields'     => $fields,
			'order_by_options' => Module::instance()->manager->get_additional_order_by_options( true ),
		);

	}

	/**
	 * Returns Vue component template for the Query editor for the current type.
	 * I
	 * @return [type] [description]
	 */
	public function editor_component_template() {
		ob_start();
		include Module::instance()->module_path( 'templates/admin/query-editor.php' );
		return ob_get_clean();
	}

	/**
	 * Returns Vue component template for the Query editor for the current type.
	 * I
	 * @return [type] [description]
	 */
	public function editor_component_file() {
		return Module::instance()->module_url( 'assets/js/admin/query-editor.js' );
	}

}
```

### Структура классу

- `get_id()` - метод який повертає ІД квері. Ви маєте використовувати однаковий ІД для едітора та для самої квері, щоб ці два типа квері потім могли знайти один одного при переході від редактора до квері на фронті
- `get_name()` - назва даного типу квері
- `editor_component_name()` - назва Vue компоненту який буде реєструватися в редакторі для даної квері. В самому Vue комопненті вам потрбно буде зареєструвати вручну компонент з такою назвою. На рівні бекенду вона потрібна для того щоб зв'язати вибор типу квері в опціях редактора з увімкненням відповідного компоненту основному тілі редактора.
- `editor_component_data()` - метод який повертає масив з будь-якими додатковими даними які вам потрібно передати в редактор
- `editor_component_template()` - Vue-шаблон для компоненту. Опціональний метод, за бажання шаблон компонента мжна задавати будь-яким доступним в Vue способом
- `editor_component_file()` - УРЛ ЖС файла, який містить безпосередньо код Vue компоненту.

Класс містить опис частини редактора яка відкривається після вибору нашого типу квері. Безпосередньо сам інтерфейс - це Vue component, який ви маєте описати у файлі `assets/js/admin/query-editor.js` та зареєструвати з ім'ям яке вказано у `editor_component_name()`. Будь-які кастомні данні котрі вам потрібно передати з бекенду в цей Vue компонент ви можете вказати у методі `editor_component_data()`. Далі ці дані будуть доступна у JS в глобальній змінній `window.jet_engine_your_query_slug`, де `your_query_slug` - це актуальній слаг вашого типу квері в якому всі `-` змінено на `_`. На даному прикладі - слаг `custom-content-type`, отже кастомні данні будуть доступні у `window.jet_engine_custom_content_type`.

Приклад Vue компоненту для ССТ

```js
Vue.component( 'jet-cct-query', {
	template: '#jet-cct-query',
	mixins: [
		window.JetQueryWatcherMixin, // Mixin required to emit changes on top to save
		window.JetQueryRepeaterMixin, // Mixin required if you have repeater control
	],
	props: [ 'value', 'dynamic-value' ], // Required props
	data: function() {
		return {
			operators: window.JetEngineQueryConfig.operators_list,
			dataTypes: window.JetEngineQueryConfig.data_types,
			contentTypes: window.jet_query_component_custom_content_type.content_types,
			query: {}, // Required parameter, will be watched and emittrd on top by window.JetQueryWatcherMixin
			dynamicQuery: {}, // Required parameter, will be watched and emittrd on top by window.JetQueryWatcherMixin
		};
	},
	computed: {
		currentFields: function() {

			if ( ! this.query.content_type ) {
				return [];
			}

			var fields = window.jet_query_component_custom_content_type.types_fields[ this.query.content_type ] || [];

			return fields;
		},
		orderByOptions: function() {

			if ( ! this.query.content_type ) {
				return [];
			}

			var fields = window.jet_query_component_custom_content_type.types_fields[ this.query.content_type ] || [],
				orderByOptions = window.jet_query_component_custom_content_type.order_by_options || [];

			return fields.concat( orderByOptions );
		}
	},
	created: function() {

		this.query        = { ...this.value }; // Store input into query prop
		this.dynamicQuery = { ...this.dynamicValue }; // Store dynamic input into dynamicQuery prop

		// Ensure props which is of array or object types
		if ( ! this.query.order ) {
			this.$set( this.query, 'order', [] );
		}

		this.presetArgs();

	},
	methods: {
		hasFields: function() {
			return 0 < this.currentFields.length;
		},
		presetArgs: function() {
			if ( ! this.query.args ) {
				this.$set( this.query, 'args', [] );
			}

			if ( ! this.dynamicQuery.args ) {
				this.$set( this.dynamicQuery, 'args', {} );
			} else if ( 'object' !== typeof this.dynamicQuery.args || undefined !== this.dynamicQuery.args.length ) {
				this.$set( this.dynamicQuery, 'args', {} );
			}

			for ( const prop in this.dynamicQuery.args ) {
				if ( ! Object.keys( this.dynamicQuery.args[ prop ] ).length ) {
					this.$set( this.dynamicQuery.args, prop, {} );
				}
			}

		},
		newDynamicArgs: function( newClause, metaQuery, prevID ) {

			let newItem = {};

			if ( prevID && this.dynamicQuery.args[ prevID ] ) {
				newItem = { ...this.dynamicQuery.args[ prevID ] };
			}

			this.$set( this.dynamicQuery.args, newClause._id, newItem );

		},
		deleteDynamicArgs: function( id ) {
			this.$delete( this.dynamicQuery.args, id );
		},
	}
} );
```
Мінімальний шаблон файлу компоненту з описом його частин -  <a href="/01-jet-engine/02-common-use-cases/02-custom-query-for-query-editor/vue-component.js" target="_blank">/01-jet-engine/02-common-use-cases/02-custom-query-for-query-editor/vue-component.js</a>

## Реєструеємо безпосередньо новий тип квері

Реєстрація відбувається на хук <a href="/01-jet-engine/01-hooks/05-query-builder/actions.md#jet-enginequery-builderqueriesregister" target="_blank">jet-engine/query-builder/queries/register</a>:

```php
/**
 * Place hook on you class init
 */
public function __construct() {
	add_action( 'jet-engine/query-builder/queries/register', array( $this, 'register_query' ) );
}

/**
 * Register query class
 *
 * @param  [type] $manager [description]
 * @return [type]          [description]
 */
public function register_query( $manager ) {

	require_once Module::instance()->module_path( 'query-builder/query.php' );
	$type  = $this->slug;
	$class = __NAMESPACE__ . '\CCT_Query';

	$manager::register_query( $type, $class );

}
```

Структура класу `CCT_Query`:

```php

class CCT_Query extends \Jet_Engine\Query_Builder\Queries\Base_Query {

	public $current_query = null;

	/**
	 * Returns queries items
	 *
	 * @return [type] [description]
	 */
	public function _get_items() {

		$result = array();

		$type = ! empty( $this->final_query['content_type'] ) ? $this->final_query['content_type'] : false;

		if ( ! $type ) {
			return $result;
		}

		$content_type = Module::instance()->manager->get_content_types( $type );

		if ( ! $content_type ) {
			return $result;
		}

		$order  = ! empty( $this->final_query['order'] ) ? $this->final_query['order'] : array();
		$args   = ! empty( $this->final_query['args'] ) ? $this->final_query['args'] : array();
		$offset = ! empty( $this->final_query['offset'] ) ? absint( $this->final_query['offset'] ) : 0;
		$status = ! empty( $this->final_query['status'] ) ? $this->final_query['status'] : '';
		$limit  = ! empty( $this->final_query['number'] ) ? absint( $this->final_query['number'] ) : 0;

		$flag = \OBJECT;
		$content_type->db->set_format_flag( $flag );

		if ( $status ) {
			$args[] = array(
				'field'    => 'cct_status',
				'operator' => '=',
				'value'    => $status,
			);
		}

		$content_type->db->set_query_object( $this );

		$args   = $content_type->prepare_query_args( $args );
		$result = $content_type->db->query( $args, $limit, $offset, $order );

		return $result;

	}

	/**
	 * Allows to return any query specific data that may be used by abstract 3rd parties
	 *
	 * @return [type] [description]
	 */
	public function get_query_meta() {
		$type = ! empty( $this->final_query['content_type'] ) ? $this->final_query['content_type'] : false;
		return array(
			'content_type' => $type,
		);
	}

	/**
	 * Returns currently displayed page number
	 *
	 * @return [type] [description]
	 */
	public function get_current_items_page() {

		$offset = ! empty( $this->final_query['offset'] ) ? absint( $this->final_query['offset'] ) : 0;
		$per_page = $this->get_items_per_page();

		if ( ! $offset || ! $per_page ) {
			return 1;
		} else {
			return ceil( $offset / $per_page ) + 1;
		}

	}

	/**
	 * Returns total found items count
	 *
	 * @return [type] [description]
	 */
	public function get_items_total_count() {

		
		$cached = $this->get_cached_data( 'count' );

		if ( false !== $cached ) {
			return $cached;
		}

		$result = 0;
		$type = ! empty( $this->final_query['content_type'] ) ? $this->final_query['content_type'] : false;

		if ( ! $type ) {
			return $result;
		}

		$content_type = Module::instance()->manager->get_content_types( $type );

		if ( ! $content_type ) {
			return $result;
		}

		$args   = ! empty( $this->final_query['args'] ) ? $this->final_query['args'] : array();
		$status = ! empty( $this->final_query['status'] ) ? $this->final_query['status'] : '';

		if ( $status ) {
			$args[] = array(
				'field'    => 'cct_status',
				'operator' => '=',
				'value'    => $status,
			);
		}

		$content_type->db->set_query_object( $this );

		$args   = $content_type->prepare_query_args( $args );
		$result = $content_type->db->count( $args );


		$this->update_query_cache( $result, 'count' );

		return $result;

	}

	/**
	 * Returns count of the items visible per single listing grid loop/page
	 * @return [type] [description]
	 */
	public function get_items_per_page() {

		$this->setup_query();
		$limit = 0;

		if ( ! empty( $this->final_query['number'] ) ) {
			$limit = absint( $this->final_query['number'] );
		}

		return $limit;

	}

	/**
	 * Returns queried items count per page
	 *
	 * @return [type] [description]
	 */
	public function get_items_page_count() {

		$result   = $this->get_items_total_count();
		$per_page = $this->get_items_per_page();

		if ( $per_page < $result ) {

			$page  = $this->get_current_items_page();
			$pages = $this->get_items_pages_count();

			if ( $page < $pages ) {
				$result = $per_page;
			} elseif ( $page == $pages ) {
				$offset = ! empty( $this->final_query['offset'] ) ? absint( $this->final_query['offset'] ) : 0;
				$result = $result - $offset;
			}

		}

		return $result;
	}

	/**
	 * Returns queried items pages count
	 *
	 * @return [type] [description]
	 */
	public function get_items_pages_count() {

		$per_page = $this->get_items_per_page();
		$total    = $this->get_items_total_count();

		if ( ! $per_page || ! $total ) {
			return 1;
		} else {
			return ceil( $total / $per_page );
		}

	}

	public function set_filtered_prop( $prop = '', $value = null ) {

		switch ( $prop ) {

			case '_page':

				$page = absint( $value );

				if ( 0 < $page ) {
					$offset = ( $page - 1 ) * $this->get_items_per_page();
					$this->final_query['offset'] = $offset;
				}

				break;

			case 'orderby':
			case 'order':
			case 'meta_key':

				$key = $prop;

				if ( 'orderby' === $prop ) {
					$key = 'type';
					$value = ( 'meta_key' === $value ) ? 'CHAR' : 'DECIMAL';
				} elseif ( 'meta_key' === $prop ) {
					$key = 'orderby';
				}

				$this->set_filtered_order( $key, $value );
				break;

			case 'meta_query':

				foreach ( $value as $row ) {
					$this->update_args_row( $this->prepare_args_row( $row ) );
				}

				break;

			default: 
				
				$this->merge_default_props( $prop, $value );
				break;

		}

	}

	/**
	 * Prepare arguments row.
	 *
	 * @param  array $row
	 * @return array
	 */
	public function prepare_args_row( $row ) {

		if ( ! empty( $row['relation'] ) ) {

			$prepared_row = array(
				'relation' => $row['relation'],
			);

			unset( $row['relation'] );

			foreach ( $row as $inner_row ) {
				$prepared_row[] = $this->prepare_args_row( $inner_row );
			}

		} else {
			$prepared_row = array(
				'field'    => ! empty( $row['key'] ) ? $row['key'] : false,
				'operator' => ! empty( $row['compare'] ) ? $row['compare'] : '=',
				'value'    => ! empty( $row['value'] ) ? $row['value'] : '',
				'type'     => ! empty( $row['type'] ) ? $row['type'] : false,
			);
		}

		return $prepared_row;
	}

	/**
	 * Set new order from filters query
	 *
	 * @param [type] $key   [description]
	 * @param [type] $value [description]
	 */
	public function set_filtered_order( $key, $value ) {

		if ( empty( $this->final_query['order'] ) ) {
			$this->final_query['order'] = array();
		}

		if ( ! isset( $this->final_query['order']['custom'] ) ) {
			$this->final_query['order'] = array_merge( array( 'custom' => array() ), $this->final_query['order'] );
		}

		$this->final_query['order']['custom'][ $key ] = $value;

	}

	/**
	 * Update arguments row in the arguments list of the final query
	 *
	 * @param  [type] $row [description]
	 * @return [type]      [description]
	 */
	public function update_args_row( $row ) {

		if ( empty( $this->final_query['args'] ) ) {
			$this->final_query['args'] = array();
		}

		foreach ( $this->final_query['args'] as $index => $existing_row ) {
			if ( ( isset( $existing_row['field'] ) && isset( $row['field'] ) ) && $existing_row['field'] === $row['field'] && $existing_row['operator'] === $row['operator'] ) {

				if ( ! empty( $row['type'] ) && 'TIMESTAMP' === $row['type'] ) {
					$row['type']  = 'NUMERIC';
					$row['value'] = \Jet_Engine_Tools::is_valid_timestamp( $row['value'] ) ? $row['value'] : strtotime( $row['value'] );
				}

				$this->final_query['args'][ $index ] = $row;
				return;
			}
		}

		$this->final_query['args'][] = $row;

	}

	/**
	 * Adds date range query arguments to given query parameters.
	 * Required to allow ech query to ensure compatibility with Dynamic Calendar
	 * 
	 * @param array $args [description]
	 */
	public function add_date_range_args( $args = array(), $dates_range = array(), $settings = array() ) {

		$group_by = $settings['group_by'];

		if ( empty( $args['args'] ) ) {
			$args['args'] = array();
		}

		switch ( $group_by ) {

			case 'item_date':

				$args['args'][] = array(
					'field'    => 'cct_created',
					'operator' => 'BETWEEN',
					'value'    => array( date( 'Y-m-d H:i:s', $dates_range['start'] ), date( 'Y-m-d H:i:s', $dates_range['end'] ) ),
				);

				break;

			case 'meta_date':

				if ( $settings['group_by_key'] ) {
					$meta_key = esc_attr( $settings['group_by_key'] );
				}
				
				$calendar_query = array();

				if ( $meta_key ) {

					$calendar_query = array_merge( $calendar_query, array(
						array(
							'field'    => $meta_key,
							'operator' => 'BETWEEN',
							'value'    => array( $dates_range['start'], $dates_range['end'] ),
						),
					) );

				}

				if ( ! empty( $settings['allow_multiday'] ) && ! empty( $settings['end_date_key'] ) ) {

					$calendar_query = array_merge( $calendar_query, array(
						array(
							'field'    => esc_attr( $settings['end_date_key'] ),
							'value'    => array( $dates_range['start'], $dates_range['end'] ),
							'operator' => 'BETWEEN',
						),
						array(
							'relation' => 'AND',
							array(
								'field'    => $meta_key,
								'value'    => $dates_range['start'],
								'operator' => '<'
							),
							array(
								'field'    => esc_attr( $settings['end_date_key'] ),
								'value'    => $dates_range['end'],
								'operator' => '>'
							)
						),
					) );

					$calendar_query['relation'] = 'OR';

				}

				if ( 1 === count( $calendar_query ) ) {
					$args['args'][] = $calendar_query[0];
				} else {
					$args['args'][] = $calendar_query;
				}

				break;

		}

		return $args;

	}

}

```

### Обов'язкові методи

Query в JetEngine реалізує не тільки механізм безпосередньо отримання набору айтемів з бази, а і інтерфейс сумісності з інтсрументами фільтрації та пагінації. Тому кожна квері містить певний набір обов'язкових методів для реалізації цих задач:

* `_get_items()` - метод який безпосередньо повертає масив query items, отриманий в залежності від аргументів з `$this->final_query`

* `get_items_total_count()` - загальна кількість результатів. Якщо квері розбита на сторінки з аргументів, або просто повертає лімітовану кількість результатів - цей метод в будь-якому разі повинен повернути загальну кількість результатів, незалежно від поточного ліміту. Якщо брати за аналог WP_Query, то це параметер WP_Query::$found_posts. Як правило повертає більше число ніж кількість айтемів у `_get_items()`

* `get_items_per_page()` - максимальна кількість айтемів яку може повернути `_get_items()` з один запит. Визначається особливостями конкртетной квері, наприклад у випадку з ССТ, за цей параметер відповідає `$this->final_query['number']`

* `get_items_page_count()` - кількість айтемів в `_get_items()`, вона може бути рівною `get_items_per_page()`, або меньшою, якщо відображається остання сторінка пагінації.

* `get_items_pages_count()` - загальна кількість сторінок в результатах квері. Вираховється як похідна від `get_items_total_count()` та `get_items_per_page()`. Наприклад якщо в нас загальна кількість результатів 9, а на строніку ми виводимо 5, то загальна кількість сторінок для ціє квері - 2.

* `get_current_items_page()` - поточна сторінка на якій ми знаходимось. Залежить від квері, може впередаватись як параметер, наприклад як у `WP_Query`, а може вираховуватись на базі інших параметрів, наприклад limit та offset

## Сумісність з JetSmartFilters

Базово сумісність з JetSmartFilters реалізована вище, на рівні Query Builder, сама квері має тільки корректним чином додати аргументи що прийшли з JetSmartFilters до своїх власних. Потрібно реалізувати 3 основні сценарії:

- сумісність безпосередньо з фільтрацією
- пагінація
- сортування

Для додавання аргументів з фільтра до квері, в классі квері є метод `set_filtered_prop( $prop, $value )` цей метод визивається для кожного аргумента з фільтра та в якості параметрів отримую назву аргумента з фіблта та його значення.

Фільтри можуть передавати будь-які аргументи, залежно від налаштувань самих фільтрів на сторінці, але є базові речі які потрібно обробляти однотипно:

### Параметри пагінації. `_page`

Разом з цим параметром завжди приходить номер сторінки, яку потрібно віддати. Далі обробка залежить від особливостей квері. Наприклад у ССТ пагінація реалізується через limit/offset. Тому отримуючі номер сторінки, ми маємо вирахувати відповідний офсет та додати його до аргументів:

```php
// $value - is second argument for set_filtered_prop() with actual page number
$page = absint( $value );

if ( 0 < $page ) {
	$offset = ( $page - 1 ) * $this->get_items_per_page();
	$this->final_query['offset'] = $offset;
}
```

### Кастомні поля. `meta_query`

Базово JetSmartFilters був написаний під `WP_Query` і структура зберігання аргументів залишилась характерна для `WP_Query`. Тому всі кастомні квері параметри збираються в масив `meta_query` у форматі який описано у офіційній документації - https://developer.wordpress.org/reference/classes/wp_meta_query/ Під кастомну квері нам необхідно конвертувати параметри з `meta_query` в формат який потрібен для нашого типу квері.

### Сортування. `orderby`, `order`, `meta_key`

Знову ж таки, базово JetSmartFilters був заточений під пости, тому параметри сортування передаються у форматі характерному для `WP_Query`. В цьому випдаку як варіант ми можемо передати кастомні параметри наприклад через сорутвання по Meta Value або Meta Value Numeric. В такому випадку нам треба обробити ці три параметри які вказано в заголовку. Наприклад для ССТ, в ЮІ філтрів ми вибираємо сортування за Meta Value або Meta Value Numeric і замість назви мета поля вказуємо поле ССТ за яким потрібно зробити сортування. Далі у методі `set_filtered_prop( $prop, $value )` "ловимо"  `orderby`, `order`, `meta_key` і на основі них задаємо праметри сортування для ССТ
