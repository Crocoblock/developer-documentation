# JetEngine. Interactive Tutorials

**Location:** /framework/workflows/workflows.php

Interactive Tutorials is a framework component responsible for registering and handling interactive tutorials for a specific plugin. In the code, this functionality is referred to as "workflows," which was a working name for the feature. However, closer to the release, it was decided to change it because the term "workflows" was already being used in Appointments in a different context.

Interactive Tutorials is a unified tool for launching step-by-step tutorials in the site's admin area, which, in addition to textual information, can also interact with the site and perform certain simple actions instead of the user or lead them to the necessary pages at the right moment.

By default, all tutorials for all our plugins are stored at https://api.crocoblock.com/interactive-tutorials/tutorials.json. But there is the possibility to add your own to the standard ones, or completely replace the API source for tutorials and register this module separately from our main plugins. More details about this below.

### Registering Interactive Tutorials in your own plugin
If your plugin already has interactive tutorials at https://api.crocoblock.com/, you can register this module in your plugin to display these tutorials on the general tutorials page. To do this, follow these steps:

Add the workflows.php module to the framework loader used in your plugin. For example, for JetEngine:

```php
...

$this->framework = new Jet_Engine_CX_Loader( [
	... // include other used modules
	$this->plugin_path( 'framework/workflows/workflows.php' ),
] );

...
```

2. Create a new instance of the `\Crocblock\Workflows\Manager class`. It is recommended to create it together with the initialization of `Jet_Dashboard` in your plugin, as by default we add a tutorials page to the dashboard menu, and for this, you need to specify the parent page slug:

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

**All possible arguments for initialization:**

`prefix` - default is `crocoblock` - the base prefix that determines where tutorials and their state are stored. Using this parameter, you can separate your set of tutorials from the general one.

`namespace` - default is empty, mandatory to pass - the namespace of your plugin. Each tutorial has its own namespace, and with this parameter, you specify which tutorials from the general list will be assigned to your plugin. All available tutorials are displayed on the tutorials page below the list of registered namespaces.

`label` - default is empty, **mandatory to pass** - the label of your namespace for visual display on the page.

`path` - default is empty, **mandatory to pass** - the path to the latest version of the module from all installed ones, obtained from the loader instance.
`url` - default is empty, **mandatory to pass** - the URL of the latest version of the module from all installed ones, obtained from the loader instance.

`parent_page` - default is empty, **mandatory to pass** - the parent page

`page_slug` - default is `crocoblock-workflows` - the slug of the current tutorials page, can be changed, and then you need to register your own page.

### Custom cases

**Registering new tutorials for your plugin from code**

In this case, tutorials will be added to the existing ones.

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

**Registering new tutorials on the new page**

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

In this case, a new page with tutorials will be added, but it will try to get tutorials from the same place as the default one, to change this, you need to register a new `api_url` for this instance of `$workflows`:

```php
$workflows->remote_api()->set_api_url( 'https://api.crocoblock.com/interactive-tutorials/tutorials-test.json' );
```