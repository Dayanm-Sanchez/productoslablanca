/* botNavi.js
   Manejo de menú hamburguesa y lógica para desplegables de salsas/rellenos.
*/

document.addEventListener('DOMContentLoaded', function () {
    
    // ======================================
    // NAV - LÓGICA DEL MENÚ HAMBURGUESA
    // ======================================
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('primary-navigation');
  
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            const expanded = this.getAttribute('aria-expanded') === 'true' || false;
            this.setAttribute('aria-expanded', !expanded);
            this.classList.toggle('open');
            navLinks.classList.toggle('open');
        });
      
        // Cerrar menú al hacer click en un enlace (mejor UX)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
                navLinks.classList.remove('open');
            });
        });
    }

    // ======================================
    // LÓGICA DE HOJAS DESPLEGABLES (SALSAS/RELLENOS)
    // ======================================
    const btnSalsas = document.getElementById('btn-salsas');
    const btnRellenos = document.getElementById('btn-rellenos');
    const salsasDropdown = document.getElementById('salsas-dropdown');
    const rellenosDropdown = document.getElementById('rellenos-dropdown');
    const cerrarBtns = document.querySelectorAll('.cerrar-dropdown');

    // Función para abrir/cerrar un dropdown
    function toggleDropdown(dropdown) {
        // Cierra cualquier otro dropdown abierto
        document.querySelectorAll('.opciones-dropdown').forEach(d => {
            if (d !== dropdown && d.classList.contains('visible')) {
                d.classList.remove('visible');
            }
        });
        // Abre/Cierra el dropdown seleccionado
        dropdown.classList.toggle('visible');
    }

    if (btnSalsas && salsasDropdown) {
        btnSalsas.addEventListener('click', (e) => {
            // Evita que el click del botón active el listener general de cierre
            e.stopPropagation(); 
            toggleDropdown(salsasDropdown);
        });
    }

    if (btnRellenos && rellenosDropdown) {
        btnRellenos.addEventListener('click', (e) => {
            // Evita que el click del botón active el listener general de cierre
            e.stopPropagation(); 
            toggleDropdown(rellenosDropdown);
        });
    }
    
    // Cierra el dropdown al hacer click en el botón "Cerrar"
    cerrarBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); 
            // 💡 SOLUCIÓN CLAVE: Detenemos la propagación del evento aquí.
            // Esto asegura que el listener del 'document' no intente cerrarlo de nuevo.
            e.stopPropagation(); 
            e.target.closest('.opciones-dropdown').classList.remove('visible');
        });
    });

    // CORRECCIÓN: Cierra cualquier dropdown si se hace click fuera de los botones y de las hojas desplegadas.
    document.addEventListener('click', (e) => {
        const isClickInsideAnyDropdown = e.target.closest('.opciones-dropdown');
        const isClickInsideButtonContainer = e.target.closest('.opcion-button');

        // Si el clic no fue dentro de un dropdown Y no fue en uno de los botones de abrir
        if (!isClickInsideAnyDropdown && !isClickInsideButtonContainer) {
            document.querySelectorAll('.opciones-dropdown.visible').forEach(d => {
                d.classList.remove('visible');
            });
        }
    });


    // ======================================
    // MEJORA: EVITAR FOCO ESCONDIDO POR NAVBAR FIJA
    // ======================================
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function (e) {
          const targetId = this.getAttribute('href').slice(1);
          const targetEl = document.getElementById(targetId);
          if (targetEl) {
            e.preventDefault();
            // 65px es la altura de la navbar
            const y = targetEl.getBoundingClientRect().top + window.pageYOffset - 65; 
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        });
      });
});