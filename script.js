const sizeX = 60; // Ширина поля
const sizeY = 30; // Высота поля
const chanceOfLife = 30; // Шанс попадания живой клетки (в процентах)

// Создание пустого игрового поля
const gameBoard = [];
for (let i = 0; i < sizeY; i++) {
    gameBoard[i] = [];
    for (let j = 0; j < sizeX; j++) {
        gameBoard[i][j] = false; // Инициализация клетки как мертвой
    }
}

// Заполнение игрового поля случайными живыми клетками
for (let i = 0; i < sizeY; i++) {
    for (let j = 0; j < sizeX; j++) {
        if (Math.random() * 100 <= chanceOfLife) {
            gameBoard[i][j] = true; // Клетка становится живой
        }
    }
}

// Отображение игрового поля
function displayGameBoard() {
    const table = document.getElementById("gameBoard");
    let tableHtml = "";

    for (let i = 0; i < sizeY; i++) {
        tableHtml += "<tr>";
        for (let j = 0; j < sizeX; j++) {
            if (gameBoard[i][j]) {
                tableHtml += "<td class='alive'></td>"; // Живая клетка
            } else {
                tableHtml += "<td></td>"; // Мертвая клетка
            }
        }
        tableHtml += "</tr>";
    }

    table.innerHTML = tableHtml;
}

// Проверка статуса соседей клетки
function countAliveNeighbors(x, y) {
    let aliveNeighbors = 0;

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) {
                continue;
            }

            const neighborX = x + i;
            const neighborY = y + j;

            if (neighborX >= 0 && neighborX < sizeX && neighborY >= 0 && neighborY < sizeY) {
                aliveNeighbors += gameBoard[neighborY][neighborX] ? 1 : 0;
            }
        }
    }

    return aliveNeighbors;
}

// Вычисление следующего состояния игрового поля
function calculateNextState() {
    const nextState = [];

    for (let i = 0; i < sizeY; i++) {
        nextState[i] = [];
        for (let j = 0; j < sizeX; j++) {
            const aliveNeighbors = countAliveNeighbors(j, i);

            if (gameBoard[i][j]) {
                nextState[i][j] = aliveNeighbors === 2 || aliveNeighbors === 3; // Правила для живой клетки
            } else {
                nextState[i][j] = aliveNeighbors === 3; // Правило для мертвой клетки
            }
        }
    }

    gameBoard.splice(0, gameBoard.length, ...nextState); // Обновление игрового поля
    displayGameBoard(); // Отображение нового состояния игрового поля
}

// Запуск игры
function startGame() {
    displayGameBoard();
    setInterval(calculateNextState, 1000); // Обновление состояния игры каждую секунду
}

startGame();