const html = document.querySelector('html');

const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const startPauseBt = document.querySelector('#start-pause');
const timer = document.querySelector('#timer');
const image = document.querySelector('.app__image');
const titleText = document.querySelector('.app__title');
const allButtons = document.querySelectorAll('.app__card_button');
const altMusic = document.querySelector('#alternar-musica')
const backgroundMusic = new Audio('./sons/luna-rise-part-one.mp3')
backgroundMusic.loop = true
const playTimeAudio = new Audio('./sons/play.wav')
playTimeAudio.volume = 0.2
const pauseTimeAudio = new Audio('./sons/pause.mp3')
pauseTimeAudio.volume = 0.2
const finishTimeMusic = new Audio('./sons/beep.mp3')
finishTimeMusic.volume = 0.2
const duracaoFoco = 1500;
const duracaoDescansoCurto = 300;
const duracaoDescansoLongo = 900;
let timeInSecond = duracaoFoco
let idInterval = null
const imgMusicPlayOrPause = document.querySelector('#img-music')
const textMusicPlayOrPause = document.querySelector('#text-music')

showTime()

function showTime() {
    const time = new Date(timeInSecond * 1000)
    const timeFormated = time.toLocaleString('pt-BR', { minute: '2-digit', second: '2-digit' })
    timer.innerHTML = `${timeFormated}`
}

altMusic.addEventListener('change', () => {
    if (backgroundMusic.paused && altMusic.checked) {
        backgroundMusic.play()
    }
    else {
        backgroundMusic.pause()
    }
})



focoBt.addEventListener('click', () => {
    alterarContexto('foco')
    changeActive(focoBt)
});

curtoBt.addEventListener('click', () => {
    alterarContexto('descanso-curto')
    changeActive(curtoBt)
});

longoBt.addEventListener('click', () => {
    alterarContexto('descanso-longo')
    changeActive(longoBt)
});

function alterarContexto(context) {
    image.setAttribute('src', `./imagens/${context}.png`);
    html.setAttribute('data-contexto', `${context}`)

    switch (context) {
        case "foco":
            titleText.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            timeInSecond = duracaoFoco
            showTime()
            break;

        case "descanso-curto":
            titleText.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!.</strong>`
            timeInSecond = duracaoDescansoCurto
            showTime()
            break;

        case "descanso-longo":
            titleText.innerHTML = `Hora de voltar a superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            timeInSecond = duracaoDescansoLongo
            showTime()
            break;
    }
}

function changeActive(button) {
    const elementWithActive = document.querySelector('.active');
    elementWithActive.classList.remove('active')
    button.classList.add('active')
}

startPauseBt.addEventListener('click', initOrPause)

const countDown = () => {
    if (timeInSecond <= 0) {
        clearTime()
        finishTimeMusic.play()
        return
    }
    timeInSecond -= 1
    showTime()
}

function initOrPause() {
    if (idInterval != null) {
        pauseTimeAudio.play()
        clearTime()
        imgMusicPlayOrPause.setAttribute('src', './imagens/play_arrow.png')
        textMusicPlayOrPause.innerHTML = "Start"
    }

    else {
        playTimeAudio.play()
        idInterval = setInterval(countDown, 1000)
        imgMusicPlayOrPause.setAttribute('src', './imagens/pause.png')
        textMusicPlayOrPause.innerHTML = "Pause"
    }
}

function clearTime() {
    clearInterval(idInterval)
    idInterval = null
}