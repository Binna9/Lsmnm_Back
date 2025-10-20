/**
 * Declare variable
 */

/**
 * Declare Initial JS Function
 */
$( function() {
	fc_showLog( 1, '***** jQuery Transition' );
}); // end of $( function () )

//*************************************************************************************************
//     SEARCH
//*************************************************************************************************
/** -----------------------------------------------------------------------------
 * @Name			fc_search
 * @Description		
 * @Returns			
 * @Example			
 * --------------------------------------------------------------------------- */
function fc_search( prmServiceNm, prmTransitionNm, prmModule ) {	
	var isSuccess = fc_submit( 'search', prmServiceNm, prmTransitionNm, '', '', prmModule );	
	if ( isSuccess ) {
		fc_showCompleteMessage( 'I' );
	};
	fc_setEditFlag( false );
	return isSuccess
}; // end of fc_search
/** -----------------------------------------------------------------------------
 * @Name			fc_searchMultiObj
 * @Description		
 * @Returns			
 * @Example			
 * --------------------------------------------------------------------------- */
function fc_searchMultiObj( arrFormModel, arrTargetModel, prmServiceNm, prmTransitionNm, isNoProgressBar, prmModule ) {
	try {
		if ( !fc_submit( 'search', prmServiceNm, prmTransitionNm, '', '', prmModule ) ) {
			return false;
		};
		for ( var loop=0;loop<arrFormModel.length;loop++ ) {
			if ( !fc_setFormData( arrFormModel[ loop ].id, arrFormModel[ loop ].resultKey ) ) return false;
		};
		if ( !fc_setGridData( arrTargetModel ) ) return false;
		fc_showCompleteMessage( 'I' );
		if ( arrFormModel.length > 0 ) fc_setEditFlag( false );
		return true;
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_searchMultiObj
/** -----------------------------------------------------------------------------
 * @Name			fc_searchForm
 * @Description		
 * @Returns			
 * @Example			
 * --------------------------------------------------------------------------- */
function fc_searchForm( arrFormModel, prmServiceNm, prmTransitionNm, isNoProgressBar, prmModule ) {
	try {
		if ( !fc_submit( 'search', prmServiceNm, prmTransitionNm, '', '', prmModule ) ) {
			return false;
		};
		for ( var loop=0;loop<arrFormModel.length;loop++ ) {
			if ( !fc_setFormData( arrFormModel[ loop ].id, arrFormModel[ loop ].resultKey ) ) return false;
		};
		fc_showCompleteMessage( 'I' );
		fc_setEditFlag( false );
		return true;
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_searchForm
/** -----------------------------------------------------------------------------
 * @Name			fc_searchGrid
 * @Description		
 * @Returns			
 * @Example			
 * --------------------------------------------------------------------------- */
function fc_searchGrid( arrTargetModel, prmServiceNm, prmTransitionNm, isNoProgressBar, prmModule ) {
	try {
		if ( !fc_submit( 'search', prmServiceNm, prmTransitionNm, '', '', prmModule ) ) {
			return false;
		};
		if ( !fc_setGridData( arrTargetModel ) ) return false;
		fc_showCompleteMessage( 'I' );
		return true;
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_searchGrid
/** -----------------------------------------------------------------------------
 * @Name			fc_searchTreeGrid
 * @Description		
 * @Returns			
 * @Example			
 * --------------------------------------------------------------------------- */
function fc_searchTreeGrid( arrTargetModel, prmServiceNm, prmTransitionNm, isNoProgressBar, prmModule ) {
	try {
		if ( !fc_submit( 'search', prmServiceNm, prmTransitionNm, '', '', prmModule ) ) {
			return false;
		};
		if ( !fc_setTreeGridData( arrTargetModel ) ) return false;
		fc_showCompleteMessage( 'I' );
		return true;
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_searchTreeGrid

//*************************************************************************************************
//     SAVE
//*************************************************************************************************
/** -----------------------------------------------------------------------------
 * @Name			fc_save
 * @Description		
 * @Returns			
 * @Example			
 * --------------------------------------------------------------------------- */
function fc_save( prmServiceNm, prmTransitionNm, askConfirm, msgItemCd, afterCallback, cancelCallback, arrFormModel, arrTargetModel ) {
	try {
		askConfirm    = fc_setValue( askConfirm  , 'Y' );
		if ( askConfirm == 'Y' ) {
			fc_showConfirmMessage( 'S', msgItemCd
							     , function () { fc_saveAfter( prmServiceNm, prmTransitionNm, msgItemCd, afterCallback, arrFormModel, arrTargetModel ); }
							     , function () { if ( typeof cancelCallback == 'function' ) cancelCallback(); }
							     );
		} else {
			fc_saveAfter( prmServiceNm, prmTransitionNm, msgItemCd, afterCallback, arrFormModel, arrTargetModel );
		};
		fc_setEditFlag( false );
	} catch ( e ) {
		fc_getException( e );
	};
}// end of fc_save
/** -----------------------------------------------------------------------------
 * @Name			fc_saveMultiObj
 * @Description		
 * @Returns			
 * @Example			
 * --------------------------------------------------------------------------- */
function fc_saveMultiObj( arrFormId, addFormParam, arrSrcGrid, addGridParam, prmServiceNm, prmTransitionNm, askConfirm, checkSelected, msgItemCd, afterCallback, cancelCallback, arrFormModel, arrTargetModel ) {
	try {
		askConfirm    = fc_setValue( askConfirm  , 'Y' );
		checkSelected = fc_setValue( checkSelected, 'Y' );
		
		if ( !fc_isNull( arrFormId  ) ) {
			fc_addFormDataSet( arrFormId );
			for ( var _key in addFormParam ) {
				window.gwJsonParam[ _key ] = addFormParam[ _key ];
			};
		};
		if ( !fc_isNull( arrSrcGrid ) ) 
			fc_addGridDataSet( arrSrcGrid, addGridParam, window.gwMesEnv.grid.updateFlag, checkSelected );
		
		if ( askConfirm == 'Y' ) {
			fc_showConfirmMessage( 'S', msgItemCd
							, function () { fc_saveAfter( prmServiceNm, prmTransitionNm, msgItemCd, afterCallback, arrFormModel, arrTargetModel ); }
							, function () { if ( typeof cancelCallback == 'function' ) cancelCallback(); }
							);
		} else {
			fc_saveAfter( prmServiceNm, prmTransitionNm, msgItemCd, afterCallback, arrFormModel, arrTargetModel );
		};
	} catch ( e ) {
		fc_getException( e );
	};
}// end of fc_saveMultiObj
/** -----------------------------------------------------------------------------
 * @Name			fc_saveAfter
 * @Description		
 * @Returns			
 * @Example			
 * --------------------------------------------------------------------------- */
function fc_saveAfter( prmServiceNm, prmTransitionNm, msgItemCd, afterCallback, arrFormModel, arrTargetModel ) {
	var bResult = fc_submit( 'save', prmServiceNm, prmTransitionNm );
	if ( bResult )
		fc_showCompleteMessage( 'S', msgItemCd );
	
	if ( !fc_isNull( arrFormModel ) ) {
		for ( var loop=0;loop<arrFormModel.length;loop++ ) {
			if ( !fc_setFormData( arrFormModel[ loop ].id, arrFormModel[ loop ].resultKey ) ) return false;
		};
	};
	if ( !fc_isNull( arrTargetModel ) ) {
		if ( !fc_setGridData( arrTargetModel ) ) return false;
	};
	
	if ( typeof afterCallback == 'function' )
		afterCallback( bResult );
};// end of fc_saveAfter
/** -----------------------------------------------------------------------------
 * @Name			fc_saveForm
 * @Description		
 * @Returns			
 * @Example			
 * --------------------------------------------------------------------------- */
function fc_saveForm( arrFormId, addParam, prmServiceNm, prmTransitionNm, askConfirm, msgItemCd, afterCallback, cancelCallback, arrFormModel ) {
	try {
		askConfirm    = fc_setValue( askConfirm, 'Y' );
		fc_addFormDataSet( arrFormId );
		// addparam
		for ( var _key in addParam ) {
			window.gwJsonParam[ _key ] = addParam[ _key ];
		};
		if ( askConfirm == 'Y' ) {
			fc_showConfirmMessage( 'S', msgItemCd
								 , function () { fc_saveFormAfter( prmServiceNm, prmTransitionNm, msgItemCd, afterCallback, cancelCallback, arrFormModel ); }
								 , function () { if ( typeof cancelCallback == 'function' ) cancelCallback(); } 
								 );
		} else {
			fc_saveFormAfter( prmServiceNm, prmTransitionNm, msgItemCd, afterCallback, cancelCallback, arrFormModel );
		};
		fc_setEditFlag( false );
	} catch ( e ) {
		fc_getException( e );
	};
}// end of fc_saveForm
/** -----------------------------------------------------------------------------
 * @Name			fc_saveFormAfter
 * @Description		
 * @Returns			
 * @Example			
 * --------------------------------------------------------------------------- */
function fc_saveFormAfter( prmServiceNm, prmTransitionNm, msgItemCd, afterCallback, cancelCallback, arrFormModel ) {
	var bResult = fc_submit( 'save', prmServiceNm, prmTransitionNm );
	if ( bResult )
		fc_showCompleteMessage( 'S', msgItemCd );
	
	if ( !fc_isNull( arrFormModel ) ) {
		for ( var loop=0;loop<arrFormModel.length;loop++ ) {
			if ( !fc_setFormData( arrFormModel[ loop ].id, arrFormModel[ loop ].resultKey ) ) return false;
		};
	};
	
	if ( typeof afterCallback == 'function' )
		afterCallback( bResult );
	
	fc_setEditFlag( false );
};// end of fc_saveFormAfter
/** -----------------------------------------------------------------------------
 * @Name			fc_saveJsonForm
 * @Description		
 * @Returns			
 * @Example			
 * --------------------------------------------------------------------------- */
function fc_saveJsonForm( arrFormId, addParam, prmServiceNm, prmTransitionNm, askConfirm, keyList, sendData, msgItemCd, afterCallback, cancelCallback, arrFormModel ) {
	try {
		askConfirm    = fc_setValue( askConfirm, 'Y' );
		fc_addFormDataSet( arrFormId );
		// addparam
		for ( var _key in addParam ) {
			window.gwJsonParam[ _key ] = addParam[ _key ];
		};
		if ( !fc_isNull(keyList) ) {
			window.gwJsonParam[ 'gwSendData' ] = JSON.stringify( sendData );
			window.gwJsonParam[ 'gwKeyList'  ] = JSON.stringify( { gwKeyList: keyList, } ) ;
		};
		if ( askConfirm == 'Y' ) {
			fc_showConfirmMessage( 'S', msgItemCd
								 , function () { fc_saveJsonFormAfter( prmServiceNm, prmTransitionNm, msgItemCd, afterCallback, cancelCallback, arrFormModel ); }
								 , function () { if ( typeof cancelCallback == 'function' ) cancelCallback(); } 
								 );
		} else {
			fc_saveJsonFormAfter( prmServiceNm, prmTransitionNm, msgItemCd, afterCallback, cancelCallback, arrFormModel );
		};
		fc_setEditFlag( false );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_saveJsonForm
/** -----------------------------------------------------------------------------
 * @Name			fc_saveJsonFormAfter
 * @Description		
 * @Returns			
 * @Example			
 * --------------------------------------------------------------------------- */
function fc_saveJsonFormAfter( prmServiceNm, prmTransitionNm, msgItemCd, afterCallback, cancelCallback, arrFormModel ) {
	fc_saveFormAfter( prmServiceNm, prmTransitionNm, msgItemCd, afterCallback, cancelCallback, arrFormModel );
};// end of fc_saveJsonFormAfter
/** -----------------------------------------------------------------------------
 * @Name			fc_saveGrid
 * @Description		
 * @Returns			
 * @Example			
 * --------------------------------------------------------------------------- */
function fc_saveGrid( arrSrcGrid, addParam, prmServiceNm, prmTransitionNm, askConfirm, checkSelected, msgItemCd, afterCallback, cancelCallback, arrTargetModel ) {
	try {
		askConfirm    = fc_setValue( askConfirm   , 'Y' );
		checkSelected = fc_setValue( checkSelected, 'Y' );
		
		// Set arrSrcGrid SelectRow Date to window.gwJsonParam
		if ( !fc_addGridDataSet( arrSrcGrid, addParam, window.gwMesEnv.grid.updateFlag, checkSelected ) ) return;		
		
		if ( askConfirm == 'Y' ) {
			fc_showConfirmMessage( 'S', msgItemCd
								, function () { fc_saveGridAfter( arrSrcGrid, prmServiceNm, prmTransitionNm, msgItemCd, afterCallback, arrTargetModel ); }
								, function () { if ( typeof cancelCallback == 'function' ) cancelCallback(); } 
								);
		} else {
			fc_saveGridAfter( arrSrcGrid, prmServiceNm, prmTransitionNm, msgItemCd, afterCallback, arrTargetModel );
		};
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_saveGrid
/** -----------------------------------------------------------------------------
 * @Name			fc_saveGridAfter
 * @Description		
 * @Returns			
 * @Example			
 * --------------------------------------------------------------------------- */
function fc_saveGridAfter( arrSrcGrid, prmServiceNm, prmTransitionNm, msgItemCd, afterCallback, arrTargetModel ) {
	var bResult = fc_submit( 'save', prmServiceNm, prmTransitionNm );
	if ( bResult ) {
		// after save sucess, clear check value
		for ( var iLoop = 0; iLoop<arrSrcGrid.length; iLoop++ ) {
			var selRows = fc_getSelectedRow( arrSrcGrid[ iLoop ] );
			for ( var jLoop=0;jLoop<selRows.length;jLoop++ ) {
				fc_setCellData( arrSrcGrid[ iLoop ], selRows[ jLoop ], 'JQX_RS', '' );
			};
			fc_resetSelection( arrSrcGrid[ iLoop ] );
			fc_setGridComboFilterSwitch( arrSrcGrid[ iLoop ], true );	// set filter data for lov type columname		   
		};
		fc_showCompleteMessage( 'S', msgItemCd );
	};
	
	if ( !fc_isNull( arrTargetModel ) ) {
		if ( !fc_setGridData( arrTargetModel ) ) return false;
	};
	
	if ( typeof afterCallback == 'function' )
		afterCallback( bResult );
}; // end of fc_saveGridAfter
/** -----------------------------------------------------------------------------
 * @Name			fc_saveFile
 * @Description		
 * @Returns			
 * @Example			
 * --------------------------------------------------------------------------- */
function fc_saveFile( prmServiceNm, prmTransitionNm, objFormData, askConfirm, msgItemCd, afterCallback, cancelCallback ) {
	try {
		askConfirm    = fc_setValue( askConfirm, 'Y' );
		// set default parameters
		objFormData.append( 'gwLoginId'		, window.gwMesEnv.user.id );
		objFormData.append( 'gwServiceName'	, prmServiceNm );
		objFormData.append( 'gwLanguageCd'	, window.gwMesEnv.lang.cd );
		objFormData.append( 'gwClientIp'	, window.gwMesEnv.user.clientIp );
		objFormData.append( 'gwPgmId'		, window.gwMesEnv.user.pgmId );	
		
		if ( askConfirm == 'Y' ) {
			fc_showConfirmMessage( 'F', msgItemCd
								 , function () { fc_saveFileAfter( prmServiceNm, prmTransitionNm, objFormData, msgItemCd, afterCallback ); }
								 , function () { if ( typeof cancelCallback == 'function' ) cancelCallback(); } 
								 );
		} else {
			fc_saveFileAfter( prmServiceNm, prmTransitionNm, objFormData, msgItemCd, afterCallback );
		};
		fc_setEditFlag( false );
	} catch ( e ) {
		fc_getException( e );
	};
}// end of fc_saveFile
/** -----------------------------------------------------------------------------
 * @Name			fc_saveFileAfter
 * @Description		
 * @Returns			
 * @Example			
 * --------------------------------------------------------------------------- */
function fc_saveFileAfter( prmServiceNm, prmTransitionNm, objFormData, msgItemCd, afterCallback ) {
	var bResult = fc_submit_file( 'save', prmServiceNm, prmTransitionNm, objFormData );
	if ( bResult )
		fc_showCompleteMessage( 'F', msgItemCd );
	
	if ( typeof afterCallback == 'function' )
		afterCallback( bResult );
	
	fc_setEditFlag( false );
};// end of fc_saveFileAfter
/** -----------------------------------------------------------------------------
 * @Name			fc_saveTreeGrid
 * @Description		
 * @Returns			
 * @Example			
 * --------------------------------------------------------------------------- */
function fc_saveTreeGrid( arrSrcGrid, addParam, prmServiceNm, prmTransitionNm, askConfirm, msgItemCd, afterCallback, cancelCallback, arrTargetModel ) {
	try {
		askConfirm = fc_setValue( askConfirm, 'Y' );
		
		// Set arrSrcGrid SelectRow Date to window.gwJsonParam
		if ( !fc_addTreeGridDataSet( arrSrcGrid, addParam, window.gwMesEnv.grid.updateFlag ) ) return;
		
		if ( askConfirm == 'Y' ) {
			fc_showConfirmMessage( 'S', msgItemCd
								 , function () { fc_saveTreeGridAfter( arrSrcGrid, prmServiceNm, prmTransitionNm, msgItemCd, afterCallback, arrTargetModel ); }
								 , function () { if ( typeof cancelCallback == 'function' ) cancelCallback(); } 
								 );
		} else {
			fc_saveTreeGridAfter( arrSrcGrid, prmServiceNm, prmTransitionNm, msgItemCd, afterCallback, arrTargetModel );
		};
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_saveTreeGrid
/** -----------------------------------------------------------------------------
 * @Name			fc_saveTreeGridAfter
 * @Description		
 * @Returns			
 * @Example			
 * --------------------------------------------------------------------------- */
function fc_saveTreeGridAfter( arrSrcGrid, prmServiceNm, prmTransitionNm, msgItemCd, afterCallback, arrTargetModel ) {
	var bResult = fc_submit( 'save', prmServiceNm, prmTransitionNm );
	if ( bResult ) {
		for ( var iLoop=0;iLoop<arrSrcGrid.length;iLoop++ ) {
			var selRows = fc_getTreeGridSelectedRow( arrSrcGrid[ iLoop ] );
			for ( var jLoop=0;jLoop<selRows.length;jLoop++ ) {
				fc_setTreeGridCellData( arrSrcGrid[ iLoop ], selRows[ jLoop ], 'JQX_RS', '' );
				fc_setTreeGridCellData( arrSrcGrid[ iLoop ], selRows[ jLoop ], 'JQX_CB', false );   
			};
			fc_resetTreeGridSelection( arrSrcGrid[ iLoop ] );
		};
		fc_showCompleteMessage( 'S', msgItemCd );
	};
	if ( !fc_isNull( arrTargetModel ) ) {
		if ( !fc_setTreeGridData( arrTargetModel ) ) return false;
	};
	if ( typeof afterCallback == 'function' )
		afterCallback( bResult );
}; // end of fc_saveTreeGridAfter
/** -----------------------------------------------------------------------------
 * @Name			fc_saveTree
 * @Description		
 * @Returns			
 * @Example			
 * --------------------------------------------------------------------------- */
function fc_saveTree( treeId, node, prmServiceNm, prmTransitionNm, askConfirm, msgItemCd, afterCallback, cancelCallback ) {
	try {
		askConfirm = fc_setValue( askConfirm, 'Y' );
		if ( !fc_addTreeDataSet( treeId, node ) ) return;
		
		if ( askConfirm == 'Y' ) {
			fc_showConfirmMessage( 'S', msgItemCd
								 , function () { fc_saveTreeAfter( treeId, prmServiceNm, prmTransitionNm, msgItemCd, afterCallback ); }
								 , function () { if ( typeof cancelCallback == 'function' ) cancelCallback(); } 
								 );
		} else {
			fc_saveTreeAfter( treeId, prmServiceNm, prmTransitionNm, msgItemCd, afterCallback );
		};
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_saveTree
/** -----------------------------------------------------------------------------
 * @Name			fc_saveTreeAfter
 * @Description		
 * @Returns			
 * @Example			
 * --------------------------------------------------------------------------- */
function fc_saveTreeAfter( treeId, prmServiceNm, prmTransitionNm, msgItemCd, afterCallback ) {
	var bResult = fc_submit( 'save', prmServiceNm, prmTransitionNm );
	if ( bResult ) {
		fc_showCompleteMessage( 'S', msgItemCd );
	};
	if ( typeof afterCallback == 'function' ) {
		afterCallback( bResult );
	};
}; // end of fc_saveTreeAfter

//*************************************************************************************************
//     DELETE
//*************************************************************************************************
/** -----------------------------------------------------------------------------
 * @Name			fc_delete
 * @Description		
 * @Returns			
 * @Example			
 * --------------------------------------------------------------------------- */
function fc_delete( prmServiceNm, prmTransitionNm, askConfirm, msgItemCd, afterCallback, cancelCallback, arrFormModel, arrTargetModel ) {
	try {
		askConfirm = fc_setValue( askConfirm, 'Y' );
		if ( askConfirm == 'Y' ) {
			fc_showConfirmMessage( 'D', msgItemCd
							     , function () { fc_deleteAfter( prmServiceNm, prmTransitionNm, msgItemCd, afterCallback, arrFormModel, arrTargetModel ); }
							     , function () { if ( typeof cancelCallback == 'function' ) cancelCallback(); }
							     );
		} else {
			fc_deleteAfter( prmServiceNm, prmTransitionNm, msgItemCd, afterCallback, arrFormModel, arrTargetModel );
		};
		fc_setEditFlag( false );
	} catch ( e ) {
		fc_getException( e );
	};
}// end of fc_delete
/** -----------------------------------------------------------------------------
 * @Name			fc_deleteMultiObj
 * @Description		
 * @Returns			
 * @Example			
 * --------------------------------------------------------------------------- */
function fc_deleteMultiObj( arrFormId, addFormParam, arrSrcGrid, addGridParam, prmServiceNm, prmTransitionNm, askConfirm, checkSelected, msgItemCd, afterCallback, cancelCallback, arrFormModel, arrTargetModel ) {
	try {
		askConfirm    = fc_setValue( askConfirm   , 'Y' );
		checkSelected = fc_setValue( checkSelected, 'Y' );
		
		if ( !fc_isNull( arrFormId ) ) {
			fc_addFormDataSet( arrFormId );
			for ( var _key in addFormParam ) {
				window.gwJsonParam[ _key ] = addFormParam[ _key ];
			};
		};
		if ( !fc_isNull( arrSrcGrid ) ) 
			fc_addGridDataSet( arrSrcGrid, addGridParam, window.gwMesEnv.grid.delFlag, checkSelected );
		
		if ( askConfirm == 'Y' ) {
			fc_showConfirmMessage( 'D', msgItemCd
							     , function () { fc_deleteAfter( arrSrcGrid, prmServiceNm, prmTransitionNm, msgItemCd, afterCallback, arrFormModel, arrTargetModel ); }
							     , function () { if ( typeof cancelCallback == 'function' ) cancelCallback(); } 
							     );
		} else {
			fc_deleteAfter( arrSrcGrid, prmServiceNm, prmTransitionNm, msgItemCd, afterCallback, arrFormModel, arrTargetModel );
		};
		if ( !fc_isNull( arrFormId ) ) fc_setEditFlag( false );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_deleteMultiObj
/** -----------------------------------------------------------------------------
 * @Name			fc_deleteAfter
 * @Description		
 * @Returns			
 * @Example			
 * --------------------------------------------------------------------------- */
function fc_deleteAfter( prmServiceNm, prmTransitionNm, msgItemCd, afterCallback, arrFormModel, arrTargetModel ) {
	var bResult = fc_submit( 'delete', prmServiceNm, prmTransitionNm );
	if ( bResult )
		fc_showCompleteMessage( 'D', msgItemCd );
	
	if ( !fc_isNull( arrFormModel ) ) {
		for ( var loop=0;loop<arrFormModel.length;loop++ ) {
			if ( !fc_setFormData( arrFormModel[ loop ].id, arrFormModel[ loop ].resultKey ) ) return false;
		};
	};
	if ( !fc_isNull( arrTargetModel ) ) {
		if ( !fc_setGridData( arrTargetModel ) ) return false;
	};
	
	if ( typeof afterCallback == 'function' )
		afterCallback( bResult );
};// end of fc_deleteAfter
/** -----------------------------------------------------------------------------
 * @Name			fc_deleteForm
 * @Description		
 * @Returns			
 * @Example			
 * --------------------------------------------------------------------------- */
function fc_deleteForm( arrFormId, addParam, prmServiceNm, prmTransitionNm, askConfirm, msgItemCd, afterCallback, cancelCallback, arrFormModel ) {
	try {
		askConfirm = fc_setValue( askConfirm, 'Y' );
		fc_addFormDataSet( arrFormId );
		// addparam
		for ( var _key in addParam ) {
			window.gwJsonParam[ _key ] = addParam[ _key ];
		};
		if ( askConfirm == 'Y' ) {
			fc_showConfirmMessage( 'D', msgItemCd
								 , function () { fc_deleteFormAfter( prmServiceNm, prmTransitionNm, msgItemCd, afterCallback, cancelCallback, arrFormModel ); }
								 , function () {  if ( typeof cancelCallback == 'function' ) cancelCallback(); } 
								 );
		} else {
			fc_deleteFormAfter( prmServiceNm, prmTransitionNm, msgItemCd, afterCallback, cancelCallback, arrFormModel );
		};
		fc_setEditFlag( false );
	} catch ( e ) {
		fc_getException( e );
	};
}// end of fc_deleteForm
/** -----------------------------------------------------------------------------
 * @Name			fc_deleteFormAfter
 * @Description		
 * @Returns			
 * @Example			
 * --------------------------------------------------------------------------- */
function fc_deleteFormAfter( prmServiceNm, prmTransitionNm, msgItemCd, afterCallback, cancelCallback, arrFormModel ) {
	var bResult = fc_submit( 'delete', prmServiceNm, prmTransitionNm );
	if ( bResult )
		fc_showCompleteMessage( 'D', msgItemCd );
	
	if ( !fc_isNull( arrFormModel ) ) {
		for ( var loop=0;loop<arrFormModel.length;loop++ ) {
			if ( !fc_setFormData( arrFormModel[ loop ].id, arrFormModel[ loop ].resultKey ) ) return false;
		};
	};
	
	if ( typeof afterCallback == 'function' )
		afterCallback( bResult );
	
	fc_setEditFlag( false );
};// end of fc_deleteFormAfter
/** -----------------------------------------------------------------------------
 * @Name			fc_deleteJsonForm
 * @Description		
 * @Returns			
 * @Example			
 * --------------------------------------------------------------------------- */
function fc_deleteJsonForm( arrFormId, addParam, prmServiceNm, prmTransitionNm, askConfirm, keyList, sendData, msgItemCd, afterCallback, cancelCallback, arrFormModel ) {
	try {
		askConfirm = fc_setValue( askConfirm, 'Y' );
		fc_addFormDataSet( arrFormId );
		// addparam
		for ( var _key in addParam ) {
			window.gwJsonParam[ _key ] = addParam[ _key ];
		};
		if ( !fc_isNull( keyList ) ) {
			window.gwJsonParam[ 'gwSendData' ] = JSON.stringify( sendData );
			window.gwJsonParam[ 'gwKeyList'  ] = JSON.stringify( { gwKeyList: keyList } ) ;			
		};
		if ( askConfirm == 'Y' ) {
			fc_showConfirmMessage( 'D', msgItemCd
								 , function () { fc_deleteJsonFormAfter( prmServiceNm, prmTransitionNm, msgItemCd, afterCallback, cancelCallback, arrFormModel ); }
								 , function () { if ( typeof cancelCallback == 'function' ) cancelCallback(); } 
								 );
		} else {
			fc_deleteJsonFormAfter( prmServiceNm, prmTransitionNm, msgItemCd, afterCallback, cancelCallback, arrFormModel );
		};
		fc_setEditFlag( false );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_deleteJsonForm
/** -----------------------------------------------------------------------------
 * @Name			fc_deleteJsonFormAfter
 * @Description		
 * @Returns			
 * @Example			
 * --------------------------------------------------------------------------- */
function fc_deleteJsonFormAfter( prmServiceNm, prmTransitionNm, msgItemCd, afterCallback, cancelCallback, arrFormModel ) {
	fc_deleteFormAfter( prmServiceNm, prmTransitionNm, msgItemCd, afterCallback, cancelCallback, arrFormModel );
};// end of fc_deleteJsonFormAfter
/** -----------------------------------------------------------------------------
 * @Name			fc_deleteGrid
 * @Description		
 * @Returns			
 * @Example			
 * --------------------------------------------------------------------------- */
function fc_deleteGrid( arrSrcGrid, addParam, prmServiceNm, prmTransitionNm, askConfirm, checkSelected, msgItemCd, afterCallback, cancelCallback, arrTargetModel ) {
	try {
		askConfirm    = fc_setValue( askConfirm   , 'Y' );
		checkSelected = fc_setValue( checkSelected, 'Y' );
		// Set arrSrcGrid SelectRow Date to window.gwJsonParam
		if ( !fc_addGridDataSet( arrSrcGrid, addParam, window.gwMesEnv.grid.delFlag, checkSelected ) ) return;
		
		if ( askConfirm == 'Y' ) {
			fc_showConfirmMessage( 'D', msgItemCd
							     , function () { fc_deleteGridAfter( arrSrcGrid, prmServiceNm, prmTransitionNm, msgItemCd, afterCallback, arrTargetModel ); }
							     , function () { if ( typeof cancelCallback == 'function' ) cancelCallback(); } 
							     );
		} else {
			fc_deleteGridAfter( arrSrcGrid, prmServiceNm, prmTransitionNm, msgItemCd, afterCallback, arrTargetModel );
		};
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_deleteGrid
/** -----------------------------------------------------------------------------
 * @Name			fc_deleteGridAfter
 * @Description		
 * @Returns			
 * @Example			
 * --------------------------------------------------------------------------- */
function fc_deleteGridAfter( arrSrcGrid, prmServiceNm, prmTransitionNm, msgItemCd, afterCallback, arrTargetModel ) {
	var bResult = fc_submit( 'delete', prmServiceNm, prmTransitionNm );
	if ( bResult ) {
		// after save sucess, clear check value
		for ( var iLoop = 0; iLoop<arrSrcGrid.length; iLoop++ ) {
			var selRows = fc_getSelectedRow( arrSrcGrid[ iLoop ] );
			for ( var loop = selRows.length-1; loop>=0; loop-- ) {
				fc_delRowData( arrSrcGrid[ iLoop ], selRows[ loop ] );
			};
			fc_resetSelection( arrSrcGrid[ iLoop ] );
			// set filter data for lov type columname
			fc_setGridComboFilterSwitch( arrSrcGrid[ iLoop ], true );
		};
		fc_showCompleteMessage( 'D', msgItemCd );
	};
	
	if ( !fc_isNull( arrTargetModel ) ) {
		if ( !fc_setGridData( arrTargetModel ) ) return false;
	};
	
	if ( typeof afterCallback == 'function' ) 
		afterCallback( bResult );
}; // end of fc_deleteGridAfter