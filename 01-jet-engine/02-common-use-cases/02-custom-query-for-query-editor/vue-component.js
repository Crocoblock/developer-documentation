(function( $ ) {

	'use strict';

	Vue.component( 'my-component-name', {
		/**
		 * Template for component will be autonatically registered with the same name as component itsefl,
		 * if you defined this template with editor_component_template() method in component class.
		 */
		template: '#my-component-name',
		mixins: [
			/**
			 * Required to watch and emit changes of query and dynamicQuery properties
			 */
			window.JetQueryWatcherMixin,
			/**
			 * Required to register all repeater-realted methods:
			 * - addNewField( $event, $props, $parent, $callback ) - adds new repeater field with $props into $parent and optionally run $callback after that + generate custom _id property for this field, which is used later
			 * - setFieldProp( $id, $key, $value, $parent ) - set $value into property $key for repeater item with _id $id and update this field in $parent by $id
			 * - cloneField( $index, $id, $parent, $callback ) - clone field with _id $id, put it into $parent in position $index + 1 and optionally run $callback after this
			 * - deleteField( $index, $id, $parent, $callback ) - delete field with _id $id from $parent and optionally run $callback after this
			 * - isCollapsed( $field ) - check if field is collapsed
			 *
			 * UI for repeater could be implemented with cx-vui-repeater component
			 */
			window.JetQueryRepeaterMixin,
			/**
			 * Adds methods to work with meta_query property of this.query
			 * - presetMeta() - ensure meta_query is correctly filled on component init
			 * - newDynamicMeta() - used as callback for @add-new-item and @clone-item repeater events.
			 * - deleteDynamicMeta() - used as callback for @delete-item repeater event.
			 *
			 * Must be used in combination with window.JetQueryRepeaterMixin
			 *
			 * UI for meta could be implemented with cx-vui-repeater component
			 */
			window.JetQueryMetaParamsMixin,
			/**
			 * Adds methods to work with tax_query property of this.query
			 * - presetTax() - ensure tax_query is correctly filled on component init
			 * - newDynamicTax() - used as callback for @add-new-item and @clone-item repeater events.
			 * - deleteDynamicTax() - used as callback for @delete-item repeater event.
			 *
			 * Must be used in combination with window.JetQueryRepeaterMixin
			 *
			 * UI for meta could be implemented with cx-vui-repeater component
			 */
			window.JetQueryTaxParamsMixin,
			/**
			 * Adds methods to work with date_query property of this.query
			 * - presetDate() - ensure date_query is correctly filled on component init
			 * - newDynamicDate() - used as callback for @add-new-item and @clone-item repeater events.
			 * - deleteDynamicDate() - used as callback for @delete-item repeater event.
			 *
			 * Must be used in combination with window.JetQueryRepeaterMixin
			 *
			 * UI for meta could be implemented with cx-vui-repeater component
			 */
			window.JetQueryDateParamsMixin,
			/**
			 * Mark UI tab (if used) with dot, if it has filled Query properties.
			 * Usage in template
			 * :label="isInUseMark( propsList ) + 'Tab Label'"
			 * where propsList is array of this.query properies controls for which is located in this tab
			 */
			window.JetQueryTabInUseMixin,
		],
		props: [
			// already stored query arguments which should be passed into this.query data property
			'value',
			// already stored dynamic query arguments which should be passed into this.dynamicQuery data property
			'dynamic-value'
		],
		data: function() {
			return {
				/**
				 * Property where we store all query arguments. All data from this property emitted on top with JetQueryWatcherMixin and stored in DB
				 */
				query: {},
				/**
				 * Poperty to store dynamic arguments which will be automaticalyy parsed and merged with main query before getting any data from DB
				 * can be used only with cx-vui-text and cx-vui-textarea controls
				 * usage example
				 * <cx-vui-input
					label="Object/Post IDs"
					description="Object/Post ID, or comma-separated list of object IDs."
					:wrapper-css="[ 'equalwidth', 'has-macros' ]"
					size="fullwidth"
					v-model="query.object_ids"
				><jet-query-dynamic-args v-model="dynamicQuery.object_ids"></jet-query-dynamic-args></cx-vui-input>
				 * Please note! In this case query.prop and dynamicQuery.prop should be the same props
				 */
				dynamicQuery: {},
			};
		},
		created: function() {

			/**
			 * Required part - setting this.query and this.dynamicQuery from component properties
			 */
			this.query = { ...this.value };
			this.dynamicQuery = { ...this.dynamicValue };

			/**
			 * Preset query arguments from mixins if used
			 */
			this.presetMeta();
			this.presetTax();
			this.presetDate();

			/**
			 * If we have any additional argumnets which should be arrays or objects - also preset them to avoid critical errors
			 */
			if ( ! this.query.array_arg ) {
				this.$set( this.query, 'array_arg', [] );
			}

			if ( ! this.query.object_arg ) {
				this.$set( this.query, 'object_arg', {} );
			}

		}
	} );

})( jQuery );