/* global Microsoft, console */

/**
 * A simple Bing Maps plugin.
 *
 * Patterns used: "closure", "alias" and "namespace extension".
 *
 * @see http://stackoverflow.com/a/12774919/922323
 * @param {object} MAP
 * @param {object} window
 * @param {object} document
 * @param {undefined} undefined
 * @return void
 */

(function(MAP, window, document, undefined) {
	
	'use strict';
	
	var _key = 'your key here';
	var _map = null;
	var _directionsManager;
	var _directionsErrorEventObj;
	var _directionsUpdatedEventObj;
	var _directionsOptions;
	
	MAP.init = function(lat, lon) {
		
		// Function argument defaults? Use "Springfield, Oregon" as a default:
		lat = ((typeof lat !== 'undefined') ? lat : 44.04550);
		lon = ((typeof lon !== 'undefined') ? lon : -123.02376);
		
		_map = new Microsoft.Maps.Map(
			document.getElementById('map'),
			{
				
				// Setup:
				credentials: _key,
				enableClickableLogo: false,
				enableSearchLogo: false,
				showDashboard: true,
				showMapTypeSelector: false,
				showScalebar: false,
				disablePanning: true,
				disableZooming: true,
				
				// View options:
				center: new Microsoft.Maps.Location(lat, lon),
				zoom: 8
				
			}
		);
		
		return _map; // For the convenience factor.
		
	};
	
	MAP.directions = function($options) {
		
		if (Object.keys($options).length) { //returns 0 if empty or an integer > 0 if non-empty
			
			_directionsOptions = $options;
			
			if ( ! _directionsManager) {
				
				Microsoft.Maps.loadModule('Microsoft.Maps.Directions', {
					callback: _createDrivingRoute
				});
				
			} else {
				
				_createDrivingRoute();
				
			}
			
		} else {
			
			console.alert('You must provide an options object.');
			
		}
		
	};
	
	var _createDirectionsManager = function() {
		
		var displayMessage;
		
		if ( ! _directionsManager) {
			
			_directionsManager = new Microsoft.Maps.Directions.DirectionsManager(_map);
			displayMessage = 'Directions Module loaded\n';
			displayMessage += 'Directions Manager loaded';
			
		}
		
		console.log(displayMessage);
		
		_directionsManager.resetDirections();
		
		_directionsErrorEventObj = Microsoft.Maps.Events.addHandler(
			_directionsManager,
			'directionsError',
			function(arg) {
				
				console.log(arg.message);
				
			}
		);
		
		_directionsUpdatedEventObj = Microsoft.Maps.Events.addHandler(
			_directionsManager,
			'directionsUpdated',
			function() {
				
				console.log('Directions updated');
				
			}
		);
		
	};
	
	var _createDirectionsObj = function(toOrFrom) {
		
		var directionsObj = {};
		
		if (typeof toOrFrom === 'string') {
			
			directionsObj.address = toOrFrom;
			
		} else {
			
			console.log(toOrFrom.lat, toOrFrom.lon);
			
			if (toOrFrom.address) {
				
				directionsObj.address = toOrFrom.address;
				
			}
			
			if (toOrFrom.lat && toOrFrom.lon) {
				
				directionsObj.location = new Microsoft.Maps.Location(toOrFrom.lat, toOrFrom.lon);
				
			}
			
		}
		
		return directionsObj;
		
	};
	
	var _getWaypoint = function(directionIndicator) {
		
		return new Microsoft.Maps.Directions.Waypoint(_createDirectionsObj(directionIndicator));
		
	};
	
	var _createDrivingRoute = function() {
		
		var waypointA;
		var waypointB;
		
		if ( ! _directionsManager) {
			
			_createDirectionsManager();
			
		}
		
		_directionsManager.resetDirections();
		
		// Set Route Mode to driving:
		_directionsManager.setRequestOptions({
			routeMode: Microsoft.Maps.Directions.RouteMode.driving,
			routeDraggable: false
		});
		
		waypointA = _getWaypoint(_directionsOptions.from);
		_directionsManager.addWaypoint(waypointA);
		
		waypointB = _getWaypoint(_directionsOptions.to);
		_directionsManager.addWaypoint(waypointB);
		
		// Set the element in which the itinerary will be rendered:
		_directionsManager.setRenderOptions({
			itineraryContainer: document.getElementById('directions'),
			waypointPushpinOptions: {
				visible: false
			},
			viapointPushpinOptions: {
				//visible: false
			}
		});
		
		console.log('Calculating directions...');
		
		_directionsManager.calculateDirections();
		
	};
	
}((window.MAP = window.MAP || {}), window, document, undefined));
