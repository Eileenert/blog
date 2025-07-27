#!/usr/bin/env node
// Script pour mettre à jour la date basée sur le dernier commit Git

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
    // Obtenir la date du dernier commit
    const lastCommitDate = execSync('git log -1 --format=%cd --date=format:"%d/%m/%Y"', { encoding: 'utf8' }).trim();
    
    const indexPath = path.join(__dirname, 'index.html');
    
    // Lire le fichier HTML
    const data = fs.readFileSync(indexPath, 'utf8');
    
    // Remplacer la date
    const updatedData = data.replace(
        /Last edited: \d{2}\/\d{2}\/\d{4}/g,
        `Last edited: ${lastCommitDate.replace(/"/g, '')}`
    );
    
    // Écrire le fichier modifié
    fs.writeFileSync(indexPath, updatedData, 'utf8');
    
    console.log(`Date mise à jour avec la date du dernier commit: ${lastCommitDate.replace(/"/g, '')}`);
    
} catch (error) {
    console.error('Erreur:', error.message);
    console.log('Assurez-vous d\'être dans un dépôt Git avec des commits.');
}
