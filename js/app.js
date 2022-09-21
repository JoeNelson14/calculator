let prevNum = '';
let curNum = '';
let operator = '';
let sum = 0;

const SCREEN = document.querySelector('.screen');
const BUTTONS = document.querySelectorAll('.button');


function setUserInput(currentButton)
{
    if (!isNaN(currentButton) || currentButton === '.') //checks if button click is number
    {
        if (curNum === '')
        {  
            clearScreen();
        }
        curNum += currentButton;
        displayOutput(curNum);
    }
    else if (currentButton === '=')
    {
        //checks if numbers were pressed
        if (prevNum === '' || curNum === '')
        {
            displayOutput('ERROR');
            return;
        }
        clearScreen();
        prevNum = calculate(prevNum, curNum, operator);
    }
    else if (currentButton === '÷' || currentButton === '+' || 
    currentButton === '−' || currentButton === '×')
    {
        if (prevNum === '' && curNum === '')
        {
            return;
        }

        if (prevNum === '')
        {
            prevNum = curNum;
            curNum = '';
        }
        else if (prevNum !== '' & curNum !== '')
        {
            prevNum = calculate(prevNum, curNum, operator);
            curNum = '';
        }
        operator = currentButton;
    }
    else if (currentButton === 'c')
    {
        resetCalc();
    }
    else if (currentButton === '+/-')
    {
        if (curNum > 0)
        {
            curNum = -Math.abs(curNum);
            displayOutput(curNum);
        }
        else
        {
            curNum = Math.abs(curNum);
            displayOutput(curNum);
        }
    }
    else if (currentButton === '%')
    {
         curNum /= 100;
         displayOutput(curNum);
    }
}

function displayOutput(input)
{
    SCREEN.textContent = input;
}

function calculate(prevNum, curNum, operator)
{
    switch(operator) {
        case '+':
            sum = Number(prevNum) + Number(curNum);
            break;
        case '−':
            sum = prevNum - curNum;
            break;
        case '×':
            sum = prevNum *curNum;
            break;
        case '÷':
            if (prevNum == 0 || curNum == 0)
            {
                sum = "That Math Ain't Mathin";
                break;
            }
            sum = prevNum / curNum;
            break;
    }
    displayOutput(sum);
    return sum;
}

function clearScreen()
{
    SCREEN.textContent = '';
}

function resetCalc()
{
    prevNum = '';
    curNum = '';
    operator = '';
    sum = 0;
    clearScreen();
}

for (let button of BUTTONS)
{
    button.addEventListener('click', () => {
        setUserInput(button.textContent);
    });
}