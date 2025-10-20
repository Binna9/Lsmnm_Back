/* -----------------------------------------------------------------------------
* @Name			fc_setGridExportExcel 
* @Description	
* @Parameter	
* @Returns			
* @Example			
* ---------------------------------------------------------------------------*/
function fc_setGridExportExcel( gridId, isShowHidden ) {
	//console.log('############################# extent');
	if( fc_isNull(isShowHidden) ) isShowHidden =false;
	
	var sfileName = '';
	if( $('#divCaption_'+gridId).length ) { sfileName = $('#divCaption_'+gridId).text(); }
	
	if( fc_isNull(sfileName) ) {
		try{
			var oPageInfo = fc_getCurrentTabPageInfo( parent.window.mainTab );
			if( !fc_isNull(oPageInfo) ){
				sfileName = oPageInfo.pageNm;
			}
		}catch(e) {
			sfileName = '';
		}
	}
	
	if( fc_isNull(sfileName)  ) sfileName = gridId;
	
	sfileName += '_' + eval(new Date()-0); 
//	$( '#' + gridId ).jqxGrid( 'exportdata', 'xls', sfileName, true, null, isShowHidden, '/SCO/export.do', 'utf-8' );
//
//	return;

	var instance = $( "#" + gridId ).jqxGrid('getInstance'); 
	var record = instance.columns.records;
	var keyList = [{"key":"COLUMN_DATA"}, {"key":"EXPORT_DATA"}];
	var sendData = {};
	sendData['COLUMN_DATA'] = []; 
	var capitalize = function( str ) {
		if( fc_isNull(str) ) return "";
		str = str.substring(0,1).toUpperCase() + str.substring(1);
		return str;
	}
	
	var dataField = instance.source._source.datafields; 
	var getColumnAttribute = function( dataObj , sColumn, sAttribute ) {
		var sText = "";
		try{
			if( fc_isNull(dataObj) ) {
				return "";
			}else {
				$.each( dataField , function( key, objData ) {
					if ( objData.name == sColumn ){
						sText = objData[sAttribute];
						return false;
					} 
				});
			}
		}catch(e) {
			return "";
		}
		return sText; 
	}
	
	var arrLovCol  = new Array();
	var arrDateCol = new Array();
	
	if( !fc_isNull(record) ) {
		$.each( record, function( key, obj ) { 
			if( obj.exportable && !obj.hidden ) {
				var type = getColumnAttribute(dataField, obj.datafield,"type"); 
				if( getColumnAttribute(dataField, obj.datafield,"datatype") == "lov"   ) {
					arrLovCol.push( obj.datafield );
				}
				if( getColumnAttribute(dataField, obj.datafield,"type") == "date"  ) {
					arrDateCol.push( obj.datafield );
				}
				
				sendData['COLUMN_DATA'].push( { 
					columngroup: fc_getColGroupText(gridId, obj.columngroup)
					, datafield: obj.datafield 
					, text: obj.text
					, cellsalign: capitalize( obj.cellsalign )
					, type : type
					, cellsformat : obj.cellsformat
					, cellswidth : obj.width
					, exportData : obj.exportable
					}); 
			}
		});
	}
	
	//sendData['EXPORT_DATA'] = instance.source._source.localdata;
	sendData['EXPORT_DATA'] = instance.dataview.records
	if( arrLovCol.length > 0 ) {
		$.each( sendData['EXPORT_DATA'], function( key, data ) {
				$.each( arrLovCol, function(index, value){
					if( !fc_isNull(data[value]) ) {
						//update by youm.2016.9.2 :result use all recored(not filtered). problem!
						//data[value] = instance.getcelltext(key, "DISP_"+value );
						data[value] = data['DISP_'+value];
					}
				});
		});		
	}
	
	if( arrDateCol.length > 0 ) {
		$.each( sendData['EXPORT_DATA'], function( key, data ) {
				$.each( arrDateCol, function(index, value){
					if( !fc_isNull(data[value]) ) {
						data[value] = data[value];
						//update by youm.2016.9.2 :result use all recored(not filtered). problem!
						//data[value] = instance.getcelltext(key, value ); 
						
					}
				});
		});		
	}

	//var headerExport = fc_makeExcelColumnHeader(sendData['COLUMN_DATA']);
	//var dataExport = fc_makeExcelData(sendData['EXPORT_DATA'], sendData['COLUMN_DATA']);
		
	//var linkExport = ExcellentExport.excel('#', headerExport + dataExport, sfileName);
	//window.open(linkExport);	

	var now = new Date();
	var download_dtm = now.getFullYear() + padZero(now.getMonth() + 1) + padZero(now.getDate()) + padZero(now.getHours()) + padZero(now.getMinutes()) + padZero(now.getSeconds());
	
	var csvData = fc_makeCSVColumnHeader(sendData['COLUMN_DATA']) + fc_makeCSVData(sendData['EXPORT_DATA'], sendData['COLUMN_DATA']);
	var exportedFilenmae = download_dtm+'_raw_data.csv';
	var blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
	if (navigator.msSaveBlob) { // IE 10+
		navigator.msSaveBlob(blob, exportedFilenmae);
	} else {
		var link = document.createElement("a");
		if (link.download !== undefined) { // feature detection
			// Browsers that support HTML5 download attribute
			var url = URL.createObjectURL(blob);
			link.setAttribute("href", url);
			link.setAttribute("download", exportedFilenmae);
			link.style.visibility = 'hidden';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
	}

}; // end of fc_setGridExportExcel
function padZero(num) {
	var result;
	if (num < 10) {
		result = "0" + num;
	} else {
		result = "" + num;
	}
	return result;
}
/* -----------------------------------------------------------------------------
* @Name			fc_makeCSVColumnHeader
* @Description	Create Excel Header
* @Parameter	girdId - GridId
* @Parameter    columnData - Grid Columns of Array Type 
* @Returns		content - Header of table
* @Example			
* ----------------------------------------	-----------------------------------*/
function fc_makeCSVColumnHeader(columnData){

	var nSize = columnData.length;
	var nGroupCnt = 0;
	var sGroupTxt = "";
	var content = "";

	//COLUMS DATA GROUP
	for( i=0; i < nSize; i++ ) {
		var lineAux = columnData[i];
		sGroupTxt = lineAux["columngroup"];	
		if( sGroupTxt != "") {
			nGroupCnt++;
		}
	}
	
	if( nGroupCnt > 0 ) {
		var MergeAcross = -1;
		for( j=0; j < nSize; j++ ) {
			var line = columnData[j];
			
			sGroupTxt = line["columngroup"];
			MergeAcross = getMergeCellIdx( columnData, sGroupTxt, j );
				
			if( sGroupTxt == ''){
				if(j == nSize-1) {
					content += line["text"] +",";
				} else {
					content += line["text"] +",";	
				}
			}
			else{ 
				if(j == nSize-1) {
					content += line["columngroup"];
				} else {
					content += line["columngroup"] +",";	
				}
				j = (j + (MergeAcross-1));
			}				

		}
		content+= "\r\n";
	}

	//COLUMS DATA
	for( i=0; i < nSize; i++ ) {
		var line = columnData[i];
		if ((line["columngroup"] != '' && nGroupCnt > 0) || (line["columngroup"] == '' && nGroupCnt == 0)){ 
			if(i == nSize-1) {
				content += line["text"];
			} else {
				content += line["text"]+",";	
			}			
		}
	}
	content+= "\r\n";

	return content;
}// end fc_makeCSVColumnHeader
/* -----------------------------------------------------------------------------
* @Name			fc_makeCSVData
* @Description	Create Excel Data
* @Parameter	data - Array of data , columnHeader Array of data Header
* @Parameter    columnData - Grid Columns of Array Type 
* @Returns		content - Body of table
* @Example			
* ----------------------------------------	-----------------------------------*/
function fc_makeCSVData(data, columnHeader) {
	var content = "";
	var nSize = data.length;
	var nSizeHeader = columnHeader.length; 
	
	for( i=0; i< nSize; i++ ) {
		for(j=0; j< nSizeHeader; j++)
		{
			var lineHeader = columnHeader[j]["datafield"];		
			var lineHeaderfiels = columnHeader[j];
			
			var item = data[i][lineHeader];

			if(lineHeaderfiels["type"] == 'date'){
				item = (item == null || item == '') ? "" : moment(item).format('DD:MM:YYY HH:mm:ss');
				console.log("item : " + item);
			} else if(item == null) { 
				item = '';
			} else if(item.length < 1) { 
				item = '';
			} else if(item == 0) {
				item = 0;
			}
			else { item = (item == null || item == '') ? "" : item; }

			if(j == nSizeHeader-1) {
				content += item;
			} else {
				content += item +",";	
			}
		}
		content += "\r\n";
	}
	
	return content;
} // end fc_makeCSVData

/* -----------------------------------------------------------------------------
* @Name			fc_makeExcelColumnHeader
* @Description	Create Excel Header
* @Parameter	girdId - GridId
* @Parameter    columnData - Grid Columns of Array Type 
* @Returns		content - Header of table
* @Example			
* ----------------------------------------	-----------------------------------*/
function fc_makeExcelColumnHeader(columnData){

	var nSize = columnData.length;
	var nGroupCnt = 0;
	var sGroupTxt = "";
	var content = "";

	content += "        <table id='exportTOExcel' border='1'>";

	//COLUMS DATA GROUP
	for( i=0; i < nSize; i++ ) {
		var lineAux = columnData[i];
		sGroupTxt = lineAux["columngroup"];	
		if( sGroupTxt != "") {
			nGroupCnt++;
		}
	}
	
	if( nGroupCnt > 0 ) {
		var MergeAcross = -1;
		for( j=0; j < nSize; j++ ) {
			var line = columnData[j];
			
			if( j == 0 ) {content+= "        <tr style='background-color: #f7f7f7;'>";};
			sGroupTxt = line["columngroup"];
			MergeAcross = getMergeCellIdx( columnData, sGroupTxt, j );
				
			if( sGroupTxt == ''){ content += "<td rowspan='2' align='center'>"+ line["text"] +"</td>"; }
			else{ content += "<td align='center' colspan='"+ (MergeAcross) +"'>"+ line["columngroup"] +"</td>"; j = (j + (MergeAcross-1));}				

		}
		content+= "            </tr>";
	}

	//COLUMS DATA
	content+= "        <tr style='background-color: #f7f7f7;'>";
	for( i=0; i < nSize; i++ ) {
		var line = columnData[i];
		if ((line["columngroup"] != '' && nGroupCnt > 0) || (line["columngroup"] == '' && nGroupCnt == 0)){ content += "            <td align='center' style='width:"+ line["cellswidth"] +"px;'>"+ line["text"] +"</td>"; }
	}
	content+= "        </tr>";	

	return content;
}// end fc_makeExcelColumnHeader

/* -----------------------------------------------------------------------------
* @Name			getMergeCellIdx
* @Description	Cell Merger
* @Parameter	girdId - GridId
* @Parameter    columnData, sGroupTxt, nStartIdx
* @Returns		nMergeCnt - Merge Count
* @Example			
* ----------------------------------------	-----------------------------------*/
function getMergeCellIdx(columnData, sGroupTxt, nStartIdx) {
	var nSize = columnData.length;
	var nMergeCnt = 0;
	for( i=nStartIdx; i < nSize; i++ ) {
		var line = columnData[i];
		if(sGroupTxt == line["columngroup"]) {
			nMergeCnt++;
		} else{ break; }
	}
	return nMergeCnt;
} // end getMergeCellIdx

/* -----------------------------------------------------------------------------
* @Name			fc_makeExcelData
* @Description	Create Excel Data
* @Parameter	data - Array of data , columnHeader Array of data Header
* @Parameter    columnData - Grid Columns of Array Type 
* @Returns		content - Body of table
* @Example			
* ----------------------------------------	-----------------------------------*/
function fc_makeExcelData(data, columnHeader) {
	var content = "";
	var nSize = data.length;
	var nSizeHeader = columnHeader.length; 
	
	for( i=0; i< nSize; i++ ) {
		content += "            <tr>";
		for(j=0; j< nSizeHeader; j++)
		{
			var lineHeader = columnHeader[j]["datafield"];		
			var lineHeaderfiels = columnHeader[j];
			
			var item = data[i][lineHeader];
			
			if(lineHeaderfiels["type"] == 'date'){
				item = (item == null || item == '') ? "" : moment(item).format('DD:MM:YYY HH:mm:ss');
//			}else if(lineHeaderfiels["type"] == 'number'){
//				if (item != 0) {
//					item = (item == null || item == '') ? "" :formatNumber(item, lineHeaderfiels["cellsformat"]);
//				} else {
//					item = 0;
//				}
			} else if(item.length < 1) { 
				item = '';
			} else if(item == 0) {
				item = 0;
			}
			else { item = (item == null || item == '') ? "" : item; }
			
	        content += "            	<td>"+ item +"</td>";	
		}
		content += "            </tr>";
	}
	content += "        </table>";
	
	return content;
} // end fc_makeExcelData


function formatNumber (num, format) {
	/*if(format != ""){
		format = format.replace("d", "");
		num = num.toFixed(format).replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") ;
		
	}*/

    return num
}


function f_getStrDateUTM(dateUTC){
   var dateObj = new Date(dateUTC);
   //console.log(dateUTC +'/'+ dateObj)

   _year = dateObj.getUTCFullYear() + "";
   _month= dateObj.getUTCMonth()+1  + "";
   _day  = dateObj.getUTCDate()     + "";
   _hour = dateObj.getUTCHours()    + "";
   _min  = dateObj.getUTCMinutes()  + "";
   _sec  = dateObj.getUTCSeconds()  + "";

   if ( _year.length == 1) _year = "0" + _year;
   if ( _month.length == 1)_month = "0" + _month;
   if ( _day.length == 1)  _day = "0" + _day;
   if ( _hour.length == 1) _hour = "0" + _hour;
   if ( _min.length  == 1) _min  = "0" + _min;
   if ( _sec.length  == 1) _sec  = "0" + _sec;

   return _year+'-'+_month+'-'+_day+' '+_hour+':'+_min+':'+_sec;
}

Date.prototype.format = function (f) {
    if (!this.valueOf()) return " ";
    var weekKorName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var weekKorShortName = ["일", "월", "화", "수", "목", "금", "토"];
    var weekEngName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var weekEngShortName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var d = this;

    return f.replace(/(yyyy|yy|MM|dd|KS|KL|ES|EL|HH|hh|mm|ss|SS|a\/p)/gi, function ($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear(); // 년 (4자리)
            case "yy": return (d.getFullYear() % 1000).zf(2); // 년 (2자리)
            case "MM": return (d.getMonth() + 1).zf(2); // 월 (2자리)
            case "dd": return d.getDate().zf(2); // 일 (2자리)
            case "KS": return weekKorShortName[d.getDay()]; // 요일 (짧은 한글)
            case "KL": return weekKorName[d.getDay()]; // 요일 (긴 한글)
            case "ES": return weekEngShortName[d.getDay()]; // 요일 (짧은 영어)
            case "EL": return weekEngName[d.getDay()]; // 요일 (긴 영어)
            case "HH": return d.getHours().zf(2); // 시간 (24시간 기준, 2자리)
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2); // 시간 (12시간 기준, 2자리)
            case "mm": return d.getMinutes().zf(2); // 분 (2자리)
            case "ss": return d.getSeconds().zf(2); // 초 (2자리)
            case "SS": return d.getMilliseconds().zf(3); // 밀리초 (3자리)
            case "a/p": return d.getHours() < 12 ? "오전" : "오후"; // 오전/오후 구분
            default: return $1;
        }
    });
};
String.prototype.string = function (len) { var s = '', i = 0; while (i++ < len) { s += this; } return s; };
String.prototype.zf = function (len) { return "0".string(len - this.length) + this; };
Number.prototype.zf = function (len) { return this.toString().zf(len); };
