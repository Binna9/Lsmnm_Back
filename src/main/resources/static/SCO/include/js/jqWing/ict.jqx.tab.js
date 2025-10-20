/**
 * Declare variable
 */

/**
 * Declare Initial JS Function
 */
$( function() {
	fc_showLog( 1, '***** jQuery Tab' );
}); // end of $( function () )
/**
 *
 * @param tabId
 * @returns
 */
function fc_getTabSelectedIndex( tabId ) {
	var instance = $( '#' + tabId ).jqxTabs( 'getInstance' );
	return instance.val();
}; // end of fc_getTabSelectedItem
/**
 *
 * @param tabId
 * @returns {String}
 */
function fc_getTabObj( tabId ) {
	var instance = $( '#' + tabId ).jqxTabs( 'getInstance' );
	var tabObj = '';
	if ( fc_isNull( instance.customTabObj ) ) return tabObj;

	tabObj = instance.customTabObj;
	return tabObj;
}; // end of fc_getTabObj
/**
 *
 * @param tabId
 * @param arrtabObj
 */
function fc_setTabObj( tabId,  arrtabObj ) {
	var instance = $( '#' + tabId ).jqxTabs( 'getInstance' );
	instance.customTabObj = arrtabObj;
}; // end of fc_setTabObj
/**
 *
 * @param tabId
 * @param selectIndex
 * @returns
 */
function fc_getTabObjByIndex( tabId, selectIndex ) {
	var tabObj = fc_getTabObj( tabId );
	if ( fc_isNull( tabObj ) ) return '';
	return tabObj[ selectIndex ];
}; // end of fc_getTabObjByIndex
/**
 *
 * @param tabId
 * @returns
 */
function fc_getTabSelectedObj( tabId ) {
	var selectedIndex = fc_getTabSelectedIndex( tabId );
	var tabObj = fc_getTabObjByIndex( tabId,  selectedIndex );
	return tabObj;
}; // end of fc_getTabSelectedObj
/**
 *
 * @param tabId
 * @param tabWidth
 */
function fc_setTabWidth( tabId, tabWidth ) {
	/*
	var instance = $( '#' + tabId ).jqxTabs( 'getInstance' );
	instance.width = tabWidth;
	instance.refresh();
	*/
	$( '#' + tabId ).jqxTabs( { width: tabWidth } );
}; // end of fc_setTabWidth
/**
 *
 * @param tabId
 * @param tabHeight
 */
function fc_setTabHeight( tabId, tabHeight ) {
	/*
	var instance = $( '#' + tabId ).jqxTabs( 'getInstance' );
	instance.height = tabHeight;
	instance.refresh();
	*/
	$( '#' + tabId ).jqxTabs( { height: tabHeight } );
}; // end of fc_setTabWidth
/**
 *
 * @param tabId
 * @returns {Array}
 */
function fc_getAllTabTitle( tabId ) {
	var tabLength = $( '#' + tabId ).jqxTabs( 'length' );
	var arrGetTitle = new Array();
	for ( var idx=0;idx<tabLength;idx++ ) {
		var title = $( '#' + tabId ).jqxTabs( 'getTitleAt', idx );
		arrGetTitle.push( title );
	};
	return arrGetTitle;
}; // end of fc_getAllTabTitle
/**
 *
 * @param tabId
 * @param tabIndex
 * @param titleText
 */
function fc_setTabTitle( tabId, tabIndex, titleText ) {
	$( '#' + tabId ).jqxTabs( 'setTitleAt', tabIndex, titleText );
}; // end of fc_setTabTitle
/**
 *
 * @param tabId
 * @param tabIndex
 * @returns
 */
function fc_getTabTitle( tabId, tabIndex ) {
	return $( '#' + tabId ).jqxTabs( 'getTitleAt', tabIndex );
}; // end of fc_getTabTitle
/**
 *
 * @param tabId
 * @param tabText
 * @param tabPage
 */
function fc_setAddIframeTab( tabId, tabText, tabPage , mnuId) {
	
	//console.log('## fc_setAddIframeTab mnuId ', mnuId);
	
	//Set Iframe Page ID [Create By Dw KD 20181213]
	if(fc_isNull(mnuId)){
		mnuId = tabText.substring(1,8);
	}
	var iframeID = mnuId;
	//~ End KD
	var iframeTemplate = '<iframe id='+iframeID+' frameBorder="no" scrolling="auto" src="#{tabPage}" class="tab_iframe" style="height:calc(100% - 4px);"></iframe>';
	var orgText = tabText;

	if ( window.gwMesEnv.screen.tabCaptionLth > 0 ) {
		if ( tabText.length > window.gwMesEnv.screen.tabCaptionLth ) tabText = tabText.substr( 0, window.gwMesEnv.screen.tabCaptionLth -3 ) + '...';
	};
	$( '#' + tabId ).jqxTabs( 'addLast', tabText, iframeTemplate.replace( /#\{tabPage\}/g, tabPage ) );
	$( '#' + tabId ).jqxTabs( 'ensureVisible', -1 );
	if ( window.gwMesEnv.screen.showTabList ) {
		if ( typeof f_tabAdded == 'function' ) {
			f_tabAdded( tabId, orgText, $( '#' + tabId ).jqxTabs( 'length' ) );
		};
	};
}; // end of fc_setAddIframeTab
/**
 *
 * @param tabId
 * @param tabText
 * @param tabPage
 * @param addParamStr
 */
function fc_setAddReportIframeTab( tabId, tabText , tabPage, addParamStr, mnuId) {
	if ( !fc_isNull( addParamStr ) ) { addParamStr = addParamStr.replace("\?", "\&" ); }
	var orgText = tabText;

	if(fc_isNull(mnuId)){
		mnuId = tabText.substring(1,8);
	}
	var iframeID = mnuId;

	if ( window.gwMesEnv.screen.tabCaptionLth > 0 ) {
		if ( tabText.length > window.gwMesEnv.screen.tabCaptionLth ) tabText = tabText.substr( 0, window.gwMesEnv.screen.tabCaptionLth -3 ) + '...';
	};
	var iframeTemplate = '<iframe id='+iframeID+' frameBorder="no" scrolling="auto" src="#{tabPage}" class="tab_iframe" style="height:calc(100% - 4px);"></iframe>';
	$( '#' + tabId ).jqxTabs( 'addLast', tabText, iframeTemplate.replace( /#\{tabPage\}/g, '../SRT/SRTC000.do?openReportPage='+window.gwMesEnv.screen.reportDefaultURL+window.gwMesEnv.user.pgmId + addParamStr ) );
	$( '#' + tabId ).jqxTabs( 'ensureVisible', -1 );
	if ( window.gwMesEnv.screen.showTabList ) {
		if ( typeof f_tabAdded == 'function' ) {
			f_tabAdded( tabId, orgText, $( '#' + tabId ).jqxTabs( 'length' ) );
		};
	};
}; // end of fc_setAddReportIframeTab
/**
*
* @param tabId
* @param tabText
* @param tabPage
* @param addParamStr
*/
function fc_setAddHmiIframeTab( tabId, tabText , tabPage, addParamStr, mnuId, hmiurl, parms1) {
	if ( !fc_isNull( addParamStr ) ) { addParamStr = addParamStr.replace("\?", "\&" ); }
	var orgText = tabText;

	if(fc_isNull(mnuId)){
		mnuId = tabText.substring(1,8);
	}
	var iframeID = mnuId;

	if ( window.gwMesEnv.screen.tabCaptionLth > 0 ) {
		if ( tabText.length > window.gwMesEnv.screen.tabCaptionLth ) tabText = tabText.substr( 0, window.gwMesEnv.screen.tabCaptionLth -3 ) + '...';
	};
	
	var iframeTemplate = '<iframe id='+iframeID+' frameBorder="no" scrolling="auto" src="#{tabPage}" class="tab_iframe" style="height:calc(100% - 4px);"></iframe>';
	//$( '#' + tabId ).jqxTabs( 'addLast', tabText, iframeTemplate.replace( /#\{tabPage\}/g, 'http://10.2.30.128/'+window.gwMesEnv.user.pgmId +'.html') );
	//$( '#' + tabId ).jqxTabs( 'addLast', tabText, iframeTemplate.replace( /#\{tabPage\}/g, hmiurl) );
	
	if(parms1== "Y"){
		// 분할화면
		$( '#' + tabId ).jqxTabs( 'addLast', tabText, iframeTemplate.replace( /#\{tabPage\}/g, '../SCO/SCOR0001.do?HmiMnuId='+mnuId) );
	}else{
		// 단일화면
		$( '#' + tabId ).jqxTabs( 'addLast', tabText, iframeTemplate.replace( /#\{tabPage\}/g, '../SCO/SCOR0000.do?HmiMnuId='+mnuId+'&openHmiPage='+encodeURIComponent(hmiurl) ) );
	}
	
	$( '#' + tabId ).jqxTabs( 'ensureVisible', -1 );
	if ( window.gwMesEnv.screen.showTabList ) {
		if ( typeof f_tabAdded == 'function' ) {
			f_tabAdded( tabId, orgText, $( '#' + tabId ).jqxTabs( 'length' ) );
		};
	};
}; // end of fc_setAddReportIframeTab
/**
 *
 * @param tabId
 * @param tabText
 * @param contentsObj
 */
function fc_setAddContentsTab( tabId, tabText, contentsObj ) {
	$( '#' + tabId ).jqxTabs( 'addLast', tabText, contentsObj );
	$( '#' + tabId ).jqxTabs( 'ensureVisible', -1 );
}; // end of fc_setAddContentsTab
/**
 *
 * @param tabId
 * @param tabText
 * @param contentsObj
 */
function fc_setAddContentsTabByObj( tabId, tabText, contentsObj ) {
	var tabInstance =  $( '#' + tabId ).jqxTabs( 'getInstance' );
	tabInstance.addAtByObj( tabInstance.length(), tabText, contentsObj );
}; // end of fc_setAddContentsTab
/**
 *
 * @param tabId
 * @param tabIdx
 * @param tabPage
 */
function fc_setModifyIframeTab( tabId, tabIdx, tabPage ) {
	var iframeTemplate = '<iframe id='+tabId+' frameBorder="no" scrolling="auto" src="#{tabPage}" class="tab_iframe" style="height:calc(100% - 4px);"></iframe>';
	$( '#' + tabId ).jqxTabs( 'setContentAt', tabIdx, iframeTemplate.replace( /#\{tabPage\}/g, tabPage ) );
}; // end of fc_setModifyIframeTab
/**
 *
 * @param tabId
 * @param tabIdx
 * @param tabPage
 * @param addParamStr
 */
function fc_setModifyReportIframeTab( tabId, tabIdx, tabPage , addParamStr ) {
	if ( !fc_isNull( addParamStr ) ) { addParamStr = addParamStr.replace( "\?", "\&" ); }
	var iframeTemplate = '<iframe frameBorder="no" scrolling="auto" src="#{tabPage}" class="tab_iframe" style="height:calc(100% - 4px);"></iframe>';
	$( '#' + tabId ).jqxTabs( 'setContentAt', tabIdx, iframeTemplate.replace( /#\{tabPage\}/g, '../SRT/SRTC000.do?openReportPage='+window.gwMesEnv.screen.reportDefaultURL+window.gwMesEnv.user.pgmId+ addParamStr ));
}; // end of fc_setModifyReportIframeTab
/**
*
* @param tabId
* @param tabIdx
* @param tabPage
* @param addParamStr
*/
function fc_setModifyHmiIframeTab( tabId, tabIdx, tabPage , addParamStr, hmiurl, mnuId, parms1) {
	if ( !fc_isNull( addParamStr ) ) { addParamStr = addParamStr.replace( "\?", "\&" ); }
	var iframeTemplate = '<iframe frameBorder="no" scrolling="auto" src="#{tabPage}" class="tab_iframe" style="height:calc(100% - 4px);"></iframe>';
	//$( '#' + tabId ).jqxTabs( 'setContentAt', tabIdx, iframeTemplate.replace( /#\{tabPage\}/g, hmiurl) );
	
	if(parms1 == "Y"){
		// 분할화면
		$( '#' + tabId ).jqxTabs( 'setContentAt', tabIdx, iframeTemplate.replace( /#\{tabPage\}/g, '../SCO/SCOR0001.do?HmiMnuId='+mnuId) );
	}else{
		// 단일화면
		$( '#' + tabId ).jqxTabs( 'setContentAt', tabIdx, iframeTemplate.replace( /#\{tabPage\}/g, '../SCO/SCOR0000.do?HmiMnuId='+mnuId+'&openHmiPage='+encodeURIComponent(hmiurl)) );
	}
	
	

}; // end of fc_setModifyReportIframeTab
/**
 *
 * @param tabId
 * @param tabIndex
 */
function fc_closeTab( tabId, tabIndex  ) {
	var tabInstance =  $( '#' + tabId ).jqxTabs( 'getInstance' );
	var selectTab = tabInstance.val();
	tabInstance.removeAt( selectTab );
}; // end of fc_closeTab
/**
 *
 * @param tabId
 * @param intervalTime
 */
function fc_selectFirstTab( tabId,  intervalTime ) {
	if ( fc_isNull( intervalTime ) ) intervalTime = 200;
	var tabInstance =  $( '#' + tabId ).jqxTabs( 'getInstance' );
	setTimeout( function () {
		tabInstance.select( 0 );
	}, intervalTime);
}; // end of fc_selectFirstTab

function fc_selectedIndexTab( tabId,  tabIndex, intervalTime ) {
	if ( fc_isNull( intervalTime ) ) intervalTime = 200;
	var tabInstance =  $( '#' + tabId ).jqxTabs( 'getInstance' );
	setTimeout( function () {
		tabInstance.select( tabIndex );
	}, intervalTime);
}; // end of fc_selectFirstTab
/**
 *
 * @param tabId
 * @param event
 * @param callback
 */
function fc_setTabBindEvent( tabId, event, callback ) {
	try {
		$( '#' + tabId ).on( event, callback );
	} catch ( e ) {
		fc_getException( e );
	};
};// end fc_setTabBindEvent
/**
 *
 * @param tabId
 * @returns
 */
function fc_getTabInstance( tabId ) {
	try {
		var instance = $( '#' + tabId ).jqxTabs( 'getInstance' );
		return instance;
	} catch ( e ) {
		fc_getException( e );
	};
};// end of fc_getTabInstance
/**
 *
 * @param tabId
 * @param tabIndex
 * @param showFlag
 */
function fc_showTabPage( tabId, tabIndex, showFlag ) {
	var sType = ( showFlag ) ? 'block' : 'none';
	$( '#' + tabId + ' .jqx-tabs-title:eq(' + tabIndex + ')' ).css( 'display', sType );
}; // end of fc_showTabPages

function fc_selectTabPage( tabId, tabIndex, intervalTime ) {
	if ( fc_isNull( intervalTime ) ) intervalTime = 200;
	var tabInstance =  $( '#' + tabId ).jqxTabs( 'getInstance' );
	setTimeout( function() {
		tabInstance.select( tabIndex );
	}, intervalTime );
}; // end of fc_selectTabPage