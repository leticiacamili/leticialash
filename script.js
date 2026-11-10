import { aleatorio } from './aleatorio.js';
import { perguntas } from './perguntas.js';

const caixaPerguntas = document.querySelector('.caixa-perguntas');
const caixaAlternativas = document.querySelector('.caixa-alternativas');
const caixaResultado = document.querySelector('.caixa-resultado');
const textoResultado = document.querySelector('.texto-resultado');

let atual = 0;
let perguntaAtual;
let historiaFinal = "";

function mostraPergunta() {
    if (atual >= perguntas.length) {
        exibeResultado();
        return;
    }
    perguntaAtual = perguntas[atual];
    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.textContent = "";
    mostraAlternativas();
}

function mostraAlternativas() {
    for (const alternativa of perguntaAtual.alternativas) {
        const botaoAlternativas = document.createElement("button");
        botaoAlternativas.textContent = alternativa.texto;
        botaoAlternativas.addEventListener("click", () => respostaSelecionada(alternativa));
        caixaAlternativas.appendChild(botaoAlternativas);
    }
}

function respostaSelecionada(opcaoSelecionada) {
    const afirmacaoSelecionada = aleatorio(opcaoSelecionada.afirmacao);
    historiaFinal += afirmacaoSelecionada + " ";

    if (opcaoSelecionada.proxima !== undefined) {
        atual = opcaoSelecionada.proxima;
    } else {
        atual++;
    }
    
    mostraPergunta();
}

function exibeResultado() {
    caixaPerguntas.textContent = "Sua História Concluída:";
    textoResultado.textContent = historiaFinal;
    caixaAlternativas.textContent = "";
    caixaResultado.style.display = "block";
}

mostraPergunta();