class Calculator {
    constructor(previous, current) {
        this.previous = previous
        this.current = current
        this.clear()
    }
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    delete() {
this.currentOperand=this.currentOperand.toString().slice(0,-1)
    }
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
        
    }
    compute() {
        let calculate
        const prev=parseFloat(this.previousOperand)
        const current=parseFloat(this.currentOperand)
        if(isNaN(prev)||isNaN(current))
        return
        switch(this.operation)
        {
            case '+':
            calculate=prev+current
            break
            case '-':
                calculate=prev-current
                break
                case '*':
                    calculate=prev*current
                    break
                    case '/':
                    calculate=prev/current
                    break
                    default:
                        return
        }
        this.currentOperand=calculate
        this.operation=undefined
        this.previousOperand=""
    }
    updateDisplay() {
        this.current.innerText = this.getDisplayNumber(this.currentOperand)
        if(this.operation !=null){
        this.previous.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }
        else{
            this.previous.innerText=""
        }
    }
    getDisplayNumber(number)
{
    const string=number.toString()
    const integer=parseFloat(string.split('.')[0])
    const decimal=string.split('.')[1]
    let integerDisplay
    if(isNaN(integer)){
        integerDisplay=''
    }else{
        integerDisplay=integer.toLocaleString('en',{maximumFractionDigits:0})
    }
    if(decimal!=null){
        return `${integerDisplay}.${decimal}`
    }else {
        return integerDisplay
    }
}
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButtons = document.querySelector('[data-equals]')
const deleteButtons = document.querySelector('[data-delete]')
const clearButtons = document.querySelector('[data-clear]')
const previous = document.querySelector('[data-previous-operand]')
const current = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previous, current)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

clearButtons.addEventListener('click',button=>{
    calculator.clear()
    calculator.updateDisplay()
})
deleteButtons.addEventListener('click',button=>{
    calculator.delete()
    calculator.updateDisplay()
})
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})
equalsButtons.addEventListener('click',button =>{
    calculator.compute()
    calculator.updateDisplay()
})
