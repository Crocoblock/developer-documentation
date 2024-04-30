# JetFormBuilder. Action-related filters

## Table of contents
* [`jet-form-builder/send-email/template-repeater`](#jet-form-buildersend-emailtemplate-repeater)
* [`jet-form-builder/action/insert-post/modifiers`](#jet-form-builderactioninsert-postmodifiers)
* [`jet-form-builder/post-modifier/object-properties`](#jet-form-builderpost-modifierobject-properties)
* [`jet-form-builder/action/insert-post/pre-check`](#jet-form-builderactioninsert-postpre-check)
* [`jet-form-builder/action/webhook/request-args`](#jet-form-builderactionwebhookrequest-args)
* [`jet-form-builder/action/webhook/request-url`](#jet-form-builderactionwebhookrequest-url)

## `jet-form-builder/send-email/template-repeater`
By default, the value of the repeater is returned in the form of a list, where all field values ​​are listed in each element. Here's an example of what it looks like:
```
1) text_field: some value;
2) text_field: another value;
```
To change this behavior, you can write your own filter that generates a different template.

### Parameters
* $content `string` (By default empty string)
* $items `array` (Repeater items)

### Usage
```php
add_filter(
	'jet-form-builder/send-email/template-repeater',
	function ( string $content, array $items ) {

		$index          = 0;
		$separator      = "<br>";
		$tab            = "&emsp;";
		$repeater_label = 'Repeater Heading';

		$rows = array();

		$if_array = function ( $value ) {
			return is_array( $value ) ? implode( ', ', $value ) : $value;
		};

		foreach ( $items as $item ) {
			$item_data = array();

			foreach ( $item as $key => $value ) {
				$label = jet_fb_request_handler()->get_attr( $key, 'label', $key );

				$item_data[] = sprintf( '%1$s: %2$s', $label, call_user_func( $if_array, $value ) );
			}
			$row = "Repeater Item " . ++ $index . $separator . $tab;
			$row .= implode( $separator . $tab, $item_data );

			$rows[] .= $row;
		}

		return ( $separator . $repeater_label . $separator . implode( $separator, $rows ) );
	},
	10, 2
);
```

This code generates the following template:
```
Repeater Heading
Repeater Item 1
    text_field: some value
Repeater Item 2
    text_field: another value
```

## `jet-form-builder/action/insert-post/modifiers`

## `jet-form-builder/post-modifier/object-properties`

## `jet-form-builder/action/insert-post/pre-check`

### Parameters
* $can_be_inserted `bool`
* $postarr `array` (arguments for [wp_insert_post](https://developer.wordpress.org/reference/functions/wp_insert_post/#parameters))
* $action [`\Jet_Form_Builder\Actions\Types\Insert_Post`](https://github.com/Crocoblock/jetformbuilder/blob/main/includes/actions/types/insert-post.php)

### Source
https://github.com/Crocoblock/jetformbuilder/blob/main/includes/actions/methods/post-modification/base-post-action.php#L34

## `jet-form-builder/action/webhook/request-args`

## `jet-form-builder/action/webhook/request-url`
