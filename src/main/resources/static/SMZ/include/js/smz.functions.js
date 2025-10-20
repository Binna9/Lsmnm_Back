/**
 * Declare constants
 */

/**
 * Declare Variable
 */

/**
 * Declare Initial JS Function
 */
$(function () {
	fc_showLog( 1, '***** smz.functions.js Main');

	//**
	$('#mnuSaveBtn').show();
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
	    case 'S_WEATHER_LIST' :
			objItems = 	[
			           	  {groupname: 'divSearch1', caption: '공장' , name: 'PLANT_CD', width: 100, datatype: 'lov'},
						  {groupname: 'divSearch1', caption: 'Date', name: 'ITEM_DTM_GR'    , width: 170, datatype: 'daterange', target: ['DTM_FROM', 'DTM_TO', 'datetime'], itemCd: 'CAP_DATE'},
						  ];
			fc_addDataInGettedLov ( 'PLANT_CD'		, {code: 'PLANT_CD'		, tags: ''	, alias: ''} );
			fc_addDataInSettingLov( {object: 'PLANT_CD', code: 'PLANT_CD'		, format: 'V'	, nullable: true, defval: ''	});
			break;
	    case 'S_TABLE_LIST' :
			objItems = 	[
							{groupname: 'divSearchGrp',  caption: '업무체인코드', name: 'BIZ_CHAIN_CD', width: 250, datatype: 'lov' },
							{groupname: 'divSearchGrp',  caption: '테이블명'	, name: 'TABLE_NAME'    , width: 200, datatype: 'text', uppercase: true },
						];

			fc_addDataInGettedLov ( 'DB_SCHEMA_CD', {code: 'DB_SCHEMA_CD', tags: '', alias: ''} );
			fc_addDataInSettingLov( {object: 'BIZ_CHAIN_CD', code: 'DB_SCHEMA_CD', format: 'K:V', nullable: false , defval: ''} );
			break;
	    case 'S_TAG_LIST' :
			objItems = 	[
							{groupname: 'divSearchGrp',  caption: 'TC코드',		name: 'TRANSACTION_CODE', 	width: 180, 	datatype: 'lov' },
							{groupname: 'divSearchGrp',  caption: '공정코드',	name: 'PROC_GRP_CD', 		width: 150, 	datatype: 'lov' },
							{groupname: 'divSearchGrp',  caption: 'PLC그룹코드',name: 'PLC_GRP_CD', 		width: 150, 	datatype: 'lov' },
							{groupname: 'divSearchGrp',  caption: '발생일시', 	name: 'FR_DATE'    , 		width: 200, 	datatype: 'datetime'},
							{groupname: 'divSearchGrp',  caption: '알람', 		name: 'ALARM_VA', 			width: 200, 	datatype: 'hidden', hidden: true },
						];

			fc_addDataInGettedLov ( 'TRANSACTION_CODE', {code: 'TRANSACTION_CODE', tags: '', alias: ''} );
			fc_addDataInSettingLov( {object: 'TRANSACTION_CODE', code: 'TRANSACTION_CODE', format: 'V', nullable: true , defval: ' '} );
			fc_addDataInGettedLov ( 'PLC_GRP_CD', {code: 'PLC_GRP_CD', tags: '', alias: ''} );
			fc_addDataInSettingLov( {object: 'PLC_GRP_CD', code: 'PLC_GRP_CD', format: 'V', nullable: true , defval: ' '} );
			fc_addDataInGettedLov ( 'PROC_GRP_CD', {code: 'PROC_GRP_CD', tags: '', alias: ''} );
			fc_addDataInSettingLov( {object: 'PROC_GRP_CD', code: 'PROC_GRP_CD', format: 'V', nullable: true , defval: ' '} );


			fc_setInputVal('FR_DATE', fc_getCurrentDateTime());
			break;
	    case 'S_TAG_TMP_LIST' :
			objItems = 	[
							{groupname: 'divSearchGrp',  caption: 'PLC그룹코드',		name: 'PLC_GRP_CD', 	width: 250, 	datatype: 'lov' },
							{groupname: 'divSearchGrp',  caption: '발생일시', 	name: 'FR_DATE'    , 		width: 200, 	datatype: 'datetime' },
							{groupname: 'divSearchGrp',  caption: '태그ID', 		name: 'TAG_ID' 		,  datatype: 'text', hidden: true },
							{groupname: 'divSearchGrp',  caption: '태그VA', 		name: 'TAG_VA' 		,  datatype: 'text', hidden: true },
						];

			fc_addDataInGettedLov ( 'PLC_GRP_CD', {code: 'PLC_GRP_CD', tags: '', alias: ''} );
			fc_addDataInSettingLov( {object: 'PLC_GRP_CD', code: 'PLC_GRP_CD', format: 'V', nullable: true , defval: ' '} );

			fc_setInputVal('FR_DATE', fc_getCurrentDateTime());
			break;
	    case 'S_TAG_TREE_LIST' :
			objItems = 	[
			           	 	{groupname: 'divSearchGrp',  caption: '태그코드', 		name: 'TAG_CODE' 		, width: 200, datatype: 'hidden', hidden: true },
							{groupname: 'divSearchGrp',  caption: '태그코드', 		name: 'TAG_CODE_0' 		, width: 200, datatype: 'hidden', hidden: true },
							{groupname: 'divSearchGrp',  caption: '태그코드_2', 	name: 'TAG_CODE_1' 		, width: 200, datatype: 'hidden', hidden: true },
							{groupname: 'divSearchGrp',  caption: '태그코드_3',		name: 'TAG_CODE_2' 		, width: 200, datatype: 'hidden', hidden: true },
							{groupname: 'divSearchGrp',  caption: '공장코드', 		name: 'PLANT_CD' 		, width: 200, datatype: 'hidden', hidden: true },
							{groupname: 'divSearchGrp',  caption: '공장코드', 		name: 'PLANT_CD_0' 		, width: 200, datatype: 'hidden', hidden: true },
							{groupname: 'divSearchGrp',  caption: '공장코드_2', 	name: 'PLANT_CD_1' 		, width: 200, datatype: 'hidden', hidden: true },
							{groupname: 'divSearchGrp',  caption: '공장코드_3',		name: 'PLANT_CD_2' 		, width: 200, datatype: 'hidden', hidden: true },
							{groupname: 'divSearchGrp',  caption: 'TR코드', 		name: 'TR_CODE' 		, width: 200, datatype: 'hidden', hidden: true },
							{groupname: 'divSearchGrp',  caption: 'TR코드', 		name: 'TR_CODE_0' 		, width: 200, datatype: 'hidden', hidden: true },
							{groupname: 'divSearchGrp',  caption: 'TR코드_2', 	name: 'TR_CODE_1' 		, width: 200, datatype: 'hidden', hidden: true },
							{groupname: 'divSearchGrp',  caption: 'TR코드_3',		name: 'TR_CODE_2' 		, width: 200, datatype: 'hidden', hidden: true },
							{groupname: 'divSearchGrp',  caption: '발생일시FR', 	name: 'FR_REAL_DATE'    , 		width: 200, 	datatype: 'datetime'},
							{groupname: 'divSearchGrp',  caption: '발생일시TO', 	name: 'TO_DATE'    , 		width: 200, 	datatype: 'datetime'},
						];

			fc_setInputVal('FR_DATE', fc_getCurrentDateTime());
			fc_setInputVal('TO_DATE', fc_getCurrentDateTime());
			break;
	    case 'S_TAG_TREE_LIST_TEST' :

			objItems = 	[
			           	 	{groupname: 'divSearchGrp',  caption: '', 		    name: 'DB_SEARCH_TYPE'	, width: 100, datatype: 'radio', 	itemCd: 'CAP_USE_YN'},
							{groupname: 'divSearchGrp',  caption: '발생일시FR', 	name: 'FR_DATE'    , 		width: 170, 	datatype: 'datetime'},
							{groupname: 'divSearchGrp',  caption: '발생일시FR', 	name: 'FR_DATE2'    , 		width: 100, 	datatype: 'date'},
							{groupname: 'divSearchGrp',  caption: '발생일시TO', 	name: 'TO_DATE'    , 		width: 170, 	datatype: 'datetime'},
							{groupname: 'divSearchGrp',  caption: '발생일시TO', 	name: 'TO_DATE2'    , 		width: 100, 	datatype: 'date'},
							{groupname: 'divSearchGrp',  caption: 'Data주기' ,   name: 'DATA_INTERVAL'           , width: 60,     datatype: 'lov'},
							{groupname: 'divSearchGrp',  caption: '자동계산'  ,    name: 'AUTO_SET_INTERVAL' , width: 21,      datatype: 'checkbox'},
						];

			for(var i=0; i< 35; i++){
				var tmp1 = {groupname: 'divSearchGrp',  caption: '태그코드'+i, 	name: 'TAG_CODE_'+i    , 		width: 2, 	datatype: 'hidden' , hidden: true};
				var tmp2 = {groupname: 'divSearchGrp',  caption: 'TR코드'+i, 	name: 'TR_CODE_'+i    , 		width: 2, 	datatype: 'hidden' , hidden: true};
				objItems.push(tmp1);
				objItems.push(tmp2);
			}

			fc_addDataInGettedLov ( 'DATA_INTERVAL'		, {code: 'DATA_INTERVAL'		, tags: ''	, alias: ''} );
			fc_addDataInSettingLov( {object: 'DATA_INTERVAL', code: 'DATA_INTERVAL'		, format: 'V'	, nullable: true, defval: '1'	});

			break;
	    case 'TAG_BIZ_DATA' : // SMZ6030
            objItems = [
                        {groupname: 'divSearch1', caption: '업무Data ID' , name: 'BIZ_DATA_ID', width: 100, datatype: 'text'  },
                        {groupname: 'divSearch1', caption: '업무Data 명'  , name: 'BIZ_DATA_NM', width: 200, datatype: 'text'  },
                        {groupname: 'divSearch1', caption: '메뉴레벨1'    , name: 'MNU_LV_1_NM', width: 120, datatype: 'text' },
                        {groupname: 'divSearch1', caption: '메뉴레벨2'    , name: 'MNU_LV_2_NM', width: 120, datatype: 'text' },
                        {groupname: 'divSearch1', caption: '메뉴레벨3'    , name: 'MNU_LV_3_NM', width: 120, datatype: 'text' },
                        {groupname: 'divSearch2', caption: '쿼리작성방법(select절=dtm:시간,value:값 컬럼 필수, where절=bind이름은 :event_dtm_from,:event_dtm_to사용)', name: 'LV_TEXT', width: 120, datatype: 'label' },
                        ];

            break;
	    case 'S_TAG_CHART_TREE_LIST' :
			objItems = 	[
						{groupname: 'divSearchGrp',  caption: '발생일시', 	     name: 'DATE_GR'         , width: 160, datatype: 'daterange', target: ['FR_DATE', 'TO_DATE', 'datetime'], itemCd: 'CAP_DATE'},
						{groupname: 'divSearchGrp',  caption: '발생일시', 		 name: 'FR_REAL_DATE'    , width: 170, datatype: 'datetime', hidden: true},
						{groupname: 'divSearchGrp',  caption: '기간설정',	 	 name: 'DATE_INTERVAL'   , width: 80 , datatype: 'lov'},
						{groupname: 'divSearchGrp',  caption: 'Data주기' ,	 name: 'DATA_INTERVAL'   , width: 80 , datatype: 'lov'},
						{groupname: 'divSearchGrp',  caption: 'Aggregates',  name: 'TAG_AGGR_TY'	 , width: 80 , datatype: 'lov'},
						{groupname: 'divSearchGrp',  caption: 'Y축타입', 		 name: 'MLT_SEARCH_TYPE' , width: 80,  datatype: 'lov'},
						{groupname: 'divSearchGrp',  caption: '통계정보보기', 	 name: 'CHK_PLOT_BAND'	 , width: 20,  datatype: 'checkbox'},
						{groupname: 'divSearchGrp',  caption: 'Y축보기', 	 	 name: 'CHK_Y_VISIBLE'	 , width: 20,  datatype: 'checkbox'},
						{groupname: 'divSearchGrp',  caption: '내림차순', 	 	 name: 'CHK_SORTABLE'	 , width: 20,  datatype: 'checkbox'},
						{groupname: 'divSearchGrp',  caption: '실시간 Trend',  name: 'REAL_TIME_TREND'	 , width: 20,  datatype: 'checkbox', hidden:true},
						{groupname: 'divSearchGrp',  caption: '갱신주기(초)', 	 name: 'RE_TIME'  		 , width: 60 , datatype: 'number', hidden: true},
						{groupname: 'divSearchGrp',  caption: '적용', 		 name: 'RE_TIME_START'   , width: 100, datatype: 'button', hidden: true},
						{groupname: 'divSearchGrp',  caption: '중지', 		 name: 'RE_TIME_STOP'  	 , width: 100, datatype: 'button', hidden: true},
			];

			fc_addDataInGettedLov ( 'DATA_INTERVAL', {code: 'DATA_INTERVAL', tags: '', alias: ''} );
			fc_addDataInSettingLov( {object: 'DATA_INTERVAL', code: 'DATA_INTERVAL', format: 'V', nullable: false, defval: '60', listcount:4});

			fc_addDataInGettedLov ( 'DATA_INTERVAL4', {code: 'DATA_INTERVAL4', tags: '', alias: ''} );
			fc_addDataInSettingLov( {object: 'DATE_INTERVAL', code: 'DATA_INTERVAL4', format: 'V', nullable: true, defval: '', listcount:6});
			
			fc_addDataInGettedLov ( 'TAG_AGGR_TY', {code: 'TAG_AGGR_TY', tags: '', alias: ''} );
			fc_addDataInSettingLov( {object: 'TAG_AGGR_TY', code: 'TAG_AGGR_TY', format: 'V', nullable: false, defval: 'SNP'});
			
			fc_addDataInGettedLov ( 'CHART_YAXIS_TYPE', {code: 'CHART_YAXIS_TYPE', tags: '', alias: ''} );
			fc_addDataInSettingLov( {object: 'MLT_SEARCH_TYPE', code: 'CHART_YAXIS_TYPE', format: 'V', nullable: false, defval: 'Y3'});
			
			//fc_setInputVal('FR_DATE', fc_getCurrentDateTime());
			//fc_setInputVal('TO_DATE', fc_getCurrentDateTime());

			break;
	    case 'S_TAG_CHART_MI_TREE_LIST' :
			objItems = 	[
			           	 	{groupname: 'divSearchGrp',  caption: '', 				name: 'DB_SEARCH_TYPE'	, width: 100, datatype: 'radio', 	itemCd: 'CAP_USE_YN'},//, hidden: true},
			           	 	{groupname: 'divSearchGrp',  caption: '트랜잭션코드', 	name: 'TR_CODE' 		, width: 200, datatype: 'hidden', hidden: true },
			           	 	{groupname: 'divSearchGrp',  caption: '공장코드', 	name: 'PLANT_CD' 		, width: 200, datatype: 'hidden', hidden: true },
			           	 	{groupname: 'divSearchGrp',  caption: '태그코드', 		name: 'TAG_CODE' 		, width: 200, datatype: 'hidden', hidden: true },
							{groupname: 'divSearchGrp',  caption: '태그코드', 		name: 'TAG_CODE_0' 		, width: 200, datatype: 'hidden', hidden: true },
							{groupname: 'divSearchGrp',  caption: '태그코드_2', 	name: 'TAG_CODE_1' 		, width: 200, datatype: 'hidden', hidden: true },
							{groupname: 'divSearchGrp',  caption: '태그코드_3',		name: 'TAG_CODE_2' 		, width: 200, datatype: 'hidden', hidden: true },
							{groupname: 'divSearchGrp',  caption: '발생일시FR', 	name: 'FR_DATE'    		, width: 200, 	datatype: 'datemin'},
							{groupname: 'divSearchGrp',  caption: '발생일시FR', 	name: 'FR_REAL_DATE'    , width: 200, datatype: 'datetime', hidden: true},
							{groupname: 'divSearchGrp',  caption: '발생일시TO', 	name: 'TO_DATE'    		, width: 200, 	datatype: 'datemin' },
							{groupname: 'divSearchGrp',  caption: '', 				name: 'MLT_SEARCH_TYPE'	, width: 100, datatype: 'radio', 	itemCd: 'CAP_USE_YN'},
							{groupname: 'divSearchGrp',  caption: 'Data주기' ,   name: 'DATA_INTERVAL'           , width: 60,     datatype: 'lov'},
							];

			fc_addDataInGettedLov ( 'DATA_INTERVAL3'		, {code: 'DATA_INTERVAL3'		, tags: ''	, alias: ''} );
			fc_addDataInSettingLov( {object: 'DATA_INTERVAL', code: 'DATA_INTERVAL3'		, format: 'V'	, nullable: true, defval: '1'	});

			fc_setInputVal('FR_DATE', fc_getCurrentDateTime());
			fc_setInputVal('TO_DATE', fc_getCurrentDateTime());
			break;
	    case 'S_ALRAM_LIST' :
			objItems = 	[
							{groupname: 'divSearchGrp',  caption: '발생일시', 	name: 'FR_DATE'    , 		width: 120, 	datatype: 'date' },
							{groupname: 'divSearchGrp',  caption: 'year', 		name: 'YEAR' 		, width: 200, datatype: 'hidden', hidden: true },
							{groupname: 'divSearchGrp',  caption: 'month', 		name: 'MONTH' 		, width: 200, datatype: 'hidden', hidden: true },
							{groupname: 'divSearchGrp',  caption: 'day', 		name: 'DAY' 		, width: 200, datatype: 'hidden', hidden: true },
						];

			fc_setInputVal('FR_DATE', fc_getCurrentDateTime());
			break;
		case 'MAIL_MASTER_INFO' : // S903010(SCO811)
			objItems = [
						{groupname: 'divSearch1', caption: 'Biz Chain'	  , name: 'MAIL_OWNER'	      , width: 130, datatype: 'lov' , itemCd: 'CAP_OWNER_CHAIN'},
					    {groupname: 'divSearch1', caption: 'Mail Id'	  , name: 'MAIL_ID'	  		  , width: 120, datatype: 'text', uppercase: true, itemCd: 'CAP_MAIL_ID' },
					    {groupname: 'divSearch1', caption: 'Mail Name'    , name: 'MAIL_NM'	  		  , width: 250, datatype: 'text' , itemCd: 'CAP_MAIL_NM'},
					    {groupname: 'divSearch1', caption: 'Receiver List', name: 'BTN_MAIL_RECEIVER' , width: 130, datatype: 'button', itemCd: 'CAP_MAIL_RCV_ADDR_LIST' },

			           ];

	   		fc_addDataInGettedLov( 'BIZ_CHAIN_CD'	, {code: 'BIZ_CHAIN_CD'	, tags: ''	, alias: ''} );
			fc_addDataInSettingLov( {object: 'MAIL_OWNER'	, code: 'BIZ_CHAIN_CD', format: 'V', nullable: true	, defval: ''} );
			break;
		case 'MAIL_RECEIVER_INFO' : // S903020(SCO812)
			objItems = [
						{groupname: 'divSearch1', caption: 'Mail Id', name: 'MAIL_ID'	  , width: 250, datatype: 'text', readonly:true , itemCd: 'CAP_MAIL_ID'},
			           ];
			break;
		case 'TAG_DICTIONARY' : // SMZ7010
			objItems = [
						{groupname: 'divSearch1',	caption: '검색유형'   , name: 'SEARCH_TY', width: 40, datatype: 'radio'},
						{groupname: 'divSearch1',	caption: '공장'      , name: 'FAC_CD', 	width: 100, datatype: 'lov'},
						{groupname: 'divSearch1',	caption: '공정'      , name: 'PROC_CD', 	width: 120, datatype: 'lov'},
						{groupname: 'divSearch1',	caption: '설비'      , name: 'ASSET_CD', 	width: 200, datatype: 'lov'},
						{groupname: 'divSearch1',	caption: '메뉴구조'   , name: 'MON_TREE_CD', 	width: 160, datatype: 'lov'},
						{groupname: 'divSearch1',	caption: '화면'      , name: 'MON_SCR_CD', 	width: 210, datatype: 'lov'},
						{groupname: 'divSearch1',	caption: 'TAG ID'   , name: 'TAG_ID', 	width: 100, datatype: 'text'},
						{groupname: 'divSearch1',	caption: 'TAG 명'    , name: 'TAG_NM', 	width: 200, datatype: 'text'},
						{groupname: 'divSearch1',	caption: '변경이력'    , name: 'LINK_TAG_HIST', 	width: 70, align:'center', datatype: 'button'},
						{groupname: 'divSearch1',	caption: '화면별관리', name: 'LINK_BIZ_SCR', 	width: 80, align:'center', datatype: 'button'},
						{groupname: 'divSearch1',	caption: '업무별관리', name: 'LINK_BIZ_TAG', 	width: 80, align:'center', datatype: 'button'},
						{groupname: 'divSearch1',	caption: '집계관리', name: 'LINK_TAG_MACRO', 	width: 70, align:'center', datatype: 'button'},
						{groupname: 'divSearch1',	caption: '이벤트/알람관리', name: 'LINK_TAG_EVENT', 	width: 120, align:'center', datatype: 'button'}
						];
			
			fc_addDataInGettedLov("TAG_FAC_CD", {code: "TAG_FAC_CD", tags: "", alias: ""});
			fc_addDataInSettingLov({object: "FAC_CD", code: "TAG_FAC_CD", format: "V", nullable: false, defval: ""});
			fc_addDataInGettedLov("TAG_COST_CENTER", {code: "TAG_COST_CENTER", tags: "", alias: ""});
			fc_addDataInSettingLov({object: "PROC_CD", code: "TAG_COST_CENTER", format: "V", nullable: true, defval: ""});
			fc_addDataInGettedLov("TAG_ASSET_CD", {code: "TAG_ASSET_CD", tags: "", alias: ""});
			fc_addDataInSettingLov({object: "ASSET_CD", code: "TAG_ASSET_CD", format: "V", nullable: true, defval: ""});
			fc_addDataInGettedLov("MON_TREE_CD", {code: "MON_TREE_CD", tags: "", alias: ""});
			fc_addDataInSettingLov({object: "MON_TREE_CD", code: "MON_TREE_CD", format: "V", nullable: false, defval: ""});
			fc_addDataInGettedLov("MON_SCR_CD", {code: "MON_SCR_CD", tags: "", alias: ""});
			fc_addDataInSettingLov({object: "MON_SCR_CD", code: "MON_SCR_CD", format: "V", nullable: false, defval: ""});
		break;
		case 'TAG_HISTORY' : // SMZ7020
			objItems = [
						{groupname: 'divSearch1',	caption: 'TAG ID'     		 , name: 'TAG_ID', 	width: 150, datatype: 'text'},
						//{groupname: 'divSearch1',	caption: 'COL ID'     		 , name: 'COL_ID', 	width: 150, datatype: 'text'}
						];
		break;
		case 'TAG_FRML' : // SMZ7030
			objItems = [
						{groupname: 'divSearch1', caption: '공장'      	, name: 'FAC_CD'	, width: 110, datatype: 'lov', hidden:true},
						{groupname: 'divSearch1', caption: '공정'      	, name: 'PROC_CD'	, width: 120, datatype: 'lov', hidden:true},
						{groupname: 'divSearch1', caption: '설비'      	, name: 'ASSET_CD'	, width: 220, datatype: 'lov', hidden:true},
						{groupname: 'divSearch1', caption: '가상 TagID'	, name: 'VTL_TAG_ID', width: 120, datatype: 'text'	, itemCd: 'VTL_TAG_ID'},
						{groupname: 'divSearch1', caption: '가상 Tag명'	, name: 'VTL_TAG_NM', width: 150, datatype: 'text'	, itemCd: 'VTL_TAG_NM'},
						{groupname: 'divSearch1', caption: 'TAG 유형'		, name: 'TAG_TP'	, width: 100, datatype: 'lov'	, itemCd: 'TAG_TP'},
						{groupname: 'divSearch1', caption: '계산식 유형'	, name: 'FRML_TP'	, width: 100, datatype: 'lov'	, itemCd: 'FRML_TP'},
						{groupname: 'divSearch1', caption: '실Tag'		, name: 'FRML_REAL' , width: 120, datatype: 'text'	},
						];

			fc_addDataInGettedLov("TAG_FAC_CD", {code: "TAG_FAC_CD", tags: "", alias: ""});
			fc_addDataInSettingLov({object: "FAC_CD", code: "TAG_FAC_CD", format: "V", nullable: true, defval: ""});
			fc_addDataInGettedLov("TAG_COST_CENTER", {code: "TAG_COST_CENTER", tags: "", alias: ""});
			fc_addDataInSettingLov({object: "PROC_CD", code: "TAG_COST_CENTER", format: "V", nullable: true, defval: ""});
			fc_addDataInGettedLov("TAG_ASSET_CD", {code: "TAG_ASSET_CD", tags: "", alias: ""});
			fc_addDataInSettingLov({object: "ASSET_CD", code: "TAG_ASSET_CD", format: "V", nullable: true, defval: ""});
			
			fc_addDataInGettedLov ( 'TAG_TP', {code: 'TAG_TP', tags: '', alias: ''} );
			fc_addDataInGettedLov ( 'FRML_TP', {code: 'FRML_TP', tags: '', alias: ''} );
			fc_addDataInSettingLov( {object: 'TAG_TP', code: 'TAG_TP', format: 'V', nullable: true , defval: ''} );
			fc_addDataInSettingLov( {object: 'FRML_TP', code: 'FRML_TP', format: 'V', nullable: true , defval: ''} );

			break;
		case 'TAG_FUNC' : // SMZ7040
			objItems = [
						{groupname: 'divSearch1', caption: 'Function ID', name: 'FUNC_ID', width: 150, datatype: 'text'	, itemCd: 'FUNC_ID'},
						{groupname: 'divSearch1', caption: 'Function 명'	, name: 'FUNC_NM', width: 200, datatype: 'text'	, itemCd: 'FUNC_NM'},
						{groupname: 'divSearch1', caption: '계산식 유형'	, name: 'FRML_TP', width: 100, datatype: 'lov'	, itemCd: 'FRML_TP'}
						];

			fc_addDataInGettedLov ( 'FRML_TP', {code: 'FRML_TP', tags: '', alias: ''} );
			fc_addDataInSettingLov( {object: 'FRML_TP', code: 'FRML_TP', format: 'V', nullable: true , defval: ''} );

			break;
		case 'CHAIN_TAG_MST' : // SMZ7050
			objItems = [
						{groupname: 'divSearch1', caption: '업무구분'  , name: 'BIZ_CHAIN_CD', width: 120, datatype: 'lov' },
					   ];
			fc_addDataInGettedLov ( 'BIZ_CHAIN_CD', {code: 'BIZ_CHAIN_CD', tags: '', alias: '',  condition: {'ATTR1': 'Y'}} );
			fc_addDataInSettingLov( {object: 'BIZ_CHAIN_CD', code: 'BIZ_CHAIN_CD', format: 'V', nullable: true , defval: ''} );
			break;
		case 'TAG_MST_MACRO' : // SMZ7060
			objItems = [
				{groupname: 'divSearch1', caption: '업무구분'  , name: 'BIZ_CHAIN_CD'	, width: 120, datatype: 'lov' },		
				{groupname: 'divSearch1', caption: 'Tag ID'	 , name: 'TAG_ID'		, width: 120, datatype: 'text'},
				{groupname: 'divSearch1', caption: '속성1'	 , name: 'ATTR1'		, width: 100, datatype: 'text'},
				{groupname: 'divSearch1', caption: '속성2'	 , name: 'ATTR2'		, width: 100, datatype: 'text'},
				{groupname: 'divSearch1', caption: '속성3'	 , name: 'ATTR3'		, width: 100, datatype: 'text'},
				{groupname: 'divSearch1', caption: '속성4'	 , name: 'ATTR4'		, width: 100, datatype: 'text'},
				{groupname: 'divSearch1', caption: '속성5'	 , name: 'ATTR5'		, width: 100, datatype: 'text'},
				{groupname: 'divSearch1', caption: '집계시작 체크시 : 수집동작', name: 'L_TEXT'		, width: 120, datatype: 'label'}	
					   ];
			fc_addDataInGettedLov ( 'BIZ_CHAIN_CD', {code: 'BIZ_CHAIN_CD', tags: '', alias: '',  condition: {'ATTR1': 'Y'}} );
			fc_addDataInSettingLov( {object: 'BIZ_CHAIN_CD', code: 'BIZ_CHAIN_CD', format: 'V', nullable: false , defval: ''} );
			break;	
		case 'TAG_MST_EVENT' : // SMZ7070
			objItems = [
						{groupname: 'divSearch1', caption: 'Tag ID'	 , name: 'TAG_ID'		, width: 120, datatype: 'text'},
						{groupname: 'divSearch1', caption: '알람유형'  , name: 'EVENT_RECV_TY'	, width: 120, datatype: 'lov' }
					   ];
			//fc_addDataInGettedLov ( 'EVENT_RECV_TY', {code: 'EVENT_RECV_TY', tags: '', alias: '',  condition: {'ATTR1': 'Y'}} );
			fc_addDataInGettedLov ( 'EVENT_RECV_TY', {code: 'EVENT_RECV_TY', tags: '', alias: '' } );
			fc_addDataInSettingLov( {object: 'EVENT_RECV_TY', code: 'EVENT_RECV_TY', format: 'V', nullable: true , defval: ''} );
			break;		
		case 'PAGE_TAG_MST' : // SMZ7080
			objItems = [
						{groupname: 'divSearch1', caption: '화면ID'  , name: 'PAGE_ID', width: 120, datatype: 'text' },
						{groupname: 'divSearch1', caption: 'TAG ID'  , name: 'TAG_ID', width: 120, datatype: 'text' },
						{groupname: 'divSearch1', caption: 'TAG 명'  , name: 'TAG_NM', width: 120, datatype: 'text' },
					   ];
			
			break;
		case 'TAG_ABNORMAL' : // SMZ7090
			objItems = [
						{groupname: 'divSearch1', caption: '공장'    	, name: 'FAC_CD'	, width: 110, datatype: 'lov'},
						{groupname: 'divSearch1', caption: '공정'    	, name: 'PROC_CD'	, width: 150, datatype: 'lov'},
						{groupname: 'divSearch1', caption: '설비'    	, name: 'ASSET_CD'	, width: 300, datatype: 'lov'},
						{groupname: 'divSearch1', caption: 'TagID'	, name: 'TAG_ID', width: 120, datatype: 'text'},
						{groupname: 'divSearch1', caption: 'Tag명'	, name: 'TAG_NM', width: 150, datatype: 'text'},
						{groupname: 'divSearch1', caption: '발생일시' , name: 'DATE_GR'    , width: 90, datatype: 'daterange', target: ['FR_DATE', 'TO_DATE', 'date'], itemCd: 'CAP_DATE'},
						];

			fc_addDataInGettedLov("TAG_FAC_CD", {code: "TAG_FAC_CD", tags: "", alias: ""});
			fc_addDataInSettingLov({object: "FAC_CD", code: "TAG_FAC_CD", format: "V", nullable: true, defval: ""});
			fc_addDataInGettedLov("TAG_COST_CENTER", {code: "TAG_COST_CENTER", tags: "", alias: ""});
			fc_addDataInSettingLov({object: "PROC_CD", code: "TAG_COST_CENTER", format: "V", nullable: true, defval: ""});
			fc_addDataInGettedLov("TAG_ASSET_CD", {code: "TAG_ASSET_CD", tags: "", alias: ""});
			fc_addDataInSettingLov({object: "ASSET_CD", code: "TAG_ASSET_CD", format: "V", nullable: true, defval: ""});
			
			break;
		
		case 'TAG_MACRO' : // SMZ7091
			objItems = [{groupname: 'divSearch1', caption: 'TagID'	   , name: 'TAG_ID'    , width: 150, datatype: 'text'},
						{groupname: 'divSearch1', caption: '발생일시'    , name: 'DATE_GR'    , width: 100, datatype: 'daterange', target: ['FR_DATE', 'TO_DATE', 'date'], itemCd: 'CAP_DATE'},
						{groupname: 'divSearch1', caption: 'Tag집계유형' , name: 'TAG_INTVAL_TP', width: 100, datatype: 'lov'},
						{groupname: 'divSearch1', caption: '미수신Data만 조회' , name: 'CHK_NO_DATA', width: 150, datatype: 'checkbox'},
						];

			fc_addDataInGettedLov ( 'MACRO_TAG_INTVAL_TY', {code: 'MACRO_TAG_INTVAL_TY', tags: 'MACRO', alias: ''} );
			fc_addDataInSettingLov( {object: 'TAG_INTVAL_TP', code: 'MACRO_TAG_INTVAL_TY', format: 'V', nullable: false , defval: 'H'} );
			
			break;
			
		case 'JOB_SCH' : // SMZ7092
			objItems = [{groupname: 'divSearch1', caption: '기간'    , name: 'DATE_GR'    , width: 100, datatype: 'daterange', target: ['FR_DATE', 'TO_DATE', 'date'], itemCd: 'CAP_DATE'},
						//{groupname: 'divSearch1', caption: 'Tag집계유형' , name: 'TAG_INTVAL_TP', width: 100, datatype: 'lov'},
						//{groupname: 'divSearch1', caption: '미수신Data만 조회' , name: 'CHK_NO_DATA', width: 150, datatype: 'checkbox'},
						];

			//fc_addDataInGettedLov ( 'MACRO_TAG_INTVAL_TY', {code: 'MACRO_TAG_INTVAL_TY', tags: 'MACRO', alias: ''} );
			//fc_addDataInSettingLov( {object: 'TAG_INTVAL_TP', code: 'MACRO_TAG_INTVAL_TY', format: 'V', nullable: false , defval: 'H'} );
			
			break;
		case 'SCHE_CRON' : // SMZ7093
			objItems = [{groupname: "divSearch1", caption: "설정한 시간마다 주기적으로 작업을 수행합니다." , name: "A", width: 80, datatype: "label"},
						{groupname: 'divSearch2', caption: '상태'     , name: 'USE_YN'  , width: 200, datatype: 'radio' },
						{groupname: 'divSearch3', caption: '주기 설정' , name: 'CHK_NO_DATA', width: 150, datatype: 'label'},
						{groupname: 'divSearch3', caption: '분' , name: 'B', width: 80, datatype: 'text'},
						{groupname: 'divSearch3', caption: '시' , name: 'C', width: 50, datatype: 'text'},
						{groupname: 'divSearch3', caption: '일' , name: 'D', width: 50, datatype: 'text'},
						{groupname: 'divSearch3', caption: '월' , name: 'E', width: 50, datatype: 'text'},
						{groupname: 'divSearch4', caption: '' , name: 'SCHE_CRON', width: 200, datatype: 'text', readonly:true},
						];

			//fc_addDataInGettedLov ( 'MACRO_TAG_INTVAL_TY', {code: 'MACRO_TAG_INTVAL_TY', tags: 'MACRO', alias: ''} );
			//fc_addDataInSettingLov( {object: 'TAG_INTVAL_TP', code: 'MACRO_TAG_INTVAL_TY', format: 'V', nullable: false , defval: 'H'} );
			
			break;
		case 'M_EXEC' : // SMZ7093
			objItems = [{groupname: "divSearch1", caption: "설정한 시간을 기준으로 편성 작업을 수행합니다." , name: "A", width: 80, datatype: "label"},
						{groupname: 'divSearch2', caption: '편성시간'     , name: 'START_TIME'  , width: 200, datatype: 'datetime' },
						];

			//fc_addDataInGettedLov ( 'MACRO_TAG_INTVAL_TY', {code: 'MACRO_TAG_INTVAL_TY', tags: 'MACRO', alias: ''} );
			//fc_addDataInSettingLov( {object: 'TAG_INTVAL_TP', code: 'MACRO_TAG_INTVAL_TY', format: 'V', nullable: false , defval: 'H'} );
			
			break;
			
		case 'S_SMZ7096' : // SMZ7096
			objItems = 
				[
				{groupname: "divSearch1", caption: "공정모니터링 화면",	name: "SCREEN_ID",		width: 100, datatype: "text", align: 'center', uppercase: true, required: true},
				{groupname: 'divSearch1', caption: "",				name: 'SCREEN_NM',		width: 200, datatype: "text", readonly:true},
				{groupname: 'divSearch1', caption: 'Data주기',		name: 'DATA_INTERVAL', 	width: 100, datatype: 'lov'},
				{groupname: 'divSearch1', caption: '기간', 	        name: 'DATE_GR', 		width: 160, datatype: 'daterange', target: ['FR_DATE', 'TO_DATE', 'date']},
				{groupname: 'divSearch1', caption: 'Tag ID', 	    name: 'TAG_ID', 		width: 150, datatype: 'text'},
				
				{groupname: 'divSearch1', caption: '', 	        	name: 'TAG_AGGR_TY', 	width: 0, datatype: 'text', hidden:true}
				];
			
			fc_addDataInGettedLov ( 'DATA_INTERVAL'		, {code: 'DATA_INTERVAL'		, tags: ''	, alias: ''} );
			fc_addDataInSettingLov( {object: 'DATA_INTERVAL', code: 'DATA_INTERVAL'		, format: 'V'	, nullable: true, defval: '60'	});
			
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

		case 'SCH_CAST_INFO' : // SCHB0050
			if ( caption_flag ) {
				sCaption = 'CAST Information';
				sItemCd  = '';
			};
			objItems = [
						{groupname: 'DG_GRP'	, caption: 'CAST Information' 	, name: 'CAST_NAME'		, width: 0,   datatype: 'label'   , itemCd: 'CAP_CAST_INFO'},
	                    {groupname: 'DG_GRP'	, caption: 'Up'     			, name: 'CAST_UP'		, width: 100, datatype: 'button'  , itemCd: 'CAP_UP' 	, align: 'center'},
	                    {groupname: 'DG_GRP'	, caption: 'Down'				, name: 'CAST_DOWN'		, width: 100, datatype: 'button'  , itemCd: 'CAP_DOWN'	, align: 'center' },
	                    {groupname: 'DG_GRP'	, caption: 'Merge' 				, name: 'CAST_MERGE'	, width: 100, datatype: 'button'  , itemCd: 'CAP_MERGE'	, align: 'center'},
						{groupname: 'DG_GRP'	, caption: '(>)Move to Cast'	, name: 'CAST_MOVE'		, width: 100, datatype: 'button'  , itemCd: 'CAP_MOVE'	, align: 'center'},
						{groupname: 'DG_GRP'	, caption: ''					, name: 'TO_CAST_MC'	, width: 70 , datatype: 'lov'}

	                    /* 2017.04.19
	                    {groupname: 'DG_GRP', caption: '(+)New' 			, name: 'SEQ_NEW'   , width: 100, datatype: 'button'  ,itemCd:'CAP_NEW'},
	                    {groupname: 'DG_GRP', caption: '(-)Remove' 			, name: 'SEQ_REMOVE', width: 100, datatype: 'button'  ,itemCd:'CAP_REMOVE'}*/
	                  ];

			fc_addDataInGettedLov ( 'MC_NO_BOF', {code: 'MC_NO_BOF'	, tags: ''	, alias: ''} );
			fc_addDataInSettingLov(   {object: 'TO_CAST_MC'	, code: 'MC_NO_BOF'	, format: 'V'	, nullable: true, defval: ''	});
			break;
		case 'SMZ6216_MASTER_HEAD' : // SMZ6216
			if ( caption_flag ) {
				sCaption = '그룹정보';
				sItemCd  = 'CAP_그룹정보';
			};
			objItems = [
						{groupname: 'divDomGrp1', caption: '가져오기'	, 	name: 'MASTER_RECEIVE'	, width: 100, datatype: 'button' },
						{groupname: 'divDomGrp1', caption: '저장'		, 	name: 'MASTER_SAVE'		, width: 50	, datatype: 'button' },
						{groupname: 'divDomGrp1', caption: '삭제'		, 	name: 'MASTER_DELETE'	, width: 50	, datatype: 'button' },
                   ];
			break;
		case 'SMZ6216_DETAIL_HEAD' : // SMZ6216
			if ( caption_flag ) {
				sCaption = '상세정보';
				sItemCd  = 'CAP_상세정보';
			};
			objItems = [
						{groupname: 'divDomGrp2', caption: '선택그룹'			, name: 'DETAIL_GROUP_LABEL', width: 100, datatype: 'label'},
						{groupname: 'divDomGrp2', caption: ''				, name: 'DETAIL_GROUP_CD'	, width: 0  , datatype: 'text', hidden:true},
						{groupname: 'divDomGrp2', caption: ''				, name: 'DETAIL_GROUP_VALUE', width: 200, datatype: 'text', readonly:true},
						{groupname: 'divDomGrp2', caption: '조회 TAG 정보 추가'	, name: 'DETAIL_ADD'		, width: 140, datatype: 'button'},
						{groupname: 'divDomGrp2', caption: '저장'				, name: 'DETAIL_SAVE'		, width: 50, datatype: 'button'},
						{groupname: 'divDomGrp2', caption: '삭제'				, name: 'DETAIL_DELETE'		, width: 50, datatype: 'button'},
						];
			break;
		case 'SMZ7092_DETAIL_HEAD' : // SMZ7092
			if ( caption_flag ) {
				sCaption = 'Job 스케줄 실행 이력';
				sItemCd  = 'CAP_상세정보';
			};
			objItems = [
						{groupname: 'divDomGrp2',caption: ''    	, name: 'S2_F_OP_DT'    , width: 100, datatype: 'date'},
						{groupname: 'divDomGrp2',caption: '~'    	, name: 'S2_T_OP_DT'    , width: 100, datatype: 'date'},
						{groupname: 'divDomGrp2',caption: '정상'    	, name: 'C_CNT'  		, width: 50, datatype: 'text', readonly: true },
						{groupname: 'divDomGrp2',caption: '오류'    	, name: 'E_CNT'  		, width: 50, datatype: 'text', readonly: true },
						];
			break;
			
		case 'SMZ6012_HEADER' : // SMZ6012
			if ( caption_flag ) {
				sCaption = '';
				sItemCd  = '';
			};
			objItems = [
						{groupname: 'divDomGrp',	caption:'부서'	, name:'DEPT_CD'	, width:120, datatype:'lov', maxlength:22, defval:0},
						];
			
			fc_addDataInGettedLov ( 'DEPT_LIST', {code: 'DEPT_LIST', tags: '', alias: ''} );
	    	fc_addDataInSettingLov( {object: 'DEPT_CD', code: 'DEPT_LIST', format: 'V', nullable: false, defval: ''} );
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

			case 'WORK_SPEC_RCP_HEAT' : // SCHB0020
				sCaption = 'Heat';
				sItemCd  = 'CAP_HEAT';
				break;
			case 'WORK_SPEC_RCP_SLAB' : // SCHB0020
				sCaption = 'Slab';
				sItemCd  = 'CAP_SLAB';

		    }
			objTabs[i] = {caption: sCaption, name: pages[i].id.toUpperCase(), itemCd:sItemCd, itemValue: 0 };
	  }



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

	   case 'TAG_DETAIL' : // SMZ7011
			if ( caption_flag ) {
				sCaption = '';
				sItemCd  = '';
			};
		colWidths = [40, 50, 250];
        objCols   = [
						{caption: 'Tag'		 	, name: 'TAG_H'		 , width: 60,  datatype: 'header' , align: 'center' },
						{caption: 'Tag ID'		, name: 'TAG_ID_H'   , width: 100, datatype: 'header' , align: 'center' },
						{caption: 'Tag ID'	    , name: 'TAG_ID'     , width: 150, datatype: 'text'   , align: 'left', required:true },
						{caption: 'Tag'			, name: 'TAG_H'		 , width: 60,  datatype: 'header' , align: 'center' },
						{caption: 'Tag 명'		, name: 'TAG_NM_H'   , width: 100, datatype: 'header' , align: 'center' },
						{caption: 'Tag 명'		, name: 'TAG_NM'     , width: 150, datatype: 'text'   , align: 'left', required:true },
						
						{caption: '구조정보'		, name: 'TREE_H'     , width: 60,  datatype: 'header' , align: 'center' },
						{caption: '공장'			, name: 'FAC_CD_H'   , width: 100, datatype: 'header' , align: 'center' },
						{caption: '공장'			, name: 'FAC_CD'     , width: '100%', datatype: 'lov'    , align: 'left', required:true },
						{caption: '구조정보'		, name: 'TREE_H'	 , width: 60,  datatype: 'header' , align: 'center' },
						{caption: '공정'			, name: 'PROC_CD_1_H', width: 100, datatype: 'header' , align: 'center' },
						{caption: '공정'			, name: 'PROC_CD_1'  , width: '100%', datatype: 'lov'    , align: 'left'},
						{caption: '구조정보'		, name: 'TREE_H'     , width: 60,  datatype: 'header' , align: 'center' },
						{caption: '설비'			, name: 'ASSET_CD_1_H',width: 100, datatype: 'header' , align: 'center' },
						{caption: '설비'			, name: 'ASSET_CD_1' , width: '100%', datatype: 'lov'    , align: 'left' },
						{caption: '구조정보'		, name: 'TREE_H'     , width: 60,  datatype: 'header' , align: 'center' },
						{caption: '자산번호'		, name: 'ASSET_CD_2_H',width: 100, datatype: 'header' , align: 'center' },
						{caption: '자산번호'		, name: 'ASSET_CD_2' , width: 150, datatype: 'text'   , align: 'left' },
						
						{caption: 'Tag 속성'		, name: 'MGT_H'		 , width: 60,  datatype: 'header' , align: 'center' },
						{caption: '순번'			, name: 'SEQ_H'	     , width: 100, datatype: 'header' , align: 'center' },
						{caption: '순번'			, name: 'SEQ'  	     , width: 150, datatype: 'integer', align: 'left', required:true },
						{caption: 'Tag 속성'		, name: 'MGT_H'		 , width: 60,  datatype: 'header' , align: 'center' },
						{caption: '트렌젝션'		, name: 'TR_CD_H'    , width: 100, datatype: 'header' , align: 'center' },
						{caption: '트렌젝션'		, name: 'TR_CD'      , width: '100%', datatype: 'lov'    , align: 'left', required:true },
						{caption: 'Tag 속성'		, name: 'MGT_H'		 , width: 60,  datatype: 'header' , align: 'center' },
						{caption: '유형'			, name: 'TAG_TP_H'   , width: 100, datatype: 'header' , align: 'center' },
						{caption: '유형'	    	, name: 'TAG_TP'     , width: '100%', dropDownHeight:100, datatype: 'lov'    , align: 'left', required:true },
						{caption: 'Tag 속성'		, name: 'MGT_H'		 , width: 60,  datatype: 'header' , align: 'center' },
						{caption: '단위'			, name: 'UNIT_H'	 , width: 100, datatype: 'header' , align: 'center' },
						{caption: '단위'			, name: 'UNIT'  	 , width: 150, datatype: 'text'   , align: 'left' },
						//{caption: '관리항목'		, name: 'MGT_H'		 , width: 60,  datatype: 'header' , align: 'center' },
						//{caption: '기준값'		, name: 'STD_VAL_H'  , width: 100, datatype: 'header' , align: 'center' },
						//{caption: '기준값'		, name: 'STD_VAL'    , width: 150, datatype: 'number' , align: 'left' },
						{caption: '관리 범위'		, name: 'MGMT_H'		 , width: 60,  datatype: 'header' , align: 'center' },
						{caption: '기준값'		, name: 'MGMT_STD_VAL_H'   , width: 100, datatype: 'header' , align: 'center' },
						{caption: '기준값'		, name: 'MGMT_STD_VAL'     , width: 150, datatype: 'number1' , align: 'left' },
						{caption: '관리 범위'		, name: 'MGMT_H'		 , width: 60,  datatype: 'header' , align: 'center' },
						{caption: '하한값'		, name: 'MGMT_LL_VAL_H'   , width: 100, datatype: 'header' , align: 'center' },
						{caption: '하한값'		, name: 'MGMT_LL_VAL'     , width: 150, datatype: 'number1' , align: 'left' },
						{caption: '관리 범위'		, name: 'MGMT_H'		 , width: 60,  datatype: 'header' , align: 'center' },
						{caption: '상한값'		, name: 'MGMT_UL_VAL_H'	 , width: 100, datatype: 'header' , align: 'center' },
						{caption: '상한값'		, name: 'MGMT_UL_VAL'  	 , width: 150, datatype: 'number1' , align: 'left' },
						
						{caption: 'Tag 범위'		, name: 'MGT_H'		 , width: 60,  datatype: 'header' , align: 'center' },
						{caption: '하한값'		, name: 'LL_VAL_H'   , width: 100, datatype: 'header' , align: 'center' },
						{caption: '하한값'		, name: 'LL_VAL'     , width: 150, datatype: 'number' , align: 'left' },
						{caption: 'Tag 범위'		, name: 'MGT_H'		 , width: 60,  datatype: 'header' , align: 'center' },
						{caption: '상한값'		, name: 'UL_VAL_H'	 , width: 100, datatype: 'header' , align: 'center' },
						{caption: '상한값'		, name: 'UL_VAL'  	 , width: 150, datatype: 'number' , align: 'left' },
						
						{caption: '사용'		, name: 'USE_YN_H'	 , width: 60,  datatype: 'header' , align: 'center' },
						{caption: '-'			, name: 'USE_YN_H'   , width: 100, datatype: 'header' , align: 'center' },
						{caption: '사용'		, name: 'USE_YN'     , width: 150, datatype: 'checkbox', align: 'left' },
						{caption: 'OPC주소'		, name: 'OPC_ITEM_H' , width: 60,  datatype: 'header' , align: 'center' },
						{caption: '-'			, name: 'OPC_ITEM_H' , width: 100, datatype: 'header' , align: 'center' },
						{caption: 'OPC주소'		, name: 'OPC_ITEM'   , width: 150, datatype: 'text'   , align: 'left' },
						{caption: '비고'			, name: 'REMARKS_H'	 , width: 60,  datatype: 'header' , align: 'center' },
						{caption: '-'		    , name: 'REMARKS_H'  , width: 100, datatype: 'header' , align: 'center' },
						{caption: '비고'		    , name: 'REMARKS'    , width: 150, datatype: 'text'   , align: 'left' },
					];
        
        fc_addDataInGettedLov("TAG_TR_CD", {code: "TAG_TR_CD", tags: "", alias: ""});
		fc_addDataInSettingLov({object: "TR_CD", code: "TAG_TR_CD", format: "V", nullable: true, defval: ""});
		fc_addDataInGettedLov("TAG_FAC_CD", {code: "TAG_FAC_CD", tags: "", alias: ""});
		fc_addDataInSettingLov({object: "FAC_CD", code: "TAG_FAC_CD", format: "V", nullable: true, defval: ""});
		fc_addDataInGettedLov("TAG_COST_CENTER", {code: "TAG_COST_CENTER", tags: "", alias: ""});
		fc_addDataInSettingLov({object: "PROC_CD_1", code: "TAG_COST_CENTER", format: "V", nullable: true, defval: ""});
		fc_addDataInGettedLov("TAG_ASSET_CD", {code: "TAG_ASSET_CD", tags: "", alias: ""});
		fc_addDataInSettingLov({object: "ASSET_CD_1", code: "TAG_ASSET_CD", format: "V", nullable: true, defval: ""});
		fc_addDataInGettedLov("TAG_TP", {code: "TAG_TP", tags: "", alias: ""});
		fc_addDataInSettingLov({object: "TAG_TP", code: "TAG_TP", format: "V", nullable: false, defval: ""});
	    break;
	   case 'TAG_BIZ_DATA' : // SMZ6030
           if ( caption_flag ) {
               sCaption = '';
               sItemCd  = '';
           };
           fc_setInputVal( 'BIZ_DATA_ID_CUR'  , '' );
           fc_setInputVal( 'BIZ_DATA_NM_CUR'  , '' );
           
           colWidths = [ 120,120,120,200 ];
           objCols   = [
                       {caption: 'Data처리ID' , name: 'BIZ_DATA_ID_CUR_HEAD'  , width: '100%', datatype: 'header', itemCd: 'QUERY_ID'},
                       {caption: 'Data처리ID' , name: 'BIZ_DATA_ID_CUR'       , width: '100%', datatype: 'text'  , uppercase: true, readonly: true },
                       {caption: 'Data처리명'  , name: 'BIZ_DATA_NM_CUR_HEAD'  , width: '100%', datatype: 'header', itemCd: 'QUERY_TYPE'},
                       {caption: 'Data처리명'  , name: 'BIZ_DATA_NM_CUR'       , width: '100%', datatype: 'text'  , uppercase: true, readonly: true},
                       ];
           break;
	    case 'VT_LOG' : // SMZ7095

	        if ( caption_flag ) {
	            sCaption = '반장 전달사항';
	            sItemCd  = 'CAP_반장 전달사항';
	        };
	        colWidths = ['100%']
	        objCols = [
	                     {caption: '반장 전달사항 '    , name: 'RESULT_MSG',     width:'100%',     height: 105 ,datatype: 'textarea',   align:'left', readonly:true   },
	                  ];
	        break;
	   case 'SCHE_CRON' : // SM7093
	           if ( caption_flag ) {
	               sCaption = '';
	               sItemCd  = '';
	           };
	           
	           colWidths = [ 120,120,120,200,120,200 ];
	           objCols   = [
	                       {caption: 'Data처리ID' , name: 'JOB_ID_HEAD'  , width: '100%', datatype: 'header', itemCd: 'QUERY_ID'},
	                       {caption: 'Data처리ID' , name: 'JOB_ID'       , width: '100%', datatype: 'text'  , uppercase: true, readonly: true },
	                       {caption: 'Data처리명'  , name: 'USE_YN_HEAD'  , width: '100%', datatype: 'header', itemCd: 'QUERY_TYPE'},
	                       {caption: 'Data처리명'  , name: 'USE_YNT'       , width: '100%', datatype: 'text'  , uppercase: true, readonly: true},
	                       {caption: 'Data처리명'  , name: 'SCHE_CRON_HEAD'  , width: '100%', datatype: 'header', itemCd: 'QUERY_TYPE'},
	                       {caption: 'Data처리명'  , name: 'SCHE_CRONT'       , width: '100%', datatype: 'text'  , uppercase: true, readonly: true},
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
		case 'WEATHER_LIST':
			gridId    = 'gridWeatherList';
			if ( caption_flag ) {
				sCaption = 'gridMftList';
				sItemCd  = 'CAP_MFT_LIST';
			};

			objItems = [
			             {caption: '공장코드'   	, name: 'PLANT_CD'      , width: 120	, datatype: 'lov' 	,align:'center'}
			            //,{caption: '저장일시'   	, name: 'EVENT_DTM2' 	, width: 150	, datatype: 'datetime'	}
			            ,{caption: '관측시각정보'		, name: 'OBSERVE_DT2' 	, width: 180	, datatype: 'datetime'	}
			            ,{caption: '현재기온(ºC)'	, name: 'TEMP' 			, width: 150	, datatype: 'number2'}
			            //,{caption: '체감온도'    	, name: 'SENS_TEMP' 	, width: 100	, datatype: 'number2'}
			            ,{caption: '습도(%)'    	, name: 'HUMIDITY_RATE' , width: 150	, datatype: 'number2'}
			            //,{caption: '강수량'    	, name: 'RAINFALL_QTY' 	, width: 100	, datatype: 'number2'}
			            //,{caption: '적설량'    	, name: 'SNOWFALL_QTY' 	, width: 100	, datatype: 'number2'}
			            //,{caption: '해면기압'    	, name: 'PA' 			, width: 100	, datatype: 'number2'}
			            ,{caption: '풍향'    		, name: 'WD' 			, width: 150	, datatype: 'text',align:'center'	}
			            ,{caption: '풍속(m/s)'    , name: 'WS' 			, width: 150	, datatype: 'text',align:'center'	}
			            //,{caption: '미세먼지농도'    , name: 'FINE_DUST' 	, width: 100	, datatype: 'number2'}
			            //,{caption: '날씨아이콘'    	, name: 'WEATHER_ICON' 	, width: 100	, datatype: 'text'	}
			            ];

			fc_addDataInGettedLov ( 'PLANT_CD', {code: 'PLANT_CD', tags: '', alias: ''} );
			fc_addDataInSettingLov( {object: gridId+'.PLANT_CD', code: 'PLANT_CD', format: 'V', nullable: false, defval: ''} );

			break;
		case 'TABLE_LIST':
			gridId = 'gridTable';
			if ( caption_flag ) {
				sCaption = '';
				sItemCd  = '';
			};
			objItems = 	[
						{caption: 'Owner'      , name: 'OWNER'      , width: 100, datatype: 'text' , hidden: true },
						{caption: 'Schema'     , name: 'TABLE_SCHEMA' , width: 100, datatype: 'text' , hidden: true },
						{caption: 'Table'      , name: 'TABLE_NAME' , width: 230, datatype: 'text' },
						{caption: 'Description', name: 'TABLE_DESC' , width: 280, datatype: 'text' , itemCd: 'CAP_DESC'},
						];
			break;
		case 'TAG_LIST':
			gridId = 'gridTable';
			if ( caption_flag ) {
				sCaption = '';
				sItemCd  = '';
			};
			objItems = 	[
			           	{caption: '전문코드', 		name: 'TRANSACTION_CODE', 		width: 200, datatype: 'lov', itemCd: 'TRANSACTION_CODE'},
			           	{caption: '공정코드', 		name: 'PROC_GRP_CD', 		width: 100, datatype: 'lov', itemCd: 'PROC_GRP_CD'},
			           	{caption: 'PLC그룹코드', 	name: 'PLC_GRP_CD', 		width: 90, datatype: 'lov', itemCd: 'PLC_GRP_CD'},
						{caption: 'Description', 	name: 'STD_ATTR_NM', 		width: 250, datatype: 'text'},
						{caption: '구 TAG', 		name: 'OLD_TAG_ID', 				width: 135, datatype: 'text'},
						{caption: 'Val', 			name: 'VAL', 	width: 100, datatype: 'number', align:'right'},
						{caption: '단위', 			name: 'UOM', 	width: 70, datatype: 'text', align:'left'},
						{caption: '발생일시', 		name: 'EVENT_DATE', 	width: 160, datatype: 'text', align:'center'},
						{caption: '현 TAG', 		name: 'STANDARD_KOREAN_NAME2', 	width: 550, datatype: 'text'},
						{caption: '표준ID', 		name: 'STD_ID', 	width: 260, datatype: 'text'},
						];

			fc_addDataInGettedLov ( 'TRANSACTION_CODE', {code: 'TRANSACTION_CODE', tags: '', alias: ''} );
			fc_addDataInSettingLov( {object: gridId+'.TRANSACTION_CODE', code: 'TRANSACTION_CODE', format: 'V', nullable: false, defval: ''} );

			fc_addDataInGettedLov ( 'PROC_GRP_CD', {code: 'PROC_GRP_CD', tags: '', alias: ''} );
			fc_addDataInSettingLov( {object: gridId+'.PROC_GRP_CD', code: 'PROC_GRP_CD', format: 'V', nullable: false, defval: ''} );

			fc_addDataInGettedLov ( 'PLC_GRP_CD', {code: 'PLC_GRP_CD', tags: '', alias: ''} );
			fc_addDataInSettingLov( {object: gridId+'.PLC_GRP_CD', code: 'PLC_GRP_CD', format: 'V', nullable: false, defval: ''} );
			break;
		case 'TAG_TMP_LIST':
			gridId = 'gridTable';
			if ( caption_flag ) {
				sCaption = '';
				sItemCd  = '';
			};
			objItems = 	[
			           	{caption: 'PLC그룹코드', 	name: 'PLC_GRP_CD', 		width: 90, datatype: 'lov', itemCd: 'PLC_GRP_CD'},
						{caption: 'TAG ID', 		name: 'STD_TAG_ID', 				width: 200, datatype: 'text'},
						{caption: 'Description', 		name: 'STD_ATTR_NM', 				width: 300, datatype: 'text'},
						{caption: 'Remark', 		name: 'RMRK1', 				width: 180, datatype: 'text'},
						{caption: 'Val', 		name: 'STD_TAG_VA', 	width: 100, datatype: 'text', align:'right'},
						{caption: '발생일시', 		name: 'SNDR_INFORM_EDIT_DATE', 	width: 160, datatype: 'text', align:'center'},
						{caption: 'STD LC Val', 		name: 'STD_LC_TMP_VAL', datatype: 'text', hidden:true},
						];
			for(var i=0; i<64; i++){
				objItems.push({caption: ''+i+'', 		name: 'STD_LC_VAL_'+i+'', 	width: 15, datatype: 'text', align:'center'});
			}

			fc_addDataInGettedLov ( 'PLC_GRP_CD', {code: 'PLC_GRP_CD', tags: '', alias: ''} );
			fc_addDataInSettingLov( {object: gridId+'.PLC_GRP_CD', code: 'PLC_GRP_CD', format: 'V', nullable: false, defval: ''} );
			break;
		case 'TAG_TREE_LIST_TEST':
			gridId = 'gridTreeTable_0';
			if ( caption_flag ) {
				sCaption = 'Caption';
				sItemCd  = '';
			};
			objItems = 	[
						//{caption: 'Description', 		name: 'STD_ATTR_NM', 		width: '50%', datatype: 'text'},
						//{caption: '구 TAG', 		name: 'OLD_TAG_ID', 				width: '20%', datatype: 'text'},
						{caption: '발생일시', 		name: 'EVENT_DTM', 	width: '17%', datatype: 'text', align:'center'},
						{caption: 'Val1', 		name: 'TV1', 	width: '10%', datatype: 'number', align:'right'},
						{caption: 'Val2', 		name: 'TV2', 	width: '10%', datatype: 'number', align:'right'},
						{caption: 'Val3', 		name: 'TV3', 	width: '10%', datatype: 'number', align:'right'},
						];
			break;
		case 'TAG_TREE_LIST_0':
			gridId = 'gridTreeTable_0';
			if ( caption_flag ) {
				sCaption = 'Caption';
				sItemCd  = '';
			};
			objItems = 	[
						{caption: 'Description', 		name: 'STD_ATTR_NM', 		width: '50%', datatype: 'text'},
						{caption: '구 TAG', 		name: 'OLD_TAG_ID', 				width: '20%', datatype: 'text'},
						{caption: '발생일시', 		name: 'EVENT_DTM', 	width: '17%', datatype: 'text', align:'center'},
						{caption: 'Val', 		name: 'TAG_VA', 	width: '10%', datatype: 'number', align:'right'},
						];
			break;
		case 'TAG_TREE_LIST_1':
			gridId = 'gridTreeTable_1';
			if ( caption_flag ) {
				sCaption = 'Caption';
				sItemCd  = '';
			};
			objItems = 	[
						{caption: 'Description', 		name: 'STD_ATTR_NM', 		width: '50%', datatype: 'text'},
						{caption: '구 TAG', 		name: 'OLD_TAG_ID', 				width: '20%', datatype: 'text'},
						{caption: '발생일시', 		name: 'EVENT_DTM', 	width: '17%', datatype: 'text', align:'center'},
						{caption: 'Val', 		name: 'TAG_VA', 	width: '10%', datatype: 'number', align:'right'},
						];
			break;
		case 'TAG_TREE_LIST_2':
			gridId = 'gridTreeTable_2';
			if ( caption_flag ) {
				sCaption = 'Caption';
				sItemCd  = '';
			};
			objItems = 	[
						{caption: 'Description', 		name: 'STD_ATTR_NM', 		width: '50%', datatype: 'text'},
						{caption: '구 TAG', 		name: 'OLD_TAG_ID', 				width: '20%', datatype: 'text'},
						{caption: '발생일시', 		name: 'EVENT_DTM', 	width: '17%', datatype: 'text', align:'center'},
						{caption: 'Val', 		name: 'TAG_VA', 	width: '10%', datatype: 'number', align:'right'},
						];
			break;
		case 'ALRAM_LIST':
			gridId = 'gridTable';
			if ( caption_flag ) {
				sCaption = '';
				sItemCd  = '';
			};
			objItems = 	[
						{caption: 'TC', 		name: 'TRANSACTION_CODE', 				width: 200, datatype: 'text'},
						{caption: 'TAG ID', 		name: 'MICRO_ATT_ID', 				width: 300, datatype: 'text'},
						{caption: 'Val', 		name: 'MIDT_CLT_CONT', 	width: 100, datatype: 'text', align:'right'},
						{caption: 'Count', 		name: 'CNT', 	width: 160, datatype: 'text', align:'right'},
						];
			break;
		case 'MAIL_MASTER_INFO':
			gridId = 'gridMailMaster';
			if ( caption_flag ) {
				sCaption = 'Mail Master';
				sItemCd  = '';
			};
			objItems = [
			            {caption: 'Owner'		        , name: 'MAIL_OWNER'    	, width: 100     , datatype: 'lov' 		, itemCd: 'CAP_OWNER_CHAIN'},
			            {caption: 'Mail ID'		        , name: 'MAIL_ID'	    	, width: 120	 , datatype: 'text'		, itemCd: 'CAP_MAIL_ID'},
			            {caption: 'Mail Name'			, name: 'MAIL_NM'	    	, width: 180	 , datatype: 'text'		, itemCd: 'CAP_MAIL_NM'},
	    	       	    {caption: 'Title'	            , name: 'TITLE'		   		, width: 300	 , datatype: 'text'		, itemCd: 'CAP_MAIL_TITLE'},
	    	       	    {caption: 'Sender'	            , name: 'SENDER_ADDR'  	 	, width: 200	 , datatype: 'text'		, itemCd: 'CAP_MAIL_SEND_ADDR'},
	    	       	    {caption: 'Receiver'	        , name: 'RECEIVER_ADDR_CNT'	, width: 100	 , datatype: 'text'		, itemCd: 'CAP_MAIL_RCV_CNT'	, align:'center'},
	    	       	    {caption: 'Signature'           , name: 'SIGNATURE' 		, width: 250	 , datatype: 'textarea'	, itemCd: 'CAP_MAIL_SIGN'},
	    	       	    {caption: 'Remarks'				, name: 'REMARKS'			, width: 150     , datatype: 'text'},
	        ];

			fc_setUpperInCol( gridId, [ 'MAIL_ID' ] );
			fc_setKeysInCol( gridId, ['MAIL_ID' ] );
			fc_setEditInCol( gridId, ['RECEIVER_ADDR_CNT' ], false );
			fc_setRequiredInCol( gridId, ['MAIL_ID', 'MAIL_NM','MAIL_OWNER','TITLE','SENDER_ADDR' ] );

			fc_addDataInGettedLov( 'BIZ_CHAIN_CD'	, {code: 'BIZ_CHAIN_CD'	, tags: ''	, alias: ''} );
			fc_addDataInSettingLov( {object: gridId+'.MAIL_OWNER'	, code: 'BIZ_CHAIN_CD', format: 'V', nullable: true	, defval: ''} );

			break;

		case 'MAIL_RECEIVER_INFO':
			gridId = 'gridMailReceiver';
			if ( caption_flag ) {
				sCaption = 'Mail Receiver';
				sItemCd  = '';
			};
			objItems = [
			            {caption: 'Seq'			, name: 'MAIL_SEQ'	       , width: 40	 , datatype: 'number'	,hidden:true},
			            {caption: 'Receviver'	, name: 'ADDR_PRI'         , width: 40   , datatype: 'number'  	,itemCd: 'CAP_MAIL_RCV_SEQ'},
//			            {caption: 'User id'		, name: 'USER_ID'          , width: 100  , datatype: 'popup'  	,align:'left' },
			            {caption: 'Emp No'		, name: 'EMP_NO'    	   , width: 100  , datatype: 'popup'  	,align:'left' },
						{caption: 'Emp Nm'		, name: 'EMP_NM'           , width: 300  , datatype: 'text'  	,align:'left' },
						{caption: 'Receviver'	, name: 'RECEIVER_ADDR'    , width: 300  , datatype: 'text' 	,align:'left', itemCd: 'CAP_MAIL_RCV_ADDR' },
						{caption: 'Telephone'	, name: 'TEL_NO'           , width: 100  , datatype: 'text'  	,align:'left' },
					   ];

			//fc_setEditInCol ( gridId, ['USER_NM'], false );
			fc_setKeysInCol( gridId, ['MAIL_SEQ' ] );
			fc_setRequiredInCol( gridId, ['MAIL_SEQ','EMP_NO' ] );
			fc_addCodeList     ( {object: gridId+'.EMP_NO', code: 'EMAIL_LIST', title: 'Email List', manKey: gridId }, { itemCd: 'CAP_EMAIL_INFO', itemValue: 0 } );
			break;
		case 'TAG_BIZ_DATA': // SMZ6030
            gridId = 'gridTagBizData';
            if ( caption_flag ) {
                sCaption = 'Tag 업무 Data처리 관리 ';
                sItemCd  = '';
            };
                       
            objGrpItems =   [ {caption: '업무 Data'  ,  name: 'GRP_BIZ' , align: 'center'},
                              {caption: '메뉴'       , name: 'GRP_MNU' , align: 'center'},
                              {caption: '파라미터(:param_1..)'       , name: 'GRP_PARAM' , align: 'center'}
                            ];
                        
            objItems =  [
                        {caption: 'ID'        , name: 'BIZ_DATA_ID' , width: 100 , datatype: 'text',group:'GRP_BIZ' ,align:'center',required : true},
                        {caption: '명'        , name: 'BIZ_DATA_NM' , width: 200, datatype: 'text',group:'GRP_BIZ' ,align:'left'},
                        {caption: '사용여부'    , name: 'USE_YN'      , width: 80, datatype: 'checkbox',align:'center' },
                        {caption: '순서'       , name: 'MNU_SEQ'     , width: 70, datatype: 'number',align:'center' },
                        {caption: '레벨1'      , name: 'MNU_LV_1_NM' , width: 120, datatype: 'text',group:'GRP_MNU',align:'left'},
                        {caption: '레벨2'      , name: 'MNU_LV_2_NM' , width: 120, datatype: 'text',group:'GRP_MNU',align:'left'},
                        {caption: '레벨3'      , name: 'MNU_LV_3_NM' , width: 120, datatype: 'text',group:'GRP_MNU',align:'left'},
                        {caption: ':param_1'   , name: 'PARAM_1' , width: 90, datatype: 'text',group:'GRP_PARAM',align:'left'},
                        {caption: ':param_2'   , name: 'PARAM_2' , width: 90, datatype: 'text',group:'GRP_PARAM',align:'left'},
                        {caption: ':param_3'   , name: 'PARAM_3' , width: 90, datatype: 'text',group:'GRP_PARAM',align:'left'},
                        {caption: '쿼리'       , name: 'DB_SQL'      , width: 110, datatype: 'text',align:'center',hidden:true},
                        {caption: '비고'       , name: 'REMARK'       , width: 'auto', datatype: 'text',align:'left'},
                        ];
            
            fc_setKeysInCol    ( gridId, [ 'BIZ_DATA_ID' ] );
            fc_setRequiredInCol( gridId, [ 'MNU_SEQ','MNU_LV_1_NM' ] );
            
            break;
            
		case 'TAG_DICTIONARY': // SMZ7010
			gridId = 'gridTagDict';
			if ( caption_flag ) {
				sCaption = 'Tag Dictionary';
				sItemCd  = 'CAP_TAG_MST_INFO';
			};
			
	        
			objGrpItems = 	[ {caption: '구조정보'  ,	name: 'GRP_TREE' , align: 'center'},
			                  {caption: 'Tag 속성' ,	name: 'GRP_TAG'  ,align: 'center'},
			                  {caption: '관리 범위 ' ,	name: 'GRP_MGMT_RANGE'  , align: 'center'},
			                  {caption: 'Tag값 범위 ',	name: 'GRP_TAG_RANGE'  , align: 'center'}
							];
			
			objItems = 	[
						{caption: 'Tag ID'     	  , name: 'TAG_ID'    ,  width: 120, frozen:true, align:'left' ,datatype: 'text'},
						{caption: 'Tag 명'      	  , name: 'TAG_NM'    ,  width: 250, frozen:true, align:'left', datatype: 'text'},
						{caption: '공장'           , name: 'FAC_NM'    , group:'GRP_TREE', width: 80, align:'left' ,datatype: 'text'},
						{caption: '공정'      	  , name: 'PROC_NM'   , group:'GRP_TREE', width: 100, align:'left' ,datatype: 'text'},
						//{caption: '공정_코드_2'   , name: 'PROC_CD_2'  , group:'GRP_TREE, width: 100, align:'left' ,datatype: 'text'},
						{caption: '설비명'        , name: 'ASSET_NM' , group:'GRP_TREE',width: 180, align:'left' ,datatype: 'text'},
						{caption: '설비번호'   	  , name: 'ASSET_CD_2', group:'GRP_TREE', width: 100, align:'left' ,datatype: 'text'},
						{caption: '순번'           , name: 'SEQ'       , group:'GRP_TAG',  width: 60 , align:'right', datatype: 'number'},
						{caption: '트렌젝션'        , name: 'TR_NM'     , group:'GRP_TAG',  width: 100 , align:'center' ,  datatype: 'text'},
						{caption: '유형'           , name: 'TAG_TP_NM'  , group:'GRP_TAG',  width: 70, align:'center' ,datatype: 'text'},
						{caption: '단위'     		  , name: 'UNIT'      , group:'GRP_TAG',  width: 80, align:'center' ,datatype: 'text'},
						//{caption: '기준'      	  , name: 'STD_VAL'   , group:'GRP_RANGE', width: 60, align:'right' ,datatype: 'number'},
						{caption: '기준'      	  , name: 'MGMT_STD_VAL', group:'GRP_MGMT_RANGE', width: 70, align:'right' , datatype: 'number1'},
						{caption: '하한'      	  , name: 'MGMT_LL_VAL', group:'GRP_MGMT_RANGE', width: 70, align:'right' , datatype: 'number1'},
						{caption: '상한'      	  , name: 'MGMT_UL_VAL', group:'GRP_MGMT_RANGE', width: 70, align:'right' , datatype: 'number1'},
						{caption: '하한'      	  , name: 'LL_VAL'    , group:'GRP_TAG_RANGE', width: 70, align:'right' , datatype: 'number'},
						{caption: '상한'      	  , name: 'UL_VAL'    , group:'GRP_TAG_RANGE', width: 70, align:'right' , datatype: 'number'},
						{caption: '사용'           , name: 'USE_YN'    , 	width: 55, align:'center' ,datatype: 'checkbox'},
						{caption: 'OPC주소'        , name: 'OPC_ITEM'  , width: 200, align:'left' ,datatype: 'text'},
						{caption: '비고'      	  , name: 'REMARKS'   , width: 'auto', align:'left' ,datatype: 'text'}
						];
			break;
		case 'TAG_HISTORY': // SMZ7020
			gridId = 'gridTagHistMap';
			if ( caption_flag ) {
				sCaption = 'Tag History Information';
				sItemCd  = 'CAP_TAG_HIST_INFO';
			};
			
			objGrpItems = 	[ {caption: 'Tag 정보' ,	name: 'GRP_TAG'  ,align: 'center'},
							  {caption: '변경 값' ,	name: 'GRP_VAL'  ,align: 'center'}
								];
							
			objItems = 	[
						//{caption: 'TAG ID' , name: 'TAG_ID',    group:'GRP_TAG',	width: 150, datatype: 'text', align:'left'},
						//{caption: 'TAG 명'  , name: 'TAG_NM', 	group:'GRP_TAG',width: 150, datatype: 'text', align:'left'},
						{caption: '수정일시'  , name: 'HIST_DTM', 	width: 140, datatype: 'datetime',align:'center'},
						{caption: '컬럼 명'   , name: 'COL_NM', 	width: 'auto', datatype: 'text',align:'left'},
						
						{caption: '수정 전 '  , name: 'BEF_VAL', 	group:'GRP_VAL',	width: 150, datatype: 'text',align:'left'},
						{caption: '수정 후'   , name: 'CUR_VAL', 	group:'GRP_VAL',	width: 150, datatype: 'text',align:'left'},
						{caption: '변경자'   , name: 'UPD_USER_ID',  width: 100, datatype: 'text',align:'left'}

						];
			//fc_setKeysInCol    ( gridId, [ 'TAG_ID' ] );
			//fc_setRequiredInCol( gridId, [ 'TAG_ID','TAG_NM' ] );

			break;
		case 'TAG_FRML': // SMZ7030
			gridId = 'gridTagFrml';
			if ( caption_flag ) {
				sCaption = 'Tag Formula Information';
				sItemCd  = 'CAP_TAG_FRML_INFO';
			};
			
			objGrpItems = 	[ {caption: '가상 Tag 정보' ,	name: 'GRP_TAG'  ,align: 'center'},
				  			  {caption: '구조 정보' 	 ,	name: 'GRP_FAC'  ,align: 'center'},
				  			  {caption: '관리 범위 ' ,	name: 'GRP_MGMT_RANGE'  , align: 'center'},
					];
			
			objItems = 	[
						{caption: 'Tag ID'     		 	 , name: 'VTL_TAG_ID', 			width: 130		, datatype: 'text'	,align: 'left'},
						{caption: 'Tag 명'      	 	 	 , name: 'VTL_TAG_NM', 			width: 200		, datatype: 'text'	,align: 'left'},
						{caption: '사용여부'      	 		 , name: 'FUNC_USAGE_YN', 	group:'GRP_TAG',	width: 80		, datatype: 'lov'	,align: 'center'},
						{caption: 'Tag 유형'      	 	 , name: 'TAG_TP', 			group:'GRP_TAG',	width: 80		, datatype: 'lov'	,align: 'center'},
						{caption: '계산식 유형'      	 	 , name: 'FRML_TP', 		group:'GRP_TAG',	width: 80		, datatype: 'lov'	,align: 'center'},
						{caption: 'Frml Original'      	 , name: 'FRML_ORGNL', 		group:'GRP_TAG',	width: 0		, datatype: 'text'	,align: 'center'},	
						{caption: 'Frml Java'      	 	 , name: 'FRML_JAVA', 		group:'GRP_TAG',	width: 0		, datatype: 'text'	,align: 'center'},
						{caption: 'Frml SQL'      	 	 , name: 'FRML_SQL', 		group:'GRP_TAG',	width: 0		, datatype: 'text'	,align: 'center'},
						
						{caption: '실Tag(,구분)'      	 , name: 'FRML_REAL_TAGS', 	group:'GRP_TAG',	width: 180		, datatype: 'text'	,align: 'left'},
						{caption: 'VT편성 사용여부'      	 , name: 'VT_USE_YN'	, 	group:'GRP_TAG',	width: 80		, datatype: 'lov'	,align: 'center'},
						{caption: 'Result Data Type'     , name: 'RSLT_DATA_TP', 	group:'GRP_TAG',	width: 0		, datatype: 'text'	,align: 'center'},
						{caption: 'Run Check'      	 	 , name: 'RUN_CHK_YN', 		group:'GRP_TAG',	width: 0		, datatype: 'text'	,align: 'center'},
						{caption: '공장'      	 	 	 , name: 'FAC_CD', 			group:'GRP_FAC',	width: 0		, datatype: 'lov', hidden:true},
						{caption: '공정'      	 	 	 , name: 'PROC_CD_1', 		group:'GRP_FAC',	width: 0		, datatype: 'lov', hidden:true },
						{caption: 'Proc CD2'      	 	 , name: 'PROC_CD_2', 		group:'GRP_FAC',	width: 0		, datatype: 'text'},
						{caption: '설비'      	 	 	 , name: 'ASSET_CD_1', 		group:'GRP_FAC',	width: 0		, datatype: 'lov', hidden:true},
						{caption: 'ASSET CD2'      	 	 , name: 'ASSET_CD_2', 		group:'GRP_FAC',	width: 0		, datatype: 'text'},
						{caption: '기준'      	  		 , name: 'MGMT_STD_VAL',     group:'GRP_MGMT_RANGE', width: 80, align:'right' , datatype: 'number1'},
						{caption: '하한'      	  		 , name: 'MGMT_LL_VAL',     group:'GRP_MGMT_RANGE', width: 80, align:'right' , datatype: 'number1'},
						{caption: '상한'      	  		 , name: 'MGMT_UL_VAL',     group:'GRP_MGMT_RANGE', width: 80, align:'right' , datatype: 'number1'},
						{caption: '비고'      	 	 	 , name: 'REMARK', 								width: 'auto'	, datatype: 'text'}
						
						];
			
			fc_setKeysInCol    ( gridId, [ 'VTL_TAG_ID' ] );
			fc_setRequiredInCol( gridId, [ 'VTL_TAG_ID','TAG_TP','FRML_TP','FUNC_USAGE_YN' ] );

			//fc_setHiddenInCol  ( gridId, [ 'FRML_ORGNL','FRML_JAVA','FRML_SQL' ] );
			fc_setHiddenInCol  ( gridId, [ 'FRML_ORGNL','FRML_JAVA','FRML_SQL','RSLT_DATA_TP','RUN_CHK_YN','PROC_CD_2','ASSET_CD_2' ] );
			
			fc_addDataInGettedLov ( 'TAG_TP', {code: 'TAG_TP', tags: '', alias: ''} );
			fc_addDataInGettedLov ( 'FRML_TP', {code: 'FRML_TP', tags: '', alias: ''} );
			fc_addDataInGettedLov ( 'COM_YN', {code: 'COM_YN', tags: '', alias: ''} );
			fc_addDataInSettingLov( {object: gridId+'.TAG_TP', code: 'TAG_TP', format: 'V', nullable: false , defval: ''} );
			fc_addDataInSettingLov( {object: gridId+'.FRML_TP', code: 'FRML_TP', format: 'V', nullable: false , defval: ''} );
			fc_addDataInSettingLov( {object: gridId+'.FUNC_USAGE_YN', code: 'COM_YN', format: 'V', nullable: false , defval: ''} );
			fc_addDataInSettingLov( {object: gridId+'.VT_USE_YN', code: 'COM_YN', format: 'V', nullable: false , defval: ''} );
			
			fc_addDataInGettedLov("TAG_FAC_CD", {code: "TAG_FAC_CD", tags: "", alias: ""});
			fc_addDataInSettingLov({object: gridId+'.FAC_CD', code: "TAG_FAC_CD", format: "V", nullable: true, defval: ""});
			fc_addDataInGettedLov("TAG_COST_CENTER", {code: "TAG_COST_CENTER", tags: "", alias: ""});
			fc_addDataInSettingLov({object:  gridId+'.PROC_CD_1', code: "TAG_COST_CENTER", format: "V", nullable: true, defval: ""});
			fc_addDataInGettedLov("TAG_ASSET_CD", {code: "TAG_ASSET_CD", tags: "", alias: ""});
			fc_addDataInSettingLov({object:  gridId+'.ASSET_CD_1', code: "TAG_ASSET_CD", format: "V", nullable: true, defval: ""});
			
			
			break;
		case 'TAG_FUNC': // SMZ7040
			gridId = 'gridTagFunc';
			if ( caption_flag ) {
				sCaption = 'Tag Function Information';
				sItemCd  = 'CAP_TAG_FUNC_INFO';
			};
			objItems = 	[
						{caption: 'Function ID'     	 , name: 'FUNC_ID', 		width: 150		, datatype: 'text'},
						{caption: 'Function 명'      	 , name: 'FUNC_NM', 		width: 200		, datatype: 'text'},
						{caption: '계산식 유형'      	 	 , name: 'FRML_TP', 		width: 80		, datatype: 'lov'	,align: 'center'},
						{caption: 'Frml Original'      	 , name: 'FRML_ORGNL', 		width: 0		, datatype: 'text'},
						{caption: 'Frml Java'      	 	 , name: 'FRML_JAVA', 		width: 0		, datatype: 'text'},
						{caption: 'Frml SQL'      	 	 , name: 'FRML_SQL', 		width: 0		, datatype: 'text'},
						{caption: '입력변수배열'       		 , name: 'INPUT_VAR_ARR', 	width: 100		, datatype: 'text'},
						{caption: 'Result Data Type'     , name: 'RSLT_DATA_TP', 	width: 100		, datatype: 'text'},
						{caption: 'Run Check'      	 	 , name: 'RUN_CHK_YN', 		width: 100		, datatype: 'text'},
						{caption: '비고'      	 	 	 , name: 'REMARK', 			width: 'auto'	, datatype: 'text'}
						];

			fc_setKeysInCol    ( gridId, [ 'FUNC_ID' ] );
			fc_setRequiredInCol( gridId, [ 'FUNC_ID','FUNC_NM' ] );

			fc_setHiddenInCol  ( gridId, [ 'FRML_ORGNL','FRML_JAVA','FRML_SQL','RSLT_DATA_TP','RUN_CHK_YN' ] );

			fc_addDataInGettedLov ( 'FRML_TP', {code: 'FRML_TP', tags: '', alias: ''} );
			fc_addDataInSettingLov( {object: gridId+'.FRML_TP', code: 'FRML_TP', format: 'V', nullable: false , defval: ''} );

			break;
		case 'CHART_SCALE': // SMZ6212
			gridId = 'gridChartScale';
			if ( caption_flag ) {
				sCaption = 'Tag Function Information';
				sItemCd  = 'CAP_TAG_FUNC_INFO';
			};
			
			objGrpItems = 	[
							{caption: 'Tag 순서'		, name: 'ORD_GRP', 		align: 'center', itemCd: 'CAP_ORD'},
							{caption: 'Scale'		, name: 'SCALE_GRP', 	align: 'center', itemCd: 'CAP_SCALE'},
							{caption: '초기값'		, name: 'SCALE_GRP1', 	align: 'center', itemCd: 'CAP_SCALE', parent: "SCALE_GRP"},
							{caption: '변경'			, name: 'SCALE_GRP2', 	align: 'center', itemCd: 'CAP_SCALE', parent: "SCALE_GRP"},
							{caption: 'Line Style'	, name: 'LINE_GRP', 	align: 'center', itemCd: 'CAP_LINE'},
							{caption: '두께'			, name: 'LINE_GRP1', 	align: 'center', itemCd: 'CAP_LINE', parent: "LINE_GRP"},
							{caption: '유형'			, name: 'LINE_GRP2', 	align: 'center', itemCd: 'CAP_LINE', parent: "LINE_GRP"},
							{caption: '색상'			, name: 'LINE_GRP3', 	align: 'center', itemCd: 'CAP_LINE', parent: "LINE_GRP"},
							];
			objItems = 	[
						{caption: 'Tag Code'    , name: 'TAG_CODE', 	width: 100, datatype: 'text', readonly:true,hidden:true},
						{caption: 'Tag Name'    , name: 'TAG_NAME', 	width: 'auto', datatype: 'text', readonly:true},
						{caption: '현재'   		, name: 'ORD_NO_BEF', 	width: 80, datatype: 'number'		, group: 'ORD_GRP', readonly:true},
						{caption: '변경'    		, name: 'ORD_NO_AFT', 	width: 80, datatype: 'number'		, group: 'ORD_GRP'},
						{caption: '최소'	    	, name: 'Y_MIN_BEF', 	width: 80, datatype: 'number'		, group: 'SCALE_GRP1', readonly:true},
						{caption: '최대'   		, name: 'Y_MAX_BEF', 	width: 80, datatype: 'number'		, group: 'SCALE_GRP1', readonly:true},
						{caption: '최소'    		, name: 'Y_MIN_AFT', 	width: 80, datatype: 'number'		, group: 'SCALE_GRP2'},
						{caption: '최대'    		, name: 'Y_MAX_AFT', 	width: 80, datatype: 'number'		, group: 'SCALE_GRP2'},
						{caption: '현재'    		, name: 'LINE_T_BEF', 	width: 80, datatype: 'number'		, group: 'LINE_GRP1', align:'center', readonly:true},
						{caption: '변경'    		, name: 'LINE_T_AFT', 	width: 80, datatype: 'lov'			, group: 'LINE_GRP1', align:'center'},
						{caption: '현재'    		, name: 'LINE_G_BEF', 	width: 80, datatype: 'text'			, group: 'LINE_GRP2', align:'center', readonly:true},
						{caption: '변경'    		, name: 'LINE_G_AFT', 	width: 80, datatype: 'lov'			, group: 'LINE_GRP2', align:'center'},
						{caption: '현재'    		, name: 'LINE_C_BEF', 	width: 80, datatype: 'text'			, group: 'LINE_GRP3', align:'center', readonly:true},
						{caption: '변경'    		, name: 'LINE_C_AFT', 	width: 80, datatype: 'custpopup'	, group: 'LINE_GRP3', align:'center'},
						{caption: '변경'    		, name: 'TAG_TP', 		width: 0 , datatype: 'text', 		hidden:true}
						];
			
			fc_addDataInGettedLov ( 'CHART_LINE_WIDTH', {code: 'CHART_LINE_WIDTH', tags: '', alias: ''} );
			fc_addDataInSettingLov( {object: gridId+'.LINE_T_AFT', code: 'CHART_LINE_WIDTH', format: 'V', nullable: true , defval: ''} );
			
			fc_addDataInGettedLov ( 'CHART_LINE_STYLE', {code: 'CHART_LINE_STYLE', tags: '', alias: ''} );
			fc_addDataInSettingLov( {object: gridId+'.LINE_G_AFT', code: 'CHART_LINE_STYLE', format: 'V', nullable: true , defval: ''} );
			
			break;

		case 'TAG_USER_FORMUAL': // SMZ6213
			gridId = 'gridUserFormual';
			if ( caption_flag ) {
				sCaption = 'User Formual Information';
				sItemCd  = 'CAP_USER_FORMUAL_INFO';
			};
			
			objItems = 	[
						{caption: 'TagID'     	 , name: 'USER_TAG_ID', 			width: 200		, datatype: 'text', hidden:true},
						{caption: 'Tag 명'     	 , name: 'USER_TAG_NAME', 			width: 200		, datatype: 'text'},
						{caption: '계산식'     	 , name: 'USER_TAG_FORMUAL', 		width: 'auto'	, datatype: 'text'},
						{caption: '차트적용'     	 , name: 'USER_TAG_CHK', 			width: 100		, datatype: 'text', align:'center', hidden:true},
						];
			fc_setRequiredInCol( gridId, [ 'USER_TAG_NAME','USER_TAG_FORMUAL' ] );
			
			break;
		case 'TAG_MST': // SMZ6214
			gridId = 'gridTagMst';
			if ( caption_flag ) {
				sCaption = 'Tag Master Information';
				sItemCd  = 'CAP_TAG_MST';
			};
			objItems = 	[
						{caption: 'Tag Code'     	 , name: 'TAG_CODE', 		width: 80, datatype: 'text', readonly:true},
						{caption: 'Tag Name'     	 , name: 'TAG_NAME', 		width: 300, datatype: 'text', readonly:true}
						];
			break;
		case 'TAG_MST_MEMO': // SMZ6214
			gridId = 'gridTagMstMemo';
			if ( caption_flag ) {
				sCaption = 'Tag Master Memo Information';
				sItemCd  = 'CAP_TAG_MST_MEMO';
			};
			objItems = 	[
			           	{caption: 'Tag ID'   , name: 'TAG_ID', 	 width: 100, datatype: 'text', hidden: true},
						{caption: '메모일시'   , name: 'MEMO_DTM',  width: 170, datatype: 'datetime'},
						{caption: '내용'     	 , name: 'MEMO_TEXT', width: 'auto', datatype: 'text'},
						{caption: '입력자'    , name: 'CRT_USER_ID', width: 80, readonly:true, datatype: 'text'},
						{caption: '입력일시'   , name: 'CRT_TM',    width: 130, readonly:true, datatype: 'text'}
						];
			break;
		case 'CHAIN_TAG_MST': // SMZ7050
			gridId = 'gridChainTagMst';
			if ( caption_flag ) {
				sCaption = 'Chain Tag Master Information';
				sItemCd  = 'CAP_CHAIN_TAG_MST';
			};
			
			objItems = 	[
						{caption: '업무구분'   	, name: 'BIZ_CHAIN_CD', width: 120  	, datatype: 'lov'		 	, align:'center'    },
						{caption: 'Tag ID'      , name: 'TAG_ID'      , width: 200  	, datatype: 'custpopup' 	, inputreadonly: true  },
						{caption: 'Tag 명'       , name: 'TAG_NM'      , width: 300  	, datatype: 'text'      	, readonly: true   },
						{caption: '속성1'      	, name: 'ATTR1'       , width: 100		, datatype: 'text'		 	, align:'left'},
						{caption: '속성2'      	, name: 'ATTR2'       , width: 100		, datatype: 'text'		 	, align:'left'},
						{caption: '속성3'      	, name: 'ATTR3'       , width: 100		, datatype: 'text'		 	, align:'left'},
						{caption: '속성4'      	, name: 'ATTR4'       , width: 100		, datatype: 'text'		 	, align:'left'},
						{caption: '속성5'      	, name: 'ATTR5'       , width: 100		, datatype: 'text'		 	, align:'left'},
						{caption: '속성6'      	, name: 'ATTR6'       , width: 100		, datatype: 'text'		 	, align:'left'},
						{caption: '속성7'      	, name: 'ATTR7'       , width: 100		, datatype: 'text'		 	, align:'left'},
						{caption: '비고'      	, name: 'REMARK'      , width: 'auto'	, datatype: 'text'		 	, align:'left'}
						];
			
			fc_setRequiredInCol( gridId, [ 'BIZ_CHAIN_CD','TAG_ID' ] );
			
			fc_addDataInGettedLov ( 'BIZ_CHAIN_CD', {code: 'BIZ_CHAIN_CD', tags: '', alias: '',  condition: {'ATTR1': 'Y'}} );
			fc_addDataInSettingLov( {object: gridId+'.BIZ_CHAIN_CD', code: 'BIZ_CHAIN_CD', format: 'V', nullable: false , defval: ''} );
			
			break;
		case 'TAG_MST_MACRO': // SMZ7060
			gridId = 'gridTagMstMacro';
			if ( caption_flag ) {
				sCaption = 'Tag Master Macro Information';
				sItemCd  = 'CAP_TAG_MST_MACRO';
			};
			
			objItems = 	[
						{caption: '업무구분'   	, name: 'BIZ_CHAIN_CD'			, width: 120   	, datatype: 'lov'		, align:'center'    	},
						{caption: 'Tag 유형'     , name: 'TAG_TY'      			, width: 80   	, datatype: 'lov' ,align:'center' },
						{caption: 'Tag ID'      , name: 'TAG_ID'      			, width: 150   	, datatype: 'custpopup'  , inputreadonly: true 	},
						{caption: 'Tag 명'       , name: 'TAG_NM'      			, width: 300   	, datatype: 'text'     	, readonly: true   		},
						{caption: '집계주기'   	, name: 'MACRO_TAG_INTVAL_TY'	, width: 100   	, datatype: 'lov' 		, align:'center'    	},
						{caption: '집계시작' 	    , name: 'RUN_YN'      			, width: 80   	, datatype: 'checkbox'  	},
						{caption: '속성1'      	, name: 'ATTR1'       			, width: 100	, datatype: 'text'		, align:'left'			},
						{caption: '속성2'      	, name: 'ATTR2'       			, width: 100	, datatype: 'text'		, align:'left'			},
						{caption: '속성3'      	, name: 'ATTR3'       			, width: 100	, datatype: 'text'		, align:'left'			},
						{caption: '속성4'      	, name: 'ATTR4'       			, width: 100	, datatype: 'text'		, align:'left'			},
						{caption: '속성5'      	, name: 'ATTR5'       			, width: 100	, datatype: 'text'		, align:'left'			},
						{caption: '비고'      	, name: 'REMARK'      			, width: 'auto'	, datatype: 'text'		, align:'left'			}
						];
			
			fc_setRequiredInCol( gridId, [ 'TAG_ID','MACRO_TAG_INTVAL_TY','BIZ_CHAIN_CD' ] );
			
			fc_addDataInGettedLov ( 'TAG_TP2', {code: 'TAG_TP2', tags: '', alias: ''} );
			fc_addDataInSettingLov( {object: gridId+'.TAG_TY', code: 'TAG_TP2', format: 'V', nullable: false , defval: ''} );
			
			fc_addDataInGettedLov ( 'MACRO_TAG_INTVAL_TY', {code: 'MACRO_TAG_INTVAL_TY', tags: '', alias: ''} );
			fc_addDataInSettingLov( {object: gridId+'.MACRO_TAG_INTVAL_TY', code: 'MACRO_TAG_INTVAL_TY', format: 'V', nullable: false , defval: ''} );
			
			fc_addDataInGettedLov ( 'BIZ_CHAIN_CD', {code: 'BIZ_CHAIN_CD', tags: '', alias: '',  condition: {'ATTR1': 'Y'}} );
			fc_addDataInSettingLov( {object: gridId+'.BIZ_CHAIN_CD', code: 'BIZ_CHAIN_CD', format: 'V', nullable: false , defval: ''} );
			
			break;	
		case 'TAG_MST_EVENT': // SMZ7070
			gridId = 'gridTagMstEvent';
			if ( caption_flag ) {
				sCaption = 'Tag Master Event Information';
				sItemCd  = 'CAP_TAG_MST_EVENT';
			};
			
			objGrpItems = 	[
							{caption: 'Tag Information',	name: 'TAG_GRP'		, 	align: 'center'},
							{caption: '이벤트구분',			name: 'EVENT_GRP'	, 	align: 'center'},
							{caption: '이벤트상세조건',			name: 'EVENT_DETAIL', 	align: 'center'}
							];
			
			objItems = 	[
						{caption: 'Tag ID'      , name: 'TAG_ID'      			, width: 150   , datatype: 'custpopup' 	, group: 'TAG_GRP'		, inputreadonly: true  	},
						{caption: 'Tag 명'       , name: 'TAG_NM'      			, width: 200   , datatype: 'text'     	, group: 'TAG_GRP'		, readonly: true   		},
						{caption: '순번'       	, name: 'EVENT_SEQ'      		, width: 50    , datatype: 'number'     , group: 'TAG_GRP'		, align:'center', 	readonly: true},
						{caption: '알람유형'      	, name: 'EVENT_TY'      		, width: 110   , datatype: 'lov'     	, group: 'EVENT_GRP'	, align:'center'   		},
						{caption: '알람ID'      	, name: 'ALARM_ID'      		, width: 100   , datatype: 'text'     	, group: 'EVENT_GRP'	, align:'left'   		},
						{caption: '링크프로그램'  	, name: 'LINK_PGM'      		, width: 300   , datatype: 'text'     	, group: 'EVENT_GRP'	, align:'left'   		},
						{caption: '판단기준'  		, name: 'COND_STD'      		, width: 120   , datatype: 'lov'     	, group: 'EVENT_DETAIL'	, align:'center'   		},
						{caption: '기준값'      	, name: 'STD_VAL'      			, width: 80    , datatype: 'number2'    , group: 'EVENT_DETAIL'},
						{caption: '하한값'      	, name: 'LCL_VAL'      			, width: 80    , datatype: 'number2'    , group: 'EVENT_DETAIL'},
						{caption: '상한값'      	, name: 'UCL_VAL'      			, width: 80    , datatype: 'number2'    , group: 'EVENT_DETAIL'},
						{caption: '지속시간(초)'  	, name: 'MAINT_TIME'      		, width: 100    , datatype: 'number'     , group: 'EVENT_DETAIL'},
						{caption: '조건해제 수신유무', name: 'EVENT_END_YN'     		, width: 120   , datatype: 'lov'     	, group: 'EVENT_DETAIL'	, align:'center'   		},
						{caption: '비고'    		, name: 'EVENT_DESC'      		, width: 'auto', datatype: 'text'		, group: 'EVENT_DETAIL' , align:'left'			}
						];
			
			fc_setRequiredInCol( gridId, [ 'TAG_ID','EVENT_TY','COND_STD'] );
			
			fc_addDataInGettedLov ( 'DEFAULT_YN', {code: 'DEFAULT_YN', tags: '', alias: ''} );
			fc_addDataInSettingLov( {object: gridId+'.EVENT_END_YN', code: 'DEFAULT_YN', format: 'V', nullable: false , defval: ''} );
			
			fc_addDataInGettedLov ( 'EVENT_RECV_TY', {code: 'EVENT_RECV_TY', tags: '', alias: ''} );
			fc_addDataInSettingLov( {object: gridId+'.EVENT_TY', code: 'EVENT_RECV_TY', format: 'V', nullable: false , defval: ''} );
						
			//fc_addDataInGettedLov ( 'EVENT_COND_STD', {code: 'EVENT_COND_STD', tags: '', alias: '',  condition: {'ATTR1': 'Y'}} );
			fc_addDataInGettedLov ( 'EVENT_COND_STD', {code: 'EVENT_COND_STD', tags: '', alias: ''} );
			fc_addDataInSettingLov( {object: gridId+'.COND_STD', code: 'EVENT_COND_STD', format: 'V', nullable: false , defval: ''} );
			
			break;	
		case 'PAGE_TAG_MST': // SMZ7080
			gridId = 'gridPageTagMst';
			if ( caption_flag ) {
				sCaption = 'Page Tag Master Information';
				sItemCd  = 'CAP_PAGE_TAG_MST';
			};
			
			objItems = 	[
						{caption: '화면명'   		, name: 'PAGE_ID', 		width: 200  	, datatype: 'text'		 	, align:'center'    },
						{caption: 'Tag ID'      , name: 'TAG_ID'      , width: 300  	, datatype: 'text' 			, align:'left'      },
						{caption: 'Tag 구분'     , name: 'ATTR1'       , width: 100  		, datatype: 'lov' 			, align:'center'    },
						{caption: 'Tag 명'       , name: 'REMARK'      , width: 'auto'  	, datatype: 'text'      	, align:'left'		},
						];
			
			fc_setRequiredInCol( gridId, [ 'PAGE_ID','TAG_ID', 'ATTR1' ] );
			
			fc_addDataInGettedLov ( 'TAG_TP2', {code: 'TAG_TP2', tags: '', alias: ''} );
			fc_addDataInSettingLov( {object: gridId+'.ATTR1', code: 'TAG_TP2', format: 'V', nullable: false , defval: ''} );
			
			break;	
		case 'TAG_CHART_DATA' : // SMZ6012
			gridId = 'gridChartData';
			if ( caption_flag ) {
				sCaption = 'Tag Data';
				sItemCd  = 'CAP_TAG_CHART_DATA';
			};
			objItems = 	[
						{caption: '측정시각' , name: 'T_F1'    , width: 150, datatype: 'datetime' 	, align: 'center' 	, isMultiLanguage: false, cellsformat: 'yyyy-MM-dd HH:mm:ss'},
						{caption: 'TAG1'   , name: 'V0'      , width: 100, datatype: 'number3' 	, align: 'right' 	, isMultiLanguage: false},
						{caption: 'TAG2'   , name: 'V1'      , width: 100, datatype: 'number3' 	, align: 'right' 	, isMultiLanguage: false},
						{caption: 'TAG3'   , name: 'V2'      , width: 100, datatype: 'number3' 	, align: 'right' 	, isMultiLanguage: false},
						{caption: 'TAG4'   , name: 'V3'      , width: 100, datatype: 'number3' 	, align: 'right' 	, isMultiLanguage: false},
						{caption: 'TAG5'   , name: 'V4'      , width: 100, datatype: 'number3' 	, align: 'right' 	, isMultiLanguage: false},
						];
			break;
		case 'FAVORITE_MASTER' : // SMZ6216
			gridId = 'gridChartMaster';
			if ( caption_flag ) {
				sCaption = 'BookMark Master';
				sItemCd  = 'CAP_BOOKMARK_MASTER';
			};
			
			objItems = 	[
						{caption: '그룹ID' 	 	, name: 'FAV_MASTER_CD'  	, width: 0		, datatype: 'text' 	, hidden:true},
						{caption: 'USERID' 	 	, name: 'USER_ID'  			, width: 0		, datatype: 'text' 	, hidden:true},
						{caption: '그룹명' 	 	, name: 'FAV_MASTER_NM'    	, width: 'auto'	, datatype: 'text' 	, align: 'left'},
						{caption: '공유구분'   	, name: 'FAV_TY'   			, width: 70		, datatype: 'lov' 	, align: 'center'},
						{caption: '기간설정'		, name: 'DATE_INTERVAL'   	, width: 70 	, datatype: 'lov'	, align: 'center'},
						{caption: 'Data주기' 		, name: 'DATA_INTERVAL'   	, width: 70 	, datatype: 'lov'	, align: 'center'},
						{caption: 'Aggregates'	, name: 'TAG_AGGR_TY'	 	, width: 80 	, datatype: 'lov'	, align: 'center'},
						{caption: 'Y축타입'		, name: 'MLT_SEARCH_TYPE' 	, width: 70		, datatype: 'lov'	, align: 'center'},
						];
			
			fc_setRequiredInCol( gridId, [ 'FAV_MASTER_NM','FAV_TY', 'DATE_INTERVAL', 'DATA_INTERVAL', 'TAG_AGGR_TY', 'MLT_SEARCH_TYPE' ] );
			
			fc_addDataInGettedLov ( 'USER_TAG_TP', {code: 'USER_TAG_TP', tags: '', alias: ''} );
			fc_addDataInSettingLov( {object: gridId+'.FAV_TY', code: 'USER_TAG_TP', format: 'V', nullable: false , defval: 'P'} );
			
			fc_addDataInGettedLov ( 'DATA_INTERVAL', {code: 'DATA_INTERVAL', tags: '', alias: ''} );
			fc_addDataInSettingLov( {object: gridId+'.DATA_INTERVAL', code: 'DATA_INTERVAL', format: 'V', nullable: false, defval: '60', listcount:4});

			fc_addDataInGettedLov ( 'DATA_INTERVAL5', {code: 'DATA_INTERVAL5', tags: '', alias: ''} );
			fc_addDataInSettingLov( {object: gridId+'.DATE_INTERVAL', code: 'DATA_INTERVAL5', format: 'V', nullable: false, defval: '', listcount:6});

			fc_addDataInGettedLov ( 'TAG_AGGR_TY', {code: 'TAG_AGGR_TY', tags: '', alias: ''} );
			fc_addDataInSettingLov( {object: gridId+'.TAG_AGGR_TY', code: 'TAG_AGGR_TY', format: 'V', nullable: false, defval: 'SNP'});

			fc_addDataInGettedLov ( 'CHART_YAXIS_TYPE', {code: 'CHART_YAXIS_TYPE', tags: '', alias: ''} );
			fc_addDataInSettingLov( {object: gridId+'.MLT_SEARCH_TYPE', code: 'CHART_YAXIS_TYPE', format: 'V', nullable: false, defval: 'Y1'});		
			break;
		case 'FAVORITE_DETAIL' : // SMZ6216
			gridId = 'gridChartdetail';
			if ( caption_flag ) {
				sCaption = 'BookMark Detail';
				sItemCd  = 'CAP_BOOKMARKDETAIL';
			};
			
			objGrpItems = 	[
							{caption: 'Tag 정보'		, name: 'TAG_GRP'	, 	align: 'center'},
							{caption: 'Scale'		, name: 'SCALE_GRP'	, 	align: 'center'},
							{caption: 'Line Style'	, name: 'LINE_GRP'	, 	align: 'center'},
							];
			
			objItems = 	[
						{caption: '그룹ID' 	 , name: 'FAV_MASTER_CD'	, width: 100	, datatype: 'text' 		, hidden:true},
						{caption: '구분' 	 	 , name: 'TAG_TP'      		, width: 50		, datatype: 'lov' 		, group : 'TAG_GRP',	align:'center'},
						{caption: 'TAG ID' 	 , name: 'TAG_ID'      		, width: 100	, datatype: 'text' 		, group : 'TAG_GRP'},
						{caption: 'TAG ID_ORG', name: 'TAG_ID_ORG'      , width: 100	, datatype: 'text' 		, group : 'TAG_GRP', hidden:true},
						{caption: 'TAG 명' 	 , name: 'TAG_NM'      		, width: 200  	, datatype: 'text' 		, group : 'TAG_GRP'},
						{caption: '순서'  	 , name: 'TAG_ORDER'   		, width: 50		, datatype: 'text' 		, group : 'TAG_GRP',	align:'center'},
						{caption: '최소'   	 , name: 'SCALE_MIN'   		, width: 60		, datatype: 'text' 		, group : 'SCALE_GRP',	align:'right'},
						{caption: '최대'   	 , name: 'SCALE_MAX'   		, width: 60		, datatype: 'text' 		, group : 'SCALE_GRP',	align:'right'},
						{caption: '두께'   	 , name: 'LINE_THICK'  		, width: 60		, datatype: 'lov' 		, group : 'LINE_GRP',	align:'center'},
						{caption: '유형'   	 , name: 'LINE_STYLE'  		, width: 90		, datatype: 'lov' 		, group : 'LINE_GRP',	align:'center'},
						{caption: '색상'   	 , name: 'LINE_COLOR'  		, width: 70		, datatype: 'custpop' 	, group : 'LINE_GRP',	align:'center'},
						{caption: '계산식'   	 , name: 'TAG_FORMUAL' 		, width: 'auto'	, datatype: 'text' 	},
						];
			
			fc_setRequiredInCol( gridId, [ 'TAG_TP','TAG_ID', 'TAG_NM', 'TAG_ORDER', 'LINE_THICK', 'LINE_STYLE', 'LINE_COLOR' ] );
			
			fc_addDataInGettedLov ( 'TAG_TP3', {code: 'TAG_TP3', tags: '', alias: ''} );
			fc_addDataInSettingLov( {object: gridId+'.TAG_TP', code: 'TAG_TP3', format: 'V', nullable: false , defval: ''} );
			
			fc_addDataInGettedLov ( 'CHART_LINE_WIDTH', {code: 'CHART_LINE_WIDTH', tags: '', alias: ''} );
			fc_addDataInSettingLov( {object: gridId+'.LINE_THICK', code: 'CHART_LINE_WIDTH', format: 'V', nullable: false , defval: ''} );
			
			fc_addDataInGettedLov ( 'CHART_LINE_STYLE', {code: 'CHART_LINE_STYLE', tags: '', alias: ''} );
			fc_addDataInSettingLov( {object: gridId+'.LINE_STYLE', code: 'CHART_LINE_STYLE', format: 'V', nullable: false , defval: ''} );
			break;
		case 'TAG_ABNORMAL_MASTER' : // SMZ7090
			gridId = 'gridTagAbnormalMaster';
			if ( caption_flag ) {
				sCaption = 'gridTagAbnormalMaster';
				sItemCd  = 'CAP_TAG_ABNORMAL_MASTER';
			};
			objItems = 	[
						{caption: '공장' 	 	, name: 'FAC_CD'     , width: 120, datatype: 'text' , align: 'center'},
						{caption: '공정' 	 	, name: 'PROC_CD'    , width: 120, datatype: 'text' , align: 'center'},
						{caption: '설비'   	, name: 'ASSET_CD'   , width: 200, datatype: 'text' , align: 'left'},
						{caption: '발생날짜'  , name: 'EVENT_DT'   , width: 120, datatype: 'text' , align: 'center'},
						{caption: 'TAG ID'  , name: 'TAG_ID'     , width: 120, datatype: 'text' , align: 'center'},
						{caption: 'TAG 명'  , name: 'TAG_NM'     , width: 300, datatype: 'text' , align: 'left'},
						{caption: 'UCL 합계' , name: 'UCL_CNT'    , width: 100, datatype: 'number'},
						{caption: 'LCL 합계' , name: 'LCL_CNT'    , width: 100, datatype: 'number'},
						];
			
			break;
		case 'TAG_ABNORMAL_DETAIL' : // SMZ7090
			gridId = 'gridTagAbnormalDetail';
			if ( caption_flag ) {
				sCaption = 'gridTagAbnormalDetail';
				sItemCd  = 'CAP_TAG_ABNORMAL_DETAIL';
			};
						
			objItems = 	[
//						{caption: '공장' 	 	, name: 'FAC_CD'     , width: 150, datatype: 'text' , align: 'center'},
//						{caption: '공정' 	 	, name: 'PROC_CD'    , width: 150, datatype: 'text' , align: 'center'},
//						{caption: '설비'   	, name: 'ASSET_CD'   , width: 200, datatype: 'text' , align: 'left'},
						{caption: '발생시간'  , name: 'EVENT_TIME' , width: 100, datatype: 'text' , align: 'center'},
//						{caption: 'TAG ID'  , name: 'TAG_ID'     , width: 150, datatype: 'text' , align: 'center'},
//						{caption: 'TAG 명'  , name: 'TAG_NM'     , width: 300, datatype: 'text' , align: 'left'},
						{caption: 'UCL 합계' , name: 'UCL_CNT'    , width: 100, datatype: 'number'},
						{caption: 'LCL 합계' , name: 'LCL_CNT'    , width: 100, datatype: 'number'},
						{caption: 'DATA변경없음 여부' , name: 'NOT_CHANGE' , width: 150, datatype: 'text', align: 'center'},
						{caption: 'Data 없음 Count(초)' , name: 'NO_DATA'    , width: 150, datatype: 'number'},
						
						];
			
			break;
			
		case 'TAG_MACRO' : // SMZ7091
			gridId = 'gridTagMacro';
			if ( caption_flag ) {
				sCaption = 'gridTagMacro2';
				sItemCd  = 'CAP_TAG_MACRO2';
			};
			
			objGrpItems = 	[  {caption: 'MES I/F수신 정보'  , name: 'GRP_MACRO' ,align: 'center'}
							];
							
			objItems = 	[
						{caption: '발생시간' , name: 'EVENT_DTM_STD' , width: 200 , datatype: 'text' , align: 'center'},
						{caption: 'TAG ID' , name: 'TAG_ID'        , width: 150 , group : 'GRP_MACRO' , datatype: 'text'  , align: 'center'},
						{caption: '발생시간' , name: 'EVENT_DTM'     , width: 200 , group : 'GRP_MACRO' , datatype: 'text'  , align: 'center'},
						{caption: '집계유형' , name: 'TAG_INTVAL_TP' , width: 70  , group : 'GRP_MACRO' , datatype: 'text'  , align: 'center'},
						{caption: '평균값'  , name: 'VALUE_AVG'     , width: 150 , group : 'GRP_MACRO' , datatype: 'number5', align: 'right'},
						{caption: '합계값'  , name: 'VALUE_SUM'     , width: 150 , group : 'GRP_MACRO' , datatype: 'number5', align: 'right'},
						{caption: '상한값'  , name: 'VALUE_MIN'     , width: 150 , group : 'GRP_MACRO' , datatype: 'number5', align: 'right'},
						{caption: '하한값'  , name: 'VALUE_MAX'     , width: 150 , group : 'GRP_MACRO' , datatype: 'number5', align: 'right'}
						];
			
			break;
			
		case 'JOB_SCH' : // SMZ7092
			gridId = 'gridJobSch';
			if ( caption_flag ) {
				sCaption = 'Job 스케줄 목록';
				sItemCd  = 'CAP_TAG_MACRO2';
			};
			
			objItems = 	[
						{caption: 'Job Id'		, name: 'JOB_ID' 		, width: 70 	, datatype: 'text' 	, align: 'center', hidden:true},
						{caption: '구분'			, name: 'WB_BIZ' 		, width: 70 	, datatype: 'text' 	, align: 'center'},
						{caption: 'Job Name' 	, name: 'JOB_NM'        , width: 150 	, datatype: 'text'  , align: 'center'},
						{caption: '등록일'		, name: 'UPDATE_TIME'	, width: 180 	, datatype: 'datetime'  , align: 'center'},
						{caption: '실행주기(Cron)'	, name: 'SCHE_CRON'		, width: 200	, datatype: 'text'  , align: 'center'},
						{caption: 'Status'  	, name: 'USE_YN'   		, width: 100 	, datatype: 'text'	, align: 'center'},
						{caption: 'Action'		, name: 'JOB_SETUP'     , width: 55 	, datatype: 'button', align: 'center'},
						];
			
			break;
			
		case 'JOB_SCH_DETAIL' : // SMZ7092
			gridId = 'gridJobSchDetail';
			if ( caption_flag ) {
				sCaption = 'Job 스케줄 실행 이력';
				sItemCd  = 'CAP_TAG_MACRO2';
			};
			
			objItems = 	[
						{caption: 'Job Log Seq'		, name: 'JOB_LOG_SEQ' 	, width: 70	, datatype: 'text' 	, align: 'center', hidden:true},
						{caption: 'Job Id'			, name: 'JOB_ID' 	, width: 70		, datatype: 'text' 	, align: 'center', hidden:true},
						{caption: 'Job Name' 		, name: 'JOB_NM'	, width: 200 	, datatype: 'text' , align: 'center'},
						{caption: 'Job Start Time' 	, name: 'START_TIME', width: 180 	, datatype: 'datetime'  , align: 'center'},
						{caption: 'Job End Time' 	, name: 'END_TIME'	, width: 180 	, datatype: 'datetime'  , align: 'center'},
						{caption: 'Status' 			, name: 'STATUS'	, width: 80  	, datatype: 'lov'  , align: 'center', cellclassname: f_setColorSmz7092},
						{caption: '실행구분'			, name: 'EXEC_TP'	, width: 80 	, datatype: 'lov'	, align: 'center'},
						{caption: 'Action'			, name: 'ACTION'	, width: 150 	, datatype: 'button', align: 'center'},
						];
			fc_addDataInGettedLov ( 'VT_STATUS', {code: 'VT_STATUS', tags: '', alias: ''} );
			fc_addDataInSettingLov( {object: gridId+'.STATUS', code: 'VT_STATUS', format: 'V', nullable: false , defval: ''} );
			fc_addDataInGettedLov ( 'VT_EXEC_TP', {code: 'VT_EXEC_TP', tags: '', alias: ''} );
			fc_addDataInSettingLov( {object: gridId+'.EXEC_TP', code: 'VT_EXEC_TP', format: 'V', nullable: false , defval: ''} );
			break;		
		case 'SCHE_CRON' : // SMZ7093
			gridId = 'gridItem';
			if ( caption_flag ) {
				sCaption = 'Job 스케줄 실행 이력';
				sItemCd  = 'CAP_TAG_MACRO2';
			};
			
			objItems = 	[
						{caption: 'Job Id'	, name: 'JOB_ID' 	, width: 70 , datatype: 'text' 	, align: 'center'},
						{caption: '상태'		, name: 'USE_YN' 	, width: 70	, datatype: 'text' 	, align: 'center'},
						{caption: '주기설정'	, name: 'SCHE_CRON' , width: 70	, datatype: 'text' 	, align: 'center'},
						//{caption: '주기설정'	, name: 'CREATION_TIME' , width: 70	, datatype: 'datetime' 	, align: 'center'},
						//{caption: '주기설정'	, name: 'UPDATE_TIME' , width: 70	, datatype: 'datetime' 	, align: 'center'},
						];
			break;
			
		case 'G_SMZ7096' : // SMZ7096
			gridId = 'gridMain';
			if ( caption_flag ) {
				sCaption = '공정 이상치 조회';
				sItemCd  = 'CAP_PROC_OUT';
			};
			
			objItems =
				[
				{caption: 'Tag-ID',		name: 'TAG_ID',			width: '10%',	datatype: 'text', align: 'center'},
				{caption: 'Tag 명',		name: 'TAG_NM',			width: '25%',	datatype: 'text', align: 'left'},
				{caption: '실측시간',		name: 'TIME_VAL',		width: '10%',	datatype: 'datetime', align: 'center'},
				{caption: '실측값',		name: 'ACT_VAL',		width: '8%',	datatype: 'number', align: 'right'},
				{caption: '기준 표기값',	name: 'STD_TEXT',		width: '10%',	datatype: 'text', align: 'center'},
				{caption: '기준 하한값',	name: 'MGMT_LL_VAL',	width: '8%',	datatype: 'number', align: 'right'},
				{caption: '기준 상한값',	name: 'MGMT_UL_VAL',	width: '8%',	datatype: 'number', align: 'right'},
				{caption: '기준 이탈 조치',	name: 'TREAT_TEXT',		width: 'auto',	datatype: 'text', align: 'left'},
				
				{caption: '',			name: 'TAG_TP',		width: 100,		datatype: 'text',	hidden:true},
				{caption: '',			name: 'TREAT_TEXT_MIN',	width: 100,		datatype: 'text',	hidden:true},
				{caption: '',			name: 'TREAT_TEXT_MAX',	width: 100,		datatype: 'text',	hidden:true}
				];
			break;

		case 'G_SMZ7097' : // SMZ7097
			gridId = 'gridMain';
			if ( caption_flag ) {
				sCaption = 'Tag Status 이상 조회';
				sItemCd  = 'CAP_PROC_OUT';
			};
			
			objItems =
				[
				{caption: 'Tag ID',		name: 'TAG_ID',				width: '12%',	datatype: 'text', align: 'center'},
				{caption: 'Tag 명',		name: 'TAG_NM',				width: '26%',	datatype: 'text', align: 'left'},
				{caption: '대표 화면',		name: 'PAGE_ID',			width: '8%',	datatype: 'text', align: 'center'},
				{caption: '사용여부',		name: 'USE_YN',				width: '6%',	datatype: 'text', align: 'center'},
				{caption: 'TIMESTAMP',	name: 'COLLECT_TIME',		width: '12%',	datatype: 'text', align: 'center'},
				{caption: 'VALUE',		name: 'VALUE',				width: '10%',	datatype: 'text', align: 'center'},
				{caption: 'QUALITY',	name: 'QUALITY',			width: '10%',	datatype: 'text', align: 'center'},
				{caption: 'QUALITY Desc.',	name: 'QUALITY_DESC',	width: '10%',	datatype: 'text', align: 'center'},
				];
			break;

		case 'G_SMZ7097_SUB' : // SMZ7097
			gridId = 'gridSub';
			if ( caption_flag ) {
				sCaption = 'Tag Status 이상 조회 History';
				sItemCd  = 'CAP_PROC_OUT';
			};
			
			objItems =
				[
				{caption: 'Tag ID',		name: 'TAG_ID',			width: '19%',	datatype: 'text', align: 'center'},
				{caption: 'TIMESTAMP',	name: 'COLLECT_TIME',	width: '19%',	datatype: 'text', align: 'center'},
				{caption: 'VALUE',		name: 'VALUE',			width: '18%',	datatype: 'text', align: 'center'},
				{caption: 'QUALITY',	name: 'QUALITY',		width: '18%',	datatype: 'text', align: 'center'},
				{caption: 'QUALITY Desc.',	name: 'QUALITY_DESC',		width: '18%',	datatype: 'text', align: 'center'},
				];
			break;
			
		case 'G_SMZ6012P1': // SMZ6012P1
			gridId = 'grid_G_SMZ6012P1';
			objItems = 	[
						{caption: 'Tag Name'     	 , name: 'TAG_NAME', 		width: 'auto', datatype: 'text'},
						
						{caption: ''     	 		 , name: 'TAG_CODE', 		width: 0, datatype: 'text', hidden:true},
						{caption: ''     	 		 , name: 'COL_TAG', 		width: 0, datatype: 'text', hidden:true}
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
	var returnObj = {title: '', manSearch: '', optTitle: '', optSearch: '', optResult: '', optCondition:new Object() };
	var sManSearch = '', sOptResult = '', sOptTitle = '', sOptSearch = '', sTitle = '';

	switch( objData.code ) {
		
		case 'EMAIL_LIST' :
			sManSearch = '';
			sOptTitle  = fc_getMultiItem( 'USER_ID' ) + "," + fc_getMultiItem( 'EMP_NM' );
			sOptSearch = fc_getInputVal ( 'USER_ID' ) + "," + fc_getInputVal ( 'EMP_NM' );
			sOptResult = fc_getMultiItem( 'USER_ID' ) + "," + fc_getMultiItem( 'EMP_NM' );
	    break;
	    
		case 'MZ_HMI_SCREEN_LIST' :
			sManSearch = objData.cdParam;
			sTitle = '';
			sOptTitle = '화면ID,화면명';
			sOptResult = '화면ID,화면명';
			sOptSearch = '';
		break;
		
		default:
			sTitle     = fc_getMultiItem(objData.manKey);
		    sOptTitle  = fc_getMultiItem( 'CAP_CODE' ) + ',' + fc_getMultiItem( 'CAP_NM' );
		    sOptResult = fc_getMultiItem( 'CAP_CODE' ) + ',' + fc_getMultiItem( 'CAP_NM' );
		    sOptSearch = '';
		break;
	};
	
    returnObj['title'] = sTitle;
	returnObj['manSearch'] = sManSearch;
	returnObj['optTitle'] = sOptTitle;
	returnObj['optSearch'] = sOptSearch;
	returnObj['optResult'] = sOptResult;
	returnObj['optCondition'] = objData.setConditon;

	return returnObj;
}; // end of f_setParamPopup


/* ==========================================================================================================
 * SCO Common Functions
 * =========================================================================================================*/

function fm_getAllColsName(objItems){
	var allColsName = new Array();

	for (var key in objItems ) {
		allColsName.push(objItems[key].name);
	};

	return allColsName;
}

function fm_removeGridPage ( arrGrid ) {
	for ( var loop = 0; loop<arrGrid.length; loop++) {
    	$( '#' + arrGrid[ loop ] ).jqxGrid({ pageable: false});
	};
}

function fm_addMaxLength( objId, iMaxLth ) {
	arrObjLth.push( { id: objId, lth: iMaxLth } );
};

