<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="content-type" content="text/html;charset=utf-8" />
<%@ include file="./include/include.jsp"%>
<title>Chart Scale</title>
<script type="text/javascript">
//*********************************************************************************************
// ********** Declare public variable
//*********************************************************************************************
	var gridChartScale, gridChartScaleId;
	
	var openUrl = fc_getUrlParameter( 'openUrl' );
	var openGridRowIndex = fc_getUrlParameter( 'openGridRowIndex' );
	var lineColor = fc_getUrlParameter( 'lineColor' );
//*********************************************************************************************
// ********** Function Ready Section
//*********************************************************************************************
    $(document).ready(function () {
    	f_initSreen();
    	f_initContents();
        f_lastProc();
    }); // end of ready

//*********************************************************************************************
// ********** initialize screen Section
//*********************************************************************************************
    function f_initSreen() {
    	
    	
	}; // end of f_initSreen

//*********************************************************************************************
// ********** Initialize data Section
//*********************************************************************************************
    function f_initContents () {
    	$("#divColorPick").jqxColorPicker({ width: 300, height: 300});
		
	}; // end of f_initContents

	//*********************************************************************************************
// ********** Last Process Job
//*********************************************************************************************
    function f_lastProc() {
		fc_lastProc();
		
		$("#divColorPick").jqxColorPicker('setColor', lineColor);
		
    }; // end of f_lastProc

//*********************************************************************************************
// ********** Screen Button Event Section
//*********************************************************************************************
    function f_cust1() {
    	
    	var color = $("#divColorPick").jqxColorPicker('getColor');
    	
    	//console.log('### color',color);
    	
    	parent.f_receiveData('#'+color.hex, openGridRowIndex);
    	f_closePopup();
    }; // end of f_cust1


    function f_closePopup() {
    	var parentPop = parent.window.popWin;
		parentPop.closePop();
    }; // end of f_close
    

//*********************************************************************************************
// ********** User Defined Function Section
//*********************************************************************************************
</script>
<style>
.jqx-color-picker{
	padding: 5px;
}
</style>
</head>
<body>
	<div id="divContainer">
		<div id="divTitle">
			<%@ include file="./include/includeTitle.jsp" %>
		</div>
		<div id="divContents">
			<div id="divColorPick"></div>
		</div>
	</div>
	<div id="divMessage">
		<%@ include file="./include/includeMessage.jsp" %>
	</div>
</body>
</html>