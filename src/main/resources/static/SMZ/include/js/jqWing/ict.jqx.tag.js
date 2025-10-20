/*
 * common tag search module 2019.11.1
 * return data = [EVENT_DTM.EVENT_DTM_UTC,TAG1,TAG2]
 *  - EVENT_DTM : YYYYMMDDHHMMSS 형식의 varchar(14) data
 *  - EVENT_DTM_UTC : 차트 Display 용 UTC변환
 *  - Tag1..n : TAG_ID로 구성되는 컬럼 명
 * */


function fc_searchTagData(callbackFuncMain, asss){
	
	//temporay use : until posfrema open
	if(fc_isNull(window.gwJsonParam.TAG_IDS)){
		fc_showMessageBox( 'Tag Id 정보가 없습니다.', 'E' );	 return;
	}
	if(fc_isNull(window.gwJsonParam.TAG_DTM_FROM)){ 
		fc_showMessageBox( 'Tag From 시간  정보가 없습니다.', 'E' );	 return;
	}
	if(fc_isNull(window.gwJsonParam.TAG_DTM_TO)){
		fc_showMessageBox( 'Tag To 시간 정보가 없습니다.', 'E' );	 return;
	}
	if(fc_isNull(window.gwJsonParam.TAG_INTERVAL)){
		fc_showMessageBox( 'Tag Interval 정보가 없습니다.', 'E' );	 return;
	}
	if(fc_isNull(window.gwJsonParam.TAG_AGGR_TY)){
		fc_showMessageBox( 'Tag Aggregates 정보가 없습니다.', 'E' );	 return;
	}	
	
	var isSuccess = fc_submitCall(null, 'smz.tag.rtp.if-service', 'searchTagData', '', '', 'SMZ', function(){
		//
		if(asss){
			$.each(window.gwJsonResult.RK_TAG_DATA, function (index, rowData){
				rowData.T_UTC = f_getDateUTC(rowData.T);
				rowData.T_F1 = f_getDateFormat1(rowData.T);
			});
		}else{
			$.each(window.gwJsonResult.RK_TAG_DATA, function (index, rowData){
				rowData.T_UTC = f_getDateUTC(rowData.T);
			});
		}
		
		
		if ( typeof callbackFuncMain === 'function' ) {
			callbackFuncMain();
		}
		
	});
	
	/*
	var tags = window.gwJsonParam.TAG_IDS.split(',');
	var tagInterval = Number(window.gwJsonParam.TAG_INTERVAL);
	var timeStart = f_getDate(window.gwJsonParam.TAG_DTM_FROM);
 	var timeEnd = f_getDate(window.gwJsonParam.TAG_DTM_TO);
 	//calc gap
	var diffSec = (timeEnd.getTime() - timeStart.getTime()) / 1000;
	
	//calc random info
	var randomArr = new Array();
	var randomInfo = null;
	for(var i in tags){
		randomInfo = new Object();
		randomInfo.center = Math.trunc(Math.random()*100);
		randomInfo.rate = Math.trunc(Math.random()*100)+1;
		randomInfo.from = randomInfo.center + (randomInfo.rate/10);
		randomInfo.to   = randomInfo.center - (randomInfo.rate/10);
		
		randomArr.push(randomInfo);
	}
	//console.log('randomArr : ' + JSON.stringify(randomArr));
	
	console.time('tag')
	var tagData = new Array();
	var row = null;
	var tagNm = null;
	var vLoopIndex = Math.trunc(diffSec/Number(window.gwJsonParam.TAG_INTERVAL));
	
	//block data count
	if(vLoopIndex > 50000){
		vLoopIndex = 50000;
		console.log('### data size가 '+vLoopIndex +'입니다. 임의로 50000 row로 정의됩니다.')
	}
	
	for(var i=0;i<vLoopIndex;i++){
		row = new Object();
		
		row.T = f_getStrDate(timeStart.setSeconds(timeStart.getSeconds() + tagInterval));
		row.T_UTC = f_getDateUTC(row.T);
		for(var j in tags){
			//tagNm = tags[j];
			tagNm = 'V'+j;
			row[tagNm] = RandomRange(randomArr[j].from ,randomArr[j].to);
		}		
		tagData.push(row);
	}
	console.timeEnd('tag')
	
	window.gwJsonResult.RK_TAG_DATA = tagData;
	
	if ( typeof callbackFuncMain === 'function' ) {
		callbackFuncMain();
	}
	
	
	var isSuccess = true;
	*/
	if ( isSuccess ) {
		fc_showCompleteMessage( 'I' );	
	};
	
	fc_setEditFlag( false );
	return isSuccess
}

function fc_searchMemoData(callbackFuncMain){
	
	var isSuccess = fc_submitCall(null, 'smz.tag.trend-service', 'searchTrendMemo', '', '', 'SMZ', function(){
		
		if ( typeof callbackFuncMain === 'function' ) {
			callbackFuncMain();
		}
		
	});
	
	if ( isSuccess ) {
		fc_showCompleteMessage( 'I' );	
	};
	
	fc_setEditFlag( false );
	return isSuccess
}

function RandomRange(start, end){
    return Math.floor((Math.random() * (end-start+1)) + start);
}

var vYear, vMonth, vDay, vHour, vMinute, vSecond;
function f_getDateUTC(strData){
	vYear   = strData.substring( 0, 4 );
	vMonth  = strData.substring( 4, 6 );
	vDay    = strData.substring( 6, 8 );
	vHour   = strData.substring( 8, 10 );
	vMinute = strData.substring( 10, 12 );
	vSecond = strData.substring( 12, 14 );

	return Date.UTC(Number(vYear), Number(vMonth)-1, Number(vDay), Number(vHour), Number(vMinute), Number(vSecond));
}

function f_getDate(strData){
	vYear   = strData.substring( 0, 4 );
	vMonth  = strData.substring( 4, 6 );
	vDay    = strData.substring( 6, 8 );
	vHour   = strData.substring( 8, 10 );
	vMinute = strData.substring( 10, 12 );
	vSecond = strData.substring( 12, 14 );
	
	return new Date(Number(vYear), Number(vMonth)-1, Number(vDay), Number(vHour), Number(vMinute), Number(vSecond));

}

function f_getDateFormat1(strData){
	vYear   = strData.substring( 0, 4 );
	vMonth  = strData.substring( 4, 6 );
	vDay    = strData.substring( 6, 8 );
	vHour   = strData.substring( 8, 10 );
	vMinute = strData.substring( 10, 12 );
	vSecond = strData.substring( 12, 14 );
	
	return vYear + '-' +vMonth + '-' + vDay + ' ' +vHour + ':' + vMinute + ':' + vSecond;

}

var _year, _month, _day, _hour, _min, _sec;
function f_getStrDate(date){
	var dateObj = new Date(date);
	_year = dateObj.getFullYear() + "";
	_month= dateObj.getMonth()+1  + "";
	_day  = dateObj.getDate()     + "";
	_hour = dateObj.getHours()    + "";
	_min  = dateObj.getMinutes()  + "";
	_sec  = dateObj.getSeconds()  + "";

	if ( _year.length == 1) _year = "0" + _year;
	if ( _month.length == 1)_month = "0" + _month;
	if ( _day.length == 1)  _day = "0" + _day;
	if ( _hour.length == 1) _hour = "0" + _hour;
	if ( _min.length  == 1) _min  = "0" + _min;
	if ( _sec.length  == 1) _sec  = "0" + _sec;

	return _year + _month + _day + _hour + _min + _sec;
}