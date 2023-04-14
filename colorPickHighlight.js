// Inserts desiered string at a given index into a string
function addSpansToHTML(markRangeInput, stringToAddMark, color){
  var startOfElement = "<mark class='c" + color + "'>";
    
  var endOfElement = "</mark>";

  var tmpresult = stringToAddMark;
  var trackerVal = 0;
  for(var i = 0 ; i < markRangeInput.length;i++){

      tmpresult = tmpresult.splice((markRangeInput[i].start+trackerVal), startOfElement);
      trackerVal += startOfElement.length;

    tmpresult = tmpresult.splice((markRangeInput[i].start+(markRangeInput[i].length)+trackerVal), endOfElement);
    trackerVal += endOfElement.length;
  }
  tmpresult = escapeHtml(tmpresult);
  tmpresult = tmpresult.replaceAll(escapeHtml(startOfElement),startOfElement);
  tmpresult = tmpresult.replaceAll(escapeHtml(endOfElement),endOfElement);
  return tmpresult;
}
// Replaces HTML Special Characters with their equivalanet code for display in text fields
function escapeHtml(text) {
	var map = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#039;',
		"$": '&dollar;'
	};

	return text.replace(/[$<>"']/g, function(m) {
		return map[m];
	});
}