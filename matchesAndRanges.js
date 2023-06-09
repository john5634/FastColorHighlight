function appendMatchHtml(classToAppend) {
	numberOfDivs = document.getElementsByClassName(classToAppend).length
	var counthtml = numberOfDivs;

	var html = `
	<div class="match-div" class="column" style="border-style: solid;" id="user-input-${counthtml}">
	<button id=${counthtml} class=c${counthtml} onclick="addSpansToHTML(getArrayOfInput(${counthtml}),'output')">Highlight</button>
	<br>
	  <label>Start:</label>
	  <input class="message-type-inputs" id="start-${counthtml}" type="text" oninput="">
	  <div class="row">
	    <div class="column">
	      <label>Length:</label>
	      <input id="length-${counthtml}" class="tag-field segStart" data-autosize-input='{ "space": 5 }' oninput=""</input>
	    </div>
	  </div>
	  <label>Description:</label>
	  <input class="message-type-inputs" id="desc-${counthtml}" type="text" oninput="">
			
	</div>`;

	document.getElementsByClassName(classToAppend)[numberOfDivs-1].insertAdjacentHTML('afterEnd', html);
}

function addHTMLAfter(idToAppendTo,htmlToAppend){
	document.getElementById(idToAppendTo).insertAdjacentHTML('afterEnd', htmlToAppend);
}

function getArrayOfInput(id){
	var startVal = document.getElementById("start-"+id).value;
	var lengthVal = document.getElementById("length-"+id).value;
	var objOut= {"start":+startVal,"length":+lengthVal,"color":+id};
return [objOut]
}

function getArrayOfAll(allElements){
	var startVal
	var lengthVal
	var arrOut = [];
	var allElements = document.getElementsByClassName(allElements);
		for (let i = 1;i < allElements.length; i++){
		id = i;
		startVal = document.getElementById("start-"+id).value;
		lengthVal = document.getElementById("length-"+id).value;
		arrOut.push({"start":+startVal,"length":+lengthVal,"color":+id});	
		}
		console.log(arrOut);
return arrOut;
}