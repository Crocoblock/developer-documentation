# How to add an JetFormBuilder Action?

## Basic Implementation
Implement a new class that inherits from[\Jet_Form_Builder\Actions\Types\Base](/03-jet-form-builder/modules/actions/reference/types/base.md).
2. Register an instance of the newly created class using the following example:

```php
// this hook is performed after registration of all actions on hook `init` with priority `99`
add_action(
	'jet-form-builder/actions/register',
	/**
	 * @var \Jet_Form_Builder\Actions\Manager $manager
	 */
	function( $manager ) {
		$manager->register_action_type( /* instance of \Jet_Form_Builder\Actions\Types\Base */ );
	},
	10,
	1
);
```
### Result
![action.png](/03-jet-form-builder/common-use-cases/add-action/assets/action.png)

## Advanced Implementation
Before starting, you should install [Node.js](https://nodejs.org/en/download). To check its presence, run the following in the command terminal:
```
node -v
```

1. Repeat step 1 from the Basic Implementation.
2. Repeat step 2 from the Basic Implementation.
3. Create the following file (within our plugin):
### `./assets/package.json`
```json
{
	"name": "jet-forms-addon-boilerplate-simple",
	"description": "JetForms Simple Boilerplate",
	"version": "1.1.0",
	"license": "MIT",
	"private": true,
	"scripts": {
		"build": "npx webpack build --mode production",
		"dev": "npx webpack build --mode development -w"
	},
	"devDependencies": {
		"@babel/preset-react": "^7.23.3",
		"@wordpress/babel-preset-default": "^7.35.0",
		"@wordpress/dependency-extraction-webpack-plugin": "^5.2.0",
		"babel-loader": "^8.2.2",
		"webpack": "^5.90.3",
		"webpack-cli": "^5.1.4"
	},
	"dependencies": {
		"@wordpress/components": "^26.0.1",
		"@wordpress/i18n": "^4.51.0"
	}
}
```
4. Execute the following commands in the terminal:
```
cd ./assets
npm install
```
5. Create the following files:

### `./assets/src/MyActionRender.jsx`
```jsx
import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

function MyActionRender( {
	settings,
	onChangeSettingObj,
} ) {

	return <>
		<TextControl
			label={ __(
				'Input id here',
				'jet-forms-addon-boilerplate-simple',
			) }
			value={ settings.id }
			onChange={ id => onChangeSettingObj( { id } ) }
		/>
		<TextControl
			label={ __(
				'Input title here',
				'jet-forms-addon-boilerplate-simple',
			) }
			value={ settings.title }
			onChange={ title => onChangeSettingObj( { title } ) }
		/>
	</>;
}

export default MyActionRender;
```

### `./assets/src/index.js`
```js
import MyActionRender from './MyActionRender';

const {
	      addAction,
      } = JetFBActions;

addAction( 'my_action', MyActionRender );
```

### `./assets/.babelrc`
```json
{
	"presets": [
		"@wordpress/babel-preset-default"
	]
}
```

### `./assets/webpack.config.js`
```js
const WPExtractorPlugin = require(
	'@wordpress/dependency-extraction-webpack-plugin',
);
const path              = require( 'path' );
const devMode           = !process.argv.join( ':' ).
	includes( '--mode:production' );

module.exports = {
	context: path.resolve( __dirname, 'src' ),
	entry: {
		'editor': './editor/index.js',
	},
	output: {
		path: path.resolve( __dirname, 'build' ),
	},
	resolve: {
		extensions: [ '.js', '.jsx' ],
		alias: {
			'@': path.resolve( __dirname, 'src' ),
		},
	},
	module: {
		rules: [
			{
				test: /\.js(x)?$/,
				use: [
					'babel-loader',
				],
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new WPExtractorPlugin(),
	],
	devtool: devMode ? 'inline-cheap-module-source-map' : false,
};
```

6. Run the command in the terminal:

```
npm run build
```

7. At this step, we already have a prepared build script that needs to be added to the queue along with others on the form editing page:

```php
add_action(
	'jet-form-builder/editor-assets/before',
	function () {
		$script_url   = 'https://example.com/wp-content/plugins/your-plugin/assets/build/editor.js';
		$script_asset = require_once '/path-to-your-plugin/assets/build/editor.asset.php';

		wp_enqueue_script(
			\JFB\SimpleBoilerplate\Plugin::SLUG,
			$script_url,
			$script_asset['dependencies'],
			$script_asset['version'],
			true
		);
	}
);
```
P.S. All the code above is available in a working [example >>>](https://github.com/girafffee/jet-forms-addon-boilerplate-simple/tree/release/1.1.0).

### The result
![advanced-action.png](/03-jet-form-builder/common-use-cases/add-action/assets/advanced-action.png)
