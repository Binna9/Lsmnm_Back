<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="content-type" content="text/html;charset=utf-8" />
<%@ include file="./include/include.jsp"%>
<title>TAG 마스터 이벤트처리</title>
<script type="text/javascript">
//*********************************************************************************************
// ********** Declare public variable
//*********************************************************************************************
	var gridTagMstEvent, gridTagMstEventId;
	
//*********************************************************************************************
// ********** Function Ready Section
//*********************************************************************************************
    $(document).ready(function () {
    	f_initSreen();
    	f_initSearchForm();
    	f_initContents();
        f_lastProc();
    }); // end of ready
    
//*********************************************************************************************
// ********** initialize screen Section
//*********************************************************************************************
    function f_initSreen() {
    	serviceName = "SMZ7070-service";
	}; // end of f_initSreen

//*********************************************************************************************
// ********** Initialize Search Condition Section
//*********************************************************************************************	
 	function f_initSearchForm() {
 		fc_makeSearch( '', 'TAG_MST_EVENT', '' );
	}; // end of f_initSearchForm

//*********************************************************************************************
// ********** Initialize DATA Section
//*********************************************************************************************
    function f_initContents () {
    	gridTagMstEvent   = fc_makeGrid( 'divGridTagMstEvent', 'insert', 'TAG_MST_EVENT', '', false );
    	gridTagMstEventId = gridTagMstEvent.getGridId();
    	
    	$("#"+ gridTagMstEventId).on("cellclick", function (event) {
		    var args = event.args;
		    var rowBoundIndex = args.rowindex;
		    var dataField = args.datafield;
			if ( dataField === 'TAG_ID' && !args.rightclick) {
				f_TagRollSetting ( gridTagMstEventId + '.' + dataField, rowBoundIndex );
			}
		});
    	
	}; // end of f_initContents

//*********************************************************************************************
// ********** Last Process Job
//*********************************************************************************************    
    function f_lastProc() {
		fc_lastProc(); 
		//fc_setColMaxLength( gridChainTagMstId, 'SCR_ID', 20 ); 
    }; // end of f_lastProc
    
//*********************************************************************************************
// ********** Screen Button Event Section
//*********************************************************************************************
    function f_search() {
    	fc_addParamForm( 'divSearchCondition' );
    	fc_searchGrid( [ { gridId: gridTagMstEventId, resultKey: 'RK_TAG_MST_EVENT_LIST' } ], serviceName, "searchTagMstEvent" );
    }; // end of f_search
    
    function f_save() {
    	fc_saveGrid( [ gridTagMstEventId ], '', serviceName, 'saveTagMstEvent', '', 'Y' );
    }; // end of f_save
    
    function f_delete() {
    	fc_deleteGrid( [ gridTagMstEventId ], '', serviceName, 'deleteTagMstEvent', '', 'Y' );   
    }; // end of fm_delete
    
//*********************************************************************************************
// ********** User Defined Function Section 
//*********************************************************************************************
	function f_TagRollSetting(targetColumn, rowIndex) {
		fc_setGridCheckBoxVal(gridTagMstEventId, rowIndex, true);
    	if ( targetColumn == gridTagMstEventId+'.TAG_ID' ) {
    		fc_linkagePopup( "SMZ7010", [  { name: "openUrl"	, value:'SMZ7070' 	},
    		                               { name: "openGridRowIndex"	, value: rowIndex	},
    		                            ], '85%', '90%', true );
    	}
    }; // end of f_UserRollSetting   

    function f_receiveGridData(tag_id, tag_nm, mgmt_ll_val, mgmt_ul_val, rowIndex){
    	fc_resizeDivWidth(gridTagMstEventId);
    	fc_setCellData( gridTagMstEventId, rowIndex, 'TAG_ID' , tag_id );
    	fc_setCellData( gridTagMstEventId, rowIndex, 'TAG_NM' , tag_nm );
    	fc_setCellData( gridTagMstEventId, rowIndex, 'LCL_VAL' , mgmt_ll_val );
    	fc_setCellData( gridTagMstEventId, rowIndex, 'UCL_VAL' , mgmt_ul_val );
    	
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
			<div id="divGridTagMstEvent"></div>
		</div>
	</div>
	<div id="divMessage">
		<%@ include file="./include/includeMessage.jsp" %>
	</div>
</body>
</html>