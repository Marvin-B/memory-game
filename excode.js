import bootstrap from "bootstrap"
import "bootstrap/dist/css/bootstrap.css"
import "./style.css"
import $ from "jquery"

console.log("Hello World!")

const randomTab = [
];

let activElements = [

];

let row= getRandomInt(1, 4);
let col= getRandomInt(1, 4);

console.log(row, col);

$('#memory').children('.flip-card').each(function(){

    // On vérifie que les coordonnées ne sont pas déjà présentes dans le tableau
    while(randomTab.some(function(e) { return e[0] === row && e[1] === col; })) {
        row = getRandomInt(1, 4);
        col = getRandomInt(1, 4);
    }

    randomTab.push([row, col]); // On ajoute les coordonnées dans le tableau

    $(this).css({'grid-row': row,'grid-column': col});

})

console.log(randomTab);


$('#memory').children('.flip-card').click(function(){
    var element = $(this).attr('element');
    // On vérifie si un élément a déjà la classe active, si oui on vérifie si l'élément cliqué est le même que l'élément actif
    if(checkActive() === true && $('.active').attr('element') === element) {
        // On supprime la classe active des deux éléments
        $('.active').addClass('active2');
        activElements.push(element);    


        setTimeout(function(){
            $('.active').removeClass('active');
        }
        , 700);
        // On ajoute une classe activepersistante aux deux éléments
        $(this).addClass('active2');
    }

    else if(checkActive() === true && $('.active').attr('element') !== element) {
        $(this).addClass('active');
    // On supprime la classe active des deux éléments
        setTimeout(function(){
            $('.active').removeClass('active');
        }
        , 700);
        //$('.active').removeClass('active');
    }
    if (checkActive() === false) {
        // On ajoute la classe active à l'élément cliqué si aucun élément n'a la classe active
        $(this).addClass('active');
    }
    
    console.log(checkActive());
    console.log(activElements);

    /*if (activElements.length === 8) {
        alert('Vous avez gagné !');
        $('.flip-card').removeClass('active2');
        $('.flip-card').removeClass('active');
        activElements = [];
    }*/
});

// ------------------------------ Les fonctions ------------------------------ //


// Fonction qui retourne un nombre entier aléatoire entre min et max
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Fonction qui vérifie si aucun element n'a la classe 'active'
function checkActive() {
    if ($('.flip-card').hasClass('active')) {
        return true;
    } else {
        return false;
    }
}