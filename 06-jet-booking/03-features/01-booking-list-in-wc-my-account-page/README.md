# Booking List in the WooCommerce My Account Page

This section provides an overview of the functionality available for displaying a list of bookings on the WooCommerce account page.

This functionality will work regardless of the booking method (Booking Mode - WooCommerce Based) and the enabled integration (Booking Mode - Plain and WooCommerce Integration). That is, if the WooCommerce and JetBooking plugins are activated on the site, an additional menu item will be displayed on the account page, which can be used to access the bookings list endpoint.

![WooCommerce my account booking lists](/06-jet-booking/03-features/01-booking-list-in-wc-my-account-page/assets/wc-my-account-booking-lists.png "Booking listings on WooCommerce account page")

The endpoint will be named `jet-bookings`, but if necessary, it can be changed using a hook to something else depending on the requirements:

```php
// Change the endpoint name.
add_filter( 'jet-booking/wc-integration/myaccount/endpoint', function() {
	return 'bookings';
} );
```

> The current functionality will work correctly only for bookings created after updating to plugin version 3.3.0. 
> Bookings that have already been created will not be automatically synchronized with this functionality. Synchronization possibilities will be available 
> only through custom code, where each case can be unique and will only be possible if certain data is provided for the synchronization of bookings and users (additional database columns are created to store user data, such as email, phone, or user ID).

For this functionality, an additional column for the user ID `user_id` was also added to the database table. This column will be automatically added to the table after updating the plugin. For new sites, it will also be added when creating new database tables.

Bookings will be divided into 3 types: those that have already occurred, those scheduled for today, and those scheduled for the future. The data displayed in these tables corresponds to the data of the bookings table in the admin panel (only units are not displayed) and is sorted in the same way without the ability to filter.

By default, each of the tables will display 10 bookings on one page. This parameter can be changed using a hook:


```php
// Change the number of bookings per page.
add_filter( 'jet-booking/wc-integration/myaccount/bookings-per-page', function() {
	return 5;
} );
```

If the number of bookings exceeds the specified number, pagination has been added to each table, allowing you to view all bookings.

> An important nuance: each pagination, regardless of which table it is attached to, switches the endpoint page, 
> thereby switching all tables to a new page.

The `Instance` column will display the name of the booked post with a link that will take you to the page of that post.

The `Order` column will contain the order identifier. If this order was created using WooCommerce, it will be presented as a link that will take you to the corresponding order on the account page.

For the check-in and check-out date columns, the date formatting specified in the site settings **`Settings -> General -> Date Format`** is used.

The last column is reserved for the booking cancellation button, which will be available if the corresponding setting is enabled and the booking meets all the conditions for cancellation, along with the corresponding button image. More details about this functionality can be found [here](/06-jet-booking/03-features/02-booking-cancellation).


