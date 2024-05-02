# Booking Cancellation

Booking cancellation functionality allows users to cancel bookings for scheduled activities. The booking cancellation feature aims to provide users with flexibility in managing their bookings and to ensure transparency and fairness in the cancellation process for both users and service providers.

The booking cancellation functionality is not enabled by default and requires activation. To activate it, you need to go to the booking settings in the advanced settings tab: **`Bookings -> Settings -> Advanced.`**

![Booking Cancellation Settings](/06-jet-booking/03-features/02-booking-cancellation/assets/booking-cancellation-settings.png "Booking Cancellation Settings")

On the advanced settings page, there are two cancellation setting options. The first one, Booking cancellation, is the main option responsible for enabling the cancellation functionality. Additionally, this option is responsible for displaying the next option.

`Cancellation deadline` is the option that determines a specific period of time before the booking start date during which users can cancel their booking. This functionality is often defined by the service provider and can vary depending on the nature of the booking. This option will only be displayed and will work if `Booking cancellation` is enabled.

The `Cancellation deadline` control is divided into two parts, where in the first field you need to select the quantity, and in the second field, the value corresponding to which calculations will be made. The minimum quantity that can be selected is 1.

> The above image shows a working setting where users are allowed to cancel bookings one week before the booking start date.

Regarding the cancellation process itself, it is implemented using a special link that contains relevant parameters responsible for retrieving the associated booking and modifying it accordingly.

Cancellation links can be obtained in several ways.

The first way is possible only if you have the WooCommerce plugin activated on your site. More about this can be found [here](/06-jet-booking/03-features/01-booking-list-in-wc-my-account-page). Under these conditions and cancellation settings, lists of client bookings will be displayed in a special bookings endpoint if the booking can be canceled, and a cancellation button will be available in the last column.

After clicking the cancel button, a cancellation confirmation window will appear, which serves to prevent clients from accidentally canceling their booking, as after cancellation, they will have to create a new booking from scratch or contact service administrators to restore the booking without the possibility of further cancellation.

![Booking Cancellation Confirmation Window](/06-jet-booking/03-features/02-booking-cancellation/assets/booking-cancel-confirmation.png "Booking cancellation confirmation window")

Upon confirmation of the cancellation, the user will be redirected to the initial account page, and a message will be displayed indicating the status of the operation. Currently, there are only two statuses: if an error occurs, a message about it will be displayed, and the booking will not be canceled, and a message about successful cancellation, respectively, the canceled booking will have a new status.

![Booking Cancellation WoCommerce Notice](/06-jet-booking/03-features/02-booking-cancellation/assets/booking-cancel-notice.png "Message after cancellation")

All relevant changes will be displayed in the bookings list endpoint.

The second way to obtain cancellation links is implemented through the Dynamic Link widget of the JetEngine plugin, so to use this functionality, you will need to install the JetEngine plugin.

![Booking Cancellation with Dynamic Link Widget](/06-jet-booking/03-features/02-booking-cancellation/assets/dynamic-link-widget-cancel-source.png "Booking cancellation with dynamic link widget")

In the link source control, the JetBooking group presents the corresponding option for cancellation. When selecting this option, an additional control for setting the redirect address after cancellation will also be displayed. In this control, you can, for example, insert a link to a page specifically made for booking cancellation, which will display a message about it. By default, the redirection will be done to the home page of the site, and you can also use macros to get the redirection link.

> Dynamic cancellation links will only work in a listing created using the custom JetBooking Query.
 
The cancellation link widget will be displayed in all listing items, and in items where cancellation is not possible, the links will lead to the current page where the listing is displayed. To prevent this process and eliminate this drawback, a dynamic condition was implemented, which checks the possibility of canceling the booking and, if such a possibility exists, will display the element to which the condition is attached.

![Booking Cancellation Dynamic Visibility](/06-jet-booking/03-features/02-booking-cancellation/assets/dynamic-visibility-for-booking-cancellation.png "Booking cancellation dynamic visibility")

The cancellation process itself occurs in the same way as on the account page. That is, a confirmation window will be displayed, and only after confirmation will the cancellation process be initiated.

`> Messages as in the case of a WooCommerce account may not be displayed; this will depend on the activity of the WooCommerce plugin and the redirection after cancellation to the WooCommerce-related page.

> The second way to get cancellation links and configure dynamic conditions, despite the demonstration in the Elementor editor, can be implemented both using Gutenberg and Bricks.