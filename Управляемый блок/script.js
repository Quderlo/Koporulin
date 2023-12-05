document.addEventListener("DOMContentLoaded", function() {
    // Сам блок
    var block = document.querySelector(".block");

    // Ширина
    var blockWidth = document.querySelector(".left .width_block");

    // Высота
    var blockHeight = document.querySelector(".left .height_block");

    // Цвет
    var blockColorSelect = document.getElementById('blockColorSelect');

    // Границы
    var toggleBorderBtn = document.querySelector(".left .enable_border");
    var borderColorSelect = document.querySelector("#borderColorSelect");
    var borderStyleSelect = document.querySelector("#borderStyleSelect");
    var BorderWidthButton = document.querySelector(".bottom .width_border");

    // Тень
    var shadowColorSelect = document.querySelector("#shadowColorSelect");
    var shadowSidesSelect = document.querySelector("#shadowSidesSelect");

    // Текстк
    var textContent = document.querySelector(".block .text_content")
    var changeTextBtn = document.querySelector(".left .change_text");
    var textPositionBtn = document.querySelector("#textPositionSelect");
    var textAnimationSelect = document.querySelector("#textAnimationSelect");
    var newtext = "";


    // ----------------------------------------БЛОК------------------------------------------- //


    // Ширина блока
    blockWidth.addEventListener("click", function() {
        var widthInput = document.querySelector(".right .width[type='number']")
        block.style.width = widthInput.value + "px";
    });

    // Высота блока
    blockHeight.addEventListener("click", function() {
        var heightInput = document.querySelector(".right .height[type='number']")
        block.style.height = heightInput.value + "px";
    });

    //Цвет блока
    blockColorSelect.addEventListener('change', function() {
        var colorBlock = blockColorSelect.value;
        block.style.backgroundColor = colorBlock;
    });


    // ----------------------------------------ГРАНИЦЫ------------------------------------------- //


    // Включение/Выключение Границ
    toggleBorderBtn.addEventListener("click", function() {
        var currentBorderWidth = parseInt(getComputedStyle(block).borderWidth);
        if (currentBorderWidth !== 0) {
            block.style.borderWidth = "0";
        } else {
            block.style.borderWidth = "1px";
        }
    });

    // Цвет Границ
    borderColorSelect.addEventListener("change", function() {
        var colorBorder = borderColorSelect.value;
        block.style.borderColor = colorBorder;
    });

    // Стиль Границ
    borderStyleSelect.addEventListener("change", function() {
        var styleBorder = borderStyleSelect.value;
        block.style.borderStyle = styleBorder;
    });

    // Ширина Границ
    BorderWidthButton.addEventListener("click", function() {
        var currentBorderWidth = borderWidthInput = document.querySelector(".right .widthBorder[type='number']")
        block.style.borderWidth = currentBorderWidth.value + "px";
    });


    // ----------------------------------------ТЕКСТ------------------------------------------- //
    
    // Список позиций и задание их
    textPositionBtn.addEventListener("change", function () {
        var newPosition = textPositionBtn.value;
        textContent.setAttribute("class", "block_text " + newPosition);
    });
    
    // Добавление повторений текста
    var repetitionCount = 0;
    
    function addRepetitions() {
        if (newtext != "") {
            var newSpan = document.createElement("span");
            newSpan.textContent = newtext;
            newSpan.classList.add("added");
            textContent.appendChild(newSpan);
        }
    }
    
    document.querySelector(".bottom .text_shift_left").addEventListener("click", function () {
        repetitionCount++;
        addRepetitions();
    });
    
    // Удаление повторений текста
    document.querySelector(".bottom .text_shift_right").addEventListener("click", function () {
        if (repetitionCount > 0) {
            var addedSpans = block.querySelectorAll("span.added");
            if (addedSpans.length > 0) {
                addedSpans[addedSpans.length - 1].remove();
            }
        }
    });

    
    // Изменение текста и удаление добавленных блоков
    changeTextBtn.addEventListener("click", function () {
        var textInput = document.querySelector('.bottom .text[type="text"]');
        newtext = textInput.value;
    
        var addedSpans = block.querySelectorAll("span.added");
        for (var i = 0; i < addedSpans.length; i++) {
            addedSpans[i].remove();
        }
    
        repetitionCount = 0; // Сбрасываем значение повторений
    });


    // ----------------------------------------АНИМАЦИИ------------------------------------------- //
    var textAnimationInterval;

    // Включение/выключение анимации текста через Select
    textAnimationSelect.addEventListener("change", function () {
        var animationType = textAnimationSelect.value;
        if (animationType === "none") {
            stopTextAnimation();
        } else {
            startTextAnimation(animationType);
        }
    });

    // Функция для запуска анимации текста
    function startTextAnimation(animationType) {
        stopTextAnimation();
        textAnimationInterval = setInterval(function () {
            var addedSpans = block.querySelectorAll("span.added");
            
            for (var i = 0; i < addedSpans.length; i++) {
                if (animationType === "color") {
                    addedSpans[i].style.color = getRandomColor();
                } else if (animationType === "opacity") {
                    var randomOpacity = Math.random().toFixed(1);
                    addedSpans[i].style.opacity = randomOpacity;
                } else if (animationType === "wave") {
                    textContent.style.animation = "wave-animation 2s infinite";
                    return;
                }
            }
        }, 1000);
    }

    // Функция для остановки анимации текста
    function stopTextAnimation() {
        var addedSpans = block.querySelectorAll("span.added");
        for (var i = 0; i < addedSpans.length; i++) {
            addedSpans[i].style.color = "#000000";
            addedSpans[i].style.opacity = 1;
        }
        textContent.style.animation = "none";
        clearInterval(textAnimationInterval);
    }
    
    // ----------------------------------------ТЕНЬ------------------------------------------- //


    function createShadow() {
        var selectedSides = shadowSidesSelect.value;
        var isTopSelected = selectedSides.includes("top");
        var isBottomSelected = selectedSides.includes("bottom");
        var isLeftSelected = selectedSides.includes("left");
        var isRightSelected = selectedSides.includes("right");
        var newShadowColor = shadowColorSelect.value;
    
        var boxShadowValue = "";
    
        if (isTopSelected) {
            boxShadowValue += "0px -10px 10px " + newShadowColor + ", ";
        }
        if (isBottomSelected) {
            boxShadowValue += "0px 10px 10px " + newShadowColor + ", ";
        }
        if (isLeftSelected) {
            boxShadowValue += "-10px 0px 10px " + newShadowColor + ", ";
        }
        if (isRightSelected) {
            boxShadowValue += "10px 0px 10px " + newShadowColor + ", ";
        }
    
        if (boxShadowValue === "") {
            block.style.boxShadow = "none";
        } else {
            boxShadowValue = boxShadowValue.slice(0, -2);
            block.style.boxShadow = boxShadowValue;
        }
    }
    
    shadowColorSelect.addEventListener("change", createShadow);
    
    shadowSidesSelect.addEventListener("change", createShadow);
    

    // ----------------------------------------ФУНКЦИИ------------------------------------------- //


    // Получение рандомного цвета
    function getRandomColor() {
        var letters = "0123456789ABCDEF";
        var color = "#";
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});