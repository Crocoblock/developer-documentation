# Calendar Configuration API

## Filter `jet-booking.input.config`

Allows to change initial set up of booking calendar. Usage example:

```js
window.JetPlugins.hooks.addFilter( "jet-booking.input.config", "jetBooking", ( config ) => {

	const validateDay = config.beforeShowDay;

	config.beforeShowDay = function( t ) {

		let day = moment( t );
		let value = jQuery( "[data-field-name=\'_capacity\']:checked" ).val();
		let availableDays = [ 5 ];

		if ( 7 == value ) {
			availableDays.push( 2 );
		}

		if ( ! availableDays.includes( day.day() ) ) {
			return [ false, "", "Not available" ];
		} else {
			return validateDay( t );
		}

	}

	return config;
	
} );
```

To work correctly this code should be added after `booking-init.js` file with JetBookin calendar initialization is loaded.

This hook can also be used for initial set up of booking calendar in the admin panel. To work it correctly this code should be added after `bookings.js` file and window load event.

## Available config options:

- `format` __(String)__ <br>
  &emsp;&emsp;&emsp;&emsp;_The date format string used for Moment.<br>
  &emsp;&emsp;&emsp;&emsp;Click [here](https://momentjs.com/docs/#/displaying/format/) to see Moment documentation._

- `separator` __(String)__<br>
  &emsp;&emsp;&emsp;&emsp;_The separator string used between date strings._

- `language` __(String)__<br>
  &emsp;&emsp;&emsp;&emsp;_Pre-defined languages are "en" and "cn", you can define your own<br>
  &emsp;&emsp;&emsp;&emsp;language then set this to the name of new language.<br>
  &emsp;&emsp;&emsp;&emsp;You can also set this to "auto" to make it auto detect browser language._

- `startOfWeek` __(String)__<br>
  &emsp;&emsp;&emsp;&emsp;_"sunday" or "monday"_

- `getValue` __(Function)__<br>
  &emsp;&emsp;&emsp;&emsp;_This function is called when get date range string from DOM.<br>
  &emsp;&emsp;&emsp;&emsp;When it is called, the context of this function is set to the datepicker DOM._

- `setValue` __(Function)__<br>
  &emsp;&emsp;&emsp;&emsp;_This function is called when set date range string to DOM._

- `startDate` __(String or false)__<br>
  &emsp;&emsp;&emsp;&emsp;_This string defines the earliest date which is allowed for the user, same format as `format`._

- `endDate` __(String or false)__<br>
  &emsp;&emsp;&emsp;&emsp;_This string defines the latest date which is allowed for the user, same format as `format`._

- `minDays` __(Number)__<br>
  &emsp;&emsp;&emsp;&emsp;_This number defines the minimum days of the selected range<br>
  &emsp;&emsp;&emsp;&emsp;if this is 0, means do not limit minimum days._

- `maxDays` __(Number)__<br>
  &emsp;&emsp;&emsp;&emsp;_This number defines the maximum days of the selected range<br>
  &emsp;&emsp;&emsp;&emsp;if this is 0, means do not limit maximum days._

- `showShortcuts` __(Boolean)__<br>
  &emsp;&emsp;&emsp;&emsp;_Hide or show shortcuts area._

- `shortcuts` __(Object)__<br>
  &emsp;&emsp;&emsp;&emsp;_Define the shortcuts buttons. there are some built in shortcuts, see source code._

- `time` __(Object)__<br>
  &emsp;&emsp;&emsp;&emsp;_If enabled adds time selection controls._

- `customShortcuts` __(Array)__<br>
  &emsp;&emsp;&emsp;&emsp;_Define custom shortcut buttons._

- `inline` __(Boolean)__<br>
  &emsp;&emsp;&emsp;&emsp;_Whether to render the date range picker dom in inline mode instead of overlay mode,<br>
  &emsp;&emsp;&emsp;&emsp;if set to true, please set `container` too._

- `container` __(String, CSS selector || DOM Object)__<br>
  &emsp;&emsp;&emsp;&emsp;_Where should the date range picker dom should be renderred to._

- `alwaysOpen` __(Boolean)__<br>
  &emsp;&emsp;&emsp;&emsp;_If you use inline mode, you may want the date range picker widget to be renderred when the page loads<br>
  &emsp;&emsp;&emsp;&emsp;set this to true will also hide the "close" button._

- `singleDate` __(Boolean)__<br>
  &emsp;&emsp;&emsp;&emsp;_Choose a single date instead of a date range. If `singleMonth` option is set to true it will show<br>
  &emsp;&emsp;&emsp;&emsp;only one month instead of two months._

- `batchMode` __(false / 'week' / 'month')__<br>
  &emsp;&emsp;&emsp;&emsp;_Auto batch select mode <br>
  &emsp;&emsp;&emsp;&emsp;false (default), week, month, week-range, month-range._

- `beforeShowDay` __(Function)__<br>
  &emsp;&emsp;&emsp;&emsp;A function that takes a date as a parameter and must return an array with:<br>
  &emsp;&emsp;&emsp;&emsp;[0]: true/false indicating whether or not this date is selectable<br>
  &emsp;&emsp;&emsp;&emsp;[1]: a CSS class name to add to the date's cell or "" for the default presentation<br>
  &emsp;&emsp;&emsp;&emsp;[2]: an optional popup tooltip for this date<br>
  &emsp;&emsp;&emsp;&emsp;The function is called for each day in the datepicker before it is displayed.

- `stickyMonths` __(Boolean)__<br>
  &emsp;&emsp;&emsp;&emsp;_If true, there will only be one previous and one next button. Clicking them will change<br>
  &emsp;&emsp;&emsp;&emsp;both the months. This setting will have no effect if singleDate option is set to true._

- `singleMonth` __(Boolean || 'auto') Default value: 'auto'__<br>
  &emsp;&emsp;&emsp;&emsp;_If true, it will show only one month instead of two months. You can select date range<br>
  &emsp;&emsp;&emsp;&emsp;in the one month view. If this is set to 'auto', it will be changed to true if the screen width<br>
  &emsp;&emsp;&emsp;&emsp;is lower than 480._<br>

- `showDateFilter` __( Function(Int time, Int date) )__<br>
  &emsp;&emsp;&emsp;&emsp;_This is a callback function when creating each date element in the calendar. First paramter will<br>
  &emsp;&emsp;&emsp;&emsp;be the timestamp of that day. Second parameter will be the date of that month._

- `customTopBar` __( Function || String)__<br>
  &emsp;&emsp;&emsp;&emsp;_If you set this parameter, it will use this value in the top bar._

- `extraClass` __(String)__<br>
  &emsp;&emsp;&emsp;&emsp;_Set extra class name to the date range picker dom._

- `customArrowPrevSymbol` __(String / String HTML)__<br>
  &emsp;&emsp;&emsp;&emsp;_Set custom previous symbol, you can use html snippet too._

- `customArrowNextSymbol` __(String / String HTML)__<br>
  &emsp;&emsp;&emsp;&emsp;_Set custom next symbol, you can use html snippet too._

- `showTopbar` __(Boolean)__<br>
  &emsp;&emsp;&emsp;&emsp;_If show the top bar._

- `swapTime` __(Boolean)__<br>
  &emsp;&emsp;&emsp;&emsp;_If true and if time is enabled, on choosing first enddate and than startdate,<br>
  &emsp;&emsp;&emsp;&emsp; endtime and starttime will be swapped.<br>
  &emsp;&emsp;&emsp;&emsp;If this configkey is false, only date will be swapped, time will stay constant.<br>
  &emsp;&emsp;&emsp;&emsp;If time is disabled, this config key is not used._

- `selectForward` __(Boolean) Default: false__<br>
  &emsp;&emsp;&emsp;&emsp;_If this is true, you can only select second date after the first selected date._

- `selectBackward` __(Boolean) Default: false__<br>
  &emsp;&emsp;&emsp;&emsp;_If this is true, you can only select second date before the first selected date._

- `showWeekNumbers` __(Boolean) Default: false__<br>
  &emsp;&emsp;&emsp;&emsp;_If this is true, it will show week number of the year in the calendar._

- `getWeekNumber` __(Function( Date object ) )__<br>
  &emsp;&emsp;&emsp;&emsp;_The function called to generate the week number. the first parameter will be the first day of a week._

- `monthSelect` __(Boolean) Default: false__<br>
  &emsp;&emsp;&emsp;&emsp;_If this is true, you can quickly change month by clicking on month name._

- `yearSelect` __(Boolean || Array || Function) Default: false__<br>
  &emsp;&emsp;&emsp;&emsp;_If this is true, you can quickly change year by clicking on year number.<br>
  &emsp;&emsp;&emsp;&emsp;By default select will contain years from "current year - 5" to "current year + 5" but you can change this.<br>
  &emsp;&emsp;&emsp;&emsp;You can set year range by array like this [1900, 2017].<br>
  &emsp;&emsp;&emsp;&emsp;And if you want more control you can set function which get selected year and should return array. <br>
  &emsp;&emsp;&emsp;&emsp;For example:_<br>
```js
function( current ) {
	return [ current - 10, current + 10 ];
}
```

## Filter `jet-booking.calendar.config`

Allows to change initial set up of booking calendar widget. Works similar to `jet-booking.input.config`.

## Filter `jet-booking.apartment-price`

Allows to change %ADVANCED_PRICE% macros apartment price result.

## Filter `jet-booking.date-range-picker.date-show-params`

Allows to change dates parameters before showing them.

## Filter `jet-booking.date-range-picker.disabled-day`

Allows to change the behavior of disabled dates.

## Trigger `jet-booking/init`

Fires when all JetBooking-realted JS handlers are attached. Example of usage:

```js
jQuery( document ).on( 'jet-booking/init', () => {
	console.log( 'JetBooking initialized' );
} );
```

## Trigger `jet-booking/init-field`

Fires after Check In/Check Out field inside booking form initialized. Usage example:

```js
jQuery( document ).on( "jet-booking/init-field", ( $event, $field ) => {
	$field.bind( "datepicker-first-date-selected", ( event, obj ) => {
		$field.data( "dateRangePicker" ).setEnd( moment( obj.date1 ).add( 7, "d" ).format( "YYYY-MM-DD" ) );
	} );
} );
```

## Trigger `jet-booking/init-calendar`

Fires after Check In/Check Out field inside booking form initialized. Usage example:

Works the same way as previous. Only difference - triggers on Booking Calendar widget initialization. Usage example also will be the same, just accepts appropriate calendar element as second argument:

```js
jQuery( document ).on( "jet-booking/init-calendar", ( $event, $calendar ) => {
	$calendar.bind( "datepicker-first-date-selected", ( event, obj ) => {
		$calendar.data( "dateRangePicker" ).setEnd( moment( obj.date1 ).add( 7, "d" ).format( "YYYY-MM-DD" ) );
	} );
} );
```

## Available events for the last 2 triggers:

- `datepicker-first-date-selected` - This event will be triggered when first date is selected
```js
$el.dateRangePicker().bind( 'datepicker-first-date-selected', ( event, obj ) => {
	console.log(obj);
	// obj will be something like this:
	// {
	// 		date1: (Date object of the earlier date)
	// }
} );
```
- `datepicker-change` - This event will be triggered when second date is selected
```js
$el.dateRangePicker().bind('datepicker-change',( event, obj ) => {
	console.log(obj);
	// obj will be something like this:
	// {
	// 		date1: (Date object of the earlier date),
	// 		date2: (Date object of the later date),
	//	 	value: "2013-06-05 to 2013-06-07"
	// }
});
```
- `datepicker-apply` - This event will be triggered when user clicks on the apply button
```js
$el.dateRangePicker().bind('datepicker-apply', ( event, obj ) => {
	console.log(obj);
})
```
- `datepicker-close` - This event will be triggered before date range picker close animation
```js
$el.dateRangePicker().bind( 'datepicker-close', () => {
	console.log('before close');
})
```
- `datepicker-closed` - This event will be triggered after date range picker close animation
```js
$el.dateRangePicker().bind('datepicker-closed', () => {
	console.log('after close');
})
```
- `datepicker-open` - This event will be triggered before date range picker open animation
```js
$el.dateRangePicker().bind( 'datepicker-open', () => {
	console.log('before open');
})
```
- `datepicker-opened` - This event will be triggered after date range picker open animation
```js
$el.dateRangePicker().bind( 'datepicker-opened', () => {
	console.log('after open');
})
```

## Available methods for the last 2 triggers:

- `setDateRange` - set dates range. Two date strings should follow the `format` in config object. Set the third argument to be `true` if you don't want this method to trigger a `datepicker-change` event.
- `setStart` - set the start date to the specified date. Date string should follow the `format` in config object.
- `setEnd` - set the end date to the specified date. Set the second argument to `true` if you don't want this method to trigger a `datepicker-change` event.
- `clear` - clear date range.
- `close` - close date range picker overlay.
- `open` - open date range picker overlay.
- `resetMonthsView` - reset to default months.
- `destroy` - destroy all date range picker related things.

__Example:__
```js
$el.data('dateRangePicker').setDateRange('2013-11-20','2013-11-25');
$el.data('dateRangePicker').setStart('2013-11-20');
$el.data('dateRangePicker').setEnd('2013-11-25');
$el.data('dateRangePicker').clear();
```

## Deprecation
Starting with version 2.6.3 of the JetBookign plugin, an updated system of JS Hooks was introduced. Deprecated hooks will still work fine, but a comment will be placed in the code mentioning the deprecation.

If you are a developer who extends JetBookign please review the below changes to keep your plugin up and running.

```js
window.jetBookingState.filters.add( "jet-booking/input/config", ( config ) => {} );
```
Replaced by:
```js
window.JetPlugins.hooks.addFilter( "jet-booking.input.config", "jetBooking", ( config ) => {} );
```
---
```js
window.jetBookingState.filters.add( "jet-booking/calendar/config", ( config ) => {} );
```
Replaced by:
```js
window.JetPlugins.hooks.addFilter( "jet-booking.calendar.config", "jetBooking", ( config ) => {} );
```
---
```js
window.jetBookingState.filters.add( "jet-booking/apartment-price", ( price, field ) => {} );
```
Replaced by:
```js
window.JetPlugins.hooks.addFilter( "jet-booking.apartment-price", "jetBooking", ( price, field ) => {} );
```