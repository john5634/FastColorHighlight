# FastHighlight

Fast Highlight is a javaScript library that enables very fast highlighting of text

## Installation

1. Add FH_Driver.js, FH_worker.js, and FH_style.css to your web repo
2. Add the script import for FH_Driver in your index.html
3. Update the path to the worker file to the absolute path in your web repo

```javascript
var pathToWorker = '/FH_worker.js'; // <-- update this to the full path
```

4. Add css from FH_style.css to your project css
5. Optionally.... you may tweak the RGB values to change the colors 
```javascript
mark.defCol {
  background-color: rgb(116, 196, 255); // <-- Tweak these
  color: black;
}

mark.altCol {
  background-color: rgb(198, 227, 255); // <-- Tweak these
  color: black;
}
```

## Usage

```javascript
// Required parameters for library

// ID of the div to highlight
var divId = 'test';

//Ranges to highlight (must be in this format)
var ranges= [{start: 10, length: 20},{start: 31, length: 20},{start: 52, length: 20}];

// Optional parameters, will be set to these values if not passed into highlightRanges()
var numberOfThreads = 20;
var alternate = "true";

// Call to lib:
highlightRanges(divId,ranges,numberOfThreads,alternate);
```

## License
MIT
