function shuffle(array) {

    var currentIndex = array.length;
    var temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;

};

function index_of_max_value_in_array(a) {
    return a.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function display_text(msg, x, y, cor, stroke_cor) {
    push();

    translate(x, y);
    strokeWeight(4);
    stroke(stroke_cor);
    textSize(60);
    fill(...cor);
    text(msg, 0, 0);

    pop();
}

// desenha_mao(estado, contador, x, y, w, h, r) {
//     // desenhando as cartas do jogador
//     let xoffset = w + w * 0.4;
//     let xjogador = x;
//     estado.mao_jogador[0].desenho(xjogador, y, w, h, r);
//     sleep(3000);
//     xjogador += xoffset;
//     estado.mao_jogador[1].desenho(xjogador, y, w, h, r);
//     // for (const carta of estado.mao_jogador) {
//     //     carta.desenho(xjogador, y, w, h, r);
//     //     xjogador += xoffset;
//     // }
//     // xoffset = w + w * 0.4;
//     // for (const carta of estado.mao_dealer) {
//     //     carta.desenho(x, y - h * 1.55, w, h, r);
//     //     x += xoffset;
//     // }
// }