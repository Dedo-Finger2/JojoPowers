const tempoLabel = document.getElementById(`tempoLabel`);

const timeStopSecSpan = document.getElementById('timeStopSecSpan');
const allButtons = document.querySelectorAll('button');

let intervalo = 1000; // Segundos para os intervalos
let tempo = 60; // Tempo que vai ficar correndo

let tempoCountdown = setInterval(tempoCorrer, intervalo);

/**
 * Função responsável por formatar o tempo para tempo em formato digial
 * @param {number} segundos - Tempo em segundos
 * @returns {string} - String com o tempo formatado
 */
function formatarTempo(segundos) {
    // Armazena os minutos
    let minutos = Math.floor(segundos / 60);
    // O que sobrar são segundos
    let resto = segundos % 60;

    // Se os minutos e segundos tiverem apenas um dígito
    if (minutos < 10) {
        minutos = "0" + minutos;
    }

    if (resto < 10) {
        resto = "0" + resto;
    }
    // Retorna a string formatada
    return minutos + ":" + resto;
}

function tempoCorrer() {
    tempo--;
    tempoLabel.innerText = formatarTempo(tempo);

    if (tempo === 0) {
        clearInterval(tempoCountdown);
    }
}

// * Time stop code ---------------------------

/**
 * Função responsável por parar o tempo
 */
function timeStop() {
    // Desabilita o botão
    allButtons.forEach(element => {
        element.setAttribute('disabled', '')
    });
    // Para o contador de tempo
    clearInterval(tempoCountdown);
    // Deixa o contador vermelho
    tempoLabel.style.color = "gray";

    let timeStopSec = 5; // Quantos sec o tempo vai ficar parado
    timeStopSecSpan.innerText = formatarTempo(timeStopSec); // Setando o valor do span que mostra quanto tempo o tempo vai ficar parado

    /**
     * Função responsável por fazer uma contagem até 0 com o tempo parado
     */
    function timeStopCountdown() {
        timeStopSec--;
        timeStopSecSpan.innerText = formatarTempo(timeStopSec);

        // Quando o tempo voltar, setar tudo de volta ao normal
        if (timeStopSec === 0) {
            tempoLabel.style.color = "black";
            timeStopSecSpan.innerText = '';
            clearInterval(timeStopGoing);
            retomarTempo();
        }
    }

    let timeStopGoing = setInterval(timeStopCountdown, intervalo); // Começa a contagem regressiva pro tempo voltar a correr
}

/**
 * Função responsável por retormar o tempo parado
 */
function retomarTempo() {
    // Para o contadodr
    clearInterval(tempoCountdown);
    // Seta o valor do contador
    tempoLabel.innerText = formatarTempo(tempo);
    // Inicia novamente o contador
    tempoCountdown = setInterval(tempoCorrer, intervalo);
    // Habilita o botão novamente
    allButtons.forEach(element => {
        element.removeAttribute('disabled');
    });
}


// * Bites the dust code ---------------------------

/**
 * Função responsável por voltar 7 segundos no passado
 */
function bitesTheDust() {
    // Desabilita todos os botões
    allButtons.forEach(element => {
        element.setAttribute('disabled', '')
    });

    clearInterval(tempoCountdown); // Para o contador
    tempoLabel.style.color = 'pink'; // Deixa ele cor de rosa

    let bitesTheDustSec = 7;

    function bitesTheDustCountdown() {
        bitesTheDustSec--; // Conta até 7
        tempo++; // Aumenta o tempo 7 vezes

        tempoLabel.innerText = formatarTempo(tempo);

        if (bitesTheDustSec === 0) {
            clearInterval(bitesTheDustGoing);
            tempoLabel.style.color = "black";
            retomarTempo();
        }
    }

    let bitesTheDustGoing = setInterval(bitesTheDustCountdown, intervalo - 650);
}


// * Time erase code ---------------------------

/**
 * Função responsável por skipar 10 segundos no tempo
 */
function timeErase() {
    if (tempo >= 10) {
        // Desabilita todos os botões
        allButtons.forEach(element => {
            element.setAttribute('disabled', '')
        });

        clearInterval(tempoCountdown);
        tempoLabel.style.color = 'red';

        let timeEraseSec = 10;

        function timeEraseCountdown() {
            timeEraseSec--; // Conta de 10 pra baixo até 0

            if (timeEraseSec === 0) {
                tempo = tempo - 10; // Remove os 10 segundos no tempo
                clearInterval(timeEraseGoing);
                tempoLabel.style.color = 'black';
                retomarTempo();
            }
        }

        let timeEraseGoing = setInterval(timeEraseCountdown, intervalo - 950);
    }
}


// * Time aceleration code ---------------------------

/**
 * Função responsável por acelerar o tempo
 * TODO: Comentar
 */
function timeAceleration() {
    // Desabilita todos os botões
    allButtons.forEach(element => {
        element.setAttribute('disabled', '')
    });

    clearInterval(tempoCountdown); // Para o contador
    tempoLabel.style.color = 'green';

    let timeAcelerationSec = 10;

    function timeAcelerationCountdown() {
        timeAcelerationSec--; // Conta de 10 pra baixo até 0
        intervalo -= 25;

        tempoLabel.innerText = formatarTempo(tempo);

        if (timeAcelerationSec === 0) {
            clearInterval(timeAcelerationGoing);
            tempoLabel.style.color = 'black';
            retomarTempo();
        }
    }

    let timeAcelerationGoing = setInterval(timeAcelerationCountdown, 50);
}