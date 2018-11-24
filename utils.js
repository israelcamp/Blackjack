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
