/**
 * Declare variable
 */

/**
 * Declare Initial JS Function
 */
$( function() {
	fc_showLog( 1, '***** jQuery Chart Util' );
}); // end of $( function () )
/**
 * jQueryChart
 * @description		Create jQueryTab ojbect in jQuery UI
 * @param targetObj
 * @param chartId      : chartId
 * @param chartCommObj : {title : '', description : '', colorScheme : '', type : '', unitInterval : '', maxValue : '', minValue : '', valueAxisDesc : '' }
 * @param chartObj     : [ {caption : '', name : '', axisflag : '', type : '', baseUnit : '', formatFunction : '' },
 *                         {caption : '', name : ''},
 *                         {caption : '', name : ''},]
 */
function jQueryChart( targetObj, chartId, chartCommObj, chartItems ) {
	if ( targetObj == undefined )	targetObj = $( 'body' );
	targetObj.append( '<div id="' + chartId + '" style="width:100%; height:100%" />' );
	
	var arrSource = new Array();
	var arrSeries = new Array();
	var xAxisObj  = new Object();
	
	$.each( chartItems, function( index, item ) {
		var _Axis = false;
		
		if ( !fc_isNull( item.axisflag ) ) _Axis = item.axisflag;
		if ( !_Axis ) {
			var seriesObj = new Object();
			seriesObj.dataField   = item.name;
			seriesObj.displayText = item.caption;
			
			if ( !fc_isNull( item.colorfunction   ) ) seriesObj.colorFunction = item.colorfunction;
			if ( !fc_isNull( item.tooltipfunction ) ) {
				seriesObj.toolTipFormatFunction = item.tooltipfunction;
			} else {
				seriesObj.toolTipFormatFunction = function( value, itemIndex, serie, group, categoryValue, categoryAxis ) { 
					                                       return value; 
					                              };
			};			
			arrSeries[ arrSeries.length ] = seriesObj;
		} else {
			xAxisObj.dataField = item.name;
			
			if ( !fc_isNull( item.type ) ) {
				xAxisObj.type = item.type;
				if ( !fc_isNull( item.baseUnit ) && item.type == 'date' ) {
					xAxisObj.baseUnit =  item.baseUnit;
				};
			};
			if (!fc_isNull( item.minValue ) ) {
				xAxisObj.minValue = item.minValue;
			};
			if (!fc_isNull( item.maxValue ) ) {
				xAxisObj.maxValue = item.maxValue;
			};
			if (!fc_isNull( item.unitInterval ) ) {
				xAxisObj.unitInterval = item.unitInterval;
			};
			xAxisObj.showGridLines = true;
			
			if ( !fc_isNull( item.formatFunction ) ) {
				xAxisObj.labels	= {formatFunction : item.formatFunction };
			};
		};
	});
	
	var sourceField = [];
	var valueAxisObj = {
			logarithmicScale : false,
			logarithmicScaleBase : 2,
			unitInterval : 1,
			description  : chartCommObj.valueAxisDesc
		};
	
	if ( !fc_isNull( chartCommObj.unitInterval )     ) valueAxisObj.unitInterval     = chartCommObj.unitInterval;
	if ( !fc_isNull( chartCommObj.maxValue )         ) valueAxisObj.maxValue         = chartCommObj.maxValue;
	if ( !fc_isNull( chartCommObj.minValue )         ) valueAxisObj.minValue         = chartCommObj.minValue;
	if ( !fc_isNull( chartCommObj.logarithmicScale ) ) valueAxisObj.logarithmicScale = chartCommObj.logarithmicScale;
	
	var settings = {
		title            : chartCommObj.title,
		description      : chartCommObj.description,
		source           : sourceField,
		categoryAxis     : xAxisObj,
		colorScheme      : chartCommObj.colorScheme, //'scheme01','scheme02'
		showToolTips     : true,
		enableAnimations : true,
		seriesGroups     : [ {
			type      : chartCommObj.type, //'line','stackedline','column'
			valueAxis : valueAxisObj,
			series    : arrSeries
		} ]
	};
	
	$( '#' + chartId ).jqxChart( settings );
	this.ChartId = chartId;
};// end of jQueryChart(targetObj, chartId, chartCommObj, chartItems )
/**
 * 
 */
jQueryChart.prototype = {
	setChartLocalData : function( arrLocaData ) {
		fc_setChartLocalData( this.ChartId, arrLocaData );
	},
	setxMinValue : function( minValue ) {
		fc_setChartMinValue( this.ChartId, minValue );
	},
	setxMaxValue : function( maxValue ) {
		fc_setChartMaxValue( this.ChartId, maxValue );
	},
};// end of jQueryChart.prototype