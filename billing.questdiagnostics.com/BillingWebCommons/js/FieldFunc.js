/*
<%-- *********************************************************************************  --%>
<%-- FieldFunc.js                                                                       --%>
<%-- Programmer: Ronakkumar Patel	                                                    --%>
<%-- Description:	It contains a list of field functions   							--%>
<%-- Code Modified by Vikram.Boddu on 4/27/2016 for jQuery Upgrade (version 1.12.2)     --%>
<%-- *********************************************************************************  --%>
*/

// This method is used to disable Text Field's copy and paste functionality
function disableCopyPaste(fieldName){
	if(fieldName != ''){
		//alert('disable copy & paste for: '+fieldName);
		$('[name *="'+fieldName+'"]').on('copy', function() {
		    return false;
		});
		$('[name *="'+fieldName+'"]').on('paste', function() {
		    return false;
		});
	}
}

function closeWindow(msg) {
	var parent = window.parent;
	if (parent && (window.location != parent.location) && parent.postMessage) {
		parent.postMessage(msg, "*");
	} else {
		window.close();
	}
}

function closeWindowAndPostObject(msg, msgInd, altMsg) {
	if (msgInd == 'Y') {
		closeWindow({ status: msg });
	} else {
		closeWindow(altMsg);
	}
}

