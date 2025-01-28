let currentGame;

//Hors des mini-jeux car sinon problèmes d'affichages, voire affichage double (même position mais fonctionne à double)
let percentageDisplay = document.getElementById('percentage-display');

//choisi de c/c la structure des jeux et d'ajouter les spécificités de canva, de textes et d'images plutôt que de créer un main.js avec la structure globale et les spécificités liées.
//plus simple au vu de mes compétences.
function loadGame(gameName) {
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

function updatePercentage() {
  if (currentGame) {
    let percentage = currentGame.getCoveredPercentage();
    const percentageDisplay = document.getElementById('percentage-display');
      if (percentageDisplay) {
        percentageDisplay.innerText = percentage.toFixed(0) + '%';  // Entre () le nb de décimales qu'on veut
        //ajouter les décimales donne trop d'infos par rapport à la taille de la brush qui est énorme. N'a pas de sens.
      }
  }
}

function draw() {
  updatePercentage();
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