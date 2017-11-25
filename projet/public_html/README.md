# Mini-projet en PHP : Développement d'un jeu de solitaire

## Préambule

#### Test en serveur local

Afin de tester le fonctionnement de l'application fournie, il faut au préalable créer un VirtualHost dont la racine pointe vers le dossier `public_html` afin d'assurer le fonctionnement correct de l'application.



**Attention**, WAMP permet l'accès au VirtualHost via `localhost/myVirtualHostName/` ce qui compromet le bon fonctionnement de l'application, pour éviter ce problème accéder directement à `myVirtualHostName/`.

#### Dépendances

Cette application est conçue pour fonctionner sur un serveur Apache (2.0) avec PHP 7.1.* (pseudo-typage et divers correction de problèmes de sécurité) ainsi que MySQL (version >=5.7.14).

Il y a également deux dépendances optionnelles, à savoir [NodeJS](https://nodejs.org/en/download/) (pour npm) et [composer](https://getcomposer.org/download/).



Afin de faciliter la mise en place de ces dépendances, les dernières versions de [WAMP](http://wampserver.aviatechno.net/), [XAMPP](https://www.apachefriends.org/fr/index.html) permettent d'obtenir des versions de PHP, Apache et MySQL suffisante (sous Linux, les paquets s'installent un par un via apt-get).

De surcroit WAMP propose un utilitaire de création de VirtualHost afin de faciliter la tâche précédente.



#### Mise à jour des dépendances de développement

Afin de mettre à jour toutes les dépendances de développement (diverses bibliothèques) il faut :

* Se munir d'un terminal compatible avec les commandes d'un bash linux classique
* Se rendre dans le dossier `dev`  (et non `dev..`)
* Exécuter `npm run bulk`, cela mettra à jour les dépendances javascript et CSS
* Une fois fini, exécuter `cd ..`
* Enfin exécuter `composer update && composer dump-autoload` ce qui mettra à jour les dépendances PHP et regénérera l'autoloader