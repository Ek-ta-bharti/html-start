/* INC024415 - Add hover over help text on Secure Payment lock */
/* This code adds the hover over help text for secure payment lock image */

(function() {
	
	if (document.addEventListener) {
		document.addEventListener("DOMContentLoaded", populateSecureLockHelpText, false);
	} else {
		// Fallback for IE8 and earlier
		document.attachEvent("onreadystatechange", readyStateChange);
	}
	
	function readyStateChange() {
        if ( document.readyState === "complete" ) {
            populateSecureLockHelpText();
        }
    }
	
	function populateSecureLockHelpText() {
		if (!!document.getElementById("secure-lock-help-text")) {
			document.getElementById("secure-lock-help-text").innerHTML = "<div id=\"popUptext\" style=\" position: absolute; left: 50px; visibility: hidden; width: 280px; background: #707070; color: #fff; padding: 5px; font-size: 10px; z-index: 1; \">Secure Payment:  We use Transport Layer Security (TLS) to encrypt your payment and demographic information so only QuestDiagnostics.com is able to decode your information.</div>"; 
		}
	}

})();

// Function to toggle hover over help text for secure payment lock  
function togglePoPUp(visibility) {
	document.getElementById('popUptext').style.visibility = visibility;
}