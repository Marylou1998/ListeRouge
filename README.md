Ce jeu a été créé avec P5.js et javascript "adapté" à P5.js. ChatGPT a été utilisé pour m'aider à comprendre la structure du code, et comprendre à quel niveau ajouter les fonctions pour qu'elles fonctionnent correctement
L'utilisation de ChatGPT a permis d'aller beaucoup plus loin dans le développement du jeu vidéo. Pour référence, voir la première version "fonctionnelle" du jeu, sans les ajouts pour lesquels j'ai eu besoin d'utiliser chatGPT : "version 1"

Pour les images de fonds : au début j'utilisais une image représentative pour chaque espèce, mais ça faussait la visée du jeu : les gens pensaient que c'était un jeu de coloriage où il ne fallait pas dépasser. En mettant juste une image blanche au lieu du dessin par-dessus l'animal, l'instinct était quand même de trouver le lynx, et c'était OK pour le lynx qui a 65% disponibles, mais très frustrant pour la salamandre qui n'en a que 21%. J'ai renoncé à l'image unique et j'ai décidé de mettre plusieurs vignettes ; ça permettait aussi de développer les récompenses, comme un petit jeu de cache-cache pour trouver le plus possible d'espèces avec un pourcentage défini disponible.
Je pourrais rajouter : un bouton "essayer à nouveau".

Les vignettes proviennent des sources suivantes : 
   Dumont de Sainte-Croix, Dictionnaire des sciences naturelles. Planches. 
     - Zoologie : Ortnithologie                                                     --> https://archive.org/details/b29334676_0006/
     - Zoologie : poissons et reptiles                                              --> https://gallica.bnf.fr/ark:/12148/bpt6k9681871m/f393.item#
   Raymond Rollinat, La Vie des reptiles de la France centrale                      --> https://gallica.bnf.fr/ark:/12148/bpt6k6581584b/
   Buffon, Histoire naturelle (compilées par Thierry Hoquet, Buffon illustré)       --> https://books.openedition.org/mnhn/3049

J'ai choisi les vignettes selon les espèces qui étaient en danger dans la Liste rouge pour chaque classe. J'ai choisi les 4 classes actuelles (mammifères grands et moyens, oiseaux nicheurs, amphibiens et reptiles) par intérêt personnel. Exclu les petits mammifères car je ne les trouvais pas dans Buffon (c'est le premier mini-jeu que j'ai fait en utilisant ces vignettes. Plus tard je les ai trouvles dans les planches du Dictionnaire des sciences naturelles, mais j'ai décidé de garder Buffon pour avoir 3 auteurs différents, et des vignettes variées).
On peut probablement déployer le jeu pour toutes les classes, le seul problème serait a priori le son... mais on peut trouver des solutions créatives, comme pour celui des reptiles --> ici solution trouvée parce qu'il n'existe pas de reptile éteint en Suisse ; le clin d'oeil à une espèce éteinte depuis de millions d'années en utilisant le son d'une tortue me paraissait légitime. Néanmoins après mes premiers tests, ça n'a pas été tant compris que ça - moins de gens que ce que je pensais ont regardé Jurassic Park. J'ai choisi, arbitrairement, de le garder quand même. Une alternative aurait été d'utiliser un bruit de dragon ; mais je préférais celui du vélociraptor parce que si le son est tout autant fictif, il a été créé grâce à des bruits de tortue ce qui fait le lien avec la cistude d'Europe.

Pour le pourcentage, difficulté principale : les gens ne voient pas tout de suite le rapport entre le "pourcentage disponible" et le "pourcentage d'espèces menacées en Suisse". J'ai essayé d'appuyer sur ce lien dans le petit texte d'introduction ; pas sûre que ce soit optimal. Mais il n'est pas logique de s'arrêter au pourcentage d'espèces menacées non plus...
Je pourrais rajouter : une progression en couleur en direct du pourcentage pour donner une indication du pourcentage restant.

Pour les confettis : en partant de l'animation confetti de https://editor.p5js.org/slow_izzm/sketches/H1fhGJSaX
Mais je voulais des confettis qui soient une image plutôt. J'ai décidé de ne pas modifier leur surface. J'ai aussi préféré un effet "explosion" depuis le centre de l'écran plutôt qu'une pluie continue.
J'aurais voulu les colorier aléatoirement à partir de mon png blanc fonds transparent. Le code fonctionnait très bien mais c'était trop lourd, ça ralentissait l'explosion et je n'ai pas réussi à régler le problème.

Pour la sidebar : je voulais les informations sur les espèces présentées dans les vignettes (celles qui étaient "découvertes", mais aussi sur la classe en général. Je voulais aussi donner les sources des vignettes et du son utilisé, et l'histoire de ce son.
Pour les crédits : fichier json qui regroupe toutes les espèces en danger (excepté les espèce vulnérables) en Suisse selon les derniers états de la Liste rouge de l'OFEV. Je voulais que les infos soit très succinte : le nom de l'espèce et son statut. J'ai décidé de rajouter les icon car certains noms d'espèces sont (ou me sont) totalement inconnus ; l'icon permet de savoir quel type d'animal c'est.
J'aurais bien aimé faire une animation style crédits de fin de film au milieu de l'écran avec une musique, mais ça aurait caché la dernière explosion de confetti et le dernier bruit d'animal. Pas trouvé d'autre solution à ce jour...

Esthétique général : la plus minimaliste possible. Utilisation d'une police un peu fantaisite, mais esthétique noir-blanc... 
J'ai créé les images de fonds noir sur procreate avec une simple brush de peinture. J'en ai créé 2 différentes, une pour la progression des boutons et l'autre pour les crédits.
