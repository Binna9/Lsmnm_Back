/**
 * Declare variable
 */

/**
 * Declare Initial JS Function
 */
$( function() {
	fc_showLog( 1, '***** jQuery Chart' );
}); // end of $( function () )
/**
 * @name
 * @param chartId
 * @param arrLocalData
 */
function fc_setChartLocalData( chartId, arrLocalData ) {
	var instance = $( '#' + chartId ).jqxChart( 'getInstance' );
	fc_showLog( 2, 'Data Instance: ', instance );
	instance.source = arrLocalData;
	instance.update();
}; //end of fc_setChartLocalData
/**
 * 
 * @param chartId
 * @param minValue
 */
function fc_setChartMinValue( chartId, minValue ) {
	var instance = $( '#' + chartId ).jqxChart( 'getInstance' );
	instance.categoryAxis[ 'minValue' ] = minValue;
	instance.update();
}; //end of fc_setChartMinValue
/**
 * 
 * @param chartId
 * @param maxValue
 */
function fc_setChartMaxValue( chartId, maxValue ) {
	var instance = $( '#' + chartId ).jqxChart( 'getInstance' );
	instance.categoryAxis[ 'maxValue' ] = maxValue;
	instance.update();
}; //end of fc_setChartMaxValue