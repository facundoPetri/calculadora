function add(a, b) {
    return parseInt(a) + parseInt(b)
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    if (b === 0) {
        return 'Infinity'
    }
    let n = (a / b)
    return `${parseFloat(n.toFixed(7))}`
}

function operate(operator, a, b) {
    if (operator != '+' && operator != '-' && operator != '*' && operator != '/') {
        return 'error'
    }
    if (operator == '+') {
        return add(a, b)
    } else if (operator == '-') {
        return subtract(a, b)
    } else if (operator == '*') {
        return multiply(a, b)
    } else {
        return divide(a, b)
    }
}

const buttons = document.querySelectorAll('button')
const display = document.querySelector('.display')

buttons.forEach(button => button.addEventListener('click', populate))

const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
}

function resetCalc() {
    displayValue = '0'
    firstOperand = null
    waitingForSecondOperand = false
    operator = null
}


let { displayValue, firstOperand, waitingForSecondOperand, operator } = calculator
function populate(e) {
    const { target } = e
    if (target.classList.contains('operator')) {
        if (target.value == 'C') {
            display.value = '0'
            resetCalc(calculator)
            return
        } else if (target.value == '=' && display.value != '') {
            if (waitingForSecondOperand == true ) {
                display.value = operate(operator, firstOperand, displayValue)
                resetCalc()
                return
            }
            return
        } else {
            display.value = ''
            if (waitingForSecondOperand == true) {
                firstOperand = operate(operator, firstOperand, displayValue)
                operator = target.value
                return
            }
            firstOperand = displayValue
            operator = target.value
            waitingForSecondOperand = true
            return
        }
    }
    display.value === '0' ? display.value = target.value : display.value += target.value
    displayValue = display.value
}
