/**
 * Declare constants
 */
/**
 * Declare Variable
 */
var tempAuth;
//KD 0528
const BTN_TOP_HEIGHT = 25;
/**
 * Declare Initial JS Function
 */
$( function() {
	fc_showLog( 1, "***** jQuery Init");

	window.initProc.initFlag = false;
	window.gwLangValue = '';
	try {
		//fc_showProgBar( true );
		fc_applySystemEnv();    // set system environment value
		fc_applyTheme( '/SCO/include/js/jqwidgets/styles' );

		fc_applyAuthority();
// 		fc_getMultiLangMessage(); // Search MultiMessage
	} catch ( e ) {
		fc_getException( e );
	} finally {
	};
}); // end of $(function ())


window.onkeydown = function() {
	var kcode = event.keyCode;
	if(kcode == 116) {
		event.returnValue = false;
		fc_iframeCkReload(window.ifrmaeId);
	}
};

//KD
/**
*
* @param id
*/
function fc_iframeCkReload(id){
	document.getElementById(id).contentWindow.location.reload(true);
}; // end of fc_iframeCkReload

/**
 *
 * @param themePath
 * @param defaultThemeNm
 */
function fc_applyTheme( themePath, defaultThemeNm ) {
	var themeNm = window.gwMesEnv.themes;

	if ( !fc_isNull( defaultThemeNm ) ) {
		themeNm = defaultThemeNm;
		window.gwMesEnv.themes = themeNm;
	};
	var sCssFileNm   = '/jqx.' + themeNm.toLowerCase() + '.css';
	var currentStyle = $( 'link[href^="' + themePath + sCssFileNm + '"]' ).first();
	if ( currentStyle.length ) {
		currentStyle[ 0 ].href = themePath + sCssFileNm;
	};
}; // end of fc_applyTheme
/**
 *
 */
function fc_applySystemEnv() {
	//---------------------------------------------------------------------------------------------

	if ( fc_isNull( fc_getSessionItem( 'GW_SYSTEM_ENV' ) ) ) {
		window.gwMesEnv.user.id       = fc_isNull( fc_getSessionItem( 'GW_USER_ID' ) ) ? window.gwMesEnv.user.id     : fc_getSessionItem( 'GW_USER_ID' );
		window.gwMesEnv.user.name     = fc_isNull( fc_getSessionItem( 'GW_USER_NM' ) ) ? window.gwMesEnv.user.name   : fc_getSessionItem( 'GW_USER_NM' );
		window.gwMesEnv.user.deptCd   = fc_isNull( fc_getSessionItem( 'GW_DEPT_CD' ) ) ? window.gwMesEnv.user.deptCd : fc_getSessionItem( 'GW_DEPT_CD' );
		window.gwMesEnv.user.pgmId    = fc_isNull( fc_getSessionItem( 'GW_PGM_ID'  ) ) ? fc_getDefPgmId()            : fc_getSessionItem( 'GW_PGM_ID'  );
		window.gwMesEnv.user.pgmTitle = fc_isNull( fc_getSessionItem( 'GW_TITLE'   ) ) ? document.title              : fc_getSessionItem( 'GW_TITLE'   );
		window.gwMesEnv.user.lineCd = fc_isNull( fc_getSessionItem( 'GW_LINE_CD'   ) ) ? ""              : fc_getSessionItem( 'GW_LINE_CD'   );

		fc_addParam( 'LANG_CD', fc_getSessionItem( 'GW_LANG_CD' ) );
		if ( fc_submit( '', 'ict.sys.init-service', 'searchSysEnv', '', '', 'SCO' ) ) {
			var sysEnv = new Object();
			$.each( window.gwJsonResult.RK_SYSENV, function ( index, entry ) {
				sysEnv[ entry.ENV_CD ] = fc_isNull( entry.ENV_VAL, false ) ? "" : entry.ENV_VAL;
			});
			window.gwMesEnv.screen.logLevel = fc_isNull( sysEnv.LOG_LEVEL ) ? window.gwMesEnv.screen.logLevel : sysEnv.LOG_LEVEL;
			fc_showLog( 2, 'gwSysEnv Search :', sysEnv);
		};
		if ( fc_isNull( sysEnv ) ) {
			fc_makeMessage( fc_getSessionItem( 'GW_LANG_CD' ) );	// ict.jquery.message: set message localization
			fc_setError('Fail to Initialize Screen');
		};

		window.gwMesEnv.user.clientIp = fc_isNull( fc_getSessionItem( 'GW_CLIENT_IP' ) ) ? window.gwJsonResult.USER_CLIENT_IP : fc_getSessionItem( 'GW_CLIENT_IP' );
		//---------------------------------------------------------------------------------------------
		window.gwMesEnv.lang.cd              = !fc_isNull( fc_getSessionItem( 'GW_LANG_CD' ) ) ? fc_getSessionItem( 'GW_LANG_CD' ) : fc_isNull( sysEnv.DEF_LANG_CD ) ? window.gwMesEnv.lang.id : sysEnv.DEF_LANG_CD.toUpperCase();
		window.gwMesEnv.lang.isUseDefLabel   = fc_isNull( sysEnv.USE_DEFLABEL  ) ? window.gwMesEnv.lang.isUseDefLabel   : ( sysEnv.USE_DEFLABEL  == 'Y' ) ? true : false;
		window.gwMesEnv.lang.isMultiLanguage = fc_isNull( sysEnv.USE_MULTILANG ) ? window.gwMesEnv.lang.isMultiLanguage : ( sysEnv.USE_MULTILANG == 'Y' ) ? true : false;
		window.gwMesEnv.lang.isMultiLanguageSys = fc_isNull( sysEnv.USE_MULTILANG_SYS ) ? window.gwMesEnv.lang.isMultiLanguageSys : sysEnv.USE_MULTILANG_SYS;


		window.gwMesEnv.lang.datepicker      = window.gwMesEnv.lang.cd.toLowerCase();
		window.gwMesEnv.lang.grid            = window.gwMesEnv.lang.datepicker;
		fc_makeMessage( window.gwMesEnv.lang.cd );	// ict.jquery.message: set message localization

		// format
		window.gwMesEnv.format.separate.source.thousand = fc_isNull( sysEnv.SP_S_THOUSANDS ) ? window.gwMesEnv.format.separate.source.thousand : sysEnv.SP_S_THOUSANDS;
		window.gwMesEnv.format.separate.source.decimal  = fc_isNull( sysEnv.SP_S_DECIMAL   ) ? window.gwMesEnv.format.separate.source.decimal  : sysEnv.SP_S_DECIMAL  ;
		window.gwMesEnv.format.separate.target.thousand = fc_isNull( sysEnv.SP_T_THOUSANDS ) ? window.gwMesEnv.format.separate.target.thousand : sysEnv.SP_T_THOUSANDS;
		window.gwMesEnv.format.separate.target.decimal  = fc_isNull( sysEnv.SP_T_DECIMAL   ) ? window.gwMesEnv.format.separate.target.decimal  : sysEnv.SP_T_DECIMAL  ;

		window.gwMesEnv.format.delim.source.date     = fc_isNull( sysEnv.SP_S_DATE     ) ? window.gwMesEnv.format.delim.source.date     : sysEnv.SP_S_DATE    ;
		window.gwMesEnv.format.delim.source.time     = fc_isNull( sysEnv.SP_S_TIME     ) ? window.gwMesEnv.format.delim.source.time     : sysEnv.SP_S_TIME    ;
		window.gwMesEnv.format.delim.source.datetime = fc_isNull( sysEnv.SP_S_DATETIME ) ? window.gwMesEnv.format.delim.source.datetime : sysEnv.SP_S_DATETIME;
		window.gwMesEnv.format.delim.target.date     = fc_isNull( sysEnv.SP_T_DATE     ) ? window.gwMesEnv.format.delim.target.date     : sysEnv.SP_T_DATE    ;
		window.gwMesEnv.format.delim.target.time     = fc_isNull( sysEnv.SP_T_TIME     ) ? window.gwMesEnv.format.delim.target.time     : sysEnv.SP_T_TIME    ;
		window.gwMesEnv.format.delim.target.datetime = fc_isNull( sysEnv.SP_T_DATETIME ) ? window.gwMesEnv.format.delim.target.datetime : sysEnv.SP_T_DATETIME;

		window.gwMesEnv.format.date.source = fc_isNull( sysEnv.FM_S_DATE ) ? window.gwMesEnv.format.date.source : sysEnv.FM_S_DATE;
		window.gwMesEnv.format.date.target = fc_isNull( sysEnv.FM_T_DATE ) ? window.gwMesEnv.format.date.target : sysEnv.FM_T_DATE;
		window.gwMesEnv.format.time.source = fc_isNull( sysEnv.FM_S_TIME ) ? window.gwMesEnv.format.time.source : sysEnv.FM_S_TIME;
		window.gwMesEnv.format.time.target = fc_isNull( sysEnv.FM_T_TIME ) ? window.gwMesEnv.format.time.target : sysEnv.FM_T_TIME;
		fc_makeFormat();	// ict.query.formatter: set date/time format

		window.gwMesEnv.user.comCd    = fc_isNull( sysEnv.DEF_COM_CD ) ? window.gwMesEnv.user.comCd : sysEnv.DEF_COM_CD;
		window.gwMesEnv.user.comNm    = fc_isNull( sysEnv.DEF_COM_NM ) ? window.gwMesEnv.user.comNm : sysEnv.DEF_COM_NM;
		//window.gwMesEnv.user.plantCd  = fc_isNull( sysEnv.DEF_PLANT_CD)? window.gwMesEnv.user.plantCd : sysEnv.DEF_PLANT_CD;
		window.gwMesEnv.user.plantCd  = fc_isNull( fc_getSessionItem( 'GW_PLANT_CD') ) ? window.gwMesEnv.user.plantCd: fc_getSessionItem( 'GW_PLANT_CD');//20180509


		window.gwMesEnv.screen.isDefMessageArea = fc_isNull( sysEnv.DEF_MESSAGE_AREA     ) ? window.gwMesEnv.screen.isDefMessageArea : ( sysEnv.DEF_MESSAGE_AREA == 'Y' ) ? true : false;
		window.gwMesEnv.screen.maxinteger       = fc_isNull( sysEnv.MAX_INTEGER          ) ? window.gwMesEnv.screen.maxinteger    : sysEnv.MAX_INTEGER;
		window.gwMesEnv.screen.listboxval       = fc_isNull( sysEnv.DEF_LISTBOX_CALC_VAL ) ? window.gwMesEnv.screen.listboxval    : sysEnv.DEF_LISTBOX_CALC_VAL;
		window.gwMesEnv.screen.listboxmaxlen    = fc_isNull( sysEnv.DEF_LISTBOX_MAX_LEN  ) ? window.gwMesEnv.screen.listboxmaxlen : sysEnv.DEF_LISTBOX_MAX_LEN;
		// grid pager, filter
		window.gwMesEnv.grid.isPage     = fc_isNull( sysEnv.DEF_PAGE     ) ? window.gwMesEnv.grid.isPage     : ( sysEnv.DEF_PAGE     == 'Y' ) ? true : false;
		window.gwMesEnv.grid.isFilter   = fc_isNull( sysEnv.DEF_FILTER   ) ? window.gwMesEnv.grid.isFilter   : ( sysEnv.DEF_FILTER   == 'Y' ) ? true : false;
		window.gwMesEnv.grid.isAutoSave = fc_isNull( sysEnv.USE_AUTOSAVE ) ? window.gwMesEnv.grid.isAutoSave : ( sysEnv.USE_AUTOSAVE == 'Y' ) ? true : false;

		window.gwMesEnv.mainmenu.isMenuAutoHide = fc_isNull( sysEnv.DEF_MENU_HIDE   ) ? window.gwMesEnv.mainmenu.isMenuAutoHide : ( sysEnv.DEF_MENU_HIDE   == 'Y' ) ? true : false;
		window.gwMesEnv.mainmenu.isOpenByClick  = fc_isNull( sysEnv.DEF_MENU_ACTION ) ? window.gwMesEnv.mainmenu.isOpenByClick  : ( sysEnv.DEF_MENU_ACTION == 'C' ) ? true : false;
		window.gwMesEnv.mainmenu.isSideMenu     = fc_isNull( sysEnv.DEF_MENU_TYPE   ) ? window.gwMesEnv.mainmenu.isSideMenu     : ( sysEnv.DEF_MENU_TYPE   == 'S' ) ? true : false;
		window.gwMesEnv.mainmenu.isExpand       = fc_isNull( sysEnv.DEF_EXPAND      ) ? window.gwMesEnv.mainmenu.isExpand       : ( sysEnv.DEF_EXPAND      == 'Y' ) ? true : false;
		window.gwMesEnv.mainmenu.isPgmId        = fc_isNull( sysEnv.DEF_PGM_ID      ) ? window.gwMesEnv.mainmenu.isPgmId        : ( sysEnv.DEF_PGM_ID      == 'Y' ) ? true : false;

		window.gwMesEnv.shift.A   = ( fc_isNull( sysEnv.SHIFT_A   ) ) ? window.gwMesEnv.shift.A   : sysEnv.SHIFT_A;
		window.gwMesEnv.shift.B   = ( fc_isNull( sysEnv.SHIFT_B   ) ) ? window.gwMesEnv.shift.B   : sysEnv.SHIFT_B;
		window.gwMesEnv.shift.C   = ( fc_isNull( sysEnv.SHIFT_C   ) ) ? window.gwMesEnv.shift.C   : sysEnv.SHIFT_C;
		window.gwMesEnv.shift.D   = ( fc_isNull( sysEnv.SHIFT_D   ) ) ? window.gwMesEnv.shift.D   : sysEnv.SHIFT_D;
		window.gwMesEnv.shift.E   = ( fc_isNull( sysEnv.SHIFT_E   ) ) ? window.gwMesEnv.shift.E   : sysEnv.SHIFT_E;
		window.gwMesEnv.shift.CNT = ( fc_isNull( sysEnv.SHIFT_CNT ) ) ? window.gwMesEnv.shift.CNT : sysEnv.SHIFT_CNT;

		window.gwMesEnv.themes  = ( fc_isNull( sysEnv.DEF_THEME ) ? window.gwMesEnv.themes : sysEnv.DEF_THEME).toLowerCase();

		window.gwMesEnv.btnSize.print  = ( fc_isNull( sysEnv.BTN_SIZE_PRINT  ) ? window.gwMesEnv.btnSize.print  : sysEnv.BTN_SIZE_PRINT  );
		window.gwMesEnv.btnSize.close  = ( fc_isNull( sysEnv.BTN_SIZE_CLOSE  ) ? window.gwMesEnv.btnSize.close  : sysEnv.BTN_SIZE_CLOSE  );
		window.gwMesEnv.btnSize.search = ( fc_isNull( sysEnv.BTN_SIZE_SEARCH ) ? window.gwMesEnv.btnSize.search : sysEnv.BTN_SIZE_SEARCH );
		window.gwMesEnv.btnSize.save   = ( fc_isNull( sysEnv.BTN_SIZE_SAVE   ) ? window.gwMesEnv.btnSize.save   : sysEnv.BTN_SIZE_SAVE   );
		window.gwMesEnv.btnSize.del    = ( fc_isNull( sysEnv.BTN_SIZE_DEL    ) ? window.gwMesEnv.btnSize.del    : sysEnv.BTN_SIZE_DEL    );
		window.gwMesEnv.btnSize.conf   = ( fc_isNull( sysEnv.BTN_SIZE_CONF   ) ? window.gwMesEnv.btnSize.conf   : sysEnv.BTN_SIZE_CONF   );

		window.gwMesEnv.btnSize.cust1  = ( fc_isNull( sysEnv.BTN_SIZE_CUST1  ) ? window.gwMesEnv.btnSize.cust1  : sysEnv.BTN_SIZE_CUST1  );
		window.gwMesEnv.btnSize.cust2  = ( fc_isNull( sysEnv.BTN_SIZE_CUST2  ) ? window.gwMesEnv.btnSize.cust2  : sysEnv.BTN_SIZE_CUST2  );
		window.gwMesEnv.btnSize.cust3  = ( fc_isNull( sysEnv.BTN_SIZE_CUST3  ) ? window.gwMesEnv.btnSize.cust3  : sysEnv.BTN_SIZE_CUST3  );
		window.gwMesEnv.btnSize.cust4  = ( fc_isNull( sysEnv.BTN_SIZE_CUST4  ) ? window.gwMesEnv.btnSize.cust4  : sysEnv.BTN_SIZE_CUST4  );
		window.gwMesEnv.btnSize.cust5  = ( fc_isNull( sysEnv.BTN_SIZE_CUST5  ) ? window.gwMesEnv.btnSize.cust5  : sysEnv.BTN_SIZE_CUST5  );

		window.gwMesEnv.screen.tabCaptionLth = fc_isNull( sysEnv.TAB_CAP_LTH ) ? window.gwMesEnv.screen.tabCaptionLth : sysEnv.TAB_CAP_LTH;
		window.gwMesEnv.screen.showTabList   = fc_isNull( sysEnv.USE_TABLIST ) ? window.gwMesEnv.screen.showTabList   : ( sysEnv.USE_TABLIST == 'Y' ) ? true : false;

		window.gwMesEnv.lang.isUseSession    = fc_isNull( sysEnv.USE_SESSION  ) ? window.gwMesEnv.lang.isUseSession   : ( sysEnv.USE_SESSION == 'Y' ) ? true : false;

		window.gwMesEnv.completeMsg.isSearch   = fc_isNull( sysEnv.USE_MSG_SEARCH   ) ? window.gwMesEnv.completeMsg.isSearch   : ( sysEnv.USE_MSG_SEARCH   == 'Y' ) ? true : false;
		window.gwMesEnv.completeMsg.isSave     = fc_isNull( sysEnv.USE_MSG_SAVE     ) ? window.gwMesEnv.completeMsg.isSave     : ( sysEnv.USE_MSG_SAVE     == 'Y' ) ? true : false;
		window.gwMesEnv.completeMsg.isDelete   = fc_isNull( sysEnv.USE_MSG_DEL      ) ? window.gwMesEnv.completeMsg.isDelete   : ( sysEnv.USE_MSG_DEL      == 'Y' ) ? true : false;
		window.gwMesEnv.completeMsg.isConfirm  = fc_isNull( sysEnv.USE_MSG_CONF     ) ? window.gwMesEnv.completeMsg.isConfirm  : ( sysEnv.USE_MSG_CONF     == 'Y' ) ? true : false;
		window.gwMesEnv.completeMsg.isSend     = fc_isNull( sysEnv.USE_MSG_SEND     ) ? window.gwMesEnv.completeMsg.isSend     : ( sysEnv.USE_MSG_SEND     == 'Y' ) ? true : false;
		window.gwMesEnv.completeMsg.isFilesave = fc_isNull( sysEnv.USE_MSG_FILESAVE ) ? window.gwMesEnv.completeMsg.isFilesave : ( sysEnv.USE_MSG_FILESAVE == 'Y' ) ? true : false;
	} else {
		window.gwMesEnv   = fc_getSessionItem( 'GW_SYSTEM_ENV' );
		fc_makeMessage( window.gwMesEnv.lang.cd );	// ict.jquery.message: set message localization
		fc_showLog( 2, 'window.gwMesEnv Exist : ', window.gwMesEnv );
	};
	window.gwMesEnv.user.pgmId    = fc_getDefPgmId();
	window.gwMesEnv.user.pgmTitle = fc_isNull( fc_getSessionItem( 'GW_TITLE' ) ) ? document.title : fc_getSessionItem( 'GW_TITLE' );

	window.gwMultiLang.isRunMain = window.gwMesEnv.lang.isUseSession;

	if ( fc_getDefPgmId() == 'main' ) {
		//document.title = window.gwMesEnv.user.comNm + ' SmartFactory';
		document.title = window.gwMesEnv.user.comNm;
	} else {
		document.title = '[' + window.gwMesEnv.user.pgmId + '] ' + window.gwMesEnv.user.pgmTitle;
		/*
		if ( fc_isNull( parent.window.mainTab ) )
			window.gwMultiLang.isRunMain = true;  // false
		else
			window.gwMultiLang.isRunMain = true;
		*/
	};
	fc_setSessionItem( 'GW_SYSTEM_ENV', window.gwMesEnv );

	//---------------------------------------------------------------------------------------------
	/*
	//not use : 2019.10.22
	if ( window.gwMultiLang.isRunMain ) {
		if ( fc_isNull( fc_getSessionItem( 'GW_MULTILANG_ITEM' ) ) ) {
			fc_addParam( 'LANG_CD', fc_getSessionItem( 'GW_LANG_CD' ) );
			if ( fc_submit( '', 'ict.sys.init-service', 'searchMutilItem', '', '', 'SCO' ) ) {
				fc_setSessionItem( 'GW_MULTILANG_ITEM', window.gwJsonResult.RK_ITEMS );
			};
			window.gwJsonResult.RK_ITEMS = [];
		};
	};
	*/

	//fc_addMsg( [ 'MSG00009'] );

};  // end of fc_applySystemEnv
/**
 *
 */
function fc_applyAuthority() {
	// 2018.2.22 getting from database
	window.gwMultiLang.isRunMain = false;
	window.gwJsonParam[ 'USER_ID' ] = window.gwMesEnv.user.id;
	window.gwJsonParam[ 'PGM_ID'  ] = window.gwMesEnv.user.pgmId;
	
	fc_getCurrentMenuIdAsync();
};

function fc_getCurrentMenuIdAsync() {
	var mnuId = '';
	
	// 직접 접근 시도 (같은 origin인 경우)
	try {
		if ( parent.window && parent.window.mainTab ) {
			mnuId = fc_getCurrentMenuId( parent.window.mainTab );
		}
	} catch ( e ) {
		// Cross-origin 오류 시 postMessage 사용
		fc_requestMenuIdFromParent();
		return;
	}
	
	// 메뉴 ID를 받았으면 권한 적용 계속 진행
	// todo : 개발에선 하드 코딩 배포할 때는 mnuId
	if ( "M000000255" ) {
		fc_proceedWithAuthority( mnuId );
	} else {
		fc_requestMenuIdFromParent();
	}
};

function fc_requestMenuIdFromParent() {
	try {
		var messageHandler = function( event ) {
			 if ( event.origin !== 'http://mesdev.lsmnm.com' && event.origin !== 'http://ds.mes.lsmnm.com' ) return;
			
			if ( event.data && event.data.type === 'RESPONSE_MENU_ID' ) {
				var mnuId = event.data.menuId || '';
				fc_proceedWithAuthority( mnuId );
			}
		};
		
		if ( window.addEventListener ) {
			window.addEventListener( 'message', messageHandler, { once: true } );
		} else {
			window.addEventListener( 'message', messageHandler );
		}
		
		try {
			parent.postMessage({ type: 'REQUEST_MENU_ID' }, 'http://mesdev.lsmnm.com' );
		} catch ( e ) {
			fc_proceedWithAuthority( '' );
		}
	} catch ( e ) {
		fc_showLog( 1, 'postMessage error: ' + e.message );
		fc_proceedWithAuthority( '' );
	}
};

function fc_proceedWithAuthority( mnuId ) {
	window.gwJsonParam[ 'MNU_ID'  ] = mnuId;
	window.gwJsonParam[ 'LANG_CD' ] = window.gwMesEnv.lang.cd;
	window.gwJsonParam[ 'LINE_CD' ] = window.gwMesEnv.user.lineCd;

	if ( !fc_submit( '', 'ict.sys.init-service', 'searchScreenAuthority', '', '', 'SCO' ) ) return;
	if ( !fc_isNull( window.gwJsonResult.RK_AUTH[ 0 ] ) ) {
		window.gwAuth.isSearch  = ( window.gwJsonResult.RK_AUTH[ 0 ].IS_SEARCH  == 'Y' ) ? true : false;
		window.gwAuth.isSave    = ( window.gwJsonResult.RK_AUTH[ 0 ].IS_SAVE    == 'Y' ) ? true : false;
		window.gwAuth.isDelete  = ( window.gwJsonResult.RK_AUTH[ 0 ].IS_DELETE  == 'Y' ) ? true : false;
		window.gwAuth.isConfirm = ( window.gwJsonResult.RK_AUTH[ 0 ].IS_CONFIRM == 'Y' ) ? true : false;
		window.gwAuth.isCust1   = ( window.gwJsonResult.RK_AUTH[ 0 ].IS_CUST1   == 'Y' ) ? true : false;
		window.gwAuth.isCust2   = ( window.gwJsonResult.RK_AUTH[ 0 ].IS_CUST2   == 'Y' ) ? true : false;
		window.gwAuth.isCust3   = ( window.gwJsonResult.RK_AUTH[ 0 ].IS_CUST3   == 'Y' ) ? true : false;
		window.gwAuth.isCust4   = ( window.gwJsonResult.RK_AUTH[ 0 ].IS_CUST4   == 'Y' ) ? true : false;
		window.gwAuth.isCust5   = ( window.gwJsonResult.RK_AUTH[ 0 ].IS_CUST5   == 'Y' ) ? true : false;
		window.gwAuth.isCust6   = ( window.gwJsonResult.RK_AUTH[ 0 ].IS_CUST6   == 'Y' ) ? true : false;
		window.gwAuth.isCust7   = ( window.gwJsonResult.RK_AUTH[ 0 ].IS_CUST7   == 'Y' ) ? true : false;
		window.gwAuth.isCust8   = ( window.gwJsonResult.RK_AUTH[ 0 ].IS_CUST8   == 'Y' ) ? true : false;
		window.gwAuth.isCust9   = ( window.gwJsonResult.RK_AUTH[ 0 ].IS_CUST9   == 'Y' ) ? true : false;
		window.gwAuth.isCust10  = ( window.gwJsonResult.RK_AUTH[ 0 ].IS_CUST10   == 'Y' ) ? true : false;
		window.gwAuth.isPrint   = ( window.gwJsonResult.RK_AUTH[ 0 ].IS_PRINT   == 'Y' ) ? true : false;
		window.gwMesEnv.user.pgmTitle = window.gwJsonResult.RK_AUTH[ 0 ].MNU_NM;
		window.gwMesEnv.user.pgmTy    = window.gwJsonResult.RK_AUTH[ 0 ].PGM_TY;

		var vOperDt = window.gwJsonResult.RK_AUTH[ 0 ].OPER_DT;
		fc_setSessionItem( 'GW_OPER_DT', new Date(Number(vOperDt.substring( 0, 4 )), Number(vOperDt.substring( 4, 6 ))-1, Number(vOperDt.substring( 6, 8 )), 0, 0, 0) ); //add 2018.9.7

		if ( !window.gwMesEnv.lang.isMultiLanguage ) return;
		var arrValue = 	[ window.gwJsonResult.RK_AUTH[ 0 ].ITM1_CD
						, window.gwJsonResult.RK_AUTH[ 0 ].ITM2_CD
						, window.gwJsonResult.RK_AUTH[ 0 ].ITM3_CD
						, window.gwJsonResult.RK_AUTH[ 0 ].ITM4_CD
						, window.gwJsonResult.RK_AUTH[ 0 ].ITM5_CD
						, window.gwJsonResult.RK_AUTH[ 0 ].ITM6_CD
						, window.gwJsonResult.RK_AUTH[ 0 ].ITM7_CD
						, window.gwJsonResult.RK_AUTH[ 0 ].ITM8_CD
						, window.gwJsonResult.RK_AUTH[ 0 ].ITM9_CD
						, window.gwJsonResult.RK_AUTH[ 0 ].ITM10_CD
						] ;
		var arrBtnNm = [ window.gwBtn.cust1Btn, window.gwBtn.cust2Btn, window.gwBtn.cust3Btn, window.gwBtn.cust4Btn, window.gwBtn.cust5Btn, window.gwBtn.cust6Btn, window.gwBtn.cust7Btn, window.gwBtn.cust8Btn, window.gwBtn.cust9Btn, window.gwBtn.cust10Btn ];
		for ( var i=0;i<5;i++ ) {
			if ( !fc_isNull( arrValue[ i ] ) ) {
				if ( window.gwMultiLang.isRunMain ) {
					$( '#' + arrBtnNm[ i ] )[0].innerText = ( fc_getGwLangItem( $( '#' + arrBtnNm[ i ] ).attr( window.gwMesEnv.item.itemcd    )
							                                                  , $( '#' + arrBtnNm[ i ] ).attr( window.gwMesEnv.item.itemvalue )
							                                                  , $( '#' + arrBtnNm[ i ] )[ 0 ].innerText )
					                                        );
				} else {
					$( '#' + arrBtnNm[ i ] ).addClass( window.gwClass.multilanguage );
					$( '#' + arrBtnNm[ i ] ).attr( window.gwMesEnv.item.itemcd   , arrValue[ i ] );
					$( '#' + arrBtnNm[ i ] ).attr( window.gwMesEnv.item.itemvalue, 0 );
					fc_setLangId( $( '#' + arrBtnNm[ i ] ).attr( window.gwMesEnv.item.itemcd ), $( '#' + arrBtnNm[ i ] ).attr( window.gwMesEnv.item.itemvalue ) );
				};
			};
		};
		tempAuth = window.gwJsonResult.RK_AUTH;
	} else {
		var bFlag = ( window.gwMesEnv.user.id == 'LOCAL' ) ? true : false;
		window.gwAuth.isSearch  = bFlag;
		window.gwAuth.isSave    = bFlag;
		window.gwAuth.isDelete  = bFlag;
		window.gwAuth.isConfirm = bFlag;
		window.gwAuth.isCust1   = bFlag;
		window.gwAuth.isCust2   = bFlag;
		window.gwAuth.isCust3   = bFlag;
		window.gwAuth.isCust4   = bFlag;
		window.gwAuth.isCust5   = bFlag;
		window.gwAuth.isCust6   = bFlag;
		window.gwAuth.isCust7   = bFlag;
		window.gwAuth.isCust8   = bFlag;
		window.gwAuth.isCust9   = bFlag;
		window.gwAuth.isCust10  = bFlag;
		window.gwAuth.isPrint   = bFlag;

		fc_setSessionItem( 'GW_OPER_DT', new Date() ); //add 2018.9.7
	};

};

function fc_getAuthority( sMode ) {
	var flag = false;
	switch ( sMode ) {
		case 'SEARCH'  : flag = window.gwAuth.isSearch;		break;
		case 'SAVE'    : flag = window.gwAuth.isSave;		break;
		case 'DELETE'  : flag = window.gwAuth.isDelete;		break;
		case 'COMFIRM' : flag = window.gwAuth.isConfirm;	break;
		case 'CUST1'   : flag = window.gwAuth.isCust1;		break;
		case 'CUST2'   : flag = window.gwAuth.isCust2;		break;
		case 'CUST3'   : flag = window.gwAuth.isCust3;		break;
		case 'CUST4'   : flag = window.gwAuth.isCust4;		break;
		case 'CUST5'   : flag = window.gwAuth.isCust5;		break;
		default        : flag = false;		break;
	};
	return flag;
}; // end of fc_getAuthority
/**
 *
 * @param arrMsgId
 */
function fc_getMultiLangMessage( arrMsgId ) {
	try {
/*		window.gwJsonParam[ 'LANG_ID'  ] = arrMsgId.toString();
		window.gwJsonParam[ 'CATEGORY' ] = 'MSG';
		window.gwJsonParam[ 'USER_ID'  ] = window.gwMesEnv.user.id;
		window.gwJsonParam[ 'PGM_ID'   ] = window.gwMesEnv.user.pgmId;
		window.gwJsonParam[ 'GRID_ID'  ] = '';*/

		if ( !$.isArray( arrMsgId ) )   arrMsgId = new Array();

		window.gwJsonParam[ 'LANG_ID'  ] = arrMsgId.toString();
		window.gwJsonParam[ 'CATEGORY' ] = 'MSG';
		window.gwJsonParam[ 'USER_ID'  ] = window.gwMesEnv.user.id;
		window.gwJsonParam[ 'PGM_ID'   ] = window.gwMesEnv.user.pgmId;
		window.gwJsonParam[ 'GRID_ID'  ] = '';

		if ( fc_submit( '', 'ict.sys.init-service', 'searchMultiMessage', '', '', 'SCO' ) ) {
			if ( fc_isNull( window.gwMultiMessage ) ) {
				window.gwMultiMessage = new Object();
			};

			$.each( window.gwJsonResult.RK_MULTIMESSAGE, function( index, entry ) {
				window.gwMultiMessage[ entry.MSG_ID  ] = fc_isNull( entry.MESSAGE_CONTENTS, false ) ? "" : entry.MESSAGE_CONTENTS;
			});
		};
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_getMultiLangMessge
/**
 *
 * @param flag
 */
function fc_setTitleVisible( isVisible ) {
	var titlearea  = 'titleArea';
	if ( isVisible ) $( '#' + titlearea ).show();
	else		     $( '#' + titlearea ).hide();
}; // end of fc_setTitleVisible
/**
 *
 */
function fc_includeTitle() {
	var messagearea  = 'divMessage';
	try {
		fc_setTitleVisible( true );

		if ( window.gwMesEnv.screen.isDefMessageArea )
			$( '#' + messagearea ).show();
		else
			$( '#' + messagearea ).hide();

		//-----------------------------------------------------------------------------
		if ( window.gwMesEnv.lang.isMultiLanguage ) {
			$( '#' + window.gwBtn.searchBtn  ).text( window.gwMessage.button.bSearch  );
			$( '#' + window.gwBtn.saveBtn    ).text( window.gwMessage.button.bSave    );
			$( '#' + window.gwBtn.deleteBtn  ).text( window.gwMessage.button.bDelete  );
			$( '#' + window.gwBtn.confirmBtn ).text( window.gwMessage.button.bConfirm );
			$( '#' + window.gwBtn.printBtn   ).text( window.gwMessage.button.bPrint   );
			$( '#' + window.gwBtn.closeBtn   ).text( window.gwMessage.button.bClose   );
		};
		if ( !fc_isNull( tempAuth ) ) {
			var btnCaption = tempAuth[ 0 ];
			$( '#' + window.gwBtn.cust1Btn   ).text( fc_isNull( btnCaption.CUST1_NM ) ? window.gwMessage.button.bCust1 : btnCaption.CUST1_NM );
			$( '#' + window.gwBtn.cust2Btn   ).text( fc_isNull( btnCaption.CUST2_NM ) ? window.gwMessage.button.bCust2 : btnCaption.CUST2_NM );
			$( '#' + window.gwBtn.cust3Btn   ).text( fc_isNull( btnCaption.CUST3_NM ) ? window.gwMessage.button.bCust3 : btnCaption.CUST3_NM );
			$( '#' + window.gwBtn.cust4Btn   ).text( fc_isNull( btnCaption.CUST4_NM ) ? window.gwMessage.button.bCust4 : btnCaption.CUST4_NM );
			$( '#' + window.gwBtn.cust5Btn   ).text( fc_isNull( btnCaption.CUST5_NM ) ? window.gwMessage.button.bCust5 : btnCaption.CUST5_NM );
			$( '#' + window.gwBtn.cust6Btn   ).text( fc_isNull( btnCaption.CUST6_NM ) ? window.gwMessage.button.bCust6 : btnCaption.CUST6_NM );
			$( '#' + window.gwBtn.cust7Btn   ).text( fc_isNull( btnCaption.CUST7_NM ) ? window.gwMessage.button.bCust7 : btnCaption.CUST7_NM );
			$( '#' + window.gwBtn.cust8Btn   ).text( fc_isNull( btnCaption.CUST8_NM ) ? window.gwMessage.button.bCust8 : btnCaption.CUST8_NM );
			$( '#' + window.gwBtn.cust9Btn   ).text( fc_isNull( btnCaption.CUST9_NM ) ? window.gwMessage.button.bCust9 : btnCaption.CUST9_NM );
			$( '#' + window.gwBtn.cust10Btn  ).text( fc_isNull( btnCaption.CUST10_NM ) ? window.gwMessage.button.bCust10 : btnCaption.CUST10_NM );
		} else {
			$( '#' + window.gwBtn.cust1Btn   ).text( window.gwMessage.button.bCust1 );
			$( '#' + window.gwBtn.cust2Btn   ).text( window.gwMessage.button.bCust2 );
			$( '#' + window.gwBtn.cust3Btn   ).text( window.gwMessage.button.bCust3 );
			$( '#' + window.gwBtn.cust4Btn   ).text( window.gwMessage.button.bCust4 );
			$( '#' + window.gwBtn.cust5Btn   ).text( window.gwMessage.button.bCust5 );
			$( '#' + window.gwBtn.cust6Btn   ).text( window.gwMessage.button.bCust6 );
			$( '#' + window.gwBtn.cust7Btn   ).text( window.gwMessage.button.bCust7 );
			$( '#' + window.gwBtn.cust8Btn   ).text( window.gwMessage.button.bCust8 );
			$( '#' + window.gwBtn.cust9Btn   ).text( window.gwMessage.button.bCust9 );
			$( '#' + window.gwBtn.cust10Btn  ).text( window.gwMessage.button.bCust10 );
		};
		
		// custom button의 text의 사이즈를 가져와서 width 설정
		window.gwMesEnv.btnSize.cust1  = fc_getCustCalcWidth($( '#' + window.gwBtn.cust1Btn   ).outerWidth());
		window.gwMesEnv.btnSize.cust2  = fc_getCustCalcWidth($( '#' + window.gwBtn.cust2Btn   ).outerWidth());
		window.gwMesEnv.btnSize.cust3  = fc_getCustCalcWidth($( '#' + window.gwBtn.cust3Btn   ).outerWidth());
		window.gwMesEnv.btnSize.cust4  = fc_getCustCalcWidth($( '#' + window.gwBtn.cust4Btn   ).outerWidth());
		window.gwMesEnv.btnSize.cust5  = fc_getCustCalcWidth($( '#' + window.gwBtn.cust5Btn   ).outerWidth());
		window.gwMesEnv.btnSize.cust6  = fc_getCustCalcWidth($( '#' + window.gwBtn.cust6Btn   ).outerWidth());
		window.gwMesEnv.btnSize.cust7  = fc_getCustCalcWidth($( '#' + window.gwBtn.cust7Btn   ).outerWidth());
		window.gwMesEnv.btnSize.cust8  = fc_getCustCalcWidth($( '#' + window.gwBtn.cust8Btn   ).outerWidth());
		window.gwMesEnv.btnSize.cust9  = fc_getCustCalcWidth($( '#' + window.gwBtn.cust9Btn   ).outerWidth());
		window.gwMesEnv.btnSize.cust10 = fc_getCustCalcWidth($( '#' + window.gwBtn.cust10Btn  ).outerWidth());
		
		$( '#' + window.gwBtn.printBtn ).jqxButton({
			width  : window.gwMesEnv.btnSize.print,
			height : BTN_TOP_HEIGHT,
			theme  : window.gwMesEnv.themes,
			imgSrc : "https://mesdev.lsmnm.com/SMZ/include/images/icon_15.png",
			imgPosition  : "center",
			textPosition : "left",
			imgWidth  : 13,
			imgHeight : 13,
			textImageRelation : "imageBeforeText"
		});
		//-----------------------------------------------------------------------------
		$( '#' + window.gwBtn.searchBtn ).jqxButton({
			width  : window.gwMesEnv.btnSize.search,
			height : BTN_TOP_HEIGHT,
			theme  : window.gwMesEnv.themes,
			imgSrc : "https://mesdev.lsmnm.com/SMZ/include/images/icon_12.png",
			imgPosition  : "center",
			textPosition : "left",
			imgWidth  : 13,
			imgHeight : 13,
			textImageRelation : "imageBeforeText"
		});
		//-----------------------------------------------------------------------------
		$( '#' + window.gwBtn.saveBtn ).jqxButton({
			width  : window.gwMesEnv.btnSize.save,
			height : BTN_TOP_HEIGHT,
			theme  : window.gwMesEnv.themes,
			imgSrc : "https://mesdev.lsmnm.com/SMZ/include/images/icon_13.png",
			imgPosition  : "center",
			textPosition : "left",
			imgWidth  : 13,
			imgHeight : 13,
			textImageRelation : "imageBeforeText"
		});
		$( '#' + window.gwBtn.deleteBtn ).jqxButton({
			width  : window.gwMesEnv.btnSize.del,
			height : BTN_TOP_HEIGHT,
			theme  : window.gwMesEnv.themes,
			imgSrc : "https://mesdev.lsmnm.com/SMZ/include/images/icon_14.png",
			imgPosition  : "center",
			textPosition : "left",
			imgWidth  : 13,
			imgHeight : 13,
			textImageRelation : "imageBeforeText"
		});
		$( '#' + window.gwBtn.confirmBtn ).jqxButton({
			width  : window.gwMesEnv.btnSize.conf,
			height : BTN_TOP_HEIGHT,
			theme  : window.gwMesEnv.themes,
			imgSrc : "https://mesdev.lsmnm.com/SMZ/include/images/icon_15.png",
			imgPosition  : "center",
			textPosition : "left",
			imgWidth  : 13,
			imgHeight : 13,
			textImageRelation : "imageBeforeText"
		});
		$( '#' + window.gwBtn.closeBtn ).jqxButton({
			width  : window.gwMesEnv.btnSize.close,
			height : BTN_TOP_HEIGHT,
			theme  : window.gwMesEnv.themes,
			imgSrc : "https://mesdev.lsmnm.com/SMZ/include/images/icon_18.png",
			imgPosition  : "center",
			textPosition : "left",
			imgWidth  : 13,
			imgHeight : 13,
			textImageRelation : "imageBeforeText"
		});
		$( '#' + window.gwBtn.cust1Btn ).jqxButton({
			width  : window.gwMesEnv.btnSize.cust1,
			height : BTN_TOP_HEIGHT,
			theme  : window.gwMesEnv.themes,
			imgSrc : "https://mesdev.lsmnm.com/SMZ/include/images/icon_15.png",
			imgPosition  : "center",
			textPosition : "left",
			imgWidth  : 13,
			imgHeight : 13,
			textImageRelation : "imageBeforeText"
		});
		$( '#' + window.gwBtn.cust2Btn ).jqxButton({
			width  : window.gwMesEnv.btnSize.cust2,
			height : BTN_TOP_HEIGHT,
			theme  : window.gwMesEnv.themes,
			imgSrc : "https://mesdev.lsmnm.com/SMZ/include/images/icon_15.png",
			imgPosition  : "center",
			textPosition : "left",
			imgWidth  : 13,
			imgHeight : 13,
			textImageRelation : "imageBeforeText"
		});
		$( '#' + window.gwBtn.cust3Btn ).jqxButton({
			width  : window.gwMesEnv.btnSize.cust3,
			height : BTN_TOP_HEIGHT,
			theme  : window.gwMesEnv.themes,
			imgSrc : "https://mesdev.lsmnm.com/SMZ/include/images/icon_15.png",
			imgPosition  : "center",
			textPosition : "left",
			imgWidth  : 13,
			imgHeight : 13,
			textImageRelation : "imageBeforeText"
		});
		$( '#' + window.gwBtn.cust4Btn ).jqxButton({
			width  : window.gwMesEnv.btnSize.cust4,
			height : BTN_TOP_HEIGHT,
			theme  : window.gwMesEnv.themes,
			imgSrc : "https://mesdev.lsmnm.com/SMZ/include/images/icon_15.png",
			imgPosition  : "center",
			textPosition : "left",
			imgWidth  : 13,
			imgHeight : 13,
			textImageRelation : "imageBeforeText"
		});
		$( '#' + window.gwBtn.cust5Btn ).jqxButton({
			width  : window.gwMesEnv.btnSize.cust5,
			height : BTN_TOP_HEIGHT,
			theme  : window.gwMesEnv.themes,
			imgSrc : "https://mesdev.lsmnm.com/SMZ/include/images/icon_15.png",
			imgPosition  : "center",
			textPosition : "left",
			imgWidth  : 13,
			imgHeight : 13,
			textImageRelation : "imageBeforeText"
		});
		$( '#' + window.gwBtn.cust6Btn ).jqxButton({
			width  : window.gwMesEnv.btnSize.cust6,
			height : BTN_TOP_HEIGHT,
			theme  : window.gwMesEnv.themes,
			imgSrc : "https://mesdev.lsmnm.com/SMZ/include/images/icon_15.png",
			imgPosition  : "center",
			textPosition : "left",
			imgWidth  : 13,
			imgHeight : 13,
			textImageRelation : "imageBeforeText"
		});
		$( '#' + window.gwBtn.cust7Btn ).jqxButton({
			width  : window.gwMesEnv.btnSize.cust7,
			height : BTN_TOP_HEIGHT,
			theme  : window.gwMesEnv.themes,
			imgSrc : "https://mesdev.lsmnm.com/SMZ/include/images/icon_15.png",
			imgPosition  : "center",
			textPosition : "left",
			imgWidth  : 13,
			imgHeight : 13,
			textImageRelation : "imageBeforeText"
		});
		$( '#' + window.gwBtn.cust8Btn ).jqxButton({
			width  : window.gwMesEnv.btnSize.cust8,
			height : BTN_TOP_HEIGHT,
			theme  : window.gwMesEnv.themes,
			imgSrc : "https://mesdev.lsmnm.com/SMZ/include/images/icon_15.png",
			imgPosition  : "center",
			textPosition : "left",
			imgWidth  : 13,
			imgHeight : 13,
			textImageRelation : "imageBeforeText"
		});
		$( '#' + window.gwBtn.cust9Btn ).jqxButton({
			width  : window.gwMesEnv.btnSize.cust9,
			height : BTN_TOP_HEIGHT,
			theme  : window.gwMesEnv.themes,
			imgSrc : "https://mesdev.lsmnm.com/SMZ/include/images/icon_15.png",
			imgPosition  : "center",
			textPosition : "left",
			imgWidth  : 13,
			imgHeight : 13,
			textImageRelation : "imageBeforeText"
		});
		$( '#' + window.gwBtn.cust10Btn ).jqxButton({
			width  : window.gwMesEnv.btnSize.cust10,
			height : BTN_TOP_HEIGHT,
			theme  : window.gwMesEnv.themes,
			imgSrc : "https://mesdev.lsmnm.com/SMZ/include/images/icon_12.png",
			imgPosition  : "center",
			textPosition : "left",
			imgWidth  : 13,
			imgHeight : 13,
			textImageRelation : "imageBeforeText"
		});
		//-----------------------------------------------------------------------------
		var logMsg = function( sFuncNm ) {
			//fc_showLog( 1, sFuncNm + window.gwMessage.validate.nodefined );
		};
		//-----------------------------------------------------------------------------
		if ( typeof f_printReport === 'function'  ) {
			$( '#' + window.gwBtn.printBtn ).show();
			$( '#' + window.gwBtn.printBtn ).on( 'click', function( event ) {
				if ( !$( this ).jqxButton( 'disabled' ) )	f_printReport();
			});
		} else {
			logMsg( 'f_print' );
			$( '#' + window.gwBtn.printBtn ).hide();
		};
		//-----------------------------------------------------------------------------
		if ( window.gwAuth.isSearch && typeof f_search === 'function'  ) {
			$( '#' + window.gwBtn.searchBtn ).show();
			$( '#' + window.gwBtn.searchBtn ).on( 'click', function( event ) {
				if ( !$( this ).jqxButton( 'disabled' ) ) {
					f_search();
					fc_setEditFlag( false );
				};
			});
		} else {
			logMsg( 'f_search' );
			$( '#' + window.gwBtn.searchBtn ).hide();
		};
		//-----------------------------------------------------------------------------
		if ( window.gwAuth.isSave && typeof f_save === 'function' ) {
			$( '#' + window.gwBtn.saveBtn ).show();
			$( '#' + window.gwBtn.saveBtn ).on( 'click', function( event ) {
				if ( !$( this ).jqxButton( 'disabled' ) ) {
					f_save();
					fc_setEditFlag( false );
				};
			});
		} else {
			logMsg( 'f_save' );
			$( '#' + window.gwBtn.saveBtn ).hide();
		};
		//-----------------------------------------------------------------------------
		if ( window.gwAuth.isDelete && typeof f_delete === 'function' ) {
			$( '#' + window.gwBtn.deleteBtn ).show();
			$( '#' + window.gwBtn.deleteBtn ).on( 'click', function( event ) {
				if ( !$( this ).jqxButton( 'disabled' ) ) {
					f_delete();
					fc_setEditFlag( false );
				};
			});
		} else {
			logMsg( 'f_delete' );
			$('#' + window.gwBtn.deleteBtn).hide();
		};
		//-----------------------------------------------------------------------------
		if ( window.gwAuth.isConfirm && typeof f_confirm === 'function' ) {
			$( '#' + window.gwBtn.confirmBtn ).show();
			$( '#' + window.gwBtn.confirmBtn ).on( 'click', function( event ) {
				if ( !$( this ).jqxButton( 'disabled' ) ) {
					f_confirm();
					fc_setEditFlag( false );
				};
			});
		} else {
			logMsg( 'f_confirm' );
			$( '#' + window.gwBtn.confirmBtn ).hide();
		};
		//-----------------------------------------------------------------------------
		if ( window.gwAuth.isCust1 && typeof f_cust1 === 'function' ) {
			$( '#' + window.gwBtn.cust1Btn ).show();
			$( '#' + window.gwBtn.cust1Btn ).addClass( window.gwClass.multilanguage );
			$( '#' + window.gwBtn.cust1Btn ).on( 'click', function( event ) {
				if ( !$( this ).jqxButton( 'disabled' ) )	f_cust1();
			});
		} else {
			logMsg( 'f_cust1' );
			$( '#' + window.gwBtn.cust1Btn ).hide();
		};
		//-----------------------------------------------------------------------------
		if ( window.gwAuth.isCust2 && typeof f_cust2 === 'function' ) {
			$( '#' + window.gwBtn.cust2Btn ).show();
			$( '#' + window.gwBtn.cust2Btn ).addClass( window.gwClass.multilanguage );
			$( '#' + window.gwBtn.cust2Btn ).on( 'click', function( event ) {
				if ( !$( this ).jqxButton( 'disabled' ) )	f_cust2();
			});
		} else {
			logMsg( 'f_cust2' );
			$( '#' + window.gwBtn.cust2Btn ).hide();
		};
		//-----------------------------------------------------------------------------
		if ( window.gwAuth.isCust3 && typeof f_cust3 === 'function' ) {
			$( '#' + window.gwBtn.cust3Btn ).show();
			$( '#' + window.gwBtn.cust3Btn ).addClass( window.gwClass.multilanguage );
			$( '#' + window.gwBtn.cust3Btn ).on( 'click', function( event ) {
				if ( !$( this ).jqxButton( 'disabled' ) )	f_cust3();
			});
		} else {
			logMsg( 'f_cust3' );
			$( '#' + window.gwBtn.cust3Btn ).hide();
		};
		//-----------------------------------------------------------------------------
		if ( window.gwAuth.isCust4 && typeof f_cust4 === 'function' ) {
			$( '#' + window.gwBtn.cust4Btn ).show();
			$( '#' + window.gwBtn.cust4Btn ).addClass( window.gwClass.multilanguage );
			$( '#' + window.gwBtn.cust4Btn ).on( 'click', function( event ) {
				if ( !$( this ).jqxButton( 'disabled' ) )	f_cust4();
			});
		} else {
			logMsg( 'f_cust4' );
			$( '#' + window.gwBtn.cust4Btn ).hide();
		};
		//-----------------------------------------------------------------------------
		if ( window.gwAuth.isCust5 && typeof f_cust5 === 'function' ) {
			$( '#' + window.gwBtn.cust5Btn ).show();
			$( '#' + window.gwBtn.cust5Btn ).addClass( window.gwClass.multilanguage );
			$( '#' + window.gwBtn.cust5Btn ).on( 'click', function( event ) {
				if ( !$( this ).jqxButton( 'disabled' ) )	f_cust5();
			});
		} else {
			logMsg( 'f_cust5' );
			$( '#' + window.gwBtn.cust5Btn ).hide();
		};
		if ( window.gwAuth.isCust6 && typeof f_cust6 === 'function' ) {
			$( '#' + window.gwBtn.cust6Btn ).show();
			$( '#' + window.gwBtn.cust6Btn ).addClass( window.gwClass.multilanguage );
			$( '#' + window.gwBtn.cust6Btn ).on( 'click', function( event ) {
				if ( !$( this ).jqxButton( 'disabled' ) )	f_cust6();
			});
		} else {
			logMsg( 'f_cust6' );
			$( '#' + window.gwBtn.cust6Btn ).hide();
		};
		//-----------------------------------------------------------------------------
		if ( window.gwAuth.isCust7 && typeof f_cust7 === 'function' ) {
			$( '#' + window.gwBtn.cust7Btn ).show();
			$( '#' + window.gwBtn.cust7Btn ).addClass( window.gwClass.multilanguage );
			$( '#' + window.gwBtn.cust7Btn ).on( 'click', function( event ) {
				if ( !$( this ).jqxButton( 'disabled' ) )	f_cust7();
			});
		} else {
			logMsg( 'f_cust7' );
			$( '#' + window.gwBtn.cust7Btn ).hide();
		};
		//-----------------------------------------------------------------------------
		if ( window.gwAuth.isCust8 && typeof f_cust8 === 'function' ) {
			$( '#' + window.gwBtn.cust8Btn ).show();
			$( '#' + window.gwBtn.cust8Btn ).addClass( window.gwClass.multilanguage );
			$( '#' + window.gwBtn.cust8Btn ).on( 'click', function( event ) {
				if ( !$( this ).jqxButton( 'disabled' ) )	f_cust8();
			});
		} else {
			logMsg( 'f_cust8' );
			$( '#' + window.gwBtn.cust8Btn ).hide();
		};
		//-----------------------------------------------------------------------------
		if ( window.gwAuth.isCust9 && typeof f_cust9 === 'function' ) {
			$( '#' + window.gwBtn.cust9Btn ).show();
			$( '#' + window.gwBtn.cust9Btn ).addClass( window.gwClass.multilanguage );
			$( '#' + window.gwBtn.cust9Btn ).on( 'click', function( event ) {
				if ( !$( this ).jqxButton( 'disabled' ) )	f_cust9();
			});
		} else {
			logMsg( 'f_cust9' );
			$( '#' + window.gwBtn.cust9Btn ).hide();
		};
		//-----------------------------------------------------------------------------
		if ( window.gwAuth.isCust10 && typeof f_cust10 === 'function' ) {
			$( '#' + window.gwBtn.cust10Btn ).show();
			$( '#' + window.gwBtn.cust10Btn ).addClass( window.gwClass.multilanguage );
			$( '#' + window.gwBtn.cust10Btn ).on( 'click', function( event ) {
				if ( !$( this ).jqxButton( 'disabled' ) )	f_cust10();
			});
		} else {
			logMsg( 'f_cust10' );
			$( '#' + window.gwBtn.cust10Btn ).hide();
		};
		//-----------------------------------------------------------------------------
		if ( window.gwAuth.isPrint && typeof f_print === 'function' ) {
			$( '#' + window.gwBtn.printBtn ).show();
			$( '#' + window.gwBtn.printBtn ).on( 'click', function( event ) {
				if ( !$( this ).jqxButton( 'disabled' ) )	f_print();
			});
		} else {
			logMsg( 'f_print' );
			$( '#' + window.gwBtn.printBtn ).hide();
		};
		//-----------------------------------------------------------------------------
		$('#'+ window.gwBtn.closeBtn ).on( 'click', function( event ) {
			if ( typeof f_close === 'function' ) {
				try {
					if ( !$( this ).jqxButton( 'disabled' ) )	f_close();
				} catch ( e ) {
					fc_getException( e );
				};
			};
			fc_chkClose();
		});
		//-----------------------------------------------------------------------------
		try {
			var mainTabs = parent.window.mainTab;
			var instance = mainTabs.getTabInstance();
			var currPageObjct = eval( 'instance.openTabList._' + instance.selectedItem );
			$( '#caption > h2' ).text( currPageObjct.pageNm ); // (captionName);
		} catch( e ) {
			$( '#caption > h2' ).text( window.gwMesEnv.user.pgmTitle ); // (captionName);
		};
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_includeTitle
function fc_getCustCalcWidth(outerWidth){
	
	var width = 0;
	
	width = outerWidth + 10;
	
	if(width < 70) width = 70;
	
	return width;
}
/**
 *
 */
function fc_includeMessage () {
	try {
		//console.time('fc_includeMessage');
		
		fc_setStatusMsg( '' );
		fc_includeTitle();
		//fc_getMultiLangMessage();
		fc_setGridSetting();
		fc_setOpInfo();
		
		//alert('isMultiLanguage : '+window.gwMesEnv.lang.isMultiLanguage + '/'+ window.gwMesEnv.lang.isMultiLanguageSys + '/' + contextPath.substr(1)
		//	  +' --> '+ (window.gwMesEnv.lang.isMultiLanguageSys.indexOf(contextPath.substr(1)) > -1));
		if ( window.gwMesEnv.lang.isMultiLanguage && window.gwMesEnv.lang.isMultiLanguageSys.indexOf(contextPath.substr(1)) > -1 ){
			fc_getMultiLanguage();
		}
		
		fc_setColChooser();

		// form resize --> grid resize
		$( window ).bind( 'resize', fc_resizeForm ).trigger( 'resize' );

		// fire window resize event
		fc_resizeWindow();
		if ( typeof f_readyProc === 'function' ) {
			try {
				f_readyProc();
			} catch ( e ) {
				fc_getException( e );
			};
		};
		fc_setEditFlag( false );
		window.gwMultiLangItem = null;
		window.isInit = true;
		
		//console.timeEnd('fc_includeMessage');
		
	} catch ( e ) {
		fc_getException( e );
	} finally {
		fc_showProgBar( false );
	};
};

function fc_setStatusMsg ( message ) {
	$( '#message > h2' ).text( message );
};// end of fc_setStatusMsg
/**
 *
 * @returns {Boolean}
 */
/*
function fc_getMultiLanguage () {
	try {
		if ( !window.gwMesEnv.lang.isMultiLanguage ) return;

		var arrLangId = new Array();
		for ( key in window.gwLangParam ) {
			arrLangId[ arrLangId.length ] = key;
		};
		window.gwJsonParam[ 'LANG_ID'  ] = arrLangId.join(',');
		window.gwJsonParam[ 'CATEGORY' ] = 'ITM';

		if ( fc_submit( '', 'ict.sys.init-service', 'searchMultilang', '', '', 'SCO' ) ) {
			window.gwLangResult = window.gwJsonResult[ 'RK_MULTILANG' ];
			return true;
		};
		return false;
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_getMultiLanguage
*/
function _getMultiLanguage() {
	window.gwJsonParam[ 'CATEGORY' ] = 'ITM';

	if ( fc_submit( '', 'ict.sys.init-service', 'searchMultilang', '', '', 'SCO' ) ) {
		window.gwLangResult = window.gwLangResult.concat( window.gwJsonResult[ 'RK_MULTILANG' ] );
		return true;
	};
	return false;
}; // end of _getMultiLanguage
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
function fc_getMultiLanguage() {
	var result = false;
	window.gwLangResult = [];
	var iMaxCol = 200;
	try {
		if ( !window.gwMesEnv.lang.isMultiLanguage ) return;
		var arrLangId = new Array();
		for ( key in window.gwLangParam ) {
			arrLangId[ arrLangId.length ] = key;
		};
		var iArrSize = arrLangId.length;
		for ( var i=0;i<parseInt( iArrSize/iMaxCol );i++ ) {
			var arrTmpLangId = arrLangId.slice( i*iMaxCol, ( i+1 )*iMaxCol );

			window.gwJsonParam[ 'LANG_ID' ] = arrTmpLangId.join( ',' );
			result =  _getMultiLanguage();
		};
		if ( parseInt( iArrSize/iMaxCol ) != ( iArrSize/iMaxCol ) ) {
			var arrTmpLangId = arrLangId.slice( i*iMaxCol, iArrSize );

			window.gwJsonParam[ 'LANG_ID' ] = arrTmpLangId.join( ',' );
			result =  _getMultiLanguage();
		};
		if ( result ) {
			fc_setMultiLanguage();
			return result;
		};
		return false;
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_getMultiLanguage
/**
 *
 * @param isTabAndGrid
 */
function fc_setMultiLanguage( isTabAndGrid ) {
	try {
		if ( fc_isNull( isTabAndGrid ) ) isTabAndGrid = true;
		else if ( typeof isTabAndGrid != 'boolean' ) isTabAndGrid = true;

		var preFix = window.gwMesEnv.lang.prefix;
		if ( window.gwMesEnv.lang.isUseDefLabel ) {
			if ( fc_isNull( window.gwLangResult ) ) return;

			$.each( window.gwLangResult, function( iloop, resultData ) {
				var _id = resultData.ITEM_CD;
				var itemValue = window.gwLangParam[ _id ];

				if ( !fc_isNull( itemValue ) ) {
					var _value = itemValue.toString();
					var _text = '';
					switch ( _value ) {
						case '0': if ( !fc_isNull( resultData.CONTENTS      ) ) _text = resultData.CONTENTS;		break;
						case '1': if ( !fc_isNull( resultData.ALT_CONTENTS1 ) ) _text = resultData.ALT_CONTENTS1;	break;
						case '2': if ( !fc_isNull( resultData.ALT_CONTENTS2 ) ) _text = resultData.ALT_CONTENTS2;	break;
						case '3': if ( !fc_isNull( resultData.ALT_CONTENTS3 ) ) _text = resultData.ALT_CONTENTS3;	break;
						default: _text = ''; break;
					}; // end of switch ( _value )

					var obj1 = $( '.' + window.gwClass.multilanguage).filter( "[" + window.gwMesEnv.item.itemcd + "='" + _id + "'][" + window.gwMesEnv.item.itemvalue + "='" + _value + "']" );
					$.each( obj1 , function ( iloop, objData ) {
						var obj;
						if ( objData.nodeName == 'LABEL' || objData.nodeName == 'DIV' || objData.nodeName == 'SPAN' ) {
							obj = obj1;
						} else {
							obj  = $( obj1 ).find( '.ui-jqgrid-sortable' );
							if ( obj.length == 0 ) obj = obj1;
						};

						$.each( obj , function ( sloop, objData ) {
							if ( fc_isNull( objData.firstChild ) ) {
								objData.innerText = _text;
							} else {
								if ( fc_isNull( objData.firstChild.innerText ) ) {
									objData.firstChild.data = _text;
								} else {
									objData.firstChild.innerText = _text;
								};
							};
						});
					});
				}; // end of if ( !fc_isNull(itemValue) ) {
			});
		} else {
			var indexResult = new Object();
			if ( !fc_isNull( window.gwLangResult ) ) {
				for ( var loop=0;loop<window.gwLangResult.length;loop++ ) {
					var _langId = window.gwLangResult[ loop ].ITEM_CD;
					indexResult[ _langId ] = loop;
				};
			};

			for ( var key in window.gwLangParam ) {
				var _id = key;
				var itemValue = window.gwLangParam[ key ];
				for ( var iloop=0;iloop<itemValue.length;iloop++ ) {
					var _value = itemValue.substr( iloop, 1 );
					var _text = '', iIndex = indexResult[ _id ];
					try {
						switch ( _value ) {
							case '0': if ( !fc_isNull( window.gwLangResult[ iIndex ].CONTENTS      ) ) _text = window.gwLangResult[ iIndex ].CONTENTS; 	    else _text = preFix + _id; break;
							case '1': if ( !fc_isNull( window.gwLangResult[ iIndex ].ALT_CONTENTS1 ) ) _text = window.gwLangResult[ iIndex ].ALT_CONTENTS1; else _text = preFix + _id; break;
							case '2': if ( !fc_isNull( window.gwLangResult[ iIndex ].ALT_CONTENTS2 ) ) _text = window.gwLangResult[ iIndex ].ALT_CONTENTS2; else _text = preFix + _id; break;
							case '3': if ( !fc_isNull( window.gwLangResult[ iIndex ].ALT_CONTENTS3 ) ) _text = window.gwLangResult[ iIndex ].ALT_CONTENTS3; else _text = preFix + _id; break;
							default: _text = preFix + _id; break;
						}; // end of switch ( _value )
					} catch (e) {
						_text = preFix + _id;
					};

					var obj1 = (  $( '.' + window.gwClass.multilanguage ).filter( "[" + window.gwMesEnv.item.itemcd + "='" + _id + "'][" + window.gwMesEnv.item.itemvalue + "='" + _value + "']" )
							   || $( 'button' ).filter( "[" + window.gwMesEnv.item.itemcd + "='" + _id + "'][" + window.gwMesEnv.item.itemvalue + "='" + _value + "']" ) );
					$.each( obj1 , function ( iloop, objData ) {
						var obj;
						if ( objData.nodeName == 'LABEL' || objData.nodeName == 'DIV' ) {
							obj = obj1;
						} else {
							obj  = $( obj1 ).find( '.ui-jqgrid-sortable' );
							if ( obj.length == 0 ) obj = obj1;
						};

						$.each( obj , function ( sloop, objData ) {
							if ( fc_isNull( objData.firstChild ) ) {
								objData.innerText = _text;
							} else {
								if ( fc_isNull( objData.firstChild.innerText ) ) {
									if ( objData.firstChild.nodeName == 'DIV' )
										objData.firstChild.innerText = _text;
									else
										objData.firstChild.data = _text;
								} else {
									objData.firstChild.innerText = _text;
								};
							}; // end of if ( fc_isNull( objData.firstChild ) ) {
						}); // end of $.each( obj , function ( sloop, objData ) {
					}); // end of $.each( obj1 , function ( iloop, objData ) {
				}; // end of for ( var jloop = 0; jloop<itemValue.length; jloop++ )
			}; // end of for ( var key in  window.gwLangParam )
		}; // end of if ( window.isUseDefValue )

		if ( isTabAndGrid ) {
			fc_getTabMultiLanguage();
			fc_getGridMultiLanguage();
		};
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_setMultiLanguage
/**
 *
 */
function fc_getGridMultiLanguage() {
	var preFix = window.gwMesEnv.lang.prefix;
	var arrGroup = new Array();
	var arrCol = new Array();
	
	if ( window.gwMesEnv.lang.isUseDefLabel ) {
		$.each( window.gwGridSize, function ( iloop, gridData ) {
			var arrColLangItem      = fc_getExtraOption( gridData.name, 'colMultiLang'      );
			var arrColgroupLangItem = fc_getExtraOption( gridData.name, 'colGroupMultiLang' );

			var colGroupSource = fc_getGridParam( gridData.name, 'columngroups' );
			var indexGroup = new Object();
			if ( !fc_isNull( colGroupSource ) ) {
				for ( var loop=0;loop<colGroupSource.length;loop++ ) {
					var _langId = colGroupSource[ loop ].name;
					indexGroup[ _langId ] = loop;
				};
			};

			var indexResult = new Object();
			var isIndexResult = false;
			if ( !fc_isNull( window.gwLangResult ) ) {
				for ( var loop=0;loop<window.gwLangResult.length;loop++ ) {
					var _langId = window.gwLangResult[ loop ].ITEM_CD;
					indexResult[ _langId ] = loop;
					isIndexResult = true;
				};
			};
			if ( !isIndexResult ) {
				return true;
			}

			$.each( arrColgroupLangItem, function( idx, colgroupdata ) {
				var colGrpObj  = {};
				var itemValue  = colgroupdata.ITEM_VAL;
				var _value     = itemValue.toString();
				var _text      = '';
				var iIndex     = indexResult[ colgroupdata.ITEM_CD ];
				var groupIndex = indexGroup[ colgroupdata.COL_NM ];

				try {
					switch ( _value ) {
						case '0': if ( !fc_isNull( window.gwLangResult[ iIndex ].CONTENTS      ) ) _text = window.gwLangResult[ iIndex ].CONTENTS;		break;
						case '1': if ( !fc_isNull( window.gwLangResult[ iIndex ].ALT_CONTENTS1 ) ) _text = window.gwLangResult[ iIndex ].ALT_CONTENTS1;	break;
						case '2': if ( !fc_isNull( window.gwLangResult[ iIndex ].ALT_CONTENTS2 ) ) _text = window.gwLangResult[ iIndex ].ALT_CONTENTS2;	break;
						case '3': if ( !fc_isNull( window.gwLangResult[ iIndex ].ALT_CONTENTS3 ) ) _text = window.gwLangResult[ iIndex ].ALT_CONTENTS3;	break;
						default: _text = ''; break;
					}; // end of switch ( _value )
				} catch ( e ) {
					_text = '';
				};

				if ( !fc_isNull( _text ) ) {
					colGrpObj.datafield = colgroupdata.COL_NM;
					colGrpObj.text      = _text;

					arrGroup.push(colGrpObj);
				};
			});

			$.each( arrColLangItem, function( idx, coldata ) {
				var colObj    = {};
				var itemValue = coldata.ITEM_VAL;
				var _value    = itemValue.toString();
				var _text = '', iIndex = indexResult[ coldata.ITEM_CD ];
				try {
					switch ( _value ) {
						case '0': if ( !fc_isNull( window.gwLangResult[ iIndex ].CONTENTS      ) ) _text = window.gwLangResult[ iIndex ].CONTENTS;		break;
						case '1': if ( !fc_isNull( window.gwLangResult[ iIndex ].ALT_CONTENTS1 ) ) _text = window.gwLangResult[ iIndex ].ALT_CONTENTS1;	break;
						case '2': if ( !fc_isNull( window.gwLangResult[ iIndex ].ALT_CONTENTS2 ) ) _text = window.gwLangResult[ iIndex ].ALT_CONTENTS2;	break;
						case '3': if ( !fc_isNull( window.gwLangResult[ iIndex ].ALT_CONTENTS3 ) ) _text = window.gwLangResult[ iIndex ].ALT_CONTENTS3;	break;
						default: _text = ''; break;
					}; // end of switch ( _value )
				} catch ( e ) {
					_text = '';
				};

				if ( !fc_isNull( _text ) ) {
					colObj.datafield = coldata.COL_NM;
					colObj.text      = _text;
					arrCol.push(colObj);
				};
			});
			var instance = $( '#' + gridData.name ).jqxGrid( 'getInstance' );
			instance.setheadermultilang( arrCol, arrGroup );
		});
	} else {
		$.each( window.gwGridSize, function( iloop, gridData ) {
			var arrColLangItem      = fc_getExtraOption( gridData.name, 'colMultiLang' );
			var arrColgroupLangItem = fc_getExtraOption( gridData.name, 'colGroupMultiLang' );

			var colGroupSource = fc_getGridParam( gridData.name, 'columngroups' );
			var indexGroup = new Object();
			if ( !fc_isNull( colGroupSource ) ) {
				for ( var loop=0;loop<colGroupSource.length;loop++ ) {
					var _langId = colGroupSource[ loop ].name;
					indexGroup[ _langId ] = loop;
				};
			};

			var indexResult = new Object();
			var isIndexResult = false;
			if ( !fc_isNull( window.gwLangResult ) ) {
				for ( var loop=0;loop<window.gwLangResult.length;loop++ ) {
					var _langId = window.gwLangResult[ loop ].ITEM_CD;
					indexResult[ _langId ] = loop;
					isIndexResult = true;
				};
			};
			if ( !isIndexResult ) {
				return true;
			}
			
			$.each( arrColgroupLangItem, function( idx, colgroupdata ) {
				var colGrpObj  = {};
				var itemValue  = colgroupdata.ITEM_VAL;
				var _value     = itemValue.toString();
				var _text      = '';
				var iIndex     = indexResult[ colgroupdata.ITEM_CD ];
				var groupIndex = indexGroup[ colgroupdata.COL_NM ];

				try {
					switch ( _value ) {
						case '0': if ( !fc_isNull( window.gwLangResult[ iIndex ].CONTENTS      ) ) _text = window.gwLangResult[ iIndex ].CONTENTS;      else _text = preFix + colgroupdata.ITEM_CD; break;
						case '1': if ( !fc_isNull( window.gwLangResult[ iIndex ].ALT_CONTENTS1 ) ) _text = window.gwLangResult[ iIndex ].ALT_CONTENTS1; else _text = preFix + colgroupdata.ITEM_CD; break;
						case '2': if ( !fc_isNull( window.gwLangResult[ iIndex ].ALT_CONTENTS2 ) ) _text = window.gwLangResult[ iIndex ].ALT_CONTENTS2; else _text = preFix + colgroupdata.ITEM_CD; break;
						case '3': if ( !fc_isNull( window.gwLangResult[ iIndex ].ALT_CONTENTS3 ) ) _text = window.gwLangResult[ iIndex ].ALT_CONTENTS3; else _text = preFix + colgroupdata.ITEM_CD; break;
						default: _text = preFix + colgroupdata.ITEM_CD; break;
					}; // end of switch ( _value )
				} catch (e) {
					_text = preFix + colgroupdata.ITEM_CD;
				};

				colGrpObj.datafield = colgroupdata.COL_NM;
				colGrpObj.text      = _text;

				arrGroup.push(colGrpObj);
			});

			$.each( arrColLangItem, function( idx, coldata ) {
				var colObj    = {};
				var itemValue = coldata.ITEM_VAL;
				var _value    = itemValue.toString();
				var _text     = '';
				var iIndex    = indexResult[ coldata.ITEM_CD ];
				try {
					switch ( _value ) {
						case '0': if ( !fc_isNull( window.gwLangResult[ iIndex ].CONTENTS      ) ) _text = window.gwLangResult[ iIndex ].CONTENTS;      else _text = preFix + coldata.ITEM_CD; break;
						case '1': if ( !fc_isNull( window.gwLangResult[ iIndex ].ALT_CONTENTS1 ) ) _text = window.gwLangResult[ iIndex ].ALT_CONTENTS1; else _text = preFix + coldata.ITEM_CD; break;
						case '2': if ( !fc_isNull( window.gwLangResult[ iIndex ].ALT_CONTENTS2 ) ) _text = window.gwLangResult[ iIndex ].ALT_CONTENTS2; else _text = preFix + coldata.ITEM_CD; break;
						case '3': if ( !fc_isNull( window.gwLangResult[ iIndex ].ALT_CONTENTS3 ) ) _text = window.gwLangResult[ iIndex ].ALT_CONTENTS3; else _text = preFix + coldata.ITEM_CD; break;
						default: _text = preFix + coldata.ITEM_CD; break;
					}; // end of switch ( _value )
				} catch ( e ) {
					_text = preFix + coldata.ITEM_CD;
				};

				colObj.datafield = coldata.COL_NM;
				colObj.text      = _text;
				arrCol.push( colObj );
			});

			var instance = $( '#' + gridData.name ).jqxGrid( 'getInstance' );

			if ( gridData.gridtype != 'tab' ) {
				instance.setheadermultilang( arrCol, arrGroup );
			} else {
				if ( fc_isNull( gridData.isRunMultiLang ) ) {
					instance.setheadermultilang( arrCol, arrGroup );
					gridData.isRunMultiLang = true;
				} else {
					if ( !gridData.isRunMultiLang ) {
						instance.setheadermultilang( arrCol, arrGroup );
						gridData.isRunMultiLang = true;
					}
				}
			}
		});
	};
}; // end of fc_getGridMultiLanguage
/**
 *
 */
function fc_getTabMultiLanguage() {
	var preFix = window.gwMesEnv.lang.prefix;

	var indexResult = new Object();
	if ( !fc_isNull( window.gwLangResult ) ) {
		for ( var loop=0;loop<window.gwLangResult.length;loop++ ) {
			var _langId = window.gwLangResult[ loop ].ITEM_CD;
			indexResult[ _langId ] = loop;
		};
	};
	if ( window.gwMesEnv.lang.isUseDefLabel ) {
		for ( var key in gwTabMultiLang ) {
			var arrTabLangItem =  gwTabMultiLang[ key ];
			$.each( arrTabLangItem, function( idx, tabdata ) {
				var itemValue = tabdata.ITEM_VAL;
				var _value    = itemValue.toString();
				var _text     = '';
				var iIndex    = indexResult[ tabdata.ITEM_CD ];
				try {
					switch ( _value ) {
						case '0': if ( !fc_isNull( window.gwLangResult[ iIndex ].CONTENTS      ) ) _text = window.gwLangResult[ iIndex ].CONTENTS;      break;
						case '1': if ( !fc_isNull( window.gwLangResult[ iIndex ].ALT_CONTENTS1 ) ) _text = window.gwLangResult[ iIndex ].ALT_CONTENTS1; break;
						case '2': if ( !fc_isNull( window.gwLangResult[ iIndex ].ALT_CONTENTS2 ) ) _text = window.gwLangResult[ iIndex ].ALT_CONTENTS2; break;
						case '3': if ( !fc_isNull( window.gwLangResult[ iIndex ].ALT_CONTENTS3 ) ) _text = window.gwLangResult[ iIndex ].ALT_CONTENTS3; break;
						default: _text = ''; break;
					}; // end of switch ( _value )
				} catch ( e ) {
					_text = '';
				};

				if ( !fc_isNull( _text ) ) {
					fc_setTabTitle( key, tabdata.TAB_IDX, _text );
				};
			});
		};
	} else {
		for ( var key in gwTabMultiLang ) {
			var arrTabLangItem =  gwTabMultiLang[ key ];
			$.each( arrTabLangItem, function( idx, tabdata ) {
				var itemValue = tabdata.ITEM_VAL;
				var _value    = itemValue.toString();
				var _text     = '';
				var iIndex    = indexResult[ tabdata.ITEM_CD ];
				try {
					switch ( _value ) {
						case '0': if ( !fc_isNull( window.gwLangResult[ iIndex ].CONTENTS      ) ) _text = window.gwLangResult[ iIndex ].CONTENTS;      else _text = preFix + tabdata.ITEM_CD; break;
						case '1': if ( !fc_isNull( window.gwLangResult[ iIndex ].ALT_CONTENTS1 ) ) _text = window.gwLangResult[ iIndex ].ALT_CONTENTS1; else _text = preFix + tabdata.ITEM_CD; break;
						case '2': if ( !fc_isNull( window.gwLangResult[ iIndex ].ALT_CONTENTS2 ) ) _text = window.gwLangResult[ iIndex ].ALT_CONTENTS2; else _text = preFix + tabdata.ITEM_CD; break;
						case '3': if ( !fc_isNull( window.gwLangResult[ iIndex ].ALT_CONTENTS3 ) ) _text = window.gwLangResult[ iIndex ].ALT_CONTENTS3; else _text = preFix + tabdata.ITEM_CD; break;
						default: _text = preFix + tabdata.ITEM_CD; break;
					}; // end of switch ( _value )
				} catch ( e ) {
					_text = preFix + tabdata.ITEM_CD;
				};
				fc_setTabTitle( key, tabdata.TAB_IDX, _text );
			});
		};
	};
}; // end of fc_getTabMultiLanguage
/**
 *
 * @param cboList
 * @returns {Boolean}
 */
function fc_getLovData( cboList ) {
	fc_setMultiItem( [ { itemCd:'CAP_ALL', itemVvalue: 0 } ] );
	try {
		var bFlag = false;
		var obj = new Array();

		try {
			$.each( cboList , function( iloop, cboData ) {
				var paramData = new Object();
				paramData[ 'MASTER_CD' ] = cboData.code;
				paramData[ 'TAGS'      ] = cboData.tags;
				paramData[ 'EXPTAGS'   ] = cboData.exptags;
				paramData[ 'ALIAS'     ] = cboData.alias;
				// 2022.04.21 Revision by. MH_PROC_LOV, MG_DEPT_CD 부서 및 공정 코드를 화면별로 구분하기 위함. Start
				paramData[ 'MES_GW_PGM_ID' ] = window.gwMesEnv.user.pgmId;
				// 2022.04.21 Revision by. MH_PROC_LOV, MG_DEPT_CD 부서 및 공정 코드를 화면별로 구분하기 위함. End
				if ( !fc_isNull( cboData.condition ) ) {
					$.each( cboData.condition , function( item, value ) {
						paramData[ item ] = value;
					});
				};
				obj[ iloop ] = paramData;
			});
			window.gwJsonParam = { CODE: JSON.stringify( { CODE: obj } ) };
			window.gwJsonParam[ 'gwKeyList' ] = JSON.stringify( { gwKeyList: [ { key: 'CODE' }, ] } ) ;
			if ( fc_submit( '', 'ict.sys.code.combo-service', 'find', '', '', 'SCO' ) ) {
				//window.gwCodeResult = window.gwCodeResult.concat( window.gwJsonResult );
				$.each( window.gwJsonResult, function( key, item ){
					window.gwCodeResult[ key ] = item;
				});
				bFlag = true;
			} else {
				bFlag = false;
			};
		} catch ( e ) {
			bFlag = false;
			fc_getException( e );
		};
		return bFlag;
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_getLovData
/**
 *
 * @param objList
 * @returns {Boolean}
 */
function fc_setLovData( objList ) {
	var bFlag   = false;
	var resData = '';
	var defData = { CD_VAL:'', CD_NM:'' };
	var allName = ( fc_isNull( fc_getMultiItem( 'CAP_ALL' ) ) ? 'ALL' : fc_getMultiItem( 'CAP_ALL' ) );
	var _targetObj, _type = '', _code = '', _format = '', _nullable = '', _defval, _listCount, _useAttValue = '', _useall = '';

	try {
		for ( var iloop=0;iloop<objList.length;iloop++ ) {
			var objData   = objList [ iloop ];
			var strOption = '';
			_targetObj   = objData.object.split( '.' );
			_type        = ( _targetObj[ 1 ] == undefined ) ? 'FORM' : 'GRID';
			_code        = objData.code;
			_format      = objData.format.toUpperCase();
			_nullable    = fc_isNull( objData.nullable ) ? false : objData.nullable;
			_useall      = fc_isNull( objData.useall   ) ? false : objData.useall;
			_defval      = objData.defval;
			_listCount   = objData.listcount;
			_useAttValue = fc_setValue( objData.attrvalue, '' );

			var checktype = true;
			if ( !( fc_checkDatatype( objData.object, 'lov' ) || fc_checkDatatype( objData.object, 'cbolov' ) || fc_checkDatatype( objData.object, 'chklov' ) ) ) {
				fc_showLog( 2, '@@@@@  ' + objData.object + ' does not have "LOV datatype" ');
				checktype = false;
			};
			if ( checktype ) {
				var arrGridData = new Array();
				resData = $.parseJSON( JSON.stringify( window.gwCodeResult[ _code ] ) );

				// ALL option
				if ( _nullable ) {
					arrGridData[ arrGridData.length ] = defData;
				};
				if ( _useall ) {
					var elObj = {}
					elObj.CD_VAL = '*';
					switch ( _format ) {
						case 'K'   : elObj.CD_NM = '*'; 			break;
						case 'V'   : elObj.CD_NM = allName; 		break;
						case 'V:K' : elObj.CD_NM = allName + ':*';  break;
						default    : elObj.CD_NM = '*:' + allName;	break;
					};
					arrGridData[ arrGridData.length ] = elObj;
				};

				if ( resData && resData.length ) {
					for ( var jloop=0;jloop<resData.length;jloop++ ) {
						var cdVal = resData[ jloop ].CD_VAL;
						var cdNm  = '';
						try {
							switch( _useAttValue ) {
							case 'ATTR1': cdNm = resData[ jloop ].ATTR1; break;
							case 'ATTR2': cdNm = resData[ jloop ].ATTR2; break;
							case 'ATTR3': cdNm = resData[ jloop ].ATTR3; break;
							default :
								cdNm = resData[ jloop ].CD_NM; break;
							};
						} catch ( e ) {
							cdNm = resData[ jloop ].CD_NM; break;
						};
						var _newNm = '';
						switch ( _format ) {
							case 'K' : _newNm = cdVal; 	break;
							case 'V' : _newNm = cdNm; 	break;
							case 'V:K' : _newNm = cdNm + ':' + cdVal;   break;
							default :
								_newNm = cdVal + ':' + cdNm;
								break;
						};
						var elObj = {}
						elObj.CD_VAL = cdVal;
						elObj.CD_NM  = _newNm;
						arrGridData[ arrGridData.length ] = elObj;
					};
				}; // end of if ( resData && resData.length )

				if ( _type == 'GRID' ) {
					if ( arrGridData.length == 0 ) {
						arrGridData[ arrGridData.length ] = defData;
					};
					fc_setGridCombo( _targetObj[ 0 ], _targetObj[ 1 ], arrGridData, _listCount );
				} else {					
					if ( fc_checkDatatype( objData.object, 'lov' ) || fc_checkDatatype( objData.object, 'chklov' ) ) {
						fc_setFormDropdownListData( _targetObj[ 0 ], arrGridData, _listCount, null, objData.object );
					} else {
						fc_setFormComboboxData( _targetObj[ 0 ], arrGridData, _listCount );
					};
					if ( !fc_isNull( _defval ) ) {
						$( '#' + _targetObj[ 0 ] ).val( _defval );
					};
				};
			}; // end of if ( checktype )
		};
		bFlag = true;
	} catch ( e ) {
		fc_getException( e );
		bFlag = false;
	};
	return bFlag;
}; // end of fc_setLovData
/**
 *
 * @param objList
 * @returns {Boolean}
 */
function fc_setCodeList ( objList ) {
	var bFlag = false;
	var _targetObj, _type = '';
	var arrPopupInfo = new Array();

	try {
		$.each( objList , function( iloop, objData ) {
			_targetObj = objData.object.split( '.' );
			_type      = ( _targetObj[ 1 ] == undefined ) ? "FORM" : "GRID";

			var popupObj = new Object();
			popupObj.code      		 = fc_isNull( objData.code      ) ? '' : objData.code;
			popupObj.title     		 = fc_isNull( objData.title     ) ? '' : objData.title;
			popupObj.optSearch 		 = fc_isNull( objData.optSearch ) ? '' : objData.optSearch;
			popupObj.optTitle  		 = fc_isNull( objData.optTitle  ) ? '' : objData.optTitle;
			popupObj.optValue1 		 = fc_isNull( objData.optValue1 ) ? '' : objData.optValue1;
			popupObj.optValue2 		 = fc_isNull( objData.optValue2 ) ? '' : objData.optValue2;
			popupObj.optValue3 		 = fc_isNull( objData.optValue3 ) ? '' : objData.optValue3;
			popupObj.optResult 		 = fc_isNull( objData.optResult ) ? '' : objData.optResult;
			popupObj.defaultChkValue = fc_isNull( objData.defaultChkValue ) ? '' : objData.defaultChkValue;
			
			popupObj.paramPopup = function () {
				if ( typeof f_setParamPopup === 'function' ) {
					try {
						var paramPopup = f_setParamPopup( objData );
						if ( fc_isNull( paramPopup[ 'optResult' ] ) )
							paramPopup[ 'optResult' ] = paramPopup[ 'optTitle' ];

						return paramPopup;
					} catch ( e ) {
						fc_getException( e );
					};
				};
				return null;
			};

			var checktype = true;
			if ( !fc_checkDatatype( objData.object, 'popup' ) ) {
				fc_showLog( 2, '@@@@@  ' + objData.object + ' does not have "POPUP datatype" ' );
				checktype = false;
			};

			if ( checktype ) {
				if ( _type == "GRID" ) {
					var gridPopupObj = fc_getExtraOption( _targetObj[ 0 ], "gridPopup" );

					if ( gridPopupObj == undefined ) {
						gridPopupObj = new Object();
					};
					gridPopupObj[ _targetObj[ 1 ] ] = popupObj;
					fc_setExtraOption( _targetObj[ 0 ], "gridPopup", gridPopupObj );
				} else {
					window.gwPopupSource[ _targetObj[ 0 ] ] = popupObj;
				};
			};
		});
		bFlag = true;
	} catch ( e ) {
		fc_getException( e );
		bFlag = false;
	}
	return bFlag;
};// end of function fc_setCodeList
function fc_chkClose( index ) {
//	if ( fc_getEditFlag() == true ) {
//		fc_showConfirmMessage( 'S'
//				             , fc_getMessage( 'MSG00009' )
//						     , function () { fc_closeScreen( index ); }
//						     );
//	} else {
		fc_closeScreen( index );
//	};
}; // end of fc_chkClose
function fc_closeScreen( index ) {
	try {
		var parentPop = parent.window.popWin;
		parentPop.closePop();
	} catch ( e1 ) {};

	try {
		var mainTabs = parent.window.mainTab;
		mainTabs.closeTab( index );
	} catch ( e2 ) {
		window.close();
	};
}; // end of fc_closeScreen
//=================================================================================================//
(function ($) {
	$.fn.oldReady = $.fn.ready;
	$.fn.ready = function ( fn ) {
		return $.fn.oldReady( function() {
			try {
				if ( fn ) fn.apply( $, arguments );
				fc_setEditFlag( false );
			} catch( e ) {
				fc_getException( e );
			};
		});
	};

	$.fn.getWidthInPercent = function () {
		var width = ( parseFloat( $( this ).css( 'width' ) ) + parseFloat( $( this ).css( 'margin-left' ) ) ) / parseFloat( $( this ).parent().parent().css( 'width' ) );
		return Math.round( 100 * width ) + '%';
	};
	$.fn.getHeightInPercent = function () {
		var height = ( parseFloat( $( this ).css( 'height' ) ) + parseFloat( $( this ).css( 'margin-top' ) ) ) / parseFloat( $( this ).parent().css( 'height' ) );
		return Math.round( 100 * height ) + '%';
	};
})(jQuery);
//=================================================================================================//