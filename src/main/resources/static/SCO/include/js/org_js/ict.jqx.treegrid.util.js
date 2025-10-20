/**
 * Declare variable
 */
var checkboxTemplateTreeGrid	= { type: 'check' , align: 'center', editable: true, sortable: true, pinned: false, nullable: true, filtertype: 'bool' 	, columntype: 'checkbox' };

/**
 * Declare Initial JS Function
 */
$( function() {
	fc_showLog( 1, '***** jQuery TreeGrid Util' );
}); // end of $( function () )

/** -----------------------------------------------------------------------------
 * @Name			jQueryTreeGrid
 * @Description		jqGrid기반 jQueryTreeGrid 객체를 생성한다.
 * @param	targetObj : Grid를 추가할 대상 객체
 * @param	gridID : 사용할 Grid ID (Table object)
 * @param	dataType : 데이타 타입. (json or xml or local)
 * @param	arrColumnNames : Grid 칼럼 이름 배열
 * @param	pagerID : 페이지 ID (Div object)
 * @param	gridCaption : Grid Caption
 * @param  treeGridType
 * @param  treeGridKey
 * @param  treeGridExtendFlag
 * @Returns jqGrid object
 * @Method			getGrid : jqGrid 객체를 반환한다.
 * 					setNavigator : Grid 네비게이터를 설정한다.
 * 					setHeaderGroups : 헤더 그룹을 설정한다.
 * 					setOption : 추가 옵션을 설정한다.
 * 					load : 조회한다.
 * 					bind : 이벤트를 바인딩한다.
 * 					groupBy : 특정 칼럼으로 그룹화한다. (서버 데이터가 특정 칼럼으로 정렬되어 있어야 함)
 * @Example
 * ---------------------------------------------------------------------------*/
function jQueryTreeGrid( targetObj, treeGridId, treeGridHierarchy, treeGridCols, treeGridColGroups, treeGridCaption, treeGridType, treeGridKey, treeGridExtendFlag ) {
	// 2018.2.22 getting from database
	window.gwMultiLang.isRunMain = false;
	var toTheme = function ( className ) {
        if ( toTheme == "" ) return className;
        return className + " " + className + "-" + toTheme;
    };

	// DIV 생성
	if ( targetObj == undefined )	targetObj = $( 'body' );
    targetObj.append( '<div id="' + treeGridId + '" />' );
    if ( $( '#' + treeGridId + 'CM' ).length == 0) {
        jQueryContext( targetObj, treeGridId );
    };

	var pagerId = treeGridId + '_pager';	// pager Id

	var dataSource = { datatype: "json", datafields: [] };
	var arrDataField = new Array();
	var arrColIDs    = new Array();
	var arrCol       = new Array();
	var arrColGrp    = new Array();
	var arrColPopup  = new Array();
	var arrChecked   = new Array();
	var hierarchyObj = new Object();

	var arrMultiLang      = new Array();	// multi-language
	var arrGroupMultiLang = new Array();	// multi-language

	var _multiLangItem = function( colNm, itemCd, itemValue ) {
	    this.COL_NM   = colNm;
	    this.ITEM_CD  = fc_isNull( itemCd ) ? colNm : itemCd;
	    this.ITEM_VAL = fc_isNull( itemValue ) ? 0 : itemValue;
	};

	// set authority
    var isMultiSelect = false;	// multi-select column
    var isEdit = false;			// cell editable
    var isAdd  = false;			// navigator function ( add/copy/delete row )

    switch ( treeGridType.toLowerCase() ) {
		case 'search':	isMultiSelect = false;	isEdit = false;	isAdd = false;	break;
		case 'insert':	isMultiSelect = true;	isEdit = true;	isAdd = true;	break;
		case 'update':	isMultiSelect = true;	isEdit = true;	isAdd = false;	break;
		default:		break;
	};
	isMultiSelect = 'singlerow';
	isEdit = window.gwAuth.isSave && isEdit;
	isAdd  = window.gwAuth.isSave && isAdd;

	var updatingCheckState = false;
	// Caption Setting
	var isCaption = true;
	var _caption  = '';
    if ( typeof treeGridCaption == 'string' )
    	_caption = treeGridCaption;
	else
		_caption = treeGridCaption.caption;

    // Title Caption Setting
	var _rendCaption = function( target ) {
		var container = $( "<div id='divCaption_" + treeGridId + "' class='divGridCaption'></div>" );
        var span = $( "<span id='caption_" + treeGridId + "' class='gridCaptionText'>" + _caption + "</span>" );
        if ( window.gwMesEnv.lang.isMultiLanguage ) {
        	if ( window.gwMultiLang.isRunMain ) {
    			span      = $( "<span id='caption_" + treeGridId + "' class='gridCaptionText'>"
				            + fc_getGwLangItem( fc_isNull( treeGridCaption.itemCd ) ? span.attr( 'id' ) : treeGridCaption.itemCd
						                      , fc_isNull( treeGridCaption.itemValue ) ? 0 : treeGridCaption.itemValue
						                      , _caption )
						    + "</span>" );
        	} else {
		        span.addClass( window.gwClass.multilanguage );
		        span.attr( window.gwMesEnv.item.itemcd   , fc_isNull( treeGridCaption.itemCd ) ? span.attr( 'id' ) : treeGridCaption.itemCd );
		        span.attr( window.gwMesEnv.item.itemvalue, fc_isNull( treeGridCaption.itemValue ) ? 0 : treeGridCaption.itemValue );
		        fc_setLangId( span.attr( window.gwMesEnv.item.itemcd ), span.attr( window.gwMesEnv.item.itemvalue ) );
        	};
        }
        container.append( span );
        container.height( 21 );

        target.prepend(container);
	}; // End of _rendCaptionToolbar

    if ( fc_isNull( _caption ) )
    	isCaption = false;
    else
    	_rendCaption( targetObj );

	// Column Setting Create
	var _setColumnProp = function( columnObj , colProperty, displayObj ) {
		var propObj = {};

		// propObj.owner = owner;
		propObj.datafield = columnObj.name.toUpperCase();
		propObj.text      = ( fc_isNull( columnObj.caption  ) ) ? columnObj.name.toUpperCase() : columnObj.caption;
		propObj.sortable  = ( fc_isNull( columnObj.sortable ) ) ? colProperty.sortable : columnObj.sortable;
		propObj.editable  = ( fc_isNull( columnObj.editable ) ) ? colProperty.editable : columnObj.editable;
		propObj.hidden    = ( fc_isNull( columnObj.hidden   ) ) ? colProperty.hidden   : columnObj.hidden;
		propObj.hideable  = true;
		propObj.groupable = true;
		propObj.renderer  = null;
		propObj.align     = 'center';
		propObj.cellsRenderer = ( !fc_isNull( colProperty.cellsrenderer ) ) ? colProperty.cellsrenderer : null;
		propObj.cellsalign    = (  fc_isNull( columnObj.align           ) ) ? colProperty.align         : columnObj.align; // Column value align
		propObj.width         = (  fc_isNull( columnObj.width           ) ) ? 100                       : columnObj.width;
		propObj.pinned        = (  fc_isNull( columnObj.frozen          ) ) ? colProperty.pinned        : columnObj.frozen;
		propObj.filterable    = (  fc_isNull( columnObj.filterable      ) ) ? colProperty.filterable    : columnObj.filterable;
		propObj.classname     = ( !fc_isNull( columnObj.classname       ) ) ? columnObj.classname       : '';
		propObj.cellclassname = ( !fc_isNull( columnObj.cellclassname   ) ) ? columnObj.cellclassname   : '';
		propObj.nullable      = (  fc_isNull( columnObj.nullable        ) ) ? colProperty.nullable      : columnObj.nullable;
		propObj.columngroup   = ( !fc_isNull( columnObj.group           ) ) ? columnObj.group           : null;
		propObj.columntype    = (  fc_isNull( columnObj.columntype      ) ) ? colProperty.columntype    : columnObj.columntype;

		if ( colProperty.type == 'date' ) {
			switch ( columnObj.datatype.toLowerCase() ) {
				case 'yearmonth': propObj.cellsformat  = fc_getCustYearMonthFormat();	break;
				case 'monthday' : propObj.cellsformat  = fc_getCustMonthDayFormat();	break;
				case 'date' 	: propObj.cellsformat  = fc_getCustDateFormat();		break;
				case 'datetime' : propObj.cellsformat  = fc_getCustDateTimeFormat();	break;
				case 'datemin' 	: propObj.cellsformat  = fc_getCustDateMinFormat();		break;
				case 'datehour' : propObj.cellsformat  = fc_getCustDateHourFormat();	break;
				case 'time' 	: propObj.cellsformat  = fc_getCustTimeFormat();		break;
				case 'hour' 	: propObj.cellsformat  = fc_getCustHourFormat();		break;
				case 'hourmin' 	: propObj.cellsformat  = fc_getCustHourMinFormat();		break;
				case 'minsec' 	: propObj.cellsformat  = fc_getCustMinSecFormat();		break;
			}; // end of switch ( colProperty.type )
		};

		if ( window.gwMesEnv.lang.isMultiLanguage ) {
			var _itemCd    = fc_isNull( columnObj.itemCd    ) ? columnObj.name.toUpperCase() : columnObj.itemCd;
			var _itemValue = fc_isNull( columnObj.itemValue ) ? 0 : columnObj.itemValue;

			if ( window.gwMultiLang.isRunMain ) {
				propObj.text = fc_getGwLangItem( _itemCd, _itemValue, propObj.text );
				propObj.isMultiLanguage = false;
			} else {
				propObj.rendered = function( columnHeaderElement ) {
					columnHeaderElement.addClass( window.gwClass.multilanguage );
					columnHeaderElement.attr( window.gwMesEnv.item.itemcd, fc_isNull( columnObj.itemCd ) ? columnObj.name.toUpperCase() : columnObj.itemCd );
					columnHeaderElement.attr( window.gwMesEnv.item.itemvalue, fc_isNull( columnObj.itemValue ) ? 0 : columnObj.itemValue );
				};
		        fc_setLangId( _itemCd, _itemValue );
			};
		};
		return propObj;
	}; // End of _setColumnProp

	// Column Group Setting Create
	var _setGroupProp = function( groupObj ) {
		var propObj = {};

		propObj.name		= groupObj.name.toUpperCase();
		propObj.text		= ( fc_isNull( groupObj.caption ) ) ?  groupObj.name.toUpperCase() : groupObj.caption;
		propObj.align		= 'center'; // Header align

		if (!fc_isNull( groupObj.parent )) {
			propObj.parentgroup = groupObj.parent;
		};
		if ( window.gwMesEnv.lang.isMultiLanguage ) {
			var _itemCd    = fc_isNull( groupObj.itemCd    ) ? groupObj.name.toUpperCase() : groupObj.itemCd;
			var _itemValue = fc_isNull( groupObj.itemValue ) ? 0 : groupObj.itemValue;

			if ( window.gwMultiLang.isRunMain ) {
				propObj.text = fc_getGwLangItem( _itemCd, _itemValue, propObj.text );
				propObj.isMultiLanguage = false;
			} else {
				propObj.rendered = function ( element ) {
					element.addClass( window.gwClass.multilanguage );
					element.attr( window.gwMesEnv.item.itemcd, fc_isNull( groupObj.itemCd ) ? groupObj.name.toUpperCase() : groupObj.itemCd );
					element.attr( window.gwMesEnv.item.itemvalue, fc_isNull( groupObj.itemValue ) ? 0 : groupObj.itemValue );
				};
		        fc_setLangId( _itemCd, _itemValue );
			};
		};
		return propObj;
	}; // End of _setGroupProp

	//CheckBox Column Create
	var _createSelectBoxDataField = function() {
		var checkboxFieldObj = new Object();

		checkboxFieldObj.name = "JQX_CB";
		checkboxFieldObj.type = 'bool';

		return checkboxFieldObj;
	};

    // Grid Column Setting (Column Field Property)
	for ( var loop=0;loop<treeGridCols.length;loop++ ) {
		// input validation
		var preMsg = '<b>Program Error: jQueryTreeGrid</b><br><br>';
		if ( fc_isNull( treeGridCols[ loop ].name ) )
			fc_setError( preMsg + 'Column Name Property ' + window.gwMessage.validate.nodefined );
		if ( fc_isNull( treeGridCols[ loop ].datatype ) )
			fc_setError( preMsg + 'Column Datatype Property ' + window.gwMessage.validate.nodefined );
		//---------------------------------------------------------------------
		var colProperty;
		var datatype = treeGridCols[ loop ].datatype;

		try {
			if ( datatype == 'lov' ) {
				colProperty = new Object();
				colProperty.type  = 'text';
				colProperty.align = 'left';
				colProperty.editable = true;
				colProperty.sortable = true;
				colProperty.pinned   = false;
				colProperty.filtertype = 'checkedlist';
				colProperty.columntype = 'dropdownlist';
				colProperty.displayValue = {};
			} else if ( datatype == 'chklov' ) {
				colProperty = new Object();
				colProperty.type  = 'text';
				colProperty.align = 'left';
				colProperty.editable = true;
				colProperty.sortable = true;
				colProperty.pinned   = false;
				colProperty.filtertype = 'checkedlist';
				colProperty.columntype = 'template';
				colProperty.displayValue = {};
			} else if ( datatype == 'cbolov' ) {
				colProperty = new Object();
				colProperty.type  = 'text';
				colProperty.align = 'left';
				colProperty.editable = true;
				colProperty.sortable = true;
				colProperty.pinned   = false;
				colProperty.filtertype = 'checkedlist';
				colProperty.columntype = 'combobox';
				colProperty.displayValue = {};
			} else if ( datatype == 'checkbox' ) {
				colProperty = new Object();
				colProperty = checkboxTemplateTreeGrid;
				if ( fc_isNull( treeGridCols[ loop ].cellsrenderer ) ) {
					colProperty.cellsrenderer = function ( row, column, value, rowData ) {
													 var tmpChkId = treeGridId + '_' + row + '_' + column;
													 var sChecked = ( value ) ? 'checked' : '';
													 return '<input type="checkbox" style=width:25px;height:25px; id=' + tmpChkId + ' ' + sChecked + ' onclick=fc_setTreeGridRowStatus(\"' + treeGridId + '\",\"' + tmpChkId + '\",\"' + row + '\",\"' + column+'\")>';
												};
				} else {
					colProperty.cellsrenderer = treeGridCols[ loop ].cellsrenderer;
				};
			} else {
				colProperty = new Object();
				colProperty = fc_getGridTemplate( datatype );
			};
		} catch (e) {
			colProperty = new Object();
			colProperty = textTemplate;
		}; // end of try

		var dataFieldObj  = new Object();
		dataFieldObj.name = treeGridCols[ loop ].name.toUpperCase();

		var _displayCol = function ( fieldName ) {
			var dispObj = {};
			dispObj.name   = "DISP_" + fieldName;
			dispObj.value  = fieldName;
			dispObj.values = colProperty.displayValue;
			return dispObj;
		};

		var dispObj = {};
		if ( datatype.toLowerCase() == 'lov' || datatype == 'cbolov' ) { //|| datatype == 'chklov'
			dispObj = _displayCol( dataFieldObj.name, colProperty );
			arrDataField[ arrDataField.length ] = dispObj;
		};

		// Field Type Setting
		var fieldtype = colProperty.type;
		if ( !fc_isNull( fieldtype ) ) {
			switch ( fieldtype.toLowerCase( )) {
				case 'text'   :	dataFieldObj.type = 'string';	break;
				case 'date'   :	dataFieldObj.type = 'date';		break;
				case 'number' : dataFieldObj.type = 'number';	break;
				case 'check'  :	dataFieldObj.type = 'bool';		break;
				default 	  :	dataFieldObj.type = 'string';
			};
			dataFieldObj.datatype = datatype;
		}; // End of if ( !fc_isNull( fieldtype ) )

		arrDataField[ arrDataField.length ] = dataFieldObj;

		arrCol[ loop ] = _setColumnProp( treeGridCols[ loop ], colProperty, dispObj);
		arrColIDs[ loop ] = treeGridCols[ loop ].name;

		var _itemcd  = ( fc_isNull( treeGridCols[ loop ].itemCd    ) ) ? treeGridCols[ loop ].name : treeGridCols[ loop ].itemCd.toUpperCase();
		var _itemval = ( fc_isNull( treeGridCols[ loop ].itemValue ) ) ? 0 : treeGridCols[ loop ].itemValue;
		arrMultiLang.push( new _multiLangItem(treeGridCols[ loop ].name,  _itemcd, _itemval ));

		// Popup Code key Setting
		if ( datatype == 'popup' || datatype == 'custpopup' ) {
			arrColPopup[ arrColPopup.length ] = dataFieldObj.name;
		};
	}; // End of for ( var loop = 0; loop<treeGridCols.length; loop++ )

	// All Grid Setting Row Status Column
	colProperty = new Object();
	colProperty = fc_getGridTemplate( 'status' );

	//CheckBox Column Create
	var _createStatusDataField = function () {
		var statusFieldObj = new Object();

		statusFieldObj.name = 'JQX_RS';
		statusFieldObj.type = 'string';

		return statusFieldObj;
	};

	arrCol[ arrCol.length ] = _setColumnProp( {caption: 'Row Status', name: 'JQX_RS', align: 'center', width: 50, datatype: 'text', hidden: true}, colProperty, {} );
	arrDataField[ arrDataField.length ] = _createStatusDataField();
	arrColIDs[ arrColIDs.length ] = 'JQX_RS';

	//CheckBox Column Create
	var _createSelectBoxDataField = function() {
		var checkboxFieldObj = new Object();
		checkboxFieldObj.name = 'JQX_CB';
		checkboxFieldObj.type = 'bool';

		return checkboxFieldObj;
	};

	// All Grid Setting Row Status Column
	colProperty = new Object();
	colProperty = fc_getGridTemplate( 'checkbox' );
	colProperty.datatype = 'checkbox';
	colProperty.cellsrenderer = function( row, column, value, rowData ) {
		 var tmpChkId = treeGridId + '_' + row + '_' + column;
		 var sChecked = ( value ) ? 'checked' : '';
		 var sonClick = "onclick=fc_setTreeGridCellData('" + treeGridId + "','" + row + "','" + column + "', this.checked)";

		 return '<input type="checkbox" class="jqx-checkbox" style=width:25px;height:25px; id=' + tmpChkId + ' ' + sChecked + ' ' + sonClick + '>';
	};

	arrCol[ arrCol.length ] = _setColumnProp( {caption: 'Row Status', name:'JQX_CB', align: 'center', width: 50, datatype: 'checkbox', hidden:true}, colProperty, {});
	arrDataField[ arrDataField.length ] = _createSelectBoxDataField();
	arrColIDs[ arrColIDs.length ] = 'JQX_CB';

	var checkHeightFlag = false;

	if ( !fc_isNull( treeGridColGroups ) ) {
		for ( var jLoop = 0; jLoop<treeGridColGroups.length; jLoop++ ) {
			arrColGrp[ jLoop ] = _setGroupProp( treeGridColGroups[ jLoop ] );
			if ( window.gwMesEnv.lang.isMultiLanguage ) {
				var _itemcd  = ( fc_isNull( treeGridColGroups[ jLoop ].itemCd    ) ) ? treeGridColGroups[ jLoop ].name : treeGridColGroups[ jLoop ].itemCd.toUpperCase();
				var _itemval = ( fc_isNull( treeGridColGroups[ jLoop ].itemValue ) ) ? 0 : treeGridColGroups[ jLoop ].itemValue;
				arrGroupMultiLang.push( new _multiLangItem( treeGridColGroups[ jLoop ].name,  _itemcd, _itemval ) );
			};
		};
		checkHeightFlag = true;
	} else {
		arrColGrp = null;
	}; // End of if ( !fc_isNull(treeGridColGroups) )
    var _getCheckIndex = function () {
    	 fc_getCheckIndexs( treeGridId );
    };
	var keyDataFieldObj     = new Object();
	var parentDataFieldObj  = new Object();

	// Setting DataSource Property
	dataSource.datafields      = arrDataField;
	dataSource.treeGridType    = treeGridType;
	dataSource.treeGridKey     = treeGridKey;
	dataSource.treeGridIDs     = arrColIDs;
	dataSource.treeGridCheckIndexes = arrChecked;
	dataSource.treeGridPager      = pagerId;
	dataSource.colMultiLang       = arrMultiLang;
	dataSource.colGroupMultiLang  = arrGroupMultiLang;

	if (!fc_isNull(treeGridHierarchy)) {
		keyDataFieldObj.name    = treeGridHierarchy.key;
		parentDataFieldObj.name = treeGridHierarchy.parent;

		hierarchyObj.keyDataField    = keyDataFieldObj;
		hierarchyObj.parentDataField = parentDataFieldObj;

		dataSource.hierarchy	   = hierarchyObj;
	};

	var getEditorPopupDataAdapter = function ( datafield ) {
        var inputSource = dataSource;
        var dataAdapter = new $.jqx.dataAdapter( inputSource, { uniqueDataFields: [ datafield ] });
        return dataAdapter;
    }; // End of getEditorPopupDataAdapter

    // Context Menu Create
	var contextMenu = $( '#' + treeGridId + 'CM' ).jqxMenu( { theme: window.gwMesEnv.themes, width: 50, autoOpenPopup: false, mode: 'popup' } );

	var _PKcellbeginedit = function ( row, datafield, columntype ) {
		var rowStatus = fc_getCellData( treeGridId, row, 'JQX_RS' );
        if ( rowStatus != window.gwMesEnv.grid.addFlag ) return false;

        return true;
    };

	var treeGrid = $( '#' + treeGridId ).jqxTreeGrid( {
                width: '100%',
                source: dataSource,
                theme: window.gwMesEnv.themes,
                columnsHeight: 23,			// Column Header Height
                sortable: true,
				pageable: false,			// page 필수
				autoRowHeight: false,		// page 필수
				pageSize: 50,		// 한 페이지에 보여줄 data count 설정
//				pagerHeight:23,
				pageSizeOptions: [ 50, 100, 150, 200 ],
//				pagerRenderer: _createPagerRender,
				editable: ( isEdit || isUpdate ),
				editSettings: { saveOnPageChange: true, saveOnBlur: true, saveOnSelectionChange: true, cancelOnEsc: true, saveOnEnter: true, editSingleCell: true, editOnDoubleClick: true, editOnF2: true },
                columns: arrCol,
                columnGroups: arrColGrp,     // Column Group Header
                localization : getLocalization( window.gwMesEnv.lang.datepicker )
            });

	$.each( arrColPopup, function( index, item ) {
		var _createPopup = function( row, cellvalue, editor, cellText, width, height ) {
			var inputElement = $( "<div style='jqx-max-size jqx-position-relative'><input type='text'/><div id='search_" + this.datafield + "'><img alt='search_" + this.datafield + "' width='16' height='16' src='./include/images/search_lg.png' /></div></div>").prependTo(editor);
			inputElement.jqxInput( { displayMember: this.datafield, width: width+5, height: height } );
		};
		var _initPopup = function( row, cellvalue, editor, celltext, pressedkey ) {
			// set the editor's current value. The callback is called each time the editor is displayed.
			var inputField = editor.find( 'input' );
			if ( pressedkey ) {
				inputField.val( pressedkey );
				inputField.jqxInput( 'selectLast' );
			} else {
				inputField.val( cellvalue );
				inputField.jqxInput( 'selectAll' );
			};
			var datafield = this.datafield;
			if ( item.popuptype == 'POP' ) {
				$( '#search_' + this.datafield ).click( function() {
					if ( fc_createTreeGridPopup( treeGridId, row, datafield ) ) {
						$( '#popupWindow' ).jqxWindow( 'open' );
					};
				});
			} else {
				$( '#search_' + item.datafield ).click( function() {
					try {
						f_custPopup( gridId + '.' + item.datafield, row );
					} catch ( e ) {
						fc_getException( e );
					};
				});
			};
		};
		var _geteditorvaluePopup = function( row, cellvalue, editor ) {
			// return the editor's value.
			return editor.find( 'input' ).val();
		};
		var _cellendeditor = function( row, datafield, columntype, oldvalue, newvalue ) {
			$("#search_"+item).unbind( 'click' );
		};
		fc_setTreeGridColProp( treeGridId, item, 'createeditor'  , _createPopup );
		fc_setTreeGridColProp( treeGridId, item, 'initeditor'    , _initPopup );
		fc_setTreeGridColProp( treeGridId, item, 'geteditorvalue', _geteditorvaluePopup );
	});

	if ( !window.gwMesEnv.grid.isPage ) $( '#' + pagerId  ).hide();

     $( '#' + treeGridId ).on( 'rowEndEdit', function( event ) {
    	 var rowData = event.args.row;
		 fc_setTreeGridCellData( treeGridId, event.args.key , 'JQX_CB', true );

		 if ( arrChecked.indexOf( event.args.key ) == -1 ) {
			  arrChecked.push( event.args.key );
		 };
		 arrChecked.sort( function( a, b ) { return a-b; } );
		 var sJqxCbId = treeGridId + "_" + event.args.key + '_JQX_CB';
		 $( '#' + sJqxCbId ).attr( 'checked', true );
		 _getCheckIndex();
     });

	this.getTreeGridObject   = function () { return $( treeGrid ).jqxTreeGrid('source'); };
    this.getTreeGridId       = function () { return treeGridId; };
	this.isCaption           = function () { return isCaption; };
    this.getCaptionText      = function () { return fc_getGridCaptionText( treeGridId ); };
    this.getCheckedIndexes   = function () { return  fc_getTreeGridCheckIndexs( treeGridId ); };
    this.setCheckedIndexes   = function ( arrCheck ) { arrChecked = arrCheck; };
    this.getTreeGridId       = function () { return treeGridId; };
    this.getPopupSource      = function ( datafield ) { return getEditorPopupDataAdapter( datafield ); };
	this.setTreeGridlocalData 	= function ( treeGridData ) { fc_setTreeGridlocalData( treeGridId, treeGridData); };
    this.getTreeGridSource 		= function () { return fc_getTreeGridSource( treeGridId ); };
    this.getTreeGridModelSource = function () { return fc_getTreeGridModelSource( treeGridId ); };
    this.setExtraOption 		= function ( paramNm, paramVal ) { fc_setTreeGridExtraOption( treeGridId, paramNm, paramVal ); };
    this.getExtraOption 		= function ( paramNm ) { return fc_getTreeGridExtraOption( treeGridId, paramNm ); };
	this.getTreeGridPagerId 	= function () {	return fc_getTreeGridPagerId( treeGridId ); };
    this.setTreeGridParam 		= function ( arrOptions ) { fc_setTreeGridParam( treeGridId, arrOptions ); };
    this.getTreeGridParam 		= function ( paramNm ) { return fc_getTreeGridParam( treeGridId, paramNm ); };
    this.setTreeGridWidth 		= function ( width ) { fc_setTreeGridWidth( treeGridId, width ); };
    this.setTreeGridHeight 		= function ( height ) { fc_setTreeGridHeight( treeGridId, height ); };
    this.setColProp 			= function ( colNm, paramNm, paramVal ) { fc_setTreeGridColProp( treeGridId, colNm, paramNm, paramVal ); };
    this.getColProp 			= function ( colNm, paramNm ) { return fc_getTreeGridColProp( treeGridId, colNm, paramNm ); };
    this.getColProps 			= function ( colNm ) { return fc_getTreeGridColProps( treeGridId, colNm ); };
    this.setGridPKeys 			= function ( arrPKeys ) { fc_setTreeGridPKeys( treeGridId, arrPKeys ); }
    this.setColEditable 		= function ( arrColNm, editableFlag ) { fc_setTreeGridColEditable( treeGridId, arrColNm, editableFlag ); };
    this.setAllEditableExcept 	= function ( editableFlag ) { fc_setTreeGridAllEditableExcept( treeGridId, editableFlag ); };
    this.setColRequired 		= function ( arrColNm ) { fc_setTreeGridColRequired( treeGridId, arrColNm ); };
    this.setCellData  	 		= function ( rowId, colNm, data ) { fc_setTreeGridCellData( treeGridId, rowId, colNm, data ); };
    this.getCellData  			= function ( rowId, colNm ) { return fc_getTreeGridCellData( treeGridId, rowId, colNm ); };
    this.getRowData  			= function ( rowId ) { return fc_getTreeGridRowData( treeGridId, rowId ); };
    this.getRowsData  			= function () { return fc_getTreeGridRowsData( treeGridId ); };
    this.setColHidden 			 = function ( arrColNm ) { fc_setTreeGridColHidden( treeGridId, arrColNm ); };
    this.getSelectedRow			 = function () { return fc_getTreeGridSelectedRow( treeGridId ); };
    this.getTreeGridRecordCount  = function () { return fc_getTreeGridRecordCount( treeGridId ); };
    this.setParentGrid           = function ( parentGridId ) { fc_setParentGrid( treeGridId, parentGridId ); };
    this.setTreeGridBindEvent 	 = function ( event, callback ) { fc_setTreeGridBindEvent( treeGridId, event, callback ); };
    this.setCellCheckboxDisabled = function ( row, colNm, disableFlag ) { fc_setTreeGridCheckboxDisabled( treeGridId, row, colNm, disableFlag ); };
    this.setDefaultColExpandRow  = function ( expandFlag ) { fc_setTreeGridDefaultColExpandRow( treeGridId, expandFlag ); };
    this.setDefaultColExpandAll  = function () { fc_expandAllTreeGrid( treeGridId ); };
    this.setTreeGridCollapseAll  = function () { fc_setTreeGridCollapseAll( treeGridId ); };

    fc_setGridSize( treeGridId, 0, 0, 'tree' );
}; // end of jQueryGrid
/*
jQueryTreeGrid.prototype = {
	    setTreeGridlocalData 	: function (treeGridData) { fc_setTreeGridlocalData( this.treeGridId, treeGridData); },
	    getTreeGridSource 		: function () { return fc_getTreeGridSource( this.treeGridId ); },
	    getTreeGridModelSource 	: function () { return fc_getTreeGridModelSource( this.treeGridId ); },
	    setExtraOption 			: function ( prmName, prmVal ) { fc_setTreeGridExtraOption( this.treeGridId, prmName, prmVal ); },
	    getExtraOption 			: function ( extraParam ) { return fc_getTreeGridExtraOption( this.treeGridId, extraParam ); },
		getTreeGridPagerId 		: function () {	return fc_getTreeGridPagerId( this.treeGridId ); },
	    setTreeGridParam 		: function ( arrOptions ) { fc_setTreeGridParam( this.treeGridId, arrOptions ); },
	    getTreeGridParam 		: function ( param ) { return fc_getTreeGridParam( this.treeGridId, param ); },
	    setTreeGridWidth 		: function ( width ) { fc_setTreeGridWidth( this.treeGridId, width ); },
	    setTreeGridHeight 		: function ( height ) { fc_setTreeGridHeight( this.treeGridId, height ); },
	    setColProp 				: function ( colName, paramName, paramVal ) { fc_setTreeGridColProp( this.treeGridId, colName, paramName, paramVal ); },
	    getColProp 				: function ( colName, prmName ) { return fc_getTreeGridColProp( this.treeGridId, colName, prmName ); },
	    getColProps 			: function ( colName ) { return fc_getTreeGridColProps( this.treeGridId, colName ); },
	    setGridPKeys 			: function ( arrPKeys ) { fc_setTreeGridPKeys( this.treeGridId, arrPKeys ); },
	    setColEditable 			: function ( arrColName, editableFlag ) { fc_setTreeGridColEditable( this.treeGridId, arrColName, editableFlag ); },
	    setAllEditableExcept 	: function ( editFlag ) { fc_setTreeGridAllEditableExcept( this.treeGridId, editFlag ); },
	    setColRequired 			: function ( arrColName ) { fc_setTreeGridColRequired( this.treeGridId, arrColName ); },
	    setCellData 			: function ( rowId, colName, data ) { fc_setTreeGridCellData( this.treeGridId, rowId, colName, data ); },
	    getCellData 			: function ( rowId, colName ) { return fc_getTreeGridCellData( this.treeGridId, rowId, colName ); },
	    getRowData 				: function ( rowId ) { return fc_getTreeGridRowData( this.treeGridId, rowId ); },
	    getRowsData 			: function (  ) { return fc_getTreeGridRowsData( this.treeGridId ); },
	    setColHidden 			: function ( arrColName ) { fc_setTreeGridColHidden( this.treeGridId, arrColName ); },
	    getSelectedRow			: function () { return fc_getTreeGridSelectedRow( this.treeGridId ); },
	    getTreeGridRecordCount  : function () { return fc_getTreeGridRecordCount( this.treeGridId ); },
	    setParentGrid          	: function ( parentGridId ) { fc_setParentGrid( this.treeGridId, parentGridId ); },
	    setTreeGridBindEvent 	: function ( event, callback ) { fc_setTreeGridBindEvent( this.treeGridId, event, callback ); },
	    setCellCheckboxDisabled : function (row, column, bFlag ) { fc_setTreeGridCheckboxDisabled(this.treeGridId, row, column, bFlag  ); },
	    setDefaultColExpandRow 	: function ( bFlag ) { fc_setTreeGridDefaultColExpandRow( this.treeGridId, bFlag); },
	    setDefaultColExpandAll 	: function () { fc_expandAllTreeGrid( this.treeGridId); },
	    setTreeGridCollapseAll 	: function () { fc_setTreeGridCollapseAll( this.treeGridId); }
};
*/