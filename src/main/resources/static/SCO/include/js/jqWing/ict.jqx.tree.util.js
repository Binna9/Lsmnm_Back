/**
 * Declare variable
 */
var gwTreeId = { menu: 'menutree', fav: 'favoritesTree', maxId: '' };
//KD 19 0115 메뉴 찾기 추가
window.gwSearchMnuLsit  = new Array();
window.gwFindMnuLsit = [];


/**
 * Declare Initial JS Function
 */
$( function() {
	fc_showLog( 1, '***** jQuery Tree Util' );
}); // end of $( function () )

/** -----------------------------------------------------------------------------
 * @Name			jQueryTree
 * @Description		jsTree기반 jQueryTree 객체를 생성한다.
 * @Parameter		targetObj : Grid를 추가할 대상 객체
 * 					treeId : 사용할 tree ID
 * 					treeCaption : tree Caption
 * @Returns			jsTree object
 * @Method
 * @Example
 * ---------------------------------------------------------------------------*/
function jQueryTree( targetObj, treeId, treeCaption, dndFlag, isMain, isHelp ) {
	// setting grid, pager
	if ( targetObj == undefined ) {
		targetObj = $( 'body' );
	}; // end of if (targetObj == undefined)

	if ( fc_isNull( isMain ) ) isMain = false;

	if ( treeCaption != undefined ) {
		targetObj.append( '<div id="caption_' + treeId + '" divtype="caption"><h2>' + treeCaption + '</h2></div>' );
	};
	targetObj.append( '<div id="'+treeId+'" divtype="tree"></div>' );

	var plugin = [ 'themes', 'types', 'ui',  'contextmenu', 'search', 'json_data'];
	//var plugin = ["contextmenu", "dnd", "search", "state", "types", "wholerow"];
	//'crrm','cookies','hotkeys','contextmenu'

	
	if ( dndFlag == true ) {
		plugin.push( 'dnd' );
		//plugin.push( 'crrm' );
	};

	var jsonData = new Array();
	
	
	if ( isMain ){
		jsonData = fc_getMainMenuDataForAjax( treeId );
	}else{
		if( isHelp ){
			jsonData = fc_getTreeDataForAjaxHelp();
		}else{
			jsonData = fc_getTreeDataForAjax();
		}
	}
		
	
	var jqTree = $( '#' + treeId ).jstree( {
		types : {
			'#'       : { max_children : 1, max_depth : 256, valid_children : [ 'root', 'default', 'file', 'report' ] },
			'root'    : { valid_children : [ 'default', 'file', 'report' ] },
			'default' : { valid_children : [ 'default', 'file', 'report' ] },
			'file'    : { max_depth : 0, icon : 'jstree-file'  , valid_children : [ 'default', 'file' ] },
			'report'  : { max_depth : 0, icon : 'jstree-report', valid_children : [ 'default', 'report' ] }
		},
		plugins : plugin,
		ui : {
			initially_select : [ '1' ]
		},
		core : {
			data : jsonData,
	        check_callback : true
		},
	    contextmenu: {
	        items: function ( $node ) {
	        	var rtnObj = {};
	        	try{
	        		if ( typeof f_setTreeContextItem == 'function' ) {
	        			rtnObj = f_setTreeContextItem( treeId, $node );
	        		}
	        	} catch ( e ) {
	        		rtnObj = null;
	        	};
            	return rtnObj;
	        }
	    }
    });

	// Function
    this.on 				= function ( event, callback ) { fc_setTreeListner( treeId, event, callback ); };
    this.bind 				= function ( event, callback ) { fc_setBindTree( treeId, event, callback ); };
	this.isOpen 			= function ( nodeId ) { fc_isTreeOpened( treeId, nodeId ); };
	this.selectTreeNode	    = function ( nodeId ) { fc_selectTreeNode( treeId, nodeId ); };
	this.getSelectTreeNode	= function () { return fc_getSelectTreeNode( treeId ); };
	this.closeNode			= function ( nodeId ) { fc_closeTreeNode( treeId, nodeId ); };
	this.toggle				= function ( nodeId ) { fc_toggleTreeNode( treeId, nodeId ); };
	this.openAllLoadedTree	= function () { fc_openAllLoadedTree( treeId ); };
	this.closeAllLoadedTree	= function () { fc_closeAllLoadedTree( treeId ); };
	this.openAllTree		= function () { fc_openAllTree( treeId ); };
	this.closeAllTree		= function () { fc_closeAllTree( treeId ); };
	this.nodeOpen			= function () { fc_openTreeNode( treeId, nodeId ); };
    this.searchTree 		= function ( treeText ) { fc_searchTree( treeId, treeText ); };
    this.clearSearchTree	= function () { fc_clearSearchTree( treeId ); };
    this.getTreeNode 		= function ( nodeId ) { return fc_getTreeNode( treeId, nodeId ); };
    this.getParentId 		= function ( nodeId ) { return fc_getParentNodeId( treeId, nodeId ); };
    this.getJsonData		= function ( typeObj, options ) { return fc_getTreeJsonData( treeId, typeObj, options ); };

    this.getArrSearchId		= function () { return fc_getTreeArrSeachId( treeId ); };
    this.getText			= function ( nodeId ) { return fc_getTreeText( treeId, nodeId ); };
    this.getChildren        = function ( nodeId ) { return fc_getChildrenNode( treeId, nodeId) };
    this.hasChildren        = function ( nodeId ) { return fc_hasChildrenNode( treeId, nodeId) };
    this.getInstance        = function ( ) { return $( '#' + treeId ).jstree( true ) };

    // Binding
    fc_setTreeSeachData( treeId );
    fc_clearTreeSeachData ( treeId );
}; // end of jQueryTree
/*
jQueryTree.prototype = {
	isOpen 			   : function ( nodeId ) { fc_isTreeOpened( this.treeId, nodeId); },

	selectTreeNode     : function ( nodeId ) { fc_selectTreeNode( this.treeId, nodeId); },
	getSelectTreeNode  : function () { return fc_getSelectTreeNode( this.treeId ); },
	closeNode		   : function ( nodeId ) { fc_closeTreeNode( this.treeId, nodeId ); },
	toggle			   : function ( nodeId ) { fc_toggleTreeNode( this.treeId, nodeId ); },

	openAllLoadedTree  : function () { fc_openAllLoadedTree( this.treeId ); },
	closeAllLoadedTree : function () { fc_closeAllLoadedTree( this.treeId ); },
	openAllTree		   : function () { fc_openAllTree( this.treeId ); },
	closeAllTree	   : function () { fc_closeAllTree( this.treeId ); },
	nodeOpen		   : function () { fc_openTreeNode( this.treeId, nodeId ); },
    searchTree 		   : function ( str ) { fc_searchTree( this.treeId, str ); },
    clearSearchTree	   : function () { fc_clearSearchTree( this.treeId ); },
    getTreeNode 	   : function ( nodeId ) { return fc_getTreeNode( this.treeId, nodeId ); },
    getParentId 	   : function ( nodeId ) { return fc_getParentNodeId( this.treeId, nodeId ); },
    getJsonData		   : function ( typeObj, options ) { return fc_getTreeJsonData( this.treeId, typeObj, options ); },

    getArrSearchId	   : function () { return fc_getTreeArrSeachId( this.treeId ); },
    getText			   : function ( nodeId ) { return fc_getTreeText( this.treeId, nodeId ); },
    getChildren        : function ( nodeId ) { return fc_getChildrenNode( this.treeId, nodeId) },
    hasChildren        : function ( nodeId ) { return fc_hasChildrenNode( this.treeId, nodeId) },
    getInstance        : function ( ) { return $( '#' + this.treeId ).jstree(true) },
}; //end of jQueryTree.prototype
*/
/**
 *
 */
function fc_getTreeDataForAjax() {
	window.gwJsonParam[ 'USER_ID' ] = window.gwMesEnv.user.id;
	fc_setDefaultParam();
	var result = new Array();

	if ( fc_submit( '', 'ict.sys.menu-service', 'treeSearch', '','','SCO' ) ) {
		result = fc_setJsonData( window.gwJsonResult );
	};
	return result;
}; // end of fc_getTreeDataForAjax

function fc_getTreeDataForAjaxHelp() {
	window.gwJsonParam[ 'USER_ID' ] = window.gwMesEnv.user.id;
	fc_setDefaultParam();
	var result = new Array();
	
	if ( fc_submit( '', 'ict.sys.menu-service', 'helpTreeSearch', '','','SCO' ) ) {
		result = fc_setJsonData( window.gwJsonResult );
	};
	return result;
}; // end of fc_getTreeDataForAjax
/**
 *
 * @param _treeId
 * @returns
 */
function fc_getMainMenuDataForAjax( _treeId ) {
	var transitionCondition;

	switch (_treeId) {
		case gwTreeId.menu : transitionCondition = 'searchMenu'; 		break;
		case gwTreeId.fav  : transitionCondition = 'searchFavorite'; 	break;
		default			: return false;
	};

	window.gwJsonParam[ 'USER_ID' ] = window.gwMesEnv.user.id;
	window.gwJsonParam[ 'LANG_CD' ] = window.gwMesEnv.lang.cd;

	var result = new Array();
	if ( fc_submit( '', 'ict.sys.menu-service', transitionCondition, '','','SCO' ) ) {
		result = fc_setJsonData( window.gwJsonResult );
	};
	return result;
}; // end of fc_getMainMenuDataForAjax
/**
 *
 * @param data
 * @returns {Array}
 */
function fc_setJsonData( data ) {
	var arrData = new Array();
	$.each( data.RK_TREE_MENU, function( i, node ) {
		var obj = new Object();
		var attrobj = new Object();

		obj[ 'id'	  ]	= node.MNU_CD;
		obj[ 'parent' ]	= node.PARENT_MNU_CD;
		obj[ 'text'	  ]	= node.DISP_MNU_NM;
		obj[ 'data'	  ]	= node.MNU_ID;
		obj[ 'li_attr' ] = {"MNU_ID" : node.MNU_ID , "DISP_SEQ" : node.DISP_SEQ};
		if ( node.PARENT_MNU_CD == '#' ) {
			if ( !fc_isNull( node.PGM_ID ) ) {
				obj    [ 'type'	       ] = ( node.PGM_TY == 'R' ) ? 'report' : 'file';
				attrobj[ 'id'		   ] = node.MNU_CD;
				attrobj[ 'name'		   ] = 'menu';
				attrobj[ 'tabindex'	   ] = '-1';
				attrobj[ 'title'	   ] = node.DISP_MNU_NM;
				attrobj[ 'DISP_MNU_NM' ] = node.DISP_MNU_NM;
				attrobj[ 'MNU_NM'	   ] = node.MNU_NM;
				attrobj[ 'MNU_PARAM1'  ] = node.MNU_PARAM1;
				attrobj[ 'MNU_PARAM2'  ] = node.MNU_PARAM2;
				attrobj[ 'MNU_PARAM3'  ] = node.MNU_PARAM3;
				attrobj[ 'PGM_ID'	   ] = node.PGM_ID;
				attrobj[ 'MNU_GRP_YN'  ] = node.MNU_GRP_YN;
				attrobj[ 'PGM_TY'	   ] = node.PGM_TY;
				attrobj[ 'DISP_SEQ'	   ] = node.DISP_SEQ;
				attrobj[ 'MNU_ID'	   ] = node.MNU_ID;
				attrobj[ 'HMI_URL'	   ] = node.HMI_URL;
				obj    [ 'a_attr'      ] = attrobj;
			} else {
				obj[ 'type'	]	   = 'root';
				attrobj[ 'title' ] = node.MENU_NM;
				obj[ 'a_attr' ]    = attrobj;
			};
		} else {
			obj[ 'type' ]	= 'default';
			if (!fc_isNull(node.PGM_ID)) {
				obj    [ 'type'     ] = ( node.PGM_TY == 'R' ) ? 'report' : 'file';
				attrobj[ 'name'		] = 'menu';
				attrobj[ 'tabindex'	] = '-1';
			};

			attrobj[ 'title'         ] = node.MENU_NM;
			attrobj[ 'id'			 ] = node.MNU_CD;
			attrobj[ 'MNU_GRP_YN'	 ] = node.MNU_GRP_YN;
			attrobj[ 'DISP_MNU_NM'	 ] = node.DISP_MNU_NM;
			attrobj[ 'MNU_NM'		 ] = node.MNU_NM;
			attrobj[ 'MNU_PARAM1'	 ] = node.MNU_PARAM1;
			attrobj[ 'MNU_PARAM2'	 ] = node.MNU_PARAM2;
			attrobj[ 'MNU_PARAM3'	 ] = node.MNU_PARAM3;
			attrobj[ 'PGM_ID'		 ] = node.PGM_ID;
			attrobj[ 'PARENT_MNU_CD' ] = node.PARENT_MNU_CD;
			attrobj[ 'MNU_ID'		 ] = node.MNU_ID;
			attrobj[ 'PGM_TY'		 ] = node.PGM_TY;
			attrobj[ 'HMI_URL'	   ] = node.HMI_URL;
			obj    [ 'a_attr'        ] = attrobj;
		};
		arrData[i] = obj;

		//KD 19 0115
		if(node.PGM_TY == 'S' || node.PGM_TY == 'R'){
			var mnuVal = node.MNU_NM;
			window.gwSearchMnuLsit.push(mnuVal);
			window.gwFindMnuLsit.push({MNU_NM : node.MNU_NM, PGM_ID : node.MNU_CD});
		}
	});

	if ( !fc_isNull( data.RK_MAX_MENUID ) ) {
		$.each( data.RK_MAX_MENUID, function ( i, node ) {
			gwTreeId.maxId = node.MENU_ID;
		});
	};
	return arrData;
}; // end of fc_setJsonData
/**
 *
 * @param treeId
 * @returns {String}
 */
function fc_getNewMenuId ( treeId ) {
	var intId = parseInt( gwTreeId.maxId.substr( 1 ) ) + 1;
	return 'M' + fc_lpad( intId + '', 0, 9 );
}; // end of fc_getNewMenuId