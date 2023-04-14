// Inserts desiered string at a given index into a string



function addSpansToHTML(arrayOfStartLensAndColors, divIDToMod){
  var startOfElement;
  var endOfElement = "</mark>";
  var startElements =[];

  var tmpresult = document.getElementById(divIDToMod).innerText;
  var trackerVal = 0;
  for(var i = 0 ; i < arrayOfStartLensAndColors.length;i++){
	  startOfElement = "<mark class='c" + arrayOfStartLensAndColors[i].color + "'>";
	  startElements.push(startOfElement);
      tmpresult = tmpresult.splice((arrayOfStartLensAndColors[i].start+trackerVal), startOfElement);
      trackerVal += startOfElement.length;

    tmpresult = tmpresult.splice((arrayOfStartLensAndColors[i].start+(arrayOfStartLensAndColors[i].length)+trackerVal), endOfElement);
    trackerVal += endOfElement.length;
  }
  console.log(tmpresult);
  tmpresult = escapeHtml(tmpresult);
  for(var i = 0 ; i < startElements.length;i++){
	  tmpresult = tmpresult.replaceAll(escapeHtml(startElements[i]),startElements[i]);
  }
  tmpresult = tmpresult.replaceAll(escapeHtml(endOfElement),endOfElement);
  console.log(tmpresult);
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