<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="content-type" content="text/html;charset=utf-8" />
<%@ include file="./include/include.jsp"%>
<title>알람수신자등록</title>
<script type="text/javascript">
//*********************************************************************************************
// ********** Declare public variable
//*********************************************************************************************
	var gridAlarmUser, gridAlarmUserId, gridAlarmGroup, gridAlarmGroupId, gridAlarmUserSelect, gridAlarmUserSelectId;
	var gridUserExceptSMSEmail, gridUserExceptSMSEmailId;
	var targetColumn  	= fc_getUrlParameter( 'targetColumn' );
	var alarmUserType 	= fc_getUrlParameter( 'alarmUserType' );
	var alarmToUser 	= fc_getUrlParameter( 'alarmToUser' );
	var smsFl 			= fc_getUrlParameter( 'smsFl' );
	var smsTimeFl 		= fc_getUrlParameter( 'smsTimeFl' );
	var kakaoFl 		= fc_getUrlParameter( 'kakaoFl' );
	var kakaoTimeFl 	= fc_getUrlParameter( 'kakaoTimeFl' );
	var kakaoTimeCl 	= fc_getUrlParameter( 'kakaoTimeCl' );
	var emailFl		 	= fc_getUrlParameter( 'emailFl' );
	var alarmToUser2 	= fc_getUrlParameter( 'alarmToUser2' );
	var smsFl2 			= fc_getUrlParameter( 'smsFl2' );
	var emailFl2		= fc_getUrlParameter( 'emailFl2' );
	var alarmToRole 	= fc_getUrlParameter( 'alarmToRole' );
	var plantCd			= fc_getUrlParameter( 'plantCd' );
	var rowid			= fc_getUrlParameter( 'rowid' );

//*********************************************************************************************
// ********** Function Ready Section
//*********************************************************************************************
    $(document).ready(function () {
//     	f_initAddMultiLang();
    	f_initSreen();
    	f_initSearchForm();
     	f_initContents();
    }); // end of ready

    $(window).load(function () {
    	f_lastProc();
    }); // end of ready

//*********************************************************************************************
// ********** initialize screen Section
//*********************************************************************************************
    function f_initSreen() {
    	serviceName = 'ict.screen.master.alarm-service';
//     	time_check_log('f_initSreen');
	}; // end of f_initSreen

//*********************************************************************************************
// ********** Initialize Search Condition Section
//*********************************************************************************************
 	function f_initSearchForm() {
 		fc_makeSearch( '', 'ALARM_USER', '' );
 		fc_setFormRadioValue( 'ALARM_USER_TYPE', [  { id:'radioRole', key:'R'	 , caption:'역할'		, isMultiLanguage: false},
		                             	 		   { id:'radioUser', key:'U'	 , caption:'사용자'	, isMultiLanguage: false}], false );
//  		time_check_log('f_initSearchForm');
	}; // end of f_initSearchForm

//*********************************************************************************************
// ********** Initialize data Section
//*********************************************************************************************
    function f_initContents () {
 		gridAlarmGroup   = fc_makeGrid( 'divGroupList', 'update', 'ALARM_GROUP', '', false );
 		gridAlarmGroupId = gridAlarmGroup.getGridId();
 		gridAlarmGroup.setGridBindEvent( 'rowselect', f_searchGrpDetail );

    	gridAlarmUser   = fc_makeGrid( 'divUserSearch', 'update', 'ALARM_USER', '', true );
    	gridAlarmUserId = gridAlarmUser.getGridId();

 		$('#ALARM_USER_TYPE').on('change', function(event){
 			fc_clearGridData(gridAlarmUserId);
 			f_chageTypeCaption();
 		});
    	gridAlarmUser.setParentGrid( gridAlarmGroupId );

      	gridAlarmUserSelect   = fc_makeGrid( 'divUserSelect', 'update', 'ALARM_USER_SELECT', '', true );
    	gridAlarmUserSelectId = gridAlarmUserSelect.getGridId();
    	gridAlarmUserSelect.setGridBindEvent( 'cellvaluechanged', f_chkSmsFl );

     	gridUserExceptSMSEmail= fc_makeGrid( 'divUserExceptSMSEmail', 'update', 'ALARM_USER_EXCEPT_SMS_EMAIL', '', true );
    	gridUserExceptSMSEmailId = gridUserExceptSMSEmail.getGridId();
//     	time_check_log('f_initContents');
    	f_searchUser();
    	
    	$('#gridAlarmGroup').hide();	// 그룹 그리드  Hidden
    	
    	f_cust1 = null;	// 그룹등록버튼 Hidden
    	f_cust2 = null;	// 그룹삭제버튼 Hidden
	}; // end of f_initContents

    function f_initAddMultiLang() {
    	fc_setMultiItem( [ {itemCd:'ROLE_CD'	, itemValue:'0'}, {itemCd:'ROLE_NM'	, itemValue:'0'},
    	                   {itemCd:'USER_ID'	, itemValue:'1'}, {itemCd:'USER_NM'	, itemValue:'1'},
    					 ]);
    };// end of f_initAddMultiLang

//*********************************************************************************************
// ********** Last Process Job
//*********************************************************************************************
    function f_lastProc() {

		fc_lastProc();

    	$('#SEL_BTN').jqxButton();
		$('#DEL_BTN').jqxButton();

		fc_setInputVal('ALARM_USER_TYPE', alarmUserType);
		f_chageTypeCaption();
		var tgtGridId;
    	$('#SEL_BTN').on('click', function(){
    		tgtGridId = gridAlarmUserSelectId;

    		if (alarmUserType === 'R' && fc_getRadioVal("ALARM_USER_TYPE") === 'U') {
    			tgtGridId = gridUserExceptSMSEmailId;
    		}
    		f_gridDataMoveTo(gridAlarmUserId, tgtGridId, true);
    		fc_selectAllRows(tgtGridId);
    	});

    	$('#DEL_BTN').on('click', function(){
    		tgtGridId = gridAlarmUserSelectId;
    		if (alarmUserType === 'R' && fc_getRadioVal("ALARM_USER_TYPE") === 'U') {
    			tgtGridId = gridUserExceptSMSEmailId;
    		}
    		f_gridDataMoveTo(tgtGridId, gridAlarmUserId, true);
    	});

    }; // end of f_lastProc

	function f_readyProc () {
		f_chageTypeCaption();
		f_applyGridStyle();
    	/* fc_addParam( 'ALARM_USER_TYPE'	, alarmUserType );
    	fc_addParam( 'ALARM_ROLE_CD'  	, alarmUserType === 'R' ? alarmToRole : alarmToUser );
    	fc_addParam( 'ALARM_SMS_FL'		, smsFl );
    	fc_addParam( 'ALARM_SMS_TIME_FL', smsTimeFl );
    	fc_addParam( 'ALARM_EMAIL_FL'  	, emailFl );
    	fc_addParam( 'ALARM_TO_USER2'	, alarmToUser2 );
    	fc_addParam( 'ALARM_SMS_FL2'	, smsFl2 );
    	fc_addParam( 'ALARM_EMAIL_FL2'  , emailFl2 ); */
		
    	var prmParam = {'ALARM_USER_TYPE':alarmUserType, 'ALARM_ROLE_CD':alarmUserType === 'R' ? alarmToRole : alarmToUser
    			       , 'ALARM_SMS_FL':smsFl    ,'ALARM_SMS_TIME_FL':smsTimeFl
    			       , 'ALARM_KAKAO_FL':kakaoFl,'ALARM_KAKAO_TIME_FL':kakaoTimeFl,'ALARM_KAKAO_TIME_CL':kakaoTimeCl
    			       , 'ALARM_EMAIL_FL':emailFl, 'ALARM_TO_USER2':alarmToUser2
    			       , 'ALARM_SMS_FL2':smsFl2  , 'ALARM_EMAIL_FL2':emailFl2
    			       };
    	fc_searchGrid( [ { gridId: gridAlarmUserSelectId	, resultKey: 'RK_ALARM_USER_SELECTED' },
    	                 { gridId: gridUserExceptSMSEmailId	, resultKey: 'RK_ALARM_USER_EXCEPT_SMS_EMAIL' }
    	               ], serviceName, 'searchAlarmUserSelected', null, null, prmParam );
    	fc_selectAllRows(gridAlarmUserSelectId);
    	if ( alarmUserType === 'R' ) fc_selectAllRows(gridUserExceptSMSEmailId);
    }; // end of f_readyProc

//*********************************************************************************************
// ********** Screen Button Event Section
//*********************************************************************************************
    function f_search() {
    	//fc_addParamForm( 'divSearchCondition' );
    	//fc_addParam( 'ALARM_GRP_TYPE'	, alarmUserType );
    	var selectAlarmUserType = alarmUserType;
    	if (alarmUserType === 'R') {
    		selectAlarmUserType = fc_getRadioVal("ALARM_USER_TYPE");
    	}
    	else{
    		selectAlarmUserType = alarmUserType;
    	}
    	
    	//ALARM_USER_NM
    	//ALARM_USER_ID
/*     	fc_addParam( 'ALARM_USER_TYPE'	, selectAlarmUserType );
    	fc_addParam( 'ALARM_TO_USER'  	, alarmToUser);
    	fc_addParam( 'ALARM_TO_ROLE'  	, alarmToRole);
    	fc_addParam( 'ALARM_TO_USER2'  	, alarmToUser2); */
    	
		var prmParam = {'ALARM_USER_NM':$('#ALARM_USER_NM').val(),'ALARM_USER_ID':$('#ALARM_USER_ID').val(),'ALARM_GRP_TYPE':alarmUserType,'ALARM_USER_TYPE':selectAlarmUserType, 'ALARM_TO_USER':alarmToUser, 'ALARM_TO_ROLE':alarmToRole, 'ALARM_TO_USER2':alarmToUser2};
    	console.log(prmParam);
    	fc_searchGrid( [ { gridId: gridAlarmGroupId, resultKey: 'RK_ALARM_GROUP' }, { gridId: gridAlarmUserId, resultKey: 'RK_ALARM_USER' } ]
    					, serviceName, 'searchAlarmUser' , null, null, prmParam);
    	//fc_clearGridData(gridAlarmUserSelectId);
    }; // end of f_search

    function f_searchGrpDetail() {
        if ( fc_getGridRecordCount( gridAlarmGroupId ) <= 0 ) return;
/*     	fc_addParam( 'ALARM_GRP_ID'		, args.row.ALARM_GRP_ID);
    	fc_addParam( 'ALARM_GRP_TYPE'	, alarmUserType ); */
    	
		var prmParam = {'ALARM_GRP_ID':args.row.ALARM_GRP_ID, 'ALARM_GRP_TYPE':alarmUserType};
    	fc_searchGrid( [ { gridId: gridAlarmUserId, resultKey: 'RK_ALARM_GRP_DETAIL' } ], serviceName, 'searchAlarmGroupDetail', null, null, prmParam );
    	//fc_clearGridData(gridAlarmUserSelectId);
    }; // end of f_searchGrpDetail

    function f_searchUser() {
    	fc_addParamForm( 'divSearchCondition' );
    	//fc_addParam( 'ALARM_GRP_TYPE'	, alarmUserType );
		var prmParam = {'ALARM_GRP_TYPE' : alarmUserType};
    	fc_searchGrid( [ { gridId: gridAlarmGroupId, resultKey: 'RK_ALARM_GROUP' }, { gridId: gridAlarmUserId, resultKey: 'RK_ALARM_GRP_DETAIL' } ]
    					, serviceName, 'searchAlarmGroup', null, null, prmParam );
    	fc_clearGridData(gridAlarmUserSelectId);
    }; // end of f_searchUser

    function f_save() {
     	fc_addParamForm( 'divSearchCondition' );
    	fc_saveGrid( [ gridAlarmUserId ], '', serviceName, 'saveAlarm', null, null, null, f_saveAfter );
    }; // end of f_save

    function f_saveAfter () {
    	fc_setGridData( [ { gridId: gridAlarmGroupId, resultKey: 'RK_ALARM_GROUP' } ] );
    }; // end of f_saveAfter

    function f_delete() {
    	fc_deleteGrid( [ gridAlarmUserId ], '', serviceName, 'deleteAlarm' );
    }; // end of f_delete

    function f_cust1() {
    	var alarmGrpNm = prompt('알람그룹명을 입력하세요.');
    	if(fc_isNull(alarmGrpNm)) {
    		fc_showMessageBox( '알람그룹명을 입력하세요.', 'E' );
    		return;
    	}
    	fc_addParam( 'PLANT_CD'			, plantCd );
    	fc_addParam( 'ALARM_GRP_TYPE'	, fc_getRadioVal("ALARM_USER_TYPE") );
    	fc_submit( '', serviceName, 'searchAlarmGrpID', '','','SCO' );
    	fc_addParam( 'PLANT_CD'			, plantCd );
    	fc_addParam( 'ALARM_GRP_TYPE'	, fc_getRadioVal("ALARM_USER_TYPE") );
		$.each(window.gwJsonResult.RK_ALARM_GROUP_ID, function(key, value){
			console.log('value.ALARM_GRP_ID : ' + value.ALARM_GRP_ID);
			fc_addParam( 'ALARM_GRP_ID', value.ALARM_GRP_ID );
		});
    	fc_addParam( 'ALARM_GRP_NM'		, alarmGrpNm );
    	fc_saveGrid( [ gridAlarmUserSelectId ], '', serviceName, 'saveAlarmGroup', null, null, null, f_saveAfter );
    }; // end of f_cust1

    function f_cust2() {
    	fc_addParam( 'PLANT_CD'			, plantCd );
    	fc_addParam( 'ALARM_GRP_TYPE'	, fc_getRadioVal("ALARM_USER_TYPE") );
    	fc_deleteGrid( [ gridAlarmGroupId ], '', serviceName, 'deleteAlarmGroup' );
    }; // end of f_cust2

    function f_cust3() {
    	var rowCnt = fc_getGridRecordCount(gridAlarmUserSelectId)
		for(var i = 0; i < rowCnt; i++ ) {
			fc_setCellData( gridAlarmUserSelectId, i, 'JQX_CB',  true);
		}

    	f_sendGridData();
    }; // end of f_cust2

//*********************************************************************************************
// ********** User Defined Function Section
//*********************************************************************************************
	function f_chkSmsFl(){
		if(args.datafield == 'ALARM_SMS_FL'){
			if(!args.value){
				fc_setCellData(gridAlarmUserSelectId, args.rowindex, 'ALARM_SMS_TIME_FL',false);
			}
		}
		
		if(args.datafield == 'ALARM_KAKAO_FL'){
			if(!args.value){
				fc_setCellData(gridAlarmUserSelectId, args.rowindex, 'ALARM_KAKAO_TIME_FL',false);
			}
		}

	}

	function f_gridDataMoveTo(oriGridId, targetGridId, bDeleteData ) {
		var selectedRowIdxs = fc_getSelectedRow(oriGridId);
		for(var i = 0; i < selectedRowIdxs.length; i++ ) {
			fc_addRowData(targetGridId, null, fc_getRowData( oriGridId, selectedRowIdxs[i] ));
		}
		if( bDeleteData ) {
			for(var i = selectedRowIdxs.length -1; i >= 0  ; i-- ) {
				fc_delRowData( oriGridId, fc_getRowId( oriGridId, selectedRowIdxs[i]) );
			}
		}
		fc_resetSelection( targetGridId );
		fc_resetSelection( oriGridId );
	}// end of f_gridDataMoveTo

	function f_sendGridData() {
		var sendData = [];
		/*
		var selectedRowIdxs = fc_getSelectedRow(gridAlarmUserSelectId);
		for (var i = 0; i < selectedRowIdxs.length; i++) {
			console.log('################'+i);
			sendData.push(fc_getRowData(gridAlarmUserSelectId, selectedRowIdxs[i]));
		}*/
		var rowCnt = fc_getGridRecordCount(gridAlarmUserSelectId)
		for(var i = 0; i < rowCnt; i++ ) {
			if(fc_getCellData( gridAlarmUserSelectId, i, 'JQX_CB')){
				console.log('################'+i);
				sendData.push(fc_getRowData(gridAlarmUserSelectId, i));
			}
		}

		parent.f_receiveGridData(targetColumn, sendData, rowid);

		sendData = [];
		if ( alarmUserType === 'R' ) {
			selectedRowIdxs = fc_getSelectedRow(gridUserExceptSMSEmailId);
			for (var i = 0; i < selectedRowIdxs.length; i++) {
				sendData.push(fc_getRowData(gridUserExceptSMSEmailId, selectedRowIdxs[i]));
			}
			parent.f_receiveGridData2(targetColumn, sendData, rowid);
		}

		$('#mnuCloseBtn').trigger('click');
	}// end of f_sendGridData

	function f_chageTypeCaption() {
		var columText1 = '', columnText2 = '';
		if( fc_getRadioVal("ALARM_USER_TYPE") === 'R' ) {
				columText1 = '역할코드'	//fc_getMultiItem('ROLE_CD');
				columText2 = '역할명'		//fc_getMultiItem('ROLE_NM');

				fc_setColHidden(gridAlarmUserSelectId, ["ALARM_SMS_FL","ALARM_SMS_TIME_FL","ALARM_EMAIL_FL"]);
		}
		else{
			columText1 = '사용자ID'	//fc_getMultiItem('USER_ID');
			columText2 = '사용자명'	//fc_getMultiItem('USER_NM');

			fc_setColShow(gridAlarmUserSelectId, ["ALARM_SMS_FL","ALARM_SMS_TIME_FL","ALARM_KAKAO_FL","ALARM_KAKAO_TIME_FL","ALARM_KAKAO_TIME_CL","ALARM_EMAIL_FL"]);

		}
		$('#'+ gridAlarmUserId).jqxGrid('setcolumnproperty', 'ROLE_CD', 'text', columText1);
		$('#'+ gridAlarmUserId).jqxGrid('setcolumnproperty', 'ROLE_NM', 'text', columText2);

		if ( !(fc_getRadioVal("ALARM_USER_TYPE") === 'U' && alarmUserType === 'R') ) {
			$('#'+ gridAlarmUserSelectId).jqxGrid('setcolumnproperty', 'ROLE_CD', 'text', columText1);
			$('#'+ gridAlarmUserSelectId).jqxGrid('setcolumnproperty', 'ROLE_NM', 'text', columText2);
			fc_setColHidden( gridAlarmUserId, ['ROLE_NM2'] );
		}
		else{
			fc_setColShow(gridAlarmUserId, ["ROLE_NM2"]);
		}
	}// end of f_chageTypeCaption

	function f_applyGridStyle(){
		if( alarmUserType === 'R' ) {
			$('#divUserSelect').css('height', '50%');
			$('#divUserExceptSMSEmail').css('height', '50%');
		}
		else{
			$('#divUserSelect').css('height', '100%');
		}
		f_resizeWindow();

	}// end of f_applyGridStyle

	function f_resizeWindow(){
	    var evt = document.createEvent( 'UIEvents' );
	    evt.initUIEvent( 'resize', true, false, window, 0 );
	    window.dispatchEvent( evt );
	}// end of f_resizeWindow

    function time_check_log(funcName) {
    	console.log('SCOA0050 : ' + funcName + '========>' + fc_getCurrentDateTime());
    }
</script>
</head>
<body>
	<div id="divContainer">
		<div id="divTitle">
			<%@ include file="./include/includeTitle.jsp" %>
		</div>
		<div id="divSearchCondition"></div>
		<div id="divContents">
			<div id="divUserInfo" style="height:100%;width:340px; float:left;">
<!-- 				<div id="divGroupList" 	style="height:50%;width:100%;"></div>
				<div id="divUserSearch" style="height:50%;width:100%;"></div> -->
				<div id="divUserSearch" style="height:100%;width:100%;"></div>
			</div>
			<div id="divBtnInfo" style="height:100%;width:70px;float:left;">
				<table style="height:100%;" class="arrow_group">
					<tr class="right">
						<td><input id= "SEL_BTN" type="button"></td>
					</tr>
					<tr class="left">
						<td><input id= "DEL_BTN" type="button"></td>
					</tr>
				</table>
			</div>
			<div id="divUserSelectInfo" style="width:calc(100% - 410px); float:left;">
				<div id="divUserSelect" style="height:100%;width:100%;"></div>
				<div id="divUserExceptSMSEmail" style="height:0%; width:100%;"></div>
			</div>
		</div>
	</div>
	<div id="divMessage">
		<%@ include file="./include/includeMessage.jsp" %>
	</div>
</body>
</html>