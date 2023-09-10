let selectedSign = '';

function setOperation(sign) {
    selectedSign = sign;
    document.getElementById("displayedSign").value = selectedSign;
}

function selectedLine() {
    if (selectedSign == "")
        return true
    else return false
}

function insertInput(number) {
    if (selectedLine()) {
        if (number == 0) {
            if (document.getElementById("num1").value == "") {
                return
            } else document.getElementById("num1").value += number
        }
        else 
            if ((document.getElementById("num1").value[0] == "0") && (document.getElementById("num1").value[1] != "."))
                document.getElementById("num1").value = number;
            else
                document.getElementById("num1").value += number;
    }   
    else 
        if (number == 0) {
            if (document.getElementById("num2").value == "") {
                return
            } else document.getElementById("num2").value += number
        }
        else
            if (document.getElementById("num2").value[0] == "0" && document.getElementById("num2").value[1] != ".")
                document.getElementById("num2").value = number;
            else
                document.getElementById("num2").value += number;
}

function deleteSelectedLine() {
    if (selectedLine())
        document.getElementById("num1").value = "";
    else 
        document.getElementById("num2").value = "";
}

function deleteAllLines() {
    document.getElementById("num1").value = "";
    document.getElementById("num2").value = "";
    selectedSign = "";
    document.getElementById("displayedSign").value = "";
}

function deleteSymbol() {
    if (selectedLine()) {
        var num1Value = document.getElementById("num1").value;
        num1Value = num1Value.slice(0, -1);
        document.getElementById("num1").value = num1Value;
    } else {
        var num2Value = document.getElementById("num2").value;
        num2Value = num2Value.slice(0, -1);
        document.getElementById("num2").value = num2Value;
    }
}

function changePlusMinus() {
    if (selectedLine())
        document.getElementById("num1").value *= -1;
    else document.getElementById("num2").value *= -1;
}

function calculate(x, y) {
    x = Number (x);
    y = Number (y);
    switch (selectedSign) {
        case '+' : showResult(x + y);
            break;
        case '-' : showResult(x - y);
            break;
        case '×' : showResult(x * y);
            break;
        case '÷' : 
            if (y == 0) { 
                alert("Деление на ноль невозможно");
                return
            }
            else showResult(x / y);
            break;
        case '%' : showResult(x % y);
            break;
        case '√x' : showResult(Math.pow(x,1/y));
            break;
        case 'xⁿ' : showResult(Math.pow(x,y));
            break;
        default : {
            alert("Вы не выбрали операцию!");
            return
        }
    }
}

function showResult(result) {
    document.getElementById("num1").value = result;
    document.getElementById("num2").value = "";
    selectedSign = "";
    document.getElementById("displayedSign").value = "";
}