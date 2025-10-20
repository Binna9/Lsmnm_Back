/**
 * Declare variable
 */

/**
 * Declare Initial JS Function
 */
$(function() {
	fc_showLog( 1, '***** jQuery TreeGrid' );
});  // end of $(function ())
/**
 *
 * @param treeGridId
 * @returns
 */
function fc_getTreeGridModelSource( treeGridId ) {
	try {
		var source = $( '#' + treeGridId ).jqxTreeGrid( 'source' )._source;
		return source;
	} catch ( e ) {
		fc_getException( e );
	};
};
/**
 *
 * @param treeGridId
 * @param propNm
 * @param propVal
 */
function fc_setTreeGridExtraOption( treeGridId, propNm, propVal ) {
	try {
		var source = $( '#' + treeGridId ).jqxTreeGrid( 'source' )._source;
		source[ propNm ] = propVal;
	} catch ( e ) {
		fc_getException( e );
	};
};
/**
 *
 * @param gridId
 * @param propNm
 * @returns
 */
function fc_getTreeGridExtraOption( gridId, propNm ) {
	try {
		var source = fc_getTreeGridModelSource( gridId );
		if ( fc_isNull( source[ propNm ] ) ) return null;
		else return source[ propNm ];
	} catch ( e ) {
		fc_getException( e );
	};
};
/**
 *
 * @param treeGridId
 * @param colNm
 * @param propNm
 * @param propVal
 */
function fc_setTreeGridColProp( treeGridId, colNm, propNm, propVal ) {
	try {
		$( '#' + treeGridId ).jqxTreeGrid( 'setColumnProperty', colNm, propNm, propVal );
	} catch ( e ) {
		fc_getException( e );
	};
};
/**
 *
 * @param gridId
 * @param colName
 * @param propNm
 * @returns
 */
function fc_getTreeGridColProp( treeGridId, colNm, propNm ) {
	try {
		return $( '#' + treeGridId ).jqxTreeGrid( 'getColumnProperty', colNm, propNm );
	} catch ( e ) {
		fc_getException( e );
	};
};
/**
 *
 * @param treeGridId
 * @param data
 */
function fc_setTreeGridlocalData( treeGridId, data ) {
	try {
		var source = $( '#' + treeGridId ).jqxTreeGrid( 'source' )._source;
		fc_setTreeGridExtraOption( treeGridId, 'treeGridCheckIndexes', new Array() );
		source.localdata = data;
		$( "#" + treeGridId ).jqxTreeGrid( 'updateBoundData' );

		fc_resetTreeGridSelection( treeGridId );

	} catch ( e ) {
		fc_getException( e );
	};
};
/**
 *
 * @param treeGridId
 * @param arrColNm
 * @param editableFlag
 */
function fc_setTreeGridEditable( treeGridId, arrColNm, editableFlag ) {
	try {
		for ( var loop=0;loop<arrColNm.length;loop++ )
			fc_setTreeGridColProp( treeGridId, arrColNm[ loop ].toUpperCase(), 'editable', editableFlag );
	} catch ( e ) {
		fc_getException( e );
	};
};
/**
 *
 * @param treeGridId
 * @returns
 */
function fc_getTreeGridColModel( treeGridId ) {
	try {
		var source = fc_getTreeGridModelSource( treeGridId );
		return source.datafields;
	} catch ( e ) {
		fc_getException( e );
	};
};
/**
 *
 * @param treeGridId
 * @param arrColNm
 * @param editableFlag
 */
function fc_setTreeGridColEditable( treeGridId, arrColNm, editableFlag ) {
	try {
		var gridType = fc_getTreeGridExtraOption( treeGridId, 'treeGridType' );
		if ( 'SEARCH' == gridType.toUpperCase() ) return;
		fc_setTreeGridEditable ( treeGridId, arrColNm, editableFlag );
	} catch ( e ) {
		fc_getException( e );
	};
};
/**
 *
 * @param treeGridId
 * @param editableFlag
 */
function fc_setTreeGridAllEditableExcept( treeGridId, editableFlag ) {
	try {
		var arrColNm = fc_getTreeGridExtraOption( treeGridId, 'treeGridIDs' );
		fc_setTreeGridEditable( treeGridId, arrColNm, editableFlag );
	} catch ( e ) {
		fc_getException( e );
	};
};
/**
 *
 * @param treeGridId
 * @param arrColNm
 */
function fc_setTreeGridColRequired( treeGridId, arrColNm ) {
	try {
		for (var loop = 0; loop<arrColNm.length; loop++ ) {
			fc_setTreeGridColProp( treeGridId, arrColNm[ loop ].toUpperCase(), 'nullable', true );
		};
	} catch ( e ) {
		fc_getException( e );
	};
};
/**
 *
 * @param treeGridId
 * @param colNm
 * @param propNm
 * @param propVal
 */
function fc_setTreeGridColModel( treeGridId, colNm, propNm, propVal ) {
	try {
		var source = fc_getTreeGridModelSource( treeGridId );
		$.each( source.datafields, function( index, item ) {
			if ( item.name == colNm )
				item[ propNm ] = propVal;
		});
	} catch ( e ) {
		fc_getException( e );
	};
};
/**
 *
 * @param treeGridId
 * @param arrPKeys
 */
function fc_setTreeGridPKeys( treeGridId, arrPKeys ) {
	try {
		fc_setTreeGridEditable( treeGridId, arrPKeys, false );
		fc_setTreeGridColRequired( treeGridId, arrPKeys );
		for ( var loop=0;loop<arrPKeys.length;loop++ ) {
			fc_setTreeGridColModel( treeGridId, arrPKeys[ loop ].toUpperCase(), 'key', true );
		};
	} catch ( e ) {
		fc_getException( e );
	};
};
/**
 *
 * @param treeGridId
 * @returns {Array}
 */
function fc_getTreeGridPKeys( treeGridId ) {
	try {
		var colPKs = new Array();
		var iPos = 0;
		var cm = fc_getGridColModel( treeGridId );
		for ( var loop=0;loop<cm.length;loop++ ) {
			if ( cm[ loop ].key ) {
				colPKs[ iPos ] = cm[ loop ].name;
				iPos++;
			};
		};
		return colPKs;
	} catch ( e ) {
		fc_getException( e );
	};
};
/**
 *
 * @param treeGridId
 * @returns
 */
function fc_getTreeGridSelectedRow( treeGridId ) {
	try {
		return fc_getTreeGridExtraOption( treeGridId, 'treeGridCheckIndexes' );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_getTreeGridSelectedRow
/**
 *
 * @param treeGridId
 * @param paramNm
 * @returns
 */
function fc_getTreeGridParam( treeGridId, paramNm ) {
	try {
		return $( '#' + treeGridId ).jqxTreeGrid( paramNm );
	} catch ( e ) {
		fc_getException( e );
	};
};
/**
 *
 * @param treeGridId
 * @param arrColNm
 */
function fc_setTreeGridColHidden( treeGridId, arrColNm ) {
	try {
		for ( var loop = 0; loop<arrColNm.length; loop++ ) {
			$( '#' + treeGridId ).jqxTreeGrid( 'hideColumn', arrColNm[ loop ].toUpperCase() );
		};
	} catch ( e ) {
		fc_getException( e );
	};
};
/**
 *
 * @param treeGridId
 * @param width
 */
function fc_setTreeGridWidth( treeGridId, width ) {
	$( '#' + treeGridId ).jqxTreeGrid( 'width', width );
};
/**
 *
 * @param treeGridId
 * @param height
 */
function fc_setTreeGridHeight( treeGridId, height ) {
	$( '#' + treeGridId ).jqxTreeGrid( 'height', height );
};
/**
 *
 * @param treeGridId
 * @param rowId
 * @param colNm
 * @returns
 */
function fc_getTreeGridCellData( treeGridId, rowId, colNm ) {
	try {
		return $( '#' + treeGridId ).jqxTreeGrid( 'getCellValue', rowId, colNm );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_getTreeGridCellData
/**
 *
 * @param treeGridId
 * @param rowId
 * @param colNm
 * @param cellVal
 * @returns
 */
function fc_setTreeGridCellData( treeGridId, rowId, colNm, cellVal ) {
	try {
		return $( '#' + treeGridId ).jqxTreeGrid( 'setCellValue', rowId, colNm, cellVal );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_setTreeGridCellData
/**
 *
 * @param treeGridId
 * @param event
 * @param callback
 */
function fc_setTreeGridBindEvent( treeGridId, event, callback ) {
	try {
		$( '#' + treeGridId ).on( event, callback );
	} catch (e) {
		fc_getException(e);
	};
};
/**
 *
 * @param treeGridId
 * @param row
 * @param colNm
 * @param disableFlag
 */
function fc_setTreeGridCheckboxDisabled( treeGridId, row, colNm, disableFlag ) {
	try {
		$( '#' + treeGridId + '_' + row + '_' + colNm ).attr( 'disabled', disableFlag );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_setTreeGridCheckboxDisabled
/**
 *
 * @param treeGridId
 * @returns
 */
function fc_getTreeGridRowsData( treeGridId ) {
	try {
		return $( '#' + treeGridId ).jqxTreeGrid( 'getRows' );
	} catch ( e ) {
		fc_getException( e );
	};
};
/**
 *
 * @param treeGridId
 * @param rowId
 * @returns
 */
function fc_getTreeGridRowData( treeGridId, rowId ) {
	try {
		return $( '#' + treeGridId ).jqxTreeGrid( 'getRow', rowId );
	} catch ( e ) {
		fc_getException( e );
	};
};
/**
 *
 * @param treeGridId
 * @param objId
 * @param row
 * @param colNm
 */
function fc_setTreeGridRowStatus( treeGridId, objId, row, colNm ) {
	fc_setTreeGridCellData( treeGridId, row, colNm, $( '#' + objId ).is( ':checked' ) );
	fc_setTreeGridCheckIndexs( treeGridId, row, true );
}; // end of fc_setTreeGridRowStatus
/**
 *
 * @param treeGridId
 * @param row
 * @param checkFlag
 */
function fc_setTreeGridCheckIndexs( treeGridId, row, checkFlag ) {
	var sJqxCbId = treeGridId + '_' + row + '_JQX_CB';
	$( '#' + sJqxCbId ).attr( 'checked', checkFlag );
	fc_setTreeGridCellData( treeGridId, row, 'JQX_CB', checkFlag );
} // end of fc_setTreeGridCheckIndexs
/**
 *
 * @param treeGridId
 * @param objId
 * @param row
 * @param colNm
 * @param checkFlag
 */
function fc_setTreeGridCheckVal( treeGridId, objId, row, colNm, checkFlag ) {
	if ( fc_isNull( $( '#' + objId ).attr( 'disabled' ) ) ) {
		$( '#' + objId ).attr( 'checked', checkFlag );
		fc_setTreeGridCellData( treeGridId, row, colNm, checkFlag );
		fc_setTreeGridCheckIndexs( treeGridId, row, true );
	};
} // end of fc_setTreeGridCheckVal
/**
 *
 * @param treeGridId
 * @param row
 */
function fc_resetTreeGridStatus( treeGridId, row ) {
	var sJqxCbId = treeGridId + '_' + row + '_JQX_CB';
	$( '#' + sJqxCbId ).attr( 'checked', true );
} // end of fc_resetTreeGridStatus
/**
 *
 * @param treeGridId
 * @param colNm
 * @returns
 */
function fc_getTreeGridColProps( treeGridId, colNm ) {
	try {
		var instance = $( '#' + treeGridId ).jqxTreeGrid( 'getInstance' );
		var colObj;
		$.each( instance.base._columns, function ( index, item ) {
			if ( item.datafield == colNm ) {
				colObj = item;
			};
		});
		return colObj;
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_getTreeGridColProps
/**
 *
 * @param treeGridId
 * @returns
 */
function fc_getTreeGridRecordCount( treeGridId ) {
	try {
	    var source = fc_getTreeGridModelSource( treeGridId );
	    var rowscount = source.localdata.length;

		return rowscount;
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_getTreeGridRecordCount
/**
 *
 * @param treeGridId
 */
function fc_resetTreeGridSelection( treeGridId ) {
	try {
		var arrindex = fc_getTreeGridSelectedRow( treeGridId );
		for ( var loop=0;loop<arrindex.length;loop++ ) {
			fc_setTreeGridCellData( treeGridId, arrindex[ loop ], 'JQX_CB', false );
			fc_resetTreeGridStatus( treeGridId, loop );
		};
		fc_setTreeGridExtraOption( treeGridId, 'gridCheckIndexes', new Array() );

		$( '#' + treeGridId ).jqxTreeGrid( 'clearSelection' );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_resetTreeGridSelection
/**
 *
 * @param treeGridId
 * @param objId
 * @param rowId
 * @param colNm
 */
function fc_setTreeGridCheckboxColExpand( treeGridId, objId, rowId, colNm ) {

	var rowData = fc_getTreeGridRowData( treeGridId, rowId );
    var records = rowData.records;
    var chkVal =  fc_getTreeGridCellData( treeGridId, rowId, colNm );

    if ( chkVal ) {
        fc_setTreeGridCollExpandRow( treeGridId, rowId, chkVal );
    };

    var hierarchicalOpt = function( oRecords ) {
    	var lengs = oRecords.length;
        for ( var i=0;i<lengs;i++ ) {
        	var id = oRecords[i].uid;
            var chkColId = treeGridId + '_' + id + '_' + colNm;
            fc_setTreeGridCheckVal( treeGridId, chkColId, id, colNm, chkVal );
            if ( oRecords[ i ].records ) {
            	hierarchicalOpt( oRecords[ i ].records );
            };
        };
    };
    if ( records ) {
    	hierarchicalOpt( records );
    };
} // end of fc_setTreeGridCheckboxColExpand
/**
 *
 * @param treeGridId
 * @param rowId
 * @param expandFlag
 */
function fc_setTreeGridCollExpandRow( treeGridId, rowId, expandFlag ) {
	var rowData = fc_getTreeGridRowData( treeGridId, rowId );
    var records = rowData.records;
    var hierarchicalOpt = function ( oRecords ) {
        if ( expandFlag ) {
        	$( '#' + treeGridId ).jqxTreeGrid( 'expandRow', rowId );
        } else{
        	$( '#' + treeGridId ).jqxTreeGrid( 'collapseRow', rowId );
        };

    	var lengs = oRecords.length;
        for ( var i=0;i<lengs;i++ ) {

            if ( oRecords[ i ].records ) {
                if ( expandFlag ) {
                	$( '#' + treeGridId ).jqxTreeGrid( 'expandRow', oRecords[ i ].uid );
                }else{
                	$( '#' + treeGridId ).jqxTreeGrid( 'collapseRow', oRecords[ i ].uid );
                };
            	hierarchicalOpt( oRecords[ i ].records );
            };
        };
    };
    if ( records ) {
    	hierarchicalOpt( records );
    };
} // end of fc_setTreeGridCollExpandRow
/**
 *
 * @param treeGridId
 * @param expandFlag
 */
function fc_setTreeGridDefaultColExpandRow( treeGridId, expandFlag ) {

	var rowsData = fc_getTreeGridRowsData( treeGridId );
	$( rowsData ).each( function( key, value ) {
	    if ( expandFlag ) {
	    	$( '#' + treeGridId ).jqxTreeGrid( 'expandRow', value.uid );
	    }else{
	    	$( '#' + treeGridId ).jqxTreeGrid( 'collapseRow', value.uid );
	    };
	});
}; // end of fc_setTreeGridDefaultColExpandRow
/**
 *
 * @param treeGridId
 * @returns {Array}
 */
function fc_getTreeGridCheckIndexs( treeGridId ) {
    var source = fc_getTreeGridModelSource( treeGridId );
    var dataCnt = source.localdata.length;
    var arrChecked = new Array();

    for ( var iLoop=0;iLoop<dataCnt;iLoop++ ) {
    	var value = $( '#' + treeGridId ).jqxTreeGrid( 'getCellValue', iLoop, 'JQX_CB' );
    	if ( value ) {
    		arrChecked.push( iLoop );
    	};
    };
    arrChecked.sort( function( a, b ) { return a-b; } );
    fc_setTreeGridExtraOption( treeGridId, 'treeGridCheckIndexes', arrChecked );
    return arrChecked;
}; // end of fc_getTreeGridCheckIndexs
/**
 *
 * @param treeGridId
 */
function fc_expandAllTreeGrid( treeGridId ) {
	try {
		$( '#' + treeGridId ).jqxTreeGrid( 'expandAll' );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_expandAllTreeGrid
/**
 *
 * @param treeGridId
 */
function fc_setTreeGridCollapseAll( treeGridId ) {
	try {
		$( '#' + treeGridId ).jqxTreeGrid( 'collapseAll' );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_setTreeGridCollapseAll