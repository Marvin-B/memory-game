import bootstrap from "bootstrap"
import "bootstrap/dist/css/bootstrap.css"
import "./style.css"
import $ from "jquery"

console.log("Hello World!")

var nbErr = 0; // On initialise une variable comptant les erreurs

$('#erreurs span').text(nbErr); // On affiche le nombre d'erreurs

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

        // Si l'élément est déjà présent dans le tableau, on ne l'ajoute pas, sinon on l'ajoute
        if(activElements.includes(element)) {
            console.log("Element déjà présent");
        } else {

        activElements.push(element);    
        }

        // Si le tableau contient 8 éléments, on a gagné
        if(activElements.length === 8) {
            alert("Vous avez gagné !");
            resetGame();
        }



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
        nbErr++;

        // Si on atteint 30 erreurs, on réinitialise le jeu
        if(nbErr === 30) {
            alert("Vous avez échoué, trop d'erreurs ont été commises");
            resetGame();
        }
        $('#erreurs span').text(nbErr);
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

});

// Si on clique sur le bouton reset, on réinitialise le jeu
$('#reset').click(function(){
    resetGame();
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

// Fonction qui réinitialise le jeu
function resetGame() {
    $('#memory').children('.flip-card').each(function(){
        $(this).removeClass('active');
        $(this).removeClass('active2');
    }
    );
    nbErr = 0;
    $('#erreurs span').text(nbErr);
    // On mélanges les éléments
    randomTab.sort(function() { return 0.5 - Math.random() });
    console.log(randomTab);

    // On recréer le html avec les éléments mélangés
    $('#memory').children('.flip-card').each(function(){
        $(this).css({'grid-row': randomTab[0][0],'grid-column': randomTab[0][1]});
        randomTab.shift();
        
    });

    // On réinitialise le tableau des éléments actifs
    activElements = [];
    // On réinitialise les coordonnées
    row= getRandomInt(1, 4);
    col= getRandomInt(1, 4);
}

// ------------------------------ Fin des fonctions ------------------------------ //