//constants
var pi = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989";
var shortpi = "3.14159";
var lcAlphabet = "abcdefghijklmnopqrstuvwxyz";
var UCAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var fullAlphabet = lcAlphabet + UCAlphabet;
var nl = "<br>";

//command list
var commandAssociationsChars = [","    ,"."     ,"+"  ];
var commandAssociations      = ["comma","period","add"]
var commands = ["T", "F", "a", "X", "Y", "Z", "x", "y", "z", "p"] + commandAssociationsChars;
var digits = ".1234567890¹²³⁴⁵⁶⁷⁸⁹⁰"

//other
var pConsole = $("#output");
var running = true;
var codeIndex = 0;
var iterations = 0;

//program specific
var stack = [];
var prog;
var pX = 2;
var pY = 100;
var pZ = -1;

//run
$("#run").click(function() {
  //reset variables
  stack = [];
  var prog = $("#code").val();
  running = true;

  //clean console from last run
  pConsole.empty();


  while(running) {
    var currentChar = prog.charAt(0);
    if(commandAssociationsChars.indexOf(currentChar) != -1) { //if the char is an associative command
      evaluate(commandAssociations[commandAssociationsChars.indexOf(currentChar)])();
      prog = strip(prog, 1);
    }
    else if (digits.indexOf(currentChar) != -1) { //if the char is a digit
      var num = currentChar;
      var n = 1;
      while (digits.indexOf(prog.charAt(n)) != -1) {
        num = num + String(prog.charAt(n));
        n++;
        if (n > 15) {break;}
      }
      prog = strip(prog, num.length);
      stack.push(num);
    }
    else if (currentChar == "'") { //if the char is a char char
      stack.push(prog.charAt(1));
      prog = strip(prog, 2);
    }
    else if (commands.indexOf(currentChar) != -1) { //if the command is in the commands
      evaluate(currentChar);
      prog = strip(prog, 1);
    }
    else {
      prog = strip(prog, 1);
    }
    if (prog.length <= 0 || iterations >= 100) {
      running = false;
    }
    iterations++;
  }

  pConsole.append("Stack:" + stack);
});

// various functions
function StackPop() {
  if(stack.length != 0) {
    return stack.pop();
  }
  return 0;
}

function isPrime(j) {
  var p = true;
  for (i = 2; i < j - 1; i++) {
    if (j % i == 0) {
      p = false;
    }
  }
  return p;
}

function strip(s, l) {
  return s.substring(l);
}

function evaluate(c) {
  window[c]();
}

// commands
function T() {
  stack.push(10);
}

function F() {
  var v = StackPop();
  console.log(v);
  pConsole.append(v + nl);
}

function a() {
  stack.push(lcAlphabet);
}

function p() {
  if (isPrime(StackPop())) {
    stack.push(1);
  }
  else {
    stack.push(0);
  }
}

function x() {
  pX = StackPop();
}

function y() {
  pY = StackPop();
}

function z() {
  pZ = StackPop();
}

function X() {
  stack.push(pX);
}

function Y() {
  stack.push(pY);
}

function Z() {
  stack.push(pZ);
}
