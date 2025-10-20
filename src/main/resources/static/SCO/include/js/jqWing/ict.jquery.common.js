/**
 * Declare Glaobal Variable
 */
window.editFlag    = false;
window.errMessage  = null;
window.dispMessage = null;
window.isInit      = false;
window.initProc = {	initFlag : false, opDate : false };
window.gwMesConst = {
	matType: { slab: 'SLAB', plate: 'PLATE', coil: 'COIL', bloom: 'BLOOM', billet: 'BILLET' },
	uomType: { thk: 'THK', wth: 'WTH', lth: 'LTH', wgt: 'WGT' },
};
window.gwMesEnv = {
	themes     : 'ui-redmond', // energybluecustom
	user       : { id: 'LOCAL', name: 'UNKNOWN', deptCd: 'UNKNOWN', clientIp: 'LOCAL PC', pgmId: '', pgmTitle: '', pgmTy: '', comCd: 'POSCOICT', comNm: 'Posco ICT', plantCd: '1000' },
	grid       : { addFlag: 'I', delFlag: 'D', updateFlag: 'U', isPage: false, isFilter: false, isAutoSave: false },
	completeMsg: { isSearch: false, isSave: true , isDelete: true , isConfirm: true , isSend: true, isFilesave: true }, // complete message
	mainmenu   : { isMenuAutoHide: true, isSideMenu: false, isOpenByClick: true, isExpand: false, isPgmId: true },
	screen     : { showTabList: true, tabCaptionLth: 25, logLevel: 1, isDefMessageArea: false, reportMainPgmId: 'SRTC000', reportDefaultURL: '/SRT/pages/', paddingSize: 5, maxinteger: 50, listboxval: 20, listboxmaxlen: 500 },
	format: { delim   : { source: { date: '' , time: '' , datetime: ''  },
						  target: { date: '-', time: ':', datetime: ' ' }
						},
			date    : { source: 'YMD', target: 'YMD', date : {}, yearmonth: {}, monthday: {} },
			time    : { source: 'HMS', target: 'HMS', time : {}, hour: {}, hourmin: {}, minsec: {} },
			slab    : { thk: 0, wth: -1, lth: -1, wgt: 2 },
			plate   : { thk: 0, wth: -1, lth: -1, wgt: 2 },
			coil    : { thk: 0, wth: -1, lth: -1, wgt: 2 },
			bloom   : { thk: 0, wth: -1, lth: -1, wgt: 2 },
			billet  : { thk: 0, wth: -1, lth: -1, wgt: 2 },
			separate: { source: { thousand: '' , deciaml: '.' },
						target: { thousand: ',', deciaml: '.' },
					  }
			},
	lang      : { cd: 'EN', datepicker: '', grid: '', isMultiLanguage: true, isUseDefLabel: false, prefix: '@_', isUseSession: true },
	item      : { itemcd: 'item_cd', itemvalue: 'item_value', datatype: 'datatype', category: 'category', },
	operInfo  : { date: '', shift: '', dateTime: '' },
	shift     : { A: '0830', B: '2030', C: '', D: '', E: '', CNT: 2 },
	btnSize   : { search: 70, save: 70, del: 70, conf: 70, print: 70, close: 70, cust1: 85, cust2: 85, cust3: 85, cust4: 85, cust5: 85 },
};
window.gwAuth = { isSearch: false, isSave: false, isDelete: false, isConfirm: false, isCust1: false, isCust2: false, isCust3: false, isCust4: false, isCust5: false, isPrint: false };
window.gwGrid         = new Array();
window.gwGridSize     = new Array();
window.gwTreeGridSize = new Array();
window.gwTabGridSize  = new Array();
window.gwChkFormRange = new Array();
window.gwChkGridRange = new Object();

window.gwCodeResult   = new Object();
window.gwJsonResult   = new Object();
window.gwJsonParam    = new Object();
window.gwLangParam    = new Object();
window.gwPopupSource  = new Object();
window.gwTabMultiLang = new Object();
window.gwTabInit      = new Object();

window.gwClass = {
		notEditClass: 'not-editable-cell', ellipsis: 'ui-ellipsis',
		multilanguage: 'ui-multilanguage', required: 'ui-mandatory',
		readonly: 'ui-readonly', notGridEditClass: 'jqx-grid-editable-none',
		cellLinkStyle:'custom-jqx-grid-cell-link-style'
};
window.gwLangResult;
window.gwMultiMessage;
window.gwMultiLang = { isRunMain: true, isUse: true };
window.gwMultiLangItem;
window.gwMultiLangParam    = new Object();
window.gwCustTab;

window.gwBtn = {
			  searchBtn  : 'mnuSearchBtn'
			, saveBtn    : 'mnuSaveBtn'
			, deleteBtn  : 'mnuDeleteBtn'
			, confirmBtn : 'mnuConfirmBtn'
			, cust1Btn   : 'mnuCust1Btn'
			, cust2Btn   : 'mnuCust2Btn'
			, cust3Btn   : 'mnuCust3Btn'
			, cust4Btn   : 'mnuCust4Btn'
			, cust5Btn   : 'mnuCust5Btn'
			, cust6Btn   : 'mnuCust6Btn'
			, cust7Btn   : 'mnuCust7Btn'
			, cust8Btn   : 'mnuCust8Btn'
			, cust9Btn   : 'mnuCust9Btn'
			, cust10Btn  : 'mnuCust10Btn'
			, closeBtn   : 'mnuCloseBtn'
			, printBtn   : 'mnuPrintBtn'
			} ;
/**
 * Declare Local Variable
 */
var msgBoxId = 'msgBoxWindow';
var msgDetailVisible = false;
var msgBoxWindow;
var defaultPath    = '.';
var spinner1;

/**
 * Declare Initial JS Function
 */
$( function () {
	fc_showLog( 1, '***** jQuery Common' );
}); // end of $( function () )
/**
 *
 * @param iLogLevel
 * @param sLogText
 * @param sValue
 */
function fc_showLog ( iLogLevel, sLogText, sValue ) {
	if ( window.gwMesEnv.screen.logLevel <= iLogLevel ) {
		if ( fc_isNull( sValue ) )
			console.log ( sLogText );
		else
			console.log ( sLogText, sValue );
	};
}; // end of fc_showLog
/**
 *
 * @param errObj
 */
function fc_getException ( errObj ) {
	fc_setError( errObj.message, errObj.stack );
	fc_showLog( 3, errObj );
}; // end of fc_getException
/**
 *
 * @param errMessage
 * @param errStack
 */
function fc_setError ( errMessage, errStack ) {
//	var errorMsg = "작업중 오류가 발생했습니다\n관리자에게 문의 하시기 바랍니다."
	fc_closeMessageBox();
	var oraErrMsg = fc_filterOraMsg( errMessage );
	fc_showMessageBox( ( fc_isNull( oraErrMsg ) ? errMessage : oraErrMsg ), 'E', ( fc_isNull( errStack ) ? errMessage : errStack ) );
//	fc_showMessageBox( ( fc_isNull( oraErrMsg ) ? errMessage : errorMsg ), 'E', ( fc_isNull( errStack ) ? errMessage : errorMsg ) );
	fc_showProgBar( false );

	throw new Error( errMessage );
	return;
}; // end of fc_setError
/**
 *
 * @param msg
 * @param msgType
 * @param msgDetails
 * @param nWidth
 * @param okCallback
 * @param cancelCallback
 */
function fc_makeMessageBoxWindow ( msg, msgType, msgDetails, nWidth, okCallback, cancelCallback ) {
	msgBoxWindow = ( function () {
		var _collapsed = false;
		function _addDefaultSetting() {
			$( '#msgBoxDetails' ).hide();
		};
		function _createNormalElements() {
			$( '#' + msgBoxId ).jqxWindow({
				height : 140,
				width  : ( fc_isNull( nWidth ) ) ? 450 : nWidth,
				theme  : window.gwMesEnv.themes,
				autoOpen : true,
				isModal  : true,
				resizable: false,
				cancelButton : $( '#OK_BTN' ),
				initContent  : function () {
					$( "#OK_BTN" ).jqxButton({
						width : 80,
						theme : window.gwMesEnv.themes
					});
					$( "#DETAILS_BTN" ).jqxButton({
						width : 80,
						theme : window.gwMesEnv.themes
					});
				},
			});
		};
		function _createConfirmElements() {
			$( '#' + msgBoxId ).jqxWindow({
				height : 140,
				width  : ( fc_isNull( nWidth ) ) ? 450 : nWidth,
				theme  : window.gwMesEnv.themes,
				autoOpen  : true,
				isModal   : true,
				resizable : false,
				cancelButton : $( '#CANCEL_BTN' ),
				initContent  : function () {
					$( '#OK_BTN' ).jqxButton( {
						width : 80,
						theme : window.gwMesEnv.themes
					});
					$( '#CANCEL_BTN' ).jqxButton( {
						width : 80,
						theme : window.gwMesEnv.themes
					});
				},
			});
		};
		return {
			init: function ( msgType ) {
				if ( msgType == 'Q' ) {
					_createConfirmElements();
				} else {
					_createNormalElements();
					_addDefaultSetting();
				};
			},
			close: function () {
				$( '#' + msgBoxId ).jqxWindow( 'close' );
			},
			destroy: function () {
				$( '#' + msgBoxId ).jqxWindow( 'destroy' );
			}
		};
	} ());

	msgType = ( fc_isNull( msgType ) ? 'I' : msgType.toUpperCase() );
	msgBoxWindow.init( msgType );

	$( '#OK_BTN' ).jqxButton( 'focus' );

	if ( msgType != 'E' ) {
		$( '#DETAILS_BTN' ).hide();
		msgDetailVisible = false;
	};
	$( '#DETAILS_BTN' ).click( function() {
		$( '#msgBoxDetails' ).toggle();
		msgDetailVisible = !msgDetailVisible;

		if ( msgDetailVisible ) {
			$( '#' + msgBoxId ).height( 335 );
			$( '#msgBoxContent' ).height( 200 );
		} else {
			$( '#' + msgBoxId ).height( 140 );
		};
	} );
	$( '#OK_BTN' ).click( function() {
		try {
			if ( typeof okCallback == "function" ) {
				msgBoxWindow.close();
				okCallback();
			};
		} catch ( e ) {
		} finally {
			//msgBoxWindow.close();
		};
	} );
	$( '#CANCEL_BTN' ).click( function() {
		try {
			if ( typeof cancelCallback == "function" ) {
				cancelCallback();
			};
		} catch ( e ) {
		} finally {
			msgBoxWindow.close();
		};
	} );
};// end of function fc_makeMessageBoxWindow
/**
 *
 * @param msg
 * @param msgType
 * @param msgDetails
 * @returns {Boolean}
 */
function fc_makeMessageBoxDiv ( msg, msgType, msgDetails ) {
	if( $( '#' + msgBoxId ) != undefined ) {
		$( '#' + msgBoxId ).remove();
	};
	var sOk      = window.gwMessage.button.bOk;
	var sDetails = window.gwMessage.button.bDetails;
	var sCancel  = window.gwMessage.button.bCancel;

	msgType = msgType.toUpperCase();

	var msgTitle  = '', msgClass = '';
	switch ( msgType ) {
	case 'Q':
		msgTitle = window.gwMessage.caption.question;
		msgClass = 'questing';
		break;
	default:
		switch ( msgType ) {
		case 'E':
			msgTitle = window.gwMessage.caption.error;
			msgClass = 'error';
			break;
		case 'W':
			msgTitle = window.gwMessage.caption.warning;
			msgClass = 'warning';
			break;
		case 'I':
			msgTitle = window.gwMessage.caption.info;
			msgClass = 'info';
			break;
		default: // 'S'
			msgTitle = window.gwMessage.caption.success;
			msgClass = 'success';
			break;
		};
		break;
	};

	var sMatchRetrunWord = /\r\n|\r|\n|\\r\\n|\\n|\\r/gi;
	if( !fc_isNull( msg ) ) {
		msg = msg.replace( sMatchRetrunWord, "<br/>" );
	};
	if( msgType != 'Q' && !fc_isNull( msgDetails ) ) {
		msgDetails = msgDetails.replace( sMatchRetrunWord, "<br/>" );
	};

	var targetObj = $( 'body' );
	var divWindow = $( "<div id='" +msgBoxId+ "' class='popup_wrap'></div>" );

	var divHeader = $( "<div id='msgBoxHeader' class='popup_header'><h1 class='popup_title'>" + msgTitle + "</h1></div>" );
	var divContent = $( "<div id='msgBoxContent' class='popup_content' style='overflow:hidden;'></div>" );
	var divSubContents = $( "<div id='msgBoxSubContents'><table><tr><td class='" + msgClass + "'><span></span></td><td class='content_text' style='padding-left:6px;'>" + msg + "</td></tr></table></div>" );

	divContent.append( divSubContents );
	if( msgType != 'Q' ) {
		var divButton  = $( "<div id='msgBoxButton'  class='popup_btn'><button id='DETAILS_BTN'>" + sDetails + "</button><button id='OK_BTN'>" + sOk + "</button></div>" );
		var divDetails = $( "<div id='msgBoxDetails' class='popup_detail'><p style='overflow: scroll; display: inline;'>" + msgDetails + "</p></div>" );
		divContent.append( divButton  );
		divContent.append( divDetails );
	} else {
		var divButton  = $( "<div id='msgBoxButton'  class='popup_confirm'><button id='OK_BTN'>" + sOk + "</button><button id='CANCEL_BTN'>" + sCancel + "</button></div>" );
		divContent.append( divButton );
	};

	divWindow.append( divHeader  );
	divWindow.append( divContent );

	targetObj.append( divWindow );
	return true;
};// end of function fc_makeMessageBoxDiv
/**
 *
 * @param msg
 * @param msgType
 * @param msgDetails
 * @param nWidth
 * @param okCallback
 * @param cancelCallback
 * @returns {Boolean}
 */
function fc_showMessageBox ( msg, msgType, msgDetails, nWidth, okCallback, cancelCallback ) {
	fc_closeMessageBox();
	if ( fc_makeMessageBoxDiv( msg, msgType, msgDetails ) ) {
		fc_makeMessageBoxWindow( msg, msgType, msgDetails, nWidth, function () { okCallback(); }, function () { cancelCallback(); } );
		fc_resizeWindow(); //2019.12.27 for object resize
		return true;
	};
	return false;
};// end of function fc_showMessageBox
/**
 *
 */
function fc_closeMessageBox() {
	if ( !fc_isNull( msgBoxWindow ) )
		msgBoxWindow.close();
}; // end of fc_closeMessageBox
/**
 *
 * @param sMode
 * @param msgItemCd
 * @param afterCallback
 * @param callback
 * @param cancelCallback
 */
function fc_showConfirmMessage ( sMode, msgItemCd, okCallback, cancelCallback ) {
	var confirmMsg = fc_getMsgboxMessage( sMode, msgItemCd );
	fc_showMessageBox( confirmMsg, 'Q', '', '', okCallback, cancelCallback );
	//fc_resizeWindow ();//2019.12.12 for object resize
};// end of fc_showConfirmWindow
/**
 *
 * @param sMode
 * @param msgItemCd
 */
function fc_showCompleteMessage ( sMode, msgItemCd ) {
	var completeMsg = fc_getMsgboxMessage( sMode, msgItemCd, 'C' );
	
	if ( !fc_isNull( completeMsg ) ) {
		if ( !fc_isNull( window.dispMessage ) ) {
			completeMsg = completeMsg + "<br/><br/>" + window.dispMessage;
			window.dispMessage = null;
		};
		fc_showMessageBox( completeMsg, 'I' );
	};
	window.dispMessage = null;
};// end of fc_showCompleteMessage
/**
 *
 * @param sMode
 * @param msgItemCd
 * @param sType
 * @returns {String}
 */
function fc_getMsgboxMessage ( sMode, msgItemCd, sType ) {
	var message = '', sCustomMsg = '';
	sType = fc_setValue( sType, 'A' ); // A: Ask message, C: Complete Message
	if ( !fc_isNull( msgItemCd ) ) {
		sCustomMsg = ( sType == 'C' ) ? window.gwMessage.action.process : window.gwMessage.action.isWant;
		var sItem = fc_getMultiItem( msgItemCd );
		if ( sItem.substr( 0, 2 ) == '@_' && sItem.length > 20 ) {
//		if ( !fc_isNull( sItem ) ) {
			sCustomMsg = msgItemCd;
		} else {
			sCustomMsg = sCustomMsg.replace( '{1}', sItem );
		};
		sMode = 'USER_EXT';
	};
	if ( sType == 'C' ) {
		switch ( sMode ) {
			case 'I' :
				message = ( window.gwMesEnv.completeMsg.isSearch   ) ? window.gwMessage.action.inquiryCompleted  : '';
				break;
			case 'S' :
				message = ( window.gwMesEnv.completeMsg.isSave     ) ? window.gwMessage.action.saveCompleted     : '';
				break;
			case 'D' :
				message = ( window.gwMesEnv.completeMsg.isDelete   ) ? window.gwMessage.action.deleteCompleted   : '';
				break;
			case 'C' :
				message = ( window.gwMesEnv.completeMsg.isConfirm  ) ? window.gwMessage.action.confirmCompleted  : '';
				break;
			case 'T' :
				message = ( window.gwMesEnv.completeMsg.isSend     ) ? window.gwMessage.action.sendCompleted     : '';
				break;
			case 'F' :
				message = ( window.gwMesEnv.completeMsg.isFilesave ) ? window.gwMessage.action.filesaveCompleted : '';
				break;
			case 'USER_EXT' :
				message = sCustomMsg;
				break;
			default:
				message = window.gwMessage.action.requestCompleted;
		};// end of switch (sMode)
	} else {
		switch ( sMode ) {
			case 'I' :
				message = window.gwMessage.action.inquiry;
				break;
			case 'S' :
				message = window.gwMessage.action.save;
				break;
			case 'D' :
				message = window.gwMessage.action.del;
				break;
			case 'X' :
				message = window.gwMessage.action.close;
				break;
			case 'C' :
				message = window.gwMessage.action.confirm;
				break;
			case 'P' :
				message = window.gwMessage.action.print;
				break;
			case 'T' :
				message = window.gwMessage.action.send;
				break;
			case 'F' :
				message = window.gwMessage.action.filesave;
				break;
			case 'USER_EXT' :
				message = sCustomMsg;
				break;
			default:
				message = "Do you want to Processing?";
		}// end of switch (sMode)
	};
	return message;
}// end of fc_getMsgboxMessage
/**
 *
 * @param errMessage
 * @returns {String}
 */
function fc_filterOraMsg ( errMessage ) {
//	errMessage = errMessage.replace( /\s*$/gi, '' );
	//var C_REGEXP_ORA_ERR = /ORA-[\d]{5}:/g;  ykh
	var C_REGEXP_ORA_ERR = /EDB-[\d]{5}:/g;
	var rtnValue = '';
	var idxStart = errMessage.search( C_REGEXP_ORA_ERR );

	if ( idxStart > -1 ) {
		rtnValue = errMessage.substring( idxStart );
		rtnValue = rtnValue.substring( 0, rtnValue.indexOf( '\n' ) );

		if ( rtnValue.indexOf( "]" ) > -1 ) {
			rtnValue = rtnValue.substring( rtnValue.indexOf( "]" ) + 1, rtnValue.length );
		};
	};
	return rtnValue;
} // end of fc_filterMsg
/**
 *
 * @param obj
 * @param isTrim
 * @returns
 */
function fc_isNull ( obj, isTrim ) {
	var _trim = ( isTrim == undefined ) ? true : false;

	if ( typeof obj === 'string' && _trim ) {
		return ( obj === undefined || obj === null || obj.trim() == ""  || obj === 'null' ) ? true : false;
	} else {
		return ( obj === undefined || obj == null ) ? true : false;
	};
}// end of fc_isNull
/**
 *
 * @param objId
 * @returns
 */
function fc_getObj ( objId ) {
	return $( '#' + objId );
}; // end of fc_getObj
/**
 *
 * @param paramNm
 * @param sDefault
 * @returns
 */
function fc_setValue ( paramNm, sDefault ) {
    if ( fc_isNull( paramNm ) ) paramNm = sDefault;
    return paramNm;
}// fc_setValue
/**
 *
 * @param flag
 * @returns
 */
function fc_setNullToFlase ( flag ) {
	return fc_isNull( flag ) ?  false : flag;
}; // end of fc_setNullToFlase
/**
 *
 * @param flag
 * @returns
 */
function fc_setNullToTrue ( flag ) {
	return fc_isNull( flag ) ?  true : flag;
}; // end of fc_setNullToTrue
/**
 *
 * @param value
 * @returns
 */
function fc_setUpperValue ( value ) {
	return fc_isNull( value ) ?  '' : value.toUpperCase();
}; // end of fc_setUpperValue
/**
 *
 * @param s
 * @param c
 * @param n
 * @returns
 */
function fc_lpad  ( value, filler, nTotLength ) {
	value = String( value );
	if ( fc_isNull( value) ) return '';

	if ( !value || !filler || value.length >=  nTotLength ) {
		return value;
	};

	var max = ( nTotLength - value.length ) / filler.length;
	for ( var i = 0; i<max; i++ ) {
		value = filler + value;
	};
	return value;
};// end of fc_lpad
/**
 *
 * @param s
 * @param c
 * @param n
 * @returns
 */
function fc_rpad ( value, filler, nTotLength ) {
	value = String( value );
	if ( fc_isNull( value ) ) return '';

	if ( !value || !filler || value.length >=  nTotLength ) {
		return value;
	};

	var max = ( nTotLength - value.length ) / filler.length;
	for ( var i = 0; i < max; i++ ) {
		value += filler;
	};
	return value;
};// end of fc_rpad
/**
 *
 */
function fc_getGridCellLinkStyle () {
	return window.gwClass.cellLinkStyle;
}; // end of fc_getGridCellLinkStyle
/**
 *
 */
function fc_resizeWindow () {
	var evt = document.createEvent( 'UIEvents' );
	evt.initUIEvent( 'resize', true, false, window, 0 );
	window.dispatchEvent( evt );
}; // end of fc_resizeWindow
/**
 *
 * @param prmServiceNm
 */
function fc_setDefaultParam ( prmServiceNm ) {
	window.gwJsonParam[ 'gwLoginId'     ] = window.gwMesEnv.user.id;
	window.gwJsonParam[ 'gwServiceName' ] = prmServiceNm;
	window.gwJsonParam[ 'gwLanguageCd'  ] = window.gwMesEnv.lang.cd;
	window.gwJsonParam[ 'gwClientIp'    ] = window.gwMesEnv.user.clientIp;
	window.gwJsonParam[ 'gwPgmId'       ] = window.gwMesEnv.user.pgmId;
	window.gwJsonParam[ 'gwPlantCd'     ] = window.gwMesEnv.user.plantCd;//20180509

}; // end of fc_setDefaultParam
/**
 *
 */
function fc_submit ( type, prmServiceNm, prmTransitionNm, prmParam, prmDataType, prmModule, isShowError ) {
	var result = false;
	isShowError = fc_setValue( isShowError, true );

	if ( fc_isNull( prmServiceNm ) ) {
		fc_setError( '[Service Name]' + window.gwMessage.validate.nodefined );
	} else {
		prmServiceNm = $.trim( prmServiceNm );
	};
	if ( fc_isNull( prmTransitionNm ) ) {
		fc_setError( '[Transition Name]' + window.gwMessage.validate.nodefined );
	} else {
		prmTransitionNm = $.trim( prmTransitionNm );
	};

	fc_setDefaultParam( prmServiceNm );

	if ( prmParam    == undefined || prmParam    == '' ) prmParam    = window.gwJsonParam;
	if ( prmDataType == undefined || prmDataType == '' ) prmDataType = 'json';
	if ( prmModule   == undefined || prmModule   == '' ) prmModule   = defaultPath;
	window.gwJsonResult = new Object();

	if ( prmModule != defaultPath ) {
		prmModule = '/' + prmModule;
	};
	// log
	fc_showLog( 3, 'Location path = ' + prmModule + ' // Service Name = ' + prmServiceNm +' // Transition Name = ' + prmTransitionNm );
	fc_showLog( 3, 'Param: ', window.gwJsonParam );

	window.isAjaxRun   = true;
	window.dispMessage = null;
	window.errMessage  = null;

	//ajax call ..
	$.ajax({
		global: false,
		type: 'POST',
		url: prmModule + '/jqGridJSON.json?ServiceName=' + prmServiceNm + '&' + prmTransitionNm + '=1',
		data: prmParam,
		dataType: prmDataType,
		async: false,
		/*beforeSend: function(){
			if(window.searchGrid) {
				fc_showProgBar(true); --not working(async: false)
			}
		},
		complete: function(){
			if(window.searchGrid) {
				fc_showProgBar(false);
			}
		},
		*/
		success: function ( data ) {
			window.gwJsonResult = data;
			//fc_showLog( 3, ' <## Execute fc_submit Retrun ##> ' ,  window.gwJsonResult );
			fc_showLog( 3, ' <## Execute fc_submit Retrun ##> ' ,  'no display for performance. use external tool(ex.fiddler)' );
			if ( data.is_success ) {
				fc_setStatusMsg( data.statusMsg );
				window.gwJsonParam = new Object();
				result = true;
				window.isAjaxRun = false;

				if ( !fc_isNull( data.displaymsg ) ) {
					fc_showMessageBox( data.displaymsg , 'I' );
					window.dispMessage = data.displaymsg;
				};
			} else {
				window.isAjaxRun = false;
				result = false;

				if ( !fc_isNull( data.exception_message ) ) {
					if ( isShowError ) {

						fc_setError( data.exception_message, data.exception_message );
					} else {
						window.errMessage = data.exception_message;
					}
				};
			};
		},
		error: function ( xhr, ajaxOptions, thrownError ) {
			window.isAjaxRun = false;
			result = false;
			fc_setError( thrownError, xhr.responseText );
		},
	});
	return result;
}; // end of fc_submit
/**
* fc_submit isClearParam
*/
function fc_submitParam ( type, prmServiceNm, prmTransitionNm, isClearParam, prmParam, prmDataType, prmModule, isShowError ) {
	var result = false;
	isShowError = fc_setValue( isShowError, true );

	if ( fc_isNull( prmServiceNm ) ) {
		fc_setError( '[Service Name]' + window.gwMessage.validate.nodefined );
	} else {
		prmServiceNm = $.trim( prmServiceNm );
	};
	if ( fc_isNull( prmTransitionNm ) ) {
		fc_setError( '[Transition Name]' + window.gwMessage.validate.nodefined );
	} else {
		prmTransitionNm = $.trim( prmTransitionNm );
	};

	fc_setDefaultParam( prmServiceNm );

	if ( prmParam    == undefined || prmParam    == '' ) prmParam    = window.gwJsonParam;
	if ( prmDataType == undefined || prmDataType == '' ) prmDataType = 'json';
	if ( prmModule   == undefined || prmModule   == '' ) prmModule   = defaultPath;
	window.gwJsonResult = new Object();

	if ( prmModule != defaultPath ) {
		prmModule = '/' + prmModule;
	};
	// log
	fc_showLog( 3, 'Location path = ' + prmModule + ' // Service Name = ' + prmServiceNm +' // Transition Name = ' + prmTransitionNm );
	fc_showLog( 3, 'Param: ', window.gwJsonParam );

	window.isAjaxRun   = true;
	window.dispMessage = null;
	window.errMessage  = null;

	//ajax call ..
	$.ajax({
		global: false,
		type: 'POST',
		url: prmModule + '/jqGridJSON.json?ServiceName=' + prmServiceNm + '&' + prmTransitionNm + '=1',
		data: prmParam,
		dataType: prmDataType,
		async: false,
		/*beforeSend: function(){
			if(window.searchGrid) {
				fc_showProgBar(true); --not working(async: false)
			}
		},
		complete: function(){
			if(window.searchGrid) {
				fc_showProgBar(false);
			}
		},
		*/
		success: function ( data ) {
			window.gwJsonResult = data;
			//fc_showLog( 3, ' <## Execute fc_submit2 Retrun ##> ' ,  window.gwJsonResult );
			fc_showLog( 3, ' <## Execute fc_submit2 Retrun ##> ' ,  'no display for performance. use external tool(ex.fiddler)' );
			if ( data.is_success ) {
				fc_setStatusMsg( data.statusMsg );
				if(isClearParam == "Y"){
					window.gwJsonParam = new Object();
				}
				result = true;
				window.isAjaxRun = false;

				if ( !fc_isNull( data.displaymsg ) ) {
					fc_showMessageBox( data.displaymsg , 'I' );
					window.dispMessage = data.displaymsg;
				};
			} else {
				window.isAjaxRun = false;
				result = false;

				if ( !fc_isNull( data.exception_message ) ) {
					if ( isShowError ) {

						fc_setError( data.exception_message, data.exception_message );
					} else {
						window.errMessage = data.exception_message;
					}
				};
			};
		},
		error: function ( xhr, ajaxOptions, thrownError ) {
			window.isAjaxRun = false;
			result = false;
			fc_setError( thrownError, xhr.responseText );
		},
	});
	return result;
}; // end of fc_submit2

/**
* async True Callback Type
*/
function fc_submitCall ( type, prmServiceNm, prmTransitionNm, prmParam, prmDataType, prmModule,callbackfunc, isShowError ) {
	var result = false;
	isShowError = fc_setValue( isShowError, true );

	if ( fc_isNull( prmServiceNm ) ) {
		fc_setError( '[Service Name]' + window.gwMessage.validate.nodefined );
	} else {
		prmServiceNm = $.trim( prmServiceNm );
	};
	if ( fc_isNull( prmTransitionNm ) ) {
		fc_setError( '[Transition Name]' + window.gwMessage.validate.nodefined );
	} else {
		prmTransitionNm = $.trim( prmTransitionNm );
	};

	fc_setDefaultParam( prmServiceNm );

	if ( prmParam    == undefined || prmParam    == '' ) prmParam    = window.gwJsonParam;
	if ( prmDataType == undefined || prmDataType == '' ) prmDataType = 'json';
	if ( prmModule   == undefined || prmModule   == '' ) prmModule   = defaultPath;
	window.gwJsonResult = new Object();

	if ( prmModule != defaultPath ) {
		prmModule = '/' + prmModule;
	};
	// log
	fc_showLog( 3, 'Location path = ' + prmModule + ' // Service Name = ' + prmServiceNm +' // Transition Name = ' + prmTransitionNm );
	fc_showLog( 3, 'Param: ', window.gwJsonParam );

	window.isAjaxRun   = true;
	window.dispMessage = null;
	window.errMessage  = null;

	//ajax call ..
	$.ajax({
		global: false,
		type: 'POST',
		url: prmModule + '/jqGridJSON.json?ServiceName=' + prmServiceNm + '&' + prmTransitionNm + '=1',
		data: prmParam,
		dataType: prmDataType,
		async: true,
		success: function ( data ) {
			window.gwJsonResult = data;
			//fc_showLog( 3, ' <## Execute fc_submit Retrun ##> ' ,  window.gwJsonResult );
			fc_showLog( 3, ' <## Execute fc_submit Retrun ##> ' ,  'no display for performance. use external tool(ex.fiddler)' );
			if ( data.is_success ) {
				fc_setStatusMsg( data.statusMsg );
				window.gwJsonParam = new Object();
				result = true;
				window.isAjaxRun = false;
				callbackfunc(data, result);

				if ( !fc_isNull( data.displaymsg ) ) {
					fc_showMessageBox( data.displaymsg , 'I' );
					window.dispMessage = data.displaymsg;
				};
			} else {
				window.isAjaxRun = false;
				result = false;

				if ( !fc_isNull( data.exception_message) || !fc_isNull(data.exception_class)) {
					if ( isShowError ) {
						fc_setError( data.exception_class+':'+data.exception_message, data.exception_class+':'+data.exception_message );
					} else {
						window.errMessage = data.exception_class+':'+data.exception_message;
					}
				};
			};
		},
		error: function ( xhr, ajaxOptions, thrownError ) {			
			window.isAjaxRun = false;
			result = false;
			fc_setError( thrownError, xhr.responseText );
		},
	});
	return result;
}; // end of fc_submitCall



function fc_simpleSubmit ( type, prmServiceNm, prmTransitionNm, prmParam, prmDataType, prmModule, isShowError ) {
	var result = false;
	isShowError = fc_setValue( isShowError, true );

	prmServiceNm = $.trim( prmServiceNm );
	prmTransitionNm = $.trim( prmTransitionNm );

	fc_setDefaultParam( prmServiceNm );

	if ( prmParam    == undefined || prmParam    == '' ) prmParam    = window.gwJsonParam;
	if ( prmDataType == undefined || prmDataType == '' ) prmDataType = 'json';
	if ( prmModule   == undefined || prmModule   == '' ) prmModule   = defaultPath;
	window.gwJsonResult = new Object();

	if ( prmModule != defaultPath ) {
		prmModule = '/' + prmModule;
	};

	window.isAjaxRun   = true;
	window.dispMessage = null;
	window.errMessage  = null;

	$.ajax({
		global: false,
		type: 'POST',
		url: prmModule + '/jqGridJSON.json?ServiceName=' + prmServiceNm + '&' + prmTransitionNm + '=1',
		data: prmParam,
		dataType: prmDataType,
		async: false,
		success: function ( data ) {
			window.gwJsonResult = data;

			if ( data.is_success ) {
				fc_setStatusMsg( data.statusMsg );
				window.gwJsonParam = new Object();
				result = true;
				window.isAjaxRun = false;

				if ( !fc_isNull( data.displaymsg ) ) {
					window.dispMessage = data.displaymsg;
				};
			} else {
				window.isAjaxRun = false;
				result = false;

				if ( !fc_isNull( data.exception_message ) ) {
					window.errMessage = data.exception_message;
				};
			};
		},
		error: function ( xhr, ajaxOptions, thrownError ) {
			window.isAjaxRun = false;
			result = false;
		},
	});
	return result;
}; // end of fc_simpleSubmit
/**
 *
 * @param type
 * @param prmServiceNm
 * @param prmTransitionNm
 * @param prmParam
 * @param prmDataType
 * @param prmModule
 * @returns {Boolean}
 */
function fc_submit_file ( type, prmServiceNm, prmTransitionNm, prmParam, prmModule, prmDataType ) {
	var result = false;
	// set default parameters
	fc_setDefaultParam( prmServiceNm );

	if ( prmParam    == undefined || prmParam    == '' ) prmParam    = window.gwJsonParam;
	if ( prmDataType == undefined || prmDataType == '' ) prmDataType = 'json';
	if ( prmModule   == undefined || prmModule   == '' ) prmModule   = defaultPath;
	window.gwJsonResult = new Object();

	if ( prmModule != defaultPath ) {
		prmModule = '/' + prmModule;
	};
	// log
	fc_showLog( 3, 'Location path = ' + prmModule + ' // Service Name = ' + prmServiceNm +' // Transition Name = ' + prmTransitionNm );
	fc_showLog( 3, 'Param: ', window.gwJsonParam );
	window.isAjaxRun = true;
	//ajax call ..
	$.ajax({
		global: false,
		type: 'POST',
		url: prmModule + '/jqGridJSON.json?ServiceName=' + prmServiceNm + '&' + prmTransitionNm + '=1',
		data: prmParam,
		dataType: prmDataType,
		async: false,
		contentType: false,
		processData: false,
		success: function ( data ) {
			window.gwJsonResult = data;
			fc_showLog( 3, 'Ajax Result:', window.gwJsonResult );

			if (data.is_success) {
				fc_setStatusMsg( data.statusMsg );
				window.gwJsonParam = new Object();
				result = true;
				window.isAjaxRun = false;

				if ( !fc_isNull( data.displaymsg ) ) {
					fc_showMessageBox( data.displaymsg , 'I' );
				};
			} else {
				window.isAjaxRun = false;
				result = false;

				if ( !fc_isNull( data.exception_message ) ) {

					fc_setError( data.exception_message, data.exception_message );
				};
			};
		},
		error: function ( xhr, ajaxOptions, thrownError ) {
			window.isAjaxRun = false;
			result = false;
			fc_setError( thrownError, xhr.responseText );
		},
	});
	return result;
}; // end of fc_submit_file

/**
*
* @param type
* @param prmServiceNm
* @param prmTransitionNm
* @param prmParam
* @param prmDataType
* @param prmModule
* @returns {Boolean}
*/
function fc_submit_fileCall ( type, prmServiceNm, prmTransitionNm, prmParam, prmModule, prmDataType, callbackfunc ) {
	var result = false;
	// set default parameters
	fc_setDefaultParam( prmServiceNm );

	if ( prmParam    == undefined || prmParam    == '' ) prmParam    = window.gwJsonParam;
	if ( prmDataType == undefined || prmDataType == '' ) prmDataType = 'json';
	if ( prmModule   == undefined || prmModule   == '' ) prmModule   = defaultPath;
	window.gwJsonResult = new Object();

	if ( prmModule != defaultPath ) {
		prmModule = '/' + prmModule;
	};
	// log
	fc_showLog( 3, 'Location path = ' + prmModule + ' // Service Name = ' + prmServiceNm +' // Transition Name = ' + prmTransitionNm );
	fc_showLog( 3, 'Param: ', window.gwJsonParam );
	window.isAjaxRun = true;
	//ajax call ..
	$.ajax({
		global: false,
		type: 'POST',
		url: prmModule + '/jqGridJSON.json?ServiceName=' + prmServiceNm + '&' + prmTransitionNm + '=1',
		data: prmParam,
		dataType: prmDataType,
		async: true,
		contentType: false,
		processData: false,
		success: function ( data ) {
			window.gwJsonResult = data;
			fc_showLog( 3, 'Ajax Result:', window.gwJsonResult );

			if (data.is_success) {
				fc_setStatusMsg( data.statusMsg );
				window.gwJsonParam = new Object();
				result = true;
				window.isAjaxRun = false;
				
				callbackfunc(data, result);
				
				if ( !fc_isNull( data.displaymsg ) ) {
					fc_showMessageBox( data.displaymsg , 'I' );
				};
			} else {
				window.isAjaxRun = false;
				result = false;

				if ( !fc_isNull( data.exception_message ) ) {

					fc_setError( data.exception_message, data.exception_message );
				};
			};
		},
		error: function ( xhr, ajaxOptions, thrownError ) {
			window.isAjaxRun = false;
			result = false;
			fc_setError( thrownError, xhr.responseText );
		},
	});
	return result;
}; // end of fc_submit_file
/** -----------------------------------------------------------------------------
 * @Name			fc_applyLangJS
 * @Description	Apply Language JS
 * @Parameter		String langPath         : Language location
 * 					String defaultThemeName : default Language
 * @Returns
 * @Method
 * @Example		fc_applyLangJS( '<%=contextPath%>/include/js/jqGrid/js/i18n/', 'en' );
 * ---------------------------------------------------------------------------*/
function fc_applyLangJS ( langPath, langCd ) {
	var currentLang = $( 'script[src^="' + langPath + '"][src$="cultures.js"]' ).last();
	if ( currentLang.length == 0 ) return;

	currentLang[ 0 ].src = langPath + 'globalize.culture.' + langCd + '.js';
	$.ajax({
		  url: currentLang[ 0 ].src,
		  dataType: "script",
		  async:false,
		  success: function () {
			fc_showLog( 1, 'Javascript is loaded successful!' );
		  }
	});
}; // end of fc_applyLangJS
/**
 *
 * @param langId
 * @param valueSeq
 */
function fc_setLangId ( langId, valueSeq ) {
	var _valueSeq = ( valueSeq == undefined ) ? 0 : valueSeq;
	_valueSeq = _valueSeq.toString();
	var _langId = langId.toUpperCase().trim();
	if ( fc_isNull( window.gwLangParam[ _langId ] ) ) {
		window.gwLangParam[ _langId ] = _valueSeq;
	} else {
		if ( window.gwLangParam[ _langId ].indexOf( _valueSeq ) > -1 ) {
			return;
		} else {
			window.gwLangParam[ _langId ] = window.gwLangParam[ langId ] + _valueSeq;
		};
	};
}; // end of fc_setLangId
/**
 *
 * @returns
 */
function fc_getDefPgmId () {
	var arrCurrentUrl = window.location.href.split( '?' );
	var currentUrl = "", sPgmId = "";

	if ( $.isArray( arrCurrentUrl ) ) {
		currentUrl = arrCurrentUrl[ 0 ];
	};

	sPgmId = currentUrl.substring( currentUrl.lastIndexOf( '/' ) + 1, currentUrl.lastIndexOf( '.do' ) );
	if ( sPgmId == window.gwMesEnv.screen.reportMainPgmId ) {
		try {
			currentUrl = arrCurrentUrl[ 1 ];
			return currentUrl.substring( currentUrl.lastIndexOf( '/' ) + 1, currentUrl.indexOf( '\&' ) );
		} catch( e ) {
		};
	} else {
		return sPgmId;
	};
}; // end of fc_getDefPgmId
/**
 *
 * @param msgId
 * @returns
 */
function fc_getMultiMessage ( msgId, defMsg ) {
	try {
		if ( fc_isNull( msgId ) ) fc_setError( 'Message ID is required.', errStack );

		if ( window.gwMultiMessage.hasOwnProperty( msgId ) ) {
			return window.gwMultiMessage[ msgId.toUpperCase().trim() ];
		} else {
			if ( fc_isNull( defMsg ) )
				return window.gwMesEnv.lang.prefix + msgId;
			else
				return defMsg;
		};
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_getMultiMessage
/**
 *
 * @param formId
 * @returns
 */
function fc_convertFormToJson ( formId ) {
	var paramData = fc_setDefaultParam();
	$.each( $( 'input, select', '#' + formId ), function ( index ) {
		paramData[ $( this ).attr( 'id' ) ] = $( this ).val();
	});
	return paramData;
}; // end of fc_ConvertFormToJson
/**
 *
 * @param bFlag
 * @param progMsg
 */
function fc_progress ( bFlag, progMsg ) {
	//fc_showLog( 1, '************ Screen Enabled = ' + !bFlag );
	//console.log('###### fc_progress : '+  bFlag+' | '+window.isProgressRun+'/'+window.isAjaxRun+'/'+window.editFlag);
	if ( window.initProc.initFlag == false ) {
		if ( bFlag == false ) window.initProc.initFlag = true;
	};
	if ( window.isProgressRun == bFlag ){
		return;
	}
	if ( window.isAjaxRun == true ){
		return;
	}
	//console.log('###### fc_progress #### start : '+  bFlag);
	var progDialogId   = 'divGwProgDialog';
	$ ( 'body' ).enabled = !bFlag;
	window.isProgressRun = bFlag;
	
	$( '.ui-dialog-titlebar' ).hide();
	if ( progMsg == undefined ) progMsg = '';
	
	if ( bFlag ) {
		if ( !$( '#' + progDialogId ).length ) {
			$( 'body' ).append( '<div id="' + progDialogId + '" />' );
		} else {
			$( '#' + progDialogId ).children().remove();
		};

		$( 'body' ).prepend( '<div class="overlay"></div>' );
		$( '.overlay' ).css({
			'position': 'absolute',
			'width'   : $( document ).width(),
			'height'  : $( document ).height(),
			'z-index' : 99999,
			//'background-color': 'gray'
		}).fadeTo( 500, 0.8 );
		/*
		$('.overlay').fadeTo( 2000, 0.8, function() {
			$(this).css({
				'position': 'absolute',
				'width'   : $( document ).width(),
				'height'  : $( document ).height(),
				'z-index' : 99999,
				'background-color': 'gray'
			})
		});
		*/
		var opts = 	{
					lines  : 12, 		// The number of lines to draw
					length : 7, 		// The length of each line
					width  :  4, 		// The line thickness
					radius : 9, 		// The radius of the inner circle
					color  : '#000', 	// #rgb or #rrggbb
					speed  : 0.6, 		// Rounds per second
					trail  : 54, 		// Afterglow percentage
					shadow : false 		// Whether to render a shadow
					};
		var target1 = document.getElementById( progDialogId );
		spinner1 = new Spinner( opts ).spin( target1 );
		  
	} else {
		try{
			spinner1.stop();
			$( ".overlay" ).remove();
		}catch(e){
			
		}
		
	};
	
}; // end of fc_progress
/**
 *
 * @param objMenuTab
 * @returns
 */
function fc_getCurrentMenuId ( objMenuTab ) {
	try{
		var mainTabs = objMenuTab;
		var instance = mainTabs.getTabInstance();
		var currPageObjct = eval( 'instance.openTabList._' + instance.selectedItem );
		return currPageObjct.mnuId;
	} catch( e ) {
		return '';
	};
}; // end of fc_getCurrentMenuId
/**
 *
 * @param objMenuTab
 * @returns
 */
function fc_getCurrentTabPageInfo( objMenuTab ) {
	try{
		var mainTabs = objMenuTab;
		var instance = mainTabs.getTabInstance();
		var currPageObjct = eval( 'instance.openTabList._' + instance.selectedItem );
		return currPageObjct;
	} catch( e ) {
		return '';
	};
}; // end of fc_getCurrentTabPageInfo
/**
 *
 * @param bFlag
 */
function fc_showProgBar ( isShowProgBar ) {
	if ( isShowProgBar ) {
		fc_progress( true );
	} else {
		setTimeout( function () { fc_progress( false ); }, 0 );
	};
}; // end of fc_showProgBar
/**
 *
 */
function fc_resizeForm () {
	try {
		var messageArea = 10; //Bottom Padding Size
		if ( window.gwMesEnv.screen.isDefMessageArea ) {
			messageArea = $( "#divMessage" ).outerHeight( true );
		};

		var contentsHeight = $( window ).outerHeight( true ) - $( '#divTitle' ).outerHeight( true ) - $( '#divSearchCondition' ).outerHeight( true ) - messageArea;
		$( '#divContents' ).height( contentsHeight );
		
		//fc_makeTab() 함수로 객체를 생성 시, grid 리사이즈 관련 로직 추가
		if ( !fc_isNull( window.gwCustTab ) && !fc_isNull( window.gwCustTab.tabId ) ) {
			var tabId = window.gwCustTab.tabId;
			var tabCustTabObj = fc_getTabObj( tabId );
			
			var targetObjId = $("#"+tabId).parent("div").attr("id");
			var tabObjHeight = $( '#'+tabId ).height();
			
			var tabObjHeaderHeight = $("#"+tabId).children("div.jqx-tabs-header").outerHeight();
			
			var tabPages = $("#"+tabId).children("div.jqx-tabs-content").children("div.jqx-tabs-content-element").children("div");
			$.each( tabPages , function ( iloop, tabPageData ) {
				var tabpageId = $(this).attr("id");
				
				$( '#' + tabpageId ).height( tabObjHeight - tabObjHeaderHeight);
			});
		}
		
		$.each( window.gwGridSize , function ( iloop, gridSizeData ) {
			var instance = $( '#' + gridSizeData.name ).jqxGrid( 'getInstance' );
			
			if ( fc_isNull( gridSizeData.gridtype ) ) {
				instance.rungridresize( false );
			} else if ( gridSizeData.gridtype == 'tab' ) {
				instance.rungridresize( true, gridSizeData.gridtype );
			};
		});

		$.each( window.gwTreeGridSize , function ( iloop, gridSizeData ) {
			var wBorder = eval( $( '#' + gridSizeData.name).css( 'border-right-width' ).replace( 'px', '' ) ) + eval( $( '#' + gridSizeData.name).css( 'border-left-width'   ).replace( 'px', '' ) );
			var hBorder = eval( $( '#' + gridSizeData.name).css( 'border-top-width'   ).replace( 'px', '' ) ) + eval( $( '#' + gridSizeData.name).css( 'border-bottom-width' ).replace( 'px', '' ) );

			var parHeight = $( '#' + gridSizeData.name ).parent().height();
			var parWidth  = $( '#' + gridSizeData.name ).parent().width();

			if ( $( '#' + gridSizeData.name ).parent().hasClass( 'addpadding-left' ) ) {
				var marginLeft = $( '#' + gridSizeData.name ).parent().css( 'margin-left' );
				var perWidth = $( '#' + gridSizeData.name ).parent().getWidthInPercent();
				$( '#' + gridSizeData.name ).parent().css( 'margin-left', window.gwMesEnv.screen.paddingSize );
				$( '#' + gridSizeData.name ).parent().css( 'width', 'calc(' + perWidth + ' - ' + $( '#' + gridSizeData.name ).parent().css( 'margin-left' ) + ')');
				parWidth = $( '#' + gridSizeData.name ).parent().width() - ( marginLeft == '0px' ? window.gwMesEnv.screen.paddingSize : 0 );
			};
			if ( $( '#' + gridSizeData.name ).parent().hasClass( 'addpadding-top' ) ) {
				var marginTop = $( '#' + gridSizeData.name ).parent().css( 'margin-top' );
				var perHeight = $( '#' + gridSizeData.name ).parent().getHeightInPercent();
				$( '#' + gridSizeData.name ).parent().css( 'margin-top', window.gwMesEnv.screen.paddingSize );
				$( '#' + gridSizeData.name ).parent().css( 'height', 'calc(' + perHeight + ' - ' + $( '#' + gridSizeData.name ).parent().css( 'margin-top' ) + ')');
				parHeight = $( '#' + gridSizeData.name ).parent().height() - ( marginTop == '0px' ? window.gwMesEnv.screen.paddingSize : 0 );
			};
			var captionHeight  = fc_isNull( $( '#divCaption_' + gridSizeData.name ).height() ) ? 0 : $( '#divCaption_' + gridSizeData.name ).height();

			fc_setTreeGridWidth ( gridSizeData.name , parWidth  - wBorder - gridSizeData.wmargin );
			fc_setTreeGridHeight( gridSizeData.name , parHeight - hBorder - gridSizeData.hmargin - captionHeight );
		});
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_resizeForm
/**
 *
 * @param elementId
 */
function fc_resizeDivHeight ( elementId ) {
	try {
		$( window ).bind( 'resize', function () {
			var pHeight = 0;
			$.each( $( '#' + elementId ).parent().children(), function () {
				if ( this.id != elementId ) {
					var childHeight = 0;
					if ( $( this ).attr( 'grouptype' ) != 'group' ) {
						$.each( $( this ).children(), function () {
							if ( $( this ).attr( 'floattype' ) == 'left' ) {
								if ( childHeight == 0 ) childHeight = $( this ).outerHeight( true );
								else if ( childHeight < $( this ).outerHeight( true ) )  childHeight = $( this ).outerHeight( true );
							} else {
								childHeight += $( this ).outerHeight( true );
							};
						});
					} else {
						childHeight += $( this ).outerHeight( true );
					};

					if ( childHeight <= $( this ).outerHeight( true ) ) {
						pHeight += $( this ).outerHeight( true );
					} else {
						pHeight += childHeight;
					};
				};
			});
		    $( '#' + elementId ).css( 'height', '100%' ).css( 'height', '-=' + pHeight + 'px' );
		}).trigger( 'resize' );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_resizeDivHeight
/**
 *
 * @param arrElementId
 */
function fc_setDynamicDivHeight ( arrElementId ) {
	try {
		if ( $.isArray( arrElementId ) ) {
			$.each( arrElementId, function( index, value ) {
				fc_resizeDivHeight( value );
			});
		};
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_setDynamicDivHeight
/**
 *
 * @param targetObj
 * @returns {Number}
 */
function fc_getChildHeight ( targetObj ) {
	try {
		var childHeight = 0;
		$.each( targetObj.children(), function () {
			childHeight += $( this ).outerHeight( true );
		});

		return childHeight;
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_getChildHeight
/**
 *
 * @param elementId
 */
function fc_resizeDivWidth ( elementId ) {
	try {
		$( window ).bind('resize', function () {
			var pWidth = 0;
			$.each( $( '#' + elementId ).parent().children(), function () {
				if ( this.id != elementId ) {
					pWidth += $( this ).outerWidth( true );
				};
			});
		    $( '#' + elementId ).css( 'width', '100%' ).css( 'width', '-=' + pWidth + 'px' );
		}).trigger( 'resize' );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_resizeDivWidth
/**
 *
 * @param arrElementId
 */
function fc_setDynamicDivWidth ( arrElementId ) {
	try {
		if ( $.isArray( arrElementId ) ) {
			$.each( arrElementId, function( index, value ) {
				fc_resizeDivWidth( value );
			});
		};
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_setDynamicDivWidth
/**
 *
 * @param elementId
 * @param datatype
 * @returns
 */
function fc_checkDatatype ( elementId, datatype ) {
	try {
		var eleObj, _datatype;
		var obj = elementId.split('.');

		if ( ( obj[ 1 ] == undefined ) ) {
			eleObj = document.getElementById( elementId );
			_datatype = eleObj.getAttribute( window.gwMesEnv.item.datatype );
		} else {
			eleObj = $( '#' + obj[ 0 ] );
			var cm = fc_getGridColModel( obj[ 0 ] );
			var iCol = fc_getColIndexbyName( obj[ 0 ], obj[ 1 ] );
			_datatype = cm[ iCol ].datatype;
		};
		return ( _datatype != datatype ) ? false : true;
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_checkDatatype
/**
 *
 */
function fc_getGirdLovValue ( gridId, fieldNm, codeValue ) {
	try {
		var codeObj = new Object();
		var fieldObj = fc_getGridColField( gridId, fieldNm );

		if ( fieldObj.datatype == 'chklov' ) {
			codeObj.value = codeValue;
			codeObj.label = codeValue;
		} else {
			var dispFieldObj = fc_getGridColField( gridId, 'DISP_' + fieldNm );
			$.each( dispFieldObj.values.source, function ( index, item ) {
				if ( item.CD_VAL == codeValue ) {
					codeObj.value = item.CD_VAL;
					codeObj.label = item.CD_NM;
				};
			});
		};
		return codeObj;
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_getGirdLovValue
/**
 *
 * @param code
 * @param arrCodeData
 */
function fc_getCustLovData ( code, arrCodeData ) {
	window.gwCodeResult[ code ] = arrCodeData;
}; // end of fc_getCustLovData
/**
 *
 * @param sId
 */
function fc_clearSearchCondition( sId ) {
	sId = fc_setValue( sId, 'divSearchCondition' );
	try {
		$.each( $( '.formValueCheck', '#' + sId ), function ( index ) {
			fc_setInputVal( $( this ).attr( 'id' ), '' );
		});
	} catch ( e ) { };
}; // end of fc_clearSearchCondition
/**
 *
 */
function fc_clearChildGrid( gridId ) {
	try {
		for ( var loop=0;loop<window.gwGrid.length;loop++ ) {
			if ( window.gwGrid[ loop ].id == gridId && window.gwGrid[ loop ].hasChild ) {
				var arrGrid = window.gwGrid[ loop ].child.split( ',' );
				for ( var iloop=0;iloop<arrGrid.length;iloop++ ) {
					fc_clearGridData( arrGrid[ iloop ] );
				};
			};
		};
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_clearChildGrid
/**
 *
 * @param gridId
 * @returns {Boolean}
 */
function fc_checkParentGridSelected ( gridId ) {
	try {
		for ( var loop = 0; loop<window.gwGrid.length; loop++ ) {
			if ( window.gwGrid[ loop ].id == gridId && window.gwGrid[ loop ].hasParent ) {
				var selRow = fc_getSelRow( window.gwGrid[ loop ].parent );
				if ( fc_isNull( selRow ) || selRow == -1 ) {
					throw new Error( window.gwMessage.validate.noselectpar );
					return false;
				};
			};
		};
		return true;
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_checkParentGridSelected
/**
 *
 * @param formId
 */
function fc_addParamForm( formId ) {
	try {
		$.each( $( '.formValueCheck', '#' + formId ), function ( index ) {
			var _value = $( this ).val();
			if ( $( this ).attr( 'type' ) == 'radio' ) {
				_value = $( 'input:radio[name="' + $( this ).attr( 'name' ) + '"]:checked' ).val();
			} else if ( $( this ).attr( 'category' ) == 'radio') {
				_value = fc_getRadioVal( $( this ).attr( 'id' ) );
			};
			if ( $( this ).attr( 'type' ) == 'checkbox' ) {
				_value  = 'N';
				if($( this ).val() == true) _value  = 'Y';
			};
			// validation: mandatory value
			if ( $( this ).hasClass( window.gwClass.required ) ) {
				var eleCaption = '';
				try {
					if ( $( '#' + formId ).find( 'label[for="' + $( this ).attr( 'id' ) + '"]' ) .length > 0 ) {
						eleCaption = $( '#' + formId ).find( 'label[for="' + $( this ).attr( 'id' ) + '"]' ).text();
					} else {
						var msgArr = $( this ).attr( 'labelname' ).split( ',' );
						$.each( msgArr, function( idx, value ) {
							if ( idx == 0 ) {
								eleCaption += $( '#' + formId ).find( 'div[name="' + value + '"]' ).eq( 0 ).text() ;
							} else {
								eleCaption += '  [ ' + $( '#'+formId ).find( 'div[name="' + value + '"]' ).eq( 0 ).text()+ ' ]' ;
							};
						});
					};
				} catch (e) {
					eleCaption = $( this ).attr( 'id' );
				};
				var result = fc_checkMandatoryEntry( _value, eleCaption );
				if ( result[ 0 ] == false ) {
					 throw new Error( result[ 1 ] );
				};
			};
			// validation: min/max
			if ( $( this ).attr( 'category' ) == 'number' ) {
				if ( !fc_isNull( $( this ).attr( 'minvalue' ) ) || !fc_isNull( $( this ).attr( 'maxvalue' ) ) ) {
					var eleCaption = '';
					try {
						if ( $( '#' + formId ).find( 'label[for="' + $( this ).attr( 'id' ) + '"]') .length > 0 ) {
							eleCaption = $( '#' + formId ).find( 'label[for="' + $( this ).attr( 'id' ) + '"]' ).text();
						} else {
							var msgArr = $( this ).attr( 'labelname' ).split(',');
							$.each( msgArr, function( idx, value ) {
								if( idx == 0 ) {
									eleCaption += $( '#' + formId ).find( 'div[name="' + value + '"]' ).eq( 0 ).text() ;
								}else {
									eleCaption += '  [ ' + $( '#' + formId ).find( 'div[name="' + value + '"]' ).eq( 0 ).text()+ ' ]' ;
								};
							});
						};
					} catch ( e ) {
						eleCaption = $( this ).attr( 'id' );
					};
					var result, msg;
					if ( !fc_isNull( $( this ).attr( 'minvalue' ) ) && !$( this ).attr( 'minvalue' ) ) {
						result = fc_checkMinEntry( Number( _value ), Number( $( this ).attr( 'minvalue' ) ) );
						if ( result[ 0 ] == false ) {
							msg = '<br>' + eleCaption + ' : ' + _value + '<br>' + window.gwMessage.caption.min + ' : '+ $( this ).attr( 'minvalue' );
							throw new Error( result[ 1 ] + msg );
						};
					};
					if ( !fc_isNull( $( this ).attr( 'maxvalue' ) ) && !$( this ).attr( 'maxvalue' ) ) {
						result = fc_checkMaxEntry( Number( _value ), Number( $( this ).attr( 'maxvalue' ) ) );
						if ( result[ 0 ] == false ) {
							msg = '<br>' + eleCaption + ' : ' + _value + '<br>' + window.gwMessage.caption.max + ' : '+ $( this ).attr( 'maxvalue' );
							throw new Error( result[ 1 ] + msg );
						};
					};
				};
			};
			// validation: range value
			for ( var loop=0;loop<window.gwChkFormRange.length;loop++ ) {
				var _id      = $( this ).attr( 'id' );
				var objChk   = window.gwChkFormRange[ loop ];
				var _frObj   = objChk[ 'fromvalue' ];
				var _toObj   = objChk[ 'tovalue'   ];
				var _isEqual = objChk[ 'isequal'   ];
				if ( fc_isNull( _isEqual ) ) _isEqual = true;

				if ( _id == _frObj || _id == _toObj ) {
					var _type  = objChk[ 'datatype'  ];
					var _frValue = fc_getInputVal( _frObj );
					var _toValue = fc_getInputVal( _toObj );
					var result = fc_checkRange( _type, _frValue, _toValue, _isEqual );
					if ( result[ 0 ] == false ) {
						var msgid = objChk[ 'msgid' ];
						_frObj = ( fc_isNull( objChk[ 'fromitemCd' ] ) ) ? objChk[ 'fromvalue' ] : objChk[ 'fromitemCd' ];
						_toObj = ( fc_isNull( objChk[ 'toitemCd'   ] ) ) ? objChk[ 'tovalue'   ] : objChk[ 'toitemCd'   ];
						msg = ( fc_isNull( msgid ) ) ? result[ 1 ] : fc_getMessage( msgid, _frObj, _toObj );
						msg = msg + '<br>' + fc_getMultiItem( _frObj ) + ' : ' + _frValue + '<br>' + fc_getMultiItem( _toObj ) + ' : '+ _toValue;
						throw new Error( msg );
					};
					break;
				}; // end of if ( _id == _frObj || _id == _toObj ) {
			}; // end of for ( var loop=0;loop<window.gwChkFormRange.length;loop++ ) {

			// upper/lower case
			// convert data to server type
			if ( $( this ).attr( 'type' ) == 'radio' ) {
				window.gwJsonParam[ $( this ).attr( 'name' ) ] = fc_convertServerFormat( $( this ).attr( 'category' ), $( this ).attr( 'datatype' ), _value );
			} else if ( $( this ).attr( 'category' ) == 'radio' ) {
				window.gwJsonParam[ $( this ).attr( 'id' ) ] =  fc_convertServerFormat( $( this ).attr( 'category' ), $( this ).attr( 'datatype' ), _value );
			} else if ( $( this ).attr( 'category' ) == 'date') {
				window.gwJsonParam[ $( this ).attr( 'id' ) ] = fc_convertServerFormat( $( this ).attr( 'category' ), $( this ).attr( 'datatype' ), $( this ).jqxDateTimeInput( 'getDate' ) );
			} else {
				if ( fc_isNull( $( this ).attr( 'id' ) ) ) window.gwJsonParam[ $( this ).attr( 'name' ) ] = fc_convertServerFormat( $( this ).attr( 'category' ), $( this ).attr( 'datatype' ), _value );
				else window.gwJsonParam[ $( this ).attr( 'id' ) ] = fc_convertServerFormat( $( this ).attr( 'category' ), $( this ).attr( 'datatype' ), _value );
			};
	    });
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_addParamForm
/**
 *
 * @param prmGridId
 * @param arrColNm
 */
function fc_addParamGrid( prmGridId, arrColNm ) {
	try {
		var cm = fc_getGridColModel( prmGridId );
		var selRow = fc_getSelRow( prmGridId );
		if ( fc_isNull( selRow ) ) {
			throw new Error( window.gwMessage.validate.noselectrow );
		};
		var rowData = fc_getRowData( prmGridId, selRow );
		for ( var loop = 0; loop<arrColNm.length; loop++ ) {
			// validation: mandatory,min,max value
			var colObj = fc_getColProps ( prmGridId, arrColNm[ loop ] );
			var cellValue = fc_getCellData( prmGridId, selRow, arrColNm[ loop ] );
			if ( !fc_isNull( colObj.nullable ) && !colObj.nullable ) {
				var result = fc_checkMandatoryEntry( cellValue, colObj.text );
				if ( result[ 0 ] == false ) {
					 throw new Error( result[ 1 ] );
				};
			};
			// validation: min/max
			var colIndex = fc_getColIndexbyName( prmGridId, arrColNm[ loop ] );
			var colType  = cm[ colIndex ].type;
			if ( colType == 'number' ) {
				var _minvalue = cm[ colIndex ].minvalue;
				var _maxvalue = cm[ colIndex ].maxvalue;

				var result, msg;
				if ( !fc_isNull( _minvalue ) ) {
					result = fc_checkMinEntry( cellValue, Number( _minvalue ) );
					if ( result[ 0 ] == false ) {
						msg = '<br>' + colObj.text + ' : ' + cellValue + '<br>' + window.gwMessage.caption.min + ' : '+ _minvalue;
						throw new Error( result[ 1 ] + msg );
					};
				};
				if ( !fc_isNull( _maxvalue ) ) {
					result = fc_checkMaxEntry( cellValue, Number( _maxvalue ) );
					if ( result[ 0 ] == false ) {
						msg = '<br>' + colObj.text + ' : ' + cellValue + '<br>' + window.gwMessage.caption.max + ' : '+ _maxvalue;
						throw new Error( result[ 1 ] + msg );
					};
				};
			};
			// check range value
			if ( !fc_isNull( window.gwChkGridRange[ prmGridId ] ) ) {
				for ( var loop=0;loop<window.gwChkGridRange[ prmGridId ].length;loop++ ) {
					for ( var k=0;k<window.gwChkGridRange[ prmGridId ].length;k++ ) {
						var objChk   = window.gwChkGridRange[ prmGridId ][ k ];
						var _type    = objChk[ 'datatype'  ];
						var _frObj   = objChk[ 'fromvalue' ];
						var _toObj   = objChk[ 'tovalue'   ];
						var _isEqual = objChk[ 'isequal'   ];
						if ( fc_isNull( _isEqual ) ) _isEqual = true;

						if ( arrColNm[ loop ] == _frObj || arrColNm[ loop ] == _toObj ) {
							var result = fc_checkRange( _type, rowData[ _frObj ], rowData[ _toObj ], _isEqual );
							if ( result[ 0 ] == false ) {
								var msgid = objChk[ 'msgid' ];
								_frObj = ( fc_isNull( objChk[ 'fromitemCd' ] ) ) ? objChk[ 'fromvalue' ] : objChk[ 'fromitemCd' ];
								_toObj = ( fc_isNull( objChk[ 'toitemCd'   ] ) ) ? objChk[ 'tovalue'   ] : objChk[ 'toitemCd'   ];
								msg = ( fc_isNull( msgid ) ) ? result[ 1 ] : fc_getMessage( msgid, _frObj, _toObj );
								msg = msg + '<br>' + fc_getMultiItem( _frObj ) + ' : ' + rowData[ _frObj ] + '<br>' + fc_getMultiItem( _toObj ) + ' : '+ rowData[ _toObj ];
								throw new Error( msg );
							}; // end of if ( result[ 0 ] == false ) {
						}; // end of if ( arrColNm[ loop ] == _frObj || arrColNm[ loop ] == _toObj ) {
					}; // end of for ( var k=0;k<window.gwChkGridRange[ prmGridId ].length;k++ ) {
				}; // end of for ( var loop=0;loop<window.gwChkGridRange[ prmGridId ].length;loop++ ) {
			}; // end of if ( !fc_isNull( window.gwChkGridRange[ prmGridId ] ) ) {
			// convert data to server type
			window.gwJsonParam[ arrColNm[ loop ] ] = fc_convertServerFormat( arrColNm[ loop ].type, arrColNm[ loop ].datatype, rowData[ arrColNm[ loop ] ] );
		}; // end of
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_addParamGrid
/**
 *
 */
function fc_setFormData( targetFormId, prmKeyResult ) {
	var keyBackspace = jQuery.Event( 'keydown', { keyCode: 8 } );

	try {
		var tempObj = new Object();
		tempObj = window.gwJsonResult[ prmKeyResult ];
		var tempObjLength = ( fc_isNull( tempObj ) ) ? 0 : tempObj.length;

		$.each( $( '.formValueCheck', $( '#' + targetFormId ) ), function ( index ) {
			var inputdata = $( this );
			var _id = inputdata.attr( 'id' );
			if ( tempObjLength == 0 ) {
				if( $( this ).attr( 'datatype' ) == 'button' ) {
					return true;
				};
				fc_setInputVal( _id, '' );
			} else {
				$.each( tempObj, function( kloop, rowData ) {
					fc_setInputVal( _id, rowData[ _id ] );
				});
			};
		});
		fc_setEditFlag( false );
	} catch ( e ) {
		fc_getException( e );
		return false;
	};
	return true;
}; // end of fc_setFormData
/**
 *
 * @param arrTargetModel
 * @returns {Boolean}
 */
function fc_setGridData( arrTargetModel ) {
	try {
		$.each( arrTargetModel, function( iloop, modelData ) {
			fc_clearChildGrid( modelData.gridId );
		});
		$.each( arrTargetModel, function( iloop, modelData ) {
			var groupable = fc_getGridGroupable( modelData.gridId );
			var groups    = fc_getGridGroups( modelData.gridId );

			var tempObj = new Object();
			tempObj.rows = window.gwJsonResult[ modelData.resultKey.trim() ];
			fc_setGridlocalData( modelData.gridId, window.gwJsonResult[ modelData.resultKey.trim() ], modelData.merge, modelData.defaultRow, modelData.speedUp);
						
			if ( groupable ) {
				fc_addGridGroup( modelData.gridId, groups );
				//fc_expandAllGridGroups( modelData.gridId );
			};
		});
	} catch (e) {
		fc_getException( e );
		return false;
	};
	return true;
}; // end of fc_setGridData
/**
 *
 * @param arrTargetModel
 * @returns {Boolean}
 */
function fc_setTreeGridData( arrTargetModel ) {
	try {
		$.each( arrTargetModel, function( iloop, modelData ) {
			fc_clearChildGrid( modelData.gridId );
		});

		$.each( arrTargetModel, function( iloop, modelData ) {
			if ( !fc_isNull( window.gwJsonResult[ modelData.resultKey.trim() ] ) ) {
				var tempObj = new Object();
				tempObj.rows = window.gwJsonResult[ modelData.resultKey.trim() ];
				fc_setTreeGridlocalData( modelData.gridId, window.gwJsonResult[ modelData.resultKey.trim() ] );
			};
		});
	} catch ( e ) {
		fc_getException( e );
		return false;
	};
	return true;
}; // end of fc_setTreeGridData
/**
 *
 * @param arrFormId
 */
function fc_addFormDataSet( arrFormId ) {
	try {
		for (var iLoop = 0; iLoop<arrFormId.length; iLoop++ ) {
			fc_addParamForm( arrFormId[ iLoop ] );
		};
	} catch ( e ) {
		fc_getException( e );
	};
}// end of fc_addFormDataSet
/**
 *
 * @param arrSrcGrid
 * @param addParam
 * @param checkSelected
 */
function fc_addParamGridSet( arrSrcGrid, addParam, checkSelected ) {
	fc_addGridDataSet( arrSrcGrid, addParam, window.gwMesEnv.grid.updateFlag, checkSelected );
}; // end of fc_addParamGridSet
/**
 *
 * @param arrSrcGrid
 * @param addParam
 * @param cudFlag
 * @param checkSelected
 * @returns {Boolean}
 */
function fc_addGridDataSet( arrSrcGrid, addParam, cudFlag, checkSelected ) {
	try {
		var bResult = false;
		checkSelected   = fc_setValue( checkSelected, 'Y' );
		if ( $.isArray( arrSrcGrid ) ) {
			var arrLen = arrSrcGrid.length;
			var obj    = new Object();
			var arrKey = new Array();
			var selectRowCnt = 0;

			for ( var iLoop=0;iLoop<arrLen;iLoop++ ) {// Loop Array Grid
				// remove filter data for lov type columname
				fc_setGridComboFilterSwitch( arrSrcGrid[ iLoop ], false );

				var objKey    = new Object();
				var arrResult = new Array();

				var selRows = fc_getSelectedRow( arrSrcGrid[ iLoop ] );// Get SelectRow
				selectRowCnt += selRows.length;

				var cm = fc_getGridColModel( arrSrcGrid[ iLoop ] );
				for ( var sLoop=0;sLoop<selRows.length;sLoop++ ) {// Loop Set Row Data & AddParam Data
					var rowData = fc_getRowData( arrSrcGrid[ iLoop ], selRows[ sLoop ] );
					var sendData = new Object();

					for ( var jloop=0;jloop<cm.length;jloop++ ) {
						// ***** validation: mandatory value
						var field = cm[ jloop ].name;
						var type  = cm[ jloop ].type;
						var cellValue = rowData[ field ];
						//if ( !fc_isNull( cellValue ) ) cellValue = $.trim( cellValue );
						var colObj = fc_getColProps( arrSrcGrid[ iLoop ], field );
						if ( !fc_isNull( colObj.nullable ) && !colObj.nullable ) {
							var result = fc_checkMandatoryEntry( cellValue, colObj.text );
							if ( result[ 0 ] == false ) {
								fc_setGridComboFilterSwitch( arrSrcGrid[ iLoop ], true );
								throw new Error( result[ 1 ] );
							};
						}; // end of if ( !fc_isNull( colObj.nullable ) && !colObj.nullable ) {

						// ****** validation: min/max
						if ( type == 'number' ) {
							var _minvalue = cm[ jloop ].minvalue;
							var _maxvalue = cm[ jloop ].maxvalue;

							var result, msg;
							if ( !fc_isNull( _minvalue ) ) {
								result = fc_checkMinEntry( cellValue, Number( _minvalue ) );
								if ( result[ 0 ] == false ) {
									msg = '<br>' + colObj.text + ' : ' + cellValue + '<br>' + window.gwMessage.caption.min + ' : '+ _minvalue;
									throw new Error( result[ 1 ] + msg );
								};
							};
							if ( !fc_isNull( _maxvalue ) ) {
								result = fc_checkMaxEntry( cellValue, Number( _maxvalue ) );
								if ( result[ 0 ] == false ) {
									msg = '<br>' + colObj.text + ' : ' + cellValue + '<br>' + window.gwMessage.caption.max + ' : '+ _maxvalue;
									throw new Error( result[ 1 ] + msg );
								};
							};
						}; // end of if ( type == 'number' ) {
						if ( ( field != 'JQX_RS' && field != 'JQX_CB' && field != 'JQX_RN' ) && ( type == 'date' || type == 'number' || type == 'bool') ) {
							sendData [ field ] = fc_convertServerFormat( type, cm[ jloop ].datatype, cellValue );
						} else {
							sendData [ field ] = cellValue;
						};
					};
					// ***** check range value
					if ( !fc_isNull( window.gwChkGridRange[ arrSrcGrid[ iLoop ] ] ) ) {
						for ( var loop=0;loop<window.gwChkGridRange[ arrSrcGrid[ iLoop ] ].length;loop++ ) {
							for ( var k=0;k<window.gwChkGridRange[ arrSrcGrid[ iLoop ] ].length;k++ ) {
								var objChk   = window.gwChkGridRange[ arrSrcGrid[ iLoop ] ][ k ];
								var _type    = objChk[ 'datatype'  ];
								var _frObj   = objChk[ 'fromvalue' ];
								var _toObj   = objChk[ 'tovalue'   ];
								var _isEqual = objChk[ 'isequal'   ];
								if ( fc_isNull( _isEqual ) ) _isEqual = true;
								var result = fc_checkRange( _type, rowData[ _frObj ], rowData[ _toObj ], _isEqual );
								if ( result[ 0 ] == false ) {
									var msgid = objChk[ 'msgid' ];
									_frObj = ( fc_isNull( objChk[ 'fromitemCd' ] ) ) ? objChk[ 'fromvalue' ] : objChk[ 'fromitemCd' ];
									_toObj = ( fc_isNull( objChk[ 'toitemCd'   ] ) ) ? objChk[ 'tovalue'   ] : objChk[ 'toitemCd' ];
									msg = ( fc_isNull( msgid ) ) ? result[ 1 ] : fc_getMessage( msgid, _frObj, _toObj );
									msg = msg + '<br>' + fc_getMultiItem( _frObj ) + ' : ' + rowData[ _frObj ] + '<br>' + fc_getMultiItem( _toObj ) + ' : '+ rowData[ _toObj ];
									throw new Error( msg );
								}; // end of if ( result[ 0 ] == false ) {
							}; // end of for ( var k=0;k<window.gwChkGridRange[ arrSrcGrid[ iLoop ] ].length;k++ ) {
						}; // end of for ( var loop=0;loop<window.gwChkGridRange[ arrSrcGrid[ iLoop ] ].length;loop++ ) {
					}; // end of if ( !fc_isNull( window.gwChkGridRange[ arrSrcGrid[ iLoop ] ] ) ) {

					// set row status value
					if ( fc_isNull( sendData[ 'JQX_RS' ] ) &&  !fc_isNull( cudFlag ) ) {
						if ( cudFlag == window.gwMesEnv.grid.delFlag ) {
							sendData[ 'JQX_RS' ] = window.gwMesEnv.grid.delFlag;
						} else if ( cudFlag == window.gwMesEnv.grid.updateFlag ) {
							sendData[ 'JQX_RS' ] = window.gwMesEnv.grid.updateFlag;
						};
					};
					// set addional parameter informatin to key structure
					for ( var _key in addParam ) {
						sendData[ _key ] = addParam[ _key ];
					};
					arrResult[ sLoop ] = sendData;
				}; // end of for ( var sLoop = 0; sLoop < selRows.length; sLoop++ ) {

				// Set Key Object
				var gridKey = fc_getExtraOption( arrSrcGrid[iLoop], 'gridKey' );
				objKey[ 'key' ] = ( fc_isNull( gridKey ) ) ? arrSrcGrid[ iLoop ] : gridKey;
				obj[ gridKey ] = arrResult;

				arrKey[ iLoop ] = objKey;
			}; // end of for ( var iLoop = 0; iLoop < arrLen; iLoop++ ) {

			if ( checkSelected == 'Y' && selectRowCnt == 0 ) {
				throw new Error( window.gwMessage.validate.noselectrow );
				return bResult;
			};
			window.gwJsonParam[ 'gwSendData' ] = JSON.stringify( obj );
			window.gwJsonParam[ 'gwKeyList'  ] = JSON.stringify( { gwKeyList: arrKey, } ) ;

			bResult = true;
		} else {
			throw new Error( window.gwMessage.validate.noarray );
		};
		return bResult;
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_addGridDataSet
/**
 *
 * @param arrSrcGrid
 * @param addParam
 * @param cudFlag
 * @param checkSelected
 * @returns {Boolean}
 */
function fc_addTreeGridDataSet( arrSrcGrid, addParam, cudFlag, checkSelected ) {
	try {
		var bResult = false;
		checkSelected   = fc_setValue( checkSelected, 'Y' );

		if ( $.isArray( arrSrcGrid ) ) {
			var arrLen = arrSrcGrid.length;
			var obj    = new Object();
			var arrKey = new Array();
			var selectRowCnt = 0;

			for ( var iLoop = 0; iLoop < arrLen; iLoop++ ) {// Loop Array Grid
				var objKey = new Object();
				var arrResult = new Array();

				var selRows = fc_getTreeGridSelectedRow( arrSrcGrid[ iLoop ] );// Get SelectRow
				selectRowCnt += selRows.length;

				var cm = fc_getTreeGridColModel( arrSrcGrid[ iLoop ] );

				for ( var sLoop = 0; sLoop < selRows.length; sLoop++ ) {// Loop Set Row Data & AddParam Data
					var rowData = fc_getTreeGridRowData( arrSrcGrid[ iLoop ], selRows[ sLoop ] );
					var sendData = new Object();

					for ( var jloop=0;jloop<cm.length;jloop++ ) {
						// ***** validation: mandatory value
						var field = cm[ jloop ].name;
						var type  = cm[ jloop ].type;
						var cellValue = rowData[ field ];
						if ( !fc_isNull( cellValue ) ) cellValue = $.trim( cellValue );
						var colObj = fc_getTreeGridColProps( arrSrcGrid[ iLoop ], field );
						if ( !fc_isNull(colObj.nullable) && !colObj.nullable ) {
							var result = fc_checkMandatoryEntry( cellValue, colObj.text );
							if ( result[ 0 ] == false ) {
								throw new Error( result[ 1 ] );
							};
						}; // end of if ( !fc_isNull(colObj.nullable) && !colObj.nullable ) {

						// ****** validation: min/max
						if ( type == 'number' ) {
							var _minvalue = cm[ jloop ].minvalue;
							var _maxvalue = cm[ jloop ].maxvalue;

							var result, msg;
							if ( !fc_isNull( _minvalue ) ) {
								result = fc_checkMinEntry( cellValue, Number( _minvalue ) );
								if ( result[ 0 ] == false ) {
									msg = '<br>' + colObj.text + ' : ' + cellValue + '<br>' + window.gwMessage.caption.min + ' : '+ _minvalue;
									throw new Error( result[ 1 ] + msg );
								};
							};
							if ( !fc_isNull( _maxvalue ) ) {
								result = fc_checkMaxEntry( cellValue, Number( _maxvalue ) );
								if ( result[ 0 ] == false ) {
									msg = '<br>' + colObj.text + ' : ' + cellValue + '<br>' + window.gwMessage.caption.max + ' : '+ _maxvalue;
									throw new Error( result[ 1 ] + msg );
								};
							};
						}; // end of if ( type == 'number' ) {

						if ( ( field != 'JQX_RS' && field != 'JQX_CB' && field != 'JQX_RN' ) && ( type == 'date' || type == 'number' || type == 'bool') ) {
							sendData [ field ] = fc_convertServerFormat( type, cm[ jloop ].datatype, cellValue );
						} else {
							sendData [ field ] = cellValue;
						};
					}; // end of for ( var jloop =0; jloop<cm.length; jloop++ ) {

					// ***** check range value
					if ( !fc_isNull( window.gwChkGridRange[ arrSrcGrid[ iLoop ] ] ) ) {
						for ( var loop=0;loop<window.gwChkGridRange[ arrSrcGrid[ iLoop ] ].length;loop++ ) {
							for ( var k=0;k<window.gwChkGridRange[ arrSrcGrid[ iLoop ] ].length;k++ ) {
								var objChk   = window.gwChkGridRange[ arrSrcGrid[ iLoop ] ][ k ];
								var _type    = objChk[ 'datatype'  ];
								var _frObj   = objChk[ 'fromvalue' ];
								var _toObj   = objChk[ 'tovalue'   ];
								var _isEqual = objChk[ 'isequal'   ];
								if ( fc_isNull( _isEqual ) ) _isEqual = true;

								var result = fc_checkRange( _type, rowData[ _frObj ], rowData[ _toObj ], _isEqual );
								if ( result[ 0 ] == false ) {
									var msgid = objChk[ 'msgid' ];
									_frObj = ( fc_isNull( objChk[ 'fromitemCd' ] ) ) ? objChk[ 'fromvalue' ] : objChk[ 'fromitemCd' ];
									_toObj = ( fc_isNull( objChk[ 'toitemCd'   ] ) ) ? objChk[ 'tovalue'   ] : objChk[ 'toitemCd' ];
									msg = ( fc_isNull( msgid ) ) ? result[ 1 ] : fc_getMessage( msgid, _frObj, _toObj );
									msg = msg + '<br>' + fc_getMultiItem( _frObj ) + ' : ' + rowData[ _frObj ] + '<br>' + fc_getMultiItem( _toObj ) + ' : '+ rowData[ _toObj ];
									throw new Error( msg );
								}; // end of if ( result[ 0 ] == false ) {
							}; // end of for ( var k=0;k<window.gwChkGridRange[ arrSrcGrid[ iLoop ] ].length;k++ ) {
						}; // end of for ( var loop=0;loop<window.gwChkGridRange[ arrSrcGrid[ iLoop ] ].length;loop++ ) {
					}; // end of if ( !fc_isNull( window.gwChkGridRange[ arrSrcGrid[ iLoop ] ] ) ) {

					if ( fc_isNull( sendData[ 'JQX_RS' ] ) && !fc_isNull( cudFlag ) ) {
						if ( cudFlag == window.gwMesEnv.grid.delFlag ) {
							sendData[ 'JQX_RS' ] = window.gwMesEnv.grid.delFlag;
						} else if ( cudFlag == window.gwMesEnv.grid.updateFlag ) {
							sendData[ 'JQX_RS' ] = window.gwMesEnv.grid.updateFlag;
						};
					};
					// set addional parameter informatin to key structure
					for ( var _key in addParam ) {
						sendData[ _key ] = addParam[ _key ];
					};
					arrResult[ sLoop ] = sendData;
				}; // end of for ( var sLoop = 0; sLoop < selRows.length; sLoop++ ) {
				// Set Key Object
				var gridKey = fc_getTreeGridExtraOption( arrSrcGrid[iLoop], 'treeGridKey' );
				objKey[ 'key' ] = ( fc_isNull( gridKey ) ) ? arrSrcGrid[ iLoop ] : gridKey;
				obj[ gridKey ] = arrResult;
				arrKey[ iLoop ] = objKey;
			}; // end of for (var iLoop = 0; iLoop < arrLen; iLoop++) {
			if ( checkSelected == 'Y' && selectRowCnt == 0 ) {
				throw new Error( window.gwMessage.validate.noselectrow );
				return bResult;
			};
			window.gwJsonParam[ 'gwSendData' ] = JSON.stringify( obj );
			window.gwJsonParam[ 'gwKeyList'  ] = JSON.stringify( { gwKeyList: arrKey, } ) ;

			bResult = true;
		} else {
			throw new Error( window.gwMessage.validate.noarray );
		};
		return bResult;
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_addTreeGridDataSet
/**
 *
 * @param treeId
 * @param node
 * @returns {Boolean}
 */
function fc_addTreeDataSet ( treeId, node ) {
	try {
		fc_setNewMenuCd( treeId, node );

		var jsonData = fc_getTreeJsonData( treeId, node, { 'flat' : true } );
		var obj;
		var arrObj = new Array();

		$.each( jsonData, function ( idx, data ) {
			var parentData = fc_getTreeNode( treeId, data.parent );
			var arrindex = new Array();
			$.each( parentData.children, function ( i, parentData ) {
				arrindex[parentData] = i+1;
			});

			obj = new Object();
			obj[ 'OWNER_ID' ] = 'SYSTEM';
			obj[ 'MNU_CD'   ] = data.id;
			obj[ 'MNU_NM'   ] = data.text;
			obj[ 'DISP_SEQ' ] = arrindex[ data.id ].toString();

			var parentStr = '';
			if ( data.parent != '#' ) parentStr = data.parent;
			obj[ 'PARENT_MNU_CD' ] = parentStr;

			var dataid = data.data;
			if ( dataid === null ) dataid = fc_getNewMenuId( 'menutree' );
			obj[ 'MNU_ID'  ] = dataid;

			if ( data.type !== 'file' ) {
				obj[ 'MNU_GRP_YN' ] = 'Y';
				obj[ 'PGM_ID'     ] = '';
			}else {
				obj[ 'MNU_GRP_YN' ] = 'N';
				obj[ 'PGM_ID'     ] = data.a_attr.value;
			};
			arrObj[ idx ] = obj;
		});
		window.gwJsonParam = { gwSendData : JSON.stringify( { 'json_data' : arrObj, } ) };
		window.gwJsonParam[ 'gwKeyList' ] = JSON.stringify( { gwKeyList: [{'key' : 'json_data'}], } ) ;

		return true;
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_addTreeDataSet
/**
 *
 * @param prmGridId
 * @param prmWMargine
 * @param prmHMargine
 * @param gridType
 */
function fc_setGridSize( prmGridId, prmWMargine, prmHMargine, gridType ) {
	try {
		var iPos = -1;

		var obj = new Object();
		obj[ 'name'     ] = prmGridId;
		obj[ 'wmargin'  ] = ( prmWMargine == undefined ) ?  0 : prmWMargine;
		obj[ 'hmargin'  ] = ( prmHMargine == undefined ) ?  0 : prmHMargine;
		obj[ 'gridtype' ] = ( gridType    == undefined ) ? '' : gridType;

		if ( gridType == 'tree' ) {
			for ( var loop=0;loop<window.gwTreeGridSize.length;loop++ ) {
				if ( window.gwTreeGridSize[ loop ].name == prmGridId ) {
					iPos = loop;
					break;
				};
			};
		    if ( iPos == -1 ) iPos = window.gwTreeGridSize.length;
			window.gwTreeGridSize[ iPos ] = obj;
		} else {
			for ( var loop = 0; loop<window.gwGridSize.length; loop++ ) {
				if ( window.gwGridSize[ loop ].name == prmGridId ) {
					iPos = loop;
					break;
				};
			};
		    if ( iPos == -1 ) iPos = window.gwGridSize.length;
		    window.gwGridSize[ iPos ] = obj;
		};
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_setGridSize
/**
 *
 * @param target
 * @param source
 * @returns
 */
function fc_getExtendObj ( targetObj, sourceObj ) {
	return $.extend( true, targetObj, sourceObj );
}; // end of fc_getExtendObj
/**
 *
 * @param reportId
 * @param prmServiceName
 * @param prmTransitionName
 * @param isNoProgressBar
 * @param prmModule
 * @returns {Boolean}
 */
function fc_printReport ( reportId, prmServiceNm, prmTransitionNm, isNoProgressBar, prmModule ) {
	try {
		return true;
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_printReport
/**
 *
 * @param value
 * @param colNm
 * @returns {Array}
 */
function fc_checkMandatoryEntry ( value, colNm ) {
	if ( !fc_isNull( value ) ) return [ true, '' ];
	return [ false, '"' + colNm + '"' + window.gwMessage.validate.required ];
}; // end of fc_checkMandatoryEntry
function fc_checkMinEntry ( value, minValue ) {
	if ( fc_isNull( value ) ) return [ true, '' ];
	if ( value >= minValue  ) return [ true, '' ];
	return [ false, window.gwMessage.validate.minvalue ];
}; // end of fc_checkMinEntry
function fc_checkMaxEntry ( value, maxValue ) {
	if ( fc_isNull( value ) ) return [ true, '' ];
	if ( value <= maxValue  ) return [ true, '' ];
	return [ false, window.gwMessage.validate.maxvalue ];
}; // end of fc_checkMaxEntry
function fc_checkRange ( chktype, fr_value, to_value, isEqual ) {
	var msg = '';
	isEqual = ( fc_isNull( isEqual ) ? true : isEqual );

	if ( chktype == 'number' ) {
		if ( isEqual ) {
			if ( fc_isNull( fr_value ) || fc_isNull( to_value ) || Number( to_value ) >= Number( fr_value ) )
				return [ true, msg ];
		} else {
			if ( fc_isNull( fr_value ) || fc_isNull( to_value ) || Number( to_value ) > Number( fr_value ) )
				return [ true, msg ];
		};
	} else {
		if ( isEqual ) {
			if ( fc_isNull( fr_value ) || fc_isNull( to_value ) || to_value >= fr_value )
				return [ true, msg ];
		} else {
			if ( fc_isNull( fr_value ) || fc_isNull( to_value ) || to_value > fr_value )
				return [ true, msg ];
		};
	};
	switch ( chktype ) {
	case 'date' :
		msg = window.gwMessage.validate.daterange;
		break;
	case 'number' :
		msg = window.gwMessage.validate.numberrange;
		break;
	default :
		msg = window.gwMessage.validate.valuerange;
		break;
	};
	return [ false, msg ];
}; // end of fc_checkRange
function fc_setCheckGridRange ( objCheck ) {
	if ( !fc_isNull( objCheck[ 'msgid' ] ) )
		fc_addMsg( [ objCheck[ 'msgid' ] ] );

	fc_setRangeItemCd( 'Grid', objCheck );
	var id = objCheck[ 'id' ];
	if ( fc_isNull( objCheck.id ) ) {
		throw new Error( '"id(fc_setCheckGridRange)"' + window.gwMessage.validate.nodefined );
	};
	if ( fc_isNull( window.gwChkGridRange[ id ] ) )
		window.gwChkGridRange[ id ] = [ objCheck ];
	else
		window.gwChkGridRange[ id ].push( objCheck );
}; // end of fc_setCheckGridRange
function fc_setCheckFormRange ( objCheck ) {
	fc_setRangeItemCd( 'Form', objCheck );
	window.gwChkFormRange.push( objCheck );
	if ( !fc_isNull( objCheck[ 'msgid' ] ) )
		fc_addMsg( [ objCheck[ 'msgid' ] ] );
}; // end of fc_setCheckFormRange
function fc_setRangeItemCd ( sType, objCheck ) {
	var sMsg = ( sType == 'Grid' ) ? 'fc_setCheckGridRange' : 'fc_setCheckRange';
	if ( fc_isNull( objCheck.fromvalue ) )
		throw new Error( '"fromvalue(' + sMsg + ')"' + window.gwMessage.validate.nodefined );
	if ( fc_isNull( objCheck.tovalue ) )
		throw new Error( '"tovalue(' + sMsg + ')"' + window.gwMessage.validate.nodefined );
	if ( fc_isNull( objCheck.fromitemCd ) )
		fc_addMultiItem( { itemCd: objCheck.fromvalue } );
	else
		fc_addMultiItem( { itemCd: objCheck.fromitemCd } );
	if ( fc_isNull( objCheck.toitemCd ) )
		fc_addMultiItem( { itemCd: objCheck.tovalue } );
	else
		fc_addMultiItem( { itemCd: objCheck.toitemCd } );
}; // end of fc_setRangeItemCd
/**
 *
 * @param key
 * @param value
 */
function fc_addParam( key, value ) {
	window.gwJsonParam[ key ] = value;
}; // end of fc_addParam
function fc_setEditFlag( flag ) {
	window.editFlag = flag;
//	console.log( 'editFlag ~~~~~~~~~~~~~ : ' + flag );
}; // end of fc_setEditFlag
function fc_getEditFlag( sType ) {
	var iRowCount = 0;
	var gridId = '';
	var gridEditFlag = false;

	sType = fc_setValue( sType, 'SCREEN' );
	if ( sType = 'FORM' ) return window.editFlag;

	// treeGrid list
	for ( var loop=0;loop<window.gwTreeGridSize.length;loop++ ) {
		gridId = window.gwTreeGridSize[ loop ].name;
		iRowCount = fc_getGridRecordCount ( gridId );
		var colId = fc_getColIndexbyName( gridId, 'JQX_CB' );
		if ( colId > -1 ) {
			for ( var jLoop=0;jLoop<iRowCount;jLoop++ ) {
				if ( fc_getCellData( gridId, jLoop, 'JQX_CB' ) == true ) {
					gridEditFlag = true;
					break;
				};
			};
			if ( gridEditFlag )
				break;
		};
	};
	// tab, normal grid list
	for ( var loop=0;loop<window.gwGridSize.length;loop++ ) {
		gridId = window.gwGridSize[ loop ].name;
		iRowCount = fc_getGridRecordCount ( gridId );
		var colId = fc_getColIndexbyName( gridId, 'JQX_CB' );
		if ( colId > -1 ) {
			for ( var jLoop=0;jLoop<iRowCount;jLoop++ ) {
				if ( fc_getCellData( gridId, jLoop, 'JQX_CB' ) == true ) {
					gridEditFlag = true;
					break;
				};
			};
			if ( gridEditFlag )
				break;
		};
	};
	if ( sType = 'GRID' ) return gridEditFlag;

	return ( window.editFlag || gridEditFlag );
}; // end of fc_getEditFlag
function fc_changeFormFlag() {
	fc_setEditFlag( true );
}; // end of fc_changeFormFlag

function fc_getGwLangItem( itemCd, itemVal, sDefText ) {
	var sValue = sDefText;
	var langObj;
console.log('fc_getGwLangItem======>1');
console.log('fc_getGwLangItem.window.isInit======>2' + window.isInit);
	if ( window.isInit ) {
		langObj = fc_getSessionSubItem( 'GW_MULTILANG_ITEM', itemCd );
	} else {
		if ( fc_isNull( window.gwMultiLangItem ) )
			window.gwMultiLangItem = fc_getSessionItem( 'GW_MULTILANG_ITEM' );

		langObj = window.gwMultiLangItem[ itemCd ];
	};

	if ( fc_isNull( langObj ) ) {
		if ( window.gwMesEnv.lang.isUseDefLabel ) {
			sValue = sDefText;
		} else {
			sValue = window.gwMesEnv.lang.prefix + itemCd;
		};
	} else {
		switch ( itemVal ) {
			case '1' :
			case '2' :
			case '3' :
			case '4' :
			case '5' :
			case 1 :
			case 2 :
			case 3 :
			case 4 :
			case 5 :
				var sId = 'ALT_CONTENTS' + itemVal;
				sValue = langObj[ sId ];
				break;
			default :
				sValue = langObj[ 'CONTENTS' ];
				break;
		};
	};
	return sValue; //sDefText;
}; // end of fc_getGwLangItem


//========================================================================
//Month calendar Common Function
//========================================================================
$.calendar_month = function(targetObj) {

	var date = new Date();

	var today;
//	+ '-' +('0'+date.getDate()).slice(-2);
	
	if(targetObj == 'FIND_YEAR_FR'){
		today = date.getFullYear()+'-'+'01';
	}else{
		today = date.getFullYear()+'-'+('0'+(date.getMonth()+1)).slice(-2);
	}
	
	$('#' + targetObj).val(today);

	$('#' + targetObj)
	.parent().css({
		'position' : 'relative',
	})
	.append(
			$('<span class="'+targetObj+'-month jqx-icon jqx-icon-ui-redmond jqx-icon-calendar jqx-icon-calendar-ui-redmond">')
					.css({
						'position':'absolute',
						'top':'11px',
						'right':'3px',
					})
					);

	var currentYear = (new Date()).getFullYear();
	var startYear = currentYear - 10;

	//console.log(currentYear);
	var options = {
		startYear : startYear,
		finalYear : currentYear,
		pattern : 'yyyy-mm',
		monthNames : [ '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월',
				'10월', '11월', '12월' ]
	};

	$('#' + targetObj).monthpicker(options);


	$(document).on('click','.'+targetObj+'-month',function(){
		$('#' + targetObj).monthpicker('show');
	})
}