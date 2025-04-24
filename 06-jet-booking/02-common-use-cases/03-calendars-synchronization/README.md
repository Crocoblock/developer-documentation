## Calendars Synchronization
When using the synchronization functionality (automatic and/or manual), issues may arise with the date range, specifically with its alignment between the website and the booking service from which the bookings are synchronized. This problem is due to the specifics of each booking service, particularly how the calendar file that will be synchronized is generated.

The iCalendar format itself is universal, but some services may modify it for their specific use.

Starting from version 2.5.0 of the JetBooking plugin, global compatibility with Google Calendar was added, particularly with events (bookings) that are created for the whole day. In this case, it is necessary to subtract one day from the check-out date to maintain the correct booking period.

This happens because all-day events in Google Calendar and .ics files follow a certain format. When you create an all-day event in Google Calendar, for example from the 21st to the 23rd, it technically covers the full days of the 21st, 22nd, and 23rd. However, in the .ics file, the event may end on the 24th. This discrepancy is due to how all-day events are represented in the iCalendar (.ics) format. So, while it appears the event ends on the 24th, it actually ends at the start of that day, covering the full days of the 21st, 22nd, and 23rd as specified when the event was created. This is the standard way all-day events are represented in the iCalendar format.

This behavior could be avoided by specifying exact times when creating the event (booking) through Google Calendar, but this process is longer and requires careful time setup to correctly display the booking period.

Despite full compatibility with Google Calendar, issues started occurring with other booking services that gained popularity after the synchronization was declared compatible with them, provided they could generate a public iCalendar link. Specifically, these services may not have the same feature as Google Calendar and return a specific booking range that doesn't require additional processing. Alternatively, they may have their own features that could interfere with proper display on both sides and require additional value processing.

In such cases, for each individual booking that has a synchronization calendar, there is a hook jet-booking/ical/import/node, which can be used to modify booking elements individually. Here's an example:

As already mentioned, to ensure full compatibility with Google Calendar, one day is subtracted, but no check is performed for Google Calendar. Consequently, one day is subtracted for any synchronization, from any service. So, for example, if we synchronize calendars from several services (AirBnB, Google Calendar, and others), it’s not so important. However, with AirBnB, a booking comes with a date range from the 25th to the 28th, but on the website, it displays from the 25th to the 27th due to the global subtraction of one day. In this case, we can use the hook as follows:

```php
add_filter( 'jet-booking/ical/import/node', function( $import_node, $node, $calendar_object ) {
	$import_node['check_out_date'] = $import_node['check_out_date'] + DAY_IN_SECONDS;
	
	return $import_node;
}, 10, 3  );
```

Where `$import_node` is the list of properties of the booking element, $node is an object of the ZCiCalDataNode class, and `$calendar_object` is an object of the ZCiCal class. In this example, one day is added to the check-out date to compensate for the shift in the date range, thus resolving the issue for the AirBnB service. However, this hook also affects all booking elements for any synchronization, from any service, so problems arise with Google Calendar and its range, which becomes one day longer.

That is, problems in this case will continue to exist, unless it is known in advance that only one service will be used, or a few services that behave in the same way, in which case no issues will arise.

To solve this issue, a 4th parameter $calendar_url was added to the hook starting from version 3.5.0—this is the calendar URL used when setting up synchronization. With this parameter, you can check which calendar the synchronization is coming from and handle that calendar in a specific way. Using this parameter, we modify the previous example as follows:

```php
add_filter( 'jet-booking/ical/import/node', function( $import_node, $node, $calendar_object, $calendar_url ) {
    
    if ( 'https://www.airbnb.ca/calendar/ical/1017357857181884500.ics?s=3c60fbc2f08d5ba22e5707365e8e1496' === $calendar_url ) {
        $import_node['check_out_date'] = $import_node['check_out_date'] + DAY_IN_SECONDS;
    }
	
	return $import_node;
	
}, 10, 4  );
```

In this example, we check which calendar the synchronization is coming from and only perform modifications when the condition is met.
Thus, data from all the presented services will come through and be displayed correctly and consistently.