class Carta {
    // Classe para uma carta do blackjack
    constructor(valor, nome, naipe) {
        this.valor = valor;
        this.nome = nome;
        this.naipe = naipe;
    }
    seleciona_cor() {
        if (this.naipe == 'Espadas' || this.naipe == 'Paus') {
            return [0, 0, 0];
        } else {
            return [255, 0, 0];
        }
    }
    seleciona_emoji() {
        switch (this.naipe) {
            case 'Paus':
                return '\u{2663}';
            case 'Espadas':
                return '\u{2660}'
            case 'Copas':
                return '\u{2665}';
            case 'Ouros':
                return '\u{2666}'
        }
    }
    desenho(x, y, w, h, r) {
        let color = this.seleciona_cor();
        let emoji = this.seleciona_emoji();
        push();
        translate(x, y);
        rect(0, 0, w, h, r);

        push();
        
        textSize(50);
        fill(...color);
        text(emoji, 20, 40);
        text(emoji, w - 50, 40);
        text(emoji, w - 50, h - 20);
        text(emoji, 20, h - 20);
        pop();

        push();
        fill(...color);
        textSize(100);
        textAlign(CENTER);
        text(this.nome, w/2, h/2 + 20);
        pop();

        // print(this.valor + this.nome);
        pop();
    }
}

class Baralho {
    // Contem as cartas do baralho
    constructor(cartas) {
        this.naipes = ['Copas', 'Paus', 'Espadas', 'Ouros'];
        if (!cartas){
            this.cartas = this.cria_baralho();
            this.cartas = this.embaralha();
        } else {
            this.cartas = this.load_cartas(cartas);
        }
    }
    load_cartas(cartas) {
        let obj_cartas = [];
        for (const [k,c] of Object.entries(cartas)) {
            obj_cartas.push(new Carta(c.valor, c.nome, c.naipe));
        }
        return obj_cartas;
    }
    // cria um baralho de cartas
    cria_baralho() {
        let cartas = [];
        for (const naipe of this.naipes) {
            //colocando cartas 2 a 9
            for (let i = 2; i < 11; i++) cartas.push(new Carta(i, i, naipe));
            //colocando cartas 10 a Rei
            for (const nome of ['J', 'Q', 'K']) cartas.push(new Carta(10, nome, naipe));
            //colocando o As
            cartas.push(new Carta([1, 11], "A", naipe));
        }
        return cartas;
    }
    // embaralha as cartas do baralho
    embaralha() {
        return shuffle(this.cartas);
    }
    get length() {
        return this.cartas.length;
    }
}