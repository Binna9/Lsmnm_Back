/**
 * Declare variable
 */

/**
 * Declare Initial JS Function
 */
$( function() {
	fc_showLog( 1, '***** jQuery Form Util');
}); // end of $( function () )
/**
 *
 * @param targetObj : Target Element Object
 * @param parObj : Parent Element Object ( appendChild )
 * @param elementObj : Element Object Property Value Object
 */
function fc_makeElement( targetObj, parObj, elementObj ) {
	// 2018.2.22 getting from database
	window.gwMultiLang.isRunMain = false;

	try {
		var eleName		  = 'input';
		var attrObj		  = new Object; // { id: {}, name: {}, type: {}, datatype: {}, style: {}, category: {} };
		attrObj[ 'type' ] = 'text';
		attrObj[ 'id' 	] = elementObj.id;
		attrObj[ 'name' ] = elementObj.name;
		attrObj[ window.gwMesEnv.item.datatype ] = elementObj.datatype;

		switch ( elementObj.datatype ) {
			case 'text' 		: eleName = 'input'   ; attrObj.category = 'text'    ; break;
			case 'texttd' 		: eleName = 'input'   ; attrObj.category = 'text'    ; break;
			case 'button' 		: eleName = 'button'  ; attrObj.category = 'button'	 ; attrObj.type = ''; break;
			case 'lov'	 		: eleName = 'div'	  ; attrObj.category = 'select'	 ; break;
			case 'chklov'	 	: eleName = 'div'	  ; attrObj.category = 'select'	 ; break;
			case 'cbolov'	 	: eleName = 'div'	  ; attrObj.category = 'select'	 ; break;
			case 'radio'	 	: eleName = 'div'     ; attrObj.category = 'radio'	 ; attrObj.type = '';  attrObj[ 'name' ] = ''; break;
			case 'checkbox'	 	: eleName = 'div'	  ; attrObj.category = 'checkbox'; attrObj.type = 'checkbox';  break;
			case 'password'	 	: eleName = 'input'   ; attrObj.category = 'password'; attrObj.type = 'password';  break;
			case 'passwordtd' 	: eleName = 'input'   ; attrObj.category = 'password'; attrObj.type = 'password';  break;
			case 'yearmonth' 	: eleName = 'div'	  ; attrObj.category = 'date'	 ; break;
			case 'monthday' 	: eleName = 'div'	  ; attrObj.category = 'date'	 ; break;
			case 'date' 		: eleName = 'div'	  ; attrObj.category = 'date'	 ; break;
			case 'datetd' 		: eleName = 'div'	  ; attrObj.category = 'date'	 ; break;
			case 'datehour' 	: eleName = 'div'	  ; attrObj.category = 'date'	 ; break;
			case 'datemin' 		: eleName = 'div'	  ; attrObj.category = 'date'	 ; break;
			case 'datetime' 	: eleName = 'div'	  ; attrObj.category = 'date'	 ; break;
			case 'hour' 		: eleName = 'div'	  ; attrObj.category = 'date'	 ; break;
			case 'hourmin' 		: eleName = 'div'	  ; attrObj.category = 'date'	 ; break;
			case 'minsec' 		: eleName = 'div'	  ; attrObj.category = 'date'	 ; break;
			case 'time' 		: eleName = 'div'	  ; attrObj.category = 'date'	 ; break;
			case 'integer' 		: eleName = 'input'   ; attrObj.category = 'number'	 ; attrObj.decimalDigits = 0; break;
			case 'number' 		: eleName = 'input'   ; attrObj.category = 'number'	 ; break;
			case 'number0' 		: eleName = 'input'   ; attrObj.category = 'number'	 ; attrObj.decimalDigits = 0; break;
			case 'number1' 		: eleName = 'input'   ; attrObj.category = 'number'	 ; attrObj.decimalDigits = 1; break;
			case 'number2' 		: eleName = 'input'   ; attrObj.category = 'number'	 ; attrObj.decimalDigits = 2; break;
			case 'number3' 		: eleName = 'input'   ; attrObj.category = 'number'	 ; attrObj.decimalDigits = 3; break;
			case 'number4' 		: eleName = 'input'   ; attrObj.category = 'number'	 ; attrObj.decimalDigits = 4; break;
			case 'number5' 		: eleName = 'input'   ; attrObj.category = 'number'	 ; attrObj.decimalDigits = 5; break;
			case 'IMG'		 	: eleName = 'img'	  ; attrObj.category = 'image'	 ; break;
			case 'label'		: eleName = 'label'   ; attrObj.category = 'text'	 ; break;
			case 'popup'		: eleName = 'div'	  ; attrObj.category = 'popup'	 ; break;
			case 'custpopup'	: eleName = 'div'	  ; attrObj.category = 'popup'	 ; break;
			case 'textarea'		: eleName = 'textarea'; attrObj.category = 'textarea'; break;
			case 'editor'		: eleName = 'textarea'; attrObj.category = 'editor'  ; break;
			default 			: eleName = 'label'   ; attrObj.category = 'text'    ; attrObj.style = 'width:' + elementObj.labelWth + '%;text-align: ' +elementObj.labelAlign+';'  ; break;
		}; // end of switch ( _datatype )

		// create element & attribute
		var inputEle = document.createElement( eleName );
		fc_createAttr( inputEle, attrObj );

		$( inputEle ).css( 'text-align', elementObj.align );

		// append on
		if ( !fc_isNull( parObj ) )
			parObj.appendChild( inputEle );
		else
			targetObj.append( inputEle );

		if ( attrObj.category == 'popup' ) {
			$( '<input type="text"/><div id="searchForm_' + attrObj.id + '"><img alt="searchForm_' + attrObj.id + '" width="16" height="16" src="./include/images/search_lg.png" /></div>' ).prependTo( inputEle );
		};

		attrObj.align = elementObj.align;

		// bind event --> validation, formatter, un-format
		var objectId =  '#' + attrObj.id;
		var dateFormat = null;

		var inputObj = new Object();
		inputObj.width  = elementObj.width;
		inputObj.height = elementObj.height;
		inputObj.align  = elementObj.align;

		if ( !elementObj.alignflag && attrObj.category == 'number' ) {
			inputObj.align = 'right';
			attrObj.align  = 'right';
		};

		if ( attrObj.category == 'number' ) {
			if ( fc_isNull( elementObj.integers ) ) {
				if ( !fc_isNull( elementObj.maxlength ) ) {
					var nDecimalDigits = fc_isNull( attrObj.decimalDigits ) ? 0 : attrObj.decimalDigits;
					var nIntegers = Number( elementObj.maxlength ) - Number( nDecimalDigits );
					elementObj[ 'integers' ] = nIntegers;
				} else {
					elementObj[ 'integers' ] = window.gwMesEnv.screen.maxinteger;
				};
			} else {
				elementObj[ 'integers' ] = window.gwMesEnv.screen.maxinteger;
			};
			
			if ( fc_isNull( elementObj.digitsChk ) ) {
				attrObj.digitsChk  = true;
			}else{
				attrObj.digitsChk  = elementObj.digitsChk;
			}
			
			attrObj.integers  = elementObj.integers;
			attrObj.width     = elementObj.width;
			if ( !fc_isNull( elementObj.minvalue ) ) attrObj.minvalue = elementObj.minvalue;
			if ( !fc_isNull( elementObj.maxvalue ) ) attrObj.maxvalue = elementObj.maxvalue;
			
			fc_setFormNumberInput( attrObj.id, attrObj );
		} else if ( attrObj.category == 'date' ) {
			inputObj.formatString	 = fc_getDateFormatString( attrObj.datatype );
			inputObj.refName		 = elementObj.refName;
			inputObj.isFrom			 = elementObj.isFrom;
			inputObj.datatype		 = elementObj.datatype;
			inputObj.showCalendarBtn = fc_getShowCalendarBtn( attrObj.datatype );
			inputObj.showTimeBtn     = fc_getShowTimeBtn    ( attrObj.datatype );

			fc_setFormDateTime( attrObj.id, inputObj );
		} else if ( attrObj.category == 'radio' ) {
			$( objectId ).css( { 'display': 'inline-block' } );

		} else if ( attrObj.category == 'checkbox' ) {
			fc_setFormCheckbox( attrObj.id, inputObj );
		} else if ( attrObj.category == 'button' ) {
			$( objectId ).html( elementObj.caption );
			$( objectId ).jqxButton( { theme :window.gwMesEnv.themes, disabled: false } );
			if ( fc_isNull( elementObj.isMultiLanguage ) ) elementObj.isMultiLanguage = true;

			if ( elementObj.isMultiLanguage && window.gwMesEnv.lang.isMultiLanguage ) {
				if ( window.gwMultiLang.isRunMain ) {
					$( objectId )[ 0 ].innerText = fc_getGwLangItem( fc_isNull( elementObj.itemCd    ) ? elementObj.id : elementObj.itemCd
							                                       , fc_isNull( elementObj.itemValue ) ? 0 : elementObj.itemValue
							                                       , $( objectId )[ 0 ].innerText );

				} else {
					$( objectId ).addClass( window.gwClass.multilanguage );
					$( objectId ).attr( window.gwMesEnv.item.itemcd   , fc_isNull( elementObj.itemCd    ) ? elementObj.id : elementObj.itemCd );
					$( objectId ).attr( window.gwMesEnv.item.itemvalue, fc_isNull( elementObj.itemValue ) ? 0 : elementObj.itemValue );

					fc_setLangId( $( objectId ).attr( window.gwMesEnv.item.itemcd ), $( objectId ).attr( window.gwMesEnv.item.itemvalue ) );
				};

				$( objectId ).css( {'width' : elementObj.width} );
				if ( !fc_isNull( elementObj.align ) ) {
					$( objectId ).parent().css( {'text-align' : elementObj.align} );
				};
			}; // end of if ( window.gwMesEnv.lang.isMultiLanguage )

		}  else if ( attrObj.category == 'textarea' ) {
			fc_setFormTextArea( attrObj.id, inputObj );
		}  else if ( attrObj.category == 'editor' ) {
			fc_setFormEditor( attrObj.id, inputObj );
		} else if ( attrObj.category == 'text' ) {
			inputObj.caption = elementObj.caption;
			inputObj.isText = elementObj.isText;
			fc_setFormInput( inputEle, inputObj );
		} else if ( attrObj.category == 'select' ) {
			inputObj.checkboxFlag = false;
			if ( elementObj.datatype == 'chklov' ) {
				inputObj.checkboxFlag = true;
				fc_setFormDropdownList( attrObj.id, inputObj );
			} else if ( elementObj.datatype == 'lov' ) {
				fc_setFormDropdownList( attrObj.id, inputObj );
			} else if ( elementObj.datatype == 'cbolov' ) {
				fc_setFormCombobox( attrObj.id, inputObj );
			};
		} else if ( attrObj.category == 'popup' ) {
			
			if(elementObj.maxlength != undefined){
				inputObj.maxlength = elementObj.maxlength;
			}
			
			fc_setFormInput( attrObj.id, inputObj );

			if ( elementObj.datatype == 'custpopup' ) {
				if ( typeof f_custPopup === 'function' ) {
					$( '#searchForm_' + attrObj.id ).click( function () {
						if ( $( '#' + attrObj.id ).hasClass( window.gwClass.readonly ) ) {
							return false;
						} else {
							if ( typeof f_custPopup == 'function' )
								f_custPopup( elementObj.id, 0 );
						};
					});
				};
			} else {
				$( '#searchForm_' +attrObj.id ).click( function () {
					if ( $( '#' + attrObj.id ).hasClass( window.gwClass.readonly ) ) {
						return false;
					} else {
						var returnflag = true;
						if ( typeof f_beforeSearchPopup == 'function' )
							returnflag = f_beforeSearchPopup();

						if ( !fc_isNull( returnflag ) && !returnflag ) return;

						if ( fc_makePopup( attrObj.id ) )
							$( '#popupWindow' ).jqxWindow( 'open' );
					};
				});
			};
			$( '#' + attrObj.id + '>input' ).css( 'text-align', elementObj.align );
		};

		if ( elementObj.readonly ) {
			fc_setReadOnly( attrObj.id, true );
		};

		if ( !fc_isNull( elementObj.maxlength ) ) {
			if ( attrObj.category != 'number' ) {
				if ( inputObj ) {
					inputObj.maxlength = elementObj.maxlength;
					$( '#' + attrObj.id ).attr( 'maxlength', elementObj.maxlength );
				};
			};
		};
		$( '#' + attrObj.id ).addClass( 'formValueCheck' );
	} catch ( e ) {
		fc_getException( e );
	};
}; //end of fc_makeElement
/**
 *
 * @param datatype
 * @returns
 */
function fc_getDateFormatString( datatype ) {
	var dateFormat;
	try {
		switch ( datatype ) {
			case 'yearmonth' 	: dateFormat = fc_getCustYearMonthFormat();	break;
			case 'monthday' 	: dateFormat = fc_getCustMonthDayFormat ();	break;
			case 'date' 		: dateFormat = fc_getCustDateFormat     ();	break;
			case 'datetd' 		: dateFormat = fc_getCustDateFormat     ();	break;
			case 'datehour' 	: dateFormat = fc_getCustDateHourFormat ();	break;
			case 'datemin' 		: dateFormat = fc_getCustDateMinFormat  ();	break;
			case 'datetime' 	: dateFormat = fc_getCustDateTimeFormat ();	break;
			case 'hour' 		: dateFormat = fc_getCustHourFormat     ();	break;
			case 'hourmin' 		: dateFormat = fc_getCustHourMinFormat  ();	break;
			case 'minsec' 		: dateFormat = fc_getCustMinSecFormat   ();	break;
			case 'time' 		: dateFormat = fc_getCustTimeFormat     ();	break;
			default 			: break;
		}; // end of switch ( _datatype )
		return dateFormat;
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of function fc_getDateFormatString
function fc_getShowCalendarBtn( datatype ) {
	var result = false;
	try {
		switch ( datatype ) {
			case 'yearmonth' 	: result = true;	break;
			case 'monthday' 	: result = true;	break;
			case 'date' 		: result = true;	break;
			case 'datetd' 		: result = true;	break;
			case 'datehour' 	: result = true;	break;
			case 'datemin' 		: result = true;	break;
			case 'datetime' 	: result = true;	break;
			case 'hour' 		: result = false;	break;
			case 'hourmin' 		: result = false;	break;
			case 'minsec' 		: result = false;	break;
			case 'time' 		: result = false;	break;
			default 			: result = false;	break;
		}; // end of switch ( _datatype )
		return result;
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of function fc_getShowCalendarBtn
function fc_getShowTimeBtn( datatype ) {
	var result = false;
	try {
		switch ( datatype ) {
			case 'yearmonth' 	: result = false;	break;
			case 'monthday' 	: result = false;	break;
			case 'date' 		: result = false;	break;
			case 'datetd' 		: result = false;	break;
			case 'datehour' 	: result = true;	break;
			case 'datemin' 		: result = true;	break;
			case 'datetime' 	: result = true;	break;
			case 'hour' 		: result = true;	break;
			case 'hourmin' 		: result = true;	break;
			case 'minsec' 		: result = true;	break;
			case 'time' 		: result = true;	break;
			default 			: result = true;	break;
		}; // end of switch ( _datatype )
		return result;
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of function fc_getShowTimeBtn
/**
 *
 * @param parentElementId
 * @param itemList
 */
function fc_setFormComboValue( parentElementId, itemList ) {
	try {
		//-------------------------------------------------------------------------
		// validation
		var preMsg = '<b>Program Error: fc_setComboValue</b><br><br>';
		if ( fc_isNull( parentElementId ) ) {
			throw new Error( preMsg + 'Parent Element ID ' + window.gwMessage.validate.nodefined );
		};
		var parObj = document.getElementById( parentElementId );
		if ( fc_isNull( parObj ) ) {
			throw new Error( preMsg + parentElementId + ' ' + window.gwMessage.validate.nodefined );
		};
		if ( !fc_checkDatatype( parentElementId, 'lov' ) ) return;

		//-------------------------------------------------------------------------
		// create combo value item
		for ( var iloop=0; iloop<itemList.length; iloop++ ) {
			// validation
			if ( fc_isNull( itemList[iloop].id ) ) {
				throw new Error( preMsg + 'Item ID ' + window.gwMessage.validate.nodefined );
			};
			if ( fc_isNull( itemList[iloop].key ) ) {
				throw new Error( preMsg + 'Item Key ' + window.gwMessage.validate.nodefined );
			};
			// <option
			var _id        = itemList[ iloop ].id;
			var _key       = itemList[ iloop ].key;
			var _caption   = ( itemList[ iloop ].caption == undefined   ) ? _id : itemList[ iloop ].caption;
			var _itemCd    = ( fc_isNull( itemList[ iloop ].itemCd    ) ) ? _id : itemList[ iloop ].itemCd.toUpperCase();
			var _itemValue = ( fc_isNull( itemList[ iloop ].itemValue ) ) ? 0   : itemList[ iloop ].itemValue;
			fc_createComboItem( parentElementId, 'lov', _id, _key, _caption, _itemCd, _itemValue );
		}; // end of for ( var iloop=0; iloop<itemList.length; iloop++ )
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_setFormComboValue
/**
 *
 * @param parentElementId
 * @param itemList
 * @param btnUseFlag
 */
function fc_setFormRadioValue( parentElementId, itemList, btnUseFlag ) {
	// 2018.2.22 getting from database
	window.gwMultiLang.isRunMain = false;

	try {
		//-------------------------------------------------------------------------
		// validation
		var preMsg = '<b>Program Error: fc_setRadioValue</b><br><br>';
		if ( fc_isNull( parentElementId ) )
			throw new Error( preMsg + 'Parent Element ID ' + window.gwMessage.validate.nodefined );
		var parObj = document.getElementById( parentElementId );
		if ( fc_isNull( parObj ) )
			throw new Error( preMsg + parentElementId + ' ' + window.gwMessage.validate.nodefined );
		if ( !fc_checkDatatype( parentElementId, 'radio' ) ) return;
		if ( fc_isNull( parentElementId ) )
			throw new Error( preMsg + 'Radio Group Name ' + window.gwMessage.validate.nodefined );
		//-------------------------------------------------------------------------
		// create radio value item
		for ( var iloop=0; iloop<itemList.length; iloop++ ) {
			// validation
			if ( fc_isNull( itemList[ iloop ].id ) ) {
				throw new Error( preMsg + 'Item ID ' + window.gwMessage.validate.nodefined );
			};
			if ( fc_isNull( itemList[ iloop ].key ) ) {
				throw new Error( preMsg + 'Item Key ' + window.gwMessage.validate.nodefined );
			};
			// <input type='radio' id='id' name='radio' value='key'></input><label for='radio1'>_caption</label>
			var _id        = itemList[ iloop ].id;
			var _key       = itemList[ iloop ].key;
			var _caption   = ( itemList[ iloop ].caption == undefined   ) ? _id : itemList[ iloop ].caption;
			var _itemCd    = ( fc_isNull( itemList[ iloop ].itemCd    ) ) ? _id : itemList[ iloop ].itemCd.toUpperCase();
			var _itemValue = ( fc_isNull( itemList[ iloop ].itemValue ) ) ? 0   : itemList[ iloop ].itemValue;

			var buttonObj = new Object();
			buttonObj.id        = _id;
			buttonObj.caption   = _caption;
			buttonObj.itemCd    = _itemCd;
			buttonObj.itemValue = _itemValue;
			buttonObj.key       = _key;

			var inpObj = fc_createRadioItem( parentElementId, buttonObj, btnUseFlag );
		}; // end of for ( var iloop=0; iloop<itemList.length; iloop++ )
		if ( btnUseFlag ) {
			$( parObj ).addClass( 'form-radio-btn' );
			$( '#' + parentElementId ).attr( 'name', parentElementId );
			$( '#' + parentElementId ).jqxButtonGroup( { mode : 'radio', theme : window.gwMesEnv.themes } );

			// set coustom attribute 'value'
			for ( var iloop=0;iloop<itemList.length;iloop++ ) {
				var _id        = itemList[ iloop ].id;
				var _key       = itemList[ iloop ].key;
				var _itemCd    = ( fc_isNull( itemList[ iloop ].itemCd    ) ) ? _id : itemList[ iloop ].itemCd.toUpperCase();
				var _itemValue = ( fc_isNull( itemList[ iloop ].itemValue ) ) ? 0   : itemList[ iloop ].itemValue;
				var itemAttrCd = window.gwMesEnv.item.itemcd;
				var itemAttrValue = window.gwMesEnv.item.itemvalue;
				if ( window.gwMultiLang.isRunMain ) {
					$( '#'+ _id )[ 0 ].innerText = fc_getGwLangItem( _itemCd, _itemValue, $( '#'+ _id )[ 0 ].innerText );
				} else {
					$( '#'+ _id ).attr( { value : _key, item_cd : _itemCd, item_value : _itemValue, name : 'RDO_' + parentElementId } );
					$( '#'+ _id ).addClass( window.gwClass.multilanguage );
					fc_setLangId( _itemCd, _itemValue );
				};
			};
		} else {
			$( parObj ).addClass( 'form-radio' );
			$( '#' + parentElementId ).attr( 'name', parentElementId );
		};

		if( $( '#' + parentElementId ).attr( 'custom-readonly' ) ) {
			if ( btnUseFlag ) {
				$( '#' + parentElementId ).jqxButtonGroup( 'disable' );
			} else {
				var checkboxes = $( '#' + parentElementId ).find( '.jqx-radiobutton' );
				$.each( checkboxes, function () {
					$( this ).jqxRadioButton( { disabled:true } );
				});
			};
		};
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_setFormRadioValue
/**
 *
 * @param targetObj
 * @param objList
 * @param type
 */
function fc_makeDOM( targetObj, objList, type ) {
	try {
		if ( targetObj == undefined )	targetObj = $( 'body' );
		else	targetObj.children().remove();

		for ( var loop=0;loop<objList.length;loop++ ) {
			var divGroup = '';
		    var divGroupId = '';
		    var domObj = objList[loop];

			if ( !fc_isNull( domObj.groupname ) ) {
				divGroupId = domObj.groupname;

				if ( $( '#' + domObj.groupname ).length == 0 ) {
					divGroup = document.createElement( 'div' );
					var divGroupObj	= { id : {}, grptype : 'group' };
					divGroupObj.id = divGroupId;
					fc_createAttr( divGroup, divGroupObj );

					$( targetObj ).append( divGroup );
					$( divGroup ).addClass( 'search-row-line' );
					divGroup = $( '#' + divGroupId );
				} else {
					divGroup = $( '#' + divGroupId );
				};
			};
			if ( objList[ loop ].datatype == 'daterange' ) {
				var cntRefAttr = 2;

				for( var i = 1; i <= cntRefAttr; i++ ) {
					domObj.name		= domObj.target[ i-1 ];
					domObj.datatype	= domObj.target[ 2 ];
					domObj.refName	= domObj.target[ cntRefAttr-i ];
					domObj.isFrom	= ( i == 1 ) ? true : false;

					if ( i == cntRefAttr ) {
						domObj.itemCd = 'CAP_BETWEEN';
						domObj.itemValue = '0';
						domObj.caption = '~';
					};
					fc_isNull( divGroup ) ? fc_createElement( targetObj,  domObj, type ) : fc_createElement( divGroup,  domObj, type );
				};
			} else {
				fc_isNull( divGroup ) ? fc_createElement( targetObj,  domObj, type ) : fc_createElement( divGroup,  domObj, type );
			};
		};
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_makeDOM
/**
 *
 * @param targetObj
 * @param tabsId
 * @param objList
 * @returns {jQueryTabs}
 */
function fc_createDOMTab( targetObj, tabsId, objList ) {
	try {
		return fc_makeDOMTab( targetObj, tabsId, objList, 'SCREEN' );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_createDOMTab
/**
 *
 * @param targetObj
 * @param tabsId
 * @param objList
 * @param type
 * @returns {jQueryTabs}
 */
function fc_makeDOMTab( targetObj, tabsId, objList, type ) {
	// 2018.2.22 getting from database
	window.gwMultiLang.isRunMain = false;

	try {
		if ( targetObj == undefined )	targetObj = $( 'body' );
		else	targetObj.children().remove();

		var customTab = new jQueryTabs ( targetObj, tabsId, false );
		var _multiLangItem = function( tabidx, itemCd, itemValue ) {
		    this.TAB_IDX  = tabidx;
		    this.ITEM_CD  = fc_isNull( itemCd    ) ? colNm : itemCd;
		    this.ITEM_VAL = fc_isNull( itemValue ) ? 0     : itemValue;
		};

		var arrTabMultiLang = new Array();
		for ( var loop = 0; loop<objList.length; loop++ ) {
			var contentsClass = '';
			if ( !fc_isNull( objList[ loop ].contentstype ) ) {
				contentsClass = 'contents' + objList[ loop ].contentstype;
			};

			var divContents = '<div id="' + objList[ loop ].name.toUpperCase() + '" ' + ( fc_isNull( contentsClass ) ? '' : ( 'class="'+  contentsClass + '"' ) ) + '></div>';
			customTab.addContentsTab(objList[ loop ].caption, divContents);
			if ( fc_isNull( objList[ loop ].isMultiLanguage) ) objList[ loop ].isMultiLanguage = true;

			if ( objList[ loop ].isMultiLanguage && window.gwMesEnv.lang.isMultiLanguage ) {
				var _itemcd  = ( fc_isNull( objList[ loop ].itemCd    ) ) ? objList[ loop ].name.toUpperCase() : objList[ loop ].itemCd.toUpperCase();
				var _itemval = ( fc_isNull( objList[ loop ].itemValue ) ) ? 0 : objList[ loop ].itemValue;

				if ( window.gwMultiLang.isRunMain ) {
					objList[ loop ].caption = fc_getGwLangItem( _itemcd, _itemval, objList[ loop ].caption );
				} else {
					arrTabMultiLang.push( new _multiLangItem( loop, _itemcd, _itemval ) );
					fc_setLangId( _itemcd, _itemval );
				};

			}; // end of if ( window.gwMesEnv.lang.isMultiLanguage )
		};
		window.gwTabMultiLang[ tabsId ] = arrTabMultiLang;
		$( '#' + tabsId ).addClass( 'tab-layout-custom' );

		return customTab;
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_makeDOMTab
/**
 *
 * @param targetObj
 * @param tabsId
 * @param objList
 */
function fc_createDOMTabEx( targetObj, tabsId, objList ) {
	try {
		return fc_makeDOMTabEX( targetObj, tabsId, objList, 'SCREEN' );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_createDOMTabEx
/**
 *
 * @param targetObj
 * @param tabsId
 * @param objList
 * @param type
 */
function fc_makeDOMTabEX( targetObj, tabsId, objList, type ) {
	// 2018.2.22 getting from database
	window.gwMultiLang.isRunMain = false;

	try {
		if ( targetObj == undefined )	targetObj = $( 'body' );
		else	targetObj.children().remove();

		var customTab = new jQueryTabs ( targetObj, tabsId, false );
		var _multiLangItem = function( tabidx, itemCd, itemValue ) {
		    this.TAB_IDX  = tabidx;
		    this.ITEM_CD  = fc_isNull( itemCd    ) ? colNm : itemCd;
		    this.ITEM_VAL = fc_isNull( itemValue ) ? 0     : itemValue;
		};

		var arrTabMultiLang = new Array();

		for ( var loop = 0; loop<objList.length; loop++ ) {
			var contentsClass = '';
			if ( !fc_isNull( objList[ loop ].contentstype ) ) {
				contentsClass = 'contents' + objList[ loop ].contentstype;
			};
			if ( fc_isNull( objList[ loop ].isMultiLanguage ) ) objList[ loop ].isMultiLanguage = true;
			if ( objList[ loop ].isMultiLanguage && window.gwMesEnv.lang.isMultiLanguage ) {
				var _itemcd  = ( fc_isNull( objList[ loop ].itemCd    ) ) ? objList[ loop ].name.toUpperCase() : objList[ loop ].itemCd.toUpperCase();
				var _itemval = ( fc_isNull( objList[ loop ].itemValue ) ) ? 0 : objList[ loop ].itemValue;

				if ( window.gwMultiLang.isRunMain ) {
					objList[ loop ].caption = fc_getGwLangItem( _itemcd, _itemval, objList[ loop ].caption );
				} else {
					arrTabMultiLang.push( new _multiLangItem( loop, _itemcd, _itemval ) );
					fc_setLangId( _itemcd, _itemval );
				};
			}; // end of if ( window.gwMesEnv.lang.isMultiLanguage )

			var divContents = '<div id="' + objList[ loop ].name.toUpperCase() + '" ' + ( fc_isNull( contentsClass ) ? '' : ( 'class="' +  contentsClass + '"' ) ) + '></div>';
			customTab.addContentsTab( objList[ loop ].caption, divContents );
		};
		window.gwTabMultiLang[ tabsId ] = arrTabMultiLang;
		$( '#' + tabsId ).addClass( 'tab-layout-custom' );

		return customTab;
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_makeDOMTabEX
/**
 *
 * @param elementId
 * @param elementCaption
 * @param itemCd
 * @param itemValue
 * @returns
 */
function fc_createTabLink( elementId, elementCaption, itemCd, itemValue, isMultiLanguage ) {
	// 2018.2.22 getting from database
	window.gwMultiLang.isRunMain = false;

	try {
		var liElement = document.createElement( 'li' );
		var tabLink   = document.createElement( 'a' );
		//---------------------------------------------------------------------
		var tabLinkObj = new Object();
		tabLinkObj[ 'href'    ] = '#' + elementId;
		if ( isMultiLanguage && window.gwMesEnv.lang.isMultiLanguage ) {
			if ( window.gwMultiLang.isRunMain ) {
				elementCaption = fc_getGwLangItem( fc_isNull( itemCd ) ? elementId : itemCd
						                         , fc_isNull( itemValue ) ? 0 : itemValue
						                         , elementCaption );
			} else {
				tabLinkObj[ 'class' ] = window.gwClass.multilanguage;
				tabLinkObj[ window.gwMesEnv.item.itemcd    ] = fc_isNull( itemCd    ) ? elementId : itemCd;
				tabLinkObj[ window.gwMesEnv.item.itemvalue ] = fc_isNull( itemValue ) ? 0 : itemValue;
				fc_setLangId( tabLinkObj[ window.gwMesEnv.item.itemcd ], tabLinkObj[ window.gwMesEnv.item.itemvalue ] );
			};
		}; // end of if ( window.gwMesEnv.lang.isMultiLanguage )

		tabLink.appendChild( document.createTextNode( elementCaption ) );
		liElement.appendChild( tabLink );
		fc_createAttr( tabLink, tabLinkObj );

		return liElement;
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_createTabLink
/**
 *
 * @param targetObj
 * @param groupId
 * @param objList
 * @param groupCaption
 * @param groupType
 */
function fc_createDOMGroup( targetObj, groupId, objList, groupCaption, groupType ) {
	try {
		fc_makeMainDOMGroup( targetObj, groupId, objList, groupCaption, groupType, 'SCREEN' );
		fc_setBindEvent( groupId, 'change', fc_changeFormFlag );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_createDOMGroup
/**
 *
 * @param targetObj
 * @param groupId
 * @param objList
 * @param groupCaption
 * @param groupType
 * @param type
 */
function fc_makeMainDOMGroup( targetObj, groupId, objList, groupCaption, groupType, type ) {
	try {
		if ( targetObj == undefined )	targetObj = $( 'body' );
		else	targetObj.children().remove();

		var fieldset = '', fieldsetId = '';
		var fieldClasstype = '';

		if ( groupType == 'left' ) {
			fieldClasstype = 'field-col-lft';
		} else {
			fieldClasstype = 'field-col-line';
		};

		fieldset = document.createElement( 'fieldset' );
		fieldsetId = groupId;

		targetObj.append( fieldset );
		var fieldsetObj	= { id: {}, 'class' : fieldClasstype };
		fieldsetObj.id = fieldsetId;
		fc_createAttr( fieldset, fieldsetObj );

		if ( groupCaption != undefined ) {
//			var legend = '';
//			legend = document.createElement( 'legend' );
//			legend.appendChild( document.createTextNode( groupCaption ) );
//			$( fieldset ).append( legend );
			
			var container = $( "<div id='divCaption_" + groupId + "' class='divGridCaption'></div>" );
			var span      = $( "<span id='caption_"   + groupId + "' class='gridCaptionText'>" + groupCaption + "</span>" );

			container.append( span );
			container.height( 20 );

			targetObj.prepend( container );
			
			
		};

		for ( var loop = 0; loop<objList.length; loop++ ) {
			var divGroup = '', divGroupId = '';
			if ( !fc_isNull( objList[ loop ].groupname ) ) {
				divGroupId = objList[ loop ].groupname.toUpperCase();

				if ( $( '#' + divGroupId ).length == 0 ) {
					divGroup = document.createElement( 'div' );

					var divGroupObj	= { id: {} };
					divGroupObj.id = divGroupId;
					fc_createAttr( divGroup, divGroupObj );

					$( fieldset ).append( divGroup );
					if ( groupType == 'left' ) {
						$( divGroup ).addClass( 'group-row-line' );
					} else {
						$( divGroup ).addClass( 'group-row-left' );
					};
				} else {
					divGroup = $('#' + divGroupId );
				};
			};

			var divCol = '', divColId = '';
			var classtype = 'group-col';
			divCol   = document.createElement( 'div' );
			divColId = 'divCol_' + objList[ loop ].name.toUpperCase();

			if ( fc_isNull( divGroup ) ) {
				$( fieldset ).append( divCol );
			} else {
				$( divGroup ).append( divCol );
			};

			if ( groupType == 'left' ) {
				classtype = 'group-col-lft';
			} else {
				classtype = 'group-col-line';
			};
			var divColObj	= { id : {}, 'class' : classtype };
			divColObj.id = divColId;
			fc_createAttr( divCol, divColObj );

			var _hidden      = fc_isNull( objList[ loop ].hidden )  ? false : objList[ loop ].hidden;
			fc_createGroupElement( divCol,  objList[ loop ], type );

			if ( _hidden ) {
				$( divCol ).hide();
			} ;
		};
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_makeDOMGroup
/**
 *
 * @param targetObj
 * @param tableId
 * @param iCols
 * @param iRows
 * @param colWidths
 * @param objList
 * @param isFixed
 */
function fc_createFormTable( targetObj, tableId, iCols, iRows, colWidths, objList, isFixed ) {
	try {
		isFixed = fc_isNull( isFixed ) ? false : isFixed;
		fc_makeDOMTable( targetObj, tableId, iCols, iRows, colWidths, objList, 'SCREEN', isFixed );
		fc_setBindEvent( tableId, 'change', fc_changeFormFlag );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_createFormTable
/**
 *
 * @param targetObj
 * @param tableId
 * @param iCols
 * @param iRows
 * @param colWidths
 * @param objList
 * @param isFixed
 */
function fc_createPopupFormTable( targetObj, tableId, iCols, iRows, colWidths, objList, isFixed ) {
	try {
		isFixed = fc_isNull( isFixed ) ? false : isFixed;
		fc_makeDOMTable( targetObj, tableId, iCols, iRows, colWidths, objList, 'POPUP', isFixed );
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_createPopupFormTable
/**
 *
 * @param targetObj
 * @param tableId
 * @param iCols
 * @param iRows
 * @param colWidths
 * @param objList
 * @param screenType
 * @param isFixed
 */
function fc_makeDOMTable( targetObj, tableId, iCols, iRows, colWidths, objList, screenType, isFixed ) {
	try {
		if ( typeof targetObj == 'object' ) {
			if ( targetObj.length == 0 )	targetObj = $( 'body' );
			else targetObj.children().remove();
		} else if ( fc_isNull( targetObj ) ) targetObj = $( 'body' );

		var formTable   = document.createElement( 'table' );
		var formTableId = tableId;
		targetObj.append( formTable );
		var formTableObj  = { id : {}, 'class' : 'formtable' };
		formTableObj.id   = formTableId;
		fc_createAttr( formTable, formTableObj );

		if ( isFixed ) $( formTable ).css( 'table-layout','fixed' ).css( 'word-break', 'break-all' );

		var colGroup = document.createElement( 'colgroup' );
		formTable.appendChild( colGroup );

		for ( var wLoop = 0; wLoop < colWidths.length; wLoop++ ) {
			var colEl      = document.createElement( 'col' );
			var colElObj   = { width : {} };
			colElObj.width = colWidths[ wLoop ];
			fc_createAttr( colEl, colElObj );
			colGroup.appendChild( colEl );
		};

		var tbodyEl = document.createElement( 'tbody' );
		formTable.appendChild( tbodyEl );

		if ( iRows == 0 ) {
			if (objList.length%iCols == 0) {
				iRows = objList.length / iCols;
			} else {
				iRows = ( objList.length / iCols ) + 1;
			};
		};

		// add property labelname
		objList = fc_setFormTableMappingLabel( objList, iRows, iCols );
		for ( var rloop = 0; rloop < iRows; rloop++ ) {
			var trEl = document.createElement( 'tr' );
			var objIdx = rloop * iCols;
			tbodyEl.appendChild( trEl );

			for ( var cloop = 0; cloop < iCols; cloop++ ) {
				fc_createColElement( trEl,  objList[ objIdx + cloop ], screenType );
			};
		};
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_makeDOMTable
/**
 *
 * @param tableId
 * @param arrColIdx
 */
function fc_setHeaderRowSpanByArray( tableId, arrColIdx ) {
	try {
		if ( $.isArray ( arrColIdx ) ) {
			$.each ( arrColIdx, function() {
				fc_setHeaderRowSpanByIndex( tableId, this );
			});
		};
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_setHeaderRowSpanByArray
/**
 *
 * @param tableId
 * @param arrRowIdx
 */
function fc_setHeaderColSpanByArray( tableId, arrRowIdx ) {
	try {
		if ( $.isArray( arrRowIdx ) ) {
			$.each ( arrRowIdx, function() {
				fc_setHeaderColSpanByIndex( tableId, this );
			});
		};
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_setHeaderColSpanByArray
/**
 *
 * @param tartgetColObj
 * @example
	fc_setFormComboFilter( {  object: 'FMT_ID'
							, code: 'OWNER_FORMAT'
							, format: 'K'
							, nullable: true
							, defval: ''
							, parentColNm: 'TC_OWNER'
							, arrowColNm: 'TAGS'
							, parentNullOpt: true
						   } );
*/
function fc_setFormComboFilter( tartgetColObj ) {
	try {
		$( '#' + tartgetColObj.parentColNm ).bind( 'select', function( event ) {
			var arrCodeData = fc_getCodeFilterData( '', '', tartgetColObj, fc_setValue( tartgetColObj.parentNullOpt, false ) );
			if ( fc_checkDatatype( tartgetColObj.object, 'lov' ) || fc_checkDatatype( tartgetColObj.object, 'chklov' ) ) {
				fc_setFormDropdownListData( tartgetColObj.object, arrCodeData, null, tartgetColObj.isSelectMax, null, tartgetColObj.dropDownHeight );
			} else {
				fc_setFormComboboxData( tartgetColObj.object, arrCodeData );
			};
		});
		if ( !fc_isNull( tartgetColObj.defval ) ) {
			$( '#' + tartgetColObj.object ).val( tartgetColObj.defval );
		};
	} catch ( e ) {
		fc_getException( e );
	};
}; // end of fc_setFormComboFilter