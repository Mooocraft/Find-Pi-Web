var count = 0;
var pi = 0.0;
var op;

var DEBUG = false;
if (!DEBUG) {
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
}

//URL Params don't touch
function getAllUrlParams(url) {

  // get query string from url (optional) or window
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

  // we'll store the parameters here
  var obj = {};

  // if query string exists
  if (queryString) {

    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split('#')[0];

    // split our query string into its component parts
    var arr = queryString.split('&');

    for (var i=0; i<arr.length; i++) {
      // separate the keys and the values
      var a = arr[i].split('=');

      // in case params look like: list[]=thing1&list[]=thing2
      var paramNum = undefined;
      var paramName = a[0].replace(/\[\d*\]/, function(v) {
        paramNum = v.slice(1,-1);
        return '';
      });

      // set parameter value (use 'true' if empty)
      var paramValue = typeof(a[1])==='undefined' ? true : a[1];

      // (optional) keep case consistent
      paramName = paramName.toLowerCase();
      paramValue = paramValue.toLowerCase();

      // if parameter name already exists
      if (obj[paramName]) {
        // convert value to array (if still string)
        if (typeof obj[paramName] === 'string') {
          obj[paramName] = [obj[paramName]];
        }
        // if no array index number specified...
        if (typeof paramNum === 'undefined') {
          // put the value on the end of the array
          obj[paramName].push(paramValue);
        }
        // if array index number specified...
        else {
          // put the value at that index number
          obj[paramName][paramNum] = paramValue;
        }
      }
      // if param name doesn't exist yet, set it
      else {
        obj[paramName] = paramValue;
      }
    }
  }
  return obj;
}

function UrlDirect() {
  window.location.assign(`${window.location.href}save?pi=${pi}&count=${count}&operator=${op}`);
}

function setup() { 
  //count = 2;
  //pi = 3;
  //op = true;
  noCanvas();
  var tempPi = getAllUrlParams().pi;
  var tempCount = getAllUrlParams().count;
  var tempOp = getAllUrlParams().operator;
  if (tempPi == null || tempCount == null || tempOp == null) {
  	count = 2;
  	pi = 3;
  	op = true;
  }else {
  	pi = tempPi;
  	count = tempCount;
  	op = tempOp;
  }
  //console.log(pi);
  //console.log(pi + 7);
  //console.log(split(strgPi, '.'));
} 

function draw() {
	background(0, 128, 0);
	if (op) {
		pi = pi*1 + (4/(count * (count + 1) * (count + 2)));
		op = false;
		console.log(pi);
		//console.log(countAlg);
	}else if (op == false) {
		pi = pi - 4/(count * (count + 1) * (count + 2));
		op = true;
    }
    count++;
    count++;
    //console.log(pi);
    document.getElementById("h1").innerHTML = pi;
}
