# Booking Update Action via JetFormBuilder

Using JetFormBuilder, you can easily create a form that allows users to update existing bookings. This form can include fields for entering booking information such as status, dates, room type, etc.

To implement the booking update functionality, a new event responsible for this was created:

![Booking Update Action](/06-jet-booking/03-features/03-booking-update-action/assets/booking-update-action.png "Booking update action")

The event contains settings. `Booking ID` is a required field necessary for identifying the corresponding booking and comparing it with other bookings.

![Booking Update Action Settings](/06-jet-booking/03-features/03-booking-update-action/assets/booking-update-action-settings.png "Booking Update Action Settings")

All options in the event settings contain a selection of form fields that are associated with booking parameters.

### Creating a form to update bookings from JetEngine listing

In this case, the form can be used either directly in the booking listing or in a popup created using the JetPopups plugin. The listing itself should be created using the JetEngine Query Builder type of JetBooking Query.

When creating the form, make sure it includes a hidden field and a date field (Check in/out dates). In the hidden field, set its correct value by selecting `Current Booking ID`. This value is registered specifically for bookings that will be displayed using the method described above (in the listing using JetBooking Query).

Adding other fields is optional and depends on what the site owner wants to allow editing.

To get booking values into the corresponding fields before editing, presets are used.

![Booking Default Value Presets](/06-jet-booking/03-features/03-booking-update-action/assets/default-value-presets.png "Booking Default Value Presets")

In the presets, a new data source has been created specifically for editing bookings, regarding which the data fields for booking information will be displayed. In this case, you need to choose where the booking identifier will be taken from and also configure which data will be set.

In the case of using it in a listing, choose `Current Post` to take the booking data from the current listing item.

### Creating a form to update bookings in JetEngine Profile Builder

> For this method, it is not necessary to use JetEngine Profile Builder specifically; you can use another solution that will help replicate the necessary structure and links.

When creating the form, make sure it includes a hidden field and a date field (Check in/out dates). In the hidden field, set its correct value by selecting  `URL Query Variable` and in the additional field, specify the variable that will store the booking identifier value.

Adding other fields is optional and depends on what the site owner wants to allow editing.

To get booking values into the corresponding fields before editing, presets are used.

In this case, they are configured differently. In the field for obtaining the booking identifier, select `URL Query Variable` and in the additional field, specify the variable that will store the booking identifier value.

If you are creating a form with the ability to update the booking status, a special dynamic generator has been created for this case to obtain all possible booking statuses.

![Booking Get Status List](/06-jet-booking/03-features/03-booking-update-action/assets/generate-dynamically-bookings-status-list.png "Booking Get Status List")

Using the generator, you can get a formatted list with the value and name of all possible statuses. As shown in the image above, you can also specify the field name, but this is a specific parameter and must be set correctly to get more specific statuses. If it is empty, we will get all possible statuses.

The field itself can only accept 2 parameters: valid or invalid. It is possible to pass two parameters at once, but they must be separated by | (vertical bar). In this case, two types of statuses will be obtained. The order of specifying parameters is not important.