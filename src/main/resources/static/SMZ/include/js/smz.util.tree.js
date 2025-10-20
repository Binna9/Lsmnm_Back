/** -----------------------------------------------------------------------------
 * @Name			makeTree
 * @Description		jsTree기반 makeTree 객체를 생성한다.
 * @Parameter		targetObj : Grid를 추가할 대상 객체
 * 					treeId : 사용할 tree ID
 * 					treeCaption : tree Caption
 * @Returns			jsTree object
 * @Method
 * @Example
 * ---------------------------------------------------------------------------*/
function f_makeTree( targetObj, treeId, treeCaption, dndFlag, isBom, transactionNm, param) {
	console.time('f_makeTree');
	
	// setting grid, pager
	if ( targetObj == undefined ) {
		targetObj = $( 'body' );
	}; // end of if (targetObj == undefined)

	if ( treeCaption != undefined ) {
		//targetObj.append( '<div id="caption_' + treeId + '" divtype="caption"><h2 style="height:25px">' + treeCaption + '</h2></div>' );
		targetObj.append( '<div id="caption_' + treeId + '" divtype="caption"></div>' );
	};
	targetObj.append( '<div id="'+treeId+'" divtype="tree" style="margin-top:5px;"></div>' );

	var plugin = [ 'types', 'ui',  'contextmenu', 'search', 'json_data','massload' ];
	
	if ( dndFlag == true ) {
		plugin.push( 'dnd' );
	};

	
	var jsonData = null;
	fc_setDefaultParam();
	
	var prmParam = {"USER_LOGIN_ID":fc_getUserId()};
	if(!fc_isNull(param)){
		for(var key in param){
			//fc_addParam(key,param[key]);
			//alert(param[key]);
			prmParam[key] = param[key];
		}
	}
	
	
	if ( fc_submit( '', 'smz.tag.trend-service', transactionNm, prmParam,'','SMZ' ) ) {
		//jsonData = fc_setJsonData( window.gwJsonResult );
		jsonData = f_setJsonData_smz( window.gwJsonResult );
	};
	
//	console.time('fc_submit&json');
//	if ( fc_submit( '', 'smz.tag.trend-service', 'searchTreeSpeed', '','','SMZ' ) ) {
//		console.timeEnd('fc_submit&json');
//		
//		console.time('custom');
//		var stdInfoArr = window.gwJsonResult.RK_STD_INFO;
//		var tagsArr = window.gwJsonResult.RK_TAG_LIST;
//		
//		//1.stdInfoArr Array->Object
//		var facCdObj = new Object();
//		var procCdObj = new Object();
//		var mcCdObj = new Object();
//		
//		console.time('stdInfoArr');
//		var level =null;
//		$.each(stdInfoArr, function(index, row){
//			level = Number(row.MNU_LEVEL);
//			
//			if(level == 1){
//				facCdObj[row.MNU_CD] = row.MNU_SEQ;
//				return true;
//			}else if(level == 2){
//				procCdObj[row.MNU_CD] = row.MNU_SEQ;
//				return true;
//			}else if(level == 3){
//				mcCdObj[row.MNU_CD] = row.MNU_SEQ;
//				return true;
//			}
//			
//		})
//		console.timeEnd('stdInfoArr');
//		//console.log('#### facCdObj : '+ JSON.stringify(facCdObj));
//		//console.log('#### procCdObj : '+ JSON.stringify(procCdObj));
//		//console.log('#### mcCdObj : '+ JSON.stringify(mcCdObj));
//		
//		//2. set tagsArr parent seq
//		console.time('findParent');
//		var tempData = null;
//		$.each(tagsArr, function(index, row){
//			tempData = null;
//			if(!fc_isNull(row.MC_CD)){
//				tempData = mcCdObj[row.MC_CD];
//				if(!fc_isNull(tempData)){
//					row.PARENT_MNU_SEQ = tempData;
//					return true;
//				}
//			}
//			
//			if(!fc_isNull(row.PROC_CD)){
//				tempData = mcCdObj[row.PROC_CD];
//				if(!fc_isNull(tempData)){
//					row.PARENT_MNU_SEQ = tempData;
//					return true;
//				}else{
//					tempData = procCdObj[row.PROC_CD];
//					if(!fc_isNull(tempData)){
//						row.PARENT_MNU_SEQ = tempData;
//						return true;
//					}
//				}
//			}
//			
//			if(!fc_isNull(row.FAC_CD)){
//				tempData = procCdObj[row.FAC_CD];
//				if(!fc_isNull(tempData)){
//					row.PARENT_MNU_SEQ = tempData;
//					return true;
//				}else{
//					tempData = facCdObj[row.FAC_CD];
//					if(!fc_isNull(tempData)){
//						row.PARENT_MNU_SEQ = tempData;
//						return true;
//					}
//				}
//			}
//			
//			
//		})
//		console.timeEnd('findParent');
//		
//		//3.concat array(treeArr+tagsArr)->treeArr
//		var treeArr = stdInfoArr.concat(tagsArr);
//		
//		console.time('rename');
//		//4.rename
//		var cnt = 1;
//		$.each(treeArr, function(index, row){
//			row.DISP_MNU_NM = row.MNU_NM;
//			//,X.MNU_NM   AS row.MNU_NM
//			row.PARENT_MNU_CD = row.PARENT_MNU_SEQ;
//			row.PGM_ID = Number(row.MNU_LEVEL) == 4 ? row.MNU_CD : '';
//			row.MNU_ID = row.MNU_CD;
//			row.MNU_PARAM1 = row.MNU_CD;
//			row.MNU_PARAM2 = Number(row.MNU_LEVEL) == 4 ? row.MNU_CD : '';
//			row.MNU_PARAM3 = '';
//			row.MNU_CD = row.MNU_SEQ;
//			row.DISP_SEQ = cnt++;
//			row.USE_YN = 'Y';
//			row.MNU_GRP_YN = 'Y';
//			row.PGM_TY = 'S';
//			
//			//delete row.PARENT_MNU_SEQ;
//			//delete row.MNU_SEQ;
//
//		})
//		
//		console.timeEnd('rename');
//		
//		console.timeEnd('custom');
//		
//		window.gwJsonResult.RK_TREE_MENU = treeArr;		
//		jsonData = fc_setJsonData( window.gwJsonResult );
//		
//	}
	
	console.time('loading2');
	var jqTree = $( '#' + treeId ).jstree( {
		types : {
			'#'       : { max_children : 1, max_depth : 256, valid_children : [ 'root', 'default', 'file', 'report' ] },
			'root'    : { max_depth : 256, icon : '/SMZ/include/images/tree_tag_blue.png', valid_children : [ 'default', 'file', 'report' ] },
			'default' : { max_depth : 256, icon : '/SMZ/include/images/tree_tag_blue.png', valid_children : [ 'default', 'file', 'report' ] },
			'file'    : { max_depth : 256, icon : '/SMZ/include/images/tree_tag_grey.png' , valid_children : [ 'default', 'file' ] },
			'report'  : { max_depth : 256, icon : '/SMZ/include/images/tree_tag_blue.png', valid_children : [ 'default', 'report' ] }
		},
		plugins : plugin,
		ui : {
			initially_select : [ '1' ]
		},
		core : {
			data : jsonData,
	        check_callback : true,
	        //progressive_render : true
		},
	    'contextmenu': {
	        'items': function ( $node ) {
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
    if(treeId == 'tagTree1' || treeId == 'tagTree2') {
        fc_setTreeSeachData( treeId);
        fc_clearTreeSeachData ( treeId );    	
    } else {
        $('#' + treeId).jstree(true).settings.core.data = jsonData;
        $('#' + treeId).jstree(true).refresh();    	
    }

    
    console.timeEnd('loading');
    
    console.timeEnd('f_makeTree');
}; // end of jQueryTree

function f_DivmakeTree( targetObj, treeId, treeCaption, dndFlag, isBom, transactionNm, param) {
	console.time('f_DivmakeTree');
	// setting grid, pager
	if ( targetObj == undefined ) {
		targetObj = $( 'body' );
	}; // end of if (targetObj == undefined)

	if ( treeCaption != undefined ) {
		//targetObj.append( '<div id="caption_' + treeId + '" divtype="caption"><h2 style="height:25px">' + treeCaption + '</h2></div>' );
		targetObj.append( '<div id="caption_' + treeId + '" divtype="caption"></div>' );
	};
	targetObj.append( '<div id="'+treeId+'" divtype="tree" style="margin-top:5px;"></div>' );

	var plugin = [ 'types', 'ui',  'contextmenu', 'search', 'json_data','massload' ];
	
	if ( dndFlag == true ) {
		plugin.push( 'dnd' );
	};

	
	var jsonData = null;
	fc_setDefaultParam();
	
	//var prmParam = {"USER_LOGIN_ID":fc_getUserId()};
	var prmParam = {"DEPT_CD":param};
	
	if(!fc_isNull(param)){
		for(var key in param){
			//fc_addParam(key,param[key]);
			//alert(param[key]);
			prmParam[key] = param[key];
		}
	}
	
	
	if ( fc_submit( '', 'smz.tag.trend-service', transactionNm, prmParam,'','SMZ' ) ) {
		jsonData = f_setJsonData_smz( window.gwJsonResult );
	};
	
    
	//console.log(jsonData);
	//console.log('1');
	console.time('loading');
	
	var jqTree = $( '#' + treeId ).jstree( {
		types : {
			'#'       : { max_children : 1, max_depth : 256, valid_children : [ 'root', 'default', 'file', 'report' ] },
			'root'    : { max_depth : 256, icon : '/SMZ/include/images/tree_tag_blue.png', valid_children : [ 'default', 'file', 'report' ] },
			'default' : { max_depth : 256, icon : '/SMZ/include/images/tree_tag_blue.png', valid_children : [ 'default', 'file', 'report' ] },
			'file'    : { max_depth : 256, icon : '/SMZ/include/images/tree_tag_grey.png' , valid_children : [ 'default', 'file' ] },
			'report'  : { max_depth : 256, icon : '/SMZ/include/images/tree_tag_blue.png', valid_children : [ 'default', 'report' ] }
		},
		plugins : plugin,
		ui : {
			initially_select : [ '1' ]
		},
		core : {
			data : jsonData,
	        check_callback : true,
	        //progressive_render : true
		},
	    'contextmenu': {
	        'items': function ( $node ) {
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
	//console.log('2');
    //console.log(jqTree);
    
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
    
    $('#' + treeId).jstree(true).settings.core.data = jsonData;
    $('#' + treeId).jstree(true).refresh();
    
    // Binding
    //fc_setTreeSeachData( treeId);
    //fc_clearTreeSeachData ( treeId );
    
    console.timeEnd('loading');
    
    console.timeEnd('f_DivmakeTree');
}; // end of jQueryTree

function fc_setTreeSeachDataCust( treeId, paramMnuId ) {
	$( '#' + treeId ).bind( 'search.jstree', function ( e, data ) {
		
		fc_closeAllTree( treeId );
		
		gwArrSearchId   = new Array();
		gwIndexSearchId = new Array();
		$.each( data.res, function( i, value ) {
			
			if(paramMnuId != ""){
				
				$.each( data.nodes, function( j, node ) {
					
					if(node.attributes.length == 15){
						
						if(node.attributes.mnu_param1.value == paramMnuId && node.attributes.mnu_param2.value == data.str){
							gwArrSearchId[ i ] = value;
							gwIndexSearchId[ value ] = i;
						}
					}
					
				});
				
			}else{
				gwArrSearchId[ i ] = value;
				gwIndexSearchId[ value ] = i;
			}
			
		}); // end of $.each(data.nodes, function (i, node) {
    }); // end of $( '#' + treeId ).bind( 'search.jstree', function ( e, data ) {
}; // end of fc_setTreeSeachData

/**
*
* @param data
* @returns {Array}
*/
function f_setJsonData_smz( data ) {
	var arrData = new Array();
	$.each( data.RK_TREE_MENU, function( i, node ) {
		var obj = new Object();
		var attrobj = new Object();
		
		//console.log('### f_setJsonData_smz node ',node);
		
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
				attrobj[ 'STD_VAL'	   ] = node.STD_VAL;
				attrobj[ 'LL_VAL'	   ] = node.LL_VAL;
				attrobj[ 'UL_VAL'	   ] = node.UL_VAL;
				
				
				
				obj    [ 'a_attr'      ] = attrobj;
			} else {
				obj[ 'type'	]	   = 'root';
				attrobj[ 'title' ] = node.MENU_NM;
				
				attrobj[ 'DATE_INTERVAL'   ] = node.DATE_INTERVAL;
				attrobj[ 'DATA_INTERVAL'   ] = node.DATA_INTERVAL;
				attrobj[ 'TAG_AGGR_TY'	   ] = node.TAG_AGGR_TY;
				attrobj[ 'MLT_SEARCH_TYPE' ] = node.MLT_SEARCH_TYPE;
				
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
			attrobj[ 'HMI_URL'	     ] = node.HMI_URL;
			attrobj[ 'STD_VAL'	     ] = node.STD_VAL;
			attrobj[ 'LL_VAL'	   	 ] = node.LL_VAL;
			attrobj[ 'UL_VAL'	   	 ] = node.UL_VAL;
			
			attrobj[ 'TAG_ORDER'	 ] = node.TAG_ORDER;
			attrobj[ 'SCALE_MIN'	 ] = node.SCALE_MIN;
			attrobj[ 'SCALE_MAX'	 ] = node.SCALE_MAX;
			attrobj[ 'LINE_THICK'	 ] = node.LINE_THICK;
			attrobj[ 'LINE_STYLE'	 ] = node.LINE_STYLE;
			attrobj[ 'LINE_COLOR'	 ] = node.LINE_COLOR;
			attrobj[ 'TAG_FORMUAL'	 ] = node.TAG_FORMUAL;
			
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


function f_getStrDateUTM(dateUTC, vDataInteval){
	   var dateObj = new Date(dateUTC);
	   
	   _year = dateObj.getUTCFullYear() + "";
	   _month= dateObj.getUTCMonth()+1  + "";
	   _day  = dateObj.getUTCDate()     + "";
	   _hour = dateObj.getUTCHours()    + "";
	   _min  = dateObj.getUTCMinutes()  + "";
	   _sec  = dateObj.getUTCSeconds()  + "";

	   if ( _year.length == 1) _year = "0" + _year;
	   if ( _month.length == 1)_month = "0" + _month;
	   if ( _day.length == 1)  _day = "0" + _day;
	   if ( _hour.length == 1) _hour = "0" + _hour;
	   if ( _min.length  == 1) _min  = "0" + _min;
	   if ( _sec.length  == 1) _sec  = "0" + _sec;

	   var rtnDateTime = _year+'-'+_month+'-'+_day+' '+_hour+':'+_min;
		
	   if(vDataInteval == "1"){
		   rtnDateTime = _year+'-'+_month+'-'+_day+' '+_hour+':'+_min+':'+_sec;
	   }
	   
	   return rtnDateTime;
	}

Date.prototype.format = function (f) {
    if (!this.valueOf()) return " ";
    var weekKorName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var weekKorShortName = ["일", "월", "화", "수", "목", "금", "토"];
    var weekEngName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var weekEngShortName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var d = this;

    return f.replace(/(yyyy|yy|MM|dd|KS|KL|ES|EL|HH|hh|mm|ss|SS|a\/p)/gi, function ($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear(); // 년 (4자리)
            case "yy": return (d.getFullYear() % 1000).zf(2); // 년 (2자리)
            case "MM": return (d.getMonth() + 1).zf(2); // 월 (2자리)
            case "dd": return d.getDate().zf(2); // 일 (2자리)
            case "KS": return weekKorShortName[d.getDay()]; // 요일 (짧은 한글)
            case "KL": return weekKorName[d.getDay()]; // 요일 (긴 한글)
            case "ES": return weekEngShortName[d.getDay()]; // 요일 (짧은 영어)
            case "EL": return weekEngName[d.getDay()]; // 요일 (긴 영어)
            case "HH": return d.getHours().zf(2); // 시간 (24시간 기준, 2자리)
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2); // 시간 (12시간 기준, 2자리)
            case "mm": return d.getMinutes().zf(2); // 분 (2자리)
            case "ss": return d.getSeconds().zf(2); // 초 (2자리)
            case "SS": return d.getMilliseconds().zf(3); // 밀리초 (3자리)
            case "a/p": return d.getHours() < 12 ? "오전" : "오후"; // 오전/오후 구분
            default: return $1;
        }
    });
};
String.prototype.string = function (len) { var s = '', i = 0; while (i++ < len) { s += this; } return s; };
String.prototype.zf = function (len) { return "0".string(len - this.length) + this; };
Number.prototype.zf = function (len) { return this.toString().zf(len); };