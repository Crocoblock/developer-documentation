# JetFormBuilder - Відключення створення додаткових зображень

Цей код буде корисний, коли є задача пришвидшити обробку сабміту форми.
Ми виграємо по швидкості завдяки "відключенню" створення додаткових зображень різного розміру при додаванні аттачменту.
Тобто це допоможе, коли у вас є медіа поле(я) з увімкненою опцією "Insert attachment" 

> Трохи про те, [що таке аттачмент](https://developer.wordpress.org/themes/template-files-section/attachment-template-files/#:~:text=Attachments%20are%20a%20special%20post,post%20type%20%E2%80%93%20attachment%20template%20files.)

Наведений код впливає на обробку **кожного** зображення, доданого через форму JetFormBuilder. 

### Steps
- До `functions.php` вашої дочірньої теми додаємо [цей код](#PHP-Code).

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
