// Inserts desiered string at a given index into a string

function addSpansToHTML(arrayOfStartLensAndColors, divIDToMod){
  
    
  var endOfElement = "</mark>";

  var tmpresult = document.getElementById(divIDToMod).innerText;
  var trackerVal = 0;
  for(var i = 0 ; i < arrayOfStartLensAndColors.length;i++){
	  var startOfElement = "<mark class='c" + arrayOfStartLensAndColors[i].color + "'>";
      tmpresult = tmpresult.splice((arrayOfStartLensAndColors[i].start+trackerVal), startOfElement);
      trackerVal += startOfElement.length;

    tmpresult = tmpresult.splice((arrayOfStartLensAndColors[i].start+(arrayOfStartLensAndColors[i].length)+trackerVal), endOfElement);
    trackerVal += endOfElement.length;
  }
  tmpresult = escapeHtml(tmpresult);
  tmpresult = tmpresult.replaceAll(escapeHtml(startOfElement),startOfElement);
  tmpresult = tmpresult.replaceAll(escapeHtml(endOfElement),endOfElement);
  
  document.getElementById(divIDToMod).innerHTML = tmpresult;
  
  //return tmpresult;
}

// Function To splice a string (SUPER slowww, hence the need for a worker)
String.prototype.splice = function(index, string) {
  if (index > 0) {
    return this.substring(0, index) + string + this.substr(index);
  }
  return string + this;
};

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

	return text.toString().replace(/[$<>"']/g, function(m) {
		return map[m];
	});
}