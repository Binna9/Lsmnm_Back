/**
 * Declare constants
 */

/**
 * Declare Variable
 */
var targetObj, objItems, objGrpItems, objTabs, objCols;
var gridKey, gridId, groupCaption, gridCaption;
var formId, tabId, colWidths, colCount;

var objTabContent;
var layoutCount   = 0;
var isRunLastProc = false;

var arrGetLov = new Array(), arrSetLov   = new Array(), arrCode  = new Array();
var arrObjLth = new Array(), arrAlign    = new Array(), arrEdit  = new Array();
var arrHidden = new Array(), arrUpper    = new Array(), arrLower = new Array();
var arrKeys   = new Array(), arrRequired = new Array(), arrSort  = new Array();
var arrCodeList  = new Array(), arrMsg   = new Array(), arrItem  = new Array();
var arrMaxLength = new Array();

/**
 * Declare Initial JS Function
 */
$(function () {
	fc_showLog( 1, '***** jQuery Function Main');
}); // end of $(function ())
/**
 * fc_getUserPlantCd
 * @returns
 */
function fc_getUserPlantCd() {
	return window.gwMesEnv.user.plantCd;
}; // end of fc_getUserPlantCd
/**
 * fc_getUserId
 * @returns
 */
function fc_getUserId() {
	return window.gwMesEnv.user.id;
}; // end of fc_getUserId
/**
 * fc_getUserName
 * @returns
 */
function fc_getUserName() {
	return window.gwMesEnv.user.name;
}; // end of fc_getUserName
/**
 * fc_getLanguageCd
 * @returns
 */
function fc_getLanguageCd() {
	return window.gwMesEnv.lang.cd;
}; // end of fc_getLanguageCd
/**
 * fc_getGridFlag
 * @param sMode
 * @returns
 */
function fc_getGridFlag( sMode ) {
	switch ( sMode ) {
	case 'A' :	return window.gwMesEnv.grid.addFlag;		break;
	case 'U' :	return window.gwMesEnv.grid.updateFlag;		break;
	case 'D' :	return window.gwMesEnv.grid.deleteFlag;		break;
	default  :  return '';
	};
}; // end of fc_getGridFlag
/**
 * fc_getDefServiceName
 */
function fc_getDefServiceName() {
	return window.gwMesEnv.user.pgmId +'-service';
};// end of fc_getDefServiceName
/**
 *
 * @param targetObjId
 * @param panelSize1
 * @param panelSize2
 * @param sOrientation
 */
function fc_makeSplitter( targetObjId, panelSize1, panelSize2, sOrientation ) {
	if ( sOrientation == 'H' || sOrientation == 'h' ) {
		$( '#' + targetObjId ).jqxSplitter( { width: 'calc( 100% - 2px )', height: 'calc( 100% - 5px )', panels: [ { size: panelSize1, min: '10%' }, { size: panelSize2, min: '10%' } ], orientation: 'horizontal' } );
	} else {
		$( '#' + targetObjId ).jqxSplitter( { width: 'calc( 100% - 2px )', height: 'calc( 100% - 5px )', panels: [ { size: panelSize1, min: '10%' }, { size: panelSize2, min: '10%' } ] } );
	};
};// end of fc_makeSplitter
/**
 * fc_makeSearch
 * @param targetObjId
 * @param key
 * @param subKey
 * @param attribute1
 * @param attribute2
 */
function fc_makeSearch( targetObjId, key, subKey, attribute1, attribute2 ) {
	try {
		key       = fc_setUpperValue( key );
		subKey    = fc_setUpperValue( subKey );
		targetObj = fc_getObj( ( fc_isNull( targetObjId ) ? 'divSearchCondition' : targetObjId ) );
		objItems  = fm_getSearchItems( key, subKey, attribute1, attribute2 );
		fc_createDOM( targetObj, objItems );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of sms_makeSearch
/**
 * fc_makeDomGroup
 * @param targetObjId
 * @param formId
 * @param key
 * @param alignment
 * @param caption_flag
 * @param attribute1
 * @param attribute2
 */
function fc_makeDomGroup( targetObjId, formId, key, alignment, caption_flag, attribute1, attribute2 ) {
	try {
		key          = fc_setUpperValue( key );
		caption_flag = fc_setNullToFlase( caption_flag );
		targetObj    = fc_getObj( targetObjId );

		var retObj   = fm_getHeaderItems( key, caption_flag, attribute1, attribute2 );
		objItems     = retObj.item;
		groupCaption = retObj.caption;

		if ( fc_isNull( objItems ) ) {
			fc_setError( '[DOM Item(Key:' + key + ')]' + window.gwMessage.validate.nodefined );
		};
		fc_createDOMGroup( targetObj, formId, objItems, groupCaption, 'left' );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of sms_makeDomGroup
/**
 * fc_makeTableCaption
 * @param strCaption
 * @param strItemCd
 * @param intItemValue
 */
function fc_makeTableCaption( strCaption, strItemCd, intItemValue, bMultiLanguage ) {
	var tableCaption;
	try {
		if ( !fc_isNull( strCaption ) ) {
			tableCaption = { caption: strCaption, itemCd: strItemCd, itemValue: intItemValue, isMultiLanguage: bMultiLanguage };
		} else {
			tableCaption = { caption: '', itemCd: '', itemValue: 0, isMultiLanguage: false };
		};
	} catch ( e ) {
		fc_getException( e );
	};
	return tableCaption;
}; // end of fc_makeTableCaption
/**
 * fc_makeTable
 * @param targetObjId
 * @param key
 * @param subKey
 * @param caption_flag
 * @param isFixed
 * @param attribute1
 * @param attribute2
 * @param attribute3
 * @param attribute4
 * @param attribute5
 * @returns tableObj = { object: tableSelector , id: tableId }
 */
function fc_makeTable( targetObjId, key, subKey, caption_flag, isFixed, attribute1, attribute2, attribute3, attribute4, attribute5 ) {
	try {
		key          = fc_setUpperValue( key );
		subKey       = fc_setUpperValue( subKey );
		caption_flag = fc_setNullToTrue( caption_flag );
		targetObj    = fc_getObj( targetObjId );

		var retObj   = fm_getTableItems( key, subKey, caption_flag, attribute1, attribute2, attribute3, attribute4, attribute5 );
		colWidths    = retObj.width;
		objCols      = retObj.col;

		if ( fc_isNull( objCols ) ) {
			fc_setError( '[Table Column(Key:' + key + ')]' + window.gwMessage.validate.nodefined );
		};
		fc_createFormTable(targetObj, retObj.id, colWidths.length, 0, colWidths, objCols, isFixed);

		if ( !fc_isNull( retObj.caption.caption ) ) {
			fc_setElementCaption( retObj.id, retObj.caption );
		};
		if ( typeof fm_makeSpan == 'function' ) {
			fm_makeSpan( retObj.id, key, subKey );
		};

		var tableObj = new Object();
		var tableSelector = $( '#' + retObj.id );
		tableObj = { object: tableSelector , id: retObj.id };

		return tableObj;
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_makeTable
/**
 * fc_makeGridCaption
 * @param strCaption
 * @param strItemCd
 * @param intItemValue
 * @param bIsMultiLanguage
 */
function fc_makeGridCaption( strCaption, strItemCd, intItemValue, bIsMultiLanguage ) {
	var gridCaption;
	try {
		gridCaption = { caption: strCaption, itemCd: strItemCd.toUpperCase().trim(), itemValue: intItemValue, isMultiLanguage: fc_setValue( bIsMultiLanguage, window.gwMesEnv.lang.isMultiLanguage ) };
	} catch ( e ) {
		fc_getException( e );
	};
	return gridCaption;
}; // end of fc_makeGridCaption
/**
 * fc_makeGrid
 * @param targetObjId
 * @param type
 * @param key
 * @param subKey
 * @param caption_flag
 * @param attribute1
 * @param attribute2
 * @param tabGridFlag
 * @param addType
 * @param bGridMultiLanguage
 * @returns {jQueryGrid}
 */
function fc_makeGrid( targetObjId, type, key, subKey, caption_flag, attribute1, attribute2, tabGridFlag, addType, bGridMultiLanguage ) {
	try {
		key          = fc_setUpperValue ( key );
		subKey       = fc_setUpperValue ( subKey );
		caption_flag = fc_setNullToTrue ( caption_flag );
		targetObj    = fc_getObj ( targetObjId );

		var retObj  = fm_getGridItems( key, subKey, caption_flag, attribute1, attribute2 );
		gridId      = retObj.id;
		objItems    = retObj.item;
		objGrpItems = retObj.grpItem;
		gridCaption = retObj.caption;
		gridKey     = retObj.key;

		if ( fc_isNull( gridId ) ) {
			fc_setError( '[Grid ID(Key:' + key + ')]' + window.gwMessage.validate.nodefined );
		};
		if ( fc_isNull( objItems ) ) {
			fc_setError( '[Grid Columns(Key:' + key + ')]' + window.gwMessage.validate.nodefined );
		};
		var objGrid = new jQueryGrid( targetObj, gridId, objItems, type, gridCaption, gridKey, objGrpItems, tabGridFlag, addType, bGridMultiLanguage );
		return objGrid;
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_makeGrid
/**
 * fc_makeTab
 * @param targetObjId    : 텝을 할당할 HTML Element ID
 * @param tabId          : Tab ID
 * @param key            : key ( {chain}.function.js )
 * @param subKey         : subkey ( {chain}.function.js )
 * @param tabs           : Array [ { Object } ]
 * @param attribute1     : attribute1
 * @param attribute2     : attribute2
 * @returns {Array}
 * @Example
 *		fc_makeTab( 'divTabResult', 'SubResult', '', ''
 *				, [ {id: 'DSN_CHEM', objtype: 'grid', authority: 'insert', isMultiLanguage: false },
 *					{id: 'DSN_MECH', objtype: 'grid', authority: 'insert', isMultiLanguage: false or true }
 *				  ]);
 */
function fc_makeTab( targetObjId, tabId, key, subKey, tabs, attribute1, attribute2  ) {
	try {
		key       = fc_setUpperValue( key );
		subKey    = fc_setUpperValue( subKey );
		targetObj = fc_getObj( targetObjId );

		objTabs = fm_getTabPages( tabs, key, subKey, attribute1, attribute2 );
		window.gwCustTab = fc_makeDOMSubTab( targetObj, tabId,  objTabs, tabs, key, subKey, attribute1, attribute2 );

		fc_setTabSelected( tabId );
		fc_selectFirstTab( tabId );

		return objTabContent;
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_makeTab
/**
 * fc_makeDOMSubTab
 * @param targetObj
 * @param tabsId
 * @param tabObjList
 * @param tabContentsObj
 * @param key
 * @param subKey
 * @param attribute1
 * @param attribute2
 * @returns {jQueryTabs}
 */
function fc_makeDOMSubTab( targetObj, tabsId, tabObjList, tabContentsObj, key, subKey, attribute1, attribute2 ) {
	// 2018.2.22 getting from database
	window.gwMultiLang.isRunMain = false;
	try {
		objTabContent = new Array( new Object );
		if ( targetObj == undefined )
			targetObj = $( 'body' );
		else
			targetObj.children().remove();

		var customTab = new jQueryTabs( targetObj, tabsId, false );
		var _multiLangItem = function( tabidx, itemCd, itemValue ) {
			this.TAB_IDX  = tabidx;
			this.ITEM_CD  = fc_isNull( itemCd ) ? colNm : itemCd.toUpperCase().trim();
			this.ITEM_VAL = fc_isNull( itemValue ) ?  0 : itemValue;
		};

		var arrTabMultiLang = new Array();
		for ( var loop=0;loop<tabObjList.length;loop++ ) {
			var contentsClass = '';
			if ( !fc_isNull( tabObjList[ loop ].contentstype ) ) {
				contentsClass = 'contents' + tabObjList[ loop ].contentstype;
			};

			var divId = tabObjList[ loop ].name.toUpperCase();
			var divContents = $( '<div id="' + divId + '" ' + ( fc_isNull( contentsClass ) ? '' : ( 'class="'+ contentsClass + '"' ) ) +'></div>' );
			var pageName = tabContentsObj[ loop ].id.toUpperCase();

			if ( tabContentsObj[ loop ].objtype.toUpperCase() == 'GRID' ) {
				objTabContent[ loop ] = fc_makeGrid(  pageName
													, tabContentsObj[ loop ].authority
													, pageName
													, fc_isNull( tabContentsObj[ loop ].subKey ) ? null : tabContentsObj[ loop ].subKey
													, false
													, ( fc_isNull( attribute1 ) ? null : ( typeof attribute1 == 'string' ) ? attribute1 : attribute1[ loop ] )
													, ( fc_isNull( attribute2 ) ? null : ( typeof attribute2 == 'string' ) ? attribute2 : attribute2[ loop ] )
													, true
													, fc_setValue( tabContentsObj[ loop ].addType, true )
													, fc_setValue( tabContentsObj[ loop ].isMultiLanguage, window.gwMesEnv.lang.isMultiLanguage ) );
				$( '#' + objTabContent[ loop ].GridId ).appendTo( divContents );
			} else if ( tabContentsObj[ loop ].objtype.toUpperCase() == 'FORM' ) {
				objTabContent[ loop ] = fc_makeTable( pageName, pageName, subKey, false );
				divContents.append( objTabContent[ loop ].object );
			};

			tabObjList[ loop ].isMultiLanguage = fc_setValue( tabObjList[ loop ].isMultiLanguage, true );
			if ( window.gwMesEnv.lang.isMultiLanguage && tabObjList[ loop ].isMultiLanguage ) {
				var _itemcd  = ( fc_isNull( tabObjList[ loop ].itemCd    ) ) ? tabObjList[ loop ].name.toUpperCase() : tabObjList[ loop ].itemCd.toUpperCase().trim();
				var _itemval = ( fc_isNull( tabObjList[ loop ].itemValue ) ) ? 0 : tabObjList[ loop ].itemValue;
				if ( window.gwMultiLang.isRunMain ) {
					if ( !fc_isNull( _itemcd ) ) {
						tabObjList[ loop ].caption = fc_getGwLangItem( _itemcd, _itemval, tabObjList[ loop ].caption );
					};
				} else {
					if ( !fc_isNull( _itemcd ) ) {
						arrTabMultiLang.push( new _multiLangItem( loop, _itemcd, _itemval ) );
						fc_setLangId( _itemcd, _itemval );
					};
				};
			}; // end of if ( window.gwMesEnv.lang.isMultiLanguage )

			if ( !fc_isNull( tabObjList[ loop ].name.toUpperCase() ) )
				customTab.addContentsTabbyObj( tabObjList[ loop ].caption, divContents );
			else
				fc_setError( '[Object ID]' + window.gwMessage.validate.nodefined );
		};

		window.gwTabMultiLang[ tabsId ] = arrTabMultiLang;
		$( '#' + tabsId ).addClass( 'tab-layout-custom' );
		customTab.setTabObj( objTabContent );

		return customTab;
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_makeDOMSubTab
/**
 * fc_makeDOMSubTabManual
 * @param targetObj
 * @param tabsId
 * @param tabObjList
 * @param arrtabContents
 * @returns {customTab}
 */
function fc_makeDOMSubTabManual( targetObj, tabsId, tabObjList, arrtabContents ) {
	// 2018.2.22 getting from database
	window.gwMultiLang.isRunMain = false;
	try {
		objTabContent = new Array( new Object );
		if ( targetObj == undefined )	targetObj = $( 'body' );
		else targetObj.children().remove();

		var customTab = new jQueryTabs( targetObj, tabsId, false );
		var _multiLangItem = function( tabidx, itemCd, itemValue ) {
			this.TAB_IDX  = tabidx;
			this.ITEM_CD  = fc_isNull( itemCd ) ? colNm : itemCd;
			this.ITEM_VAL = fc_isNull( itemValue ) ?  0 : itemValue;
		};

		var arrTabMultiLang = new Array();

		for ( var loop=0;loop<tabObjList.length;loop++ ) {
			var contentsClass = '';
			if ( !fc_isNull( tabObjList[ loop ].contentstype ) ) {
				contentsClass = 'contents' + tabObjList[ loop ].contentstype;
			};

			var divId = tabObjList[ loop ].name.toUpperCase();
			var divContents = $( '<div id="' + divId + '" ' + ( fc_isNull( contentsClass ) ? '' : ( 'class="'+ contentsClass + '"' ) ) +'></div>' );
			objTabContent[ loop ] = arrtabContents[ loop ];

			if ( !fc_isNull( objTabContent[ loop ].object ) ) {
				$( '#' + objTabContent[ loop ].id ).remove();
				( objTabContent[ loop ].object ).appendTo( divContents );
			} else {
				$( '#' + objTabContent[ loop ].GridId ).appendTo( divContents );
			};

			customTab.addContentsTabbyObj( tabObjList[ loop ].caption, divContents );
			if ( fc_isNull( tabObjList[ loop ].isMultiLanguage ) ) tabObjList[ loop ].isMultiLangue = true;

			if ( tabObjList[ loop ].isMultiLanguage && window.gwMesEnv.lang.isMultiLanguage ) {
				var _itemcd  = ( fc_isNull( tabObjList[ loop ].itemCd    ) ) ? tabObjList[ loop ].name.toUpperCase() : tabObjList[ loop ].itemCd.toUpperCase();
				var _itemval = ( fc_isNull( tabObjList[ loop ].itemValue ) ) ? 0 : tabObjList[ loop ].itemValue;

				if ( window.gwMultiLang.isRunMain ) {
					lableEle.textContent = fc_getGwLangItem( _itemcd, _itemval, elementObj.caption );
				} else {
					arrTabMultiLang.push( new _multiLangItem( loop, _itemcd, _itemval ) );
					fc_setLangId( _itemcd, _itemval );
				};
			}; // end of if ( window.gwMesEnv.lang.isMultiLanguage )
		};

		window.gwTabMultiLang[ tabsId ] = arrTabMultiLang;
		$( '#' + tabsId ).addClass( 'tab-layout-custom' );
		customTab.setTabObj( objTabContent );

		return customTab;
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_makeDOMSubTabManual
/**
 * fc_makeTabContents
 * @param pages
 * @param key
 * @param subKey
 * @param attribute1
 * @param attribute2
 * @returns {Array}
 */
function fc_makeTabContents( pages, key, subKey, attribute1, attribute2 ) {
	var objTabContent = new Array(new Object);
	try {
		var pageName = '';
		for ( var iLoop=0;iLoop<pages.length;iLoop++ ) {
			pageName = pages[ iLoop ].id.toUpperCase();

			if ( pages[ iLoop ].objtype.toUpperCase() == 'GRID' ) {
				objTabContent[ iLoop ] = fc_makeGrid( pageName
													, pages[ iLoop ].authority
													, pageName
													, pageName
													, false
													, attribute1
													, attribute2
													, true
													, fc_setValue( pages[ iLoop ].addType, true )
													, fc_setValue( pages[ iLoop ].isMultiLanguage, window.gwMesEnv.lang.isMultiLanguage )
													) ;
			} else {
				objTabContent[ iLoop ] = fc_makeTable( pageName, pageName, subKey, false );
			};
		};
		return objTabContent;
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_makeTabContents
/**
 * fc_calcDate
 * @param _date
 * @param _gab
 * @returns
 */
function fc_calcDate( _date, _gap ) {
	if ( fc_isNull( _date ) ) return false;
	if ( fc_isNull( _gap  ) ) return false;
	if ( _gap == 0 ) return _date;

	var resultVal;
	var rstDate;
	var isSep   = '';
	var strDate = '';
	var vYear, vMonth, vDay;

	if ( $.type( _date ) == 'date' ) {
		rstDate = new Date( _date.getFullYear(), _date.getMonth(), _date.getDate() );
	} else {
		strDate = _date;
		if ( strDate.length == 10 ) isSep = '-';
		var curDate = strDate.replace( /\-/g, '' );
		if ( curDate.length != 8 ) return false;
		if ( window.gwMesEnv.format.date.target == 'YMD' ) {
			vYear  = curDate.substring( 0, 4 );
			vMonth = curDate.substring( 4, 6 );
			vDay   = curDate.substring( 6, 8 );
		} else {
			vYear  = curDate.substring( 4, 8 );
			vMonth = curDate.substring( 2, 4 );
			vDay   = curDate.substring( 0, 2 );
		};
		rstDate = new Date( vYear, vMonth-1, vDay );
	};
	rstDate.setDate( rstDate.getDate() + _gap );

	vYear  = rstDate.getFullYear();
	vMonth = rstDate.getMonth();
	vDay   = rstDate.getDate();

	if ( $.type( _date ) == 'date' ) {
		resultVal = new Date( vYear, vMonth, vDay );
	} else {
		vMonth++;
		vMonth = vMonth < 10 ? '0' + vMonth : vMonth;
		vDay   = vDay   < 10 ? '0' + vDay   : vDay;

		if ( window.gwMesEnv.format.date.target == 'YMD' ) {
			resultVal = vYear + isSep + vMonth + isSep + vDay;
		} else {
			resultVal = vDay + isSep + vMonth + isSep + vYear;
		};
	};

	return resultVal;
}; // end of fc_calcDate
/**
 * fc_dateTerm
 * @param dateFrom: YYYYMMDD or YYYYMMDDHH24MISS
 * @param dateTo  : YYYYMMDD or YYYYMMDDHH24MISS
 * @param rtnType
 * @returns DD, HH, MI, SS
 */
function fc_dateTerm( dateFrom, dateTo, rtnType ) {
	if ( dateFrom == null || dateTo == null || rtnType == null ) return false;
	if ( ( dateFrom.length != 8 && dateFrom.length != 14 ) || ( dateTo.length != 8 && dateTo.length != 14 ) ) return false;

	var fromYear   = dateFrom.substring( 0, 4 );
	var fromMonth  = dateFrom.substring( 4, 6 );
	var fromDay    = dateFrom.substring( 6, 8 );
	var fromHour   = ( dateFrom.length == 14 ) ? dateFrom.substring(  8, 10 ) : '00';
	var fromMinute = ( dateFrom.length == 14 ) ? dateFrom.substring( 10, 12 ) : '00';
	var fromSecond = ( dateFrom.length == 14 ) ? dateFrom.substring( 12, 14 ) : '00';

	var toYear   = dateTo.substring( 0, 4 );
	var toMonth  = dateTo.substring( 4, 6 );
	var toDay    = dateTo.substring( 6, 8 );
	var toHour   = ( dateTo.length == 14 ) ? dateTo.substring(  8, 10 ) : '00';
	var toMinute = ( dateTo.length == 14 ) ? dateTo.substring( 10, 12 ) : '00';
	var toSecond = ( dateTo.length == 14 ) ? dateTo.substring( 12, 14 ) : '00';

	var fromDate = new Date( fromYear, fromMonth - 1, fromDay, fromHour, fromMinute, fromSecond );
	var toDate   = new Date( toYear  , toMonth   - 1, toDay  , toHour  , toMinute  , toSecond   );

	var diffValue     = 0;
	var diffMilSecond = toDate - fromDate;
	var diffSecond    = diffMilSecond / 1000;
	var diffMinute    = diffSecond / 60;
	var diffHour      = diffMinute / 60;
	var diffDay       = diffHour   / 24;

	switch ( rtnType.toUpperCase() ) {
		case 'DD': diffValue = diffDay;		break;
		case 'HH': diffValue = diffHour;	break;
		case 'MI': diffValue = diffMinute;	break;
		case 'SS': diffValue = diffSecond;	break;
		default: diffValue = diffDay;       break;
	};
	return diffValue;
}; // end of fc_dateTerm
/**
 * fc_setBindEvent
 * @param objId
 * @param event
 * @param callback
 */
function fc_setBindEvent( objId, event, callback ) {
	$( '#' + objId ).on( event, callback );
}; // end of fc_setBindEvent
/**
 * fc_setBindEventOff
 * @param objId
 * @param event
 * @param callback
 */
function fc_setBindEventOff( objId, event, callback ) {
	$( '#' + objId ).off( event, callback );
}; // end of fc_setBindEventOff
/**
 * fc_getDropDownListByLabel
 * @param targetId
 * @param labelNm
 * @returns
 */
function fc_getDropDownListByLabel( targetId, labelNm ) {
	var items = $( '#' + targetId ).jqxDropDownList( 'getItems' );
	var iIndex = -1;
	$.each( items, function ( index, item ) {
		if ( item.label == labelNm ) {
			iIndex = index;
			return false;
		};
	});

	if ( iIndex > -1 ) return items[ iIndex ].value;
	else return '';
};// end of fc_getDropDownListByLabel
/**
 * fc_setMessage
 * @param arrMsgId
 */
function fc_setMessage( arrMsgId ) {
	if ( !isRunLastProc ) {
		for ( var loop=0;loop<arrMsgId.length;loop++ ) {
			fc_addMsg( arrMsgId[ loop ] );
		};
		return;
	};
	var arrMessage = new Array();
	if ( !$.isArray( arrMsgId ) ) {
		arrMessage[ arrMessage.length ] = arrMsgId;
	} else {
		for ( var loop=0;loop<arrMsgId.length;loop++ ) {
			arrMessage[ arrMessage.length ] = arrMsgId[ loop ];
		};
	};

	fc_getMultiLangMessage( arrMessage );
}; // end of fc_setMessage
/**
 * fc_getMessage
 * @param msgId
 * @returns
 */
function fc_getMessage( msgId, defMsg ) {
	if ( fc_isNull( msgId ) )
		fc_setError( '[Message ID]' + window.gwMessage.validate.nodefined, errStack );

	var message = fc_getMultiMessage( msgId, defMsg );
	for ( var loop = 1; loop < arguments.length; loop++ ) {
		var regExp1 = new RegExp( '\\{([' + loop + '])\\}', 'g' );
		message = message.replace( regExp1, arguments[ loop ] );
	};

	return message;
}; // end of fc_getMessage
/**
 * fc_setMultiItem
 * @param arrItemObj
 */
function fc_setMultiItem( arrItemObj ) {
	// 2018.2.22 getting from database
	window.gwMultiLang.isRunMain = false;
	if ( !window.gwMesEnv.lang.isMultiLanguage ) return;
	if ( fc_isNull( arrItemObj ) ) return;

	var arrData = new Array();

	if ( $.isArray( arrItemObj ) )
		arrData = arrItemObj;
	else if ( typeof arrItemObj === 'object' )
		arrData[ arrData.length ] = arrItemObj;

	$.each( arrData, function ( index, objData ) {
		var _itemValue = fc_isNull( objData.itemValue ) ? 0 : objData.itemValue;
		if ( window.gwMultiLang.isRunMain ) {
			var _langId = objData.itemCd.toUpperCase().trim();
			if ( fc_isNull( window.gwMultiLangParam[ _langId ] ) ) {
				window.gwMultiLangParam[ _langId ] = _itemValue;
			} else {
				return;
			};
		} else {
			fc_setLangId( objData.itemCd, _itemValue );
		};
	});
}; // end of fc_setMultiItem
/**
 * fc_getMultiItem
 * @param itemCd
 * @returns {String}
 */
function fc_getMultiItem ( itemCd ) {
	try {
		var preFix = window.gwMesEnv.lang.prefix;
		if ( window.gwMultiLang.isRunMain ) {
			var itemValue = window.gwMultiLangParam[ itemCd ];
			_text = fc_getGwLangItem( itemCd, itemValue, preFix + itemCd );
		} else {
			if ( fc_isNull( window.gwLangResult ) ) return;

			var iIndex = -1;

			$.each( window.gwLangResult, function ( index, item ) {
				if ( item.ITEM_CD == itemCd.toUpperCase().trim() ) {
					iIndex = index;
					return false;
				};
			});

			if ( iIndex > -1 ) {
				var _id = window.gwLangResult[ iIndex ].ITEM_CD;
				var itemValue = window.gwLangParam[ _id ];
				for ( var iloop=0;iloop<itemValue.length;iloop++ ) {
					var _value = itemValue.substr( iloop, 1 );
					var _text = ''
					try {
						switch ( _value ) {
							case '0' : if ( !fc_isNull( window.gwLangResult[ iIndex ].CONTENTS      ) ) _text = window.gwLangResult[ iIndex ].CONTENTS; 	 else _text = preFix + _id; break;
							case '1' : if ( !fc_isNull( window.gwLangResult[ iIndex ].ALT_CONTENTS1 ) ) _text = window.gwLangResult[ iIndex ].ALT_CONTENTS1; else _text = preFix + _id; break;
							case '2' : if ( !fc_isNull( window.gwLangResult[ iIndex ].ALT_CONTENTS2 ) ) _text = window.gwLangResult[ iIndex ].ALT_CONTENTS2; else _text = preFix + _id; break;
							case '3' : if ( !fc_isNull( window.gwLangResult[ iIndex ].ALT_CONTENTS3 ) ) _text = window.gwLangResult[ iIndex ].ALT_CONTENTS3; else _text = preFix + _id; break;
							default  : _text = preFix + _id; break;
						}; // end of switch ( _value )
					} catch ( e ) {
						_text = preFix + _id;
					};
				}; // end of for ( var iloop = 0; iloop<itemValue.length; iloop++ )
			} else {
				_text = preFix + itemCd;
			};
		};
	} catch ( e ) {
		fc_getException( e );
	};
	return _text;
}; // end of fc_getMultiItem
/**
 * jQueryLayout
 * @param		targetObj : PosLayout을 추가할 대상 객체
 * @param		arrPaneNames : 사용할 pane 이름 배열. north/south/west/east/center
 * @param		options : Layout에 적용할 옵션
 * @param		topMargin : Layout 상위 margin
 * @returns
 * @method		getLayout : Return Layout Object
 * 				getPane : Return Pane Object
 * 				attachObject : Attach Object to Pane
 * @example
 */
function jQueryLayout( targetObj, arrPanelNms, options, topMargin ) {
	var paneNames = [ 'north', 'south', 'west', 'east', 'center' ];
	var divLayout = null, objLayout = null;

	if ( targetObj != undefined ) {
		layoutCount++;
		targetObj.append( '<div id="divLayout_' + layoutCount + '" style="position: absolute; top: 0px; bottom: 0px; left: 0px; right: 0px;" />' );
		divLayout = $( '#divLayout_' + layoutCount );
		divLayout.css( 'top', topMargin );

		options.height = 'calc(100% - ' + topMargin + 'px )';

		$.each( arrPanelNms, function () {
			if ( $.inArray( this.toString(), arrPanelNms ) > -1 ) {
				divLayout.append( '<div id="'+ this +'Panel" class="layout-' + this + '"/>' );
			};
		});

		objLayout = divLayout.jqxSplitter( options );
	} // end of if (targetObj != undefined)

	/* =========================================================================
	 * Return Layout Object
	 * =========================================================================*/
	this.getLayout = function () {
		return objLayout;
	}; // end of getLayout

	/* =========================================================================
	 * Return Pane Object
	 * =========================================================================*/
	this.getPane = function ( panelNm ) {
		if ( $.inArray( panelNm, arrPanelNms ) > -1 ) {
			return $( '#' + panelNm + 'Panel' );
		};
	}; // end of getPane

	/* =========================================================================
	 * Attach Object to Pane
	 * =========================================================================*/
	this.attachObject = function ( obj, panelNm ) {
		this.getPane( panelNm ).append( obj );
	}; // end of attachObject

	this.setSize = function ( panelNm, panelSize ) {
		var panel = divLayout.jqxSplitter( 'panels' );
		var arrSize = new Array();

		divLayout.jqxSplitter({ panels: [ { size: panelSize } ] });
	}; // end of setSize

	this.getPanels = function () {
		return divLayout.jqxSplitter( 'panels' );
	}; // end of setCollapse

	this.setCollapse = function () {
		divLayout.jqxSplitter( 'collapse' );
	}; // end of setCollapse

	this.setExpand = function () {
		divLayout.jqxSplitter( 'expand' );
	}; // end of setCollapse
}; // end of jQueryLayout
/**
 * jQueryMap
 * @description	Create jQueryMap object (Similar with Java's Map object)
 * @param		initParamData : PosJSMap 초기 데이타 (parameter 문자열 형태)
 * @returns
 * @method		put : key/value pair 형태로 Map에 값을 넣는다.
 * 				putAll : 모든 값을 Map에 넣는다.
 * 				get : key에 해당하는 value를 반환한다.
 * 				remove : key에 해당하는 value를 제거한다.
 * 				getKeys : key의 배열을 반환한다.
 * 				getNames : key를 분리기호(default |)와 함께 반환한다. (key1|key2|key3|key4)
 * 				getValues : value의 배열을 반환한다.
 * 				isContainsKey : key의 존재여부를 반환한다.
 * 				isContainsValue : value의 존재여부를 반환한다.
 * 				setParams : parameter 문자열 (key1=value1&key2=value2)으로 데이터를 설정한다.
 * 				clear : Map의 모든 데이터를 제거한다.
 * 				isEmpty : Map이 비어있는지 확인한다.
 * 				size : Map의 크기를 반환한다.
 * 				toString : Map의 데이터를 분리기호(default ,)와 함께 반환한다. (key1=value1,key2=value2,key3=value3)
 * 				toParamString : Map의 데이터를 parameter 문자열 형태로 반환한다. (key1=value1&key2=value2&key3=value3)
 */
function jQueryMap( initParamData ) {
	this.map = new Object();

	if ( initParamData != undefined ) {
		this.setParams( initParamData );
	};
	/* =========================================================================
	 * Method : put
	 * =========================================================================*/
	this.put = function( key, value ) {
		this.map[ key ] = value;
	};
	/* =========================================================================
	 * Method : putAll
	 * =========================================================================*/
	this.putAll = function( mapObj ) {
		var arrKeys = mapObj.getKeys();
		for ( var index in arrKeys ) {
			var key = arrKeys[ index ];
			this.put( key, mapObj.get( key ) );
		};
	};
	/* =========================================================================
	 * Method : get
	 * =========================================================================*/
	this.get = function( key ) {
		return this.map[ key ];
	};
	/* =========================================================================
	 * Method : remove
	 * =========================================================================*/
	this.remove = function( key ) {
		var returnValue = this.get( key );
		delete this.map[ key ];
		return returnValue;
	};
	/* =========================================================================
	 * Method : getKeys
	 * =========================================================================*/
	this.getKeys = function() {
		var keys = new Array();
		for ( var key in this.map )
			keys.push( key );
		return keys;
	};
	/* =========================================================================
	 * Method : getNames
	 * =========================================================================*/
	this.getNames = function( splitChar ) {
		splitChar = splitChar == null ? '|' : splitChar;
		return this.getKeys().toString().replace( RegExp( /, /ig ), splitChar );
	};
	/* =========================================================================
	 * Method : getValues
	 * =========================================================================*/
	this.getValues = function() {
		var values = new Array();
		for ( var key in this.map )
		values.push( this.map[ key ] );
		return values;
	};
	/* =========================================================================
	 * Method : isContainsKey
	 * =========================================================================*/
	this.isContainsKey = function( compareKey ) {
		return compareKey in this.map;
	};
	/* =========================================================================
	 * Method : isContainsValue
	 * =========================================================================*/
	this.isContainsValue = function( compareValue ) {
		for ( var key in this.map ) {
			if ( this.map[ key ] == compareValue )
				return true;
		};
		return false;
	};
	/* =========================================================================
	 * Method : setParams
	 * =========================================================================*/
	this.setParams = function( paramString ) {
		var paramList = paramString.split( '&' );

		for ( var index in paramList ) {
			var arrParam = paramList[ index ].split( '=' );
			this.put( arrParam[ 0 ], arrParam.length > 1 ? arrParam[ 1 ] : '' );
		};
	};
	/* =========================================================================
	 * Method : clear
	 * =========================================================================*/
	this.clear = function() {
		this.map = new Object();
	};
	/* =========================================================================
	 * Method : isEmpty
	 * =========================================================================*/
	this.isEmpty = function() {
		return ( this.size() == 0 );
	};
	/* =========================================================================
	 * Method : size
	 * =========================================================================*/
	this.size = function() {
		var count = 0;
		for ( var prop in this.map )
			count++;
		return count;
	};
	/* =========================================================================
	 * Method : toString
	 * =========================================================================*/
	this.toString = function( splitChar ) {
		splitChar = splitChar == null ? ',' : splitChar ;
		var tmp = '';

		for ( var key in this.map ) {
			if (tmp != '' )	tmp += splitChar ;
			tmp += key + '=' + this.map[ key ];
		};
		return tmp;
	};
	/* =========================================================================
	 * Method : toParamString
	 * =========================================================================*/
	this.toParamString = function() {
		return this.toString( '&' ) ;
	};
}; // end of jQueryMap
/**
 * jQueryNavBar
 * @param	targetObj
 * @param  navBarId
 * @param	arritemObj
 * @param  selectIdx
 * @returns
 * @Example
 */
function jQueryNavBar( targetObj, navBarId, arritemObj, selectIdx ) {
	if ( targetObj == undefined ) {
		targetObj = $( 'body' );
	};

	if ( fc_isNull( selectIdx ) ) selectIdx = 0;

	targetObj.append( '<div id="' + navBarId + '" class="navbar_menu" />' );

	var navBarObj = $( '#' + navBarId );
	navBarObj.css( 'height', '30px' );
	navBarObj.css( 'width' , '100%' );
	var ulNavBarObj = $( '<ul></ul>' );

	var columnSize = new Array();

	$.each( arritemObj, function( index, item ) {
		var liNavBarObj =  $( '<li id="' + item.id + '" class="navbar_item"></li>' );
		var spanObj = $( '<span id="span_' + item.id + '" class="navbar_span_item">' + item.text + '</span>' );
		liNavBarObj.append( spanObj );
		ulNavBarObj.append( liNavBarObj );

		columnSize.push( item.size );
	});

	navBarObj.append( ulNavBarObj );
	var navBar = navBarObj.jqxNavBar( {
		height : navBarObj.css( 'height' ),
		width  : '100%',
		theme  : window.gwMesEnv.themes,
		selection : true,
		selectedItem : selectIdx,
		columns : columnSize,
		orientation : 'horizontal'
	});

	navBarObj.addClass( 'ui-navbar-menu-custom' );

	this.getNavBarObject = function() {
		return navBar;
	};
	this.getSelectedIndex = function() {
		return $( '#' + navBarId ).jqxNavBar( 'getSelectedIndex' );
	};
	this.setSelect = function ( selectIdx ) {
		$( '#' + navBarId ).jqxNavBar( 'selectAt', selectIdx );
	};
	this.onChangeEvent = function ( callBack ) {
		$( '#' + navBarId ).on( 'change', callBack );
	};
}; // end of jQueryNavBar
/**
 * fc_openFileManageMent
 * @description	open attch file infomation List
 * @param	strFileAuth : popup Auth ( SAVE|DELETE|DOWNLOAD --> 1 or 0 ) ex) 1|1|1
 * @param	strFileID : Attch File Id
 * @param	strBizChanKey1: BizChain Primary Key1 ( default:'*' )
 * @param	strBizChanKey2: BizChain Primary Key2 ( default:'*' )
 * @param	strBizChanKey3: BizChain Primary Key3 ( default:'*' )
 * @param	strBizChanKey4: BizChain Primary Key4 ( default:'*' )
 * @param	strBizChanKey5: BizChain Primary Key5 ( default:'*' )
 */
function fc_openAttchFileManagement( strFileAuth, strFileID, strBizChanKey1, strBizChanKey2, strBizChanKey3, strBizChanKey4, strBizChanKey5 ) {
	var chkKey =  ( fc_isNull( strBizChanKey1 ) ) ? '*' : strBizChanKey1
				+ ( fc_isNull( strBizChanKey2 ) ) ? '*' : strBizChanKey2
				+ ( fc_isNull( strBizChanKey3 ) ) ? '*' : strBizChanKey3
				+ ( fc_isNull( strBizChanKey4 ) ) ? '*' : strBizChanKey4
				+ ( fc_isNull( strBizChanKey5 ) ) ? '*' : strBizChanKey5;

	if ( fc_isNull(strFileID ) && chkKey == '*****' ) {
		throw new Error( 'please check for [ BizChain Primary Key ] '
					+ ' Parameter List :: '
					+ strFileAuth
					+ ', ' + strFileID
					+ ', ' + strBizChanKey1
					+ ', ' + strBizChanKey2
					+ ', ' + strBizChanKey3
					+ ', ' + strBizChanKey4
					+ ', ' + strBizChanKey5
		);
		return ;
	};

	fc_linkagePopup	( 'SCOZ0030'
					 , [ { name: 'POPUP_FILE_AUTH', value : strFileAuth }
					   , { name: 'FILE_ID'        , value : '' }
					   , { name: 'BIZ_CHAIN_KEY1' , value : ( fc_isNull( strBizChanKey1 ) ) ? '*' : strBizChanKey1 }
					   , { name: 'BIZ_CHAIN_KEY2' , value : ( fc_isNull( strBizChanKey2 ) ) ? '*' : strBizChanKey2 }
					   , { name: 'BIZ_CHAIN_KEY3' , value : ( fc_isNull( strBizChanKey3 ) ) ? '*' : strBizChanKey3 }
					   , { name: 'BIZ_CHAIN_KEY4' , value : ( fc_isNull( strBizChanKey4 ) ) ? '*' : strBizChanKey4 }
					   , { name: 'BIZ_CHAIN_KEY5' , value : ( fc_isNull( strBizChanKey5 ) ) ? '*' : strBizChanKey5 }
					   ], 600, 500, true
					) ;
}; // end of fc_openFileManageMent
/**
 * fc_linkageTab
 * @param pageId
 * @param arrParams
 * @returns {Boolean}
 */
function fc_linkageTab( pageId, arrParams ) {
	if ( fc_isNull( pageId ) ) return false;
	if ( fc_isNull( arrParams ) ) arrParams = new Array();

	var treeInst = parent.jsMenutree.getInstance();
	var arrObj   = [];
	$.each( treeInst._model.data, function( index, item ) {
		arrObj = fc_getMenuAttrObj( item.a_attr, 'PGM_ID', pageId );
		if ( arrObj.length != 0 ) return false;
	});

	if ( arrObj.length == 0 ) {
		return;
	};

	var targetMenu = arrObj[ 0 ];
	var paramString = '';
	try {
		for ( var i=0;i<arrParams.length;i++ )
			paramString += arrParams[ i ].name + '=' + arrParams[ i ].value + '&';

		if ( arrParams.length > 0 )
			paramString = '?' + paramString.substring( 0, paramString.length - 1 );

		parent.mainTab.openTabByObj( targetMenu, paramString );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_linkageTab
/**
 * fc_getMenuAttrObj
 * @param obj
 * @param key
 * @param val
 * @returns {Array}
 */
function fc_getMenuAttrObj( obj, key, val ) {
	var retv = [];

	if ( jQuery.isPlainObject( obj ) ) {
		if ( obj[ key ] === val ) // may want to add obj.hasOwnProperty(key) here.
			retv.push( obj );

		var objects = jQuery.grep( obj, function( elem ) {
			return ( jQuery.isArray( elem ) || jQuery.isPlainObject( elem ) );
		});

		retv.concat(jQuery.map( objects, function ( elem ) {
			return getObjects( elem, key, val );
		}));
	};
	return retv;
}; // end of fc_getMenuAttrObj
/**
 * fc_linkageGridTab
 * @param gridId
 * @param colNm
 * @param pageId
 * @param arrParams
 * @param arrCustomParams
 * @param f_callback
 * @returns {Boolean}
 */
function fc_linkageGridTab( gridId, colNm, pageId, arrParams, arrCustomParams, f_callback ) {
	if ( fc_isNull( pageId ) ) return false;
	if ( fc_isNull( arrParams ) ) arrParams = new Array();
	if ( fc_isNull( arrCustomParams ) ) arrCustomParams = new Array();
	var cEventCode;

	try {
		// added link color
		if ( !fc_isNull( colNm ) ) {
			fc_setGridCellLinkStyle( gridId, [ colNm ] );
		};

		$( '#' + gridId ).on( ( cEventCode = fc_isNull( colNm ) ? 'rowdoubleclick' : 'celldoubleclick' ), function( event ) {
			if (   cEventCode == 'rowdoubleclick'
				|| fc_getColProps( gridId, colNm ).text == $( '#'+gridId ).jqxGrid( 'getcolumn', event.args.datafield ).text ) {

				if ( !fc_isNull( f_callback ) && typeof f_callback === 'function' ) {
					var rtnVal = f_callback( gridId );
					if ( fc_isNull(rtnVal) ) {
						rtnVal = true;
					};

					if ( !rtnVal ) return;
				};

				var treeInst = parent.jstree.getInstance();
				var arrObj = [];
				$.each( treeInst._model.data, function ( index, item ) {
					arrObj = fc_getMenuAttrObj( item.a_attr, 'PGM_ID', pageId );
					if ( arrObj.length != 0 ) return false;
				});

				if ( arrObj.length == 0 ) {
					return;
				};

				var targetMenu = arrObj[ 0 ];
				var paramGroup = new Array();
				var paramString = fc_makeParameterForGrid( gridId, event.args.rowindex, arrParams, arrCustomParams );

				targetMenu[ 'parms' ] = paramString;
				parent.mainTab.openTabByObj( targetMenu );
			};
		});
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_linkageGridTab
/**
 * fc_linkagePopup
 * @param pageId
 * @param arrParams
 * @param nWidth
 * @param nHeight
 * @param isModal
 * @returns {Boolean}
 */
function fc_linkagePopup( pageId, arrParams, nWidth, nHeight, isModal ) {
	if ( fc_isNull( pageId ) ) return false;
	if ( fc_isNull( arrParams ) ) arrParams = new Array();

	try {
		if ( !fc_isNull( window.popWin ) ) {
			window.popWin.destroyPop();
		};
		window.popWin = new f_makePopupAttr( nWidth, nHeight, isModal );
		var paramString = '';

		for ( var i = 0; i < arrParams.length; i++ )
			paramString += arrParams[ i ].name + '=' + arrParams[ i ].value + '&';

		if ( arrParams.length > 0 )
			paramString = '?' + paramString.substring( 0, paramString.length - 1 );

		var moduleId = pageId.substring( 0,3 );
		fc_setSessionItem( 'GW_PGM_ID', pageId );
		fc_setSessionItem( 'GW_TITLE' , '' );
		// Spring Boot 프로젝트에 맞게 URL 수정
		var targetPage = '/view/' + pageId + paramString;
		window.popWin.openPop( pageId, targetPage );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_linkagePopup
/**
 * fc_linkageGridPopup
 * @param gridId
 * @param colNm
 * @param pageId
 * @param arrParams
 * @param nWidth
 * @param nHeight
 * @param isModal
 * @param arrCustomParams
 * @param f_callback
 * @returns {Boolean}
 */
function fc_linkageGridPopup( gridId, colNm, pageId, arrParams, nWidth, nHeight, isModal, arrCustomParams, f_callback ) {
	if ( fc_isNull( pageId    ) ) return false;
	if ( fc_isNull( arrParams ) ) arrParams = new Array();
	if ( fc_isNull( arrCustomParams ) ) arrCustomParams = new Array();
	var cEventCode;

	try {
		// added link color
		if ( !fc_isNull( colNm ) ) {
			fc_setGridCellLinkStyle( gridId, [ colNm ] );
		};
		window.popWin = new f_makePopupAttr( nWidth, nHeight, isModal );

		$( '#'+gridId ).on( ( cEventCode = fc_isNull( colNm ) ? 'rowdoubleclick' : 'celldoubleclick' ), function ( event ) {
			if (   cEventCode == 'rowdoubleclick'
				|| fc_getColProps( gridId, colNm ).text == $( '#'+gridId ).jqxGrid( 'getcolumn', event.args.datafield ).text ) {

				if ( !fc_isNull( f_callback ) && typeof f_callback === 'function' ) {
					var rtnVal = f_callback( gridId );
					if ( fc_isNull( rtnVal ) ) {
						rtnVal = true;
					};

					if ( !rtnVal ) return;
				};

				var paramString = fc_makeParameterForGrid( gridId, event.args.rowindex, arrParams, arrCustomParams );
				var moduleId   = pageId.substring( 0,3 );
				var targetPage = '../' + moduleId + '/' + pageId + '.do' + paramString;

				fc_setSessionItem( 'GW_PGM_ID', pageId );
				fc_setSessionItem( 'GW_TITLE' , '' );
				window.popWin.openPop( pageId, targetPage );
			};
		});
	} catch ( e ) {
		fc_getException( e );
	};
};// end of fc_linkageGridPopup
/**
 * f_makePopupAttr
 * @param nWidth
 * @param nHeight
 * @param isModal
 */
function f_makePopupAttr( nWidth, nHeight, isModal ) {
	try {
		// title, contents
		var targetObj   = $( 'body' );
		var popupWindow = $( '<div id="divPopup"></div>' );
		var popupWindowHeader  = $( '<div id="popupWindowHeader"><span id="input" style="float: left"></span></div>' );
		var popupWindowContent = $( '<div id="popupWindowContent" style="overflow: hidden"></div>' );
		popupWindow.append( popupWindowHeader );
		popupWindow.append( popupWindowContent );
		targetObj.append(popupWindow);

		var popWin = $( '#divPopup' ).jqxWindow( {
			isModal: isModal,
			modalOpacity: 0.3,
			width     : nWidth,
			height    : nHeight,
			maxWidth  : 1360,
			maxHeight : 760,
			minWidth  : 100,
			minHeight : 150,
			theme     : window.gwMesEnv.themes,
			autoOpen  : false,
			showCloseButton    : true,
			showCollapseButton : false,
			animationType : 'fade',
			resizable     : false
		});

		this.openPop = function( pageId, targetPage ) {
			popWin.jqxWindow( 'setContent', '<iframe frameBorder="no" scrolling="auto" src="'+targetPage+'" class="tab_iframe" width="100%" height="100%"></iframe>' );
			popWin.jqxWindow( 'open' );
			popWin.find( '.jqx-window-content' ).css( 'overflow', 'hidden' );
		};
		this.closePop = function () {
			popWin.jqxWindow( 'close' );
		};
		this.destroyPop = function () {
			popWin.jqxWindow( 'destroy' );
		};
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of f_makePopupAttr
/**
 * fc_makeParameterForGrid
 * @param _gridId
 * @param _rowIndex
 * @param _arrParamGrid
 * @param _arrParamCustom
 * @returns {String}
 */
function fc_makeParameterForGrid( _gridId, _rowIndex, _arrParamGrid, _arrParamCustom ) {
	var paramGroup = new Array();
	var paramString = '';

	try {
		for ( var i=0;i<_arrParamGrid.length;i++ )
			paramGroup.push( { name: _arrParamGrid[ i ], value: fc_getCellData( _gridId, _rowIndex, _arrParamGrid[ i ] ) } );

		paramGroup = paramGroup.concat( _arrParamCustom );

		for ( var i=0;i<paramGroup.length;i++ )
			paramString += paramGroup[ i ].name + '=' + paramGroup[ i ].value + '&';

		if ( paramGroup.length > 0 )
			paramString = '?' + paramString.substring( 0, paramString.length-1 );
	} catch ( e ) {
		fc_getException( e );
	};
	return paramString;
}; // end of fc_makeParameterForGrid
 /**
  * fc_cutFmtStr
  * @param _val
  * @param _idx
  * @param _len
  * @param tcParseTy
  * @returns {String}
  */
function fc_cutFmtStr( _val, _idx, _len, tcParseTy ) {
	if ( fc_isNull( _val ) ) return '';
	if ( _idx < 0  ) return '';
	if ( _len <= 0 ) return '';

	var cntBrokenPiece = 0, lenAdd = 0;
	var rtnValue = '';
	var vDelim   = '^';
	var inStr   = fc_getFmtStr( _val, _idx+_len, ' '   , true, tcParseTy ); //Cutting Tail String.
	var headStr = fc_getFmtStr( _val, _idx     , vDelim, true, tcParseTy ); //Select Header String.

	while( headStr.lastIndexOf( vDelim ) != -1 && headStr.lastIndexOf( vDelim ) == headStr.length-1 ) {
		cntBrokenPiece++;
		headStr = headStr.substring( 0, headStr.length-1 );
	};
	rtnValue = inStr.replace( headStr, '' ); //cut header

	if ( cntBrokenPiece > 0 ) {
		var chCode = rtnValue.charAt(0).charCodeAt( 0 );
		rtnValue = rtnValue.substring(1, rtnValue.length);

		if      ( chCode <= 0x0007FF ) lenAdd = ( tcParseTy == 'C' ) ? 1 : 2;
		else if ( chCode <= 0x00FFFF ) lenAdd = ( tcParseTy == 'C' ) ? 1 : 3;
		else lenAdd = (tcParseTy == 'C' ) ? 1 : 4;

		for ( var i = 0; i < lenAdd - cntBrokenPiece; i++ )
			rtnValue = ' ' + rtnValue; //add blank
	};
	return rtnValue;
}; // end of fc_cutFmtStr
/**
 * fc_calcWgt
 * @param thick: thickness
 * @param width: width
 * @param length: length
 * @param gravity : spec gravity
 * @param matType
 * @returns {Number}
 */
function fc_calcWgt( thick, width, length, gravity, matType ) {
	var calWgt = 0;
	gravity = fc_setValue( gravity, 7.85 );
	if ( !fc_isNull( thick ) && !fc_isNull( width ) && !fc_isNull( length ) && !fc_isNull( gravity ) ) {
		calWgt = ( thick * width * length * gravity ) / Math.pow( 10, 9 );
	};
	return fc_calcMatSize( calWgt, window.gwMesConst.uomType.wgt, matType );
}; // end of fc_calcWgt
function fc_getMatDecimal ( value ) {
	return ( value < 0 ) ? 0 : value;
}; // end of fc_calcWgt
/**
 * fc_calcMatSize
 * @param value
 * @param uomType
 * @param matType
 * @returns {Number}
 */
function fc_calcMatSize( value, uomType, matType ) {
	var calValue = 0;
	var defcalValue;
	matType = fc_setValue( matType, window.gwMesConst.matType.slab ).toUpperCase();
	uomType = fc_setValue( uomTy  , window.gwMesConst.uomType.thk  ).toUpperCase();

	switch ( uomType ) {
		case window.gwMesConst.uomType.thk:
			switch ( matType ) {
				case window.gwMesConst.matType.slab   : defcalValue = window.gwMesEnv.format.slab.thk;		break;
				case window.gwMesConst.matType.plate  : defcalValue = window.gwMesEnv.format.plate.thk;		break;
				case window.gwMesConst.matType.coil   : defcalValue = window.gwMesEnv.format.coil.thk;		break;
				case window.gwMesConst.matType.bloom  : defcalValue = window.gwMesEnv.format.bloom.thk;		break;
				case window.gwMesConst.matType.billet : defcalValue = window.gwMesEnv.format.billet.thk;	break;
				default:	defcalValue = 0;	break;
			};
			break;
		case window.gwMesConst.uomType.wth:
			switch ( matType ) {
				case window.gwMesConst.matType.slab   : defcalValue = window.gwMesEnv.format.slab.wth;		break;
				case window.gwMesConst.matType.plate  : defcalValue = window.gwMesEnv.format.plate.wth;		break;
				case window.gwMesConst.matType.coil   : defcalValue = window.gwMesEnv.format.coil.wth;		break;
				case window.gwMesConst.matType.bloom  : defcalValue = window.gwMesEnv.format.bloom.wth;		break;
				case window.gwMesConst.matType.billet : defcalValue = window.gwMesEnv.format.billet.wth;	break;
				default: defcalValue = 0;	break;
			};
			break;
		case window.gwMesConst.uomType.lth:
			switch ( matType ) {
				case window.gwMesConst.matType.slab   : defcalValue = window.gwMesEnv.format.slab.lth;		break;
				case window.gwMesConst.matType.plate  : defcalValue = window.gwMesEnv.format.plate.lth;		break;
				case window.gwMesConst.matType.coil   : defcalValue = window.gwMesEnv.format.coil.lth;		break;
				case window.gwMesConst.matType.bloom  : defcalValue = window.gwMesEnv.format.bloom.lth;		break;
				case window.gwMesConst.matType.billet : defcalValue = window.gwMesEnv.format.billet.lth;	break;
				default:
					defcalValue = 0;
					break;
			};
			break;
		case window.gwMesConst.uomType.wgt:
			switch ( matType ) {
				case window.gwMesConst.matType.slab   :	defcalValue = window.gwMesEnv.format.slab.wgt;		break;
				case window.gwMesConst.matType.plate  :	defcalValue = window.gwMesEnv.format.plate.wgt;		break;
				case window.gwMesConst.matType.coil   :	defcalValue = window.gwMesEnv.format.coil.wgt;		break;
				case window.gwMesConst.matType.bloom  :	defcalValue = window.gwMesEnv.format.bloom.wgt;		break;
				case window.gwMesConst.matType.billet :	defcalValue = window.gwMesEnv.format.billet.wgt;	break;
				default: defcalValue = 0; 	break;
			};
			break;
		default :
			defcalValue = 0;
	};

	if ( !fc_isNull( value ) ) {
		//calValue = Math.round( value / defcalValue ) * defcalValue;
		calValue = Math.round( value / Math.pow( 10, defcalValue ) ) / Math.pow( 10, defcalValue );
	};
	return calValue;
}; // end of fc_calcMatSize
/**
 * fc_calcMatThk
 * @param value
 * @param matType
 * @returns {Number}
 */
function fc_calcMatThk( value, matType ) {
	return fc_calcMatSize( value, window.gwMesConst.uomType.thk, matType );
}; // end of fc_calcMatThk
/**
 * fc_calcMatWth
 * @param value
 * @param matType
 * @returns {Number}
 */
function fc_calcMatWth( value, matType ) {
	return fc_calcMatSize( value, window.gwMesConst.uomType.wth, matType );
}; // end of fc_calcMatWth
/**
 * fc_calcMatLth
 * @param value
 * @param matType
 * @returns {Number}
 */
function fc_calcMatLth( value, matType ) {
	return fc_calcMatSize( value, window.gwMesConst.uomType.lth, matType );
}; // end of fc_calcMatLth
/**
 * fc_getShiftStartTime
 * @param sShift
 * @returns
 */
function fc_getShiftStartTime( sShift ) {
	switch ( sShift ) {
	case '1':	return window.gwMesEnv.shift.A;
	case '2':	return widnow.gwMesEnv.shift.B;
	case '3':	return window.gwMesEnv.shift.C;
	case '4':	return window.gwMesEnv.shift.D;
	case '5':	return window.gwMesEnv.shift.E;
	default:	return null;
	};
}; // end of fc_getShiftStartTime
/**
 * fc_getMonthLastDay
 * @param curDate
 * @returns
 */
function fc_getMonthLastDay( curDate ) {
	var lastDay = ( new Date( curDate.getFullYear(), curDate.getMonth() + 1, 0) ).getDate();
	return lastDay;
}; // end of fc_getMonthLastDay
/**
 * fc_setOpInfo
 */
function fc_setOpInfo() {
	if ( fc_isNull( window.gwJsonResult.RK_OPDATE ) ) return;

	var arrStr = window.gwJsonResult.RK_OPDATE[ 0 ].OP_DATE.split( '-' );
	window.gwMesEnv.operInfo.date     = new Date( arrStr[ 0 ], arrStr[ 1 ] - 1, arrStr[ 2 ] );
	window.gwMesEnv.operInfo.dateTime = new Date( window.gwJsonResult.RK_OPDATE[ 0 ].CURR_DATE_TIME );
	window.gwMesEnv.operInfo.shift    = window.gwJsonResult.RK_OPDATE[ 0 ].OP_SHIFT;
}; // end of fc_setOpInfo
/**
 * fc_getOpInfo
 */
function fc_getOpInfo() {
	if ( fc_submit( '', 'ict.sys.init-service', 'searchOpDate', '', '', 'SCO' ) )
		fc_setOpInfo();
}; //end of fc_getOpInfo
/**
 * fc_getNow
 * @returns
 */
function fc_getNow() {
//	if ( !fc_isNull( window.gwMesEnv.operInfo.date ) ) return;
	fc_getOpInfo();
	return window.gwMesEnv.operInfo.date;
}; // end of fc_getNow
/**
 * fc_getCurrentDate
 * @returns
 */
function fc_getCurrentDate() {
	if ( window.initProc.initFlag == false ) {
		if ( window.initProc.opDate == false ) {
			fc_getOpInfo();
			window.initProc.opDate = true;
		};
	} else {
		fc_getOpInfo();
	};

	return window.gwMesEnv.operInfo.date;
}; // end of fc_getCurrentDate
/**
 * fc_getCurrentDate
 * @returns
 */
function fc_getCurrentDateTime() {
	fc_getOpInfo();
	return window.gwMesEnv.operInfo.dateTime;
}; // end of fc_getCurrentDateTime
/**
 * fc_getMaxDate
 * @returns {Date}
 */
function fc_getMaxDate() {
	return new Date( 2999, 11, 31 );
}; // end of fc_getMaxDate
/**
 * fc_getInitDate
 * @returns {Date}
 */
function fc_getInitDate() {
	return new Date( 1900, 1, 1 );
}; // end of fc_getInitDate
/**
 * fc_getUrlParameter
 * @param sParam
 * @returns
 */
function fc_getUrlParameter( sParam ) {
	var sPageURL = window.location.search.substring( 1 );
	var sURLVariables = sPageURL.split( '&' );
	for ( var i=0;i<sURLVariables.length;i++ ) {
		var sParameterName = sURLVariables[ i ].split( '=' );
		if ( sParameterName[ 0 ] == sParam ) {
			return decodeURIComponent( sParameterName[ 1 ] );
		};
	};
}; // end of fc_getUrlParameter
/**
 * fc_getFmtStr
 * @param _val: source string data
 * @param _len: coloumn length (target length)
 * @param _chr: padding charater
 * @param _isRpad: true(RPad), false(LPad) --> Default: true
 * @param tcParseTy
 * @returns
 * @example fc_getFmtStr( oldTC, attrLth, ' ', true );
 */
function fc_getFmtStr( _val, _len, _chr, _isRpad, tcParseTy ) {
	if ( _len <= 0 ) return '';
	if ( fc_isNull( _isRpad ) ) _isRpad = true;

	var chCode, rtnValue = null, strBlank = '';
	var inStr = new String( ( fc_isNull( _val ) ? '' : _val ) );
	var lenUnicode = 0, lenAdd = 0, idxLast = 0;
	var lenInStr = fc_isNull(inStr) ? 0 : inStr.length;

	for ( var i = 0; i < lenInStr; i++ ) {
		chCode = inStr.charAt( i ).charCodeAt( 0 );

		if      ( chCode <= 0x00007F ) lenUnicode += ( lenAdd = ( tcParseTy == 'C' ) ? 1 : 1 );
		else if ( chCode <= 0x0007FF ) lenUnicode += ( lenAdd = ( tcParseTy == 'C' ) ? 1 : 2 );
		else if ( chCode <= 0x00FFFF ) lenUnicode += ( lenAdd = ( tcParseTy == 'C' ) ? 1 : 3 );
		else lenUnicode += ( ( tcParseTy == 'C' ) ? 1 : lenAdd = 4 );

		if ( lenUnicode < _len ) {
			idxLast = i + 1;
			continue;
		} else {
			if ( lenUnicode == _len ) {
				idxLast = i + 1;
			} else if ( lenUnicode > _len ) {
				idxLast = i;
				lenUnicode -= lenAdd;
			};
			break;
		};
	};
	rtnValue = inStr.substring( 0, idxLast );

	if ( lenUnicode < _len ) {
		for ( var i = 0; i < _len - lenUnicode; i++ ) {
			strBlank += _chr;
		};
		rtnValue = _isRpad ? rtnValue + strBlank : strBlank + rtnValue;
	};

	return rtnValue;
}; // end of fc_getFmtStr
/**
 * fc_checkRequired
 * @param objId
 */
function fc_checkRequired( objId ) {
	var eleCaption;
	try {
		eleCaption = $( 'label[for="' + $( '#' + objId ).attr( 'id' ) + '"]' ).text();
	} catch (e) {
		eleCaption = $( '#' + objId ).attr( 'id' );
	};
	var result = fc_checkMandatoryEntry( $( '#' + objId ).val(), eleCaption );
	if ( result[ 0 ] == false ) {
		 throw new Error( result[ 1 ] );
	};
}; // end of fc_checkRequired
/**
 * fc_popupClose
 */
function fc_popupClose() {
	$( '#mnuCloseBtn' ).trigger( 'click' );
}; // end of fc_popupClose
/**
 * fc_lastProc
 */
function fc_lastProc() {
	//if ( isRunLastProc ) return;
	isRunLastProc = true;

	if ( arrObjLth.length    > 0 ) fc_setMaxLength( arrObjLth );
	if ( arrAlign.length     > 0 ) fc_setAlignInEveryCol( arrAlign );
	if ( arrEdit.length      > 0 ) fc_setEditInEveryCol( arrEdit );
	if ( arrHidden.length    > 0 ) fc_setHiddenInEveryCol( arrHidden );
	if ( arrUpper.length     > 0 ) fc_setUpperInEveryCol( arrUpper );
	if ( arrLower.length     > 0 ) fc_setLowerOptionInEveryCol( arrLower );
	if ( arrKeys.length      > 0 ) fc_setKeysInEveryCol( arrKeys );
	if ( arrRequired.length  > 0 ) fc_setRequiredInEveryCol( arrRequired );
	if ( arrSort.length      > 0 ) fc_setSortInEveryCol( arrSort );

	if ( arrGetLov.length    > 0 ) fc_getLovData( arrGetLov );
	if ( arrSetLov.length    > 0 ) fc_setLovData( arrSetLov );
	if ( arrMaxLength.length > 0 ) fc_setMaxLengthInEveryCol( arrMaxLength );

	if ( arrCodeList.length  > 0 ) fc_setCodeList( arrCodeList );
	if ( arrMsg.length  	 > 0 ) fc_setMessage( arrMsg );
	if ( arrItem.length 	 > 0 ) fc_setMultiItem( arrItem );

	fc_resizeForm();
}; // end of fc_lastProc
/**
 * fc_addCodeList
 * @param obj
 * @param multiObj
 */
function fc_addCodeList( obj, multiObj ) {
	arrCodeList.push( obj );
	if ( !fc_isNull( multiObj ) ) fc_addMultiItem( multiObj );
	fc_addMultiItem( { itemCd: 'CAP_CODE'   , itemValue: '0' } );
	fc_addMultiItem( { itemCd: 'CAP_NM'     , itemValue: '0' } );
	fc_addMultiItem( { itemCd: 'CAP_REMARKS', itemValue: '0' } );
}; // end of fc_addCodeList
/**
 * fc_addDataInGettedLov
 * @param codeKey
 * @param obj
 */
function fc_addDataInGettedLov( codeKey, obj ) {
	var iPos = -1;
	for ( var loop = 0; loop<arrCode.length; loop++ ) {
		if ( arrCode[ loop ] == codeKey ) {
			iPos = loop;
			break;
		};
	};
	if ( iPos == -1 ) {
		arrGetLov.push( obj );
		arrCode.push( codeKey );
	};
}; // end of fc_addDataInGettedLov
/**
 * fc_addDataInSettingLov
 * @param obj
 */
function fc_addDataInSettingLov( obj ) {
	arrSetLov.push( obj );
}; // end of fc_addDataInSettingLov
/**
 * fc_addSetCode
 * @param obj
 */
function fc_addSetCode( obj ) {
	arrCodeList.push( obj );
}; // end of fc_addSetCode
/**
 * fc_addMaxLength
 * @param objId
 * @param iMaxLth
 */
function fc_addMaxLength( objId, iMaxLth ) {
	arrObjLth.push( { id: objId, lth: iMaxLth } );
}; // end of fc_addMaxLength
/**
 * fc_setMaxLength
 * @param arrObj
 */
function fc_setMaxLength( arrObj ) {
	for ( var loop = 0; loop<arrObj.length; loop++ ) {
		$( '#' + arrObj[ loop ].id ).attr( 'maxlength', arrObj[ loop ].lth );
	};
}; // end of fc_setMaxLength
/**
 * fc_addMsg
 * @param msgId
 */
function fc_addMsg( msgId ) {
	arrMsg.push( msgId );
}; // end of fc_addMsg
/**
 * fc_addMultiItem
 * @param obj
 */
function fc_addMultiItem ( obj ) {
	arrItem.push( obj );
}; // end of fc_addMultiItem
/**
 * fc_clearDataInEveryGrid
 * @param arrGrid
 */
function fc_clearDataInEveryGrid( arrGrid ) {
	for ( var iloop = 0; iloop<arrGrid.length; iloop++ ) {
		fc_clearGridData( arrGrid[ iloop ] );
	};
}; // end of fc_clearDataInEveryGrid
/**
 * fc_setAlignInCol
 * @param gridId
 * @param arrcolNms
 * @param sAlign
 */
function fc_setAlignInCol( gridId, arrcolNms, sAlign ) {
	 arrAlign.push( { id: gridId, cols: arrcolNms, align: sAlign } );
}; // end of fc_setAlignInCol
/**
 * fc_setAlignInEveryCol
 * @param arrObj
 */
function fc_setAlignInEveryCol( arrObj ) {
	for ( var iloop = 0; iloop<arrObj.length; iloop++ ) {
		fc_setColAlign( arrObj[ iloop ].id, arrObj[ iloop ].cols, arrObj[ iloop ].align );
	};
}; // end of fc_setAlignInEveryCol
/**
 * fc_setEditInCol
 * @param gridId
 * @param arrcolNms
 * @param sEdit
 */
function fc_setEditInCol( gridId, arrcolNms, sEdit ) {
	arrEdit.push( { id: gridId, cols: arrcolNms, edit: sEdit } );
}; // end of fc_setEditInCol
/**
 * fc_setEditInEveryCol
 * @param arrObj
 */
function fc_setEditInEveryCol( arrObj ) {
	for ( var iloop = 0; iloop<arrObj.length; iloop++ ) {
		fc_setColEditable( arrObj[ iloop ].id, arrObj[ iloop ].cols, arrObj[ iloop ].edit );
	};
}; // end of fc_setEditInEveryCol
/**
 * fc_setHiddenInCol
 * @param gridId
 * @param arrcolNms
 */
function fc_setHiddenInCol( gridId, arrcolNms ) {
	arrHidden.push( { id: gridId, cols: arrcolNms } );
}; // end of fc_setHiddenInCol
/**
 * fc_setHiddenInEveryCol
 * @param arrObj
 */
function fc_setHiddenInEveryCol( arrObj ) {
	for ( var iloop = 0; iloop<arrObj.length; iloop++ ) {
		fc_setColHidden( arrObj[ iloop ].id, arrObj[ iloop ].cols );
	};
}; // end of fc_setHiddenInEveryCol
/**
 * fc_setUpperInCol
 * @param gridId
 * @param arrcolNms
 */
function fc_setUpperInCol( gridId, arrcolNms ) {
	arrUpper.push( { id: gridId, cols: arrcolNms } );
}; // end of fc_setUpperInCol
/**
 * fc_setUpperInEveryCol
 * @param arrObj
 */
function fc_setUpperInEveryCol( arrObj ) {
	for ( var iloop = 0; iloop<arrObj.length; iloop++ ) {
		fc_setColUpperCase( arrObj[ iloop ].id, arrObj[ iloop ].cols );
	};
}; // end of fc_setUpperInEveryCol
/**
 * fc_setLowerInCol
 * @param gridId
 * @param arrcolNms
 */
function fc_setLowerInCol( gridId, arrcolNms ) {
	arrLower.push( { id: gridId, cols: arrcolNms } );
}; // end of fc_setLowerInCol
/**
 * fc_setLowerOptionInEveryCol
 * @param arrObj
 */
function fc_setLowerOptionInEveryCol( arrObj ) {
	for ( var iloop = 0; iloop<arrObj.length; iloop++ ) {
		fc_setColLowerCase( arrObj[ iloop ].id, arrObj[ iloop ].cols );
	};
}; // end of fc_setLowerOptionInEveryCol
/**
 * fc_setKeysInCol
 * @param gridId
 * @param arrcolNms
 */
function fc_setKeysInCol ( gridId, arrcolNms ) {
	arrKeys.push( { id: gridId, cols: arrcolNms } );
}; // end of fc_setKeysInCol
/**
 * fc_setKeysInEveryCol
 * @param arrObj
 */
function fc_setKeysInEveryCol( arrObj ) {
	for ( var iloop = 0; iloop<arrObj.length; iloop++ ) {
		fc_setGridPKeys( arrObj[ iloop ].id, arrObj[ iloop ].cols );
	};
}; // end of fc_setKeysInEveryCol
/**
 * fc_setRequiredInCol
 * @param gridId
 * @param arrcolNms
 */
function fc_setRequiredInCol( gridId, arrcolNms ) {
	arrRequired.push( { id: gridId, cols: arrcolNms } );
}; // end of fc_setRequiredInCol
/**
 * fc_setRequiredInEveryCol
 * @param arrObj
 */
function fc_setRequiredInEveryCol( arrObj ) {
	for ( var iloop = 0; iloop<arrObj.length; iloop++ ) {
		fc_setColRequired( arrObj[ iloop ].id, arrObj[ iloop ].cols );
	};
}; // end of fc_setRequiredInEveryCol
/**
 * fc_setSortInCol
 * @param gridId
 * @param arrcolNms
 * @param sortFlag
 */
function fc_setSortInCol( gridId, arrcolNms, sortFlag ) {
	arrSort.push( { id: gridId, cols: arrcolNms, sort: sortFlag } );
}; // end of fc_setSortInCol
/**
 * fc_setSortInEveryCol
 * @param arrObj
 */
function fc_setSortInEveryCol( arrObj ) {
	for ( var iloop = 0; iloop<arrObj.length; iloop++ ) {
		fc_setColSortable( arrObj[ iloop ].id, arrObj[ iloop ].cols, arrObj[ iloop ].sort );
	};
}; // end of fc_setSortInEveryCol
/**
 * fc_setMaxLengthInCol
 * @param gridId
 * @param arrcolNms
 * @param nLength
 */
function fc_setMaxLengthInCol( gridId, arrcolNms, nLength ) {
	arrMaxLength.push( { id: gridId, cols: arrcolNms, maxlength: nLength } );
}; // end of fc_setMaxLengthInCol
/**
 * fc_setMaxLengthInEveryCol
 * @param arrObj
 */
function fc_setMaxLengthInEveryCol( arrObj ) {
	for ( var iloop = 0; iloop<arrObj.length; iloop++ ) {
		for ( var colIdx =0; colIdx<arrObj[ iloop ].cols.length; colIdx++ ) {
			fc_setDynamicColMaxLength( arrObj[ iloop ].id, arrObj[ iloop ].cols[colIdx], arrObj[ iloop ].maxlength );
		};
	};
}; // end of fc_setMaxLengthInEveryCol
/**
 * fc_showMsgInResultValue
 * @param prmKeyResult
 * @param key
 */
function fc_showMsgInResultValue( prmKeyResult, key ) {
	var sMsg = fc_getDataOfKeyInResult( prmKeyResult, key );
	if ( !fc_isNull( sMsg ) ) {
		fc_showMessageBox( sMsg, 'I', sMsg );
	};
}; // end of fc_showMsgInResultValue
/**
 * fc_changeDataToLov
 * @param prmKeyResult
 * @param lovObjId
 */
function fc_changeDataToLov( prmKeyResult, lovObjId ) {
	for ( var loop = 0; loop < arrSetLov.length; loop++ ) {
		if ( arrSetLov[ loop ].object == lovObjId ) {
			window.gwCodeResult[ arrSetLov[ loop ].code ] = [];
			for ( var k = 0; k < window.gwJsonResult[ prmKeyResult ].length; k++ ) {
				window.gwCodeResult[ arrSetLov[ loop ].code ][ k ] =  window.gwJsonResult[ prmKeyResult ][ k ];
			};
			fc_setLovData( [ arrSetLov[ loop ] ] );
			break;
		};
	};
}; // end of fc_changeDataToLov
/**
 * fc_getDataOfKeyInResult
 * @param prmKeyResult
 * @param key
 * @returns
 */
function fc_getDataOfKeyInResult( prmKeyResult, key ) {
	try {
		var tempObj = new Object();
		tempObj = window.gwJsonResult[ prmKeyResult ];
	} catch ( e ) {
		return null;
	};
	if ( tempObj.length == 0 ) {
		return null;
	} else {
		return tempObj[ 0 ][ key ];
	};
}; // end of fc_getDataOfKeyInResult
/**
 * fc_removePageableInGrid
 * @param arrGrid
 */
function fc_removePageableInGrid( arrGrid ) {
	for ( var loop = 0; loop<arrGrid.length; loop++ ) {
		$( '#' + arrGrid[ loop ] ).jqxGrid( { pageable: false } );
	};
}; // end of fc_removePageableInGrid
/**
 * fc_removePageableAndOthersInGrid
 * @param arrGrid
 */
function fc_removePageableAndOthersInGrid( arrGrid ) {
	for ( var loop = 0; loop<arrGrid.length; loop++) {
		$( '#' + arrGrid[ loop ] ).jqxGrid( { pageable: false } );

		fc_showRowNumbers( arrGrid[ loop ], false );
		fc_setColHidden( arrGrid[ loop ], [ 'JQX_RN'] );

		for ( var i=0; i<arrGrid.length; i++ ) {
			fc_setGridSortable( arrGrid[ i ], false );
		};
	};
}; // end of fc_removePageableAndOthersInGrid
/**
 * fc_setDisableForCommonBtn
 * @param flag
 * @param bConf
 * @param bCust1
 * @param bCust2
 * @param bCust3
 * @param bCust4
 * @param bCust5
 */
function fc_setDisableForCommonBtn( flag, bConf, bCust1, bCust2, bCust3, bCust4, bCust5 ) {
	$( '#' + window.gwBtn.saveBtn   ).jqxButton( { disabled: !flag });
	$( '#' + window.gwBtn.deleteBtn ).jqxButton( { disabled: !flag });

	if ( !fc_isNull( bConf  ) ) $( '#' + window.gwBtn.confirmBtn ).jqxButton( { disabled: !bConf  } );
	if ( !fc_isNull( bCust1 ) ) $( '#' + window.gwBtn.cust1Btn   ).jqxButton( { disabled: !bCust1 } );
	if ( !fc_isNull( bCust2 ) ) $( '#' + window.gwBtn.cust2Btn   ).jqxButton( { disabled: !bCust2 } );
	if ( !fc_isNull( bCust3 ) ) $( '#' + window.gwBtn.cust3Btn   ).jqxButton( { disabled: !bCust3 } );
	if ( !fc_isNull( bCust4 ) ) $( '#' + window.gwBtn.cust4Btn   ).jqxButton( { disabled: !bCust4 } );
	if ( !fc_isNull( bCust5 ) ) $( '#' + window.gwBtn.cust5Btn   ).jqxButton( { disabled: !bCust5 } );
}; // end of fc_setDisableForCommonBtn
function fc_showCommonBtns( arrBtnNm, flag ) {
	var sAuth = false;
	for ( var loop=0;loop<arrBtnNm.length;loop++ ) {
		sAuth = fc_getAuthority( arrBtnNm[ loop ] );
		switch ( arrBtnNm[ loop ] ) {
		case 'SEARCH' :
			if ( sAuth && flag )
				 $( '#' + window.gwBtn.searchBtn ).show();
			else $( '#' + window.gwBtn.searchBtn ).hide();
			break;
		case 'SAVE' :
			if ( sAuth && flag )
				 $( '#' + window.gwBtn.saveBtn ).show();
			else $( '#' + window.gwBtn.saveBtn ).hide();
			break;
		case 'DELETE' :
			if ( sAuth && flag )
				 $( '#' + window.gwBtn.deleteBtn ).show();
			else $( '#' + window.gwBtn.deleteBtn ).hide();
			break;
		case 'CONFIRM' :
			if ( sAuth && flag )
				 $( '#' + window.gwBtn.confirmBtn ).show();
			else $( '#' + window.gwBtn.confirmBtn ).hide();
			break;
		case 'CUST1' :
			if ( sAuth && flag )
				 $( '#' + window.gwBtn.cust1Btn ).show();
			else $( '#' + window.gwBtn.cust1Btn ).hide();
			break;
		case 'CUST2' :
			if ( sAuth && flag )
				 $( '#' + window.gwBtn.cust2Btn ).show();
			else $( '#' + window.gwBtn.cust2Btn ).hide();
			break;
		case 'CUST3' :
			if ( sAuth && flag )
				 $( '#' + window.gwBtn.cust3Btn ).show();
			else $( '#' + window.gwBtn.cust3Btn ).hide();
			break;
		case 'CUST4' :
			if ( sAuth && flag )
				 $( '#' + window.gwBtn.cust4Btn ).show();
			else $( '#' + window.gwBtn.cust4Btn ).hide();
			break;
		case 'CUST5' :
			if ( sAuth && flag )
				 $( '#' + window.gwBtn.cust5Btn ).show();
			else $( '#' + window.gwBtn.cust5Btn ).hide();
			break;
		default :
			break;
		};
	};
}; // end of fc_showCommonBtns
function fc_setVisibleForCommonBtn( bSave, bDelete, bConf, bCust1, bCust2, bCust3, bCust4, bCust5 ) {
	if ( bSave )	$( '#' + window.gwBtn.saveBtn ).show();
	else			$( '#' + window.gwBtn.saveBtn ).hide();

	if ( bDelete )	$( '#' + window.gwBtn.deleteBtn ).show();
	else			$( '#' + window.gwBtn.deleteBtn ).hide();

	if ( bConf )	$( '#' + window.gwBtn.confirmBtn ).show();
	else			$( '#' + window.gwBtn.confirmBtn ).hide();

	if ( bCust1 )	$( '#' + window.gwBtn.cust1Btn ).show();
	else			$( '#' + window.gwBtn.cust1Btn ).hide();

	if ( bCust2 )	$( '#' + window.gwBtn.cust2Btn ).show();
	else			$( '#' + window.gwBtn.cust2Btn ).hide();

	if ( bCust3 )	$( '#' + window.gwBtn.cust3Btn ).show();
	else			$( '#' + window.gwBtn.cust3Btn ).hide();

	if ( bCust4 )	$( '#' + window.gwBtn.cust4Btn ).show();
	else			$( '#' + window.gwBtn.cust4Btn ).hide();

	if ( bCust5 )	$( '#' + window.gwBtn.cust5Btn ).show();
	else			$( '#' + window.gwBtn.cust5Btn ).hide();
}; //end of fc_setVisibleForCommonBtn
/**
 * fc_copyDataOrgGridToTgtGrid
 * @param oriGrid
 * @param targetGrid
 * @param bDeleteData
 */
function fc_copyDataOrgGridToTgtGrid ( oriGrid, targetGrid, bDeleteData ) {
	var selectedRowIdxs = fc_getSelectedRow( oriGrid.GridId );

	for (var i = 0; i < selectedRowIdxs.length; i++ ) {
		fc_addRowData(targetGrid.getGridId(), null, fc_getRowData( oriGrid.getGridId(), selectedRowIdxs[ i ] ) );
	};
	if ( bDeleteData ) {
		for (var i=selectedRowIdxs.length-1;i>=0;i-- ) {
			fc_delRowData( oriGrid.getGridId(), fc_getRowId( oriGrid.getGridId(), selectedRowIdxs[ i ] ) );
		};
	};
	//reset
	fc_resetSelection( targetGrid.getGridId() );
	fc_resetSelection( oriGrid.getGridId() );
}; // end of fc_copyDataOrgGridToTgtGrid
/**
 * fc_sortDropDownListByLabel
 * @param targetId
 */
function fc_sortDropDownListByLabel( targetId ) {
	var items = $( '#' + targetId ).jqxDropDownList( 'getItems' );

	$.each( items, function( index, item ) {
		var strItem = item.label;
		var arrstrItem = strItem.split( ',' );
		arrstrItem.sort();
		$( '#' + targetId ).jqxDropDownList( 'updateAt', { label: arrstrItem.toString(), value: item.value }, index );
	});
}// end of fc_sortDropDownListByLabel
/**
 * fc_setReadonlyInForm
 * @param pTargetId
 */
function fc_setReadonlyInForm( pTargetId ) {
	$( '#' + pTargetId).find( '.formValueCheck' ).each( function () {
		var id       = $( this ).attr( 'id' );
		var dataType = $( this ).attr( 'datatype' );

		if ( dataType == 'button' ) return;

		$( '#'+id ).removeClass( window.gwClass.required );
		$( '#'+id ).addClass( window.gwClass.readonly );

		if ( dataType == 'lov' )
			fc_setFormlovEditable( id, false );
	});
}; // end of fc_setReadonlyInForm
/**
 * fc_clearFormData
 * @param pId
 */
function fc_clearFormData( pId ) {
	$( '#' + pId ).find( '.formValueCheck' ).each( function () {
		fc_setInputVal( $( this ).prop( 'id' ), '' );
	});
}; // end of fc_clearFormData
/**
 * fc_getDropDownListIndexByContainLabel
 * @param targetId
 * @param labelNm
 * @returns {Number}
 */
function fc_getDropDownListIndexByContainLabel( targetId, labelNm ) {
	if ( fc_isNull( labelNm ) ) {
		return -1;
	};
	var items = $( '#' + targetId ).jqxDropDownList( 'getItems' );
	var iIndex = -1;
	$.each( items, function( index, item ) {
		if ( item.label.indexOf( labelNm ) > -1 ) {
			iIndex = index;
			return false;
		};
	});
	return iIndex;
}; // end of fc_getDropDownListIndexByContainLabel
/**
 * fc_setDropDownListByIndex
 * @param targetId
 * @param pIndex
 */
function fc_setDropDownListByIndex( targetId, pIndex ) {
	$( '#' + targetId ).jqxDropDownList( 'selectIndex', pIndex );
}; // end of fc_setDropDownListByIndex
/**
 * fc_calcBasic
 * @param value1
 * @param value2
 * @param calcOp
 * @returns {Number}
 */
function fc_calcBasic( value1, value2, calcOp ) {
	var tValue1 = '' + value1;
	var tValue2 = '' + value2;

	var pos1 = tValue1.indexOf( '.' ) == -1 ? 0 : tValue1.length - ( tValue1.indexOf( '.' ) + 1 );
	var pos2 = tValue2.indexOf( '.' ) == -1 ? 0 : tValue2.length - ( tValue2.indexOf( '.' ) + 1 );

	var largePos = pos1 >= pos2 ? pos1 : pos2;
	var calValue;

	if ( calcOp == '+' || calcOp == '-' ) {
		value1 = Math.round(value1 * Math.pow( 10,largePos ) );
		value2 = Math.round(value2 * Math.pow( 10,largePos ) );

		calValue = eval( value1 + calcOp + value2 );
		calValue = calValue / Math.pow( 10, largePos );

	} else if ( calcOp == '*' ) {
		value1 = Math.round(value1 * Math.pow( 10, pos1 ) );
		value2 = Math.round(value2 * Math.pow( 10, pos2 ) );

		calValue = eval( value1 + calcOp + value2 );
		calValue = calValue / Math.pow( 10, pos1 + pos2 );
	} else {
		if ( value2 == 0 )
			return 0;

		value1 = Math.round( value1 * Math.pow( 10, largePos ) );
		value2 = Math.round( value2 * Math.pow( 10, largePos ) );

		calValue = eval( value1 / value2 );
	};
	return calValue;
}; // end of fc_calcBasic
/**
 * fc_setCaptionInForm
 * @param pTableId
 * @param pCaption
 * @param pItemCd
 * @param pItemValue
 */
function fc_setCaptionInForm( pTableId, pCaption, pItemCd, pItemValue ) {
	pItemValue = fc_isNull( pItemValue ) ? '0' : pItemValue;
	fc_setElementCaption( pTableId, { caption: pCaption, itemCd: pItemCd, itemValue: pItemValue } );
}; // end of fc_setCaptionInForm
/**
 *
 * @param sComboTy
 * @param row
 * @param tartgetColObj
 * @param parentNullOpt
 * @returns
 */
function fc_getCodeFilterData( sComboTy , row, tartgetColObj, parentNullOpt ) {
	try {
		var arrNewCodeObj = new Array(); // save Filtered Code Reuslt
		var arrowVal; // by filter Value
		var gridId;

		if ( sComboTy == 'GRID' ) {
			gridId = tartgetColObj.object.split( '.' )[ 0 ];
			arrowVal = fc_getCellData( gridId, row, tartgetColObj.parentColNm );
		} else {
			arrowVal =  fc_getInputVal( tartgetColObj.parentColNm );
		};
		var arrCodeData = window.gwCodeResult[ tartgetColObj.code ];
		var tagsSplit;
		var arrowObj;

		// validation CODE Result
		if ( fc_isNull( arrCodeData ) ) {
			throw new Error( 'Code data may not be found : [ ' +tartgetColObj.code + ' ]' );
			return false;
		};

		// setting Code Filter
		var sCodeResultArrowColNm =  tartgetColObj.arrowColNm; //fc_setValue( tartgetColObj.arrowColNm, tartgetColObj.orgArrowColNm );
		for ( var i=0; i < arrCodeData.length; i++ ) {

			if ( fc_isNull( arrowVal ) && parentNullOpt ) {
				arrNewCodeObj[ arrNewCodeObj.length ] = arrCodeData[ i ];
			} else {
				if ( !fc_isNull( sCodeResultArrowColNm ) ) {
					arrowObj = eval( 'arrCodeData[ i ].'+sCodeResultArrowColNm );
					if ( !fc_isNull( arrowObj ) ) {
						tagsSplit = arrowObj.split( ',' );
						$.each( tagsSplit, function ( index, item ) {
							if ( item == arrowVal ) {
								arrNewCodeObj[ arrNewCodeObj.length ] = arrCodeData[ i ];
								return false;
			    			};
						});
					};
				} else {
					arrNewCodeObj[ arrNewCodeObj.length ] = arrCodeData[ i ];
				};
			};
		};

		var arrGridData = new Array();
		if ( tartgetColObj.nullable ) {
			arrGridData[ arrGridData.length ] = { CD_VAL : '', CD_NM : '' };
		};
		var applyCodeCnt  = arrNewCodeObj.length;
		for ( var jloop = 0; jloop<applyCodeCnt; jloop++ ) {
			var cdVal = arrNewCodeObj[ jloop ].CD_VAL;
			var cdNm  = arrNewCodeObj[ jloop ].CD_NM;
			var _newNm = '';

			switch ( tartgetColObj.format ) {
				case 'K'   : _newNm = cdVal; 	break;
				case 'V'   : _newNm = cdNm; 	break;
				case 'V:K' : _newNm = cdNm.concat( ':' ).concat( cdVal ); 	break;
				default :
				_newNm = cdVal.concat( ':' ).concat( cdNm );
					break;
			};
			var elObj = {}
			elObj.CD_VAL = cdVal;
			elObj.CD_NM  = _newNm;
			arrGridData[ arrGridData.length ] = elObj;
		};
	} catch( e ) {
		fc_showLog( 3, 'fc_getCodeFilterData Parameter :: ' , sComboTy );
		fc_showLog( 3, 'row: ', row );
		fc_showLog( 3, 'targetColObj : ', tartgetColObj );
		fc_showLog( 3, 'parentNullOpt: ', parentNullOpt );
		fc_getException( e );
	};
	return arrGridData;
}; // end of fc_getCodeFilterData
function fc_getFormData( prmKeyResult, key ) {
	try {
		var tempObj = new Object();
		tempObj = window.gwJsonResult[ prmKeyResult ];
	} catch (e) {
		//fc_getException( e );
		return null;
	};
	if ( tempObj.length == 0 ) {
		return null;
	} else {
		return tempObj[ 0 ][ key ];
	};
}; // end of fc_getFormData
function fc_addDiv( targetObjId, divId, sFloattype, sWidth, sHeight, showFlag ) {
	var targetObj;
	var sShow = '';
	if ( typeof( targetObjId ) !==  'object' )
		targetObj = $( '#' + targetObjId );
	else
		targetObj = targetObjId;
	showFlag = fc_setValue( showFlag, true );
	if ( !showFlag ) sShow = 'display: none;'
	targetObj.append( $( '<div id="' + divId + '" floattype="' + sFloattype + '" style="width: ' + sWidth + ';height: ' + sHeight + ';' + sShow + '"></div>' ) );
}; // end of fc_addDiv
function fc_applyMultilanguage() {
	if ( window.gwMesEnv.lang.isMultiLanguage ) {
		fc_getMultiLanguage();
	};
}; // end of fc_applyMultilanguage

function fc_arrObjSortByKey( arrObj, objKey ) {
   	return arrObj.sort( function( a, b ) {
       	var x = a[ objKey ];
        var y = b[ objKey ];
       	return ( ( x < y ) ? -1 : ( ( x > y ) ? 1 : 0 ) );
   	});
}; // end of sortByKey
function f_openPage_SID( sourceObj ) {
	var pageId = sourceObj.attr( 'PGM_ID' );
	var pageNm = sourceObj.attr( 'MNU_NM' );
	var parms1 = sourceObj.attr( 'MNU_PARAM1' );
	var parms2 = sourceObj.attr( 'MNU_PARAM2' );
	var parms3 = sourceObj.attr( 'MNU_PARAM3' );
	var mnuId  = sourceObj.attr( 'MNU_ID' );
	var pgmTy  = sourceObj.attr( 'PGM_TY' );
	var parms  = sourceObj.attr( 'parms' );
	var moduleId = pageId.substring( 0, 3 );

	var addParams = ( fc_isNull( parms ) ? '' : parms );
	if ( !fc_isNull( parms1 ) ) addParams += '&MNU_PARAM1=' + parms1;
	if ( !fc_isNull( parms2 ) ) addParams += '&MNU_PARAM2=' + parms2;
	if ( !fc_isNull( parms3 ) ) addParams += '&MNU_PARAM3=' + parms3;

	if ( addParams.indexOf( '?' ) == -1 ) {
		addParams = '?' + addParams.substring( 1 );
	};
	window.gwMesEnv.user.pgmId    = pageId;
	window.gwMesEnv.user.pgmTitle = pageNm;
	window.gwMesEnv.user.pgmTy    = pgmTy;

	fc_setSessionItem( 'GW_SYSTEM_ENV', window.gwMesEnv );

	var pageUrl = '../' + moduleId + '/' + pageId + '.do' + addParams;

	return pageUrl;
}; // end of f_openPage_SID
/**
 * $(window).keydown
 */
// disable ctrl + mouse wheel   ==========> 나중에 common으로 올릴 것.
$( window ).keydown( function ( event ) {
	if ( ( event.keyCode == 8 ) && ( event.target.tagName == 'BODY' || event.target.tagName == 'DIV' ) ) {
		event.preventDefault();
	};

	if ( event.keyCode == 13 ) {
		var node = $( event.target ).parents();
		$.each( node, function ( index, item ) {
			if ( item.id == 'divSearchCondition' ) {
				if ( typeof f_search == 'function' ) {
					f_search();
					return false;
				};
			};
			if ( item.id == 'body' ) {
				return false;
			};
		});
	};

	$( window ).bind( 'mousewheel DOMMouseScroll', function( event ) {
		if ( event.ctrlKey == true ) {
			event.preventDefault();
		};
	});
}); // end of $( window ).keydown

$( window ).mousedown( function ( event ) {
	var objId = 'TAB_LIST';
	if (   event.target.id != 'dropdownlistContent' + objId
	    && event.target.id != 'jqxScrollThumbverticalScrollBarinnerListBox' + objId
	    && event.target.id != 'jqxScrollAreaUpverticalScrollBarinnerListBox' + objId
	    && event.target.id != 'jqxScrollBtnDownverticalScrollBarinnerListBox' + objId ) {
		if ( $( event.target ).parents().filter( function( index ) {
			return $( this ).attr( 'id' ) == 'TAB_LIST' ? true : false;
			  }).length == 0 ) {
			try {
				if ( typeof f_closeTabCombo == 'function' ) {
					f_closeTabCombo();
				} else {
					parent.f_closeTabCombo();
				}
			} catch( e ) {
				try {
					parent.f_closeTabCombo();
				} catch ( e ) {}
			};
		};
	};
	if ( event.target.id != 'collapseButton' ) {
		if ( $( event.target ).parents().filter( function( index ) {
			return ( $( this ).attr( 'id' ) == 'divMenuWindow' ) ? true : false;
			  }).length == 0 ) {
			if ( $( event.target )[ 0 ].outerText.trim() == window.gwMessage.fav.add || $( event.target )[ 0 ].outerText.trim() == window.gwMessage.fav.remove ) {
				null;
			} else {
				try {
					if ( typeof f_closeMainMenuPop == 'function' ) {
						f_closeMainMenuPop();
					} else {
						parent.f_closeMainMenuPop();
					}
				} catch( e ) {
					try {
						parent.f_closeMainMenuPop();
					} catch ( e ) {}
				};
			};
		};
	};
}); // end of $( window ).mousedown