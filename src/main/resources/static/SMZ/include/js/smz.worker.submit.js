setTimeout(function() {
			//loading.show();
			fc_setReadOnly('mnuSearchBtn',true);

			$("#divTable_0").empty();
			$("#divTable_0").height('98%');

			//트리의 하이라이트가된 엘리먼트만
			for(var i=0; i<highlight.length; i++){
				if(highlight[i] != ""){
					$("#TAG_CODE_" + i).val(tagCode[i]);
					$("#TR_CODE_" + i).val(trCode[i]);
				}
			}

			fc_addParam('FR_DATE_YY',fc_getInputVal('FR_DATE').substring(0,4));
			fc_addParam('FR_DATE_MM',fc_getInputVal('FR_DATE').substring(5,7));
			fc_addParam('FR_DATE_DD',fc_getInputVal('FR_DATE').substring(8,10));
			fc_addParam('TO_DATE_YY',fc_getInputVal( 'TO_DATE' ).substring(0,4));
			fc_addParam('TO_DATE_MM',fc_getInputVal( 'TO_DATE' ).substring(5,7));
			fc_addParam('TO_DATE_DD',fc_getInputVal( 'TO_DATE' ).substring(8,10));
			fc_addParamForm('divSearchCondition');
			var gridTable = fc_makeGrid_test('divTable_0', 'search', 'TAG_TREE_LIST_TEST', "", false);
			var gridTableId = gridTable.getGridId();

			fc_searchGrid2([ {
				gridId : gridTableId,
				resultKey : 'RK_TABLE_LIST'
			} ], serviceName, prmTransitionNm);

		    //loading.hide();
		    fc_setReadOnly('mnuSearchBtn',false);
			fc_resize();

		}, 200);