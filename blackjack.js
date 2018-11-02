class Blackjack {
    // Classe para comandar o jogo de blackjack
    constructor() {
        this.deck = new Baralho();
        this.n = this.deck.length;
        this.global_tracker = [];
        this.counter = 0;
    }
    embaralha() {
        this.deck.embaralha();
    }
    get cartas() {
        return this.deck.cartas;
    }
    // Compara as mãos do jogador e do dealer e retorna o ganho do jogador (1, 0, -1)
    compara_maos(pontos_jogador, pontos_dealer) {
        if (pontos_jogador > pontos_dealer) return 1;
        else if (pontos_jogador == pontos_dealer) return 0;
        else return -1;
    }
    compara_maos_2(pontos_jogador, pontos_dealer) {
        if (pontos_jogador > 21) return -1;
        if (pontos_dealer > 21) return 1;
        if (pontos_jogador > pontos_dealer) return 1;
        else if (pontos_jogador == pontos_dealer) return 0;
        else return -1;
    }
    pontos_na_mao(cartas_array) {
        let as = cartas_array.filter(carta => Array.isArray(carta.valor)); // pega o as 
        let normais = cartas_array.filter(carta => !Array.isArray(carta.valor)); // pega as outras cartas
        let soma = normais.reduce((a, b) => a + b.valor, 0); // soma as cartas

        if (as.length) soma += (soma + 11) > 21 ? 1 : 11; // se existe algum as na mão soma 1 se a soma passa de 21, 11 c.c.

        return soma;
    }
    resolve(i, j) {
        let historico = [],
            tracker = [];

        if (this.n - i < 4) {
            // console.log('Sem cartas suficientes');
            return 0;
        }
        var pontos_jogador = 0;
        var pontos_dealer = 0;
        var mao_jogador, mao_dealer;
        for (let p = 2; p <= this.n - i - 2; p++) {
            // salvando a mao do jogador
            mao_jogador = [this.cartas[i], this.cartas[i + 2]].concat(this.cartas.slice(i + 4, i + p + 2));
            // contando a pontuação do jogador
            pontos_jogador = this.pontos_na_mao(mao_jogador);
            if (pontos_jogador > 21) {
                historico.push(-1 + this.resolve(i + p + 2, i));
                mao_dealer = [this.cartas[i + 1], this.cartas[i + 3]];
                // console.log(`Jogador = ${pontos_jogador} Dealer = ${this.pontos_na_mao(mao_dealer)} - 21`);
                tracker.push({
                    i: i,
                    j: j,
                    resultado: Math.max(...historico),
                    mao_dealer: mao_dealer,
                    mao_jogador: mao_jogador,
                    atual: -1,
                })
                break;
            }

            for (var d = 2; d <= this.n - i - p; d++) {
                mao_dealer = [this.cartas[i + 1], this.cartas[i + 3]].concat(this.cartas.slice(i + p + 2, i + p + d));
                pontos_dealer = this.pontos_na_mao(mao_dealer);
                if (pontos_dealer > 17) break;
            }
            pontos_dealer = (pontos_dealer > 21) ? 0 : pontos_dealer;

            historico.push(this.compara_maos(pontos_jogador, pontos_dealer) + this.resolve(i + p + d, i));
            tracker.push({
                i: i,
                j: j,
                resultado: Math.max(...historico),
                mao_dealer: mao_dealer,
                mao_jogador: mao_jogador,
                atual: this.compara_maos(pontos_jogador, pontos_dealer),
            })

            // console.log(`Jogador = ${pontos_jogador} Dealer = ${this.pontos_na_mao(mao_dealer)}`);
        }
        this.counter++;
        // console.log(index_of_max_value_in_array(historico));
        this.global_tracker.push(tracker[index_of_max_value_in_array(historico)]);
        return Math.max(...historico);
    }
    reconstroi(i) { // reconstroi as jogadas ótimas a partir da carta i
        let optimo = this.global_tracker.filter(v => v.i === i); // encontrando o nó de partida
        if (optimo.length != 1) throw "Erro, dois nós iniciais encontrados";

        while (this.n - i >= 4) {
            let q = optimo.slice(-1)[0];
            let j = q.mao_dealer.length + q.mao_jogador.length;
            let proximo = this.global_tracker.filter(v => (v.i === j + i && v.j === i))[0];
            optimo.push(proximo);
            i = i + j;
        }
        return optimo
    }
    desenha_maos(atual, contador, x, y, w, h, r) {
        let xoffset = w + w * 0.4;
        let xjogador = x;
        for (let i = 0; i < atual.mao_jogador.length; i++) { // desenha as cartas do jogador
            let carta = atual.mao_jogador[i];
            carta.desenho(xjogador, y, w, h, r);
            if (i == contador.jogador) {
                contador.jogador += 1;
                contador.pontos_jogador = this.pontos_na_mao(atual.mao_jogador.slice(0, contador.jogador));
                break;
            }
            xjogador += xoffset;
        }


        xoffset = w + w * 0.4;
        let xdealer = x;
        for (let i = 0; i < atual.mao_dealer.length; i++) { // desenha as cartas do dealer
            let carta = atual.mao_dealer[i];
            carta.desenho(xdealer, y - h * 1.55, w, h, r);
            if (i == contador.dealer) {
                contador.dealer += 1;
                contador.pontos_dealer = this.pontos_na_mao(atual.mao_dealer.slice(0, contador.dealer));
                break;
            }
            xdealer += xoffset;
        }
        return contador;
    }
    atualiza_contador(otimos, atual, contador) {
        contador.jogador = 0;
        contador.dealer = 0;
        if (contador.rodada < otimos.length - 1) contador.rodada += 1;
        let lucro = this.compara_maos_2(this.pontos_na_mao(atual.mao_jogador), this.pontos_na_mao(atual.mao_dealer));
        contador.ganhos_jogador += lucro
        contador.ganhos_dealer += lucro * (-1);
        return contador;
    }
    mostra_lucro(contador, x, y) {
        display_text(`LUCRO`, x + 250, y - 120, [255, 204, 0], 0);
        display_text(contador.ganhos_jogador, x + 270, y - 60, [0, 0, 0], 255);
        display_text(' x ', x + 320, y - 60, [255, 204, 0], 0);
        display_text(contador.ganhos_dealer, x + 380, y - 60, [255, 255, 255], 0);
    }
    mostra_pontuacao(contador, x, y) {
        display_text(`PONTUAÇÃO`, x + 600, y - 120, [255, 204, 0], 0);
        display_text(contador.pontos_jogador, x + 670, y - 60, [0, 0, 0], 255);
        display_text(' x ', x + 730, y - 60, [255, 204, 0], 0);
        display_text(contador.pontos_dealer, x + 800, y - 60, [255, 255, 255], 0);
    }
    desenha_vitoria(contador, x, y) {
        let emoji_jogador, emoji_dealer;
        if (contador.ganhos_dealer > contador.ganhos_jogador) {
            emoji_jogador = '\u{1F61E}';
            emoji_dealer = '\u{1F602}';
        } else {
            emoji_jogador = '\u{1F602}';
            emoji_dealer = '\u{1F61E}';
        }
        push();
        textSize(300);
        strokeWeight(4);
        fill(255);
        stroke(0);
        text(emoji_dealer, x + 500, y - h * 0.9);
        pop();

        push();
        textSize(300);
        strokeWeight(4);
        fill(0);
        stroke(255);
        text(emoji_jogador, x + 490, y * 1.4);
        pop();

    }
    desenha_jogo(otimos, contador, x, y, w, h, r) { // desenha a mao do jogador
        let atual = otimos[contador.rodada];
        if (atual) {
            contador = this.desenha_maos(atual, contador, x, y, w, h, r);
            if (contador.jogador >= atual.mao_jogador.length && contador.dealer >= atual.mao_dealer.length) {
                contador = this.atualiza_contador(otimos, atual, contador);
            }
        } else {
            this.desenha_vitoria(contador, x, y, h);
        }
        this.mostra_lucro(contador, x, y);
        this.mostra_pontuacao(contador, x, y);
        return contador;
    }
}

// jogo = new Blackjack();
// jogo.embaralha();
// let i = 0;
// console.log(jogo.resolve(i, i));
// console.log(jogo);
// let otimo = jogo.reconstroi(i);
// console.log(otimo)