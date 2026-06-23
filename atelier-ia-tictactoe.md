# Atelier IA et Tic-Tac-Toe

## Public cible

Élèves de 10 à 14 ans


## Durée suggérée

| Section | Temps |
|----------|------:|
| Introduction + Acte 1 | 7 min |
| Acte 2 – Création des données | 12 min |
| Acte 3 – Entraînement de l'IA | 5 min |
| Acte 4 – Jouer contre l'IA | 10 min |
| Acte 5 – Limites de l'apprentissage | 8 min |
| Acte 6 – IA à partir des règles | 8 min |
| Conclusion | 5 min |
| **Total** | **55 min** |

## Durée

55 minutes

---

# Positionnement pédagogique

Cet atelier vise à faire découvrir qu'il existe plusieurs façons de construire une intelligence artificielle.

Les élèves entraînent d'abord une IA par apprentissage supervisé à partir de parties gagnantes de Tic-Tac-Toe.

Ils découvrent ensuite les limites de cette approche et la comparent à une approche basée sur le raisonnement et l'exploration des possibilités (Minimax).

L'objectif n'est pas d'apprendre TensorFlow ou Minimax en détail, mais de comprendre les différentes façons dont une IA peut prendre des décisions.

---

# Question centrale

**Comment apprendre à un ordinateur à jouer à un jeu ?**

Tout au long de l'atelier, les élèves exploreront différentes réponses à cette question.

Ils découvriront notamment qu'un ordinateur peut :

- apprendre à partir d'exemples ;
- imiter les stratégies observées chez les gagnants ;
- prendre des décisions à partir des règles du jeu ;
- combiner plusieurs approches.

---

# Messages clés

## Message 1

Une IA peut apprendre à partir d'exemples.

## Message 2

La qualité d'une IA dépend de la qualité des données utilisées pour l'entraîner.

## Message 3

Une IA n'apprend pas nécessairement les règles.

## Message 4

Il existe plusieurs façons de construire une IA.

## Message 5

Certaines IA apprennent à partir de données.

D'autres prennent des décisions à partir de règles et de raisonnement.

## Message 6

Une IA ne sait pas qu'elle a raison.

Elle estime simplement quelle réponse est la plus probable selon ce qu'elle a appris.

---

# Ligne narrative

## Acte 1 — Comment apprendre à un ordinateur à jouer ?

Question au groupe :

> Comment enseigneriez-vous le Tic-Tac-Toe à un ordinateur ?

Discussion rapide.

Faire émerger différentes idées :

- lui montrer des parties;
- lui expliquer les règles;
- lui montrer les bons coups;
- le laisser jouer.

### Introduction très brève à la théorie des jeux

La théorie des jeux étudie les stratégies utilisées lorsqu'on doit prendre des décisions contre un adversaire.

Le Tic-Tac-Toe est un exemple simple de ce type de jeu.

### Découverte du jeu

Les élèves se placent en équipes de deux.

À l'aide de l'application en mode **Standard**, ils jouent quelques parties de Tic-Tac-Toe afin de se familiariser avec le fonctionnement du jeu et de l'application.

Questions à poser pendant l'activité :

- Existe-t-il une stratégie pour gagner ?
- Peut-on toujours gagner ?
- Peut-on forcer une partie nulle ?

Transition :

> Maintenant que nous savons jouer, comment pourrions-nous apprendre ce jeu à un ordinateur ?

---

## Acte 2 — Enseigner par l'exemple

Jusqu'à maintenant, nous avons joué nous-mêmes au Tic-Tac-Toe.

Pour apprendre à un humain à jouer, on pourrait lui expliquer des stratégies :

- commencer par le centre;
- bloquer son adversaire;
- créer des pièges;
- prévoir les prochains coups.

Mais allons essayer une autre approche.

> Et si nous ne donnions aucune stratégie à l'ordinateur ?

> Et si nous lui montrions simplement des exemples de parties gagnantes ?

C'est l'idée derrière de nombreuses intelligences artificielles modernes.

Au lieu de recevoir une liste de règles ou de stratégies, l'IA observe des exemples et tente de reconnaître des modèles.

Elle apprend à partir de ce qu'elle voit.

Notre objectif sera donc de créer des données d'entraînement pour l'IA.

Pour chaque coup joué par le gagnant, l'application enregistrera :

- l'état du plateau avant le coup;
- le coup qui a été joué.

Question :

> Si nous montrons suffisamment de bons exemples à l'ordinateur, pourra-t-il apprendre à jouer lui aussi ?

### Activité — Créons les données d'entraînement

Les élèves ouvrent l'application en mode **Entraînement IA**.

#### Étape 1

Former des équipes de deux joueurs.

#### Étape 2

Jouer une première partie de Tic-Tac-Toe.

Objectif :

> Essayer de gagner la partie.

#### Étape 3

À la fin d'une partie gagnante, cliquer sur le bouton permettant de visualiser les coups enregistrés.

Observer les exemples créés par l'application.

Pour chaque coup du joueur gagnant, l'application a enregistré :

- l'état du plateau avant le coup;
- le coup qui a été joué.

Observer également les compteurs affichés par l'application :

- nombre de parties enregistrées;
- nombre total d'exemples d'entraînement.

Discussion :

- Que représente chaque exemple ?
- Pourquoi l'application enregistre-t-elle plusieurs exemples pour une même partie ?
- Pourquoi l'application conserve-t-elle seulement les coups du gagnant ?
- Pourquoi y a-t-il plus d'exemples que de parties ?
- Combien d'exemples une seule partie peut-elle produire ?

Message :

Chaque exemple représente une situation rencontrée pendant la partie suivie du choix effectué par le joueur gagnant.

C'est ce type de données qui servira à entraîner l'IA.

L'IA n'apprendra pas à partir de parties complètes.

Elle apprendra à partir d'un grand nombre de petites décisions observées dans plusieurs parties.

#### Étape 4

Jouer plusieurs autres parties afin de créer davantage de données d'entraînement.

Objectif :

Constituer une collection d'exemples suffisamment grande et variée pour entraîner l'IA.

L'objectif n'est pas seulement d'obtenir beaucoup de données, mais également d'exposer l'IA à différentes situations de jeu :

- des débuts de partie;
- des milieux de partie;
- des fins de partie;
- différentes stratégies;
- différentes façons de gagner.

Observer l'évolution des compteurs pendant l'activité.

Objectif collectif suggéré :

- accumuler plusieurs parties gagnantes;
- atteindre un nombre important d'exemples d'entraînement pour l'ensemble de la classe.

Discussion :

- L'IA apprend-elle davantage avec 5 exemples ou avec 50 exemples ?
- Pourquoi est-il important de lui montrer des situations variées ?
- Le nombre d'exemples augmente-t-il plus vite que le nombre de parties ?
- Pourquoi ?

### Réflexion

Question :

> Est-ce que tous les coups joués par un gagnant sont forcément de bons coups ?

Discussion :

Un joueur peut gagner une partie même s'il a commis plusieurs erreurs en cours de route.

Certains coups enregistrés dans les données d'entraînement peuvent donc être excellents, moyens ou même relativement mauvais.

#### Exemple

Considérons la position suivante :

```text
X | X |
---------
O | O |
---------
| | 
```

C'est au tour de **O**.

Le meilleur coup est la case de droite sur la deuxième ligne :

```text
X | X |
---------
O | O | O
---------
| | 
```

La partie est immédiatement gagnée.

Mais imaginons que le joueur choisisse plutôt :

```text
X | X |
---------
O | O |
---------
O | | 
```

Ce n'est pas le meilleur coup.

Le joueur manque une victoire immédiate.

Cependant, son adversaire ne remarque pas l'occasion et commet une erreur au tour suivant.

Quelques coups plus tard, le joueur O finit quand même par gagner la partie.

Que va enregistrer l'application ?

Elle enregistrera ce coup dans les données d'entraînement puisqu'il provient du joueur gagnant.

Pourtant, ce n'était pas le meilleur choix.

Message important :

Les données d'entraînement ne sont pas parfaites.

Même lorsqu'on entraîne une IA à partir des parties gagnantes, certains exemples peuvent être de faible qualité.

L'IA apprendra à partir de ce qu'on lui montre, qu'il s'agisse de bonnes ou de mauvaises décisions.

Transition :

> Nous avons maintenant créé une collection d'exemples de coups gagnants.

> Voyons si l'ordinateur est capable d'apprendre à partir de ces exemples.

---

## Acte 3 — Entraîner l'IA

Nous avons maintenant créé une collection d'exemples d'entraînement.

Chaque exemple contient :

- un état du plateau;
- un coup joué par un gagnant.

Question :

> L'ordinateur est-il déjà capable de jouer ?

Non.

Pour l'instant, il ne possède qu'une collection d'exemples.

Il doit maintenant apprendre à reconnaître les liens entre les situations observées et les coups joués.

### Activité — Entraînons l'IA

#### Étape 1

Observer les statistiques affichées par l'application.

Questions :

- Combien de parties ont été enregistrées ?
- Combien d'exemples d'entraînement ont été recueillis ?

Discussion :

L'ordinateur va utiliser tous ces exemples pour apprendre.

#### Étape 2

Lancer l'entraînement du modèle.

Pendant l'entraînement, observer les informations affichées par l'application.

Question :

> Que fait l'ordinateur pendant cette étape ?

Discussion :

L'ordinateur analyse tous les exemples enregistrés.

Il cherche des ressemblances entre :

- certaines positions du plateau;
- les coups joués par les gagnants.

Message :

L'ordinateur ne mémorise pas simplement les parties.

Il essaie de découvrir des modèles dans les données.

#### Étape 3

Une fois l'entraînement terminé, discuter de ce que l'IA a appris.

Questions :

- A-t-elle appris les règles du jeu ?
- Connaît-elle les stratégies du Tic-Tac-Toe ?
- A-t-elle mémorisé tous les exemples ?

Discussion :

L'IA n'a reçu aucune explication sur les règles du jeu.

Elle a seulement observé des exemples.

Message :

L'IA a appris à associer certaines situations à certains coups.

### Réflexion

Imaginons que l'IA observe plusieurs fois la situation suivante :

```text
X | O |
---------
| X |
---------
O | |
```

et que les gagnants jouent souvent dans la même case.

Question :

> Que risque de faire l'IA lorsqu'elle reverra une situation semblable ?

Réponse attendue :

Elle aura tendance à reproduire le même choix.

Message :

L'IA ne sait pas pourquoi ce coup est bon.

Elle a simplement appris qu'il est souvent associé à une victoire.

### Analogie

Imaginez que vous vouliez apprendre à reconnaître un animal.

Vous pourriez :

- lire un livre expliquant toutes ses caractéristiques;
- ou regarder des centaines de photos.

Notre IA fonctionne davantage comme la deuxième approche.

Elle apprend à partir d'exemples.

### Transition

Nous avons entraîné notre IA.

Mais a-t-elle réellement appris à bien jouer ?

> Mettons-la à l'épreuve.

---

## Acte 4 — Mettons l'IA à l'épreuve

Notre IA a maintenant été entraînée à partir des exemples créés par la classe.

Question :

> Est-elle maintenant capable de bien jouer au Tic-Tac-Toe ?

> Pourra-t-elle nous battre ?

Il est maintenant temps de la mettre à l'épreuve.

---

### Activité — Jouons contre l'IA

#### Étape 1

Passer en mode :

**Jouer contre l'IA**

Avant de commencer, chaque équipe formule une hypothèse.

Questions :

* L'IA sera-t-elle facile ou difficile à battre ?
* Sera-t-elle aussi forte qu'un élève ?
* Pourra-t-elle gagner certaines parties ?
* Pourra-t-elle être imbattable ?

---

#### Étape 2

Jouer plusieurs parties contre l'IA.

Observer :

* les coups joués par l'IA;
* les victoires;
* les défaites;
* les matchs nuls.

Questions :

* L'IA semble-t-elle avoir appris quelque chose ?
* Est-elle difficile à battre ?
* Reproduit-elle certaines stratégies observées pendant l'entraînement ?
* Commet-elle encore des erreurs ?

Discussion :

Les élèves constatent généralement que l'IA ne joue plus au hasard.

Elle semble avoir appris certaines habitudes à partir des exemples observés pendant l'entraînement.

---

#### Étape 3

Observer le graphique de confiance affiché par l'application.

Question :

> Que représente ce graphique ?

Discussion :

Chaque point du graphique représente le niveau de confiance associé à un coup joué par l'IA.

Lorsqu'elle choisit un coup, l'IA estime à quel point cette décision lui semble appropriée selon ce qu'elle a appris pendant l'entraînement.

Par exemple :

```text
Coup 1 : 45 %
Coup 2 : 82 %
Coup 3 : 67 %
Coup 4 : 91 %
```

---

#### Étape 4

Comparer les niveaux de confiance observés pendant différentes parties.

Questions :

* La confiance est-elle toujours la même ?
* Certains coups semblent-ils inspirer davantage confiance à l'IA ?
* Pourquoi la confiance varie-t-elle d'un coup à l'autre ?

Discussion :

Certaines situations ressemblent davantage aux exemples observés pendant l'entraînement.

Dans ces cas, l'IA est généralement plus confiante.

D'autres situations lui sont moins familières.

Sa confiance peut alors être plus faible.

---

#### Étape 5

Interpréter la notion de confiance.

Question :

> Si l'IA affiche 90 % de confiance, cela signifie-t-il qu'elle a forcément raison ?

Discussion :

Non.

Une IA ne dit généralement pas :

> « J'ai raison. »

Elle dit plutôt :

> « Selon ce que j'ai appris, cette décision me semble être un bon choix. »

Il est donc possible qu'une IA soit très confiante et se trompe.

De la même façon, une IA peut parfois avoir peu confiance tout en choisissant un excellent coup.

---

### Réflexion

Question :

> L'IA comprend-elle réellement les règles du Tic-Tac-Toe ?

Discussion :

Non.

Elle ne connaît pas les règles du jeu.

Elle ne cherche pas toutes les possibilités.

Elle ne réfléchit pas comme un humain.

Elle reproduit simplement des modèles observés dans les données d'entraînement.

---

### Message clé

L'IA prend ses décisions à partir de ce qu'elle a appris.

Elle peut également estimer son niveau de confiance.

Mais ses décisions et sa confiance dépendent directement des exemples qu'on lui a montrés.

---

### Défi supplémentaire (si le temps le permet)

Certaines équipes ont peut-être réussi à battre l'IA ou à découvrir certaines de ses faiblesses.

Question :

> Pouvons-nous aider l'IA à devenir meilleure ?

#### Étape 1

Retourner en mode :

**Entraînement IA**

Supposons que vous ayez découvert une faiblesse de l'IA.

Par exemple :

* elle ne bloque pas toujours une menace;
* elle ignore parfois un meilleur coup;
* elle tombe souvent dans le même piège.

Mission :

Essayez maintenant de lui montrer comment éviter cette erreur.

Jouez quelques nouvelles parties en utilisant une meilleure stratégie.

Si possible, exploitez volontairement la faiblesse observée afin de gagner la partie.

L'objectif est de créer de nouveaux exemples qui montrent à l'IA ce qu'un gagnant devrait faire dans cette situation.

#### Étape 2

Réentraîner l'IA avec ces nouvelles données.

Observer :

* le nombre de parties enregistrées;
* le nombre d'exemples d'entraînement.

Question :

> Que devrait-il arriver lorsque l'IA dispose de davantage d'exemples ?

Chaque équipe formule une hypothèse.

#### Étape 3

Rejouer contre l'IA.

Questions :

* L'IA semble-t-elle avoir changé ?
* Est-elle plus difficile à battre ?
* Utilise-t-elle de nouvelles stratégies ?
* Certaines erreurs ont-elles disparu ?

### Discussion

L'IA apprend à partir des exemples qu'on lui fournit.

Lorsqu'on ajoute de nouvelles données, on modifie ce qu'elle apprend.

Ses décisions peuvent alors changer.

Les nouvelles parties que vous venez de jouer contiennent peut-être exactement les exemples qui lui manquaient pour mieux réagir dans certaines situations.

### Message clé

```text
Nouvelles données
        ↓
Nouvel entraînement
        ↓
Nouvelles décisions
```

Les données influencent directement le comportement de l'IA.

---

### Transition

Question :

> Si les décisions de l'IA dépendent des exemples observés, que se passerait-il si ces exemples étaient de mauvaise qualité ?

---

## Acte 5 — Peut-on apprendre de mauvaises habitudes à une IA ?

Jusqu'à maintenant, nous avons essayé d'aider notre IA.

Nous lui avons montré :

* des parties gagnantes;
* de bonnes stratégies;
* de nouveaux exemples.

Nous avons même vu qu'en ajoutant de nouvelles données, il était parfois possible d'améliorer son comportement.

Question :

> Que se passerait-il si nous lui montrions de mauvaises stratégies ?

L'IA serait-elle capable de s'en rendre compte ?

---

### Activité — Entraînons volontairement une mauvaise IA

#### Étape 1

Avant de commencer, effacer les données d'entraînement précédentes.

Question :

> Que pensez-vous qu'il arrivera si nous entraînons l'IA avec de mauvais exemples ?

Chaque équipe formule une hypothèse.

---

#### Étape 2

Passer en mode :

**Entraînement IA**

Mission :

Créer volontairement des parties contenant de mauvaises habitudes.

Par exemple :

* ignorer une victoire immédiate;
* ne pas bloquer un adversaire lorsqu'il le faudrait;
* jouer un coup moins efficace alors qu'un meilleur coup est disponible;
* retarder volontairement une victoire.

L'objectif n'est pas de perdre.

L'objectif est de gagner malgré ces mauvaises décisions.

Ainsi, ces coups seront enregistrés dans les données d'entraînement.

---

#### Étape 3

Observer l'un des exemples enregistrés.

Discussion :

Supposons la situation suivante :

```text
X | X |
---------
O |   |
---------
| O |
```

Question :

> Où devrait jouer X ?

Réponse attendue :

```text
X | X | X
---------
O |   |
---------
| O |
```

X devrait compléter la ligne et gagner immédiatement.

Mais imaginons que le joueur choisisse plutôt un autre coup.

S'il gagne malgré tout quelques tours plus tard, l'application enregistrera quand même ce coup.

Discussion :

Question :

> Ce coup a-t-il contribué à la victoire ?

Oui.

> Était-ce forcément le meilleur coup possible ?

Non.

---

#### Étape 4

Réentraîner l'IA avec ces nouvelles données.

Observer :

* le nombre de parties enregistrées;
* le nombre d'exemples utilisés pour l'entraînement.

Question :

> Comment pensez-vous que l'IA va se comporter maintenant ?

Chaque équipe formule une hypothèse.

---

#### Étape 5

Passer en mode :

**Jouer contre l'IA**

Jouer plusieurs parties.

Observer :

* les décisions prises par l'IA;
* les erreurs commises;
* les occasions manquées;
* les stratégies inhabituelles.

Questions :

* L'IA semble-t-elle différente ?
* Commet-elle davantage d'erreurs ?
* Reproduit-elle certaines mauvaises habitudes observées pendant l'entraînement ?
* Certaines situations semblent-elles moins bien gérées qu'avant ?

---

### Discussion

Question :

> Pourquoi l'IA reproduit-elle ces erreurs ?

Discussion :

L'IA ne connaît pas les règles du jeu.

Elle ne sait pas qu'un exemple est bon ou mauvais.

Elle ne sait pas qu'un coup aurait pu être meilleur.

Elle apprend simplement à partir des exemples qu'on lui montre.

Si les exemples contiennent de mauvaises habitudes, elle risque d'apprendre ces mauvaises habitudes.

---

### Réflexion

Question :

> Tous les coups joués par un gagnant sont-ils forcément de bons coups ?

Discussion :

Non.

Un joueur peut gagner une partie tout en commettant plusieurs erreurs.

Certaines décisions sont excellentes.

D'autres sont simplement suffisantes pour gagner.

L'IA est incapable de faire cette distinction toute seule.

---

### Message clé

```text
Mauvaises données
        ↓
Mauvais apprentissage
        ↓
Mauvaises décisions
```

Une IA est souvent aussi bonne que les exemples qu'on lui montre.

---

### Transition

Jusqu'à maintenant, notre IA apprenait uniquement à partir d'exemples.

Question :

> Existe-t-il une autre façon de construire une IA pour jouer au Tic-Tac-Toe ?

> Une IA pourrait-elle prendre des décisions sans avoir besoin d'être entraînée à partir de données ?

---

## Acte 6 — Une IA peut-elle jouer sans apprendre ?

Depuis le début de l'atelier, nous avons entraîné notre IA avec des exemples.

Nous avons vu qu'elle pouvait :

* apprendre à partir de données;
* reproduire certaines stratégies observées;
* améliorer ses performances lorsqu'on lui fournit de nouveaux exemples.

Question :

> Une intelligence artificielle doit-elle toujours apprendre à partir de données ?

> Pourrait-on construire une IA capable de jouer sans lui montrer une seule partie ?

---

### Réflexion

Supposons que nous effacions toutes les données d'entraînement.

L'IA ne connaît plus aucun exemple.

Questions :

* Peut-elle quand même jouer ?
* Que faudrait-il lui donner à la place ?

Discussion :

Faire émerger les idées suivantes :

* les règles du jeu;
* les coups possibles;
* les conditions de victoire.

---

### Une autre façon de construire une IA

Au lieu d'apprendre à partir d'exemples, nous pouvons fournir à l'ordinateur :

* les règles du jeu;
* les coups possibles;
* les conditions de victoire.

L'ordinateur peut alors analyser les conséquences de ses actions avant de jouer.

Plutôt que de se demander :

> « Que faisaient les gagnants dans cette situation ? »

il peut se demander :

> « Que va-t-il arriver si je joue ici ? »

---

### Activité — Jouons contre une IA basée sur les règles

Passer en mode :

**Jouer contre l'IA à partir des règles**

#### Étape 1

Avant de commencer, chaque équipe formule une hypothèse.

Questions :

* Cette IA sera-t-elle meilleure ou moins bonne que notre IA entraînée ?
* Sera-t-elle plus facile ou plus difficile à battre ?
* Commettra-t-elle les mêmes erreurs ?
* Semble-t-elle plus intelligente ?

---

#### Étape 2

Jouer plusieurs parties contre cette nouvelle IA.

Observer :

* bloque-t-elle les menaces ?
* profite-t-elle des occasions de victoire ?
* semble-t-elle hésiter ?
* reproduit-elle les erreurs observées précédemment ?

Questions :

* Cette IA joue-t-elle différemment ?
* Est-elle plus difficile à battre ?
* Avez-vous remarqué des différences importantes avec l'IA entraînée ?

---

#### Étape 3

Comparer les deux approches.

Compléter le tableau suivant :

| Observation                         | IA par apprentissage | IA basée sur les règles |
| ----------------------------------- | -------------------- | ----------------------- |
| Facile à battre ?                   |                      |                         |
| Commet parfois des erreurs ?        |                      |                         |
| Bloque les menaces ?                |                      |                         |
| Saisit une victoire immédiate ?     |                      |                         |
| Dépend des données d'entraînement ? |                      |                         |

Discussion :

Les élèves mettent en commun leurs observations.

---

### Comment cette IA prend-elle ses décisions ?

Notre première IA se demandait :

> « Que faisaient les gagnants dans cette situation ? »

Cette nouvelle IA se demande :

> « Que va-t-il arriver si je joue ici ? »

Elle examine plusieurs coups possibles.

Pour chacun d'eux, elle essaie de prévoir ce qui pourrait arriver ensuite.

Puis elle choisit le coup qui lui semble le plus avantageux.

---

### Le principe de Minimax

Cette approche est inspirée d'un algorithme appelé **Minimax**.

Son objectif est simple :

* explorer les coups possibles;
* analyser leurs conséquences;
* choisir le meilleur résultat.

Contrairement à notre première IA, elle n'a pas besoin de données d'entraînement.

Elle s'appuie directement sur les règles du jeu.

---

### Comparaison des deux approches

| IA par apprentissage                 | IA basée sur les règles                                 |
| ------------------------------------ | ------------------------------------------------------- |
| Observe des exemples                 | Connaît les règles                                      |
| Apprend à partir des données         | Analyse les conséquences                                |
| Dépend de la qualité des données     | Dépend des règles du jeu                                |
| Peut reproduire des erreurs humaines | Ne reproduit pas les erreurs observées dans les données |
| A besoin d'un entraînement           | Peut jouer sans entraînement                            |

---

### Réflexion

Question :

> Laquelle de ces deux IA vous semble la plus intelligente ?

Discussion :

Il n'y a pas nécessairement une seule bonne réponse.

Les deux IA prennent des décisions.

Mais elles utilisent des approches très différentes.

---

### Message clé

Une intelligence artificielle n'apprend pas toujours à partir de données.

Certaines IA apprennent à partir d'exemples.

D'autres utilisent les règles du problème pour raisonner.

Les deux approches permettent à un ordinateur de prendre des décisions.

---

### Transition

Le Tic-Tac-Toe est un jeu relativement simple.

Question :

> Ces deux approches fonctionneraient-elles aussi bien pour un jeu beaucoup plus complexe, comme les échecs ?

---

## Conclusion — Et pour les échecs ?

Au cours de cet atelier, nous avons découvert deux façons différentes de construire une intelligence artificielle pour jouer au Tic-Tac-Toe.

### Approche 1 — Apprendre à partir d'exemples

Notre première IA :

- observait des parties gagnantes;
- apprenait à partir des données recueillies;
- reproduisait les décisions qu'elle associait à la victoire.

### Approche 2 — Utiliser les règles du jeu

Notre deuxième IA :

- connaissait les règles du jeu;
- analysait les conséquences de ses actions;
- choisissait le coup qui lui semblait le plus avantageux.

Question :

> Pourrions-nous utiliser ces mêmes approches pour les échecs ?

### Première difficulté : apprendre à partir des données

Au Tic-Tac-Toe :

- une partie contient au maximum 9 coups;
- chaque situation de jeu contient seulement 9 cases;
- le nombre de situations possibles reste relativement petit.

Aux échecs :

- une partie contient souvent plusieurs dizaines de coups;
- chaque situation de jeu contient 64 cases;
- chaque case peut contenir différentes pièces;
- le nombre de situations possibles devient immense.

Une seule partie d'échecs produit déjà beaucoup plus d'informations qu'une partie complète de Tic-Tac-Toe.

Question :

> Serait-il possible de montrer toutes les situations possibles à une IA ?

Discussion :

Le nombre de situations possibles est tellement grand qu'il est impossible de toutes les enregistrer ou de toutes les observer.

Message :

L'apprentissage à partir de données devient beaucoup plus difficile lorsque le problème devient très complexe.

### Deuxième difficulté : explorer toutes les possibilités

Notre IA basée sur les règles utilisait une idée semblable à Minimax.

Pour choisir un coup, elle explorait différentes possibilités et comparait les résultats.

Cette approche fonctionne très bien au Tic-Tac-Toe.

Pourquoi ?

Parce que le nombre de possibilités reste relativement limité.

Au Tic-Tac-Toe :

```text
≈ 255 000 parties possibles
```

Aux échecs :

```text
≈ 10 000 000 000 000 000 000 000 000 000 000 000 000 000
```

soit environ :

```text
10^40 parties possibles
```

Pour se faire une idée :

La Voie lactée contient environ :

```text
100 000 000 000 étoiles
```

Le nombre de parties possibles aux échecs est immensément plus grand que le nombre d'étoiles dans notre galaxie.

Question :

> Un ordinateur pourrait-il explorer toutes ces possibilités ?

Discussion :

Même les ordinateurs modernes ne peuvent pas explorer toutes les parties possibles d'échecs.

Message :

Explorer toutes les possibilités devient impossible lorsque le problème devient trop complexe.

### Un défi pour les chercheurs

Pendant longtemps, les chercheurs ont cherché à construire une IA capable de battre les meilleurs joueurs d'échecs du monde.

Mais ils faisaient face à deux difficultés :

- trop de situations possibles pour tout apprendre;
- trop de possibilités pour tout calculer.

Question :

> Comment construire une IA capable de battre un champion du monde dans ces conditions ?

### Une première réponse : davantage de calcul

Dans les années 1990, des chercheurs ont construit des moteurs d'échecs capables d'analyser un très grand nombre de positions.

En 1997, Deep Blue est devenu le premier ordinateur à battre le champion du monde Garry Kasparov lors d'un match officiel.

Pour y parvenir, Deep Blue utilisait :

- les règles du jeu;
- une immense puissance de calcul;
- de nombreuses stratégies conçues par des experts.

### Une nouvelle génération d'IA

Plus récemment, des systèmes comme AlphaZero ont adopté une approche différente.

Ils combinent :

- l'apprentissage à partir de données;
- l'exploration des possibilités;
- la puissance de calcul.

Autrement dit :

```text
Apprentissage
       +
Raisonnement
       +
Calcul
```

### Message final

Au début de l'atelier, nous nous sommes posé une question :

> Comment apprendre à un ordinateur à jouer à un jeu ?

Nous avons découvert qu'il n'existe pas une seule réponse.

Certaines IA apprennent à partir d'exemples.

Certaines utilisent les règles du jeu pour raisonner.

Les systèmes les plus avancés combinent souvent plusieurs approches.

C'est ce qui leur permet aujourd'hui de résoudre des problèmes beaucoup plus complexes que le Tic-Tac-Toe.

---




En intelligence artificielle, le plus important n'est pas seulement le résultat obtenu.

C'est aussi la façon dont l'ordinateur a appris ou calculé ce résultat.
