/* scripts.js
   Manejo de menú hamburguesa y scroll suave para anclas.
*/

document.addEventListener('DOMContentLoaded', function () {
  
  // -----------------------------------
  //  SCROLL SUAVE (COMPENSAR NAVBAR FIJA)
  // -----------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const targetEl = document.getElementById(targetId);
      
      if (targetEl) {
        e.preventDefault();
        // Calcula la posición Y ajustada para la navbar fija
        const y = targetEl.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 10;
        
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });
  
  // NOTA: Los hooks para checkGuess y startGameReflex se eliminaron
  // porque ahora se llaman directamente con el atributo onclick="" en el HTML.
});