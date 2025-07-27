function goBack() {
    // Obtenir le chemin actuel
    const currentPath = window.location.pathname;
    
    // Définir les pages parents selon la structure du site
    if (currentPath.includes('/projects/3d_projects_and_robot/')) {
        // Pour les sous-pages de 3d_projects_and_robot (comme Drill_winch.html)
        window.location.href = '../3d_projects_and_robot.html';
    } else if (currentPath.includes('/projects/')) {
        // Pour toutes les pages dans le dossier projects
        window.location.href = '../projets.html';
    } else if (currentPath.includes('/eileen_page/')) {
        // Pour les pages dans eileen_page (goals.html, projets.html)
        window.location.href = '../index.html';
    } else {
        // Fallback vers l'historique si la structure n'est pas reconnue
        window.history.back();
    }
}