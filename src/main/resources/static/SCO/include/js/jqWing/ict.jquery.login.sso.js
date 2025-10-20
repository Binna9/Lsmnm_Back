/**
 * fi_ajaxLogin
 * @description	Ajax SSO Login
 */
function fi_ssoLogin(userId) {
	var isSuccess = false;
	$.ajax({
		type     : 'POST',
		dataType : 'json',
		url      : 'loginProc.json',
		async    : false,
		data     : 'ServiceName=ict.sys.login-service&CertifyBySSO=1&USER_ID='+userId,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		success  : function( data ) {
			var checkResult = data.LOGIN_RESULT;
			if ( !fi_isNull(checkResult) && checkResult == 'success' ) {
				//success : goto sf main
				//alert('go main');
				isSuccess = true;

				fi_setLoginInfo(data);
				fi_openWindow(data); //main.do
				fi_loginClose();

			}else{

				isSuccess = false;

				fi_openWindow(data);  //login.do
				fi_loginClose();
			}

		}
	    /*
		,error  : function( jqXHR, textStatus, errorThrown ) {
			alert( '[' + jqXHR.status + '] ' + textStatus + ': ' + errorThrown );
			var data = {LOGIN_URL:'login.jsp'}; //for test
			fi_openWindow(data); //login.do
			fi_loginClose();
		}*/

	});

	if(!isSuccess){
		//alert("[Invaild SSO]\nRegister Smart Factory User Information."); //todo :한글
		alert("SSO 인증에 성공하였으나, \nSmart Factory 사용사 또는 권한 정보가 없습니다.\n\n등록 후 사용하시길 바랍니다."); //todo :한글
	}


}; // end of fi_ajaxLogin

/**
 * fi_setLoginInfo
 * @description	save login information to SessionStorage
 * @param data
 */
function fi_setLoginInfo( data ) {

	fc_setSessionItem( 'GW_CLIENT_IP', data.USER_CLIENT_IP );
	
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
		fc_setSessionItem( 'GW_LINE_CD', item.LINE_CD );
//		fc_setSessionItem( 'GW_PASSWD_EXPIRE_DT', item.PASSWD_EXPIRE_DT );

	});
	fc_setSessionItem( 'GW_LANG_CD'  , 'KO' );
}; // end of fi_setLoginInfo

/**
 * fi_openWindow
 * @param data
 */
function fi_openWindow( data ) {
	var userWidth  = screen.availWidth;
	var userHeight = screen.availHeight;
	fc_setSessionItem( 'GW_SERVER_INFO', data.SERVER_INFO );

	var mainUrl = mainUrl = data.LOGIN_URL;
	window.open	( mainUrl  // data.LOGIN_URL
				, '_self'
				, 'height=' + userHeight + ',width=' + userWidth + ',resizable=yes,menubar=no,toolbar=no,location=no,directories=no,status=no,left=0,top=0'
				);
}; // end of fi_openWindow

/**
 * fi_loginClose
 */
function fi_loginClose() {
	setTimeout( function () { window.open( '','_self' ).close(); }, 1000 );
}; // END OF fc_loginClose

/**
 * fi_isNull
 * @param object
 * @param isTrim
 * @returns
 */
function fi_isNull( object ) {
	
	// object.trim() == ""
	
	if ( typeof object === 'string' ) {
		return ( object === undefined || object === null || object === 'null' ) ? true : false;
	} else {
		return ( object === undefined || object == null ) ? true : false;
	};
}// end of fi_isNull

