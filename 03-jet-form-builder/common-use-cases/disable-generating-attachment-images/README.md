# JetFormBuilder - Disabling creation of additional images

This code will be useful when there is a need to speed up the form submission processing. We will gain speed by "disabling" the creation of additional images of different sizes when adding an attachment. 
So, this will help when you have media field(s) with the "Insert attachment" option enabled.

> A bit about what an attachment is [here](https://developer.wordpress.org/themes/template-files-section/attachment-template-files/#:~:text=Attachments%20are%20a%20special%20post,post%20type%20%E2%80%93%20attachment%20template%20files.)

The provided code affects the processing of **every image** added through the JetFormBuilder form.

### Steps
- Add [this code](#PHP-Code) to the `functions.php` of your child theme. 

### PHP Code
```php
add_filter(
    'jet-form-builder/request-handler/request',
    function ( array $request ): array {
        add_filter( 'intermediate_image_sizes_advanced', '__return_empty_array' );

        return $request;
    }
);
```
