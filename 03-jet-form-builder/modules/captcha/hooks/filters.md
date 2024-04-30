## Table of Contents

* [`jet-form-builder/h-captcha/options`](#jet-form-builderh-captchaoptions)
* [`jet-form-builder/h-captcha/url`](#jet-form-builderh-captchaurl)
* [`jet-form-builder/turnstile/options`](#jet-form-builderturnstileoptions)
* [`jet-form-builder/turnstile/url`](#jet-form-builderturnstileurl)

## `jet-form-builder/captcha/types`
This filter allows modification of the captcha types available within the JetFormBuilder plugin.

### Parameters
- **$types [`\JFB_Modules\Captcha\Abstract_Captcha\Base_Captcha[]`](https://github.com/Crocoblock/jetformbuilder/modules/captcha/abstract-captcha/base-captcha.php)**: An array of captcha types.

### Usage

```php
add_filter( 'jet-form-builder/captcha/types', function( $types ) {
    // Modify $types as needed
    return $types;
});
```

### Source
https://github.com/Crocoblock/jetformbuilder/modules/captcha/module.php

---

## `jet-form-builder/friendly-captcha/options`
This filter is used to modify the options for the Friendly Captcha implementation.

### Parameters
- **$options (array)**: An array of options for Friendly Captcha.
    - **sitekey (string)**: It can be found on the page listing your Applications. (https://docs.friendlycaptcha.com/#/installation?id=_1-generating-a-sitekey) 
    
### Usage

```php
add_filter( 'jet-form-builder/friendly-captcha/options', function( $options ) {
    $options['sitekey'] = 'your_site_key';

    return $options;
});
```

### Source
https://github.com/Crocoblock/jetformbuilder/modules/captcha/friendly-captcha/friendly-captcha.php


## `jet-form-builder/h-captcha/options`
This filter is used to modify the options for the hCaptcha implementation.

### Parameters
- **$options (array)**: An array of options for hCaptcha.
    - **sitekey (string)**: You can find it on this page in the first column of Sitekey. (https://dashboard.hcaptcha.com/sites)

### Usage

```php
add_filter( 'jet-form-builder/h-captcha/options', function( $options ) {
    $options['sitekey'] = 'your_site_key';

    return $options;
});
```

### Source
https://github.com/Crocoblock/jetformbuilder/modules/captcha/hcaptcha/hcaptcha.php


## `jet-form-builder/h-captcha/url`
This filter allows changing the URL used for hCaptcha.

By default, used: `https://js.hcaptcha.com/1/api.js?onload=jfbHCaptchaOnLoad&render=explicit`

More info about available query arguments: https://docs.hcaptcha.com/configuration/

**Warning!** Please keep `onload` query arg with the same value. 

### Parameters
- **$url (string)**: The URL for hCaptcha.

### Usage

```php
add_filter( 'jet-form-builder/h-captcha/url', function( $url ) {
    // Modify $url as needed
    return $url;
});
```

### Source
https://github.com/Crocoblock/jetformbuilder/modules/captcha/hcaptcha/hcaptcha.php


## `jet-form-builder/turnstile/options`
Modify the options for the Turnstile captcha implementation.

### Parameters
- **$options (array)**: An array of options for Turnstile captcha.
    - **sitekey (string)**: You can find both keys on your Turnstile Site settings page (https://developers.cloudflare.com/turnstile/get-started/#get-a-sitekey-and-secret-key)
    - **action (string)**: By default - `jet_form_builder_captcha__{form_id}`

### Usage

```php
add_filter( 'jet-form-builder/turnstile/options', function ( $options ) {
	$options['sitekey'] = 'your_site_key';
	$options['action']  = 'your_action__' . jet_fb_live()->form_id;

	return $options;
} );
```

### Source
https://github.com/Crocoblock/jetformbuilder/modules/captcha/turnstile/turnstile.php


## `jet-form-builder/turnstile/url`
This filter allows the modification of the URL used for Turnstile captcha.

By default, used: `https://challenges.cloudflare.com/turnstile/v0/api.js?onload=jfbTurnstileOnLoad&render=explicit`

More info about available query arguments: https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/

**Warning!** Please keep `onload` query arg with the same value.

### Parameters
- **$url (string)**: The URL for Turnstile captcha.

### Usage

```php
add_filter( 'jet-form-builder/turnstile/url', function( $url ) {
    // Modify $url as needed
    return $url;
});
```

### Source
https://github.com/Crocoblock/jetformbuilder/modules/captcha/turnstile/turnstile.php

