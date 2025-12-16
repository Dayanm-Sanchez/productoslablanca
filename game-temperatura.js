// =====================================
//  JUEGO: ADIVINA LA TEMPERATURA DEL CORTE
// =====================================

const cuts = [
    // Objeto: { nombre del corte, temperatura interna objetivo, tolerancia en °C }
    { name: "Rib Eye a término Medio (Medium Rare)", target: 57, tolerance: 1.5 },
    { name: "New York a término Tres Cuartos (Medium Well)", target: 68, tolerance: 1.5 },
    { name: "Arrachera a término Bien Cocido (Well Done)", target: 71, tolerance: 1.0 },
    { name: "Pechuga de Pollo (Temperatura segura, sin término)", target: 74, tolerance: 0.5 }
];

let currentCut = null;
let attempts = 0;
const maxAttempts = 5;

// Elementos del DOM
const guessInput = document.getElementById('guessInput');
const message = document.getElementById('message');
const attemptsDisplay = document.getElementById('attempts');
const checkGuessButton = document.getElementById('checkGuessButton');
const nextCutButton = document.getElementById('nextCutButton');
const cutNameDisplay = document.getElementById('cutNameDisplay');
const questionTitle = document.getElementById('questionTitle');

// -----------------------------------
//  INICIAR UNA NUEVA RONDA
// -----------------------------------
function startNewRound() {
    if (!cutNameDisplay || !guessInput) return;

    // 1. Selecciona un corte al azar
    currentCut = cuts[Math.floor(Math.random() * cuts.length)];

    // 2. Resetea el estado y la interfaz
    attempts = 0;
    
    cutNameDisplay.innerHTML = `<span style="color: #8B0000;">${currentCut.name}</span>`;
    attemptsDisplay.textContent = `Intentos restantes: ${maxAttempts - attempts}`;
    message.textContent = '';
    
    guessInput.value = '';
    guessInput.disabled = false;

    if (checkGuessButton) {
        checkGuessButton.disabled = false;
        checkGuessButton.textContent = '¡Probar!';
    }

    if (nextCutButton) nextCutButton.style.display = 'none';
    if (questionTitle) questionTitle.textContent = "Dime la temperatura interna debe cocinarse este corte:";
}


// -----------------------------------
//  FUNCIÓN PRINCIPAL DEL JUEGO
// -----------------------------------
function checkGuess() {
    if (!currentCut) {
        message.textContent = "Error de juego. Reiniciando...";
        startNewRound();
        return;
    }
    
    const guess = parseFloat(guessInput.value);

    // Validación: debe ser un número entre 40 y 80
    if (isNaN(guess) || guess < 40 || guess > 80) {
        message.textContent = 'Introduce una temperatura válida entre 40 y 80°C.';
        message.style.color = 'orange';
        return;
    }

    attempts++;
    const target = currentCut.target;
    const tolerance = currentCut.tolerance;
    
    // RANGOS
    const isPerfect = guess >= (target - tolerance) && guess <= (target + tolerance);
    const difference = Math.abs(guess - target);
    
    
    // Lógica para la retroalimentación
    if (isPerfect) {
        // Término Perfecto
        message.textContent = `¡Término perfecto! La temperatura ideal para ${currentCut.name} es ${target}°C.`;
        message.style.color = '#008000'; // Verde
        endGame(true);
    } 
    else if (attempts >= maxAttempts) {
        // Se acabaron los intentos
        message.textContent = `¡Sin suerte! La temperatura ideal era ${target}°C. Tu corte se ha echado a perder.`;
        message.style.color = '#cc0000'; // Rojo
        endGame(false);
    }
    else if (guess > target && difference > (tolerance + 2)) {
        // Muy Caliente (fuera de rango y con diferencia alta)
        message.textContent = '¡Muy caliente! Tu corte se está secando y va a quedar sobrecocido. Baja la temperatura.';
        message.style.color = '#e69138'; // Naranja
    } 
    else if (guess < target && difference > (tolerance + 2)) {
        // Muy Frío (fuera de rango y con diferencia alta)
        message.textContent = '¡Muy frío! El corte sigue crudo. Necesita subir la temperatura.';
        message.style.color = '#0b5394'; // Azul
    }
    else {
        // Cerca (fuera del perfecto, pero no muy lejos)
        message.textContent = '¡Estás muy cerca! Ajusta solo un poco la temperatura.';
        message.style.color = 'yellowgreen';
    }

    attemptsDisplay.textContent = `Intentos restantes: ${maxAttempts - attempts}`;
    guessInput.value = '';
}

// -----------------------------------
//  FIN DEL JUEGO
// -----------------------------------
function endGame(won) {
    if (guessInput) guessInput.disabled = true;
    if (checkGuessButton) checkGuessButton.disabled = true; 
    
    if (nextCutButton) {
        nextCutButton.textContent = 'Siguiente Corte';
        nextCutButton.style.display = 'block';
    }
}

// -----------------------------------
//  REINICIAR (PASAR AL SIGUIENTE CORTE)
// -----------------------------------
function resetGame() {
    startNewRound();
}

// Inicializa el juego al cargar el script
document.addEventListener('DOMContentLoaded', startNewRound);

// Fallback para asegurar la inicialización
startNewRound();