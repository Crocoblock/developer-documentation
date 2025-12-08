# JetEngine. List of actions related to Bricks Views only

## jet-engine/bricks-views/init

Launches during the Bricks Views component initialization in JetEngine.  
Allows you to perform additional logic or connect your own hooks and filters to work with Bricks Views.

**Args:**
- *No arguments.*

**Location:**  
includes/components/bricks-views/manager.php

**Access:**  
Global

**Example:**

```php
add_action( 'jet-engine/bricks-views/init', function() {

	error_log( 'Bricks Views component initialized.' );

} );
```

## jet-engine/bricks-views/register-elements

Called during the registration of JetEngine custom elements (widgets) for Bricks Builder.
Allows registering additional custom elements for use in Bricks.

**Args:**
- *Немає аргументів.*

**Location:**  
includes/components/bricks-views/manager.php

**Access:**  
Global

**Example:**

```php
add_action( 'jet-engine/bricks-views/register-elements', function() {

	// Example: Registering your custom element for Bricks
	if ( class_exists( '\Bricks\Elements' ) ) {
		\Bricks\Elements::register_element( plugin_dir_path( __FILE__ ) . 'elements/my-custom-element.php' );
	}

} );
```

## jet-engine/bricks-views/query-builder/on-query

Called after the JetEngine Query for Bricks has been configured and prepared, but before the results are retrieved.
Allows modifying the query parameters or executing additional logic for the current `element_id`.

**Args:**
- `$je_query` - an instance of the Jet_Engine\Query_Builder object.
- `$element_id` - (string) element ID in Bricks.

**Location:**  
includes/components/bricks-views/query-loop.php

**Access:**  
Frontend-only

**Example:**

```php
add_action( 'jet-engine/bricks-views/query-builder/on-query', function( $je_query, $element_id ) {

	// Example: adding an additional condition for meta_query 
	$je_query->set_filtered_prop( 'meta_query', array(
		array(
			'key'     => 'custom_key',
			'value'   => 'example',
			'compare' => '='
		)
	) );

}, 10, 2 );
```

## jet-engine/bricks-views/setup-preview

Called during the initialization of the template preview in Bricks for a given post.
Allows executing additional logic when preparing data for rendering the template preview for a specific `$post_id`.

**Args:**
- `$post_id` - (int) The ID of the post or template for which the preview is being initialized.

**Location:**  
includes/components/bricks-views/helpers/preview.php

**Access:**  
Frontend-only

**Example:**

```php
add_action( 'jet-engine/bricks-views/setup-preview', function( $post_id ) {

	// Example: output a message to the log when the preview is initialized
	error_log( 'Setup preview for post ID: ' . $post_id );

}, 10, 1 );
```

## jet-engine/bricks-views/dynamic-field/assets

Called when enqueuing scripts and styles for a **Dynamic Field** element in Bricks.
Allows adding additional styles or scripts for a specific dynamic field, or executing extra logic during its rendering.

**Args:**
- `$element` - (обʼєкт) A current Dynamic Field element instance. 

**Location:**  
includes/components/bricks-views/elements/dynamic-field.php

**Access:**  
Frontend-only

**Example:**

```php
add_action( 'jet-engine/bricks-views/dynamic-field/assets', function( $element ) {

	// Example: connect an additional script for a specific filter
	$settings = $element->get_jet_settings();

	if ( ! empty( $settings['dynamic_field_filter'] ) && 'custom_callback' === $settings['filter_callback'] ) {
		wp_enqueue_script( 'my-custom-script' );
	}

}, 10, 1 );
```

## jet-engine/bricks-views/dynamic-field/misc-style-controls

Called during the registration of additional styling controls for a **Dynamic Field** element in Bricks.
Allows adding custom style settings to the element’s editing panel.

**Args:**
- `$element` - (обʼєкт) A current Dynamic Field element instance.

**Location:**  
includes/components/bricks-views/elements/dynamic-field.php

**Access:**  
Admin-only

**Example:**

```php
add_action( 'jet-engine/bricks-views/dynamic-field/misc-style-controls', function( $element ) {

	// Example: add custom styling congrol 
	$element->register_jet_control(
		'custom_gap',
		[
			'tab'   => 'style',
			'label' => esc_html__( 'Custom gap', 'text-domain' ),
			'type'  => 'number',
			'units' => true,
			'css'   => [
				[
					'property' => '--custom-gap',
					'selector' => '.my-custom-class',
				],
			],
		]
	);

}, 10, 1 );
```