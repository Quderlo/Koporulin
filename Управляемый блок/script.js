document.addEventListener("DOMContentLoaded", function() {
    // Сам блок
    var block = document.querySelector(".block");

    // Ширина
    var decreaseWidthBtn = document.querySelector(".left .width_block");
    var increaseWidthBtn = document.querySelector(".right .width_block");

    // Высота
    var decreaseHeightBtn = document.querySelector(".left .height_block");
    var increaseHeightBtn = document.querySelector(".right .height_block");

    // Цвет
    var randomColorBtn = document.querySelector(".both .color_block");

    // Границы
    var toggleBorderBtn = document.querySelector(".left .enable_border");
    var borderColorBtn = document.querySelector(".bottom .color_border");
    var borderStyleBtn = document.querySelector(".bottom .style");
    var decreaseBorderWidthBtn = document.querySelector(".bottom .width_border");
    var increaseBorderWidthBtn = document.querySelector(".right .width_border");

    // Тень
    var enableShadowBtn = document.querySelector(".left .enable_shadow");
    var changeShadowBtn = document.querySelector(".right .change_shadow");

    // Текстк
    var blockText = document.querySelector(".block_text");
    var textContent = document.querySelector(".block .text_content")
    var changeTextBtn = document.querySelector(".left .change_text");
    var textPositionBtn = document.querySelector(".right .text_position");
    var enableTextAnimationsBtn = document.querySelector(".left .enable_text_animations");
    var changeTextAnimationsBtn = document.querySelector(".right .change_text_animations");


    // ----------------------------------------БЛОК------------------------------------------- //


    // Ширина блока
    decreaseWidthBtn.addEventListener("click", function() {
        var currentWidth = parseInt(getComputedStyle(block).width);
        block.style.width = (currentWidth - 10) + "px";
    });

    // Ширина блока
    increaseWidthBtn.addEventListener("click", function() {
        var currentWidth = parseInt(getComputedStyle(block).width);
        block.style.width = (currentWidth + 10) + "px";
    });

    // Высота блока
    decreaseHeightBtn.addEventListener("click", function() {
        var currentHeight = parseInt(getComputedStyle(block).height);
        block.style.height = (currentHeight - 10) + "px";
    });

    // Высота блока
    increaseHeightBtn.addEventListener("click", function() {
        var currentHeight = parseInt(getComputedStyle(block).height);
        block.style.height = (currentHeight + 10) + "px";
    });

    //Цвет блока
    randomColorBtn.addEventListener("click", function() {
        var randomColor = getRandomColor();
        block.style.backgroundColor = randomColor;
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
    borderColorBtn.addEventListener("click", function() {
        var randomColor = getRandomColor();
        block.style.borderColor = randomColor;
    });

    // Стиль Границ
    borderStyleBtn.addEventListener("click", function() {
        var styles = ["solid", "dashed", "dotted"];
        var randomStyle = styles[Math.floor(Math.random() * styles.length)];
        block.style.borderStyle = randomStyle;
    });

    // Ширина Границ
    decreaseBorderWidthBtn.addEventListener("click", function() {
        var currentBorderWidth = parseInt(getComputedStyle(block).borderWidth);
        if (currentBorderWidth > 1) {
        block.style.borderWidth = (currentBorderWidth - 1) + "px";
        }
    });

    // Ширина Границ
    increaseBorderWidthBtn.addEventListener("click", function() {
        var currentBorderWidth = parseInt(getComputedStyle(block).borderWidth);
        block.style.borderWidth = (currentBorderWidth + 1) + "px";
    });


    // ----------------------------------------ТЕКСТ------------------------------------------- //
    
    // Список позиций и задание их
    textPositionBtn.addEventListener("click", function () {
        var positions = [
        "top-left",
        "top-center",
        "top-right",
        "middle-left",
        "middle-center",
        "middle-right",
        "bottom-left",
        "bottom-center",
        "bottom-right",
        ];
    
        var randomPosition = positions[Math.floor(Math.random() * positions.length)];
        textContent.setAttribute("class", "block_text " + randomPosition);
    });
    
    // Добавление повторений текста
    var repetitionCount = 0;
    var isTextAnimationEnabled = false;
    var textAnimationInterval;
    
    function addRepetitions() {
        var newSpan = document.createElement("span");
        newSpan.textContent = blockText.textContent + " ";
        newSpan.classList.add("added");
        textContent.appendChild(newSpan);
    }
    
    document.querySelector(".bottom .text_shift_left").addEventListener("click", function () {
        repetitionCount++;
        addRepetitions();
    });
    
    // Удаление повторений текста
    document.querySelector(".bottom .text_shift_right").addEventListener("click", function () {
        if (repetitionCount > 0) {
            var addedSpans = block.querySelectorAll("span.added");
            while (addedSpans.length > 0) {
                addedSpans[addedSpans.length - 1].remove();
                addedSpans = addedSpans.pop();
            }
            repetitionCount = 0; // Сбрасываем значение повторений
        }
    });

    
    // Изменение текста и удаление добавленных блоков
    changeTextBtn.addEventListener("click", function () {
        var textInput = document.querySelector('.bottom .text[type="text"]');
        var newtext = textInput.value;
        blockText.textContent = newtext;
    
        var addedSpans = block.querySelectorAll("span.added");
        for (var i = 0; i < addedSpans.length; i++) {
            addedSpans[i].remove();
        }
    
        repetitionCount = 0; // Сбрасываем значение повторений
    });

    // Включение/выключение анимации текста
    enableTextAnimationsBtn.addEventListener("click", function () {
        isTextAnimationEnabled = !isTextAnimationEnabled;
        if (isTextAnimationEnabled) {
            startTextAnimation();
        } else {
            stopTextAnimation();
        }
    });

    // Смена анимации текста
  
    changeTextAnimationsBtn.addEventListener("click", function () {
        stopTextAnimation();
        var animations = ["color", "opacity"];
        var randomAnimation = animations[Math.floor(Math.random() * animations.length)];
        startTextAnimation(randomAnimation);
    });

    // Функция для запуска анимации текста
    function startTextAnimation(animationType = "color") {
        stopTextAnimation();
        textAnimationInterval = setInterval(function () {
        var addedSpans = block.querySelectorAll("span.added");

        if (animationType === "color") {
            blockText.style.color = getRandomColor();
        } else if (animationType === "opacity") {
            var randomOpacity = Math.random().toFixed(1);
            blockText.style.opacity = randomOpacity;
        }
        
        for (var i = 0; i < addedSpans.length; i++) {
            if (animationType === "color") {
                addedSpans[i].style.color = getRandomColor();
            } else if (animationType === "opacity") {
                var randomOpacity = Math.random().toFixed(1);
                addedSpans[i].style.opacity = randomOpacity;
            }
        }
        }, 1000);
    }

    // Функция для остановки анимации текста
    function stopTextAnimation() {
        blockText.style.color = "#000000"
		blockText.style.opacity = 1;
        var addedSpans = block.querySelectorAll("span.added");
        for (var i = 0; i < addedSpans.length; i++) {
            addedSpans[i].style.color = "#000000";
			addedSpans[i].style.opacity = 1;
        }
        clearInterval(textAnimationInterval);
    }
    
    // ----------------------------------------ТЕНЬ------------------------------------------- //


    // Вкл/Вкл тени
    enableShadowBtn.addEventListener("click", function() {
        var currentBoxShadow = getComputedStyle(block).boxShadow;
        
        if (currentBoxShadow !== "none") {
            block.style.boxShadow = "none";
        } else {
            changeShadow();
        }
    });
    

    // Вызов изменения теней если нажали изменить
    changeShadowBtn.addEventListener("click", function() {
        changeShadow();
    });
    
    // Изменение теней
    function changeShadow() {
        var offsetX = Math.floor(Math.random() * 10);
        var offsetY = Math.floor(Math.random() * 10);
        var blurRadius = Math.floor(Math.random() * 10);
        var spreadRadius = Math.floor(Math.random() * 10);
        var color = getRandomColor();
        block.style.boxShadow = `${offsetX}px ${offsetY}px ${blurRadius}px ${spreadRadius}px ${color}`;
    }


      

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