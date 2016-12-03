//constants
var pi = "3.141592653589793"
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
      evaluateCode(commandAssociations[commandAssociationsChars.indexOf(currentChar)]);
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
      evaluateCode(currentChar);
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

function evaluateCode(c) {
  window[c]();
}

// commands
function add() {
  stack.push(StackPop() + StackPop());
}

function T() {
  stack.push(10);
}

function comma() {
  var v = StackPop();
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
