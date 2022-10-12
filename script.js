const numberButton = document.querySelectorAll('.number');
const dotButton = document.querySelector('.dot');
const plusButton = document.querySelector('#key-plus');
const minusButton = document.querySelector('#key-minus');
const multiplyButton = document.querySelector('#key-multiply');
const divideButton = document.querySelector('#key-divide');
const deleteButton = document.querySelector('#key-del');
const resetButton = document.querySelector('#key-reset');
const resultButton = document.querySelector('#key-result');
const currentNumber = document.querySelector('.display-number');
const previousNumber = document.querySelector('.previous-number');
const sliderPosition = document.querySelector('.chosen-theme')
const bodyTheme = document.querySelector('body')

class Calculator {
    constructor(previousNumber, currentNumber) {
        this.previousNumber = previousNumber;
        this.currentNumber = currentNumber;
        this.reset()
    }
    reset() {
        this.currentOperation = ''
        this.previousOperation = ''
        this.calculation = ''
    }
    delete() {
        this.currentOperation = this.currentOperation.slice(0, -1);
    }
    appendNumber(number) {
        this.currentOperation = this.currentOperation + number
    }
    calculationType(calculation) {
        if (this.currentOperation === '') return
        if (this.previousOperation !== '') {
            this.calculate()
        }
        this.calculation = calculation
        this.previousOperation = this.currentOperation
        this.currentOperation = ''
    }
    calculate() {
        let calculation
        const previous = parseFloat(this.previousOperation)
        const current = parseFloat(this.currentOperation)
        if (previous === NaN || current === NaN) return
        switch (this.calculation) {
            case '+':
                calculation = previous + current
                break
            case '-':
                calculation = previous - current
                break
            case '×':
                calculation = previous * current
                break
            case '÷':
                calculation = previous / current
                break
            default:
                return
        }
        if (this.previousOperation === '') {
            return
        } else if (this.currentOperation === '') {
            calculation = this.previousOperation
        }
        this.currentOperation = calculation
        this.operation = ''
        this.previousOperation = ''
    }

    displayedNumber(number) {
        const string = number.toString()
        const integerDigits = parseFloat(string.split('.')[0])
        const decimalDigits = string.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }



    updateDisplay() {
        this.currentNumber.textContent = this.displayedNumber(this.currentOperation)
        if (this.previousOperation === '') {
            this.previousNumber.textContent = this.previousOperation
        } else
            this.previousNumber.textContent = `${this.displayedNumber(this.previousOperation)} ${this.calculation}`
        if ((window.outerWidth > 600)) {
            if (currentNumber.textContent.length >= 15) {
                currentNumber.style.fontSize = '1rem'
            } else currentNumber.style.fontSize = '2rem'
        } else
            if (currentNumber.textContent.length >= 15) {
                currentNumber.style.fontSize = '0.65rem'
            } else currentNumber.style.fontSize = '1rem'
    }
}

const calculator = new Calculator(previousNumber, currentNumber)

numberButton.forEach(number => {
    number.addEventListener('click', () => {
        // if (currentNumber.textContent.length >= 15) {
        //     currentNumber.style.fontSize = '1.35rem'
        // } else currentNumber.style.fontSize = '2rem'
        if (currentNumber.textContent.length >= 19) return
        calculator.appendNumber(number.textContent)
        calculator.updateDisplay()
    })
});

dotButton.addEventListener('click', () => {
    if (currentNumber.textContent.includes('.') === false) {
        calculator.appendNumber(dotButton.textContent)
        calculator.updateDisplay()
    }
});

resetButton.addEventListener('click', () => {
    calculator.reset()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})

resultButton.addEventListener('click', () => {
    calculator.calculate()
    calculator.updateDisplay()
})

operationButton(plusButton)
operationButton(minusButton)
operationButton(multiplyButton)
operationButton(divideButton)

function operationButton(operation) {
    operation.addEventListener('click', () => {
        calculator.calculationType(operation.textContent)
        calculator.updateDisplay()
    })
}

sliderPosition.addEventListener('click', () => {
    if (sliderPosition.classList.contains('chosen-theme-1')) {
        bodyTheme.classList.remove('theme-1')
        bodyTheme.classList.add('theme-2')
        sliderPosition.classList.remove('chosen-theme-1')
        sliderPosition.classList.add('chosen-theme-2')
    } else if (sliderPosition.classList.contains('chosen-theme-2')) {
        bodyTheme.classList.remove('theme-2')
        bodyTheme.classList.add('theme-3')
        sliderPosition.classList.remove('chosen-theme-2')
        sliderPosition.classList.add('chosen-theme-3')
    } else {
        bodyTheme.classList.remove('theme-3')
        bodyTheme.classList.add('theme-1')
        sliderPosition.classList.remove('chosen-theme-3')
        sliderPosition.classList.add('chosen-theme-1')
    }
})




