export default function(p) {
  let bottomImg, topImg, topLayer;
  let modifiedPixels = 0;
  let totalPixels;
  let hasModified = [];
  const brushSize = 80;
  const maxPercentage = 42; 
  let successSound;
  let confetti = [];
  let confettiImg;
  let sound;
  let soundPlaying = false;

  const imagePaths = [
    '/images/tetras.png',
    '/images/Engoulevent.png',
    '/images/grandduc1.png',
    '/images/harle.png',
    '/images/heron.png',
    '/images/perdrix.png'
  ];

  let images = [];
  let revealedImages = [];
  let totalPixelsPerImage;
  let modifiedPixelsPerImage;

  p.preload = function() {
    for (let path of imagePaths) {
      images.push(p.loadImage(path));
    }

    topImg = p.loadImage('/images/papier.avif');
    sound = p.loadSound('/sounds/scratching.mp4');
    successSound = loadSound('/sounds/successOiseau.mp3');
    successSound.setVolume(0.1);
    confettiImg = loadImage('/images/PICoiseau.png');
  };

  p.setup = function() {
    p.createCanvas(720, 380);

    const canvasElement = p.canvas;
    canvasElement.classList.add('canvas-center');

    bottomImg = p.createGraphics(p.width, p.height);

    const maxImagesPerRow = 3;
    const maxRows = 2;
    const canvasWidth = bottomImg.width;
    const canvasHeight = bottomImg.height;
    const cellWidth = canvasWidth / maxImagesPerRow;
    const cellHeight = canvasHeight / maxRows;

    for (let i = 0; i < images.length; i++) {
      const img = images[i];

      const newWidth = cellWidth;
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
    totalPixelsPerImage = (p.width * p.height) / images.length;
    modifiedPixelsPerImage = new Array(images.length).fill(0);
    revealedImages = new Array(images.length).fill(false);
    hasModified = new Array(p.width * p.height).fill(false);


    p.noStroke();
  };

  p.draw = function() {
    p.image(bottomImg, 0, 0);
    p.image(topLayer, 0, 0);

    for (let i = confetti.length - 1; i >= 0; i--) {
      confetti[i].update();
      confetti[i].show();

      if (confetti[i].isOffScreen()) {
        confetti.splice(i, 1);
      }
    }

  };

  function triggerConfetti() {
    const centerX = p.width / 2;
    const centerY = p.height / 2;

    for (let i = 0; i < 20; i++) {
      confetti.push(new Confetti(centerX, centerY));
    }
  }

  class Confetti {
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
  }

  p.mouseDragged = function() {
    const percentage = p.getCoveredPercentage();
  
    if (percentage >= maxPercentage) {
      let messageContent = '<h1>En Suisse, 60% des oiseaux nicheurs sont des espèces menacées.</h1><br>Tu as réussi à trouver :';
  
      // Affichage des oiseaux révélés
      if (revealedImages[0]) { messageContent += '<br>le <b>grand tétras</b>'; }
      if (revealedImages[1]) { messageContent += '<br>l\'<b>engoulevent</b>'; }
      if (revealedImages[2]) { messageContent += '<br>le <b>hibou grand duc</b>'; }
      if (revealedImages[3]) { messageContent += '<br>le <b>harle huppé</b>'; }
      if (revealedImages[4]) { messageContent += '<br>le <b>héron cendré</b>'; }
      if (revealedImages[5]) { messageContent += '<br>la <b>perdrix</b>'; }
  
      messageContent += '<br><br>Le chant que tu entends est celui du <b>cochevis huppé</b>. Il est éteint en Suisse depuis 1976.<br><br>';
      
      document.getElementById('message').innerHTML = messageContent;
  
      // Jouer le son de succès si ce n'est pas déjà fait
      if (!successSound.isPlaying()) {
        successSound.play();
      }
  
      // Déclencher la confettis et le mini-jeu
      triggerConfetti();
      completeMiniGame('oiseau');
  
      const perdrixButton = document.querySelector('button[onclick="loadGame(\'oiseau\')"]');
      if (perdrixButton) {
        perdrixButton.classList.add('button-perdrix');     
        return;
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
                    
                    const imgIndex = getImageIndex(j, i);
                    if (imgIndex !== -1) {
                        modifiedPixelsPerImage[imgIndex]++;
                        if (modifiedPixelsPerImage[imgIndex] >= totalPixelsPerImage * 0.4) {
                            revealedImages[imgIndex] = true;
                        }
              }
            }
          }
        }
      }
    }

    function getImageIndex(x, y) {
      const maxImagesPerRow = 3;
      const maxRows = 2;
      const cellWidth = p.width / maxImagesPerRow;
      const cellHeight = p.height / maxRows;
  
      const col = Math.floor(x / cellWidth);
      const row = Math.floor(y / cellHeight);
      const index = row * maxImagesPerRow + col;
  
      return index < images.length ? index : -1;
  }
  
    // Mise à jour de la barre de progression : la barre doit atteindre 100% quand on atteint maxPercentage (65)
    const progressBar = document.getElementById('progress-bar');
    const progressBarWidth = p.map(percentage, 0, maxPercentage, 0, 100);
    progressBar.style.width = progressBarWidth + '%';
  
    if (!soundPlaying) {
      sound.loop();
      soundPlaying = true;
    }
  };
  

  p.mouseReleased = function() {
    if (soundPlaying) {
      sound.stop();
      soundPlaying = false;
    }
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
