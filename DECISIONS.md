## Erreurs Rencontrée
- Mise en place de la containerisation
    - adresse ip non valide
    - variable différent dans les environnements
    - bug hot reload

## Arbitrages techniques
- Validation dans le schéma vs dans le controller: 
    - choisi le schéma car la règle s'applique partout, même si on bypass le controller

- Containerisation de l'application  
  - Utilisation de Docker pour standardiser l'environnement d'exécution.
  - Permet d'assurer la reproductibilité entre développement, test et production.
  - Simplifie le déploiement et la gestion des dépendances.

