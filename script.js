document.addEventListener('DOMContentLoaded', () => {
    const calculatorScreen = document.querySelector('.calculator-screen');
    const buttons = document.querySelectorAll('button');
    let currentInput = '';
    let previousInput = '';
    let operator = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.value;

            if (button.classList.contains('operator')) {
                if (currentInput !== '' && operator === '') {
                    operator = value;
                    previousInput = currentInput;
                    currentInput = '';
                    updateScreen();
                } else if (currentInput !== '' && operator !== '') {
                    previousInput = calculate(previousInput, currentInput, operator);
                    operator = value;
                    currentInput = '';
                    updateScreen();
                }
            } else if (button.classList.contains('decimal')) {
                if (!currentInput.includes('.')) {
                    currentInput += value;
                    updateScreen();
                }
            } else if (button.classList.contains('all-clear')) {
                currentInput = '';
                previousInput = '';
                operator = '';
                updateScreen();
            } else if (button.classList.contains('equal-sign')) {
                if (previousInput !== '' && currentInput !== '' && operator !== '') {
                    currentInput = calculate(previousInput, currentInput, operator);
                    operator = '';
                    previousInput = '';
                    updateScreen();
                }
            } else {
                currentInput += value;
                updateScreen();
            }
        });
    });

    function calculate(first, second, operator) {
        let result = 0;
        first = parseFloat(first);
        second = parseFloat(second);

        if (operator === '+') {
            result = first + second;
        } else if (operator === '-') {
            result = first - second;
        } else if (operator === '*') {
            result = first * second;
        } else if (operator === '/') {
            result = first / second;
        }

        return result.toString();
    }

    function updateScreen() {
        calculatorScreen.value = `${previousInput} ${operator} ${currentInput}`;
    }
});
