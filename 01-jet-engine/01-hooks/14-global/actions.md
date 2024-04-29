# Global JetEngine Actions (not directly related to any component)

## jet-engine/init

Action triggered after the initialization of all JetEngine parts. At that moment, all components and active modules are available. User-created JetEngine entities (post types, option pages, relations, etc.) are not yet registered.

**Args:**
- `$jet_engine` - Instance of the Jet_Engine class, similar to what the `jet_engine()` function returns. 

**Location:**
/jet-engine.php

**Access:**
Global

**Example:**

```php
add_action( 'jet-engine/init', function( $jet_engine ) {
  // Can be used instead of checking if JetEngine is installed or not
  // This hook only fires on JetEngine init, so it's safe to interact with all components from it
} );
```

## jet-engine/components/registered

Action triggered after the registration of JetEngine components. Can be used to register custom components or deregister existing ones. Deregistration is theoretically possible, but it should be done with caution, as some components are deeply integrated into the core and this can lead to errors.

**Args:**
- `$components_manager` - Instance of the components manager class, from which registration and deregistration methods can be called.
- `$jet_engine` - Instance of the JetEngine class.

**Location:**
/includes/core/components-manager.php

**Access:**
Global

**Example:**

```php
add_action( 'jet-engine/components/registered', function( $components_manager ) {
  $components_manager->deregister_component( 'glossaries );
} );
```