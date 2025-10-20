/**
 * Declare variable
 */

/**
 * Declare Initial JS Function
 */
$( function() {
	fc_showLog( 1, '***** jQuery Formatter Util' );
}); // end of $(function ())
/**
 * 
 */	
function fc_makeFormat() {
	var dateFmt   = window.gwMesEnv.format.date.target;
	var dateDelim = window.gwMesEnv.format.delim.target.date;
	var timeFmt   = window.gwMesEnv.format.time.target;
	var timeDelim = window.gwMesEnv.format.delim.target.time;
	var _length = dateFmt.length;
	var _fmt    = '';
	var _format = '';
	
	// ******************************** setting date format
	window.gwMesEnv.format.date.date.picker      = '';	// date
	window.gwMesEnv.format.date.yearmonth.picker = '';	// year, month
	window.gwMesEnv.format.date.monthday.picker  = '';	// month, day
	
	for ( var loop=0;loop<_length;loop++ ) {
		_fmt = dateFmt.toUpperCase().substring( loop, loop+1 );
		switch ( _fmt ) {
			case 'Y': _format = 'yyyy';				
				window.gwMesEnv.format.date.date.picker = window.gwMesEnv.format.date.date.picker + dateDelim + _format;	//date
				window.gwMesEnv.format.date.date.year   = loop;				
				window.gwMesEnv.format.date.yearmonth.picker = window.gwMesEnv.format.date.yearmonth.picker + dateDelim + _format;		// year, month
				break;
			case 'M': _format = 'MM';				
				window.gwMesEnv.format.date.date.picker = window.gwMesEnv.format.date.date.picker + dateDelim + _format;	//date
				window.gwMesEnv.format.date.date.month  = loop;				
				window.gwMesEnv.format.date.yearmonth.picker = window.gwMesEnv.format.date.yearmonth.picker + dateDelim + _format;		// year, month				
				window.gwMesEnv.format.date.monthday.picker  = window.gwMesEnv.format.date.monthday.picker  + dateDelim + _format;		// month, day
				break;
			case 'D': _format = 'dd';				
				window.gwMesEnv.format.date.date.picker = window.gwMesEnv.format.date.date.picker + dateDelim + _format;	//date
				window.gwMesEnv.format.date.date.day    = loop;				
				window.gwMesEnv.format.date.monthday.picker = window.gwMesEnv.format.date.monthday.picker + dateDelim + _format;		// month, day
				break;
			default: break;
		}; // end of switch ( _fmt )
	}; // end of for ( var loop=0; loop<_length; loop++ ) 
	
	window.gwMesEnv.format.date.date.picker      = window.gwMesEnv.format.date.date.picker.substring( dateDelim.length );	// date
	window.gwMesEnv.format.date.yearmonth.picker = window.gwMesEnv.format.date.yearmonth.picker.substring( dateDelim.length );	// year, month
	window.gwMesEnv.format.date.monthday.picker  = window.gwMesEnv.format.date.monthday.picker.substring ( dateDelim.length );	// month, day
	
	// ******************************** setting time format
	_length = timeFmt.length;
	
	window.gwMesEnv.format.time.time.picker    = '';	// time	
	window.gwMesEnv.format.time.hourmin.picker = '';	// hour, minute	
	window.gwMesEnv.format.time.minsec.picker  = '';	// minute, second
	
	for ( var loop=0;loop<_length;loop++ ) {
		var _fmt = timeFmt.toUpperCase().substring( loop, loop+1 );
		switch ( _fmt ) {
			case 'H': _format = 'HH';
				window.gwMesEnv.format.time.time.picker    = window.gwMesEnv.format.time.time.picker + timeDelim + _format;	// time				
				window.gwMesEnv.format.time.hour.picker    = _format;	// hour				
				window.gwMesEnv.format.time.hourmin.picker = window.gwMesEnv.format.time.hourmin.picker + timeDelim + _format;	// hour, minute
				break;
			case 'M': _format = 'mm';
				window.gwMesEnv.format.time.time.picker    = window.gwMesEnv.format.time.time.picker    + timeDelim + _format;	// time				
				window.gwMesEnv.format.time.hourmin.picker = window.gwMesEnv.format.time.hourmin.picker + timeDelim + _format;	// hour, minute				
				window.gwMesEnv.format.time.minsec.picker  = window.gwMesEnv.format.time.minsec.picker  + timeDelim + _format;	// minute, second
				break;
			case 'S': _format = 'ss';				
				window.gwMesEnv.format.time.time.picker   = window.gwMesEnv.format.time.time.picker   + timeDelim + _format;	// time				
				window.gwMesEnv.format.time.minsec.picker = window.gwMesEnv.format.time.minsec.picker + timeDelim + _format;	// minute, second
				break;
			default: break;
		}; // end of switch ( _fmt )
	}; // end of for ( var loop=0; loop<_length; loop++ )
	
	window.gwMesEnv.format.time.time.picker    = window.gwMesEnv.format.time.time.picker.substring   ( timeDelim.length );	// time	
	window.gwMesEnv.format.time.hourmin.picker = window.gwMesEnv.format.time.hourmin.picker.substring( timeDelim.length );	// hour, minute	
	window.gwMesEnv.format.time.minsec.picker  = window.gwMesEnv.format.time.minsec.picker.substring ( timeDelim.length );	// minute, second
}; // end of fc_makeFormat
/**
 * 
 */
function fc_convertToDateTime( value, sourceDateTimeDelim, targetDateTimeDelim
							 , sourceDateFmt, targetDateFmt, sourceDateDelim, targetDateDelim
							 , sourceTimeFmt, targetTimeFmt, sourceTimeDelim, targetTimeDelim  ) {
	if ( fc_isNull( value ) ) return;
	
	var _dateValue = fc_convertToDate( value, sourceDateFmt, targetDateFmt, sourceDateDelim, targetDateDelim );
	var _timeValue = fc_convertToTime( value, sourceTimeFmt, targetTimeFmt, sourceTimeDelim, targetTimeDelim );
	
	return _dateValue + targetDateTimeDelim + _timeValue;
};// end of fc_convertToDateTime
/**
 * 
 * @param value
 * @param sourceFmt
 * @param targetFmt
 * @param sourceDelim
 * @param targetDelim
 * @returns
 */
function fc_convertToTime( value, sourceFmt, targetFmt, sourceDelim, targetDelim ) {
	if ( fc_isNull( value ) ) return;
	
	var _hour = value.getHours()   + "";
	var _min  = value.getMinutes() + "";
	var _sec  = value.getSeconds() + "";
	
	if ( _hour.length == 1) _hour = "0" + _hour;
	if ( _min.length  == 1) _min  = "0" + _min;
	if ( _sec.length  == 1) _sec  = "0" + _sec;
	
	var _length = targetFmt.length;
	var _value  = '';
	for ( var loop=0;loop<_length;loop++ ) {
		var _fmt = targetFmt.toUpperCase().substring( loop, loop+1 );
		switch ( _fmt ) {
			case 'H': _value = _value + targetDelim + _hour ; 	break;
			case 'M': _value = _value + targetDelim + _min; 	break;
			case 'S': _value = _value + targetDelim + _sec  ; 	break;
			default: break;
		};
	};
	return _value.substring( targetDelim.length );	
}; // end of fc_convertToTime
/**
 * 
 * @param value
 * @param sourceFmt
 * @param targetFmt
 * @param sourceDelim
 * @param targetDelim
 * @returns
 */
function fc_convertToDate( value, sourceFmt, targetFmt, sourceDelim, targetDelim ) {
	if ( fc_isNull( value ) ) return;
	
	if ( typeof value === 'string' ) var value = new Date(value);  
	
	var _year  = value.getFullYear();
	var _month = ( value.getMonth() + 1 ) + "";
	var _day   = value.getDate() + "";
	
	if ( _month.length == 1 ) _month = "0" + _month;
	if ( _day.length   == 1 ) _day   = "0" + _day;
	
	var _value  = '';
	var _length = targetFmt.length;
	
	for ( var loop=0;loop<_length;loop++ ) {
		var _fmt = targetFmt.toUpperCase().substring( loop, loop+1 );
		switch ( _fmt ) {
			case 'Y': _value = _value + targetDelim + _year ; break;
			case 'M': _value = _value + targetDelim + _month; break;
			case 'D': _value = _value + targetDelim + _day  ; break;
			default: break;
		};
	};	
	return _value.substring( targetDelim.length );
}; // end of fc_convertToDate
/**
 * 
 * @param value
 * @param spThousand
 * @returns
 */
function fc_convertThousandFormat( value, spThousand ) {
	return value.replace( /\B(?=(\d{3})+(?!\d))/g, spThousand );
};// end of fc_convertThousandFormat
/**
 * 
 * @param value
 * @param decimalPoint
 * @param sourceThousand
 * @param sourceDecimal
 * @param targetThousand
 * @param targetDecimal
 * @returns
 */
function fc_convertToNumber( value, decimalPoint, sourceThousand, sourceDecimal, targetThousand, targetDecimal ) {
	if ( !fc_isNull( value ) )  return '';
	var _value = value;
	if ( typeof value == 'string' ) 
		if ( !fc_isNull( sourceThousand ) ) _value = _value.replace( new RegExp( '[' + sourceThousand + ']', 'g' ) );
	
	var _part = _value.toString().split( sourceDecimal );
	if ( decimalPoint > 0 ) {
		if ( !fc_isNull( targetThousand ) ) _part[ 0 ] = fc_convertThousandFormat( _part[ 0 ], targetThousand );
		if ( _part[1] == undefined ) _part[1] = '00000000000000000000000000000';
		_part[1] = _part[ 1 ].substring( 0, decimalPoint );
		_value = _part.join( targetDecimal );
	} else if ( decimalPoint < 0 ) {
		if ( !fc_isNull( targetThousand ) ) _part[ 0 ] = fc_convertThousandFormat( _part[ 0 ], targetThousand );
	} else {
		if ( !fc_isNull( targetThousand ) ) _part[ 0 ] = fc_convertThousandFormat( _part[ 0 ], targetThousand );
		_value = _part[ 0 ];
	};
	return _value;
};// end of fc_convertToNumber
/**
 * 
 * @param value
 * @returns
 */
function fc_convertToBool( value ) {
	if ( fc_isNull( value ) )  return 'N';
	var _value = ( value == 'true' || value == true ) ? 'Y' : 'N';
	
	return _value;	
};// end of fc_convertToBool
/**
 * 
 * @returns
 */
function fc_getCustYearMonthFormat( ) {
	return window.gwMesEnv.format.date.yearmonth.picker;
};
/**
 * 
 * @returns
 */
function fc_getCustMonthDayFormat( ) {
	return window.gwMesEnv.format.date.monthday.picker;
};
/**
 * 
 * @returns
 */
function fc_getCustDateFormat( ) {
	return window.gwMesEnv.format.date.date.picker;
};
/**
 * 
 * @returns
 */
function fc_getCustDateTimeFormat( ) {
	return window.gwMesEnv.format.date.date.picker + window.gwMesEnv.format.delim.target.datetime + window.gwMesEnv.format.time.time.picker;
};
/**
 * 
 * @returns
 */
function fc_getCustDateMinFormat() {
	return window.gwMesEnv.format.date.date.picker + window.gwMesEnv.format.delim.target.datetime + window.gwMesEnv.format.time.hourmin.picker;
};
/**
 * 
 * @returns
 */
function fc_getCustDateHourFormat() {
	return window.gwMesEnv.format.date.date.picker + window.gwMesEnv.format.delim.target.datetime + window.gwMesEnv.format.time.hour.picker;
};
/**
 * 
 * @returns
 */
function fc_getCustTimeFormat( ) {
	return window.gwMesEnv.format.time.time.picker;
};
/**
 * 
 * @returns
 */
function fc_getCustHourFormat( ) {
	return window.gwMesEnv.format.time.hour.picker;
};
/**
 * 
 * @returns
 */
function fc_getCustHourMinFormat( ) {
	return window.gwMesEnv.format.time.hourmin.picker;
};
/**
 * 
 * @returns
 */
function fc_getCustMinSecFormat( ) {
	return window.gwMesEnv.format.time.minsec.picker;
};
/**
 * 
 * @param cellType
 * @param dataType
 * @param cellValue
 * @returns
 */
function fc_convertServerFormat( cellType, dataType, cellValue ) {
	var convertValue = cellValue;
	
	if ( cellType == 'date' ) {
		
		switch ( dataType ) {
		case 'yearmonth': 
			convertValue = fc_convertToDate( cellValue, window.gwMesEnv.format.date.target.replace( 'D', '' ), window.gwMesEnv.format.date.source.replace( 'D', '' ), window.gwMesEnv.format.delim.target.date, window.gwMesEnv.format.delim.source.date );
			break;
		case 'monthday' : 
			convertValue = fc_convertToDate( cellValue, window.gwMesEnv.format.date.target.replace( 'Y', '' ), window.gwMesEnv.format.date.source.replace( 'Y', '' ), window.gwMesEnv.format.delim.target.date, window.gwMesEnv.format.delim.source.date );
			break;
		case 'date' 	: 
			convertValue = fc_convertToDate( cellValue, window.gwMesEnv.format.date.target, window.gwMesEnv.format.date.source, window.gwMesEnv.format.delim.target.date, window.gwMesEnv.format.delim.source.date );
			break;
		case 'datetime' : 
			convertValue = fc_convertToDateTime(  cellValue, window.gwMesEnv.format.delim.target.datetime, window.gwMesEnv.format.delim.source.datetime
												, window.gwMesEnv.format.date.target, window.gwMesEnv.format.date.source, window.gwMesEnv.format.delim.target.date, window.gwMesEnv.format.delim.source.date
												, window.gwMesEnv.format.time.target, window.gwMesEnv.format.time.source, window.gwMesEnv.format.delim.target.time, window.gwMesEnv.format.delim.source.time );
			break;
		case 'datemin' 	:
			convertValue = fc_convertToDateTime(  cellValue, window.gwMesEnv.format.delim.target.datetime, window.gwMesEnv.format.delim.source.datetime
												, window.gwMesEnv.format.date.target                   , window.gwMesEnv.format.date.source                   , window.gwMesEnv.format.delim.target.date, window.gwMesEnv.format.delim.source.date
												, window.gwMesEnv.format.time.target.replace( 'S', '' ), window.gwMesEnv.format.time.source.replace( 'S', '' ), window.gwMesEnv.format.delim.target.time, window.gwMesEnv.format.delim.source.time );
			break;
		case 'datehour' : 
			convertValue = fc_convertToDateTime(  cellValue, window.gwMesEnv.format.delim.target.datetime, window.gwMesEnv.format.delim.source.datetime
												, window.gwMesEnv.format.date.target                                      , window.gwMesEnv.format.date.source                                      , window.gwMesEnv.format.delim.target.date, window.gwMesEnv.format.delim.source.date
												, window.gwMesEnv.format.time.target.replace( 'S', '' ).replace( 'M', '' ), window.gwMesEnv.format.time.source.replace( 'S', '' ).replace( 'M', '' ), window.gwMesEnv.format.delim.target.time, window.gwMesEnv.format.delim.source.time );
			break;
		case 'time' 	: 
			convertValue = fc_convertToTime( cellValue, window.gwMesEnv.format.time.target, window.gwMesEnv.format.time.source, window.gwMesEnv.format.delim.target.time, window.gwMesEnv.format.delim.source.time );
			break;
		case 'hour' 	: 
			convertValue = cellValue;
			break;
		case 'hourmin' 	: 
			if(convertValue == ":"){
				convertValue = '';
			}else{
				convertValue = fc_convertToTime( cellValue, window.gwMesEnv.format.time.target.replace( 'S','' ), window.gwMesEnv.format.time.source.replace( 'S', '' ), window.gwMesEnv.format.delim.target.time, window.gwMesEnv.format.delim.source.time );
			}
			break;
		case 'minsec' 	: 
			convertValue = fc_convertToTime( cellValue, window.gwMesEnv.format.time.target.replace( 'H','' ), window.gwMesEnv.format.time.source.replace( 'H', '' ), window.gwMesEnv.format.delim.target.time, window.gwMesEnv.format.delim.source.time );
			break;
		default:
			convertValue = cellValue;
			break;
		};
	} else if (cellType == 'bool') {
		convertValue = fc_convertToBool( cellValue );
	};
	return convertValue;
}; // end of fc_convertServerFormat
/**
 * 
 * @param value
 * @param targetFmt
 * @param targetDelim
 * @returns
 */
function fc_convertStringToDate( value, targetFmt, targetDelim ) {
	if ( fc_isNull(value) ) return;
	
	var _value = value.replace( new RegExp( '[' + targetDelim + ']', 'g' ), '' );  // sourceDelim
	var _year = '', _month = '', _day = '', _length = 0;
	
	_length = targetFmt.length;
	for ( var loop=0;loop<_length;loop++ ) {
		var _fmt = targetFmt.toUpperCase().substring( loop, loop+1 );
		var _pos = 0;
		switch ( _fmt ) {
			case 'Y': _year  = _value.substring( 0, 4 ); _pos = 4; break;
			case 'M': _month = _value.substring( 0, 2 ); _pos = 2; break;
			case 'D': _day   = _value.substring( 0, 2 ); _pos = 2; break;
			default: break;
		};
		_value = _value.substring( _pos );
	};
	
	var clientDateFmt = "YMD";
	_length = clientDateFmt.length;
	_value = '';
	for ( var loop=0;loop<_length;loop++ ) {
		var _fmt = clientDateFmt.toUpperCase().substring( loop, loop+1 );
		switch ( _fmt ) {
			case 'Y': _value = _value + targetDelim + _year ; break;
			case 'M': _value = _value + targetDelim + _month; break;
			case 'D': _value = _value + targetDelim + _day  ; break;
			default: break;
		};
	};
	return _value.substring( targetDelim.length );
};// end of fc_convertStringToDate
/**
 * 
 * @param value
 * @param targetFmt
 * @param targetDelim
 * @returns
 */
function fc_convertStringToTime( value, targetFmt, targetDelim ) {
	if ( fc_isNull(value) ) return;
	
	var _value = value.replace( new RegExp( '[' + targetDelim + ']', 'g' ), '' );  // sourceDelim
	var _hour = '', _min = '', _sec = '', _length = 0;
	
	_length = targetFmt.length;
	
	for ( var loop=0;loop<_length;loop++ ) {
		var _fmt = targetFmt.toUpperCase().substring( loop, loop+1 );
		var _pos = 0;
		switch ( _fmt ) {
			case 'H' : _hour = _value.substring( 0, 2 ); _pos = 2; break;
			case 'M' : _min  = _value.substring( 0, 2 ); _pos = 2; break;
			case 'S' : _sec  = _value.substring( 0, 2 ); _pos = 2; break;
			default: break;
		};
		_value = _value.substring( _pos );
	};
	
	_length = targetFmt.length;
	_value = '';
	for ( var loop=0;loop<_length;loop++ ) {
		var _fmt = targetFmt.toUpperCase().substring( loop, loop+1 );
		switch ( _fmt ) {
			case 'H' : _value = _value + targetDelim + _hour ; break;
			case 'M' : _value = _value + targetDelim + _min; break;
			case 'S' : _value = _value + targetDelim + _sec  ; break;
			default: break;
		};
	};
	return _value.substring( targetDelim.length );	
}; // end of fc_convertToTime
/**
 * 
 * @param value
 * @param targetDateTimeDelim
 * @param targetDateFmt
 * @param targetDateDelim
 * @param targetTimeFmt
 * @param targetTimeDelim
 * @returns
 */
function fc_convertStringToDateTime( value, targetDateTimeDelim, targetDateFmt, targetDateDelim, targetTimeFmt, targetTimeDelim ) {	
	if ( fc_isNull(value) ) return;
	var _dateValue, _timeValue, dateValue, timeValue;
	
	if ( fc_isNull( targetDateTimeDelim, false ) ) {
		var _length = ( window.gwMesEnv.format.date.date.picker ).replace( new RegExp( '[' + targetDateDelim + ']', 'g' ), '' ).length;
		dateValue = value.substring( 0, _length );
		timeValue = value.substring( _length );
	} else {
		dateValue = value.split( targetDateTimeDelim )[0];
		timeValue = value.split( targetDateTimeDelim )[1];
	};
	_dateValue = fc_convertStringToDate( dateValue, targetDateFmt, targetDateDelim );
	_timeValue = fc_convertStringToTime( timeValue, targetTimeFmt, targetTimeDelim );
	
	return _dateValue + targetDateTimeDelim + _timeValue;
};// end of fc_convertStringToDateTime
/**
 * 
 * @param cellType
 * @param dataType
 * @param cellValue
 * @returns
 */
function fc_convertClientFormat( cellType, dataType, cellValue ) {
	var convertValue = cellValue;
	if ( cellType = 'date' ) {
		switch ( dataType ) {
		case 'yearmonth': 
			convertValue = fc_convertStringToDate( cellValue, window.gwMesEnv.format.date.target.replace( 'D', '' ), window.gwMesEnv.format.delim.target.date );
			break;
		case 'monthday' : 
			convertValue = fc_convertStringToDate( cellValue, window.gwMesEnv.format.date.target.replace( 'Y', '' ), window.gwMesEnv.format.delim.target.date );
			break;
		case 'date' 	: 
			convertValue = fc_convertStringToDate( cellValue, window.gwMesEnv.format.date.target, window.gwMesEnv.format.delim.target.date );
			break;
		case 'datetime' : 
			convertValue = fc_convertStringToDateTime( 	  cellValue, window.gwMesEnv.format.delim.target.datetime
														, window.gwMesEnv.format.date.target, window.gwMesEnv.format.delim.target.date
														, window.gwMesEnv.format.time.target, window.gwMesEnv.format.delim.target.time );
			break;
		case 'datemin' 	:
			convertValue = fc_convertStringToDateTime( 	  cellValue, window.gwMesEnv.format.delim.target.datetime
														, window.gwMesEnv.format.date.target                   , window.gwMesEnv.format.delim.target.date
														, window.gwMesEnv.format.time.target.replace( 'S', '' ), window.gwMesEnv.format.delim.target.time );
			break;
		case 'datehour' : 
			convertValue = fc_convertStringToDateTime( 	  cellValue, window.gwMesEnv.format.delim.target.datetime
														, window.gwMesEnv.format.date.target                                      , window.gwMesEnv.format.delim.target.date
														, window.gwMesEnv.format.time.target.replace( 'S', '' ).replace( 'M', '' ), window.gwMesEnv.format.delim.target.time );
			break;
		case 'time' 	: 
			convertValue = fc_convertStringToTime( cellValue, window.gwMesEnv.format.time.target, window.gwMesEnv.format.delim.target.time );
			break;
		case 'hour' 	: 
			convertValue = cellValue;
			break;
		case 'hourmin' 	: 
			convertValue = fc_convertStringToTime( cellValue, window.gwMesEnv.format.time.target.replace( 'S', '' ), window.gwMesEnv.format.delim.target.time );
			break;
		case 'minsec' 	: 
			convertValue = fc_convertStringToTime( cellValue, window.gwMesEnv.format.time.target.replace( 'H', '' ), window.gwMesEnv.format.delim.target.time );
			break;
		default:
			convertValue = cellValue;
			break;
		};
	};
	return convertValue;
}; // end of fc_convertClientFormat

function fc_disp_number_format( nOldValue, nNewValue, sFormat ) {
	var nRsltValue = nNewValue;
	if ( sFormat.split( '.' ).length = 0 ) return nRsltValue;
	if ( isNaN( nNewValue ) ) {
   		if ( fc_isNull( nOldValue ) )
   			nRsltValue = 0;
   		else 
   			nRsltValue = null;
   	} else {
	   	var nDigit = ( sFormat.split( '.' )[ 1 ] ).length;
	    nRsltValue = parseFloat( nNewValue ).toFixed( nDigit );
   	};
   	return nRsltValue;
}; // end of fc_disp_number_format