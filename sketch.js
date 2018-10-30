let jogo = new Blackjack;
jogo.embaralha();
jogo.embaralha();

let optimo;
let w = 250, h = 400, r = 10;
let rodadas;

let contador; // conta as rodas, mao do jogador e mao do dealer
let params;

const window_height = 1100;
const window_width = 1600;

function setup() {
  createCanvas(window_width, window_height);

  jogo.resolve(0, null);
  optimo = jogo.reconstroi(0);
  rodadas = optimo.length;
  params = [window_width / 2 - w * 2.4, window_height - h * 1.1, w, h, r];

  contador = {
    rodada: 0,
    jogador: 0,
    dealer: 0,
  };
  background(0, 153, 51);
  // contador = jogo.desenha_jogo(optimo, contador, ...params);
  frameRate(1);

}

function draw() {
  background(0, 153, 51);
  console.log(frameCount);
  contador = jogo.desenha_jogo(optimo, contador, ...params);
}