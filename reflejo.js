// ===============================
//  JUEGO: ATRAPA EL SABOR SECRETO (REFLEJOS)
// ===============================

// Elementos del DOM
const targetArea = document.getElementById('target-area');
const targetItem = document.getElementById('target-item');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('startReflexButton');
const gameBox = document.getElementById('reflejo-game-box');

let score = 0;
let timeRemaining = 10;
let gameInterval;
let targetTimeout;
let isGameRunning = false;

// -----------------------------------
//  FUNCIONES AUXILIARES
// -----------------------------------

// Mueve la imagen de carne a una posición aleatoria
function moveTarget() {
    if (!isGameRunning || !targetArea || !targetItem) return;

    // Obtener dimensiones del área y del objetivo
    const areaWidth = targetArea.clientWidth - targetItem.offsetWidth;
    const areaHeight = targetArea.clientHeight - targetItem.offsetHeight;

    // Si las áreas son muy pequeñas, puede ser que el CSS no cargó.
    if (areaWidth <= 0 || areaHeight <= 0) {
        console.error("Error: target-area o target-item no tienen dimensiones correctas.");
        endGameReflex();
        return;
    }

    // Calcular posición aleatoria
    const randomX = Math.floor(Math.random() * areaWidth);
    const randomY = Math.floor(Math.random() * areaHeight);

    // Aplicar la posición
    targetItem.style.left = `${randomX}px`;
    targetItem.style.top = `${randomY}px`;
    
    // Mostrar el objetivo
    targetItem.style.display = 'block';

    // Establecer un temporizador para que el objetivo desaparezca
    targetTimeout = setTimeout(() => {
        targetItem.style.display = 'none';
        if (isGameRunning) {
            // Mover el objetivo a una nueva posición después de un retraso corto
            setTimeout(moveTarget, 500); // 0.5 segundos oculto
        }
    }, 1200); // 1.2 segundos para hacer clic
}

// Maneja el clic en el objetivo
function hitTarget() {
    if (!isGameRunning) return;

    // Aumentar puntuación
    score++;
    if (scoreDisplay) scoreDisplay.textContent = `Puntuación: ${score}`;

    // Detener el temporizador de desaparición
    clearTimeout(targetTimeout);
    targetItem.style.display = 'none';

    // Mover el objetivo a una nueva posición
    setTimeout(moveTarget, 100); // Pequeño retraso para evitar clics dobles
}

// -----------------------------------
//  CONTROL PRINCIPAL DEL JUEGO
// -----------------------------------

// Función de inicio del juego (llamada desde el HTML)
function startGameReflex() {
    if (isGameRunning || !startButton) return; 

    score = 0;
    timeRemaining = 10;
    isGameRunning = true;
    
    // Resetear el estado
    if (scoreDisplay) scoreDisplay.textContent = `Puntuación: ${score}`;
    if (timerDisplay) timerDisplay.textContent = `Tiempo: ${timeRemaining}s`;
    if (targetItem) targetItem.style.display = 'none';
    
    startButton.disabled = true;
    if (targetItem) targetItem.onclick = hitTarget; // Habilitar el clic

    // Iniciar el temporizador de la cuenta regresiva
    gameInterval = setInterval(() => {
        timeRemaining--;
        if (timerDisplay) timerDisplay.textContent = `Tiempo: ${timeRemaining}s`;

        if (timeRemaining <= 0) {
            endGameReflex();
        }
    }, 1000);

    // Iniciar el movimiento del objetivo con un retraso para que carguen los estilos
    setTimeout(moveTarget, 500); 
}

// Función para terminar el juego
function endGameReflex() {
    isGameRunning = false;
    clearInterval(gameInterval);
    clearTimeout(targetTimeout);
    
    if (targetItem) targetItem.style.display = 'none';
    
    if (startButton) {
        startButton.disabled = false;
        startButton.textContent = '¡Jugar de Nuevo!';
    }
    
    if (targetItem) targetItem.onclick = null; // Deshabilitar el clic

    // Mostrar mensaje final
    if (gameBox) {
        const title = gameBox.querySelector('h4');
        if (title) title.textContent = `¡Tiempo Agotado! Tu corte fue de ${score} puntos.`;
    }
}