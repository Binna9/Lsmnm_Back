/**
 * Declare variable
 */

/**
 * Declare Initial JS Function
 */
$( function() {
	fc_showLog( 1, '***** jQuery Tab Util' );
}); // end of $( function () )
/** -----------------------------------------------------------------------------
 * @Name			jQueryTabs
 * @Description	Create jQueryTab ojbect in jQuery UI
 * @Parameter		targetObj : target object for add jQueryTab object
 * @Returns			
 * @Method			addTab : add Tab
 * 					openTab : Open Tab (if tab is not exist, add tab)
 * 					closeallTab : close all tabs
 * @Example			
 * ---------------------------------------------------------------------------*/
function jQueryTabs( targetObj, tabId, closeFlag, mainFlag ) {	
	if ( fc_isNull( closeFlag ) ) closeFlag = true;
	if ( fc_isNull( mainFlag  ) ) mainFlag  = false;
	if ( targetObj != undefined ) {
		targetObj.append( '<div id="' + tabId + '"  style="border:1;" class="tabs"><ul><li>&nbsp;</li></ul><div></div></div>' );
	};	
	if ( mainFlag ) {
		$( '#' + tabId ).addClass( 'ui-maintabs' );
	};	
	var arrTitle = new Array();
	
	var tabsObj = $( '#' + tabId ).jqxTabs( {
		width : '100%',
		height : '100%',
		disabled : false,
		rtl : false,
		theme : window.gwMesEnv.themes,
//		scrollAnimationDuration : 250,
		enabledHover : true,
		collapsible : false,
		animationType : 'none',
		enableScrollAnimation : true,
//		contentTransitionDuration : 450,
		toggleMode : 'click',
//		selectedItem : 0,
		position : 'top',
		selectionTracker : false,
		scrollable : true,
		scrollPosition : 'both',
		scrollStep : 100,
		autoHeight : true,
		showCloseButtons : closeFlag,
		closeButtonSize : 13,
//		initTabContent : function(tab) {
//						},
		keyboardNavigation : true,
		reorder : true
	});
	
	var tabInstance =  $( '#' + tabId ).jqxTabs( 'getInstance' );
	
	tabInstance.removeAt( 0 );
	arrTitle = fc_getAllTabTitle( tabId );

	this.getTabsInstance = tabInstance;  // end of getTabsInstance
	this.getTabs = tabsObj;  // end of getTabs
	this.tabId   = tabId;
	
	tabInstance['openTabList'] = new Object();
}; // end of jQueryTabs

jQueryTabs.prototype = {
		allTabTitle    : function () { return fc_getAllTabTitle( this.tabId ); }, // end of allTitle
        addTab         : function ( tabText, contentsObj, iframeFlag ) { fc_setAddTab( this.tabId, tabText, contentsObj, iframeFlag ); }, // end of addTab
        addIframeTab   : function ( tabText, tabPage ) { fc_setAddIframeTab( this.tabId, tabText, tabPage ); }, // end of addIframeTab
		addContentsTab : function ( tabText, contents ) { fc_setAddContentsTab( this.tabId, tabText, contents ); }, // end of addddContentsTab
		addContentsTabbyObj : function ( tabText, contentsObj ) { fc_setAddContentsTabByObj( this.tabId, tabText, contentsObj ); }, // end of addddContentsTab
		selectFirstTab : function () { fc_selectFirstTab( this.tabId ); }, // end of addddContentsTab
		openTab        : function ( sourceObj, sourceParams, reloadFlag ) { fc_openTab( this.tabId, sourceObj, sourceParams, reloadFlag ) }, // end of openTab
		openTabByObj   : function ( obj, sourceParams, reloadFlag ) { fc_openTabByObj( this.tabId, obj, sourceParams, reloadFlag ) }, // end of openTab
		closeTab : function ( index ) {
		  		var selectTab;
		  		if ( fc_isNull( index ) )
		  			selectTab = this.getTabsInstance.val();
		  		else selectTab = index;
		  		this.getTabsInstance.removeAt( selectTab );
			}, // end of closeTab
		setCloseTabFlag : function ( flag ) { fc_setCloseTabFlag( this.tabId, flag ) },
		setTabWidth  : function ( tabWidth ) { fc_setTabWidth( this.tabId, tabWidth); }, // end of setTabWidth
		setTabHeight : function ( tabHeight ) { fc_setTabHeight( this.tabId, tabHeight); }, // end of setTabHeight
		setTabTitle  : function ( tabIndex, titleText ) { fc_setTabTitle( this.tabId, tabIndex, titleText ); }, // end of setTabTitle
		getTabTitle  : function ( tabIndex ) { fc_getTabTitle( this.tabId, tabIndex ); }, // end of getTabTitle
		setTabBindEvent : function( event, callback ) { fc_setTabBindEvent( this.tabId, event, callback ); },
		getTabInstance  : function() { return fc_getTabInstance( this.tabId ); },
		getTabSelectedIndex : function() { return fc_getTabSelectedIndex( this.tabId ); },
		setTabObj : function( arrtabObj ) { fc_setTabObj(this.tabId, arrtabObj ); },
		getTabObj : function() { return fc_getTabSelectedIndex( this.tabId ); },
		getTabObjByIndex  : function( selectIndex ) { return fc_getTabObjByIndex( this.tabId, selectIndex ); },
		getTabSelectedObj : function() { return fc_getTabSelectedObj( this.tabId ); }
}; //end of jQueryTabs.prototype

function fc_setCloseTabFlag( tabId, flag ) {
	closeFlag = flag;
}; // end of fc_setCloseTabFlag
/**
 * 
 * @param tabId
 * @param tabText
 * @param contentsObj
 * @param iframFlag
 */
function fc_setAddTab( tabId, tabText, contentsObj, iframFlag ) {
	if ( fc_isNull( iframFlag ) ) iframFlag = false; 
	if ( iframFlag ) {
		fc_setAddIframeTab( tabId, tabText, contentsObj );
	} else {
		fc_setAddContentsTab( tabId, tabText, contentsObj );
	};
}; // end of fc_setAddIframeTab
/**
 * 
 * @param tabId
 * @param sourceObj
 * @param sourceParams
 * @param reloadFlag
 */
function fc_openTab( tabId, sourceObj, sourceParams, reloadFlag ) {
	var pageId = sourceObj.attr( 'PGM_ID' );
	var pageNm = sourceObj.attr( 'MNU_NM' );
	var parms1 = sourceObj.attr( 'MNU_PARAM1' );
	var parms2 = sourceObj.attr( 'MNU_PARAM2' );
	var parms3 = sourceObj.attr( 'MNU_PARAM3' );
	var mnuId  = sourceObj.attr( 'MNU_ID' );
	var pgmTy  = sourceObj.attr( 'PGM_TY' );
	var parms  = sourceObj.attr( 'parms' );
	var compPgmNm = pageNm;
	
	var addParams = ( fc_isNull( parms ) ? '' : parms );
	if ( !fc_isNull( sourceParams ) ) addParams = sourceParams;
	if ( !fc_isNull( parms1 ) ) addParams += '&MNU_PARAM1=' + parms1;
	if ( !fc_isNull( parms2 ) ) addParams += '&MNU_PARAM2=' + parms2;
	if ( !fc_isNull( parms3 ) ) addParams += '&MNU_PARAM3=' + parms3;
	
	if ( addParams.indexOf( '?' ) == -1 ) {
		addParams = '?' + addParams.substring( 1 );
	};
	/* 2017.09.20 add main tab list
	if ( window.gwMesEnv.screen.tabCaptionLth > 0 ) {
		var length = 0;
		if ( window.gwMesEnv.mainmenu.isPgmId )
			length = window.gwMesEnv.screen.tabCaptionLth - pageId.length - 3;
		else
			length = window.gwMesEnv.screen.tabCaptionLth;
		
		if ( compPgmNm.length > length ) compPgmNm = compPgmNm.substr( 0, length -3 ) + '...';
	};
	var arrTabTitle = fc_getAllTabTitle( tabId );
	*/
	var arrTabTitle = new Array();
	var tabObj      = window.gwCodeResult[ 'TAB_LIST' ];
	if ( !fc_isNull( tabObj ) ) {
		var tabLength   = tabObj.length;
		for ( var loop=0;loop<tabLength;loop++ ) {
			arrTabTitle.push( tabObj[ loop ].CD_NM );
		};
	};
	var moduleId = pageId.substring( 0, 3 );
	var tabIndex = $.inArray( '[' + pageId + '] ' + compPgmNm, arrTabTitle );
	
	if ( tabIndex == -1) {
		window.gwMesEnv.user.pgmId    = pageId;
		window.gwMesEnv.user.pgmTitle = pageNm;
		window.gwMesEnv.user.pgmTy    = pgmTy;
		
		fc_setSessionItem( 'GW_SYSTEM_ENV', window.gwMesEnv );
		
		var pageUrl = '../' + moduleId + '/' + pageId + '.do' + addParams;
		// is Report Page
		if ( pgmTy == 'R' ) {
			fc_setAddReportIframeTab( tabId, '[' + window.gwMesEnv.user.pgmId + '] ' + window.gwMesEnv.user.pgmTitle, pageUrl, addParams );
		} else {
			fc_setAddIframeTab( tabId, '[' + window.gwMesEnv.user.pgmId + '] ' + window.gwMesEnv.user.pgmTitle, pageUrl );
		};		
	} else	{
		//$( '#' + tabId ).jqxTabs( 'select', tabIndex );
		$( '#' + tabId ).jqxTabs( 'select', tabObj[ tabIndex ].CD_VAL-1 );
		//fc_setInputVal( 'TAB_LIST', tabIndex );
	};
	
	fc_setOpenTabList( tabId, mnuId, pageId, pageNm, parms1, parms2, parms3, pgmTy );
    $( '#' + tabId ).jqxTabs( 'ensureVisible', -1 );	
}; // end of fc_openTab (only Tree use)
/**
 * 
 * @param tabId
 * @param obj
 * @param sourceParams
 * @param reloadFlag
 */
function fc_openTabByObj( tabId, obj, sourceParams, reloadFlag ) {
	var pageId = obj[ 'PGM_ID'     ];
	var pageNm = obj[ 'MNU_NM'     ];
	var parms1 = obj[ 'MNU_PARAM1' ];
	var parms2 = obj[ 'MNU_PARAM2' ];
	var parms3 = obj[ 'MNU_PARAM3' ];
	var mnuId  = obj[ 'MNU_ID'     ];
	var pgmTy  = obj[ 'PGM_TY'     ];
	var parms  = obj[ 'parms'      ];
	
	var addParams = ( fc_isNull( parms ) ? '' : parms );
	if ( !fc_isNull( sourceParams ) ) addParams = sourceParams;
	if ( !fc_isNull( parms1 ) ) addParams += '&MNU_PARAM1=' + parms1;
	if ( !fc_isNull( parms2 ) ) addParams += '&MNU_PARAM2=' + parms2;
	if ( !fc_isNull( parms3 ) ) addParams += '&MNU_PARAM3=' + parms3;
	
	if ( addParams.indexOf( '?' ) == -1 ) {
		addParams = '?' + addParams.substring( 1 );
	};
	
	var moduleId = pageId.substring( 0, 3 );
	var arrTabTitle = fc_getAllTabTitle( tabId );
	var tabIndex = $.inArray( '[' + pageId + '] ' + pageNm, arrTabTitle );

	window.gwMesEnv.user.pgmId    = pageId;
	window.gwMesEnv.user.pgmTitle = pageNm;
	window.gwMesEnv.user.pgmTy    = pgmTy;
	
	fc_setSessionItem( 'GW_SYSTEM_ENV', window.gwMesEnv );
	var pageUrl = '../' + moduleId + '/' + pageId + '.do' + addParams;
	
	if ( tabIndex == -1 ) {
		if ( pgmTy == 'R' ) {
			fc_setAddReportIframeTab( tabId, '[' + window.gwMesEnv.user.pgmId + '] ' + window.gwMesEnv.user.pgmTitle, pageUrl, addParams );
		} else {
			fc_setAddIframeTab( tabId, '[' + window.gwMesEnv.user.pgmId + '] ' + window.gwMesEnv.user.pgmTitle, pageUrl );	
		};
	} else {
		if ( pgmTy == 'R' ) {
			fc_setModifyReportIframeTab( tabId, tabIndex, pageUrl , addParams );
		} else {
			fc_setModifyIframeTab( tabId, tabIndex, pageUrl );
		};
		$( '#' + tabId ).jqxTabs( 'select', tabIndex );
	};	
	fc_setOpenTabList( tabId, mnuId, pageId, pageNm, parms1, parms2, parms3, pgmTy );

    $( '#' + tabId ).jqxTabs( 'ensureVisible', -1 );
}; // end of fc_openTab (only Tree use)
/**
 * 
 * @param tabId
 * @param callback
 */
function fc_setTabSelected( tabId, callback ) {
	$( '#' + tabId ).on( 'selected', function ( event ) { 
		var selectedTab = event.args.item; 
		fc_resizeWindow();
		var initTab = fc_isNull( window.gwTabInit[ selectedTab ] ) ? false : window.gwTabInit[ selectedTab ];
		if ( !initTab ) {
			fc_getGridMultiLanguage();
			window.gwTabInit[ selectedTab ] = true;
		};
		
		if ( typeof callback == 'function' ) {
			callback();	
		};
    }); // end of $( '#' + tabId ).on
	
	if ( typeof callback == 'function' ) {
		callback();	
	};
}; // end of fc_setTabSelected
/**
 * 
 * @param tabId
 * @param mnuId
 * @param pageId
 * @param pageNm
 * @param parms1
 * @param parms2
 * @param parms3
 * @param pgmTy
 */
function fc_setOpenTabList( tabId, mnuId, pageId, pageNm, parms1, parms2, parms3, pgmTy ) {	
	var instance = fc_getTabInstance( tabId );
	var attributeTab = new Object();
	attributeTab[ 'mnuId'  ] = mnuId;
	attributeTab[ 'pageId' ] = pageId;
	attributeTab[ 'pageNm' ] = pageNm;
	attributeTab[ 'parms1' ] = parms1;
	attributeTab[ 'parms2' ] = parms2;
	attributeTab[ 'parms3' ] = parms3;
	attributeTab[ 'tabId'  ] = tabId; 
	attributeTab[ 'pgmTy'  ] = pgmTy;
	instance.openTabList[ '_' + instance.selectedItem ] = attributeTab;
}; // end of fc_setOpenTabList