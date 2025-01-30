export default function(p) {
  let bottomImg, topImg, topLayer;
  let modifiedPixels = 0;
  let totalPixels;
  let hasModified = [];
  const brushSize = 80; //pourcentage assez gros pour qu'on puisse dessiner facilement ; sinon les premiers tests révèlent que les gens essaient de "ne pas dépasser" une fois qu'ils ont trouvé un animal.
  const maxPercentage = 65; //65% car 35% des mammifères figurent sur la liste rouge.
  let successSound; //son de l'ours une fois les 65% atteints
  let confetti = [];
  let confettiImg; //icon mammifère
  let sound;
  let soundPlaying = false

  const imagePaths = [
    '/images/lynx.jpg',
    '/images/lievre.jpg',
    '/images/loup.jpg',
    '/images/loutre.jpg',
    '/images/putois.jpg',
    '/images/lapin.jpg'
  ];

  let images = [];
  let revealedImages = [];


  p.preload = function() {
    for (let path of imagePaths) {
      images.push(p.loadImage(path));
    }

    topImg = p.loadImage('/images/papier.avif'); //au début, test avec un sketch du dessin qui allait être révélé, mais du coup les gens pensent que c'est un jeu de coloriage où il ne faut pas dépasser. Idée abandonnée.
    sound = p.loadSound('/sounds/drawing.mp3'); //pour le fun
    successSound = loadSound('/sounds/successLynx.mp3'); //contrairement à ce que son nom indique c'est le rugissement de l'ours brun.
    successSound.setVolume(0.1); //sinon on meurt
    confettiImg = loadImage('/images/PICmammifere.png'); //icon mammifère, utilisé aussi dans le fichier json.
  };

  p.setup = function() {
    p.createCanvas(620, 550);

    const canvasElement = p.canvas;
    canvasElement.classList.add('canvas-center');

    bottomImg = p.createGraphics(p.width, p.height);

    //pour chaque canva, selon les images choisies.
    //Pour mammifères : 6 images choisies (j'ai laissé les petits mammifères de côté), vignettes en longueur --> 3X2
    //Calcul manuel pour adapter le canva aux images, pas trouvé de solution pour que ce soit les mêmes partout sans avoir des images de base de même grandeur (il aurait fallu les retoucher dans procreate pour obtenir l'effet attendu...)
    const maxImagesPerRow = 3;
    const maxWidth = 200;
    const canvasWidth = bottomImg.width;
    const canvasHeight = bottomImg.height;
    const cellWidth = canvasWidth / maxImagesPerRow;
    const cellHeight = canvasHeight / 2;

    for (let i = 0; i < images.length; i++) {
        const img = images[i];

        const newWidth = Math.min(img.width, maxWidth);
        const scaleFactor = newWidth / img.width;
        const newHeight = img.height * scaleFactor;

        const col = i % maxImagesPerRow;
        const row = Math.floor(i / maxImagesPerRow);

        const xOffset = col * cellWidth + (cellWidth - newWidth) / 2;
        const yOffset = row * cellHeight + (cellHeight - newHeight) / 2;

        bottomImg.image(img, xOffset, yOffset, newWidth, newHeight);
    }

    p.image(bottomImg, 0, 0);
    topLayer = p.createGraphics(p.width, p.height);
    topLayer.image(topImg, 0, 0);

    totalPixels = p.width * p.height;
    hasModified = new Array(totalPixels).fill(false);

    //Ici pour pouvoir calculer si l'image a été grattée ou pas pour la récompense.
    revealedImages = new Array(images.length).fill(false);

    p.noStroke();
};

  p.draw = function() {
    p.image(bottomImg, 0, 0);
    p.image(topLayer, 0, 0);
   
    for (let i = confetti.length - 1; i >= 0; i--) {
      confetti[i].update();
      confetti[i].show();
  //il y a quelque chose que je n'ai pas compris ici : quand le confetti est offScreen, il s'affiche dans le background du canva...
      if (confetti[i].isOffScreen()) {
        confetti.splice(i, 1);
      }
    }
  }
  
  function triggerConfetti() {
    //Explosion depuis le centre de l'écran, plutôt que la "pluie" dispo dans l'exemple de P5.js https://editor.p5js.org/slow_izzm/sketches/H1fhGJSaX
    const centerX = p.width / 2;
    const centerY = p.height / 2;
  
    for (let i = 0; i < 20; i++) {
      confetti.push(new Confetti(centerX, centerY));
    }
  }
  
  class Confetti {
    //plutôt que de vrais confettis, je voulais que ce soit le même icon qu'utilisé dans le json pour les "crédits de la Liste rouge"
    //au début icon en blanc, mais on ne le voyait pas assez ; impossible de le mettre en noir car on ne le verrait pas dans les "crédits"
    //essais d'ajouter une couleur aléatoire grâce à P5.js (this.color) mais ralentit beaucoup trop "l'explosion". ça irait pour la pluie mais pas pour l'effet "trigger"
    constructor(x, y) {
      this.pos = p.createVector(x, y);
      this.vel = p.createVector(p.random(-5, 5), p.random(-10, -2));
      this.acc = p.createVector(0, 0.2);
      this.size = p.random(10, 30);
    }
  
    update() {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
    }
  
    show() {
      p.image(confettiImg, this.pos.x, this.pos.y, this.size, this.size);
    }
  
    isOffScreen() {
      return this.pos.y > p.height || this.pos.x < 0 || this.pos.x > p.width;
    }
    };
  

  p.mouseDragged = function() {

    const percentage = p.getCoveredPercentage();
    //infos qui ne s'affichent que quand on a atteint le pourcentage défini.
    //problème : pourcentage défini à 62%, mais quand c'est disons 62,8 ça s'arrondit à 63%...
    if (percentage >= maxPercentage) {
      let messageContent = '<h1>En Suisse, 35% des mammifères sont des espèces menacées.</h1><br>Tu as découvert :'
//source : https://www.bafu.admin.ch/bafu/fr/home/themes/biodiversite/publications/publications-biodiversite/liste-rouge-mammiferes.html
      if (revealedImages[0]) {
        messageContent += '<br>le <b>lynx</b>';
      }
      if (revealedImages[1]) {
        messageContent += '<br>le <b>lièvre brun</b>';
      }
      if (revealedImages[2]) {
        messageContent += '<br>le <b>loup gris</b>';
      }
      if (revealedImages[3]) {
        messageContent += '<br>la <b>loutre d\'Europe</b>';
      }
      if (revealedImages[4]) {
        messageContent += '<br>le <b>putois</b>';
      }
      if (revealedImages[5]) {
        messageContent += '<br>le <b>lapin de garenne</b>';
      }
      
      messageContent += '<br><br>Le rugissement que tu entends est celui de l\'<b>ours brun</b>, mais tu ne l\'entendras plus en Suisse : il est éteint.<br><br>Source des illustrations : Buffon, <i>Histoire naturelle</i> (compilées par Thierry Hoquet, <i>Buffon illustré</i>),';

      document.getElementById('message').innerHTML = messageContent;

      if (!successSound.isPlaying()) {
        successSound.play();
      }
        
      triggerConfetti();
      
      completeMiniGame('lynx');

      //pour afficher la progression dans le bouton "Les mammifères grands et moyens"
      const lynxButton = document.querySelector('button[onclick="loadGame(\'lynx\')"]');
      if (lynxButton) {
        lynxButton.classList.add('button-lynx');
      }
      return;
    }

    const x = Math.floor(p.mouseX);
    const y = Math.floor(p.mouseY);

    if (x >= 0 && y >= 0 && x < p.width && y < p.height) {
      topLayer.erase();
      topLayer.ellipse(x, y, brushSize, brushSize);
      topLayer.noErase();

      const radiusSquared = (brushSize / 2) ** 2;
      for (let i = Math.max(0, y - brushSize / 2); i < Math.min(p.height, y + brushSize / 2); i++) {
        for (let j = Math.max(0, x - brushSize / 2); j < Math.min(p.width, x + brushSize / 2); j++) {
          const dx = j - x;
          const dy = i - y;
          if (dx * dx + dy * dy <= radiusSquared) {
            const index = i * p.width + j;
            if (!hasModified[index]) {
              hasModified[index] = true;
              modifiedPixels++;

              //Vérifier que les pixels effacés correspondent à une certaine "zone", cad celle de la vignette au-dessous. DOnc donner les mêmes dimensions (2x3 etc) pour chaque jeu.
              for (let imgIndex = 0; imgIndex < images.length; imgIndex++) {
                const col = imgIndex % 3;
                const row = Math.floor(imgIndex / 3);
                const cellWidth = p.width / 3;
                const cellHeight = p.height / 2;

                const xStart = col * cellWidth;
                const yStart = row * cellHeight;

                if (j >= xStart && j < xStart + cellWidth && i >= yStart && i < yStart + cellHeight) {
                  revealedImages[imgIndex] = true;
                }
              }
            }
          }
        }
      }
    }

    // Mise à jour de la barre de progression : la barre doit atteindre 100% quand on atteint maxPercentage (65)
const progressBar = document.getElementById('progress-bar');
const progressBarWidth = p.map(percentage, 0, maxPercentage, 0, 100);
progressBar.style.width = progressBarWidth + '%';

    if (!soundPlaying) {
      sound.loop();
      soundPlaying = true;
    }
    //empêcher que le son continue en boucle une fois qu'on clique sur un autre bouton pour jouer à un autre jeu.
  };

  p.mouseReleased = function() {
    if (soundPlaying) {
      sound.stop();
      soundPlaying = false;
    }
    //son du papier/dessin, lié à la pression de la souris.
  };

  p.getCoveredPercentage = function() {
    return (modifiedPixels / totalPixels) * 100;
  };

  p.stopSuccessSound = function() {
    if (successSound && successSound.isPlaying()) {
      successSound.stop();
    }
  };
}
