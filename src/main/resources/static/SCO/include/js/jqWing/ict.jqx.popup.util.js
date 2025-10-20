/**
 * Declare variable
 */

/**
 * Declare Initial JS Function
 */
$( function() {
	fc_showLog( 1, '***** jQuery Popup Util' );
}); // end of $( function () )

/** -----------------------------------------------------------------------------
 * @Name			fc_makePopupWindow
 * @Description		Popup Window 객체를 생성 한다.
 * @Parameter
 * @Returns
 * @Method
 * @Exampleㄹ
 * ---------------------------------------------------------------------------*/
function fc_setPopupWindow( targetId, rowid, colNm ) {
	var grid, colData;
	var _searchPopup = function() {
		fc_addParamForm( 'popupWindowCondition' );
		fc_addParam( 'LANG_CD', window.gwMesEnv.lang.cd );
    	fc_searchGrid( [ { gridId: 'popupGrid', resultKey: 'RK_CODE' } ], 'ict.sys.popup-service', 'find', '', 'SCO' );
	};

	if ( fc_isNull( colNm ) ) {
		colData = window.gwPopupSource[ targetId ];
	} else {
		var popupData = fc_getExtraOption( targetId, 'gridPopup' );
		colData = popupData[ colNm ];
	};

	var paramObj = colData.paramPopup();

	var popupWindow = ( function() {
        var _collapsed = false;
        function _addEventListeners() {
            _addSearchInputEventHandlers();
        };

        function _addSearchInputEventHandlers() {
        };

        function _createElements() {
        	$( '#popupWindow' ).jqxWindow({
                height: 450,
                width: 650,
                theme: window.gwMesEnv.themes,
                autoOpen: false,
                isModal: true,
                resizable: false,
//                okButton: $('#OK_BTN'),
                cancelButton: $( '#POP_CANCEL_BTN' ),
                initContent: function () {
                	_createGrid( targetId, colNm );
                	$( '#SEACH_BTN' ).jqxButton({
                        width: 80,
                        theme: window.gwMesEnv.themes
                    });
                    $( '#POP_OK_BTN' ).jqxButton({
                        width: 80,
                        theme: window.gwMesEnv.themes
                    });
                    $( '#POP_CANCEL_BTN' ).jqxButton({
                        width: 80,
                        theme: window.gwMesEnv.themes
                    });
                },
            });
        };

        function _createGrid( targetId, colNm ) {
        	var gridId   = 'popupGrid';
        	var sCaption = '';
			var sItemCd  = '';
			var objItems = [
                        { caption: 'Code'		  , datatype: 'text', align: 'center', name: 'CD_VAL'     , width: 'auto', hidden: true },
                        { caption: 'Code Name'	  , datatype: 'text', align: 'left'	,  name: 'CD_NM'      , width: '20%', hidden: true },
                        { caption: 'Remarks'	  , datatype: 'text', align: 'left',   name: 'REMARKS'    , width: '25%', hidden: true },
                        { caption: 'hidden value1', datatype: 'text', align: 'center', name: 'HIDDEN_VAL1', width: '12%', hidden: true },
                        { caption: 'hidden value2', datatype: 'text', align: 'center', name: 'HIDDEN_VAL2', width: '17%' ,hidden: true },
                        { caption: 'hidden value3', datatype: 'text', align: 'center', name: 'HIDDEN_VAL3', width: '0'  , hidden: true },
                        { caption: 'hidden value4', datatype: 'text', align: 'center', name: 'HIDDEN_VAL4', width: '0'  , hidden: true },
                        { caption: 'hidden value5', datatype: 'text', align: 'center', name: 'HIDDEN_VAL5', width: '0'  , hidden: true }
	                   ];

    		grid = new jQueryGrid( $( '#divPopupGrid' ), gridId, objItems, 'search', sCaption, 'CODE_POPUP', '' );

    		grid.setGridWidth( 500 );
    		grid.setGridHeight( 300 );
    		grid.setGridParam( { pageable: false } );
    		grid.setGridBindEvent( 'rowdoubleclick', function () {
    			$( '#POP_OK_BTN' ).trigger( 'click' );
    		});

    		var gridIds = fc_getExtraOption( gridId, 'gridIDs' );
    		var result_cap = fc_isNull( paramObj.optResult ) ? colData.optResult : paramObj.optResult;
    		var cap = fc_isNull( result_cap ) ? new Array() : result_cap.split( ',' );

    		for ( var iLoop=0;iLoop<cap.length;iLoop++ ) {
    			var colId = gridIds[ iLoop ];
    			if ( !fc_isNull( cap[ iLoop ] ) ) {
        			grid.setColProp( colId, 'text'  , cap[ iLoop ] );
        			grid.setColProp( colId, 'hidden', false );
    			};
    		};

    		$( '#' + gridId ).jqxGrid( 'autoresizecolumns' );
    		
    		//2019.10.29 set default condition
    		if ( !fc_isNull( rowid ) && !fc_isNull( colNm ) ) {
    			//grid type
    			var selectedData = fc_getRowData(targetId,rowid)
        		if(!fc_isNull(paramObj.optCondition)){
        			$.each(paramObj.optCondition , function( i, objData ) {
        				if(!fc_isNull(objData.object) && !fc_isNull(objData.colNm)){
        					fc_setInputVal(objData.object, selectedData[objData.colNm]);
        				}
        				
    				});
        			
        		}
    		}else{
    			//form type : todo
    		}   		
    		
    		_searchPopup();
        }
        return {
            init: function() {
                _createElements();
                _addEventListeners();
            },
            close: function() {
            	$( '#popupWindow' ).jqxWindow( 'close' );
            },
            destroy: function() {
            	$( '#popupWindow' ).jqxWindow( 'destroy' );
            }
        };
    } ());

	popupWindow.init();

	var _returnSelected = function() {
		var rowData = fc_getSelectedRowData( 'popupGrid' );
		if ( fc_isNull( rowData ) ) {
			fc_setError( window.gwMessage.validate.noselectrow );
			return;
		};

		var rtnObj = new Object();
		
		if ( !fc_isNull( rowid ) && !fc_isNull( colNm ) ) {
			
			var gridDifFlag;
			var defaultChk = false;
			if(colData.defaultChkValue != undefined && colData.defaultChkValue == 'CD_NM'){
				gridDifFlag = fc_getCellData( targetId, rowid, colNm ) != rowData.CD_NM ? true : false;
				defaultChk = true;
			}else{
				gridDifFlag = fc_getCellData( targetId, rowid, colNm ) != rowData.CD_VAL ? true : false;
			}
			
			$( '#' + targetId ).jqxGrid( 'endcelledit', rowid, colNm, false );
			if ( typeof f_beforePopupClose === 'function' ) {
				rtnObj[ 'TYPE'      ] = 'GRID';
				rtnObj[ 'TARGET_ID' ] = targetId;
				rtnObj[ 'COL_NAME'  ] = colNm;
				rtnObj[ 'ROW_ID'    ] = rowid;
				rtnObj[ 'ROW_DATA'  ] = rowData;

				var rtnVal = f_beforePopupClose( rtnObj );
				if ( !fc_isNull( rtnVal ) && rtnVal == false) return;

				if ( gridDifFlag ) {
					if(defaultChk){
						fc_setCellData( targetId, rowid, colNm , rowData.CD_NM );
					}else{
						fc_setCellData( targetId, rowid, colNm , rowData.CD_VAL );	
					}
					
					fc_setCellData( targetId, rowid, 'JQX_CB', true );
				};
			} else {
				if ( gridDifFlag ) {
					if(defaultChk){
						fc_setCellData( targetId, rowid, colNm , rowData.CD_NM );
					}else{
						fc_setCellData( targetId, rowid, colNm , rowData.CD_VAL );	
					}
					fc_setCellData( targetId, rowid, 'JQX_CB', true );
				};
			};
			var instance = $( '#' + targetId ).jqxGrid( 'getInstance' );
			instance._getCheckIndex();
			instance.endupdate();
		} else {
			if ( typeof f_beforePopupClose === 'function' ) {
				rtnObj[ 'TYPE'      ] = 'FORM';
				rtnObj[ 'TARGET_ID' ] = targetId;
				rtnObj[ 'COL_NAME'  ] = '';
				rtnObj[ 'ROW_ID'    ] = '';
				rtnObj[ 'ROW_DATA'  ] = rowData;

				$( '#' + targetId ).val( rowData.CD_VAL );
				var rtnVal = f_beforePopupClose( rtnObj );

				if ( !fc_isNull( rtnVal ) && rtnVal == false ) return;
			} else {
				$( '#' + targetId ).val( rowData.CD_VAL );
			};
		};
		popupWindow.close();

		if ( typeof f_afterPopupClose === 'function' ) {
			var rtnVal = f_afterPopupClose( rtnObj );
		};
	};
	$( '#SEACH_BTN'  ).click( _searchPopup );
	$( "#POP_OK_BTN" ).click( _returnSelected );

	// set enter key event
	$( "#popupWindowCondition input[id^='INPUT_VAL']" ).keypress( function( event ) {
		if ( event.which == 13 ) {
			_searchPopup();
		};
	});

};// end of function fc_makePopupWindow
/**
 *
 * @param targetid
 * @param colNm
 * @returns {Boolean}
 */
function fc_makePopupDiv( targetid, colNm ) {
	var colData;

	if ( fc_isNull( colNm ) ) {
		colData = window.gwPopupSource[ targetid ];
	} else {
		var popupData = fc_getExtraOption( targetid, 'gridPopup' );
		colData = popupData[ colNm ];
	};
	if ( $( '#popupWindow' ) != undefined ) {
		$( '#popupWindow' ).remove();
	};
	if ( fc_isNull( colData ) ) { // }&& !fc_checkDatatype( objList[iloop].object, 'radio' ) ) {
		fc_showLog( 2, '@@@@@  ' + targetid + ' does not have "POPUP Info" ' );
		return false;
	};

	var paramObj  = colData.paramPopup();
	var targetObj = $( 'body' );
	var divWindow = $( "<div id='popupWindow'></div>" );

	var divHeader      = $( "<div id='popupWindowHeader'><span id='input' style='float: left'></span></div>" );
	var divContent     = $( "<div id='popupWindowContent' style='overflow: hidden'></div>" );
	var divSubContents = $( "<div id='popupSubContents' style='margin: 10px 10px 0 10px;'></div>" );

	var divSearchCondition = $( "<div id='popupWindowCondition' style='float: left'></div>" );

	var searchButton = $( "<div style='float: right'><input type='button' value='" + window.gwMessage.button.bSearch + "' style='margin-bottom: 5px;' id='SEACH_BTN' /></div>" );
	var gridObj      = $( "<div id='divPopupGrid' style='height:200;width:100%'></div>");

	var divButton    = $( "<div id='popupWindowButton' style='margin: 10px 10px 10px 10px;'><div style='float: right;'><input type='button' id='POP_OK_BTN' value='" + window.gwMessage.button.bOk + "' style='margin-right: 10px' /><input type='button' id='POP_CANCEL_BTN' value='" + window.gwMessage.button.bCancel + "' style='margin-right: 10px' /></div></div>" );

	divHeader.find( 'span' ).text( fc_isNull( paramObj.title ) ? colData.title : paramObj.title );

	var cdClass = $( "<input type='hidden' />" );
	cdClass.attr( 'id', 'CD_CLASS' );
	cdClass.val ( colData.code );
	cdClass.addClass( 'formValueCheck' );

	var arrMand =  ( fc_isNull( paramObj.manSearch ) ? '' : paramObj.manSearch ).split( "\^" );
	for ( var i=0;i<arrMand.length;i++ ) {
		var sId = '';
		if ( i > 0 ) sId = '' + i;

		var cdParam = $( "<input type='hidden' />" );
		cdParam.attr( 'id', 'CD_PARAM' + sId );
		cdParam.val ( arrMand[ i ] );
		cdParam.addClass( 'formValueCheck' );
		divSearchCondition.append( cdParam );
	};

	divSearchCondition.append( cdClass );
	divSearchCondition.append( cdParam );

	var search_cap = fc_isNull( paramObj.optTitle  ) ? colData.optTitle  : paramObj.optTitle;
	var search_val = fc_isNull( paramObj.optSearch ) ? colData.optSearch : paramObj.optSearch;

	var cap = search_cap.split( ',' );
	var val = search_val.split( ',' );

	for ( var i=0;i<cap.length;i++ ) {
		if ( !fc_isNull( cap[ i ] ) ) {
			var label = $( "<label></label>" );
			//20200109 width 120 -> 115 조정
			//var input = $( "<input type='text' style='width: 115px; border: 1px solid #aaa'/>" );
			var input = $( "<input type='text' style='width: 115px; border: 1px solid #aaa'/>" );
			label.attr( 'id', 'CAP_SEARCH' + ( i+1 ) );
			label.attr( 'for', 'INPUT_VAL' + ( i+1 ) );
			label.text( cap[ i ] );
			input.attr( 'id', 'INPUT_VAL' + ( i+1 ) );

			if ( !fc_isNull( val[ i ] ) )
				input.val( val[ i ] );

			input.addClass( 'formValueCheck' );
			divSearchCondition.append( label );
			divSearchCondition.append( input );
		};// end of if (!fc_isNull(cap[i]))
	};

	divSubContents.append( divSearchCondition );
	divSubContents.append( searchButton );
	divSubContents.append( gridObj );

	divContent.append( divSubContents );
	divContent.append( divButton );

	divWindow.append( divHeader );
	divWindow.append( divContent );
	divWindow.css( 'display', 'none' );

	targetObj.append( divWindow );

	return true;
};// end of function fc_makePopupDiv
/**
 * @Name			fc_makeGridPopup
 * @Description		Popup Window 객체를 생성 한다.
 * @param targetId
 * @param rowid
 * @param colNm
 * @returns {Boolean}
 */
function fc_makeGridPopup( targetId, rowid, colNm ) {
	if ( fc_makePopupDiv( targetId, colNm ) ) {
		fc_setPopupWindow( targetId, rowid, colNm );
		return true;
	};
	return false;
};// end of function fc_makeGridPopup
/**
 *
 * @param targetid
 * @returns {Boolean}
 */
function fc_makePopup( targetid ) {
	if (fc_makePopupDiv( targetid ) ) {
		fc_setPopupWindow( targetid );
		return true;
	};
	return false;
};// end of function fc_makePopup