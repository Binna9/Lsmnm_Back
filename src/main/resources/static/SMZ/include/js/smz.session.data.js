/**
 * SMZ Session Data Module
 * 모든 페이지에서 공통으로 사용할 세션 데이터 초기화 모듈
 */

/**
 * 전역 변수 초기화 함수
 */
function initializeGlobalVariables() {
    // window.gwMultiLangItem 초기화
    if (typeof window.gwMultiLangItem === 'undefined' || window.gwMultiLangItem === null) {
        window.gwMultiLangItem = {};
    }

    // window.gwMesEnv 초기화
    if (typeof window.gwMesEnv === 'undefined' || window.gwMesEnv === null) {
        window.gwMesEnv = {
            user: {},
            lang: {}
        };
    }

    // window.gwJsonParam 초기화
    if (typeof window.gwJsonParam === 'undefined' || window.gwJsonParam === null) {
        window.gwJsonParam = {};
    }

    // window.gwAuth 초기화
    if (typeof window.gwAuth === 'undefined' || window.gwAuth === null) {
        window.gwAuth = {};
    }
}

/**
 * 세션 스토리지 데이터 초기화 함수
 */
function initializeSessionStorage() {
    console.log('=== 세션 스토리지 데이터 초기화 ===');

    sessionStorage.setItem('GW_USER_ID', '99991201');
    sessionStorage.setItem('GW_PGM_ID', 'SI0003');
    sessionStorage.setItem('GW_LANG_CD', 'KO');
    sessionStorage.setItem('GW_LINE_CD', '');
    sessionStorage.setItem('GW_PLANT_CD', '1000');
    sessionStorage.setItem('GW_CLIENT_IP', '10.2.110.216');
    sessionStorage.setItem('GW_EMP_NO', '99991201');
    sessionStorage.setItem('GW_DEPT_CD', 'UNKNOWN');
    sessionStorage.setItem('GW_DEPT_NM', '');
    sessionStorage.setItem('GW_ROLE_CD', 'MES_INQ_ROLE,MB_TEMP,ITSM');
    sessionStorage.setItem('GW_USER_NM', '김성준');
    sessionStorage.setItem('GW_WELCOME_PGM_ID', 'SI0003');
    sessionStorage.setItem('GW_SERVER_INFO', '개발');
    sessionStorage.setItem('GW_SSO_YN', 'N');
    sessionStorage.setItem('GW_OUTSIDE_ACCESS_YN', 'N');
    sessionStorage.setItem('GW_PASSWD_EXPIRE_DT', '20251215');
    sessionStorage.setItem('SYSTEM_LINK_PAGE', '');
    sessionStorage.setItem('SYSTEM_LINK_KEYS', '');
    sessionStorage.setItem('SYSTEM_LINK_VALUES', '');

    // GW_SYSTEM_ENV 복잡한 JSON 데이터 설정
    var systemEnvJson = 'jsonData:{"themes":"ui-redmond","user":{"id":"99991201","name":"김성준","deptCd":"UNKNOWN","clientIp":"10.2.110.216","pgmId":"SI0003","pgmTy":"S","comCd":"LSNC","comNm":"ODS MES","plantCd":"1000","lineCd":""},"grid":{"addFlag":"I","delFlag":"D","updateFlag":"U","isPage":false,"isFilter":false,"isAutoSave":false},"completeMsg":{"isSearch":false,"isSave":true,"isDelete":true,"isConfirm":true,"isSend":true,"isFilesave":true},"mainmenu":{"isMenuAutoHide":true,"isSideMenu":false,"isOpenByClick":true,"isExpand":false,"isPgmId":true},"screen":{"showTabList":true,"tabCaptionLth":25,"logLevel":"1","isDefMessageArea":false,"reportMainPgmId":"SRTC000","reportDefaultURL":"/SRT/pages/","paddingSize":5,"maxinteger":"50","listboxval":"20","listboxmaxlen":"500"},"format":{"delim":{"source":{"date":"","time":"","datetime":""},"target":{"date":"-","time":":","datetime":" "}},"date":{"source":"YMD","target":"YMD","date":{"picker":"yyyy-MM-dd","year":0,"month":1,"day":2},"yearmonth":{"picker":"yyyy-MM"},"monthday":{"picker":"MM-dd"}},"time":{"source":"HMS","target":"HMS","time":{"picker":"HH:mm:ss"},"hour":{"picker":"HH"},"hourmin":{"picker":"HH:mm"},"minsec":{"picker":"mm:ss"}},"slab":{"thk":0,"wth":-1,"lth":-1,"wgt":2},"plate":{"thk":0,"wth":-1,"lth":-1,"wgt":2},"coil":{"thk":0,"wth":-1,"lth":-1,"wgt":2},"bloom":{"thk":0,"wth":-1,"lth":-1,"wgt":2},"billet":{"thk":0,"wth":-1,"lth":-1,"wgt":2},"separate":{"source":{"thousand":"","deciaml":".","decimal":"."},"target":{"thousand":",","deciaml":".","decimal":"."}}},"lang":{"cd":"KO","datepicker":"ko","grid":"ko","isMultiLanguage":true,"isUseDefLabel":false,"prefix":"@_","isUseSession":true,"isMultiLanguageSys":"SCO"},"item":{"itemcd":"item_cd","itemvalue":"item_value","datatype":"datatype","category":"category"},"operInfo":{"date":"","shift":"","dateTime":""},"shift":{"A":"08","B":"20","C":"20","D":"","E":"","CNT":2},"btnSize":{"search":70,"save":70,"del":70,"conf":70,"print":70,"close":70,"cust1":85,"cust2":85,"cust3":85,"cust4":85,"cust5":85}}';
    sessionStorage.setItem('GW_SYSTEM_ENV', systemEnvJson);

    console.log('세션 스토리지 데이터 초기화 완료');
}

/**
 * 다국어 키값 초기화 함수
 */
function initializeMultiLanguageItems() {
    // 다국어 키값들을 한글로 설정
    window.gwMultiLangItem['EVENT_RECV_TY'] = { CONTENTS: '이벤트수신유형' };
    window.gwMultiLangItem['TAG_GRP'] = { CONTENTS: 'Tag그룹' };
    window.gwMultiLangItem['TAG_NM'] = { CONTENTS: 'Tag명' };
    window.gwMultiLangItem['EVENT_TY'] = { CONTENTS: '이벤트유형' };
    window.gwMultiLangItem['LINK_PGM'] = { CONTENTS: '링크프로그램' };
    window.gwMultiLangItem['COND'] = { CONTENTS: '판단기준' };
    window.gwMultiLangItem['E'] = { CONTENTS: '이벤트구분' };
    
    // BDP0040 관련 다국어 항목 추가
    window.gwMultiLangItem['ALARM_TO_USER'] = { CONTENTS: '알람대상사용자' };
    window.gwMultiLangItem['ALARM_TO_ROLE'] = { CONTENTS: '알람대상역할' };
    window.gwMultiLangItem['PLANT_CD'] = { CONTENTS: '공장코드' };
    window.gwMultiLangItem['BIZ_CHAIN_CD'] = { CONTENTS: '업무체인코드' };
    window.gwMultiLangItem['ALARM_TYPE'] = { CONTENTS: '알람유형' };
    
    console.log('다국어 키값 초기화 완료');
}

/**
 * 권한 설정 함수
 */
function initializeAuthPermissions() {
    // 버튼 권한 설정
    if (typeof window.gwAuth !== 'undefined') {
        window.gwAuth.isSearch = true;
        window.gwAuth.isSave = true;
        window.gwAuth.isDelete = true;
        window.gwAuth.isConfirm = true;
        console.log('버튼 권한 설정 완료');
    }
}

/**
 * MES 환경 변수 초기화 함수
 */
function initializeMesEnvironment() {
    // window.gwMesEnv 덮어쓰기 (fc_setDefaultParam 에서 사용)
    if (typeof window.gwMesEnv !== 'undefined') {
        window.gwMesEnv.user.id = '99991201';
        window.gwMesEnv.user.name = '김성준';
        window.gwMesEnv.user.pgmId = 'SI0003';
        window.gwMesEnv.user.lineCd = '';
        window.gwMesEnv.user.deptCd = 'UNKNOWN';
        window.gwMesEnv.user.clientIp = '10.2.110.216';
        window.gwMesEnv.user.plantCd = '1000';
        window.gwMesEnv.lang.cd = 'KO';
        window.gwMesEnv.lang.isUseDefLabel = true; // 기본 라벨 사용 설정
    }
}

/**
 * JSON 파라미터 초기화 함수
 */
function initializeJsonParameters() {
    // window.gwJsonParam 덮어쓰기 (API 파라미터)
    if (typeof window.gwJsonParam !== 'undefined') {
        window.gwJsonParam.USER_ID = '99991201';
        window.gwJsonParam.PGM_ID = window.gwMesEnv.user.pgmId || 'SI0003';
        window.gwJsonParam.MNU_ID = window.gwMesEnv.user.mnuId || 'M000001000';
        window.gwJsonParam.LANG_CD = 'KO';
        window.gwJsonParam.LINE_CD = '';
        console.log('JSON 파라미터 초기화 완료 - PGM_ID: ' + window.gwJsonParam.PGM_ID + ', MNU_ID: ' + window.gwJsonParam.MNU_ID);
    }
}

/**
 * 메인 세션 데이터 초기화 함수
 * 모든 페이지에서 호출할 수 있는 통합 초기화 함수
 */
window.overrideSessionData = function() {
    console.log('=== 공통 세션 데이터 초기화 시작 ===');
    
    // 1. 전역 변수 초기화
    initializeGlobalVariables();
    // 2. 세션 스토리지 초기화
    initializeSessionStorage();
    // 3. 다국어 키값 초기화
    initializeMultiLanguageItems();
    // 4. 권한 설정
    initializeAuthPermissions();
    // 5. MES 환경 변수 초기화
    initializeMesEnvironment();
    // 6. JSON 파라미터 초기화
    initializeJsonParameters();
    
    console.log('=== 공통 세션 데이터 초기화 완료 ===');
};

/**
 * 자동 초기화 함수
 * 페이지 로드 시 자동으로 실행되는 함수
 */
function autoInitializeSessionData() {
    // 프레임워크 초기화 완료 후 세션 데이터 덮어쓰기
    setTimeout(function() {
        window.overrideSessionData();
        console.log('자동 세션 데이터 초기화 완료');
    }, 1000);
}

/**
 * 페이지별 초기화 함수 (선택적)
 * 특정 페이지에서 추가적인 초기화가 필요한 경우 사용
 */
function initializePageSpecificData(pageId) {
    switch(pageId) {
        case 'BDP7070':
            window.gwMesEnv.user.pgmTitle = 'Tag 이벤트/알람 관리 기준';
            window.gwMesEnv.user.pgmId = 'SMZ7070';
            window.gwMesEnv.user.mnuId = 'M000001463'; // Tag 이벤트/알람 관리 기준 메뉴 ID
            break;
        case 'BDP7010':
            window.gwMesEnv.user.pgmTitle = 'Tag Master 관리 기준';
            window.gwMesEnv.user.pgmId = 'SMZ7010';
            window.gwMesEnv.user.mnuId = 'M000001460'; // Tag Master 관리 기준 메뉴 ID
            break;
        case 'BDP0040':
            window.gwMesEnv.user.pgmTitle = '알람 관리';
            window.gwMesEnv.user.pgmId = 'BDP0040';
            window.gwMesEnv.user.mnuId = 'M000001450'; // Alarm Master 메뉴 ID (예시)
            break;
        case 'BDP6012':
            window.gwMesEnv.user.pgmTitle = 'Tag Chart/Data 조회';
            window.gwMesEnv.user.pgmId = 'BDP0040';
            window.gwMesEnv.user.mnuId = 'M000001459'; // Alarm Master 메뉴 ID (예시)
            break;
        default:
            window.gwMesEnv.user.pgmTitle = 'MES System';
            window.gwMesEnv.user.pgmId = 'SMZ6012';
            window.gwMesEnv.user.mnuId = 'M000000000'; // 기본 메뉴 ID
            break;
    }
    console.log('페이지별 초기화 완료: ' + pageId + ', PGM_ID: ' + window.gwMesEnv.user.pgmId + ', MNU_ID: ' + window.gwMesEnv.user.mnuId);
}

$(document).ready(function() {
    // 자동 초기화 실행
    autoInitializeSessionData();
});
