export default function(p) {
  let bottomImg, topImg, topLayer;
  let modifiedPixels = 0;
  let totalPixels;
  let hasModified = [];
  const brushSize = 80;
  const maxPercentage = 21;
  let successSound;
  let confetti = [];
  let confettiImg;
  let sound;
  let soundPlaying = false;

  const imagePaths = [
    '/images/salamandreTachetee.png',
    '/images/grenouilleVerte.png',
    '/images/crapaudAccoucheur.png',
    '/images/tritonPonctue.png'
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
      sound = p.loadSound('/sounds/drawing.mp3');
      successSound = loadSound('/sounds/successAmphibien.mp3');
      successSound.setVolume(0.1); 
      confettiImg = loadImage('/images/PICamphibien.png'); 
    
  };

    p.setup = function() {
      p.createCanvas(720, 410);

      document.getElementById('progress-bar').style.width = '0%';
    
      const canvasElement = p.canvas;
      canvasElement.classList.add('canvas-center');
    
      bottomImg = p.createGraphics(p.width, p.height);
    
      const imagesPerRow = [2, 2];
      const canvasWidth = bottomImg.width;
    
      // Définir les proportions des hauteurs
      const totalHeight = p.height;
      const firstRowHeight = (3 / 5) * totalHeight; //les images de la première ligne sont 3/5 plus grandes que celles de la deuxième !
      const secondRowHeight = totalHeight - firstRowHeight;
      const rowHeights = [firstRowHeight, secondRowHeight];
    
      let imageIndex = 0;
    
      for (let row = 0; row < imagesPerRow.length; row++) {
        const imagesInThisRow = imagesPerRow[row];
        const cellWidth = canvasWidth / imagesInThisRow;
        const cellHeight = rowHeights[row];
    
        for (let col = 0; col < imagesInThisRow; col++) {
          if (imageIndex >= images.length) break;
    
          const img = images[imageIndex];
    
          const newWidth = cellWidth; 
          const scaleFactor = cellWidth / img.width;
          const newHeight = img.height * scaleFactor;
    
          const xOffset = col * cellWidth + (cellWidth - newWidth) / 2;
          const yOffset = row === 0 ? 0 : firstRowHeight;
    
          bottomImg.image(img, xOffset, yOffset + (cellHeight - newHeight) / 2, newWidth, newHeight);
    
          imageIndex++;
        }
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
let messageContent = '<h1>En Suisse, 79% des amphibiens sont des espèces menacées.</h1><br>Tu as réussi à trouver :';
       //source : https://www.bafu.admin.ch/bafu/fr/home/themes/biodiversite/publications/publications-biodiversite/liste-rouge-amphibiens.html
        if (revealedImages[0]) {
          messageContent += '<br>la <b>salamandre tachetée</b>';
        }
        if (revealedImages[1]) {
          messageContent += '<br>la <b>grenouille verte</b>';
        }
        if (revealedImages[2]) {
          messageContent += '<br>le <b>crapaud accoucheur</b>';
        }
        if (revealedImages[3]) {
          messageContent += '<br>le <b>triton ponctué</b>';
        }
        messageContent += '<br><br>Le chant que tu entends est celui d\'un crapaud vert. Le dernier crapaud vert de SUisse a dû faire, lui aussi, cet appel solitaire, lorsqu\'il s\'est éteint en 1980.';

        document.getElementById('message').innerHTML = messageContent;

        if (!successSound.isPlaying()) {
          successSound.play();
        }
            
        triggerConfetti();
       
        completeMiniGame('amphibien');


        const amphibienButton = document.querySelector('button[onclick="loadGame(\'amphibien\')"]');

  if (amphibienButton) {
    amphibienButton.classList.add('button-salamandre');
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
                if (modifiedPixelsPerImage[imgIndex] >= totalPixelsPerImage * 0.2) {
                  revealedImages[imgIndex] = true;
                }
              }
            }
          }
        }
      }
      
      function getImageIndex(x, y) {
        const maxImagesPerRow = 2;
        const canvasWidth = p.width;
        const canvasHeight = p.height;
      
        const cellWidth = canvasWidth / maxImagesPerRow;
        const firstRowHeight = (2 / 3) * canvasHeight;
        const secondRowHeight = (1 / 3) * canvasHeight;
      
        for (let imgIndex = 0; imgIndex < images.length; imgIndex++) {
          const col = imgIndex % maxImagesPerRow;
          const row = Math.floor(imgIndex / maxImagesPerRow);
          const cellHeight = row === 0 ? firstRowHeight / 2 : secondRowHeight / 2;
          const xStart = col * cellWidth;
          const yStart = row === 0 ? 0 : firstRowHeight;
      
          if (x >= xStart && x < xStart + cellWidth && y >= yStart && y < yStart + cellHeight) {
            return imgIndex;
          }
        }
        return -1;
      }
    }      

// Mise à jour de la barre de progression : la barre doit atteindre 100% quand on atteint maxPercentage (20)
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
