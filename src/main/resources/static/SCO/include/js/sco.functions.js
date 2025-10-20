/**
 * Declare constants
 */

var STRCT_TY = "1";
var CUR_PLANT_CD = "K123"
/**
 * Declare Variable
 */

/**
 * Declare Initial JS Function
 */
$(function () {
    fc_showLog( 1, '***** sco.functions.js Main');
}); // end of $(function ())
/* ==========================================================================================================
 * MES Common Functions
 * =========================================================================================================*/
/**
 * fm_getSearchItems
 * @param sKey
 * @param sSubKey
 * @param attribute1
 * @param attribute2
 * @returns {___anonymous4016_4023}
 */
function fm_getSearchItems( sKey, sSubKey, attribute1, attribute2 ) {
    var objItems = null;

    switch ( sKey ) {
    case 'USER_INFO' : // SCOD0010, SCOC0070, SCOC0040
        objItems =  [
                    {groupname: 'divSearch1', caption: 'User ID'   , name: 'USER_ID', width: 170, datatype: 'popup', maxlength: 20 },
                    {groupname: 'divSearch1', caption: 'User Name' , name: 'USER_NM', width: 150, datatype: 'text'},
                    {groupname: 'divSearch1', caption: 'Use Yes/No', name: 'USER_YN', width: 150, datatype: 'radio', itemCd: 'USE_YN'},
                    {groupname: 'divSearch1', caption: '비밀번호 미등록'   , name: 'PASSWD_YN' , width: 110 , datatype: 'checkbox'},
                    {groupname: 'divSearch1', caption: 'User Type' , name: 'USER_TY', width: 150, datatype: 'lov'}
                    ];
        if ( fc_isNull( sSubKey ) ) { // SCOD0010
            objItems.push( {groupname: 'divSearch1', caption: 'Init.Password', name: 'INIT_PWD_BTN', width: 130, datatype: 'button', itemCd: 'CAP_INIT_PWD_BTN'} );
        } else if ( sSubKey == 'NOT_INCLUDE_USE_YN' ) {
            objItems.splice( 2,2 );
        } else if ( sSubKey == 'MAP' ) {
            objItems.push( {groupname: 'divSearch1', caption: 'Menu Information (Exclusion)', name: 'MNU_MAPPED_EX', itemCd: 'CAP_MNU_INFO_EX', width: 150, datatype: 'radio'} );
        };
        fc_addCodeList  ( {object: 'USER_ID', code: 'USER_LIST', title: 'User List', manKey: '' }, { itemCd: 'CAP_USER_INFO', itemValue: 0 } );
        break;
    case 'EMP_INFO' : // SCOD0020, SCOD0030
        objItems =  [
                  //    {groupname: 'divSearch1', caption: 'Plant Cd'     , name: 'PLANT_CD', width: 100, datatype: 'lov' , itemCd: 'PLANT_CD'},
                    {groupname: 'divSearch1', caption: 'Employee No'  , name: 'EMP_NO', width: 150, datatype: 'popup', uppercase: true },
                    {groupname: 'divSearch1', caption: 'Employee Name', name: 'EMP_NM', width: 200, datatype: 'text'}
                    ];
        fc_addCodeList  ( {object: 'EMP_NO', code: 'EMP_LIST', title: '사원정보'}, { itemCd: 'CAP_EMP_INFO', itemValue: 0 } );
        
        break;
    case 'SCREEN_INFO' : // SCOC0010
        objItems =  [
                    {groupname: 'divSearch1', caption: 'Biz Chain'  , name: 'BIZ_CHAIN_CD', width: 130, datatype: 'lov' },
                    {groupname: 'divSearch1', caption: 'Screen Id'  , name: 'SCR_ID'      , width: 100, datatype: 'text' , uppercase: true },
                    {groupname: 'divSearch1', caption: 'Screen Name', name: 'SCR_NM'      , width: 250, datatype: 'text' }
                    ];
        break;
    case 'ROLE_INFO' : // SCOC0050, SCOC0060, SCOC0080
        objItems =  [
                    {groupname: 'divSearch1', caption: 'Role Code', name: 'ROLE_CD', width: 150, datatype: 'popup', uppercase: true, maxlength: 15 },
                    {groupname: 'divSearch1', caption: 'Role Name', name: 'ROLE_NM', width: 200, datatype: 'text'}
                    ];
        if( sSubKey == 'ROLE_BUTTON') {
            objItems.push( {groupname: 'divSearch1', caption: 'Menu'        , name: 'MENU_L_CATEGORY', width: 200, datatype: 'lov'   , itemCd: 'CAP_MENU_L_CATEGORY'} );
            objItems.push( {groupname: 'divSearch1', caption: 'Collapse All', name: 'COLLAPSE_ALL'   , width: 100, datatype: 'button', itemCd: 'CAP_COLLAPSE_ALL'} );
            objItems.push( {groupname: 'divSearch1', caption: 'Expand All'  , name: 'EXPAND_ALL'     , width: 100, datatype: 'button', itemCd: 'CAP_EXPAND_ALL'} );

            fc_addDataInGettedLov ( 'MENU_L_CATEGORY'        , {code: 'MENU_L_CATEGORY', tags: '', alias: ''} );
            fc_addDataInSettingLov( {object: 'MENU_L_CATEGORY', code: 'MENU_L_CATEGORY', format: 'V', nullable: true, defval: ''} );
        };
        fc_addCodeList  ( {object: 'ROLE_CD', code: 'ROLE_LIST', title: 'Role List', manKey: '' }, { itemCd: 'CAP_ROLE_INFO', itemValue: 0 } );
        break;
    case 'DEPT_INFO' : // SCOC0075
        objItems =  [
                    {groupname: 'divSearch1', caption: '부서코드' , name: 'DEPT_CD', width: 170, datatype: 'popup', maxlength: 20, isMultiLanguage: false},
                    {groupname: 'divSearch1', caption: '부서명' , name: 'DEPT_NM', width: 150, datatype: 'text', isMultiLanguage: false},
                    {groupname: 'divSearch1', caption: '직계명' , name: 'LINE_NM', width: 150, datatype: 'text', isMultiLanguage: false},
                    {groupname: 'divSearch1', caption: '직책명' , name: 'DUTY_NM', width: 150, datatype: 'text', isMultiLanguage: false},
                    ];
        fc_addCodeList  ( {object: 'DEPT_CD', code: 'DEPT_NM_LIST', title: 'Dept List', manKey: '' }, { itemCd: 'CAP_DEPT_INFO', itemValue: 0 } );
        break;
    case 'MENU_MAP_USER' : // SCOC0060
        objItems =  [
                    {caption: 'ScreenID'    , name: 'SCR_ID'           , width:  80, datatype: 'text'   , upJpercase: true },
                    {caption: 'ScreenName'  , name: 'SCR_NM'           , width: 120, datatype: 'text'  },
                    {caption: 'BizChainCode', name: 'BIZ_CHAIN_CD'     , width: 100, datatype: 'lov'   },
                    {caption: 'Program Type', name: 'PGM_TY'           , width:  90, datatype: 'cbolov'},
                    {caption: 'Search'      , name: 'SCREEN_SEARCH_BTN', width: 130, datatype: 'button' , itemCd: 'CAP_SEARCH'}
                    ];
        break;
    case 'GLOSSARY_INFO' : // SCOA0010, SCO361
        objItems =  [
                    {groupname: 'divSearch1', caption: 'Glossary'     , name: 'GLOSSARY_CD', width: 150, datatype: 'text', itemCd: 'CAP_GLOSSARY', uppercase: true },
                    {groupname: 'divSearch1', caption: 'Glossary Name', name: 'GLOSSARY_NM', width: 250, datatype: 'text'}
                    ];
        break;
    case 'ITEM_INFO' : // SCOA0020, SCOE0010
        objItems = [
                    {groupname: 'divSearch1', caption: 'Item Type', name: 'ITEM_FL', width: 120, datatype: 'lov'},
                    {groupname: 'divSearch1', caption: 'Item Code', name: 'ITEM_CD', width: 160, datatype: 'text', uppercase: true },
                    {groupname: 'divSearch1', caption: 'Item Name', name: 'ITEM_NM', width: 200, datatype: 'text'}
                    ];
        break;
    case 'MESSAGE_INFO' : // SCOA0030, SCOE0040
        objItems =  [
                    {groupname: 'divSearch1', caption: 'Message Type', name: 'MSG_TY' , width: 100, datatype: 'lov' , itemCd: 'MSG_TY'},
                    {groupname: 'divSearch1', caption: 'Message ID'  , name: 'MSG_ID' , width: 100, datatype: 'text', uppercase: true },
                    {groupname: 'divSearch1', caption: 'Message'     , name: 'MESSAGE', width: 250, datatype: 'text', itemCd: 'CAP_MSG'}
                    ];
        if( sSubKey == 'MULTI') {
            objItems.push( {groupname: 'divSearch1', caption: 'Remarks', name: 'REMARKS', width: 250, datatype: 'text'});
        };
        break;
    case 'ALARM_INFO' : // SCOA0040
        objItems =  [
                    {groupname: 'divSearch1', caption: '공장 구분'          , name: 'PLANT_CD'              , width: 100, datatype: 'lov' , isMultiLanguage: false, itemCd: 'PLANT_CD'},
                    {groupname: 'divSearch1', caption: '업무 구분'          , name: 'BIZ_CHAIN_CD'          , width: 100, datatype: 'lov' , isMultiLanguage: false, itemCd: 'BIZ_CHAIN_CD'},
                    {groupname: 'divSearch1', caption: '알람 유형'          , name: 'ALARM_TYPE'            , width: 100, datatype: 'lov' , isMultiLanguage: false, itemCd: 'ALARM_TYPE'},
                    {groupname: 'divSearch1', caption: '알람 ID'          , name: 'ALARM_ID'              , width: 100, datatype: 'text', isMultiLanguage: false, itemCd: 'ALARM_ID'      , uppercase: true },
                    {groupname: 'divSearch1', caption: '알람 메시지 ID'      , name: 'ALARM_MSG_ID'          , width: 100, datatype: 'text', isMultiLanguage: false, itemCd: 'ALARM_MSG_ID'  , uppercase: true },
                    {groupname: 'divSearch1', caption: '알람 메시지 내용'  , name: 'ALARM_MSG_CONTENTS'    , width: 250, datatype: 'text', isMultiLanguage: false, itemCd: 'ALARM_MSG_CONTENTS'}
                    ];
        break;
    case 'ALARM_USER' : // SCOA0050
        objItems =  [
                    {groupname: 'divSearch1', caption: 'Alarm User Type'        , name: 'ALARM_USER_TYPE'   , width: 100, datatype: 'radio' , itemCd: 'ALARM_USER_TYPE' , hidden:true},
                    {groupname: 'divSearch1', caption: '사용자ID'          , name: 'ALARM_USER_ID'     , width: 100, datatype: 'text'  , isMultiLanguage: false},
                    {groupname: 'divSearch1', caption: '사용자명'       , name: 'ALARM_USER_NM'     , width: 100, datatype: 'text'  , isMultiLanguage: false}
                    ];
        break;
    case 'ALARM_LOG' : // SCOA0060
        objItems =  [
                    {groupname: 'divSearch1', caption: '공장 구분'      , name: 'PLANT_CD'              , width: 80, isMultiLanguage: false, datatype: 'lov' , itemCd: 'PLANT_CD'},
                    {groupname: 'divSearch1', caption: '업무구분'       , name: 'BIZ_CHAIN_CD'          , width: 100, isMultiLanguage: false, datatype: 'lov' , itemCd: 'BIZ_CHAIN_CD'},
                    {groupname: 'divSearch1', caption: '알람 유형'      , name: 'ALARM_TYPE'            , width: 100, isMultiLanguage: false, datatype: 'lov' , itemCd: 'ALARM_TYPE'},
                    {groupname: 'divSearch1', caption: '발송 유형'      , name: 'ALARM_SEND_TYPE'       , width: 80, isMultiLanguage: false, datatype: 'lov' , itemCd: 'ALARM_SEND_TYPE'},
                    {groupname: 'divSearch1', caption: '알람 시간'     , name: 'ALARM_DTM'              , width: 160, datatype: 'daterange', target: ['ALARM_DTM_STA', 'ALARM_DTM_END', 'datetime'], itemCd: 'ALARM_DTM'},
                    {groupname: 'divSearch1', caption: '알람 로그 ID'   , name: 'ALARM_LOG_ID'          , width: 120, isMultiLanguage: false, datatype: 'text', itemCd: 'ALARM_LOG_ID',hidden:true},
                    {groupname: 'divSearch1', caption: '알람 ID'      , name: 'ALARM_ID'              , width: 80, isMultiLanguage: false, datatype: 'text', itemCd: 'ALARM_ID'},
                    {groupname: 'divSearch1', caption: '알람 메시지 ID' , name: 'ALARM_MSG_ID'           , width: 100, isMultiLanguage: false, datatype: 'text', itemCd: 'ALARM_MSG_ID', uppercase: true ,hidden:true},
                    {groupname: 'divSearch1', caption: '알람 메시지 내용', name: 'ALARM_MSG_CONTENTS'  , width: 150, isMultiLanguage: false, datatype: 'text', itemCd: 'ALARM_MSG_CONTENTS'},
                    /*{groupname: 'divSearch1', caption: 'Attr1~5'    , name: 'ALARM_MSG_ATTRS'     , width: 120, isMultiLanguage: false, datatype: 'text'},*/
                    {groupname: 'divSearch1', caption: '확인 여부'  , name: 'CONF_YN'               , width: 70, isMultiLanguage: false, datatype: 'lov' , itemCd: 'CONF_YN'}
                    ];
        fc_addDataInGettedLov ( 'BIZ_CHAIN_CD', {code: 'BIZ_CHAIN_CD', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: 'BIZ_CHAIN_CD' , code: 'BIZ_CHAIN_CD', format: 'V', nullable: true , defval: ''} );
        
        fc_addDataInGettedLov ( 'ALARM_SEND_TYPE', {code: 'ALARM_SEND_TYPE', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: 'ALARM_SEND_TYPE'        , code: 'ALARM_SEND_TYPE', format: 'V', nullable: true, defval: 'N'} );
        
        break;
    case 'CODE_MASTER_INFO' : // SCOB0010, SCOE0020
        objItems =  [
                    {groupname: 'divSearch1', caption: 'Plant Code' , name: 'PLANT_CD'    , width: 130, datatype: 'lov',hidden:true},
                    {groupname: 'divSearch1', caption: 'Biz Chain'  , name: 'BIZ_CHAIN_CD', width: 130, datatype: 'lov'},
                    {groupname: 'divSearch1', caption: 'Master Code', name: 'MASTER_CD'   , width: 140, datatype: 'text', uppercase: true },
                    {groupname: 'divSearch1', caption: 'Master Name', name: 'MASTER_NM'   , width: 200, datatype: 'text'}
                    ];

        fc_addDataInGettedLov ( 'PLANT_CD', {code: 'PLANT_CD', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: 'PLANT_CD' , code: 'PLANT_CD', format: 'V', nullable: false , defval: ''} );
        break;
    case 'QUERY_MASTER' : // SCOG0040
        objItems =  [
                    {groupname: 'divSearch1', caption: 'Biz Chain' , name: 'BIZ_CHAIN_CD', width: 130, datatype: 'lov'},
                    {groupname: 'divSearch1', caption: 'Query Type', name: 'QUERY_TYPE'  , width:  80, datatype: 'lov'},
                    {groupname: 'divSearch1', caption: 'Query ID'  , name: 'QUERY_ID'    , width: 200, datatype: 'text', uppercase: true }
                    ];
        break;
    case 'CODE_DETAIL_INFO' : // SCOB0020, SCOE0030
        var hiddenFlag = false;
        if ( !fc_isNull( sSubKey ) ) {
            hiddenFlag = true;
        };
        objItems = [
                    {groupname: 'divSearch1', caption: 'Plant Code' , name: 'PLANT_CD'    , width: 150, datatype: 'lov',hidden:true},
                    {groupname: 'divSearch1', caption: 'Biz Chain'  , name: 'BIZ_CHAIN_CD', width: 120, datatype: 'lov'  , hidden: hiddenFlag },
                    {groupname: 'divSearch1', caption: 'Master Code', name: 'MASTER_CD'   , width: 150, datatype: 'text' , uppercase: true },
                    {groupname: 'divSearch1', caption: 'Master Name', name: 'MASTER_NM'   , width: 150, datatype: 'text'},
                    {groupname: 'divSearch1', caption: 'Code Value' , name: 'CD_VAL'      , width: 150, datatype: 'text' , uppercase: true },
                    {groupname: 'divSearch1', caption: 'Code Name'  , name: 'CD_NM'       , width: 150, datatype: 'text'},
                    //{groupname: 'divSearch1', caption: 'Zoom In'    , name: 'Z_IN'        , width: 150, datatype: 'button', isMultiLanguage: false},//for test
                    //{groupname: 'divSearch1', caption: 'Zoom Out'   , name: 'Z_OUT'       , width: 150, datatype: 'button', isMultiLanguage: false},//for test
                    //{groupname: 'divSearch1', caption: 'Zoom Reset' , name: 'Z_RESET'     , width: 150, datatype: 'button', isMultiLanguage: false}//for test
                    ];
        fc_addDataInGettedLov ( 'PLANT_CD', {code: 'PLANT_CD', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: 'PLANT_CD' , code: 'PLANT_CD', format: 'V', nullable: false , defval: ''} );
        fc_addDataInGettedLov ( 'BIZ_CHAIN_CD', {code: 'BIZ_CHAIN_CD', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: 'BIZ_CHAIN_CD', code: 'BIZ_CHAIN_CD', format: 'V', nullable: true, defval: ''} );
        break;
    case 'MULTI_LANG_INFO' : // SCOE0060
        objItems =  [
                    {groupname: 'divSearch1', caption: 'Category', name: 'CATEGORY', width: 130, datatype: 'lov'},
                    {groupname: 'divSearch1', caption: 'Item'    , name: 'ITEM_CD' , width: 180, datatype: 'text', itemCd: 'CAP_ITEM', uppercase: true },
                    {groupname: 'divSearch1', caption: 'Contents', name: 'CONTENTS', width: 150, datatype: 'text'}
                    ];
        break;
    case 'BIZ_ENV' : // SCOG0020
        var hiddenFlag = false;
        if ( !fc_isNull( sSubKey ) ) {
            hiddenFlag = true;
        };
        objItems =  [
                    {groupname: 'divSearch1', caption: 'Biz Chain', name: 'BIZ_CHAIN_CD', width: 130, datatype: 'lov' , hidden: hiddenFlag},
                    {groupname: 'divSearch1', caption: 'Env.Key'  , name: 'ENV_KEY'     , width: 200, datatype: 'text', itemCd: 'CAP_ENV_KEY', uppercase: true}
                    ];
        break;
    case 'PKG_LOG' : // SCOG0050
        objItems =  [
                    {groupname: 'divSearch1', caption: 'Package ID', name: 'PKG_ID'    , width: 130, datatype: 'text'     , uppercase: true},
                    {groupname: 'divSearch1', caption: 'Date'      , name: 'LOG_DTM_GR', width: 200, datatype: 'daterange', target: ['LOG_DTM_FR', 'LOG_DTM_TO', 'datetime'], itemCd: 'CAP_DATE'}
                    ];
        break;
    case 'FORMAT_INFO' : // SCOF0010
    case 'FORMAT_ATTR_INFO' : // SCOF0020, SCOF0120
        objItems =  [
                    {groupname: 'divSearch1', caption: 'Plant Code', name: 'PLANT_CD'   , width: 130, datatype: 'lov' , },
                    {groupname: 'divSearch1', caption: 'Owner Chain', name: 'FMT_OWNER', width: 130, datatype: 'lov'  , itemCd: 'CAP_OWNER_CHAIN'},
                    {groupname: 'divSearch1', caption: 'Interface Type', name: 'INF_TY', width: 130, datatype: 'lov'  , itemCd: 'CAP_INF_TY'},
                    {groupname: 'divSearch1', caption: 'Format ID'  , name: 'FMT_ID'   , width: 200, datatype: 'text' , uppercase:true},
                    {groupname: 'divSearch1', caption: 'Format Name', name: 'FMT_NM'   , width: 250, datatype: 'text'}
                    ];
        break;
    case 'TC_INFO' : // SCOF0030, SCOF0040,SCOF0070
        if ( sSubKey == 'SUMMARY' ) { // SCOF0070
            objItems =  [
                        {groupname: 'divSearch1', caption: 'Plant Code', name: 'PLANT_CD'   , width: 130, datatype: 'lov' , },
                        {groupname: 'divSearch1', caption: 'Date'       , name: 'TC_DTM_GR', width: 160, datatype: 'daterange', target: ['TC_DTM_FR', 'TC_DTM_TO', 'datetime'], itemCd: 'CAP_DATE'},
                        {groupname: 'divSearch1', caption: 'Owner.Chain', name: 'TC_OWNER'   , width: 130, datatype: 'lov' , itemCd: 'CAP_OWNER_CHAIN'},
                        {groupname: 'divSearch1', caption: 'TC ID'      , name: 'TC_ID'      , width: 200, datatype: 'lov' , uppercase:true },
                        ];
        } else if ( sSubKey == 'SUMMARY2' ) { // SCOF0110
            objItems =  [
                            {groupname: 'divSearch1', caption: 'Plant Code', name: 'PLANT_CD'   , width: 130, datatype: 'lov' , },
                            {groupname: 'divSearch1', caption: 'Owner.Chain', name: 'TC_OWNER'  , width: 130, datatype: 'lov'      , itemCd: 'CAP_OWNER_CHAIN'},
                            {groupname: 'divSearch1', caption: '전문 ID'      , name: 'TC_ID'     , width: 300, datatype: 'lov'      ,isMultiLanguage: false},
                            {groupname: 'divSearch1', caption: 'Date'       , name: 'TC_DTM_GR' , width: 160, datatype: 'daterange', target: ['TC_DTM_FR', 'TC_DTM_TO', 'datetime'], itemCd: 'CAP_DATE'},
                            ];
            // 공장구분
            fc_addDataInGettedLov ( 'PLANT_CD', {code: 'PLANT_CD', tags: '', alias: ''} );
            fc_addDataInSettingLov( {object: 'PLANT_CD', code: 'PLANT_CD', format: 'V', nullable: true , defval: ''} );
            
            // 업무구분
            fc_addDataInGettedLov ( 'CHAIN_CD', {code: 'CHAIN_CD', tags: '', alias: ''} );
            fc_addDataInSettingLov( {object: 'TC_OWNER', code: 'CHAIN_CD', format: 'V', nullable: true , defval: ''} );
            
            // 전문ID
            fc_addDataInGettedLov ( 'OWNER_TC_CHAIN', {code: 'OWNER_TC_CHAIN', tags: '', alias: ''} );
            fc_addDataInSettingLov( {object: 'TC_ID' , code: 'OWNER_TC_CHAIN'    , format: 'K:V', nullable: true, defval: ''} );
            
        } else if ( sSubKey == 'DB2DB' ) { // SCOF0100
            objItems =  [
                        {groupname: 'divSearch1', caption: 'Plant Code', name: 'PLANT_CD'   , width: 130, datatype: 'lov' , },
                        {groupname: 'divSearch1', caption: 'Owner.Chain', name: 'TC_OWNER'   , width: 130, datatype: 'lov' , itemCd: 'CAP_OWNER_CHAIN'},
                        {groupname: 'divSearch1', caption: 'TC ID'      , name: 'TC_ID'      , width: 200, datatype: 'lov' , uppercase:true },
                        {groupname: 'divSearch1', caption: 'Format ID'  , name: 'FMT_ID'     , width: 250, datatype: 'lov' , uppercase:true },
                        {groupname: 'divSearch1', caption: 'Sender'     , name: 'TC_SENDER'  , width: 100, datatype: 'lov' , itemCd: 'CAP_SENDER'},
                        {groupname: 'divSearch1', caption: 'Receiver'   , name: 'TC_RECEIVER', width: 130, datatype: 'lov' , itemCd: 'CAP_RECEIVER'},
                        {groupname: 'divSearch2', caption: 'Type'       , name: 'TC_LOG_TY'   , width: 100, datatype: 'lov' , itemCd: 'CAP_TY'},
                        {groupname: 'divSearch2', caption: 'Status'     , name: 'TC_STS'      , width: 100, datatype: 'lov' , itemCd: 'CAP_STS'},
                        {groupname: 'divSearch2', caption: 'Date'       , name: 'TC_DTM_GR'   , width: 160, datatype: 'daterange', target: ['TC_DTM_FR', 'TC_DTM_TO', 'datetime'], itemCd: 'CAP_DATE'},
                        ];
                        fc_addDataInGettedLov( 'OWNER_FORMAT' , {code: 'OWNER_FORMAT' , tags: ''   , alias: ''  } );
                        fc_addDataInSettingLov( {object: 'FMT_ID', code: 'OWNER_FORMAT', format: 'K:V', nullable: true, defval: ''} );
                        //fc_addDataInGettedLov ( 'TC_TRANS_TY', {code: 'TC_TRANS_TY', tags: '', alias: ''} );
                        //fc_addDataInSettingLov( {object: 'TC_TRANS_TY', code: 'TC_TRANS_TY', format: 'V', nullable: true, defval: ''} );
        } else if ( sSubKey == 'IF_LOG_SEARCH' ) { // SCOF0130
            objItems =  [
                            {groupname: 'divSearch1', caption: '공장구분'     , name: 'PLANT_CD'   , width: 130, datatype: 'lov' , isMultiLanguage: false},
                            {groupname: 'divSearch1', caption: '업무구분'     , name: 'CHAIN_CD'   , width: 130, datatype: 'lov' , isMultiLanguage: false},
                            {groupname: 'divSearch1', caption: '전문ID'      , name: 'IF_ID'      , width: 300, datatype: 'lov' , isMultiLanguage: false, itemCd: 'CAP_IF_ID'},
                            {groupname: 'divSearch1', caption: 'Log Table'  , name: 'TABLE_ID'   , width: 200, datatype: 'lov' , isMultiLanguage: false , uppercase:true },
//                          {groupname: 'divSearch1', caption: 'Sender'     , name: 'TC_SENDER'  , width: 100, datatype: 'lov' , itemCd: 'CAP_SENDER'},
//                          {groupname: 'divSearch1', caption: 'Receiver'   , name: 'TC_RECEIVER', width: 130, datatype: 'lov' , itemCd: 'CAP_RECEIVER'},
//                          {groupname: 'divSearch2', caption: 'Type'       , name: 'TC_LOG_TY'   , width: 100, datatype: 'lov' , itemCd: 'CAP_TY'},
//                          {groupname: 'divSearch2', caption: 'Status'     , name: 'TC_STS'      , width: 100, datatype: 'lov' , itemCd: 'CAP_STS'},
                            {groupname: 'divSearch1', caption: 'Date'       , name: 'TC_DTM_GR'   , width: 160, datatype: 'daterange', target: ['TC_DTM_FR', 'TC_DTM_TO', 'datetime'], itemCd: 'CAP_DATE'},
                            ];
            // 공장구분
            fc_addDataInGettedLov ( 'PLANT_CD', {code: 'PLANT_CD', tags: '', alias: ''} );
            fc_addDataInSettingLov( {object: 'PLANT_CD'           , code: 'PLANT_CD', format: 'V', nullable: true , defval: ''} );
            // 업무구분
            fc_addDataInGettedLov ( 'CHAIN_CD', {code: 'CHAIN_CD', tags: '', alias: ''} );
            fc_addDataInSettingLov( {object: 'CHAIN_CD'           , code: 'CHAIN_CD', format: 'V', nullable: true , defval: ''} );
            // 전문ID
            fc_addDataInGettedLov ( 'IF_ID', {code: 'OWNER_TC_CHAIN', tags: '', alias: ''} );
            fc_addDataInSettingLov( {object: 'IF_ID' , code: 'OWNER_TC_CHAIN'    , format: 'K:V', nullable: true, defval: ''} );
            // LOG TABLE
            fc_addDataInGettedLov ( 'TABLE_ID', {code: 'OWNER_TC_LOGTABLE_LIST', tags: '', alias: ''} );
            fc_addDataInSettingLov( {object: 'TABLE_ID' , code: 'OWNER_TC_LOGTABLE_LIST', format: 'V', nullable: true, defval: ''} );

        }else { // SCOF0030, SCOF0040
            objItems =  [
                        {groupname: 'divSearch1', caption: 'Plant Code', name: 'PLANT_CD'   , width: 130, datatype: 'lov' , },
                        {groupname: 'divSearch1', caption: 'Owner.Chain', name: 'TC_OWNER'   , width: 130, datatype: 'lov' , itemCd: 'CAP_OWNER_CHAIN'},
                        {groupname: 'divSearch1', caption: 'I/F Type', name: 'INF_TY'   , width: 130, datatype: 'lov' , itemCd: 'INF_TY'},
                        {groupname: 'divSearch1', caption: 'TC ID'      , name: 'TC_ID'      , width: 200, datatype: 'lov' , uppercase:true },
                        {groupname: 'divSearch1', caption: 'Format ID'  , name: 'FMT_ID'     , width: 250, datatype: 'lov' , uppercase:true },
                        {groupname: 'divSearch1', caption: 'Sender'     , name: 'TC_SENDER'  , width: 100, datatype: 'lov' , itemCd: 'CAP_SENDER'},
                        {groupname: 'divSearch1', caption: 'Receiver'   , name: 'TC_RECEIVER', width: 130, datatype: 'lov' , itemCd: 'CAP_RECEIVER'},
                        {groupname: 'divSearch1', caption: 'TC Type'    , name: 'TC_TRANS_TY', width: 130, datatype: 'lov'},
                        ];
            if ( sSubKey == 'LOG' ) { // SCOF0040
                objItems.push( {groupname: 'divSearch2', caption: 'Date'       , name: 'TC_DTM_GR'   , width: 160, datatype: 'daterange', target: ['TC_DTM_FR', 'TC_DTM_TO', 'datetime'], itemCd: 'CAP_DATE'} );
                objItems.push( {groupname: 'divSearch2', caption: 'Type'       , name: 'TC_LOG_TY'   , width: 100, datatype: 'lov' , itemCd: 'CAP_TY'} );
                objItems.push( {groupname: 'divSearch2', caption: 'Status'     , name: 'TC_STS'      , width: 100, datatype: 'lov' , itemCd: 'CAP_STS'} );
                objItems.push( {groupname: 'divSearch2', caption: 'Excetion TC', name: 'TC_EXCEPTION', width: 100, datatype: 'text', itemCd: 'CAP_TC_EXCEPTION'} );
            };
            //fc_addDataInGettedLov ( 'OWNER_FORMAT', {code: 'OWNER_FORMAT', tags: ''   , alias: '', condition: { 'PLANT_CD': $('#PLANT_CD').val() ,  'FMT_OWNER': $('#TC_OWNER').val() } } );
            fc_addDataInGettedLov( 'OWNER_FORMAT' , {code: 'OWNER_FORMAT' , tags: ''   , alias: ''  } );
            fc_addDataInSettingLov( {object: 'FMT_ID', code: 'OWNER_FORMAT', format: 'K:V', nullable: true, defval: ''} );
            fc_addDataInGettedLov ( 'TC_TRANS_TY', {code: 'TC_TRANS_TY', tags: '', alias: ''} );
            fc_addDataInSettingLov( {object: 'TC_TRANS_TY', code: 'TC_TRANS_TY', format: 'V', nullable: true, defval: ''} );
        };
        break;
    case 'TC_LOG_INFO' : // SCOF0060
        objItems =  [
                    {groupname: 'divSearch1', caption: 'Plant Code', name: 'PLANT_CD'   , width: 130, datatype: 'lov' , },
                    {groupname: 'divSearch1', caption: 'TC ID', name: 'TC_ID'    , width: 100, datatype: 'text'     , uppercase:true , maxlength: 5},
                    {groupname: 'divSearch1', caption: 'Date' , name: 'TC_DTM_GR', width: 160, datatype: 'daterange', target: [ 'TC_DTM_FR', 'TC_DTM_TO', 'datetime' ], itemCd: 'CAP_DATE' }
                    ];
         fc_addDataInGettedLov ( 'PLANT_CD', {code: 'PLANT_CD', tags: '', alias: ''} );
         fc_addDataInSettingLov( {object: 'PLANT_CD' , code: 'PLANT_CD', format: 'V', nullable: true , defval: ''} );
        break;
    case 'TC_SIM_INFO' : // SCOF0050
        objItems =  [
                    {groupname: 'divSearch1', caption: 'Plant Code', name: 'PLANT_CD', width: 130, datatype: 'lov'  },
                    {groupname: 'divSearch1', caption: 'Owner Chain', name: 'TC_OWNER', width: 130, datatype: 'lov' , itemCd: 'CAP_OWNER_CHAIN' },
                    {groupname: 'divSearch1', caption: 'TC ID'      , name: 'TC_ID'   , width: 350, datatype: 'lov' , required: true },
                    {groupname: 'divSearch1', caption: ''           , name: 'CNT_SIM' , width:   0, datatype: 'text', hidden: true}
                    ];
            fc_addDataInGettedLov ( 'PLANT_CD', {code: 'PLANT_CD', tags: '', alias: ''} );
            fc_addDataInSettingLov( {object: 'PLANT_CD' , code: 'PLANT_CD', format: 'V', nullable: true , defval: ''} );
            fc_addDataInGettedLov ( 'SYS_MODULE_CD', {code: 'SYS_MODULE_CD', tags: 'SFM', alias: 'SYS_MODULE_CD'} );
            fc_addDataInSettingLov( {object: 'TC_OWNER' , code: 'SYS_MODULE_CD', format: 'V', nullable: true , defval: ''} );
            fc_addDataInGettedLov ( 'OWNER_TC', {code: 'OWNER_TC', tags: '', alias: '' });
            fc_addDataInSettingLov( {object: 'TC_ID' , code: 'OWNER_TC', format: 'K:V', nullable: false , defval: ''} );
        break;
    case 'BULLETIN_LIST' : // SCOZ0010
        objItems =  [
                    {groupname: 'divSearch1', caption: '등록일시' , name: 'UPD_DTM_GR'      , width: 160, datatype: 'daterange', target: ['UPD_DTM_FR', 'UPD_DTM_TO', 'datetime'], isMultiLanguage: false},
                    {groupname: 'divSearch1', caption: '등록자'   , name: 'USER_NM'       , width: 120, datatype: 'text' , isMultiLanguage: false },
                    {groupname: 'divSearch1', caption: '제목'    , name: 'BULLETIN_TITLE', width: 300, datatype: 'text' , isMultiLanguage: false },
                    {groupname: 'divSearch1', caption: ''       , name: 'LOGIN_DEPT_CD' , width:   0, datatype: 'text'  , hidden: true }
                    ];
        break;
    case 'BULLETIN_DETAIL' : // SCOZ0020
        objItems =  [
                    {groupname: 'divSearch1', caption: 'User ID', name: 'USER_ID', width: 170, datatype: 'text', hidden: true }
                    ];
        break;
    case 'MANUAL_MASTER' : // SCOG0030
        objItems =  [
                    {groupname: 'divSearch1', caption: 'Owner Chain'  , name: 'BIZ_CHAIN_CD', width: 100, datatype: 'lov' , itemCd: 'CAP_OWNER_CHAIN', uppercase: true},
                    {groupname: 'divSearch1', caption: 'Function Name', name: 'FUNCTION_NM' , width: 200, datatype: 'text', required: true}
                    ];
        break;
    case 'USER_PW' : // SCOD0040
        objItems =  [
                    {groupname: 'divSearch1', caption: 'User ID'  , name: 'USER_ID'   , width: 170, datatype: 'text', hidden: true },
                    {groupname: 'divSearch1', caption: 'User Name', name: 'USER_NM'   , width: 170, datatype: 'text', hidden: true },
                    {groupname: 'divSearch1', caption: 'Password' , name: 'PASSWD_OLD', width: 170, datatype: 'text', hidden: true }
                    ];
        break;
    case 'MENU_INFO' : // SCOE0050
        objItems =  [
                    {groupname: 'divSearch1', caption: 'Menu ID'   , name: 'MNU_ID', width: 90 , datatype: 'text'  , uppercase: true },
                    {groupname: 'divSearch1', caption: 'Password'  , name: 'MNU_NM', width: 200, datatype: 'text' },
                    {groupname: 'divSearch1', caption: 'Program Id', name: 'PGM_ID', width: 120, datatype: 'popup' , uppercase: true }
                    ];
        fc_addCodeList ( {object: 'PGM_ID', code: 'SCREEN_CD_LIST', title: 'Screen List', manKey: '' }, { itemCd: 'CAP_SCR_INFO', itemValue: 0 } );
        fc_addMultiItem( {itemCd:'SCR_ID'} );
        fc_addMultiItem( {itemCd:'SCR_NM'} );
        fc_addMultiItem( {itemCd:'PGM_TY'} );
        fc_addMultiItem( {itemCd:'CAP_SCR_INFO'} );
        break;
    case 'MAST_CODE_HIST' : // SCOB0040
        objItems =  [
                    {groupname: 'divSearch', caption: 'Change Date', name: 'CD_CHANGE_DTM_GR', width: 170, datatype: 'daterange', target: ['CHANGE_FR_TM', 'CHANGE_TO_TM', 'datetime'], itemCd: 'CAP_CHANGE_DT' },
                    {groupname: 'divSearch', caption: 'Change User', name: 'CHANGE_USER_ID'  , width: 150, datatype: 'text'     , itemCd: 'CHANGE_USER_ID'     , uppercase: true },
                    {groupname: 'divSearch', caption: 'Change User', name: 'CHANGE_USER_NM'  , width: 150, datatype: 'text'     , itemCd: 'CAP_CHANGE_USER_NM'},
                    {groupname: 'divSearch', caption: 'Master Code', name: 'MASTER_CD'       , width: 150, datatype: 'text'     , itemCd: 'MASTER_CD'          , uppercase: true }
                    ];
        break;
    case 'MENU_TREE_SEARCH' : // SCOC0030
        objItems =  [
                    {groupname: 'divMenuSearch', caption: 'Search', name: 'MNU_SEARCH_VAL', width: 100, datatype: 'text' },
                    {groupname: 'divMenuSearch', caption: 'Find'  , name: 'FIND_BTN'  , width: 50 , height:20, datatype: 'button' },
                    {groupname: 'divMenuSearch', caption: 'Clear' , name: 'CLEAR_BTN' , width: 50 , height:20, datatype: 'button' },
                    ];
        break;
    case 'BATCH_JOB_SCH' : // SCOG0060
        objItems =  [
                    {groupname: 'divSearch1', caption: 'Batch Owner'                     , name: 'BATCH_OWNER'        , width: 100, datatype: 'lov' , itemCd: 'CAP_OWNER_CHAIN' },
                    {groupname: 'divSearch1', caption: 'Batch Id'                        , name: 'BATCH_ID'           , width: 100, datatype: 'text'},
                    {groupname: 'divSearch1', caption: 'Remarks'                         , name: 'REMARKS'            , width: 150, datatype: 'text'},
                    {groupname: 'divSearch1', caption: 'Sync Batch Job'                  , name: 'SYNC_BATCH_BTN'     , width: 100, height: 20, datatype: 'button', align: 'center', itemCd: 'CAP_SYNC_BATCH_BTN'  },
                    {groupname: 'divSearch1', caption: 'How to set Scheduling expression', name: 'HOW_SET_SCH_EXP_BTN', width: 100, height: 20, datatype: 'button', align: 'center', itemCd: 'CAP_HOW_SET_SCH_EXP' },
                    ];
        break;
    case 'BATCH_JOB_SCH_LOG' : // SCOG0070
        objItems =  [
                    {groupname: 'divSearch1', caption: 'Batch Id'       , name: 'BATCH_ID'    , width: 140, datatype: 'text', uppercase: true },
                    {groupname: 'divSearch1', caption: 'Executed Result', name: 'BATCH_RESULT', width: 100, datatype: 'lov' , itemCd: 'CAP_RESULT'      },
                    {groupname: 'divSearch1', caption: 'Batch Owner'    , name: 'BATCH_OWNER' , width: 120, datatype: 'lov' , itemCd: 'CAP_OWNER_CHAIN' },
                    ];
        break;
    case 'BATCH_JOB_SCH_LOG_0140' : // SCOG0140
        objItems =  [
                    {groupname: 'divSearch1', caption: '업무구분'           , name: 'BIZ_CHAIN_CD'      , width: 120, datatype: 'lov'   , isMultiLanguage: false    , itemCd: 'CAP_BIZ_CHAIN_CD_CHAIN'},
                    {groupname: 'divSearch1', caption: 'Service ID'     , name: 'SERVICE_ID'        , width: 120, datatype: 'text'  , isMultiLanguage: false    , itemCd: 'CAP_SERVICE_ID'},
                    {groupname: 'divSearch1', caption: 'Transaction ID' , name: 'TRANSACTION_ID'    , width: 120, datatype: 'text'  , isMultiLanguage: false    , itemCd: 'CAP_TRANSACTION_ID'},
                    {groupname: 'divSearch1', caption: '로그날짜'           , name: 'TC_DTM_GR'         , width: 160, datatype: 'daterange', target: ['TC_DTM_FR', 'TC_DTM_TO', 'datetime'], isMultiLanguage: false, itemCd: 'CAP_DATE'}
                    ];
        
        // 업무구분
        fc_addDataInGettedLov ( 'BIZ_CHAIN_CD', {code: 'BIZ_CHAIN_CD', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: 'BIZ_CHAIN_CD', code: 'BIZ_CHAIN_CD', format: 'V', nullable: false , defval: ''} );
        
        break;
    case 'REPORT_INFO' : // SCOC0020
        objItems =  [
                    {groupname: 'divSearch1', caption: 'Biz Chain'  , name: 'BIZ_CHAIN_CD', width: 130, datatype: 'lov' },
                    {groupname: 'divSearch1', caption: 'Report Id'  , name: 'REPORT_ID'   , width: 100, datatype: 'text', uppercase: true },
                    {groupname: 'divSearch1', caption: 'Report Name', name: 'REPORT_NM'   , width: 250, datatype: 'text' }
                    ];
        break;
    case 'SCREEN_HMI_INFO' : // SCOC0090
        objItems =  [
                    {groupname: 'divSearch1', caption: '화면ID'  , name: 'HMI_ID'   , width: 100, datatype: 'text', isMultiLanguage: false, uppercase: true },
                    {groupname: 'divSearch1', caption: '화면명'    , name: 'HMI_NM'   , width: 250, datatype: 'text', isMultiLanguage: false }
                    ];
        break;
    case 'UPLOAD_TAB' : // SCOG0080
        objItems =  [
                    {groupname: 'divSearch1', caption: 'Upload Ty'         , name: 'UPLOAD_TY'      , width: 130, datatype: 'radio' , itemCd: 'CAP_UPLOAD_TY'  , required : true },
                    {groupname: 'divSearch1', caption: 'Owner Chain'       , name: 'BIZ_CHAIN_CD'   , width: 130, datatype: 'lov'   , itemCd: 'CAP_OWNER_CHAIN', required : true },
                    {groupname: 'divSearch1', caption: 'Upload Id'         , name: 'UPLOAD_ID'      , width: 250, datatype: 'popup' , itemCd: 'CAP_UPLOAD_ID'  , uppercase: true, readonly: false },
                    {groupname: 'divSearch1', caption: 'Table Name'        , name: 'TAB_NM'         , width: 250, datatype: 'popup' , itemCd: 'CAP_TAB_NM'     , uppercase: true, readonly: false },
                    {groupname: 'divSearch1', caption: 'Append Row Qty'    , name: 'DATA_ADDROW_QTY', width:  50, datatype: 'number', itemCd: 'CAP_BTN_CLEAR'  , maxlength: 4 },
                    {groupname: 'divSearch1', caption: 'Append Row'        , name: 'DATA_ADDROW'    , width: 130, datatype: 'button', itemCd: 'CAP_INS_ROW'    , align: 'center' },
                    {groupname: 'divSearch1', caption: 'Clear Data'        , name: 'DATA_CLEAR'     , width: 130, datatype: 'button', itemCd: 'CAP_BTN_CLEAR'  , align: 'center' },
                    {groupname: 'divSearch1', caption: 'Call Oracle Object', name: 'ORACLE_PKG'     , width: 130, datatype: 'text'  , hidden: true },
                    {groupname: 'divSearch1', caption: 'DB User'           , name: 'DB_USER'        , width: 130, datatype: 'text'  , hidden: true },
                    ];
        fc_addDataInGettedLov ( 'BIZ_CHAIN_CD', {code: 'BIZ_CHAIN_CD', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: 'BIZ_CHAIN_CD', code: 'BIZ_CHAIN_CD' , format: 'V', nullable: true , defval: ''} );

        fc_addCodeList ( { object: 'UPLOAD_ID', code: 'DATA_UPLOAD_LIST', title: 'Upload List', manKey: '' } );
        fc_addCodeList ( { object: 'TAB_NM'   , code: 'TAB_LIST'        , title: 'Table List' , manKey: '' } );
        fc_addMultiItem( { itemCd: 'CAP_UPLOAD_NM', itemValue: 0 } );
        fc_addMultiItem( { itemCd: 'REMARKS'      , itemValue: 0 } );
        break;
    case 'UPLOAD_DATA_INFO' : // SCOG0090
        objItems =  [
                    {groupname: 'divSearch1', caption: 'Owner Chain', name: 'BIZ_CHAIN_CD', width: 130, datatype: 'lov' , itemCd: 'CAP_OWNER_CHAIN' },
                    {groupname: 'divSearch1', caption: 'Upload Id'  , name: 'UPLOAD_ID'   , width: 150, datatype: 'text', itemCd: 'CAP_UPLOAD_ID'   },
                    {groupname: 'divSearch1', caption: 'Upload Nm'  , name: 'UPLOAD_NM'   , width: 250, datatype: 'text', itemCd: 'CAP_UPLOAD_NM'   },
                    ];
        break;
    case 'UPLOAD_ITEM_INFO' : // SCOG0100
        objItems =  [
                    {groupname: 'divSearch1', caption: 'Item Code', name: 'ITEM_CD', width: 160, datatype: 'text', uppercase: true, required : true },
                    {groupname: 'divSearch1', caption: 'Item Name', name: 'ITEM_NM', width: 200, datatype: 'text'}
                    ];
        break;
    case 'FUNCTION_MASTER' : // SCOZ0050
        objItems =  [
                     {groupname: 'divSearchGrp', caption: 'Function ID', name: 'FUNC_ID', width: 200, datatype: 'text', uppercase: true }
                    ,{groupname: 'divSearchGrp', caption: 'File Name'  , name: 'FILE_NM', width: 120, datatype: 'text', uppercase: true }
                    ,{groupname: 'divSearchGrp', caption: 'Tags'       , name: 'TAGS'   , width: 200, datatype: 'text', uppercase: true }
                   ];
        break;
    case 'DEVELOPER_INFO' : // SCOZ0070
        objItems =  [
                    {groupname: 'divSearchGrp',  caption: 'BIZ_CHAIN_CD', name: 'BIZ_CHAIN_CD', width: 250, datatype: 'chklov' },
                    {groupname: 'divSearchGrp',  caption: 'TABLE NM'    , name: 'TABLE_NM'    , width: 120, datatype: 'text', uppercase: true },
                    ];
        fc_addDataInGettedLov ( 'BIZ_CHAIN_CD', {code: 'BIZ_CHAIN_CD', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: 'BIZ_CHAIN_CD', code: 'BIZ_CHAIN_CD', format: 'V', nullable: false , defval: ''} );
        fc_addMultiItem( { itemCd: 'CAP_SEND'      , itemValue: 0 } );
        break;
    case 'FIND_COLUMN' : // SCOZ0080
        objItems =  [
                    {groupname: 'divSearchGrp',  caption: 'Table Name' , name: 'TABLE_NM'   , width: 150, datatype: 'text', uppercase: true },
                    {groupname: 'divSearchGrp',  caption: 'Column Name', name: 'COLUMN_NM'  , width: 150, datatype: 'text', uppercase: true  , itemCd: 'CAP_COLUMN_NM' },
                    {groupname: 'divSearchGrp',  caption: 'Comments'   , name: 'COMMENT_TXT', width: 300, datatype: 'text', itemCd: 'CAP_COMMENT' },
                    ];
        break;
    case 'FIND_SOURCE' : // SCOZ0090
        objItems =  [
                    {groupname: 'divSearchGrp',  caption: 'Text'   , name: 'SOURCE_TEXT', width: 250, datatype: 'text', itemCd: 'CAP_TEXT' },
                    ];
        break;
    case 'REQ_MASTER' : // SCOZ0100
        objItems =  [
                    {groupname: 'divSearchGrp', caption: 'Date'       , name: 'SEARCH_DT_TY' , width: 150, datatype: 'lov'    , itemCd: 'CAP_TYPE' },
                    {groupname: 'divSearchGrp', caption: ''           , name: 'REQ_RCV_DT_FR', width: 130, datatype: 'date'   , isMultiLanguage: false },
                    {groupname: 'divSearchGrp', caption: '~'          , name: 'REQ_RCV_DT_TO', width: 130, datatype: 'date'   , isMultiLanguage: false },
                    {groupname: 'divSearchGrp', caption: 'Req. Dept'  , name: 'REQ_DEPT'     , width: 200, datatype: 'lov'   },
                    {groupname: 'divSearchGrp', caption: 'Req. Person', name: 'REQ_USER_ID'  , width: 200, datatype: 'lov'   },
                    {groupname: 'divSearchGrp', caption: 'Status'     , name: 'REQ_STS'      , width: 130, datatype: 'chklov'},
                    ];
        fc_addDataInGettedLov ( 'SEARCH_DT_TY', {code: 'SEARCH_DT_TY', tags: '', alias: '', condition: {'LANG_CD': window.gwMesEnv.lang.cd }} );
        fc_addDataInSettingLov( {object: 'SEARCH_DT_TY', code: 'SEARCH_DT_TY' , format: 'V', nullable: false , defval: ''} );
        fc_addDataInGettedLov ( 'REQ_DEPT', {code: 'REQ_DEPT', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: 'REQ_DEPT', code: 'REQ_DEPT' , format: 'V', nullable: true , defval: ''} );
        fc_addDataInGettedLov ( 'REQ_USER', {code: 'REQ_USER', tags: '', alias: '', condition: {'DEPT_CD': '' }} );
        fc_addDataInSettingLov( {object: 'REQ_USER_ID', code: 'REQ_USER' , format: 'V', nullable: true , defval: ''} );
        fc_addDataInGettedLov ( 'REQ_STS', {code: 'REQ_STS', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: 'REQ_STS', code: 'REQ_STS' , format: 'V', nullable: false , defval: ''} );
        break;
    case 'REQ_INQ' : // SCOZ0110
        objItems =  [
                    {groupname: 'divSearchGrp', caption: 'Date'       , name: 'SEARCH_DT_TY'   , width: 150, datatype: 'lov'     , itemCd: 'CAP_TYPE' },
                    {groupname: 'divSearchGrp', caption: ''           , name: 'REQ_RCV_DT_FR'  , width: 130, datatype: 'date'    , isMultiLanguage: false },
                    {groupname: 'divSearchGrp', caption: '~'          , name: 'REQ_RCV_DT_TO'  , width: 130, datatype: 'date'    , isMultiLanguage: false },
                    {groupname: 'divSearchGrp', caption: 'Req. Dept'  , name: 'REQ_CHARGE_DEPT', width: 200, datatype: 'lov'    },
                    {groupname: 'divSearchGrp', caption: 'Req. Person', name: 'REQ_CHARGE_ID'  , width: 200, datatype: 'lov'    },
                    {groupname: 'divSearchGrp', caption: 'Status'     , name: 'REQ_STS'        , width: 130, datatype: 'chklov' },
                    ];
        fc_addDataInGettedLov ( 'SEARCH_DT_TY', {code: 'SEARCH_DT_TY', tags: '', alias: '', condition: {'LANG_CD': window.gwMesEnv.lang.cd }} );
        fc_addDataInSettingLov( {object: 'SEARCH_DT_TY', code: 'SEARCH_DT_TY' , format: 'V', nullable: false , defval: ''} );
        fc_addDataInGettedLov ( 'REQ_DEPT', {code: 'REQ_DEPT', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: 'REQ_CHARGE_DEPT', code: 'REQ_DEPT' , format: 'V', nullable: true , defval: ''} );
        fc_addDataInGettedLov ( 'REQ_USER', {code: 'REQ_USER', tags: '', alias: '', condition: {'DEPT_CD': '' }} );
        fc_addDataInSettingLov( {object: 'REQ_CHARGE_ID', code: 'REQ_USER' , format: 'V', nullable: true , defval: ''} );
        fc_addDataInGettedLov ( 'REQ_STS', {code: 'REQ_STS', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: 'REQ_STS', code: 'REQ_STS' , format: 'V', nullable: true , defval: ''} );
        break;
    case 'BIZ_RULE' : // SCOG0110
        var hiddenFlag = false;
        //if (sSubKey == 'SCH' || sSubKey ==  'SCO'|| sSubKey ==  'SIT' || sSubKey == 'SIM' || sSubKey == 'SMS' || sSubKey == 'SPG' || sSubKey ==  'SQM' || sSubKey == 'SYD') {
        if ( !fc_isNull( sSubKey ) ) {
            hiddenFlag = true;
        };
        objItems =  [
                    {groupname: 'divSearchGrp', caption: 'Biz Chain', name: 'BIZ_CHAIN_CD', width: 130, datatype: 'lov'     , hidden: hiddenFlag },
                    {groupname: 'divSearchGrp', caption: 'Rule Name', name: 'RULE_NM'     , width: 200, datatype: 'text'    , uppercase: true },
                    {groupname: 'divSearchGrp', caption: 'Use YN'   , name: 'USE_YN'      , width: 100, datatype: 'checkbox', align: 'center', defval: true }
                    ];
        fc_addDataInGettedLov ( 'BIZ_CHAIN_CD', {code: 'BIZ_CHAIN_CD', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: 'BIZ_CHAIN_CD', code: 'BIZ_CHAIN_CD' , format: 'V', nullable: true , defval: ''} );
        break;
    case 'DEV_PROGRESS' : // SCOZ0140
        objItems =  [
                    {groupname: 'divSearchGrp', caption: 'Module'    , name: 'BIZ_CHAIN_CD', width: 200, datatype: 'chklov' },
                    {groupname: 'divSearchGrp', caption: 'Type'      , name: 'PGM_TY'      , width: 100, datatype: 'chklov' },
                    {groupname: 'divSearchGrp', caption: 'Consultant', name: 'DGN_USER_ID' , width: 100, datatype: 'chklov' },
                    {groupname: 'divSearchGrp', caption: 'Developer' , name: 'DEV_USER_ID' , width: 100, datatype: 'chklov' },
                    {groupname: 'divSearchGrp', caption: 'Status'    , name: 'DEV_STS'     , width: 100, datatype: 'chklov'  , itemCd: 'CAP_STS' },
                    ];
        fc_addDataInGettedLov ( 'PGM_TY', {code: 'PGM_TY', tags: 'PGM_PROG', alias: '' } );
        fc_addDataInSettingLov( {object: 'PGM_TY', code: 'PGM_TY' , format: 'V', nullable: true , defval: ''} );
        fc_addDataInGettedLov ( 'BIZ_CHAIN_CD', {code: 'BIZ_CHAIN_CD', tags: '', alias: '' } );
        fc_addDataInSettingLov( {object: 'BIZ_CHAIN_CD', code: 'BIZ_CHAIN_CD' , format: 'V', nullable: false , defval: ''} );
        fc_addDataInGettedLov ( 'DEV_STS', {code: 'DEV_STS', tags: '', alias: '' } );
        fc_addDataInSettingLov( {object: 'DEV_STS', code: 'DEV_STS' , format: 'V', nullable: true , defval: ''} );

        fc_addDataInGettedLov ( 'PJT_MEM_LIST', {code: 'PJT_MEM_LIST', tags: '', alias: '' } );
        fc_addDataInSettingLov( {object: 'DGN_USER_ID', code: 'PJT_MEM_LIST' , format: 'V', nullable: true , defval: ''} );
        fc_addDataInSettingLov( {object: 'DEV_USER_ID', code: 'PJT_MEM_LIST' , format: 'V', nullable: true , defval: ''} );

        break;

    case 'S_JOB_BAS_MSTR_LIST' :  // SCOM1010
        objItems = [
                        {groupname: 'divSearchGrp',  caption: '공장코드'         , name: 'PLANT_CD'         , width: 150 , datatype: 'lov',isMultiLanguage:true}
                      ,{groupname: 'divSearchGrp',  caption: '업무구분'          , name: 'CHAIN_CD'         , width: 100, datatype: 'lov',isMultiLanguage:true}
                      ,{groupname: 'divSearchGrp',  caption: '업무기준'          , name: 'JOB_BAS_ID'   , width: 320, datatype: 'lov', isMultiLanguage:true }
                      ,{groupname: 'divSearchGrp',  caption: '공정드'       , name: 'PROC_CD'          , width: 100, datatype: 'lov',isMultiLanguage:true}
                      //,{groupname: 'divSearchGrp',  caption: '시작일', name: 'CRT_TM'    , width: 100, datatype: 'date',isMultiLanguage:false}

                   ];

        // 업무구분 Lov setting
        fc_addDataInGettedLov ( 'PLANT_CD'      , {code: 'PLANT_CD'     , tags: ''  , alias:'' } );
        fc_addDataInSettingLov(   {object: 'PLANT_CD'       , code: 'PLANT_CD'      , format: 'K:V' , nullable: true, defval: ''    });

        // 업무구분 Lov setting
        fc_addDataInGettedLov ( 'JOB_BAS_ID'        , {code: 'JOB_BAS_ID'       , tags: ''  , alias:'' } );
        fc_addDataInSettingLov(   {object: 'JOB_BAS_ID'     , code: 'JOB_BAS_ID'        , format: 'K:V' , nullable: true, defval: ''    });


        // 체인구분 Lov setting
        fc_addDataInGettedLov ( 'CHAIN_CD'      , {code: 'CHAIN_CD'     , tags: ''  , alias:'' } );
        fc_addDataInSettingLov(   {object: 'CHAIN_CD'       , code: 'CHAIN_CD'      , format: 'V'   , nullable: true, defval: ''    });

        // 공정코드 Lov setting
        fc_addDataInGettedLov ( 'PROC_CD'       , {code: 'PROC_GRP_CD'      , tags: ''  , alias:'' } );
        fc_addDataInSettingLov(   {object: 'PROC_CD'        , code: 'PROC_GRP_CD'       , format: 'K:V' , nullable: true, defval: ''    });

        //PopUp
        //fc_addCodeList  ( {object: 'JOB_BAS_ID', code: 'JOB_BAS_ID', title: '업무기준코드', manKey: '' }, { itemCd: 'CAP_JOB_BAS_ID', itemValue: 0 } );
        //Chain 구분
        //fc_addCodeList  ( {object: 'CHAIN_CD', code: 'CHAIN_CD', title: '체인구분 코드', manKey: '' }, { itemCd: 'CAP_CHAIN_CD', itemValue: 0 } );
        //공정코드
        //fc_addCodeList  ( {object: 'PROC_CD', code: 'PROC_GRP_CD', title: '공정코드', manKey: '' }, { itemCd: 'CAP_PROC_GRP_CD', itemValue: 0 } );

        break;

    case 'S_STRCT_MGT_LIST' :  // SCOM1020, SCOM2010, S100110, SCOM2030
        objItems = [
                    {groupname: 'divSearchGrp',  caption: '공장코드'         , name: 'PLANT_CD'         , width: 150 , datatype: 'lov',isMultiLanguage:true}
                    ,{groupname: 'divSearchGrp',  caption: '업무구분'        , name: 'CHAIN_CD'         , width: 100, datatype: 'lov',isMultiLanguage:true}
                    ,{groupname: 'divSearchGrp',  caption: '업무기준'        , name: 'JOB_BAS_ID'   , width: 320, datatype: 'lov', isMultiLanguage:true}
                    ,{groupname: 'divSearchGrp',  caption: '버전', name: 'VER'    , width: 100, datatype: 'lov',isMultiLanguage:true}
                    /**
                    ,{groupname: 'divSearchGrp',  caption: '사용여부', name: 'USE_YN'   , width: 150, datatype: 'radio', itemCd: 'CAP_USE_YN',  isMultiLanguage:false}
                    **/
                    ,{groupname: 'divSearchGrp',  caption: '시작일'      , name: 'AP_ST_DTM'     , width: 100, datatype: 'text',hidden: true}
                    ,{groupname: 'divSearchGrp',  caption: '종료일'      , name: 'AP_ED_DTM'     , width: 100, datatype: 'date',hidden: true}
                    ,{groupname: 'divSearchGrp',  caption: ''           , name: 'OTMZT_YN'      , width:   0, datatype: 'text', hidden: true}
                    ,{groupname: 'divSearchGrp',  caption: 'Hidden'     , name: 'TEMP_LOV'      , width: 100, datatype: 'lov',hidden: true}
                    ,{groupname: 'divSearchGrp',  caption: 'Hidden'     , name: 'NEW_VER'       , width: 100, datatype: 'text',hidden: true}
                    ,{groupname: 'divSearchGrp',  caption: 'Hidden'     , name: 'JOB_BAS_TY'    , width: 100, datatype:'text',hidden: true}
                    ,{groupname: 'divSearchGrp',  caption: 'Hidden'     , name: 'FRML_SEQ'      , width: 100, datatype: 'text',hidden: true} // 계산식 구조관리-단순
                    ,{groupname: 'divSearchGrp',  caption: '버전정보확인'  , name: 'VER_LIST'      ,   width: 80,  datatype: 'button' ,    align:'center' ,    isMultiLanguage:true}
                   ];

        if( sSubKey == 'SMW') {
            objItems.push( {groupname: 'divSearchGrp',  caption: '이력정보확인'  , name: 'VER_HIST'      ,   width: 80,  datatype: 'button' ,    align:'center' ,    isMultiLanguage:true} );
            objItems.push( {groupname: 'divSearchGrp',  caption: '전체이력관리'  , name: 'VER_HIST_OV'   ,   width: 80,  datatype: 'button' ,    align:'center' ,    isMultiLanguage:false} );
        };
        
        // 업무구분 Lov setting
        fc_addDataInGettedLov ( 'PLANT_CD'      , {code: 'PLANT_CD'     , tags: ''  , alias:'' } );
        fc_addDataInSettingLov(   {object: 'PLANT_CD'       , code: 'PLANT_CD'      , format: 'K:V' , nullable: true, defval: ''    });

        // Chain구분 Lov setting
        fc_addDataInGettedLov ( 'CHAIN_CD'      , {code: 'CHAIN_CD'     , tags: ''  , alias:'' } );
        fc_addDataInSettingLov(   {object: 'CHAIN_CD'       , code: 'CHAIN_CD'      , format: 'V'   , nullable: true, defval: ''    });


        // 업무기준 Lov setting
        fc_addDataInGettedLov ( 'JOB_BAS_ID'        , {code: 'JOB_BAS_ID'       , tags: 'SCH'   , alias:'' } );
        fc_addDataInSettingLov(   {object: 'JOB_BAS_ID'     , code: 'JOB_BAS_ID'        , format: 'K:V' , nullable: true, defval: ''    });

        // 버전 Lov setting
        fc_addDataInGettedLov ( 'VER'       , {code: 'VER'      , tags: ''  , alias:'' } );
        fc_addDataInSettingLov(   {object: 'VER'        , code: 'VER'       , format: 'V'   , nullable: true, defval: ''    });

        // TEMP Lov setting
        fc_addDataInGettedLov ( 'TEMP_LOV'      , {code: 'TEMP_LOV'     , tags: ''  , alias:'' } );
        fc_addDataInSettingLov(   {object: 'TEMP_LOV'       , code: 'TEMP_LOV'      , format: 'V'   , nullable: true, defval: ''    });

        //PopUp
        //fc_addCodeList  ( {object: 'JOB_BAS_ID', code: 'JOB_BAS_ID', title: '업무기준코드', manKey: '' }, { itemCd: 'CAP_JOB_BAS_ID', itemValue: 0 } );
        //Chain 구분
        //fc_addCodeList  ( {object: 'CHAIN_CD', code: 'CHAIN_CD', title: '체인구분 코드', manKey: '' }, { itemCd: 'CAP_CHAIN_CD_INFO', itemValue: 0 } );

        break;

    case 'S_STRCT_MGT_LIST_COMMON' :  // SCOM1030
        objItems = [
                    {groupname: 'divSearchGrp',  caption: '공장코드'         , name: 'PLANT_CD'         , width: 150 , datatype: 'lov',isMultiLanguage:true}
                    ,{groupname: 'divSearchGrp',  caption: '업무구분'        , name: 'CHAIN_CD'         , width: 100, datatype: 'lov',isMultiLanguage:true}
                    ,{groupname: 'divSearchGrp',  caption: '업무기준'        , name: 'JOB_BAS_ID'   , width: 320, datatype: 'lov', isMultiLanguage:true}
                    ,{groupname: 'divSearchGrp',  caption: '버전', name: 'VER'    , width: 100, datatype: 'lov',isMultiLanguage:true}
                    /**
                    ,{groupname: 'divSearchGrp',  caption: '사용여부', name: 'USE_YN'   , width: 150, datatype: 'radio', itemCd: 'CAP_USE_YN',  isMultiLanguage:false}
                    **/
                    ,{groupname: 'divSearchGrp',  caption: '시작일'      , name: 'AP_ST_DTM'     , width: 100, datatype: 'text',hidden: true}
                    ,{groupname: 'divSearchGrp',  caption: '종료일'      , name: 'AP_ED_DTM'     , width: 100, datatype: 'date',hidden: true}
                    ,{groupname: 'divSearchGrp',  caption: ''           , name: 'OTMZT_YN'      , width:   0, datatype: 'text', hidden: true}
                    ,{groupname: 'divSearchGrp',  caption: 'Hidden'     , name: 'TEMP_LOV'      , width: 100, datatype: 'lov',hidden: true}
                    ,{groupname: 'divSearchGrp',  caption: 'Hidden'     , name: 'NEW_VER'       , width: 100, datatype: 'text',hidden: true}
                    ,{groupname: 'divSearchGrp',  caption: 'Hidden'     , name: 'JOB_BAS_TY'    , width: 100, datatype:'text',hidden: true}
                    ,{groupname: 'divSearchGrp',  caption: 'Hidden'     , name: 'FRML_SEQ'      , width: 100, datatype: 'text',hidden: true} // 계산식 구조관리-단순
                    ,{groupname: 'divSearchGrp',  caption: '버전정보확인'  , name: 'VER_LIST'      ,   width: 80,  datatype: 'button' ,    align:'center' ,    isMultiLanguage:true}
                    ,{groupname: 'divSearchGrp',  caption: '이력정보확인'  , name: 'VER_HIST'      ,   width: 80,  datatype: 'button' ,    align:'center' ,    isMultiLanguage:true}
                    ,{groupname: 'divSearchGrp',  caption: '전체이력관리'  , name: 'VER_HIST_OV'   ,   width: 80,  datatype: 'button' ,    align:'center' ,    isMultiLanguage:false}
                   ];

        // 업무구분 Lov setting
        fc_addDataInGettedLov ( 'PLANT_CD'      , {code: 'PLANT_CD'     , tags: ''  , alias:'' } );
        fc_addDataInSettingLov(   {object: 'PLANT_CD'       , code: 'PLANT_CD'      , format: 'K:V' , nullable: true, defval: ''    });

        // Chain구분 Lov setting
        fc_addDataInGettedLov ( 'CHAIN_CD'      , {code: 'CHAIN_CD'     , tags: ''  , alias:'' } );
        fc_addDataInSettingLov(   {object: 'CHAIN_CD'       , code: 'CHAIN_CD'      , format: 'V'   , nullable: true, defval: ''    });


        // 업무기준 Lov setting
        fc_addDataInGettedLov ( 'JOB_BAS_ID'        , {code: 'JOB_BAS_ID'       , tags: 'SCH'   , alias:'' } );
        fc_addDataInSettingLov(   {object: 'JOB_BAS_ID'     , code: 'JOB_BAS_ID'        , format: 'K:V' , nullable: true, defval: ''    });

        // 버전 Lov setting
        fc_addDataInGettedLov ( 'VER'       , {code: 'VER'      , tags: ''  , alias:'' } );
        fc_addDataInSettingLov(   {object: 'VER'        , code: 'VER'       , format: 'V'   , nullable: true, defval: ''    });

        // TEMP Lov setting
        fc_addDataInGettedLov ( 'TEMP_LOV'      , {code: 'TEMP_LOV'     , tags: ''  , alias:'' } );
        fc_addDataInSettingLov(   {object: 'TEMP_LOV'       , code: 'TEMP_LOV'      , format: 'V'   , nullable: true, defval: ''    });

        //PopUp
        //fc_addCodeList  ( {object: 'JOB_BAS_ID', code: 'JOB_BAS_ID', title: '업무기준코드', manKey: '' }, { itemCd: 'CAP_JOB_BAS_ID', itemValue: 0 } );
        //Chain 구분
        //fc_addCodeList  ( {object: 'CHAIN_CD', code: 'CHAIN_CD', title: '체인구분 코드', manKey: '' }, { itemCd: 'CAP_CHAIN_CD_INFO', itemValue: 0 } );

        break;

    case 'S_STRCT_MGT_HIST' :  // SCOM1032
        objItems = [
                    {groupname: 'divSearchGrp',  caption: '업무구분'  , name: 'CHAIN_CD'     , width: 100, datatype: 'lov',isMultiLanguage:true ,readonly: true}
                    ,{groupname: 'divSearchGrp',  caption: '업무기준'  , name: 'JOB_BAS_ID'   , width: 320, datatype: 'lov', isMultiLanguage:true}
                    ,{groupname: 'divSearchGrp',  caption: '변경일시'  , name: 'CRT_TM'       , width: 100, datatype: 'daterange', target: ['UP_DTM_FR', 'UP_DTM_TO', 'date'], isMultiLanguage: false}
                    ,{groupname: 'divSearchGrp',  caption: '변경사유'  , name: 'REASON'   , width: 80, datatype: 'lov', isMultiLanguage:false}
                    ,{groupname: 'divSearchGrp', caption: 'User ID'   , name: 'USER_ID', width: 170, datatype: 'popup', maxlength: 20 }
                    ,{groupname: 'divSearchGrp', caption: 'User Name' , name: 'USER_NM', width: 150, datatype: 'text', hidden:true}
                   ];

        // Chain구분 Lov setting
        fc_addDataInGettedLov ( 'CHAIN_CD'      , {code: 'CHAIN_CD'     , tags: ''  , alias:'' } );
        fc_addDataInSettingLov(   {object: 'CHAIN_CD'       , code: 'CHAIN_CD'      , format: 'V'   , nullable: true, defval: ''    });

        // 업무기준 Lov setting
        fc_addDataInGettedLov ( 'JOB_BAS_ID'        , {code: 'JOB_BAS_ID'       , tags: 'SCH'   , alias:'' } );
        fc_addDataInSettingLov(   {object: 'JOB_BAS_ID'     , code: 'JOB_BAS_ID'        , format: 'K:V' , nullable: true, defval: ''    });
        
        // 변경사유 Lov setting
        fc_addDataInGettedLov ( 'VER_SETUP_REASON'      , {code: 'VER_SETUP_REASON'     , tags: ''  , alias:'' } );
        fc_addDataInSettingLov( {object: 'REASON'       , code: 'VER_SETUP_REASON'      , format: 'V'   , nullable: true, defval: ''    });
        
        // 사용자ID Lov setting
        
        fc_addCodeList  ( {object: 'USER_ID', code: 'USER_LIST', title: 'User List', manKey: '' }, { itemCd: 'CAP_USER_INFO', itemValue: 0 } );
        break;

    case 'S_USE_DETAIL_POP_MGT_LIST' :  // SCOM1060
        objItems = [
                    {groupname: 'divSearchGrp',  caption: '공장코드'         , name: 'PLANT_CD'         , width: 150 , datatype: 'lov',isMultiLanguage:true}
                   , {groupname: 'divSearchGrp',  caption: '업무구분'        , name: 'CHAIN_CD'     , width: 150, datatype: 'lov', isMultiLanguage:false}
                    , {groupname: 'divSearchGrp',  caption: '업무기준'       , name: 'JOB_BAS_ID'   , width: 320, datatype: 'lov', isMultiLanguage:false}
                    , {groupname: 'divSearchGrp',  caption: 'Biz Key'        , name: 'BUSS_KEY'     , width: 150, datatype: 'lov', isMultiLanguage:false}
                    , {groupname: 'divSearchGrp',  caption: 'SCH_USE_DTM'        , name: 'SCH_USE_DTM'      , datatype: 'text', hidden:true}
                    , {groupname: 'divSearchGrp',  caption: 'SCH_SEQ_SEQ'        , name: 'SCH_USE_SEQ'      , datatype: 'text', hidden:true}


                   ];

        // 공장코드 Lov setting
        fc_addDataInGettedLov ( 'PLANT_CD'      , {code: 'PLANT_CD'     , tags: ''  , alias:'' } );
        fc_addDataInSettingLov(   {object: 'PLANT_CD'       , code: 'PLANT_CD'      , format: 'K:V' , nullable: true, defval: ''    });

        // Chain구분 Lov setting
        fc_addDataInGettedLov ( 'CHAIN_CD'      , {code: 'CHAIN_CD'     , tags: ''  , alias:'' } );
        fc_addDataInSettingLov(   {object: 'CHAIN_CD'       , code: 'CHAIN_CD'      , format: 'V'   , nullable: true, defval: ''    });

        // 업무기준 Lov setting
        fc_addDataInGettedLov ( 'JOB_BAS_ID'        , {code: 'JOB_BAS_ID'       , tags: ''  , alias:'' } );
        fc_addDataInSettingLov(   {object: 'JOB_BAS_ID'     , code: 'JOB_BAS_ID'        , format: 'K:V' , nullable: true, defval: ''    });

        // Biz Key' Lov setting
        fc_addDataInGettedLov ( 'BUSS_KEY'      , {code: 'BUSS_KEY'     , tags: ''  , alias:'' } );
        fc_addDataInSettingLov(   {object: 'BUSS_KEY'       , code: 'BUSS_KEY'      , format: 'K:V' , nullable: true, defval: ''    });


        break;

    case 'S_INF_MSTR_LIST' :  // SCOF1010
        objItems = [
                        {groupname: 'divSearchGrp',  caption: '공장코드'         , name: 'PLANT_CD'         , width: 100 , datatype: 'lov',isMultiLanguage:false}
                      ,{groupname: 'divSearchGrp',  caption: '업무구분'          , name: 'CHAIN_CD'         , width: 120, datatype: 'lov',isMultiLanguage:false}
                      ,{groupname: 'divSearchGrp',  caption: '송수신구분'         , name: 'SEND_RCPT_TP'     , width: 120, datatype: 'lov', isMultiLanguage:false }
                      ,{groupname: 'divSearchGrp',  caption: '처리유형'          , name: 'TREAT_TP'         , width: 120, datatype: 'lov', isMultiLanguage:false }
                      ,{groupname: 'divSearchGrp',  caption: 'Sender 정보'     , name: 'SEND_INFO'        , width: 120, datatype: 'lov', isMultiLanguage:false }
                      ,{groupname: 'divSearchGrp',  caption: 'Receiver 정보'   , name: 'RCPT_INFO'        , width: 120, datatype: 'lov', isMultiLanguage:false }
                      , {groupname: 'divSearchGrp',  caption: 'I/F ID'       , name: 'IF_ID'            , width: 120, datatype: 'text', isMultiLanguage:false}

                   ];

        // 공장코드 Lov setting
        fc_addDataInGettedLov ( 'PLANT_CD'      , {code: 'PLANT_CD'     , tags: ''  , alias:'' } );
        fc_addDataInSettingLov(   {object: 'PLANT_CD'       , code: 'PLANT_CD'      , format: 'K:V' , nullable: true, defval: ''    });

        // 업무체인 Lov setting
        fc_addDataInGettedLov ( 'CHAIN_CD'      , {code: 'CHAIN_CD'     , tags: ''  , alias:'' } );
        fc_addDataInSettingLov(   {object: 'CHAIN_CD'       , code: 'CHAIN_CD'      , format: 'V'   , nullable: true, defval: ''    });


        // 송수신구분 Lov setting
        fc_addDataInGettedLov ( 'SEND_RCPT_TP'      , {code: 'SEND_RCPT_TP'     , tags: ''  , alias:'' } );
        fc_addDataInSettingLov(   {object: 'SEND_RCPT_TP'       , code: 'SEND_RCPT_TP'      , format: 'V'   , nullable: true, defval: ''    });

        // 처리유형 Lov setting
        fc_addDataInGettedLov ( 'TREAT_TP'      , {code: 'TREAT_TP'     , tags: ''  , alias:'' } );
        fc_addDataInSettingLov(   {object: 'TREAT_TP'       , code: 'TREAT_TP'      , format: 'V'   , nullable: true, defval: ''    });

        // Sender 정보 Lov setting
        fc_addDataInGettedLov ( 'SEND_INFO'         , {code: 'SEND_RCPT_INFO'       , tags: ''  , alias:'' } );
        fc_addDataInSettingLov(   {object: 'SEND_INFO'      , code: 'SEND_RCPT_INFO'        , format: 'K'   , nullable: true, defval: ''    });

        // Receiver 정보 Lov setting
        fc_addDataInGettedLov ( 'RCPT_INFO'         , {code: 'SEND_RCPT_INFO'       , tags: ''  , alias:'' } );
        fc_addDataInSettingLov(   {object: 'RCPT_INFO'      , code: 'SEND_RCPT_INFO'        , format: 'K'   , nullable: true, defval: ''    });

        break;

    case 'S_INF_DB2DB_LIST' :  // SCOF2010
        objItems =  [
            {groupname: 'divSearchGrp',  caption: '공장코드'         , name: 'PLANT_CD'         , width: 100 , datatype: 'lov',isMultiLanguage:false}
            ,{groupname: 'divSearchGrp',  caption: '업무구분'        , name: 'CHAIN_CD'         , width: 110, datatype: 'lov',isMultiLanguage:false, required: true}
            ,{groupname: 'divSearchGrp',  caption: '송수신구분'   , name: 'SEND_RCPT_TP'     , width: 60, datatype: 'lov', isMultiLanguage:false }
            ,{groupname: 'divSearchGrp',  caption: 'Date'        , name: 'TC_DTM_GR'        , width: 160, datatype: 'daterange', target: ['IF_FR_DT', 'IF_TO_DT', 'datetime'], itemCd: 'CAP_DATE'}
            ,{groupname: 'divSearchGrp',  caption: '처리유형'        , name: 'TREAT_TP'         , width: 100, datatype: 'lov', isMultiLanguage:false }
            ,{groupname: 'divSearchGrp',  caption: '송신처'         , name: 'SEND_INFO'        , width: 100, datatype: 'lov', isMultiLanguage:false }
            ,{groupname: 'divSearchGrp',  caption: '수신처'        , name: 'RCPT_INFO'         , width: 100, datatype: 'lov', isMultiLanguage:false }
            ,{groupname: 'divSearchGrp',  caption: 'I/F ID'      , name: 'IF_ID'            , width: 120, datatype: 'text', isMultiLanguage:false}
            ,{groupname: 'divSearchGrp',  caption: 'Status'      , name: 'IF_TRT_STATUS'    , width: 150, datatype: 'lov' , itemCd: 'CAP_STS'}
            ];

        // 공장코드 Lov setting
        fc_addDataInGettedLov ( 'PLANT_CD'      , {code: 'PLANT_CD'     , tags: ''  , alias:'' } );
        fc_addDataInSettingLov(   {object: 'PLANT_CD'       , code: 'PLANT_CD'      , format: 'K:V' , nullable: true, defval: ''    });
        // 업무체인 Lov setting
        fc_addDataInGettedLov ( 'CHAIN_CD'      , {code: 'CHAIN_CD'     , tags: ''  , alias:'' } );
        fc_addDataInSettingLov(   {object: 'CHAIN_CD'       , code: 'CHAIN_CD'      , format: 'V'   , nullable: true, defval: ''    });
        // 송수신구분 Lov setting
        fc_addDataInGettedLov ( 'SEND_RCPT_TP'      , {code: 'SEND_RCPT_TP'     , tags: ''  , alias:'' } );
        fc_addDataInSettingLov(   {object: 'SEND_RCPT_TP'       , code: 'SEND_RCPT_TP'      , format: 'V'   , nullable: true, defval: ''    });
        // 처리유형 Lov setting
        fc_addDataInGettedLov ( 'TREAT_TP'      , {code: 'TREAT_TP'     , tags: ''  , alias:'' } );
        fc_addDataInSettingLov(   {object: 'TREAT_TP'       , code: 'TREAT_TP'      , format: 'V'   , nullable: true, defval: ''    });
        // Sender 정보 Lov setting
        fc_addDataInGettedLov ( 'SEND_INFO'         , {code: 'SEND_RCPT_INFO'       , tags: ''  , alias:'' } );
        fc_addDataInSettingLov(   {object: 'SEND_INFO'      , code: 'SEND_RCPT_INFO'        , format: 'K'   , nullable: true, defval: ''    });
        // Receiver 정보 Lov setting
        fc_addDataInGettedLov ( 'RCPT_INFO'         , {code: 'SEND_RCPT_INFO'       , tags: ''  , alias:'' } );
        fc_addDataInSettingLov(   {object: 'RCPT_INFO'      , code: 'SEND_RCPT_INFO'        , format: 'K'   , nullable: true, defval: ''    });
        // Status Lov setting
        fc_addDataInGettedLov ( 'IF_TRT_STATUS'         , {code: 'INF_DB_STS'       , tags: ''  , alias:'' } );
        fc_addDataInSettingLov(   {object: 'IF_TRT_STATUS'      , code: 'INF_DB_STS'        , format: 'K:V' , nullable: true, defval: ''    });

        break;

    case 'S_DATA_DICTIONARY_LIST' :  // SCOH1010
        objItems =  [
            {groupname: 'divSearchGrp',  caption: '표준약어'         , name: 'STD_ABBR'         , width: 200 , datatype: 'text',isMultiLanguage:false}
            ,{groupname: 'divSearchGrp',  caption: '용어(한굴)'          , name: 'WRD_KOR_NM'       , width: 200, datatype: 'text',isMultiLanguage:false}
            ,{groupname: 'divSearchGrp',  caption: '용어(영문)'          , name: 'WRD_ENG_NM'   , width: 200, datatype: 'text', isMultiLanguage:false }
            ,{groupname: 'divSearchGrp',  caption: '동의어'         , name: 'SYNM'         , width: 200, datatype: 'text', isMultiLanguage:false }
            ];
        break;  

    case 'S_STD_ATTR_LIST' :  // SCOH1020
        objItems =  [
            {groupname: 'divSearchGrp',  caption: '표준항목'         , name: 'STD_ATTR_ID'          , width: 200 , datatype: 'text',isMultiLanguage:false}
            ,{groupname: 'divSearchGrp',  caption: '표준항목명'       , name: 'STD_ATTR_NM'      , width: 200, datatype: 'text',isMultiLanguage:false}
            ,{groupname: 'divSearchGrp',  caption: '항목Type'          , name: 'STD_ATTR_TY'      , width: 200, datatype: 'text', isMultiLanguage:false }
            ];
        break;  

    case 'S_UN_STD_ATTR_LIST' :  // SCOH1030
        objItems =  [
            {groupname: 'divSearchGrp',  caption: '업무구분'         , name: 'CHAIN_CD'         , width: 200 , datatype: 'lov',isMultiLanguage:false, required: true}
            ,{groupname: 'divSearchGrp',  caption: '비표준유형'       , name: 'UN_STD_TY'    , width: 200, datatype: 'lov',isMultiLanguage:false}
            ,{groupname: 'divSearchGrp',  caption: '테이블명'        , name: 'TABLE_NM'     , width: 300, datatype: 'lov', isMultiLanguage:false }
            ];

        // 업무구분 Lov setting
        fc_addDataInGettedLov ( 'CHAIN_CD'      , {code: 'CHAIN_CD'     , tags: ''  , alias:'' } );
        fc_addDataInSettingLov(   {object: 'CHAIN_CD'       , code: 'CHAIN_CD'      , format: 'K:V' , nullable: true, defval: ''    });
        
        // 비표준유형 Lov setting
        fc_addDataInGettedLov ( 'UN_STD_TY'         , {code: 'UN_STD_TY'        , tags: ''  , alias:'' } );
        fc_addDataInSettingLov(   {object: 'UN_STD_TY'      , code: 'UN_STD_TY'     , format: 'V'   , nullable: true, defval: ''    });

        // 테이블명 Lov setting
        fc_addDataInGettedLov ( 'TABLE_NM'      , {code: 'TABLE_LIST'       , tags: ''  , alias:'' } );
        fc_addDataInSettingLov(   {object: 'TABLE_NM'       , code: 'TABLE_LIST'        , format: 'K:V' , nullable: true, defval: ''    });
        
        break;
    
    case 'TEST_TEST' : // SCOZEX99
        objItems =  [
                    {groupname: 'divSearchGrp',  caption: '년'       , name: 'FIND_YEAR'    , width: 80, datatype: 'lov' , isMultiLanguage:false},
                    {groupname: 'divSearchGrp',  caption: '조회월' , name: 'FIND_MNT_FR'    , width: 80, datatype: 'text' , isMultiLanguage:false},
                    {groupname: 'divSearchGrp',  caption: '~'       , name: 'FIND_MNT_TO'    , width: 80, datatype: 'text' , isMultiLanguage:false, itemCd:'CAP_BETWEEN'},  
                    {groupname: 'divSearchGrp',  caption: 'test'    , name: 'TEST_POPUP'    , width: 80, datatype: 'popup' , isMultiLanguage:false, maxlength:3},   
                   ];
        //fc_addDataInGettedLov ( 'YEAR_LIST_LOV'       , {code: 'YEAR_LIST_LOV'        , tags: ''  , alias:'' } );
        //fc_addDataInSettingLov(   {object: 'FIND_YEAR'        , code: 'YEAR_LIST_LOV'     , format: 'V'   , nullable: false, defval: ''   });
        break;
        
    };
    return objItems;
}; // end of fm_getSearchItems
/**
 * fm_getHeaderItems
 * @param sKey
 * @param caption_flag
 * @param attribute1
 * @param attribute2
 * @returns {___anonymous27085_27121}
 */
function fm_getHeaderItems( sKey, caption_flag, attribute1, attribute2 ) {
    var objItems = null;
    var groupCaption = null;
    var sCaption = '', sItemCd = '';

    switch ( sKey ) {
    case 'MAIN_TAB' : // main
        objItems = [
                    {groupname: 'G_TAB_INFO', caption: '', name: 'TAB_LIST', width: 250, datatype: 'lov', isMultiLanguage: false, height: 20 },
                   ];
        break;
    case 'TC_INFO' : // SCOF0080, SCOF0050
        if ( caption_flag ) {
            sCaption = 'TC Information';
            sItemCd  = 'CAP_TC_INFO';
        };
        objItems = [
                    {groupname: 'G_TC_INFO', caption: 'TC ID'      , name: 'H_TC_ID'   , width:  80, datatype: 'text', itemCd: 'TC_ID'      , uppercase: true, readonly: true },
                    {groupname: 'G_TC_INFO', caption: 'Format ID'  , name: 'H_FMT_ID'  , width: 200, datatype: 'text', itemCd: 'FMT_ID'     , uppercase: true, readonly: true },
                    {groupname: 'G_TC_INFO', caption: 'Format Name', name: 'H_FMT_NM'  , width: 250, datatype: 'text', itemCd: 'FMT_NM'     , readonly: true },
                    {groupname: 'G_TC_INFO', caption: 'Sender'     , name: 'H_SENDER'  , width: 120, datatype: 'text', itemCd: 'TC_SENDER'  , uppercase: true, readonly: true },
                    {groupname: 'G_TC_INFO', caption: 'Receiver'   , name: 'H_RECEIVER', width: 120, datatype: 'text', itemCd: 'TC_RECEIVER', uppercase: true, readonly: true },
                    {groupname: 'G_TC_DATA', caption: 'TC Data'    , name: 'H_CONTENTS', width: 400, datatype: 'text', itemCd: 'CAP_SPLIT_CONTENTS', hidden: true },
                    {groupname: 'G_TC_DATA', caption: ''           , name: 'H_SIMS_NM' , width: 100, datatype: 'lov' , itemCd: 'SIMS_NM' },
                    {groupname: 'G_TC_ETC' , caption: 'Module'            , name: 'H_TC_MODULE'      , width:  80, datatype: 'text', itemCd: 'CAP_MODULE'    , hidden: true },
                    {groupname: 'G_TC_ETC' , caption: 'TC Tras Type'      , name: 'H_TC_LOG_TY'      , width:  80, datatype: 'text', itemCd: 'CAP_TC_LOG_TY' , hidden: true },
                    {groupname: 'G_TC_INFO', caption: 'Broker Name'       , name: 'H_EAI_BROKER_NM'  , width:   0, datatype: 'text', hidden: true },
                    {groupname: 'G_TC_INFO', caption: 'Interface ID'      , name: 'H_EAI_INF_ID'     , width:   0, datatype: 'text', hidden: true },
                    {groupname: 'G_TC_INFO', caption: 'Merge Flag'        , name: 'H_MERGE_FL'       , width:   0, datatype: 'text', hidden: true },
                    {groupname: 'G_TC_INFO', caption: 'Async Flag'        , name: 'H_ASYNC_FL'       , width:   0, datatype: 'text', hidden: true },
                    {groupname: 'G_TC_INFO', caption: 'TC en/de code type', name: 'H_TC_ENCODE_TY'   , width:   0, datatype: 'text', hidden: true },
                    {groupname: 'G_TC_INFO', caption: 'Trans Type'        , name: 'H_TC_TRANS_TY'    , width:   0, datatype: 'text', hidden: true },
                    {groupname: 'G_TC_INFO', caption: 'Trans Table Name'  , name: 'H_TC_TRANS_TBL_NM', width:   0, datatype: 'text', hidden: true },
                    {groupname: 'G_TC_INFO', caption: 'I/F Plant Code'    , name: 'H_IF_PLANT_CD', width:   0, datatype: 'text', hidden: true },
                    {groupname: 'G_TC_INFO', caption: 'I/F EAI ID'        , name: 'H_IF_EAI_ID'  , width:   0, datatype: 'text', hidden: true },
                    {groupname: 'G_TC_INFO', caption: 'I/F Seq No'        , name: 'H_IF_SEQ_NO'  , width:   0, datatype: 'text', hidden: true },
                    {groupname: 'G_TC_INFO', caption: 'Plant Code'        , name: 'H_PLANT_CD'   , width:   0, datatype: 'text', hidden: true }
                   ];
        if ( attribute1 == 'SIM' ) {
            objItems.push( {groupname: 'G_TC_DATA', caption: window.gwMessage.button.bParse, name: 'BTN_PARSING', width: 80, align: 'center', itemCd: 'CAP_PARSING' , datatype: 'button' , hidden: true } );
            objItems.push( {groupname: 'G_TC_DATA', caption: window.gwMessage.button.bSend , name: 'BTN_SEND'   , width: 80, align: 'center', itemCd: 'CAP_SEND'    , datatype: 'button'} );

            objItems.push( {groupname: 'G_TC_DATA', caption: window.gwMessage.button.bCase  , name: 'BTN_CASE'  , width: 100, datatype: 'button', align: 'center', itemCd: 'CAP_TC_SIM_BIZ_CASE' } );
            objItems.push( {groupname: 'G_TC_DATA', caption: window.gwMessage.button.bDelete, name: 'BTN_DELETE', width:  80, datatype: 'button', align: 'center', itemCd: 'CAP_TC_DATA_DELETE' , hidden: true } );
        } else if ( attribute1 == 'LOG' ) {
            objItems.splice( 3, 1 ); // remove Sender
            objItems.splice( 5, 1 ); // remove Sims Nm

        //  objItems.push( {groupname: 'G_TC_INFO', caption: window.gwMessage.button.bParse, name: 'BTN_PARSING', width: 80, align: 'center', itemCd: 'CAP_PARSING' , datatype: 'button' , hidden: true } );
        //  objItems.push( {groupname: 'G_TC_INFO', caption: window.gwMessage.button.bSend , name: 'BTN_SEND'   , width: 80, align: 'center', itemCd: 'CAP_SEND'    , datatype: 'button'} );
            objItems.push( {groupname: 'G_TC_ETC' , caption: 'Datetime'       , name: 'H_TC_DTM' , width: 80, datatype: 'text', hidden: true } );
            objItems.push( {groupname: 'G_TC_ETC' , caption: 'TcLogUnique Key', name: 'TC_LOG_CD', width: 80, datatype: 'text', hidden: true } );
        } else if ( attribute1 == 'LOG2' ) {
            objItems.splice( 3, 1 ); // remove Sender
            objItems.splice( 5, 1 ); // remove Sims Nm

            objItems.push( {groupname: 'G_TC_INFO', caption: window.gwMessage.button.bParse, name: 'BTN_PARSING', width: 80, align: 'center', itemCd: 'CAP_PARSING' , datatype: 'text' , hidden: true } );
            objItems.push( {groupname: 'G_TC_INFO', caption: window.gwMessage.button.bSend , name: 'BTN_SEND'   , width: 80, align: 'center', itemCd: 'CAP_SEND'    , datatype: 'text'} );
            objItems.push( {groupname: 'G_TC_ETC' , caption: 'Datetime'       , name: 'H_TC_DTM' , width: 80, datatype: 'text', hidden: true } );
            objItems.push( {groupname: 'G_TC_ETC' , caption: 'TcLogUnique Key', name: 'TC_LOG_CD', width: 80, datatype: 'text', hidden: true } );
        };
        break;
    case 'TC_BIZCASE' : // SCOF0090
        if ( caption_flag ) {
            sCaption = 'TC Simulator Business Case';
            sItemCd  = 'CAP_TC_SIM_BIZ_CASE';
        };
        objItems =  [ // , readonly: true
                    {groupname: 'CASE_GRP', caption: 'TC ID'      , name: 'H_TC_ID' , width:  80, datatype: 'text', itemCd: 'TC_ID'  , uppercase: true  , readonly: true },
                    {groupname: 'CASE_GRP', caption: 'Format ID'  , name: 'H_FMT_ID', width: 200, datatype: 'text', itemCd: 'FMT_ID' , uppercase: true },
                    {groupname: 'CASE_GRP', caption: 'Format Name', name: 'H_FMT_NM', width: 250, datatype: 'text', itemCd: 'FMT_NM'},
                    ];
        break;
    case 'DEVELOPER_INFO' : // SCOZ0070
        if ( caption_flag ) {
            sCaption = 'DEVELOPER_INFO';
            sItemCd  = 'CAP_DEVELOPER_INFO';
        };
        objItems =  [
                    {groupname: 'divDomGrp',  caption: 'Refresh'   , name: 'BTN_REFRESH'   , width:  100, datatype: 'button'   , align: 'center', itemCd: 'CAP_REFRESH'},
                    {groupname: 'divDomGrp',  caption: 'Inc. CT'   , name: 'CHK_INC_CT'    , width:  100, datatype: 'checkbox' , align: 'center', hidden: true },
                    {groupname: 'divDomGrp',  caption: 'Regenerate', name: 'BTN_REGENERATE', width:  150, datatype: 'button'   , align: 'center', itemCd: 'CAP_REGENERATE'},
                    ];
        break;
    case 'DEVELOPER_SEND' : // SCOZ0070
        if ( caption_flag ) {
            sCaption = 'DEVELOPER_INFO';
            sItemCd  = 'CAP_DEVELOPER_INFO';
        };
        objItems =  [
                    {groupname: 'divDomSend', caption: 'Send Server', name: 'BTN_SEND_SERVER', width: 120, datatype: 'button', itemCd: 'CAP_SEND' },
                    ];
        break;
    case 'DEVELOPER_TABLE' : // SCOZ0070
        if ( caption_flag ) {
            sCaption = 'DEVELOPER_TABLE';
            sItemCd  = 'CAP_DEVELOPER_TABLE';
        };
        objItems =  [
                    {groupname: 'divDomGrp1',  caption: 'Owner', name: 'D_OWNER', width: 100, datatype: 'text', readonly: true, itemCd: 'CAP_OWNER' },
                    {groupname: 'divDomGrp1',  caption: 'Table', name: 'D_TABLE', width: 200, datatype: 'text', readonly: true, itemCd: 'TABLE_NM'  },
                    {groupname: 'divDomGrp2',  caption: 'Desc' , name: 'D_DESC' , width: 500, datatype: 'text', readonly: true, itemCd: 'CAP_DESC'  },
                    ];
        break;
    };
    groupCaption = (sCaption == '') ? null: sCaption;
    var ret = { item: objItems, caption: groupCaption };
    return ret;
}; // end of fm_getHeaderItems
/**
 * fm_getTabPages
 * @param pages
 * @param sKey
 * @param sSubKey
 * @param attribute1
 * @param attribute2
 * @returns {Array}
 */
function fm_getTabPages( pages, sKey, sSubKey, attribute1, attribute2 ) {
    var objTabs = [];
    var sCaption = '', sItemCd = '';
    for (var i=0; i<pages.length; i++) {
        switch ( pages[i].id.toUpperCase() ) {

        case 'DEVELOPER_TABLE_DML' : // SCOZ0070
            sCaption = 'Table DML';
            sItemCd  = 'CAP_TABLE_DML';
            break;
        case 'DEVELOPER_GF_SPEC' : // SCOZ0070
            sCaption = 'GF Spec';
            sItemCd  = 'CAP_GF_SPEC';
            break;
        case 'DEVELOPER_GF_BODY' : // SCOZ0070
            sCaption = 'GF Body';
            sItemCd = 'CAP_GF_BODY';
            break;
        case 'DEVELOPER_CT_SPEC' : // SCOZ0070
            sCaption = 'CT Spec';
            sItemCd  = 'CAP_CT_SPEC';
            break;
        case 'DEVELOPER_CT_BODY' : // SCOZ0070
            sCaption = 'CT Body';
            sItemCd  = 'CAP_CT_BODY';
            break;
        case 'DEVELOPER_QUERY_TEMP' : // SCOZ0070
            sCaption = 'Query Template';
            sItemCd = 'CAP_QUERY_TEMP';
            break;
        case 'REQ_INQ_SUM' : // SCOZ0100
            sCaption = 'Reqeust Summary';
            sItemCd  = 'CAP_REQ_SUM';
            break;
        case 'REQ_INQ' : // SCOZ0110
            sCaption = 'Request List';
            sItemCd  = 'CAP_REQ_LIST';
            break;
        };
        objTabs[i] = {caption: sCaption, name: pages[i].id.toUpperCase(), itemCd:sItemCd, itemValue: 0 };
    };

    return objTabs;
}; // end of fm_getTabItems
/**
 * fm_getTableItems
 * @param sKey
 * @param sSubKey
 * @param caption_flag
 * @param attribute1
 * @param attribute2
 * @param attribute3
 * @param attribute4
 * @param attribute5
 * @returns {___anonymous31084_31113}
 */
function fm_getTableItems( sKey, sSubKey, caption_flag, attribute1, attribute2, attribute3, attribute4, attribute5 ) {
    var colWidths = null;
    var objCols   = null;
    var tableId   = 'tbl_' + sKey;
    var sCaption  = '';
    var sItemCd   = '';

    switch ( sKey ) {
    case 'EMP_INFO' : // SCOD0030
        if ( caption_flag ) {
            sCaption = '';
            sItemCd  = '';
        };
        colWidths = [ 100,100,100,100,100,100 ];
        objCols   = [
                    {caption: 'Employee No'   , name: 'EMP_NO_HEAD'     , width: '100%', datatype: 'header', itemCd: 'EMP_NO'},
                    {caption: 'Employee No'   , name: 'EMP_NO'          , width: '100%', datatype: 'text'  , uppercase:true},
                    {caption: 'Employee Name' , name: 'EMP_NM_HEAD'     , width: '100%', datatype: 'header', itemCd: 'EMP_NM'},
                    {caption: 'Employee Name' , name: 'EMP_NM'          , width: '100%', datatype: 'text' },
                    {caption: 'Department'    , name: 'DEPT_CD_HEAD'    , width: '100%', datatype: 'header', itemCd: 'DEPT_CD'},
                    {caption: 'Department'    , name: 'DEPT_CD'         , width: '100%', datatype: 'text'  },
                    
                    {caption: '직책'            , name: 'DUTY_NAME_HEAD'  , width: '100%', datatype: 'header',isMultiLanguage:false},
                    {caption: '직책'           , name: 'DUTY_NAME'       , width: '100%', datatype: 'text'  },
                    {caption: '사업장'       , name: 'OFFICE_NAME_HEAD', width: '100%', datatype: 'header', isMultiLanguage:false},
                    {caption: '사업장'       , name: 'OFFICE_NAME'     , width: '100%', datatype: 'text'  },
                    {caption: '직급호칭'        , name: 'JIK_NAME_HEAD'   , width: '100%', datatype: 'header', isMultiLanguage:false},
                    {caption: '직급호칭'        , name: 'JIK_NAME'        , width: '100%', datatype: 'text'  },

                    {caption: 'Sex Code'      , name: 'GENDER_CD_HEAD'  , width: '100%', datatype: 'header', itemCd: 'GENDER_CD'},
                    {caption: 'Sex Code'      , name: 'GENDER_CD'       , width: '100%', datatype: 'text'  },
                    {caption: 'Telephone No'  , name: 'TEL_NO_HEAD'     , width: '100%', datatype: 'header', itemCd: 'TEL_NO'},
                    {caption: 'Telephone No'  , name: 'TEL_NO'          , width: '100%', datatype: 'text' },
                    {caption: 'E-Mail Address', name: 'EMAIL_HEAD'      , width: '100%', datatype: 'header', itemCd: 'EMAIL'},
                    {caption: 'E-Mail Address', name: 'EMAIL'           , width: '100%', datatype: 'text' },
                    
                    {caption: 'Hired Date'    , name: 'HIRED_DT_HEAD'   , width: '100%', datatype: 'header', itemCd: 'HIRED_DT'},
                    {caption: 'Hired Date'    , name: 'HIRED_DT'        , width: '100%', datatype: 'date' },
                    {caption: '교대형태'          , name: 'JTYPE_HEAD'     , width: '100%', datatype: 'header', isMultiLanguage:false},
                    {caption: '교대형태'        , name: 'JTYPE_CODE_NAME' , width: '100%', datatype: 'text' },
                    {caption: '코스트센터'       , name: 'COST_CD_HEAD'   , width: '100%', datatype: 'header', isMultiLanguage:false},
                    {caption: '코스트센터'       , name: 'COST_CD'        , width: '100%', datatype: 'text' },
                    ];
        
        //fc_addDataInGettedLov ( 'DEPT_CD'    , {code: 'DEPT_CD'    , tags: '', alias: ''} );
        //fc_addDataInGettedLov ( 'POSITION_CD', {code: 'POSITION_CD', tags: '', alias: ''} );
        //fc_addDataInGettedLov ( 'GENDER_CD'  , {code: 'GENDER_CD'  , tags: '', alias: ''} );

        //fc_addDataInSettingLov( {object: 'DEPT_CD'    , code: 'DEPT_CD'    , format: 'V', nullable: true, defval: ''} );
        //fc_addDataInSettingLov( {object: 'POSITION_CD', code: 'POSITION_CD', format: 'V', nullable: true, defval: ''} );
        //fc_addDataInSettingLov( {object: 'GENDER_CD'  , code: 'GENDER_CD'  , format: 'V', nullable: true, defval: ''} );
        break;
    case 'EMP_INFO_REMARKS' : // SCOD0030
        if ( caption_flag ) {
            sCaption = '';
            sItemCd  = '';
        };
        colWidths = [ 10,100 ];
        objCols   = [
                    {caption: 'Remarks', name:'REMARKS_HEAD', width: '100%', datatype: 'header'  , itemCd: 'REMARKS'},
                    {caption: 'Remarks', name:'REMARKS'     , width: '100%', datatype: 'textarea', height:100 }
                    ];
        break;
    case 'QUERY_MASTER' : // SCOG0040
        if ( caption_flag ) {
            sCaption = '';
            sItemCd  = '';
        };
        colWidths = [ 70,150,70,70,70,200 ];
        objCols   = [
                    {caption: 'Query ID'  , name: 'QUERY_ID_CUR_HEAD'  , width: '100%', datatype: 'header', itemCd: 'QUERY_ID'},
                    {caption: 'Query ID'  , name: 'QUERY_ID_CUR'       , width: '100%', datatype: 'text'  , uppercase: true, readonly: true },
                    {caption: 'Query Type', name: 'QUERY_TYPE_CUR_HEAD', width: '100%', datatype: 'header', itemCd: 'QUERY_TYPE'},
                    {caption: 'Query Type', name: 'QUERY_TYPE_CUR'     , width: '100%', datatype: 'lov'  },
                    {caption: 'Remarks'   , name: 'QUERY_REMARKS_HEAD' , width: '100%', datatype: 'header', itemCd: 'REMARKS'},
                    {caption: 'Remarks'   , name: 'QUERY_REMARKS_CUR'  , width: '100%', datatype: 'text' },
                    ];
        break;
    case 'BIZ_RULE' : // SCOG0120
        if ( caption_flag ) {
            sCaption = '';
            sItemCd  = '';
        };
        colWidths = [ 100, 300 ];
        objCols   = [
                    {caption: 'Rule Id'  , name: 'RULE_ID_HEAD' , width: '100%', datatype: 'header'  , itemCd: 'RULE_ID'},
                    {caption: 'Rule Id'  , name: 'RULE_ID'      , width: '100%', datatype: 'text'    , uppercase: true, maxlength: 8, required:true},
                    {caption: 'Rule Name', name: 'RULE_NM_HEAD' , width: '100%', datatype: 'header'  , itemCd: 'RULE_NM'},
                    {caption: 'Rule Name', name: 'RULE_NM'      , width: '100%', datatype: 'text'    , uppercase: true, required:true},
                    {caption: 'Use YN'   , name: 'USE_YN_HEAD'  , width: '100%', datatype: 'header'  , itemCd: 'USE_YN'},
                    {caption: 'Use YN'   , name: 'USE_YN_CHK'   , width: '100%', datatype: 'checkbox', defval:true  },
                    {caption: 'Remarks'  , name: 'REMARKS_HEAD' , width: '100%', datatype: 'header'  , itemCd: 'REMARKS'},
                    {caption: 'Remarks'  , name: 'REMARKS'      , width: '100%', datatype: 'text'   },
                    ];
        break;
    case 'MENU_DTL_INFO' : // SCOC0030
        if ( caption_flag ) {
            sCaption = 'Current Menu';
            sItemCd  = 'CAP_CURR_MENU_INFO';
        };
        colWidths = [ 100,300 ];
        objCols =   [
                    {caption: 'Menu Name'  , name: 'MNU_NM'       , width: 200, datatype: 'header' },
                    {caption: 'Menu Name'  , name: 'MNU_NM'       , width: 200, datatype: 'text'    , readonly: true, align: 'left' },
                    {caption: 'Parent Menu', name: 'PARENT_MNU_CD', width: 200, datatype: 'header' },
                    {caption: 'Parent Menu', name: 'PARENT_MNU_CD', width: 200, datatype: 'text'    , readonly: true, align: 'left' },
                    {caption: 'Group ?'    , name: 'MNU_GRP_YN'   , width:  50, datatype: 'header'  , itemCd: 'CAP_GROUP_YN'},
                    {caption: 'Group ?'    , name: 'MNU_GRP_YN'   , width:  50, datatype: 'checkbox', readonly: true, align: 'center' },
                    {caption: 'Program ID' , name: 'PGM_ID'       , width: 100, datatype: 'header' },
                    {caption: 'Program ID' , name: 'PGM_ID'       , width: 100, datatype: 'text'    , readonly: true, align: 'left' },
                    ];
        break;
    case 'FUNCTION_MASTER_DETAIL1' : // SCOZ0050,SCOZ0060
        if ( caption_flag ) {
            sCaption = 'Function Infomation';
            sItemCd  = 'CAP_FUNC_INFO';
        };
        var readOnlyFlag = true;
        if ( sSubKey == 'NEW' ) {
            readOnlyFlag = false;
        };
        colWidths = [ 100,100,100,100 ];
        objCols   = [
                     {caption: 'Function ID', name: 'F_FUNC_ID', width: 100, datatype: 'header', itemCd: 'FUNC_ID', align: 'center', required: true }
                    ,{caption: 'Function ID', name: 'F_FUNC_ID', width: 100, datatype: 'text'  , readonly: readOnlyFlag }
                    ,{caption: 'File Name'  , name: 'F_FILE_NM', width: 100, datatype: 'header', itemCd: 'FILE_NM', align: 'center', required: true }
                    ,{caption: 'File Name'  , name: 'F_FILE_NM', width: 100, datatype: 'text'  , readonly: readOnlyFlag }

                    ,{caption: 'Return Y/N' , name: 'F_RTN_YN1', width: 100, datatype: 'header'  , itemCd: 'RTN_YN', align: 'center' }
                    ,{caption: 'Return Y/N' , name: 'F_RTN_YN1', width: 100, datatype: 'checkbox'                  , align: 'center' }
                    ,{caption: 'System Y/N' , name: 'F_SYS_YN1', width: 100, datatype: 'header'  , itemCd: 'SYS_YN', align: 'center' }
                    ,{caption: 'System Y/N' , name: 'F_SYS_YN1', width: 100, datatype: 'checkbox'                  , align: 'center' }
                    ];
        break;
    case 'FUNCTION_MASTER_DETAIL2' : // SCOZ0050,SCOZ0060
        if ( caption_flag ) {
            sCaption = 'Master Detail';
            sItemCd  = '';
        };
        colWidths = [ 100,300 ];
        objCols   = [
                     {caption: 'Func. Description' , name: 'F_FUNC_DESC', width: 100, datatype: 'header' , itemCd: 'FUNC_DESC', align:'center'}
                    ,{caption: 'Func. Description' , name: 'F_FUNC_DESC', width: 300, datatype: 'text'  }
                    ,{caption: 'Return Description', name: 'F_RTN_DESC' , width: 100, datatype: 'header', itemCd: 'RTN_DESC', align:'center'}
                    ,{caption: 'Return Description', name: 'F_RTN_DESC' , width: 300, datatype: 'text' }
                    ,{caption: 'Tags', name: 'F_TAGS', width: 100, datatype: 'header', itemCd: 'TAGS', align:'center'}
                    ,{caption: 'Tags', name: 'F_TAGS', width: 300, datatype: 'text' }
                    ];
        break;
    case 'FUNCTION_MASTER_DETAIL3' : // SCOZ0050,SCOZ0060
        if ( caption_flag ) {
            sCaption = 'Function Infomation';
            sItemCd  = 'CAP_FUNC_INFO';
        };
        colWidths = [ 100,100,100,100 ];
        objCols   = [
                     {caption: 'Params', name: 'F_PARAM_CNT', width: 100, datatype: 'header' , itemCd: 'PARAM_CNT', align:'center'}
                    ,{caption: 'Params', name: 'F_PARAM_CNT', width: 100, datatype: 'text'                        , align:'center', readonly: true }
                    ,{caption: 'Col09' , name: 'Col09'      , width: 100, datatype: 'label' }
                    ,{caption: 'Col10' , name: 'Col10'      , width: 100, datatype: 'label' }
                    ];
        break;
    case 'FUNCTION_MASTER_DETAIL4' : // SCOZ0050,SCOZ0060
        if ( caption_flag ) {
            sCaption = 'Function Infomation';
            sItemCd  = 'CAP_FUNC_INFO';
        };
        colWidths = [ 100,100,100,100 ];
        objCols   = [
                     {caption: 'Params'       , name: 'F_PARAM_CNT', width: 100, datatype: 'header', itemCd: 'PARAM_CNT'    , align:'center'}
                    ,{caption: 'Params'       , name: 'F_PARAM_CNT', width: 100, datatype: 'text'                           , align:'center' , readonly: true }
                    ,{caption: 'Master Delete', name: 'F_MASTERDEL', width: 100, datatype: 'header', itemCd: 'CAP_MASTERDEL', align:'center'}
                    ,{caption: 'Delete'       , name: 'F_DELETE'   , width: 100, datatype: 'button', itemCd: 'CAP_DELETE'   , align:'center'}
                    ];
        break;
    case 'DEVELOPER_TABLE_DML' : // SCOZ0070
        if ( caption_flag ) {
            sCaption = 'DEVELOPER_TABLE_DML';
            sItemCd  = 'CAP_TABLE_DML';
        };
        colWidths = [ 100 ];
        objCols   = [
                    {caption: 'TABLE_DML', name: 'TABLE_DML', width: 100, datatype: 'textarea', align:'center'},
                    ];
        break;
    case 'DEVELOPER_GF_SPEC' : // SCOZ0070
        if ( caption_flag ) {
            sCaption = 'DEVELOPER_GF_SPEC';
            sItemCd  = 'CAP_GF_SPEC';
        };
        colWidths = [ 100 ];
        objCols   = [
                    {caption: 'GF_SPEC', name: 'GF_SPEC', width: 100, datatype: 'textarea', align:'center'},
                    ];
        break;
    case 'DEVELOPER_GF_BODY' : // SCOZ0070
        if ( caption_flag ) {
            sCaption = 'DEVELOPER_GF_BODY';
            sItemCd  = 'CAP_GF_BODY';
        };
        colWidths = [ 100 ];
        objCols   = [
                    {caption: 'GF_BODY', name: 'GF_BODY', width: 100, datatype: 'textarea', align:'center'},
                    ];
        break;
    case 'DEVELOPER_CT_SPEC' : // SCOZ0070
        if ( caption_flag ) {
            sCaption = 'DEVELOPER_CT_SPEC';
            sItemCd  = 'CAP_CT_SPEC';
        };
        colWidths = [ 100 ];
        objCols   = [
                    {caption: 'CT_SPEC', name: 'CT_SPEC', width: 100, datatype: 'textarea', align:'center'},
                    ];
        break;
    case 'DEVELOPER_CT_BODY' : // SCOZ0070
        if ( caption_flag ) {
            sCaption = 'DEVELOPER_CT_BODY';
            sItemCd  = 'CAP_CT_BODY';
        };
        colWidths = [ 100 ];
        objCols   = [
                    {caption: 'CT_BODY' , name: 'CT_BODY', width: 1, datatype: 'textarea', align:'center'},
                    ];
        break;
    case 'DEVELOPER_QUERY_TEMP' : // SCOZ0070
        if ( caption_flag ) {
            sCaption = 'DEVELOPER_QUERY_TEMP';
            sItemCd  = 'CAP_QUERY_TEMP';
        };
        colWidths = [ 100 ];
        objCols   = [
                    {caption: 'QUERY_TEMP', name: 'QUERY_TEMP', width: 100, datatype: 'textarea', align:'center'},
                    ];
        break;
    case 'REQ_HEADER1' : // SCOZ0100
        if ( caption_flag ) {
            sCaption = 'Reqeust Infomation';
            sItemCd  = 'CAP_REQ_INFO';
        };
        colWidths = [ 50,400,50 ];
        objCols   = [
                    {caption: 'Req ID'    , name: 'H_REQ_ID'   , datatype: 'header', itemCd: 'REQ_ID'   , align: 'center'},
                    {caption: 'Title'     , name: 'H_REQ_TITLE', datatype: 'header', itemCd: 'REQ_TITLE', align: 'center'},
                    {caption: 'Req Status', name: 'H_REQ_STS'  , datatype: 'header', itemCd: 'REQ_STS'  , align: 'center'},

                    {caption: 'Req ID'    , name: 'H_REQ_ID'   , datatype: 'text'  , readonly: true , align: 'center'},
                    {caption: 'Title'     , name: 'H_REQ_TITLE', datatype: 'text'  , readonly: false, required: true },
                    {caption: 'Req Status', name: 'H_REQ_STS'  , datatype: 'lov'   , readonly: false, required: true },
                    ];
        fc_addDataInGettedLov ( 'REQ_STS', {code: 'REQ_STS', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: 'H_REQ_STS', code: 'REQ_STS', format: 'V', nullable: false, defval: 'R' } );
        break;
    case 'REQ_HEADER2' : // SCOZ0100
        if ( caption_flag ) {
            sCaption = 'Reqeust Infomation';
            sItemCd  = 'CAP_REQ_INFO';
        };
        if ( sSubKey == 'NEW' ) {
            colWidths = [ 50,200,50,200 ];
            objCols   = [
                        {caption: 'Request'  , name: 'H_REQUEST'        , datatype: 'header', align: 'center', itemCd: 'CAP_REQUEST' },
                        {caption: 'Request'  , name: 'H_REQUEST'        , datatype: 'header', align: 'center', itemCd: 'CAP_REQUEST' },
                        {caption: 'Request'  , name: 'H_REQUEST'        , datatype: 'header', align: 'center', itemCd: 'CAP_REQUEST' },
                        {caption: 'Request'  , name: 'H_REQUEST'        , datatype: 'header', align: 'center', itemCd: 'CAP_REQUEST' },

                        {caption: 'Requester', name: 'H_REQ_USER_ID'    , datatype: 'header', align: 'center', itemCd: 'CAP_REQ_USER' },
                        {caption: 'Requester', name: 'H_REQ_USER_ID'    , datatype: 'lov'   , readonly: false, required:true },
                        {caption: 'Dept'     , name: 'H_REQ_DEPT'       , datatype: 'header', align: 'center', itemCd: 'REQ_DEPT' },
                        {caption: 'Dept'     , name: 'H_REQ_DEPT'       , datatype: 'lov'   , readonly: false, required:true },

                        {caption: 'Charge'   , name: 'H_CHARGE'         , datatype: 'header', align: 'center', itemCd: 'CAP_CHARGE' },
                        {caption: 'Charge'   , name: 'H_CHARGE'         , datatype: 'header', align: 'center', itemCd: 'CAP_CHARGE' },
                        {caption: 'Charge'   , name: 'H_CHARGE'         , datatype: 'header', align: 'center', itemCd: 'CAP_CHARGE' },
                        {caption: 'Charge'   , name: 'H_CHARGE'         , datatype: 'header', align: 'center', itemCd: 'CAP_CHARGE' },

                        {caption: 'Charger'  , name: 'H_REQ_CHARGE_ID'  , datatype: 'header', align: 'center'  , itemCd: 'CAP_REQ_CHARGE' },
                        {caption: 'Charger'  , name: 'H_REQ_CHARGE_ID'  , datatype: 'lov'    , required:false },
                        {caption: 'Dept'     , name: 'H_REQ_CHARGE_DEPT', datatype: 'header', align: 'center'  , itemCd: 'REQ_CHARGE_DEPT' },
                        {caption: 'Dept'     , name: 'H_REQ_CHARGE_DEPT', datatype: 'lov'   , readonly: false  , required:false },
                        ];
        } else {
            colWidths = [ 50,100,50,100,50,100,50,100 ];
            objCols   = [
                        {caption: 'Request'  , name: 'H_REQUEST'        , datatype: 'header', align: 'center', itemCd: 'CAP_REQUEST' },
                        {caption: 'Request'  , name: 'H_REQUEST'        , datatype: 'header', align: 'center', itemCd: 'CAP_REQUEST' },
                        {caption: 'Request'  , name: 'H_REQUEST'        , datatype: 'header', align: 'center', itemCd: 'CAP_REQUEST' },
                        {caption: 'Request'  , name: 'H_REQUEST'        , datatype: 'header', align: 'center', itemCd: 'CAP_REQUEST' },
                        {caption: 'Charge'   , name: 'H_CHARGE'         , datatype: 'header', align: 'center', itemCd: 'CAP_CHARGE' },
                        {caption: 'Charge'   , name: 'H_CHARGE'         , datatype: 'header', align: 'center', itemCd: 'CAP_CHARGE' },
                        {caption: 'Charge'   , name: 'H_CHARGE'         , datatype: 'header', align: 'center', itemCd: 'CAP_CHARGE' },
                        {caption: 'Charge'   , name: 'H_CHARGE'         , datatype: 'header', align: 'center', itemCd: 'CAP_CHARGE' },

                        {caption: 'Requester', name: 'H_REQ_USER_ID'    , datatype: 'header', align: 'center'  , itemCd: 'CAP_REQ_USER' },
                        {caption: 'Requester', name: 'H_REQ_USER_ID'    , datatype: 'lov'   , readonly: false },
                        {caption: 'Dept'     , name: 'H_REQ_DEPT'       , datatype: 'header', align: 'center'  , itemCd: 'REQ_DEPT' },
                        {caption: 'Dept'     , name: 'H_REQ_DEPT'       , datatype: 'lov'   , readonly: true  },
                        {caption: 'Charger'  , name: 'H_REQ_CHARGE_ID'  , datatype: 'header', align: 'center'  , itemCd: 'CAP_REQ_CHARGE'},
                        {caption: 'Charger'  , name: 'H_REQ_CHARGE_ID'  , datatype: 'lov'   , required:true   },
                        {caption: 'Dept'     , name: 'H_REQ_CHARGE_DEPT', datatype: 'header', align: 'center'  , itemCd: 'REQ_CHARGE_DEPT' },
                        {caption: 'Dept'     , name: 'H_REQ_CHARGE_DEPT', datatype: 'lov'   , readonly: true   , required:true },
                        ];
        };
        fc_addDataInGettedLov ( 'REQ_DEPT', {code: 'REQ_DEPT', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: 'H_REQ_DEPT'       , code: 'REQ_DEPT', format: 'V', nullable: true, defval: ''} );
        fc_addDataInSettingLov( {object: 'H_REQ_CHARGE_DEPT', code: 'REQ_DEPT', format: 'V', nullable: true, defval: ''} );
        fc_addDataInGettedLov ( 'REQ_USER', {code: 'REQ_USER', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: 'H_REQ_USER_ID'    , code: 'REQ_USER', format: 'V', nullable: true, defval: ''} );
        fc_addDataInSettingLov( {object: 'H_REQ_CHARGE_ID'  , code: 'REQ_USER', format: 'V', nullable: true, defval: ''} );
        break;
    case 'REQ_CONTEXT1' : // SCOZ0100
        if ( caption_flag ) {
            sCaption = 'Reqeust Context';
            sItemCd  = 'CAP_REQ_INFO';
        };
        colWidths = [ 100 ];
        objCols   = [
                    {caption: 'Reqeust Context'  , name: 'H_REQ_CONTEXT', datatype: 'header', itemCd: 'REQ_CONTENTS' },
                    ];
        break;
    case 'REQ_CONTEXT2' : // SCOZ0100
        if ( caption_flag ) {
            sCaption = 'Reqeuest Progress';
            sItemCd  = 'CAP_REQ_INFO';
        };
        colWidths = [ 100 ];
        objCols   = [
                    {caption: 'Request Progress'  , name: 'H_REQ_PROGRESS', datatype: 'header', itemCd: 'REQ_PROGRESS' },
                    ];
        break;
    case 'REQ_CONTEXT3' : // SCOZ0100
        if ( caption_flag ) {
            sCaption = 'Reference Document';
            sItemCd  = 'CAP_REQ_INFO';
        };
        colWidths = [ 100 ];
        objCols   = [
                    {caption: 'Reference Documnet'  , name: 'H_REQ_REF_DOC', datatype: 'header', itemCd: 'REQ_REF_DOC' },
                    ];
        break;
    case 'REQ_DATE' : // SCOZ0100
        if ( caption_flag ) {
            sCaption = 'Reqeust Infomation';
            sItemCd  = 'CAP_REQ_INFO';
        };
        if ( sSubKey == 'NEW' ) {
            colWidths = [ 100,100,100,100 ];
            objCols   = [
                        {caption: 'Registerd Date'  , name: 'H_REG_DT'     , height: 27, datatype: 'header'  , itemCd: 'CAP_REG_DT' , align: 'center'},
                        {caption: 'Registerd Date'  , name: 'H_REG_DT'     , height: 27, datatype: 'datetime'                       , align: 'left'   , readonly: true },
                        {caption: 'Received Date'   , name: 'H_RCV_DT'     , height: 27, datatype: 'header'  , itemCd: 'REQ_RCV_DT' , align: 'center'},
                        {caption: 'Received Date'   , name: 'H_RCV_DT'     , height: 27, datatype: 'date'                           , align: 'left'   , readonly: false  , required:false },
                        {caption: 'Plan End Date'   , name: 'H_PLAN_END_DT', height: 27, datatype: 'header'  , itemCd: 'PLAN_END_DT', align: 'center'},
                        {caption: 'Plan End Date'   , name: 'H_PLAN_END_DT', height: 27, datatype: 'date'                           , align: 'left'   , required:false },
                        {caption: 'End Date'        , name: 'H_END_DT'     , height: 27, datatype: 'header'  , itemCd: 'END_DT'     , align: 'center'},
                        {caption: 'End Date'        , name: 'H_END_DT'     , height: 27, datatype: 'date'                           , align: 'left'  },
                        ];
        } else {
            colWidths = [ 50,100 ];
            objCols   = [
                        {caption: 'Registerd Date'  , name: 'H_REG_DT'     , height: 27, datatype: 'header'  , itemCd: 'CAP_REG_DT' , align: 'center'},
                        {caption: 'Registerd Date'  , name: 'H_REG_DT'     , height: 27, datatype: 'datetime'                       , align: 'left'   , readonly: true },
                        {caption: 'Received Date'   , name: 'H_RCV_DT'     , height: 27, datatype: 'header'  , itemCd: 'REQ_RCV_DT' , align: 'center'},
                        {caption: 'Received Date'   , name: 'H_RCV_DT'     , height: 27, datatype: 'date'                           , align: 'left'   , readonly: false , required:true },
                        {caption: 'Plan End Date'   , name: 'H_PLAN_END_DT', height: 27, datatype: 'header'  , itemCd: 'PLAN_END_DT', align: 'center'},
                        {caption: 'Plan End Date'   , name: 'H_PLAN_END_DT', height: 27, datatype: 'date'                           , align: 'left'   , required:true  },
                        {caption: 'End Date'        , name: 'H_END_DT'     , height: 27, datatype: 'header'  , itemCd: 'CAP_END_DT' , align: 'center'},
                        {caption: 'End Date'        , name: 'H_END_DT'     , height: 27, datatype: 'date'                           , align: 'left'  },
                        ];
        };
        break;

       case 'RSLT_SETUP' : // S100060

            if ( caption_flag ) {
                sCaption = '최적의작업표준실적 셋업';
                sItemCd  = 'CAP_RSLT_STUP_M';
            };
            colWidths = [ 70,150,70,70,70,200 ];
            objCols   = [
                        {caption: 'VIEW명'  , name: 'VIEW_NM_CUR_HEAD'  , width: '100%', datatype: 'header', itemCd: 'VIEW_NM',isMultiLanguage:true},
                        {caption: 'VIEW_NM'  , name: 'VIEW_NM'       , width: '100%', datatype: 'text'  ,readonly: false, uppercase: true,  },
                        {caption: '입력항목 갯수', name: 'INST_ATTR_CNT_CUR_HEAD', width: '100%', datatype: 'header', itemCd: 'INST_ATTR_CNT',isMultiLanguage:true},
                        {caption: 'INST_ATTR_CNT', name: 'INST_ATTR_CNT'     , width: '100%', datatype: 'text', readonly: true  },
                        {caption: '출력항목 갯수'   , name: 'OTPT_ATTR_CNT_HEAD' , width: '100%', datatype: 'header', itemCd: 'OTPT_ATTR_CNT',isMultiLanguage:true},
                        {caption: 'OTPT_ATTR_CNT'   , name: 'OTPT_ATTR_CNT'  , width: '100%', datatype: 'text', readonly: true  },
                        ];
        break;

       case 'VER_SETUP' : // SCOM1021

            if ( caption_flag ) {
                sCaption = '버전정보 관리';
                sItemCd  = 'CAP_VER_SETUP';
            };
            colWidths = [100,100 ];
            objCols   = [
                        {caption: '업무기준ID'  , name: 'JOB_BAS_ID'  , width: '100%', datatype: 'header', itemCd: '',isMultiLanguage:true},
                        {caption: '업무기준ID'  , name: 'JOB_BAS_ID'       , width: '100%', datatype: 'text'  ,readonly: true, uppercase: true,  },
                        {caption: '업무기준NAME'  , name: 'JOB_BAS_NM'  , width: '100%', datatype: 'header', itemCd: '',isMultiLanguage:true},
                        {caption: '업무기준NAME'  , name: 'JOB_BAS_NM'       , width: '100%', datatype: 'text'  ,readonly: true, uppercase: true,  },
                        {caption: '현재버전', name: 'VER', width: '100%', datatype: 'header', itemCd: '',isMultiLanguage:true},
                        {caption: 'VER', name: 'CUR_VER'     , width: '100%', datatype: 'text', readonly: true  },
                        {caption: '현재버전 시작일자', name: 'AP_ST_DTM', width: '100%', datatype: 'header', itemCd: '',isMultiLanguage:true},
                        {caption: '현재버전 시작일자', name: 'AP_ST_DTM'     , width: '100%', datatype: 'date'  },
//                      {caption: '현재버전 종료예정일자 사용여부', name: 'AP_ED_USE_YN', width: '100%', datatype: 'header', itemCd: '',isMultiLanguage:true},
//                      {caption: '현재버전 종료예정일자 사용여부', name: 'AP_ED_USE_YN'     , width: '100%', datatype: 'checkbox' },
//                      {caption: '현재버전 종료예정일자', name: 'AP_ED_DTM', width: '100%', datatype: 'header', itemCd: '',isMultiLanguage:true},
//                      {caption: '현재버전 종료예정일자', name: 'AP_ED_DTM'     , width: '100%', datatype: 'date' },
                        {caption: '신규버전'   , name: 'NEW_VER_HEAD' , width: '100%', datatype: 'header', itemCd: '',isMultiLanguage:true},
                        {caption: 'NEW_VER'   , name: 'NEW_VER'  , width: '100%', datatype: 'number', readonly: false , align:'left', maxlength:2 },
                        {caption: 'MESSAGE'   , name: 'MESSAGE' , width: '100%', datatype: 'text', readonly: true , align:'center',isMultiLanguage:true},
                        {caption: 'MESSAGE'   , name: 'MESSAGE'  , width: '100%', datatype: 'text', readonly: true  ,align:'center'},
                        ];
        break;
        
       case 'VER_SETUP_HIST' : // SCOM1031

           if ( caption_flag ) {
               sCaption = '버전정보 관리';
               sItemCd  = 'CAP_VER_SETUP_HIST';
           };
           colWidths = [100,100 ];
           objCols   = [
                       {caption: '업무기준ID'  , name: 'JOB_BAS_ID'  , width: '100%', datatype: 'header', itemCd: '',isMultiLanguage:true},
                       {caption: '업무기준ID'  , name: 'JOB_BAS_ID'       , width: '100%', datatype: 'text'  ,readonly: true, uppercase: true,  },
                       {caption: '업무기준NAME'  , name: 'JOB_BAS_NM'  , width: '100%', datatype: 'header', itemCd: '',isMultiLanguage:true},
                       {caption: '업무기준NAME'  , name: 'JOB_BAS_NM'       , width: '100%', datatype: 'text'  ,readonly: true, uppercase: true,  },
                       {caption: '현재버전', name: 'VER', width: '100%', datatype: 'header', itemCd: '',isMultiLanguage:true},
                       {caption: 'VER', name: 'CUR_VER'     , width: '100%', datatype: 'text', readonly: true  },
                       {caption: '현재버전 시작일자', name: 'AP_ST_DTM', width: '100%', datatype: 'header', itemCd: '',isMultiLanguage:true},
                       {caption: '현재버전 시작일자', name: 'AP_ST_DTM'     , width: '100%', datatype: 'date'  },
                       {caption: '신규버전'   , name: 'NEW_VER_HEAD' , width: '100%', datatype: 'header', itemCd: '',isMultiLanguage:true},
                       {caption: 'NEW_VER'   , name: 'NEW_VER'  , width: '100%', datatype: 'number', readonly: false , align:'left', maxlength:2 },
                       {caption: 'MESSAGE'   , name: 'MESSAGE' , width: '100%', datatype: 'text', readonly: true , align:'center',isMultiLanguage:true},
                       {caption: 'MESSAGE'   , name: 'MESSAGE'  , width: '100%', datatype: 'text', readonly: true  ,align:'center'},
                       {caption: '변경사유'   , name: 'REASON' , width: '100%', datatype: 'header', itemCd: '', align:'center', readonly: true},
                       {caption: 'REASON'   , name: 'REASON' , width: '100%', datatype: 'lov', readonly: false , align:'left'},
                       {caption: '상세내용'   , name: 'DETAIL_CONTENT' , width: '100%', height: 50, datatype: 'header', itemCd: '', align:'center', readonly: true, isMultiLanguage:false},
                       {caption: 'DETAIL_CONTENT'   , name: 'DETAIL_CONTENT'  , width: '100%', height: 50, datatype: 'text', readonly: false , align:'left'},
                       ];
           fc_addDataInGettedLov ( 'VER_SETUP_REASON'      , {code: 'VER_SETUP_REASON'     , tags: ''  , alias:'' } );
           fc_addDataInSettingLov( {object: 'REASON'       , code: 'VER_SETUP_REASON'      , format: 'V'   , nullable: true, defval: ''    });
       break;       
        

       case 'FRML_EXPLT' : // SCOM2010,SCOM2020  계산공식

            if ( caption_flag ) {
                sCaption = '계산공식';
                sItemCd  = 'CAP_FRML_EXPLT';
            };
            colWidths = [ 70,200 ];

            objCols   = [
                        {caption: '계산식'  , name: 'FRML_HEAD'  , width: '100%' ,datatype: 'header', itemCd: 'FRML',isMultiLanguage:false},
                        {caption: 'FRML'  , name: 'FRML'       , width: '100%', datatype: 'text'  ,readonly: false, uppercase: true,  },
                        {caption: '설명', name: 'FRML_EXPLNT_HEAD', width: '100%', datatype: 'header', itemCd: 'FRML_EXPLNT',isMultiLanguage:false},
                        {caption: 'FRML_EXPLNT', name: 'FRML_EXPLNT'     , width: '100%', datatype: 'text', readonly: false  }
                        ];
        break;

       case 'OTMZ_FRML_EXPLT' : // S101010 최적화 계산공식

            if ( caption_flag ) {
                sCaption = '계산공식';
                sItemCd  = 'CAP_OTMZ_FRML_EXPLT';
            };
            colWidths = [ 70,200 ];

            objCols   = [
                        {caption: '계산식'  , name: 'FRML_HEAD'  , width: '100%' ,datatype: 'header', itemCd: 'FRML',isMultiLanguage:false},
                        {caption: 'FRML'  , name: 'OTMZ_FRML'       , width: '100%', datatype: 'text'  ,readonly: false, uppercase: true,  },
                        {caption: '설명', name: 'FRML_EXPLNT_HEAD', width: '100%', datatype: 'header', itemCd: 'FRML_EXPLNT',isMultiLanguage:false},
                        {caption: 'FRML_EXPLNT', name: 'OTMZ_FRML_EXPLNT'     , width: '100%', datatype: 'text', readonly: false  }
                        ];
        break;
       case 'FRML_RSLT_PRC' : // SCOM2010  결과값 처리방법

            if ( caption_flag ) {
                sCaption = '결과값 처리방법';
                sItemCd  = 'CAP_FRML_RSLT_PRC';
            };
            colWidths = [ '15%','20%','15%','15%','15%','20%'];
            objCols   = [
                        {caption: '어림수'  , name: 'RND_PROC_TY_HEAD'  , width: '100%', datatype: 'header', itemCd: 'RND_PROC_TY',isMultiLanguage:false},
                        {caption: 'RND_PROC_TY'  , name: 'RND_PROC_TY'       , width: '100%', datatype: 'lov'  ,readonly: false, uppercase: true,  },
                        {caption: '소수점 자리수', name: 'RND_CPHR_HEAD', width: '100%', datatype: 'header', itemCd: 'RND_CPHR',isMultiLanguage:false},
                        {caption: 'RND_CPHR', name: 'RND_CPHR'     , width: '100%', datatype: 'text', readonly: false  },
                        {caption: '단위', name: 'RST_VAL_UNT_HEAD', width: '100%', datatype: 'header', itemCd: 'RST_VAL_UNT',isMultiLanguage:false},
                        {caption: 'RST_VAL_UNT', name: 'RST_VAL_UNT'     , width: '100%', datatype: 'text', readonly: false  }
                        ];
            fc_addDataInGettedLov ( 'RND_PROC_TY', {code: 'RND_PROC_TY', tags: '', alias: ''} );
            fc_addDataInSettingLov( {object: 'RND_PROC_TY', code: 'RND_PROC_TY', format: 'K:V', nullable: false, defval: '' } );
        break;

       case 'USE_LOG_DETAIL' : // SCOM1060  작업표준 사용 상세내역(일반,판단기준- 팝업)

            if ( caption_flag ) {
                sCaption = '작업표준 활용내역';
                sItemCd  = 'CAP_USE_LOG_DETAIL';
            };
            colWidths = [ '15%','20%','15%','15%','15%','20%'];
            objCols   = [
                        {caption: '업무구분'  , name: 'CHAIN_CD_HEAD'  , width: '100%', datatype: 'header', itemCd: '',isMultiLanguage:false},
                        {caption: 'CHAIN_CD'  , name: 'CHAIN_CD_NM'       , width: '100%', datatype: 'text'  ,readonly: true, uppercase: true  },
                        {caption: '업무기준명', name: 'JOB_BAS_NM_HEAD', width: '100%', datatype: 'header', itemCd: '',isMultiLanguage:false},
                        {caption: 'OB_BAS_NM', name: 'JOB_BAS_NM'     , width: '100%', datatype: 'text', readonly: true  },
                        {caption: '업무기준유형', name: 'JOB_BAS_TY_NM_HEAD', width: '100%', datatype: 'header', itemCd: '',isMultiLanguage:false},
                        {caption: 'JOB_BAS_NM', name: 'JOB_BAS_TY_NM'     , width: '100%', datatype: 'text', readonly: true  },

                        {caption: '활용일시'  , name: 'USE_DTM_HEAD'  , width: '100%', datatype: 'header', itemCd: '',isMultiLanguage:false},
                        {caption: 'USE_DTM'  , name: 'USE_DTM'       , width: '100%', datatype: 'text'  ,readonly: true, uppercase: true,  },
                        {caption: '버전정보', name: 'VER_HEAD', width: '100%', datatype: 'header', itemCd: '',isMultiLanguage:false},
                        {caption: 'VER', name: 'VER'     , width: '100%', datatype: 'text', readonly: true  },
                        {caption: '활용사용자ID', name: 'CRT_USER_ID_NM_HEAD', width: '100%', datatype: 'header', itemCd: '',isMultiLanguage:false},
                        {caption: 'CRT_USER_ID_NM', name: 'CRT_USER_ID_NM'     , width: '100%', datatype: 'text', readonly: true  },

                        {caption: '활용프로그램ID'  , name: 'CRT_OBJ_ID_HEAD'  , width: '100%', datatype: 'header', itemCd: '',isMultiLanguage:false},
                        {caption: 'CRT_OBJ_ID'  , name: 'CRT_OBJ_ID'       , width: '100%', datatype: 'text'  ,readonly: true, uppercase: true,  },
                        {caption: '조건갯수', name: 'COND_CNT_HEAD', width: '100%', datatype: 'header', itemCd: '',isMultiLanguage:false},
                        {caption: 'COND_CNT', name: 'COND_CNT'     , width: '100%', datatype: 'text', readonly: true  },
                        {caption: '결과갯수', name: 'RSLT_CNT_HEAD', width: '100%', datatype: 'header', itemCd: '',isMultiLanguage:false},
                        {caption: 'RSLT_CNT', name: 'RSLT_CNT'     , width: '100%', datatype: 'text', readonly: true  }

                        ];

        break;

       case 'USE_LOG_FRML_DETAIL' : // SCOM2040  작업표준 사용 상세내역(계단식- 팝업)

            if ( caption_flag ) {
                sCaption = '작업표준 활용내역';
                sItemCd  = 'CAP_USE_LOG_FRML_DETAIL';
            };
            colWidths = [ '15%','20%','15%','15%','15%','20%'];
            objCols   = [
                        {caption: '업무구분'  , name: 'CHAIN_CD_HEAD'  , width: '100%', datatype: 'header', itemCd: '',isMultiLanguage:false},
                        {caption: 'CHAIN_CD'  , name: 'CHAIN_CD_NM'       , width: '100%', datatype: 'text'  ,readonly: true, uppercase: true,  },
                        {caption: '업무기준명', name: 'JOB_BAS_NM_HEAD', width: '100%', datatype: 'header', itemCd: '',isMultiLanguage:false},
                        {caption: 'OB_BAS_NM', name: 'JOB_BAS_NM'     , width: '100%', datatype: 'text', readonly: true  },
                        {caption: '업무기준유형', name: 'JOB_BAS_TY_NM_HEAD', width: '100%', datatype: 'header', itemCd: '',isMultiLanguage:false},
                        {caption: 'JOB_BAS_NM', name: 'JOB_BAS_TY_NM'     , width: '100%', datatype: 'text', readonly: true  },

                        {caption: '활용일시'  , name: 'USE_DTM_HEAD'  , width: '100%', datatype: 'header', itemCd: '',isMultiLanguage:false},
                        {caption: 'USE_DTM'  , name: 'USE_DTM'       , width: '100%', datatype: 'text'  ,readonly: true, uppercase: true,  },
                        {caption: '버전정보', name: 'VER_HEAD', width: '100%', datatype: 'header', itemCd: '',isMultiLanguage:false},
                        {caption: 'VER', name: 'VER'     , width: '100%', datatype: 'text', readonly: true  },
                        {caption: '활용사용자ID', name: 'CRT_USER_ID_NM_HEAD', width: '100%', datatype: 'header', itemCd: '',isMultiLanguage:false},
                        {caption: 'CRT_USER_ID_NM', name: 'CRT_USER_ID_NM'     , width: '100%', datatype: 'text', readonly: true  },

                        {caption: '활용프로그램ID'  , name: 'CRT_OBJ_ID_HEAD'  , width: '100%', datatype: 'header', itemCd: '',isMultiLanguage:false},
                        {caption: 'CRT_OBJ_ID'  , name: 'CRT_OBJ_ID'       , width: '100%', datatype: 'text'  ,readonly: true, uppercase: true,  },
                        {caption: '결과값', name: 'APPL_CALC_FMRL_RSLT_HEAD', width: '100%', datatype: 'header', itemCd: '',isMultiLanguage:false},
                        {caption: 'APPL_CALC_FMRL_RSLT', name: 'APPL_CALC_FMRL_RSLT'     , width: '100%', datatype: 'text', readonly: false  },
                        {caption: 'APPL_CALC_FMRL_RSLT', name: 'APPL_CALC_FMRL_RSLT'     , width: '100%', datatype: 'text', readonly: false },
                        {caption: 'APPL_CALC_FMRL_RSLT', name: 'APPL_CALC_FMRL_RSLT'     , width: '100%', datatype: 'text', readonly: false  }

                        ];

        break;

       case 'USE_LOG_FRML_EXPLT' : // SCOM2040  계산식 적용내용

            if ( caption_flag ) {
                sCaption = '계산공식 적용내용';
                sItemCd  = 'CAP_USE_LOG_FRML_EXPLT';
            };
            colWidths = [ '20%','10%','10%','20%','10%','30%' ];

            objCols   = [
                        {caption: '적용조건식'  , name: 'USE_LOG_COND_FRML_HEAD'  , width: '100%' ,datatype: 'header',  itemCd: '',isMultiLanguage:false},
                        {caption: '적용조건식'  , name: 'COND_FRML'       , width: '100%', datatype: 'text'  , readonly: false, uppercase: true,  },
                        {caption: '적용조건식'  , name: 'COND_FRML'  , width: '100%' ,datatype: 'text', itemCd: '',isMultiLanguage:false},
                        {caption: '적용조건식'  , name: 'COND_FRML'       , width: '100%', datatype: 'text'  , display: false , uppercase: true,  },

                        {caption: '적용계산식'  , name: 'USE_LOG_FMRL_HEAD'  , width: '100%' ,datatype: 'header', itemCd: '',isMultiLanguage:false},
                        {caption: '적용계산식'  , name: 'FRML'       , width: '100%', datatype: 'text'  ,readonly: false, uppercase: true  },

                        {caption: '적용계산식 설명', name: 'USE_LOG_FRML_EXPLNT_HEAD', width: '100%', datatype: 'header', itemCd: '',isMultiLanguage:false},
                        {caption: '적용계산식 설명', name: 'FRML_EXPLNT'     , width: '100%', datatype: 'text',readonly: false  },
                        {caption: '적용계산식 설명', name: 'FRML_EXPLNT'     , width: '100%', datatype: 'text', readonly: false  },
                        {caption: '적용계산식 설명', name: 'FRML_EXPLNT'     , width: '100%', datatype: 'text',  readonly: false  },
                        {caption: '적용계산식 설명', name: 'FRML_EXPLNT'     , width: '100%', datatype: 'text', readonly: false  },
                        {caption: '적용계산식 설명', name: 'FRML_EXPLNT'     , width: '100%', datatype: 'text',  readonly: false  },



                        {caption: '어림수'  , name: 'RND_PROC_TY_HEAD'  , width: '100%', datatype: 'header', itemCd: 'RND_PROC_TY',isMultiLanguage:false},
                        {caption: 'RND_PROC_TY'  , name: 'RND_PROC_TY'       , width: '100%', datatype: 'lov'  ,readonly: false, uppercase: true,  },
                        {caption: '소수점 자리수', name: 'RND_CPHR_HEAD', width: '100%', datatype: 'header', itemCd: 'RND_CPHR',isMultiLanguage:false},
                        {caption: 'RND_CPHR', name: 'RND_CPHR'     , width: '100%', datatype: 'text', readonly: false  },
                        {caption: '단위', name: 'RST_VAL_UNT_HEAD', width: '100%', datatype: 'header', itemCd: 'RST_VAL_UNT',isMultiLanguage:false},
                        {caption: 'RST_VAL_UNT', name: 'RST_VAL_UNT'     , width: '100%', datatype: 'text', readonly: false  }
                        ];
            fc_addDataInGettedLov ( 'RND_PROC_TY', {code: 'RND_PROC_TY', tags: '', alias: ''} );
            fc_addDataInSettingLov( {object: 'RND_PROC_TY', code: 'RND_PROC_TY', format: 'K:V', nullable: false, defval: '' } );
        break;
      
       case 'TEST_TEST' : // SCOZEX99
            if ( caption_flag ) {
                sCaption = '';
                sItemCd  = '';
            };
            
            objCols   = [
                        {caption: '컬럼1'  , name: 'COL1', width: 100, datatype: 'custpopup' },
                        {caption: '컬럼2'  , name: 'COL2', width: 100, datatype: 'hourmin' },
                        {caption: '컬럼3'  , name: 'COL3', width: 100, datatype: 'text' },
                        {caption: '컬럼4'  , name: 'COL4', width: 100, datatype: 'text' },
                        {caption: '컬럼5'  , name: 'COL5', width: 100, datatype: 'text' },
                        {caption: '컬럼6'  , name: 'COL6', width: 100, datatype: 'text' },
                        {caption: '컬럼7'  , name: 'COL7', width: 100, datatype: 'text' },
                        {caption: '컬럼8'  , name: 'COL8', width: 100, datatype: 'text' },
                        {caption: '컬럼9'  , name: 'COL9', width: 100, datatype: 'text' },
                        {caption: '컬럼10' , name: 'COL10', width: 100, datatype: 'text' },
                        {caption: '컬럼11' , name: 'COL10', width: 100, datatype: 'number', maxlength:5 },
                        ];
            
            
            
            break;
        
       case 'TEST_TEST1' : // SCOG0040
            if ( caption_flag ) {
                sCaption = '';
                sItemCd  = '';
            };
            colWidths = [ 70,150,70,70,70,200 ];
            objCols   = [
                        {caption: 'Query ID'  , name: 'QUERY_ID_CUR_HEAD'  , width: '100%', datatype: 'header', itemCd: 'QUERY_ID'},
                        {caption: 'Query ID'  , name: 'QUERY_ID_CUR'       , width: '100%', datatype: 'number' , digitsChk:false },
                        {caption: 'Query Type', name: 'QUERY_TYPE_CUR_HEAD', width: '100%', datatype: 'header', itemCd: 'QUERY_TYPE'},
                        {caption: 'Query Type', name: 'QUERY_TYPE_CUR'     , width: '100%', datatype: 'lov' , readonly: true },
                        {caption: 'Remarks'   , name: 'QUERY_REMARKS_HEAD' , width: '100%', datatype: 'header', itemCd: 'REMARKS'},
                        {caption: 'Remarks'   , name: 'QUERY_REMARKS_CUR'  , width: '100%', datatype: 'text' , readonly: true },
                        ];
            break;

    };

    var tableCaption = fc_makeTableCaption( sCaption, sItemCd, 0);
    var ret = { width: colWidths, col: objCols, caption: tableCaption, id: tableId };
    return ret;
}; // end of fm_getTableItems
/**
 *
 * @param sKey
 * @param sSubKey
 */
function fm_makeSpan( tableId, sKey, sSubKey ) {
    return;
}; // end of fm_makeSpan
/**
 * fm_getGridItems
 * @param sKey
 * @param sSubKey
 * @param caption_flag
 * @param attribute1
 * @param attribute2
 * @returns {___anonymous117455_117522}
 */
function fm_getGridItems( sKey, sSubKey, caption_flag, attribute1, attribute2 ) {
    var objItems    = null;
    var objGrpItems = null;
    var gridId      = '';
    var gridKey     = sKey;
    var sCaption    = '', sItemCd = '';

    switch ( sKey ) {
    case 'ACCESS_INFO': // SCOZ0040
        gridId = 'gridAccess';
        if ( caption_flag ) {
            sCaption = 'Remote Access Information';
            sItemCd  = 'CAP_REMOTE_ACCS_INFO';
        };
        objItems =  [
                    {caption: 'IP'     , name: 'ACCESS_IP'  , width: 150, datatype: 'text'     , itemCd: 'CAP_IP'  , frozen: true  , maxlength: 15 },
                    {caption: 'Port'   , name: 'ACCESS_PORT', width: 100, datatype: 'text'     , itemCd: 'CAP_PORT', frozen: true },
                    {caption: 'Name'   , name: 'ACCESS_NM'  , width: 200, datatype: 'text'     , itemCd: 'CAP_NM' },
                    {caption: 'Main ?' , name: 'MAIN_YN'    , width:  80, datatype: 'checkbox'},
                    {caption: 'Remarks', name: 'REMARKS'    , width: 450, datatype: 'text'}
                    ];
        fc_setKeysInCol ( gridId, [ 'ACCESS_IP' ] );
        fc_setUpperInCol( gridId, [ 'ACCESS_IP' ] );
        fc_setAlignInCol( gridId, [ 'ACCESS_IP','ACCESS_PORT' ], 'center' );
        break;
    case 'USER_INFO': // SCOD0010
        gridId = 'gridUser';
        if ( caption_flag ) {
            sCaption = 'User Information';
            sItemCd  = 'CAP_USER_INFO';
        };
        objGrpItems =   [
                        {caption: 'User'         , name: 'USER_ID_GRP'        , align: 'center',itemCd: 'CAP_USER' },
                        {caption: 'Validate Date', name: 'VALID_PERIOD_DT_GRP', align: 'center',itemCd: 'CAP_VALID'},
                        {caption: 'Emp'          , name: 'EMP_GRP', align: 'center',itemCd: 'CAP_EMP'},
                        {caption: '공급사정보'          , name: 'SUPPLIER_GRP', align: 'center', isMultiLanguage: false},
                        {caption: '고객정보'          , name: 'CUST_GRP', align: 'center', isMultiLanguage: false},
                        ];
        objItems =  [
                    {caption: 'ID'                  , name: 'USER_ID'               , width: 100, datatype: 'text'     , itemCd: 'CAP_ID'    , group: 'USER_ID_GRP', maxlength: 20 },
                    {caption: 'Name'                , name: 'USER_NM'               , width: 100, datatype: 'text'     , itemCd: 'CAP_NM'    , group: 'USER_ID_GRP' },
                    {caption: 'User Type'           , name: 'USER_TY'               , width: 100, datatype: 'lov'     },
                    {caption: 'Use ?'               , name: 'USE_YN'                , width: 70, datatype: 'checkbox'},
                    {caption: 'Start Date'          , name: 'VALID_PERIOD_STA_DT'   , width: 90, datatype: 'date'     , itemCd: 'CAP_STA_DT', group: 'VALID_PERIOD_DT_GRP'},
                    {caption: 'End Date'            , name: 'VALID_PERIOD_END_DT'   , width: 90, datatype: 'date'     , itemCd: 'CAP_END_DT', group: 'VALID_PERIOD_DT_GRP'},
                    {caption: 'Password'            , name: 'PASSWD'                , width: 90, datatype: 'password'},
                    {caption: 'Password Expire Date', name: 'PASSWD_EXPIRE_DT'      , width: 110, datatype: 'date' },
//                  {caption: 'Employee No'         , name: 'EMP_NO'                , width: 150, datatype: 'text' },
                    {caption: 'Employee No'         , name: 'EMP_NO'                , width: 100, datatype: 'popup' , group: 'EMP_GRP'},
                    {caption: 'Employee Nm'         , name: 'EMP_NM'                , width: 100, datatype: 'text'  , group: 'EMP_GRP', readonly: true},
                    {caption: 'SSO 사용'              , name: 'SSO_YN'                , width: 80, datatype: 'checkbox',  isMultiLanguage: false},
                    {caption: 'https 사용'            , name: 'OUTSIDE_ACCESS_YN'     , width: 80, datatype: 'checkbox',  isMultiLanguage: false},
                    {caption: '번호'                  , name: 'SUPPLIER_CD'           , width: 100, datatype: 'popup'  , group: 'SUPPLIER_GRP', isMultiLanguage: false},
                    {caption: '공급사명'                , name: 'SUPPLIER_NM'           , width: 100, datatype: 'text'  , group: 'SUPPLIER_GRP', readonly: true, isMultiLanguage: false},
                    {caption: '번호'                  , name: 'CUST_CD'               , width: 100, datatype: 'popup'  , group: 'CUST_GRP', isMultiLanguage: false},
                    {caption: '고객명'                 , name: 'CUST_NM'               , width: 100, datatype: 'text'  , group: 'CUST_GRP', readonly: true, isMultiLanguage: false},
                    {caption: '로그인 이후 초기 화면'     , name: 'DEF_PGM_ID'           , width: 'auto', datatype: 'popup', isMultiLanguage: false}, 
                    {caption: 'ODS Interface'       , name: 'DEF_MNU_ID'            , width: 150, datatype: 'text', isMultiLanguage: false, readonly: true}, 
                    {caption: '비밀번호'                , name: 'PASSWD_CHANGE'         , width: 80, datatype: 'text', isMultiLanguage: false}, 
                    {caption: '실패횟수'                , name: 'FAILURE_CNT'           , width: 10, datatype: 'number', hidden:true},
                    {caption: 'CSR NO'                , name: 'CSR_NO'           , width: 10, datatype: 'text', hidden:true},
                    {caption: 'CSR REMARK'            , name: 'CSR_REMARK'       , width: 10, datatype: 'text', hidden:true},
                    {caption: 'CSR START DT'          , name: 'CSR_START_DT'     , width: 10, datatype: 'text', hidden:true},
                    {caption: 'EDIT MODE'             , name: 'EDIT_MODE'        , width: 10, datatype: 'text', hidden:true},
                    
                    ];
        fc_addDataInGettedLov ( 'USER_TY', {code: 'USER_TY', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: gridId+'.USER_TY', code: 'USER_TY', format: 'V', nullable: false, defval: ''} );
        fc_addDataInSettingLov( {object:         'USER_TY', code: 'USER_TY', format: 'V', nullable: true , defval: ''} );
        fc_addCodeList  ( {object: gridId+'.EMP_NO', code: 'EMP_LIST', title: '사원정보', manKey: '' , setConditon:[{object:'INPUT_VAL1',colNm:'EMP_NO'},{object:'INPUT_VAL2',colNm:'EMP_NM'}]}, { itemCd: 'CAP_EMP_INFO', itemValue: 0 } );

        fc_setKeysInCol    ( gridId, [ 'USER_ID' ] );
//      fc_setUpperInCol   ( gridId, [ 'USER_ID' ] );
        fc_setAlignInCol   ( gridId, [ 'EMP_NO','EMP_NM' ], 'center' );
        fc_setRequiredInCol( gridId, [ 'USER_NM','USER_TY' ] );
        fc_setHiddenInCol  ( gridId, [ 'PASSWD','FAILURE_CNT'] );
        
        fc_addCodeList  ( {object: gridId+'.SUPPLIER_CD', code: 'MD_SUPPLIER_CD', title: '공급사정보'    , manKey: '' }, { itemCd: 'CAP_SCR_INFO', itemValue: 0 } );
        fc_addCodeList  ( {object: gridId+'.CUST_CD'    , code: 'MD_CUST_CD'    , title: '고객정보' , manKey: '' }, { itemCd: 'CAP_SCR_INFO', itemValue: 0 } );
        
        fc_addCodeList  ( {object: gridId+'.DEF_PGM_ID', code: 'SCREEN_CD_LIST', title: '화면 List', manKey: '' }, { itemCd: 'CAP_SCR_INFO', itemValue: 0 } );
        break;
        
    case 'USER_SHORT_INFO': // SCOC0070
        gridId = 'gridUser';
        if ( caption_flag ) {
            sCaption = 'User Information';
            sItemCd  = 'CAP_USER_INFO';
        };
        objItems =  [
                    {caption: 'User ID'  , name: 'USER_ID', width: 200, datatype: 'text' },
                    {caption: 'User Name', name: 'USER_NM', width:'auto', datatype: 'text'},
                    {caption: 'Use ?'    , name: 'USE_YN' , width:  60, datatype: 'checkbox'}
                    ];
        fc_setKeysInCol    ( gridId, [ 'USER_ID' ] );
        fc_setUpperInCol   ( gridId, [ 'USER_ID' ] );
        fc_setRequiredInCol( gridId, [ 'USER_ID' ] );
        break;
        
    case 'DEPT_SHORT_INFO': // SCOC0075
        gridId = 'gridDept';
        if ( caption_flag ) {
            sCaption = 'Dept Information';
            sItemCd  = 'CAP_DEPT_INFO';
        };
        objItems =  [
                    {caption: '부서코드'  , name: 'DEPT_CD', width: 200, datatype: 'text', isMultiLanguage: false},
                    {caption: '부서명', name: 'DEPT_NM', width:'auto', datatype: 'text', isMultiLanguage: false},
                    {caption: '직계명', name: 'LINE_NM', width:'auto', datatype: 'text', isMultiLanguage: false},
                    {caption: '직책명', name: 'DUTY_NM', width:'auto', datatype: 'text', isMultiLanguage: false},
                    ];
        fc_setKeysInCol    ( gridId, [ 'DEPT_CD' ] );
        fc_setUpperInCol   ( gridId, [ 'DEPT_CD' ] );
        fc_setRequiredInCol( gridId, [ 'DEPT_CD' ] );
        break;

    case 'EMP_INFO': // SCOD0020
        gridId = 'gridEmp';
        if ( caption_flag ) {
            sCaption = 'Employee Information';
            sItemCd  = 'CAP_EMP_INFO';
        };
        objItems =  [
//                    {caption: 'Plant Cd'      , name: 'PLANT_CD'          , width: 100, datatype: 'text', hidden: true },
                    {caption: '사원ID'            , name: 'EMP_ID'            , width: 100        , datatype: 'text', hidden: true },
                    {caption: '사번'              , name: 'EMP_NO'            , width: 80         , datatype: 'text', frozen: true },
                    {caption: 'Emplyee Name'    , name: 'EMP_NM'            , width: 80         , datatype: 'text', frozen: true },
                    {caption: 'E-Mail'          , name: 'EMAIL'             , width:'auto'      , datatype: 'text'},
                    {caption: 'Department'      , name: 'DEPT_CD'           , width: 80         , datatype: 'text'},
                    {caption: '전화번호'        , name: 'TEL_NO2'           , width: 125        , datatype: 'text', itemCd: 'TEL_NO'}, 
                    
                    {caption: '직책'              , name: 'DUTY_NAME'         , width:'auto'      , datatype: 'text'},                                         
                    {caption: '사업장'             , name: 'OFFICE_NAME'       , width: 100        , datatype: 'text'},     
                    {caption: '직급호칭'            , name: 'JIK_NAME'          , width: 80         , datatype: 'text'},     
                    {caption: '직급'              , name: 'POS_GRD_NM'        , width: 80         , datatype: 'text', itemCd: 'POSITION_CD'},     
                    {caption: '재직구분'            , name: 'HT_CODE'           , width: 80         , datatype: 'text'},     
                    {caption: '성별(M/F)'         , name: 'SEX'               , width: 80         , datatype: 'text', itemCd: 'GENDER_CD'},      
                    {caption: '입사일'         , name: 'HIRE_YMD'          , width: 100        , datatype: 'date'},                       
                    {caption: '교대형태'            , name: 'JTYPE_CODE_NAME'   , width: 80         , datatype: 'text'},                     
                    {caption: '코스트센터'           , name: 'COST_CD'           , width: 100        , datatype: 'text'},                     
                    {caption: '직계'              , name: 'LINE_NM'           , width: 80         , datatype: 'text'},     
                    {caption: '사진파일명'       , name: 'FILE_ID'           , width: 'auto'     , datatype: 'text', itemCd: 'IMG_FILE_ID'},       
                    ];
        //fc_addDataInGettedLov ( 'DEPT_CD'    , {code: 'DEPT_CD'    , tags: '', alias: ''} );
        //fc_addDataInGettedLov ( 'POSITION_CD', {code: 'POSITION_CD', tags: '', alias: ''} );
        //fc_addDataInSettingLov( {object: gridId+'.DEPT_CD'    , code: 'DEPT_CD'    , format: 'V', nullable: true, defval: ''} );
        //fc_addDataInSettingLov( {object: gridId+'.POSITION_CD', code: 'POSITION_CD', format: 'V', nullable: true, defval: ''} );

        //fc_addDataInGettedLov ( 'PLANT_CD', {code: 'PLANT_CD', tags: '', alias: ''} );
        //fc_addDataInSettingLov( {object: 'PLANT_CD'         , code: 'PLANT_CD', format: 'V', nullable: false, defval: ''} );
        //fc_addDataInSettingLov( {object: gridId+'.PLANT_CD' , code: 'PLANT_CD', format: 'V', nullable: false, defval: ''} );

        fc_setKeysInCol    ( gridId, [ 'EMP_NO' ] );
        fc_setUpperInCol   ( gridId, [ 'EMP_NO' ] );
        fc_setAlignInCol   ( gridId, [ 'EMP_NO','EMP_NM','DEPT_CD','TEL_NO2','HT_CODE','SEX','HIRE_YMD','COST_CD'], 'center' );
        fc_setRequiredInCol( gridId, [ 'EMP_NM', 'EMP_NO' ] );
        break;
    case 'SCREEN_INFO': // SCOC0010
        gridId = 'gridScreen';
        if ( caption_flag ) {
            sCaption = 'Screen Information';
            sItemCd  = 'CAP_SCR_INFO';
        };
        objGrpItems =   [
                        {caption: 'Screen Function', name: 'SCR_BUTTON_GRP' , align: 'center', itemCd: 'CAP_SCR_FUNC'},
                        {caption: 'Custom Function', name: 'CUST_BUTTON_GRP', align: 'center', itemCd: 'CAP_CUST_FUNC'}
                        ];
        objItems =  [
                    {caption: 'Screen ID'   , name: 'SCR_ID'      , width:100, datatype: 'text'    , frozen: true },
                    {caption: 'Screen Name' , name: 'SCR_NM'      , width:250, datatype: 'text'   },
                    {caption: 'Biz Chain'   , name: 'BIZ_CHAIN_CD', width:120, datatype: 'lov'    },
                    {caption: 'Type'        , name: 'SCR_TY'      , width: 80, datatype: 'lov'     , itemCd: 'CAP_TY'},
                    {caption: 'Search'      , name: 'SEARCH_YN'   , width: 80, datatype: 'checkbox', itemCd: 'CAP_SEARCH', group: 'SCR_BUTTON_GRP'},
                    {caption: 'Save'        , name: 'SAVE_YN'     , width: 80, datatype: 'checkbox', itemCd: 'CAP_SAVE'  , group: 'SCR_BUTTON_GRP'},
                    {caption: 'Delete'      , name: 'DELETE_YN'   , width: 80, datatype: 'checkbox', itemCd: 'CAP_DELETE', group: 'SCR_BUTTON_GRP'},
                    {caption: 'Confirm'     , name: 'CONF_YN'     , width: 80, datatype: 'checkbox', itemCd: 'CAP_CONF'  , group: 'SCR_BUTTON_GRP'},
                    {caption: 'Button1'     , name: 'CUST1_YN'    , width: 80, datatype: 'checkbox', itemCd: 'CAP_BTN1'  , group: 'CUST_BUTTON_GRP'},
                    {caption: 'Name1'       , name: 'CUST1_NM'    , width:120, datatype: 'text'    , itemCd: 'CAP_NM1'   , group: 'CUST_BUTTON_GRP'},
                    {caption: 'Button2'     , name: 'CUST2_YN'    , width: 80, datatype: 'checkbox', itemCd: 'CAP_BTN2'  , group: 'CUST_BUTTON_GRP'},
                    {caption: 'Name2'       , name: 'CUST2_NM'    , width:120, datatype: 'text'    , itemCd: 'CAP_NM2'   , group: 'CUST_BUTTON_GRP'},
                    {caption: 'Button3'     , name: 'CUST3_YN'    , width: 80, datatype: 'checkbox', itemCd: 'CAP_BTN3'  , group: 'CUST_BUTTON_GRP'},
                    {caption: 'Name3'       , name: 'CUST3_NM'    , width:120, datatype: 'text'    , itemCd: 'CAP_NM3'   , group: 'CUST_BUTTON_GRP'},
                    {caption: 'Button4'     , name: 'CUST4_YN'    , width: 80, datatype: 'checkbox', itemCd: 'CAP_BTN4'  , group: 'CUST_BUTTON_GRP'},
                    {caption: 'Name4'       , name: 'CUST4_NM'    , width:120, datatype: 'text'    , itemCd: 'CAP_NM4'   , group: 'CUST_BUTTON_GRP'},
                    {caption: 'Button5'     , name: 'CUST5_YN'    , width: 80, datatype: 'checkbox', itemCd: 'CAP_BTN5'  , group: 'CUST_BUTTON_GRP'},
                    {caption: 'Name5'       , name: 'CUST5_NM'    , width:120, datatype: 'text'    , itemCd: 'CAP_NM5'   , group: 'CUST_BUTTON_GRP'},
                    {caption: 'Button6'     , name: 'CUST6_YN'    , width: 80, datatype: 'checkbox', itemCd: 'CAP_BTN6'  , group: 'CUST_BUTTON_GRP'},
                    {caption: 'Name6'       , name: 'CUST6_NM'    , width:120, datatype: 'text'    , itemCd: 'CAP_NM6'   , group: 'CUST_BUTTON_GRP'},
                    {caption: 'Button7'     , name: 'CUST7_YN'    , width: 80, datatype: 'checkbox', itemCd: 'CAP_BTN7'  , group: 'CUST_BUTTON_GRP'},
                    {caption: 'Name7'       , name: 'CUST7_NM'    , width:120, datatype: 'text'    , itemCd: 'CAP_NM7'   , group: 'CUST_BUTTON_GRP'},
                    {caption: 'Button8'     , name: 'CUST8_YN'    , width: 80, datatype: 'checkbox', itemCd: 'CAP_BTN8'  , group: 'CUST_BUTTON_GRP'},
                    {caption: 'Name8'       , name: 'CUST8_NM'    , width:120, datatype: 'text'    , itemCd: 'CAP_NM8'   , group: 'CUST_BUTTON_GRP'},
                    {caption: 'Button9'     , name: 'CUST9_YN'    , width: 80, datatype: 'checkbox', itemCd: 'CAP_BTN9'  , group: 'CUST_BUTTON_GRP'},
                    {caption: 'Name9'       , name: 'CUST9_NM'    , width:120, datatype: 'text'    , itemCd: 'CAP_NM9'   , group: 'CUST_BUTTON_GRP'},
                    {caption: 'Button10'    , name: 'CUST10_YN'   , width: 80, datatype: 'checkbox', itemCd: 'CAP_BTN10'  , group: 'CUST_BUTTON_GRP'},
                    {caption: 'Name10'      , name: 'CUST10_NM'   , width:120, datatype: 'text'    , itemCd: 'CAP_NM10'   , group: 'CUST_BUTTON_GRP'},
                    {caption: 'Use?'        , name: 'USE_YN'      , width: 80, datatype: 'checkbox' },
                    {caption: 'Context Path', name: 'CONTEXT_PATH', width:120, datatype: 'text'     },
                    {caption: 'Remarks'     , name: 'REMARKS'     , width:200, datatype: 'text'     }
                    ];
        fc_addDataInGettedLov ( 'BIZ_CHAIN_CD', {code: 'BIZ_CHAIN_CD', tags: '', alias: ''} );
        fc_addDataInGettedLov ( 'SCR_TY'      , {code: 'SCR_TY'      , tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: 'BIZ_CHAIN_CD'        , code: 'BIZ_CHAIN_CD', format: 'V', nullable: true , defval: ''} );
        fc_addDataInSettingLov( {object: gridId+'.BIZ_CHAIN_CD', code: 'BIZ_CHAIN_CD', format: 'V', nullable: false, defval: ''} );
        fc_addDataInSettingLov( {object: gridId+'.SCR_TY'      , code: 'SCR_TY'      , format: 'V', nullable: false, defval: ''} );

        fc_setKeysInCol    ( gridId, [ 'SCR_ID' ] );
        fc_setAlignInCol   ( gridId, [ 'SCR_ID','BIZ_CHAIN_CD','SCR_TY','CONTEXT_PATH' ], 'center' );
    //  fc_setUpperInCol   ( gridId, [ 'SCR_ID','CUST1_NM','CUST2_NM','CUST3_NM','CUST4_NM','CUST5_NM','CUST6_NM','CUST7_NM','CUST8_NM','CUST9_NM','CUST10_NM','CONTEXT_PATH' ] );
        fc_setUpperInCol   ( gridId, [ 'SCR_ID','CONTEXT_PATH' ] );
        fc_setRequiredInCol( gridId, [ 'SCR_NM','BIZ_CHAIN_CD','SCR_TY' ] );
        break;
    case 'ROLE_INFO': // SCOC0060, SCOC0080
        gridId = 'gridRole';
        if ( caption_flag ) {
            sCaption = 'Role Information';
            sItemCd  = 'CAP_ROLE_INFO';
        };
        objItems =  [
                    {caption: 'Role Code', name: 'ROLE_CD', width: 300, datatype: 'text', maxlength: 15, frozen: true },
                    {caption: 'Role Name', name: 'ROLE_NM', width: 'auto', datatype: 'text'}
                    ];
        if ( fc_isNull( sSubKey ) ) {
            objItems.push( {caption: 'Use ?'  , name: 'USE_YN' , width: 100 , datatype: 'checkbox'} );
            objItems.push( {caption: 'Remarks', name: 'REMARKS', width: 'auto', datatype: 'text'} );
        };
        fc_setKeysInCol    ( gridId, [ 'ROLE_CD' ] );
        fc_setUpperInCol   ( gridId, [ 'ROLE_CD' ] );
        fc_setRequiredInCol( gridId, [ 'ROLE_CD','ROLE_NM' ] );
        break;
    case 'ROLE_SHORT_INFO': // SCOC0050
        gridId = 'gridRole';
        if ( caption_flag ) {
            sCaption = 'Role Information';
            sItemCd  = 'CAP_ROLE_INFO';
        };
        objItems =  [
                    {caption: 'Role Code', name: 'ROLE_CD', width: 150, datatype: 'text' , frozen: true },
                    {caption: 'Role Name', name: 'ROLE_NM', width: 'auto', datatype: 'text'},
                    {caption: 'Use ?'    , name: 'USE_YN' , width:  60, datatype: 'checkbox'}
                    ];
        fc_setKeysInCol    ( gridId, [ 'ROLE_CD' ] );
        fc_setUpperInCol   ( gridId, [ 'ROLE_CD' ] );
        fc_setRequiredInCol( gridId, [ 'ROLE_CD' ] );
        break;
    case 'MAP_INFO': // SCOC0070, SCOC0080
        gridId = 'gridMap';
        if ( caption_flag ) {
            if ( sSubKey == 'USER' ) {
                sCaption = 'Mapped User Information';
                sItemCd  = 'CAP_MAP_USER_INFO';
            } else if(sSubKey == 'DEPT') {
                sCaption = 'Mapped User Information';
                sItemCd  = 'CAP_MAP_USER_INFO';
            } else{
                sCaption = 'Mapped Role Information';
                sItemCd  = 'CAP_MAP_ROLE_INFO';
            };
        };
        objGrpItems =   [
                        {caption: 'Validate Date', name: 'VALID_PERIOD_DT_GRP', align: 'center', itemCd: 'CAP_VALID'}
                        ];
        objItems =  [
                    {caption: 'Start Date', name: 'VALID_PERIOD_STA_DT', width: 120, datatype: 'date', itemCd: 'CAP_STA_DT', group: 'VALID_PERIOD_DT_GRP'},
                    {caption: 'End Date'  , name: 'VALID_PERIOD_END_DT', width: 120, datatype: 'date', itemCd: 'CAP_END_DT', group: 'VALID_PERIOD_DT_GRP'},
                    ];
        if ( sSubKey == 'USER' ) {
            objItems.unshift( {caption: 'User Name', name: 'USER_NM', width:'auto', datatype: 'text' , frozen: true } );
            objItems.unshift( {caption: 'User ID'  , name: 'USER_ID', width: 200, datatype: 'popup', frozen: true } );

            fc_setKeysInCol    ( gridId, [ 'USER_ID' ] );
            fc_setUpperInCol   ( gridId, [ 'USER_ID' ] );
            fc_setRequiredInCol( gridId, [ 'USER_NM','VALID_PERIOD_STA_DT','VALID_PERIOD_END_DT' ] );
            fc_setEditInCol    ( gridId, [ 'USER_NM' ], false );
            fc_addCodeList     ( {object: gridId+'.USER_ID', code: 'USER_LIST', title: 'User List', manKey: gridId }, { itemCd: 'CAP_USER_INFO', itemValue: 0 } );
        } else if(sSubKey == 'DEPT') {
            objItems.unshift( {caption: '부서명', name: 'DEPT_NM', width:'auto', datatype: 'text' , frozen: true , isMultiLanguage: false} );
            objItems.unshift( {caption: '부서코드', name: 'DEPT_CD', width: 200, datatype: 'popup', frozen: true , isMultiLanguage: false} );

            fc_setKeysInCol    ( gridId, [ 'DEPT_CD' ] );
            fc_setUpperInCol   ( gridId, [ 'DEPT_CD' ] );
            fc_setRequiredInCol( gridId, [ 'DEPT_NM','VALID_PERIOD_STA_DT','VALID_PERIOD_END_DT' ] );
            fc_setEditInCol    ( gridId, [ 'DEPT_NM' ], false );
            fc_addCodeList     ( {object: gridId+'.DEPT_CD', code: 'DEPT_NM_LIST', title: 'Dept List', manKey: gridId }, { itemCd: 'CAP_DEPT_INFO', itemValue: 0 } );
        } else{
            objItems.unshift( {caption: 'Role Name', name: 'ROLE_NM', width:'auto', datatype: 'text' , frozen: true } );
            objItems.unshift( {caption: 'Role Code', name: 'ROLE_CD', width: 200, datatype: 'popup', frozen: true } );

            fc_setKeysInCol    ( gridId, [ 'ROLE_CD' ] );
            fc_setUpperInCol   ( gridId, [ 'ROLE_CD' ] );
            fc_setRequiredInCol( gridId, [ 'ROLE_NM','VALID_PERIOD_STR_DT','VALID_PERIOD_END_DT' ] );
            fc_setEditInCol    ( gridId, [ 'ROLE_NM' ], false );
            fc_addCodeList     ( {object: gridId+'.ROLE_CD', code: 'ROLE_LIST', title: 'Role List', manKey: gridId }, { itemCd: 'CAP_ROLE_INFO', itemValue: 0 } );
        };
        break;

    case 'GLOSSARY_INFO': // SCOA0010
        gridId = 'gridGlossary';
        if ( caption_flag ) {
            sCaption = 'Glossary Information';
            sItemCd  = 'CAP_GLOSSARY_INFO';
        };
        objItems =  [
                    {caption: 'Glossary'     , name: 'GLOSSARY_CD', width: 150, datatype: 'text' , itemCd: 'CAP_GLOSSARY', frozen: true },
                    {caption: 'Abbr'         , name: 'ABBR_CD'    , width: 100, datatype: 'text'},
                    {caption: 'Glossary Name', name: 'GLOSSARY_NM', width: 250, datatype: 'text'},
                    {caption: 'Contents(Kor)', name: 'GLOSSARY_KR', width: 250, datatype: 'text' , itemCd: 'CAP_CONTENTS_KR'},
                    {caption: 'Contents(Zh)' , name: 'GLOSSARY_ZH', width: 250, datatype: 'text' , itemCd: 'CAP_CONTENTS_ZH'},
                    {caption: 'Remarks'      , name: 'REMARKS'    , width: 350, datatype: 'text'}
                    ];
        fc_setKeysInCol    ( gridId, [ 'GLOSSARY_CD' ] );
        fc_setUpperInCol   ( gridId, [ 'GLOSSARY_CD' ] );
        fc_setRequiredInCol( gridId, [ 'GLOSSARY_CD','GLOSSARY_NM' ] );
        
        break;
    case 'ITEM_INFO': // SCOA0020, SCOE0010
        gridId = 'gridItem';
        if ( caption_flag ) {
            sCaption = 'Item Information';
            sItemCd  = 'CAP_ITEM_INFO';
        };
        objGrpItems =   [
                        {caption: 'Item'  , name: 'ITEM_CD_GRP', align: 'center', itemCd: 'CAP_ITEM'},
                        {caption: 'Data'  , name: 'DATA_TY_GRP', align: 'center', itemCd: 'CAP_DATA'},
                        {caption: 'Parent', name: 'PARENT_GRP' , align: 'center', itemCd: 'CAP_PAR' }
                        ];
        objItems =  [
                    {caption: 'Type'   , name: 'ITEM_FL'    , width: 150, datatype: 'lov'    , group: 'ITEM_CD_GRP'},
                    {caption: 'Code'   , name: 'ITEM_CD'    , width: 250, datatype: 'text'   , group: 'ITEM_CD_GRP'},
                    {caption: 'Name'   , name: 'ITEM_NM'    , width: 300, datatype: 'text'   , group: 'ITEM_CD_GRP'},
                    {caption: 'Type'   , name: 'DATA_TY'    , width: 100, datatype: 'lov'    , group: 'DATA_TY_GRP' , itemCd: 'CAP_TY'  },
                    {caption: 'Length' , name: 'DATA_LTH'   , width:  60, datatype: 'integer', group: 'DATA_TY_GRP' , itemCd: 'CAP_LTH' },
                    {caption: 'Scale'  , name: 'DATA_SCALE' , width: 100, datatype: 'integer', group: 'DATA_TY_GRP'},
                    {caption: 'Code'   , name: 'MOM_ITEM_CD', width: 250, datatype: 'text'   , group: 'PARENT_GRP'  , itemCd: 'CAP_CODE'},
                    {caption: 'Seq'    , name: 'MOM_REF_VAL', width:  80, datatype: 'integer', group: 'PARENT_GRP'  , itemCd: 'CAP_SEQ' },
                    {caption: 'Remarks', name: 'REMARKS'    , width: 'auto', datatype: 'text'}
                    ];
        fc_addDataInGettedLov ( 'ITEM_FL', {code: 'ITEM_FL', tags: '', alias: ''} );
        fc_addDataInGettedLov ( 'DATA_TY', {code: 'DATA_TY', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: 'ITEM_FL'        , code: 'ITEM_FL', format: 'V', nullable: true, defval: ''} );
        fc_addDataInSettingLov( {object: gridId+'.ITEM_FL', code: 'ITEM_FL', format: 'V', nullable: true, defval: ''} );
        fc_addDataInSettingLov( {object: gridId+'.DATA_TY', code: 'DATA_TY', format: 'V', nullable: true, defval: ''} );

        fc_setKeysInCol    ( gridId, [ 'ITEM_CD' ] );
        fc_setUpperInCol   ( gridId, [ 'ITEM_CD' ] );
        fc_setAlignInCol   ( gridId, [ 'ITEM_FL','DATA_TY' ], 'center' );
        fc_setRequiredInCol( gridId, [ 'ITEM_CD','ITEM_NM','ITEM_FL','DATE_TY','DATA_LTH' ] );
        break;
    case 'MESSAGE_INFO': // SCOA0030, SCOE0040
        gridId = 'gridMessage';
        if ( caption_flag ) {
            sCaption = 'Message Information';
            sItemCd  = 'CAP_MSG_INFO';
        };
        objItems =  [
                    {caption: 'Message ID', name: 'MSG_ID' , width: 150, datatype: 'text', frozen: true, readonly: true },
                    {caption: 'Type'      , name: 'MSG_TY' , width: 150, datatype: 'lov' , itemCd: 'CAP_TY'  , frozen: true },
                    {caption: 'Message'   , name: 'MESSAGE', width: 'auto', datatype: 'text', itemCd: 'CAP_MSG'},
                    {caption: 'Remarks'   , name: 'REMARKS', width: 'auto', datatype: 'text'}
                    ];
        fc_addDataInGettedLov( 'MSG_TY', {code: 'MSG_TY', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: 'MSG_TY'        , code: 'MSG_TY', format: 'V', nullable: true, defval: ''} );
        fc_addDataInSettingLov( {object: gridId+'.MSG_TY', code: 'MSG_TY', format: 'V', nullable: true, defval: ''} );

        fc_setUpperInCol   ( gridId, [ 'MSG_ID' ] );
        fc_setAlignInCol   ( gridId, [ 'MSG_ID','MSG_TY' ], 'center' );
        fc_setRequiredInCol( gridId, [ 'MESSAGE','MSG_TY' ] );
        break;
    case 'ALARM_INFO': // SCOA0040
        gridId = 'gridAlarm';
        if ( caption_flag ) {
            sCaption = 'Alarm Information';
            sItemCd  = 'CAP_ALARM_INFO';
        };
        objGrpItems =   [
                            {caption: '구분'      , name: 'GRP_TYPE'      , align: 'center',isMultiLanguage: false }
                           ,{caption: '메시지기준'   , name: 'GRP_MSG'       , align: 'center',isMultiLanguage: false }
                           ,{caption: '수신기준'   , name: 'GRP_RECV'       , align: 'center',isMultiLanguage: false }
                           ,{caption: '처리기준'    , name: 'GRP_STD'       , align: 'center',isMultiLanguage: false }
                           ,{caption: '확인메시지'   , name: 'GRP_CONF'      , align: 'center',isMultiLanguage: false }
                        ];

        objItems =  [
                    {caption: '공장구분'                , name: 'PLANT_CD'              , width:  70, datatype: 'lov'       , align: 'center'   , isMultiLanguage: false, itemCd: 'PLANT_CD'        , frozen: true },
                    {caption: '업무구분'                , name: 'BIZ_CHAIN_CD'          , width:  80, datatype: 'lov'       , align: 'center'   , isMultiLanguage: false, itemCd: 'BIZ_CHAIN_CD'    , frozen: true },
                    {caption: '알람 ID'               , name: 'ALARM_ID'              , width:  90, datatype: 'text'      , align: 'center'   , isMultiLanguage: false, itemCd: 'ALARM_ID'        , readonly: true },
                    {caption: 'Description'         , name: 'ALARM_REMARKS'         , width: 130, datatype: 'text'      , align: 'left'     , isMultiLanguage: false, itemCd: 'ALARM_REMARKS'   },
                    {caption: '알람 용도'           , name: 'ALARM_USAGE'           , width:  80, datatype: 'lov'       , align: 'center'   , isMultiLanguage: false, itemCd: 'ALARM_USAGE'        , group: 'GRP_TYPE'},
                    {caption: '알람 유형'           , name: 'ALARM_TYPE'            , width: 100, datatype: 'lov'       , align: 'center'   , isMultiLanguage: false, itemCd: 'ALARM_TYPE'         , group: 'GRP_TYPE'},
                    {caption: '알람 메시지 ID'           , name: 'ALARM_MSG_ID'          , width: 100, datatype: 'popup'     , align: 'center'   , isMultiLanguage: false, itemCd: 'ALARM_MSG_ID'       , group: 'GRP_MSG'  , inputreadonly: true },
                    {caption: '알람 메시지 내용'           , name: 'ALARM_MSG_CONTENTS'    , width:'auto', datatype: 'text'    , align: 'left'     , isMultiLanguage: false, itemCd: 'ALARM_MSG_CONTENTS' , group: 'GRP_MSG'  , readonly: true },
                    {caption: '알람 수신자'              , name: 'ALARM_TO_USER'         , width: 180, datatype: 'custpopup' , align: 'left'     , isMultiLanguage: false, itemCd: 'ALARM_TO_USER'      , group: 'GRP_RECV' , inputreadonly: true },
                    {caption: 'SMS FL(User)'        , name: 'ALARM_SMS_FL'          , width: 100, datatype: 'text'      , align: 'left'     , isMultiLanguage: false, isMultiLanguage: false       , group: 'GRP_RECV' , hidden: true},
                    {caption: 'KAKAO FL(User)'      , name: 'ALARM_KAKAO_FL'        , width: 100, datatype: 'text'      , align: 'left'     , isMultiLanguage: false, isMultiLanguage: false       , group: 'GRP_RECV' , hidden: true},
                    {caption: 'Email FL(User)'      , name: 'ALARM_EMAIL_FL'        , width: 100, datatype: 'text'      , align: 'left'     , isMultiLanguage: false, isMultiLanguage: false       , group: 'GRP_RECV' , hidden: true},
                    {caption: '알람수신Role'            , name: 'ALARM_TO_ROLE'         , width: 100, datatype: 'custpopup' , align: 'left'     , hidden : true , isMultiLanguage: false, itemCd: 'ALARM_TO_ROLE'      , group: 'GRP_RECV' , inputreadonly: true },
                    {caption: 'Alarm To User(제외)'   , name: 'ALARM_TO_USER2'        , width: 100, datatype: 'text'      , align: 'left'     , isMultiLanguage: false       , group: 'GRP_RECV' , hidden: true },
                    {caption: 'SMS FL(Role)'        , name: 'ALARM_SMS_FL2'         , width: 100, datatype: 'text'      , align: 'left'     , isMultiLanguage: false       , group: 'GRP_RECV' , hidden: true},
                    {caption: 'Email FL(Role)'      , name: 'ALARM_EMAIL_FL2'       , width: 100, datatype: 'text'      , align: 'left'     , isMultiLanguage: false       , group: 'GRP_RECV' , hidden: true},
                    {caption: 'SMS FL(근무조확인)'       , name: 'ALARM_SMS_TIME_FL'     , width: 100, datatype: 'text'      , align: 'left'     , isMultiLanguage: false       , group: 'GRP_RECV' , hidden: true},
                    {caption: 'KAKAO FL(근무조확인)' , name: 'ALARM_KAKAO_TIME_FL'   , width: 100, datatype: 'text'      , align: 'left'     , isMultiLanguage: false       , group: 'GRP_RECV' , hidden: true},
                    {caption: 'KAKAO CL(일괄전송)'      , name: 'ALARM_KAKAO_TIME_CL'   , width: 100, datatype: 'text'      , align: 'left'     , isMultiLanguage: false       , group: 'GRP_RECV' , hidden: true},
                    {caption: '처리 유형'               , name: 'ALARM_ACTION_TYPE'     , width:  90, datatype: 'lov'       , align: 'center'   , isMultiLanguage: false, itemCd: 'ALARM_ACTION_TYPE'  , group: 'GRP_RECV'   },
                    {caption: '메일 제목'               , name: 'EMAIL_TITLE'           , width:  90, datatype: 'text'      , align: 'left'     , isMultiLanguage: false, group: 'GRP_RECV'},
                    {caption: '카카오 제목'               , name: 'KAKAO_TITLE'           , width:  90, datatype: 'text'      , align: 'left'     , isMultiLanguage: false, group: 'GRP_RECV'},
                    {caption: '화면링크ID'              , name: 'PAGE_LINK_ID'          , width:  80, datatype: 'popup'     , align: 'center'   , isMultiLanguage: false, itemCd: 'PAGE_LINK_ID'       , group: 'GRP_RECV' , inputreadonly: true, cellbeginedit: f_cellbeginedit},
                    {caption: '사용여부'                , name: 'ALARM_USE_YN'          , width:  70, datatype: 'checkbox'  , align: 'center'   , isMultiLanguage: false, itemCd: 'USE_YN'},
                    {caption: '현재확정여부'          , name: 'CONF_NOW'              , width: 100, datatype: 'checkbox'  , align: 'center'   , isMultiLanguage: false, itemCd: 'CONF_NOW'           , group: 'GRP_STD'},
                    {caption: '중요여부'                , name: 'ALARM_BLINK'           , width:  60, datatype: 'checkbox'  , align: 'center'   , isMultiLanguage: false, itemCd: 'ALARM_BLINK'        , group: 'GRP_STD'},
//                  {caption: '음성지원'                , name: 'ALARM_VOICE'           , width:  60, datatype: 'checkbox'  , align: 'center'   , isMultiLanguage: false, itemCd: 'ALARM_VOICE'        , group: 'GRP_STD'},
//                  {caption: '발생주기'                , name: 'ALARM_INVOKE_INTERVAL' , width:  80, datatype: 'number'    , align: 'right'    , isMultiLanguage: false, itemCd: 'ALARM_INVOKE_INTERVAL', group: 'GRP_STD', cellbeginedit: f_cellbeginedit, hidden: true},
                    {caption: '발생주기'                , name: 'ALARM_DETECT_INTERVAL' , width:  65, datatype: 'lov'       , align: 'center'   , isMultiLanguage: false, itemCd: 'ALARM_DETECT_INTERVAL', group: 'GRP_STD'},
                    {caption: '시간표시'                , name: 'DISP_ALARM_TM'         , width:  65, datatype: 'checkbox'  , align: 'center'   , isMultiLanguage: false, itemCd: 'CAP_DISP_ALARM_TM'  , group: 'GRP_STD'},
//                  {caption: '자동팝업닫힘'              , name: 'ALARM_AUTO_CLOSE'      , width:  80, datatype: 'checkbox'  , align: 'center'   , isMultiLanguage: false, itemCd: 'ALARM_AUTO_CLOSE'   , group: 'GRP_STD'},
//                  {caption: 'Alarm Auto Popup'        , name: 'ALARM_AUTO_POP'        , width:  80, datatype: 'checkbox'  , align: 'center'   , isMultiLanguage: false, itemCd: 'ALARM_AUTO_POP'     , group: 'GRP_STD'  , hidden: true},
                    ];
        fc_addDataInGettedLov ( 'PLANT_CD', {code: 'PLANT_CD', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: 'PLANT_CD'         , code: 'PLANT_CD', format: 'V', nullable: false, defval: ''} );
        fc_addDataInSettingLov( {object: gridId+'.PLANT_CD' , code: 'PLANT_CD', format: 'V', nullable: false, defval: ''} );
        fc_addDataInGettedLov ( 'BIZ_CHAIN_CD', {code: 'BIZ_CHAIN_CD', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: 'BIZ_CHAIN_CD'        , code: 'BIZ_CHAIN_CD', format: 'V', nullable: true, defval: ''} );
        fc_addDataInSettingLov( {object: gridId+'.BIZ_CHAIN_CD', code: 'BIZ_CHAIN_CD', format: 'V', nullable: false, defval: ''} );
        fc_addDataInGettedLov ( 'ALARM_USAGE', {code: 'ALARM_USAGE', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: gridId+'.ALARM_USAGE', code: 'ALARM_USAGE', format: 'V', nullable: false, defval: ''} );

        fc_addDataInGettedLov ( 'ALARM_TYPE', {code: 'ALARM_TYPE', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: 'ALARM_TYPE'        , code: 'ALARM_TYPE', format: 'V', nullable: true, defval: ''} );
        fc_addDataInSettingLov( {object: gridId+'.ALARM_TYPE', code: 'ALARM_TYPE', format: 'V', nullable: false, defval: ''} );

        fc_addDataInGettedLov ( 'ALARM_DETECT_INTERVAL', {code: 'ALARM_DETECT_INTERVAL', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: gridId+'.ALARM_DETECT_INTERVAL'        , code: 'ALARM_DETECT_INTERVAL', format: 'V', nullable: true, defval: ''} );

        fc_addDataInGettedLov ( 'ALARM_ACTION_TYPE', {code: 'ALARM_ACTION_TYPE', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: gridId+'.ALARM_ACTION_TYPE', code: 'ALARM_ACTION_TYPE', format: 'V', nullable: false, defval: ''} );

        fc_addCodeList  ( {object: gridId+'.ALARM_MSG_ID'   , code: 'MSG_LIST'          , title: 'Message List' , manKey: '' }, { itemCd: 'CAP_MSG_INFO'    , itemValue: 0 } );
        fc_addCodeList  ( {object: gridId+'.PAGE_LINK_ID'   , code: 'SCREEN_CD_LIST'    , title: 'Screen List'  , manKey: '' }, { itemCd: 'CAP_SCR_INFO'    , itemValue: 0 } );

        fc_setUpperInCol   ( gridId, [ 'ALARM_ID', 'ALARM_MSG_ID', 'CONF_MSG_PARAM1', 'CONF_MSG_PARAM2', 'CONF_MSG_PARAM3' ] );
        fc_setRequiredInCol( gridId, [ 'PLANT_CD', 'ALARM_USAGE', 'BIZ_CHAIN_CD', 'ALARM_MSG_ID', 'ALARM_TYPE', 'ALARM_MSG_CONTENTS' ] );
        break;
    case 'ALARM_GROUP': // SCOA0050
        gridId = 'gridAlarmGroup';
        if ( caption_flag ) {
            sCaption = 'Alarm Group Information';
            sItemCd  = 'CAP_ALARM_GROUP';
        };
        objItems =  [
                    {caption: 'Group Id'                , name: 'ALARM_GRP_ID'              , width: 110, datatype: 'text'          , align: 'center'   , isMultiLanguage: false, itemCd: 'ALARM_GRP_ID', readonly: true },
                    {caption: 'Group Name'              , name: 'ALARM_GRP_NM'              , width: 150, datatype: 'text'          , align: 'left'     , isMultiLanguage: false, itemCd: 'ALARM_GRP_NM', readonly: true },
                    ];
        break;
    case 'ALARM_USER': // SCOA0050
        gridId = 'gridAlarmUser';
        if ( caption_flag ) {
            sCaption = '사용자 정보';
            sItemCd  = '';
        };
        objItems =  [
                    {caption: 'Role Code'               , name: 'ROLE_CD'               , width: 100, datatype: 'text'          , align: 'center'   , isMultiLanguage: false, itemCd: 'ROLE_CD', readonly: true },
                    {caption: 'Role Name'               , name: 'ROLE_NM'               , width: 140, datatype: 'text'          , align: 'left'     , isMultiLanguage: false, itemCd: 'ROLE_NM', readonly: true },
                    {caption: 'Role Name'               , name: 'ROLE_NM2'              , width: 140, datatype: 'text'          , align: 'left'     , isMultiLanguage: false, itemCd: 'ROLE_NM', readonly: true },
                    ];
        break;
    case 'ALARM_USER_SELECT': // SCOA0050
        gridId = 'gridAlarmUserSelect';
        if ( caption_flag ) {
            sCaption = 'Alarm User Information';
            sItemCd  = 'CAP_ALARM_USER';
        };
        objGrpItems =   [
                            {caption: 'SMS'          , name: 'GRP_SMS'      , align: 'center',isMultiLanguage: false }
                           ,{caption: '알림톡(카카오)'  , name: 'GRP_KAKAO'      , align: 'center',isMultiLanguage: false }
                        ];

        objItems =  [
                    {caption: '역할코드'                , name: 'ROLE_CD'               , width: 100, datatype: 'text'          , align: 'center'   , isMultiLanguage: false, itemCd: 'ROLE_CD', readonly: true },
                    {caption: '역할명'                 , name: 'ROLE_NM'               , width: 140, datatype: 'text'          , align: 'left'     , isMultiLanguage: false, itemCd: 'ROLE_NM', readonly: true },
                    {caption: 'Alarm User Type'     , name: 'ALARM_USER_TYPE'       , width: 140, datatype: 'text'          , align: 'left'     , isMultiLanguage: false, itemCd: 'ALARM_USER_TYPE' , hidden: true },
                    {caption: '사용여부'                , name: 'ALARM_SMS_FL'          , width:  80, datatype: 'checkbox'      , align: 'left'     , group: 'GRP_SMS', isMultiLanguage: false  },
                    {caption: '24Hr'                , name: 'ALARM_SMS_TIME_FL'     , width:  80, datatype: 'checkbox'      , align: 'left'     , group: 'GRP_SMS', isMultiLanguage: false  },
                    {caption: '사용여부'                , name: 'ALARM_KAKAO_FL'        , width:  80, datatype: 'checkbox'      , align: 'left'     , group: 'GRP_KAKAO', isMultiLanguage: false    },
                    {caption: '24Hr'                , name: 'ALARM_KAKAO_TIME_FL'   , width:  80, datatype: 'checkbox'      , align: 'left'     , group: 'GRP_KAKAO', isMultiLanguage: false    },
                    {caption: '업무시간(일괄전송)'      , name: 'ALARM_KAKAO_TIME_CL'   , width:  120, datatype: 'checkbox'      , align: 'left'        , group: 'GRP_KAKAO', isMultiLanguage: false    },
                    {caption: 'Email'               , name: 'ALARM_EMAIL_FL'        , width:  80, datatype: 'checkbox'      , align: 'left'     , isMultiLanguage: false    },
                    ];
        break;

    case 'ALARM_USER_EXCEPT_SMS_EMAIL': // SCOA0050
        gridId = 'gridUserExceptSMSEmail';
        if ( caption_flag ) {
            sCaption = 'Alarm User Information';
            sItemCd  = 'CAP_ALARM_USER_EXCEPT_SMS_EMAIL';
        };
        objItems =  [
                    {caption: '역할코드'                , name: 'ROLE_CD'               , width: 100, datatype: 'text'          , align: 'center'   , isMultiLanguage: false, itemCd: 'ROLE_CD', readonly: true },
                    {caption: '역할명'                 , name: 'ROLE_NM'               , width: 150, datatype: 'text'          , align: 'left'     , isMultiLanguage: false, itemCd: 'ROLE_NM', readonly: true },
                    {caption: 'Alarm User Type'     , name: 'ALARM_USER_TYPE'       , width: 150, datatype: 'text'          , align: 'left'     , isMultiLanguage: false, itemCd: 'ALARM_USER_TYPE' , hidden: true },
                    {caption: 'SMS 제외'              , name: 'ALARM_SMS_FL2'         , width:  80, datatype: 'checkbox'      , align: 'left'     , isMultiLanguage: false    },
                    {caption: 'Email 제외'            , name: 'ALARM_EMAIL_FL2'       , width:  80, datatype: 'checkbox'      , align: 'left'     , isMultiLanguage: false    },
                    ];
        break;

    case 'ALARM_LOG': // SCOA0060
        gridId = 'gridAlarmLog';
        if ( caption_flag ) {
            sCaption = 'Alarm Log';
            sItemCd  = 'CAP_ALARM_LOG';
        };
        objItems =  [
                        {caption: '알람 유형'           , name: 'ALARM_TYPE'            , width: 90, datatype: 'lov'        , align: 'center'   , isMultiLanguage: false, itemCd: 'ALARM_TYPE'          },
                        {caption: '업무구분'            , name: 'BIZ_CHAIN_CD'          , width: 80, datatype: 'lov'        , align: 'center'   , isMultiLanguage: false, itemCd: 'BIZ_CHAIN_CD'        },
                        {caption: '알람 로그 ID'        , name: 'ALARM_LOG_ID'          , width: 170, datatype: 'text'      , align: 'center'   , isMultiLanguage: false, itemCd: 'ALARM_LOG_ID'        , readonly: true },
                        {caption: '알람 ID'           , name: 'ALARM_ID'              , width: 90, datatype: 'text'       , align: 'center'   , isMultiLanguage: false, itemCd: 'ALARM_ID'            , readonly: true },
                        {caption: '알람 메시지 ID'       , name: 'ALARM_MSG_ID'          , width: 90, datatype: 'text'       , align: 'center'   , isMultiLanguage: false, itemCd: 'ALARM_MSG_ID'        },
                        {caption: '알람 메시지'          , name: 'ALARM_MSG_CONTENTS'    , width: 'auto', datatype: 'text'   , align: 'left'     , isMultiLanguage: false, itemCd: 'ALARM_MSG_CONTENTS'  , readonly: true },
                        {caption: 'E-Mail'          , name: 'EMAIL_SEND_YN'         , width: 58, datatype: 'text'   , align: 'center'       , isMultiLanguage: false, itemCd: 'EMAIL_SEND_YN'   , readonly: true },
                        {caption: 'SMS'             , name: 'SMS_SEND_YN'           , width: 58, datatype: 'text'   , align: 'center'       , isMultiLanguage: false, itemCd: 'SMS_SEND_YN' , readonly: true },
                        {caption: 'KAKAO'           , name: 'KAKAO_SEND_YN'         , width: 58, datatype: 'text'   , align: 'center'       , isMultiLanguage: false, itemCd: 'KAKAO_SEND_YN'   , readonly: true },
                        /*{caption: 'Attr1~5(%)'        , name: 'ALARM_MSG_ATTRS'       , width: 200, datatype: 'text'      , align: 'left'     , isMultiLanguage: false, itemCd: 'ALARM_MSG_CONTENTS'  , readonly: true },*/
                        {caption: '알람 시간'           , name: 'ALARM_DTM'             , width: 140, datatype: 'datetime'  , align: 'center'   , isMultiLanguage: false, itemCd: 'ALARM_DTM'           },
                        {caption: '확인 시간'           , name: 'CONF_DTM'              , width: 140, datatype: 'datetime'  , align: 'center'   , isMultiLanguage: false, itemCd: 'CONF_DTM'            },
                        ];
            fc_addDataInGettedLov ( 'PLANT_CD', {code: 'PLANT_CD', tags: '', alias: ''} );
            fc_addDataInSettingLov( {object: 'PLANT_CD'         , code: 'PLANT_CD', format: 'V', nullable: false, defval: ''} );

            fc_addDataInGettedLov ( 'BIZ_CHAIN_CD', {code: 'BIZ_CHAIN_CD', tags: '', alias: ''} );
            fc_addDataInSettingLov( {object: gridId+'.BIZ_CHAIN_CD', code: 'BIZ_CHAIN_CD', format: 'V', nullable: false, defval: ''} );
            
            fc_addDataInGettedLov ( 'ALARM_TYPE', {code: 'ALARM_TYPE', tags: '', alias: ''} );
            fc_addDataInSettingLov( {object: 'ALARM_TYPE'        , code: 'ALARM_TYPE', format: 'V', nullable: true, defval: 'N'} );
            fc_addDataInSettingLov( {object: gridId+'.ALARM_TYPE', code: 'ALARM_TYPE', format: 'V', nullable: false, defval: ''} );

            fc_addDataInGettedLov ( 'USE_YN', {code: 'USE_YN', tags: '', alias: ''} );
            fc_addDataInSettingLov( {object: 'CONF_YN'      , code: 'USE_YN', format: 'V', nullable: true, defval: ''} );

            fc_setUpperInCol   ( gridId, [ 'ALARM_ID', 'ALARM_MSG_ID' ] );
            break;
    case 'ALARM_LOG_USER': // SCOA0060
        gridId = 'gridAlarmLogUser';
        if ( caption_flag ) {
            sCaption = 'Alarm Log User';
            sItemCd  = 'CAP_ALARM_LOG_USER';
        };
        objItems =  [
                        {caption: 'Alarm To User'           , name: 'ALARM_TO_USER'         , width: 'auto', datatype: 'text'       , align: 'center'   , itemCd: 'ALARM_TO_USER'       }
                        ];
            break;
    case 'CODE_MASTER_INFO': // SCOB0010, SCOB0020, SCOB0030, SCOE0020
        gridId = 'gridCodeMaster';
        if ( caption_flag ) {
            sCaption = 'Code Master Information';
            sItemCd  = 'CAP_MASTER_INFO';
        };
        objItems =  [
                    {caption: 'Plant Code' , name: 'PLANT_CD'        , width: 100, datatype: 'lov'      , hidden:true,frozen: true, isMultiLanguage: false },
                    {caption: 'Biz Chain'  , name: 'BIZ_CHAIN_CD'    , width: 100, datatype: 'lov'      , frozen: true },
                    {caption: 'Master Code', name: 'MASTER_CD'       , width: 150, datatype: 'text'     , frozen: true },
                    {caption: 'Master Name', name: 'MASTER_NM'       , width: 200, datatype: 'text'    },
                    {caption: 'Description', name: 'MASTER_DESC'     , width: 200, datatype: 'text'     , itemCd: 'CAP_DESC'},
                    {caption: 'Length'     , name: 'CD_VALUE_LTH'    , width: 80, datatype: 'integer'  , itemCd: 'CAP_LTH'},
                    {caption: 'Use ?'      , name: 'USE_YN'          , width:  60, datatype: 'checkbox'},
                    {caption: 'Multi-lang?', name: 'USE_MULTILANG_YN', width:  60, datatype: 'checkbox', hidden:true},
                    {caption: 'Remarks'    , name: 'REMARKS'         , width: 250, datatype: 'text'},
                    {caption: 'ATTR1_NAME'    , name: 'ATTR1_NAME'         , width: 100, datatype: 'text'},
                    {caption: 'ATTR2_NAME'    , name: 'ATTR2_NAME'         , width: 100, datatype: 'text'},
                    {caption: 'ATTR3_NAME'    , name: 'ATTR3_NAME'         , width: 100, datatype: 'text'},
                    {caption: 'ATTR4_NAME'    , name: 'ATTR4_NAME'         , width: 100, datatype: 'text'},
                    {caption: 'ATTR5_NAME'    , name: 'ATTR5_NAME'         , width: 100, datatype: 'text'},
                    {caption: 'ATTR6_NAME'    , name: 'ATTR6_NAME'         , width: 100, datatype: 'text'},
                    {caption: 'ATTR7_NAME'    , name: 'ATTR7_NAME'         , width: 100, datatype: 'text'},
                    {caption: 'ATTR8_NAME'    , name: 'ATTR8_NAME'         , width: 100, datatype: 'text'},
                    {caption: 'ATTR9_NAME'    , name: 'ATTR9_NAME'         , width: 100, datatype: 'text'},
                    {caption: 'ATTR10_NAME'    , name: 'ATTR10_NAME'         , width: 100, datatype: 'text'},
                    {caption: 'ATTR11_NAME'    , name: 'ATTR11_NAME'         , width: 100, datatype: 'text'},
                    {caption: 'ATTR12_NAME'    , name: 'ATTR12_NAME'         , width: 100, datatype: 'text'},
                    {caption: 'ATTR13_NAME'    , name: 'ATTR13_NAME'         , width: 100, datatype: 'text'},
                    {caption: 'ATTR14_NAME'    , name: 'ATTR14_NAME'         , width: 100, datatype: 'text'},
                    {caption: 'ATTR15_NAME'    , name: 'ATTR15_NAME'         , width: 100, datatype: 'text'},
                    {caption: 'ATTR16_NAME'    , name: 'ATTR16_NAME'         , width: 100, datatype: 'text'},
                    {caption: 'ATTR17_NAME'    , name: 'ATTR17_NAME'         , width: 100, datatype: 'text'},
                    {caption: 'ATTR18_NAME'    , name: 'ATTR18_NAME'         , width: 100, datatype: 'text'},
                    {caption: 'ATTR19_NAME'    , name: 'ATTR19_NAME'         , width: 100, datatype: 'text'},
                    {caption: 'ATTR20_NAME'    , name: 'ATTR20_NAME'         , width: 100, datatype: 'text'},
                    ];
        if ( sSubKey == 'INQ' ) {
            for ( var i = 0; i < 4; i++ ) {
                objItems.pop();  // Description ~ Remarks
            };
        };
        fc_addDataInGettedLov ( 'PLANT_CD', {code: 'PLANT_CD', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: gridId+'.PLANT_CD', code: 'PLANT_CD', format: 'V', nullable: true, defval: ''} );
        fc_addDataInGettedLov ( 'BIZ_CHAIN_CD', {code: 'BIZ_CHAIN_CD', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: 'BIZ_CHAIN_CD'        , code: 'BIZ_CHAIN_CD', format: 'V', nullable: true, defval: ''} );
        fc_addDataInSettingLov( {object: gridId+'.BIZ_CHAIN_CD', code: 'BIZ_CHAIN_CD', format: 'V', nullable: true, defval: ''} );

        fc_setKeysInCol    ( gridId, [ 'MASTER_CD' ] );
        fc_setUpperInCol   ( gridId, [ 'MASTER_CD' ] );
        fc_setAlignInCol   ( gridId, [ 'PLANT_CD', 'BIZ_CHAIN_CD' ], 'center' );
        fc_setRequiredInCol( gridId, [ 'PLANT_CD', 'BIZ_CHAIN_CD','MASTER_NM','CD_VALUE_LTH' ] );
        break;
    case 'CODE_DETAIL_INFO': // SCOB0020, SCOB0030, SCOE0030
        gridId = 'gridCodeDetail';
        if ( caption_flag ) {
            sCaption = 'Code Detail Information';
            sItemCd  = 'CAP_CODE_INFO';
        };
        objGrpItems =   [
                        {caption: 'Attribute', name: 'ATTR', align: 'center' }
                        ];
        objItems =  [
                    {caption: 'Plant Code'  , name: 'PLANT_CD'  , width: 100, datatype: 'lov'      , frozen: true, isMultiLanguage: false , hidden: true},
                    {caption: 'Master Code' , name: 'MASTER_CD' , width: 150, datatype: 'text'     , frozen: true , hidden: true},
                    {caption: 'Code Value'  , name: 'CD_VAL'    , width: 100, datatype: 'text'     , frozen: true },
                    {caption: 'Code Name'   , name: 'CD_NM'     , width: 200, datatype: 'text'     , frozen: true },
                    {caption: 'Description' , name: 'CD_DESC'   , width: 200, datatype: 'text'     , itemCd: 'CAP_DESC'},
                    {caption: 'Seq.'        , name: 'DISP_SEQ'  , width:  60, datatype: 'integer'   , itemCd: 'CAP_SEQ'},
                    {caption: 'Tags'        , name: 'TAGS'      , width: 100, datatype: 'text'    },
                    {caption: 'Use'         , name: 'USE_YN'    , width:  50, datatype: 'checkbox'},
                    {caption: 'Attribute1'  , name: 'ATTR1'     , width: 100, datatype: 'text'     , group: 'ATTR'},
                    {caption: 'Attribute2'  , name: 'ATTR2'     , width: 100, datatype: 'text'     , group: 'ATTR'},
                    {caption: 'Attribute3'  , name: 'ATTR3'     , width: 100, datatype: 'text'     , group: 'ATTR'},
                    {caption: 'Attribute4'  , name: 'ATTR4'     , width: 100, datatype: 'text'     , group: 'ATTR'},
                    {caption: 'Attribute5'  , name: 'ATTR5'     , width: 100, datatype: 'text'     , group: 'ATTR'},
                    {caption: 'Attribute6'  , name: 'ATTR6'     , width: 100, datatype: 'text'     , group: 'ATTR'},
                    {caption: 'Attribute7'  , name: 'ATTR7'     , width: 100, datatype: 'text'     , group: 'ATTR'},
                    {caption: 'Attribute8'  , name: 'ATTR8'     , width: 100, datatype: 'text'     , group: 'ATTR'},
                    {caption: 'Attribute9'  , name: 'ATTR9'     , width: 100, datatype: 'text'     , group: 'ATTR'},
                    {caption: 'Attribute10' , name: 'ATTR10'    , width: 100, datatype: 'text'     , group: 'ATTR'},
                    {caption: 'Attribute11' , name: 'ATTR11'    , width: 100, datatype: 'text'     , group: 'ATTR'},
                    {caption: 'Attribute12' , name: 'ATTR12'    , width: 100, datatype: 'text'     , group: 'ATTR'},
                    {caption: 'Attribute13' , name: 'ATTR13'    , width: 100, datatype: 'text'     , group: 'ATTR'},
                    {caption: 'Attribute14' , name: 'ATTR14'    , width: 100, datatype: 'text'     , group: 'ATTR'},
                    {caption: 'Attribute15' , name: 'ATTR15'    , width: 100, datatype: 'text'     , group: 'ATTR'},
                    {caption: 'Attribute16' , name: 'ATTR16'    , width: 100, datatype: 'text'     , group: 'ATTR'},
                    {caption: 'Attribute17' , name: 'ATTR17'    , width: 100, datatype: 'text'     , group: 'ATTR'},
                    {caption: 'Attribute18' , name: 'ATTR18'    , width: 100, datatype: 'text'     , group: 'ATTR'},
                    {caption: 'Attribute19' , name: 'ATTR19'    , width: 100, datatype: 'text'     , group: 'ATTR'},
                    {caption: 'Attribute20' , name: 'ATTR20'    , width: 100, datatype: 'text'     , group: 'ATTR'},
                    {caption: 'ERP Code'    , name: 'ERP_CD'    , width: 100, datatype: 'text'    },
                    {caption: 'Remarks'      , name: 'REMARKS'  , width: 150, datatype: 'text'}
                    ];
        if ( sSubKey == 'MULTI' ) {
            for ( var i = 0; i < 25; i++ ) {
                objItems.pop();  // Seq. ~ Remarks
            };
            // 컬럼 변경이 잘되어지지 않아 화면에서 hidden 속성 변경
            //objItems.unshift( {caption: 'Master Code', name: 'MASTER_CD', width:200, datatype: 'text', frozen: true} );
            objItems.push   ( {caption: 'Ref Code'   , name: 'REF_CD'   , width:150, datatype: 'text', itemCd: 'CAP_REF_CD'} );
            fc_setHiddenInCol( gridId, [ 'REF_CD' ] );
        } else if ( sSubKey == 'INQ' ) {
            for ( var i = 0; i < 25; i++ ) {
                objItems.pop();  // Seq. ~ Remarks
            };
            objItems.unshift( {caption: 'Seq.', name: 'DISP_SEQ', width:70 , datatype: 'integer', frozen: true, itemCd: 'CAP_SEQ' } );
        };

        fc_addDataInGettedLov ( 'PLANT_CD', {code: 'PLANT_CD', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: gridId+'.PLANT_CD', code: 'PLANT_CD', format: 'V', nullable: true, defval: ''} );

        fc_setKeysInCol    ( gridId, [ 'CD_VAL' ] );
        fc_setUpperInCol   ( gridId, [ 'CD_VAL','TAGS' ] );
        fc_setAlignInCol   ( gridId, [ 'DISP_SEQ' ], 'center' );
        fc_setRequiredInCol( gridId, [ 'CD_NM','DISP_SEQ' ] );
        break;
    case 'QUERY_MASTER' : // SCOG0040
        gridId = 'gridQueryMaster';
        if ( caption_flag ) {
            sCaption = 'Query Master Information';
            sItemCd  = 'CAP_QUERY_MASTER_INFO';
        };
        objItems =  [
                    {caption: 'Query ID'          , name: 'QUERY_ID'    , width: 'auto', datatype: 'text'},
                    {caption: 'Query Type'        , name: 'QUERY_TYPE'  , width: 100, datatype: 'lov' },
                    {caption: 'Biz Chain'         , name: 'BIZ_CHAIN_CD', width: 100, datatype: 'lov' },
                    {caption: 'SQL Query Contents', name: 'QUERY_TEXT'  , width: 400, datatype: 'text'},
                    {caption: 'Remarks'           , name: 'REMARKS'     , width: 200, datatype: 'text'}
                    ];
        fc_addDataInGettedLov ( 'BIZ_CHAIN_CD', {code: 'BIZ_CHAIN_CD', tags: '', alias: ''} );
        fc_addDataInGettedLov ( 'QUERY_TY', {code: 'QUERY_TY', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: 'QUERY_TYPE'     , code: 'QUERY_TY', format: 'V', nullable: true , defval: ''} );
        fc_addDataInSettingLov( {object: 'QUERY_TYPE_CUR' , code: 'QUERY_TY', format: 'V', nullable: false, defval: ''} );
        fc_addDataInSettingLov( {object: gridId+'.QUERY_TYPE'  , code: 'QUERY_TY'    , format: 'V', nullable: false, defval: ''} );
        fc_addDataInSettingLov( {object: gridId+'.BIZ_CHAIN_CD', code: 'BIZ_CHAIN_CD', format: 'V', nullable: true , defval: ''} );
        fc_addDataInSettingLov( {object:         'BIZ_CHAIN_CD', code: 'BIZ_CHAIN_CD', format: 'V', nullable: true , defval: ''} );

        fc_setKeysInCol    ( gridId, [ 'QUERY_ID' ] );
        fc_setUpperInCol   ( gridId, [ 'QUERY_ID' ] );
        fc_setAlignInCol   ( gridId, [ 'QUERY_TYPE' ], 'center' );
        fc_setHiddenInCol  ( gridId, [ 'QUERY_TEXT','REMARKS' ] );
        fc_setRequiredInCol( gridId, [ 'BIZ_CHAIN_CD','QUERY_ID','QUERY_TYPE' ] );

        break;
    case 'MULTI_LANG_INFO': // SCOE0010, SCOE0020, SCOE0030, SCOE0040, SCOE0050, SCOE0060(hidden)
        gridId = 'gridMultiLang';
        if ( caption_flag ) {
            sCaption = 'Multi Langauge Information';
            sItemCd  = 'CAP_MULTI_LANG_INFO';
        };
        objItems =  [
                    {caption: 'Lang ID'     , name: 'LANG_ID'      , width: 100, datatype: 'text' , frozen: true },
                    {caption: 'Category'    , name: 'CATEGORY'     , width: 100, datatype: 'lov'  , frozen: true },
                    {caption: 'Language'    , name: 'LANG_CD'      , width: 100, datatype: 'lov'  , frozen: true  , itemCd: 'CAP_LANG'},
                    {caption: 'Contents'    , name: 'CONTENTS'     , width: 400, datatype: 'text'},
                    {caption: 'Alternative1', name: 'ALT_CONTENTS1', width: 200, datatype: 'text'},
                    {caption: 'Alternative2', name: 'ALT_CONTENTS2', width: 200, datatype: 'text'},
                    {caption: 'Alternative3', name: 'ALT_CONTENTS3', width: 200, datatype: 'text'},
                    ];
        if ( attribute1 == 'MSG' || attribute1 == 'MNU' ) {
            for ( var i = 0; i < 4; i++ ) {
                objItems.pop();  // Contents ~ Alternative3
            };
            objItems.push( {caption: 'Contents', name: 'CONTENTS', width: 800, datatype: 'text'} );
        };

        objItems.push( {caption: 'multi Mom ItemCode' , name: 'MOM_ITEM_CD', width: 200, datatype: 'text'   , hidden: true });
        /*if( attribute1 == 'ITM' || attribute1 == 'CDM' || attribute1 == 'CDD' || attribute1 == 'MSG' || attribute1 == 'MNU') {
            fc_addDataInGettedLov ( 'LANG_CD'      , {code: 'LANG_CD'      , tags: '', alias: ''} );
            fc_addDataInGettedLov ( 'MULTI_LANG_TY', {code: 'MULTI_LANG_TY', tags: '', alias: ''} );
            fc_addDataInSettingLov( {object: gridId+'.LANG_CD' , code: 'LANG_CD'      , format: 'V', nullable: true, defval: ''} );
            fc_addDataInSettingLov( {object: gridId+'.CATEGORY', code: 'MULTI_LANG_TY', format: 'V', nullable: true, defval: ''} );
        }
        else if ( attribute1 == 'MULTI_ALL') {
            fc_addDataInSettingLov( {object: gridId+'.LANG_CD' , code: 'LANG_CD'      , format: 'V', nullable: true, defval: ''} );
            fc_addDataInSettingLov( {object: gridId+'.CATEGORY', code: 'MULTI_LANG_TY', format: 'V', nullable: true, defval: ''} );
        };*/
        fc_addDataInGettedLov ( 'LANG_CD'      , {code: 'LANG_CD'      , tags: '', alias: ''} );
        fc_addDataInGettedLov ( 'MULTI_LANG_TY', {code: 'MULTI_LANG_TY', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: gridId+'.LANG_CD' , code: 'LANG_CD'      , format: 'V', nullable: true, defval: ''} );
        fc_addDataInSettingLov( {object: gridId+'.CATEGORY', code: 'MULTI_LANG_TY', format: 'V', nullable: true, defval: ''} );
        break;
    case 'MULTI_LANG_ALL_INFO': // SCOE0060
        gridId = 'gridAllLang';
        if ( caption_flag ) {
            sCaption = 'Multi Langauge Information';
            sItemCd  = 'CAP_MULTI_LANG_INFO';
        };
        
        var arrNm = attribute1.split(",");
        var arrCd = attribute2.split(",");
        
        objGrpItems = [];
        for (var i=0; i<arrNm.length; i++) {
            objGrpItems.push( {caption: arrNm[ i ], name: 'LANG_GRP'+(i+1), align: 'center',itemCd: 'LANG_CD.'+arrCd[ i ] } );
        };
        objItems =  [
                    {caption: 'Category'    , name: 'CATEGORY'   , width: 100, datatype: 'lov' , frozen: true                    },
                    {caption: 'Item'        , name: 'ITEM_CD'    , width: 150, datatype: 'text', frozen: true, itemCd: 'CAP_ITEM'},
                    {caption: 'Name'        , name: 'ITEM_NM'    , width: 200, datatype: 'text', frozen: true, itemCd: 'CAP_NM'  },
                    {caption: 'Mom ItemCode', name: 'MOM_ITEM_CD', width: 100, datatype: 'text', hidden: true, itemCd: 'CAP_PAR' },
                    {caption: 'Language ID' , name: 'LANG_ID'    , width: 150, datatype: 'text', hidden: true                    }
                    ];
        for ( var jLoop = 1; jLoop <= arrNm.length; jLoop++ ) {
            objItems.push( {caption: 'Contents'    , name: 'CONTENTS'     +jLoop, width: 200, datatype: 'text', group: 'LANG_GRP'+jLoop , itemCd: 'CONTENTS'      } );
            objItems.push( {caption: 'Alternative1', name: 'ALT_CONTENTS1'+jLoop, width: 100, datatype: 'text', group: 'LANG_GRP'+jLoop , itemCd: 'ALT_CONTENTS1' } );
            objItems.push( {caption: 'Alternative2', name: 'ALT_CONTENTS2'+jLoop, width: 100, datatype: 'text', group: 'LANG_GRP'+jLoop , itemCd: 'ALT_CONTENTS2' } );
            objItems.push( {caption: 'Alternative3', name: 'ALT_CONTENTS3'+jLoop, width: 100, datatype: 'text', group: 'LANG_GRP'+jLoop , itemCd: 'ALT_CONTENTS3' } );
        };
        fc_addDataInGettedLov ( 'CATEGORY', {code: 'MULTI_LANG_TY', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: gridId+'.CATEGORY', code: 'MULTI_LANG_TY', format: 'V', nullable: false, defval: ''} );

        // Set Form field
        if( fc_isNull(sSubKey) ) {
            fc_addDataInGettedLov ( 'LANG_CD', {code: 'LANG_CD', tags: '', alias: ''} );
            fc_addDataInSettingLov( {object: 'CATEGORY', code: 'MULTI_LANG_TY', format: 'V', nullable: false, defval: ''} );
        };
        fc_setKeysInCol ( gridId, [ 'CATEGORY','ITEM_CD','ITEM_NM','MOM_ITEM_CD' ] );
        fc_setUpperInCol( gridId, [ 'LANG_ID' ] );
        fc_setAlignInCol( gridId, [ 'CATEGORY','LANG_ID' ], 'center' );
        break;
    case 'BIZ_ENV' : // SCOG0020
        gridId = 'gridBizEnv';
        if ( caption_flag ) {
            sCaption = 'Business Environment Information';
            sItemCd  = 'CAP_BIZ_ENV_INFO';
        };
        var hiddenFlag = false;
//      if (sSubKey == 'SCH' || sSubKey ==  'SCO' || sSubKey ==  'SIT' || sSubKey == 'SIM' || sSubKey == 'SMS' || sSubKey == 'SPG' || sSubKey ==  'SQM' || sSubKey == 'SYD') {
        if ( !fc_isNull( sSubKey ) ) {
            hiddenFlag = true;
        };

        objGrpItems =   [
                        {caption: 'Environment Info', name: 'ENV_GRP'   , align: 'center', itemCd: 'CAP_ENV_GRP'   },
                        {caption: 'Text Attr'       , name: 'TEXT_GRP'  , align: 'center', itemCd: 'CAP_TEXT_GRP'  },
                        {caption: 'Number Attr'     , name: 'NUMBER_GRP', align: 'center', itemCd: 'CAP_NUMBER_GRP'}
                        ];
        objItems =  [
                    {caption: 'Biz Chain' , name: 'BIZ_CHAIN_CD', width: 100, datatype: 'lov'      , frozen: true, hidden: hiddenFlag },
                    {caption: 'Use ?'     , name: 'USE_YN'      , width:  80, datatype: 'checkbox'},
                    {caption: 'Env.Key1'  , name: 'ENV_KEY1'    , width: 100, datatype: 'text'     , group: 'ENV_GRP'   },
                    {caption: 'Env.Key2'  , name: 'ENV_KEY2'    , width: 100, datatype: 'text'     , group: 'ENV_GRP'   },
                    {caption: 'Env.Key3'  , name: 'ENV_KEY3'    , width: 100, datatype: 'text'     , group: 'ENV_GRP'   },
                    {caption: 'Env.Key4'  , name: 'ENV_KEY4'    , width: 100, datatype: 'text'     , group: 'ENV_GRP'   },
                    {caption: 'Env.Key5'  , name: 'ENV_KEY5'    , width: 100, datatype: 'text'     , group: 'ENV_GRP'   },
                    {caption: 'Env.Name'  , name: 'ENV_NM'      , width: 200, datatype: 'text'     , group: 'ENV_GRP'   },
                    {caption: 'Env.Value' , name: 'ENV_VAL'     , width:  80, datatype: 'text'     , group: 'ENV_GRP'   },
                    {caption: 'Env.Min'   , name: 'ENV_MIN'     , width:  80, datatype: 'text'     , group: 'ENV_GRP'   },
                    {caption: 'Env.Max'   , name: 'ENV_MAX'     , width:  80, datatype: 'text'     , group: 'ENV_GRP'   },
                    {caption: 'Text Attr1', name: 'TXT_ATTR1'   , width: 100, datatype: 'text'     , group: 'TEXT_GRP'  },
                    {caption: 'Text Attr2', name: 'TXT_ATTR2'   , width: 100, datatype: 'text'     , group: 'TEXT_GRP'  },
                    {caption: 'Text Attr3', name: 'TXT_ATTR3'   , width: 100, datatype: 'text'     , group: 'TEXT_GRP'  },
                    {caption: 'Text Attr4', name: 'TXT_ATTR4'   , width: 100, datatype: 'text'     , group: 'TEXT_GRP'  },
                    {caption: 'Text Attr5', name: 'TXT_ATTR5'   , width: 100, datatype: 'text'     , group: 'TEXT_GRP'  },
                    {caption: 'Num. Attr1', name: 'NUM_ATTR1'   , width:  80, datatype: 'number'   , group: 'NUMBER_GRP'},
                    {caption: 'Num. Attr2', name: 'NUM_ATTR2'   , width:  80, datatype: 'number'   , group: 'NUMBER_GRP'},
                    {caption: 'Num. Attr3', name: 'NUM_ATTR3'   , width:  80, datatype: 'number'   , group: 'NUMBER_GRP'},
                    {caption: 'Num. Attr4', name: 'NUM_ATTR4'   , width:  80, datatype: 'number'   , group: 'NUMBER_GRP'},
                    {caption: 'Num. Attr5', name: 'NUM_ATTR5'   , width:  80, datatype: 'number'   , group: 'NUMBER_GRP'},
                    {caption: 'Remarks'   , name: 'REMARKS'     , width: 200, datatype: 'text'}
                    ];
        fc_addDataInGettedLov ( 'BIZ_CHAIN_CD', {code: 'BIZ_CHAIN_CD', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object:         'BIZ_CHAIN_CD', code: 'BIZ_CHAIN_CD', format: 'V', nullable: false, defval: ''} );
        fc_addDataInSettingLov( {object: gridId+'.BIZ_CHAIN_CD', code: 'BIZ_CHAIN_CD', format: 'V', nullable: false, defval: ''} );

        fc_setKeysInCol    ( gridId, [ 'BIZ_CHAIN_CD','ENV_KEY1','ENV_KEY2','ENV_KEY3','ENV_KEY4','ENV_KEY5' ] );
        fc_setUpperInCol   ( gridId, [ 'BIZ_CHAIN_CD','ENV_KEY1','ENV_KEY2','ENV_KEY3','ENV_KEY4','ENV_KEY5' ] );
        fc_setAlignInCol   ( gridId, [ 'BIZ_CHAIN_CD','USE_YN' ], 'center' );
        fc_setRequiredInCol( gridId, [ 'BIZ_CHAIN_CD','ENV_KEY1','ENV_KEY2','ENV_KEY3','ENV_KEY4','ENV_KEY5','ENV_NM' ] );
        break;
    case 'PKG_LOG' : // SCOG0050
        gridId = 'gridPkgLog';
        if ( caption_flag ) {
            sCaption = 'Package Log Information';
            sItemCd  = 'CAP_PKG_LOG_INFO';
        };
        objItems =  [
                    {caption: 'Pkg.ID'   , name: 'PKG_ID'     , width: 180, datatype: 'text'  },
                    {caption: 'Log Seq.' , name: 'LOG_SEQ'    , width:  50, datatype: 'number'},
                    {caption: 'Upd. Name', name: 'UPD_USER_NM', width: 150, datatype: 'text'   , itemCd: 'CAP_UPD_USER_NM'},
                    {caption: 'Datetime' , name: 'LOG_DTM'    , width: 150, datatype: 'text'   , itemCd: 'CAP_DTM' },
                    {caption: 'Type'     , name: 'LOG_TY'     , width:  80, datatype: 'lov'    , itemCd: 'CAP_TY'  },
                    {caption: 'Log Text1', name: 'LOG_TEXT1'  , width: 300, datatype: 'text'  },
                    {caption: 'Log Text2', name: 'LOG_TEXT2'  , width: 300, datatype: 'text'  },
                    {caption: 'Log Text3', name: 'LOG_TEXT3'  , width: 300, datatype: 'text'  }
                    ];
        fc_addDataInGettedLov ( 'LOG_TY', {code: 'LOG_TY', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: gridId+'.LOG_TY', code: 'LOG_TY', format: 'V', nullable: true, defval: ''} );
        fc_setAlignInCol ( gridId, [ 'LOG_DTM','LOG_TY' ], 'center' );
        fc_setHiddenInCol( gridId, [ 'LOG_SEQ' ] );
        break;
    case 'FORMAT_INFO' : // SCOF0010, SCOF0020
        gridId = 'gridFormat';
        if ( caption_flag ) {
            sCaption = 'Format Information';
            sItemCd  = 'CAP_FMT_INFO';
        };
        objItems =  [
                    {caption: 'Plant CD', name: 'PLANT_CD'     , width: 110, datatype: 'lov' , itemCd: '', frozen: true },
                    {caption: 'Owner.Chain', name: 'FMT_OWNER'  , width: 110, datatype: 'lov'    , itemCd: 'CAP_OWNER_CHAIN', frozen: true },
                    {caption: 'Interface Type', name: 'INF_TY'  , width: 110, datatype: 'lov'    , itemCd: 'CAP_INF_TY', frozen: true },
                    {caption: 'Format ID'  , name: 'FMT_ID'     , width: 200, datatype: 'text'                              , frozen: true },
                    {caption: 'Format Name', name: 'FMT_NM'     , width: 200, datatype: 'text'  },
                    {caption: 'Count'      , name: 'ATTR_CNT'   , width:  60, datatype: 'integer', itemCd: 'CAP_CNT'},
                    {caption: 'Length'     , name: 'TOT_FMT_LTH', width:  80, datatype: 'number' , itemCd: 'CAP_LTH'},
                    ];
        if (fc_isNull(sSubKey)) { // SCOF0010
            objItems.push( {caption: 'Attr Count', name: 'TOT_ATTR_CNT', width: 100, datatype: 'integer', itemCd: 'CAP_ATTR_COUNT'} );
            objItems.push( {caption: 'Remarks'   , name: 'REMARKS'     , width: 400, datatype: 'text'} );
        };
        fc_addDataInGettedLov ( 'PLANT_CD', {code: 'PLANT_CD', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: 'PLANT_CD'        , code: 'PLANT_CD', format: 'V', nullable: true , defval: ''} );
        fc_addDataInSettingLov( {object: gridId+'.PLANT_CD', code: 'PLANT_CD', format: 'V', nullable: false, defval: ''} );
        fc_addDataInGettedLov( 'SYS_MODULE_CD', {code: 'SYS_MODULE_CD', tags: 'SFM', alias: 'SYS_MODULE_CD'} );
        fc_addDataInSettingLov( {object: 'FMT_OWNER'        , code: 'SYS_MODULE_CD', format: 'V', nullable: true , defval: ''} );
        fc_addDataInSettingLov( {object: gridId+'.FMT_OWNER', code: 'SYS_MODULE_CD', format: 'V', nullable: false, defval: ''} );
        fc_addDataInGettedLov( 'INF_TY', {code: 'INF_TY', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: 'INF_TY'        , code: 'INF_TY', format: 'V', nullable: true , defval: ''} );
        fc_addDataInSettingLov( {object: gridId+'.INF_TY', code: 'INF_TY', format: 'V', nullable: false, defval: ''} );


        fc_setKeysInCol    ( gridId, [ 'FMT_ID' ] );
        fc_setAlignInCol   ( gridId, [ 'FMT_OWNER' ], 'center' );
        fc_setAlignInCol   ( gridId, [ 'INF_TY' ], 'center' );
        fc_setUpperInCol   ( gridId, [ 'FMT_ID' ] );
        fc_setEditInCol    ( gridId, [ 'ATTR_CNT','TOT_FMT_LTH','TOT_ATTR_CNT' ], false );
        fc_setRequiredInCol( gridId, [ 'FMT_ID','INF_TY','FMT_OWNER','FMT_NM'] );
        break;
    case 'FORMAT_ATTR_INFO' : // SCOF0020, SCOF0080, SCOF0120
        gridId = 'gridFormatAttr';
        if ( caption_flag ) {
            if ( sSubKey == 'LOG' ) {
                sCaption = 'TC Log Attribute Mapping';
                sItemCd  = 'CAP_TC_LOG_ATTR_MAP';
            } else  if ( sSubKey == 'LOG1' ) {
                    sCaption = 'DB2DB Log Attribute Mapping';
                    sItemCd  = 'CAP_DB_LOG_ATTR_MAP';
            } else {
                sCaption = 'Attribute Information';
                sItemCd  = 'CAP_ATTR_INFO';
            };
        };
        objItems =  [
                     {caption: 'Seq.'      , name: 'ATTR_SEQ'    , width:  40, datatype: 'integer' , itemCd: 'CAP_SEQ'    , frozen: true},
                     {caption: 'E/G'       , name: 'ATTR_TY'     , width:  60, datatype: 'lov'     , itemCd: 'CAP_ATTR_TY', frozen: true },
                     {caption: 'Attr Code' , name: 'ATTR_CD'     , width: 200, datatype: 'text'                           , frozen: true },
                     {caption: 'Name'      , name: 'ATTR_NM'     , width: 200, datatype: 'text'    , itemCd: 'CAP_NM'    },
                     {caption: 'Type'      , name: 'ATTR_DATA_TY', width:  80, datatype: 'lov'     , itemCd: 'DATA_TY'   },
                     {caption: 'Length'    , name: 'ATTR_LTH'    , width:  60, datatype: 'integer' , itemCd: 'CAP_LTH'   },
                     {caption: 'Scale'     , name: 'ATTR_SCALE'  , width:  60, datatype: 'integer' , itemCd: 'DATA_SCALE'},
                     {caption: 'Flag'      , name: 'ATTR_FL'     , width:  50, datatype: 'text'    , itemCd: 'CAP_FL', hidden: true },
                     {caption: 'Map. Attr.', name: 'MAP_ATTR_CD' , width:  50, datatype: 'text'                      , hidden: true },
                     {caption: 'Grp. Attr.', name: 'GRP_ATTR_CD' , width:  50, datatype: 'text'                      , hidden: true },
                     {caption: 'Grp. Seq.' , name: 'ATTR_GRP_SEQ', width:  50, datatype: 'text'                      , hidden: true },
                    ];
        if ( sSubKey == 'LOG' ) {
            objItems.push( {caption: 'TC Data', name: 'SPLIT_CONTENTS', width: 140, datatype: 'text', itemCd: 'CAP_SPLIT_CONTENTS'} );
            objItems.push( {caption: 'Remarks', name: 'REMARKS'       , width: 200, datatype: 'text'} );

            fc_setKeysInCol  ( gridId, [ 'ATTR_SEQ','ATTR_TY','ATTR_CD','ATTR_NM','ATTR_LTH' ] );
            fc_setUpperInCol ( gridId, [ 'ATTR_CD','MAP_ATTR_CD' ] );
            fc_setAlignInCol ( gridId, [ 'ATTR_CD','ATTR_NM' ], 'left' );
            fc_setAlignInCol ( gridId, [ 'ATTR_SEQ','ATTR_TY','ATTR_SEQ' ], 'center' );
            fc_setHiddenInCol( gridId, [ 'ATTR_TY','JQX_CB' ] );
            fc_setEditInCol  ( gridId, [ 'ATTR_DATA_TY','ATTR_SCALE','REMARKS' ], false );
        } else if ( sSubKey == 'LOG1' ) {
                objItems.push( {caption: 'DB Data', name: 'DB2DB_DATA', width: 140, datatype: 'text', itemCd: 'CAP_DB_CONTENTS'} );
                objItems.push( {caption: 'Remarks', name: 'REMARKS'       , width: 200, datatype: 'text'} );

                fc_setKeysInCol  ( gridId, [ 'ATTR_SEQ','ATTR_TY','ATTR_CD','ATTR_NM','ATTR_LTH' ] );
                fc_setUpperInCol ( gridId, [ 'ATTR_CD','MAP_ATTR_CD' ] );
                fc_setAlignInCol ( gridId, [ 'ATTR_CD','ATTR_NM' ], 'left' );
                fc_setAlignInCol ( gridId, [ 'ATTR_SEQ','ATTR_TY','ATTR_SEQ' ], 'center' );
                fc_setHiddenInCol( gridId, [ 'ATTR_TY','JQX_CB' ] );
                fc_setEditInCol  ( gridId, [ 'ATTR_DATA_TY','ATTR_SCALE','REMARKS' ], false );
        } else {
            objItems = null;
            objItems =  [
                        {caption: ''            , name: 'ATTR_SEQ_TMP', width:  50, datatype: 'number'  , itemCd: 'CAP_SEQ'    , frozen: true },
                        {caption: 'Plant CD'    , name: 'PLANT_CD'     , width: 110, datatype: 'lov' , itemCd: '', hidden: true },
                        {caption: 'E/G'         , name: 'ATTR_TY'     , width:  45, datatype: 'lov'     , itemCd: 'CAP_ATTR_TY', frozen: true },
                        {caption: 'Attr Code'   , name: 'ATTR_CD'     , width: 200, datatype: 'text'                           , frozen: true },
                        {caption: 'Name'        , name: 'ATTR_NM'     , width: 200, datatype: 'text'    , itemCd: 'CAP_NM'    },
                        {caption: 'Type'        , name: 'ATTR_DATA_TY', width:  70, datatype: 'lov'     , itemCd: 'DATA_TY'   },
                        {caption: 'Length'      , name: 'ATTR_LTH'    , width:  50, datatype: 'integer' , itemCd: 'CAP_LTH'   },
                        {caption: 'Scale'       , name: 'ATTR_SCALE'  , width:  150, datatype: 'integer' , itemCd: 'DATA_SCALE'},
                        {caption: 'Seq'         , name: 'ATTR_SEQ'    , width:  150, datatype: 'integer'},
                        {caption: 'Mapping Attr', name: 'MAP_ATTR_CD' , width: 200, datatype: 'text'   },
                        {caption: 'Use ?'       , name: 'USE_YN'      , width:  70, datatype: 'checkbox'                  , hidden : true },
                        {caption: 'Remarks'     , name: 'REMARKS'     , width: 200, datatype: 'text'   },
                        {caption: ''            , name: 'FMT_ID'      , width: 200, datatype: 'text'   },
                        {caption: 'Flag'        , name: 'ATTR_FL'     , width:  50, datatype: 'text'    , itemCd: 'CAP_FL', hidden: true },

                        ];
            fc_setKeysInCol    ( gridId, [ 'FMT_ID','ATTR_CD'] );
            fc_setAlignInCol   ( gridId, [ 'ATTR_SEQ','ATTR_TY' ], 'center' );
            fc_setUpperInCol   ( gridId, [ 'ATTR_CD','MAP_ATTR_CD' ] );
            fc_setHiddenInCol  ( gridId, [ 'FMT_ID'] );
            fc_setRequiredInCol( gridId, [ 'ATTR_SEQ','ATTR_DATA_TY','ATTR_CD','ATTR_LTH','ATTR_NM' ] );
            fc_setEditInCol    ( gridId, [ 'ATTR_SEQ_TMP' ], false);

            fc_addDataInGettedLov ( 'PLANT_CD', {code: 'PLANT_CD', tags: '', alias: ''} );
            fc_addDataInSettingLov( {object: gridId+'.PLANT_CD', code: 'PLANT_CD', format: 'V', nullable: false, defval: ''} );

        };
        fc_addDataInGettedLov ( 'INF_ATTR_TY', {code: 'INF_ATTR_TY', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: gridId+'.ATTR_TY', code: 'INF_ATTR_TY', format: 'K', nullable: false, defval: ''} );

        fc_addDataInGettedLov ( 'DATA_TY', {code: 'DATA_TY', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: gridId+'.ATTR_DATA_TY', code: 'DATA_TY', format: 'V', nullable: false, defval: 'V'} );

        break;
    case 'FORMAT_ATTR_INFO2' : // SCOF0020, SCOF0080, SCOF0050
        gridId = 'gridFormatAttr';
        if ( caption_flag ) {
            if ( sSubKey == 'CASE' ){
                sCaption = 'TC Business Case Information';
                sItemCd  = 'CAP_BIZ_CASE_INFO';
            }
        };
        objItems =  [
                    {caption: 'Seq.'      , name: 'ATTR_SEQ'    , width:  40, datatype: 'integer' , itemCd: 'CAP_SEQ'    , frozen: true},
                    {caption: 'E/G'       , name: 'ATTR_TY'     , width:  45, datatype: 'lov'     , itemCd: 'CAP_ATTR_TY', frozen: true },
                    {caption: 'Attr Code' , name: 'ATTR_CD'     , width: 200, datatype: 'text'                           , frozen: true },
                    {caption: 'Name'      , name: 'ATTR_NM'     , width: 200, datatype: 'text'    , itemCd: 'CAP_NM'    },
                    {caption: 'Type'      , name: 'ATTR_DATA_TY', width:  70, datatype: 'lov'     , itemCd: 'DATA_TY'   },
                    {caption: 'Length'    , name: 'ATTR_LTH'    , width:  50, datatype: 'integer' , itemCd: 'CAP_LTH'   },
                    {caption: 'Scale'     , name: 'ATTR_SCALE'  , width:  50, datatype: 'integer' , itemCd: 'DATA_SCALE'},
                    {caption: 'Flag'      , name: 'ATTR_FL'     , width:  50, datatype: 'text'    , itemCd: 'CAP_FL', hidden: true },
                    {caption: 'Map. Attr.', name: 'MAP_ATTR_CD' , width:  50, datatype: 'text'                      , hidden: true },
                    {caption: 'Grp. Attr.', name: 'GRP_ATTR_CD' , width:  50, datatype: 'text'                      , hidden: true },
                    {caption: 'Grp. Seq.' , name: 'ATTR_GRP_SEQ', width:  50, datatype: 'text'                      , hidden: true },
                    ];
        if ( sSubKey == 'CASE' ) {
            var caseCnt = Number( attribute1 );
            for ( var i = 0; i < caseCnt; i++ ) {
                objItems.push( {caption: 'Case '+ (i+1), name: 'SPLIT_CONTENTS' + i, width:100, datatype: 'text', itemCd: 'CAP_CASE'+ (i+1)} );
            };
            fc_setKeysInCol  ( gridId, [ 'ATTR_SEQ','ATTR_TY','FMT_ID','ATTR_CD','ATTR_NM','ATTR_LTH' ] );
            fc_setEditInCol  ( gridId, [ 'ATTR_SEQ','ATTR_TY','FMT_ID','ATTR_CD','ATTR_NM','ATTR_LTH','ATTR_DATA_TY','ATTR_SCALE' ], false );
            fc_setUpperInCol ( gridId, [ 'ATTR_CD','MAP_ATTR_CD' ] );
            fc_setAlignInCol ( gridId, [ 'ATTR_CD','ATTR_NM' ], 'left' );
            fc_setAlignInCol ( gridId, [ 'ATTR_SEQ','ATTR_TY' ], 'center' );
            fc_setHiddenInCol( gridId, [ 'ATTR_TY','FMT_ID','JQX_CB' ] );

            //fc_addDataInGettedLov ( 'INF_ATTR_TY2', {code: 'INF_ATTR_TY', tags: '', alias: 'INF_ATTR_TY2'} );
            //fc_addDataInSettingLov( {object: gridId+'.MTCH_ATTR_TY', code: 'INF_ATTR_TY2', format: 'K', nullable: false, defval: ''} );

            //fc_addDataInGettedLov ( 'DATA_TY2', {code: 'DATA_TY', tags: '', alias: 'DATA_TY2'} );
            //fc_addDataInSettingLov( {object: gridId+'.MTCH_ATTR_DATA_TY', code: 'DATA_TY2', format: 'V', nullable: false, defval: 'V'} );
        };
        fc_addDataInGettedLov ( 'INF_ATTR_TY', {code: 'INF_ATTR_TY', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: gridId+'.ATTR_TY', code: 'INF_ATTR_TY', format: 'K', nullable: false, defval: ''} );
        //fc_addDataInSettingLov( {object: gridId+'.MTCH_ATTR_TY', code: 'INF_ATTR_TY', format: 'K', nullable: false, defval: ''} );

        fc_addDataInGettedLov ( 'DATA_TY', {code: 'DATA_TY', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: gridId+'.ATTR_DATA_TY', code: 'DATA_TY', format: 'V', nullable: false, defval: 'V'} );
        //fc_addDataInSettingLov( {object: gridId+'.MTCH_ATTR_DATA_TY', code: 'DATA_TY', format: 'V', nullable: false, defval: 'V'} );

        //fc_addDataInGettedLov ( 'PLANT_CD', {code: 'PLANT_CD', tags: '', alias: ''} );
        //fc_addDataInSettingLov( {object: gridId+'.PLANT_CD', code: 'PLANT_CD', format: 'V', nullable: false, defval: ''} );
        break;
    case 'TC_INFO' : // SCOF0030
        gridId = 'gridTC';
        if ( caption_flag ) {
            sCaption = 'TC Information';
            sItemCd  = 'CAP_TC_INFO';
        };
        objItems =  [
                    {caption: 'Plant Code'       , name: 'PLANT_CD'         , width: 100, datatype: 'lov'      , frozen: true },
                    {caption: 'Owner Chain'       , name: 'TC_OWNER'         , width: 100, datatype: 'lov'      , itemCd: 'CAP_OWNER_CHAIN', frozen: true },
                    {caption: 'INF_TY'             , name: 'INF_TY'            , width:  60, datatype: 'lov'    , itemCd: 'INF_TY'         , frozen: true },
                    {caption: 'TC ID'             , name: 'TC_ID'            , width:  60, datatype: 'text'                                , frozen: true },
                    {caption: 'TC Name'           , name: 'TC_NM'            , width: 250, datatype: 'text'    },
                    {caption: 'Format ID'         , name: 'FMT_ID'           , width: 200, datatype: 'lov'     , frozen: true},
                    {caption: 'Sender'            , name: 'TC_SENDER'        , width: 100, datatype: 'lov'      , itemCd: 'CAP_SENDER'},
                    {caption: 'Receiver List'     , name: 'TC_RECEIVER'      , width: 100, datatype: 'chklov'  },
                    {caption: 'TC Master Table'   , name: 'TC_TRANS_TBL_NM'  , width: 130, datatype: 'text'    },
                    {caption: 'Match TC Master Table'   , name: 'MTCH_TC_TRANS_TBL_NM'  , width: 130, datatype: 'text'    },
                    {caption: 'TC Type'           , name: 'TC_TRANS_TY'      , width: 100, datatype: 'lov'     },
                    {caption: 'EAI Information ID', name: 'EAI_INF_ID'       , width: 130, datatype: 'text'    },
                    {caption: 'Call Program'      , name: 'RCP_SERVICE'      , width: 150, datatype: 'text'    },
                    {caption: 'Transition Name'   , name: 'RCP_TRANSITION_NM', width: 250, datatype: 'text'    ,hidden: true},
                    {caption: 'EAI Broker Name'   , name: 'EAI_BROKER_NM'    , width: 150, datatype: 'text'    },
                    {caption: 'TC Merge Flag'     , name: 'MERGE_FL'         , width: 100, datatype: 'checkbox',hidden: true},
                    {caption: 'Asynchrony Flag'   , name: 'ASYNC_FL'         , width: 100, datatype: 'checkbox',hidden: true},
                    {caption: 'Remarks'           , name: 'REMARKS'          , width: 200, datatype: 'text'    },
                    {caption: 'Tc parse owner'    , name: 'TC_PARSE_OWNER'   , width: 350, datatype: 'text'     , hidden: true }
                    ];

        fc_addDataInGettedLov ( 'PLANT_CD', {code: 'PLANT_CD', tags: '', alias: ''} );
        fc_addDataInGettedLov( 'MES_MODULE_CD', {code: 'SYS_MODULE_CD', tags: 'SFM', alias: 'MES_MODULE_CD'} );
        fc_addDataInGettedLov( 'SYS_MODULE_CD', {code: 'SYS_MODULE_CD', tags: ''   , alias: ''  } );
        fc_addDataInGettedLov( 'TC_SENDER_CD', {code: 'SYS_MODULE_CD', tags: ''   , alias: 'TC_SENDER_CD'  } ); //추가
        fc_addDataInGettedLov( 'OWNER_FORMAT' , {code: 'OWNER_FORMAT' , tags: ''   , alias: ''  } );
        fc_addDataInGettedLov( 'TC_TRANS_TY'  , {code: 'TC_TRANS_TY'  , tags: ''   , alias: ''  } );
        fc_addDataInGettedLov ( 'INF_TY', {code: 'INF_TY', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: 'PLANT_CD'           , code: 'PLANT_CD', format: 'V', nullable: true , defval: ''} );
        fc_addDataInSettingLov( {object: 'TC_OWNER'           , code: 'MES_MODULE_CD', format: 'V', nullable: true , defval: ''} );
        fc_addDataInSettingLov( {object: 'TC_SENDER'          , code: 'TC_SENDER_CD', format: 'K', nullable: true , defval: ''} );
        fc_addDataInSettingLov( {object: 'TC_RECEIVER'        , code: 'TC_SENDER_CD', format: 'K', nullable: true , defval: ''} );
        fc_addDataInSettingLov( {object: 'TC_TRANS_TY'        , code: 'TC_TRANS_TY'  , format: 'V', nullable: true , defval: ''} );
        fc_addDataInSettingLov( {object: 'INF_TY'        , code: 'INF_TY'  , format: 'V', nullable: true , defval: ''} );

        fc_addDataInSettingLov( {object: gridId+'.PLANT_CD'   , code: 'PLANT_CD', format: 'V', nullable: false, defval: ''} );
        fc_addDataInSettingLov( {object: gridId+'.TC_OWNER'   , code: 'MES_MODULE_CD', format: 'V', nullable: false, defval: ''} );
        fc_addDataInSettingLov( {object: gridId+'.TC_SENDER'  , code: 'SYS_MODULE_CD', format: 'K', nullable: false, defval: ''} );
        fc_addDataInSettingLov( {object: gridId+'.TC_RECEIVER', code: 'SYS_MODULE_CD', format: 'K', nullable: false, defval: ''} );
        fc_addDataInSettingLov( {object: gridId+'.FMT_ID'     , code: 'OWNER_FORMAT' , format: 'K', nullable: false, defval: ''} );
        fc_addDataInSettingLov( {object: gridId+'.TC_TRANS_TY', code: 'TC_TRANS_TY'  , format: 'V', nullable: false, defval: ''} );
        fc_addDataInSettingLov( {object: gridId+'.INF_TY', code: 'INF_TY'  , format: 'V', nullable: false, defval: ''} );

        if( sSubKey == 'MAST' ) {
            fc_addDataInGettedLov ( 'OWNER_TC'    , {code: 'OWNER_TC'    , tags: '', alias: ''} );
            fc_addDataInSettingLov( {object: 'TC_ID' , code: 'OWNER_TC'    , format: 'K:V', nullable: true, defval: ''} );
            fc_addDataInSettingLov( {object: 'FMT_ID', code: 'OWNER_FORMAT', format: 'K:V', nullable: true, defval: ''} );
        };
        fc_setKeysInCol    ( gridId, [ 'PLANT_CD', 'TC_ID', 'FMT_ID' ] );
        fc_setAlignInCol   ( gridId, [ 'FMT_ID','TC_RECEIVER','RCP_SERVICE','REMARKS','EAI_INF_ID','EAI_BROKER_NM' ], 'left' );
        fc_setAlignInCol   ( gridId, [ 'TC_OWNER','TC_ID','TC_SENDER' ], 'center' );
        fc_setUpperInCol   ( gridId, [ 'TC_ID','FMT_ID','TC_RECEIVER','EAI_INF_ID','EAI_BROKER_NM' ] );
        fc_setRequiredInCol( gridId, [ 'TC_OWNER','TC_ID','FMT_ID','TC_SENDER','TC_RECEIVER','TC_TRANS_TY' ] );
        break;
    case 'TC_LOG_INFO' : // SCOF0040
        gridId = 'gridTCLog';
        if ( caption_flag ) {
            sCaption = 'TC Log Information';
            sItemCd  = 'CAP_TC_LOG_INFO';
        };
        objItems =  [
                    {caption: 'Create Object'  , name: 'DATA_CRE_OBJ'   , width: 130, datatype: 'text'  , itemCd: 'CAP_DATA_CRE_OBJ', frozen: true },
                    {caption: 'Datetime'       , name: 'TC_DTM'         , width: 130, datatype: 'text'  , itemCd: 'CAP_DTM'         , frozen: true },
                    {caption: 'Type'           , name: 'TC_LOG_TY'      , width:  60, datatype: 'lov'   , itemCd: 'CAP_TY'          , frozen: true },
                    {caption: 'Status'         , name: 'TC_STS'         , width:  70, datatype: 'lov'   , itemCd: 'CAP_STS'         , frozen: true },
                    {caption: 'TC ID'          , name: 'TC_ID'          , width:  70, datatype: 'text'                              , frozen: true },
                    {caption: 'Interface ID'   , name: 'EAI_INF_ID'     , width: 130, datatype: 'text'                              , frozen: true },
                    {caption: 'Format ID'      , name: 'FMT_ID'         , width: 190, datatype: 'text' },
                    {caption: 'Sender'         , name: 'TC_SENDER'      , width:  80, datatype: 'text'  , itemCd: 'CAP_SENDER'},
                    {caption: 'Receiver List'  , name: 'TC_RECEIVER'    , width: 200, datatype: 'text' },
                    {caption: 'Content'        , name: 'TC_CONTENTS'    , width: 500, datatype: 'text'  , itemCd: 'CONTENTS'},
                    {caption: 'Remarks'        , name: 'REMARKS'        , width: 200, datatype: 'text' },
                    {caption: 'Owner Chain'    , name: 'TC_OWNER'       , width:  90, datatype: 'text'  , itemCd: 'CAP_OWNER_CHAIN'},
                    {caption: 'Tclog uniqueID' , name: 'TC_LOG_CD'      , width: 220, datatype: 'text' },
                    {caption: 'Trans Type'     , name: 'TC_TRANS_TY'    , width:  90, datatype: 'text' },
                    {caption: 'Map. Table Name', name: 'TC_TRANS_TBL_NM', width:  90, datatype: 'text' }
                    ];


        fc_addDataInGettedLov ( 'INF_SR_TY'    , {code: 'INF_SR_TY'    , tags: ''   , alias: ''  } );
        fc_addDataInGettedLov ( 'INF_TC_STS'   , {code: 'INF_TC_STS'   , tags: ''   , alias: ''  } );
        fc_addDataInGettedLov ( 'INF_TY', {code: 'INF_TY', tags: '', alias: ''} );
        fc_addDataInGettedLov ( 'MES_MODULE_CD', {code: 'SYS_MODULE_CD', tags: '', alias: 'MES_MODULE_CD'} );
        //OWNER_FORAMAT
        fc_addDataInGettedLov ( 'OWNER_TC'    , {code: 'OWNER_TC'    , tags: '', alias: ''} );
        fc_addDataInGettedLov ( 'PLANT_CD', {code: 'PLANT_CD', tags: '', alias: ''} );
        fc_addDataInGettedLov ( 'SYS_MODULE_CD', {code: 'SYS_MODULE_CD', tags: ''   , alias: 'SYS_MODULE_CD'  } );
        //TC_TRANS_TY


        fc_addDataInSettingLov( {object: 'PLANT_CD'           , code: 'PLANT_CD', format: 'V', nullable: true , defval: ''} );
        fc_addDataInSettingLov( {object: 'TC_OWNER'           , code: 'MES_MODULE_CD', format: 'V', nullable: true , defval: ''} );
        fc_addDataInSettingLov( {object: 'INF_TY'        , code: 'INF_TY'  , format: 'V', nullable: true , defval: ''} );
        fc_addDataInSettingLov( {object: 'TC_ID' , code: 'OWNER_TC'    , format: 'K:V', nullable: true, defval: ''} );
        fc_addDataInSettingLov( {object: 'TC_OWNER'   , code: 'MES_MODULE_CD', format: 'V', nullable: true , defval: ''} );
        fc_addDataInSettingLov( {object: 'TC_SENDER'  , code: 'SYS_MODULE_CD', format: 'V', nullable: true , defval: ''} );
        fc_addDataInSettingLov( {object: 'TC_RECEIVER', code: 'SYS_MODULE_CD', format: 'V', nullable: true , defval: ''} );
        fc_addDataInSettingLov( {object: 'TC_LOG_TY'  , code: 'INF_SR_TY'    , format: 'V', nullable: true , defval: ''} );
        fc_addDataInSettingLov( {object: 'TC_STS'     , code: 'INF_TC_STS'   , format: 'V', nullable: true , defval: ''} );

        //fc_addDataInSettingLov( {object: gridId+'.INF_TY', code: 'INF_TY'  , format: 'V', nullable: false, defval: ''} );
        fc_addDataInSettingLov( {object: gridId+'.TC_LOG_TY', code: 'INF_SR_TY' , format: 'V', nullable: false, defval: ''} );
        fc_addDataInSettingLov( {object: gridId+'.TC_STS'   , code: 'INF_TC_STS', format: 'V', nullable: false, defval: ''} );

        //fc_setHiddenInCol( gridId, [ 'FMT_ID','TC_OWNER','TC_LOG_CD','TC_TRANS_TY','TC_TRANS_TBL_NM' ] );
        //fc_setAlignInCol ( gridId, [ 'TC_SENDER','TC_RECEIVER','TC_CONTENTS' ], 'left' );
        //fc_setAlignInCol ( gridId, [ 'TC_LOG_TY','TC_STS','TC_ID','TC_DTM','EAI_INF_ID' ], 'center' );
        break;
    case 'TC_LOG_INFO2' : // SCOF0100
        gridId = 'gridTCLog';
        if ( caption_flag ) {
            sCaption = 'TC Log Information';
            sItemCd  = 'CAP_TC_LOG_INFO';
        };
        objItems =  [
                    {caption: 'Datetime'       , name: 'TC_DTM'         , width: 150, datatype: 'text'  , align: 'center' , itemCd: 'CAP_DTM'         , frozen: true },
                    {caption: 'Type'           , name: 'TC_LOG_TY'      , width:  80, datatype: 'lov'   , align: 'center' , itemCd: 'CAP_TY'          , isMultiLanguage: false, frozen: true },
                    {caption: 'Status'         , name: 'TC_STS'         , width: 120, datatype: 'lov'   , align: 'center' , itemCd: 'CAP_STS'         , isMultiLanguage: false, frozen: true },
                    {caption: 'TC ID'          , name: 'TC_ID'          , width:  70, datatype: 'text'  , align: 'center' , frozen: true },
                    {caption: 'Interface ID'   , name: 'EAI_INF_ID'     , width: 120, datatype: 'text'  , align: 'center' , frozen: true },
                    {caption: 'Format ID'      , name: 'FMT_ID'         , width: 220, datatype: 'text' },
                    {caption: 'Sender'         , name: 'TC_SENDER'      , width:  80, datatype: 'text'  , align: 'center' , itemCd: 'CAP_SENDER'},
                    {caption: 'Receiver List'  , name: 'TC_RECEIVER'    , width:  80, datatype: 'text'  , align: 'center'},
                    {caption: 'Content'        , name: 'TC_CONTENTS'    , width: 150, datatype: 'text'  , itemCd: 'CONTENTS'},
                    {caption: 'Remarks'        , name: 'REMARKS'        , width: 200, datatype: 'text' },
                    {caption: 'Owner Chain'    , name: 'TC_OWNER'       , width:  90, datatype: 'text'  , align: 'center' , itemCd: 'CAP_OWNER_CHAIN'},
                    {caption: 'Trans Type'     , name: 'TC_TRANS_TY'    , width:  90, datatype: 'text'  , align: 'center'},
                    {caption: 'Map. Table Name', name: 'TC_TRANS_TBL_NM', width:  90, datatype: 'text' },
                    {caption: 'Tclog uniqueID' , name: 'TC_LOG_CD'      , width:  90, datatype: 'text' , hidden: true},
                     {caption: 'I/F Plant Code', name: 'IF_PLANT_CD' , width:  50, datatype: 'text'                , hidden: true },
                     {caption: 'I/F EAI Id', name: 'IF_EAI_ID' , width:  50, datatype: 'text'                      , hidden: true },
                     {caption: 'I/F Seq No', name: 'IF_SEQ_NO' , width:  50, datatype: 'text'                      , hidden: true },
                     {caption: 'Plant Code', name: 'PLANT_CD' , width:  50, datatype: 'text'                      , hidden: true }
                    ];


        fc_addDataInGettedLov ( 'INF_SR_TY'    , {code: 'INF_SR_TY'    , tags: ''   , alias: ''  } );
        fc_addDataInGettedLov ( 'INF_DB_STS'   , {code: 'INF_DB_STS'   , tags: ''   , alias: ''  } );
        //fc_addDataInGettedLov ( 'INF_TY', {code: 'INF_TY', tags: '', alias: ''} );
        fc_addDataInGettedLov ( 'MES_MODULE_CD', {code: 'SYS_MODULE_CD', tags: '', alias: 'MES_MODULE_CD'} );        //OWNER_FORAMAT
        fc_addDataInGettedLov ( 'OWNER_TC'    , {code: 'OWNER_TC2'    , tags: '', alias: 'OWNER_TC'} );
        fc_addDataInGettedLov ( 'PLANT_CD', {code: 'PLANT_CD', tags: '', alias: ''} );
        fc_addDataInGettedLov ( 'SYS_MODULE_CD', {code: 'SYS_MODULE_CD', tags: ''   , alias: 'SYS_MODULE_CD'  } );
        //TC_TRANS_TY


        fc_addDataInSettingLov( {object: 'PLANT_CD'           , code: 'PLANT_CD', format: 'V', nullable: true , defval: ''} );
        fc_addDataInSettingLov( {object: 'TC_OWNER'           , code: 'MES_MODULE_CD', format: 'V', nullable: true , defval: ''} );
        fc_addDataInSettingLov( {object: 'TC_ID' , code: 'OWNER_TC'    , format: 'K:V', nullable: true, defval: ''} );
        fc_addDataInSettingLov( {object: 'TC_SENDER'  , code: 'SYS_MODULE_CD', format: 'V', nullable: true , defval: ''} );
        fc_addDataInSettingLov( {object: 'TC_RECEIVER', code: 'SYS_MODULE_CD', format: 'V', nullable: true , defval: ''} );
        fc_addDataInSettingLov( {object: 'TC_LOG_TY'  , code: 'INF_SR_TY'    , format: 'V', nullable: true , defval: ''} );
        fc_addDataInSettingLov( {object: 'TC_STS'     , code: 'INF_DB_STS'   , format: 'V', nullable: true , defval: ''} );

        //fc_addDataInSettingLov( {object: gridId+'.INF_TY', code: 'INF_TY'  , format: 'V', nullable: false, defval: ''} );
        fc_addDataInSettingLov( {object: gridId+'.TC_LOG_TY', code: 'INF_SR_TY' , format: 'V', nullable: false, defval: ''} );
        fc_addDataInSettingLov( {object: gridId+'.TC_STS'   , code: 'INF_DB_STS', format: 'V', nullable: false, defval: ''} );

        //fc_setHiddenInCol( gridId, [ 'FMT_ID','TC_OWNER','TC_LOG_CD','TC_TRANS_TY','TC_TRANS_TBL_NM' ] );
        //fc_setAlignInCol ( gridId, [ 'TC_SENDER','TC_RECEIVER','TC_CONTENTS' ], 'left' );
        //fc_setAlignInCol ( gridId, [ 'TC_LOG_TY','TC_STS','TC_ID','TC_DTM','EAI_INF_ID' ], 'center' );
        break;
    case 'DB_LOG_DATA_INFO' : // SCOF0120
        gridId = 'gridTCLog';
        if ( caption_flag ) {
            sCaption = 'TC Log Information';
            sItemCd  = 'CAP_TC_LOG_INFO';
        };
        objItems =  [
                     {caption: 'Seq.'      , name: 'ATTR_SEQ'    , width:  40, datatype: 'integer' , itemCd: 'CAP_SEQ'    , frozen: true},
                     {caption: 'E/G'       , name: 'ATTR_TY'     , width:  45, datatype: 'lov'     , itemCd: 'CAP_ATTR_TY', frozen: true },
                     {caption: 'Attr Code' , name: 'ATTR_CD'     , width: 200, datatype: 'text'                           , frozen: true },
                     {caption: 'Name'      , name: 'ATTR_NM'     , width: 200, datatype: 'text'    , itemCd: 'CAP_NM'    },
                     {caption: 'Type'      , name: 'ATTR_DATA_TY', width:  70, datatype: 'lov'     , itemCd: 'DATA_TY'   },
                     {caption: 'Length'    , name: 'ATTR_LTH'    , width:  50, datatype: 'integer' , itemCd: 'CAP_LTH'   },
                     {caption: 'Scale'     , name: 'ATTR_SCALE'  , width:  50, datatype: 'integer' , itemCd: 'DATA_SCALE'},
                     {caption: 'Content'   , name: 'DB2DB_DATA'    , width: 500, datatype: 'text'  , itemCd: 'CONTENTS'},
                     {caption: 'TableNm', name: 'TC_TRANS_TBL_NM' , width:  50, datatype: 'text'                      , hidden: true },
                    ];
        if ( sSubKey == 'LOG' ) { // SCOF0040
            objItems.push( {groupname: 'divSearch2', caption: 'Date'       , name: 'TC_DTM_GR'   , width: 160, datatype: 'daterange', target: ['TC_DTM_FR', 'TC_DTM_TO', 'datetime'], itemCd: 'CAP_DATE'} );
            objItems.push( {groupname: 'divSearch2', caption: 'Type'       , name: 'TC_LOG_TY'   , width: 100, datatype: 'lov' , itemCd: 'CAP_TY'} );
            objItems.push( {groupname: 'divSearch2', caption: 'Status'     , name: 'TC_STS'      , width: 100, datatype: 'lov' , itemCd: 'CAP_STS'} );
            objItems.push( {groupname: 'divSearch2', caption: 'Excetion TC', name: 'TC_EXCEPTION', width: 100, datatype: 'text', itemCd: 'CAP_TC_EXCEPTION'} );
        };

        break;
    case 'IF_LOG_DATA_INFO' : // SCOF0130
        gridId = 'gridTCLog';
        if ( caption_flag ) {
            sCaption = 'TC Log Information';
            sItemCd  = 'CAP_TC_LOG_INFO';
        };
        objItems =  [
                    {caption: 'TC ID'   , name: 'IF_TC_ID'        , width: 100, datatype: 'text' , align: 'center' , frozen: true , isMultiLanguage: false},
                    {caption: '일련번호'   , name: 'TC_LOG_TY'      , width: 100, datatype: 'text' , align: 'center' , frozen: true , isMultiLanguage: false},
                    {caption: '송신일시'   , name: 'TC_STS'         , width: 200, datatype: 'text' , align: 'center' , frozen: true , isMultiLanguage: false},
                    {caption: '수신일시'   , name: 'TC_ID'          , width: 200, datatype: 'text' , align: 'center' , frozen: true , isMultiLanguage: false},
                    {caption: '상태코드'   , name: 'EAI_INF_ID'     , width: 120, datatype: 'text' , align: 'center' , frozen: true , isMultiLanguage: false},
                    {caption: '처리결과'   , name: 'FMT_ID'         , width:'auto', datatype: 'text' , align: 'center' , frozen: true , isMultiLanguage: false}
                    ];


//      fc_addDataInGettedLov ( 'INF_SR_TY'    , {code: 'INF_SR_TY'    , tags: ''   , alias: ''  } );
//      fc_addDataInGettedLov ( 'INF_DB_STS'   , {code: 'INF_DB_STS'   , tags: ''   , alias: ''  } );
//      //fc_addDataInGettedLov ( 'INF_TY', {code: 'INF_TY', tags: '', alias: ''} );
//      fc_addDataInGettedLov ( 'MES_MODULE_CD', {code: 'SYS_MODULE_CD', tags: '', alias: 'MES_MODULE_CD'} );        //OWNER_FORAMAT
//      fc_addDataInGettedLov ( 'OWNER_TC'    , {code: 'OWNER_TC2'    , tags: '', alias: 'OWNER_TC'} );
//      fc_addDataInGettedLov ( 'PLANT_CD', {code: 'PLANT_CD', tags: '', alias: ''} );
//      fc_addDataInGettedLov ( 'SYS_MODULE_CD', {code: 'SYS_MODULE_CD', tags: ''   , alias: 'SYS_MODULE_CD'  } );
        //TC_TRANS_TY


//      fc_addDataInSettingLov( {object: 'PLANT_CD'           , code: 'PLANT_CD', format: 'V', nullable: true , defval: ''} );
//      fc_addDataInSettingLov( {object: 'TC_OWNER'           , code: 'MES_MODULE_CD', format: 'V', nullable: true , defval: ''} );
//      fc_addDataInSettingLov( {object: 'TC_ID' , code: 'OWNER_TC'    , format: 'K:V', nullable: true, defval: ''} );
//      fc_addDataInSettingLov( {object: 'TC_SENDER'  , code: 'SYS_MODULE_CD', format: 'V', nullable: true , defval: ''} );
//      fc_addDataInSettingLov( {object: 'TC_RECEIVER', code: 'SYS_MODULE_CD', format: 'V', nullable: true , defval: ''} );
//      fc_addDataInSettingLov( {object: 'TC_LOG_TY'  , code: 'INF_SR_TY'    , format: 'V', nullable: true , defval: ''} );
//      fc_addDataInSettingLov( {object: 'TC_STS'     , code: 'INF_DB_STS'   , format: 'V', nullable: true , defval: ''} );
//
//      //fc_addDataInSettingLov( {object: gridId+'.INF_TY', code: 'INF_TY'  , format: 'V', nullable: false, defval: ''} );
//      fc_addDataInSettingLov( {object: gridId+'.TC_LOG_TY', code: 'INF_SR_TY' , format: 'V', nullable: false, defval: ''} );
//      fc_addDataInSettingLov( {object: gridId+'.TC_STS'   , code: 'INF_DB_STS', format: 'V', nullable: false, defval: ''} );

        //fc_setHiddenInCol( gridId, [ 'FMT_ID','TC_OWNER','TC_LOG_CD','TC_TRANS_TY','TC_TRANS_TBL_NM' ] );
        //fc_setAlignInCol ( gridId, [ 'TC_SENDER','TC_RECEIVER','TC_CONTENTS' ], 'left' );
        //fc_setAlignInCol ( gridId, [ 'TC_LOG_TY','TC_STS','TC_ID','TC_DTM','EAI_INF_ID' ], 'center' );
        break;
    case 'TC_LOG_INFO_BY_DTM' : // SCOF0060
        gridId = 'gridTCLog';
        if ( caption_flag ) {
            sCaption = 'TC Log for Abnomal Case';
            sItemCd  = 'CAP_TC_LOG_INFO_BY_DTM';
        };
        objItems =  [
                    {caption: 'Create Object' , name: 'DATA_CRE_OBJ', width: 130, datatype: 'text' , itemCd: 'CAP_DATA_CRE_OBJ', frozen: true },
                    {caption: 'Datetime'      , name: 'TC_DTM'      , width: 130, datatype: 'text' , itemCd: 'CAP_DTM'         , frozen: true },
                    {caption: 'Status'        , name: 'TC_STS'      , width:  70, datatype: 'lov'  , itemCd: 'CAP_STS'         , frozen: true },
                    {caption: 'TC ID'         , name: 'TC_ID'       , width:  70, datatype: 'text'                             , frozen: true },
                    {caption: 'Content'       , name: 'TC_CONTENTS' , width: 500, datatype: 'text' , itemCd: 'CONTENTS'},
                    {caption: 'Remarks'       , name: 'REMARKS'     , width: 200, datatype: 'text'},
                    {caption: 'Tclog uniqueID', name: 'TC_LOG_CD'   , width:  90, datatype: 'text'}
                    ];
        fc_addDataInGettedLov( 'INF_TC_STS', {code: 'INF_TC_STS', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: gridId+'.TC_STS', code: 'INF_TC_STS', format: 'V', nullable: false, defval: ''} );

        fc_setAlignInCol ( gridId, [ 'TC_CONTENTS' ], 'left' );
        fc_setAlignInCol ( gridId, [ 'TC_STS','TC_ID','TC_DTM' ], 'center' );
        fc_setHiddenInCol( gridId, ['TC_LOG_CD']);
        break;
    case 'TC_LOG_SUMMARY_INFO' : // SCOF0070
        gridId = 'gridTCLog';
        if ( caption_flag ) {
            sCaption = 'Summary TC Log';
            sItemCd  = 'CAP_TC_LOG_SUMARRY_INFO';
        };
        objItems =  [
                    {caption: 'TC ID'        , name: 'TC_ID'      , width:  70, datatype: 'text'  , frozen: true },
                    {caption: 'Format ID'    , name: 'TC_NM'      , width: 250, datatype: 'text'  , frozen: true },
                    {caption: 'Owner Chain'  , name: 'TC_OWNER'   , width: 130, datatype: 'lov'   , itemCd: 'CAP_OWNER_CHAIN'},
                    {caption: 'Sender'       , name: 'TC_SENDER'  , width: 100, datatype: 'lov'   , itemCd: 'CAP_SENDER'  },
                    {caption: 'Receiver List', name: 'TC_RECEIVER', width: 100, datatype: 'lov'  },
                    {caption: 'Success'      , name: 'SUCCESS_CNT', width: 120, datatype: 'number', itemCd: 'CAP_SUCCESS' },
                    {caption: 'Error'        , name: 'ERROR_CNT'  , width: 120, datatype: 'number', itemCd: 'CAP_ERROR'   },
                    {caption: 'Total'        , name: 'TOT_TC_CNT' , width: 120, datatype: 'number', itemCd: 'CAP_TOT'     },
                    ];

        fc_addDataInGettedLov ( 'PLANT_CD', {code: 'PLANT_CD', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: 'PLANT_CD' , code: 'PLANT_CD', format: 'V', nullable: true , defval: ''} );

        fc_addDataInGettedLov ( 'OWNER_TC', {code: 'OWNER_TC', tags: '', alias: '' });
        fc_addDataInSettingLov( {object: 'TC_ID' , code: 'OWNER_TC', format: 'K:V', nullable: false , defval: ''} );


        fc_addDataInGettedLov( 'MES_MODULE_CD', {code: 'SYS_MODULE_CD', tags: 'SFM', alias: 'MES_MODULE_CD'} );
        fc_addDataInGettedLov( 'SYS_MODULE_CD', {code: 'SYS_MODULE_CD', tags: ''   , alias: ''             } );


        fc_addDataInSettingLov( {object: 'TC_OWNER'           , code: 'MES_MODULE_CD', format: 'V', nullable: true, defval: ''} );
        fc_addDataInSettingLov( {object: gridId+'.TC_OWNER'   , code: 'MES_MODULE_CD', format: 'V', nullable: true, defval: ''} );
        fc_addDataInSettingLov( {object: gridId+'.TC_SENDER'  , code: 'SYS_MODULE_CD', format: 'K', nullable: true, defval: ''} );
        fc_addDataInSettingLov( {object: gridId+'.TC_RECEIVER', code: 'SYS_MODULE_CD', format: 'K', nullable: true, defval: ''} );

        fc_setAlignInCol( gridId, [ 'TC_SENDER','TC_RECEIVER' ], 'left' );
        fc_setAlignInCol( gridId, [ 'TC_ID' ], 'center' );
        break;

    case 'DB2DB_LOG_SUMMARY_INFO' : // SCOF0110
        gridId = 'gridTCLog';
        if ( caption_flag ) {
            sCaption = 'Summary TC Log';
            sItemCd  = 'CAP_TC_LOG_SUMARRY_INFO';
        };
        objItems =  [
                    {caption: '업무구분'  , name: 'TC_OWNER'   , width: 130, align:'center', datatype: 'lov'   , isMultiLanguage: false},       
                    {caption: 'TC ID'   , name: 'TC_ID'      , width:  70, align:'center', datatype: 'text'  , isMultiLanguage: false,},
                    {caption: 'TC 명'    , name: 'TC_NM'      , width: 250, align:'left', datatype: 'text'    , isMultiLanguage: false},
                    {caption: 'TABLE'   , name: 'TABLE_NM'   , width: 250, align:'left', datatype: 'text'    , isMultiLanguage: false},
                    {caption: '송신'     , name: 'TC_SENDER'  , width: 100, align:'center', datatype: 'text'  , isMultiLanguage: false},
                    {caption: '수신'      , name: 'TC_RECEIVER', width: 100, align:'center', datatype: 'text'  , isMultiLanguage: false},
                    {caption: '합계'     , name: 'TOT_CNT' , width: 120, datatype: 'number', isMultiLanguage: false },
                    {caption: '업무송신대기(N)', name: 'N_CNT'  , width: 120, datatype: 'number', isMultiLanguage: false },
                    {caption: '송/수신성공(S)', name: 'S_CNT', width: 120, datatype: 'number', isMultiLanguage: false },
                    {caption: '업무처리완료(Y)', name: 'Y_CNT'  , width: 120, datatype: 'number', isMultiLanguage: false },
                    {caption: '에러(E)'     , name: 'E_CNT'  , width: 120, datatype: 'number', isMultiLanguage: false },
                    
                    ];
// 수정
//      fc_addDataInGettedLov ( 'PLANT_CD', {code: 'PLANT_CD', tags: '', alias: ''} );
//      fc_addDataInSettingLov( {object: 'PLANT_CD' , code: 'PLANT_CD', format: 'V', nullable: true , defval: ''} );
//
//      fc_addDataInGettedLov ( 'OWNER_TC', {code: 'OWNER_TC2', tags: '', alias: 'OWNER_TC' });
//      fc_addDataInSettingLov( {object: 'TC_ID' , code: 'OWNER_TC', format: 'K:V', nullable: false , defval: ''} );
//
//
//      fc_addDataInGettedLov( 'MES_MODULE_CD', {code: 'SYS_MODULE_CD', tags: 'SFM', alias: 'MES_MODULE_CD'} );
//      fc_addDataInGettedLov( 'SYS_MODULE_CD', {code: 'SYS_MODULE_CD', tags: ''   , alias: ''             } );
//
//
//      fc_addDataInSettingLov( {object: 'TC_OWNER'           , code: 'MES_MODULE_CD', format: 'V', nullable: true, defval: ''} );
        fc_addDataInSettingLov( {object: gridId+'.TC_OWNER'   , code: 'CHAIN_CD', format: 'V', nullable: true, defval: ''} );
//      fc_addDataInSettingLov( {object: gridId+'.TC_SENDER'  , code: 'SYS_MODULE_CD', format: 'K', nullable: true, defval: ''} );
//      fc_addDataInSettingLov( {object: gridId+'.TC_RECEIVER', code: 'SYS_MODULE_CD', format: 'K', nullable: true, defval: ''} );
//
//      fc_setAlignInCol( gridId, [ 'TC_SENDER','TC_RECEIVER' ], 'left' );
//      fc_setAlignInCol( gridId, [ 'TC_ID' ], 'center' );
        break;
    case 'TC_SIM_INFO' : // SCOF0050 SCOF0090
        if( sSubKey == 'SCOF0050' ) {
            gridId = 'gridTcSim';
            if ( caption_flag ) {
                sCaption = 'Simulator Business Case Information';
                sItemCd  = 'CAP_SIM_BIZ_CASE_INFO';
            };
            objItems =  [
                        {caption: 'TC ID'           , name: 'TC_ID'      , width:  50, datatype: 'text'},
                        {caption: 'Format ID'       , name: 'FMT_ID'     , width: 200, datatype: 'text'},
                        {caption: 'Simulator Number', name: 'BIZ_CASE_NO', width: 130, datatype: 'text'},
                        {caption: 'Simulator Name'  , name: 'BIZ_CASE_NM', width:  35, datatype: 'text'},
                        {caption: 'Content'         , name: 'TC_CONTENTS', width: 300, datatype: 'text' , itemCd: 'CONTENTS'}
                        ];
            fc_addDataInGettedLov ( 'SYS_MODULE_CD', {code: 'SYS_MODULE_CD', tags: 'SFM', alias: ''} );
            fc_addDataInGettedLov ( 'TC_BIZ_CASE'  , {code: 'TC_BIZ_CASE'  , tags: ''   , alias: '', condition: {'CNT_SIM': attribute1 } } );
            fc_addDataInSettingLov( {object: 'TC_OWNER' , code: 'SYS_MODULE_CD', format: 'V', nullable: true , defval: ''} );
            fc_addDataInSettingLov( {object: 'H_SIMS_NM', code: 'TC_BIZ_CASE'  , format: 'V', nullable: false, defval: ''} );

            fc_setKeysInCol( gridId, [ 'TC_ID','BIZ_CASE_NO' ] );
        } else if( sSubKey == 'SCOF0090' ) {
            gridId = 'gridCase';
            if ( caption_flag ) {
                sCaption = 'Simulator Business Case Name';
                sItemCd  = 'CAP_SIM_BIZ_CASE_NM';
            };
            objItems =  [
                        {caption: 'TC ID'     , name: 'TC_ID'          , width: 100, datatype: 'text'},
                        {caption: 'No'        , name: 'BIZ_CASE_NO'    , width:  50, datatype: 'text', itemCd: 'CAP_NO'     },
                        {caption: 'Name (Now)', name: 'OLD_BIZ_CASE_NM', width: 150, datatype: 'text', itemCd: 'CAP_NM_NOW' },
                        {caption: 'Name (New)', name: 'BIZ_CASE_NM'    , width: 150, datatype: 'text', itemCd: 'CAP_NM_NEW' },
                        ];
        };
        break;
    case 'BULLETIN_LIST' : // SCOZ0010
        gridId = 'gridBulletinList';
        if ( caption_flag ) {
            sCaption = 'Bulletin List';
            sItemCd  = 'CAP_BULLETIN_LIST';
        };
        
        objGrpItems =   [{caption: '공지사항 POP-UP', name: 'GRP_POP'   , align: 'center', isMultiLanguage: false   }
                        ];
                        
        objItems =  [
                    {caption: '등록일시'         , name: 'UPD_TM'             , width: 170, datatype: 'datetime', isMultiLanguage: false},
                    {caption: '등록자'            , name: 'USER_NM'            , width: 170, datatype: 'text' , isMultiLanguage: false  },
                    {caption: 'User ID'        , name: 'USER_ID'            , width: 170, datatype: 'text'    , hidden: true},
                    {caption: 'Sequence'       , name: 'SEQ_NO'             , width: 170, datatype: 'number'  , hidden: true},
                    {caption: '제목'            , name: 'BULLETIN_TITLE'     , width: 400, datatype: 'text'    , isMultiLanguage: false},
                    {caption: '공지여부'           , name: 'PRI_YN'             , width:  70, datatype: 'checkbox' ,group:'GRP_POP' , isMultiLanguage: false    },
                    {caption: '시작일시'         , name: 'VALID_PERIOD_STA_DT', width: 170, datatype: 'datetime'  ,group:'GRP_POP', isMultiLanguage: false   },
                    {caption: '종료일시'         , name: 'VALID_PERIOD_END_DT', width: 170, datatype: 'datetime'  ,group:'GRP_POP', isMultiLanguage: false  },
                    {caption: 'Contents'       , name: 'BULLETIN_CONTENTS'  , width: 300, datatype: 'text'    , itemCd: 'CONTENTS'        , hidden: true},
                    {caption: '첨부파일'         , name: 'ATTCH_FILES'        , width: 120, datatype: 'text'    , isMultiLanguage: false},
                    {caption: 'Dest.'          , name: 'DEST_TY'            , width: 300, datatype: 'text'    , itemCd: 'CAP_DEST'        , hidden: true},
                    {caption: 'Dept.'          , name: 'DEPT_CD_LIST'       , width: 300, datatype: 'text'    , itemCd: 'DEPT_CD'         , hidden: true},
                    {caption: 'Dept.'          , name: 'USE_YN'             , width: 300, datatype: 'text'    , hidden: true},
                    {caption: 'Exists file Cnt', name: 'IS_FILE'            , width: 300, datatype: 'text'    , hidden: true}
                    ];
        fc_setKeysInCol    ( gridId, [ 'USER_ID' ] );
        fc_setRequiredInCol( gridId, [ 'USER_ID' ] );
        fc_setHiddenInCol  ( gridId, [ 'JQX_CB' ] );
        fc_setEditInCol    ( gridId, [ 'PRI_YN','UPD_TM','USER_NM','BULLETIN_TITLE','ATTCH_FILES','SEQ_NO','VALID_PERIOD_STA_DT','VALID_PERIOD_END_DT' ], false );
        break;
    case 'MANUAL_MASTER' : // SCOG0030
        gridId = 'gridManualMaster';
        if ( caption_flag ) {
            sCaption = 'Function List';
            sItemCd  = 'CAP_FUNC_LIST';
        };
        objItems = [
                    {caption: 'Owner Chain'   , name: 'BIZ_CHAIN_CD'     , width:  80, datatype: 'text'    , editable:false , itemCd: 'CAP_OWNER_CHAIN'},
                    {caption: 'File Path'     , name: 'FILE_PATH'        , width: 330, datatype: 'text'    , editable:false},
                    {caption: 'File Name'     , name: 'FILE_NM'          , width: 140, datatype: 'text'    , editable:false},
                    {caption: 'Func. Name'    , name: 'FUNCTION_NM'      , width: 120, datatype: 'text'    , editable:false , hidden: true},
                    {caption: 'Func. Name (with Params)', name: 'FUNCTION_NM_WITH_PARAMS', width: 440, datatype: 'text', editable:false , itemCd: 'CAP_FUNCTION_NM_WITH_PARAMS'},
                    {caption: 'Func. Desc.'   , name: 'FUNCTION_DESC'    , width: 200, datatype: 'text'    , editable:false , hidden: false  },
                    {caption: 'Func. Contents', name: 'FUNCTION_CONTENTS', width: 100, datatype: 'text'    , editable:false , hidden: true   },
                    {caption: 'Line'          , name: 'LINE_NO'          , width:  50, datatype: 'number'  , editable:false , itemCd: 'CAP_LINE'             },
                    {caption: 'Saved Func. ?' , name: 'FUNCTION_SAVE_YN' , width: 110, datatype: 'checkbox', editable:false , itemCd: 'CAP_FUNCTION_SAVE_YN' },
                    {caption: 'Saved Params ?', name: 'PARAM_SAVE_YN'    , width: 110, datatype: 'checkbox', editable:false , itemCd: 'CAP_PARAM_SAVE_YN'    },
                    {caption: 'Return ?'      , name: 'RETURN_YN'        , width:  80, datatype: 'checkbox', editable:false , itemCd: 'CAP_RETURN_YN', hidden: true},
                    {caption: 'Return Desc.'  , name: 'RETURN_DESC'      , width: 100, datatype: 'text'    , editable:false , hidden: true },
                    {caption: 'Used Example'  , name: 'USED_EXAM'        , width: 100, datatype: 'text'    , editable:false , hidden: true }
                    ];
        fc_addDataInGettedLov ( 'BIZ_CHAIN_CD', {code: 'BIZ_CHAIN_CD', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: 'BIZ_CHAIN_CD', code: 'BIZ_CHAIN_CD', format: 'V', nullable: false, defval: 'SCO'} );

        fc_setKeysInCol ( gridId, [ 'BIZ_CHAIN_CD','FUNCTION_NM' ] );
        fc_setUpperInCol( gridId, [ 'BIZ_CHAIN_CD' ] );
        fc_setAlignInCol( gridId, [ 'BIZ_CHAIN_CD' ], 'center' );
        break;
    case 'MANUAL_FILE' : // SCOG0030
        gridId = 'gridFile';
        if ( caption_flag ) {
            sCaption = 'File List';
            sItemCd  = 'CAP_FILE_LIST';
        };
        objItems =  [
                    {caption: 'File Path', name: 'FILE_FULL_PATH', width: 100, datatype: 'text', itemCd: 'FILE_PATH'     },
                    {caption: 'File Text', name: 'FILE_TEXT'     , width: 570, datatype: 'text', itemCd: 'CAP_FILE_TEXT' },
                   ];
        break;
    case 'MANUAL_PARAMS' : // SCOG0030
        gridId = 'gridManualParams';
        if ( caption_flag ) {
            sCaption = 'Parameter List';
            sItemCd  = 'CAP_PARAM_LIST';
        };
        objItems = [
                    {caption: 'Function Name' , name: 'FUNCTION_NM' , width:   0, datatype: 'text'  , hidden: true},
                    {caption: 'Owner Chain'   , name: 'BIZ_CHAIN_CD', width:   0, datatype: 'text'  , itemCd: 'CAP_OWNER_CHAIN', hidden: true},
                    {caption: 'Parameter Seq.', name: 'PARAM_SEQ'   , width:   0, datatype: 'number', hidden: true },
                    {caption: 'Name'          , name: 'PARAM_NM'    , width: 100, datatype: 'text'  , itemCd: 'CAP_NM'   },
                    {caption: 'Description'   , name: 'PARAM_DESC'  , width: 270, datatype: 'text'  , itemCd: 'CAP_DESC' }
                   ];
        fc_setHiddenInCol( gridId, [ 'JQX_CB' ] );
        fc_setEditInCol  ( gridId, [ 'PARAM_NM' ], false );
        break;
    case 'MANUAL_PARAMS_ALL' : // SCOG0030
        gridId = 'gridManualParamsAll';
        if ( caption_flag ) {
            sCaption = 'Parameter List (All)';
            sItemCd  = 'CAP_PARAM_LIST_ALL';
        };
        objItems =  [
                    {caption: 'Function Name' , name: 'FUNCTION_NM' , width:   0, datatype: 'text'                             , hidden: false },
                    {caption: 'Owner Chain'   , name: 'BIZ_CHAIN_CD', width:   0, datatype: 'text'  , itemCd: 'CAP_OWNER_CHAIN', hidden: false },
                    {caption: 'Parameter Seq.', name: 'PARAM_SEQ'   , width:   0, datatype: 'number'                           , hidden: false },
                    {caption: 'Name'          , name: 'PARAM_NM'    , width: 100, datatype: 'text'  , itemCd: 'CAP_NM'},
                    {caption: 'Description'   , name: 'PARAM_DESC'  , width: 270, datatype: 'text'  , itemCd: 'CAP_DESC'}
                    ];
        break;
    case 'MENU_INFO': // SCOE0050
        gridId = 'gridMenuInfo';
        if ( caption_flag ) {
            sCaption = 'Menu Info';
            sItemCd  = 'CAP_MNU_INFO';
        };
        objItems =  [
                    {caption: 'Menu Name'   , name: 'MNU_NM'    , width: 500, datatype: 'text'   },
                    {caption: 'Menu ID'     , name: 'MNU_ID'    , width:  90, datatype: 'text'   },
                    {caption: 'Group Y/N'   , name: 'MNU_GRP_YN', width:  90, datatype: 'checkbox', itemCd: 'CAP_GROUP_YN' },
                    {caption: 'Program ID'  , name: 'PGM_ID'    , width:  90, datatype: 'text'   },
                    {caption: 'Program Name', name: 'PGM_NM'    , width: 500, datatype: 'text'    , itemCd : 'SCR_NM'      },
                    {caption: 'Menu Code'   , name: 'MNU_CD'    , width: 100, datatype: 'text'    , hidden:true }
                    ];
        break;
    case 'MAST_CODE_HIST' : // SCOB0040
        gridId = 'gridCodeMasterHistory';
        if ( caption_flag ) {
            sCaption = 'Code Master Information History';
            sItemCd  = 'CAP_MASTER_HIST_INFO';
        };
        objGrpItems =   [
                        {caption: 'Change', name: 'CHANGE', align: 'center', itemCd: 'CAP_CHANGE' }
                        ];
        objItems =  [
                    {caption: 'Biz.Chain'  , name: 'BIZ_CHAIN_CD', width:  70, datatype: 'text' },
                    {caption: 'Master Code', name: 'MASTER_CD'   , width: 200, datatype: 'text' },
                    {caption: 'Master Name', name: 'MASTER_NM'   , width: 300, datatype: 'text' },
                    {caption: 'Description', name: 'MASTER_DESC' , width: 300, datatype: 'text' },
                    ];
        fc_setAlignInCol( gridId, [ 'BIZ_CHAIN_CD' ], 'center' );
        break;
    case 'MAST_CODE_DETAIL_HIST' : // SCOB0040
        gridId = 'gridCodeDetailHistory';
        if ( caption_flag ) {
            sCaption = 'Code Detail Information History';
            sItemCd  = 'CAP_CODE_HIST_INFO';
        };
        objGrpItems =   [
                        {caption: 'Change'   , name: 'CHANGE', align: 'center', itemCd: 'CAP_CHANGE'},
                        {caption: 'Attribute', name: 'ATTR'  , align: 'center'}
                        ];
        objItems =  [
                    {caption: 'Change time', name: 'CHANGE_TM'     , width: 135, datatype: 'text'     , group: 'CHANGE', itemCd : 'CAP_TIME' },
                    {caption: 'Change time', name: 'CHANGE_TY'     , width: 100, datatype: 'text'     , group: 'CHANGE', itemCd : 'CHANGE_TY'},
                    {caption: 'Change time', name: 'CHANGE_OBJ_ID' , width: 135, datatype: 'text'     , group: 'CHANGE', itemCd : 'CAP_OBJ'  },
                    {caption: 'Change time', name: 'CHANGE_USER_ID', width: 135, datatype: 'text'     , group: 'CHANGE', itemCd : 'USER_ID'  },
                    {caption: 'Change time', name: 'CHANGE_USER_NM', width: 135, datatype: 'text'     , group: 'CHANGE', itemCd : 'USER_NM'  },
                    {caption: 'Master Code', name: 'MASTER_CD'     , width: 180, datatype: 'text'    },
                    {caption: 'Code Value' , name: 'CD_VAL'        , width: 200, datatype: 'text'    },
                    {caption: 'Seq.'       , name: 'DISP_SEQ'      , width:  70, datatype: 'integer'  , itemCd: 'CAP_SEQ'  },
                    {caption: 'Tags'       , name: 'TAGS'          , width: 200, datatype: 'text'    },
                    {caption: 'Use ?'      , name: 'USE_YN'        , width:  50, datatype: 'checkbox'},
                    {caption: 'Attribute1' , name: 'ATTR1'         , width: 150, datatype: 'text'     , group: 'ATTR'      },
                    {caption: 'Attribute2' , name: 'ATTR2'         , width: 150, datatype: 'text'     , group: 'ATTR'      },
                    {caption: 'Attribute3' , name: 'ATTR3'         , width: 150, datatype: 'text'     , group: 'ATTR'      },
                    {caption: 'Code Name'  , name: 'CD_NM'         , width: 350, datatype: 'text'    },
                    {caption: 'Description', name: 'CD_DESC'       , width: 350, datatype: 'text'     , itemCd: 'CAP_DESC' },
                    {caption: 'Remarks'    , name: 'REMARKS'       , width: 150, datatype: 'text'    },
                    ];
        break;
    case 'SYS_ENV_LAYOUT' : // SCOG0010
    case 'SYS_ENV_FORMAT' : // SCOG0010
    case 'SYS_ENV_SEPARATOR' : // SCOG0010
    case 'SYS_ENV_LANG'      : // SCOG0010
    case 'SYS_ENV_COM_BIZ'   : // SCOG0010
        objItems =  [
                    {caption: 'Code Remarks'            , name: 'REMARKS', width: 150, datatype: 'text'     , itemCd: 'CAP_DESC'},
                    {caption: 'System Environment Code' , name: 'ENV_CD' , width: 100, datatype: 'text'    },
                    {caption: 'System Environment Value', name: 'ENV_VAL', width: 100, datatype: 'text'    },
                    {caption: 'Use Yes or No'           , name: 'USE_YN' , width:  80, datatype: 'checkbox'},
                    {caption: 'Environment type'        , name: 'ENV_TY' , width:  80, datatype: 'text'     , hidden: true }
                    ];
        if ( sSubKey == 'LAYOUT' ) {
            gridId = 'gridLayout';
            if ( caption_flag ) {
                sCaption = 'Layout';
                sItemCd  = 'CAP_LAYOUT';
            };
        } else if ( sSubKey == 'FORMAT' ) {
            gridId = 'gridFormat';
            if ( caption_flag ) {
                sCaption = 'Format';
                sItemCd  = 'CAP_FMT';
            };
        } else if ( sSubKey == 'SEPARATOR' ) {
            gridId = 'gridSeparator';
            if ( caption_flag ) {
                sCaption = 'Separator';
                sItemCd  = 'CAP_SEPARATOR';
            };
        } else if ( sSubKey == 'LANG' ) {
            gridId = 'gridLang';
            if ( caption_flag ) {
                sCaption = 'Language';
                sItemCd  = 'CAP_LANG';
            };
        } else if ( sSubKey == 'COM_BIZ' ) {
            gridId = 'gridComBiz';
            if ( caption_flag ) {
                sCaption = 'Common Biz';
                sItemCd  = 'CAP_COM_BIZ';
            };
        };
        fc_setKeysInCol    ( gridId, [ 'ENV_CD' ] );
        fc_setRequiredInCol( gridId, [ 'REMARKS','ENV_CD','ENV_VAL' ] );
        fc_setUpperInCol   ( gridId, [ 'ENV_CD','ENV_VAL' ] );
        break;
    case 'MENU_CHILD_INFO': // SCOC0030
        gridId = 'gridChild';
        if ( caption_flag ) {
            sCaption = 'Menu child info';
            sItemCd  = 'CAP_MNU_CHILD_INFO';
        };
        objItems =  [
                    {caption: 'Menu Name'       , name: 'MNU_NM'       , width:'auto', datatype: 'text'      },
                    {caption: 'Group ? '        , name: 'MNU_GRP_YN'   , width: 100, datatype: 'checkbox'   , itemCd: 'CAP_GROUP_YN'},
                    {caption: 'Menu ID'         , name: 'MNU_ID'       , width: 150, datatype: 'text'       , readonly: true },
                    {caption: 'Sequence'        , name: 'DISP_SEQ'     , width:  70, datatype: 'integer'    , itemCd: 'CAP_SEQ' },
                    {caption: 'Program ID'      , name: 'PGM_ID'       , width: 150, datatype: 'popup'     },
                    {caption: 'Use ?'           , name: 'USE_YN'       , width:  80, datatype: 'checkbox'  },
                    {caption: 'Param1'          , name: 'MNU_PARAM1'   , width:  80, datatype: 'text'       , itemCd: 'CAP_PARAM1' },
                    {caption: 'Param2'          , name: 'MNU_PARAM2'   , width:  80, datatype: 'text'       , itemCd: 'CAP_PARAM2' },
                    {caption: 'Param3'          , name: 'MNU_PARAM3'   , width:  80, datatype: 'text'       , itemCd: 'CAP_PARAM3' },
                    {caption: 'Parent Menu Code', name: 'PARENT_MNU_CD', width: 100, datatype: 'text'      },
                    {caption: 'Menu Owner ID'   , name: 'OWNER_ID'     , width: 100, datatype: 'text'      },
                    {caption: 'Menu Code'       , name: 'MNU_CD'       , width: 100, datatype: 'text'      },
                    ];
        fc_setHiddenInCol  ( gridId, [ 'PARENT_MNU_CD','OWNER_ID','MNU_CD' ], false );
        fc_setEditInCol    ( gridId, [ 'MNU_ID' ], false );
        fc_setUpperInCol   ( gridId, [ 'MNU_ID','PGM_ID' ] );
        fc_setAlignInCol   ( gridId, [ 'MNU_ID'   ], 'center' );
        fc_setAlignInCol   ( gridId, [ 'DISP_SEQ' ], 'right'  );
        fc_setRequiredInCol( gridId, [ 'DISP_SEQ' ] );

        fc_addMultiItem( {itemCd:'SCR_ID'} );
        fc_addMultiItem( {itemCd:'SCR_NM'} );
        fc_addMultiItem( {itemCd:'PGM_TY'} );
        fc_addCodeList  ( {object: gridId+'.PGM_ID', code: 'SCREEN_CD_LIST', title: 'Screen List', manKey: '' }, { itemCd: 'CAP_SCR_INFO', itemValue: 0 } );
        break;
    case 'USER_ROLE_MENU_IN':     // SCOC0040
    case 'USER_ROLE_MENU_EX_TMP': // SCOC0040
    case 'USER_ROLE_MENU_EX':     // SCOC0040
        if( sSubKey == 'IN' ) {
            gridId = 'gridScreenIn';
            if ( caption_flag ) {
                sCaption = 'Menu Information (Inclusion)';
                sItemCd  = 'CAP_MNU_INFO_IN';
            };
        } else if( sSubKey == 'EX' ){
            gridId = 'gridScreenEx';
            if ( caption_flag ) {
                sCaption = 'Menu Information (Exclusion)';
                sItemCd  = 'CAP_MNU_INFO_EX';
            };
        };
        objGrpItems =   [
                        {caption: 'Screen Function', name: 'SCR_BUTTON_GRP' , align: 'center', itemCd: 'CAP_SCR_FUNC'},
                        {caption: 'Custom Function', name: 'CUST_BUTTON_GRP', align: 'center', itemCd: 'CAP_CUST_FUNC'}
                        ];
        objItems =  [
                    {caption: 'ADD_FL'       , name: 'ADD_FL'       , width:  80, datatype: 'text'    , hidden:true       },
                    {caption: 'MAPPING_ID'   , name: 'MAPPING_ID'   , width:  80, datatype: 'text'    , hidden:true       },
                    {caption: 'Name'         , name: 'MNU_NM'       , width: 300, datatype: 'text'    , itemCd: 'CAP_NM'  },
                    {caption: 'ID'           , name: 'SCR_ID'       , width:  80, datatype: 'text'    , itemCd: 'CAP_ID'  },
                    {caption: 'Biz Chain'    , name: 'BIZ_CHAIN_CD' , width: 100, datatype: 'lov'    },
                    {caption: 'Search'       , name: 'SEARCH_YN'    , width:  60, datatype: 'checkbox', itemCd: 'CAP_SEARCH', group: 'SCR_BUTTON_GRP'  },
                    {caption: 'Save'         , name: 'SAVE_YN'      , width:  60, datatype: 'checkbox', itemCd: 'CAP_SAVE'  , group: 'SCR_BUTTON_GRP'  },
                    {caption: 'Delete'       , name: 'DELETE_YN'    , width:  60, datatype: 'checkbox', itemCd: 'CAP_DELETE', group: 'SCR_BUTTON_GRP'  },
                    {caption: 'Confirm'      , name: 'CONF_YN'      , width:  60, datatype: 'checkbox', itemCd: 'CAP_CONF'  , group: 'SCR_BUTTON_GRP'  },
                    {caption: 'Custom1'      , name: 'CUST1_YN'     , width:  80, datatype: 'checkbox', itemCd: 'CAP_BTN1'  , group: 'CUST_BUTTON_GRP' },
                    {caption: 'Custom2'      , name: 'CUST2_YN'     , width:  80, datatype: 'checkbox', itemCd: 'CAP_BTN2'  , group: 'CUST_BUTTON_GRP' },
                    {caption: 'Custom3'      , name: 'CUST3_YN'     , width:  80, datatype: 'checkbox', itemCd: 'CAP_BTN3'  , group: 'CUST_BUTTON_GRP' },
                    {caption: 'Custom4'      , name: 'CUST4_YN'     , width:  80, datatype: 'checkbox', itemCd: 'CAP_BTN4'  , group: 'CUST_BUTTON_GRP' },
                    {caption: 'Custom5'      , name: 'CUST5_YN'     , width:  80, datatype: 'checkbox', itemCd: 'CAP_BTN5'  , group: 'CUST_BUTTON_GRP' },
                    {caption: 'Custom6'      , name: 'CUST6_YN'     , width:  80, datatype: 'checkbox', itemCd: 'CAP_BTN6'  , group: 'CUST_BUTTON_GRP' },
                    {caption: 'Custom7'      , name: 'CUST7_YN'     , width:  80, datatype: 'checkbox', itemCd: 'CAP_BTN7'  , group: 'CUST_BUTTON_GRP' },
                    {caption: 'Custom8'      , name: 'CUST8_YN'     , width:  80, datatype: 'checkbox', itemCd: 'CAP_BTN8'  , group: 'CUST_BUTTON_GRP' },
                    {caption: 'Custom9'      , name: 'CUST9_YN'     , width:  80, datatype: 'checkbox', itemCd: 'CAP_BTN9'  , group: 'CUST_BUTTON_GRP' },
                    {caption: 'Custom10'     , name: 'CUST10_YN'    , width:  80, datatype: 'checkbox', itemCd: 'CAP_BTN10'  , group: 'CUST_BUTTON_GRP' },
                    {caption: 'Program Type' , name: 'SCR_TY'       , width: 100, datatype: 'lov'     , itemCd: 'PGM_TY'   },
                    {caption: 'MNU_ID'       , name: 'MNU_ID'       , width:  80, datatype: 'text'    , hidden:true },
                    {caption: 'MNU_CD'       , name: 'MNU_CD'       , width:  80, datatype: 'text'    , hidden:true },
                    {caption: 'PARENT_MNU_CD', name: 'PARENT_MNU_CD', width:  80, datatype: 'text'    , hidden:true },
                    {caption: 'DISABLE_Y'    , name: 'DISABLE_Y'    , width:  80, datatype: 'checkbox', hidden:true },
                    {caption: 'Search'       , name: 'DEF_SEARCH_YN', width:  60, datatype: 'checkbox', hidden:true },
                    {caption: 'Save'         , name: 'DEF_SAVE_YN'  , width:  60, datatype: 'checkbox', hidden:true },
                    {caption: 'Delete'       , name: 'DEF_DELETE_YN', width:  60, datatype: 'checkbox', hidden:true },
                    {caption: 'Confirm'      , name: 'DEF_CONF_YN'  , width:  60, datatype: 'checkbox', hidden:true },
                    {caption: 'Custom1'      , name: 'DEF_CUST1_YN' , width:  60, datatype: 'checkbox', hidden:true },
                    {caption: 'Custom2'      , name: 'DEF_CUST2_YN' , width:  60, datatype: 'checkbox', hidden:true },
                    {caption: 'Custom3'      , name: 'DEF_CUST3_YN' , width:  60, datatype: 'checkbox', hidden:true },
                    {caption: 'Custom4'      , name: 'DEF_CUST4_YN' , width:  60, datatype: 'checkbox', hidden:true },
                    {caption: 'Custom5'      , name: 'DEF_CUST5_YN' , width:  60, datatype: 'checkbox', hidden:true },
                    {caption: 'Custom6'      , name: 'DEF_CUST6_YN' , width:  60, datatype: 'checkbox', hidden:true },
                    {caption: 'Custom7'      , name: 'DEF_CUST7_YN' , width:  60, datatype: 'checkbox', hidden:true },
                    {caption: 'Custom8'      , name: 'DEF_CUST8_YN' , width:  60, datatype: 'checkbox', hidden:true },
                    {caption: 'Custom9'      , name: 'DEF_CUST9_YN' , width:  60, datatype: 'checkbox', hidden:true },
                    {caption: 'Custom10'     , name: 'DEF_CUST10_YN', width:  60, datatype: 'checkbox', hidden:true }
                    ];
        fc_setEditInCol ( gridId, [ 'MNU_NM', 'SCR_ID', 'BIZ_CHAIN_CD' ], false );
        // exclusion
        if( sSubKey == 'EX' ){
            fc_addDataInGettedLov ( 'BIZ_CHAIN_CD', {code: 'BIZ_CHAIN_CD', tags: ''    , alias: ''} );
            fc_addDataInGettedLov ( 'PGM_TY'      , {code: 'PGM_TY'      , tags: 'MENU', alias: ''} );
            fc_addDataInSettingLov( {object: 'BIZ_CHAIN_CD', code: 'BIZ_CHAIN_CD', format: 'V', nullable: true, defval: ''} );
            fc_addDataInSettingLov( {object: 'PGM_TY'      , code: 'PGM_TY'      , format: 'V', nullable: true, defval: ''} );

            fc_addDataInGettedLov ( 'USER_TY', {code: 'USER_TY', tags: '', alias: ''} );
            fc_addDataInSettingLov( {object: 'USER_TY', code: 'USER_TY', format: 'V', nullable: true, defval: ''} );

            fc_setEditInCol( gridId, [ 'SEARCH_YN','SAVE_YN','DELETE_YN','CONF_YN','CUST1_YN','CUST2_YN','CUST3_YN','CUST4_YN','CUST5_YN','CUST6_YN','CUST7_YN','CUST8_YN','CUST9_YN','CUST10_YN','SCR_TY' ], false );
            fc_setKeysInCol( gridId, [ 'MNU_ID','ADD_FL','MAPPING_ID' ] );
        } else {// inclusion
            fc_setKeysInCol( gridId, [ 'MNU_ID','ADD_FL','MAPPING_ID'] );
            fc_setEditInCol( gridId, [ 'SCR_TY' ], false );
        };
        fc_addDataInSettingLov( {object: gridId+'.SCR_TY'      , code: 'PGM_TY'      , format: 'V', nullable: true , defval: ''   } );
        fc_addDataInSettingLov( {object: gridId+'.BIZ_CHAIN_CD', code: 'BIZ_CHAIN_CD', format: 'V', nullable: false, defval: 'SCO'} );
        break;
    case 'BATCH_JOB_SCH': // SCOG0060
        gridId = 'gridBatchJob';
        if ( caption_flag ) {
            sCaption = 'Batch Job Scheduler Management';
            sItemCd  = 'CAP_BATCH_JOB_SCH_MGT';
        };
        objGrpItems =   [
                        {caption: 'PL/SQL package'        , name: 'ORA_PLSQL'     , align: 'center', itemCd: 'CAP_ORA_PLSQL'     },
                        {caption: 'Glue Framework Service', name: 'GLUE_FRAMEWORK', align: 'center', itemCd: 'CAP_GLUE_FRAMEWORK'}
                        ];
        objItems =  [
                    {caption: 'BatchId'       , name: 'BATCH_ID'     , width: 100, datatype: 'text'},
                    {caption: 'BatchJobType'  , name: 'BATCH_TYPE'   , width: 140, datatype: 'lov' },
                    {caption: 'PackageName'   , name: 'PKG_VAL'      , width: 120, datatype: 'text' , group: 'ORA_PLSQL'      },
                    {caption: 'ProcedureName' , name: 'PROC_VAL'     , width: 120, datatype: 'text' , group: 'ORA_PLSQL'      },
                    {caption: 'ServiceName'   , name: 'SERVICE_NM'   , width: 150, datatype: 'text' , group: 'GLUE_FRAMEWORK' },
                    {caption: 'TransitionName', name: 'TRANSITION_NM', width: 120, datatype: 'text' , group: 'GLUE_FRAMEWORK' },
                    {caption: 'DaoValue'      , name: 'DAO_VAL'      , width: 100, datatype: 'lov'  , group: 'GLUE_FRAMEWORK' },
                    {caption: 'TimeOption'    , name: 'TIME_VAL'     , width: 150, datatype: 'text'},
                    {caption: 'Batch Owner'   , name: 'BATCH_OWNER'  , width: 140, datatype: 'lov'  , itemCd: 'CAP_OWNER_CHAIN'},
                    {caption: 'UseY/N'        , name: 'USE_YN'       , width:  80, datatype: 'checkbox'},
                    {caption: 'Remarks'       , name: 'REMARKS'      , width: 150, datatype: 'text' }
                    ];
        fc_addDataInGettedLov( 'BATCH_TYPE'    , {code: 'BATCH_TYPE'    , tags: '', alias: ''} );
        fc_addDataInGettedLov( 'BIZ_CHAIN_CD'  , {code: 'BIZ_CHAIN_CD'  , tags: '', alias: ''} );
        fc_addDataInGettedLov( 'DAO_SERVICE_CD', {code: 'DAO_SERVICE_CD', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: gridId+'.BATCH_TYPE' , code: 'BATCH_TYPE'    , format: 'V', nullable: false, defval: ''} );
        fc_addDataInSettingLov( {object: gridId+'.BATCH_OWNER', code: 'BIZ_CHAIN_CD'  , format: 'V', nullable: false, defval: ''} );
        fc_addDataInSettingLov( {object: gridId+'.DAO_VAL'    , code: 'DAO_SERVICE_CD', format: 'V', nullable: false, defval: ''} );
        fc_addDataInSettingLov( {object: 'BATCH_OWNER'        , code: 'BIZ_CHAIN_CD'  , format: 'V', nullable: true , defval: ''} );

        fc_setKeysInCol     ( gridId, [ 'BATCH_ID'] );
        fc_setRequiredInCol ( gridId, [ 'BATCH_ID','BATCH_TYPE','TIME_VAL','BATCH_OWNER' ] );
        fc_setUpperInCol    ( gridId, [ 'BATCH_ID' ] );
        fc_setMaxLengthInCol( gridId, [ 'BATCH_ID','PKG_VAL','PROC_VAL','SERVICE_NM','TRANSITION_NM','DAO_VAL','TIME_VAL' ], [ 20,30,30,50,30,20,100 ] )
        break;
    case 'BATCH_JOB_SCH_LOG_MAST': // SCOG0070
        gridId = 'gridBatchJobLogMast';
        if ( caption_flag ) {
            sCaption = 'Batch Job Log Master';
            sItemCd  = 'CAP_BATCH_JOB_SCH_LOG_MAST';
        };
        objGrpItems =   [
                        {caption: 'Execution Information', name: 'BATCH_EXE_INFO', align: 'center', itemCd: 'CAP_BATCH_EXE_INFO'},
                        ];
        objItems =  [
                    {caption: 'BatchId'          , name: 'BATCH_ID'          , width: 140, datatype: 'text' },
                    {caption: 'Execution Program', name: 'CALL_PGM'          , width: 200, datatype: 'text'  , itemCd: 'CAP_PROGRAM'        , group: 'BATCH_EXE_INFO' },
                    {caption: 'enabled'          , name: 'ENABLED'           , width:  80, datatype: 'text'  , itemCd: 'CAP_ENABLED'        , group: 'BATCH_EXE_INFO' },
                    {caption: 'Create Dtm'       , name: 'JOB_START_DTM'     , width: 130, datatype: 'text'  , itemCd: 'CAP_START'          , group: 'BATCH_EXE_INFO' },
                    {caption: 'Last Excute Dtm'  , name: 'JOB_LAST_START_DTM', width: 130, datatype: 'text'  , itemCd: 'CAP_LAST_START'     , group: 'BATCH_EXE_INFO' },
                    {caption: 'Next Excute Dtm'  , name: 'JOB_NEXT_RUN_DATE' , width: 130, datatype: 'text'  , itemCd: 'CAP_NEXT_RUN'       , group: 'BATCH_EXE_INFO' },
                    {caption: 'Run Count'        , name: 'RUN_COUNT'         , width: 100, datatype: 'number', itemCd: 'CAP_RUN_COUNT'      , group: 'BATCH_EXE_INFO' },
                    {caption: 'Fail Count'       , name: 'FAILURE_COUNT'     , width: 110, datatype: 'number', itemCd: 'CAP_FAILURE_COUNT'  , group: 'BATCH_EXE_INFO' },
                    {caption: 'Repeat Interval'  , name: 'REPEAT_INTERVAL'   , width: 230, datatype: 'text'  , itemCd: 'CAP_REPEAT_INTERVAL', group: 'BATCH_EXE_INFO' },
                    {caption: 'Remarks'          , name: 'COMMENTS'          , width: 200, datatype: 'text'  , itemCd: 'REMARKS'            , group: 'BATCH_EXE_INFO' },
                    {caption: 'Batch Owner'      , name: 'BATCH_OWNER'       , width: 100, datatype: 'lov'  },
                    {caption: 'BatchJobType'     , name: 'BATCH_TYPE'        , width: 140, datatype: 'lov'  }
                    ];
        fc_setAlignInCol( gridId, ['JOB_START_DTM','JOB_LAST_START_DTM','JOB_NEXT_RUN_DATE' ], 'center');
        break;
    case 'BATCH_JOB_SCH_LOG_DTL': // SCOG0070
        gridId = 'gridBatchJobLogDtl';
        if ( caption_flag ) {
            sCaption = 'Batch Job Log Details';
            sItemCd  = 'CAP_BATCH_JOB_SCH_LOG_DTL';
        };
        objItems =  [
                    {caption: 'Unique identifier of the log entry'  , name: 'LOG_ID'           , width:  80, datatype: 'text', itemCd: 'CAP_LOG_ID'           },
                    {caption: 'Date of the log entry'               , name: 'LOG_DATE'         , width: 140, datatype: 'text', itemCd: 'CAP_LOG_DATE'         },
                    {caption: 'Status of the job run'               , name: 'BATCH_RESULT'     , width: 100, datatype: 'lov' , itemCd: 'CAP_BATCH_RESULT'     },
                    {caption: 'Requested start date of the job run' , name: 'REQ_START_DATE'   , width: 140, datatype: 'text', itemCd: 'CAP_REQ_START_DATE'   },
                    {caption: 'Actual date on which the job was run', name: 'ACTUAL_START_DATE', width: 140, datatype: 'text', itemCd: 'CAP_ACTUAL_START_DATE'},
                    {caption: 'Duration of the job run'             , name: 'RUN_DURATION'     , width: 130, datatype: 'text', itemCd: 'CAP_RUN_DURATION'     },
                    {caption: 'Session identifier of the job run'   , name: 'SESSION_ID'       , width: 100, datatype: 'text', itemCd: 'CAP_SESSION_ID'       },
                    {caption: 'Additional Info. on the job run, if applicable', name: 'REMARKS', width: 200, datatype: 'text'                           },
                    {caption: 'Owner of the Scheduler job'          , name: 'JOB_OWNER'        , width: 150, datatype: 'text', itemCd: 'CAP_JOB_OWNER'        }
                    ];
        fc_addDataInGettedLov( 'BATCH_TYPE' , {code: 'BATCH_TYPE', tags: '', alias: ''} );
        fc_addDataInGettedLov( 'BIZ_CHAIN_CD', {code: 'BIZ_CHAIN_CD', tags: '', alias: ''} );
        fc_addDataInGettedLov( 'BATCH_RESULT', {code: 'BATCH_RESULT', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: 'gridBatchJobLogMast.BATCH_TYPE' , code: 'BATCH_TYPE'  , format: 'V', nullable: false, defval: ''} );
        fc_addDataInSettingLov( {object: 'gridBatchJobLogMast.BATCH_OWNER', code: 'BIZ_CHAIN_CD', format: 'V', nullable: false, defval: ''} );
        fc_addDataInSettingLov( {object: gridId+'.BATCH_RESULT', code: 'BATCH_RESULT', format: 'V', nullable: false, defval: ''} );
        fc_addDataInSettingLov( {object: 'BATCH_OWNER'         , code: 'BIZ_CHAIN_CD', format: 'V', nullable: true , defval: ''} );
        fc_addDataInSettingLov( {object: 'BATCH_RESULT'        , code: 'BATCH_RESULT', format: 'V', nullable: true , defval: ''} );

        fc_setAlignInCol( gridId, ['LOG_DATE','BATCH_RESULT','REQ_START_DATE','ACTUAL_START_DATE' ], 'center');
        break;
    case 'BATCH_JOB_SCH_LOG_MAST_0140': // SCOG0140
        gridId = 'gridBatchJobLogMast';
        if ( caption_flag ) {
            sCaption = 'Batch Job Log Master';
            sItemCd  = 'CAP_BATCH_JOB_SCH_LOG_MAST';
        };
        
        objItems =  [
                    {caption: '업무구분  '         , name: 'BIZ_CHAIN_CD'      , width: 100     , datatype: 'text'      , align:'center'    , isMultiLanguage: false},
                    {caption: 'Serivce ID'      , name: 'SERVICE_ID'        , width: 200    , datatype: 'text'      , align:'left'      , isMultiLanguage: false},
                    {caption: 'Transaction ID'  , name: 'TRANSITION_ID'     , width: 'auto' , datatype: 'text'      , align:'left'      , isMultiLanguage: false},
                    {caption: '실행횟수'        , name: 'BATCH_SEQ_CNT'     , width: 100    , datatype: 'number'    , align:'center'    , isMultiLanguage: false},
                    {caption: '평균동작시간(초)'   , name: 'BATCH_RUN_TM_AVG'  , width: 110    , datatype: 'number'    , align:'center'    , isMultiLanguage: false},
                    {caption: 'BATCH_DTM_FROM'  , name: 'BATCH_DTM_FROM'    , width: 100    , datatype: 'text'      , hidden:true},
                    {caption: 'BATCH_DTM_TO'    , name: 'BATCH_DTM_TO'      , width: 100    , datatype: 'text'      , hidden:true}
                    ];
        //fc_setAlignInCol( gridId, ['JOB_START_DTM','JOB_LAST_START_DTM','JOB_NEXT_RUN_DATE' ], 'center');
        break;
    case 'BATCH_JOB_SCH_LOG_DTL_0140': // SCOG0140
        gridId = 'gridBatchJobLogDtl';
        if ( caption_flag ) {
            sCaption = 'Batch Job Log Details';
            sItemCd  = 'CAP_BATCH_JOB_SCH_LOG_DTL';
        };
        objItems =  [
                    {caption: 'SEQ'         , name: 'BATCH_SEQ'         , width: 70     , datatype: 'text'      , align:'center'    , isMultiLanguage: false},
                    {caption: '상태'          , name: 'BATCH_STATUS'      , width: 100    , datatype: 'text'      , align:'center'    , isMultiLanguage: false},
                    {caption: '시작시간'        , name: 'BATCH_START_DTM'   , width: 150    , datatype: 'text'      , align:'center'    , isMultiLanguage: false},
                    {caption: '종료시간'        , name: 'BATCH_END_DTM'     , width: 150    , datatype: 'text'      , align:'center'    , isMultiLanguage: false},
                    {caption: '동작시간(초)' , name: 'BATCH_RUN_TM'      , width: 100    , datatype: 'number'    , align:'center'    , isMultiLanguage: false},
                    {caption: '메세지'        , name: 'BATCH_MESSAGE'     , width: 'auto'  , datatype: 'text'      , align:'left'      , isMultiLanguage: false}
                    ];
        
        //fc_setAlignInCol( gridId, ['BATCH_SEQ','BATCH_STATUS','BATCH_START_DTM','BATCH_END_DTM' ,'BATCH_RUN_TM'], 'center');
        break;
    case 'REPORT_INFO' : // SCOC0020
        gridId = 'gridReportInfo';
        if ( caption_flag ) {
            sCaption = 'Report Management';
            sItemCd  = 'CAP_REPORT_INFO';
        };
        objItems =  [
                    {caption: 'ReportId'         , name: 'REPORT_ID'   , width:  80, datatype: 'text'  , maxlength : 20, frozen: true},
                    {caption: 'ReportName'       , name: 'REPORT_NM'   , width: 200, datatype: 'text'  , frozen: true},
                    {caption: 'BizChain'         , name: 'BIZ_CHAIN_CD', width: 110, datatype: 'lov'  },
                    {caption: 'ResultType'       , name: 'RESULT_TYPE' , width: 200, datatype: 'lov'  },
                    {caption: 'SqlKeyValue'      , name: 'SQLKEY_VAL'  , width: 120, datatype: 'text'  , hidden: true},
                    {caption: 'PackageName'      , name: 'PKG_VAL'     , width: 200, datatype: 'text' },
                    {caption: 'Use Yes or No'    , name: 'USE_YN'      , width: 100, datatype: 'checkbox' },
                    {caption: 'PaperSize'        , name: 'PAPER_SIZE'  , width: 100, datatype: 'lov'  },
                    {caption: 'PrintDirection'   , name: 'PAPER_DIRECT', width: 100, datatype: 'lov'  },
                    {caption: 'DaoValue'         , name: 'DAO_VAL'     , width: 100, datatype: 'lov'  },
                    {caption: 'ReportDescription', name: 'REPORT_DESC' , width: 'auto', datatype: 'text' }
                    ];
        fc_addDataInGettedLov( 'BIZ_CHAIN_CD'  , {code: 'BIZ_CHAIN_CD'  , tags: '', alias: ''} );
        fc_addDataInGettedLov( 'RESULT_TYPE'   , {code: 'RESULT_TYPE'   , tags: '', alias: ''} );
        fc_addDataInGettedLov( 'PAPER_SIZE'    , {code: 'PAPER_SIZE'    , tags: '', alias: ''} );
        fc_addDataInGettedLov( 'PAPER_DIRECT'  , {code: 'PAPER_DIRECT'  , tags: '', alias: ''} );
        fc_addDataInGettedLov( 'DAO_SERVICE_CD', {code: 'DAO_SERVICE_CD', tags: '', alias: ''} );

        fc_addDataInSettingLov( {object: 'BIZ_CHAIN_CD'        , code: 'BIZ_CHAIN_CD'  , format: 'V', nullable: true , defval: ''} );
        fc_addDataInSettingLov( {object: gridId+'.BIZ_CHAIN_CD', code: 'BIZ_CHAIN_CD'  , format: 'V', nullable: false, defval: ''} );
        fc_addDataInSettingLov( {object: gridId+'.PAPER_SIZE'  , code: 'PAPER_SIZE'    , format: 'V', nullable: true , defval: ''} );
        fc_addDataInSettingLov( {object: gridId+'.PAPER_DIRECT', code: 'PAPER_DIRECT'  , format: 'V', nullable: true , defval: ''} );
        fc_addDataInSettingLov( {object: gridId+'.DAO_VAL'     , code: 'DAO_SERVICE_CD', format: 'V', nullable: false, defval: ''} );
        fc_addDataInSettingLov( {object: gridId+'.RESULT_TYPE' , code: 'RESULT_TYPE'   , format: 'V', nullable: false, defval: ''} );

        fc_setUpperInCol   ( gridId, [ 'REPORT_ID' ] );
        fc_setKeysInCol    ( gridId, [ 'REPORT_ID' ] );
        fc_setRequiredInCol( gridId, ['REPORT_ID','REPORT_NM','BIZ_CHAIN_CD','RESULT_TYPE' ] );
        break;
    case 'SCREEN_HMI_INFO' : // SCOC0090
        gridId = 'gridScreenHmiInfo';
        if ( caption_flag ) {
            sCaption = 'Screen Hmi Management';
            sItemCd  = 'CAP_SCREEN_HMI_INFO';
        };
        objItems =  [
                    {caption: '화면ID'            , name: 'HMI_ID'     , width: 100       , datatype: 'text'      , isMultiLanguage: false    ,align:'center'},
                    {caption: '화면명'             , name: 'HMI_NM'     , width: 300       , datatype: 'text'      , isMultiLanguage: false },
                    {caption: '사용여부'            , name: 'USE_YN'     , width: 70        , datatype: 'checkbox'  , isMultiLanguage: false },
                    {caption: '화면URL'           , name: 'HMI_URL'    , width: 300       , datatype: 'text'      , isMultiLanguage: false },
                    {caption: '분할화면1'           , name: 'ATTR1'      , width: 100       , datatype: 'text'      , isMultiLanguage: false    ,align:'center' },
                    {caption: '분할화면2'           , name: 'ATTR2'      , width: 100       , datatype: 'text'      , isMultiLanguage: false    ,align:'center' },
                    {caption: '분할화면3'           , name: 'ATTR3'      , width: 100       , datatype: 'text'      , isMultiLanguage: false    ,align:'center' },
                    {caption: '분할화면4'           , name: 'ATTR4'      , width: 100       , datatype: 'text'      , isMultiLanguage: false    ,align:'center' },
                    {caption: 'ATTR5'           , name: 'ATTR5'      , width: 0         , datatype: 'text'      , hidden: true },
                    {caption: '비고'              , name: 'HMI_DESC'   , width: 'auto'    , datatype: 'text'      , isMultiLanguage: false }
                    ];
        
        fc_setUpperInCol   ( gridId, [ 'HMI_ID' ] );
        fc_setKeysInCol    ( gridId, [ 'HMI_ID' ] );
        fc_setRequiredInCol( gridId, ['HMI_ID','HMI_NM'] );
        break;
    case  'DATA_UPLOAD_MASTER' : // SCOG0090
        gridId = 'gridUploadInfo';
        if ( caption_flag ) {
            sCaption = 'Upload Infomation';
            sItemCd  = 'CAP_REPORT_INFO';
        };
        objGrpItems =   [
                        {caption: 'Upload Data'   , name: 'DATA_UPLOAD_INFO', align: 'center', itemCd: 'CAP_DATA_UPLOAD_INFO'},
                        {caption: 'PL/SQL package', name: 'ORA_PLSQL'       , align: 'center', itemCd: 'CAP_ORA_PLSQL'}
                        ];
        objItems =  [
                    {caption: 'Upload Id'    , name: 'UPLOAD_ID'   , width: 120, datatype: 'text' , itemCd: 'CAP_ID'    , group: 'DATA_UPLOAD_INFO'  , uppercase: true, maxlength : 20 },
                    {caption: 'Upload Name'  , name: 'UPLOAD_NM'   , width: 200, datatype: 'text' , itemCd: 'CAP_NAME'  , group: 'DATA_UPLOAD_INFO' },
                    {caption: 'PackageName'  , name: 'PKG_VAL'     , width: 150, datatype: 'text'                       , group: 'ORA_PLSQL' },
                    {caption: 'ProcedureName', name: 'PROC_VAL'    , width: 150, datatype: 'text'                       , group: 'ORA_PLSQL' },
                    {caption: 'Biz Chain'    , name: 'BIZ_CHAIN_CD', width: 100, datatype: 'lov' },
                    ];
        fc_setKeysInCol( gridId, [ 'UPLOAD_ID' ] );

        fc_addDataInGettedLov( 'BIZ_CHAIN_CD', {code: 'BIZ_CHAIN_CD', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: gridId+'.BIZ_CHAIN_CD', code: 'BIZ_CHAIN_CD', format: 'V', nullable: true, defval: ''} );
        fc_addDataInSettingLov( {object:         'BIZ_CHAIN_CD', code: 'BIZ_CHAIN_CD', format: 'V', nullable: true, defval: ''} );

        fc_setRequiredInCol( gridId, [ 'UPLOAD_ID','BIZ_CHAIN_CD','PKG_VAL','PROC_VAL','UPLOAD_NM' ] );
        break;
    case  'DATA_UPLOAD_DETAIL' : // SCOG0090
        gridId = 'gridUploadItems';
        if ( caption_flag ) {
            sCaption = 'Set Upload Items';
            sItemCd  = 'CAP_REPORT_INFO';
        };
        objGrpItems =   [
                        {caption: 'Item', name: 'ITEM_CD_GRP', align: 'center', itemCd: 'CAP_ITEM'},
                        {caption: 'Data', name: 'DATA_TY_GRP', align: 'center', itemCd: 'CAP_DATA'}
                        ];
        objItems =  [
                    {caption: 'Code'     , name: 'ITEM_CD'   , width: 220, datatype: 'text'    , itemCd: 'CAP_CD'  , group: 'ITEM_CD_GRP' },
                    {caption: 'Name'     , name: 'ITEM_NM'   , width: 250, datatype: 'text'    , itemCd: 'CAP_NM'  , group: 'ITEM_CD_GRP' },
                    {caption: 'Type'     , name: 'DATA_TY'   , width: 100, datatype: 'lov'     , itemCd: 'CAP_TY'  , group: 'DATA_TY_GRP' },
                    {caption: 'Null'     , name: 'NULL_YN'   , width:  60, datatype: 'checkbox'                    , group: 'DATA_TY_GRP'  , isMultiLanguage: false },
                    {caption: 'Length'   , name: 'DATA_LTH'  , width:  60, datatype: 'integer' , itemCd: 'CAP_LTH' , group: 'DATA_TY_GRP' },
                    {caption: 'Scale'    , name: 'DATA_SCALE', width:  60, datatype: 'integer'                     , group: 'DATA_TY_GRP' },
                    {caption: 'Seq.'     , name: 'DISP_SEQ'  , width:  70, datatype: 'integer' , itemCd: 'CAP_SEQ'},
                    {caption: 'Upload Id', name: 'UPLOAD_ID' , width: 120, datatype: 'text'    , itemCd: 'CAP_ID' }
                    ];
        fc_addDataInGettedLov( 'DATA_TY', {code: 'DATA_TY', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: gridId+'.DATA_TY' , code: 'DATA_TY', format: 'V', nullable: true, defval: ''} );

        fc_setKeysInCol    ( gridId, [ 'ITEM_CD' ] );
        fc_setUpperInCol   ( gridId, [ 'ITEM_CD' ] );
        fc_setAlignInCol   ( gridId, [ 'DATA_TY' ], 'center' );
        fc_setRequiredInCol( gridId, [ 'ITEM_CD','ITEM_NM','DATA_TY','DATA_LTH','DISP_SEQ' ] );
        break;
    case 'UPLOAD_ITEM_INFO': // SCOG0100
        gridId = 'gridItem';
        if ( caption_flag ) {
            sCaption = 'Item Information';
            sItemCd  = 'CAP_ITEM_INFO';
        };
        objGrpItems =   [
                        {caption: 'Data'  , name: 'DATA_TY_GRP', align: 'center', itemCd: 'CAP_DATA'},
                        {caption: 'Parent', name: 'PARENT_GRP' , align: 'center', itemCd: 'CAP_PAR'}
                        ];
        objItems =  [
                    {caption: 'Code'  , name: 'ITEM_CD'   , width: 260, datatype: 'text'   , group: 'ITEM_CD_GRP'},
                    {caption: 'Name'  , name: 'ITEM_NM'   , width: 320, datatype: 'text'   , group: 'ITEM_CD_GRP'},
                    {caption: 'Type'  , name: 'DATA_TY'   , width: 100, datatype: 'lov'    , group: 'DATA_TY_GRP' , itemCd: 'CAP_TY' },
                    {caption: 'Length', name: 'DATA_LTH'  , width:  60, datatype: 'integer', group: 'DATA_TY_GRP' , itemCd: 'CAP_LTH'},
                    {caption: 'Scale' , name: 'DATA_SCALE', width:  60, datatype: 'integer', group: 'DATA_TY_GRP'}
                    ];
        fc_addDataInGettedLov( 'DATA_TY', {code: 'DATA_TY', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: gridId+'.DATA_TY', code: 'DATA_TY' , format: 'V', nullable: true, defval: ''} );

        fc_setUpperInCol   ( gridId, [ 'ITEM_CD' ] );
        fc_setAlignInCol   ( gridId, [ 'DATA_TY' ], 'center' );
        fc_setRequiredInCol( gridId, [ 'ITEM_CD','ITEM_NM','DATE_TY','DATA_LTH' ] );
        break;
    case 'FUNCTION_MASTER': // SCOZ0050
        gridId = 'gridMaster';
        if ( caption_flag ) {
            sCaption = 'Master Grid';
            sItemCd  = '';
        };
        objGrpItems =   [
                         {caption: 'Master', name: 'MASTER', width: 200, datatype: 'text'}
                        ];
        objItems =  [
                     {caption: 'FunctionID'   , name: 'FUNC_ID'  , width: 160, datatype: 'text'}
                    ,{caption: 'File Name'    , name: 'FILE_NM'  , width: 170, datatype: 'text'}
                    ,{caption: 'Function DESC', name: 'FUNC_DESC', width: 310, datatype: 'text'}
                    ,{caption: 'Retrun Y/N'   , name: 'RTN_YN'   , width: 100, datatype: 'checkbox', align: 'center', hidden: true }
                    ,{caption: 'Rerurn Desc'  , name: 'RTN_DESC' , width: 200, datatype: 'text'    , hidden: true }
                    ,{caption: 'Used Exam'    , name: 'USED_EXAM', width: 300, datatype: 'text'    , hidden: true }
                    ,{caption: 'Sys Y/N'      , name: 'SYS_YN'   , width: 50 , datatype: 'checkbox', align: 'center', hidden: true }
                    ,{caption: 'Tags'         , name: 'TAGS'     , width: 300, datatype: 'text'    , hidden: true }
                    ,{caption: 'ParamCNT'     , name: 'PARAM_CNT', width: 100, datatype: 'text'    , hidden: true }
                    ];
        break;
    case 'FUNCTION_PARAMS': // SCOZ0050
        gridId = 'gridParams';
        if ( caption_flag ) {
            sCaption = 'Params Infomation';
            sItemCd  = 'CAP_PARAM_LIST';
        };
        objGrpItems =   [
                         {caption: 'Details', name: 'MASTER', width: 200, datatype: 'text'}
                        ];
        objItems =  [
                     {caption: 'ParamSeq' , name: 'PARAM_SEQ' , width:  50, datatype: 'text', itemCd: 'CAP_SEQ_NO', align: 'center', readonly: true}
                    ,{caption: 'ParamName', name: 'PARAM_NM'  , width: 200, datatype: 'text', itemCd: 'CAP_NAME'  , readonly: true}
                    ,{caption: 'ParamDESC', name: 'PARAM_DESC', width: 470, datatype: 'text', itemCd: 'CAP_DESC'}
                    ,{caption: 'FuncID'   , name: 'FUNC_ID'   , width: 100, datatype: 'text', hidden: true }
                    ];
        fc_setRequiredInCol( gridId, [ 'FUNC_ID','PARAM_NM','PARAM_SEQ' ] );
        break;
    case 'DEVELOPER_INFO': // SCOZ0070
        gridId = 'gridTable';
        if ( caption_flag ) {
            sCaption = '';
            sItemCd  = '';
        };
        objItems =  [
                    {caption: 'Owner'      , name: 'OWNER'      , width: 100, datatype: 'text' , hidden: true },
                    {caption: 'Table'      , name: 'TABLE_NM'   , width: 230, datatype: 'text'},
                    {caption: 'Description', name: 'TABLE_DESC' , width: 280, datatype: 'text' , itemCd: 'CAP_DESC'},
                    ];
        break;
    case 'FIND_COLUMN': // SCOZ0080
        gridId = 'gridColumn';
        if ( caption_flag ) {
            sCaption = 'Column Information';
            sItemCd  = 'CAP_COLUMN_INFO';
        };
        objItems =  [
                    {caption: 'Owner'   , name: 'OWNER'       , width: 100, datatype: 'text'    , itemCd: 'CAP_OWNER'    },
                    {caption: 'Table'   , name: 'TABLE_NM'    , width: 200, datatype: 'text'   },
                    {caption: 'Name'    , name: 'COLUMN_NM'   , width: 200, datatype: 'text'    , itemCd: 'CAP_COLUMN_NM'},
                    {caption: 'Type'    , name: 'DATA_TY'     , width: 120, datatype: 'text'   },
                    {caption: 'Not Null', name: 'NOT_NULL'    , width:  70, datatype: 'checkbox', itemCd: 'CAP_NOT_NULL' },
                    {caption: 'Default' , name: 'DATA_DEFAULT', width: 100, datatype: 'text'    , itemCd: 'CAP_DEFAULT'  },
                    {caption: 'Comments', name: 'COMMENTS'    , width: 300, datatype: 'text'    , itemCd: 'CAP_COMMENT'  },
                    ];
        break;
    case 'FIND_SOURCE': // SCOZ0090
        gridId = 'gridObject';
        if ( caption_flag ) {
            sCaption = 'Used Object Information';
            sItemCd  = 'CAP_USE_OBJ_INFO';
        };
        objItems =  [
                    {caption: 'Count', name: 'HIT_CNT', width:  50, datatype: 'integer', frozen: true, itemCd: 'CAP_COUNT'    },
                    {caption: 'Name' , name: 'OBJ_NM' , width: 230, datatype: 'text'   , frozen: true, itemCd: 'CAP_NAME', uppercase: true },
                    {caption: 'Type' , name: 'OBJ_TY' , width: 150, datatype: 'text'                 , itemCd: 'CAP_TYPE', uppercase: true },
                    ];
        break;
    case 'FIND_SOURCE_DETAIL': // SCOZ0090
        gridId = 'gridSource';
        if ( caption_flag ) {
            sCaption = '';
            sItemCd  = '';
        };
        objItems =  [
                    {caption: 'Line', name: 'OBJ_LN'  , width:  50, datatype: 'integer', itemCd: 'CAP_LINE', frozen: true },
                    {caption: 'Text', name: 'OBJ_TEXT', width: 800, datatype: 'text'   , itemCd: 'CAP_TEXT'},
                    ];
        break;
    case 'REQ_MASTER': // SCOZ0100
        gridId = 'gridReqMaster';
        if ( caption_flag ) {
            sCaption = '';
            sItemCd  = '';
        };
        objItems =  [
                    {caption: 'Req. ID'  , name: 'REQ_ID'     , width:  60, datatype: 'text'  , frozen: true },
                    {caption: 'Status'   , name: 'REQ_STS'    , width: 100, datatype: 'lov'  },
                    {caption: 'Title'    , name: 'REQ_TITLE'  , width: 200, datatype: 'text'  , frozen: true },
                    {caption: 'Requester', name: 'REQ_USER_ID', width:  50, datatype: 'text'  , frozen: true  , itemCd:'CAP_REQ_USER' },
                    ];
        fc_addDataInGettedLov ( 'REQ_USER', {code: 'REQ_USER', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: gridId+'.REQ_USER_ID', code: 'REQ_USER', format: 'V', nullable: true, defval: ''} );
        fc_addDataInGettedLov ( 'REQ_STS', {code: 'REQ_STS', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: gridId+'.REQ_STS', code: 'REQ_STS', format: 'V', nullable: true, defval: ''} );
    case 'REQ_INQ': // SCOZ0110
        gridId = 'gridReqMaster';
        if ( caption_flag ) {
            sCaption = '';
            sItemCd  = '';
        };
        objItems =  [
                    {caption: 'Req. ID'      , name: 'REQ_ID'         , width:  60, datatype: 'text'     , frozen: true },
                    {caption: 'Status'       , name: 'REQ_STS'        , width: 100, datatype: 'lov'     },
                    {caption: 'Title'        , name: 'REQ_TITLE'      , width: 200, datatype: 'text'     , frozen: true },
                    {caption: 'Requester'    , name: 'REQ_USER_ID'    , width:  50, datatype: 'text'     , frozen: true, itemCd:'CAP_REQ_USER' },
                    {caption: 'Req. Dept'    , name: 'REQ_DEPT'       , width: 100, datatype: 'lov'     },
                    {caption: 'Req. Date'    , name: 'REQ_RCV_DT'     , width: 100, datatype: 'date'    },
                    {caption: 'Context'      , name: 'REQ_CONTENTS'   , width: 100, datatype: 'text'    },
                    {caption: 'Progress'     , name: 'REQ_PROGRESS'   , width: 100, datatype: 'text'    },
                    {caption: 'Ref. Doc'     , name: 'REQ_REF_DOC'    , width: 100, datatype: 'text'    },
                    {caption: 'Charger'      , name: 'REQ_CHARGE_ID'  , width: 100, datatype: 'lov'     },
                    {caption: 'Charg. Dept'  , name: 'REQ_CHARGE_DEPT', width: 100, datatype: 'lov'     },
                    {caption: 'Plan End Date', name: 'PLAN_END_DT'    , width: 100, datatype: 'date'    },
                    {caption: 'End Date'     , name: 'END_DT'         , width: 100, datatype: 'date'    },
                    {caption: 'Delayed'      , name: 'DELAY_DAYS'     , width:  80, datatype: 'integer' },
                    ];
        fc_addDataInGettedLov ( 'REQ_USER', {code: 'REQ_USER', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: gridId+'.REQ_USER_ID'  , code: 'REQ_USER', format: 'V', nullable: true, defval: ''} );
        fc_addDataInSettingLov( {object: gridId+'.REQ_CHARGE_ID', code: 'REQ_USER', format: 'V', nullable: true, defval: ''} );
        fc_addDataInGettedLov ( 'REQ_STS', {code: 'REQ_STS', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: gridId+'.REQ_STS', code: 'REQ_STS', format: 'V', nullable: true, defval: ''} );

        fc_addDataInGettedLov( 'REQ_DEPT', {code: 'REQ_DEPT', tags: '', alias: ''} );
        fc_addDataInSettingLov( {object: gridId+'.REQ_DEPT'       , code: 'REQ_DEPT', format: 'V', nullable: true, defval: ''} );
        fc_addDataInSettingLov( {object: gridId+'.REQ_CHARGE_DEPT', code: 'REQ_DEPT', format: 'V', nullable: true, defval: ''} );
        break;
    case 'REQ_INQ_SUM': // SCOZ0110
        gridId = 'gridReqMasterSum';
        if ( caption_flag ) {
            sCaption = '';
            sItemCd  = '';
        };
        objItems =  [
                    {caption: 'Charg. Dept', name: 'REQ_CHARGE_DEPT', width: 100, datatype: 'text'    , frozen: true  , hidden: true },
                    {caption: 'Charger'    , name: 'REQ_CHARGE_ID'  , width: 100, datatype: 'text'    , frozen: true },
                    {caption: 'Accept'     , name: 'STS_REGISTER'   , width: 100, datatype: 'integer' , itemCd: 'CAP_REGIST'  },
                    {caption: 'Accept'     , name: 'STS_ACCEPT'     , width: 100, datatype: 'integer' , itemCd: 'CAP_ACCEPT'  },
                    {caption: 'Accept'     , name: 'STS_PENDING'    , width: 100, datatype: 'integer' , itemCd: 'CAP_PENDING' },
                    {caption: 'Accept'     , name: 'STS_WORK'       , width: 100, datatype: 'integer' , itemCd: 'CAP_WORK'    },
                    {caption: 'Accept'     , name: 'STS_FINISH'     , width: 100, datatype: 'integer' , itemCd: 'CAP_FINISH'  },
                    {caption: 'Accept'     , name: 'STS_CANCEL'     , width: 100, datatype: 'integer' , itemCd: 'CAP_CANCEL'  },
                    {caption: 'Accept'     , name: 'STS_ISSUE'      , width: 100, datatype: 'integer' , itemCd: 'CAP_ISSUE'   },
                    {caption: 'Accept'     , name: 'STS_SUM1'       , width: 100, datatype: 'integer' , itemCd: 'CAP_SUM'     },
                    {caption: 'Accept'     , name: 'STS_ING'        , width: 100, datatype: 'integer' , itemCd: 'CAP_ING'     },
                    {caption: 'Accept'     , name: 'STS_END'        , width: 100, datatype: 'integer' , itemCd: 'CAP_END'     },
                    {caption: 'Accept'     , name: 'STS_SUM2'       , width: 100, datatype: 'integer' , itemCd: 'CAP_SUM'     },
                    ];
        break;
    case 'BIZ_RULE' : // SCOG0120

        var hiddenFlag = false;
        if ( !fc_isNull( attribute1 ) ) {
            hiddenFlag = true;
        };
        gridKey = sKey+"_"+sSubKey;

        if ( sSubKey == 'MASTER' ) {
            gridId = 'gridBizRuleMaster';
            if ( caption_flag ) {
                sCaption = 'Business Rule Master';
                sItemCd  = 'CAP_BIZ_RULE_MASTER';
            };
            objItems =  [
                        {caption: 'Rule ID'         , name: 'RULE_ID'     , width: 100, datatype: 'text'      , frozen: true, maxlength: 8 },
                        {caption: 'Rule Name'       , name: 'RULE_NM'     , width: 200, datatype: 'text'     },
                        {caption: 'Use YN'          , name: 'USE_YN'      , width:  50, datatype: 'checkbox' },
                        {caption: 'Remarks'         , name: 'REMARKS'     , width: 100, datatype: 'text'     },
                        //{caption: 'Condition Count' , name: 'COND_CNT'     , width: 100, datatype: 'integer'     , hidden: true},
                        //{caption: 'Result Count'    , name: 'RSLT_CNT'     , width: 100, datatype: 'integer'     , hidden: true}
                        ];
            fc_setKeysInCol    ( gridId, [ 'RULE_ID' ] );
            fc_setUpperInCol   ( gridId, [ 'RULE_ID' ] );
            fc_setAlignInCol   ( gridId, [ 'USE_YN' ], 'center' );
            fc_setRequiredInCol( gridId, [ 'RULE_ID','RULE_NM' ] );
        }else if(sSubKey == 'ATTR'){
            gridId = 'gridBizRuleStr';
            if ( caption_flag ) {
                sCaption = 'Business Rule Structure';
                sItemCd  = 'CAP_BIZ_RULE_STR';
            };

            objItems =  [
                        {caption: 'Rule ID'       , name: 'RULE_ID'     , width: 100, datatype: 'text'      , hidden: true },
                        {caption: 'Key Yes or No' , name: 'KEY_YN'      , width: 100, datatype: 'text'      , hidden: true },
                        {caption: 'Attr. Name(CN)', name: 'ATTR_CD'     , width: 100, datatype: 'text'     },
                        {caption: 'Attr. Name(CN)', name: 'ATTR_NM'     , width: 100, datatype: 'text'     },
                        {caption: 'Key Yes or No' , name: 'KEY_YN_CHK'  , width: 100, datatype: 'checkbox' },
                        {caption: 'Attr. Seq'     , name: 'ATTR_SEQ'    , width: 100, datatype: 'integer'  },
                        {caption: 'Data Type'     , name: 'ATTR_DATA_TY', width: 100, datatype: 'lov'      },
                        {caption: 'Data Precision', name: 'ATTR_LTH'    , width: 100, datatype: 'integer'  },
                        {caption: 'Data Scale'    , name: 'ATTR_SCALE'  , width: 100, datatype: 'integer'  },
                        {caption: 'Remarks'       , name: 'REMARKS'     , width: 100, datatype: 'text'     }
                        ];
            fc_setKeysInCol    ( gridId, [ 'RULE_ID','ATTR_CD' ] );
            fc_setRequiredInCol( gridId, [ 'RULE_ID','ATTR_SEQ','ATTR_CD' ] );

            fc_addDataInGettedLov ( 'DATA_TY', {code: 'DATA_TY', tags: '', alias: '' } );
            fc_addDataInSettingLov( {object: gridId+'.ATTR_DATA_TY', code: 'DATA_TY' , format: 'V', nullable: false , defval: ''} );
        } else if ( sSubKey == 'DATA' ) {
            gridId = 'gridBizRuleData';
            if ( caption_flag ) {
                sCaption = 'Business Rule Data';
                sItemCd  = 'CAP_BIZ_RULE_DATA';
            };
            objGrpItems =   [
                        {caption: 'Condition'   , name: 'GRP_COND', align: 'center', itemCd: 'CAP_COND'  },
                        {caption: 'Result'      , name: 'GRP_RSLT', align: 'center', itemCd: 'CAP_RSLT'}
                        ];
            objItems =  [
                        {caption: 'Rule ID'    , name: 'RULE_ID'        , width: 100, datatype: 'text'    , hidden: true },
                        {caption: 'Sequence'   , name: 'SEQ'            , width:  50, datatype: 'integer'},
                        {caption: 'Condition 1', name: 'BIZ_RULE_COND1' , width: 100, datatype: 'text'    , group: 'GRP_COND'},
                        {caption: 'Condition 2', name: 'BIZ_RULE_COND2' , width: 100, datatype: 'text'    , group: 'GRP_COND'},
                        {caption: 'Condition 3', name: 'BIZ_RULE_COND3' , width: 100, datatype: 'text'    , group: 'GRP_COND'},
                        {caption: 'Condition 4', name: 'BIZ_RULE_COND4' , width: 100, datatype: 'text'    , group: 'GRP_COND'},
                        {caption: 'Condition 5', name: 'BIZ_RULE_COND5' , width: 100, datatype: 'text'    , group: 'GRP_COND'},
                        {caption: 'Condition 6', name: 'BIZ_RULE_COND6' , width: 100, datatype: 'text'    , group: 'GRP_COND' , hidden: true },
                        {caption: 'Condition 7', name: 'BIZ_RULE_COND7' , width: 100, datatype: 'text'    , group: 'GRP_COND' , hidden: true },
                        {caption: 'Condition 8', name: 'BIZ_RULE_COND8' , width: 100, datatype: 'text'    , group: 'GRP_COND' , hidden: true },
                        {caption: 'Condition 9', name: 'BIZ_RULE_COND9' , width: 100, datatype: 'text'    , group: 'GRP_COND' , hidden: true },
                        {caption: 'Condition 0', name: 'BIZ_RULE_COND10', width: 100, datatype: 'text'    , group: 'GRP_COND' , hidden: true },
                        {caption: 'Result 1'   , name: 'BIZ_RULE_RSLT1' , width: 100, datatype: 'text'    , group: 'GRP_RSLT'},
                        {caption: 'Result 2'   , name: 'BIZ_RULE_RSLT2' , width: 100, datatype: 'text'    , group: 'GRP_RSLT'},
                        {caption: 'Result 3'   , name: 'BIZ_RULE_RSLT3' , width: 100, datatype: 'text'    , group: 'GRP_RSLT'},
                        {caption: 'Result 4'   , name: 'BIZ_RULE_RSLT4' , width: 100, datatype: 'text'    , group: 'GRP_RSLT'},
                        {caption: 'Result 5'   , name: 'BIZ_RULE_RSLT5' , width: 100, datatype: 'text'    , group: 'GRP_RSLT'},
                        {caption: 'Result 6'   , name: 'BIZ_RULE_RSLT6' , width: 100, datatype: 'text'    , group: 'GRP_RSLT' , hidden: true },
                        {caption: 'Result 7'   , name: 'BIZ_RULE_RSLT7' , width: 100, datatype: 'text'    , group: 'GRP_RSLT' , hidden: true },
                        {caption: 'Result 8'   , name: 'BIZ_RULE_RSLT8' , width: 100, datatype: 'text'    , group: 'GRP_RSLT' , hidden: true },
                        {caption: 'Result 9'   , name: 'BIZ_RULE_RSLT9' , width: 100, datatype: 'text'    , group: 'GRP_RSLT' , hidden: true },
                        {caption: 'Result 0'   , name: 'BIZ_RULE_RSLT10', width: 100, datatype: 'text'    , group: 'GRP_RSLT' , hidden: true },
                        ];
            fc_setKeysInCol    ( gridId, [ 'RULE_ID' ] );
            fc_setRequiredInCol( gridId, [ 'RULE_ID','SEQ' ] );
        };
        break;
    case 'DEV_PROGRESS': // SCOZ0140
        gridId = 'gridDevProg';
        if ( caption_flag ) {
            sCaption = '';
            sItemCd  = '';
        };
        objGrpItems =   [
                        {caption: 'Program' , name: 'PGM_GRP', align: 'center', itemCd: 'CAP_USER'  },
                        {caption: 'Design'  , name: 'DGN_GRP', align: 'center', itemCd: 'CAP_DESIGN'},
                        {caption: 'Develop' , name: 'DEV_GRP', align: 'center', itemCd: 'CAP_DEV'   },
                        {caption: 'Test'    , name: 'TST_GRP', align: 'center', itemCd: 'CAP_TEST'  },
                        ];
        objItems =  [
                    {caption: 'Module'    , name: 'BIZ_CHAIN_CD' , width:  80, datatype: 'lov'  , frozen: true, required: true },
                    {caption: 'Type'      , name: 'PGM_TY'       , width:  70, datatype: 'lov'  , frozen: true, required: true },
                    {caption: 'Program ID', name: 'PGM_ID'       , width: 100, datatype: 'text' , frozen: true, required: true, uppercase: true },
                    {caption: 'Name'      , name: 'PGM_NM'       , width: 200, datatype: 'text' , frozen: true, required: true, itemCd: 'CAP_NM' },
                    {caption: 'Status'    , name: 'DEV_STS'      , width: 100, datatype: 'lov'  , frozen: true, readonly: true, itemCd: 'CAP_STATUS' },
                    {caption: 'Designer'  , name: 'DGN_USER_ID'  , width: 150, datatype: 'lov'  , group: 'DGN_GRP'            , required: true, itemCd: '' },
                    {caption: 'End date'  , name: 'DGN_END_DT'   , width: 120, datatype: 'date' , group: 'DGN_GRP', itemCd: 'CAP_END_DT' },
                    {caption: 'Consultant', name: 'DEV_USER_ID'  , width: 150, datatype: 'lov'  , group: 'DEV_GRP', itemCd: ''           },
                    {caption: 'Start'     , name: 'DEV_STA_DT'   , width: 120, datatype: 'date' , group: 'DEV_GRP', itemCd: 'CAP_STA_DT' },
                    {caption: 'End'       , name: 'DEV_END_DT'   , width: 120, datatype: 'date' , group: 'DEV_GRP', itemCd: 'CAP_END_DT' },
                    {caption: 'End'       , name: 'TEST_END_DT'  , width: 120, datatype: 'date' , group: 'TST_GRP', itemCd: 'CAP_END_DT' },
                    {caption: 'Remarks'   , name: 'REMARKS'      , width: 300, datatype: 'text'},
                    ];
        fc_addDataInGettedLov ( 'PGM_TY', {code: 'PGM_TY', tags: 'PGM_PROG', alias: '' } );
        fc_addDataInSettingLov( {object: gridId+'.PGM_TY', code: 'PGM_TY' , format: 'V', nullable: false , defval: ''} );
        fc_addDataInGettedLov ( 'BIZ_CHAIN_CD', {code: 'BIZ_CHAIN_CD', tags: '', alias: '' } );
        fc_addDataInSettingLov( {object: gridId+'.BIZ_CHAIN_CD', code: 'BIZ_CHAIN_CD' , format: 'V', nullable: false , defval: ''} );
        fc_addDataInGettedLov ( 'DEV_STS', {code: 'DEV_STS', tags: '', alias: '' } );
        fc_addDataInSettingLov( {object: gridId+'.DEV_STS', code: 'DEV_STS' , format: 'V', nullable: false , defval: ''} );

        fc_addDataInGettedLov ( 'PJT_MEM_LIST', {code: 'PJT_MEM_LIST', tags: '', alias: '' } );
        fc_addDataInSettingLov( {object: gridId+'.DGN_USER_ID', code: 'PJT_MEM_LIST' , format: 'V', nullable: false , defval: ''} );
        fc_addDataInSettingLov( {object: gridId+'.DEV_USER_ID', code: 'PJT_MEM_LIST' , format: 'V', nullable: true  , defval: ''} );

        fc_setKeysInCol    ( gridId, [ 'BIZ_CHAIN_CD','PGM_TY','PGM_ID' ] );
        break;

    case 'JOB_BAS_MSTR_LIST':  //SCOM1010
        gridId    = 'gridJobBasMstrList';
        if ( caption_flag ) {
            sCaption = 'gridJobBasMstrList';
            sItemCd  = 'CAP_JOB_BAS_MSTR_LIST';
        };
        objItems = [
                     {caption: 'Plant CD'   ,   name: 'PLANT_CD'    , width: 0  , datatype: 'lov',hidden: true}

                    ,{caption: '업무기준ID' ,   name: 'JOB_BAS_ID'  , width:90  , datatype: 'text', frozen:true ,maxlength:10, isMultiLanguage:true}
                    ,{caption: '업무기준명'      ,   name: 'JOB_BAS_NM'  , width:240 , datatype: 'text',maxlength:200,frozen:true , isMultiLanguage:true}
                    ,{caption: '업무기준유형' ,   name: 'JOB_BAS_TY'  , width:  100   , datatype: 'lov',frozen:true, isMultiLanguage:true}

                    ,{caption: 'Chain구분 '   ,   name: 'CHAIN_CD'    , width:  100   , datatype: 'lov',isMultiLanguage:true}
                    ,{caption: '공정'         ,   name: 'PROC_CD'     , width:  100   , datatype: 'lov',isMultiLanguage:true,hidden: true}
                    ,{caption: '사용화면ID'         ,   name: 'USE_UI_ID'   , width: 'auto'  /*80*/ , datatype: 'popup',isMultiLanguage:true}
                    ,{caption: 'WorkBanch Interface' , name: 'WB_INF_YN'    , width: 80 , datatype: 'checkbox',isMultiLanguage:true,hidden: true}
                    ,{caption: '최적화여부' , name: 'OTMZT_YN'   , width: 55 , datatype: 'checkbox',isMultiLanguage:true,hidden: true}
                    ,{caption: '사용여부'       ,   name: 'USE_YN'      , width:  70, datatype: 'lov',isMultiLanguage:true}
                    ,{caption: '사용로그생성여부'       ,   name: 'LOG_CRT_YN'      , width:  'auto' /*70*/, datatype: 'lov',isMultiLanguage:true}
                    ,{caption: 'VER'        ,   name: 'VER'         , width:40, datatype: 'text',isMultiLanguage:true}
                    ,{caption: '종료일'        ,   name: 'AP_ED_DTM'       , width:  'auto' /*100*/, datatype: 'text',isMultiLanguage:true}
                    ,{caption: 'PopUp 이동'       ,   name: 'LINK_POPUP1'         , width:  95, datatype: 'text',isMultiLanguage:true,readonly: true } //구조
                    ,{caption: 'PopUp 이동'       ,   name: 'LINK_POPUP2'         , width: 'auto'  /*135*/, datatype: 'text',isMultiLanguage:true,readonly: true } //데이터구조
                    ,{caption: 'PopUp 이동'       ,   name: 'LINK_POPUP3'         , width: 'auto'  /*110*/, datatype: 'text',isMultiLanguage:true,readonly: true  } //사용로그 및 시뮬레이션
                    ];


        // Read- Only 항목
        fc_setKeysInCol( gridId, [ 'JOB_BAS_ID','',''] );
        fc_addCodeList  ( {object: gridId+'.USE_UI_ID'      , code: 'SCREEN_CD_LIST'        , title: '사용화면ID'   , manKey: '' } , { itemCd: 'SCREEN_CD_LIST', itemValue: 0 });
        fc_addMultiItem( {itemCd:'SCR_ID'} );
        fc_addMultiItem( {itemCd:'SCR_NM'} );
        fc_addMultiItem( {itemCd:'PGM_TY'} );
        fc_addMultiItem( {itemCd:'CAP_SCR_INFO'} );

        //Plant Code Lov  " Hidden "
        fc_addDataInGettedLov ( 'PLANT_CD'  , {code: 'PLANT_CD' , tags: ''  , alias: ''} );
        fc_addDataInSettingLov(   {object: gridId+'.PLANT_CD'   , code: 'PLANT_CD'  , format: 'K'   , nullable: true, defval:'' });


        //업부기준유형 Lov
        fc_addDataInGettedLov ( 'JOB_BAS_TY'    , {code: 'JOB_BAS_TY'   , tags: ''  , alias: ''} );
        fc_addDataInSettingLov(   {object: gridId+'.JOB_BAS_TY' , code: 'JOB_BAS_TY'    , format: 'K:V' , nullable: true, defval: ''    });

        //Chain구분 Lov
        fc_addDataInGettedLov ( 'CHAIN_CD'  , {code: 'CHAIN_CD' , tags: ''  , alias: ''} );
        fc_addDataInSettingLov(   {object: gridId+'.CHAIN_CD'   , code: 'CHAIN_CD'  , format: 'K:V' , nullable: true, defval: ''    });

        //공정 Lov
        fc_addDataInGettedLov ( 'PROC_CD'   , {code: 'PROC_GRP_CD'  , tags: ''  , alias: ''} );
        fc_addDataInSettingLov(   {object: gridId+'.PROC_CD'    , code: 'PROC_GRP_CD'   , format: 'K:V' , nullable: true, defval: ''    });

        //사용여부 Lov
        fc_addDataInGettedLov ( 'USE_YN'    , {code: 'USE_YN'   , tags: ''  , alias: ''} );
        fc_addDataInSettingLov(   {object: gridId+'.USE_YN' , code: 'USE_YN'    , format: 'K:V' , nullable: true, defval: 'Y'   });

        //로그생성 여부 Lov
        fc_addDataInGettedLov ( 'LOG_CRT_YN'    , {code: 'LOG_CRT_YN'   , tags: ''  , alias: ''} );
        fc_addDataInSettingLov(   {object: gridId+'.LOG_CRT_YN' , code: 'LOG_CRT_YN'    , format: 'K:V' , nullable: true, defval: 'Y'   });


        break;

    case 'STRCT_MGT_LIST':  //SCOM1020, 일반 구조 관리
        gridId    = 'gridStrctMgtList';
        if ( caption_flag ) {
            sCaption = 'gridStrctMgtList';
            sItemCd  = 'CAP_STRCT_MGT_LIST';
        };

        objItems = [
                    {caption: '공장코드'    ,   name: 'PLANT_CD'    , width: 0  , datatype: 'text',hidden: true}
                    ,{caption: '업무기준코드' ,   name: 'JOB_BAS_ID'  , width: 0  , datatype: 'text',hidden: true}
                    ,{caption: '일련번호'   ,   name: 'SEQ' , width: 0  , datatype: 'number',  defval: 0 , hidden: true}
                    ,{caption: 'STRCT_DATA_TY'  ,   name: 'STRCT_DATA_TY'   , width: 0  , datatype: 'lov',hidden: true}
                    ,{caption: '최적화여부'  ,   name: 'OTMZT_YN'    , width: 0  , datatype: 'checkbox',hidden: true}
                 // ,{caption: '버전' ,   name: 'STRCT_VER'   , width: 0  , datatype: 'text',hidden: true,isMultiLanguage:false}
                    ,{caption: '항목ID'   ,   name: 'ATTR_ID' , width: 150    , datatype: 'text',isMultiLanguage:true}
                    ,{caption: '항목명'        ,   name: 'ATTR_NM'     , width: 150    , datatype: 'text',isMultiLanguage:true}
                    ,{caption: '테이블ID'  ,   name: 'TB_ID'   , width: 180    , datatype: 'lov',isMultiLanguage:true}
                    ,{caption: '데이터 타입 '    ,   name: 'DATA_TY' , width: 100    , datatype: 'lov',isMultiLanguage:true}
                    ,{caption: '길이'         ,   name: 'ATTR_LTH'    , width: 100    , datatype: 'number',  defval: 0 , isMultiLanguage:true}
                    ,{caption: '소수점'            ,   name: 'ATTR_DCML_PNT'   , width: 100    , datatype: 'number',  defval: 0 , isMultiLanguage:true}
                    ,{caption: '단위'         ,   name: 'UNT'     , width: 100    , datatype: 'text',isMultiLanguage:true}
                    ,{caption: '코드여부'           ,   name: 'CD_YN'   , width: 100    , datatype: 'lov',isMultiLanguage:true}
                    ,{caption: '조건결과'           ,   name: 'COND_RST_TY'     , width: 100    , datatype: 'lov',isMultiLanguage:true}
                    ,{caption: 'Master 코드'          ,   name: 'MASTER_CD'   , width: 100    , datatype: 'text',isMultiLanguage:true}
                    ,{caption: 'WildCard 여부' , name: 'WDCARD_YN'    , width: 100    , datatype: 'lov',readonly:false, isMultiLanguage:true}
                    ,{caption: '졍렬순서'       , name: 'SORT_SEQ'  , width: 100    , datatype: 'number', defval: 0 , required: true, isMultiLanguage:true}
                    ,{caption: '연산자'        ,   name: 'OP_CD'       , width: 100, datatype: 'lov',isMultiLanguage:true}
                    ,{caption: 'SUBSTR 사용여부'        ,   name: 'SUBSTR_USE_YN'       , width: 120, datatype: 'lov', isMultiLanguage:true}
                    ,{caption: 'SUBSTR 시작위치'        ,   name: 'SUBSTR_ST_LOAD_LOC'      , width: 120, datatype: 'number',  defval: 0 , isMultiLanguage:true}
                    ,{caption: 'SUBSTR 끝위치'     ,   name: 'SUBSTR_ED_LOAD_LOC'      , width: 100, datatype: 'number', defval: 0 ,  isMultiLanguage:true}
                    ,{caption: '사용여부'       ,   name: 'USE_YN'      , width: 100, datatype: 'lov',isMultiLanguage:true}

                    ];
        //fc_setKeysInCol( gridId, [ 'JOB_BAS_ID','',''] ); // Read- Only 항목
        //fc_setUpperInCol( gridId, [ 'CC_PROC','HR_PROC','HR_FIN_PROC','PPL_PROC','PLTCM_PROC','CAL_PROC','CGL_PROC','RCL_PROC'] );

        //STRCT_DATA_TY Lov  " Hidden "
        fc_addDataInGettedLov ( 'STRCT_DATA_TY' , {code: 'STRCT_DATA_TY'    , tags: ''  , alias: ''} );
        fc_addDataInSettingLov(   {object: gridId+'.STRCT_DATA_TY'  , code: 'STRCT_DATA_TY' , format: 'K'   , nullable: true, defval: STRCT_TY });

        //최적화 여부 Lov  " Hidden "
        //fc_addDataInGettedLov ( 'OTMZT_YN'    , {code: 'OTMZT_YN' , tags: ''  , alias: ''} );
        //fc_addDataInSettingLov(   {object: gridId+'.OTMZT_YN' , code: 'OTMZT_YN'  , format: 'K'   , nullable: true, defval: '' });

        //TB_ID Lov
        fc_addDataInGettedLov ( 'TB_ID' , {code: 'TB_ID'    , tags: ''  , alias: ''} );
        fc_addDataInSettingLov(   {object: gridId+'.TB_ID'  , code: 'TB_ID' , format: 'K'   , nullable: true, defval: ''    });

        //데이터 타입 Lov
        fc_addDataInGettedLov ( 'DATA_TY'   , {code: 'DATA_TY'  , tags: ''  , alias: ''} );
        fc_addDataInSettingLov(   {object: gridId+'.DATA_TY'    , code: 'DATA_TY'   , format: 'K:V' , nullable: true, defval: ''    });

        //코드여부 Lov
        fc_addDataInGettedLov ( 'CD_YN' , {code: 'CD_YN'    , tags: ''  , alias: ''} );
        fc_addDataInSettingLov(   {object: gridId+'.CD_YN'  , code: 'CD_YN' , format: 'K:V' , nullable: true, defval: ''    });

        //조건결과 Lov
        fc_addDataInGettedLov ( 'COND_RST_TY'   , {code: 'COND_RST_TY'  , tags: ''  , alias: ''} );
        fc_addDataInSettingLov(   {object: gridId+'.COND_RST_TY'    , code: 'COND_RST_TY'   , format: 'K:V' , nullable: true, defval: ''    });

        //Master tag 여부 Lov
        //fc_addDataInGettedLov ( 'MASTER_CD'   , {code: 'MASTER_CD'    , tags: ''  , alias: ''} );
        //fc_addDataInSettingLov(   {object: gridId+'.MASTER_CD'    , code: 'MASTER_CD' , format: 'K:V' , nullable: true, defval: ''    });

        //WildCard 여부 Lov
        fc_addDataInGettedLov ( 'WDCARD_YN' , {code: 'WDCARD_YN'    , tags: ''  , alias: ''} );
        fc_addDataInSettingLov(   {object: gridId+'.WDCARD_YN'  , code: 'WDCARD_YN' , format: 'K'   , nullable: true, defval: 'N'   });

        //연산자 Lov
        fc_addDataInGettedLov ( 'OP_CD' , {code: 'OP_CD'    , tags: 'A' , alias: ''} );
        fc_addDataInSettingLov(   {object: gridId+'.OP_CD'  , code: 'OP_CD' , format: 'K:V' , nullable: true, defval: ''    });

        //사용여부 Lov
        fc_addDataInGettedLov ( 'USE_YN'    , {code: 'USE_YN'   , tags: ''  , alias: ''} );
        fc_addDataInSettingLov(   {object: gridId+'.USE_YN' , code: 'USE_YN'    , format: 'K:V' , nullable: true, defval: ''    });

        //SUBSTR 사용여부 Lov
        fc_addDataInGettedLov ( 'SUBSTR_USE_YN' , {code: 'SUBSTR_USE_YN'    , tags: ''  , alias: ''} );
        fc_addDataInSettingLov(   {object: gridId+'.SUBSTR_USE_YN'  , code: 'SUBSTR_USE_YN' , format: 'K'   , nullable: true, defval: ''    });

      //  fc_setMaxLengthInCol( gridId, [ 'ATTR_ID','ATTR_NM','ATTR_LTH','ATTR_DCML_PNT','UNT','MASTER_CD','SORT_SEQ','SUBSTR_ST_LOAD_LOC','SUBSTR_ED_LOAD_LOC'], [ 100,200,5,5,20,100,8,3,3 ] ) ;
        fc_setMaxLengthInCol( gridId, [ 'ATTR_ID'], [ 100 ] ) ;
        fc_setMaxLengthInCol( gridId, [ 'ATTR_NM'], [ 200 ] ) ;
        fc_setMaxLengthInCol( gridId, ['ATTR_LTH','ATTR_DCML_PNT','UNT','SORT_SEQ'],[5]);
        fc_setMaxLengthInCol( gridId, [ 'SUBSTR_ST_LOAD_LOC','SUBSTR_ED_LOAD_LOC','SORT_SEQ'], [ 3 ] ) ;


        break;

    case 'STRCT_RSLT_LIST':             //SCOM1020, 작업표준 실적 셋업D
        gridId    = 'gridStrctRsltList';
        if ( caption_flag ) {
            sCaption = 'gridStrctRsltList';
            sItemCd  = 'CAP_STRCT_RSLT_STUP_D';
        };
        objItems = [
                     {caption: '공장코드'   ,   name: 'PLANT_CD'    , width: 0  , datatype: 'text',hidden: true}
                    ,{caption: '업무기준코드' ,   name: 'JOB_BAS_ID'  , width: 0  , datatype: 'text',hidden: true}
                    ,{caption: '일련번호'   ,   name: 'SEQ' , width: 0  , datatype: 'integer',hidden: true}
                    ,{caption: '항목구분'        , name: 'RSLT_STUP_ATTR_TY'      , width: '15%', datatype: 'lov' ,align:'left',isMultiLanguage:true}
                    ,{caption: '항목ID'        , name: 'ATTR_ID'      , width:  '20%' , datatype: 'text',isMultiLanguage:true}
                    ,{caption: '항목명'     , name: 'ATTR_NM'      , width:  '20%' , datatype: 'text',isMultiLanguage:true}
                    ,{caption: 'DATA TYPE'   , name: 'DATA_TY'  , width:  '18%', datatype: 'lov',isMultiLanguage:true}
                    ,{caption: '결과값 적용여부'        , name: 'RSLT_STUP_RST_VAL_AP_YN'  , width:'20%'   , datatype: 'lov',isMultiLanguage:true}
                    ];
        fc_setMaxLengthInCol( gridId, [ 'ATTR_ID'], [ 100 ] ) ;
        fc_setMaxLengthInCol( gridId, [ 'ATTR_NM'], [ 200 ] ) ;


        //fc_setKeysInCol( gridId, [ 'RSLT_STUP_ATTR_TY','',''] );
        //항목구분 Lov
        fc_addDataInGettedLov ( 'RSLT_STUP_ATTR_TY' , {code: 'RSLT_STUP_ATTR_TY'    , tags: ''  , alias: ''} );
        fc_addDataInSettingLov(   {object: gridId+'.RSLT_STUP_ATTR_TY'  , code: 'RSLT_STUP_ATTR_TY' , format: 'K:V' , nullable: true, defval: ''    });

        //DATA TYPE Lov
        fc_addDataInGettedLov ( 'DATA_TY'   , {code: 'DATA_TY'  , tags: ''  , alias: ''} );
        fc_addDataInSettingLov(   {object: gridId+'.DATA_TY'    , code: 'DATA_TY'   , format: 'K:V' , nullable: true, defval: ''    });

        //결과값 적용여부 Lov
        fc_addDataInGettedLov ( 'RSLT_STUP_RST_VAL_AP_YN'   , {code: 'RSLT_STUP_RST_VAL_AP_YN'  , tags: ''  , alias: ''} );
        fc_addDataInSettingLov(   {object: gridId+'.RSLT_STUP_RST_VAL_AP_YN'    , code: 'RSLT_STUP_RST_VAL_AP_YN'   , format: 'K:V' , nullable: true, defval: ''    });

        break;

    case 'STRCT_RSLT_MART_LIST':            //SCOM1020, 작업표준 실적 셋업D입력을 위한 MART 정보
        gridId    = 'gridStctRsltMartList';
        if ( caption_flag ) {
            sCaption = 'gridStctRsltMartList';
            sItemCd  = 'CAP_STRCT_RSLT_MART_LIST';
        };
        objItems = [
                    // {caption: '항목구분'      , name: 'RSLT_STUP_ATTR_TY'      , width: 150  , datatype: 'lov' ,align:'left',isMultiLanguage:false}
                     {caption: '항목ID'        , name: 'ATTR_ID'      , width: '42%'  , datatype: 'text',isMultiLanguage:true}
                    ,{caption: '항목명'     , name: 'ATTR_NM'      , width: '50%'  , datatype: 'text',isMultiLanguage:true}

                    ];
         fc_setMaxLengthInCol( gridId, [ 'ATTR_ID'], [ 100 ] ) ;
         fc_setMaxLengthInCol( gridId, [ 'ATTR_NM'], [ 200 ] ) ;


        //항목구분 Lov
        //fc_addDataInGettedLov ( 'RSLT_STUP_ATTR_TY'   , {code: 'RSLT_STUP_ATTR_TY'    , tags: ''  , alias: ''} );
        //fc_addDataInSettingLov(   {object: gridId+'.RSLT_STUP_ATTR_TY'    , code: 'RSLT_STUP_ATTR_TY' , format: 'K:V' , nullable: true, defval: ''    });


        break;

    case 'FRML_STRCT_ATTR_MGT_LIST':            //SCOM2010, S101020, S101021 작업표준 계산식구조 관리(단순) 항목 정보
        gridId    = 'gridFrmlStrctRsltList';
        if ( caption_flag ) {
            sCaption = 'gridFrmlStrctRsltList';
            sItemCd  = 'CAP_FRML_STRCT_ATTR_MGT_LIST';
        };
        objItems = [

                     {caption: '표현' ,   name: 'FRML_EXP_MTH'    , width: '3%'   , datatype: 'text',hidden: false,isMultiLanguage:false}
                     ,{caption: '항목ID'       , name: 'ATTR_ID'      , width: '13%'  , datatype: 'text',isMultiLanguage:false}
                     ,{caption: '항목명'        , name: 'ATTR_NM'      , width: '19%'  , datatype: 'text',isMultiLanguage:false}
                     ,{caption: '코드여부'       , name: 'CD_YN'        , width: '5%'   , datatype: 'lov',isMultiLanguage:false}
                     ,{caption: '단위'     , name: 'UNT'      , width: '3%'   , datatype: 'text',isMultiLanguage:false}
                     ,{caption: '데이터 타입'     , name: 'DATA_TY'      , width: '10%'  , datatype: 'lov',isMultiLanguage:false}
                     ,{caption: '길이'     , name: 'ATTR_LTH'         , width: '5%'   , datatype: 'text',isMultiLanguage:false}
                     ,{caption: '처리타입'   , name: 'PROC_TY_CD'   , width: '10%'  , datatype: 'lov',isMultiLanguage:false}
                     ,{caption: '기준 테이블ID'       , name: 'TB_ID'    , width: '17%'  , datatype: 'lov',isMultiLanguage:false}
                     ,{caption: '마스터코드'      , name: 'MASTER_CD'    , width: 'auto' , datatype: 'text',isMultiLanguage:false}
                    ];

        fc_setMaxLengthInCol( gridId, [ 'ATTR_ID'], [ 100 ] ) ;
        fc_setMaxLengthInCol( gridId, [ 'ATTR_NM'], [ 200 ] ) ;
        fc_setMaxLengthInCol( gridId, ['ATTR_LTH','UNT','SORT_SEQ'],[5]);


        fc_setKeysInCol( gridId, [ 'FRML_EXP_MTH','',''] );

        //코드여부 Lov
        fc_addDataInGettedLov ( 'CD_YN' , {code: 'CD_YN'    , tags: ''  , alias: ''} );
        fc_addDataInSettingLov(   {object: gridId+'.CD_YN'  , code: 'CD_YN' , format: 'K:V' , nullable: true, defval: ''    });

        //데이터 타입 Lov
        fc_addDataInGettedLov ( 'DATA_TY'   , {code: 'DATA_TY'  , tags: ''  , alias: ''} );
        fc_addDataInSettingLov(   {object: gridId+'.DATA_TY'    , code: 'DATA_TY'   , format: 'K:V' , nullable: true, defval: ''    });

        //처리타입 Lov
        fc_addDataInGettedLov ( 'PROC_TY_CD'    , {code: 'PROC_TY_CD'   , tags: ''  , alias: ''} );
        fc_addDataInSettingLov(   {object: gridId+'.PROC_TY_CD' , code: 'PROC_TY_CD'    , format: 'K:V' , nullable: true, defval: ''    });

        //기준 테이블ID Lov
        fc_addDataInGettedLov ( 'TB_ID' , {code: 'TB_ID'    , tags: ''  , alias: ''} );
        fc_addDataInSettingLov(   {object: gridId+'.TB_ID'  , code: 'TB_ID' , format: 'K:V' , nullable: true, defval: ''    });

        //마스터코드 Lov
        //fc_addDataInGettedLov ( 'MASTER_CD'   , {code: 'MASTER_CD'    , tags: ''  , alias: ''} );
        //fc_addDataInSettingLov(   {object: gridId+'.MASTER_CD'    , code: 'MASTER_CD' , format: 'K:V' , nullable: true, defval: ''    });

        break;


    case 'FRML_CONST_MGT_LIST':         //SCOM2010, 작업표준 계산식구조 관리(단순) 상수값 관리
        gridId    = 'gridFrmlConstMgt';
        if ( caption_flag ) {
            sCaption = 'gridFrmlConstMgt';
            sItemCd  = 'CAP_FRML_CONST_MGT_LIST';
        };
        objItems = [

                     {caption: 'SEQ'    ,   name: 'SEQ' , width: 0  , datatype: 'text',hidden: true,isMultiLanguage:false}
                     ,{caption: '적용상수'       , name: 'FRML_EXP_MTH'         , width: '48%'  ,  datatype: 'text', readonly: true, isMultiLanguage:false}
                     ,{caption: '상수값'        , name: 'CNST_VAL'         , width: 'auto' , datatype: 'text',isMultiLanguage:false}

                    ];

        fc_setMaxLengthInCol( gridId, [ 'CNST_VAL'], [ 100 ] ) ;

        break;

    case 'FRML_CONST_COMPLEX_LIST':         //SCOM2020, 작업표준 계산식구조 관리(복합) 상수값 관리
        gridId    = 'gridFrmlConstMgt';
        if ( caption_flag ) {
            sCaption = 'gridFrmlConstMgt';
            sItemCd  = 'CAP_FRML_CONST_MGT_LIST';
        };
        objItems = [

                     {caption: '일련번호'   ,   name: 'SEQ' , width:'25%'   , datatype: 'text',hidden: false,isMultiLanguage:false}
                     ,{caption: '적용상수'       , name: 'FRML_EXP_MTH'         , width: '25%'  , datatype: 'text', readonly: false, isMultiLanguage:false}
                     ,{caption: '상수값'        , name: 'CNST_VAL'         , width: 'auto' , datatype: 'text',isMultiLanguage:false}

                    ];
        fc_setMaxLengthInCol( gridId, [ 'CNST_VAL'], [ 100 ] ) ;
        fc_setMaxLengthInCol( gridId, [ 'FRML_EXP_MTH'], [ 4 ] ) ;
        break;
         // fc_makeGrid( 'divFrmlStrctMgtList', 'insert', 'FRML_STRCT_MGT_LIST', '', true  );

    case 'FRML_STRCT_MGT_LIST':         //SCOM2020, S101021 작업표준 계산식구조 관리(복합) 계산공식 관리
        gridId    = 'gridFrmlStrctMgtList';
        if ( caption_flag ) {
            sCaption = 'gridFrmlStrctMgtList';
            sItemCd  = 'CAP_FRML_STRCT_MGT_LIST';
        };
        objItems = [
                        {caption: '일련번호'    ,   name: 'SEQ' , width:'5%'    , datatype: 'text',readonly: true,hidden:true}
                     ,{caption: '조건식'   ,   name: 'COND_FRML'   , width: '15%'  , datatype: 'text',isMultiLanguage:false}
                     ,{caption: '계산식'        , name: 'FRML'         , width: '40%'  , datatype: 'text',  isMultiLanguage:false}
                     ,{caption: '설명'     , name: 'FRML_EXPLNT'      , width: '35%'  , datatype: 'text',isMultiLanguage:false}
                    ,{caption: '우선순위'        , name: 'PRTY_SEQ'         , width: 'auto' , datatype: 'text',isMultiLanguage:false}

                    ];
        fc_setMaxLengthInCol( gridId, [ 'COND_FRML'], [ 4000 ] ) ;
        fc_setMaxLengthInCol( gridId, [ 'FRML'], [ 4000 ] ) ;
        fc_setMaxLengthInCol( gridId, [ 'FRML_EXPLNT'], [ 4000 ] ) ;
        fc_setMaxLengthInCol( gridId, [ 'PRTY_SEQ'], [ 8 ] ) ;
        break;

    case 'OTMZ_FRML_STRCT_MGT_LIST':            //S101021, 작업표준 계산식구조 관리(복합) 최적화
        gridId    = 'gridFrmlStrctMgtList';
        if ( caption_flag ) {
            sCaption = 'gridFrmlStrctMgtList';
            sItemCd  = 'CAP_FRML_STRCT_MGT_LIST';
        };
        objItems = [
                        {caption: '일련번호'    ,   name: 'SEQ' , width:'5%'    , datatype: 'text',readonly: true,hidden:true}
                        ,{caption: '최적화대상'  ,   name: 'OTMZ_YN' , width: '15%'  , datatype: 'text',isMultiLanguage:false}
                     ,{caption: '조건식'   ,   name: 'COND_FRML'   , width: '15%'  , datatype: 'text',isMultiLanguage:false}
                     ,{caption: '계산식'        , name: 'FRML'         , width: '40%'  , datatype: 'text',  isMultiLanguage:false}
                     ,{caption: '설명'     , name: 'FRML_EXPLNT'      , width: '35%'  , datatype: 'text',isMultiLanguage:false}
                    ,{caption: '우선순위'        , name: 'PRTY_SEQ'         , width: 'auto' , datatype: 'text',isMultiLanguage:false}

                    ];
        fc_setMaxLengthInCol( gridId, [ 'COND_FRML'], [ 4000 ] ) ;
        fc_setMaxLengthInCol( gridId, [ 'FRML'], [ 4000 ] ) ;
        fc_setMaxLengthInCol( gridId, [ 'FRML_EXPLNT'], [ 4000 ] ) ;
        fc_setMaxLengthInCol( gridId, [ 'PRTY_SEQ'], [ 8 ] ) ;
        break;

    case 'FRML_STRCT_MGT_SQL_LIST':         //SCOM2030, 작업표준 계산식구조 관리(SQL) 계산공식 관리
        gridId    = 'gridFrmlStrctMgtList';
        if ( caption_flag ) {
            sCaption = 'gridFrmlStrctMgtList';
            sItemCd  = 'CAP_FRML_STRCT_MGT_LIST';
        };
        objItems = [
                        {caption: '일련번호'    ,   name: 'SEQ' , width:'5%'    , datatype: 'text',readonly: true,isMultiLanguage:false}
                     ,{caption: '조건식'   ,   name: 'COND_FRML'   , width: '15%'  , datatype: 'text',isMultiLanguage:false}
                     ,{caption: 'SQL'        , name: 'APPL_SQL'         , width: '30%'  , datatype: 'text',  isMultiLanguage:false}
                     ,{caption: '설명'     , name: 'FRML_EXPLNT'      , width: '30%'  , datatype: 'text',isMultiLanguage:false}
                    ,{caption: '우선순위'        , name: 'PRTY_SEQ'         , width: '5%'   , datatype: 'text',isMultiLanguage:false}

                    ];
        fc_setMaxLengthInCol( gridId, [ 'COND_FRML'], [ 4000 ] ) ;
        fc_setMaxLengthInCol( gridId, [ 'FRML_EXPLNT'], [ 4000 ] ) ;
        fc_setMaxLengthInCol( gridId, [ 'PRTY_SEQ'], [ 8 ] ) ;
        break;

    case 'OTMZT_MGT_COND_INPUT_LIST':           //S101010, 작업표준 최적화 관리 조건값 입력 내용 목록 조회
        gridId    = 'gridOmtztCondInputMgtId';
        if ( caption_flag ) {
            sCaption = 'gridOmtztCondInputMgtId';
            sItemCd  = 'CAP_OTMZT_MGT_COND_INPUT_LIST';
        };
        objItems = [
                        {caption: '조건항목ID'  ,   name: 'ATTR_ID' , width:'20%'   , datatype: 'text',readonly: true,isMultiLanguage:false}
                     ,{caption: '조건항목'  ,   name: 'ATTR_NM' , width: '20%'  , datatype: 'text',isMultiLanguage:false}
                     ,{caption: '연산자'        , name: 'OP_CD'        , width: '16.5%'    , datatype: 'lov',  isMultiLanguage:false}
                     ,{caption: '비교값 1'      , name: 'CMR_VAL1'         , width: '15%'  , datatype: 'text',isMultiLanguage:false}
                     ,{caption: '비교값 2'      , name: 'CMR_VAL2'         , width: '10%'  , datatype: 'text',isMultiLanguage:false}
                     ,{caption: '입력값 1'      , name: 'COND_RSLT_VAL'        , width: 'auto' , datatype: 'text',isMultiLanguage:false}

                    ];

        //연산자 Lov
        fc_addDataInGettedLov ( 'OP_CD' , {code: 'OP_CD'    , tags: 'A' , alias: ''} );
        fc_addDataInSettingLov(   {object: gridId+'.OP_CD'  , code: 'OP_CD' , format: 'K:V' , nullable: true, defval: ''    });

        break;
    case 'OTMZT_MGT_RSLT_INPUT_LIST':           //S101010, 작업표준 최적화 관리 조건값 입력 내용 목록 조회
        gridId    = 'gridOmtztRsltInputMgtId';
        if ( caption_flag ) {
            sCaption = 'gridOmtztRsltInputMgtId';
            sItemCd  = 'CAP_OTMZT_MGT_RSLT_INPUT_LIST';
        };
        objItems = [
                        {caption: '항목명' ,   name: 'ATTR_NM' , width:'60%'   , datatype: 'text',readonly: true,isMultiLanguage:false}
                     ,{caption: '결과값'   ,   name: 'COND_RSLT_VAL'   , width: '40%'  , datatype: 'text',isMultiLanguage:false}
                    ];

        break;

    case 'STRCT_VER_LIST':          //SCOM1022, 버전 정보 목록
        gridId    = 'gridStrctVerList';
        if ( caption_flag ) {
            sCaption = 'gridStrctVerList';
            sItemCd  = 'CAP_STRCT_VER_LIST';
        };
        objItems = [
                    // {caption: '항목구분'      , name: 'RSLT_STUP_ATTR_TY'      , width: 150  , datatype: 'lov' ,align:'left',isMultiLanguage:false}
                     {caption: '버전'      , name: 'VER'      , width: 50 , datatype: 'text',isMultiLanguage:true , align:'right'}
                    ,{caption: '시작일'     , name: 'AP_ST_DTM'        , width: 96 , datatype: 'text',isMultiLanguage:true}
                    ,{caption: '종료일'     , name: 'AP_ED_DTM'        , width: 96, datatype: 'text',isMultiLanguage:true}

                    ];

        break;

    case 'STRCT_VER_HIST'://SCOM1032 버전 이력관리
        gridId    = 'gridStrctVerHist';
        if ( caption_flag ) {
            sCaption = 'gridStrctVerHist';
            sItemCd  = 'CAP_STRCT_VER_HIST';
        };
        objItems = [
                     {caption: '업무기준ID' , name: 'JOB_BAS_ID'    , width: 100, datatype: 'text',isMultiLanguage:true, align:'center'}
                    ,{caption: '업무기준명' , name: 'JOB_BAS_NM'    , width: 250, datatype: 'text',isMultiLanguage:true, align:'center'}
                    ,{caption: '변경일시'   , name: 'CRT_TM'        , width: 150, datatype: 'text',isMultiLanguage:false, align:'center'}
                    ,{caption: '변경사유'   , name: 'REASON'        , width: 80, datatype: 'text',isMultiLanguage:true, align:'center'}
                    ,{caption: 'PARMETER(코드명)'    , name: 'COND_NAME'      , width: 'auto', datatype: 'text',isMultiLanguage:false, align:'center'}
                    ,{caption: '변경전값'   , name: 'COND_ATTR_AF'  , width: 'auto', datatype: 'text',isMultiLanguage:false, align:'center'}
                    ,{caption: '변경후값'   , name: 'COND_ATTR_BF'  , width: 'auto', datatype: 'text',isMultiLanguage:false, align:'center'}
                    ,{caption: '상세내용'   , name: 'DETAIL_CONTENT', width: 'auto', datatype: 'text',isMultiLanguage:false}
                    ,{caption: '사용자 ID'  , name: 'CRT_USER_ID'   , width: 100, datatype: 'text',isMultiLanguage:false, align:'center'}
                    ,{caption: '이름'      , name: 'USER_NM'       , width: 100, datatype: 'text',isMultiLanguage:false, align:'center'}
                    ];

        break;
    case 'USE_LOG_DETAIL_COND_INPUT_LIST':          //SCOM1060, 사용통계 상세내역 팝업 조건값 입력 내용 목록 조회
        gridId    = 'gridUseLogDetailCondId';
        if ( caption_flag ) {
            sCaption = 'gridUseLogDetailCondId';
            sItemCd  = 'CAP_USE_LOG_DETAIL_COND_INPUT_LIST';
        };
        objItems = [
                        {caption: '조건항목ID'  ,   name: 'ATTR_ID' , width:'20%'   , datatype: 'text',readonly: true,isMultiLanguage:false}
                     ,{caption: '조건항목'  ,   name: 'ATTR_NM' , width: '22%'  , datatype: 'text',readonly: true,isMultiLanguage:false}
                     ,{caption: '연산자'        , name: 'OP_CD'        , width: 'auto' , datatype: 'lov',  readonly: true,isMultiLanguage:false}
                     ,{caption: '비교값 1'      , name: 'CMR_VAL1'         , width: 'auto' , datatype: 'text',readonly: true,isMultiLanguage:false}
                     ,{caption: '비교값 2'      , name: 'CMR_VAL2'         , width: '10%'  , datatype: 'text',readonly: true,isMultiLanguage:false}
                     ,{caption: '입력값 1'      , name: 'COND_RSLT_VAL'        , width: 'auto' , datatype: 'text',isMultiLanguage:false}

                    ];
        fc_setMaxLengthInCol( gridId, [ 'COND_RSLT_VAL'], [ 20 ] ) ;

        //연산자 Lov
        fc_addDataInGettedLov ( 'OP_CD' , {code: 'OP_CD'    , tags: 'A' , alias: ''} );
        fc_addDataInSettingLov(   {object: gridId+'.OP_CD'  , code: 'OP_CD' , format: 'K:V' , nullable: true, defval: ''    });

        break;
    case 'USE_LOG_DETAIL_RSLT_INPUT_LIST':          //SCOM1060, 작업표준 상세통계 팝업 조건값 입력 내용 목록 조회
        gridId    = 'gridUseLogDetailRsltId';
        if ( caption_flag ) {
            sCaption = 'gridUseLogDetailRsltId';
            sItemCd  = 'CAP_USE_LOG_DETAIL_RSLT_INPUT_LIST';
        };
        objItems = [
                        {caption: '항목명' ,   name: 'ATTR_NM' , width:'60%'   , datatype: 'text',readonly: true,isMultiLanguage:false}
                     ,{caption: '결과값'   ,   name: 'COND_RSLT_VAL'   , width: 'auto' , datatype: 'text',isMultiLanguage:false}
                    ];

        break;

    case 'USE_LOG_FRML_STRCT_ATTR_INPUT_LIST':          //SCOM2040, 작업표준 사용 상세내역-계산식 기준 팝업
        gridId    = 'gridUseLogFrmlAttrInputList';
        if ( caption_flag ) {
            sCaption = 'gridUseLogFrmlAttrInputList';
            sItemCd  = 'CAP_USE_LOG_FRML_STRCT_ATTR_INPUT_LIST';
        };
        objItems = [

                     {caption: '표현' ,   name: 'FRML_EXP_MTH'    , width: '5%'   , datatype: 'text',readonly: true,isMultiLanguage:false}
            //         ,{caption: '항목ID'     , name: 'ATTR_ID'      , width: '10%'  , datatype: 'text',isMultiLanguage:false}
                     ,{caption: '항목명'        , name: 'ATTR_NM'      , width: '18%'  , datatype: 'text',readonly: true,isMultiLanguage:false}
                     ,{caption: '코드여부'       , name: 'CD_YN'        , width: '5%'   , datatype: 'lov',readonly: true,isMultiLanguage:false}
                     ,{caption: '단위'     , name: 'UNT'      , width: '10%'  , datatype: 'text',readonly: true,isMultiLanguage:false}
                     ,{caption: '데이터 타입'     , name: 'DATA_TY'      , width: '10%'  , datatype: 'lov',readonly: true,isMultiLanguage:false}
                     ,{caption: '길이'     , name: 'ATTR_LTH'         , width: '5%'   , datatype: 'text',readonly: true,isMultiLanguage:false}
                     ,{caption: '처리타입'   , name: 'PROC_TY_CD'   , width: '10%'  , datatype: 'lov',readonly: true,isMultiLanguage:false}
                     ,{caption: '기준 테이블ID'       , name: 'TB_ID'    , width: '25%'  , datatype: 'lov',readonly: true,isMultiLanguage:false}
                     ,{caption: '입력값'        , name: 'ATTR_INST_VAL'    , width: 'auto' , datatype: 'text',isMultiLanguage:false}
                    ];

        fc_setMaxLengthInCol( gridId, [ 'ATTR_INST_VAL'], [ 20 ] ) ;

        fc_setKeysInCol( gridId, [ 'FRML_EXP_MTH','',''] );

        //코드여부 Lov
        fc_addDataInGettedLov ( 'CD_YN' , {code: 'CD_YN'    , tags: ''  , alias: ''} );
        fc_addDataInSettingLov(   {object: gridId+'.CD_YN'  , code: 'CD_YN' , format: 'K:V' , nullable: true, defval: ''    });

        //데이터 타입 Lov
        fc_addDataInGettedLov ( 'DATA_TY'   , {code: 'DATA_TY'  , tags: ''  , alias: ''} );
        fc_addDataInSettingLov(   {object: gridId+'.DATA_TY'    , code: 'DATA_TY'   , format: 'K:V' , nullable: true, defval: ''    });

        //처리타입 Lov
        fc_addDataInGettedLov ( 'PROC_TY_CD'    , {code: 'PROC_TY_CD'   , tags: ''  , alias: ''} );
        fc_addDataInSettingLov(   {object: gridId+'.PROC_TY_CD' , code: 'PROC_TY_CD'    , format: 'K:V' , nullable: true, defval: ''    });

        //기준 테이블ID Lov
        fc_addDataInGettedLov ( 'TB_ID' , {code: 'TB_ID'    , tags: ''  , alias: ''} );
        fc_addDataInSettingLov(   {object: gridId+'.TB_ID'  , code: 'TB_ID' , format: 'K:V' , nullable: true, defval: ''    });

        //마스터코드 Lov
        //fc_addDataInGettedLov ( 'MASTER_CD'   , {code: 'MASTER_CD'    , tags: ''  , alias: ''} );
        //fc_addDataInSettingLov(   {object: gridId+'.MASTER_CD'    , code: 'MASTER_CD' , format: 'K:V' , nullable: true, defval: ''    });

        break;


    case 'STRCT_MGT_B_LIST':  //SCOM1040, 판단 구조 관리
        gridId    = 'gridStrctMgtList';
        if ( caption_flag ) {
            sCaption = 'gridStrctMgtList';
            sItemCd  = 'CAP_STRCT_MGT_LIST';
        };

        objItems = [
                    {caption: '공장코드'    ,   name: 'PLANT_CD'    , width: 0  , datatype: 'text',hidden: true}
                    ,{caption: '업무기준코드' ,   name: 'JOB_BAS_ID'  , width: 0  , datatype: 'text',hidden: true}
                    ,{caption: '일련번호'   ,   name: 'SEQ' , width: 0  , datatype: 'number',  defval: 0 , hidden: true}
                    ,{caption: 'STRCT_DATA_TY'  ,   name: 'STRCT_DATA_TY'   , width: 0  , datatype: 'lov',hidden: true}
                    ,{caption: '최적화여부'  ,   name: 'OTMZT_YN'    , width: 0  , datatype: 'checkbox',hidden: true}
                 // ,{caption: '버전' ,   name: 'STRCT_VER'   , width: 0  , datatype: 'text',hidden: true,isMultiLanguage:false}
                    ,{caption: '항목ID'   ,   name: 'ATTR_ID' , width: 150    , datatype: 'text',isMultiLanguage:true}
                    ,{caption: '항목명'        ,   name: 'ATTR_NM'     , width: 150    , datatype: 'text',isMultiLanguage:true}
                    ,{caption: '테이블ID'  ,   name: 'TB_ID'   , width: 150    , datatype: 'lov',isMultiLanguage:true}
                    ,{caption: '데이터 타입 '    ,   name: 'DATA_TY' , width: 100    , datatype: 'lov',isMultiLanguage:true}
                    ,{caption: '길이'         ,   name: 'ATTR_LTH'    , width: 100    , datatype: 'number',  defval: 0 , isMultiLanguage:true}
                    ,{caption: '소수점'            ,   name: 'ATTR_DCML_PNT'   , width: 100    , datatype: 'number',  defval: 0 , isMultiLanguage:true}
                    ,{caption: '단위'         ,   name: 'UNT'     , width: 100    , datatype: 'text',isMultiLanguage:true}
                    ,{caption: '코드여부'           ,   name: 'CD_YN'   , width: 100    , datatype: 'lov',isMultiLanguage:true}
                    ,{caption: '조건결과'           ,   name: 'COND_RST_TY'     , width: 100    , datatype: 'lov',isMultiLanguage:true}
                    ,{caption: 'Master 코드'          ,   name: 'MASTER_CD'   , width: 100    , datatype: 'text',isMultiLanguage:true}
                    ,{caption: 'WildCard 여부' , name: 'WDCARD_YN'    , width: 100    , datatype: 'lov',isMultiLanguage:true}
                    ,{caption: '졍렬순서'       , name: 'SORT_SEQ'  , width: 100    , datatype: 'number', defval: 0 , isMultiLanguage:true}
                    ,{caption: '연산자'        ,   name: 'OP_CD'       , width: 100, datatype: 'lov',isMultiLanguage:true}
                    ,{caption: 'SUBSTR 사용여부'        ,   name: 'SUBSTR_USE_YN'       , width: 120, datatype: 'lov',readonly:false,isMultiLanguage:true}
                    ,{caption: 'SUBSTR 시작위치'        ,   name: 'SUBSTR_ST_LOAD_LOC'      , width: 120, datatype: 'number',  defval: 0 , isMultiLanguage:true}
                    ,{caption: 'SUBSTR 끝위치'     ,   name: 'SUBSTR_ED_LOAD_LOC'      , width: 100, datatype: 'number', defval: 0 ,  isMultiLanguage:true}
                    ,{caption: '사용여부'       ,   name: 'USE_YN'      , width: 100, datatype: 'lov',isMultiLanguage:true}

                    ];

        //fc_setKeysInCol( gridId, [ 'JOB_BAS_ID','',''] ); // Read- Only 항목
        //fc_setUpperInCol( gridId, [ 'CC_PROC','HR_PROC','HR_FIN_PROC','PPL_PROC','PLTCM_PROC','CAL_PROC','CGL_PROC','RCL_PROC'] );

        //STRCT_DATA_TY Lov  " Hidden "
        fc_addDataInGettedLov ( 'STRCT_DATA_TY' , {code: 'STRCT_DATA_TY'    , tags: ''  , alias: ''} );
        fc_addDataInSettingLov(   {object: gridId+'.STRCT_DATA_TY'  , code: 'STRCT_DATA_TY' , format: 'K'   , nullable: true, defval: STRCT_TY });

        //최적화 여부 Lov  " Hidden "
        //fc_addDataInGettedLov ( 'OTMZT_YN'    , {code: 'OTMZT_YN' , tags: ''  , alias: ''} );
        //fc_addDataInSettingLov(   {object: gridId+'.OTMZT_YN' , code: 'OTMZT_YN'  , format: 'K'   , nullable: true, defval: '' });

        //TB_ID Lov
        fc_addDataInGettedLov ( 'TB_ID' , {code: 'TB_ID'    , tags: ''  , alias: ''} );
        fc_addDataInSettingLov(   {object: gridId+'.TB_ID'  , code: 'TB_ID' , format: 'K'   , nullable: true, defval: ''    });

        //데이터 타입 Lov
        fc_addDataInGettedLov ( 'DATA_TY'   , {code: 'DATA_TY'  , tags: ''  , alias: ''} );
        fc_addDataInSettingLov(   {object: gridId+'.DATA_TY'    , code: 'DATA_TY'   , format: 'K:V' , nullable: true, defval: ''    });

        //코드여부 Lov
        fc_addDataInGettedLov ( 'CD_YN' , {code: 'CD_YN'    , tags: ''  , alias: ''} );
        fc_addDataInSettingLov(   {object: gridId+'.CD_YN'  , code: 'CD_YN' , format: 'K:V' , nullable: true, defval: ''    });

        //조건결과 Lov
        fc_addDataInGettedLov ( 'COND_RST_TY'   , {code: 'COND_RST_TY'  , tags: ''  , alias: ''} );
        fc_addDataInSettingLov(   {object: gridId+'.COND_RST_TY'    , code: 'COND_RST_TY'   , format: 'K:V' , nullable: true, defval: ''    });

        //Master CD Lov
        //fc_addDataInGettedLov ( 'MASTER_CD'   , {code: 'MASTER_CD'    , tags: ''  , alias: ''} );
        //fc_addDataInSettingLov(   {object: gridId+'.MASTER_CD'    , code: 'MASTER_CD' , format: 'K:V' , nullable: true, defval: ''    });

        //WildCard 여부 Lov
        fc_addDataInGettedLov ( 'WDCARD_YN' , {code: 'WDCARD_YN'    , tags: ''  , alias: ''} );
        fc_addDataInSettingLov(   {object: gridId+'.WDCARD_YN'  , code: 'WDCARD_YN' , format: 'K'   , nullable: true, defval: ''    });

        //연산자 Lov
        fc_addDataInGettedLov ( 'OP_CD' , {code: 'OP_CD'    , tags: 'AB'    , alias: ''} );
        fc_addDataInSettingLov(   {object: gridId+'.OP_CD'  , code: 'OP_CD' , format: 'K:V' , nullable: true, defval: ''    });

        //사용여부 Lov
        fc_addDataInGettedLov ( 'USE_YN'    , {code: 'USE_YN'   , tags: ''  , alias: ''} );
        fc_addDataInSettingLov(   {object: gridId+'.USE_YN' , code: 'USE_YN'    , format: 'K:V' , nullable: true, defval: ''    });

        //SUBSTR 사용여부 Lov
        fc_addDataInGettedLov ( 'SUBSTR_USE_YN' , {code: 'SUBSTR_USE_YN'    , tags: ''  , alias: ''} );
        fc_addDataInSettingLov(   {object: gridId+'.SUBSTR_USE_YN'  , code: 'SUBSTR_USE_YN' , format: 'K'   , nullable: true, defval: ''    });

         fc_setMaxLengthInCol( gridId, [ 'ATTR_ID'], [ 100 ] ) ;
         fc_setMaxLengthInCol( gridId, [ 'ATTR_NM'], [ 200 ] ) ;
         fc_setMaxLengthInCol( gridId, ['ATTR_LTH','ATTR_DCML_PNT','UNT','SORT_SEQ'],[5]);
         fc_setMaxLengthInCol( gridId, [ 'SUBSTR_ST_LOAD_LOC','SUBSTR_ED_LOAD_LOC','SORT_SEQ'], [ 3 ] ) ;


        break;

    case 'INF_MSTR_LIST':  //SCOF1010
        gridId    = 'gridInfMstrList';
        if ( caption_flag ) {
            sCaption = 'gridInfMstrList';
            sItemCd  = 'CAP_INF_MSTR_LIST';
        };
        objGrpItems =   [
                            {caption: 'MES 처리'         , name: 'MES_INFO_GRP'        , align: 'center', isMultiLanguage:false},
                            {caption: '송수신정보'         , name: 'SEND_RCPT_GRP'       , align: 'center', isMultiLanguage:false},
                            {caption: 'I/F Inf.'       , name: 'INF_INFO_GRP'        , align: 'center', isMultiLanguage:false},
                            {caption: '송수신담당자'        , name: 'SEND_RCPT_PIC_GRP'   , align: 'center', isMultiLanguage:false},
                            ];
//      objGrpItems =   [
//                          {caption: 'MES 처리', name: 'MES_INFO_GRP', align: 'center' },
//                          {caption: '송수신정보', name: 'SEND_RCPT_GRP', align: 'center' },
//                      ];

        objItems = [
                     {caption: 'Plant CD'       ,   name: 'PLANT_CD'        , width:0       , datatype: 'lov'    , hidden: true}
                    ,{caption: '업무구분'           ,   name: 'CHAIN_CD'        , width:100     , datatype: 'lov'    , frozen:true, isMultiLanguage:false}
                    ,{caption: 'I/F ID'         ,   name: 'IF_ID'           , width:80      , datatype: 'text'   , frozen:true ,maxlength:5 ,align: 'center', isMultiLanguage:false}
                    ,{caption: 'I/F Name'       ,   name: 'IF_NM'           , width:240     , datatype: 'text'   , frozen:true, maxlength:200,frozen:true , isMultiLanguage:false}
                    ,{caption: '송수신구분'          ,   name: 'SEND_RCPT_TP'    , width:80      , datatype: 'lov'    , isMultiLanguage:false, group: 'MES_INFO_GRP',align: 'center'}
                    ,{caption: '처리유형'           ,   name: 'TREAT_TP'        , width:100     , datatype: 'lov'    , isMultiLanguage:false, group: 'MES_INFO_GRP',align: 'center'}
                    ,{caption: '중계 Master'      ,   name: 'RELAY_TB_MST'    , width:100     , datatype: 'text'   , maxlength:100, isMultiLanguage:false, group: 'MES_INFO_GRP',align: 'center'}
                    ,{caption: '중계 Detail'      ,   name: 'RELAY_TB_DTL'    , width:200     , datatype: 'text'   , maxlength:200, isMultiLanguage:false, group: 'MES_INFO_GRP',align: 'center'}
                    ,{caption: '송신처리 PGM'      ,    name: 'SEND_PGM'        , width:200     , datatype: 'text'   , maxlength:200, isMultiLanguage:false, group: 'MES_INFO_GRP',align: 'center'}
                    ,{caption: '수신처리 PGM'      ,    name: 'RCPT_TREAT_PGM'  , width:200     , datatype: 'text'   , maxlength:200, isMultiLanguage:false, group: 'MES_INFO_GRP',align: 'center'}
                    ,{caption: '송신'              ,  name: 'SEND_INFO'       , width:90      , datatype: 'lov'    , isMultiLanguage:false, group: 'SEND_RCPT_GRP', required:true,align: 'center'}
                    ,{caption: '수신'              ,  name: 'RCPT_INFO'       , width:90      , datatype: 'lov'    , isMultiLanguage:false, group: 'SEND_RCPT_GRP', required:true,align: 'center'}
                    ,{caption: '동기/비동기'      ,  name: 'SC_ASC_TP'       , width:90      , datatype: 'lov'    , isMultiLanguage:false, group: 'INF_INFO_GRP',align: 'center'}
                    ,{caption: '기동방법'            ,  name: 'MVNG_MTH'        , width:80      , datatype: 'lov'    , isMultiLanguage:false, group: 'INF_INFO_GRP',align: 'center'}
                    ,{caption: '기동주기'          ,    name: 'MVNG_CYCLE'      , width:150     , datatype: 'text'   , maxlength:100, isMultiLanguage:false, group: 'INF_INFO_GRP'}
                    ,{caption: '보관주기'          ,    name: 'STORAGE_CYCLE'   , width:80      , datatype: 'lov'    , maxlength:100, align: 'center', isMultiLanguage:false, group: 'INF_INFO_GRP'}
                    ,{caption: 'Sender'          ,  name: 'SEND_PIC'        , width:90      , datatype: 'text'   , maxlength:20, isMultiLanguage:false, group: 'SEND_RCPT_PIC_GRP'}
                    ,{caption: 'Receiver'        ,  name: 'RCPT_PIC'        , width:90      , datatype: 'text'   , maxlength:20, isMultiLanguage:false, group: 'SEND_RCPT_PIC_GRP'}
                    ,{caption: '(구)I/F ID'       ,  name: 'OLD_IF_ID'       , width:90      , datatype: 'text'   , maxlength:20, isMultiLanguage:false,align: 'center'}
                    ,{caption: '연관시스템/화면설명'   , name: 'DETAIL_INFO'     , width:200     , datatype: 'text'   , maxlength:20, isMultiLanguage:false}
                    ,{caption: 'Remark'          ,  name: 'REMARK'          , width:200     , datatype: 'text'   , maxlength:200, isMultiLanguage:false}
                    ];

        //Plant Code Lov  " Hidden "
        fc_addDataInGettedLov ( 'PLANT_CD'  , {code: 'PLANT_CD' , tags: ''  , alias: ''} );
        fc_addDataInSettingLov(   {object: gridId+'.PLANT_CD'   , code: 'PLANT_CD'  , format: 'K'   , nullable: true, defval:'' });


        //체인 Lov
        fc_addDataInGettedLov ( 'CHAIN_CD'  , {code: 'CHAIN_CD' , tags: ''  , alias: ''} );
        fc_addDataInSettingLov(   {object: gridId+'.CHAIN_CD'   , code: 'CHAIN_CD'  , format: 'V'   , nullable: true, defval: ''    });

        //송수신구분 Lov
        fc_addDataInGettedLov ( 'SEND_RCPT_TP'  , {code: 'SEND_RCPT_TP' , tags: ''  , alias: ''} );
        fc_addDataInSettingLov(   {object: gridId+'.SEND_RCPT_TP'   , code: 'SEND_RCPT_TP'  , format: 'V'   , nullable: true, defval: ''    });

        //처리유형 Lov
        fc_addDataInGettedLov ( 'TREAT_TP'  , {code: 'TREAT_TP' , tags: ''  , alias: ''} );
        fc_addDataInSettingLov(   {object: gridId+'.TREAT_TP'   , code: 'TREAT_TP'  , format: 'V'   , nullable: true, defval: ''    });

        //IF정보(송신) Lov
        fc_addDataInGettedLov ( 'SEND_INFO' , {code: 'SEND_RCPT_INFO'   , tags: ''  , alias: ''} );
        fc_addDataInSettingLov(   {object: gridId+'.SEND_INFO'  , code: 'SEND_RCPT_INFO'    , format: 'V'   , nullable: true, defval: ''    });

        //IF정보(수신) Lov
        fc_addDataInGettedLov ( 'RCPT_INFO' , {code: 'SEND_RCPT_INFO'   , tags: ''  , alias: ''} );
        fc_addDataInSettingLov(   {object: gridId+'.RCPT_INFO'  , code: 'SEND_RCPT_INFO'    , format: 'V'   , nullable: true, defval: ''    });

        //동기/비동기 Lov
        fc_addDataInGettedLov ( 'SC_ASC_TP' , {code: 'SC_ASC_TP'    , tags: ''  , alias: ''} );
        fc_addDataInSettingLov(   {object: gridId+'.SC_ASC_TP'  , code: 'SC_ASC_TP' , format: 'V'   , nullable: true, defval: 'Y'   });

        //기동방법 Lov
        fc_addDataInGettedLov ( 'MVNG_MTH'  , {code: 'MVNG_MTH' , tags: ''  , alias: ''} );
        fc_addDataInSettingLov(   {object: gridId+'.MVNG_MTH'   , code: 'MVNG_MTH'  , format: 'V'   , nullable: true, defval: 'Y'   });
        fc_setRequiredInCol( gridId, [ 'CHAIN_CD', 'IF_ID', 'ALARM_MSG_ID', 'ALARM_TYPE', 'ALARM_MSG_CONTENTS' ] );

        //보관주기 Lov
        fc_addDataInGettedLov ( 'STORAGE_CYCLE' , {code: 'INF_STO_CYC'  , tags: ''  , alias: ''} );
        fc_addDataInSettingLov(   {object: gridId+'.STORAGE_CYCLE'  , code: 'INF_STO_CYC'   , format: 'V'   , nullable: true, defval: 'Y'   });
        
        break;
    case 'INF_DB2DB_LIST' : // SCOF2010
        gridId = 'divDB2DBLog';
        if ( caption_flag ) {
            sCaption = 'divDB2DBLog';
            sItemCd  = 'CAP_DB2DB_LOG';
        };
        objItems =  [
                     {caption: 'Plant CD'   ,   name: 'PLANT_CD'        , width:0       , datatype: 'lov'    , hidden: true}
                    ,{caption: '일시'         ,   name: 'IF_TIMESTAMP'    , width:140     , datatype: 'text'   , align: 'center', frozen:true , isMultiLanguage:false}
                    ,{caption: '상태'         ,   name: 'IF_SEND_RCPT_TP' , width:80      , datatype: 'lov'    , align: 'center', frozen:true , isMultiLanguage:false}
                    ,{caption: '처리결과'       ,   name: 'IF_TRT_STATUS'   , width:120     , datatype: 'lov'    , align: 'left', frozen:true , isMultiLanguage:false}
                    ,{caption: 'I/F ID'     ,   name: 'IF_TC_ID'        , width:150     , datatype: 'text'    , align: 'center', frozen:true , isMultiLanguage:false}
                    ,{caption: '송신처'        ,   name: 'SEND_INFO'       , width:100     , datatype: 'text'    , align: 'center', isMultiLanguage:false}
                    ,{caption: '수신처'        ,   name: 'RCPT_INFO'       , width:100     , datatype: 'text'    , align: 'center', isMultiLanguage:false}
                    ,{caption: '처리유형'       ,   name: 'TREAT_TP'        , width:100     , datatype: 'lov'    , align: 'center', isMultiLanguage:false}
                    ,{caption: 'Content'    ,   name: 'IF_CONTENTS'     , width: 'auto', datatype: 'text'  , align: 'left', itemCd: 'CONTENTS', isMultiLanguage:false}
                    ,{caption: 'Remarks'    ,   name: 'REMARK'          , width: 'auto', datatype: 'text' , align: 'left', isMultiLanguage:false}
                    ,{caption: '업무구분'       ,   name: 'CHAIN_CD'        , width:120     , datatype: 'lov'    , align: 'center', isMultiLanguage:false}
                    ,{caption: 'Map. Table Name', name: 'RELAY_TB_MST', width:  300, datatype: 'text' , align: 'left', isMultiLanguage:false}
                    ,{caption: 'I/F Seq No', name: 'IF_SEQ_NO' , width:  50, datatype: 'text'                    , isMultiLanguage:false, hidden: true}
                    ];

        fc_addDataInSettingLov( {object: gridId+'.PLANT_CD'                , code: 'PLANT_CD', format: 'V', nullable: true , defval: ''} );
        fc_addDataInSettingLov( {object: gridId+'.IF_SEND_RCPT_TP'           , code: 'SEND_RCPT_TP', format: 'K:V', nullable: true , defval: ''} );
        fc_addDataInSettingLov( {object: gridId+'.IF_TRT_STATUS'           , code: 'INF_DB_STS', format: 'V', nullable: true , defval: ''} );
        fc_addDataInSettingLov( {object: gridId+'.TREAT_TP'                , code: 'TREAT_TP', format: 'V', nullable: true , defval: ''} );
        fc_addDataInSettingLov( {object: gridId+'.CHAIN_CD'                , code: 'CHAIN_CD', format: 'V', nullable: true , defval: ''} );
        
        break;

    case 'DATA_DICTIONARY_LIST' : // SCOH1010
        gridId = 'gridDDList';
        if ( caption_flag ) {
            sCaption = 'gridDDList';
            sItemCd  = 'CAP_DD_LIST';
        };
        objItems =  [
                     {caption: '표준약어'        ,  name: 'STD_ABBR'    , width:200     , datatype: 'text'    , align: 'left',  isMultiLanguage:false}
                    ,{caption: '용어 한글명'  ,  name: 'WRD_KOR_NM'  , width:300     , datatype: 'text'    , align: 'left',  isMultiLanguage:false}
                    ,{caption: '용어 영문명'  ,  name: 'WRD_ENG_NM'  , width:300     , datatype: 'text'    , align: 'left', isMultiLanguage:false}
                    ,{caption: '동의어'         ,  name: 'SYNM'        , width:300     , datatype: 'text'    , align: 'left', isMultiLanguage:false}
                    ,{caption: '비고'          ,  name: 'RMRK'        , width:300     , datatype: 'text'    , align: 'left', isMultiLanguage:false}
                    ];
        
        break;
        
    case 'STD_ATTR_LIST' : // SCOH1020
        gridId = 'gridStdAttrList';
        if ( caption_flag ) {
            sCaption = 'gridStdAttrList';
            sItemCd  = 'CAP_STD_ATTR_LIST';
        };
        objItems =  [
                     {caption: '표준항목ID'      ,  name: 'STD_ATTR_ID' , width:250     , datatype: 'text'    , align: 'left',  isMultiLanguage:false}
                    ,{caption: '표준항목명'   ,  name: 'STD_ATTR_NM' , width:250     , datatype: 'text'    , align: 'left',  isMultiLanguage:false}
                    ,{caption: '표준항목 TYPE'   ,  name: 'STD_ATTR_TY' , width:200     , datatype: 'text'    , align: 'left', isMultiLanguage:false}
                    ,{caption: '표준항목 자리수'        ,  name: 'STD_ATTR_CPHR'       , width:150     , datatype: 'text'    , align: 'right', isMultiLanguage:false}
                    ,{caption: '표준항목 소수점'        ,  name: 'STD_ATTR_DCML_PNT'       , width:150     , datatype: 'text'    , align: 'right', isMultiLanguage:false}
                    ,{caption: '비고'          ,  name: 'RMRK'        , width:300     , datatype: 'text'    , align: 'left', isMultiLanguage:false}
                    ];
        
        break;
        
    case 'UN_STD_ATTR_LIST' : // SCOH1030
        gridId = 'gridUnStdAttrList';
        if ( caption_flag ) {
            sCaption = 'gridUnStdAttrList';
            sItemCd  = 'CAP_UN_STD_ATTR_LIST';
        };
        objItems =  [
                     {caption: '테이블명'        ,  name: 'TABLE_NAME'        , width:200       , datatype: 'text'    , align: 'left',  isMultiLanguage:false}
                    ,{caption: '테이블한글명'  ,  name: 'TABLE_COMMENT'     , width:200       , datatype: 'text'    , align: 'left',  isMultiLanguage:false}
                    ,{caption: '컬럼ID'        ,  name: 'COLUMN_ID'         , width:50        , datatype: 'text'    , align: 'right', isMultiLanguage:false}
                    ,{caption: '컬럼 영문명'  ,  name: 'COLUMN_NAME'       , width:200       , datatype: 'text'    , align: 'left', isMultiLanguage:false}
                    ,{caption: '컬럼 한글명'  ,  name: 'COLUMN_FULL_NAME'  , width:200       , datatype: 'text'    , align: 'left', isMultiLanguage:false}
                    ,{caption: '데이터 TYPE'    ,  name: 'DATA_TYPE'         , width:120       , datatype: 'text'    , align: 'left', isMultiLanguage:false}
                    ,{caption: '자리수'         ,  name: 'DATA_LENGTH'       , width:80        , datatype: 'text'    , align: 'right', isMultiLanguage:false}
                    ,{caption: '소수점'         ,  name: 'DATA_DCML_PNT'     , width:80        , datatype: 'text'    , align: 'right', isMultiLanguage:false}
                    ,{caption: '비표준 유형'  ,  name: 'UN_STD_TY'         , width:250       , datatype: 'lov'    , align: 'left', isMultiLanguage:false}
                    ];
        
        fc_addDataInSettingLov( {object: gridId+'.UN_STD_TY'             , code: 'UN_STD_TY', format: 'V', nullable: true , defval: ''} );
        //fc_addDataInSettingLov( {object: gridId+'.CHAIN_CD'              , code: 'CHAIN_CD', format: 'V', nullable: true , defval: ''} );
        
        break;
    
    case 'TEST_TEST' : // SCOZEX99
        gridId = 'gridQueryMaster';
        if ( caption_flag ) {
            sCaption = 'Query Master Information';
            sItemCd  = 'CAP_QUERY_MASTER_INFO';
        };
        objItems =  [
                    {caption: '컬럼1'  , name: 'COL1', width: 100, datatype: 'number2',  isMultiLanguage:false},
                    {caption: '컬럼2'  , name: 'COL2', width: 100, datatype: 'hourmin',  isMultiLanguage:false},
                    {caption: '컬럼3'  , name: 'COL3', width: 100, datatype: 'text',  isMultiLanguage:false},
                    {caption: '컬럼4'  , name: 'COL4', width: 100, datatype: 'text',  isMultiLanguage:false},
                    {caption: '컬럼5'  , name: 'COL5', width: 100, datatype: 'text',  isMultiLanguage:false},
                    {caption: '컬럼6'  , name: 'COL6', width: 100, datatype: 'text',  isMultiLanguage:false},
                    {caption: '컬럼7'  , name: 'COL7', width: 100, datatype: 'text',  isMultiLanguage:false},
                    {caption: '컬럼8'  , name: 'COL8', width: 100, datatype: 'text',  isMultiLanguage:false},
                    {caption: '컬럼9'  , name: 'COL9', width: 100, datatype: 'text',  isMultiLanguage:false},
                    {caption: '컬럼10' , name: 'COL10', width: 100, datatype: 'text',  isMultiLanguage:false},
                    {caption: '컬럼11' , name: 'COL11', width: 100, datatype: 'number3',  isMultiLanguage:false, maxlength:5},
        ];
        

        
        
        break;
        
        case 'G_SCOR0000P1' : // SCOR0000P1
            gridId = 'grid_G_SCOR0000P1';
            objItems =  [
                        {caption: '표준번호',           name: 'SPEC_NO',    width: "20%",   datatype: 'text',  isMultiLanguage:false},
                        {caption: 'Document Name',  name: 'DOC_TITLE',  width: "auto",  datatype: 'text',  isMultiLanguage:false},
                        
                        {caption: '',               name: 'DOC_URL',    width: 0,       datatype: 'text', hidden:true}
                        ];
            break;

    };
    var gridCaption = fc_makeGridCaption( sCaption, sItemCd, 0 );
    var ret = { id: gridId, item: objItems, grpItem: objGrpItems, caption: gridCaption, key: gridKey };
    return ret;
}; // end of fm_getGridItems
/**
 * f_setParamPopup
 * @param objData
 * @returns returnObj
 */
function f_setParamPopup ( objData ) {
    var returnObj = {title: '', manSearch: '', optTitle: '', optSearch: '', optResult: '',optCondition:new Object() };
    var sManSearch = '', sOptResult = '', sOptTitle = '', sOptSearch = '', sTitle = '';

    switch( objData.code ) {
        case 'DATA_UPLOAD_LIST':
            var result = fc_checkMandatoryEntry( fc_getInputVal( 'BIZ_CHAIN_CD' ), fc_getLabelText( 'LBL_BIZ_CHAIN_CD' ) );
            if ( result[ 0 ] == false ) {
                 throw new Error( result[ 1 ] );
            };
            sManSearch = fc_getInputVal( 'BIZ_CHAIN_CD' );
            sOptTitle  = fc_getLabelText( 'LBL_UPLOAD_ID' ) + ',' + fc_getMultiItem('CAP_UPLOAD_NM');
            sOptSearch = fc_getInputVal ( 'UPLOAD_ID'     ) + ',' + '';
            sOptResult = fc_getLabelText( 'LBL_UPLOAD_ID' ) + ',' + fc_getMultiItem('CAP_UPLOAD_NM' ) + ',' + fc_getMultiItem('REMARKS') ;
            break;
        case 'TAB_LIST':
            var result = fc_checkMandatoryEntry( fc_getInputVal( 'BIZ_CHAIN_CD' ), fc_getLabelText( 'LBL_BIZ_CHAIN_CD' ) );
            if ( result[ 0 ] == false ) {
                 throw new Error( result[ 1 ] );
            };
            sManSearch = fc_getInputVal( 'BIZ_CHAIN_CD' );
            sOptTitle  = fc_getLabelText( 'LBL_TAB_NM' );
            sOptSearch = '';
            sOptResult = fc_getLabelText( 'LBL_TAB_NM' ) + ',' + fc_getLabelText( 'LBL_BIZ_CHAIN_CD' ) + ',' + fc_getMultiItem( 'REMARKS' ) ;
            break;
        case 'USER_LIST':
            sManSearch = '';
            sOptResult = fc_getMultiItem( 'USER_ID' ) +","+ fc_getMultiItem( 'USER_NM' );
            if  ( fc_isNull(objData.manKey) ) {
                sOptTitle  = fc_getLabelText( 'LBL_USER_ID' ) +","+ fc_getLabelText( 'LBL_USER_NM' );
                sOptSearch = fc_getInputVal( 'USER_ID' ) +","+ fc_getInputVal( 'USER_NM' );
            } else {
                sOptTitle  = fc_getColProp( objData.manKey, 'USER_ID', 'text' ) +","+ fc_getColProp( objData.manKey, 'USER_NM', 'text' );
            };
            break;
        case 'SCREEN_CD_LIST' :
            sManSearch = '';
            sOptTitle  = '화면ID,화면명';//fc_getMultiItem( 'SCR_ID' ) + "," + fc_getMultiItem( 'SCR_NM' );
            sOptSearch = '';
            sOptResult = '화면ID,화면명,비고';//fc_getMultiItem( 'SCR_ID' ) + "," + fc_getMultiItem( 'SCR_NM' ) + "," + fc_getMultiItem( 'PGM_TY' );
            break;
        case 'MSG_LIST' :
            sManSearch = '';
            sOptTitle  = '메시지ID,메시지유형,메시지';//fc_getMultiItem( 'MSG_ID' ) + "," + fc_getMultiItem( 'MSG_TY' ) + "," + fc_getMultiItem( 'MESSAGE' );
            sOptSearch = '';
            sOptResult = '메시지ID,메시지유형,메시지';//fc_getMultiItem( 'MSG_ID' ) + "," + fc_getMultiItem( 'MSG_TY' ) + "," + fc_getMultiItem( 'MESSAGE' );
            break;
        case 'EMAIL_LIST' :
            sManSearch = '';
            sOptTitle  = fc_getMultiItem( 'EMAIL_ID' ) + "," + fc_getMultiItem( 'EMAIL_NM' );
            sOptSearch = '';
            sOptResult = fc_getMultiItem( 'EMAIL_ID' ) + "," + fc_getMultiItem( 'EMAIL_NM' );
            break;
        case 'EMP_LIST' :
            sManSearch = '';
            sOptTitle  = fc_getMultiItem( 'EMP_NO' ) + "," + fc_getMultiItem( 'EMP_NM' );
            sOptSearch = '';
            sOptResult = fc_getMultiItem( 'EMP_NO' ) + "," + fc_getMultiItem( 'EMP_NM' );
            break;
        case 'ROLE_LIST' :
            sManSearch = '';
            sOptResult = fc_getMultiItem( 'ROLE_CD' ) + "," + fc_getMultiItem( 'ROLE_NM' );
            if  ( fc_isNull(objData.manKey) ) {
                sOptTitle  = fc_getLabelText( 'LBL_ROLE_CD') + "," + fc_getLabelText( 'LBL_ROLE_NM' );
                sOptSearch = fc_getInputVal( 'ROLE_CD' )     + "," + fc_getInputVal( 'ROLE_NM' );
            } else {
                sOptTitle  = fc_getColProp( objData.manKey, 'ROLE_CD', 'text' ) +","+ fc_getColProp( objData.manKey, 'ROLE_NM', 'text' );
            };
            break;

        case 'SCREEN_CD_LIST' : //SCO1010 사용화면 ID
            sManSearch = '';
            sOptTitle  = fc_getMultiItem( 'SCR_ID' ) + "," + fc_getMultiItem( 'SCR_NM' );
            sOptSearch = '';
            sOptResult = fc_getMultiItem( 'SCR_ID' ) + "," + fc_getMultiItem( 'SCR_NM' ) + "," + fc_getMultiItem( 'PGM_TY' );
            break;

        case 'MD_SUPPLIER_CD' : //SCO1010 사용화면 ID
            sManSearch = '';
            sOptTitle  = "공급사번호,공급사명";
            sOptSearch = '';
            sOptResult = "공급사번호,공급사명";
            break;

        case 'MD_CUST_CD' : //SCO1010 사용화면 ID
            sManSearch = '';
            sOptTitle  = "고객번호,고객명";
            sOptSearch = '';
            sOptResult = "고객번호,고객명";
            break;
            
        default:
            sTitle     = fc_getMultiItem( objData.manKey );
            sOptTitle  = fc_getMultiItem( 'CAP_CODE' ) + ',' + fc_getMultiItem( 'CAP_NM' );
            sOptResult = fc_getMultiItem( 'CAP_CODE' ) + ',' + fc_getMultiItem( 'CAP_NM' );
            sOptSearch = '';
            break;
    };
    returnObj['title'    ] = sTitle;
    returnObj['manSearch'] = sManSearch;
    returnObj['optTitle' ] = sOptTitle;
    returnObj['optSearch'] = sOptSearch;
    returnObj['optResult'] = sOptResult;
    returnObj['optCondition'] = objData.setConditon;

    return returnObj;
}; // end of f_setParamPopup
/* ==========================================================================================================
 * SCO Common Functions
 * =========================================================================================================*/
/**
 * fm_parsingData
 * @param gridId
 * @param dataObj
 * @param idxTc
 */
function fm_parsingData( gridId, dataObj, idxTc ) {
    var lthSum     = 0;
    var setContent = '';
    var ids        = fc_getGridRecordCount( gridId );
    var data       = dataObj.data;
    var tcParseTy  = dataObj.tcParseTy;
    for ( var i=0;i<ids;i++ ) {
        var attrLth = parseFloat( fc_getCellData( gridId, i, 'ATTR_LTH' ) );
        var attrTy  = fc_getCellData( gridId, i, 'ATTR_TY' );
        var sColNm  = fc_isNull( idxTc ) ? 'SPLIT_CONTENTS' : 'SPLIT_CONTENTS' + idxTc;

        if ( attrTy != 'G' ) {
            setContent = fc_cutFmtStr( data, lthSum, attrLth, tcParseTy );
            fc_setCellData( gridId, i, sColNm, setContent );
            lthSum += attrLth;
        };
    };
}; // end of fm_parsingData
/**
 * fm_sendTcData
 * @param gridId
 * @param idxTc
 * @param moduleCd
 * @param sendTy
 * @param dataGroupId
 * @param tcParseTy
 * @returns {Boolean}
 */
function fm_sendTcData( gridId, idxTc, moduleCd, sendTy, dataGroupId, tcParseTy, tcTransTy, tcTransTbl, tcId ) {
    var bResult = false;
    fc_showConfirmMessage( 'T' , null, function () {
        fc_progress ( true );

        var infService = "";
        //tc send: full tc text(string)
        if ( tcTransTy != 'D' ) {
            window.gwJsonParam[ 'message' ] = fm_makeTcData( gridId, idxTc, tcParseTy );
        } else {
            window.gwJsonParam[ 'message' ] = fm_makeJsonData( gridId, idxTc, tcTransTbl, tcId );
        };
        window.gwJsonParam[ 'sender' ] = 'M';

        fc_showLog( 2, "window.gwJsonParam[ 'message' ]", window.gwJsonParam[ 'message' ] );
        fc_showLog( 2, ' <##fm_sendTcData Parameter##> ', tcParseTy );
        fc_showLog( 2, 'gwJsonPram: ', window.gwJsonParam);
        if ( sendTy == 'R' ) {
            infService = 'infTcReceiptController-service';
        } else {
            window.gwJsonParam[ 'interface-id'   ] = $( '#H_EAI_INF_ID'   , $( '#' + dataGroupId ) ).val();
            window.gwJsonParam[ 'service-broker' ] = $( '#H_EAI_BROKER_NM', $( '#' + dataGroupId ) ).val();
            window.gwJsonParam[ 'mergeflag'      ] = $( '#H_MERGE_FL'     , $( '#' + dataGroupId ) ).val();
            window.gwJsonParam[ 'asyncflag'      ] = $( '#H_ASYNC_FL'     , $( '#' + dataGroupId ) ).val();

            infService = 'infTcSendController-service';
        };

        if ( fc_submit( 'save', infService, 'success', '', '', moduleCd ) ) {
            var resultData = window.gwJsonResult;
            try {
                if ( !fc_isNull( resultData[ 'tcErrorMsg' ] ) ) {
                    fc_showMessageBox( resultData[ 'tcErrorMsg' ], 'W', '', 700 );
                } else {
                    fc_showCompleteMessage( 'T' );
                };
            } catch ( e ) {
                fc_progress ( false );
                fc_getException ( e );
            };
            fc_progress ( false );
        };
        fc_progress ( false );
    });
    bResult = true;
    return bResult;
}; // end of fm_sendTcData
/**
 * fm_makeTcData
 * @param gridId
 * @param idxTc
 * @param tcParseTy
 * @returns {String}
 */
function fm_makeTcData( gridId, idxTc, tcParseTy ) {
    var blank = ' ';
    var newTC = '';
    var ids   = fc_getGridRecordCount( gridId );

    for ( var i=0;i<ids;i++ ) {
        var attrTy = fc_getCellData( gridId, i, 'ATTR_TY' );
        var sColNm = fc_isNull( idxTc ) ? 'SPLIT_CONTENTS' : 'SPLIT_CONTENTS' + idxTc;

        if ( attrTy != 'G' ) {
            var oldTC   = fc_getCellData( gridId, i, sColNm );
            var attrLth = parseFloat( fc_getCellData( gridId, i, 'ATTR_LTH' ) );

            newTC += fc_getFmtStr( oldTC, attrLth, ' ', true, tcParseTy );
        };
    };
    return newTC;
}; // end of fm_makeTcData
/**
 * fm_makeJsonData
 * @param gridId
 * @param idxTc
 * @param tcParseTy
 * @returns {String}
 */
function fm_makeJsonData( gridId, idxTc, transTbl, tcId ) {
    var blank   = ' ';
    var newTC   = '';
    var ids     = fc_getGridRecordCount( gridId );
    var grpSeq  = 0;
    var grpName = "";

    var emptyDataFlag = true;
    var rtnJsonObj    = {};
    var jsonMasterObj = {};
    var jsongroupObj  = {};
    var transObj      = {};

    var arrRtnJsonObj = [];
    var arrtransObj   = [];
    var arrjsongroup  = [];

    var sColNm   = fc_isNull( idxTc ) ? 'SPLIT_CONTENTS' : 'SPLIT_CONTENTS' + idxTc;
    for ( var i=0;i<ids;i++ ) {
        var attrTy    = fc_getCellData( gridId, i, 'ATTR_TY' );
        var mapAttrCd = fc_getCellData( gridId, i, 'MAP_ATTR_CD' );
        var oldTC     = fc_isNull( fc_getCellData( gridId, i, sColNm ) ) ? '' : fc_getCellData( gridId, i, sColNm );

        if ( attrTy == 'E' ) {
            if ( !fc_isNull( grpName ) ) {
                if ( !emptyDataFlag ) arrjsongroup[ arrjsongroup.length ] = jsongroupObj;
                rtnJsonObj[ grpName ] = arrjsongroup;
                grpName       = "";
                jsongroupObj  = {};
                arrjsongroup  = [];
                emptyDataFlag = true;
            };
            jsonMasterObj[ mapAttrCd ] = oldTC.trim();

            if ( i == 0 ) {
                transObj   [ 'TRANSACTION_CODE' ] = tcId;
                arrtransObj[ arrtransObj.length ] = transObj;
                rtnJsonObj [ 'TRANSACTION_CODE' ] = arrtransObj;
            };
        } else if ( attrTy == 'GE' ) {
            var groupAttrCd = fc_getCellData( gridId, i, 'GRP_ATTR_CD'  );
            var grpseqTy    = fc_getCellData( gridId, i, 'ATTR_GRP_SEQ' );

            if ( groupAttrCd != grpName ) {
                if ( !fc_isNull( grpName ) ) {
                    rtnJsonObj[ grpName ] = arrjsongroup;
                    arrjsongroup = [];
                };
                grpName = groupAttrCd;
            };

            if ( grpSeq != 0 && grpSeq != grpseqTy ) {
                if ( !emptyDataFlag ) arrjsongroup[ arrjsongroup.length ] = jsongroupObj;
                grpName       = "";
                jsongroupObj  = {};
                grpSeq        = grpseqTy;
                emptyDataFlag = true;
            } else if ( grpSeq == 0 ) {
                grpSeq = grpseqTy;
            };
            if ( !fc_isNull( oldTC ) ) emptyDataFlag = false;
            jsongroupObj[ mapAttrCd ] = oldTC.trim();
        };
    }; // end of for ( var i=0;i<ids;i++ ) {

    if ( !fc_isNull( grpName ) ) {
        if ( !emptyDataFlag ) arrjsongroup[ arrjsongroup.length ] = jsongroupObj;
        rtnJsonObj  [ grpName ] = arrjsongroup;
    };

    arrRtnJsonObj[ arrRtnJsonObj.length ] = jsonMasterObj;
    rtnJsonObj[ transTbl ] = arrRtnJsonObj;
    return JSON.stringify( rtnJsonObj );
}; // end of fm_makeJsonData
/**
 * fm_makeMultiLangGrid: SCO-362,363,364,365,366
 * @param sCategory
 * @returns
 */
function fm_makeMultiLangGrid( sCategory ) {
    var gridMultiLang = fc_makeGrid( 'divMultiLang', 'update', 'MULTI_LANG_INFO', '', false, sCategory );
    gridMultiLang.setGridPKeys( new Array( 'LANG_ID','CATEGORY','LANG_CD' ) );

    gridMultiLang.setColEditable( new Array( 'LANG_NM' ), false );
    gridMultiLang.setColHidden( [ 'LANG_ID','CATEGORY' ] );

    return gridMultiLang;
}; // end of fm_makeMultiLangGrid


function f_custPopup(objectId, selectedRowIdx){
    switch ( objectId ){
    case 'gridJobBasMstrList.LINK_POPUP1' :
            alert(objectId + '//' + selectedRowIdx + '//' +  fc_getCellData(gridOrdStdId, selectedRowIdx,'LINK_POPUP1'));
            fc_linkagePopup('SCOM1020', [{name : 'JOB_BAS_ID',value : fc_getCellData(gridOrdStdId,selectedRowIdx, 'JOB_BAS_ID')}
            ,{name : 'CHAIN_CD',value : fc_getCellData(gridOrdStdId,selectedRowIdx, 'CHAIN_CD')}
            ,{name : 'PLANT_CD',value : fc_getCellData(gridOrdStdId,selectedRowIdx, 'PLANT_CD')}
            ,{name : 'OTMZT_YN',value : fc_getCellData(gridOrdStdId,selectedRowIdx, 'OTMZT_YN')}
            ,{name : 'CALL_SCR',value : 'SCOM1010'}
            ], '95%', '95%', true);
        break;
    case 'gridJobBasMstrList.LINK_POPUP2' :
        alert(objectId + '//' + selectedRowIdx + '//' +  fc_getCellData(gridOrdStdId, selectedRowIdx,'LINK_POPUP2'));
        fc_linkagePopup('SCOM1030', [{name : 'JOB_BAS_ID',value : fc_getCellData(gridOrdStdId,selectedRowIdx, 'JOB_BAS_ID')}
        ,{name : 'CHAIN_CD',value : fc_getCellData(gridOrdStdId,selectedRowIdx, 'CHAIN_CD')}
        ,{name : 'PLANT_CD',value : fc_getCellData(gridOrdStdId,selectedRowIdx, 'PLANT_CD')}
        ,{name : 'OTMZT_YN',value : fc_getCellData(gridOrdStdId,selectedRowIdx, 'OTMZT_YN')}
        ,{name : 'CALL_SCR',value : 'SCOM1010'}
        ], '95%', '95%', true);
    };
}; // end of f_custPopup

function f_afterRowControl ( gridEvent) {


    var selRows = fc_getSelectedRow( gridEvent.GRID_ID );
    //if (  gridEvent.EVENT == 'I'  && gridEvent.GRID_ID == gridOrdStdId ) {
    if (  gridEvent.EVENT == 'I'  ) {

        switch( gridEvent.GRID_ID ) {
            case 'gridJobBasMstrList':  // SCOM1010
                // 행추가시 Default Plant code 세팅 "K123"
                fc_setCellData( gridEvent.GRID_ID, gridEvent.ROW_IDX, 'PLANT_CD' , fc_getGirdLovValue( gridEvent.GRID_ID, 'PLANT_CD', CUR_PLANT_CD  ));
                //fc_setColEditable( gridEvent.GRID_ID, [ 'JOB_BAS_ID' ], false );
                break;
            case 'gridMstrJobInfoList':  // S100051 통합형 info

                fc_setCellData( gridEvent.GRID_ID, gridEvent.ROW_IDX, 'USE_YN' ,  fc_getGirdLovValue( gridEvent.GRID_ID, 'USE_YN', 'Y' ));
                fc_setCellData( gridEvent.GRID_ID, gridEvent.ROW_IDX, 'IO_TY' ,  fc_getGirdLovValue( gridEvent.GRID_ID, 'IO_TY', 'I' ));

                break;
            case 'gridMstrJobInfoDtlList':  // S100051 통합형 Detail

                fc_setCellData( gridEvent.GRID_ID, gridEvent.ROW_IDX, 'USE_YN' ,  fc_getGirdLovValue( gridEvent.GRID_ID, 'USE_YN', 'Y' ));

                break;
            /*case 'gridStrctMgtList':  // SCOM1020, SCOM1040


                // 행추가시 Default STRCT Type세팅 "1"
                fc_setCellData( gridEvent.GRID_ID, gridEvent.ROW_IDX, 'STRCT_DATA_TY' , fc_getGirdLovValue( gridEvent.GRID_ID, 'STRCT_DATA_TY', STRCT_TY  ));
                //행추가시 Default Seq 세팅 "0" numeric value 0 으로 세팅
                fc_setCellData( gridEvent.GRID_ID, gridEvent.ROW_IDX, 'SEQ' , '0');
                fc_setCellData( gridEvent.GRID_ID, gridEvent.ROW_IDX, 'SORT_SEQ' ,  -(gridEvent.ROW_IDX) );

                fc_setCellData( gridEvent.GRID_ID, gridEvent.ROW_IDX, 'WDCARD_YN' , fc_getGirdLovValue( gridEvent.GRID_ID, 'WDCARD_YN', 'N'  ));
                fc_setCellData( gridEvent.GRID_ID, gridEvent.ROW_IDX, 'SUBSTR_USE_YN' , fc_getGirdLovValue( gridEvent.GRID_ID, 'SUBSTR_USE_YN', 'N'  ));
            //  fc_setColProp( gridEvent.GRID_ID, gridEvent.ROW_IDX['WDCARD_YN'], 'cellbeginedit', true);
                fc_setCellData( gridEvent.GRID_ID, gridEvent.ROW_IDX, 'USE_YN' ,  fc_getGirdLovValue( gridEvent.GRID_ID, 'USE_YN', 'Y' ));
            //  fc_setCellData( gridEvent.GRID_ID, gridEvent.ROW_IDX, 'SORT_SEQ' , '0');
            //  fc_setCellData( gridEvent.GRID_ID, gridEvent.ROW_IDX, 'ATTR_LTH' , '0');
            //  fc_setCellData( gridEvent.GRID_ID, gridEvent.ROW_IDX, 'ATTR_DCML_PNT' , '0');

                break;*/

            case 'gridStrctRsltList':  // SCOM1020

                //행추가시 Default Seq - hidden 세팅 "0"
                fc_setCellData( gridEvent.GRID_ID, gridEvent.ROW_IDX, 'SEQ' , '0');

                break;
            case 'gridStrctDataMgtList' : // SCOM1030
                //행추가시 Row_num default값 세팅

                fc_setCellData( gridEvent.GRID_ID, gridEvent.ROW_IDX, 'ROW_NUM' , '0');
                fc_setCellData( gridEvent.GRID_ID, gridEvent.ROW_IDX, 'DEFAULT_YN' ,  fc_getGirdLovValue( gridEvent.GRID_ID, 'DEFAULT_YN', 'N' ));
//              var conArr = [];
//              for(i = 0; i < condCnt; i++){
//                  conArr[i] = "COND_ATTR" + (i+1) + "_OP_CD" ;
//              }+
//


                for(i = 0;  i < condCnt ; i++){
//alert( window.gwJsonResult.RK_RSLT_STRCT_DATA_LIST[0][conArr[i]]);

//alert( window.gwJsonResult.RK_STRCT_DATA_HEADER_LIST[0].OP_CD);
        //          console.log('header List OP value=======' + condOpcd[i]);
                    fc_setCellData( gridEvent.GRID_ID, gridEvent.ROW_IDX,'COND_ATTR' +  (i+1) +  '_OP_CD' ,
                        fc_getGirdLovValue(gridEvent.GRID_ID, "COND_ATTR1_OP_CD", condOpcd[i]));
                }
                break;
            case 'gridMainList' : // SCOM1050
                //행추가시 Row_num default값 세팅

                fc_setCellData( gridEvent.GRID_ID, gridEvent.ROW_IDX, 'ROW_NUM' , '0');
                fc_setCellData( gridEvent.GRID_ID, gridEvent.ROW_IDX, 'DEFAULT_YN' ,  fc_getGirdLovValue( gridEvent.GRID_ID, 'DEFAULT_YN', 'N' ));
                break;

            case 'gridFrmlStrctMgtList' : // SCOM2020 계산식 정보 Grid
                //행추가시 SEQ default값 세팅
                if( fc_getGridRecordCount( 'gridFrmlStrctMgtList' ) > 0 ){
                var gridLastIndex = fc_getGridRecordCount( 'gridFrmlStrctMgtList' ) ;

                    fc_setCellData( gridEvent.GRID_ID, gridEvent.ROW_IDX, 'SEQ' ,  gridLastIndex );

                }

                break;
            case 'gridFrmlConstMgt' : // SCOM2020
                //행추가시 SEQ default값 세팅
                if( fc_getGridRecordCount( 'gridFrmlConstMgt' ) > 0 ){
                    var tempSeq = window.gwJsonResult.RK_FRML_STRCT_CNST_MGT_LIST[0].SEQ
                    fc_setCellData( gridEvent.GRID_ID, gridEvent.ROW_IDX, 'SEQ' ,  tempSeq );

                }

                break;
        };
    }
 }; // end of f_afterRowControl

 var s10Auth;
 function fc_getS10Authority(pgmId) {
        var mnuId = "";
        if(fc_isNull(pgmId)) return;
        window.gwJsonParam[ 'PGM_ID'  ] = pgmId;
        window.gwJsonParam[ 'USER_ID' ] = window.gwMesEnv.user.id;
        if ( !fc_submit( '', 'ict.screen.mdm.scom1020.menuid-service', 'searchMenuId', '', '', 'SCO' ) ) return;

        mnuId = window.gwJsonResult.RK_MENU_ID[ 0 ].MNU_ID ;

        window.gwJsonParam[ 'USER_ID' ] = window.gwMesEnv.user.id;
        window.gwJsonParam[ 'PGM_ID'  ] = pgmId;
        window.gwJsonParam[ 'MNU_ID'  ] = mnuId;
        window.gwJsonParam[ 'LANG_CD' ] = window.gwMesEnv.lang.cd;


        if ( !fc_submit( '', 'ict.sys.init-service', 'searchScreenAuthority', '', '', 'SCO' ) ) return;
        if ( !fc_isNull( window.gwJsonResult.RK_AUTH[ 0 ] ) ) {
            /**** SCO의 버튼 권한이 변함 모든 권한에 영향이 있음
            window.gwAuth.isSearch  = ( window.gwJsonResult.RK_AUTH[ 0 ].IS_SEARCH  == 'Y' ) ? true : false;
            window.gwAuth.isSave    = ( window.gwJsonResult.RK_AUTH[ 0 ].IS_SAVE    == 'Y' ) ? true : false;
            window.gwAuth.isDelete  = ( window.gwJsonResult.RK_AUTH[ 0 ].IS_DELETE  == 'Y' ) ? true : false;
            window.gwAuth.isConfirm = ( window.gwJsonResult.RK_AUTH[ 0 ].IS_CONFIRM == 'Y' ) ? true : false;
            window.gwAuth.isCust1   = ( window.gwJsonResult.RK_AUTH[ 0 ].IS_CUST1   == 'Y' ) ? true : false;
            window.gwAuth.isCust2   = ( window.gwJsonResult.RK_AUTH[ 0 ].IS_CUST2   == 'Y' ) ? true : false;
            window.gwAuth.isCust3   = ( window.gwJsonResult.RK_AUTH[ 0 ].IS_CUST3   == 'Y' ) ? true : false;
            window.gwAuth.isCust4   = ( window.gwJsonResult.RK_AUTH[ 0 ].IS_CUST4   == 'Y' ) ? true : false;
            window.gwAuth.isCust5   = ( window.gwJsonResult.RK_AUTH[ 0 ].IS_CUST5   == 'Y' ) ? true : false;
            window.gwAuth.isPrint   = ( window.gwJsonResult.RK_AUTH[ 0 ].IS_PRINT   == 'Y' ) ? true : false;
            window.gwMesEnv.user.pgmTitle = window.gwJsonResult.RK_AUTH[ 0 ].MNU_NM;
            window.gwMesEnv.user.pgmTy    = window.gwJsonResult.RK_AUTH[ 0 ].PGM_TY;

            s10Auth = window.gwJsonResult.RK_AUTH;
            */

            var isSearch =  ( window.gwJsonResult.RK_AUTH[ 0 ].IS_SEARCH  == 'Y' ) ? true : false;
            var isSave = ( window.gwJsonResult.RK_AUTH[ 0 ].IS_SAVE    == 'Y' ) ? true : false;
            var isDelete = ( window.gwJsonResult.RK_AUTH[ 0 ].IS_DELETE  == 'Y' ) ? true : false;

            if(!isSearch ){
                $( "#mnuSearchBtn" ).jqxButton( { disabled: true  } );
                //alert(" search btn disabled== " + isSearch);
            }
            if(!isSave ){
                $( "#mnuSaveBtn" ).jqxButton( { disabled: true  } );
                //alert(" Save btn disabled== " + isSave);
            }
            if(!isDelete ){
                $( "#mnuDeleteBtn" ).jqxButton( { disabled: true  } );
                //alert(" Delete btn disabled== " + isDelete);
            }

        } else {
            /* 권한 없음 */
            $( "#mnuSearchBtn" ).jqxButton( { disabled: true  } );
            $( "#mnuSaveBtn" ).jqxButton( { disabled: true  } );
            $( "#mnuDeleteBtn" ).jqxButton( { disabled: true  } );
        };
    }; // end of fc_getS10Authority
