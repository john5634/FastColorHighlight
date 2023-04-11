// When the worker receives a message do this:
onmessage = function(e) {
  if (e.data.workerID != 0){
    var newRanges = offsetToZero(e.data.ranges);
  } else {
    var newRanges = e.data.ranges;
  }
  var markedString = addSpansToHTML(newRanges,e.data.stringToProccess,e.data.colorTracker,e.data.alternate,e.data.color);
  var proccessedObj = {
    newString: markedString,
    id: e.data.workerID,
    markRanges: e.data.ranges,
  }
  postMessage(proccessedObj);
}
// Function To splice a string (SUPER slowww, hence the need for a worker)
String.prototype.splice = function(index, string) {
  if (index > 0) {
    return this.substring(0, index) + string + this.substr(index);
  }
  return string + this;
};
// Modifies each set of objects so that they start at 0 (since each is operating in a worker, each chunk will start at 0)
function offsetToZero(arrayWithObjects){
  var subtractor = arrayWithObjects[0].start;
  for (var i = 0; i<arrayWithObjects.length; i++){
    arrayWithObjects[i].start = (arrayWithObjects[i].start-subtractor);
  }
  return arrayWithObjects;
}
// Inserts desiered string at a given index into a string
function addSpansToHTML(markRangeInput, stringToAddMark, colorTracker, alternate, color){
  if (alternate == "true"){
  var startOfElement = "<mark class='altCol'>";
    } else {
  var startOfElement = "<mark class='c" + color + "'>";
    }
  var startOfElementAlt = "<mark class='c" + color + "'>";
  var endOfElement = "</mark>";

  var tmpresult = stringToAddMark;
  var trackerVal = 0;
  for(var i = 0 ; i < markRangeInput.length;i++){

    if (colorTracker === "even" || colorTracker === ""){
      if (i % 2 == 0){
      tmpresult = tmpresult.splice((markRangeInput[i].start+trackerVal), startOfElement);
      trackerVal += startOfElement.length;
    } else {
      tmpresult = tmpresult.splice((markRangeInput[i].start+trackerVal), startOfElementAlt);
      trackerVal += startOfElementAlt.length;
    }
  } else {
    if (i % 2 == 0){
    tmpresult = tmpresult.splice((markRangeInput[i].start+trackerVal), startOfElementAlt);
    trackerVal += startOfElementAlt.length;
  } else {
    tmpresult = tmpresult.splice((markRangeInput[i].start+trackerVal), startOfElement);
    trackerVal += startOfElement.length;
  }
  }
    tmpresult = tmpresult.splice((markRangeInput[i].start+(markRangeInput[i].length)+trackerVal), endOfElement);
    trackerVal += endOfElement.length;
  }
  tmpresult = escapeHtml(tmpresult);
  tmpresult = tmpresult.replaceAll(escapeHtml(startOfElementAlt),startOfElementAlt);
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
