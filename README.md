<h1>Description du projet</h1>
Représenter la masse d'espèces vulnérables ou en danger en Suisse en reprenant les données de L'Office fédéral de l'environnement OFEV sur les Listes rouges. https://www.bafu.admin.ch/bafu/fr/home/themes/biodiversite/publications/publications-biodiversite/liste-rouge-especes-menacees.html

<h2>Données : Liste Rouge de l'OFEV</h2>
Les données sont celles indiquées par les Listes rouges de l'Office fédéral de l'environnement OFEV.
Les classes choisies ont été : 1. Moyens et grands mammifères 2. Reptiles 3. Amphibiens 4. Oiseaux nicheurs

Les espèces représentées sont les espèces : 
<il>Au bord de l'extinction (CR)</il>
<il>En danger (EN)</il>
<il>Vulnérable (VU)</il>
Ces espèces sont compilées dans un fichier json : 
![image](https://github.com/user-attachments/assets/788dc1b5-1561-477b-badd-8d74b8ea0788)
Le fichier Json donne les informations suivantes : l'icône pour représenter à quelle classe l'animal appartient - le nom de l'espèce - son degré sur la liste rouge (CR, EN, VU).
Les espèces éteintes en Suisse (RE) sont utilisées pour le système de récompense.
![image](https://github.com/user-attachments/assets/ee358824-53da-4606-8199-33229e9c31de)

<h2>Mécaniques du jeu</h2>
<h3>Calcul du pourcentage</h3>
La mécanique principale de jeu est d'empêcher le joueur de continuer à gratter lorsqu'il a atteint un certain pourcentage. Il ne peut donc pas débloquer toutes les espèces, ou du moins pas les voir complètement. Le pourcentage auquel le jeu se bloque est le pourcentage d'espèces qui ne sont pas menacées ; le joueur n'a donc pas accès au pourcentage d'espèces menacées, qui restent cachées sous le layer blanc.

Exemple : pour le mini-jeu "Amphibiens", 21% des espèces ne sont pas menacées et peuvent donc être dessinées. 79% des espèces sont menacées et restent donc cachées.
![image](https://github.com/user-attachments/assets/74967e45-a530-4708-a94c-69306786ac3a)

<h3>Récompense par mini-jeu</h3>
Lorsqu'un mini-jeu est terminé, le joueur obtient des petites récompenses immédiates : 
<il>Le nom des espèces qu'il a réussi à découvrir en grattant la zone à dessiner sont révélées.</il>
<il>Il découvre une espèce disparue en Suisse (sauf pour les reptiles qui ne comprennent pas d'espèces régionalement disparues. Pour ce cas, on révèle une anecdote sur le cri de la tortue pour réaliser le cri du vélociraptor dans <i>Jurassic Park</i>). Notamment, le cri que faisait cet animal se déclenche.</il>
<il>On donne aussi les références des vignettes et du cri de l'animal disparu.</il>
<il>Un petit effet de confettis se déclenche avec l'icône de l'espèce.</il>
Exemple pour l'icône amphibien : 
![image](https://github.com/user-attachments/assets/8803386b-023a-4412-93c8-ab9ab00105d8)
Cet icône sera repris ensuite dans la récompense finale.
Au niveau de l'avancée graphique, le bouton correspondant à l'espèce terminée se remplit au pourcentage correspondant : 
![image](https://github.com/user-attachments/assets/d22fda8d-dea0-4724-88ae-0e5380a0ee43)

<h3>Récompense finale</h3>
Le joueur a accès aux "crédits", c'est-à-dire la liste complète des espèces menacées en Suisse pour les classes sélectionnées.
![image](https://github.com/user-attachments/assets/096b2e85-d826-4e8b-abdf-ee6730f07ac9)

<h1>Librairie utilisée: P5.js</h1>
P5.js est exporté directement dans le code, et est utilisé dans le "canva" (zone de dessin) de chaque mini-jeu, et est utilisé pour permettre de générer des effets visuels 

exemple : les confettis, notamment pour les faire partir du centre du canva, et pour calculer leur vitesse, comment ils "tombent", leur nombre...

P5.js est aussi utilisé dans la gestion des couches du canva :
<ul>Le background : les vignettes des animaux. Ce layer n'est pas interactif.</ul>
<ul>Une couche supérieure : la zone de dessin à gratter. Le pourcentage est calculé sur cette couche.</ul>
<ul>Une couche intermédiaire, fractionnée en plusieurs zones couvrant exactement la zone de la vignette en-dessous d'elle. Elle permet de calculer si un pixel a été modifié sur la couche de surface qui correspond à la zone d'une vignette. Si un pixel a été modifié, alors le nom de la vignette correspondant apparaît dans la liste des espèces découvertes.</ul>

<h1>Sources graphiques</h1>
M. Dumont de Sainte-Croix, <i>Dictionnaire des sciences naturelles. Planches. Zoologie : Poissons et reptiles</i>, 1816
M. Dumont de Sainte-Croix, <i>Dictionnaire des sciences naturelles. Planches. Zoologie : Ornithologie</i>, 1816
Thierry Hoquet, <i>Buffon Illustré, Publications scientifiques du Muséum</i>, 2007
Raymond Rollinat, <i>La Vie des reptiles de la France centrale</i>, 1939

<h1>Sources audio</h1>
https://soundeffects.fandom.com/wiki/Jurassic_Park,_Velociraptor_-_Roar#Audio_Samples
https://www.batraciens-reptiles.com/viridislesbos2.mp3
Jean-Claude Roché, <i>La Vie secrète des champs et des pâturages</i>, 1999

<h1>Contexte de développement</h1>
Ce projet a été développé dans le cadre du cours <i>Développement de jeu vidéo 2D</i>, dispensé par Isaac Pante (SLI, Lettres, UNIL, Semestre de printemps 2023).
