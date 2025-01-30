let currentGame;


//choisi de c/c la structure des jeux et d'ajouter les spécificités de canva, de textes et d'images plutôt que de créer un main.js avec la structure globale et les spécificités liées.
//plus simple au vu de mes compétences.
function closeOverlay() {
  const overlay = document.getElementById("sources");
  if (overlay) {
    overlay.style.display = "none";
  } else {
    console.error("L'élément #sources n'existe pas !");
  }
}

// Modification de loadGame pour fermer l'overlay
function loadGame(gameName) {
  closeOverlay(); // Ferme l'overlay dès qu'un jeu est chargé

  const messageElement = document.getElementById('message');

  if (messageElement) {
    messageElement.innerHTML = '';
  }
  
  if (currentGame) {
    // Vérifiez si `stopSuccessSound` existe avant de l'appeler
    if (currentGame.stopSuccessSound) {
      currentGame.stopSuccessSound();
    }
    currentGame.remove();
  }

  switch (gameName) {
    case 'lynx':
      import('./lynx.js').then(module => {
        currentGame = new p5(module.default, 'sketch-container');
      }).catch(error => {
        console.error('Error loading:', error);
      });
      break;

    case 'amphibien':
      import('./amphibien.js').then(module => {
        currentGame = new p5(module.default, 'sketch-container');
      }).catch(error => {
        console.error('Error loading:', error);
      });
      break;

    case 'oiseau':
      import('./oiseau.js').then(module => {
        currentGame = new p5(module.default, 'sketch-container');
      }).catch(error => {
        console.error('Error loading:', error);
      });
      break;

      case 'reptile':
        import('./reptile.js').then(module => {
          currentGame = new p5(module.default, 'sketch-container');
        }).catch(error => {
          console.error('Error loading:', error);
        });
        break;
   
    default:
      console.error('Jeu inconnu:', gameName);
  }
}



function draw() {
}

document.addEventListener('DOMContentLoaded', () => {
  const miniGames = ['lynx', 'oiseau', 'couleuvre', 'salamandre'];
  const completedGames = new Set();

  //une fois tous les mini jeux complétés, les "crédits" s'affichent. Liste complète des animaux sur les listes rouges, sauf ceux qui ne sont pas menacés, et ceux qui sont éteints en SUisse.
  function checkAllGamesCompleted() {
    if (completedGames.size === miniGames.length) {
      const cornerDiv = document.createElement('div');
      cornerDiv.id = 'cornerMessage';
        //j'aurais pu déplacer ça dans le CSS. Pas d'explication.
      cornerDiv.style.position = 'fixed';
      cornerDiv.style.bottom = '10vh';
      cornerDiv.style.left = '2vw';
      cornerDiv.style.width = '20vw';
      cornerDiv.style.height = '25vh';
      cornerDiv.style.backgroundColor = 'transparent';
      cornerDiv.style.backgroundImage = "url('/images/IMG_0594.png')";
      cornerDiv.style.backgroundSize = 'contain';
      cornerDiv.style.backgroundRepeat = 'no-repeat';
      cornerDiv.style.color = 'white';
      cornerDiv.style.padding = '10px';
      cornerDiv.style.borderRadius = '5px';
      cornerDiv.style.overflowY = 'auto';
      cornerDiv.style.zIndex = '1000';
      document.body.appendChild(cornerDiv);
  
      fetch('/animals.json')
        .then(response => {
          if (!response.ok) {
            throw new Error('Erreur lors du chargement des données JSON');
          }
          return response.json();
        })
        .then(data => {
          data.sort(() => Math.random() - 0.5); //pour que les données json apparaissent en aléatoire et pas dans l'ordre où je les ai mises
          //jouer avec les marges pour qu'on puisse toujours lire malgré l'image de background qui n'est pas très linéaire.
          let content = '<h3 style="margin: 5px; margin-left: 15px">Crédits - la Liste rouge :</h3>';
          content += '<ul style="margin: 5px; padding: 0; list-style: none; margin-bottom: 20px">'; //liste dans les puces de liste.
          data.forEach(animal => {
            content += `
              <li style="margin: 5px">
              <img src="${animal.Genre}" alt="${animal.Name}" style="width: 20px; height: auto; display: inline; margin: 0 auto;" /> <strong>${animal.Name}</strong> (${animal.Status})
              </li>
            `;
          });
          content += '</ul>';
          cornerDiv.innerHTML = content;
        })
        .catch(error => {
          console.error('Erreur :', error);
          cornerDiv.innerHTML = '<p>Erreur lors du chargement des données.</p>';
        });
    }
  }
  
window.completeMiniGame = function (gameName) {
    if (!completedGames.has(gameName)) {
      completedGames.add(gameName);
      checkAllGamesCompleted();
    }
  };
});

document.addEventListener("DOMContentLoaded", function () {
  const infoButton = document.getElementById("info-button");
  const infoOverlay = document.getElementById("info-overlay");

  infoButton.addEventListener("mouseenter", function () {
    infoOverlay.style.display = "block";
  });

  infoOverlay.addEventListener("mouseenter", function () {
    infoOverlay.style.display = "block";
  });

  infoOverlay.addEventListener("mouseleave", function () {
    infoOverlay.style.display = "none";
  });

  infoButton.addEventListener("mouseleave", function (event) {
    // Vérifie si la souris quitte vers l'overlay, sinon le masque
    if (!infoOverlay.contains(event.relatedTarget)) {
      infoOverlay.style.display = "none";
    }
  });
});

