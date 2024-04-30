# JetEngine Custom Query Types For Query Builder

Let's explore registering a new query type using the example of how a new query type is registered for CCT in JetEngine itself.

## Registering a Component for the Editor

Register a component for the editor on the hook <a href="/01-jet-engine/01-hooks/05-query-builder/actions.md#jet-enginequery-builderquery-editorregister" target="_blank">jet-engine/query-builder/query-editor/register</a>:

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

Here is what the `CCT_Query_Editor` class looks like:

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

### Class Structure

- `get_id()` - method that returns the query ID. You should use the same ID for the editor and for the query itself so that these two query types can find each other when switching from the editor to the query on the front end.
- `get_name()` - the name of this query type.
- `editor_component_name()` - the name of the Vue component that will be registered in the editor for this query. In the Vue component itself, you will need to manually register a component with this name. On the backend, it is needed to link the query type selection in the editor options with enabling the corresponding component in the main editor body.
- `editor_component_data()` - method that returns an array with any additional data you need to pass to the editor.
- `editor_component_template()` - Vue template for the component. Optional method, you can specify the component template in any available Vue way.
- `editor_component_file()` - URL of the JS file that contains the Vue component code.

The class contains a description of the editor part that opens after selecting our query type. The interface itself is a Vue component, which you need to describe in the file `assets/js/admin/query-editor.js` and register with the name specified in `editor_component_name()`. Any custom data that you need to pass from the backend to this Vue component can be specified in the `editor_component_data()` method. Then this data will be available in JS in the global variable window.`jet_engine_your_query_slug`, where `your_query_slug` is the actual slug of your query type with all `-` replaced with `_`. In this example, the slug is custom-content-type, so the custom data will be available in `window.jet_engine_custom_content_type`.

Example Vue component for CCT:


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
A minimal template file for the component with a description of its parts -  <a href="/01-jet-engine/02-common-use-cases/02-custom-query-for-query-editor/vue-component.js" target="_blank">/01-jet-engine/02-common-use-cases/02-custom-query-for-query-editor/vue-component.js</a>

## Registering the New Query Type 

Registration is done on the hook <a href="/01-jet-engine/01-hooks/05-query-builder/actions.md#jet-enginequery-builderqueriesregister" target="_blank">jet-engine/query-builder/queries/register</a>:

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

The structure of the `CCT_Query` class:

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

### Mandatory Methods

In JetEngine, a Query not only implements the mechanism to directly retrieve a set of items from the database but also provides compatibility with filtering and pagination tools. Therefore, each query contains a set of mandatory methods to implement these tasks:

* `_get_items()` - a method that directly returns an array of query items, obtained depending on the arguments in `$this->final_query`

* `get_items_total_count()` - total number of results. If the query is paginated with arguments or simply returns a limited number of results, this method should always return the total number of results, regardless of the current limit. If we take WP_Query as an analogy, this is equivalent to the WP_Query::$found_posts parameter. Typically, it returns a number greater than the number of items in `_get_items()`

* `get_items_per_page()` - the maximum number of items that `_get_items()` can return in one query. It is determined by the specific query, for example, in the case of CCT, this parameter corresponds to `$this->final_query['number']`

* `get_items_page_count()` - the number of items in `_get_items()`, which can be equal to `get_items_per_page()`, or less if displaying the last page of pagination.

* `get_items_pages_count()` - the total number of pages in the query results. It is calculated based on `get_items_total_count()` and `get_items_per_page()`. For example, if we have a total of 9 results and display 5 per page, then the total number of pages for this query is 2.

* `get_current_items_page()` - the current page we are on. It depends on the query and can be passed as a parameter, for example, as in `WP_Query`, or calculated based on other parameters, such as limit and offset.

## Compatibility with JetSmartFilters

Basic compatibility with JetSmartFilters is implemented above, at the Query Builder level; the query itself just needs to correctly add the arguments that come from JetSmartFilters to its own arguments. Three main scenarios need to be implemented:

- compatibility with filtering
- pagination
- sorting

To add arguments from filters to the query, the query class has a  `set_filtered_prop( $prop, $value )` method, which is called for each filter argument, receiving the name of the argument from the filter and its value as parameters.

Filters can pass any arguments, depending on the settings of the filters themselves on the page, but there are basic things that need to be processed uniformly:

### Pagination Parameters. `_page`

Along with this parameter, the page number to be fetched always comes. Further processing depends on the specifics of the query. For example, in CCT, pagination is implemented using limit/offset. Therefore, upon receiving the page number, we need to calculate the corresponding offset and add it to the arguments:

```php
// $value - is second argument for set_filtered_prop() with actual page number
$page = absint( $value );

if ( 0 < $page ) {
	$offset = ( $page - 1 ) * $this->get_items_per_page();
	$this->final_query['offset'] = $offset;
}
```

### Кастомні поля. `meta_query`

Basically, JetSmartFilters was written for `WP_Query`, and the structure of storing arguments remains characteristic of `WP_Query`. Therefore, all custom query parameters are collected into the `meta_query` array in the format described in the official documentation  - https://developer.wordpress.org/reference/classes/wp_meta_query/ For a custom query, we need to convert the parameters from `meta_query` to the format required for our query type.

### Sorting. `orderby`, `order`, `meta_key`

Again, JetSmartFilters was tailored for posts, so the sorting parameters are passed in a format typical for `WP_Query`. In this case, as an option, we can pass custom parameters, for example, for sorting by Meta Value or Meta Value Numeric. In this case, we need to process these three parameters mentioned in the header. For example, for CCT, in the UI of the filters, we select sorting by Meta Value or Meta Value Numeric, and instead of the name of the meta field, we specify the field of the CCT by which the sorting should be done. Then, in the `set_filtered_prop( $prop, $value )` method, we "catch" `orderby`, `order`, `meta_key`, and based on them, we set sorting parameters for CCT.

