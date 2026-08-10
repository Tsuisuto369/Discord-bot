# 🤖 369 Bot — Bot Discord Twitch

## 🛠️ Utilitaires

| Commande | Description |
|----------|-------------|
| `/aide` | Liste toutes les commandes |
| `/ping` | Latence du bot |

## 🔴 Twitch

Le bot surveille automatiquement une liste de streameurs et poste une notification quand ils passent en live.

| Commande | Description |
|----------|-------------|
| `/ajouterstream [login] [nom]` | Ajouter un streameur à surveiller (admin) |
| `/retirerstream [login]` | Retirer un streameur de la surveillance (admin) |
| `/streamers` | Liste tous les streameurs surveillés |
| `/setchannel [type] [salon]` | Configurer le salon d'annonce ou de fin de live (admin) |
| `/testtwitch` | Force une vérification Twitch immédiate (admin) |

### Configuration des salons

Par défaut, si aucun salon n'est configuré via `/setchannel`, le bot cherche un salon nommé `live-twitch`, `twitch` ou `lives`.

Utilise `/setchannel type:Annonce de live salon:#ton-salon` pour choisir le salon où les lives sont annoncés.

Utilise `/setchannel type:Fin de live salon:#ton-salon` pour choisir un salon où garder une trace des lives terminés. Quand un stream se termine, l'annonce est supprimée du salon d'annonce et une version "Live terminé" est repostée dans ce second salon (si configuré). Sans ce réglage, l'annonce est simplement supprimée sans trace.
