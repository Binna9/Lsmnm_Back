/**
 * Declare variable
 */
var gwgwArrSearchId;
var gwIndexSearchId;
var gwSearchStr;

/**
 * Declare Initial JS Function
 */
$(function() {	
	fc_showLog( 1, '***** jQuery Tree' );
}); // end of $(function ())
/**
 * 
 * @param nodeId
 * @returns
 */
function fc_isTreeOpened( nodeId ) {
	return $( '#' + treeId ).jstree( true ).is_open( obj );
}; // end of fc_isTreeOpened
/**
 * 
 * @param treeId
 */
function fc_openAllLoadedTree( treeId ) {
	$( '#' + treeId ).on( 'loaded.jstree', function() { fc_openAllTree( treeId ); } );
}; // end of fc_openAllLoadedTree
/**
 * 
 * @param treeId
 */
function fc_closeAllLoadedTree( treeId ) {
	$( '#' + treeId ).on( 'loaded.jstree', function() { fc_closeAllTree( treeId ); } );
}; // end of fc_closeAllLoadedTree
/**
 * 
 * @param treeId
 */
function fc_openAllTree( treeId ) {
	$( '#' + treeId ).jstree( true ).open_all();
}; // end of fc_openAllTree
/**
 * 
 * @param treeId
 */
function fc_closeAllTree( treeId ) {
	$( '#' + treeId ).jstree( true ).close_all();
}; // end of fc_closeAllTree
/**
 * 
 * @param treeId
 * @param nodeId
 */
function fc_openTreeNode( treeId, nodeId ) {
	$( '#' + treeId ).jstree( true ).open_node( nodeId );
}; // end of fc_openTreeNode
/**
 * 
 * @param treeId
 * @param nodeId
 */
function fc_closeTreeNode( treeId, nodeId ) {
	$( '#' + treeId ).jstree( true ).close_node( nodeId );
}; // end of fc_closeTreeNode
/**
 * 
 * @param treeId
 * @param nodeId
 */
function fc_toggleTreeNode( treeId, nodeId ) {
	$( '#' + treeId ).jstree( true ).toggle_node( nodeId );
}; // end of fc_toggleTreeNode
/**
 * 
 * @param treeId
 * @param event
 * @param callback
 */
function fc_setBindTree( treeId, event, callback ) {
	$( '#' + treeId ).bind( event, callback );
}; // end of fc_setBindTree
/**
 * 
 * @param treeId
 * @param event
 * @param callback
 */
function fc_setTreeListner( treeId, event, callback ) {
	$( '#' + treeId ).on( event, callback );
}; // end of fc_setTreeListner
/**
 * 
 * @param treeId
 * @param nodeId
 * @returns
 */
function fc_getTreeNode( treeId, nodeId ) {
	return $( '#' + treeId ).jstree( true ).get_node( nodeId );
}; // end of fc_getTreeNode
/**
 * 
 * @param treeId
 * @param nodeId
 * @returns
 */
function fc_getParentNodeId( treeId , nodeId ) {
	return $( '#' + treeId ).jstree( true ).get_parent( nodeId );
}; // end of fc_getParentNodeId
/**
 * 
 * @param treeId
 * @param typeObj
 * @param options
 * @returns
 */
function fc_getTreeJsonData( treeId , typeObj, options ) {
	return $( '#' + treeId ).jstree( true ).get_json( typeObj, options );
}; // end of fc_getTreeJsonData
/**
 * 
 * @param treeId
 * @param str
 */
function fc_searchTree( treeId, treeText ) {
	$( '#' + treeId ).jstree( true ).search( treeText );
}; // end of fc_searchTree
/**
 * 
 * @param treeId
 */
function fc_clearSearchTree( treeId ) {
	$( '#' + treeId ).jstree( true ).clear_search();
}; // end of fc_clearSearchTree
/**
 * 
 * @param treeId
 */
function fc_setTreeSeachData( treeId ) {
	$( '#' + treeId ).bind( 'search.jstree', function ( e, data ) {
		gwArrSearchId   = new Array();
		gwIndexSearchId = new Array();
		$.each( data.res, function( i, value ) {
			gwArrSearchId[ i ] = value;
			gwIndexSearchId[ value ] = i;
		}); // end of $.each(data.nodes, function (i, node) {
    }); // end of $( '#' + treeId ).bind( 'search.jstree', function ( e, data ) {
}; // end of fc_setTreeSeachData
/**
 * 
 * @param treeId
 */
function fc_clearTreeSeachData( treeId ) {
	$( '#' + treeId ).bind( 'clear_search.jstree', function ( e, data ) {
		gwArrSearchId   = new Array();
		gwIndexSearchId = new Array();
		fc_deselectAllTree( treeId );
    });// end of $( '#' + treeId ).bind( 'clear_search.jstree', function ( e, data ) {
}; // end of fc_clearTreeSeachData
/**
 * 
 * @param treeId
 * @returns
 */
function fc_getTreeArrSeachId( treeId ) {
	return gwArrSearchId;
}; // end of fc_getTreeArrSeachId
/**
 * 
 * @param treeId
 * @returns
 */
function fc_getSelectTreeNode( treeId ) {
	return $( '#' + treeId ).jstree( true ).get_selected();
}; // end of fc_getSelectTreeNode
/**
 * 
 * @param treeId
 * @param nodeId
 */
function fc_selectTreeNode( treeId , nodeId ) {
	fc_deselectAllTree( treeId );
	$( '#' + treeId ).jstree( true ).select_node( nodeId );
}; // end of fc_selectTreeNode
/**
 * 
 * @param treeId
 * @param nodeId
 */
function fc_deselectTreeNode( treeId , nodeId ) {
	$( '#' + treeId ).jstree( true ).deselect_node( nodeId );
}; // end of fc_deselectTreeNode
/**
 * 
 * @param treeId
 */
function fc_deselectAllTree( treeId ) {
	$( '#' + treeId ).jstree( true ).deselect_all();
}; // end of fc_deselectAllTree
/**
 * 
 * @param treeId
 * @param treeText
 */
function fc_findNextTreeNode( treeId, treeText ) {
	var SelectedId  = '';
	var arrSelected = $( '#' + treeId ).jstree( true ).get_selected();
	if ( arrSelected.length > 0 ) SelectedId = arrSelected[ 0 ];
	
	// Search Tree
	fc_searchTree( treeId, treeText );	
	// Find Next Item
	if ( gwArrSearchId.length > 0 ) {
		if ( gwSearchStr == treeText && SelectedId != '' && gwIndexSearchId[ SelectedId ] != undefined ) {
			var chkIdx = gwIndexSearchId[ SelectedId ] + 1;
			if ( chkIdx < gwArrSearchId.length ) {
				fc_selectTreeNode( treeId , gwArrSearchId[ chkIdx ] );
			} else {
				fc_selectTreeNode( treeId , SelectedId );
			};
		} else {
			fc_selectTreeNode( treeId , gwArrSearchId[ 0 ] );
			gwSearchStr = treeText;
		};
	} else fc_deselectAllTree( treeId );
}; // end of fc_findNextTreeNode
/**
 * 
 * @param treeId
 * @param parent
 * @param data
 * @param position
 * @returns
 */
function fc_createNode( treeId,  parent, data, position ) {
	return $( '#' + treeId ).jstree( true ).create_node( parent, data, position );
}; // end of fc_createNode
/**
 * 
 * @param treeId
 * @param nodeId
 * @param newId
 * @returns
 */
function fc_setTreeNodeId( treeId,  nodeId, newId ) {
	return $( '#' + treeId ).jstree( true ).set_id( nodeId, newId );
}; // end of fc_setTreeNodeId
/**
 * 
 * @param treeId
 * @param node
 */
function fc_setNewMenuCd( treeId, node ) {
	var tempId = fc_getTreeJsonData( treeId, node, { 'flat' : true } );
	
	$.each( tempId, function( i, data ) {
		var intId = i + 1;
		fc_setTreeNodeId( treeId, data.id, 'tmp_' + intId.toString() );
	});
	
	var createdId = fc_getTreeJsonData( treeId, node, { 'flat' : true } );
	$.each(createdId, function( i, data ) {
		var intId = i + 1;
		fc_setTreeNodeId( treeId, data.id, intId.toString() );
	});
}; // end of fc_setNewMenuCd
/**
 * 
 * @param treeId
 * @param nodeId
 * @returns
 */
function fc_getTreeText( treeId, nodeId ) {
	return $( '#' + treeId ).jstree( true ).get_text( nodeId );
}; // end of fc_getTreeText
/**
 * 
 * @param treeId
 * @returns
 */
function fc_reloadTree( treeId ) { 
	$( '#' + treeId ).jstree( true ).settings.core.data = fc_getTreeDataForAjax();
	return $( '#' + treeId ).jstree( true ).refresh();
}; // end of fc_reloadTree
/**
 * 
 * @param treeId
 * @param nodeId
 * @returns
 */
function fc_getChildrenNode( treeId, nodeId ) {
	return $( '#' + treeId ).jstree( true ).get_children_dom( nodeId );
}; // end of fc_getChildrenNode
/**
 * 
 * @param treeId
 * @param nodeId
 * @returns
 */
function fc_hasChildrenNode( treeId, nodeId ) {
	if ( fc_isNull( nodeId ) ) return false;
	else{
		return !( $( '#' + treeId ).jstree( true ).is_leaf( nodeId ) );
	};	
	return false;
}; // end of fc_hasChildrenNode