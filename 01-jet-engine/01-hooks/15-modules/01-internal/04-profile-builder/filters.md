# JetEngine. Profile Builder. Filters.

## jet-engine/profile-builder/settings/template-sources

Allows registering new CPTs for use as templates for Profile pages.

**Args:**
- `$sources` - List of sources in the format `cpt-slug => CPT Label`. The CPT Label will be used to further identify posts from this CPT in search results. cpt-slug will be used directly for searching.

**Location:**
/includes/modules/profile-builder/inc/settings.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/profile-builder/settings/template-sources', function( $sources ) {
	$sources['elementor_library'] = __( 'Elementor Template', 'jet-engine' );
	return $sources;
} );
```

## jet-engine/profile-builder/create-template/{$template_source}

Allows adding processing for creating templates for the profile builder for custom sources registered through the `jet-engine/profile-builder/settings/template-sources filter`. The dynamic part `{$template_source}` must match the slug of your source and is used to separate the processing of different sources. The callback must return the result in the following format:
```php
return [
	'template_url' => $url, // URL of edit page for created template.
	'template_id'  => $template_id, // Created template ID.
];
```

**Args:**
- `$result` - Variable to save the result and return.
- `$template_name` -  The name of the new template entered by the user in the interface.
- `$template_view` - Additional parameter with the listing view selected by the user, only relevant for the Listing source.

**Location:**
/includes/modules/profile-builder/inc/settings.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/profile-builder/create-template/elementor_library', function( $result = [], $template_name = '' ) {
	
	if ( ! $template_name ) {
		return $result;
	}

	$template_id = wp_insert_post( [
		'post_title' => $template_name,
		'post_type'   => 'elementor_library',
		'post_status' => 'publish',
	] );

	if ( ! $template_id ) {
		return $result;
	}

	update_post_meta(
		$template_id,
		'_elementor_source',
		'post'
	);

	$document = \Elementor\Plugin::instance()->documents->get( $template_id );

	$template_url = ( $document ) ? $document->get_edit_url() : add_query_arg( [ 
		'post'   => $template_id,
		'action' => 'elementor' 
	], admin_url( 'post.php' ) );

	return [
		'template_url' => $template_url,
		'template_id'  => $template_id,
	];
}, 10, 2 );
```

## jet-engine/profile-builder/subpage-url

Allows changing or adding parameters to the URL of subpages in the profile builder.

**Args:**
- `$url` - Default URL.
- `$slug` - Subpage slug.
- `$page` - page type - The user's account. 
- `$page_data` - Additional arguments of the current subpage.
- `$settings_instance` - Instance of the Settings class.

**Location:**
/includes/modules/profile-builder/inc/settings.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/profile-builder/subpage-url', function( $url, $slug, $parent_page, $page_data, $settings ) {
	
	if ( 'my-slug' === $slug ) {
		$url = add_query_arg( [ 'my_param' => 1 ], $url );
	}

	return $url;
}, 10, 5 );
```

More advanced example - https://gist.github.com/Crocoblock/7669eb507cb3742836bbec67fc908eef#file-custom-profile-builder-rewrite-php-L37-L52

## jet-engine/profile-builder/rewrite-rules

Allows adding custom rewrite rules for the URLs processing. This allows modifying the structure of Profile Builder URLs. If you need to completely change the format of these URLs, use this filter in conjunction with `jet-engine/profile-builder/subpage-url` to change not only the URL processing but also their generation (more detailed example at the link below).

**Args:**
- `$rewrite_rules` - Default list of rewrite rules for the profile builder.
- `$rewrite_instance` - Instance of the Rewrite class.

**Location:**
/includes/modules/profile-builder/inc/rewrite.php

**Access:**
Global

**Example:**

https://gist.github.com/Crocoblock/7669eb507cb3742836bbec67fc908eef#file-custom-profile-builder-rewrite-php-L8-L34

## jet-engine/profile-builder/render/profile-menu-items

This filter allows changing/adding/removing items from the profile builder menu, generated for display on the frontend. For example, the profile builder itself uses this filter to separate the menu structure by user roles if configured to do so.

**Args:**
- `$items` - array - Profile builder menu items for use on the frontend.
- `$args` - array - Additional arguments received from the widget that is rendering this menu on the frontend.

**Location:**
/includes/modules/profile-builder/inc/menu.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/profile-builder/render/profile-menu-items', function( $items, $args ) {

	if ( empty( $args['menu_context'] ) || 'account_page' === $args['menu_context'] ) {
		foreach ( $items as $index => $item ) {
			if ( 
				! empty( $item['slug'] )
				&& 'admin-settings' === $item['slug']
				&& ! current_user_can( 'manage_options' )
			) {
				unset( $items[ $index ] );
			}
		}
	}

	return $items;
} );
```

## jet-engine/profile-builder/render/profile-menu-item

This filter allows changing the HTML of the generated menu item.

**Args:**
- `$item_html` - string - The HTML markup of the current menu item generated by the Profile Builder.
- `$item` - array - Profile builder menu items for use on the frontend.
- `$args` - array - Additional arguments received from the widget that is rendering this menu on the frontend.

**Location:**
/includes/modules/profile-builder/inc/menu.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/profile-builder/render/profile-menu-item', function( $item_html = '', $item = [], $args = [] ) {
	if ( 'admin-settings' === $item['slug'] ) {
		$item_html = str_replace( '</a>', '<i class="my-admin-settings-icon"></i></a>', $item_html );
	}
	return $item_html;
}, 10, 3 );
```

## jet-engine/profile-builder/query/pre-get-queried-user

The filter allows

**Args:**
- `$user` - null - By default, the value is empty. If you return your own user object, it will be used instead of the default.

**Location:**
/includes/modules/profile-builder/inc/query.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/profile-builder/query/pre-get-queried-user', function( $user ) {

	if ( current_user_can( 'manage_options' ) && ! empty( $_GET['replace_user'] ) ) {
		$user = get_user_by( 'ID', absint( $_GET['replace_user'] ) );
	}

	return $user;
} );
```

## jet-engine/profile-builder/template-id

This filter allows changing the ID of the profile builder template directly before it is rendered. It can be used, for example, for translations, to replace the default ID with a translated one.

**Args:**
- `$template_id` - int - The ID of the template received from the profile builder.

**Location:**
/includes/modules/profile-builder/inc/frontend.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/profile-builder/template-id', function( $template_id ) {
	
	global $sitepress;

	$obj_type = get_post_type( $template_id );
	$new_id = $sitepress->get_object_id( $template_id, $obj_type );

	if ( $new_id ) {
		return $new_id;
	}

	return $template_id;
} );
```

## jet-engine/profile-builder/template/content

Allows rendering content

**Args:**
- `$content` - string - Default content.
- `$template_id` - int - The ID of the template received from the profile builder.
- `$frontend_instance` - object - Instance of the Frontend class.
- `$template` - WP_Post - Full object of the current template.

**Location:**
/includes/modules/profile-builder/inc/frontend.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/profile-builder/template/content', function( $content, $template_id, $frontend, $template ) {

	if ( ! 'elementor_library' === $template->post_type ) {
		return $content;
	}
	
	$elementor_content = \Elementor\Plugin::instance()->frontend->get_builder_content( $template_id );

	if ( $elementor_content ) {
		return $elementor_content;
	}

	return $content;
}, 10, 4 );
```

## jet-engine/profile-builder/not-logged-redirect-query-args

This filter allows adding arguments to the URL to which non-logged-in users will be redirected.

**Args:**
- `$query_args` - array - The list of arguments to be added to the URL.

**Location:**
/includes/modules/profile-builder/inc/access.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/profile-builder/not-logged-redirect-query-args', function( $args ) {
	$args['error'] = 'not_logged_in';
	retrun $args;
} );
```

## jet-engine/profile-builder/check-user-access

This filter allows adding additional checks - whether the user has access to the current profile page.

**Args:**
- `$has_access` - bool - list of contexts for profile pages.
- `$profile_builder` - object - object with an instance of the profile builder 

**Location:**
/includes/modules/profile-builder/inc/access.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/profile-builder/check-user-access', function( $result ) {
	
	if ( current_user_can( 'manage_options' ) ) {
		$result = true;
	}

	retrun $result;
} );
```

## jet-engine/profile-builder/not-accessible-redireсt-query-args

This filter allows adding arguments to the URL to which the user will be redirected if they do not have access to the current profile page.

**Args:**
- `$query_args` - array - The list of arguments to be added to the URL.

**Location:**
/includes/modules/profile-builder/inc/access.php

**Access:**
Global

**Example:**

```php
add_filter( 'jet-engine/profile-builder/not-accessible-redireсt-query-args', function( $args ) {
	$args['error'] = 'access_denied';
	retrun $args;
} );
```