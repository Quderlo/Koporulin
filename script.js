let selectedSign = '';

function setOperation(sign) {
    selectedSign = sign;
}

function calculate(x, y) {
    x = Number (x);
    y = Number (y);
    switch (selectedSign) {
        case '+' : alert(x + y);
            break;
        case '-' : alert(x - y);
            break;
        case '*' : alert(x * y);
            break;
        case '/' : 
            if (y == 0) 
                alert("Деление на ноль невозможно");
            else alert(x / y);
            break;
        case '%' : alert(x % y);
            break;
        case '√x' : alert(Math.pow(x,1/y));
            break;
        case 'xⁿ' : alert(Math.pow(x,y));
            break;
        default : alert("Вы не выбрали операцию!");
    }
    selectedSign = "";
}

//Math.sqrt(x)