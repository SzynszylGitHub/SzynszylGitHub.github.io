// NEXUS INTERACTION SCRIPT
document.addEventListener('DOMContentLoaded', () => {
    
    // Logika symulacji nawigacji karuzeli (< > w sekcji Hero)
    const prevBtn = document.querySelector('.ctrl-btn.prev');
    const nextBtn = document.querySelector('.ctrl-btn.next');
    const pageIndicator = document.querySelector('.page-indicator');
    
    let currentSlide = 1;
    const totalSlides = 5;
    
    if(nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            if(currentSlide < totalSlides) {
                currentSlide++;
            } else {
                currentSlide = 1;
            }
            updateIndicator();
        });
        
        prevBtn.addEventListener('click', () => {
            if(currentSlide > 1) {
                currentSlide--;
            } else {
                currentSlide = totalSlides;
            }
            updateIndicator();
        });
    }
    
    function updateIndicator() {
        if(pageIndicator) {
            pageIndicator.innerHTML = `0${currentSlide} <span>/ 0${totalSlides}</span>`;
        }
        
        // Dynamiczna modyfikacja koloru/błysku rdzenia organicznego przy zmianie slajdu
        const core = document.querySelector('.blob-core');
        if(core) {
            const hues = [290, 320, 190, 340, 260];
            core.style.filter = `hue-rotate(${hues[currentSlide - 1] - 320}deg)`;
        }
    }

    // Dodanie mikro-interakcji dla kolumn produktowych
    const columns = document.querySelectorAll('.feature-col');
    columns.forEach(col => {
        col.addEventListener('mouseenter', () => {
            // Efekt podświetlenia sąsiednich elementów lub specyficzny dźwięk/wibracja UI
        });
    });
});
