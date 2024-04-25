# JetBooking Export & Import Filter Hooks

## jet-booking/ical/ical-booking-data

Дозволяє контролювати список даних які будуть записані в файл експорту для кожного бронювання. Цей хук працює лише для даних
які будуть експортуватись за допомогою посилання календарів.

**Args:**
* `$data` - _array_ - Список даних який буде записано в файл експорту.
* `$booking` - _array_ - Список даних бронювання.
* `$calendar` - _object|ZCiCal_ - Об`єкт класу ZCiCal.

**Location:**
<a href="https://github.com/ZemezLab/jet-booking/blob/master/includes/ical.php">includes/ical.php</a>

**Access:** Global

**Example:**
```php
add_action( 'jet-booking/ical/ical-booking-data', function ( $data, $booking, $calendar ) {

	$booking['check_out_date'] += DAY_IN_SECONDS;
	$data['dtend']['value']    = \ZCiCal::fromSqlDateTime( date( 'Y-m-d', $booking['check_out_date'] ) );

	return $data;

}, 10, 3 );
```