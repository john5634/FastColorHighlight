// Global workers to improve repeated highlighting by .5-1.5 seconds it takes to spawn workers
var fHworker = [];
// Global html of div before highlight (this must be updated by your code, will be set once per highlight)
var elementBeforeHighlight;
// Global to keep track of what was highlighted
var idToHighlight;
// Global debug option for the library
var debug = 1;
// Global path to the worker file, must be full path (not relative)
var pathToWorker = 'FH_worker.js';
// One worker to avoid the .5 sec it takes to spin up workers. (if only one worker is needed)
fHworker[0] =new Worker(pathToWorker);

function highlightRanges(divId,divValue = null,ranges,alternate = "false", color){
  if (ranges.length < 200){
      numberOfThreads = 1;
      if (debug == 1){console.log("1 thread used")}
      chunkAndSendToWorker(divId, divValue, ranges, numberOfThreads, alternate, color);
  } else if (ranges.length >= 200 && ranges.length < 4000){
      numberOfWorkersCalculated = Math.trunc(ranges.length/200);
      if (debug == 1){console.log("threads calculated:" + numberOfWorkersCalculated)}
      numberOfThreads = setUpWorkers(numberOfWorkersCalculated);
      chunkAndSendToWorker(divId, divValue, ranges, numberOfThreads, alternate, color);
  } else {
      numberOfWorkersCalculated = 20;
      if (debug == 1){console.log("20 thread used")}
      numberOfThreads = setUpWorkers(numberOfWorkersCalculated);
      chunkAndSendToWorker(divId, divValue, ranges, numberOfThreads, alternate, color);
  }
}

function setUpWorkers(numberOfWorkersCalculated){
  if (numberOfWorkersCalculated == fHworker.length){
    return fHworker.length;
  } else if (numberOfWorkersCalculated > fHworker.length){
    var numOfThreadNeeded = numberOfWorkersCalculated - fHworker.length;
      for(var i = fHworker.length - 1; i < numOfThreadNeeded; i++){
        fHworker[i] = new Worker(pathToWorker);
      }
      return fHworker.length;
  } else if (numberOfWorkersCalculated < fHworker.length){
      //var numOfThreadNeeded = fHworker.length - numberOfWorkersCalculated ;
        for(var i = fHworker.length - 1; i > numberOfWorkersCalculated +1; i--){
          fHworker[i].terminate();
          fHworker.pop();
        }
        return fHworker.length;
  } else {
    return fHworker.length;
  }
}
// Prepares chunks and objects to send to workers
function chunkAndSendToWorker(divToHighlight, divValue, rangesToHighlight, numberOfChunks, alternateColor,color){
  var arrayOfObjs = [];

  idToHighlight = divToHighlight;
  elementBeforeHighlight = document.getElementById(divToHighlight).innerHTML;
  if (divValue == null) {
    var stringToHighlight = document.getElementById(divToHighlight).value;
  } else {
    var stringToHighlight = divValue;
  }
  var chunkedMarkRanges = chunkify(rangesToHighlight, numberOfChunks, true);
  if (debug == 1){console.log("%cChunked ranges to be passed to each worker:", "color: limegreen;font-weight: bold");console.log(chunkedMarkRanges);}
    for(var i = 0;i < chunkedMarkRanges.length;i++){
      if (i ==0){
        var startOfRange = 0;
      } else{
        var startOfRange = chunkedMarkRanges[i][0].start;
      }

      if (i ==(chunkedMarkRanges.length-1)){
        var endOfRange = stringToHighlight.length;
      } else{
        var endOfRange = (chunkedMarkRanges[i+1][0].start)
      }
      var lastEvenOrOdd;
      if (i > 0){
        if (chunkedMarkRanges[i-1] % 2 == 0){
          lastEvenOrOdd = "even";
        } else {
          lastEvenOrOdd = "odd";
        }
      }
      // This creates the object to send to each worker
      var objForWorker = {
        workerID: i,
        ranges: chunkedMarkRanges[i],
        stringToProccess: stringToHighlight.substring(startOfRange,endOfRange),
        colorTracker: lastEvenOrOdd,
        alternate: alternateColor,
		color: color
      }
  arrayOfObjs.push(objForWorker);
    }
      if (debug == 1){ console.log("%cArrays of objects passed to workers: ", "color: cyan;font-weight: bold") ;console.log(arrayOfObjs);}
    postToWorkers(arrayOfObjs);
}

// Posts objects to the workers (substring,chunk of ranges, and an id for recombination later)
function postToWorkers(arrayOfObjs){
  var workerReturnCount = 0;
    var markedObjs = [];
  for(var i = 0; i < arrayOfObjs.length; i++){

    fHworker[i].onmessage = function(e) {
      markedObjs.push(e.data);
      workerReturnCount++;
      if (debug == 1){console.log("%cData returned from worker: " + e.data.id,"color: Aquamarine;font-weight: bold");console.log(e.data);}

      if (workerReturnCount == arrayOfObjs.length){
        var newSorted = markedObjs.sort(function(a, b) {return (a.id - b.id);})
        var allHtml = "";
        for(var i = 0 ; i< newSorted.length;i++){
          allHtml += newSorted[i].newString;
        }
        if (debug == 1){console.log("%cFully highlighted html: ", "color: HotPink;font-weight: bold");console.log([allHtml]);}
        document.getElementById(idToHighlight).innerHTML = allHtml;
      }
    }
    fHworker[i].postMessage(arrayOfObjs[i]);
  }
  if (debug == 1){ console.log("%cHighlighted return objects", "color: yellow;font-weight: bold") ;console.log(markedObjs);}

}

// Chunks up an array of objects evenly if possible
function chunkify(a, n, balanced) {
    if (n < 2)
        return [a];
    var len = a.length,
            out = [],
            i = 0,
            size;
    if (len % n === 0) {
        size = Math.floor(len / n);
        while (i < len) {
            out.push(a.slice(i, i += size));
        }
    }
    else if (balanced) {
        while (i < len) {
            size = Math.ceil((len - i) / n--);
            out.push(a.slice(i, i += size));
        }
    }
    else {
        n--;
        size = Math.floor(len / n);
        if (len % size === 0)
            size--;
        while (i < size * n) {
            out.push(a.slice(i, i += size));
        }
        out.push(a.slice(size * n));
    }
    return out;
}

// Helper function to terminate all running workers
function terminateWorkers(){
  for(var i = 0; i < fHworker.length;i++){
    fHworker[i].terminate();
  }
}
// Sets div to elementBeforeHighlight global (elementBeforeHighlight needs to be managed and updated in your code)
function unHighlight(divToUnHighlight){
  if (!elementBeforeHighlight || !divToUnHighlight){
    return;
  }
  document.getElementById(divToUnHighlight).innerHTML = elementBeforeHighlight;
}
