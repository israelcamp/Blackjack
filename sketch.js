
var deck;
var jogo;
var cartas;

let optimo;
let w = 250, h = 400, r = 10;
let rodadas;

let contador; // conta as rodas, mao do jogador e mao do dealer
let params;

const window_height = 1100;
const window_width = 1900;

function preload() {
  cartas = loadJSON('http://127.0.0.1:8000/jsons/deck_branco.json');
}

function setup() {
  createCanvas(window_width, window_height);

  deck = new Baralho(cartas);
  jogo = new Blackjack(deck);

  console.log('LUCRO FINAL ' + jogo.resolve(0, null));
  optimo = jogo.reconstroi(0).filter(x => x);
  rodadas = optimo.length;
  params = [window_width / 2 - w * 2.9, window_height - h * 1.1, w, h, r];

  contador = {
    rodada: 0,
    jogador: 0,
    dealer: 0,
    ganhos_jogador: 0,
    ganhos_dealer: 0,
    pontos_jogador: 0,
    pontos_dealer: 0,
    atual: optimo[0],
    acao: 'HIT',
    fim: false,
  };
  angleMode(DEGREES);
  frameRate(3);
  background(0, 153, 51);
  desenha_nomes();
}

function draw() {
  background(0, 153, 51);
  desenha_nomes();
  if (!contador.fim){
    jogo.desenha_maos(contador, ...params);
    desenha_acao(contador.acao);
  } 
  else jogo.desenha_vitoria(contador, params[0], params[1]);
  jogo.mostra_lucro(contador, params[0], params[1]);
  jogo.mostra_pontuacao(contador, params[0], params[1]);
}

function keyPressed() {
  if (!contador.fim)
    if (keyCode === UP_ARROW) contador = jogo.atualiza_contador(optimo, contador);
}

function desenha_nomes() {
  push();
  translate(100, window_height - 80);
  rotate(-90);
  display_text('JOGADOR', 0, 0, [0,0,0], 255);
  pop();
  push();
  translate(100, 350);
  rotate(-90);
  display_text('DEALER', 0, 0, [255, 255, 255], 0);
  pop();
}

function desenha_acao(msg) {
  display_text(msg, window_width*0.7, params[1]-110, [0, 255, 255], 0);
}