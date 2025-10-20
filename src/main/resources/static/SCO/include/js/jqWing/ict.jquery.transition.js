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
function fc_search( prmServiceNm, prmTransitionNm, prmModule, prmParam ) {
	var isSuccess = fc_submit( 'search', prmServiceNm, prmTransitionNm, prmParam, '', prmModule );
	if ( isSuccess ) {
		fc_showCompleteMessage( 'I' );
	};
	fc_setEditFlag( false );
	return isSuccess
}; // end of fc_search

/** -----------------------------------------------------------------------------
 * @Name			fc_search
 * @Description
 * @Returns
 * @Example
 * --------------------------------------------------------------------------- */
function fc_searchCall( prmServiceNm, prmTransitionNm, prmModule ,callbackfunc, prmParam) {
	var isSuccess = fc_submitCall( 'search', prmServiceNm, prmTransitionNm, prmParam, '', prmModule ,function(resultData, result){
		callbackfunc(resultData, result);
	});
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

function fc_searchMultiObj( arrFormModel, arrTargetModel, prmServiceNm, prmTransitionNm, isNoProgressBar, prmModule, prmParam ) {
	
	try {
		
		if(isNoProgressBar == "N"){
			if ( !fc_submit( 'search', prmServiceNm, prmTransitionNm, prmParam, '', prmModule ) ) {
				return false;
			};
			
			// 20191219
			// form에 데이터를 표시할때 change가 걸려있어 트랜잭션 발생시 그리드 조회가 되어지지 않아서 순서 바꿈
			// 그리드 조회시 change 이벤트 걸려 있을경우에 재수정 요망.
			
			if ( !fc_setGridData( arrTargetModel ) ) return false;
			
			for ( var loop=0;loop<arrFormModel.length;loop++ ) {
				if ( !fc_setFormData( arrFormModel[ loop ].id, arrFormModel[ loop ].resultKey ) ) return false;
			};
			
			fc_showCompleteMessage( 'I' );
			if ( arrFormModel.length > 0 ) fc_setEditFlag( false );
			return true;
		}else{
			fc_showProgBar( true ); //use only grid search 2019.11.6
			
			setTimeout(function(){
				if ( !fc_submit( 'search', prmServiceNm, prmTransitionNm, prmParam, '', prmModule ) ) {
					return false;
				};
				
				fc_showProgBar( false );
				
				// 20191219
				// form에 데이터를 표시할때 change가 걸려있어 트랜잭션 발생시 그리드 조회가 되어지지 않아서 순서 바꿈
				// 그리드 조회시 change 이벤트 걸려 있을경우에 재수정 요망.
				if ( !fc_setGridData( arrTargetModel ) ) return false;
				
				for ( var loop=0;loop<arrFormModel.length;loop++ ) {
					if ( !fc_setFormData( arrFormModel[ loop ].id, arrFormModel[ loop ].resultKey ) ) return false;
				};
				
				fc_showCompleteMessage( 'I' );
				if ( arrFormModel.length > 0 ) fc_setEditFlag( false );
				return true;
			},1);
		}
        		
	} catch ( e ) {
		if(isNoProgressBar != "N") fc_showProgBar( false );
		fc_getException( e );
	} finally{
		//fc_showProgBar( false );
	};
	
	/*
	try {
		if ( !fc_submit( 'search', prmServiceNm, prmTransitionNm, '', '', prmModule ) ) {
			return false;
		};
		
		// 20191219
		// form에 데이터를 표시할때 change가 걸려있어 트랜잭션 발생시 그리드 조회가 되어지지 않아서 순서 바꿈
		// 그리드 조회시 change 이벤트 걸려 있을경우에 재수정 요망.
		
		if ( !fc_setGridData( arrTargetModel ) ) return false;
		
		for ( var loop=0;loop<arrFormModel.length;loop++ ) {
			if ( !fc_setFormData( arrFormModel[ loop ].id, arrFormModel[ loop ].resultKey ) ) return false;
		};
		
		fc_showCompleteMessage( 'I' );
		if ( arrFormModel.length > 0 ) fc_setEditFlag( false );
		return true;
	} catch ( e ) {
		fc_getException( e );
	};
	*/
	
}; // end of fc_searchMultiObj

/** -----------------------------------------------------------------------------
 * @Name			fc_searchMultiObjCall
 * @Description
 * @Returns
 * @Example
 * --------------------------------------------------------------------------- */
function fc_searchMultiObjCall( arrFormModel, arrTargetModel, prmServiceNm, prmTransitionNm, isNoProgressBar, prmModule, callbackfunc, prmParam ) {
	
	try {
		
		if(isNoProgressBar == "N"){
			fc_submitCall( 'search', prmServiceNm, prmTransitionNm, prmParam, '', prmModule, function(resultData, result){
				if(!result) {
					return false;
				}else {
										
					if ( !fc_setGridData( arrTargetModel ) ) return false;
					
					for ( var loop=0;loop<arrFormModel.length;loop++ ) {
						if ( !fc_setFormData( arrFormModel[ loop ].id, arrFormModel[ loop ].resultKey ) ) return false;
					};
					
					fc_showCompleteMessage( 'I' );
					
					if ( arrFormModel.length > 0 ) fc_setEditFlag( false );
					
					if ( typeof callbackfunc == 'function' )
						callbackfunc(resultData, result);
					
					return true;
				}
			}); // end fc_submitCall
		}else{
			fc_showProgBar( true ); //use only grid search 2019.11.6
			
			setTimeout(function(){
				
				fc_submitCall( 'search', prmServiceNm, prmTransitionNm, prmParam, '', prmModule, function(resultData, result){
					if(!result) {
						fc_showProgBar( false );
						return false;
					}else {
						
						fc_showProgBar( false );
						
						if ( !fc_setGridData( arrTargetModel ) ) return false;
						
						for ( var loop=0;loop<arrFormModel.length;loop++ ) {
							if ( !fc_setFormData( arrFormModel[ loop ].id, arrFormModel[ loop ].resultKey ) ) return false;
						};
						
						fc_showCompleteMessage( 'I' );
						
						if ( arrFormModel.length > 0 ) fc_setEditFlag( false );
						
						if ( typeof callbackfunc == 'function' )
							callbackfunc(resultData, result);
						
						return true;
					}
				}); // end fc_submitCall
				
			},1); // setTimeout
		}
	    		
	} catch ( e ) {
		if(isNoProgressBar != "N") fc_showProgBar( false );
		fc_getException( e );
	} finally{
		//fc_showProgBar( false );
	};
	
}; // end of fc_searchMultiObj
/** -----------------------------------------------------------------------------
 * @Name			fc_searchForm
 * @Description
 * @Returns
 * @Example
 * --------------------------------------------------------------------------- */
function fc_searchForm( arrFormModel, prmServiceNm, prmTransitionNm, isNoProgressBar, prmModule, prmParam ) {
	try {
		if ( !fc_submit( 'search', prmServiceNm, prmTransitionNm, prmParam, '', prmModule ) ) {
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
 * @Name			fc_searchFormCall
 * @Description
 * @Returns
 * @Example
 * --------------------------------------------------------------------------- */
function fc_searchFormCall(arrFormModel, prmServiceNm, prmTransitionNm, isNoProgressBar, prmModule ,callbackfunc, prmParam) {
	try {
	
		fc_submitCall( 'search', prmServiceNm, prmTransitionNm, prmParam, '', prmModule, function(resultData, result){
			if(!result) {
				return false;
			}else {
				
				for ( var loop=0;loop<arrFormModel.length;loop++ ) {
					if ( !fc_setFormData( arrFormModel[ loop ].id, arrFormModel[ loop ].resultKey ) ) return false;
				};
				
				fc_showCompleteMessage( 'I' );
	
				if ( typeof callbackfunc == 'function' )
					callbackfunc(resultData, result);
				
				return true;
			}
		});
		
	} catch ( e ) {
		fc_showProgBar( false );
		fc_getException( e );
	}finally{
		fc_showProgBar( false );
	};
	
}; // end of fc_search
/** -----------------------------------------------------------------------------
 * @Name			fc_searchGrid
 * @Description
 * @Returns
 * @Example
 * --------------------------------------------------------------------------- */
function fc_searchGrid( arrTargetModel, prmServiceNm, prmTransitionNm, isNoProgressBar, prmModule, prmParam ) {
	try {
		
		if(isNoProgressBar == "N"){
			if ( !fc_submit( 'search', prmServiceNm, prmTransitionNm, prmParam, '', prmModule ) ) {
				fc_showProgBar( false );
				return false;
			};
			
			if ( !fc_setGridData( arrTargetModel ) ){
				return false;
			}
			
			fc_showCompleteMessage( 'I' );
			return true;
		}else{
			fc_showProgBar( true ); //use only grid search 2019.11.6
			
			setTimeout(function(){
				if ( !fc_submit( 'search', prmServiceNm, prmTransitionNm, prmParam, '', prmModule ) ) {
					fc_showProgBar( false );
					return false;
				};
				
				fc_showProgBar( false );
				
				if ( !fc_setGridData( arrTargetModel ) ){
					return false;
				}
				
				fc_showCompleteMessage( 'I' );
				
				
				
				return true;
			},1);
		}
        		
	} catch ( e ) {
		if(isNoProgressBar != "N") fc_showProgBar( false );
		fc_getException( e );
	} finally{
		//fc_showProgBar( false );
	};
}; // end of fc_searchGrid
/** -----------------------------------------------------------------------------
 * @Name			fc_searchGridParam
 * @Description
 * @Returns
 * @Example
 * --------------------------------------------------------------------------- */
function fc_searchGridParam( arrTargetModel, prmServiceNm, prmTransitionNm, isClearParam, isNoProgressBar, prmModule, prmParam ) {
	try {
		
		if(isNoProgressBar == "N"){
			if ( !fc_submitParam( 'search', prmServiceNm, prmTransitionNm, isClearParam, prmParam, '', prmModule ) ) {
				fc_showProgBar( false );
				return false;
			};
			
			if ( !fc_setGridData( arrTargetModel ) ){
				return false;
			}
			
			fc_showCompleteMessage( 'I' );
			return true;
		}else{
			fc_showProgBar( true ); //use only grid search 2019.11.6
			
			setTimeout(function(){
				if ( !fc_submitParam( 'search', prmServiceNm, prmTransitionNm, isClearParam, prmParam, '', prmModule ) ) {
					fc_showProgBar( false );
					return false;
				};
				
				fc_showProgBar( false );
				
				if ( !fc_setGridData( arrTargetModel ) ){
					return false;
				}
				
				fc_showCompleteMessage( 'I' );
				
				
				
				return true;
			},1);
		}
        		
	} catch ( e ) {
		if(isNoProgressBar != "N") fc_showProgBar( false );
		fc_getException( e );
	} finally{
		//fc_showProgBar( false );
	};
}; // end of fc_searchGridParam

/** -----------------------------------------------------------------------------
 * @Name			fc_searchGridCall
 * @Description
 * @Returns
 * @Example
 * --------------------------------------------------------------------------- */
function fc_searchGridCall( arrTargetModel, prmServiceNm, prmTransitionNm, isNoProgressBar, prmModule ,callbackfunc, prmParam) {
	try {
		
		if(isNoProgressBar == "N"){
			fc_submitCall( 'search', prmServiceNm, prmTransitionNm, prmParam, '', prmModule, function(resultData, result){
				if(!result) {
					return false;
				}else {
					if ( !fc_setGridData( arrTargetModel ) ){
						return false;
					}
					
					fc_showCompleteMessage( 'I' );
		
					if ( typeof callbackfunc == 'function' )
						callbackfunc(resultData, result);
					
					return true;
				}
			});
		}else{
			fc_showProgBar( true ); //use only grid search 2019.11.6
			
			setTimeout(function(){
				fc_submitCall( 'search', prmServiceNm, prmTransitionNm, prmParam, '', prmModule, function(resultData, result){
					fc_showProgBar( false );
					
					if(!result) {
						return false;
					}else {
						if ( !fc_setGridData( arrTargetModel ) ){
							return false;
						}
						
						fc_showCompleteMessage( 'I' );
			
						if ( typeof callbackfunc == 'function' )
							callbackfunc(resultData, result);
						
						return true;
					}
				});
				
			},1);
		}
		
	} catch ( e ) {
		if(isNoProgressBar != "N") fc_showProgBar( false );
		fc_getException( e );
	}finally{
		//fc_showProgBar( false );
	};
	
}; // end of fc_search
/** -----------------------------------------------------------------------------
 * @Name			fc_searchTreeGrid
 * @Description
 * @Returns
 * @Example
 * --------------------------------------------------------------------------- */
function fc_searchTreeGrid( arrTargetModel, prmServiceNm, prmTransitionNm, isNoProgressBar, prmModule ) {
	try {
		
		if(isNoProgressBar == "N"){
			if ( !fc_submit( 'search', prmServiceNm, prmTransitionNm, '', '', prmModule ) ) {
				fc_showProgBar( false );
				return false;
			};
			
			if ( !fc_setTreeGridData( arrTargetModel ) ){
				return false;
			}
			
			fc_showCompleteMessage( 'I' );
			
			return true;
		}else{
			fc_showProgBar( true ); //use only grid search 2019.11.6
			
			setTimeout(function(){
				if ( !fc_submit( 'search', prmServiceNm, prmTransitionNm, '', '', prmModule ) ) {
					fc_showProgBar( false );
					return false;
				};
				
				fc_showProgBar( false );
				
				if ( !fc_setTreeGridData( arrTargetModel ) ){
					return false;
				}
				
				fc_showCompleteMessage( 'I' );
				
				return true;
			},1);
		}
		
	} catch ( e ) {
		if(isNoProgressBar != "N") fc_showProgBar( false );
		fc_getException( e );
	} finally{
		//fc_showProgBar( false );
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
 * @Name			fc_saveMultiObjCall
 * @Description
 * @Returns
 * @Example
 * --------------------------------------------------------------------------- */
function fc_saveMultiObjCall( arrFormId, addFormParam, arrSrcGrid, addGridParam, prmServiceNm, prmTransitionNm, askConfirm, checkSelected, msgItemCd, afterCallback, cancelCallback, arrFormModel, arrTargetModel ) {
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
							, function () { fc_saveAfterCall( prmServiceNm, prmTransitionNm, msgItemCd, afterCallback, arrFormModel, arrTargetModel ); }
							, function () { if ( typeof cancelCallback == 'function' ) cancelCallback(); }
							);
		} else {
			fc_saveAfterCall( prmServiceNm, prmTransitionNm, msgItemCd, afterCallback, arrFormModel, arrTargetModel );
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
function fc_saveAfterCall( prmServiceNm, prmTransitionNm, msgItemCd, afterCallback, arrFormModel, arrTargetModel ) {
	
	fc_submitCall( 'save', prmServiceNm, prmTransitionNm, '', '', '', function(resultData, result){
		if(!result) {
			return false;
		}else {
								
			if ( !fc_isNull( arrFormModel ) ) {
				for ( var loop=0;loop<arrFormModel.length;loop++ ) {
					if ( !fc_setFormData( arrFormModel[ loop ].id, arrFormModel[ loop ].resultKey ) ) return false;
				};
			};
			if ( !fc_isNull( arrTargetModel ) ) {
				if ( !fc_setGridData( arrTargetModel ) ) return false;
			}
			
			fc_showCompleteMessage( 'S', msgItemCd );
			
			if ( typeof afterCallback == 'function' )
				afterCallback(resultData, result);
			
			return true;
		}
	}); // end fc_submitCall
	
	
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
		
		// 2021.12.17 Revision by 
		// fc_setGridComboFilter를 사용하면 fc_saveGrid시  fc_addGridDataSet에서 grid내의 lov의 Filter를 제거한다. "fc_setGridComboFilterSwitch( arrSrcGrid[ iLoop ], false );"
		// 저장 실패 시 fc_setGridComboFilterSwitch( arrSrcGrid[ iLoop ], true ); 로직이 없어서 버그 발생
		// 
		// 차후 주의할 점은 fc_setGridComboFilter 사용하는 화면은 askConfirm = 'N'으로 세팅하고 catch에 Filter하는 기능을 추가하여야 함.
		// 아래처럼 분기처리하는 이유는 공통 로직이기 때문에 다른 화면에 영향을 미치지 않기 위함.
		if(prmServiceNm == 'SD3030-service') {
			for ( var iLoop = 0; iLoop<arrSrcGrid.length; iLoop++ ) {
				fc_setGridComboFilterSwitch( arrSrcGrid[ iLoop ], true );	// set filter data for lov type columname
			};
		}
		
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
function fc_saveFile( prmServiceNm, prmTransitionNm, objFormData, askConfirm, msgItemCd, prmModule, afterCallback, cancelCallback ) {
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
								 , function () { fc_saveFileAfter( prmServiceNm, prmTransitionNm, objFormData, msgItemCd, prmModule, askConfirm, afterCallback ); }
								 , function () { if ( typeof cancelCallback == 'function' ) cancelCallback(); }
								 );
		} else {
			fc_saveFileAfter( prmServiceNm, prmTransitionNm, objFormData, msgItemCd, prmModule, askConfirm, afterCallback );
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
function fc_saveFileAfter( prmServiceNm, prmTransitionNm, objFormData, msgItemCd, prmModule, askConfirm, afterCallback ) {
	
	var bResult = fc_submit_file( 'save', prmServiceNm, prmTransitionNm, objFormData, prmModule );
	if ( bResult )
		if(askConfirm == "Y") fc_showCompleteMessage( 'F', msgItemCd );

	if ( typeof afterCallback == 'function' )
		afterCallback( bResult );

	fc_setEditFlag( false );
};// end of fc_saveFileAfter
/** -----------------------------------------------------------------------------
 * @Name			fc_saveFileCall
 * @Description
 * @Returns
 * @Example
 * --------------------------------------------------------------------------- */
function fc_saveFileCall( prmServiceNm, prmTransitionNm, objFormData, askConfirm, msgItemCd, prmModule, afterCallback, cancelCallback ) {
	try {
		askConfirm    = fc_setValue( askConfirm, 'Y' );
		// set default parameters
		objFormData.append( 'gwLoginId'		, window.gwMesEnv.user.id );
		objFormData.append( 'gwServiceName'	, prmServiceNm );
		objFormData.append( 'gwLanguageCd'	, window.gwMesEnv.lang.cd );
		objFormData.append( 'gwClientIp'	, window.gwMesEnv.user.clientIp );
		objFormData.append( 'gwPgmId'		, window.gwMesEnv.user.pgmId );
		
		fc_submit_fileCall( 'save', prmServiceNm, prmTransitionNm, objFormData, prmModule, '', function(resultData, result){
		
			if ( typeof afterCallback == 'function' ) afterCallback( resultData, result );
	
			fc_setEditFlag( false );
			
		});
		
	} catch ( e ) {
		fc_getException( e );
	};
}// end of fc_saveFile
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
function fc_deleteFormAfter( prmServiceNm, prmTransitionNm, msgItemCd, afterCallback, cancelCallback, arrFormModel, prmModule) {
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
function fc_deleteJsonForm( arrFormId, addParam, prmServiceNm, prmTransitionNm, askConfirm, keyList, sendData, msgItemCd, prmModule, afterCallback, cancelCallback, arrFormModel ) {
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
								 , function () { fc_deleteJsonFormAfter( prmServiceNm, prmTransitionNm, msgItemCd, prmModule, afterCallback, cancelCallback, arrFormModel ); }
								 , function () { if ( typeof cancelCallback == 'function' ) cancelCallback(); }
								 );
		} else {
			fc_deleteJsonFormAfter( prmServiceNm, prmTransitionNm, msgItemCd, prmModule, afterCallback, cancelCallback, arrFormModel );
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
function fc_deleteJsonFormAfter( prmServiceNm, prmTransitionNm, msgItemCd, prmModule, afterCallback, cancelCallback, arrFormModel ) {
	//fc_deleteFormAfter( prmServiceNm, prmTransitionNm, msgItemCd, prmModule, afterCallback, cancelCallback, arrFormModel );
	// 20191213 파일업로드 수정
	var bResult = fc_submit( 'delete', prmServiceNm, prmTransitionNm, '', '', prmModule);
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
		
		// 2021.12.17 Revision by 
		// fc_setGridComboFilter를 사용하면 fc_deleteGrid시  fc_addGridDataSet에서 grid내의 lov의 Filter를 제거한다. "fc_setGridComboFilterSwitch( arrSrcGrid[ iLoop ], false );"
		// 저장 실패 시 fc_setGridComboFilterSwitch( arrSrcGrid[ iLoop ], true ); 로직이 없어서 버그 발생
		// 
		// 차후 주의할 점은 fc_setGridComboFilter 사용하는 화면은 askConfirm = 'N'으로 세팅하고 catch에 Filter하는 기능을 추가하여야 함.
		// 아래처럼 분기처리하는 이유는 공통 로직이기 때문에 다른 화면에 영향을 미치지 않기 위함.
		if(prmServiceNm == 'SD3030-service') {
			for ( var iLoop = 0; iLoop<arrSrcGrid.length; iLoop++ ) {
				fc_setGridComboFilterSwitch( arrSrcGrid[ iLoop ], true );	// set filter data for lov type columname
			};
		}
		
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