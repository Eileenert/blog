function goBack() {
    // Détecte la page actuelle et retourne vers la page parent appropriée
    const currentPath = window.location.pathname;
    
    if (currentPath.includes('/projects/3d_projects_and_robot/')) {
        // Depuis un sous-projet 3D, retourne vers 3d_projects_and_robot.html
        window.location.href = '../3d_projects_and_robot.html';
    } else if (currentPath.includes('/projects/')) {
        // Depuis une page de projet, retourne vers projets.html
        window.location.href = '../projets.html';
    } else if (currentPath.includes('/eileen_page/')) {
        // Depuis une page dans eileen_page, retourne vers index.html
        window.location.href = '../index.html';
    } else {
        // Fallback vers l'historique si aucun pattern ne correspond
        window.history.back();
    }
}