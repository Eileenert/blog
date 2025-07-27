// Script pour mettre à jour automatiquement la date "Last edited"
// Exécutez ce script quand vous voulez mettre à jour la date

const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');

// Lire le fichier HTML
fs.readFile(indexPath, 'utf8', (err, data) => {
    if (err) {
        console.error('Erreur lors de la lecture du fichier:', err);
        return;
    }

    // Créer la nouvelle date
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const newDate = `${day}/${month}/${year}`;

    // Remplacer la date existante
    const updatedData = data.replace(
        /Last edited: \d{2}\/\d{2}\/\d{4}/g,
        `Last edited: ${newDate}`
    );

    // Écrire le fichier modifié
    fs.writeFile(indexPath, updatedData, 'utf8', (err) => {
        if (err) {
            console.error('Erreur lors de l\'écriture du fichier:', err);
        } else {
            console.log(`Date mise à jour: ${newDate}`);
        }
    });
});
