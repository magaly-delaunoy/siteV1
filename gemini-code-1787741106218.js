// Changement dynamique de questionnaire dans l'iframe
function loadQuiz(url) {
  const iframe = document.getElementById('quiz-frame');
  if (iframe) {
    iframe.src = url;
  }

  // Gestion des classes actives sur les boutons
  const buttons = document.querySelectorAll('.btn-quiz');
  buttons.forEach(btn => btn.classList.remove('active'));
  
  // Applique la classe au bouton cliqué
  if (event && event.currentTarget) {
    event.currentTarget.classList.add('active');
  }
}

// Menu Responsive Mobile (Burger)
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');

  if (burger) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
});