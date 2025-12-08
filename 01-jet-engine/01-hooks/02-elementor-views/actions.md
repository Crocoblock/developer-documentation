# JetEngine. List of actions related to Elementor view only

## jet-engine/elementor-views/widgets/register

Used for registering custom widgets in Elementor via JetEngine.
The hook runs during the widget manager initialization and allows you to connect custom or third-party widgets.

**Args:**
- `$widgets_manager` - (object) Elementor widget manager.
- `$elementor_views` - (object) The integration manager for Elementor Views in JetEngine.

**Location:**  
includes/components/elementor-views/manager.php

**Access:**  
Admin-only

**Example:**

```php
// Custom widget registration
add_action( 'jet-engine/elementor-views/widgets/register', function( $widgets_manager, $elementor_views ) {

	$elementor_views->register_widget(
		plugin_dir_path( __FILE__ ) . 'my-custom-widget.php',
		$widgets_manager,
		'Elementor\My_Custom_Widget'
	);

}, 10, 2 );
```

## jet-engine/listings/{widget}/source-controls

Allows adding or modifying the set of controls for JetEngine dynamic widgets in Elementor.
The hook is executed during the registration of data-source controls for dynamic widgets and enables extending widget functionality with additional parameters.

> **Note:** These hooks apply not only to the Elementor integration — they can also be used in Bricks Views and other places where added controls need to be processed or transformed.

**Available hooks:**
- `jet-engine/listings/dynamic-field/source-controls`
- `jet-engine/listings/dynamic-link/source-controls`
- `jet-engine/listings/dynamic-image/source-controls`
- `jet-engine/listings/dynamic-repeater/source-controls`

**Args:**
- `$widget` - (object) Widget instances (Elementor or Bricks) to which the controls are being added.

**Location:**
- includes/components/elementor-views/dynamic-widgets/dynamic-field.php
- includes/components/elementor-views/dynamic-widgets/dynamic-link.php
- includes/components/elementor-views/dynamic-widgets/dynamic-image.php
- includes/components/elementor-views/dynamic-widgets/dynamic-repeater.php
  includes/components/bricks-views/elements/(corresponding file names for Bricks).php

**Access:**  
Admin-only

**Example:**

```php
// Adding custom control to до Dynamic Field widget
add_action( 'jet-engine/listings/dynamic-field/source-controls', function( $widget ) {

	$widget->add_control(
		'custom_control_example',
		[
			'label'       => __( 'Custom Option', 'text-domain' ),
			'type'        => 'text',
			'default'     => '',
			'description' => __( 'My additional control for Dynamic Field', 'text-domain' ),
		]
	);

}, 10, 1 );
```

## jet-engine/listings/dynamic-image/link-source-controls

Used to add or modify the controls responsible for link sources in the Dynamic Image widget.
The hook runs during the registration of link-source controls, allowing you to extend the set of available options (for example, to integrate with third-party plugins).

> **Note:** The hook is applied not only in Elementor but is also used in Bricks Views.

**Args:**
- `$widget` - (object) Widget instance (Elementor or Bricks) to which the controls are being added..

**Location:**
- includes/components/elementor-views/dynamic-widgets/dynamic-image.php
- includes/components/bricks-views/elements/dynamic-image.php

**Access:**  
Admin-only

**Example:**

```php
// Adding your custom link source in Dynamic Image widget
add_action( 'jet-engine/listings/dynamic-image/link-source-controls', function( $widget ) {

	$widget->add_control(
		'custom_link_source',
		[
			'label'       => __( 'Custom Link Source', 'text-domain' ),
			'type'        => 'text',
			'default'     => '',
			'description' => __( 'My custom link source for Dynamic Image', 'text-domain' ),
			'condition'   => [
				'linked_image' => 'yes',
			],
		]
	);

}, 10, 1 );
```

## jet-engine/listings/dynamic-link/style-tabs

Used to add or modify the style tabs in the Dynamic Link widget.
The hook runs during the registration of styles in the widget, allowing you to extend the set of available options for customizing link appearance.

**Args:**
- `$widget` - (object) Elementor widget instance to which the styles are being added

**Location:**  
includes/components/elementor-views/dynamic-widgets/dynamic-link.php

**Access:**  
Admin-only

**Example:**

```php
// Adding custom Style tab in Dynamic Link widget 
add_action( 'jet-engine/listings/dynamic-link/style-tabs', function( $widget ) {

	$widget->start_controls_tab(
		'custom_link_style_tab',
		[
			'label' => __( 'Custom Styles', 'text-domain' ),
		]
	);

	$widget->add_control(
		'custom_link_color',
		[
			'label' => __( 'Custom Text Color', 'text-domain' ),
			'type'  => \Elementor\Controls_Manager::COLOR,
			'selectors' => [
				$widget->css_selector( '__link.custom' ) => 'color: {{VALUE}}',
			],
		]
	);

	$widget->end_controls_tab();

}, 10, 1 );
```

## jet-engine/listings/document/custom-source-control

Used to add or modify controls in the settings of the Listing Item document (Elementor).
The hook runs during the registration of additional options for the document and allows extending its capabilities with custom parameters.

**Args:**
- `$document` - (object) Elementor Listing Item document instance to which the controls are being added.

**Location:**  
includes/components/elementor-views/document-types/listing-item.php

**Access:**  
Admin-only

**Example:**

```php
// Adding custom control to Listing Item document
add_action( 'jet-engine/listings/document/custom-source-control', function( $document ) {

	$document->add_control(
		'custom_query_selector',
		[
			'label'       => __( 'Custom Query', 'text-domain' ),
			'type'        => \Elementor\Controls_Manager::SELECT,
			'default'     => '',
			'options'     => [
				'query_1' => __( 'Query 1', 'text-domain' ),
				'query_2' => __( 'Query 2', 'text-domain' ),
			],
		]
	);

}, 10, 1 );
```

## jet-engine/listings/document/custom-link-source-controls

Used to add or modify the link source controls in the settings of the Listing Item document (Elementor).
The hook runs during the registration of additional options for the document, allowing you to extend the set of available sources for dynamic links.

**Args:**
- `$document` - (object) Elementor Listing Item document instance to which the controls are being added.

**Location:**  
includes/components/elementor-views/document-types/listing-item.php

**Access:**  
Admin-only

**Example:**

```php
// Adding custom link source to Listing Item document
add_action( 'jet-engine/listings/document/custom-link-source-controls', function( $document ) {

	$document->add_control(
		'custom_link_source_control',
		[
			'label'       => __( 'Custom Link Source', 'text-domain' ),
			'type'        => \Elementor\Controls_Manager::TEXT,
			'default'     => '',
			'description' => __( 'My custom link source for Listing Item', 'text-domain' ),
			'condition'   => [
				'listing_link_source' => 'custom_source',
			],
		]
	);

}, 10, 1 );
```

