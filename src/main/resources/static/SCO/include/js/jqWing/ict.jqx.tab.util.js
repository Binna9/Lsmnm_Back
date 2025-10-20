/**
 * Declare variable
 */

/**
 * Declare Initial JS Function
 */
window.ifrmaeId = '';
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
		autoHeight : false,
		showCloseButtons : closeFlag,
		closeButtonSize : 13,
//		initTabContent : function(tab) {
//						},
		keyboardNavigation : true,
		reorder : true
	});
	
	tabSelectedStack = new Array();
	$("#"+tabId).on('selected', function (event) {
		var sel_no = event.args.item;
		var target = event.target;
		var iframeId = (((target.children)[1].children)[sel_no].children)[0].id;
		window.ifrmaeId = iframeId;
		
		try{
			var instance = fc_getTabInstance( tabId );
			var selectedTabObj = instance.openTabList['_'+sel_no];
			//console.log('$$$instance.openTabList : ',instance.openTabList)
			if(selectedTabObj != null && !isBackClick){
				//console.log('$$$selected : '+selectedTabObj.mnuId+'/'+iframeId+'/'+sel_no);
				
				if(tabSelectedStack != null){//비정상case체크(화면닫기 시점,옆tab선택event자동)
					var isExist = false;
					
					//$.each(instance.openTabList, function(i,data){
					for(var i in instance.openTabList){
						//console.log('$$$---find : '+instance.openTabList[i].mnuId);
						if(instance.openTabList[i].mnuId == selectedTabObj.mnuId){
							isExist = true;
							break;
						}	
					};
					
					if(!isExist){
						return;
					}
					
				}
				
				if(tabSelectedStack != null && (tabSelectedStack.length == 0 || tabSelectedStack[tabSelectedStack.length-1].mnuId != selectedTabObj.mnuId) ){
					tabSelectedStack.push({mnuId:selectedTabObj.mnuId});
				}
			}
			
			//console.log('selected : tabSelectedStack : ',JSON.stringify(tabSelectedStack));
		}catch(e){
			
		}
		
	});
	
	$("#"+tabId).on('removed', function (event) {
		try{
			var sel_no = event.args.item;
			
			var instance = fc_getTabInstance( tabId );
			if(instance.openTabList != null){
				var selectedTabObj = instance.openTabList['_'+sel_no];
				
				var removedMnuId = selectedTabObj.mnuId;
				//console.log('$$$removed : ',removedMnuId);	
				
				//정리
				for(var i in instance.openTabList){
					if(instance.openTabList[i].mnuId == selectedTabObj.mnuId){
						delete instance.openTabList[i];
						//console.log('$$$removed delete : ',i,selectedTabObj.mnuId);	
					}	
				};
				
				if(removedMnuId != null){
					var findMnuIds = tabSelectedStack.reduce(function(a, e, i) {
								    if (e.mnuId === removedMnuId)
								        a.push(i);
								    return a;
								}, []);
						
					//console.log('find : ',findMnuIds);	
					if(findMnuIds != null){
						for(var i=(findMnuIds.length-1); i>=0; i--){
							//console.log('loop : '+i+'/'+findMnuIds[i]);	
							tabSelectedStack.splice(findMnuIds[i], 1);
						}
					}
					
				}
			}
			
	        
		}catch(e){
			
		}
		
		
	});
	
	var tabInstance =  $( '#' + tabId ).jqxTabs( 'getInstance' );

	tabInstance.removeAt( 0 );
	arrTitle = fc_getAllTabTitle( tabId );

	this.getTabsInstance = tabInstance;  // end of getTabsInstance
	this.getTabs = tabsObj;  // end of getTabs
	this.tabId   = tabId;

	tabInstance['openTabList'] = new Object();
}; // end of jQueryTabs

var tabSelectedStack = null;
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
		  		if ( fc_isNull( index ) ){
		  			selectTab = this.getTabsInstance.val();
		  		}else{
		  			selectTab = index;
		  		}
		  		
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
 * may be not use 2020.6.15
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
	var hmiurl = sourceObj.attr( 'HMI_URL' );
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
	var arrTabTitle = fc_getSyncedTabArr();
	var tabIndex = $.inArray( '[' + pageId + '] ' + compPgmNm, arrTabTitle );
	
	//console.log("$$$ arrTabTitle1 : "+tabIndex+' / ' + '[' + pageId + '] ' + pageNm,arrTabTitle);
	
	var moduleId = pageId.substring( 0, 3 );
	if(moduleId != 'SCO' && moduleId != 'SMZ' && moduleId != 'SRT'){
		moduleId = 'SM' + moduleId.substring( 1, 2 );
	}
	
	if ( tabIndex == -1) {
		window.gwMesEnv.user.pgmId    = pageId;
		window.gwMesEnv.user.pgmTitle = pageNm;
		window.gwMesEnv.user.pgmTy    = pgmTy;

		fc_setSessionItem( 'GW_SYSTEM_ENV', window.gwMesEnv );

		var pageUrl = '../' + moduleId + '/' + pageId + '.do' + addParams;
		if ( pgmTy == 'R' ) {
			fc_setAddReportIframeTab( tabId, '[' + window.gwMesEnv.user.pgmId + '] ' + window.gwMesEnv.user.pgmTitle, pageUrl, addParams ,pageId);
		} else if ( pgmTy == 'H' ) {
			fc_setAddHmiIframeTab( tabId, '[' + window.gwMesEnv.user.pgmId + '] ' + window.gwMesEnv.user.pgmTitle, pageUrl, addParams ,pageId, hmiurl, parms1);
		} else {
			fc_setAddIframeTab( tabId, '[' + window.gwMesEnv.user.pgmId + '] ' + window.gwMesEnv.user.pgmTitle, pageUrl , pageId);
		};
	} else	{
		$( '#' + tabId ).jqxTabs( 'select', tabIndex);
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
	//var reloadFlag = true; //2020.6.18
	
	var pageId = obj[ 'PGM_ID'     ];
	var pageNm = obj[ 'MNU_NM'     ];
	var parms1 = obj[ 'MNU_PARAM1' ];
	var parms2 = obj[ 'MNU_PARAM2' ];
	var parms3 = obj[ 'MNU_PARAM3' ];
	var mnuId  = obj[ 'MNU_ID'     ];
	var pgmTy  = obj[ 'PGM_TY'     ];
	var parms  = obj[ 'parms'      ];
	var hmiurl = obj[ 'HMI_URL'    ];

	var addParams = ( fc_isNull( parms ) ? '' : parms );
	if ( !fc_isNull( sourceParams ) ) addParams = sourceParams;
	if ( !fc_isNull( parms1 ) ) addParams += '&MNU_PARAM1=' + parms1;
	if ( !fc_isNull( parms2 ) ) addParams += '&MNU_PARAM2=' + parms2;
	if ( !fc_isNull( parms3 ) ) addParams += '&MNU_PARAM3=' + parms3;

	if ( addParams.indexOf( '?' ) == -1 ) {
		addParams = '?' + addParams.substring( 1 );
	};

	var moduleId = pageId.substring( 0, 3 );
	if(moduleId != 'SCO' && moduleId != 'SMZ' && moduleId != 'SRT'){
		moduleId = 'SM' + moduleId.substring( 1, 2 );
	}

	//var arrTabTitle = fc_getAllTabTitle( tabId );
	var arrTabTitle = fc_getSyncedTabArr();
	var tabIndex = $.inArray( '[' + pageId + '] ' + pageNm, arrTabTitle );
	
	//console.log("$$$ arrTabTitle2 : "+tabIndex+' / ' + '[' + pageId + '] ' + pageNm,arrTabTitle);
	
	window.gwMesEnv.user.pgmId    = pageId;
	window.gwMesEnv.user.pgmTitle = pageNm;
	window.gwMesEnv.user.pgmTy    = pgmTy;

	fc_setSessionItem( 'GW_SYSTEM_ENV', window.gwMesEnv );
	var pageUrl = '../' + moduleId + '/' + pageId + '.do' + addParams;

	if ( tabIndex == -1 ) {
		if ( pgmTy == 'R' ) {
			fc_setAddReportIframeTab( tabId, '[' + window.gwMesEnv.user.pgmId + '] ' + window.gwMesEnv.user.pgmTitle, pageUrl, addParams );
		} else if ( pgmTy == 'H' ) {
			fc_setAddHmiIframeTab( tabId, '[' + window.gwMesEnv.user.pgmId + '] ' + window.gwMesEnv.user.pgmTitle, pageUrl, addParams ,pageId, hmiurl, parms1);
		} else {
			fc_setAddIframeTab( tabId, '[' + window.gwMesEnv.user.pgmId + '] ' + window.gwMesEnv.user.pgmTitle, pageUrl );
		};
	} else {
		if(!reloadFlag){
			$( '#' + tabId ).jqxTabs( 'select', tabIndex);
		}else{
			if ( pgmTy == 'R' ) {
				fc_setModifyReportIframeTab( tabId, tabIndex, pageUrl , addParams );
			} else if ( pgmTy == 'H' ) {
				fc_setModifyHmiIframeTab( tabId, tabIndex, pageUrl , addParams, hmiurl, pageId, parms1);
			} else {
				fc_setModifyIframeTab( tabId, tabIndex, pageUrl );
			};
			$( '#' + tabId ).jqxTabs( 'select', tabIndex );
		}
		
	};
	fc_setOpenTabList( tabId, mnuId, pageId, pageNm, parms1, parms2, parms3, pgmTy );

    $( '#' + tabId ).jqxTabs( 'ensureVisible', -1 );
};


function fc_getSyncedTabArr(){
	var currentTabNameArr = new Array();
	$('#divTabs div.jqx-tabs-titleContentWrapper').each(function(index){
		currentTabNameArr.push($( this ).text());
		//console.log('$$$ currentTabNameArr --- '+index+' / '+$( this ).text());
	})
	
	var arrTabTitle = new Array();
	var tabObj      = window.gwCodeResult['TAB_LIST'];
	
	if ( !fc_isNull(tabObj) ) {
		for (var a=0;a<currentTabNameArr.length;a++ ) {
			for (var b=0;b<tabObj.length;b++ ) {
				if((tabObj[b].CD_NM).indexOf(currentTabNameArr[a].replace("...","")) > -1 ){
					arrTabTitle.push(tabObj[b].CD_NM);
					break;
				}
			}
				
		}

	};
	//console.log('$$$ ####  --- ',currentTabNameArr,arrTabTitle);
	return arrTabTitle;
}

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
	
	//for back button
	try{
		if(!isBackClick){
			if(tabSelectedStack != null && (tabSelectedStack.length == 0 || tabSelectedStack[tabSelectedStack.length-1].mnuId != mnuId) ){
				tabSelectedStack.push({mnuId:mnuId, pageId:pageId, pageNm:pageNm});
				//console.log("$$$fc_setOpenTabList : "+ mnuId+" / "+JSON.stringify(tabSelectedStack))
			}
			
			
		}
	}catch(e){
		
	}
	
	
}; // end of fc_setOpenTabList