/**
 * Declare variable
 */
var gwDefCert = { type: 'M',
				  method: { all: 'A', ldap: 'L', mes: 'M' }
				};
var gwUserType = { mes: 'M', sm:'S', interU:'I', exterU: 'O', ad: 'A', both: 'B' };
var gwMesEnv   = { logLevel: 1, useMultilang: 'N', useCookie: 'Y', defaultLanguage: 'KO', loginCertType: 'M', useMDI: 'Y' };
var gwLanguageKind  = new Array();
var gwCertTypeCode  = new Array();
/**
 * Declare Initial JS Function
 */
$( document ).ready( function () {
	window.focus();

	if ( top.location.href != self.location.href ) {
		top.location.href = 'login.jsp';
	};

	// get cookie information
	var userId = $.cookie( 'USERID'  );
	var langCd = $.cookie( 'LANG_CD' );

	if ( userId != null && userId != '' ) {
		$( '#username'  ).val( userId ); 					// set user id
		$( '#saveId'    ).attr( 'checked', 'checked' ); 	// set isSave
		$( '#LANG_CD'   ).val( langCd ); 					// set language code
		$( '.userLabel' ).hide();
	};

	if ( $( '#username' ).val() != '' ) {
		 $( '#username' ).addClass( 'in_idOn' );
	} else {
		$( '.userLabel' ).hide();
		$( '#username'  ).focus();
	};

	$( '#loginsubmit' ).click( function() {
		fi_loginSubmit();
	});

	$( '#password_input, #username' ).keydown( function() {
		if ( event.keyCode == 13 ) {
			if ( this.id == 'username' ) {
				if ( $( '#password_input' ).val() != '' )
					fi_loginSubmit();
				else {
					$( '.pwdLabel' ).hide();
					$( '#password_input' ).focus();
				};
			} else {
				fi_loginSubmit();
			};
		};
	});

	$( '#password_input' ).val( '' ); // reset password
	$( '.userLabel, .pwdLabel' ).click( function() {
		$(this).hide();
	});
	$( '#username, #password_input' ).bind( 'focus', function() {
		if ( this.id == 'username' ) {
			$( '.userLabel' ).hide();
		} else {
			$( '.pwdLabel' ).hide();
		};
	});
	$( '#username, #password_input' ).bind( 'blur', function() {
		if ( $( this ).val().length == 0 ) {
			$( this ).prev().show();
		};
	});
	$( '#password_input' ).change( function() {
		if ( !fi_isNull( this.value ) ) {
			if ( $( '.pwdLabel' ).is( ':visible' ) ) $( '.pwdLabel' ).hide();
		} else {
			if ( $( '.pwdLabel' ).is( ':hidden' ) )  $( '.pwdLabel' ).show();
		};
	});	// reset password

	$.ajax({
		type     : 'POST',
		dataType : 'json',
		url      : 'loginProc.json',
		async    : false,
		data     : 'ServiceName=ict.sys.login-service&initProc=1',
		success  : function( data ) {
			fi_setSystemEnv( data );
			fi_setLanguageKind( data );
			fi_setCertType( data );
			fi_setCompanyInfo( data );
		}
	});
	if ( gwLanguageKind != null && gwLanguageKind.length > 0 ) {
		$( '#LANG_CD' ).children().remove();
		for ( var i=0;i<gwLanguageKind.length;i++ ) {
			var inputEle = document.createElement( 'option' );
			inputEle.appendChild( document.createTextNode( gwLanguageKind[ i ].CD_NM ) )
			inputEle.setAttribute( 'value', gwLanguageKind[ i ].CD_VAL );
			$( '#LANG_CD' ).append( inputEle );
		};
	};
	// Login Certification Method ( A : all, M : MES System, L : Active Directory LDAP )
	gwMesEnv.loginCertType = ( fc_getSessionItem( 'GW_LOGIN_ENV' ).DEF_CERT_TYPE == null || fc_getSessionItem( 'GW_LOGIN_ENV' ).DEF_CERT_TYPE.trim().length <= 0)
					? gwDefCert.type : fc_getSessionItem( 'GW_LOGIN_ENV' ).DEF_CERT_TYPE.trim();

	if ( gwMesEnv.loginCertType.length > 1 || gwMesEnv.loginCertType == gwDefCert.method.all ) {
		$( '#login_area_height_box' ).css( 'height', '280px' );
//		$( '.Certification_area' ).show();
//		$( '#LOGIN_CERT_TYPE' ).show();
// 2018.2.21 block show...

		$( '#LOGIN_CERT_TYPE' ).children().remove();
		var arrLoginCertType = gwMesEnv.loginCertType.split( ',' );
		var isWithInStr = function ( arrA, strB ) {
			var rtn = false;
			if ( !$.isArray( arrA ) ) { return false; }
			$.each( arrA, function( key, value ) {
				if ( value == strB ) {
					rtn = true;
					return false;
				};
			});
			return rtn;
		};

		var setLoginCertTypeCode = function( ologinCertTypeCode, sFilterStr ) {
			$.each( ologinCertTypeCode, function( codeKey, codeValue) {
				if ( isWithInStr( sFilterStr, codeValue.CD_VAL ) || sFilterStr == gwDefCert.method.all ) {
					var optionEle = document.createElement( 'option' );
					optionEle.appendChild( document.createTextNode( codeValue.CD_NM ) )
					optionEle.setAttribute( 'value', codeValue.CD_VAL );
					$( '#LOGIN_CERT_TYPE' ).append( optionEle );
				};
			});
		};

		if ( gwMesEnv.loginCertType == gwDefCert.method.all ) {
			setLoginCertTypeCode( gwCertTypeCode, gwDefCert.method.all );
		} else {
			setLoginCertTypeCode( gwCertTypeCode, arrLoginCertType );
		};
	} else {
		$( '#login_area_height_box' ).css( 'height', '' );
		$( '.Certification_area' ).hide();
	};

	var idxTC = $( '#LANG_CD > option[value=' + gwMesEnv.defaultLanguage + ']' ).attr( 'selected', 'true' );
	( gwMesEnv.useMultilang == 'Y' ) ? $( '#LANG_CD' ).show() : $( '#LANG_CD' ).hide();

	var isCookieUse = true;
	if ( gwMesEnv.useCookie == 'Y' ) {
		isCookieUse = false;

		var cookieLoginCertType = $.cookie( 'LOGIN_CERT_TYPE' );
		var cookieLangCd = $.cookie( 'LANG_CD' );

		if ( !fi_isNull( cookieLoginCertType) ) {
			if ( $( '#LOGIN_CERT_TYPE' ).length ) {
				if ( $( "#LOGIN_CERT_TYPE option" ).size() > 0 ) {
					$( '#LOGIN_CERT_TYPE' ).val( cookieLoginCertType );
				};
			};
		};
		if ( !fi_isNull( cookieLangCd ) ) {
			if ( $( '#LANG_CD' ).length ) {
				if ( $( "#LANG_CD option" ).size() > 0 ) {
					$( '#LANG_CD' ).val( cookieLangCd );
				};
			;};
		};
	};

	$( '#saveId' ).attr( 'disabled', isCookieUse );
}); // end of $(document).ready(function())
function fc_showLog( iLevel, sText, sValue ) {
	fi_showLog( iLevel, sText, sValue );
}; // end of fc_showLog
function fi_showLog( iLevel, sText, sValue ) {
	if ( window.gwMesEnv.logLevel <= iLevel ) {
		if ( fc_isNull( sValue ) )
			console.log ( sText );
		else
			console.log ( sText, sValue );
	};
};// end of fi_showLog
/**
 * fi_loginSubmit
 * @description	submit login information to server
 */
function fi_loginSubmit() {
	
	console.log('######### login.js fi_loginSubmit call ');
	
	// check user id, password validation
	if ( $( '#username' ).val() == '' ) {
		jqWings.alert( window.gwMessage.action.inputUserId, fi_setFocustUserName );
		return;
	};
	if ( $( '#password_input' ).val() == '' ) {
		jqWings.alert( window.gwMessage.action.inputUserPassword, fi_setFocustPasswordInput );
		return;
	};

	$.ajax({
		type     : 'POST',
		dataType : 'json',
		url      : 'loginProc.json',
		async    : false,
		data     : 'ServiceName=ict.sys.login-service&searchUserType=1&USER_ID=' + $( '#username' ).val(),
		success  : function( data ) {
			var oUserTy = data[ 'RK_USER_TYPE' ];
			if ( fi_isNull( oUserTy ) || oUserTy.length == 0 ) {
				jqWings.alert( window.gwMessage.action.notFoundUserInfo , fi_setFocustUserName );
				return false;
			} else {
				var sUserTy = oUserTy[0].USER_TY;
				var sLoginCertType = $( '#LOGIN_CERT_TYPE' ).val();
				// Only MES User
				if ( sUserTy == gwUserType.mes || sUserTy == gwUserType.sm || sUserTy == gwUserType.interU || sUserTy == gwUserType.exterU ) {
					if ( sLoginCertType == gwDefCert.method.ldap ) {
//						jqWings.alert( ' [' + oUserTy[0].USER_ID + ' ] ' + window.gwMessage.action.isMESUser, fi_setFocusLoginCertType );
// 2018.2.21 block ad/mes user alert messaage
						$( '#LOGIN_CERT_TYPE' ).val( gwUserType.mes );
//						return false;
// 2018.2.21 block return false .. call fi_ajaxLogin
					};
				};
				// Only AD User
				if ( sUserTy == gwUserType.ad ) {
					if ( sLoginCertType == gwDefCert.method.mes ) {
//						jqWings.alert( ' [' + oUserTy[ 0 ].USER_ID + ' ] ' + window.gwMessage.action.isADUser, fi_setFocusLoginCertType );
// 2018.2.21 block ad/mes user alert messaage
						$( '#LOGIN_CERT_TYPE' ).val( gwDefCert.method.ldap );
//						return false;
// 2018.2.21 block return false .. call fi_ajaxLogin
					};
				};
			};
			fi_ajaxLogin();
		},
		error  : function( jqXHR, textStatus, errorThrown ) {
			jqWings.alert( '[' + jqXHR.status + '] ' + textStatus + ': ' + errorThrown );
		}
	});
}; // end of fi_loginSubmit
/**
 * fi_setFocustUserName
 */
function fi_setFocustUserName() {
	$( '#username' ).focus();
}; // end of fi_setFocustUserName
/**
 * fi_setFocustPasswordInput
 */
function fi_setFocustPasswordInput() {
	$( '#password_input' ).focus();
};// end of fi_setFocustPasswordInput
/**
 * fi_setFocusLoginCertType
 */
function fi_setFocusLoginCertType() {
	$( '#LOGIN_CERT_TYPE' ).focus();
};// end of fi_setFocusLoginCertType
/**
 * fi_ajaxLogin
 * @description	Ajax Login
 */
function fi_ajaxLogin() {
	
	console.log('######### login.js fi_ajaxLogin call ');
	
	window.localStorage.clear();
	window.sessionStorage.clear();
	var strVal = $( '#password_input' ).val();
	$( '#password_input' ).val('');
	
	var strxteab64enc = $().crypt({
		method: "xteab64enc",
		source: strVal
	});
	
	$( '#password' ).val( strxteab64enc );

	var sServiceInfo = '&ServiceName=ict.sys.login-service';
	// is Login Authentication Method 'AD - LDAP '
	if ( $( '#LOGIN_CERT_TYPE' ).val() == gwDefCert.method.ldap || gwMesEnv.loginCertType == gwDefCert.method.ldap ) {
		sServiceInfo += '&CertifyByAD=1&LOGIN_CERT_TYPE=' + gwDefCert.method.ldap;
	} else {
		sServiceInfo += '&CertifyByMES=1';
	};
	
	//console.log('######### fi_ajaxLogin ajax call ', sServiceInfo);
	var commonCheck = true;
	
	// call ajax
	$.ajax({
		type     : 'POST',
		dataType : 'json',
   		url      : 'loginProc.json',
   		data     : $( '#Login' ).serialize() + sServiceInfo,
   		success  : function ( data ) {
   			//fi_showLog( 3, 'Certify Data:'. data );   			
   			
   			//common check 1 : sso 현업은 SSO로 로그 적용.
   			if(!fc_isNull(data.RK_USER) && data.RK_USER.length > 0){
				var ssoYn = data.RK_USER[0].SSO_YN;				
				if(!fc_isNull(ssoYn)  && ssoYn == 'Y' && !window.location.href.startsWith("http://localhost")){
					$('#mesDevModal').show();
					commonCheck = false;
				}
			}

   			//common check 2 : mobile : 모바일 접속 https 체크(1차) -> 서버 요청 체크(2차)
   			if(commonCheck && !fc_isNull(data.RK_USER) && data.RK_USER.length > 0){
   				var httpsAccess = data.RK_USER[0].OUTSIDE_ACCESS_YN;
				if(httpsAccess != 'Y' && window.location.href.indexOf("//mes.lsmnm.com:6443")  > -1){
   				//if(httpsAccess != 'Y' && window.location.href.indexOf(":8080")  > -1){
					jqWings.alert('인가된 Https사용자가 아닙니다' );
					commonCheck = false;
				}
			}
   			
   			//common check 3 : mobile : 모바일 접속일 경우 - 특정 사용자 경우 main페이지 없이 모바일용 page바로 호출(PSA)
   			if(commonCheck &&  data.LOGIN_RESULT == "success" && window.location.href.indexOf("mloginentry.jsp") > -1 ){		
				if(!fc_isNull(data.RK_USER) && data.RK_USER.length > 0){
					
					var mobile_pageid = data.RK_USER[0].MOBILE_PAGE_ID; 
					if(mobile_pageid != null  && mobile_pageid != ""){
						fi_setLoginInfo( data );
						location.href = '/'+mobile_pageid+'.do';
						commonCheck = false;
					}
					
				}
			}
   			
   			//login check main.
   			if(commonCheck){
   				if ( data.LOGIN_RESULT != "success" ) {
   	   				jqWings.alert( data.LOGIN_MESSAGE, fi_setFocustPasswordInput );
   				} else {
   					fi_setCookie();  			// set cookie information
   					fi_setLoginInfo( data );	//Set Login Info
   					//fi_setSystemEnv( data );	//Set System Env
   					fi_openWindow( data );	    // open new window
					fi_loginClose();			// close current window
   				};
   			}
   			
		},
		error  : function ( jqXHR, textStatus, errorThrown ) {
			jqWings.alert( '[' + jqXHR.status + '] ' + textStatus + ': ' + errorThrown );
		}
	});

	$( '#password_input' ).val( '' );
	$( '#password' ).val( '' );
}; // end of fi_ajaxLogin
/**
 * fi_loginClose
 */
function fi_loginClose() {
	setTimeout( function () { window.open( '','_self' ).close(); }, 1000 );
}; // END OF fc_loginClose
/**
 * fi_setLoginInfo
 * @description	save login information to SessionStorage
 * @param data
 */
function fi_setLoginInfo( data ) {
	fc_setSessionItem( 'GW_CLIENT_IP', data.USER_CLIENT_IP );
	
	//2019.11.14 - 세션 정보 정리
	$.each( data.RK_USER, function( index, item ) {
		
		fc_setSessionItem( 'GW_USER_ID', item.USER_ID );
		fc_setSessionItem( 'GW_USER_NM', item.USER_NM );
		fc_setSessionItem( 'GW_DEPT_CD', item.DEPT_CD );
		fc_setSessionItem( 'GW_DEPT_NM', item.DEPT_NM );
		fc_setSessionItem( 'GW_PLANT_CD', item.PLANT_CD );
		fc_setSessionItem( 'GW_EMP_NO', item.EMP_NO );
		fc_setSessionItem( 'GW_ROLE_CD', item.ROLE_CD );
		fc_setSessionItem( 'GW_WELCOME_PGM_ID', item.DEF_PGM_ID );
		fc_setSessionItem( 'GW_SSO_YN', item.SSO_YN );
		fc_setSessionItem( 'GW_OUTSIDE_ACCESS_YN', item.OUTSIDE_ACCESS_YN );
		//alert(item.USER_ID+'/'+fc_getSessionItem( 'GW_USER_ID'));
		fc_setSessionItem( 'GW_LINE_CD', item.LINE_CD );
		fc_setSessionItem( 'GW_PASSWD_EXPIRE_DT', item.PASSWD_EXPIRE_DT );
	});
	fc_setSessionItem( 'GW_LANG_CD'  , 'KO' );
	
}; // end of fi_setLoginInfo
/**
 * fi_setSystemEnv
 * @description	query SCO_SUS_ENV table information
 * @param data
 */
function fi_setSystemEnv( data ) {
	var sysEnv = new Object();

	$.each( data.RK_SYSENV, function( index, entry ) {
		sysEnv[ entry.ENV_CD ] = entry.ENV_VAL === null ? "" : entry.ENV_VAL;
	});
	fc_setSessionItem( 'GW_LOGIN_ENV', sysEnv );
	// check db system environment values
	gwMesEnv.useMultilang = fi_isNull( fc_getSessionItem( 'GW_LOGIN_ENV' ).USE_MULTILANG ) ? gwMesEnv.useMultilang : fc_getSessionItem( 'GW_LOGIN_ENV' ).USE_MULTILANG;
	gwMesEnv.useCookie    = fi_isNull( fc_getSessionItem( 'GW_LOGIN_ENV' ).USE_COOKIE    ) ? gwMesEnv.useCookie    : fc_getSessionItem( 'GW_LOGIN_ENV' ).USE_COOKIE;
	gwMesEnv.useMDI       = fc_isNull( sysEnv.USE_MDI ) ? gwMesEnv.useMDI : sysEnv.USE_MDI;

	gwMesEnv.logLevel = fc_isNull( sysEnv.LOG_LEVEL ) ? gwMesEnv.logLevel : sysEnv.LOG_LEVEL;
	gwMesEnv.defaultLanguage = ( fc_getSessionItem( 'GW_LOGIN_ENV' ).DEF_LANG_CD == null || fc_getSessionItem( 'GW_LOGIN_ENV' ).DEF_LANG_CD.trim().length <= 0 )
					? gwMesEnv.defaultLanguage : fc_getSessionItem( 'GW_LOGIN_ENV' ).DEF_LANG_CD.trim();
	fc_makeMessage( gwMesEnv.defaultLanguage );
}; // end of fi_setSystemEnv
/**
 * fi_setLanguageKind
 * @param data
 */
function fi_setLanguageKind( data ) {
	$.each( data.RK_LANGKIND, function( index, entry ) {
		gwLanguageKind.push( { "CD_VAL" : entry.CD_VAL , "CD_NM" : entry.CD_NM } );
	});
}; // end of fi_setLanguageKind
/**
 * fi_setCertType
 * @description	query Common Code CERT_TYPE information
 * @param data
 */
function fi_setCertType( data ) {
	$.each( data.RK_CERT_TYPE, function( index, entry ) {
		gwCertTypeCode.push( { "CD_VAL" : entry.CD_VAL , "CD_NM" : entry.CD_NM } );
	});
}; // end of fi_setCertType
/**
 * fi_setCompanyInfo
 * @param data
 */
function fi_setCompanyInfo( data ) {
	var comInitial = ( fi_isNull( fc_getSessionItem( 'GW_LOGIN_ENV' ).DEF_COM_NM ) ) ? "Posco ICT" : fc_getSessionItem( 'GW_LOGIN_ENV' ).DEF_COM_NM;
	//$( '#copyright > p' ).text( "Copyright by "+ comInitial +". All Rights Reserved." );
	$( '#copyright > p' ).text( "Copyright by LS MnM All Rights Reserved." );
	document.title = comInitial;
}; // end of fi_setCompanyInfo
/**
 * fi_openWindow
 * @param data
 */
function fi_openWindow( data ) {
	var userWidth  = screen.availWidth;
	var userHeight = screen.availHeight;
	var userTop = window.screenTop;
	var userLeft = window.screenLeft;
	//alert( window.screenLeft+'/'+window.screenTop)
	fc_setSessionItem( 'GW_SERVER_INFO', data.SERVER_INFO );

	var mainUrl = '';
//	if ( gwMesEnv.useMDI )
		mainUrl = data.LOGIN_URL;
//	else
//		mainUrl = 'mainSDI.do';

	/*window.open	( mainUrl  // data.LOGIN_URL ,left=0,top=0 ,location=no
				, '_self'
				, 'top=' + userTop +',left=' + userLeft +',height=' + userHeight + ',width=' + userWidth //+ ',resizable=yes,menubar=no,toolbar=no,directories=no,status=no'
				);*/

	window.open	( mainUrl  // data.LOGIN_URL
			, '_self'
			, 'height=' + userHeight + ',width=' + userWidth + ',resizable=yes,menubar=no,toolbar=no,location=no,directories=no,status=no,left=0,top=0'
			);

}; // end of fi_openWindow
/**
 * fi_setCookie
 * @description	save login information to cookie
 */
function fi_setCookie() {
	var checkStatus = $( '#saveId' ).is( ':checked' );        // save id or not
	if ( checkStatus ) {
		$.cookie( 'USERID' , $( '#username' ).val(), { expires: 7, path: '/', secure: false } );
		$.cookie( 'LANG_CD', $( '#LANG_CD option:selected' ).val(),  { expires: 7, path: '/', secure: false } );
		$.cookie( 'LOGIN_CERT_TYPE', $( '#LOGIN_CERT_TYPE option:selected' ).val(), { expires: 7, path: '/', secure: false } );
	}else{
		$.cookie( 'USERID'          , '', { path: '/' } );
		$.cookie( 'LANG_CD'         , '', { path: '/' } );
		$.cookie( 'LOGIN_CERT_TYPE' , '', { path: '/' } );
	};
}; // end of fi_fi_setCookie
/**
 * fc_isNull
 * @param object
 * @param isTrim
 */
function fc_isNull( object, isTrim ) {
	fi_isNull( object, isTrim );
}; // end of fc_isNull
/**
 * fi_isNull
 * @param object
 * @param isTrim
 * @returns
 */
function fi_isNull( object, isTrim ) {
	var _trim = ( isTrim == undefined ) ? true : false;

	if ( typeof object === 'string' && _trim ) {
		return ( object === undefined || object === null || object.trim() == "" || object === 'null' ) ? true : false;
	} else {
		return ( object === undefined || object == null ) ? true : false;
	};
}// end of fi_isNull
/**
 * f_getMessage
 * @param sMessage
 * @returns
 */
function fi_getGwMessage( sMessage ) {
	for ( var loop=1;loop<arguments.length;loop++ ) {
		var regExp1 = new RegExp( "\\{([" + loop + "])\\}","g" );
		sMessage = sMessage.replace( regExp1, arguments[ loop ] );
	};
	return sMessage;
};// end of fi_getGwMessage