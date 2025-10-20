/**
 * Declare variable
 */

/**
 * Declare Initial JS Function
 */
$(function() {
	fc_showLog( 1, '***** jQuery Grid' );

});
/**
 *
 * @param dataType
 * @returns
 */
function fc_getGridTemplate( dataType ) {
	return fc_getExtendObj( {}, eval( dataType.toLowerCase() + 'Template' ) );
}; // end of fc_getGridTemplate
/**
 *
 * @param targetObj
 * @param gridId
 */
function jQueryContext( targetObj, gridId ) {
	try {
		var menuString = '';
		menuString += '<div class="contextMenu" id="' + gridId + 'CM" style="display:none">';
		menuString += '		<ul>';
		menuString += '			<li id="cm_copycell">';
		menuString += '				<span style="float:left"></span>';
		menuString += '				<span style="font-size:11px; font-family:Verdana"><input type="text" id="cm_val'+gridId+'" class="jqx-widget-content jqx-widget-content jqx-input jqx-input jqx-widget jqx-widget" style="text-align: left; width: 170px; height: 20px;"></span>';
		menuString += '			</li>';
		menuString += '			<li id="cm_filter">';
		menuString += '				<span class="ui-icon ui-icon-plus" style="float:left"></span>';
		menuString += '				<span style="font-size:11px; font-family:Verdana">' + window.gwMessage.gridcontext.filter + '</span>';
		menuString += '			</li>';
//		menuString += '			<li id="cm_chooser">';
//		menuString += '				<span class="ui-icon ui-icon-calculator" style="float:left"></span>';
//		menuString += '				<span style="font-size:11px; font-family:Verdana">' + window.gwMessage.gridcontext.chooser + '</span>';
//		menuString += '					<ul>';
//		menuString += '						<div class="contextMenu" id="' + gridId + 'CC" style="width:250; height:400; overflow-y:auto"></div>';
//		menuString += '					</ul>';
//		menuString += '			</li>';
//		menuString += '			<li id="cm_frozen">';
//		menuString += '				<span class="ui-icon ui-icon-pin-s" style="float:left"></span>';
//		menuString += '				<span style="font-size:11px; font-family:Verdana">' + window.gwMessage.gridcontext.frozen + '</span>';
//		menuString += '			</li>';
//		menuString += '			<li id="cm_release">';
//		menuString += '				<span class="ui-icon ui-icon-pin-w" style="float:left"></span>';
//		menuString += '				<span style="font-size:11px; font-family:Verdana">' + window.gwMessage.gridcontext.release + '</span>';
//		menuString += '			</li>';
		menuString += '			<li id="cm_collap">';
		menuString += '				<span class="ui-icon ui-icon-pin-s" style="float:left"></span>';
		menuString += '				<span style="font-size:11px; font-family:Verdana">' + window.gwMessage.gridcontext.collap + '</span>';
		menuString += '			</li>';
		menuString += '			<li id="cm_expand">';
		menuString += '				<span class="ui-icon ui-icon-pin-w" style="float:left"></span>';
		menuString += '				<span style="font-size:11px; font-family:Verdana">' + window.gwMessage.gridcontext.expand + '</span>';
		menuString += '			</li>';
		menuString += '			<li id="cm_export">';
		menuString += '				<span class="ui-icon ui-icon-arrowreturnthick-1-e" style="float:left"></span>';
		menuString += '				<span style="font-size:11px; font-family:Verdana">' + window.gwMessage.gridcontext.excel_exp + '</span>';
		menuString += '			</li>';
		menuString += '			<li id="cm_viewtype">';
		menuString += '				<span class="ui-icon ui-icon-carat-2-e-w" style="float:left"></span>';
		menuString += '				<span style="font-size:11px; font-family:Verdana">' + window.gwMessage.gridcontext.pager + '</span>';
		menuString += '			</li>';
//		menuString += '			<li id="cm_saveSetting">';
//		menuString += '				<span class="ui-icon ui-icon-disk" style="float:left"></span>';
//		menuString += '				<span style="font-size:11px; font-family:Verdana">' + window.gwMessage.gridcontext.savesetting + '</span>';
//		menuString += '			</li>';
//		menuString += '			<li id="cm_defaultSetting">';
//		menuString += '				<span class="ui-icon ui-icon-disk" style="float:left"></span>';
//		menuString += '				<span style="font-size:11px; font-family:Verdana">' + window.gwMessage.gridcontext.defsetting + '</span>';
//		menuString += '			</li>';
		menuString += '		</ul>';
		menuString += '</div>';

		targetObj.append( menuString );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of jQueryContext
/**
 *
 */
function fc_setColChooser() {
	for( var loop=0;loop<window.gwGridSize.length;loop++ ) {
		var _gridId  = window.gwGridSize[ loop ].name;
		var objCols  = fc_getGridColModel( _gridId );
		var propCols = $( '#' + _gridId ).jqxGrid( 'columns' ).records;
		var listSource = [];

		for ( var i=0;i<objCols.length;i++ ) {
			if ( !fc_isNull( objCols[ i ].datatype ) && !fc_isNull( propCols ) ) {
				for ( var j=0;j<propCols.length;j++ ) {
					if ( objCols[ i ].name == propCols[ j ].datafield ) {
						listSource.push( { label: propCols[ j ].text, value: objCols[ i ].name, checked: !propCols[ j ].hidden } );
						break;
					};
				};
			};
		};

//		if ( !fc_isNull( listSource ) && listSource.length > 0 ) {
//			$( '#' + _gridId + 'CC' ).jqxListBox( { source : listSource, width : '100%', height : 200,  checkboxes : true } );
//
//		    $( '#' + _gridId + 'CC' ).on( 'checkChange', function( event ) {
//		        $( '#' + _gridId ).jqxGrid( 'beginupdate' );
//
//		        if ( event.args.checked )
//		            $(' #' + _gridId ).jqxGrid( 'showcolumn', event.args.value );
//		        else
//		            $( '#' + _gridId ).jqxGrid( 'hidecolumn', event.args.value );
//
//		        $( '#' + _gridId ).jqxGrid( 'endupdate' );
//		    });
//		};
	};
};// end of fc_setColChooser
/**
 *
 * @param gridId
 * @returns
 */
function fc_getGridColModel( gridId ) {
	try {
		var source = fc_getGridModelSource( gridId );
		return source.datafields;
	} catch ( e ) {
		fc_getException( e );
	};
};// end of fc_getGridColMode
/**
 *
 * @param gridId
 * @param colNm
 * @returns {___anonymous5380_5381}
 */
function fc_getGridColField( gridId, colNm ) {
	try {
		var source = fc_getGridModelSource( gridId );
		var returnVal = {};
		$.each( source.datafields, function( index, item ) {
			if ( item.name == colNm ) {
				returnVal = item;
			};
		});
		return returnVal;
	} catch ( e ) {
		fc_getException( e );
	};
};// end of fc_getGridColField
/**
 *
 * @param gridId
 * @returns
 */
function fc_getGridPagerId( gridId ) {
	try {
		return fc_getExtraOption( gridId, 'gridPager' );
	} catch ( e ) {
		fc_getException( e );
	};
};// end of fc_getGridPagerId
/**
 *
 * @param gridId
 * @returns
 */
function fc_getGridCaptionText( gridId ) {
	try {
		return  $( '#caption_' + gridId ).text();
	} catch ( e ) {
		fc_getException( e );
	};
};// end of fc_getGridCaptionText
/**
 *
 * @param gridId
 * @param captionText
 * @returns
 */
function fc_setCaptionText( gridId, captionText ) {
	try {
		return  $( '#caption_' + gridId ).text( captionText );
	} catch ( e ) {
		fc_getException( e );
	};
};// end of fc_setCaptionText
/**
 *
 * @param gridId
 * @param colNm
 * @param paramNm
 * @param paramVal
 */
function fc_setGridColModel( gridId, colNm, paramNm, paramVal ) {
	try {
		var source = fc_getGridModelSource( gridId );
		$.each( source.datafields, function( index, item ) {
			if ( item.name == colNm )
				item[ paramNm ] = paramVal;
		});
	} catch ( e ) {
		fc_getException( e );
	};
};// end of fc_setGridColModel
/**
 *
 * @param gridId
 * @param colNm
 * @param paramNm
 * @returns {String}
 */
function fc_getGridFieldProperty( gridId, colNm,  paramNm ) {
	try {
		var property = '';
		var colModel = fc_getGridColModel( gridId );
		$.each( colModel, function( index, item ) {
			if ( item.name == colNm ) {
				property = item[ paramNm ];
				return false;
			};
		});
		return property;
	} catch ( e ) {
		fc_getException( e );
	};
};// end of fc_getGridFieldProperty
/**
 *
 * @param gridId
 * @param colNm
 * @param paramVal
 */
function fc_setGridColFieldSource( gridId, colNm, paramVal ) {
	try {
		var source = fc_getGridModelSource( gridId );
		$.each(source.datafields, function( index, item ) {
			if ( item.name == colNm ) {
				item.values[ 'value'  ] = 'CD_VAL';
				item.values[ 'name'   ] = 'CD_NM';
				item.values[ 'source' ] = paramVal;
				return false;
			};
		});
	} catch ( e ) {
		fc_getException( e );
	};
};// end of fc_setGridColFieldSource
/**
 *
 * @param gridId
 * @returns
 */
function fc_getGridSource( gridId ) {
	try {
		var source = $( '#' + gridId ).jqxGrid( 'source' );
		return source;
	} catch ( e ) {
		fc_getException( e );
	};
};// end of fc_getGridSource
/**
 *
 * @param gridId
 * @param data
 */
function fc_setGridlocalData( gridId, data, mergeArr, defalutRowInfo, speedUp ) {
	var obj = $( '#' + gridId );
	if ( fc_isNull( obj ) ) {
		fc_showLog( 1, '[Grid ID: ' + gridId + ']' + window.gwMessage.validate.nodefined );
		return;
	};
	if ( obj.length == 0 ) return;

	try {
		fc_setGridComboFilterSwitch( gridId, false );
		var instance = $( '#' + gridId ).jqxGrid( 'getInstance' );

		if ( !instance.isPageable ) {
			var datainfo = instance.getdatainformation();
			var pagesizenum = 50;
			if ( datainfo.rowscount > pagesizenum ) {
				pagesizenum = datainfo.rowscount;
			};
			fc_setGridParam( gridId, { pagesize: pagesizenum } );
		} else {
			var paginginfo    = instance.getpaginginformation();
			var pagesize      = paginginfo.pagesize;
			var arrpageOption = fc_getGridParam( gridId, 'pagesizeoptions' );
			var size = arrpageOption[ 0 ];
			if ( $.inArray( pagesize, arrpageOption ) != -1 ) {
				size = arrpageOption[ $.inArray( pagesize, arrpageOption ) ];
			};
			fc_setGridParam( gridId, { pagesize: size } );
		};
		
		if(!fc_isNull(mergeArr) && !fc_isNull(data)){
			fc_mergeGridCols(gridId, mergeArr, data)
		}
		
		//set default row cnt 2020.4.23
		var newData = data;
		if(!fc_isNull(defalutRowInfo) && Number(defalutRowInfo['count']) > 0){
			var loopCnt = 0;
			
			if(!fc_isNull(data) && data.length > 0){
				var dataLength = data.length;
				if(dataLength > 0 && dataLength < Number(defalutRowInfo['count'])){
					loopCnt = Number(defalutRowInfo['count']) - data.length;
				}
				
			}else{
				loopCnt = Number(defalutRowInfo['count']);
				newData = new Array();
			}
			
			for(var i=0; i<loopCnt; i ++){
				var rowObject = new Object();
				if(!fc_isNull(defalutRowInfo.data)){
					for(var key in defalutRowInfo.data){
						rowObject[key] = defalutRowInfo.data[key]
					}
					
					//rowObject = defalutRowInfo.data;
				}
				
				rowObject['JQX_RS'] = window.gwMesEnv.grid.addFlag;
				rowObject['JQX_CB'] = false;
				//console.log('#### rowObject : ' + JSON.stringify(rowObject));
				newData.push(rowObject);
			}
		}
		//console.log('#### newData : ' + JSON.stringify(newData));
		var source = instance.source._source;
		source.localdata = newData;

		instance.checkedrow = new Array();
		instance.updatebounddata();
		
		if(!fc_isNull(speedUp) && speedUp == true){
			//do not refresh;
			//console.log('no refresh')
		}else{
			//console.log('refresh')
			instance.refreshdata();
		}

		fc_resetSelection( gridId );
		fc_setGridSystemRowNumSize( instance );
		fc_setGridComboFilterSwitch( gridId, true );
	} catch ( e ) {
		fc_getException( e );
	};
};// end of fc_setGridlocalData
/**
 *
 * @param gridId
 */
function fc_showGridPagerInfo( gridId ) {
	var pager    = fc_getGridPagerId( gridId );
	var instance = $( '#' + gridId ).jqxGrid( 'getInstance' );

	if ( instance.isPageable ) {
		instance.isPageable = false;
		var datainfo = instance.getdatainformation();
		var pagesizenum = 50;
		if ( datainfo.rowscount > pagesizenum ) {
			pagesizenum = datainfo.rowscount;
		};
		fc_setGridParam( gridId, { pagesize: pagesizenum } );
	} else {
		instance.isPageable = true;
		var paginginfo    = instance.getpaginginformation();
		var pagesize      = paginginfo.pagesize;
		var arrpageOption = fc_getGridParam( gridId, 'pagesizeoptions' );
		var size = arrpageOption[ 0 ];
		if ( $.inArray( pagesize, arrpageOption ) != -1 ) {
			size = pagesize[ $.inArray( pagesize, arrpageOption ) ];
		};
		fc_setGridParam( gridId, { pagesize: size } );
	};
	instance._initpager();
};// end of fc_showGridPagerInfo
/**
 *
 * @param gridId
 * @returns
 */
function fc_getGridModelSource( gridId ) {
	try {
		var instance = $( '#' + gridId ).jqxGrid( 'getInstance' );
		var source = instance.source._source;

		return source;
	} catch ( e ) {
		fc_getException( e );
	};
};// end of fc_getGridModelSource
/**
 *
 * @param gridId
 * @param paramNm
 * @param paramVal
 */
function fc_setExtraOption( gridId, paramNm, paramVal ) {
	try {
		var instance = $( '#' + gridId ).jqxGrid( 'getInstance' );
		var source = instance.source._source;
		source[ paramNm ] = paramVal;
	} catch ( e ) {
		fc_getException( e );
	};
};// end of fc_setExtraOption
/**
 *
 * @param gridId
 * @param extraParam
 * @returns
 */
function fc_getExtraOption( gridId, extraParam ) {
	try {
		var source = fc_getGridModelSource( gridId );
		if ( fc_isNull( source[ extraParam ] ) ) return null;
		else return source[ extraParam ];
	} catch ( e ) {
		fc_getException( e );
	};
};// end of fc_getExtraOption
/**
 *
 * @param gridId
 * @param arrColNm
 * @param editableFlag
 */
function fc_setGridEditable( gridId, arrColNm, editableFlag ) {
	try {
		var instance = $( '#' + gridId ).jqxGrid( 'getInstance' );
		instance.setColEditable( arrColNm, editableFlag );
	} catch ( e ) {
		fc_getException( e );
	};
};// end of fc_setGridEditable
/**
 *
 * @param gridId
 * @param datafield
 */
function fc_resetGridColClassName( gridId, datafield ) {
	var instance = $( '#' + gridId ).jqxGrid( 'getInstance' );
	var scroll = instance.scrollposition();
	instance.setcolumnproperty( datafield, 'cellclassname', instance.getDefClassName );

	instance.vScrollInstance.setPosition(scroll.top);
};// end of fc_resetGridColClassName
/**
 *
 * @param gridId
 * @param arrPKeys
 */
function fc_setGridPKeys( gridId, arrPKeys ) {
	try {
		fc_setGridEditable( gridId, arrPKeys, false );
		fc_setColRequired( gridId, arrPKeys );
		for ( var loop=0;loop<arrPKeys.length;loop++ ) {
			fc_setGridColModel( gridId, arrPKeys[ loop ].toUpperCase(), 'key', true );
		};
	} catch ( e ) {
		fc_getException( e );
	};
};// end of fc_setGridPKeys
/**
 *
 * @param gridId
 * @returns {Array}
 */
function fc_getGridPKeys( gridId ) {
	try {
		var colPKs = new Array();
		var iPos = 0;
		var cm = fc_getGridColModel( gridId );
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
};// end of fc_getGridPKeys
/**
 *
 * @param gridId
 * @param iCol
 * @returns
 */
function fc_getColNamebyIndex( gridId, iCol ) {
	try {
		var cm = fc_getGridColModel( gridId );
		return cm[ iCol ].name;
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of getColNamebyIndex
/**
 *
 * @param gridId
 * @param colNm
 * @returns {Number}
 */
function fc_getColIndexbyName( gridId, colNm ) {
	try {
		var cm = fc_getGridColModel( gridId );
	    for ( var i=0;i<cm.length;i++ )
	        if ( cm[ i ].name === colNm.toUpperCase() ) return i; // return the index
	    return -1;
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of getColIndexbyName
/**
 *
 * @param gridId
 * @param objParam
 */
function fc_setGridParam( gridId, objParam ) {
	try {
		$( '#' + gridId ).jqxGrid( objParam );
	} catch ( e ) {
		//fc_getException( e );
	};
}; // end of fc_setGridParam
/**
 *
 * @param gridId
 * @param paramNm
 * @returns
 */
function fc_getGridParam( gridId, paramNm ) {
	try {
		var instance = $( '#' + gridId ).jqxGrid( 'getInstance' );
		return instance[paramNm];
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_getGridParam
/**
 *
 * @param gridId
 * @param nWidth
 */
function fc_setGridWidth( gridId, nWidth ) {
	try {
		$( '#' + gridId ).jqxGrid( 'width', nWidth );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_setGridWidth
/**
 *
 * @param gridId
 * @param nHeight
 */
function fc_setGridHeight( gridId, nHeight ) {
	try {
		$( '#' + gridId ).jqxGrid( 'height', nHeight );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_setGridHeight
/**
 *
 * @param gridId
 * @param sortFlag
 */
function fc_setGridSortable( gridId, sortFlag ) {
	try {
		$( '#' + gridId ).jqxGrid( { sortable : sortFlag } );
	} catch ( e ) {
		fc_getException( e );
	};
};// end of fc_setGridSortable
/**
 *
 * @param gridId
 * @param filterFlag
 */
function fc_setGridFilterable( gridId, filterFlag ) {
	try {
		
		$( '#' + gridId).jqxGrid('scrolloffset', 0, 0);
		
		var instance = $( '#' + gridId ).jqxGrid( 'getInstance' );
		if ( !filterFlag )
			instance.clearfilters();

		instance.showfilterrow = filterFlag;
		instance.filterable = filterFlag;
		instance.render();
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_setGridFilterable
/**
 *
 * @param gridId
 */
function fc_setGridFilterableToggle( gridId ) {
	try {
		console.log('$$$$$$$'+ gridId);
		var instance = $( '#' + gridId ).jqxGrid( 'getInstance' );
		fc_setGridFilterable( gridId, !instance.filterable );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_setGridFilterableToggle
/**
 *
 * @param gridId
 * @param colNm
 */
function fc_getColHeaderText( gridId, colNm ) {
	return fc_getColProps( gridId, colNm ).text;
}; // end of fc_getColHeaderText

/**
 * 부모 그룹 추가
 * @param gridId
 * @param colGrpNm
 * @returns {String}
 */
function fc_getColParentGroupText( gridId, colGrpNm ) {
	var sParentNm = "";
	var sParentText = "";
	try{
		var instance = $( '#' + gridId ).jqxGrid( 'getInstance' );
		var colGroupObj = instance.columngroups;

		if ( !fc_isNull( colGroupObj ) ) {
			$.each( colGroupObj, function( index, obj ) {
				if ( colGrpNm == obj.name) {
					sParentNm = obj.parent.name;
					if (fc_isNull(sParentNm)) {
						return true;
					} else {
						$.each( colGroupObj, function( parentIndex, parentObj ) {
							if ( parentObj.name == sParentNm ) {
								sParentText = parentObj.text;
								return false;
							}
						});
					}
				};
			});
		};
	}catch(e) {
		return "";
	};
	return sParentText;
}; // end of fc_setColParentGroupText

/**
 *
 * @param gridId
 * @param colGrpNm
 * @returns {String}
 */
function fc_getColGroupText( gridId, colGrpNm ) {
	var sText = '';
	try{
		var instance = $( '#' + gridId ).jqxGrid( 'getInstance' );
		var colGroupObj = instance.columngroups;

		if ( !fc_isNull( colGroupObj ) ) {
			$.each( colGroupObj, function( index, obj ) {
				if ( colGrpNm == obj.name ) {
					sText = obj.text;
					return false;
				};
			});
		};
	}catch(e) {
		return '';
	};
	return sText;
}; // end of fc_setColGroupText
/**
 *
 * @param gridId
 */
function fc_setPageable( gridId ) {
	fc_showGridPagerInfo( gridId );
}; // end of fc_setPageable
//***** Column Properties
/**
 * @param gridId
 * @param colNm
 * @param paramNm
 * @param paramVal
 */
function fc_setColProp( gridId, colNm, paramNm, paramVal ) {
	try {
//		var instance = $( '#' + gridId ).jqxGrid( 'getInstance' );
//		instance.setcolumnproperty( colNm, paramNm, paramVal );
		$( '#' + gridId ).jqxGrid( 'setcolumnproperty', colNm, paramNm, paramVal );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_setColProp
/**
 *
 * @param gridId
 * @param colNm
 * @param colHeaderText
 */
function fc_setColHeaderText( gridId, colNm, colHeaderText ) {
	$( '#' + gridId ).jqxGrid( 'setcolumnproperty', colNm, 'text', colHeaderText );
}; // end of fc_setColHeaderText
/**
 *
 * @param gridId
 * @param colGrpNm
 * @param colGrpText
 */
function fc_setColGroupText( gridId, colGrpNm, colGrpText ) {
	var instance = $( '#' + gridId ).jqxGrid( 'getInstance' );
	var colGroupObj = instance.columngroups;

	if ( !fc_isNull(colGroupObj) ) {
		$.each( colGroupObj, function( index, obj ) {
			if ( colGrpNm == obj.name ) {
				obj.text = colGrpText;
				return false;
			};
		});
	};
}; // end of fc_setColGroupText
/**
 *
 * @param gridId
 * @param colNm
 * @param propNm
 * @returns
 */
function fc_getColProp( gridId, colNm, propNm ) {
	try {
//		var instance = $( '#' + gridId ).jqxGrid( 'getInstance' );
//		return instance.getcolumnproperty( colNm, paramNm );
		return $( '#' + gridId ).jqxGrid( 'getcolumnproperty', colNm, propNm );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_getColProp
/**
 *
 * @param gridId
 * @param colNm
 * @returns
 */
function fc_getColProps( gridId, colNm ) {
	try {
		var instance = $( '#' + gridId ).jqxGrid( 'getInstance' );
		return instance.getcolumn( colNm );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_getColProps
/**
 *
 * @param gridId
 * @param arrColNm
 * @param alignPosition
 */
function fc_setColAlign( gridId, arrColNm, alignPosition ) {
	try {
		var instance = $( '#' + gridId ).jqxGrid( 'getInstance' );
		instance.setcolcellalign( arrColNm, alignPosition );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_setColAlign
/**
 *
 * @param gridId
 * @param arrColNm
 * @param sortFlag
 */
function fc_setColSortable( gridId, arrColNm, sortFlag ) {
	try {
		for ( var loop=0;loop<arrColNm.length;loop++ )
			fc_setColProp( gridId, arrColNm[ loop ].toUpperCase(), 'sortable', sortFlag );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_setColSortable
//***** Setting column editable
/**
 *
 * @param gridId
 * @param arrColNm
 * @param editableFlag
 */
function fc_setColEditable( gridId, arrColNm, editableFlag ) {
	try {
		var gridType = fc_getExtraOption( gridId, 'gridType' );
		if ( 'SEARCH' == gridType.toUpperCase() ) return;

		fc_setGridEditable( gridId, arrColNm, editableFlag );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_setColEditable
/**
 *
 * @param gridId
 * @param editFlag
 */
function fc_setAllEditableExcept( gridId, editFlag ) {
	try {
		var arrColNm = fc_getExtraOption( gridId, 'gridIDs' );
		fc_setGridEditable( gridId, arrColNm, editFlag );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_setAllEditableExcept
/**
 *
 * @param gridId
 * @param arrColNm
 */
function fc_setColRequired( gridId, arrColNm ) {
	try {
		for (var loop=0;loop<arrColNm.length;loop++ ) {
			fc_setColProp( gridId, arrColNm[ loop ].toUpperCase(), 'nullable', false );
		};
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_setColRequired
/**
 *
 * @param gridId
 * @param datafield
 * @returns
 */
function fc_getColCellClassName( gridId, datafield ) {
	try {
		return fc_getColProp( gridId, datafield, 'cellclassname' );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_getColCellClassName
/**
 *
 * @param gridId
 * @param arrRowList
 */
function fc_setRowList( gridId, arrRowList ) {
	try {
		fc_setGridParam( gridId, { pagesizeoptions: arrRowList } );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_setRowList
//***** Data Control
//**** Cell
/**
 *
 * @param gridId
 * @param rowIdx
 * @param colNm
 * @param data
 */
function fc_setCellData( gridId, rowIdx, colNm, data ) {
	try {
		$( '#' + gridId ).jqxGrid( 'setcellvalue', rowIdx, colNm, data );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_setCellData
/**
 *
 * @param gridId
 * @param rowId
 * @param colNm
 * @param data
 */
function fc_setCellDataById( gridId, rowId, colNm, data ) {
	try {
		$( '#' + gridId ).jqxGrid( 'setcellvaluebyid', rowId, colNm, data );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_setCellDataById
/**
 *
 * @param gridId
 * @param rowIdx
 * @param colNm
 * @returns
 */
function fc_getCellData( gridId, rowIdx, colNm ) {
	try {
		var instance = $( '#' + gridId ).jqxGrid( 'getInstance' );
		var colObj = fc_getInstanceColObj( instance, colNm );

		if ( colObj.columntype == 'datetimeinput' || colObj.columntype == 'timeinput' ) {
			return fc_convertStandardDateFromatString( colObj.cellsformat, $( '#' + gridId ).jqxGrid( 'getcelltext', rowIdx, colNm ) );
		} else {
			return $( '#' + gridId ).jqxGrid('getcellvalue', rowIdx, colNm );
		}
	} catch ( e ) {
		fc_showLog( 3, '[ERROR] fc_getCellData ', gridId, rowIdx, colNm );
		fc_getException( e );
	};
}; // end of fc_getCellData
/**
 *
 * @param sCellsformat
 * @param value
 * @returns
 */
function fc_convertStandardDateFromatString( sCellsformat, value ) {
	try{
		if ( fc_isNull( value ) || fc_isNull( sCellsformat ) )
			return value;

		if ( sCellsformat == fc_getCustYearMonthFormat()
		  || sCellsformat == fc_getCustMonthDayFormat()
		  || sCellsformat == fc_getCustDateFormat()
		  || sCellsformat == fc_getCustDateTimeFormat()
		  || sCellsformat == fc_getCustDateMinFormat()
		  || sCellsformat == fc_getCustDateHourFormat()
		) {
			var arrDate = value.split( window.gwMesEnv.format.delim.target.datetime );
			var arrCellFormat = sCellsformat.split( fc_setValue( window.gwMesEnv.format.delim.target.datetime, ' ') );

			if ( arrDate.length > 0 && arrCellFormat.length > 0 ) {
				var yyyy = '', mm = '', dd = '';
				var arrDateSplit = 	arrDate[ 0 ].split( window.gwMesEnv.format.delim.target.date );

				$.each( arrCellFormat[ 0 ].split( window.gwMesEnv.format.delim.target.date ) , function( index, data ) {

					     if ( data.toLowerCase() == 'yyyy' ) { yyyy = arrDateSplit[ index ]; }
					else if ( data.toLowerCase() == 'mm'   ) { mm   = arrDateSplit[ index ]; }
					else if ( data.toLowerCase() == 'dd'   ) { dd   = arrDateSplit[ index ]; }
				});

				value = value.replace( arrDate[0] , yyyy + window.gwMesEnv.format.delim.target.date + mm + window.gwMesEnv.format.delim.target.date + dd);
				if ( value.indexOf( ':') == -1 ) {
					value += fc_setValue( window.gwMesEnv.format.delim.target.datetime, ' ') + '00:00:00';
				};
			};
		};
	}catch( e ) {
		fc_showLog( 3, '[ERROR] fc_convertStandardDateFromatString ', sCellsformat, value );
		fc_getException( e );
	};
	return value;
};// end of fc_convertStandardDateFromatString
/**
 *
 * @param gridId
 * @param rowId
 * @param colNm
 * @returns
 */
function fc_getCellDataById( gridId, rowId, colNm ) {
	try {

		var instance = $( '#' + gridId ).jqxGrid( 'getInstance' );
		var colObj = fc_getInstanceColObj( instance, colNm );

		if ( colObj.columntype == 'datetimeinput' || colObj.columntype == 'timeinput' ) {
			return fc_convertStandardDateFromatString( colObj.cellsformat, $( '#' + gridId ).jqxGrid( 'getcelltextbyid', rowIdx, colNm ) );
		} else {
			return $( '#' + gridId ).jqxGrid( 'getcellvaluebyid', rowId, colNm );
		}

	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_getCellDataById
/**
 *
 * @param gridId
 * @param colNm
 * @param maxLen
 */
function fc_setColMaxLength( gridId, colNm, maxLen ) {
	var instance = $( '#' + gridId ).jqxGrid( 'getInstance' );

	instance.columnmaxlength[ colNm ] = maxLen;
	var colPropObj = instance.getcolumn( colNm );
	//var colPropObj = fc_getColProps( gridId, colNm, 'createeditor' );

	try {
		var initEditor = null;
		/*
		if ( !fc_isNull( colPropObj.createeditor ) ) {
			console.log("#####333333####### ");
			initEditor = colPropObj.createeditor;
		} else {
			console.log("#####22222####### ");
			initEditor = function( row, cellvalue, editor ) {
				this.owner.columnmaxlength[ colNm ] = maxLen;
				editor.attr( 'maxlength', maxLen );
			};

		};*/
		initEditor = function( row, cellvalue, editor ) {
			this.owner.columnmaxlength[ colNm ] = maxLen;
			editor.attr( 'maxlength', maxLen );
		};

		fc_setColProp( gridId, colNm, 'createeditor', initEditor );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_setColMaxLength
/**
 *
 * @param gridId
 * @param colNm
 * @param maxLen
 */
function fc_setDynamicColMaxLength( gridId, colNm, maxLen ) {
    // set maxlength by ATTR_LTH
	var initEditor = function( row, column, editor ) {
		editor.attr( 'maxlength', maxLen );
	};
   	fc_setColProp( gridId, colNm, 'initeditor', initEditor  );
}; // end of  fc_setDynamicColMaxLength
//**** Row
/**
 *
 * @param gridId
 * @param rowId
 * @param data
 */
function fc_setRowData( gridId, rowId, data ) {
	try {
		$( '#' + gridId ).jqxGrid( 'updaterow', rowId, data );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_setRowData
/**
 *
 * @param gridId
 * @param rowId
 * @returns {Object}
 */
function fc_getRowData( gridId, rowId ) {
	try {
		var refRowdata = $( '#' + gridId ).jqxGrid( 'getrowdata', rowId );
		var returnRowData = new Object();
		returnRowData = $.extend( true, {}, refRowdata ); //clone data

		return returnRowData;
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_getRowData
/**
 *
 * @param gridId
 * @returns
 */
function fc_getRowsData( gridId ) {
	try {
		return $( '#' + gridId ).jqxGrid( 'getrows' );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_getRowsData
/**
 *
 * @param gridId
 * @returns
 */
function fc_getSelectedRowData( gridId ) {
	try {
		var selRow = fc_getSelRow( gridId );
		if ( fc_isNull( selRow ) ) return '';
		return fc_getRowData( gridId, selRow );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_getSelectedRowData
/**
 *
 * @param gridId
 * @param rowIdx
 * @returns
 */
function fc_getRowId( gridId , rowIdx ) {
	try {
		var instance = $( '#' + gridId ).jqxGrid( 'getInstance' );
		return  instance.getrowid( rowIdx );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_getRowId

//***** Select Data Control
/**
 *
 * @param gridId
 */
function fc_getSelectedRow( gridId ) {
	try {
		var instance = $( '#' + gridId ).jqxGrid( 'getInstance' );
		return instance.checkedrow;
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_getSelectedRow
/**
 *
 * @param gridId
 * @returns
 */
function fc_getSelRow( gridId ) {
	try {
		var instance = $( '#' + gridId ).jqxGrid( 'getInstance' );

		return instance.getselectedrowindex();
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_getSelRow
//***** Editor Control
/**
 *
 * @param gridId
 * @param row
 * @param colNm
 */
function fc_setEndCellEdit( gridId, row, colNm ) {
	try {
		$( '#' + gridId ).jqxGrid( 'endcelledit', row, colNm, false );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_setEndCellEdit

//***** Bind Grid Event
/**
 *
 * @param gridId
 * @param event
 * @param callback
 */
function fc_setGridBindEvent( gridId, event, callback ) {
	try {
		$( '#' + gridId ).on( event, callback );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_setGridBindEvent
//***** clear grid data
/**
 *
 * @param gridId
 */
function fc_clearGridData( gridId, flag ) {

	var instance = $( '#' + gridId ).jqxGrid( 'getInstance' );
	var source = instance.source._source;
	source.localdata = null;
	try {
		$( '#' + gridId ).jqxGrid( 'clear' );
		$( '#' + gridId ).jqxGrid({ selectedrowindex: -1}); 
	} catch ( e ) {
		flag = fc_setValue( flag, true );
		if ( flag )
			fc_getException( e );
	};
}; // end of fc_clearGridData
/**
 *
 * @param gridId
 */
function fc_destroyGrid( gridId ) {
	try {
		$( '#' + gridId ).jqxGrid( 'destroy' );
		$( '#' + gridId + 'CM' ).jqxMenu( 'destroy' );
				
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_destroyGrid
/**
 *
 * @param gridId
 * @param arrColNm
 */
function fc_setColUpperCase( gridId, arrColNm ) {
	try {
		var keyEvent = function( row, datafield, columntype, oldvalue, newvalue ) {
			if ( fc_isNull( newvalue ) ) return null;
		    return newvalue.toUpperCase();
		};

		for ( var loop=0;loop<arrColNm.length;loop++ ) {
			var fieldObj = fc_getGridColField(gridId, arrColNm[ loop ].toUpperCase());
			if ( !( fieldObj.datatype == 'lov' || fieldObj.datatype == 'cbolov' || fieldObj.datatype == 'chklov' ) ) {
				fc_setColProp( gridId, arrColNm[ loop ].toUpperCase(), 'cellvaluechanging', keyEvent );
			};
		};
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_setColUpperCase
/**
 *
 * @param gridId
 * @param arrColNm
 */
function fc_setColLowerCase( gridId, arrColNm ) {
	try {
		var keyEvent = function( row, datafield, columntype, oldvalue, newvalue ) {
		    return newvalue.toLowerCase();
		};

		for ( var loop=0;loop<arrColNm.length;loop++ ) {
			var fieldObj = fc_getGridColField( gridId, arrColNm[ loop ].toUpperCase());
			if ( !( fieldObj.datatype == 'lov' || fieldObj.datatype == 'cbolov' || fieldObj.datatype == 'chklov' ) ) {
				fc_setColProp( gridId, arrColNm[ loop ].toUpperCase(), 'cellvaluechanging', keyEvent);
			};
		};
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_setColLowerCase
/**
 *
 * @param gridId
 * @param callback
 */
function fc_setCellValueChangedEvent( gridId, callback ) {
	$( '#' + gridId ).on( 'cellvaluechanged', function( event ) {
		callback( event );
	});
}; // end of fc_setCellValueChangedEvent
/**
 *
 * @param gridId
 * @param arrColNm
 */
function fc_setColHidden( gridId, arrColNm ) {
	try {
		var instance = $( '#' + gridId ).jqxGrid( 'getInstance' );
		instance.beginupdate();
		
		for ( var loop=0;loop<arrColNm.length;loop++ ) {			
			instance.hidecolumn( arrColNm[ loop ] );
		};
		
		instance.endupdate();
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_setColHidden
/**
 *
 * @param gridId
 * @param arrColNm
 */
function fc_setColShow( gridId, arrColNm ) {
	try {
		var instance = $( '#' + gridId ).jqxGrid( 'getInstance' );
		instance.beginupdate();
		
		for ( var loop=0;loop<arrColNm.length;loop++ ) {			
			instance.showcolumn( arrColNm[ loop ] );
			fc_setColProp( gridId, arrColNm[ loop ], 'exportable', true );
		};
		
		instance.endupdate();
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_setColShow
/**
 *
 * @param gridId
 */
function fc_reloadGrid( gridId ) {
	try {
		var instance = $( '#' + gridId ).jqxGrid( 'getInstance' );
		instance.updatebounddata();
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_reloadGrid
/**
 *
 * @param gridId
 */
function fc_resetSelection( gridId ) {
	try {
		var arrindex = fc_getSelectedRow( gridId );
		for ( var loop=0;loop<arrindex.length;loop++ ) {
			fc_setCellData( gridId, arrindex[loop], 'JQX_CB', false );
		};
		var instance = $( '#' + gridId ).jqxGrid( 'getInstance' );

		instance.checkedrow = new Array();
		
		try{
			$( '#' + gridId ).jqxGrid( 'clearselection' );//2019.12.11
		}catch ( e ){
			
		}
		
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_resetSelection
/**
 *
 * @param gridId
 */
function fc_selectAllRows( gridId ) {
	try {
		 var rows = $( '#' + gridId ).jqxGrid( 'getboundrows' );
	    // update cells values.
	    var arrindex = new Array();
	    for ( var i=0;i<rows.length;i++) {
	        var boundindex = $( '#' + gridId ).jqxGrid( 'getrowboundindex', i );
	        $( '#' + gridId ).jqxGrid( 'setcellvalue', boundindex, 'JQX_CB', true );
	        arrindex.push( boundindex );
	    }
	    arrindex.sort(function(a, b) {return a-b;});

	    var instance = $( '#' + gridId ).jqxGrid( 'getInstance' );
		instance.checkedrow = arrindex;
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_selectAllRows
/**
 *
 * @param gridId
 * @param rowIdx
 */
function fc_setSelectRow( gridId, rowIdx ) {
	try {
		$( '#' + gridId ).jqxGrid( 'selectrow', rowIdx );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_setSelectRow
/**
 *
 * @param gridId
 * @returns
 */
function fc_getSelectCell( gridId ) {
	try {
		return $( '#' + gridId ).jqxGrid( 'getselectedcell' );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_getSelectCell
/**
 *
 * @param gridId
 * @param rowIdx
 * @param chkFlag
 */
function fc_setGridCheckBoxVal( gridId,  rowIdx, chkFlag ) {
	try {
		$( '#' + gridId ).jqxGrid( 'setcellvalue', rowIdx, 'JQX_CB', chkFlag );
		var instance = $( '#' + gridId ).jqxGrid( 'getInstance' );
		var arrChked = instance.checkedrow;
		var checkedidx =  arrChked.indexOf( rowIdx );
		if ( chkFlag ) {
			 if ( checkedidx == -1 ) {
				 arrChked.push( rowIdx );
			 };
		} else {
			 if ( checkedidx != -1 ) {
				 arrChked.splice( checkedidx, 1 );
			 };
		};
		arrChked.sort( function( a, b ) { return a-b; } );

		instance.checkedrow = arrChked;
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_setGridCheckBoxVal
/**
 *
 * @param gridId
 * @param rowIdx
 * @returns
 */
function fc_getGridCheckBoxVal( gridId, rowIdx ) {
	try {
		var chkVal = $( '#' + gridId ).jqxGrid( 'getcellvalue', rowIdx, 'JQX_CB' );
		return chkVal;
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_getGridCheckBoxVal
/**
 *
 * @param gridId
 * @param rowuid
 */
function fc_delRowData( gridId, rowuid ) {
	try {
		var instance = $( '#' + gridId ).jqxGrid( 'getInstance' );
		var index = instance.getrowboundindexbyid( rowuid );

		instance.deleterow( rowuid );
		var arrChked = instance.checkedrow;
		var checkedidx =  arrChked.indexOf( index );

		if ( checkedidx != -1 ) {
			arrChked.splice( checkedidx, 1 );
		};

		arrChked.sort( function( a, b ) { return a - b; });

		instance.checkedrow = arrChked;
		instance.endupdate();
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_delRowData
/**
 *
 * @param gridId
 * @param rowuid
 * @param rowData
 * @param index
 */
function fc_addRowData( gridId, rowuid, rowData, index ) {
	try {
		var instance = $( '#' + gridId ).jqxGrid( 'getInstance' );
		instance.addrow( rowuid, rowData, index );
		instance._getCheckIndex();
		instance.endupdate();
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_addRowData
/**
 *
 * @param gridId
 * @param rowId
 * @param newRowData
 */
function fc_updateRowData( gridId, rowId, newRowData ) {
	try {
		var instance = $( '#' + gridId ).jqxGrid( 'getInstance' );
		instance.addrow( rowuid, newRowData );
		instance._getCheckIndex();
		instance.endupdate();
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_updateRowData
/**
 *
 * @param gridId
 * @returns
 */
function fc_getGridRecordCount( gridId ) {
	try {
		var datainformation = $( '#' + gridId ).jqxGrid( 'getdatainformation' );
		var rowscount = datainformation.rowscount;

		return rowscount;
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_getGridRecordCount
/**
 *
 * @param gridId
 * @param colNm
 * @param arrGridData
 * @param listCount
 */
function fc_setGridCombo( gridId, colNm, arrGridData, listCount ) {
	try {
		var fieldInfo = fc_getGridColField( gridId, colNm );
		var lovSource = {
	         datatype: 'array',
	         datafields: [
			              { name: 'CD_NM' , type: 'string' },
			              { name: 'CD_VAL', type: 'string' }
	                     ],
	         localdata: arrGridData
	    };

		var heightSize = arrGridData.length * 25 + 2;

		if (!fc_isNull(listCount)) {
			heightSize = listCount * 25 + 2;
		};

		if (heightSize > 600) {
			heightSize = 600;
		};

		var lovAdapter = new $.jqx.dataAdapter( lovSource, { autoBind: true } );
		if ( fieldInfo.datatype == 'lov' ) {
			var _createDropDownList = function( row, cellvalue, editor, cellText, width, height ) {
			    editor.jqxDropDownList({ theme: window.gwMesEnv.themes, autoDropDownHeight: false, source: lovAdapter, displayMember: 'CD_NM', valueMember: 'CD_VAL', width: width, height: height, enableBrowserBoundsDetection: true, dropDownHeight: heightSize});

	    		this.owner._updatecolumnwidths();
	    		this.owner._updatecellwidths();
			};
			var _initeditor = function( row, cellvalue, editor, celltext, pressedkey ) {
				fc_setDropDownListBoxWidth( editor );
	    		this.owner._updatecolumnwidths();
	    		this.owner._updatecellwidths();
	        };

			fc_setColProp( gridId, colNm, 'createeditor', _createDropDownList );
			fc_setColProp( gridId, colNm, 'initeditor', _initeditor );
		} else if ( fieldInfo.datatype == 'chklov' ) {
			var _createeditor = function( row, cellvalue, editor, cellText, width, height ) {
				// construct the editor.
	            editor.jqxDropDownList( { theme: window.gwMesEnv.themes, autoDropDownHeight: false, checkboxes: true, source: lovAdapter, displayMember: 'CD_NM', valueMember: 'CD_VAL', width: width, height: height , enableBrowserBoundsDetection: true, dropDownHeight: heightSize});

	    		this.owner._updatecolumnwidths();
	    		this.owner._updatecellwidths();
	        };
	        var _initeditor = function( row, cellvalue, editor, celltext, pressedkey ) {
	            // set the editor's current value. The callback is called each time the editor is displayed.
	            var items = editor.jqxDropDownList( 'getItems' );
	            editor.jqxDropDownList( 'uncheckAll' );
	            if ( !fc_isNull( cellvalue ) ) {
		            //var values = cellvalue.split( /, \s*/ );
	            	var values = cellvalue.split(',');
		            for ( var j=0;j<values.length;j++ ) {
		                for ( var i=0;i<items.length;i++ ) {
		                	console.log(items[ i ].value +'/'+ values[ j ]+'/'+i)
		                    if ( items[ i ].value === values[ j ] ) {
		                        editor.jqxDropDownList( 'checkIndex', i );

		                    };
		                };
		            };
	            };

	            fc_setDropDownListBoxWidth( editor );
	    		this.owner._updatecolumnwidths();
	    		this.owner._updatecellwidths();
	        };

	        fc_setColProp( gridId, colNm, 'createeditor', _createeditor );
	        fc_setColProp( gridId, colNm, 'initeditor'  , _initeditor );
		} else if ( fieldInfo.datatype == 'cbolov' ) {
			var _createeditor = function( row, cellvalue, editor, cellText, width, height ) {
	            editor.jqxComboBox({theme: window.gwMesEnv.themes, source: lovAdapter, displayMember: 'CD_NM', valueMember: 'CD_VAL', width: width, height: height, enableBrowserBoundsDetection: true, dropDownHeight: heightSize });

	    		this.owner._updatecolumnwidths();
	    		this.owner._updatecellwidths();
	        };
	        var _initeditor = function( row, cellvalue, editor, celltext, cellwidth, cellheight ) {
	        	fc_setComboListBoxWidth( editor );

	        	this.owner._updatecolumnwidths();
	    		this.owner._updatecellwidths();

	    		editor.jqxComboBox( 'selectItem', cellvalue );
	        };
	        // update the editor's value before saving it.
	        var _cellvaluechanging = function( row, column, columntype, oldvalue, newvalue ) {
	            if ( newvalue == '' ) return oldvalue;
	        };
	        fc_setColProp( gridId, colNm, 'createeditor', _createeditor );
	        fc_setColProp( gridId, colNm, 'initeditor'  , _initeditor );
			fc_setColProp( gridId, colNm, 'cellvaluechanging', _cellvaluechanging );
		};
		fc_setGridColFieldSource( gridId, 'DISP_' + colNm,  lovAdapter.records );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_setGridCombo
/**
 *
 * @param gridId
 * @param showFlag
 */
function fc_showAllGridButton( gridId, showFlag ) {
	var instance = $( '#' + gridId ).jqxGrid( 'getInstance' );

	instance.isShowReload = showFlag;
	instance.isShowAdd    = showFlag;
	instance.isShowCopy   = showFlag;
	instance.isShowDel    = showFlag;

	instance._initpager();
}; // end of fc_setAddRowButton
/**
 *
 * @param gridId
 * @param showFlag
 */
function fc_showReloadButton( gridId, showFlag ) {
	var instance = $( '#' + gridId ).jqxGrid( 'getInstance' );
	instance.isShowReload = showFlag;
	instance._initpager();
}; // end of fc_setReloadButton
/**
 *
 * @param gridId
 * @param showFlag
 */
function fc_showAddRowButton( gridId, showFlag ) {
	var instance = $( '#' + gridId ).jqxGrid( 'getInstance' );
	instance.isShowAdd = showFlag;
	instance._initpager();
}; // end of fc_setAddRowButton
/**
 *
 * @param gridId
 * @param showFlag
 */
function fc_showCopyRowButton( gridId, showFlag ) {
	var instance = $( '#' + gridId ).jqxGrid( 'getInstance' );
	instance.isShowCopy = showFlag;
	instance._initpager();
}; // end of fc_setCopyRowButton
/**
 *
 * @param gridId
 * @param showFlag
 */
function fc_showDelRowButton( gridId, showFlag ) {
	var instance = $( '#' + gridId ).jqxGrid( 'getInstance' );
	instance.isShowDel = showFlag;
	instance._initpager();
}; // end of fc_setDelRowButton
/**
 *
 * @param gridId
 * @param disableFlag
 */
function fc_disableAllGridButton( gridId, disableFlag ) {
	var instance = $( '#' + gridId ).jqxGrid( 'getInstance' );

	instance.pagereloadbtn.jqxButton( { disabled: disableFlag } );
	instance.pageaddbtn.jqxButton   ( { disabled: disableFlag } );
    instance.pagecopybtn.jqxButton  ( { disabled: disableFlag } );
    instance.pagedeletebtn.jqxButton( { disabled: disableFlag } );
    if ( disableFlag ) {
    	instance.pagereloadbtn.jqxTooltip({ position: 'top-right', content: fc_isNull(window.gwMessage.caption.disreload ) ? 'Disable Reload'    : window.gwMessage.caption.disreload , theme: window.gwMesEnv.themes});
    	instance.pageaddbtn.jqxTooltip   ({ position: 'top-right', content: fc_isNull(window.gwMessage.caption.disaddrow ) ? 'Disable Add Row'   : window.gwMessage.caption.disaddrow , theme: window.gwMesEnv.themes});
    	instance.pagecopybtn.jqxTooltip  ({ position: 'top-right', content: fc_isNull(window.gwMessage.caption.discopyrow) ? 'Disable Copy Row'  : window.gwMessage.caption.discopyrow, theme: window.gwMesEnv.themes});
    	instance.pagedeletebtn.jqxTooltip({ position: 'top-right', content: fc_isNull(window.gwMessage.caption.disdelrow ) ? 'Disable Delete Row': window.gwMessage.caption.disdelrow , theme: window.gwMesEnv.themes});
    } else {
    	instance.pagereloadbtn.jqxTooltip({ position: 'top-right', content: fc_isNull(window.gwMessage.caption.reload ) ? 'Reload'     : window.gwMessage.caption.reload , theme: window.gwMesEnv.themes});
    	instance.pageaddbtn.jqxTooltip   ({ position: 'top-right', content: fc_isNull(window.gwMessage.caption.addrow ) ? 'Add Row'    : window.gwMessage.caption.addrow , theme: window.gwMesEnv.themes});
    	instance.pagecopybtn.jqxTooltip  ({ position: 'top-right', content: fc_isNull(window.gwMessage.caption.copyrow) ? 'Copy Row'   : window.gwMessage.caption.copyrow, theme: window.gwMesEnv.themes});
    	instance.pagedeletebtn.jqxTooltip({ position: 'top-right', content: fc_isNull(window.gwMessage.caption.delrow ) ? 'Delete Row' : window.gwMessage.caption.delrow , theme: window.gwMesEnv.themes});
    }
}; // end of fc_setAddRowButton
/**
 *
 * @param gridId
 * @param disableFlag
 */
function fc_disableReloadButton( gridId, disableFlag ) {
	var instance = $( '#' + gridId ).jqxGrid( 'getInstance' );
	instance.pagereloadbtn.jqxButton({ disabled: disableFlag });
	if ( disableFlag ) {
    	instance.pagereloadbtn.jqxTooltip( { position: 'top-right', content: fc_isNull( window.gwMessage.caption.disreload ) ? 'Disable Reload' : window.gwMessage.caption.disreload, theme: window.gwMesEnv.themes} );
    } else {
    	instance.pagereloadbtn.jqxTooltip( { position: 'top-right', content: fc_isNull( window.gwMessage.caption.reload    ) ? 'Reload'         : window.gwMessage.caption.reload   , theme: window.gwMesEnv.themes} );
    }
}; // end of fc_setReloadButton
/**
 *
 * @param gridId
 * @param disableFlag
 */
function fc_disableAddRowButton( gridId, disableFlag ) {
	var instance = $( '#' + gridId ).jqxGrid( 'getInstance' );
	instance.pageaddbtn.jqxButton({ disabled: disableFlag });
	if ( disableFlag ) {
    	instance.pageaddbtn.jqxTooltip( { position: 'top-right', content: fc_isNull( window.gwMessage.caption.disaddrow ) ? 'Disable Add Row' : window.gwMessage.caption.disaddrow, theme: window.gwMesEnv.themes} );
    } else {
    	instance.pageaddbtn.jqxTooltip( { position: 'top-right', content: fc_isNull( window.gwMessage.caption.addrow    ) ? 'Add Row'         : window.gwMessage.caption.addrow   , theme: window.gwMesEnv.themes} );
    }
}; // end of fc_setAddRowButton
/**
 *
 * @param gridId
 * @param disableFlag
 */
function fc_disableCopyRowButton( gridId, disableFlag ) {
	var instance = $( '#' + gridId ).jqxGrid( 'getInstance' );
	instance.pagecopybtn.jqxButton( { disabled: disableFlag } );
	if ( disableFlag ) {
    	instance.pagecopybtn.jqxTooltip( { position: 'top-right', content: fc_isNull( window.gwMessage.caption.discopyrow ) ? 'Disable Copy Row' : window.gwMessage.caption.discopyrow, theme: window.gwMesEnv.themes} );
    } else {
    	instance.pagecopybtn.jqxTooltip( { position: 'top-right', content: fc_isNull( window.gwMessage.caption.copyrow    ) ? 'Copy Row'         : window.gwMessage.caption.copyrow   , theme: window.gwMesEnv.themes} );
    }
}; // end of fc_setCopyRowButton
/**
 *
 * @param gridId
 * @param disableFlag
 */
function fc_disableDelRowButton( gridId, disableFlag ) {
	var instance = $( '#' + gridId ).jqxGrid( 'getInstance' );
	instance.pagedeletebtn.jqxButton( { disabled: disableFlag } );
	if ( disableFlag ) {
    	instance.pagedeletebtn.jqxTooltip( { position: 'top-right', content: fc_isNull( window.gwMessage.caption.disdelrow ) ? 'Disable Delete Row' : window.gwMessage.caption.disdelrow, theme: window.gwMesEnv.themes} );
    } else {
    	instance.pagedeletebtn.jqxTooltip( { position: 'top-right', content: fc_isNull( window.gwMessage.caption.delrow    ) ? 'Delete Row'         : window.gwMessage.caption.delrow   , theme: window.gwMesEnv.themes} );
    }
}; // end of fc_setDelRowButton
/**
 *
 */
function fc_getGridSetting() {
	try {
		fc_addParam( 'USER_ID', window.gwMesEnv.user.id );
		fc_addParam( 'PGM_ID' , window.gwMesEnv.user.pgmId  );
		fc_addParam( 'GRID_ID', '' );
		if ( fc_search( 'ict.sys.init-service', 'searchGridSetting', 'SCO' ) )
			fc_setGridSetting();
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_getGridSetting
/**
 *
 */
function fc_setGridSetting() {
	if ( fc_isNull( window.gwJsonResult.RK_GRID ) )  return false;

	for( var i=0;i<window.gwJsonResult.RK_GRID.length;i++ ) {
		var _gridId      = window.gwJsonResult.RK_GRID[ i ].GRID_ID;
		var _gridState   = JSON.parse( window.gwJsonResult.RK_GRID[ i ].GRID_STATE );
		var _gridUsePage = window.gwJsonResult.RK_GRID[ i ].USE_PAGE;

		var instance = $( '#' + _gridId ).jqxGrid( 'getInstance' );
		if ( !fc_isNull( _gridUsePage ) ) {
			instance.isPageable =  _gridUsePage == 'Y' ? true : false;
			instance._initpager();
		};
		var colObj = instance.columns.records;

		if( !fc_isNull( $( '#' + _gridId ) ) && !fc_isNull( _gridState ) ) {
			$( '#' + _gridId ).jqxGrid( 'loadstate', _gridState );
//			$.each( _gridState.columns, function( key, settingGrid ) {
//				$.each( colObj, function( index, targetGrid ) {
//					if( targetGrid.datafield == key ) {
//						$.each( settingGrid, function( prop, val ) {
//							if( prop != 'index') {
//								instance._setcolumnproperty( key, prop, val );
//							};
//						});
//						return false;
//					};
//				});
//			});
		};
	};
}; // end of fc_setGridSetting
/**
 *
 * @param gridId
 * @param flag
 */
function fc_showRowNumbers( gridId, flag ) {
	fc_setColProp( gridId, 'JQX_RN', 'hidden', !flag );
	//$("#"+gridId).jqxGrid('hidecolumn', 'JQX_RN');
	//fc_setColProp( gridId, 'JQX_RN', 'width', !flag ? 0 : 50 );
};// end of fc_showRowNumbers
/**
 *
 * @param vInstance
 */
function fc_setGridSystemRowNumSize( vInstance ) {
	var pagesize = vInstance.pagesize;
	var colObj = vInstance._columns;
	var defaultRowNum = 30;
	var nApplyWidth = 0;

	if ( vInstance.width > 0 ) {
		$.each( colObj, function( key, value ) {
			if ( value.datafield == 'JQX_RN' && vInstance.dataview.totalrecords >= pagesize ) {
				if ( pagesize > 999 ) {
					nApplyWidth = defaultRowNum + 10;
				} else if ( pagesize > 9999 ) {
					nApplyWidth = defaultRowNum + 20;
				} else if ( pagesize > 99999 ) {
					nApplyWidth = defaultRowNum + 30;
				} else {
					nApplyWidth = defaultRowNum;
				};
				if ( !fc_isNull(value.hidden) && !value.hidden) {
					vInstance._setcolumnproperty( value.datafield, 'resize', true );
					vInstance._setcolumnproperty( value.datafield, 'width', nApplyWidth );
					vInstance._setcolumnproperty( value.datafield, 'resize', false );
				} ;
				return false;
			};
		} );
	} ;
}; // end of fc_setGridSystemRowNumSize
/**
 *
 * @param gridId
 * @param rightClickColumn
 * @param bFlag
 */
function fc_setGridFrozenToggle( gridId, rightClickColumn, bFlag ) {
	try {
		var instance = $( '#' + gridId ).jqxGrid( 'getInstance' );
		var colObj = null;
		var tmpColObj = fc_getInstanceColObj( instance, rightClickColumn );
		var bFlag = tmpColObj.pinned;

		if ( fc_isNull( tmpColObj.columngroup ) ) {
			fc_resetGridPinned( instance, rightClickColumn );
			colObj = instance.columns.records;
			$.each( colObj, function( key, value ) {
				if ( !( rightClickColumn == 'JQX_CB' || rightClickColumn == 'JQX_RN') && fc_isNull(value.columngroup) ) {
					if ( value.datafield != rightClickColumn ) {
						if ( !value.pinned ) instance._setcolumnproperty( value.datafield, 'pinned', true );
					} else {
						instance._setcolumnproperty( value.datafield, 'pinned', !bFlag);
						return false;
					};
				};
			});
		};
	} catch ( e ) {
		fc_showMessageBox( 'The columns in a column group cannot be Frozen.', 'E' );
		instance._setcolumnproperty( value.datafield, 'pinned', false);
	};
}; // end of fc_setGridFrozenToggle
/**
 *
 * @param vInstance
 * @param rightClickColumn
 */
function fc_resetGridPinned( vInstance, rightClickColumn ) {
	var colObj = vInstance.columns.records;
	$.each( colObj, function( key, value ) {
		if ( value.datafield  != 'JQX_CB' && value.datafield != 'JQX_RN'  && fc_isNull(value.columngroup) ) {

			if ( value.pinned ) vInstance._setcolumnproperty( value.datafield, 'pinned', false );
		};
	});
}; // end of fc_resetGridPinned
/**
 *
 * @param vInstance
 * @param rightClickColumn
 * @returns
 */
function fc_getInstanceColObj( vInstance, rightClickColumn ) {
	var colObj = vInstance.columns.records;
	var rtnColObj= null;
	$.each( colObj, function( key, value ) {
		if ( value.datafield  == rightClickColumn ) {
			rtnColObj = value;
			return false;
		};
	});
	return rtnColObj;
}; // end of fc_getInstanceColObj
/**
 *
 * @param gridId
 * @param arrColNm
 */
function fc_setGridCellLinkStyle( gridId, arrColNm ) {
	try {
		var cellsrenderer = function( row, columnfield, value, defaulthtml, columnproperties ) {
			if ( !fc_isNull( value ) ) {
				var rtnRender = '';
				var tag = $( defaulthtml );
				tag.addClass( fc_getGridCellLinkStyle() );
				if ( tag.length ) {
					rtnRender = tag[ 0 ].outerHTML;
				};
				return rtnRender;
			};
		};
		$.each( arrColNm, function( idx, colNm ) {
			var colObj = fc_getGridColField( gridId, colNm );
			var sDataType = colObj.datatype;
			if ( sDataType != 'lov' && sDataType != 'popup' && sDataType != 'custpopup' ) {
				fc_setColProp( gridId, colNm, 'cellsrenderer', cellsrenderer );
			};
		});
	} catch( e ) {
		fc_getException( e );
	};
}; // end of fc_setGridLinkCol
function fc_setGridGroupable( gridId, arrColNm, groupable_flag, showgroupheader_flag, showgroupaggregates_flag, showrownum_flag ) {
	if ( fc_isNull( gridId ) ) {
		fc_setError( '[Object ID]' + window.gwMessage.validate.nodefined );
		return;
	};
//	if ( fc_isNull( arrColNm ) ) {
//		fc_setError( '[Grouping Column Name]' + window.gwMessage.validate.nodefined );
//		return;
//	};
	groupable_flag           = fc_setValue( groupable_flag          , true );
	showgroupheader_flag     = fc_setValue( showgroupheader_flag    , true );
	showgroupaggregates_flag = fc_setValue( showgroupaggregates_flag, true );

	$( '#' + gridId ).jqxGrid( { groupable: groupable_flag} );
	$( '#' + gridId ).jqxGrid( { showgroupsheader: showgroupheader_flag} );
	$( '#' + gridId ).jqxGrid( { showgroupaggregates: showgroupaggregates_flag} );
	if ( !fc_isNull( arrColNm ) ) {
		fc_addGridGroup( gridId, arrColNm );
	};
	fc_showRowNumbers( gridId, showrownum_flag );
}; // end of fc_setGridGroupable
function fc_getGridGroupable( gridId ) {
	return $( '#' + gridId ).jqxGrid( 'groupable' );
}; // end of fc_getGridGroupable
function fc_getGridGroups( gridId ) {
	return $( '#' + gridId ).jqxGrid( 'groups' ); // return: array
}; // end of fc_getGridGroups
function fc_addGridGroup( gridId, arrColNm ) {
	for ( var loop=0;loop<arrColNm.length;loop++ ) {
		$('#' + gridId ).jqxGrid( 'addgroup', arrColNm[ loop ] );
	};
}; // end of fc_addGridGroup
function fc_removeGridGroup( gridId, arrColNm ) {
	for ( var loop=0;loop<arrColNm.length;loop++ ) {
		$('#' + gridId ).jqxGrid( 'removegroup', arrColNm[ loop ] );
	};
}; // end of fc_removeGridGroup
function fc_clearGridGroup( gridId ) {
	$('#' + gridId ).jqxGrid( 'cleargroups' );
}; // end of fc_clearGridGroup
function fc_collapseGridGroup( gridId, index ) {
	$('#' + gridId ).jqxGrid( 'collapsegroup', index );
}; // end of fc_collapseGridGroup
function fc_expandGridGroup( gridId, index ) {
	$('#' + gridId ).jqxGrid( 'expandgroup', index );
}; // end of fc_expandGridGroup
function fc_collapseAllGridGroups( gridId ) {
	$('#' + gridId ).jqxGrid( 'collapseallgroups' );
}; // end of fc_collapseAllGridGroups
function fc_expandAllGridGroups( gridId ) {
	$('#' + gridId ).jqxGrid( 'expandallgroups' );
}; // end of fc_expandAllGridGroups
function fc_showGridPager( gridId, flag ) {
	if ( flag )
		$('#' + gridId ).jqxGrid({ pagerheight: 34});
	else
		$('#' + gridId ).jqxGrid({ pagerheight: 0});
}; // end of fc_showGridPager

function fc_GridHeaderAlign( arrObj ) {
	for ( var loop = 0; loop<arrObj.length; loop++ ) {
		$( '[item_cd=' + arrObj[ loop ] + ']' ).css('margin-bottom','10.5px');
		$( '[item_cd=' + arrObj[ loop ] + ']' ).css('margin-top','10.5px');
	};
}; // end of fc_GridHeaderAlign