/**
 * Declare variable
 */
var textTemplate 		= { type: 'text'  , align: 'left'  , aggregates: ['count'], editable: true, sortable: true, pinned: false, nullable: true, filtertype: 'input'	, columntype: 'textbox' };
var popupTemplate  		= { type: 'text'  , align: 'left'  ,                        editable: true, sortable: true, pinned: false, nullable: true, filtertype: 'input'	, columntype: 'template', inputreadonly: false };
var custpopupTemplate  	= { type: 'text'  , align: 'left'  ,                        editable: true, sortable: true, pinned: false, nullable: true, filtertype: 'input'	, columntype: 'template', inputreadonly: false };
var textareaTemplate	= { type: 'text'  , align: 'left'  ,                        editable: true, sortable: true, pinned: false, nullable: true, filtertype: 'input' , columntype: 'textbox' };
var statusTemplate 		= { type: 'text'  , align: 'left'  ,                        editable: false, columntype: 'textbox', hidden: true, nullable: true };
var checkboxTemplate	= { type: 'check' , align: 'center',                        editable: true, sortable: true, pinned: false, nullable: true, filtertype: 'bool' 	, columntype: 'checkbox' };
var yearmonthTemplate	= { type: 'date'  , align: 'center',                        editable: true, sortable: true, pinned: false, nullable: true, filtertype: 'date' 	, columntype: 'datetimeinput' };
var monthdayTemplate	= { type: 'date'  , align: 'center',                        editable: true, sortable: true, pinned: false, nullable: true, filtertype: 'date' 	, columntype: 'datetimeinput' };
var dateTemplate		= { type: 'date'  , align: 'center',                        editable: true, sortable: true, pinned: false, nullable: true, filtertype: 'date' 	, columntype: 'datetimeinput' };
var datetimeTemplate	= { type: 'date'  , align: 'center',                        editable: true, sortable: true, pinned: false, nullable: true, filtertype: 'date' 	, columntype: 'datetimeinput' };
var dateminTemplate		= { type: 'date'  , align: 'center',                        editable: true, sortable: true, pinned: false, nullable: true, filtertype: 'date' 	, columntype: 'datetimeinput' };
var datehourTemplate	= { type: 'date'  , align: 'center',                        editable: true, sortable: true, pinned: false, nullable: true, filtertype: 'date' 	, columntype: 'datetimeinput' };
var timeTemplate		= { type: 'date'  , align: 'center',                        editable: true, sortable: true, pinned: false, nullable: true, filtertype: 'date' 	, columntype: 'datetimeinput' };
var hourTemplate		= { type: 'date'  , align: 'center',                        editable: true, sortable: true, pinned: false, nullable: true, filtertype: 'date' 	, columntype: 'datetimeinput' };
var hourminTemplate		= { type: 'date'  , align: 'center',                        editable: true, sortable: true, pinned: false, nullable: true, filtertype: 'date' 	, columntype: 'datetimeinput' };
var minsecTemplate		= { type: 'date'  , align: 'center',                        editable: true, sortable: true, pinned: false, nullable: true, filtertype: 'date' 	, columntype: 'datetimeinput' };
var integerTemplate		= { type: 'number', align: 'right' , aggregates: ['sum']  , editable: true, sortable: true, pinned: false, nullable: true, filtertype: 'number', cellsformat:'n'};
var numberTemplate		= { type: 'number', align: 'right' , aggregates: ['sum']  , editable: true, sortable: true, pinned: false, nullable: true, filtertype: 'number', cellformat:'f' };
var number0Template		= { type: 'number', align: 'right' , aggregates: ['sum']  , editable: true, sortable: true, pinned: false, nullable: true, filtertype: 'number', cellformat:'d0' };
var number1Template		= { type: 'number', align: 'right' , aggregates: ['sum']  , editable: true, sortable: true, pinned: false, nullable: true, filtertype: 'number', cellformat:'d1' };
var number2Template		= { type: 'number', align: 'right' , aggregates: ['sum']  , editable: true, sortable: true, pinned: false, nullable: true, filtertype: 'number', cellformat:'d2' };
var number3Template		= { type: 'number', align: 'right' , aggregates: ['sum']  , editable: true, sortable: true, pinned: false, nullable: true, filtertype: 'number', cellformat:'d3' };
var number4Template		= { type: 'number', align: 'right' , aggregates: ['sum']  , editable: true, sortable: true, pinned: false, nullable: true, filtertype: 'number', cellformat:'d4' };
var slabthkTemplate		= { type: 'number', align: 'right' , aggregates: ['sum']  , editable: true, sortable: true, pinned: false, nullable: true, filtertype: 'number', cellformat: 'd' + fc_getMatDecimal( window.gwMesEnv.format.slab.thk   )};
var slabwthTemplate	  	= { type: 'number', align: 'right' , aggregates: ['sum']  , editable: true, sortable: true, pinned: false, nullable: true, filtertype: 'number', cellformat: 'd' + fc_getMatDecimal( window.gwMesEnv.format.slab.wth   )};
var slablthTemplate		= { type: 'number', align: 'right' , aggregates: ['sum']  , editable: true, sortable: true, pinned: false, nullable: true, filtertype: 'number', cellformat: 'd' + fc_getMatDecimal( window.gwMesEnv.format.slab.lth   )};
var slabwgtTemplate	  	= { type: 'number', align: 'right' , aggregates: ['sum']  , editable: true, sortable: true, pinned: false, nullable: true, filtertype: 'number', cellformat: 'd' + fc_getMatDecimal( window.gwMesEnv.format.slab.wgt   )};
var platethkTemplate 	= { type: 'number', align: 'right' , aggregates: ['sum']  , editable: true, sortable: true, pinned: false, nullable: true, filtertype: 'number', cellformat: 'd' + fc_getMatDecimal( window.gwMesEnv.format.plate.thk  )};
var platewthTemplate 	= { type: 'number', align: 'right' , aggregates: ['sum']  , editable: true, sortable: true, pinned: false, nullable: true, filtertype: 'number', cellformat: 'd' + fc_getMatDecimal( window.gwMesEnv.format.plate.wth  )};
var platelthTemplate	= { type: 'number', align: 'right' , aggregates: ['sum']  , editable: true, sortable: true, pinned: false, nullable: true, filtertype: 'number', cellformat: 'd' + fc_getMatDecimal( window.gwMesEnv.format.plate.lth  )};
var platewgtTemplate	= { type: 'number', align: 'right' , aggregates: ['sum']  , editable: true, sortable: true, pinned: false, nullable: true, filtertype: 'number', cellformat: 'd' + fc_getMatDecimal( window.gwMesEnv.format.plate.wgt  )};
var coilthkTemplate  	= { type: 'number', align: 'right' , aggregates: ['sum']  , editable: true, sortable: true, pinned: false, nullable: true, filtertype: 'number', cellformat: 'd' + fc_getMatDecimal( window.gwMesEnv.format.coil.thk   )};
var coilwthTemplate		= { type: 'number', align: 'right' , aggregates: ['sum']  , editable: true, sortable: true, pinned: false, nullable: true, filtertype: 'number', cellformat: 'd' + fc_getMatDecimal( window.gwMesEnv.format.coil.wth   )};
var coillthTemplate		= { type: 'number', align: 'right' , aggregates: ['sum']  , editable: true, sortable: true, pinned: false, nullable: true, filtertype: 'number', cellformat: 'd' + fc_getMatDecimal( window.gwMesEnv.format.coil.lth   )};
var coilwgtTemplate	  	= { type: 'number', align: 'right' , aggregates: ['sum']  , editable: true, sortable: true, pinned: false, nullable: true, filtertype: 'number', cellformat: 'd' + fc_getMatDecimal( window.gwMesEnv.format.coil.wgt   )};
var bloomthkTemplate	= { type: 'number', align: 'right' , aggregates: ['sum']  , editable: true, sortable: true, pinned: false, nullable: true, filtertype: 'number', cellformat: 'd' + fc_getMatDecimal( window.gwMesEnv.format.bloom.thk  )};
var bloomwthTemplate	= { type: 'number', align: 'right' , aggregates: ['sum']  , editable: true, sortable: true, pinned: false, nullable: true, filtertype: 'number', cellformat: 'd' + fc_getMatDecimal( window.gwMesEnv.format.bloom.wth  )};
var bloomlthTemplate	= { type: 'number', align: 'right' , aggregates: ['sum']  , editable: true, sortable: true, pinned: false, nullable: true, filtertype: 'number', cellformat: 'd' + fc_getMatDecimal( window.gwMesEnv.format.bloom.lth  )};
var bloomwgtTemplate	= { type: 'number', align: 'right' , aggregates: ['sum']  , editable: true, sortable: true, pinned: false, nullable: true, filtertype: 'number', cellformat: 'd' + fc_getMatDecimal( window.gwMesEnv.format.bloom.wgt  )};
var billetthkTemplate	= { type: 'number', align: 'right' , aggregates: ['sum']  , editable: true, sortable: true, pinned: false, nullable: true, filtertype: 'number', cellformat: 'd' + fc_getMatDecimal( window.gwMesEnv.format.billet.thk )};
var billetwthTemplate	= { type: 'number', align: 'right' , aggregates: ['sum']  , editable: true, sortable: true, pinned: false, nullable: true, filtertype: 'number', cellformat: 'd' + fc_getMatDecimal( window.gwMesEnv.format.billet.wth )};
var billetlthTemplate	= { type: 'number', align: 'right' , aggregates: ['sum']  , editable: true, sortable: true, pinned: false, nullable: true, filtertype: 'number', cellformat: 'd' + fc_getMatDecimal( window.gwMesEnv.format.billet.lth )};
var billetwgtTemplate	= { type: 'number', align: 'right' , aggregates: ['sum']  , editable: true, sortable: true, pinned: false, nullable: true, filtertype: 'number', cellformat: 'd' + fc_getMatDecimal( window.gwMesEnv.format.billet.wgt )};

/**
 * Declare Initial JS Function
 */
$( function () {
	fc_showLog( 1, '***** jQuery Grid Util' );
}); // end of $( function () )

/** -----------------------------------------------------------------------------
 * @Name			jQueryGrid
 * @Description		jqGrid기반 PosGrid 객체를 생성한다.
 * @Parameter		targetObj       : Grid를 추가할 대상 객체
 * 					gridId          : 사용할 Grid ID (Table object)
 * 					gridCols        : Grid 칼럼 이름 배열
 * 					dataType        : 데이타 타입. (json or xml or local)
 * 					gridCaption     : Grid Caption
 * 					gridKey         : Grid Key
 * 					gridColGroups   : Grid Column Group
 * 					isTabGrid     : Is Tab
 * 					addType         : add row posion bottom ( true/ false )
 *
 * @Returns			jqGrid object
 * @Method			getGrid : jqGrid 객체를 반환한다.
 * 					setNavigator : Grid 네비게이터를 설정한다.
 * 					setHeaderGroups : 헤더 그룹을 설정한다.
 * 					setOption : 추가 옵션을 설정한다.
 * 					load : 조회한다.
 * 					bind : 이벤트를 바인딩한다.
 * 					groupBy : 특정 칼럼으로 그룹화한다. (서버 데이터가 특정 칼럼으로 정렬되어 있어야 함)
 * @Example
 * ---------------------------------------------------------------------------*/
function jQueryGrid( targetObj, gridId, gridCols, gridType, gridCaption, gridKey, gridColGroups, isTabGrid, addType, isUseMultiLanguage ) {
	// 2018.2.22 getting from database
//	window.gwMultiLang.isRunMain = false;
	try {
		isUseMultiLanguage = fc_setValue( isUseMultiLanguage, window.gwMesEnv.lang.isMultiLanguage );

		var toTheme = function( className ) {
	        if ( toTheme == '' ) return className;
	        return className + ' ' + className + '-' + window.gwMesEnv.themes;
	    };
		// DIV 생성
		if ( typeof targetObj == 'object' ) {
			if ( targetObj.length == 0 )
				targetObj = $( 'body' );
		} else if ( fc_isNull( targetObj ) ) targetObj = $( 'body' );
	    	targetObj.append( '<div id="' + gridId + '" />' );
	    if ( $( '#' + gridId + 'CM').length == 0 ) {
	        jQueryContext( targetObj, gridId );
	    };

		var pagerId = gridId + '_pager';	// pager Id

		var dataSource   = { datatype: 'json', datafields: [] };
		var arrDataField = new Array();
		var arrColIDs    = new Array();
		var arrCol       = new Array();
		var arrColGrp    = new Array();
		var arrColPopup  = new Array();
		var arrChecked   = new Array();
		var colMaxLen    = new Object();

		var arrMultiLang       = new Array();	// multi-language
		var arrGroupMultiLang  = new Array();	// multi-language

		var _multiLangItem = function( colNm, itemCd, itemValue ) {
		    this.COL_NM   = colNm;
		    this.ITEM_CD  = fc_isNull( itemCd    ) ? colNm : itemCd;
		    this.ITEM_VAL = fc_isNull( itemValue ) ? 0 : itemValue;
		};
		// set authority
	    var isMultiSelect = false;	// multi-select column
	    var isEdit  = false;			// cell editable
	    var isAdd   = false;			// navigator function ( add/copy/delete row )

	    switch ( gridType.toLowerCase() ) {
			case 'search':	isMultiSelect = false;		isEdit = false;		isAdd = false;		break;
			case 'insert':	isMultiSelect = true;		isEdit = true;		isAdd = true;		break;
			case 'update':	isMultiSelect = true;		isEdit = true;		isAdd = false;		break;
			default:		break;
		};
		isMultiSelect = 'singlerow';
		isUpdate = isEdit;
		isEdit = ( window.gwAuth.isSave && isEdit ) || ( window.gwAuth.isDelete && isEdit ) || ( window.gwAuth.isConfirm && isEdit ) || ( window.gwAuth.isCust1 && isEdit ) || ( window.gwAuth.isCust2 && isEdit) || ( window.gwAuth.isCust3 && isEdit ) || ( window.gwAuth.isCust4 && isEdit ) || ( window.gwAuth.isCust5 && isEdit );
		isAdd  = ( window.gwAuth.isSave && isAdd  ) || ( window.gwAuth.isConfirm && isAdd );

		var updatingCheckState = false;
		// Caption Setting
		var isCaption = true;
		var _caption = '';
		var _caption_isMultiLanguage = isUseMultiLanguage;

	    if ( typeof gridCaption == 'string' ) {
	    	_caption = gridCaption;
	    } else {
			_caption = gridCaption.caption;
			_caption_isMultiLanguage = fc_isNull( gridCaption.isMultiLanguage ) ? isUseMultiLanguage : gridCaption.isMultiLanguage;
		};

	    // Title Caption Setting
		var _rendCaption = function ( target ) {
			var container = $( "<div id='divCaption_" + gridId + "' class='divGridCaption'></div>" );
	        var span      = $( "<span id='caption_"   + gridId + "' class='gridCaptionText'>" + _caption + "</span>" );
	        if ( isUseMultiLanguage ) {
	        	if ( _caption_isMultiLanguage ) {
	        		if ( window.gwMultiLang.isRunMain ) {
	        			span      = $( "<span id='caption_"   + gridId + "' class='gridCaptionText'>"
						            + fc_getGwLangItem( fc_isNull( gridCaption.itemCd ) ? span.attr( 'id' ) : gridCaption.itemCd
								                      , fc_isNull( gridCaption.itemValue ) ? 0 : gridCaption.itemValue
								                      , _caption )
								    + "</span>" );
	        		} else {
				        span.addClass( window.gwClass.multilanguage );
				        span.attr( window.gwMesEnv.item.itemcd, fc_isNull( gridCaption.itemCd ) ? span.attr( 'id' ) : gridCaption.itemCd );
				        span.attr( window.gwMesEnv.item.itemvalue, fc_isNull( gridCaption.itemValue ) ? 0 : gridCaption.itemValue );
				        fc_setLangId( span.attr( window.gwMesEnv.item.itemcd ), span.attr( window.gwMesEnv.item.itemvalue ) );
	        		};
	        	};
	        };
	        container.append( span );
	        container.height( 21 );

	        target.prepend( container );
		}; // End of _rendCaptionToolbar

	    if ( fc_isNull( _caption ) ) {
	    	isCaption = false;
	    } else {
	    	_rendCaption( targetObj );
	    };

	    // 2017.09.01 add _addfilter function
	    var _addfilter = function( gridId ) {
            var filtergroup = new $.jqx.filter();
            var filter_or_operator = 1;
            var filtervalue     = 'Andrew';
            var filtercondition = 'equal';
            var filter1 = filtergroup.createfilter( 'stringfilter', filtervalue, filtercondition );

            filtergroup.addfilter(filter_or_operator, filter1);
            $( '#' + gridId ).jqxGrid( 'addfilter', 'firstname', filtergroup );	// add the filters.
            $( '#' + gridId ).jqxGrid( 'applyfilters' );	// apply the filters.
        }; // end of _addfilter

		// Column Setting Create
		var _setColumnProp = function( columnObj , colProperty, displayObj ) {
			try {
				var propObj = {};

				propObj.datafield  = columnObj.name.toUpperCase();
				propObj.text       = ( fc_isNull( columnObj.caption ) ) ? columnObj.name.toUpperCase() : columnObj.caption;
				propObj.width      = ( fc_isNull( columnObj.width ) ) ? 100 : columnObj.width;
				propObj.align      = 'center'; // Header align
				propObj.cellsalign = ( fc_isNull( columnObj.align ) ) ? colProperty.align : columnObj.align; // Column value align

				propObj.editable   = ( fc_isNull( columnObj.editable ) && fc_isNull( columnObj.readonly ) ) ?  colProperty.editable : ( fc_isNull( columnObj.editable ) ? (!columnObj.readonly) : columnObj.editable );
				propObj.sortable   = ( fc_isNull( columnObj.sortable   ) ) ? colProperty.sortable : columnObj.sortable;
				propObj.aggregates = ( fc_isNull( columnObj.aggregates ) ) ? colProperty.aggregates : columnObj.aggregates;

				if ( columnObj.datatype == 'popup' || columnObj.datatype == 'custpopup' ) {
					propObj.popuptype  = ( columnObj.datatype == 'popup' ) ?  'POP' : 'CUST';
				} else {
					propObj.popuptype = null;
				};

				if ( !fc_isNull( colProperty.filtertype ) ) {
					propObj.filtertype = ( fc_isNull( columnObj.filtertype ) ) ? colProperty.filtertype : columnObj.filtertype;
				};

				if ( !fc_isNull( colProperty.filterable ) ) {
					propObj.filterable = ( fc_isNull( columnObj.filterable ) ) ? colProperty.filterable : columnObj.filterable;
				};

				propObj.pinned     = ( fc_isNull( columnObj.frozen     ) ) ? colProperty.pinned     : columnObj.frozen;
				propObj.columntype = ( fc_isNull( columnObj.columntype ) ) ? colProperty.columntype : columnObj.columntype;
				propObj.hidden     = ( fc_isNull( columnObj.hidden     ) ) ? colProperty.hidden     : columnObj.hidden;
				propObj.nullable   = ( fc_isNull( columnObj.nullable   ) ) ? colProperty.nullable   : columnObj.nullable;

				if ( !fc_isNull( columnObj.group ) ) {
					propObj.columngroup = columnObj.group;
				};
				if ( !fc_isNull( colProperty.cellsrenderer ) ) {
					propObj.cellsrenderer = colProperty.cellsrenderer;
				};
				if ( !fc_isNull( displayObj.name ) ) {
					propObj.displayfield = displayObj.name;
				};
				if ( !fc_isNull( columnObj.cellbeginedit ) ) {
					propObj.cellbeginedit = columnObj.cellbeginedit;
				};
				if ( !fc_isNull( columnObj.cellclassname ) ) {
					propObj.cellclassname = columnObj.cellclassname;
				} else {
					propObj.cellclassname = function ( row, column, value, data ) {
						var className = '';
						if (isEdit) {
				            if ( !this.editable ) {
				            	className = window.gwClass.notGridEditClass;
				            } else if ( !this.nullable && this.datafield != 'JQX_CB' ) {
				            	className = window.gwClass.required;
				            };
						};
			            return className;
					};
				};
				// add popup attribute input box readonly
				if ( !fc_isNull( columnObj.inputreadonly ) ) {
					propObj.inputreadonly = columnObj.inputreadonly;
				}else{
					propObj.inputreadonly = colProperty.inputreadonly;
				};
				// add hidden column
				propObj.exportable = ( fc_isNull( columnObj.exportable ) ) ? ( !propObj.hidden ): columnObj.exportable;

				if ( colProperty.type == 'date' ) {
					bCalendar = false;
					bTime = false;
					switch ( columnObj.datatype.toLowerCase() ) {
					case 'yearmonth':
						propObj.cellsformat  = fc_getCustYearMonthFormat ();
						propObj.createeditor = function ( row, column, editor ) {
				            editor.jqxDateTimeInput({
				            		formatString: propObj.cellsformat,
				            		showCalendarButton: true,
				            		showTimeButton: false,
				            })};
						break;
					case 'monthday' :
						propObj.cellsformat  = fc_getCustMonthDayFormat ();
						propObj.createeditor = function ( row, column, editor ) {
				            editor.jqxDateTimeInput({
				            		formatString: propObj.cellsformat,
				            		showCalendarButton: true,
				            		showTimeButton: false,
				            })};
						break;
					case 'date' 	:
						propObj.cellsformat  = fc_getCustDateFormat ();
						propObj.createeditor = function ( row, column, editor ) {
				            editor.jqxDateTimeInput({
				            		formatString: propObj.cellsformat,
				            		showCalendarButton: true,
				            		showTimeButton: false,
				            })};
						break;
					case 'datetime' :
						propObj.cellsformat  = fc_getCustDateTimeFormat ();
						propObj.createeditor = function ( row, column, editor ) {
				            editor.jqxDateTimeInput({
				            		formatString: propObj.cellsformat,
				            		showCalendarButton: true,
				            		showTimeButton: true,
				            })};
						break;
					case 'datemin' 	:
						propObj.cellsformat  = fc_getCustDateMinFormat ();
						propObj.createeditor = function ( row, column, editor ) {
				            editor.jqxDateTimeInput({
				            		formatString: propObj.cellsformat,
				            		showCalendarButton: true,
				            		showTimeButton: true,
				            })};
						break;
					case 'datehour' :
						propObj.cellsformat  = fc_getCustDateHourFormat ();
						propObj.createeditor = function ( row, column, editor ) {
				            editor.jqxDateTimeInput({
				            		formatString: propObj.cellsformat,
				            		showCalendarButton: true,
				            		showTimeButton: true,
				            })};
						break;
					case 'time' 	:
						propObj.cellsformat  = fc_getCustTimeFormat ();
						propObj.createeditor = function ( row, column, editor ) {
				            editor.jqxDateTimeInput({
				            		formatString: propObj.cellsformat,
				            		showCalendarButton: false,
				            		showTimeButton: true,
				            })};
						break;
					case 'hour' 	:
						propObj.cellsformat  = fc_getCustHourFormat ();
						propObj.createeditor = function ( row, column, editor ) {
				            editor.jqxDateTimeInput({
				            		formatString: propObj.cellsformat,
				            		showCalendarButton: false,
				            		showTimeButton: true,
				            })};
						break;
					case 'hourmin' 	:
						propObj.cellsformat  = fc_getCustHourMinFormat ();
						propObj.createeditor = function ( row, column, editor ) {
				            editor.jqxDateTimeInput({
				            		formatString: propObj.cellsformat,
				            		showCalendarButton: false,
				            		showTimeButton: true,
				            })};
						break;
					case 'minsec' 	:
						propObj.cellsformat  = fc_getCustMinSecFormat ();
						propObj.createeditor = function ( row, column, editor ) {
				            editor.jqxDateTimeInput({
				            		formatString: propObj.cellsformat,
				            		showCalendarButton: false,
				            		showTimeButton: true,
				            })};
						break;
					}; // end of switch ( colProperty.type )
				} else {
					if ( !fc_isNull( colProperty.cellformat ) ) {
						propObj.cellsformat  = colProperty.cellformat;
					};
				};
				if ( !fc_isNull( columnObj.maxlength ) ) {
					colMaxLen[ propObj.datafield ] = columnObj.maxlength;
				};
				if ( !fc_isNull( columnObj.isMultiLanguage ) ) {
					propObj.isMultiLanguage  = columnObj.isMultiLanguage;
				} else {
					propObj.isMultiLanguage  = isUseMultiLanguage;
				};
				if ( isUseMultiLanguage ) {
					if ( propObj.isMultiLanguage ) {
						var _itemCd    = fc_isNull( columnObj.itemCd ) ? columnObj.name.toUpperCase() : columnObj.itemCd;
						var _itemValue = fc_isNull( columnObj.itemValue ) ? 0 : columnObj.itemValue;
						if ( window.gwMultiLang.isRunMain ) {
							propObj.text = fc_getGwLangItem( _itemCd, _itemValue, propObj.text );
							propObj.isMultiLanguage = false;
						} else {
							propObj.rendered = function ( columnHeaderElement ) {
								columnHeaderElement.addClass( window.gwClass.multilanguage );
								columnHeaderElement.attr( window.gwMesEnv.item.itemcd, fc_isNull( columnObj.itemCd ) ? columnObj.name.toUpperCase() : columnObj.itemCd );
								columnHeaderElement.attr( window.gwMesEnv.item.itemvalue, fc_isNull( columnObj.itemValue ) ? 0 : columnObj.itemValue );
							};
							fc_setLangId( _itemCd, _itemValue );
						};
					};
		        };
				return propObj;
			} catch ( e ) {
				fc_getException( e );
			};
		}; // End of _setColumnProp

		// Column Group Setting Create
		var _setGroupProp = function ( groupObj ) {
			try {
				var propObj = {};
				propObj.name  = groupObj.name.toUpperCase();
				propObj.text  = ( fc_isNull( groupObj.caption ) ) ?  groupObj.name.toUpperCase() : groupObj.caption;
				propObj.align = 'center'; // Header align

				if ( !fc_isNull( groupObj.parent ) ) {
					propObj.parentgroup = groupObj.parent;
				};
				if ( !fc_isNull( groupObj.isMultiLanguage ) ) {
					propObj.isMultiLanguage = groupObj.isMultiLanguage;
				} else {
					propObj.isMultiLanguage = isUseMultiLanguage;
				};
				if ( isUseMultiLanguage ) {
					if ( propObj.isMultiLanguage ) {
						var _itemCd    = fc_isNull( groupObj.itemCd    ) ? groupObj.name.toUpperCase() : groupObj.itemCd;
						var _itemValue = fc_isNull( groupObj.itemValue ) ? 0 : groupObj.itemValue;

						if ( window.gwMultiLang.isRunMain ) {
							propObj.text = fc_getGwLangItem( _itemCd, _itemValue, propObj.text );
							propObj.isMultiLanguage = false;
						} else {
							propObj.rendered = function( element ) {
								element.addClass( window.gwClass.multilanguage );
								element.attr( window.gwMesEnv.item.itemcd   , fc_isNull( groupObj.itemCd    ) ? groupObj.name.toUpperCase() : groupObj.itemCd );
								element.attr( window.gwMesEnv.item.itemvalue, fc_isNull( groupObj.itemValue ) ? 0 : groupObj.itemValue );
							};
					        fc_setLangId( _itemCd, _itemValue );
						};
					};
		        };
				return propObj;
			} catch ( e ) {
				fc_getException( e );
			};
		}; // End of _setGroupProp

		var _createRowNum = function ( chkFlag ) {
			try {
				var rowNumObj   = new Object();
				var colProperty = new Object();
				colProperty.type       = 'number';
				colProperty.align      = 'center';
				colProperty.columntype = 'number';
				colProperty.editable   = false;
				colProperty.sortable   = false;
				colProperty.filterable = false;

				rowNumObj = _setColumnProp( {caption: '', name:'JQX_RN', align: 'center', width: 35, frozen: true }, colProperty, {});
				rowNumObj.cellsrenderer = function( row, column, value ) {
		            return "<div style='margin:4px;text-align: center;'>" + ( value + 1 ) + "</div>";
		        };

				rowNumObj.groupable  = false;
				rowNumObj.draggable  = false;
				rowNumObj.resizable  = false;
				rowNumObj.hidden     = false;
				rowNumObj.exportable = false;
				rowNumObj.text       = '';

				return rowNumObj;
			} catch ( e ) {
				fc_getException( e );
			};
		};
		//CheckBox Column Create
		var _createSelectBox = function ( chkFlag ){
			try {
				var checkboxObj = new Object();
				var topMargin   = '3px';
				if ( chkFlag )	topMargin = '50%';

				//{ type: 'check' , align: 'center', editable: true, sortable: true, pinned: false, filtertype: 'bool', columntype: 'checkbox' };
				var colProperty = new Object();
				colProperty.type         = 'check';
				colProperty.align        = 'center';
				colProperty.editable     = true;
				colProperty.sortable     = false;
				colProperty.pinned       = false;
				colProperty.columntype   = 'checkbox';
				colProperty.displayValue = {};
				colProperty.filterable   = false;

				var dispObj = {};
				// add hidden column
				checkboxObj = _setColumnProp( {caption: '', name:'JQX_CB', align: 'center', width: 30, frozen: true, exportable: false }, colProperty, {});
				checkboxObj.renderer = function() {
					return '<div style="margin-left: 5px; margin-top: ' + topMargin + ';"></div>';
				};

				checkboxObj.resizable = false;
				checkboxObj.rendered  = function( element ) {
					$( element ).jqxCheckBox( { theme: window.gwMesEnv.themes, width: 18, height: 18, animationShowDelay: 0, animationHideDelay: 0 });
					columnCheckBox = $( element );
					$( element ).on( 'change', function ( event ) {
						var checked  = event.args.checked;
						var instance = $( '#' + gridId ).jqxGrid( 'getInstance' );
						var pageinfo = instance.getpaginginformation();
						var pagenum  = pageinfo.pagenum;
						var pagesize = pageinfo.pagesize;
						if ( checked == null || updatingCheckState ) return;
						instance.beginupdate();

						// update cells values.
						var startrow = pagenum * pagesize;
						var totalCnt = instance.dataview.totalrecords;
						arrChecked = new Array();

						for ( var i=startrow;i<totalCnt;i++ ) {
							instance.setcellvalue( i, 'JQX_CB', event.args.checked );
							if ( event.args.checked )
								arrChecked.push( i );
						};
						arrChecked.sort( function( a, b ) { return a-b; } );
						instance.checkedrow = arrChecked;
						instance.endupdate();
					});
					return true;
				};
				return checkboxObj;
			} catch ( e ) {
				fc_getException( e );
			};
		};

		//CheckBox Column Create
		var _createSelectBoxDataField = function() {
			try {
				var checkboxFieldObj = new Object();

				checkboxFieldObj.name = 'JQX_CB';
				checkboxFieldObj.type = 'bool';

				return checkboxFieldObj;
			} catch ( e ) {
				fc_getException( e );
			};
		};

	    // Grid Column Setting (Column Field Property)
		for ( var loop=0;loop<gridCols.length;loop++ ) {
			// input validation
			var preMsg = '<b>Program Error: jQueryGrid</b><br><br>';
			if ( fc_isNull( gridCols[ loop ].name ) ) {
				throw new Error( preMsg + 'Column Name Property ' + window.gwMessage.validate.nodefined );
			};
			if ( fc_isNull( gridCols[ loop ].datatype ) ) {
				throw new Error( preMsg + 'Column Datatype Property ' + window.gwMessage.validate.nodefined );
			};
			//---------------------------------------------------------------------
			var colProperty;
			var datatype = gridCols[ loop ].datatype;

			try {
				if ( datatype == 'lov' ) {
					colProperty = new Object();
					colProperty.type         = 'text';
					colProperty.align        = 'left';
					colProperty.editable     = true;
					colProperty.nullable     = true;
					colProperty.sortable     = true;
					colProperty.pinned       = false;
					colProperty.filtertype   = 'checkedlist';
					colProperty.columntype   = 'dropdownlist';
					colProperty.displayValue = {};
				}else if ( datatype == 'chklov' ) {
					colProperty = new Object();
					colProperty.type         = 'text';
					colProperty.align        = 'left';
					colProperty.editable     = true;
					colProperty.nullable     = true;
					colProperty.sortable     = true;
					colProperty.pinned       = false;
					colProperty.filtertype   = 'checkedlist';
					colProperty.columntype   = 'template';
					colProperty.displayValue = {};
				} else if ( datatype == 'cbolov' ) {
					colProperty = new Object();
					colProperty.type         = 'text';
					colProperty.align        = 'left';
					colProperty.editable     = true;
					colProperty.nullable     = true;
					colProperty.sortable     = true;
					colProperty.pinned       = false;
					colProperty.filtertype   = 'checkedlist';
					colProperty.columntype   = 'combobox';
					colProperty.displayValue = {};
				} else {
					colProperty = new Object();
					colProperty = fc_getGridTemplate( datatype );
				}
			} catch ( e ) {
				colProperty = new Object();
				colProperty = fc_getGridTemplate( 'text' );
			}; // end of try

			var dataFieldObj  = new Object();
			dataFieldObj.name = gridCols[ loop ].name.toUpperCase();

			// Type LOV Case : Create Display Column
			var _displayCol = function ( fieldName ) {
				var dispObj = {};
				dispObj.name   = 'DISP_' + fieldName;
				dispObj.value  = fieldName;
				dispObj.values = colProperty.displayValue;
				return dispObj;
			};

			// Type LOV Case : Setting Display Column
			var dispObj = {};
			if ( datatype.toLowerCase() == 'lov' || datatype == 'cbolov' ) { //|| datatype == 'chklov'
				dispObj = _displayCol( dataFieldObj.name, colProperty );
				arrDataField[ arrDataField.length ] = dispObj;
			};

			// Field Type Setting
			var fieldtype = colProperty.type;
			if ( !fc_isNull( fieldtype ) ) {
				switch ( fieldtype.toLowerCase() ) {
				case 'text' :
					dataFieldObj.type = 'string';
					break;
				case 'date' :
					dataFieldObj.type = 'date';
					break;
				case 'number' :
					if ( !fc_isNull( gridCols[ loop ].minvalue ) ) dataFieldObj.minvalue = gridCols[ loop ].minvalue;
					if ( !fc_isNull( gridCols[ loop ].maxvalue ) ) dataFieldObj.maxvalue = gridCols[ loop ].maxvalue;

					dataFieldObj.type = 'number';
					break;
				case 'check' :
					dataFieldObj.type = 'bool';
					break;
				default :
					dataFieldObj.type = 'string';
					break;
				};
				dataFieldObj.datatype = datatype;
			}; // End of if ( !fc_isNull( fieldtype ) )

			arrDataField[ arrDataField.length ] = dataFieldObj;

			arrCol[ loop ] = _setColumnProp( gridCols[ loop ], colProperty, dispObj );
			arrColIDs[ loop ] = gridCols[ loop ].name;

			var _itemcd  = ( fc_isNull( gridCols[ loop ].itemCd    ) ) ? gridCols[ loop ].name : gridCols[ loop ].itemCd.toUpperCase();
			var _itemval = ( fc_isNull( gridCols[ loop ].itemValue ) ) ? 0 : gridCols[ loop ].itemValue;

			if (  arrCol[ loop ].isMultiLanguage )
				arrMultiLang.push( new _multiLangItem( gridCols[ loop ].name,  _itemcd, _itemval ) );

			// Popup Code key Setting
			if ( datatype == 'popup' || datatype == 'custpopup' )
				arrColPopup[ arrColPopup.length ] = arrCol[ loop ];
		}; // End of for ( var loop = 0; loop<gridCols.length; loop++ )

		// All Grid Setting Row Status Column
		colProperty = new Object();
		colProperty = fc_getGridTemplate( 'status' );

		//CheckBox Column Create
		var _createStatusDataField = function() {
			try {
				var statusFieldObj = new Object();

				statusFieldObj.name = 'JQX_RS';
				statusFieldObj.type = 'string';

				return statusFieldObj;
			} catch ( e ) {
				fc_getException( e );
			};
		};

		arrCol[ arrCol.length ] = _setColumnProp( {caption: 'Row Status', name:'JQX_RS', align: 'center', width: 50}, colProperty, {});
		arrDataField[ arrDataField.length ] = _createStatusDataField();

		var checkHeightFlag = false;

		if ( !fc_isNull( gridColGroups ) ) {
			for ( var jLoop = 0; jLoop<gridColGroups.length; jLoop++ ) {
				arrColGrp[ jLoop ] = _setGroupProp( gridColGroups[ jLoop ] );
				if ( arrColGrp[ jLoop ].isMultiLanguage ) {
					var _itemcd  = ( fc_isNull( gridColGroups[ jLoop ].itemCd    ) ) ? gridColGroups[ jLoop ].name : gridColGroups[ jLoop ].itemCd.toUpperCase();
					var _itemval = ( fc_isNull( gridColGroups[ jLoop ].itemValue ) ) ? 0 : gridColGroups[ jLoop ].itemValue;
					arrGroupMultiLang.push( new _multiLangItem( gridColGroups[ jLoop ].name,  _itemcd, _itemval ) );
				};
			};
			checkHeightFlag = true;
		} else {
			arrColGrp = null;
		}; // End of if ( !fc_isNull(gridColGroups) )

		//First CheckBox Column append
		if ( gridType.toLowerCase() != 'search' ) {
			arrCol.unshift( _createSelectBox( checkHeightFlag ) );
			arrDataField.unshift( _createSelectBoxDataField() );
		};
		arrCol.unshift( _createRowNum() );

		// Setting DataSource Property
		dataSource.datafields    = arrDataField;
		dataSource.gridType      = gridType;
		dataSource.gridKey       = gridKey;
		dataSource.gridIDs       = arrColIDs;
		dataSource.gridPager     = pagerId;
		dataSource.colMultiLang       = arrMultiLang;
		dataSource.colGroupMultiLang  = arrGroupMultiLang;

		var getEditorPopupDataAdapter = function( datafield ) {
	        var inputSource = dataSource;
	        var dataAdapter = new $.jqx.dataAdapter( inputSource, { uniqueDataFields: [datafield] } );
	        return dataAdapter;
	    }; // End of getEditorPopupDataAdapter

	    // Context Menu Create
		var contextMenu = $( '#' + gridId + 'CM' ).jqxMenu( { theme: window.gwMesEnv.themes, width: 200, autoOpenPopup: false, mode: 'popup' } );

		var _PKcellbeginedit = function( row, datafield, columntype ) {
			try {
				var rowStatus = fc_getCellData( gridId, row, 'JQX_RS' );
		        if ( rowStatus != window.gwMesEnv.grid.addFlag ) return false;

		        return true;
			} catch ( e ) {
				fc_getException( e );
			};
	    };

		// Pager Setting
		var _createPagerRender = function () {
			try {
				var me = this.that;
				this.pagerheight = 34;
				var pagergotopagestring = this.gridlocalization.pagergotopagestring; // Go to page:
	            var pagerrangestring    = this.gridlocalization.pagerrangestring; // of
	            var pagershowrowsstring = this.gridlocalization.pagershowrowsstring; // Show rows:
	            var top = ( this.pagerheight - 17 ) / 2; // 5.5


	            this.custompagecontainer = this.custompagecontainer || $( "<div style='margin-left: 10px; margin-top: 0px; margin-right: 10px; padding-right:10px;width: 100%; height: 100%;'></div>" );

                /* Pager ADD / DELETE / COPY Button Create  */
                this.pagereloadbtn = this.pagereloadbtn || $( "<div style='float: left;'><div style='margin: 4px; width: 21px; height: 19px;'></div></div>" );
                this.pageaddbtn    = this.pageaddbtn    || $( "<div style='float: left;'><div style='margin: 4px; width: 21px; height: 19px;'></div></div>" );
                this.pagecopybtn   = this.pagecopybtn   || $( "<div style='float: left;'><div style='margin: 4px; width: 21px; height: 19px;'></div></div>" );
                this.pagedeletebtn = this.pagedeletebtn || $( "<div style='float: left;'><div style='margin: 4px; width: 21px; height: 19px;'></div></div>" );

                this.custompagecontainer.append( this.pagereloadbtn );
                this.custompagecontainer.append( this.pageaddbtn    );
                this.custompagecontainer.append( this.pagecopybtn   );
                this.custompagecontainer.append( this.pagedeletebtn );

                this.removeHandler( this.pagereloadbtn, 'click' );
                this.removeHandler( this.pageaddbtn   , 'click' );
                this.removeHandler( this.pagecopybtn  , 'click' );
                this.removeHandler( this.pagedeletebtn, 'click' );

                this.pagereloadbtn.attr( 'id', 'GRID_RELOAD_BTN' );
                this.pageaddbtn.attr   ( 'id', 'GRID_ADD_BTN'    );
                this.pagecopybtn.attr  ( 'id', 'GRID_COPY_BTN'   );
                this.pagedeletebtn.attr( 'id', 'GRID_DEL_BTN'    );

                this.pagereloadbtn.jqxButton( {cursor: 'pointer', enableDefault: false, disabled: false, height: 20, width: 20, theme: window.gwMesEnv.themes } );
                this.pageaddbtn.jqxButton   ( {cursor: 'pointer', enableDefault: false, disabled: false, height: 20, width: 20, theme: window.gwMesEnv.themes } );
                this.pagecopybtn.jqxButton  ( {cursor: 'pointer', enableDefault: false, disabled: false, height: 20, width: 20, theme: window.gwMesEnv.themes } );
                this.pagedeletebtn.jqxButton( {cursor: 'pointer', enableDefault: false, disabled: false, height: 20, width: 20, theme: window.gwMesEnv.themes } );

                this.pagereloadbtn.find( 'div:first' ).addClass( toTheme( 'jqx-icon-search' ) );
                this.pageaddbtn.find   ( 'div:first' ).addClass( toTheme( 'jqx-icon-plus'   ) );
                this.pagecopybtn.find  ( 'div:first' ).addClass( toTheme( 'jqx-icon-edit'   ) );
                this.pagedeletebtn.find( 'div:first' ).addClass( toTheme( 'jqx-icon-delete' ) );

                if ( me.pagereloadbtn.jqxButton( 'disabled' ) ) {
                	this.pagereloadbtn.jqxTooltip( { position: 'top-right', content: fc_isNull( window.gwMessage.caption.disreload ) ? 'Disable Reload' : window.gwMessage.caption.disreload, theme: window.gwMesEnv.themes} );
                } else {
                	this.pagereloadbtn.jqxTooltip( { position: 'top-right', content: fc_isNull( window.gwMessage.caption.reload ) ? 'Reload' : window.gwMessage.caption.reload, theme: window.gwMesEnv.themes} );
                };
                if ( me.pageaddbtn.jqxButton( 'disabled' ) ) {
                	this.pageaddbtn.jqxTooltip( { position: 'top-right', content: fc_isNull( window.gwMessage.caption.disaddrow ) ? 'Disable Add Row' : window.gwMessage.caption.disaddrow, theme: window.gwMesEnv.themes} );
                } else {
                	this.pageaddbtn.jqxTooltip( { position: 'top-right', content: fc_isNull( window.gwMessage.caption.addrow ) ? 'Add Row' : window.gwMessage.caption.addrow, theme: window.gwMesEnv.themes} );
                };
                if ( me.pagecopybtn.jqxButton( 'disabled' ) ) {
                	this.pagecopybtn.jqxTooltip( { position: 'top-right', content: fc_isNull( window.gwMessage.caption.discopyrow ) ? 'Disable Copy Row' : window.gwMessage.caption.discopyrow, theme: window.gwMesEnv.themes} );
                } else {
                	this.pagecopybtn.jqxTooltip( { position: 'top-right', content: fc_isNull( window.gwMessage.caption.copyrow ) ? 'Copy Row' : window.gwMessage.caption.copyrow, theme: window.gwMesEnv.themes} );
                };
                if ( me.pagedeletebtn.jqxButton( 'disabled' ) ) {
                	this.pagedeletebtn.jqxTooltip( { position: 'top-right', content: fc_isNull( window.gwMessage.caption.disdelrow ) ? 'Disable Delete Row' : window.gwMessage.caption.disdelrow, theme: window.gwMesEnv.themes} );
                } else {
                	this.pagedeletebtn.jqxTooltip( { position: 'top-right', content: fc_isNull( window.gwMessage.caption.delrow ) ? 'Delete Row' : window.gwMessage.caption.delrow, theme: window.gwMesEnv.themes} );
                };

                this.addHandler( this.pagereloadbtn, 'click', function() {
                    if ( !me.pagereloadbtn.jqxButton( 'disabled' ) ) {
                    	fc_setGridComboFilterSwitch( gridId, false );
                        me.updatebounddata();
                    	fc_setGridComboFilterSwitch( gridId, true );
                    };
                });

                this.addHandler( this.pageaddbtn, 'click', function() {
                    if ( !me.pageaddbtn.jqxButton( 'disabled' ) ) {
                    	try {
                        	if ( !fc_checkParentGridSelected( gridId ) ) return;
    		            	var emptyRow = new Object();	// declare empty row object
    		            	emptyRow[ 'JQX_RS' ] = window.gwMesEnv.grid.addFlag;
    		            	emptyRow[ 'JQX_CB' ] = true;

    		            	var selrow = fc_getSelRow( gridId );
    		            	var rowIdx = 0;

			            	if (selrow != -1 ) rowIdx = selrow;

    		            	var sourceUid = $( '#' + gridId ).jqxGrid( 'getrowid', rowIdx );
    		            	var processFlag = true;
    		            	if ( typeof f_beforeRowControl === 'function' ) {
    		            		try {
    		            			processFlag = f_beforeRowControl( { EVENT :'I', GRID_ID : gridId, ROW_ID: sourceUid, ROW_IDX: rowIdx } );
    		            		} catch ( e ) {
    		            			fc_getException( e );
    		            		};
    		            	};

    		            	if ( selrow != -1 ) {
			            		if ( me.addrowbottom ) {
	    		            		rowIdx = rowIdx + 1;
	    		            	};
			            	};

    		            	if ( fc_isNull( processFlag ) ) processFlag = true;
    		            	if ( processFlag ) {
    		            		fc_addRowData( gridId, null, emptyRow, rowIdx );
    		            	} else return ;

    		            	var targetUid = $( '#' + gridId ).jqxGrid( 'getrowid', rowIdx );

    		            	if ( typeof f_afterRowControl === 'function' ) {
    		            		try {
    		            			f_afterRowControl( { EVENT :'I', GRID_ID : gridId, ROW_ID: targetUid, ROW_IDX: rowIdx } );
    		            		} catch ( e ) {
    		            			fc_getException( e );
    		            		};
    		            	};

    		            	// pk columns editable
    		            	var pkNames = fc_getGridPKeys( gridId );
    		            	if ( $.isArray( pkNames ) ) {
    		                	fc_setColEditable( gridId, pkNames, true );
    		                	for ( var loop=0;loop<pkNames.length;loop++ ) {
    		                		fc_setColProp( gridId, pkNames[loop], 'cellbeginedit', _PKcellbeginedit );
    		                	};
    		            	};
    		            	fc_setSelectRow( gridId, rowIdx );
                    	} catch ( e ) {
		        			fc_getException( e );
                    	};
                    };
                });

                this.addHandler(this.pagecopybtn, 'click', function() {
                    if ( !me.pagecopybtn.jqxButton( 'disabled' ) ) {
                    	try {
	                    	if ( !fc_checkParentGridSelected( gridId ) ) return;
			            	var selrow = fc_getSelRow(gridId);

			            	if ( selrow < 0 ) {
			            		throw new Error( window.gwMessage.validate.noselectrow );
			            		return;
			            	};
			            	var rowIdx = 0;
			            	if ( selrow != -1 ) rowIdx = selrow;

			            	var rowData = new Object();
			           		rowData = fc_getRowData( gridId, rowIdx );
			            	rowData[ 'JQX_RS' ] = window.gwMesEnv.grid.addFlag;
			            	rowData[ 'JQX_CB' ] = true;

			            	var sourceUid = $( '#' + gridId ).jqxGrid( 'getrowid', rowIdx );
			            	var processFlag = true;

			            	if ( typeof f_beforeRowControl === 'function' ) {
			            		try {
			            			processFlag = f_beforeRowControl( { EVENT :'C', GRID_ID : gridId, ROW_ID: sourceUid, ROW_IDX: rowIdx } );
			            		} catch ( e ) {
			            			fc_getException( e );
			            		};
			            	};
			            	var sourceIdx = $( '#' + gridId ).jqxGrid( 'getrowboundindexbyid', sourceUid );

			            	if ( me.addrowbottom ) {
    		            		rowIdx = rowIdx + 1;
    		            	};
			            	var srcrowstatus = fc_getCellData( gridId, sourceIdx, 'JQX_RS' );
			            	if ( fc_isNull( srcrowstatus ) ) {
			            		fc_setCellData( gridId, sourceIdx, 'JQX_CB', false );
			            	};
			            	if ( fc_isNull( processFlag ) ) processFlag = true;
			            	if ( processFlag )
			            		fc_addRowData( gridId, null, rowData, rowIdx );
			            	else return;

			            	$( '#' + gridId ).jqxGrid( 'endupdate' );

			            	var targetUid = $( '#' + gridId ).jqxGrid( 'getrowid', rowIdx );

			            	if ( typeof f_afterRowControl === 'function' ) {
			            		try {
			            			f_afterRowControl( { EVENT: 'C', GRID_ID: gridId, ROW_ID: targetUid, ROW_IDX: rowIdx } );
			            		} catch ( e ) {
			            			fc_getException( e );
			            		};
			            	};

			            	// pk columns editable
			            	var pkNames = fc_getGridPKeys( gridId );
			            	if ( $.isArray( pkNames ) ) {
			                	fc_setColEditable( gridId, pkNames, true );
			                	for ( var loop=0;loop<pkNames.length;loop++ ) {
			                		fc_setColProp( gridId, pkNames[ loop ], 'cellbeginedit', _PKcellbeginedit );
			                	};
			            	};
			            	fc_setSelectRow( gridId, rowIdx );
                    	} catch ( e ) {
		        			fc_getException( e );
                    	};
                    };
                });

                this.addHandler( this.pagedeletebtn, 'click', function () {
                    if ( !me.pagedeletebtn.jqxButton( 'disabled' ) ) {
                    	try {
			        		var selRows = fc_getSelectedRow( gridId );
			        		if ( selRows.length == 0 ) {
			            		throw new Error( window.gwMessage.validate.noselectrow );
			            		return;
			            	};

			            	var processFlag = true;
			            	var selectFlag  = false;

			            	if ( typeof f_beforeRowControl === 'function' ) {
			            		try {
			            			processFlag = f_beforeRowControl( { EVENT: 'D', GRID_ID: gridId } );
			            		} catch ( e ) {
			            			fc_getException( e );
			            		};
			            	};

			            	if ( fc_isNull( processFlag ) ) processFlag = true;
			            	if ( processFlag ) {
				            	for ( var loop = selRows.length-1; loop>=0; loop-- ) {
				                    var uidbyIdx = $( '#' + gridId ).jqxGrid( 'getrowid', selRows[ loop ] );
				            		var rsValue  = fc_getCellData( gridId, selRows[ loop ], 'JQX_RS' );
				            		if ( rsValue == window.gwMesEnv.grid.addFlag ) {
				            			if ( typeof f_beforeRowControl === 'function' ) {
						            		try {
						            			processFlag = f_beforeRowControl( { EVENT : 'D', GRID_ID : gridId, ROW_ID: uidbyIdx, ROW_IDX: selRows[ loop ] } );
						            		} catch ( e ) {
						            			fc_getException( e );
						            		};
						            	};
						            	if ( fc_isNull( processFlag ) ) processFlag = true;
						            	if ( !processFlag ) return;

				            			fc_delRowData( gridId, uidbyIdx );
				            		};
				            	};
			            	} else {
			            		return;
			            	};

			            	$( '#' + gridId ).jqxGrid( 'endupdate' );
			            	if ( typeof f_afterRowControl === 'function' ) {
			            		try {
			            			f_afterRowControl( { EVENT: 'D', GRID_ID: gridId } );
			            		} catch ( e ) {
			            			fc_getException( e );
			            		};
			            	};
		        		} catch ( e ) {
		        			fc_getException( e );
		        		};
                    }
                });
                if ( !this.isGridEdit ) {
                	this.isShowAdd = false;
                	this.isShowCopy = false;
                	this.isShowDel = false;
                };

                if ( this.isShowReload )  this.pagereloadbtn.show();
                else this.pagereloadbtn.hide();

                if ( this.isShowAdd )  this.pageaddbtn.show();
                else this.pageaddbtn.hide();

                if ( this.isShowCopy )  this.pagecopybtn.show();
                else this.pagecopybtn.hide();

                if ( this.isShowDel )  this.pagedeletebtn.show();
                else this.pagedeletebtn.hide();
                /* End of Pager ADD / DELETE / COPY Button Create  */

	            /* pager View Count logic */
	            this.pagerdetails = this.pagerdetails || $( '<div style="padding-right:15px;font-size: 14px; margin: 2px 3px; font-weight: normal; color: #666; float: right;"></div>' );

                this.custompagecontainer.append( this.pagerdetails );

                this.pagerdetails.css( 'float'       , 'right' );
                this.pagerdetails.css( 'margin-left' , '0px' );
                this.pagerdetails.css( 'margin-right', '7px' );
                /* End of pager View Count logic */

	            /* pager Create logic */
	            this.pagercontaner = this.pagercontaner || $( "<div style='width: 275px; height: 100%; margin:0px auto;' id='"+ pagerId +"'></div>" );
	            this.pagercontaner[ 0 ].id = this.element.id + '_pager';

                this.custompagecontainer.append( this.pagercontaner );
				this.pagercontaner.addClass( 'div-parent-pager' );

				this.pagergoto      = this.pagergoto      || $( '<div style="float: right; margin-right: 7px;"></div>' );
				this.pagergotoinput = this.pagergotoinput || $( '<div style="margin-right: 7px; width: 27px; height: 17px; float: right;"><input style="margin-top: 0px; text-align: right; width: 27px;" type="text"/></div>' );

				this.pagerfirstbutton = this.pagerfirstbutton || $( "<div style='float: left;'></div>" );
				this.pagerleftbutton  = this.pagerleftbutton  || $( "<div style='float: left;'></div>" );
				this.pagerrightbutton = this.pagerrightbutton || $( "<div style='float: right;'></div>" );
				this.pagerlastbutton  = this.pagerlastbutton  || $( "<div style='float: right;'></div>" );

	            if ( this.pagershowrowscombo && this.pagershowrowscombo.jqxDropDownList ) {
                    this.pagershowrowscombo.remove();
                    this.pagershowrowscombo = null;
                };

	            this.pagershowrows      = this.pagershowrows      || $( '<div style="margin-right: 7px; float: right;"></div>' );
	            this.pagershowrowscombo = this.pagershowrowscombo || $( '<div id="gridpagerlist" style="margin-top: 0px; margin-right: 7px; float: right;"></div>' );

                this.pagershowrowscombo[ 0 ].id = 'gridpagerlist' + this.element.id;
                this.removeHandler( this.pagerrightbutton, 'mousedown' );
                this.removeHandler( this.pagerrightbutton, 'mouseup'   );
                this.removeHandler( this.pagerrightbutton, 'click'     );
                this.removeHandler( this.pagerleftbutton , 'mousedown' );
                this.removeHandler( this.pagerleftbutton , 'mouseup'   );
                this.removeHandler( this.pagerleftbutton , 'click'     );
                this.removeHandler( this.pagerfirstbutton, 'mousedown' );
                this.removeHandler( this.pagerfirstbutton, 'mouseup'   );
                this.removeHandler( this.pagerfirstbutton, 'click'     );
                this.removeHandler( this.pagerlastbutton , 'mousedown' );
                this.removeHandler( this.pagerlastbutton , 'mouseup'   );
                this.removeHandler( this.pagerlastbutton , 'click'     );

                this.pagerfirstbutton.attr( 'title', this.gridlocalization.pagerfirstbuttonstring    );
                this.pagerleftbutton.attr ( 'title', this.gridlocalization.pagerpreviousbuttonstring );
                this.pagerrightbutton.attr( 'title', this.gridlocalization.pagernextbuttonstring     );
                this.pagerlastbutton.attr ( 'title', this.gridlocalization.pagerlastbuttonstring     );

                if ( this.isPageable ) {
                	this.pagercontaner.append( this.pagerfirstbutton   );
                	this.pagercontaner.append( this.pagerleftbutton    );
                	this.pagercontaner.append( this.pagerlastbutton    );
                	this.pagercontaner.append( this.pagerrightbutton   );
                	this.pagercontaner.append( this.pagershowrowscombo );
                } else {
                	this.pagercontaner.children().remove();
                };

                this.pagerfirstbutton.jqxButton( { cursor: 'pointer', disabled: this.disabled, theme: this.theme } );
                this.pagerrightbutton.jqxButton( { cursor: 'pointer', disabled: this.disabled, theme: this.theme } );
                this.pagerleftbutton.jqxButton ( { cursor: 'pointer', disabled: this.disabled, theme: this.theme } );
                this.pagerlastbutton.jqxButton ( { cursor: 'pointer', disabled: this.disabled, theme: this.theme } );

                this.pagerfirstbutton.find( '.jqx-icon-arrow-first' ).remove();
                this.pagerleftbutton.find ( '.jqx-icon-arrow-left'  ).remove();
                this.pagerrightbutton.find( '.jqx-icon-arrow-right' ).remove();
                this.pagerlastbutton.find ( '.jqx-icon-arrow-last'  ).remove();

                var firstarrow = $( "<div style='margin-left: 9px; width: 16px; height: 16px;'></div> ");
                firstarrow.addClass( this.toThemeProperty( 'jqx-icon-arrow-first' ) );
                this.pagerfirstbutton.wrapInner( firstarrow );

                var leftarrow = $( "<div style='margin-left: 6px; width: 15px; height: 15px;'></div> ");
                leftarrow.addClass( this.toThemeProperty( 'jqx-icon-arrow-left' ) );
                this.pagerleftbutton.wrapInner( leftarrow );

                var rightarrow = $( "<div style='margin-left: 6px; width: 15px; height: 15px;'></div>" );
                rightarrow.addClass( this.toThemeProperty( 'jqx-icon-arrow-right' ) );
                this.pagerrightbutton.wrapInner( rightarrow );

                var lastarrow = $( "<div style='margin-left: 6px; width: 15px; height: 15px;'></div>" );
                lastarrow.addClass( this.toThemeProperty( 'jqx-icon-arrow-last' ) );
                this.pagerlastbutton.wrapInner( lastarrow );

                this.pagerfirstbutton.width( 36 );
                this.pagerleftbutton.width ( 36 );
                this.pagerrightbutton.width( 36 );
                this.pagerlastbutton.width ( 36 );

                if ( this.isPageable ) {
	                this.pagercontaner.append( this.pagergotoinput );
	                this.pagercontaner.append( this.pagergoto );
                };

                var source = this.pagesizeoptions;
                if ( !this.pagershowrowscombo.jqxDropDownList ) {
                    throw new Error( 'jqxGrid: jqxdropdownlist.js is not loaded.' );
                    return;
                };

                this.pagershowrowscombo.jqxDropDownList({
                	  rtl: this.rtl
                	, disabled: this.disabled
                	, source: source
                	, enableBrowserBoundsDetection: true
                	, keyboardSelection: false
                	, autoDropDownHeight: true
                	, width: 'auto'
                	, height: 16
                	, theme: this.theme
                });

                var selectedindex = 0;
                for ( var i=0;i<source.length;i++ ) {
                    if ( this.pagesize >= source[ i ] ) {
                    	selectedindex = i;
                    };
                };

                /* add Page Detail Logic */
                this.customupdatepagerdetails();
                /* add Page Detail Logic End */

                this.pagershowrowscombo.jqxDropDownList( { selectedIndex: selectedindex } );

                this.pagergoto[ 0 ].innerHTML = pagergotopagestring;

                this.pagerpageinput = this.pagergotoinput.find( 'input' );
                this.pagerpageinput.addClass( this.toThemeProperty( 'jqx-input' ) );
                this.pagerpageinput.addClass( this.toThemeProperty( 'jqx-widget-content' ) );

                this.removeHandler( this.pagershowrowscombo, 'select' );
                this.addHandler   ( this.pagershowrowscombo, 'select', function( event ) {
                    if ( event.args ) {
                        if ( me.vScrollInstance ) {
                            me.vScrollInstance.setPosition( 0 );
                        };
                        if ( me.editcell != null && me.endcelledit ) {
                            me.endcelledit( me.editcell.row, me.editcell.column, true, false );
                        };
                        var index       = event.args.index;
                        var recordindex = me.dataview.pagenum * me.dataview.pagesize;
                        var pagesize    = source[ index ];
                        var oldpagesize = me.pagesize;
                        me.pagesize     = parseInt( pagesize );
                        if ( isNaN( me.pagesize ) ) {
                            me.pagesize = 10;
                        };
                        if ( pagesize >= 100 ) {
                            me.pagershowrowscombo.jqxDropDownList( { width: 'auto' } );
                        } else {
                            me.pagershowrowscombo.jqxDropDownList( { width: 44 } );
                        };

                        me.dataview.pagesize = me.pagesize;
                        var pagenum = Math.floor( recordindex / me.dataview.pagesize );
                        me.prerenderrequired = true;
                        me._requiresupdate   = true;
                        me._raiseEvent( 10, { pagenum: pagenum, oldpagesize: oldpagesize, pagesize: me.dataview.pagesize } );
                        me.gotopage( pagenum );
                        if ( me.autoheight && me._updatesizeonwindowresize ) {
                            me._updatesize( true );
                            setTimeout( function() {
                                me._updatesize( true );
                            }, 500 );
                        };
                    };
                });

                var input = this.pagergotoinput.find( 'input' );
                input.addClass( this.toThemeProperty( 'jqx-grid-pager-input' ) );
                input.addClass( this.toThemeProperty( 'jqx-rc-all' ) );
                this.removeHandler( input, 'keydown' );
                this.removeHandler( input, 'change'  );

                this.addHandler( input, 'keydown', function( event ) {
                    if ( event.keyCode >= 65 && event.keyCode <= 90 )
                        return false;

                    if ( event.keyCode == '13' ) {
                        var val = input.val();
                        val = parseInt( val );
                        if ( !isNaN( val ) ) {
                            me.gotopage( val - 1 );
                        };
                        return false;
                    };
                });
                this.addHandler( input, 'change', function() {
                    var val = input.val();
                    val = parseInt( val );
                    if ( !isNaN( val ) ) {
                        me.gotopage( val - 1 );
                    };
                });

                this.addHandler( this.pagerrightbutton, 'mouseenter', function() {
                    rightarrow.addClass( me.toThemeProperty( 'jqx-icon-arrow-right-hover' ) );
                });
                this.addHandler( this.pagerleftbutton, 'mouseenter', function() {
                    leftarrow.addClass( me.toThemeProperty( 'jqx-icon-arrow-left-hover' ) );
                });
                this.addHandler( this.pagerrightbutton, 'mouseleave', function() {
                    rightarrow.removeClass( me.toThemeProperty( 'jqx-icon-arrow-right-hover' ) );
                });
                this.addHandler( this.pagerleftbutton, 'mouseleave', function() {
                    leftarrow.removeClass( me.toThemeProperty( 'jqx-icon-arrow-left-hover' ) );
                });
                this.addHandler( this.pagerrightbutton, 'mousedown', function() {
                    rightarrow.addClass( me.toThemeProperty( 'jqx-icon-arrow-right-selected' ) );
                });
                this.addHandler( this.pagerrightbutton, 'mouseup', function() {
                    rightarrow.removeClass( me.toThemeProperty( 'jqx-icon-arrow-right-selected' ) );
                });
                this.addHandler( this.pagerleftbutton, 'mousedown', function() {
                    leftarrow.addClass( me.toThemeProperty( 'jqx-icon-arrow-left-selected' ) );
                });
                this.addHandler( this.pagerleftbutton, 'mouseup', function() {
                    leftarrow.removeClass( me.toThemeProperty( 'jqx-icon-arrow-left-selected' ) );
                });
                this.addHandler( $( document ), 'mouseup.pagerbuttons' + this.element.id, function() {
                    rightarrow.removeClass( me.toThemeProperty( 'jqx-icon-arrow-right-selected' ) );
                    leftarrow.removeClass ( me.toThemeProperty( 'jqx-icon-arrow-left-selected' ) );
                });
                this.addHandler( this.pagerrightbutton, 'click', function() {
                    if ( !me.pagerrightbutton.jqxButton( 'disabled' ) ) {
                        me.gotonextpage();
                    };
                });
                this.addHandler( this.pagerleftbutton, 'click', function() {
                    if ( !me.pagerleftbutton.jqxButton( 'disabled' ) ) {
                        me.gotoprevpage();
                    };
                });

                var that  = this;
                var first = this.pagerfirstbutton;
                var last  = this.pagerlastbutton;

                this.addHandler( last, 'mouseenter', function() {
                    lastarrow.addClass( that.toThemeProperty( 'jqx-icon-arrow-last-hover' ) );
                });
                this.addHandler( first, 'mouseenter', function() {
                    firstarrow.addClass( that.toThemeProperty( 'jqx-icon-arrow-first-hover' ) );
                });
                this.addHandler( last, 'mouseleave', function() {
                    lastarrow.removeClass( that.toThemeProperty('jqx-icon-arrow-last-hover' ) );
                });
                this.addHandler( first, 'mouseleave', function() {
                    firstarrow.removeClass( that.toThemeProperty('jqx-icon-arrow-first-hover' ) );
                });
                this.addHandler( last, 'mousedown', function() {
                    lastarrow.addClass( that.toThemeProperty('jqx-icon-arrow-last-selected' ) );
                });
                this.addHandler( first, 'mousedown', function() {
                    firstarrow.addClass( that.toThemeProperty('jqx-icon-arrow-first-selected' ) );
                });
                this.addHandler( last, 'mouseup', function() {
                    lastarrow.removeClass(that.toThemeProperty('jqx-icon-arrow-last-selected'));
                });
                this.addHandler( first, 'mouseup', function() {
                    firstarrow.removeClass( that.toThemeProperty('jqx-icon-arrow-first-selected' ) );
                });
                this.addHandler( $( document ), 'mouseup.pagerbuttons' + name + this.element.id, function() {
                    rightarrow.removeClass( that.toThemeProperty( 'jqx-icon-arrow-right-selected' ) );
                    leftarrow.removeClass ( that.toThemeProperty( 'jqx-icon-arrow-left-selected'  ) );
                    if ( lastarrow ) {
                        lastarrow.removeClass ( that.toThemeProperty( 'jqx-icon-arrow-last-selected'  ) );
                        firstarrow.removeClass( that.toThemeProperty( 'jqx-icon-arrow-first-selected' ) );
                    };
                });
                this.addHandler( first, 'click', function() {
                    if ( !first.jqxButton( 'disabled' ) ) {
                        that.gotopage( 0 );
                    }
                });
                this.addHandler( last, 'click', function() {
                    if ( !last.jqxButton( 'disabled' ) ) {
                        var totalrecords = that.dataview.totalrecords;
                        var pages = Math.ceil( totalrecords / that.pagesize );
                        that.gotopage( pages - 1 );
                    };
                });
                /* End of pager Create logic */

		        return this.custompagecontainer;
			} catch ( e ) {
				fc_getException( e );
			};
		};


		var grid = $( '#' + gridId ).jqxGrid({
			width: '100%',
	        source: dataSource,
	        theme: window.gwMesEnv.themes,
	        enabletooltips: true,
//	        groupable: true,
//	        groups: ['DEPT_CD','CUST_NM'],
	        enableellipsis: true,
//	        pageable: true,			// page
//	        autorowheight: false,		// page
	        pagesize: 50,		// 한 페이지에 보여줄 data count 설정
	        pagesizeoptions: [ 50, 100, 150, 200 ],
//	        pagerrenderer: _createPagerRender,
//	        altrows: false,		 		// Row 강조
	        rowsheight: 26,
	        columnsresize: true,		// Column Size
	        columnsreorder: true,		// Column DragnDrop Order
	        showfilterrow: false,		// filter
	        filterable: false,			// filter
	        showfiltercolumnbackground: false,
	        sortable: true,				// sort 필수
	        showsortmenuitems: false,
	        showsortcolumnbackground: false,	// sort 배경 색상 유무
	        showpinnedcolumnbackground: false,	// 틀고정 색상 유무
//	        autoloadstate: false,
//	        autosavestate: false,
	        editable: ( isEdit || isUpdate ),
	        selectionmode: isMultiSelect,	// selectionmode :  'none', 'singlerow', 'multiplerows', 'multiplerowsextended', 'multiplerowsadvanced', 'checkbox'
	        editmode: 'selectedcell',
//	        showToolbar: isCaption,
//	        rendertoolbar: _rendCaptionToolbar,
//	        toolbarheight: 26,
	        clipboard: false,
	        localization : getLocalization( window.gwMesEnv.lang.datepicker ),
	        //KD(20180622) define new updatefilter for mapping localization filter
	        updatefilterconditions : function (type, defaultconditions) {
				var stringcomparisonoperators = ['EMPTY', 'NOT_EMPTY', 'CONTAINS', 'DOES_NOT_CONTAIN', 'STARTS_WITH', 'ENDS_WITH', 'EQUAL'];
				var numericcomparisonoperators = ['EQUAL', 'NOT_EQUAL', 'LESS_THAN', 'LESS_THAN_OR_EQUAL', 'GREATER_THAN', 'GREATER_THAN_OR_EQUAL'];
				var datecomparisonoperators = ['EQUAL', 'NOT_EQUAL', 'LESS_THAN', 'LESS_THAN_OR_EQUAL', 'GREATER_THAN', 'GREATER_THAN_OR_EQUAL'];
				var booleancomparisonoperators = ['EQUAL', 'NOT_EQUAL'];

				switch (type) {
					case 'stringfilter':
						return stringcomparisonoperators;
					case 'numericfilter':
						return numericcomparisonoperators;
					case 'datefilter':
						return datecomparisonoperators;
					case 'booleanfilter':
						return booleancomparisonoperators;
				}
			},
	        columnsheight: 26,			// Column Header Height
	        columns: arrCol ,			// Column Infomation
	        columngroups: arrColGrp,     // Column Group Header
	        enablebrowserselection: true,	//2018.6.7

		});


		var instance = $( '#' + gridId ).jqxGrid( 'getInstance' );
		instance._getCheckIndex();
		instance.columnpopup = arrColPopup;
		instance.columnmaxlength = colMaxLen;
		instance.gridlocalization.decimalseparator   = window.gwMesEnv.format.separate.target.decimal;
		instance.gridlocalization.thousandsseparator = window.gwMesEnv.format.separate.target.thousand;
		instance.gridlocalization.twoDigitYearMax    = 2999;

		var arrLow = new Array(), arrUpp = new Array();
		var bLow = false, bUpp = false;
		for ( var loop=0;loop<gridCols.length;loop++ ) {
			if ( !fc_isNull( gridCols[ loop ].maxlength ) ) {
				fc_setDynamicColMaxLength ( gridId, gridCols[ loop ].name, gridCols[ loop ].maxlength );
			};
			if ( !fc_isNull( gridCols[ loop ].uppercase && gridCols[ loop ].uppercase ) ) {
				bUpp = true;
				arrUpp[ arrUpp.length ] = gridCols[ loop ].name;
			};
			if ( !fc_isNull( gridCols[ loop ].lowercase && gridCols[ loop ].lowercase ) ) {
				bLow = true;
				arrLow[ arrLow.length ] = gridCols[ loop ].name;
			};
		};
		if ( bUpp ) fc_setColUpperCase( gridId, arrUpp );
		if ( bLow ) fc_setColLowerCase( gridId, arrLow );

		// set Contextmenu Click Column
		var rightClickColumn = '';
		$.each( arrColPopup, function( index, item ) {
			var _createPopup = function( row, cellvalue, editor, cellText, width, height ) {
				try {
					var maxlengthths = this.owner.columnmaxlength;
					var inputElement = $( "<div style='jqx-max-size jqx-position-relative'><input type='text' /><div id='search_" + item.datafield + "'><img alt='search_" + item.datafield + "' width='16' height='16' src='./include/images/search_lg.png' /></div></div>" ).prependTo( editor );
					var	inpOpt = { displayMember: item.datafield, width: width+5, height: height, disabled: item.inputreadonly };
					if ( !fc_isNull( maxlengthths[ item.datafield ] ) ) {
						var input = inputElement.find('input');
						input.attr( 'maxlength', maxlengthths[ item.datafield ] );
					};
					inputElement.jqxInput( inpOpt );
				} catch ( e ) {
					fc_getException( e );
				};
			};
			var _initPopup = function( row, cellvalue, editor, celltext, pressedkey ) {
				try {
					// set the editor's current value. The callback is called each time the editor is displayed.
					var inputField = editor.find( 'input' );
					if ( pressedkey ) {
						inputField.val( pressedkey );
						inputField.jqxInput( 'selectLast' );
					} else {
						inputField.val( cellvalue );
						inputField.jqxInput( 'selectAll' );
					};
					var datafield = item.datafield;
					if ( item.popuptype == 'POP' ) {
						$( '#search_' + item.datafield ).click( function() {
							try {
//								var disable = inputField.jqxInput('disabled');
//								if (disable) return;
								if ( fc_makeGridPopup( gridId, row, datafield ) ) {
									$( '#popupWindow' ).jqxWindow( 'open' );
								};
							} catch ( e ) {
								fc_getException( e );
							};
						});
					} else {
						$( '#search_' + item.datafield ).click( function() {
							try {
//								var disable = inputField.jqxInput('disabled');
//								if (disable) return;
								if ( typeof f_custPopup == 'function' )
									f_custPopup( gridId + '.' + item.datafield, row );
							} catch ( e ) {
								fc_getException( e );
							};
						});
					};
				} catch ( e ) {
					fc_getException( e );
				};
			};
			var _geteditorvaluePopup = function( row, cellvalue, editor ) {
				try {
					value = editor.find( 'input' ).val();
					editor.find( 'input' ).val( '' );
					return value;
				} catch ( e ) {
					fc_getException( e );
				};
			};
			var _cellendeditor = function( row, datafield, columntype, oldvalue, newvalue ) {
				try {
					$( '#search_' + item.datafield ).unbind( 'click' );
				} catch ( e ) {
					fc_getException( e );
				};
			};
			fc_setColProp( gridId, item.datafield, 'createeditor'  , _createPopup );
			fc_setColProp( gridId, item.datafield, 'initeditor'    , _initPopup );
			fc_setColProp( gridId, item.datafield, 'geteditorvalue', _geteditorvaluePopup );
			fc_setColProp( gridId, item.datafield, 'cellendedit'   , _cellendeditor );
		});

		if ( !isEdit && isUpdate ) {
			fc_setAllEditableExcept( gridId, false );
		};
		instance.addrowbottom = fc_isNull( addType ) ? true : addType;
		instance.isPageable = window.gwMesEnv.grid.isPage;

		instance.isShowReload = true;
		instance.isGridEdit   = isEdit;
		if ( isEdit ) {
			if ( isAdd ) {
				instance.isShowAdd  = true;
				instance.isShowCopy = true;
				instance.isShowDel  = true;
			} else {
				instance.isShowAdd  = false;
				instance.isShowCopy = false;
				instance.isShowDel  = false;
			}
		} else {
			instance.isShowAdd  = false;
			instance.isShowCopy = false;
			instance.isShowDel  = false;
		};
		//KD0529 gridType of showing pagerrenderer
	    if ( gridType.toLowerCase() != 'search' ) {
	    	instance.pageable = true;
	    	instance.pagerrenderer = _createPagerRender;
	    	instance._initpager();
	    } else {
	    	instance.pageable = false;
	    }
	    //~KD

		if ( window.gwMesEnv.grid.isFilter ) {
			var filterable = $( '#' + gridId ).jqxGrid( 'filterable' );
			fc_setGridFilterable( gridId, ( filterable == false ? !filterable : filterable ) );
		}

		grid.on('contextmenu', function() {
	        return false;
	    });

		var _showButton = function( event ) {
			try {
				// menu - export
		    	if ( window.gwAuth.isExport == false ) {
		    		$( '#cm_export', contextMenu ).hide();
		    	} else {
		    		$( '#cm_export', contextMenu ).show();
		    	};
		    	$( '#cm_chooser', contextMenu ).show();

// 2017.09.01 remove frozen/release menu
//		    	var cm = fc_getGridColModel( gridId );
//		    	var isFrozen = function() {
//		    		for ( var loop = 0; loop<cm.length; loop++ ) {
//						if ( cm[ loop ].name == rightClickColumn ) {
//							return fc_getColProp( gridId, cm[ loop ].name, 'pinned');
//						};
//					};
//					return false;
//		    	};
//
//		    	$( '#cm_frozen' , contextMenu ).hide();
//		    	$( '#cm_release', contextMenu ).hide();
//
//				if ( isFrozen() ) {
//					$( '#cm_release', contextMenu).show();
//				} else {
//					$( '#cm_frozen' , contextMenu).show();
//				};
				/*-----------------------------------------------------------------*/
				// no data in grid
	    		var groupable = fc_getGridGroupable( gridId );
	    		$( '#cm_expand' , contextMenu ).show();
	    		$( '#cm_collap' , contextMenu ).show();
	    		if ( !groupable ) {
		    		$( '#cm_expand' , contextMenu ).hide();
		    		$( '#cm_collap' , contextMenu ).hide();
	    		};
		    	if ( fc_getGridRecordCount( gridId ) == 0 ) {
		    		$( '#cm_export' , contextMenu ).hide();
		    		$( '#cm_expand' , contextMenu ).hide();
		    		$( '#cm_collap' , contextMenu ).hide();
		    	};
			} catch ( e ) {
				fc_getException( e );
			};
		};

		grid.on( 'cellclick', function( event ) {
			$( '#cm_copycell', contextMenu ).show();
		    var args         = event.args;
		    var rightclick   = args.rightclick;
		    var value        = args.value;
		    rightClickColumn = args.datafield;

			if ( rightclick && !fc_isNull( value ) ) {
				$( '#cm_val' + gridId ).val( value );
				$( '#cm_val' + gridId ).select();
			} else {
				$('#cm_val'+gridId).val('');
			};
		});

		grid.on('mousedown', function( event ) {
			try {
				 var rightClick = isRightClick( event );
				 if ( rightClick ) {
					$( '#cm_copycell', contextMenu ).hide();
					var scrollTop  = $( window ).scrollTop();
					var scrollLeft = $( window ).scrollLeft();
					_showButton( event );
					contextMenu.jqxMenu( 'open', parseInt( event.clientX ) + 2 + scrollLeft, parseInt( event.clientY ) + 2 + scrollTop );
					return false;
				 };
			} catch ( e ) {
				fc_getException( e );
			};
	     });

	     function isRightClick( event ) {
	    	 try {
		         var rightclick;
		         if ( !event ) var event = window.event;
		         if ( event.which ) rightclick = ( event.which == 3 );
		         else if ( event.button ) rightclick = ( event.button == 2 );
		         return rightclick;
			} catch ( e ) {
				fc_getException( e );
			};
	    };

	    contextMenu.on( 'itemclick', function( event ) {
	    	 try {
		    	 var args = event.args;
		    	 var itemId = $( args )[ 0 ].id;

		    	 switch ( itemId ) {
		    	 	case 'cm_filter':
		    	 		fc_setGridFilterableToggle( gridId );
						break;
					case 'cm_chooser':
						break;
// 2017.09.01 remove frozen/release menu
//					case 'cm_frozen':
//					case 'cm_release':
//						if ( !fc_isNull( rightClickColumn ) ) {
//							fc_setGridFrozenToggle( gridId, rightClickColumn, ( itemId=='cm_frozen' ) ? true : false );
//						};
//						break;
					case 'cm_export':
		    	 		fc_setGridExportExcel( gridId );
						break;
					case 'cm_expand':
						fc_expandAllGridGroups( gridId );
						break;
					case 'cm_collap':
						fc_collapseAllGridGroups( gridId );
						break;
					case 'cm_viewtype':
		    	 		fc_setPageable( gridId );
						break;
					case 'cm_saveSetting':
						fc_saveGridSetting( gridId );
						break;
					case 'cm_defaultSetting':
						fc_getDefaultGridSetting( gridId );
						break;
				};
			} catch ( e ) {
				fc_getException( e );
			};
	     });

	     grid.bind( 'cellendedit', function( event ) {
	    	 try {
	    		 var instance = $( '#' + gridId ).jqxGrid( 'getInstance' );
		    	 if ( event.args.datafield == 'JQX_CB' ) {
		    		 arrChecked = instance.checkedrow;
		    		 var checkedidx =  arrChecked.indexOf( event.args.rowindex );
		    		 $( '#' + gridId ).jqxGrid( 'selectrow', event.args.rowindex );
		    		 if ( event.args.value ) {
		    			 if ( checkedidx == -1 )
		    				 arrChecked.push( event.args.rowindex );
		    		 } else {
		    			 if ( checkedidx != -1)
		    				 arrChecked.splice( checkedidx, 1 );
		    		 };
		    		 arrChecked.sort( function( a, b ) { return a-b; } );
		    		 instance.checkedrow =  arrChecked;
		    	 } else {

		    		 arrChecked = instance.checkedrow;
		    		 var column = $( '#' + gridId ).jqxGrid( 'getcolumn', event.args.datafield );
		    		 if ( column.displayfield != column.datafield ) {
		    			 if ( event.args.value != event.args.oldvalue ) {
		        			 $( '#' + gridId ).jqxGrid( 'setcellvalue', event.args.rowindex, 'JQX_CB', true );

		        			 if ( arrChecked.indexOf( event.args.rowindex ) == -1 )
		        				  arrChecked.push( event.args.rowindex );

		            		 arrChecked.sort( function( a, b ) { return a-b; } );
		            		 instance.checkedrow = arrChecked;
		    			 }
		    		 } else if ( event.args.value != event.args.oldvalue ) {
		    			 $( '#' + gridId ).jqxGrid( 'setcellvalue', event.args.rowindex, 'JQX_CB', true );

		    			 if ( arrChecked.indexOf( event.args.rowindex ) == -1 )
		    				  arrChecked.push( event.args.rowindex );

		        		 arrChecked.sort( function( a, b ) { return a-b; } );
		        		 instance.checkedrow = arrChecked;
		        	 };
		    	 };

		    	 if ( typeof f_cellEndEvent === 'function' ) {
		    			try {
		    				f_cellEndEvent( event );
			        	} catch ( e ) {
			        		fc_getException( e );
			        	};
		    	 };
			} catch ( e ) {
				fc_getException( e );
			};
	    });

	    grid.bind( 'filter', function( event ) {
        	if ( typeof f_afterFilterControl === 'function' ) {
        		try {
        			f_afterFilterControl( {  EVENT : 'FILTER'
        				                   , GRID_ID : gridId
        				                   , ROWS: event.args.owner.dataview.rows
        				                   , TOT_ROWS: event.args.owner.dataview.totalrows
        				                   } );
        		} catch ( e ) {
        			fc_getException( e );
        		};
        	};
	    });

	    if ( fc_isNull( isTabGrid ) ) isTabGrid = false;
	    if ( !isTabGrid ) fc_setGridSize( gridId, 0, 0 );
	    else fc_setGridSize( gridId, 0, 0, 'tab' );

		this.getGridObject = function() { return grid; };
	    this.GridId = gridId;
		this.isCaption = isCaption;
	    this.getCheckedIndexes = function() {
	    	var instance = $( '#' + gridId ).jqxGrid( 'getInstance' );
	    	return instance._getCheckIndex();
	    };
	    this.setCheckedIndexes = function( arrCheck ) {
	    	arrChecked = arrCheck;
	    };
	    this.getPopupSource = function( datafield ) {
	        return getEditorPopupDataAdapter( datafield );
	    };

	} catch ( e ) {
		fc_getException( e );
	};
};  // end of jQueryGrid

/*=============================================================================================*/
jQueryGrid.prototype = {
		getGridId 			: function () { return this.GridId; },
		getCaptionText 		: function () { return fc_getGridCaptionText( this.GridId ); },
		setGridlocalData 	: function ( gridData ) { fc_setGridlocalData( this.GridId, gridData); },
		getGridSource 		: function () { return fc_getGridSource( this.GridId ); },
		getGridModelSource 	: function () { return fc_getGridModelSource( this.GridId ); },
		setExtraOption 		: function ( prmName, prmVal ) { fc_setExtraOption( this.GridId, prmName, prmVal ); },
		getExtraOption 		: function ( extraParam ) { return fc_getExtraOption( this.GridId, extraParam ); },
		getGridPagerId 		: function () {	return fc_getGridPagerId( this.GridId ); },
		setGridParam 		: function ( optionsObj ) { fc_setGridParam( this.GridId, optionsObj ); },
		getGridParam 		: function ( param ) { return fc_getGridParam( this.GridId, param ); },
		setGridWidth 		: function ( width ) { fc_setGridWidth( this.GridId, width ); },
		setGridHeight 		: function ( height ) { fc_setGridHeight( this.GridId, height ); },
		setColProp 			: function ( colName, paramName, paramVal ) { fc_setColProp( this.GridId, colName, paramName, paramVal ); },
		getColProp 			: function ( colName, prmName ) { return fc_getColProp( this.GridId, colName, prmName ); },
		getColProps 		: function ( colName ) { return fc_getColProps( this.GridId, colName ); },
		setGridPKeys 		: function ( arrPKeys ) { fc_setGridPKeys( this.GridId, arrPKeys ); },
		setColEditable 		: function ( arrColName, editableFlag ) { fc_setColEditable( this.GridId, arrColName, editableFlag ); },
		setAllEditableExcept: function ( editFlag ) { fc_setAllEditableExcept( this.GridId, editFlag ); },
		setColRequired 		: function ( arrColName ) { fc_setColRequired( this.GridId, arrColName ); },
		setRowList 			: function ( arrRowList ) { fc_setRowList( this.GridId, arrRowList ); },
		setCellData 		: function ( rowId, colName, data ) { fc_setCellData( this.GridId, rowId, colName, data ); },
		getCellData 		: function ( rowId, colName ) { return fc_getCellData( this.GridId, rowId, colName ); },
		setRowData 			: function ( rowId, data ) { fc_setRowData( this.GridId, rowId, data ); },
		getRowData 			: function ( rowId ) { return fc_getRowData( this.GridId, rowId ); },
		getRowsData 		: function (  ) { return fc_getRowsData( this.GridId ); },
		getSelectedRowData  : function () { return fc_getSelectedRowData( this.GridId ); },
		setGridBindEvent 	: function ( event, callback ) { fc_setGridBindEvent( this.GridId, event, callback ); },
		setGridSortable 	: function ( sortFlag ) { fc_setGridSortable( this.GridId, sortFlag ); },
		setColSortable 		: function ( arrColName, sortFlag ) { fc_setColSortable( this.GridId, arrColName, sortFlag ); },
		setColAlign 		: function ( arrColName, alignPosition ) { fc_setColAlign( this.GridId, arrColName, alignPosition ); },
		setColMaxLength 	: function ( colName, maxLen ) { fc_setColMaxLength( this.GridId, colName, maxLen ); },
		clearGridData 		: function () { fc_clearGridData( this.GridId, flag ); },
		destroyGrid         : function () { fc_destroyGrid(this.GridId) },
		setColUpperCase 	: function ( arrColName ) { fc_setColUpperCase( this.GridId, arrColName ); },
		setColLowerCase 	: function ( arrColName ) { fc_setColLowerCase( this.GridId, arrColName ); },
		setColHidden 		: function ( arrColName ) { fc_setColHidden( this.GridId, arrColName ); },
		setColShow 			: function ( arrColName ) { fc_setColShow( this.GridId, arrColName ); },
		getSelectedRow		: function () { return fc_getSelectedRow( this.GridId ); },
		getSelectCell		: function () { return fc_getSelectCell( this.GridId ); },
		getGridRecordCount  : function () { return fc_getGridRecordCount( this.GridId ); },
		setParentGrid       : function ( parentGridId ) { fc_setParentGrid( this.GridId, parentGridId ); },
		showRowNumbers      : function ( flag ) { fc_showRowNumbers( this.GridId, flag ); },
		linkageGridTab		: function ( colName, pageId, arrParams, arrCustomParams, f_callback ) { fc_linkageGridTab( this.GridId, colName, pageId, arrParams, arrCustomParams, f_callback ); },
		linkageGridPopup	: function ( colName, pageId, arrParams, nWidth, nHeight, isModal, arrCustomParams, f_callback ) { fc_linkageGridPopup( this.GridId, colName, pageId, arrParams, nWidth, nHeight, isModal, arrCustomParams, f_callback ); },
		setColResizable     : function ( arrColName, resizeFlag ) { fc_setColResizable( this.GridId, arrColName, resizeFlag ); },
		disableReloadButton : function ( disabledFlag ) { fc_disableReloadButton( this.GridId, disabledFlag); },
		disableAddRowButton : function ( disabledFlag ) { fc_disableAddRowButton( this.GridId, disabledFlag); },
		disableCopyRowButton: function ( disabledFlag ) { fc_disableCopyRowButton( this.GridId, disabledFlag); },
		disableDelRowButton : function ( disabledFlag ) { fc_disableDelRowButton( this.GridId, disabledFlag); },

		setColHeaderText    : function ( colName, strText ) { fc_setColHeaderText( this.GridId, colName, strText ) },
		setColGroupText     : function ( colGroupName, prmValue ) { fc_setColGroupText( this.GridId, colGroupName, prmValue ) },
}; // end of jQueryGrid.prototype

/**
 *
 * @param gridId
 * @param isShowHidden
 */

HashMap = function(){
    this.map = new Array();
};
HashMap.prototype = {
    put : function(key, value){
        this.map[key] = value;
    },
    get : function(key){
        return this.map[key];
    }
}

function fc_setGridExportExcel( gridId, isShowHidden ) {
	if ( fc_isNull( isShowHidden ) ) isShowHidden = false;

    // 2017.09.01 엑셀파일명을 페이지해더로 가는 경우 중국어는 깨짐. --> 화면아이디로 파일명을 설정함.
	var sfileName = '';
	try {
		sfileName = fc_getDefPgmId();
//		var oPageInfo = fc_getCurrentTabPageInfo( parent.window.mainTab );
//		if ( !fc_isNull( oPageInfo ) ) {
//			sfileName = oPageInfo.pageId;
//		}
	} catch( e ) {
		sfileName = '';
	};
	if ( fc_isNull( sfileName ) ) sfileName = gridId;

	/*
	var sfileName = '';
	if ( $( '#divCaption_' + gridId ).length > 0 ) { sfileName = $( '#divCaption_' + gridId ).text(); }
	if ( fc_isNull( sfileName ) ) {
		try{
			var oPageInfo = fc_getCurrentTabPageInfo( parent.window.mainTab );
			if ( !fc_isNull( oPageInfo ) ) {
				sfileName = ( oPageInfo.pageNm ).replace( ' ', null );
			}
		} catch( e ) {
			sfileName = '';
		};
	};

	if ( fc_isNull( sfileName )  ) sfileName = gridId;
*/
	sfileName += '_' + eval( new Date()-0 );

	var instance = $( '#' + gridId ).jqxGrid( 'getInstance' );
	var record = instance.columns.records;
	var keyList = [ { 'key' : 'COLUMN_DATA' }, { 'key' : 'EXPORT_DATA' } ];
	var sendData = {};
	sendData[ 'COLUMN_DATA' ] = [];
	var capitalize = function( str ) {
		if ( fc_isNull( str ) ) return '';
		str = str.substring( 0,1 ).toUpperCase() + str.substring( 1 );
		return str;
	};

	var dataField = instance.source._source.datafields;
	var getColumnAttribute = function( dataObj , sColumn, sAttribute ) {
		var sText = '';
		try{
			if ( fc_isNull( dataObj ) ) {
				return '';
			} else {
				$.each( dataField , function( key, objData ) {
					if ( objData.name == sColumn ) {
						sText = objData[ sAttribute ];
						return false;
					};
				});
			}
		} catch( e ) {
			return '';
		};
		return sText;
	};

	var dataFieldMap = new HashMap();
	var arrLovCol  = new Array();
	var arrDateCol = new Array();
	if ( !fc_isNull( record ) ) {
		$.each( record, function( key, obj ) {
			if ( obj.exportable && !obj.hidden ) {
				var type = getColumnAttribute( dataField, obj.datafield,'type' );
				if ( getColumnAttribute( dataField, obj.datafield,'datatype' ) == 'lov' ) {
					arrLovCol.push( obj.datafield );
				};
				if ( getColumnAttribute( dataField, obj.datafield,'type' ) == 'date' ) {
					arrDateCol.push( obj.datafield );
				};
				sendData[ 'COLUMN_DATA' ].push( {
					//  columngroup : fc_getColGroupText( gridId, obj.columngroup ) //기존 로직
					  parentgroup : fc_getColParentGroupText( gridId, obj.columngroup) //추가
					, columngroup : fc_getColGroupText( gridId, obj.columngroup ) //추가
					, datafield   : obj.datafield
					, text        : obj.text
					, cellsalign  : capitalize( obj.cellsalign )
					, type        : type
					, cellsformat : obj.cellsformat
					, cellswidth  : obj.width
					, exportData  : obj.exportable
					});
				//dataFieldMap.put(obj.datafield,true);
			};
		});
	};

	/*
	var newData = new Object();
	newData = $.extend(true,{},instance.source._source.localdata); //clone data

	var key = null;
	var key2 = null;
	for (key in newData) {
		//console.log(key+'/'+items[key]+'/'+items[key]['id']);
	    //console.log(items[key].hasOwnProperty('fd'));

		for (key2 in newData[key]) {
			if(dataFieldMap.get(key2)){

			}else{
				delete newData[key][key2];
			}
		    //console.log(key+'/'+key2 +'/'+items[key][key2]);
		}
	}
	//KD 0530 newData Obj Push
	var cloneData = [];
	var count  = 0; // Test 변수
	for(var key in newData){
		//console.log("About Key Info : " + key);
		if(count > 0) { // Test 조건
			cloneData.push(newData[key]);
		}
		count++; //Test
	};
	//console.log(cloneData);
	sendData[ 'EXPORT_DATA' ] = cloneData;
		//sendData[ 'EXPORT_DATA' ] = newData;
	//~KD
	*/
	sendData[ 'EXPORT_DATA' ] = instance.source._source.localdata;
	if ( arrLovCol.length > 0 ) {
		$.each( sendData[ 'EXPORT_DATA' ], function( key, data ) {
				$.each( arrLovCol, function( index, value ) {
					if ( !fc_isNull( data[ value ] ) ) {
						data[ value ] = instance.getcelltext( key, 'DISP_' + value );
					};
				});
		});
	};

	if ( arrDateCol.length > 0 ) {
		$.each( sendData[ 'EXPORT_DATA' ], function( key, data ) {
				$.each( arrDateCol, function( index, value ) {
					if ( !fc_isNull( data[ value ] ) ) {
						data[ value ] = instance.getcelltext( key, value );
					};
				});
		});
	};
	//console.log(JSON.stringify( sendData ));
	var form = new fc_exportExcel( '/SCO/downloadExcel.do?ServiceName=ict.screen.file-service&excel_export=1', gridId );
	form.addParam( 'gwKeyList'     , JSON.stringify( { gwKeyList: keyList } ) );
	form.addParam( 'gwSendData'    , JSON.stringify( sendData ) );
	form.addParam( 'export_name'   , sfileName );
	form.addParam( 'langCd'        , window.gwMesEnv.lang.cd );
	form.addParam( 'excel_file_ext', 'xls' );

	form.send();
}; // end of fc_setGridExportExcel
/**
 *
 * @param url
 * @param gridId
 */
function fc_exportExcel( url, gridId ) {
	try{
		if ( $( '#excel_export_div' ).length ) {
			$( '#excel_export_div' ).children().remove();
			$( '#excel_export_div' ).remove();
		};

		$( '#'+gridId ).append( $( '<div id="excel_export_div" style="width:0; height:0"></div>' ) );

	    var object      = this;
	    var objectParam = new Object();
	    var sIframeName = 'iframeExcel';
	    var sFormName   = 'form' + sIframeName;

	    object.form = $( '<form action="' + url + '" target="' + sIframeName + '" method="post" style="display:none;" id="' + sFormName + '" name="' + sFormName + '"></form>' );
	    var _addParameter = function( parameter, value ) {
	    	objectParam[ parameter ] = value;
	    	if ( $( '#'+parameter, ':input[type="hidden"]' ).length ) {
	    		fc_setInputVal( parameter, value );
	    	} else {
		        $("<input type='hidden' />")
		        .attr( { name : parameter, id : parameter, 'value' : value } )
                .appendTo( object.form );
	    	};
	    };
	    var _addParamObj = function( obj ) {
	    	if ( !fc_isNull( obj ) ) {
	    		$.each( obj, function( key, value ) {
	    			_addParameter( key, value );
	    		});
	    	};
	    };
	    object.addParam = function( val1, val2 ) {
	    	if ( fc_isNull( val1 ) ) return;
	    	if ( typeof val1 === 'object' ) {
	    		_addParamObj( val1 );
	    	} else {
	    		_addParameter( val1, fc_setValue( val2, '' ) );
	    	};
	    };
	    object.send = function() {
	        var iframe = $( '<iframe></iframe>' );
	        iframe.attr( { 'name' : sIframeName, 'id' : sIframeName } );
	        iframe.css( { width : '0', height : '0' } );
	        $( '#excel_export_div' ).append( iframe );
	        $( '#excel_export_div' ).append( object.form );

	        object.form.submit();
	        object.form.remove();
	    };
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_exportExcel
/**
 *
 * @param childGridId
 * @param parentGridId
 */
function fc_setParentGrid( childGridId, parentGridId ) {
	var iPos = -1;
	var obj  = new Object();

	try {
		// child grid
		for ( var loop=0;loop<window.gwGrid.length;loop++ ) {
			if ( gwGrid[ loop ].id == childGridId ) {
				iPos = loop;
				break;
			};
		};
		if ( iPos == -1 ) {
		    obj[ 'id'        ] = childGridId;
		    obj[ 'parent'    ] = parentGridId;
		    obj[ 'hasParent' ] = true;
		    obj[ 'child'     ] = '';
		    obj[ 'hasChild'  ] = false;
		    window.gwGrid[ window.gwGrid.length ] = obj;
		} else {
			window.gwGrid[ iPos ].parent = parentGridId;
			window.gwGrid[ iPos ].hasParent = true;
		};
		// Parent grid
		iPos = -1;
		obj = new Object();
		for ( var iloop=0;iloop<window.gwGrid.length;iloop++ ) {
			if ( gwGrid[ iloop ].id == parentGridId ) {
				iPos = iloop;
				break;
			};
		};
		if ( iPos == -1 ) {
		    obj[ 'id'        ] = parentGridId;
		    obj[ 'parent'    ] = '';
		    obj[ 'hasParent' ] = false;
		    obj[ 'child'     ] = childGridId;
		    obj[ 'hasChild'  ] = true;
		    window.gwGrid[ window.gwGrid.length ] = obj;
		} else {
			if ( window.gwGrid[ iPos ].child == null ) {
				window.gwGrid[ iPos ].child = childGridId;
			} else {
				window.gwGrid[ iPos ].child = childGridId + ',' + window.gwGrid[ iPos ].child;
			};
			window.gwGrid[ iPos ].hasChild = true;
		};
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_setParentGrid
/**
 *
 * @param gridId
 */
function fc_saveGridSetting( gridId ) {
	var obj = new Array();
	var paramData = new Object();
	paramData[ 'USER_ID'    ] = window.gwMesEnv.user.id.toUpperCase();
	paramData[ 'PGM_ID'     ] = window.gwMesEnv.user.pgmId.toUpperCase();
	paramData[ 'GRID_ID'    ] = gridId;
	paramData[ 'GRID_STATE' ] = JSON.stringify( $( '#' + gridId ).jqxGrid( 'savestate' ) );

	var instance = $( '#' + gridId ).jqxGrid( 'getInstance' );
	paramData[ 'USE_PAGE' ]  = instance.isPageable ? 'Y' : 'N';

	obj[ 0 ] = paramData;
	window.gwJsonParam = { gwSendData: JSON.stringify( { gridinfo: obj } ) };
	window.gwJsonParam[ 'gwKeyList' ] = JSON.stringify( { gwKeyList: [ { key: 'gridinfo' } ] } );
	fc_submit( '', 'ict.sys.init-service', 'saveGridSetting', '', '', 'SCO' );
 }; // end of fc_saveGridSetting
/**
 *
 * @param gridId
 */
function fc_getDefaultGridSetting ( gridId ) {
	var paramData = new Object();
	window.gwJsonParam[ 'USER_ID' ]	= window.gwMesEnv.user.id.toUpperCase();
	window.gwJsonParam[ 'PGM_ID'  ]	= window.gwMesEnv.user.pgmId.toUpperCase();
	window.gwJsonParam[ 'GRID_ID' ]	= gridId;

    fc_submit( '', 'ict.sys.init-service', 'defaultGridSetting', '', '', 'SCO' );
}; // end of fc_getDefaultGridSetting
/**
 *
 * @param tartgetColObj
 * @param bFirstTimeFlag
 */
function fc_setGridComboFilter( tartgetColObj , bFirstTimeFlag ) {
	try {
		var gridId = tartgetColObj.object.split( '.' )[ 0 ];
		var targetColNm = tartgetColObj.object.split( '.' )[ 1 ];

		var _cellvaluechanged = function( event ) {
			try {
				var dataField     = event.args.datafield;
				var rowBoundIndex = event.args.rowindex;
			    var value         = event.args.newvalue;
			    var oldvalue      = event.args.oldvalue;
				if ( dataField == tartgetColObj.parentColNm ) {
					if ( value.value != oldvalue ) {
						fc_setGridColFieldSource( gridId, 'DISP_' + targetColNm, ( new $.jqx.dataAdapter( [ { CD_VAL : '', CD_NM : '' } ] , { autoBind : true } ) ).records );
						fc_setCellData( gridId, rowBoundIndex, targetColNm, '' );
						$( '#'+gridId ).jqxGrid( 'begincelledit', rowBoundIndex, targetColNm );
						$( '#'+gridId ).jqxGrid( 'endcelledit'  , rowBoundIndex, targetColNm, false );
			    		$( '#'+gridId ).jqxGrid( 'endupdate' );
					};
				};
			} catch ( e ) {
				fc_getException( e );
			};
		};
        var _initeditor = function ( row, cellText, editor, cellvalue, width, height ) {
        	var arrGridData = fc_getCodeFilterData( 'GRID', row, tartgetColObj, fc_setValue( tartgetColObj.parentNullOpt, false ) );
    		var lovSource = {
    	         datatype: 'array',
    	         datafields: [
    	             { name: 'CD_NM' , type: 'string' },
    	             { name: 'CD_VAL', type: 'string' }
    	         ],
    	         localdata: arrGridData
    	    };
    		var lovAdapter = new $.jqx.dataAdapter( lovSource, {autoBind: true} );

    		var heightSize = arrGridData.length * 23;
    		if ( heightSize > 250 ) {
    			heightSize = 250;
    		};
    		//
            editor.jqxDropDownList( { source: lovAdapter, dropDownHeight: heightSize });
            fc_setGridColFieldSource( gridId, 'DISP_' + targetColNm,  lovAdapter.records );
            // set the editor's current value. The callback is called each time the editor is displayed.
            editor.jqxDropDownList( 'clearSelection' );
            editor.jqxDropDownList( 'val', cellvalue );

			fc_setDropDownListBoxWidth( editor );
    		this.owner._updatecolumnwidths();
    		this.owner._updatecellwidths();
        };

        fc_setColProp( gridId, targetColNm, 'initeditor', _initeditor );
        if ( fc_isNull( bFirstTimeFlag ) || bFirstTimeFlag ) {
            fc_setGridBindEvent( gridId, 'cellvaluechanged', _cellvaluechanged );
            fc_setGridLovProperty( gridId, targetColNm, tartgetColObj );
        };
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_setGridComboFilter
/**
 *
 * @param gridId
 * @param bFlag
 */
function fc_setGridComboFilterSwitch( gridId, bFlag ) {
	var source = fc_getGridModelSource( gridId );
	$.each( source.datafields, function( index, item ) {
		if ( !fc_isNull( item.datatype) && item.datatype == 'lov' ) {
			if ( !fc_isNull( item.lovproperty ) ) {
				var sArrowColNm = '';
				if ( bFlag ) sArrowColNm = item.lovproperty.orgArrowColNm;

				var lovObjectProperty = {
						  object        : item.lovproperty.object
						, code          : item.lovproperty.code
						, format        : item.lovproperty.format
						, nullable      : item.lovproperty.nullable
						, defval        : item.lovproperty.defval
						, parentColNm   : item.lovproperty.parentColNm
						, orgArrowColNm : item.lovproperty.orgArrowColNm
						, arrowColNm    : sArrowColNm
						, parentNullOpt : item.lovproperty.parentNullOpt
					};

				fc_setGridComboFilter( lovObjectProperty, false );
				item.lovproperty = lovObjectProperty;
				fc_setGridColFieldSource( gridId, 'DISP_' + item.name,  fc_getCodeFilterData( 'GRID', -1, lovObjectProperty ) );
			};
		};
	});
}; //fc_setGridComboFilterSwitch
/**
 *
 * @param gridId
 * @param colName
 * @param paramVal
 */
function fc_setGridLovProperty( gridId, colName, paramVal ) {
	try {
		var source = fc_getGridModelSource( gridId );
		if ( !fc_isNull( paramVal.arrowColNm ) ) {
			paramVal[ 'orgArrowColNm' ] = paramVal.arrowColNm;
		};
		$.each( source.datafields, function( index, item ) {
			if ( item.name == colName ) {
				item[ 'lovproperty' ] = paramVal;
				return false;
			};
		});
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_setGridLovProperty
/**
 *
 * @param gridId
 * @param arrColName
 * @param resizeFlag
 */
function fc_setColResizable ( gridId, arrColName, resizeFlag ) {
	try {
		var colName = '';
		for ( var loop=0;loop<arrColName.length;loop++ ) {
			colName = arrColName[ loop ].toUpperCase();
			// 'minwidth', 'maxwidth'
			fc_setColProp( gridId, colName, 'minwidth', fc_getColProp( gridId, colName, 'width' ) );
			fc_setColProp( gridId, colName, 'maxwidth', fc_getColProp( gridId, colName, 'width' ) );
		};
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_setColResizable