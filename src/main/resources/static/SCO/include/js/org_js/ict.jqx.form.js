/**
 * Declare variable
 */

/**
 * Declare Initial JS Function
 */
$(function() {
	fc_showLog( 1, '***** jQuery From' );
}); // end of $(function ())
/**
 * fc_createAttr
 * @description	Create attribute for input element
 * @param element : Element Object
 * @param attrObj : Attribute value Object { 'width':'100px', 'height:'100px' }
 */
function fc_createAttr( element, attrObj ) {
	try {
		for ( var key in attrObj ) {
			if ( !fc_isNull( attrObj[ key ] ) )
				$( element ).attr( key, attrObj[ key ] );
		};
	} catch ( e ) {
		fc_getException( e );
	};
}//end of function fc_createAttr
/**
 * fc_createElement
 * @description	Create element
 * @param targetObj : Parent Element Object or Id
 * @param elementObj : Element Object Attribut Type
 * @param type : String 'POPUP' OR other
 * @example fc_createElement( 'divBulletinDetail4', { caption: 'Broker Name', name: 'DEST_TY', width: 0, datatype: 'text', hidden: true }, '' );
 */
function fc_createElement( targetObj, elementObj, type ) {
	try {
		var preMsg = '<b>Program Error: fc_createElement</b><br><br>';
		var _domType = ( type == 'POPUP' ) ? 'popup_' : '';
		if ( fc_isNull( elementObj.name ) ) {
			throw new Error( preMsg + 'Element Name ' + window.gwMessage.validate.nodefined );
		};
		if ( fc_isNull( elementObj.datatype ) ) {
			throw new Error( preMsg + 'Element Datatype ' + window.gwMessage.validate.nodefined );
		};
		if ( typeof( targetObj ) !==  'object' )
			targetObj = $( '#' + targetObj );

		var _id = elementObj.name.toUpperCase();

		if ( !fc_isNull( elementObj.align ) ) {
			elementObj.alignflag = true;
		};
		var inputAttObj =  {
				id         : _domType + elementObj.name.toUpperCase(),
				name       : elementObj.name.toUpperCase(),
				caption    : _id,
				width      : 100,
				height     : ( fc_isNull( elementObj.height ) ) ? 24 : elementObj.height,
				datatype   : 'text',
				align      : 'left',
				readonly   : false,
				itemCd     : _id,
				itemValue  : 0,
				labelwidth : 0,
				labelalign : 'center',
				refName    : '',
				isFrom     : false,
				maxlength  : null,
				alignflag  : false,
				isMultiLanguage : ( fc_isNull( elementObj.isMultiLanguage ) ) ? true : elementObj.isMultiLanguage
		};
		$.extend( inputAttObj, elementObj );
		var _hidden        = ( fc_isNull( elementObj.hidden        ) ) ? false : elementObj.hidden;
		var _required      = ( fc_isNull( elementObj.required      ) ) ? false : elementObj.required;
		var _lowercase     = ( fc_isNull( elementObj.lowercase     ) ) ? false : elementObj.lowercase;
		var _uppercase     = ( fc_isNull( elementObj.uppercase     ) ) ? false : elementObj.uppercase;
		var _defval        = ( fc_isNull( elementObj.defval        ) ) ? null  : elementObj.defval;
		var _addclass      = ( fc_isNull( elementObj.addclass      ) ) ? null  : elementObj.addclass;
		var _inputReadOnly = ( fc_isNull( elementObj.inputreadonly ) ) ? false : elementObj.inputreadonly;

		//div group set
		var divGroup = '', divGroupId = '';
		divGroup = document.createElement( 'div' );
		divGroupId = 'divgrp_' + ( _domType + _id ).toUpperCase();
		targetObj.append( divGroup );
		var divObj	 = { id: {} };
		divObj.id = divGroupId;
		fc_createAttr( divGroup, divObj );

		$( divGroup ).addClass( 'search-col-left' );

		if ( inputAttObj.datatype == 'button' ) {
			$( '#' + divGroupId ).addClass( 'searchBtnGrp' );
		} else if ( inputAttObj.datatype == 'img' ) {
			$( '#' + divGroupId ).addClass( 'searchImgGrp' );
		} else {
			$( '#' + divGroupId ).addClass( 'searchElGrp' );
		};
		// label set
		if ( !( inputAttObj.datatype == 'img' || inputAttObj.caption == '' || inputAttObj.datatype == 'button' || inputAttObj.datatype == 'textarea' ) )
			fc_makeLabel( divGroup, inputAttObj );

		if ( inputAttObj.datatype != 'label' )
			fc_makeElement( targetObj, divGroup, inputAttObj );

		if ( _required  )	fc_setElementRequired ( [ _id ] );  // $( objectId ).addClass( window.gwClass.required );
		if ( _lowercase ) 	fc_setElementLowerCase( [ _id ] );  // $( objectId ).css( { 'text-transform': 'lowercase' } );
		if ( _uppercase ) 	fc_setElementUpperCase( [ _id ] );
		if ( !fc_isNull( _defval ) && inputAttObj.datatype !== 'button' ) {
			if ( inputAttObj.datatype !== 'number' )
				$( '#' + _id ).val( _defval );
			else
				fc_setInputVal(_id, _defval);
		};
		if ( !fc_isNull( _addclass ) && inputAttObj.datatype !== 'button' ) $( '#' + _id ).addClass( _addclass );

		if ( _hidden ) {
			$( '#' + divGroupId ).hide();
		};
		if ( inputAttObj.datatype == 'popup' ) {
			if ( _inputReadOnly ) {
				$( '#' + inputAttObj.name + '>input' ).jqxInput( { disabled:_inputReadOnly } );
				if ( !_requried )
					$( '#' + inputAttObj.name ).addClass( window.gwClass.readonly );
			};
		};
	} catch ( e ) {
		fc_getException( e );
	};
}; //end of function fc_createElement
/**
 * fc_setFromPopInputReadOnly
 * @description	set readonly inputbox of popuptype
 * @param sObjectNm ( Object name) , bFlag ( true, false )
 * @param bFlag
 * @Example		fc_setFromPopInputReadOnly( 'STEEL_GRD', true );
 */
function fc_setFormPopInputReadOnly( sObjectNm, bFlag ) {
	try {
		$( '#' + sObjectNm + '>input' ).jqxInput( { disabled:bFlag } );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_setFormPopInputReadOnly
/**
 * fc_setFormPopReadOnly
 * @Description	set readonly popup object
 * @param sObjectNm
 * @param bFlag
 */
function fc_setFormPopReadOnly( sObjectNm, bFlag ) {
	try {
		$( '#' + sObjectNm ).jqxInput( { disabled:bFlag } );

		if ( bFlag )
			$( '#' + sObjectNm ).addClass( window.gwClass.readonly );
		else
			$( '#' + sObjectNm ).removeClass( window.gwClass.readonly );

	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_setFormPopReadOnly
/**
 * fc_makeLabel
 * @param prmObj     : parent Object
 * @param elementObj : Element Object
 */
function fc_makeLabel( prmObj, elementObj ) {
	// 2018.2.22 getting from database
	window.gwMultiLang.isRunMain = false;

	try {
		var lableEle =  document.createElement( 'label' );
		lableEle.appendChild( document.createTextNode( elementObj.caption ) );
		prmObj.appendChild( lableEle );
		//---------------------------------------------------------------------
		var labelObj = new Object();
		labelObj[ 'id'    ] = 'LBL_' + elementObj.id;
		labelObj[ 'for'   ] = elementObj.id;
		labelObj[ 'align' ] = ( fc_isNull( elementObj.labelalign ) ) ? 'center' : elementObj.labelalign;

		if ( elementObj.labelwidth > 0 ) labelObj[ 'width' ] = elementObj.labelwidth;

		if ( elementObj.isMultiLanguage && window.gwMesEnv.lang.isMultiLanguage ) {
			if ( window.gwMultiLang.isRunMain ) {
				lableEle.innerText = fc_getGwLangItem( fc_isNull( elementObj.itemCd ) ? elementObj.id : elementObj.itemCd
						                             , fc_isNull( elementObj.itemValue ) ? 0 : elementObj.itemValue
						                             , elementObj.caption );
			} else {
				labelObj[ 'class' ] = window.gwClass.multilanguage;
				labelObj[ window.gwMesEnv.item.itemcd    ] = fc_isNull( elementObj.itemCd ) ? elementObj.id : elementObj.itemCd;
				labelObj[ window.gwMesEnv.item.itemvalue ] = fc_isNull( elementObj.itemValue ) ? 0 : elementObj.itemValue;

				fc_setLangId( labelObj[ window.gwMesEnv.item.itemcd ], labelObj[ window.gwMesEnv.item.itemvalue ] );
			};
		}; // end of if ( window.gwMesEnv.lang.isMultiLanguage )

		fc_createAttr( lableEle, labelObj );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_makeLabel
/**
 * fc_createComboItem
 * @param parentElementId
 * @param attrId
 * @param attrNm
 * @param attrKey
 * @param caption
 * @param itemCd
 * @param itemValue
 * @returns
 */
function fc_createComboItem( parentElementId, attrId, attrNm, attrKey, caption, itemCd, itemValue ) {
	// 2018.2.22 getting from database
	window.gwMultiLang.isRunMain = false;
	try {
		var attrObj = new Object();
		attrObj[ 'id'    ] = attrId.toUpperCase();
		attrObj[ 'name'  ] = ( fc_isNull( attrNm ) ) ? attrObj[ 'id' ] : attrNm;
		attrObj[ 'value' ] = attrKey;
		if ( window.gwMultiLang.isRunMain ) {
			lableEle.innerText = fc_getGwLangItem( fc_isNull( itemCd    ) ? attrObj[ 'id' ] : itemCd
					                             , fc_isNull( itemValue ) ? 0               : itemValue
					                             , elementObj.caption );
		} else {
			attrObj[ 'class' ] = window.gwClass.multilanguage;
			attrObj[ window.gwMesEnv.item.itemcd    ] = fc_isNull( itemCd    ) ? attrObj[ 'id' ] : itemCd;
			attrObj[ window.gwMesEnv.item.itemvalue ] = fc_isNull( itemValue ) ? 0               : itemValue;
			fc_setLangId( attrObj[ 'id' ], 1, 'label', '' );
		};
		var inputEle = document.createElement( 'option' );
		inputEle.appendChild( document.createTextNode( caption ) );
		fc_createAttr( inputEle, attrObj );
		$( '#' + parentElementId ).append( inputEle );
		return inputEle;
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_createComboItem
/**
 *
 * @param parentElementId
 * @param buttonObj
 * @returns
 */
function fc_createRadioItem( parentElementId, buttonObj, isShowBtnType ) {
	// 2018.2.22 getting from database
	window.gwMultiLang.isRunMain = false;
	try {
		if ( fc_isNull( isShowBtnType ) ) isShowBtnType = true;

		var attrObj = new Object();
//		attrObj[ 'type'  ] = 'radio';
		attrObj[ 'id'    ] = buttonObj.id;
//		attrObj[ 'value' ] = buttonObj.key;
		var inputEle;

		if ( isShowBtnType ) {
			attrObj[ 'name' ] = ( fc_isNull( buttonObj.name ) ) ? buttonObj.id : buttonObj.name;

			inputEle = document.createElement( 'button' );
			fc_createAttr( inputEle, attrObj );
			$( '#' + parentElementId ).append( inputEle );
			$( inputEle ).text( buttonObj.caption );
			$( inputEle ).addClass( 'form-radio-item' );
			} else {
			var name = ( fc_isNull( buttonObj.name ) ) ? buttonObj.id : buttonObj.name;
			inputEle = document.createElement( 'div' );
			fc_createAttr( inputEle, attrObj );
			$( '#' + parentElementId ).append( inputEle );

			var textSpanEle = document.createElement( 'span' );
			var spanAttrObj = {};
			spanAttrObj[ window.gwMesEnv.item.itemcd    ] = fc_isNull( buttonObj.itemCd    ) ? buttonObj[ 'id' ] : buttonObj.itemCd;
			spanAttrObj[ window.gwMesEnv.item.itemvalue ] = fc_isNull( buttonObj.itemValue ) ? 0                 : buttonObj.itemValue;
			fc_createAttr( textSpanEle, spanAttrObj );

			$( inputEle ).append( textSpanEle );
			if ( window.gwMultiLang.isRunMain ) {
				$( textSpanEle ).text( fc_getGwLangItem( buttonObj.itemCd, buttonObj.itemValue, buttonObj.caption ) );
			} else {
				$( textSpanEle ).text( buttonObj.caption );
				$( textSpanEle ).addClass( window.gwClass.multilanguage );
				fc_setLangId( buttonObj.itemCd, buttonObj.itemValue );
			};

			$( inputEle ).jqxRadioButton( { height: 25, theme : window.gwMesEnv.themes, groupName: 'GRP_' + parentElementId } );
			$( inputEle ).addClass( 'jqx-radio-left' )

			var obj = $( inputEle ).jqxRadioButton( 'getInstance' );
			obj.setreturnval( buttonObj.key );
		};
		return inputEle;
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_createRadioItem
/**
 *
 * @param targetObj
 * @param objList
 */
function fc_createDOM( targetObj, objList ) {
	try {
		fc_makeDOM( targetObj, objList, 'SCREEN' );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_createDOM
/**
 *
 * @param targetObj
 * @param objList
 */
function fc_createPopupDOM( targetObj, objList ) {
	try {
		fc_makeDOM( targetObj, objList, 'POPUP' );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_createPopupDOM
/**
 *
 * @param arrElementId
 * @param isRequrired
 */
function fc_setElementRequired( arrElementId, isRequrired ) {
	if ( fc_isNull( isRequrired ) ) isRequrired = true;
	try {
		for ( var loop=0;loop<arrElementId.length;loop++ ) {
			if ( isRequrired ) {
				$( '#' + arrElementId[ loop ] ).addClass( window.gwClass.required );
			} else {
				$( '#' + arrElementId[ loop ] ).removeClass( window.gwClass.required );
			}
			$( '#' + arrElementId[ loop ] ).attr( 'required', isRequrired );
		};
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_setElementRequired
/**
 *
 * @param arrElementId
 */
function fc_setElementUpperCase( arrElementId ) {
	try {
		for ( var loop=0;loop<arrElementId.length;loop++ ) {
			var selecter = $( '#' + arrElementId[ loop ] );
			if ( selecter.find( 'input' ).length != 0 ) {
				selecter = selecter.find( 'input' );
			};
			selecter.css( { 'text-transform': 'uppercase' } );
			selecter.focusout( function( event ) {
				$( this ).val( $( this ).val().toUpperCase() );
			});
		};
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_setElementUpperCase
/**
 *
 * @param arrElementId
 */
function fc_setElementLowerCase( arrElementId ) {
	try {
		for ( var loop=0;loop<arrElementId.length;loop++ ) {
			var selecter = $( '#' + arrElementId[ loop ] );
			if ( selecter.find( 'input' ).length != 0 ) {
				selecter = selecter.find( 'input' );
			};
			selecter.css( { 'text-transform': 'lowercase' } );
			selecter.focusout( function( event ) {
				$( this ).val( $( this ).val().toLowerCase() );
			});
		};
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_setElementLowerCase
/**
 *
 * @param targetId
 * @param tableCaption
 */
function fc_setElementCaption( targetId, tableCaption ) {
	// 2018.2.22 getting from database
	window.gwMultiLang.isRunMain = false;
	try {
		var captionEl = document.createElement( 'caption' );
		if ( typeof tableCaption == 'string' ) {
			captionEl.appendChild( document.createTextNode( tableCaption ) );
		} else {
			captionEl.appendChild( document.createTextNode( tableCaption.caption ) );
		};
		if ( fc_isNull( tableCaption.isMultiLanguage ) ) tableCaption.isMultiLanguage = true;

		$( '#' + targetId ).prepend( captionEl );
		var captionObj	 = { id: {}, 'class': 'table-caption' };
		captionObj.id = 'caption_' + targetId;
		fc_createAttr( captionEl, captionObj );

		if ( tableCaption.isMultiLanguage && window.gwMesEnv.lang.isMultiLanguage ) {
			if ( window.gwMultiLang.isRunMain ) {
				$( captionEl )[ 0 ].innerText = fc_getGwLangItem( fc_isNull( tableCaption.itemCd    ) ? captionObj.id.toUpperCase() : tableCaption.itemCd
						                                        , fc_isNull( tableCaption.itemValue ) ? 0 : tableCaption.itemValue
						                                        , tableCaption.caption );
			} else {
				$( captionEl ).addClass( window.gwClass.multilanguage );
				$( captionEl ).attr( window.gwMesEnv.item.itemcd   , fc_isNull( tableCaption.itemCd    ) ? captionObj.id.toUpperCase() : tableCaption.itemCd );
				$( captionEl ).attr( window.gwMesEnv.item.itemvalue, fc_isNull( tableCaption.itemValue ) ? 0 : tableCaption.itemValue );

				fc_setLangId( $( captionEl ).attr( window.gwMesEnv.item.itemcd ), $( captionEl ).attr( window.gwMesEnv.item.itemvalue ) );
			};
		}; // end of if ( window.gwMesEnv.lang.isMultiLanguage )
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_setElementCaption
/**
 *
 * @param targetObj
 * @param elementObj
 * @param tabType
 */
function fc_createTabElement( targetObj,  elementObj, tabType ) {
	try {
		var preMsg = '<b>Program Error: fc_createTabElement</b><br><br>';
		var _domType = ( tabType == 'POPUP' ) ? 'popuptab_' : 'formtab_';
		if ( fc_isNull( elementObj.name ) ) {
			throw new Error( preMsg + 'Element Name ' + window.gwMessage.validate.nodefined );
		};
		if ( typeof targetObj !==  'object' )
			targetObj = $( '#' + targetObj );

		var _id        = elementObj.name.toUpperCase();
		var _caption   = ( elementObj.caption == undefined    ) ? _id : elementObj.caption;
		var _itemCd    = ( fc_isNull( elementObj.itemCd     ) ) ? _id : elementObj.itemCd.toUpperCase();
		var _itemValue = ( fc_isNull( elementObj.itemValue  ) ) ?   0 : elementObj.itemValue;
		var _isMultiLanguage = ( fc_isNull( elementObj.isMultiLanguage ) ) ? true : elementObj.isMultiLanguage;
		_id = _domType + _id;

		var tab =  $( fc_createTabLink( _id, _caption, _itemCd, _itemValue, _isMultiLanguage ) );
		fc_createTabDataItem( targetObj, _id );

		var tabData =  $( '#' + _id );
		targetObj.find( 'ul' ).append( tab );
		targetObj.append( tabData );
	} catch ( e ) {
		fc_getException( e );
	};
}; //end of function fc_createTabElement
/**
 *
 * @param prmObj
 * @param elementId
 */
function fc_createTabDataItem( prmObj, elementId ) {
	try {
		var tabDataItem =  document.createElement( 'div' );
		prmObj.append( tabDataItem );

		var tabDataItemObj = new Object();
		tabDataItemObj[ 'id' ] = elementId;
		fc_createAttr( tabDataItem, tabDataItemObj );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_createTabDataItem
/**
 *
 * @param targetObj
 * @param elementObj
 * @param grpType
 */
function fc_createGroupElement( targetObj, elementObj, grpType ) {
	try {
		var preMsg = '<b>Program Error: fc_createGroupElement</b><br><br>';
		var _domType = ( grpType == 'POPUP' ) ? 'popup_' : '';
		if ( fc_isNull( elementObj.name ) ) {
			throw new Error( preMsg + 'Element Name ' + window.gwMessage.validate.nodefined );
		};
		if ( fc_isNull( elementObj.datatype ) ) {
			throw new Error( preMsg + 'Element Datatype ' + window.gwMessage.validate.nodefined );
		};
		if ( typeof( targetObj ) !==  'object' )
			targetObj = $( '#' + targetObj );

		var _id = elementObj.name.toUpperCase();
		if ( !fc_isNull( elementObj.align ) )  {
			elementObj.alignflag = true;
		};

		var inputAttObj =  {
				id         : _domType + elementObj.name.toUpperCase(),
				name       : elementObj.name.toUpperCase(),
				caption    : _id,
				width      : 100,
				height     : ( fc_isNull( elementObj.height ) ) ? 24 : elementObj.height,
				datatype   : 'text',
				align      : 'left',
				readonly   : false,
				itemCd     : _id,
				itemValue  : 0,
				labelwidth : 0,
				labelalign : 'center',
				refName    : '',
				isFrom     : false,
				maxlength  : null,
				alignflag  : false,
				isMultiLanguage : ( fc_isNull( elementObj.isMultiLanguage ) ) ? true : elementObj.isMultiLanguage
		};

		$.extend( inputAttObj, elementObj );

		var _required  = ( fc_isNull( elementObj.required  ) ) ? false : ( ( elementObj.required  == true ) ? true : false );
		var _lowercase = ( fc_isNull( elementObj.lowercase ) ) ? false : ( ( elementObj.lowercase == true ) ? true : false );
		var _uppercase = ( fc_isNull( elementObj.uppercase ) ) ? false : ( ( elementObj.uppercase == true ) ? true : false );
		var _defval    = ( fc_isNull( elementObj.defval    ) ) ? null  : elementObj.defval;

		_id = _domType + _id;
		// label set
		if ( !( inputAttObj.datatype == 'img' || inputAttObj.caption == '' || inputAttObj.datatype == 'button' ) ) {
			var divLabel = '', divLabelId = '';
			divLabel = document.createElement( 'div' );
			$( targetObj ).append( divLabel );
			var divLabelObj	 = { id: {}, 'class' : 'group-label' };
			divLabelObj.id = divLabelId;
			fc_createAttr( divLabel, divLabelObj );

			fc_makeLabel( divLabel, inputAttObj );
		}; // end of if ( _datatype !== 'img' && _caption != '' )

		if ( inputAttObj.datatype != 'label' ) {
			var divEl = '', divElId = '';
			divEl = document.createElement( 'div' );
			$( targetObj ).append( divEl );
			var divElObj	 = { id: {}, 'class' : 'group-input' };
			divElObj.id = divElId;
			fc_createAttr( divEl, divElObj );

			fc_makeElement( targetObj, divEl, inputAttObj );
		};

		if ( _required  ) fc_setElementRequired ( [ _id ] );  // $( objectId ).addClass( window.gwClass.required );
		if ( _lowercase ) fc_setElementLowerCase( [ _id ] );  // $( objectId ).css( { 'text-transform': 'lowercase' } );
		if ( _uppercase ) fc_setElementUpperCase( [ _id ] );
		if ( !fc_isNull( _defval ) && inputAttObj.datatype !== 'button' ) {
			if ( inputAttObj.datatype !== 'number' )
				$( '#' + _id ).val( _defval );
			else
				fc_setInputVal( _id, _defval );
		};
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_createGroupElement
/**
 *
 * @param objList
 * @param iRows
 * @param iCols
 * @returns {Array}
 */
function fc_makeToMutilArray( objList, iRows, iCols ) {

	var arrObjct = new Array();
	for ( var rloop=0;rloop<iRows;rloop++ ) {
		var objIdx = rloop * iCols;
		var tmpArrObj = new Array();
		for ( var cloop=0;cloop<iCols;cloop++ ) {
			tmpArrObj[ cloop ] = objList[ objIdx + cloop ];
		};
		arrObjct[ arrObjct.length ] = tmpArrObj;
	};
	return arrObjct;
}; // enf of fc_makeToMutilArray
/**
 *
 * @param objList
 * @param iRows
 * @param iCols
 * @returns
 */
function fc_setFormTableMappingLabel( objList, iRows, iCols ) {
	var arrObjct = fc_makeToMutilArray( objList, iRows, iCols );
	var sSearchHearder = function( arr, row, col ) {
		var sResultLeftHeader = sSearchLeft( arr, row, col );
		var sResultUpHeader   = sSearchUp( arr, row, col );

		// priority Up
		if ( !fc_isNull(sResultLeftHeader) && !fc_isNull( sResultUpHeader ) ) {
			// left and right not empty
			if ( row>0 && col>0 ) {
				var upRow      = row - 1;
				var leftObj    = arr[ upRow ][ col-1 ];
				var currentObj = arr[ upRow ][ col   ];

				if ( leftObj.datatype == 'header' && leftObj.name == currentObj.name ) {
					return sResultLeftHeader;
				} else {
					return sResultLeftHeader + ',' +sResultUpHeader;
				};
			};
			return sResultUpHeader;
		} else {
			if ( !fc_isNull( sResultLeftHeader ) ) {
				return sResultLeftHeader;
			} else if( !fc_isNull( sResultUpHeader ) ) {
				return sResultUpHeader;
			};
		};
		return '';
	};
	var sSearchLeft = function( arr, row, col ) {
		for( var i=(col-1);i>=0;i-- ) {
			var oItem = arr[ row ][ i ];
			if( oItem.datatype == 'header' ) {
				return oItem.name;
			};
		};
	};
	var sSearchUp = function( arr, row, col ) {
		for( var i=(row-1);i>=0;i-- ) {
			var oItem = arr[ i ][ col ];
			if( oItem.datatype == 'header' ) {
				return oItem.name;
			};
		};
	};
	var tmpTabMap = new Array();
	for ( var i=0;i<arrObjct.length;i++ ) {
		var subTabMap = new Array();
		for ( var j=0;j<arrObjct[ i ].length;j++ ) {
			var oItem = arrObjct[ i ][ j ];
			if ( oItem.datatype != 'header' ) {
				if ( fc_isNull( oItem.labelname ) ) {
					oItem[ 'labelname' ] = sSearchHearder( arrObjct, i, j );
				};
				subTabMap[ subTabMap.length ] = oItem;
			} else {
				subTabMap[ subTabMap.length ] = oItem;
			};
			oItem = null;
		};
		tmpTabMap[ tmpTabMap.length ] = subTabMap;
	};
	var objListIndex = 0;
	for ( var i=0;i<tmpTabMap.length;i++ ) {
		for ( var j=0;j<tmpTabMap[ i ].length;j++ ) {
			objList[ objListIndex++ ] = tmpTabMap[ i ][ j ] ;
		};
	};
	return objList;
}; // end of fc_setFormTableMappingLabel
/**
 *
 * @param targetObj
 * @param elementObj
 * @param screenType
 */
function fc_createColElement( targetObj,  elementObj, screenType ) {
	try {
		var preMsg = '<b>Program Error: fc_createGroupElement</b><br><br>';
		var _domType = ( screenType == 'POPUP' ) ? 'popup_' : '';
		if ( fc_isNull( elementObj.name ) ) {
			throw new Error( preMsg + 'Element Name ' + window.gwMessage.validate.nodefined );
		};
		if ( fc_isNull( elementObj.datatype ) ) {
			throw new Error( preMsg + 'Element Datatype ' + window.gwMessage.validate.nodefined );
		};
		if ( typeof( targetObj ) !==  'object' )
			targetObj = $( '#' + targetObj );

		var _id = elementObj.name.toUpperCase();

		if (!fc_isNull(elementObj.align)) {
			elementObj.alignflag = true;
		};

		var inputAttObj =  {
				id         : _domType + elementObj.name.toUpperCase(),
				name       : elementObj.name.toUpperCase(),
				caption    : _id,
				width      : 100,
				height     : ( fc_isNull( elementObj.height ) ) ? 24 : elementObj.height, // 24
				datatype   : 'text',
				align      : 'left',
				readonly   : false,
				itemCd     : _id,
				itemValue  : 0,
				labelwidth : 0,
				labelalign : 'center',
				refName    : '',
				isFrom     : false,
				maxlength  : null,
				hidden     : false,
				required   : false,
				lowercase  : false,
				uppercase  : false,
				defval	   : null,
				addclass   : null,
				alignflag  : false,
				multilangflag   : true,
				isMultiLanguage : ( fc_isNull( elementObj.isMultiLanguage ) ) ? true : elementObj.isMultiLanguage
		};
		$.extend( inputAttObj, elementObj );

		var _hidden    = ( fc_isNull( elementObj.hidden    ) ) ? false : elementObj.hidden;
		var _required  = ( fc_isNull( elementObj.required  ) ) ? false : elementObj.required;
		var _lowercase = ( fc_isNull( elementObj.lowercase ) ) ? false : elementObj.lowercase;
		var _uppercase = ( fc_isNull( elementObj.uppercase ) ) ? false : elementObj.uppercase;
		var _defval    = ( fc_isNull( elementObj.defval    ) ) ? null  : elementObj.defval;
		var _addclass  = ( fc_isNull( elementObj.addclass  ) ) ? null  : elementObj.addclass;

		if ( inputAttObj.datatype == 'header' ) {
			fc_createTH( targetObj, inputAttObj );
		} else {
			fc_createTD( targetObj, inputAttObj );

			if ( _required  ) fc_setElementRequired ( [ _id ] );
			if ( _lowercase ) fc_setElementLowerCase( [ _id ] );
			if ( _uppercase ) fc_setElementUpperCase( [ _id ] );
			if ( !fc_isNull( _defval ) && inputAttObj.datatype !== 'button' ) {
				if ( inputAttObj.datatype !== 'number' )
					$( '#' + _id ).val( _defval );
				else
					fc_setInputVal( _id, _defval );
			};
			if ( !fc_isNull( _addclass ) && inputAttObj.datatype !== 'button' ) $( '#' + _id ).addClass( _addclass );

			// add attribute labename ( required field label )
			$( '#' + _id ).attr( 'labelname', elementObj.labelname );
		};

		if ( _hidden ) $( '#' + _id ).hide();
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_createColElement
/**
 *
 * @param prmObj
 * @param inputAttObj
 */
function fc_createTH( prmObj, inputAttObj ) {
	// 2018.2.22 getting from database
	window.gwMultiLang.isRunMain = false;
	try {
		var thEle =  document.createElement( 'th' );
		prmObj.appendChild( thEle );

		var labelEle =  document.createElement( 'div' );
		labelEle.appendChild( document.createTextNode( inputAttObj.caption ) );
		var labelObj = { name: '' };
		labelObj.name = inputAttObj.name;
		fc_createAttr( labelEle, labelObj );

		thEle.appendChild( labelEle );
		//---------------------------------------------------------------------
		if ( window.gwMesEnv.lang.isMultiLanguage && inputAttObj.isMultiLanguage ) {
			var thObj = new Object();
			if ( window.gwMultiLang.isRunMain ) {
				thEle.innerText = fc_getGwLangItem( fc_isNull( inputAttObj.itemCd    ) ? inputAttObj.id : inputAttObj.itemCd
						                          , fc_isNull( inputAttObj.itemValue ) ? 0 : inputAttObj.itemValue
						                          , inputAttObj.caption );
			} else {
				thObj[ 'class' ] = window.gwClass.multilanguage;
				thObj[ window.gwMesEnv.item.itemcd    ] = fc_isNull( inputAttObj.itemCd    ) ? inputAttObj.id : inputAttObj.itemCd;
				thObj[ window.gwMesEnv.item.itemvalue ] = fc_isNull( inputAttObj.itemValue ) ? 0 : inputAttObj.itemValue;
				fc_setLangId( thObj[ window.gwMesEnv.item.itemcd ], thObj[ window.gwMesEnv.item.itemvalue ] );
			};
			if ( inputAttObj.width > 0 ) thObj[ 'width' ] = inputAttObj.width;
			fc_createAttr( thEle, thObj );
			$( thEle ).addClass( 'form-th' );
		}; // end of if ( window.gwMesEnv.lang.isMultiLanguage )

		if ( inputAttObj.datatype == 'header' ) {
			$( thEle ).addClass( inputAttObj.addclass );
		};
		$( thEle ).css( 'text-align', inputAttObj.labelAlign );

	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_createTH
/**
 *
 * @param prmObj
 * @param inputAttObj
 */
function fc_createTD( prmObj, inputAttObj ) {
	try {
		var tdEl = '';
		tdEl = document.createElement( 'td' );
		prmObj.appendChild( tdEl );
		var tdElObj	 = { 'class' : 'form-td' };
		fc_createAttr( tdEl, tdElObj );

		$( tdEl ).addClass( inputAttObj.addclass );
		fc_makeElement( prmObj, tdEl, inputAttObj );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_createTD
/**
 *
 * @param tableId
 * @param colIdx
 */
function fc_setHeaderRowSpanByIndex ( tableId, colIdx ) {
	try {
		$( '#' + tableId ).rowspan( colIdx );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_setHeaderRowSpanByIndex
/**
 *
 * @param tableId
 * @param rowIdx
 */
function fc_setHeaderColSpanByIndex ( tableId, rowIdx ) {
	try {
		$( '#' + tableId ).colspan( rowIdx );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_setHeaderColSpanByIndex
/**
 * rowspan
 * Using : $('#Table ID').rowspan(0);
 */
$.fn.rowspan = function( colIdx, isStats ) {
	try {
	    return this.each( function() {
			var that;
			$( 'tr', this ).each( function( row ) {
				var thidx = colIdx;
				if ( $( that, this ).index() > 0 ) {
					thidx = $( that, this ).index();
				};

				$( this ).children().eq( thidx ).filter( ':visible' ).each( function( col ) {
					if ( $( this ).html() == $( that ).html() && ( !isStats || isStats && $( this ).prev().html() == $( that ).prev().html() ) ) {
						rowspan = $( that ).attr( 'rowspan' ) || 1;
						rowspan = Number( rowspan ) + 1;

						$( that ).attr( 'rowspan', rowspan );
						// do your action for the colspan cell here
						$( this ).hide();
					} else {
						that = this;
					};
					that = ( that == null ) ? this : that;
				});
			});
		});
	} catch ( e ) {
		fc_getException( e );
	};
};
/**
 * colspan
 * Using : $('#Table ID').colspan (0);
 */
$.fn.colspan = function( rowIdx ) {
	try {
		return this.each( function () {
			var that;
			$( 'tr', this ).filter( ':eq(' + rowIdx + ')' ).each( function( row ) {
				$( this ).find( 'th' ).each( function ( col ) {
					if ( $( this ).html() == $( that ).html()) {
						colspan = $( that ).attr( 'colSpan' ) || 1;
						colspan = Number( colspan ) + 1;

						$( that ).attr( 'colSpan', colspan );
						$( this ).hide(); // .remove();
					} else {
						that = this;
					};
					that = ( that == null ) ? this : that;
				});
			});
		});
	} catch ( e ) {
		fc_getException( e );
	};
};
/**
 * row Merge
 * Using : $('#Table ID').rowspan(0);
 */
$.fn.rowmerge = function( colId, mergeIdx, isStats ) {
	try {
		return this.each( function() {
			var rowIdx = $( '#' + colId ).closest( 'tr' ).index();
			var colIdx = $( '#'+ colId , this ).parent().index();
			var mergeCnt = 1;
			var that;
			$( 'tr', this ).each( function ( row ) {
				$( this ).children().eq( colIdx ).each( function( col ) {
					if ( row > rowIdx ) {
						if ( mergeCnt < mergeIdx ) {
							rowspan = $( that ).attr( 'rowspan' ) || 1;
							rowspan = Number( rowspan ) + 1;

							$( that ).attr( 'rowspan', rowspan );
							$( this ).hide();
							$( this ).children().remove();
						};
					} else {
						that = this;
					};
				});

				if ( row > rowIdx )	mergeCnt++;
			});
	    });
	} catch ( e ) {
		fc_getException( e );
	};
};
/**
 * colspan Merge
 * Using : $('#Table ID').colmerge('ColID', 2);
 */
$.fn.colmerge =  function( colId, mergeIdx ) {
	try {
		return this.each( function() {
			var rowIdx = $( '#' + colId ).closest( 'tr' ).index();
			var colIdx = $( '#' + colId, this ).parent().index();
			var that;
			$( 'tr', this ).filter( ':eq(' + rowIdx + ')' ).each( function( row ) {
				var mergeCnt = 1;
				$( this ).children().each( function( col ) {
					if ( col > colIdx ) {
						if ( mergeCnt < mergeIdx ) {
							colspan = $( that ).attr( 'colSpan' ) || 1;
							colspan = Number( colspan ) + 1;

							$( that ).attr( 'colSpan', colspan );
							$( this ).hide();
							$( this ).children().remove();
							mergeCnt++;
						};
					} else {
						that = this;
					};
				});
			});
		});
	} catch ( e ) {
		fc_getException( e );
	};
};
/**
 *
 * @param tableId
 * @param arrColIdx
 */
function fc_hideTableColumn( tableId, arrColIdx ) {
	$.each( arrColIdx, function( index, item ) {
		$( '#' + tableId ).setHideCol( item );
	})
}; // end of fc_hideTableColumn
/**
 *
 * @param tableId
 * @param arrColIdx
 */
function fc_showTableColumn ( tableId, arrColIdx ) {
	$.each( arrColIdx, function( index, item ) {
		$( '#' + tableId ).setShowCol( item );
	})
}; // end of fc_showTableColumn
/**
 *
 */
$.fn.setHideCol =  function( colIdx ) {
	$( 'tr th:nth-child(' + colIdx + '), tr td:nth-child(' + colIdx + ')', this ).hide();
};
/**
 *
 */
$.fn.setShowCol =  function( colIdx ) {
	$( 'tr th:nth-child(' + colIdx + '), tr td:nth-child(' + colIdx + ')', this ).show();
};
/**
 * colspan Merge
 * Using : $('#Table ID').colmerge('ColID', 2);
 * GridTypeTable, header-Data only
 */
$.fn.getTableData =  function() {
	try {
		var arrData    = new Array();
		var rowspanObj = new Object();
		var rowObj     = new Object();
		var firstrow   = true;
		var rowidx     = 0;
		$( 'tr', this ).each( function( row ) {
			var rowData = new Object();
			$( this ).children().filter( 'td.form-td' ).each( function( index ) {
				var inputEl = $(this).find( 'input.formValueCheck' );
				var _id = inputEl.attr( 'id' );
				if ( firstrow ) {
					rowObj[ index ] = $( this ).find( 'input.formValueCheck' ).attr( 'id' );
				};

				if ( !fc_isNull( $( this ).attr( 'rowSpan' ) ) ) {
					rowspanObj[ index ] = { rowIdx: rowidx, rowspanNum: $( this ).attr( 'rowSpan' ), value: inputEl.val(), id: _id };
				};
				if ( inputEl.length == 0 ) {
					rowData[ rowObj[ index ] ] = rowspanObj[ index ].value;
				} else {
					rowData[ rowObj[ index ] ] = inputEl.val();
				};
			});
			if ( firstrow && !$.isEmptyObject( rowObj ) ) firstrow = false;

			if ( !$.isEmptyObject( rowData ) ) {
				arrData.push( rowData );
				rowidx++;
			};
		});
		return arrData;
	} catch ( e ) {
		fc_getException( e );
	};
};
/**
 *
 * @param inputId
 * @param option
 */
function fc_setFormCheckbox( inputId, option ) {
	try {
		$( '#' + inputId ).jqxCheckBox({
			width  : option.width,
			height : option.height,
			theme  : window.gwMesEnv.themes
		});
	} catch ( e ) {
		fc_getException( e );
	};
}; // End of fc_setFormCheckbox
/**
 * @param inputId
 * @param option
 */
function fc_setFormInput( inputId, option ) {
	try {
		var inputSource = {
				width  : option.width,
				height : option.height,
				theme  : window.gwMesEnv.themes
		};
		if ( !fc_isNull( option.maxlength ) ) {
			inputSource.maxLength  = option.maxlength;
		};
		if ( typeof inputId  == 'object' ) {
			$( inputId ).jqxInput( inputSource );
		} else {
			$( '#' + inputId ).jqxInput( inputSource );
		}
	} catch ( e ) {
		fc_getException( e );
	};
}; // End of fc_setFormInput
/**
 *
 * @param textareaId
 * @param option
 */
function fc_setFormTextArea( textareaId, option ) {
	try {
		$( '#' + textareaId ).jqxTextArea({
			width  : '100%',
			height : option.height,
			theme  : window.gwMesEnv.themes
		});
	} catch ( e ) {
		fc_getException( e );
	};
}; // End of fc_setFormTextArea
/**
 *
 * @param numberId
 * @param option
 */
function fc_setFormNumberInput ( numberId, option ) {
	try {
		var nDecimalDigits = fc_isNull( option.decimalDigits ) ? null : option.decimalDigits;
		$( '#' + numberId ).number( true
				                  , nDecimalDigits
				                  , window.gwMesEnv.format.separate.target.decimal
				                  , ( ( option.datatype == 'integer' ) ? '' : window.gwMesEnv.format.separate.target.thousand )
		                          );
		$( '#' + numberId ).css( 'text-align', option.align );
		$( '#' + numberId ).addClass( 'jqx-input');
		$( '#' + numberId ).width( option.width );
		$( '#' + numberId ).attr( 'integers', option.integers );
		if ( !fc_isNull( option.minvalue ) ) $( '#' + numberId ).attr( 'minvalue', option.minvalue );
		if ( !fc_isNull( option.maxvalue ) ) $( '#' + numberId ).attr( 'maxvalue', option.maxvalue );
	} catch ( e ) {
		fc_getException( e );
	};
}; // End of fc_setFormNumberInput
/**
 *
 * @param dateInputId
 * @param option
 */
function fc_setFormDateTime( dateInputId, option ) {
	try {
		var isFrom	= option.isFrom;
		var strFormatString = option.formatString;

		$( '#' + dateInputId ).jqxDateTimeInput({
			width  : option.width,
			height : option.height,
			formatString : option.formatString,
			theme : window.gwMesEnv.themes,
			allowKeyboardDelete: true,
			culture: window.gwMesEnv.lang.datepicker,
			textAlign: option.align,
			enableBrowserBoundsDetection:true,

			showCalendarButton: option.showCalendarBtn,
			showTimeButton: option.showTimeBtn
		});

		$( '#' + dateInputId ).jqxDateTimeInput( 'setDate', null );

		if ( !fc_isNull( option.refName ) && !isFrom ) {
			var objFr = $( '#' + option.refName );
			var objTo = $( '#' + dateInputId );

			objFr.on( 'change', function ( event ) {
				var valFr = objFr.jqxDateTimeInput( 'getDate' );
				var valTo = objTo.jqxDateTimeInput( 'getDate' );

				if ( valFr > valTo ) {
					objTo.jqxDateTimeInput( 'setDate', valFr );
				};
				objTo.jqxDateTimeInput( 'setMinDate', valFr );
			});
		};
	} catch ( e ) {
		fc_getException( e );
	};
}; // End of fc_setFormDateTime
/**
 *
 * @param editId
 * @param option
 */
function fc_setFormEditor( editId, option ) {
	try {
		$( '#' + editId ).jqxEditor({
			width  : '100%',
			height : option.height,
			theme  : window.gwMesEnv.themes,
			tools  : ''
		});
	} catch ( e ) {
		fc_getException( e );
	};
}; // End of fc_setFormEditor
/**
 *
 * @param editId
 * @param option
 */
function fc_setFormDropdownList( editId, option ) {
	try {
		$( '#' + editId ).jqxDropDownList({
			theme: window.gwMesEnv.themes,
			autoDropDownHeight: false,
			source: [],
			displayMember: 'CD_NM',
			valueMember: 'CD_VAL',
			width: option.width,
			height: option.height,
			checkboxes: option.checkboxFlag,
			enableBrowserBoundsDetection: true,
			placeHolder: ''
		});
	} catch ( e ) {
		fc_getException( e );
	};
}; // End of fc_setFormCombobox
/**
 *
 * @param editId
 * @param option
 */
function fc_setFormCombobox( editId, option ) {
	try {
		$( '#' + editId ).jqxComboBox({
			theme: window.gwMesEnv.themes,
			autoDropDownHeight: false,
			source: [],
			displayMember: 'CD_NM',
			valueMember: 'CD_VAL',
			width: option.width,
			height: option.height,
			enableBrowserBoundsDetection: true,
			placeHolder: ''
		});

		var inputEl = $( '#' + editId ).find( 'input.jqx-combobox-input' );

		if ( inputEl.length != 0 ) {
			inputEl.css( 'text-align', option.align );
			if ( !fc_isNull( option.maxlength ) ) {
				inputEl.attr( 'maxlangth', option.maxlength );
			};
		};
	} catch ( e ) {
		fc_getException( e );
	};
}; // End of fc_setFormCombobox
/**
 *
 * @param editId
 * @param arrObj
 * @param listCount
 */
function fc_setFormDropdownListData( editId, arrObj, listCount ) {
	try {
		var lovSource = {
			datatype: 'array',
			datafields: [
				{ name: 'CD_NM' , type: 'string' },
				{ name: 'CD_VAL', type: 'string' }
			],
			localdata: arrObj
		};
		var lovAdapter = new $.jqx.dataAdapter( lovSource, { autoBind: true } );
		var heightSize = arrObj.length * 24 + 5;
		if ( !fc_isNull( listCount ) ) {
			heightSize = listCount * 24 + 5;
		};
		if ( heightSize > 250 ) {
			heightSize = 250;
		};
		$( '#' + editId ).jqxDropDownList( {
			autoDropDownHeight: false,
			source: lovAdapter,
			displayMember: 'CD_NM',
			valueMember  : 'CD_VAL',
			dropDownHeight: heightSize,
			enableBrowserBoundsDetection: true
		});
		fc_setDropDownListBoxWidth( $( '#' + editId ) );

		var checkboxes = $( '#' + editId ).jqxDropDownList( 'checkboxes' );

		if ( checkboxes ) {
			$( '#' + editId ).jqxDropDownList( 'checkIndex', 0 );
		} else {
			$( '#' + editId ).jqxDropDownList( 'selectedIndex', 0 );
		};
	} catch ( e ) {
		fc_getException( e );
	};
}; // End of fc_setFormCombobox
/**
 *
 * @param editId
 * @param arrObj
 * @param listCount
 */
function fc_setFormComboboxData( editId, arrObj, listCount ) {
	try {
		var lovSource = {
		datatype: 'array',
		datafields: [
			{ name: 'CD_NM' , type: 'string' },
			{ name: 'CD_VAL', type: 'string' }
		],
		localdata: arrObj
		};
		var lovAdapter = new $.jqx.dataAdapter( lovSource, { autoBind: true } );
		var heightSize = arrObj.length * 24 + 5;

		if ( !fc_isNull( listCount ) ) {
			heightSize = listCount * 24 + 5;
		};
		if ( heightSize > 250 ) {
			heightSize = 250;
		};
		$( '#' + editId ).jqxComboBox( {
			autoDropDownHeight: false,
			source: lovAdapter,
			displayMember : 'CD_NM',
			valueMember   : 'CD_VAL',
			dropDownHeight: heightSize,
			enableBrowserBoundsDetection: true
		});

		fc_setComboListBoxWidth( $( '#' + editId ) );
		$( '#' + editId ).jqxComboBox( 'selectedIndex', 0 );
	} catch ( e ) {
		fc_getException( e );
	};
}; // End of fc_setFormCombobox
/**
 *
 * @param itemList
 * @returns
 */
function fc_getMaxItemLength( itemList ) {
	var spanObj = document.createElement( 'span' );
	$( 'body' ).append( spanObj );
	var maxLength = 0;
	$.each( itemList, function( index, items ) {
		$( spanObj ).text( items.label );
		if ( $( spanObj )[ 0 ].offsetWidth > maxLength ) {
		  maxLength = $( spanObj )[ 0 ].offsetWidth;
		};
	});
	$( spanObj ).remove();
	return maxLength + parseInt( window.gwMesEnv.screen.listboxval );
}; // End of fc_getMaxItemLength
/**
 *
 * @param editObj
 */
function fc_setComboListBoxWidth( editObj ) {
	var dropdownitems = editObj.jqxComboBox( 'listBox' ).visibleItems;
	var dropdownMexWidth = fc_getMaxItemLength( dropdownitems );
	var width = editObj.jqxComboBox( 'width' );

	if ( dropdownMexWidth > width && dropdownMexWidth < window.gwMesEnv.screen.listboxmaxlen ) {
		editObj.jqxComboBox( { dropDownWidth: dropdownMexWidth } );
	} else if ( dropdownMexWidth > window.gwMesEnv.screen.listboxmaxlen ) {
		editObj.jqxComboBox(  { dropDownWidth: window.gwMesEnv.screen.listboxmaxlen } );
	} else {
		editObj.jqxComboBox( { dropDownWidth: 'auto' } );
	};
}; // end of fc_setComboListBoxWidth
/**
 *
 * @param editObj
 */
function fc_setDropDownListBoxWidth( editObj ) {
	var dropdownitems = editObj.jqxDropDownList( 'listBox' ).visibleItems;
	var dropdownMexWidth = fc_getMaxItemLength( dropdownitems );
	var width = editObj.jqxDropDownList( 'width' );

	if ( dropdownMexWidth > width && dropdownMexWidth < window.gwMesEnv.screen.listboxmaxlen ) {
		editObj.jqxDropDownList( { dropDownWidth: dropdownMexWidth } );
	} else if ( dropdownMexWidth > window.gwMesEnv.screen.listboxmaxlen ) {
		editObj.jqxDropDownList( { dropDownWidth: window.gwMesEnv.screen.listboxmaxlen } );
	} else {
		editObj.jqxDropDownList( { dropDownWidth: 'auto' } );
	};
}; // end of fc_setComboListBoxWidth

/* -----------------------------------------------------------------------------
* @Name				fc_setFormlovEditable
* @Description
* @Parameter
* @Returns
* @Example
* ---------------------------------------------------------------------------*/
function fc_setFormlovEditable( editId , editFlag ) {
	try {
		var datatype = $( '#' + editId ).attr( 'datatype' );

		if ( datatype == 'cbolov' ) {
			$( '#' + editId ).jqxComboBox( { disabled: !editFlag } );
		} else {
			$( '#' + editId ).jqxDropDownList( { disabled: !editFlag } );
		};
	} catch ( e ) {
		fc_getException( e );
	};
}; // End of fc_setFormlovDisable
/**
 *
 * @param targetId
 * @param event
 * @param callback
 */
function fc_setFormBindEvent( targetId, event, callback ) {
	try {
		var catagory = $( '#' + targetId ).attr( 'category' );
		var isRadio  = $( '#' + targetId ).hasClass( 'form-radio' );

		if ( catagory == 'radio' && isRadio ) {
			var checkboxes = $( '#' + targetId ).find( '.jqx-radiobutton' );
			$.each( checkboxes, function () {
				$( this ).bind( event, callback );
			});
		} else {
			$( '#' + targetId ).bind( event, callback );
		};
	} catch ( e ) {
		fc_getException( e );
	};
}; // End of fc_setFormBindEvent
/**
 *
 * @param targetId
 * @param event
 */
function fc_setFormUnBindEvent( targetId, event ) {
	try {
		var catagory = $( '#' + targetId ).attr( 'category' );
		var isRadio  = $( '#' + targetId ).hasClass( 'form-radio' );

		if ( catagory == 'radio' && isRadio ) {
			var checkboxes = $( '#' + targetId ).find( '.jqx-radiobutton' );
			$.each( checkboxes, function () {
				$( this ).unbind( event );
			});
		} else {
			$( '#' + targetId ).unbind( event );
		};
	} catch ( e ) {
		fc_getException( e );
	};
}; // End of fc_setFormUnBindEvent
/**
 *
 * @param targetId
 * @param value
 */
function fc_setInputVal( targetId, value ) {
	try {
		var catagory = $( '#' + targetId ).attr( 'category' );
		if ( catagory === 'date' && typeof value === 'date' ) {
			$( '#' + targetId ).jqxDateTimeInput( 'setDate', value );
		} else if ( catagory === 'date' && typeof value === 'string' && !fc_isNull( value ) ) {
			var _value = null;
			try {
				_value = new Date( value );
				if( _value == 'NaN' ) {
					fc_showLog( 3, '[ERROR] :: fc_setInputVal :: ' , 'orginal parameter :: ' , value , ' after new Date Value ', _value );
					_value = null;
				};
			} catch ( e ) {
				fc_showLog( 3, '[ERROR] :: fc_setInputVal :: ' , 'orginal parameter :: ' , value , ' after new Date Value ', _value );
				_value = null;
			};
			if ( !fc_isNull( _value ) ) {
				$( '#' + targetId ).jqxDateTimeInput( 'setDate', _value );
			};
		} else if ( catagory === 'date' && fc_isNull( value ) ) {
			$( '#' + targetId ).jqxDateTimeInput( 'setDate', null );
		} else if ( catagory == 'radio' ) {
			var setButtonValue = function( radioObjId, sValue ) {
				var pObj =  $( '#' + radioObjId ).find( '[name="RDO_' + radioObjId + '"]' );
				var chkIdx = 0;
				$.each( pObj, function( key, objData ) {
					if ( objData.attributes.value.value == sValue ) {
						return chkIdx = key;
					};
				});

				if ( fc_isNull( value ) ) {
					$( '#' + radioObjId ).jqxButtonGroup( 'clearSelection' );
				} else {
					$( '#' + radioObjId ).jqxButtonGroup( 'setSelection', chkIdx );
				};
			};
			var setRadioValue = function( radioObjId, sValue ) {
				var checkboxes = $( '#' + radioObjId ).find( '.jqx-radiobutton' );
				$.each(checkboxes, function () {
					var obj = $( this ).jqxRadioButton( 'getInstance' );
					var rtnData = obj.getreturnval();
					if ( sValue == rtnData ) {
						$( this ).jqxRadioButton( { checked: true } );
					};
				});
			};
			if ( $( '#' + targetId ).hasClass( 'form-radio' ) ) {
				setRadioValue( targetId, value );
			} else {
				setButtonValue( targetId, value );
			};
		} else if ( catagory == 'number' ) {
			var nDecimalDigits = fc_isNull( $( '#' + targetId ).attr( 'decimaldigits' ) ) ? 0 : $( '#' + targetId ).attr( 'decimaldigits' );
			if ( !fc_isNull( value ) && value.toString().indexOf( '.' ) > -1 && nDecimalDigits == 0 ) {
				var i;
				var strTmpVal = value.toString();
				nDecimalDigits = strTmpVal.substring( strTmpVal.indexOf( window.gwMesEnv.format.separate.source.decimal ) + 1 ).length;

				$( '#' + targetId ).number( true
										  , nDecimalDigits
										  , window.gwMesEnv.format.separate.target.decimal
										  , window.gwMesEnv.format.separate.target.thousand
										  ) ;
			};
			$( '#' + targetId ).val( value );

			if ( fc_isNull( value ) && value !== undefined ) {
				var keyBackspace = jQuery.Event( 'keydown', {keyCode: 8} );
				var tmpReadonly = $( '#' + targetId ).attr( 'readonly' );
				var isReadonly = false;

				if ( !fc_isNull( tmpReadonly ) && ( tmpReadonly.toLowerCase() == 'readonly' || tmpReadonly == true ) ) {
					$( '#' + targetId ).attr( 'readonly', false );
					isReadonly = true;
				};
				$( '#' + targetId ).select();
				$( '#' + targetId ).trigger( keyBackspace );

				if ( isReadonly ) {
					$( '#' + targetId ).attr( 'readonly', true );
					$( '#' + targetId ).addClass( window.gwClass.readonly );
				} else {
					$( '#' + targetId ).removeClass( window.gwClass.readonly );
				};
			};
		} else {
			$( '#' + targetId ).val( value );
		};
		if ( !fc_isNull( value ) )
			$( '#' + targetId ).attr( 'title', String( value ) );
		else
			$( '#' + targetId ).attr( 'title', '' );
	} catch ( e ) {
		fc_getException( e );
	};
}; // End of fc_getInputVal
/**
 *
 * @param targetId
 * @param flag
 */
function fc_setReadOnly( targetId, flag ) {
	try {
		var category = $( '#' + targetId ).attr( 'category' );
		var datatype = $( '#' + targetId ).attr( 'datatype' );
		if ( category == 'date' ) {
			if ( datatype == 'date' || datatype == 'yearmonth' || datatype == 'monthday' || datatype == 'datetd') {
				if ( flag ) {
					$( '#' + targetId ).jqxDateTimeInput( { disabled: true, showCalendarButton: false, showTimeButton: false} );
				} else {
					$( '#' + targetId ).jqxDateTimeInput( { disabled: false, showCalendarButton: true, showTimeButton: false} );
				};
			} else if ( datatype == 'hour' || datatype == 'hourmin' || datatype == 'minsec' || datatype == 'time') {
				if ( flag ) {
					$( '#' + targetId ).jqxDateTimeInput( { disabled: true, showCalendarButton: false, showTimeButton: false} );
				} else {
					$( '#' + targetId ).jqxDateTimeInput( { disabled: false, showCalendarButton: false, showTimeButton: true} );
				};
			} else {
				$( '#' + targetId ).jqxDateTimeInput( { disabled: flag, showCalendarButton: !flag, showTimeButton: !flag} );
			};
		} else if ( category == 'textarea' ) {
			$( '#' + targetId ).jqxTextArea( { disabled: flag } );
		} else if ( category == 'editor' ) {
			$( '#' + targetId ).jqxEditor( { editable: !flag } );
		} else if ( category == 'radio' )  {
			 $( '#' + targetId ).attr( 'custom-readonly', flag ) ;
		} else if ( category == 'select' ) {
			if ( datatype == 'cbolov' ) {
				$( '#' + targetId ).jqxComboBox( { disabled: flag } );
			} else if ( datatype == 'chklov' || datatype == 'lov' ) {
				$( '#' + targetId ).jqxDropDownList( { disabled: flag } );
			};
		} else if ( category == 'popup' ) {
			$( '#' + targetId ).jqxInput( { disabled: flag } );
		} else if ( category == 'checkbox' ) {
			$( '#' + targetId ).jqxCheckBox( { disabled: flag } );
		} else {
			$( '#' + targetId ).attr( 'readonly', flag );
		};
		if ( flag ) $( '#' + targetId ).addClass( window.gwClass.readonly );
		else $( '#' + targetId ).removeClass( window.gwClass.readonly );
	} catch ( e ) {
		fc_getException( e );
	};
}; // End of fc_setReadOnly
/**
 *
 * @param targetId : Target Object Id
 * @param isHide     : Boolean true/false
 */
function fc_setHideElement( arrTargetId, isHide ) {
	if ( isHide ) {
		for ( var iLoop=0;iLoop<arrTargetId.length;iLoop++ ) {
			$( '#divGrp_' + arrTargetId[ iLoop ] ).hide();
		};
	} else {
		for ( var iLoop=0;iLoop<arrTargetId.length;iLoop++ ) {
			$( '#divGrp_' + arrTargetId[ iLoop ] ).show();
		};
	};
}; // end of fc_setHideElement
/**
 *
 * @param arrTargetId
 * @param isHide
 */
function fc_setHideDomElement( arrTargetId, isHide ) {
	if ( isHide ) {
		for ( var iLoop=0;iLoop<arrTargetId.length;iLoop++ ) {
			$( '#divCol_' + arrTargetId[ iLoop ] ).hide();
		};
	} else {
		for ( var iLoop=0;iLoop<arrTargetId.length;iLoop++ ) {
			$( '#divCol_' + arrTargetId[ iLoop ] ).show();
		};
	};
}; // end of fc_setHideDomElement
/**
 *
 * @param targetId
 * @returns
 */
function fc_getInputVal( targetId ) {
	try {
		return $( '#' + targetId ).val();
	} catch ( e ) {
		fc_getException( e );
	};
}; // End of fc_getInputVal
/**
 *
 * @param targetId
 * @returns
 */
function fc_getDateInputVal( targetId ) {
	try {
		var category = $( '#' + targetId ).attr( 'category' );
		if ( category == 'date' ) {
			return $( '#' + targetId ).jqxDateTimeInput( 'getDate' );
		};
		return false;
	} catch ( e ) {
		fc_getException( e );
	};
}; // End of fc_getInputVal
/**
 *
 * @param targetId
 * @returns
 */
function fc_getLabelText( targetId ) {
	try {
		return $( '#' + targetId ).text();
	} catch ( e ) {
		fc_getException( e );
	};
}; // End of fc_getLabelText
function fc_setLabelText( targetId, sText ) {
	try {
		$( '#' + targetId ).text( sText );
	} catch ( e ) {
		fc_getException( e );
	};
}; // End of fc_setLabelText
/**
 *
 * @param radioObjId
 * @returns
 */
function fc_getRadioVal( radioObjId ) {
	var pObj =  $( '#' + radioObjId );
	var rtnData = '';
	if ( $( '#' + radioObjId ).hasClass( 'form-radio' ) ) {
		var checkboxes = $( '#' + radioObjId ).find( '.jqx-radiobutton' );
        $.each( checkboxes, function () {
        	var checked = $( this ).jqxRadioButton( 'checked' );
        	if ( checked ) {
        		var obj = $( this ).jqxRadioButton( 'getInstance' );
        		rtnData = obj.getreturnval();
        	};
        });
	} else {
		var chooseObj = pObj.children()[ pObj.jqxButtonGroup( 'getSelection' ) ];
		if( !fc_isNull( chooseObj ) ) {
			rtnData =  $( '#' + radioObjId + ' ' + '#' + chooseObj.id ).attr( 'value' );
		};
	};
	return rtnData;
}; // end of fc_getRadioVal
/**
 *
 * @param grpId
 * @param dataObjId
 * @returns {String}
 */
function fc_getTableHeaderText( grpId, dataObjId ) {
	var labelName = fc_setValue( $( '#' + grpId + ' #' + dataObjId ).attr( 'labelname' ), '' );
	if ( fc_isNull( labelName ) ) return '';

	var arrLabeName = labelName.split( ',' );
	var rtnHeaderText = '';
	$.each( arrLabeName, function( key, sName ) {
		var sText = $( '#' + grpId ).find( 'div[name="' + sName + '"]' ).not( ':hidden' ).text();
		if ( rtnHeaderText.length > 0 ) {
			rtnHeaderText += ' [' + sText + ']';
		} else {
			rtnHeaderText += sText;
		};
	});
	return rtnHeaderText
}; // end of fc_getTableHeaderText
/**
 *
 * @param beforeTargetId
 * @param sourceElementId
 */
function fc_moveElementBefore( beforeTargetId, sourceElementId ) {
	$( '#' + beforeTargetId ).before( $( '#' + sourceElementId ) );
}; // end of fc_moveElementBefore
/**
 *
 * @param nextTargetId
 * @param sourceElementId
 */
function fc_moveElementNext( nextTargetId, sourceElementId ) {
	$( '#' + nextTargetId ).after( $( '#' + sourceElementId ) );
}; // end of fc_moveElementNext