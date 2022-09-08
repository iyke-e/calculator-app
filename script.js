// javascript for toggle theme

const theme1 = document.querySelector("#theme1");
const theme2 = document.querySelector("#theme2");
const theme3 = document.querySelector("#theme3");

theme1.addEventListener('change', () => {
    document.body.className = '';

});
theme2.addEventListener('change', () => {
    document.body.className = '';
    document.body.classList.add('theme2');
});
theme3.addEventListener('change', () => {
    document.body.className = '';
    document.body.classList.add('theme3');
});

// javascript for calculator calculations

class Calculator {
    constructor(inputText, resultText) {
        this.inputText = inputText;
        this.resultText = resultText;
        this.clear()
    }
    clear() {
        this.input = '';
        this.result = '';
        this.operation = undefined;
    }


    delete() {
        this.result = this.result.toString().slice(0, -1);
    }
    appendNumber(number) {
        if (number === "." && this.result.includes(".")) return
        this.result = this.result.toString() + number.toString()
    }
    chooseOperation(operation) {
        if (this.result === '') return;
        if (this.input !== '') {
            this.compute()
        }
        this.operation = operation
        this.input = this.result
        this.result = ''
    }
    compute() {
        let computation
        const prev = parseFloat(this.input)
        const current = parseFloat(this.result)
        if (isNaN(prev) || isNaN(current)) return

        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '/':
                computation = prev / current
                break
            case 'x':
                computation = prev * current
                break
            default:
                return

        }
        this.result = computation
        this.operation = undefined
        this.input = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const intergerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let intergerDisplay
        if (isNaN(intergerDigits)) {
            intergerDisplay = ''
        } else {
            intergerDisplay = intergerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${intergerDisplay}.${decimalDigits}`
        } else {
            return intergerDisplay
        }
    }
    updateDisplay() {
        this.resultText.innerText =
            this.getDisplayNumber(this.result);

        if (this.operation != null) {
            this.inputText.innerText =
                `${this.getDisplayNumber(this.input)} ${this.operation}`
        } else {
            this.inputText.innerText = ''
        }
    }

}

const numberButton = document.querySelectorAll('[data-number]');
const operationsButton = document.querySelectorAll('[data-operation]');
const resetButton = document.querySelector("[data-reset]");
const deleteButton = document.querySelector("[data-delete]");
const equalButton = document.querySelector("[data-equals]");
const inputText = document.querySelector("[data-input-text]");
const resultText = document.querySelector("[data-result-text]");

const calculator = new Calculator(inputText, resultText);

numberButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay()
    })
})

operationsButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay()
})

resetButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})