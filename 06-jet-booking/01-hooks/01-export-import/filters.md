# JetBooking Export & Import Filter Hooks

## jet-booking/ical/ical-booking-data

Allows controlling the list of data that will be written to the export file for each booking. This hook works only for data that will be exported using calendar links.

**Args:**
* `$data` - _array_ - The list of data that will be written to the export file.
* `$booking` - _array_ - The list of booking data.
* `$calendar` - _object|ZCiCal_ - An object of the ZCiCal class.

**Location:**
includes/ical.php

**Access:** Global

**Example:**
```php
add_action( 'jet-booking/ical/ical-booking-data', function ( $data, $booking, $calendar ) {

	$booking['check_out_date'] += DAY_IN_SECONDS;
	$data['dtend']['value']    = \ZCiCal::fromSqlDateTime( date( 'Y-m-d', $booking['check_out_date'] ) );

	return $data;

}, 10, 3 );
```