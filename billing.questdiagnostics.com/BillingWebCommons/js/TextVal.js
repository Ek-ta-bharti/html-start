/*
<%-- ********************************************************************************* --%>
<%-- TextVal.js                                                                        --%>
<%-- Programmer:	Jim Elkins                                                     --%>
<%-- Date:		7/26/01                                                        --%>
<%-- Description:	Contains several functions used by Employee text validation.   --%>
<%-- ********************************************************************************* --%>
*/

// isAlphabetic (STRING s)
//
// Returns true if string s is English letters
// (A .. Z, a..z) only.
//

function isAlphabetic (s) {
    s = stripCharsInBag(s, " ");
    var i;

    // Search through string's characters one by one
    // until we find a non-alphabetic character.
    // When we do, return false; if we don't, return true.

    for (i = 0; i < s.length; i++) {
        // Check that current character is letter.
        var c = s.charAt(i);
        if (!isLetter(c))
        return false;
    }

    // All characters are letters.
    return true;
}

// Removes all characters which appear in string bag from string s.

function stripCharsInBag (s, bag) {
    var i;
    var returnString = "";

    // Search through string's characters one by one.
    // If character is not in bag, append to returnString.

    for (i = 0; i < s.length; i++) {
        // Check that current character isn't whitespace.
        var c = s.charAt(i);
        if (bag.indexOf(c) == -1) returnString += c;
    }
    return returnString;
}

// Returns true if character c is an English letter
// (A .. Z, a..z).

function isLetter (c) {
    return ( ((c >= "a") && (c <= "z")) || ((c >= "A") && (c <= "Z")) );
}

// Call both functions to remove leading and trailing charaters
function stripChar(s, character) {
    s = stripLeadingChar(s, character);
    s = stripTrailingChar(s, character);
    return s;
}

// Removes trailing character from s.

function stripTrailingChar(s, character) {
    var i = 0;
    for (i = s.length; i >=0 ; i--) {
        // Check that current character isn't the character.
        var c = s.charAt(i-1);
        if (c != character) return s.substring(0, i);
    }
    return s;
}

// Removes leading character from s.

function stripLeadingChar(s, character) {
    var i = 0;
    for (i = 0; i < s.length; i++) {
        // Check that current character isn't the character.
        var c = s.charAt(i);
        if (c != character) return s.substring(i, s.length);
    }
    return s;
}

// Changes first character to upper case and rest to lower case.
function changeCase(s) {
    var strLen = s.length;
    var firstChar;
    var postString;
    if (strLen > 0) {
        s = s.toLowerCase();
        firstChar = s.substring(0,1).toUpperCase();
	postString = s.substring(1,strLen);
	s = firstChar + postString;
    }
return(s);
}
