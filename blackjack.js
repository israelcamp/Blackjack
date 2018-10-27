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

class Carta {
    // Classe para uma carta do blackjack
    constructor(valor, naipe) {
        this.valor = valor;
        this.naipe = naipe;
    }
}

class Baralho {
    // Contem as cartas do baralho
    constructor(){
        this.naipes = ['Copas', 'Paus', 'Espadas', 'Ouros'];
        this.cartas = this.cria_baralho();
    }
    // cria um baralho de cartas
    cria_baralho() {
        let cartas = [];
        for (const naipe of this.naipes) {
            //colocando cartas 2 a 9
            for (let i = 2; i < 10; i++)  cartas.push(new Carta(i, naipe));
            //colocando cartas 10 a Rei
            for (let i = 0; i < 4; i++)  cartas.push(new Carta(10, naipe));
            //colocando o As
            cartas.push(new Carta([1, 11], naipe));
        }
        return cartas;
    }
    // embaralha as cartas do baralho
    embaralha() {
        shuffle(this.cartas);
    }
    get length() {
        return this.cartas.length;
    }
}

class Blackjack {
    // Classe para comandar o jogo de blackjack
    constructor() {
        this.deck = new Baralho();
        this.n = this.deck.length;
        this.opcoes = [];
    }
    embaralha() {
        this.deck.embaralha();
    }
    get cartas() {
        return this.deck.cartas;
    }
    compara_maos(pontos_jogador, pontos_dealer) {
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
    resolve(i) {
        let opcoes = [];
        if (this.n - i < 4) return 0;
        var pontos_jogador = 0;
        var pontos_dealer = 0;
        for (let p = 2; p < this.n - i - 2; p++) {
            // contando a pontuação do jogador
            pontos_jogador = this.pontos_na_mao(this.cartas.slice(i + 4, i + p + 2).concat([this.cartas[i], this.cartas[i + 2]]));
            if (pontos_jogador > 21) {
                opcoes.push(-1 + this.resolve(i + p + 2));
                 break;
            }
            // console.log(pontos_jogador);
            for (var d = 2; d < this.n - i - p; d++) {
                pontos_dealer = this.pontos_na_mao(this.cartas.slice(i+p+2, i+p+d).concat([this.cartas[i+1], this.cartas[i+3]]));
                if (pontos_dealer > 17) break;
            }
            pontos_dealer = (pontos_dealer > 21) ? 0 : pontos_dealer;
            // console.log(pontos_dealer);
            opcoes.push(this.compara_maos(pontos_jogador, pontos_dealer) + this.resolve(i+p+d));
        }
        return Math.max(...opcoes);
    }
}

jogo = new Blackjack();
jogo.embaralha();
console.log(jogo.resolve(0));
// console.log(jogo.cartas.slice(0, 5)); 






function BJ(i) {
    return console.log(i);
}