/**
 * Ba-zing!
 * ...
 *
 * @author Micky Hulse
 * @link http://mky.io
 * @docs https://github.com/mhulse/ba-zing
 * @copyright Copyright (c) 2015 Micky Hulse.
 * @license Released under the Apache License, Version 2.0.
 * @version 0.1.0
 * @date 2015/03/22
 */

/* jshint unused:vars */
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
	
	var _map = null;
	var _directionsManager;
	var _directionsErrorEventObj;
	var _directionsUpdatedEventObj;
	var _directionsOptions;
	var $defaults = {
		
		id: 'map',
		
		maps: {
			
			// Setup:
			credentials: null,
			enableClickableLogo: false,
			enableSearchLogo: false,
			showDashboard: true,
			showMapTypeSelector: false,
			showScalebar: false,
			disablePanning: true,
			disableZooming: true,
			
			// View options:
			center: new Microsoft.Maps.Location(44.04550, -123.02376),
			mapTypeId: Microsoft.Maps.MapTypeId.road,
			zoom: 7
			
		}
		
	};
	
	MAP.init = function($options) {
		
		var $settings;
		
		$options = (_isObject($options) ? $options : {});
		
		// Merge optins and defaults.
		$settings = _deepMerge($defaults, $options);
		
		console.log($settings);
		
		_map = new Microsoft.Maps.Map(
			document.getElementById($settings.id),
			$settings.maps
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
	
	/**
	 * Merge two objects x and y deeply, returning a new merged object with the
	 * elements from both x and y. If an element at the same key is present for
	 * both x and y, the value from y will appear in the result. The merge is
	 * immutable, so neither x nor y will be modified. The merge will also
	 * merge arrays and array values.
	 *
	 * @see https://github.com/KyleAMathews/deepmerge
	 */
	
	var _deepMerge = function (target, src) {
		
		var array = Array.isArray(src);
		var dst = (array && [] || {});
		
		if (array) {
			
			target = target || [];
			
			dst = dst.concat(target);
			
			src.forEach(function(e, i) {
				
				if (typeof dst[i] === 'undefined') {
					
					dst[i] = e;
					
				} else if (typeof e === 'object') {
					
					dst[i] = _deepMerge(target[i], e);
					
				} else {
					
					if (target.indexOf(e) === -1) {
						
						dst.push(e);
						
					}
					
				}
				
			});
			
		} else {
			
			if (target && (typeof target === 'object')) {
				
				Object.keys(target).forEach(function (key) {
					
					dst[key] = target[key];
					
				});
				
			}
			
			Object.keys(src).forEach(function (key) {
				
				if ((typeof src[key] !== 'object') || ( ! src[key])) {
					
					dst[key] = src[key];
					
				} else {
					
					if ( ! target[key]) {
						
						dst[key] = src[key];
						
					} else {
						
						dst[key] = _deepMerge(target[key], src[key]);
						
					}
					
				}
				
			});
			
		}
		
		return dst;
		
	};
	
	// http://stackoverflow.com/a/27495801/922323
	var _isObject = function(obj) {
		
		var type = typeof obj;
		
		return type === 'function' || type === 'object' && !!obj;
		
	};
	
}((window.MAP = window.MAP || {}), window, document, undefined));
