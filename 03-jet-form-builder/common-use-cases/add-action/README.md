# How to add an JetFormBuilder Action?

## Базова реалізація
1. Релізувати новий клас, що наслідує [\Jet_Form_Builder\Actions\Types\Base](/03-jet-form-builder/modules/actions/reference/types/base.md).
2. Зареєструвати об'єкт новостворенного класу за цим прикладом:
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
### Результат
![action.png](/03-jet-form-builder/common-use-cases/add-action/assets/action.png)

## Розширена реалізація
Перед початком вам слід встановити [Node.js](https://nodejs.org/en/download). Щоб перевірити його наявність - в командному терміналі виконайте наступне:
```
node -v
```

1. Повторюємо 1 крок з Базової реалізації
2. Повторюємо 2 крок з Базової реалізації
3. Створюємо наступний файл (в рамках нашого плагіну):
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
4. Виконуємо послідовно такі команди в нашому терміналі:
```
cd ./assets
npm install
```
5. Створюємо наступні файли:

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
6. Виконуємо команду в терміналі:
```
npm run build
```
7. На цьому кроці ми вже маємо підготовлений білд (скрипт), який залишилось додати в чергу інших
на сторінці редагування форми
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
P.S. весь наведений вище код присутній в робочому [прикладі >>>](https://github.com/girafffee/jet-forms-addon-boilerplate-simple/tree/release/1.1.0).

### Результат
![advanced-action.png](/03-jet-form-builder/common-use-cases/add-action/assets/advanced-action.png)
