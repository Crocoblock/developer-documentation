# JetEngine. Maps Listings. JS hooks
- [JetEngine. Maps Listings. JS hooks](#jetengine-maps-listings-js-hooks)
  - [JS events](#js-events)
    - [jet-engine/maps/update-sync-bounds](#jet-enginemapsupdate-sync-bounds)
  - [jQuery triggers](#jquery-triggers)
    - [jet-engine/frontend-maps/loaded](#jet-enginefrontend-mapsloaded)
    - [jet-engine/frontend-maps/user-position/update](#jet-enginefrontend-mapsuser-positionupdate)
    - [jet-engine/frontend-maps/user-position/error](#jet-enginefrontend-mapsuser-positionerror)

## JS events

### jet-engine/maps/update-sync-bounds

An event that fires when the zoom / center of the map has changed (i.e. the user has changed the map scale or moved to another location).
The object passed to detail is:
```js
{
    div: mapDiv,
    bounds: bounds,
    map: map,
    mapProvider: mapProvider
}
```

**Args**
- div - div containing the map
- bounds - object containing the coordinates of the current map boundaries, for example:
```js
{
    "east": 31.98230087757111,
    "north": 46.97343357093276,
    "south": 46.9690409789227,
    "west": 31.97650730609894
}
```
- mapProvider - JetEngineMapsProvider, один з \
includes/modules/maps-listings/assets/js/public/google-maps.js \
includes/modules/maps-listings/assets/js/public/leaflet-maps.js \
includes/modules/maps-listings/assets/js/public/mapbox-maps.js

**Location**
includes/modules/maps-listings/assets/js/frontend-maps.js

**Example**:

```js
document.addEventListener( 'jet-engine/maps/update-sync-bounds', function( e ) {
    const detail = e.detail;
    console.log( detail );
} );
```

## jQuery triggers

### jet-engine/frontend-maps/loaded

Fires when all the scripts necessary for the operation of the Map Listings module widgets have been executed.

**Location**
includes/modules/maps-listings/assets/js/frontend-maps.js

**Example**:

```js
jQuery( window ).on( 'jet-engine/frontend-maps/loaded', function() {
    //do something
} );
```

### jet-engine/frontend-maps/user-position/update

Fires when the user's current position is updated (if the location display option is enabled in the Map Listing widget)

**Location**
includes/modules/maps-listings/assets/js/frontend-maps.js

**Example**:

Make the map always centered around the user's position
```js
jQuery( window ).on( 'jet-engine/frontend-maps/user-position/update', function( e, $container, coords, mapProvider ) {
    const map = $container.data('mapInstance');

    mapProvider.setCenterByPosition( {
      map: map,
      position: coords,
      zoom: 13
    } )
} )
```

### jet-engine/frontend-maps/user-position/error

Fires when a position update occurred with an error

**Location**
includes/modules/maps-listings/assets/js/frontend-maps.js

**Example**:

```js
jQuery( window ).on( 'jet-engine/frontend-maps/user-position/error', function( e, error, $container ) {
    //do something
} )
```


