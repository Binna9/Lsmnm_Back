/**
 * Declare variable
 */

/**
 * Declare Initial JS Function
 */
$( function() {
	var toString = Object.prototype.toString,
		isString = function ( v ) {
			return ( /^\[object String\]$/ ).test( toString.call( v ) );
		},
		isObject = function ( v ) {
			return ( /^\[object Object\]$/ ).test( toString.call( v ) );
		};
	
	if ( window.Storage ) { 
		var setter = Storage.prototype.setItem,
			getter = Storage.prototype.getItem,
			unique = 'jsonData:';
		
		Storage.prototype.setItem = function( k, v ) {
			var result; 
			if ( isString( v ) ){
				result = setter.apply( this, arguments );
			} else {
				v = unique + JSON.stringify( v );
				result = setter.call( this, k, v );
			}; 
			return result;
		}; // end of setItem
		
		Storage.prototype.getItem = function( k ) {
			var result = getter.apply( this, arguments ), str;
			if ( result != null && result.indexOf( unique ) === 0 ) {
				str = result.slice( unique.length );
				result = JSON.parse( str );
			}; 
			return result;
		}; // end of getItem
	}; // end of if ( window.Storage ) { 
}); // end of $( function () )
/**
 * @name			fc_getSessionItem
 * @param key
 * @returns
 */
function fc_getSessionItem( key ) {
	if ( key != null ) 
		return sessionStorage.getItem( key );
	return null;
}; // end of fc_getSessionItem
function fc_getSessionSubItem( key, subKey ) {
	if ( fc_isNull( key    ) ) return null;
	if ( fc_isNull( subKey ) ) return null;
	
	subKey = subKey.toUpperCase();
	var itemObj = sessionStorage.getItem( key );
	return itemObj[ subKey ];
}; // end of fc_getSessionSubItem
/**
 * @name			fc_setSessionItem
 * @param key
 * @param value
 * @description	Set SessionStorage Item
 * @example
 */
function fc_setSessionItem( key, value ) {
	if ( key != null ) 
		sessionStorage.setItem( key, value );
	else 
		fc_showLog( 1, 'Key is not null' );
}; // end of fc_setSessionItem
function fc_removeSessionItem( key ) {
	sessionStorage.removeItem( key );
	return;
}; // end of fc_removeSessionItem
/**
 * @Name			fc_getLocalItem
 * @Description	Get LocalStorage Item
 * @param key
 * @returns
 */
function fc_getLocalItem( key ) {
	if ( key != null ) 
		return localStorage.getItem( key );
	return null;
}; // end of fc_getLocalItem
/**
 * @Name			fc_setLocalItem
 * @Description	Set LocalStorage Item  
 * @param key
 * @param value
 */
function fc_setLocalItem( key, value ) {
	if ( key != null ) 
		localStorage.setItem( key, value );
	else 
		fc_showLog( 1, 'Key is not null' );
}; // end of fc_setLocalItem