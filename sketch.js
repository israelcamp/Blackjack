let jogo = new Blackjack;
jogo.embaralha();
jogo.embaralha();

let optimo;
let w = 250, h = 400, r = 10;
let rodadas;

let contador; // conta as rodas, mao do jogador e mao do dealer
let params;

const window_height = 1100;
const window_width = 1900;

function setup() {
  createCanvas(window_width, window_height);

  console.log('LUCRO FINAL ' + jogo.resolve(0, null));
  optimo = jogo.reconstroi(0);
  rodadas = optimo.length;
  params = [window_width / 2 - w * 2.9, window_height - h * 1.1, w, h, r];

  contador = {
    rodada: 0,
    jogador: 0,
    dealer: 0,
    ganhos_jogador: 0,
    ganhos_dealer: 0,
  };
  angleMode(DEGREES);
  frameRate(1);
  background(0, 153, 51);
  desenha_nomes();
  // contador = jogo.desenha_jogo(optimo, contador, ...params);
  // noLoop();

}

function draw() {
  background(0, 153, 51);
  desenha_nomes();
  // console.log(frameCount);
  // console.log(contador);
  contador = jogo.desenha_jogo(optimo, contador, ...params);
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