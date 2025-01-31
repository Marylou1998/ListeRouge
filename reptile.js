export default function(p) {
  let bottomImg, topImg, topLayer;
  let modifiedPixels = 0; 
  let totalPixels; 
  let hasModified = [];
  const brushSize = 80;
  const maxPercentage = 21; //21
  let successSound;
  let confetti = [];
  let confettiImg;
  let sound;
  let soundPlaying = false;

  const imagePaths = [
    '/images/cistudeEurope.png',
    '/images/vipereAspic.png',
    '/images/couleuvreViperine.png',
    '/images/couleuvreCollier.png',
    '/images/couleuvreVerteJaune.png',
    '/images/couleuvreCoronnelleLisse.png',
    '/images/couleuvreEsculape.png',
    '/images/orvet.png',
    '/images/LezardVert.png'
  ];

  let images = [];
  let revealedImages = [];


  p.preload = function() {
    for (let path of imagePaths) {
      images.push(p.loadImage(path));
    }
    topImg = p.loadImage('/images/papier.avif');
    sound = p.loadSound('/sounds/drawing.mp3');
    successSound = p.loadSound('/sounds/jurassic.wav');
    successSound.setVolume(0.1);
    confettiImg = p.loadImage('/images/PICreptile.png');
  };

  p.setup = function() {
    p.createCanvas(720, 500);

    const canvasElement = p.canvas;
    canvasElement.classList.add('canvas-center');

    bottomImg = p.createGraphics(p.width, p.height);

    const maxImagesPerRow = 3;
    const maxRows = 3; 
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
    hasModified = new Array(totalPixels).fill(false);

    revealedImages = new Array(images.length).fill(false);

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
    }
    

   
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
      };
    
    
  
    p.mouseDragged = function() {
  
    const percentage = p.getCoveredPercentage();
    if (percentage >= maxPercentage) {
      let messageContent = '<h1>En Suisse, 80% des reptiles sont des espèces menacées.</h1><br>Tu as découvert:';
        //source : https://www.bafu.admin.ch/bafu/fr/home/themes/biodiversite/publications/publications-biodiversite/liste-rouge-reptiles.html
    if (revealedImages[0]) {
      messageContent += '<br>la <b>cistude d\'Europe</b>';
    }
    if (revealedImages[1]) {
      messageContent += '<br>la <b>vipère aspic</b>';
    }
   if (revealedImages[2]) {
      messageContent += '<br>la <b>couleuvre vipérine</b>';
    }
    if (revealedImages[3]) {
      messageContent += '<br>la <b>couleuvre à collier</b>';
    } 
    if (revealedImages[4]) {
      messageContent += '<br>la <b>couleuvre verte et jaune</b>';
    } 
       if (revealedImages[5]) {
      messageContent += '<br>la <b>couleuvre lisse</b>';
    }
    if (revealedImages[6]) {
      messageContent += '<br>la <b>couleuvre d\'Esculape</b>';
    }
    if (revealedImages[7]) {
      messageContent += '<br>l\'<b>orvet</b>';
    }
    if (revealedImages[8]) {
      messageContent += '<br>le <b>lézard vert</b>';
    }

    messageContent += '<br><br>Mais le <b>bruit</b> que tu viens d\'entendre n\'est celui d\'aucun d\'entre elles : il n\'y a pas de reptiles éteints en Suisse !<br><br>En fait, tu auras peut-être reconnu le cri du Vélociraptor dans <i>Jurassic Park</i>, qui a été produit grâce à... des cris de tortue !';

    document.getElementById('message').innerHTML = messageContent;


        if (!successSound.isPlaying()) {
          successSound.play();
        }
          
        triggerConfetti();

        completeMiniGame('reptile');

        const couleuvreButton = document.querySelector('button[onclick="loadGame(\'reptile\')"]');
        if (couleuvreButton) {
          couleuvreButton.classList.add('button-couleuvre');
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
  
                for (let imgIndex = 0; imgIndex < images.length; imgIndex++) {
                  const col = imgIndex % 3;
                  const row = Math.floor(imgIndex / 3);
                  const cellWidth = p.width / 3;
                  const cellHeight = p.height / 3;
  
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

      // Mise à jour de la barre de progression : la barre doit atteindre 100% quand on atteint maxPercentage (21)
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
