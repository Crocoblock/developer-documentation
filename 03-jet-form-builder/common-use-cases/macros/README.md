# JetFormBuilder Macros & Filters

## Table of contents
- [Basic Usage](#basic-usage)
- [Macros Result Depending on Field Type](#macros-result-depending-on-field-type)
- [Anatomy of a Macro with Filter](#anatomy-of-a-macro-with-filter)
- [Change Macros Result Using Filters](#change-macros-result-using-filters)
- [List of Built-in Filters](#list-of-built-in-filters)
- [Register Custom Filter for Macros](#register-custom-filter-for-macros)

## Basic macro usage
Using a macro in the Send Email action.

1. Open the form in the block editor  
2. Add a Text field block with the Form Field Name set to `text_field`  
3. Select the Send Email action and open its settings  
4. Go to the "Content" field and add this text:
```text
Text field: %text_field%
```

Result:
```text
Text field: text field value
```

## Macros result depending on a field type
- Checkbox Field – selected options are displayed comma-separated.
- Repeater Field – each item is shown on a separate line. Each line includes field names and their values.

Structure and settings of the blocks:
```text
<!-- wp:jet-forms/checkbox-field {"field_options":[{"label":"First Option","value":"first_option","calculate":"1"},{"label":"Second Option","value":"second_option","calculate":"2"},{"label":"Third Option","value":"third_option","calculate":"3"}],"label":"checkbox field","name":"checkbox_field"} /-->

<!-- wp:jet-forms/repeater-field {"label":"repeater field","name":"repeater_field"} -->
<!-- wp:jet-forms/text-field {"label":"text field","name":"text_field"} /-->

<!-- wp:jet-forms/checkbox-field {"field_options":[{"label":"First Option","value":"first_option","calculate":"1"},{"label":"Second Option","value":"second_option","calculate":"2"},{"label":"Third Option","value":"third_option","calculate":"3"}],"label":"checkbox field","name":"checkbox_field"} /-->
<!-- /wp:jet-forms/repeater-field -->
```
Контент для Send Email:
```text
Checkbox Field: %checkbox_field%
Repeater Field: %repeater_field%
```
Result:
```text
Checkbox Field: first_option, second_option
Repeater Field: 1) text field: value 1, checkbox field: first_option;
2) text field: value 2, checkbox field: second_option, third_option;
3) text field: value 3, checkbox field: first_option, third_option;
```

Certainly! Here’s the updated section with the "Required" attribute added to each component:

---

## Anatomy of the Macro with Filter

A macro with a filter in WordPress follows a specific structure to modify the output of a field. Here's a detailed breakdown of each component in the macro:

### Example Macro
**_%date_field|format_date(Y/m/d)%_**

### Components

1. **`date_field`**
    - **Description:** This is the name of the field to be processed by the macro.
    - **Position:** It comes immediately after the opening percent symbol (`%`).
    - **Required:** Yes. The field name is essential because it specifies which data to retrieve and process.

2. **`|`**
    - **Description:** This is the separator between the field name and the filter.
    - **Position:** It follows directly after the field name.
    - **Required:** Yes. The separator is necessary to distinguish between the field name and the filter, ensuring proper parsing of the macro.

3. **`format_date`**
    - **Description:** This is the name of the filter that will be applied to the field.
    - **Position:** It comes immediately after the separator (`|`).
    - **Required:** Yes. The filter name is required to specify the transformation to be applied to the field's value.

4. **`(Y/m/d)`**
    - **Description:** These are the arguments passed to the filter, enclosed in parentheses. In this example, the date will be formatted according to the specified format (`Y/m/d`), where `Y` represents the year, `m` represents the month, and `d` represents the day.
    - **Position:** They follow directly after the filter name.
    - **Required:** No. Arguments are optional and depend on the specific filter. Some filters may not require arguments, but when arguments are needed, they must be enclosed in parentheses.

## Change macros result using filters
Using a macro with a filter in the Send Email action.

1. Open the form in the block editor
2. Add a Date field block with the `Form Field Name set to `date_field`
3. Select the Send Email action and open its settings
4. Go to the "Content" field and add this text:
```text
Date field: %date_field%
Formatted date field: %date_field|format_date%
Formatted date field: %date_field|format_date(Y/m/d)%
```

Result:
```text
Date field: 2024-07-16
Formatted date field: July 16, 2024
Formatted date field: 2024/07/16
```

## List of built-in filters
| Name                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Arguments                                                                                                                                            |
|-----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `embed_url`           | Attempts to fetch the embed HTML for a provided URL using oEmbed. This uses the [wp_oembed_get](https://developer.wordpress.org/reference/functions/wp_oembed_get/) function.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                   |
| `file_url_by_id`      | Returns the URL to an attachment via its ID. Should be applied to a Media Field where the Field Value equals the Attachment ID. Uses the [wp_get_attachment_url](https://developer.wordpress.org/reference/functions/wp_get_attachment_url/) function.                                                                                                                                                                                                                                                                                                                                                                                                        | :heavy_minus_sign:                                                                                                                                   |
| `format_date`         | Outputs date and time in a specified format. If applied without arguments, the date will be output in the format set on the _**Settings -> General -> Date Format**_ page. Uses the [date_i18n](https://developer.wordpress.org/reference/functions/date_i18n/) function for formatting.                                                                                                                                                                                                                                                                                                                                                                      | Optional. [Date format](https://www.php.net/manual/en/datetime.format.php)                                                                           |
| `img_url_by_id`       | Returns the attachment URL or nothing if the image is not available. If the argument doesn't match any registered image size, the original image URL is returned. Uses the [wp_get_attachment_image_src](https://developer.wordpress.org/reference/functions/wp_get_attachment_image_src/) function.                                                                                                                                                                                                                                                                                                                                                          | Optional. Image size. Accepts any registered image size name, or an array of width and height values in pixels (in that order). Default 'thumbnail'. |
| `img_alt_by_id`       | Returns a descriptive string. It first checks if the item is valid and retrieves its ALT text. If the ALT text is unavailable, it fetches the attachment post and returns either the post excerpt or the post title as a fallback. If the item is invalid or no metadata is found, it returns an empty string or the item itself. Uses the [get_post_meta](https://developer.wordpress.org/reference/functions/get_post_meta/) and [get_post](https://developer.wordpress.org/reference/functions/get_post/) functions.                                                                                                                                       | :heavy_minus_sign:                                                                                                                                   |
| `img_gallery_grid`    | Processes a value, typically a comma-separated list of image IDs, and returns a gallery grid of those images. It first checks if the value is valid and splits it into an array of image IDs. If no image IDs are found, it returns an empty string. Uses the [wp_get_attachment_image](https://developer.wordpress.org/reference/functions/wp_get_attachment_image/) function.                                                                                                                                                                                                                                                                               | :heavy_minus_sign:                                                                                                                                   |
| `img_gallery_slider`  | Processes a given value, typically a comma-separated list of image IDs, and returns a slider gallery of those images. It first checks if the value is valid and splits it into an array of image IDs. If no image IDs are found, it returns an empty string. Uses the [wp_get_attachment_image](https://developer.wordpress.org/reference/functions/wp_get_attachment_image/) function.                                                                                                                                                                                                                                                                       | :heavy_minus_sign:                                                                                                                                   |
| `post_link_by_id`     | Generates a string representation of a WordPress post item, identified by its post ID, based on the specified format. If no format is specified and the action handler is in a loop, it determines the format by checking if the current Send Email action has Content Type= > HTML. It retrieves the item's URL and title using [get_permalink](https://developer.wordpress.org/reference/functions/get_permalink/) and [get_the_title](https://developer.wordpress.org/reference/functions/get_the_title/). Depending on the format, it either returns a plain text string with the title and URL or an HTML anchor tag with the title as a clickable link. | Optional. Can be `html` or `plain`. Default `plain`                                                                                                  |
| `post_title_by_id`    | Uses the [get_the_title](https://developer.wordpress.org/reference/functions/get_the_title/) function to retrieve and return the title of the specified post.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                   |
| `post_url_by_id`      | Uses the [get_permalink](https://developer.wordpress.org/reference/functions/get_permalink/) function to retrieve and return the URL of the specified post.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | :heavy_minus_sign:                                                                                                                                   |
| `render_acf_checkbox` | Processes an input value, typically an array, and returns a formatted string. If the value is either empty or not an array, it returns the original value. It takes an optional argument for the delimiter, defaulting to ", ". The method joins the array elements into a single string using the specified delimiter and sanitizes the resulting string with [wp_kses_post](https://developer.wordpress.org/reference/functions/wp_kses_post/) to ensure it is safe for output.                                                                                                                                                                             | Optional. Default `,`                                                                                                                                |
| `term_title_by_id`    | Processes a taxonomy term ID and returns the term name. It retrieves the term using the [get_term](https://developer.wordpress.org/reference/functions/get_term/) function. If the term retrieval results in an error or the term does not exist, it returns the term ID as a string.                                                                                                                                                                                                                                                                                                                                                                         | :heavy_minus_sign:                                                                                                                                   |
| `md5`                 | Takes a value and returns its MD5 hash. This method ensures that the input value is converted into a unique 32-character hexadecimal string using the [MD5 hashing algorithm](https://www.php.net/manual/en/function.md5.php). It is useful for creating a hashed version of the input value for purposes such as data integrity verification or creating unique identifiers.                                                                                                                                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                   |
| `user`                | Retrieves a specific property of a WordPress user based on their user ID. It takes the user ID as the input value and an optional property name as an argument, defaulting to "user_login". It fetches the user object using the provided user ID and returns the specified property. If the user is not found, it returns the original value. Uses the [WP_User::get](https://developer.wordpress.org/reference/classes/wp_user/get/) method.  

## Register custom filter for macros
[Go to the article](/03-jet-form-builder/common-use-cases/macros/register-filters.md).