document.addEventListener('DOMContentLoaded', function() {

    var decreaseWidthBtn = document.querySelector('.left .width_block');
    var increaseWidthBtn = document.querySelector('.right .width_block');

    // Получение кнопок управления высотой
    var decreaseHeightBtn = document.querySelector('.left .height_block');
    var increaseHeightBtn = document.querySelector('.right .height_block');

    var matrixBlock = document.querySelector('.matrix_block');

    // Получение таблицы с матрицей
    var matrixTable = document.querySelector('.matrix_block .matrix');

    // Получение кнопки заполнения случайными числами
    var randomBtn = document.querySelector('.random_number_matrix');

    // Получение кнопки для очистки матрицы
    var clearBtn = document.querySelector('.clear_matrix');

    // Получение кнопок управления поворотом
    var clockwiseBtn = document.querySelector('.rotate_clockwise_block');
    var counterclockwiseBtn = document.querySelector('.rotate_counterclockwise_block');

    // Минимальный и максимальный размеры матрицы
    var minSize = 1;
    var maxSize = 9;


    // ----------------------------------------Размер------------------------------------------- //


    // Обработчик события для уменьшения ширины (удаления столбца)
    decreaseWidthBtn.addEventListener('click', function() {
        var rows = matrixTable.getElementsByTagName('tr');
        if (rows[0].getElementsByTagName('td').length > minSize) {
        for (var i = 0; i < rows.length; i++) {
            var cells = rows[i].getElementsByTagName('td');
            rows[i].removeChild(cells[cells.length - 1]);
        }
        matrixBlock.style.width = parseInt(getComputedStyle(matrixBlock).width) - 50 + 'px';
        }
    });
    
    // Обработчик события для увеличения ширины (добавления столбца)
    increaseWidthBtn.addEventListener('click', function() {
        var rows = matrixTable.getElementsByTagName('tr');
        if (rows[0].getElementsByTagName('td').length < maxSize) {
        for (var i = 0; i < rows.length; i++) {
            var newCell = document.createElement('td');
            var input = document.createElement('input');
            input.setAttribute("type", "number");
            newCell.appendChild(input);
            rows[i].appendChild(newCell);
        }

        matrixBlock.style.width = parseInt(getComputedStyle(matrixBlock).width) + 50 + 'px';
        }
    });
    
    // Обработчик события для уменьшения высоты (удаления строки)
    decreaseHeightBtn.addEventListener('click', function() {
        var tbody = matrixTable.querySelector('tbody');
        var rows = tbody.getElementsByTagName('tr');
        if (rows.length > minSize) {
            var lastRow = rows[rows.length - 1];
            tbody.removeChild(lastRow);
        }
    });

    // Обработчик события для увеличения высоты (добавления строки)
    increaseHeightBtn.addEventListener('click', function() {
        var tbody = matrixTable.querySelector('tbody');
        var rows = tbody.getElementsByTagName('tr');
        if (rows.length < maxSize) {
            var newRow = document.createElement('tr');
            var cells = matrixTable.rows[0].getElementsByTagName('td');
            for (var i = 0; i < cells.length; i++) {
                var newCell = document.createElement('td');
                var input = document.createElement('input');
                input.setAttribute("type", "number");
                newCell.appendChild(input);
                newRow.appendChild(newCell);
            }

            tbody.appendChild(newRow);
        }
    });


    // ----------------------------------------Случайные числа------------------------------------------- //


    // Обработчик события для заполнения случайными числами
    randomBtn.addEventListener('click', function() {
        var inputs = matrixTable.getElementsByTagName('input');
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].value = Math.floor(Math.random() * 100); // Заполняем случайным числом от 0 до 99
        }
    });


    // ----------------------------------------Обнуление ячеек------------------------------------------- //


    // Обработчик события для очистки матрицы
    clearBtn.addEventListener('click', function() {
        var inputs = matrixTable.getElementsByTagName('input');
            for (var i = 0; i < inputs.length; i++) {
                inputs[i].value = ''; // Очищаем поле ввода
            }
    });
    

    // ----------------------------------------Поворот матрицы------------------------------------------- //


    // Обработчик события для поворота матрицы по часовой стрелке
    counterclockwiseBtn.addEventListener('click', function() {
        var rows = Array.from(matrixTable.getElementsByTagName('tr'));
        var newRows = [];
        
        // Создание новой матрицы с повернутыми значениями
        for (var i = 0; i < rows[0].getElementsByTagName('td').length; i++) {
            var newRow = [];

            for (var j = rows.length - 1; j >= 0; j--) {
                newRow.push(rows[j].getElementsByTagName('td')[i].getElementsByTagName('input')[0].value);
            }

            newRows.push(newRow);
        }
    
        // Заполнение матрицы с новыми значениями
        for (var i = 0; i < rows.length; i++) {
            var cells = rows[i].getElementsByTagName('td');

            for (var j = 0; j < cells.length; j++) {
                cells[j].getElementsByTagName('input')[0].value = newRows[i][j];
            }
        }
    });
    
    // Обработчик события для поворота матрицы против часовой стрелки
    clockwiseBtn.addEventListener('click', function() {
        var rows = Array.from(matrixTable.getElementsByTagName('tr'));
        var newRows = [];
        
        // Создание новой матрицы с повернутыми значениями
        for (var i = rows[0].getElementsByTagName('td').length - 1; i >= 0; i--) {
            var newRow = [];

            for (var j = 0; j < rows.length; j++) {
                newRow.push(rows[j].getElementsByTagName('td')[i].getElementsByTagName('input')[0].value);
            }

            newRows.push(newRow);
        }
    
        // Заполнение матрицы с новыми значениями
        for (var i = 0; i < rows.length; i++) {
            var cells = rows[i].getElementsByTagName('td');

            for (var j = 0; j < cells.length; j++) {
                cells[j].getElementsByTagName('input')[0].value = newRows[i][j];
            }
        }
    });
});