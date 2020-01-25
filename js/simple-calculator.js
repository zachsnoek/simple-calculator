/*
    if a number has been added
        if there's nothing on the stack, add the number
        if there is one number on the stack, clear the stack and add the number
        if there's a value for the operator (and a number on the stack), compute that value,
            push new value onto the stack

    if an operator has been clicked
        if there's nothing on the stack, don't set value of operator
        if there's one operand on the stack, set the value of operator

*/

var memory = [];
var operator = "";

addEventListeners();

function addEventListeners() {
    $(".number").click(numberPressed);
    $(".operator").click(operatorPressed);
    $(".clear").click(clearPressed);
}

function numberPressed(event) {
    var n = Number(this.getAttribute("value"));

    if (memory.length == 1 && operator === "") {
        memory.pop();
        operator = "";
    }
    memory.push(n);

    if (memory.length == 2) {
        calculate();
    } else {
        updateDisplay(n);
    }
}

function operatorPressed() {
    if (memory.length == 1) {
        operator = this.getAttribute("value");
    }
}

function clearPressed() {
    memory = [];
    updateDisplay(0);
}

function calculate() {
    var newValue;
    var op2 = memory.pop();
    var op1 = memory.pop();

    switch (operator) {
        case "+":
            newValue = op1 + op2; break;
        case "-":
            newValue = op1 - op2; break;
        case "*":
            newValue = op1 * op2; break;
        case "/":
            if (op2 == 0) {
                newValue = 0;
            } else {
                newValue = op1 / op2;
            }
            break;
        default: break;
    }

    memory.push(newValue);
    updateDisplay(newValue);
    operator = "";
}

function updateDisplay(n) {
    $(".display h1").text(n);
}