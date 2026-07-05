// Baza danych dla miękkiego UI
const projectData = {
    'node-base': {
        tag: 'BAZA',
        previewTitle: 'Podstawa & Zasilanie',
        previewDesc: 'Główny punkt podparcia ramienia zintegrowany z modułami dystrybucji zasilania i układem sterowania bazowym.',
        mainTitle: 'Moduł Bazowy & Main Controller',
        fullDesc: 'Solidna konstrukcja stanowiąca fundament całego ramienia robotycznego. Wewnątrz znajduje się główny kontroler kinematyki odpowiedzialny za przeliczanie odwrotnego zadania kinematyki (IK) w czasie rzeczywistym. Moduł zasilania wyposażony jest w zaawansowane filtry EMI i systemy stabilizacji napięcia dla serwomotorów, gwarantując bezpieczną i ciągłą pracę nawet przy nagłych skokach obciążenia.',
        specs: [
            { label: 'MATERIAŁ', val: 'Stop Aluminium' },
            { label: 'KONTROLER', val: 'ARM Cortex-M7' },
            { label: 'ZASILANIE WEJ.', val: '220V AC' },
            { label: 'KOMUNIKACJA', val: 'EtherCAT' }
        ]
    },
    'node-motor': {
        tag: 'NAPĘD',
        previewTitle: 'Serwomotor AC (Oś 1)',
        previewDesc: 'Silnik prądu przemiennego z precyzyjną kontrolą pozycji (enkoder absolutny) i sprzężeniem zwrotnym wysokiej rozdzielczości.',
        mainTitle: 'Serwomotor AC & Precyzyjna Kontrola',
        fullDesc: 'Wysokoobrotowy serwomotor AC z 3-fazowym zasilaniem. Dzięki wykorzystaniu enkodera absolutnego (szklana tarcza i sensor optyczny), układ zapewnia bezbłędne śledzenie pozycji kątowej nawet po zaniku zasilania. Zamknięta pętla sprzężenia zwrotnego (Feedback Loop) pozwala na ekstremalnie precyzyjne sterowanie ramieniem robota, minimalizując drgania i maksymalizując wyjściowy moment obrotowy.',
        specs: [
            { label: 'ZASILANIE', val: '3-Phase AC' },
            { label: 'ENKODER', val: 'Optyczny (Abs.)' },
            { label: 'CHŁODZENIE', val: 'Radiator & Finy' },
            { label: 'ZASTOSOWANIE', val: 'Oś Kinematyczna' }
        ]
    },
    'node-gearbox': {
        tag: 'PRZEKŁADNIA',
        previewTitle: 'Przekładnia Falowa (Harmonic Drive)',
        previewDesc: 'Reduktor prędkości o zerowym luzie, zapewniający potężny moment obrotowy niezbędny do podnoszenia ciężarów.',
        mainTitle: 'Przekładnia Harmonic Drive',
        fullDesc: 'Wysokoprecyzyjna przekładnia falowa (zero-backlash) wykorzystująca elastyczny wieniec zębaty do drastycznej redukcji prędkości przy jednoczesnym potężnym wzroście momentu obrotowego. Jej unikalna budowa pozwala na osiągnięcie powtarzalności rzędu mikrometrów, co jest kluczowe przy montażu układów scalonych i precyzyjnym spawaniu.',
        specs: [
            { label: 'TYP', val: 'Harmonic Drive' },
            { label: 'REDUKCJA', val: '1:120' },
            { label: 'LUZ KĄTOWY', val: '0 arcmin' },
            { label: 'SMAROWANIE', val: 'Syntetyczne stałe' }
        ]
    },
    'node-effector': {
        tag: 'EFEKTOR',
        previewTitle: 'Efektor & Sensoryka',
        previewDesc: 'Końcówka robocza ramienia (chwytak pneumatyczny) z wbudowanymi czujnikami siły i wizją maszynową.',
        mainTitle: 'Chwytak Pneumatyczny & Wizja',
        fullDesc: 'Wymienny moduł końcowy (End Effector). Zastosowano aktuator pneumatyczny o podwójnym działaniu, zapewniający pewny chwyt delikatnych i twardych elementów. Zintegrowany 6-osiowy czujnik siły i momentu (Force/Torque Sensor) pozwala robotowi na adaptacyjne reagowanie na opór środowiska. Kamera sprzężona w pętli pozwala na rozpoznawanie obiektów (Pick & Place).',
        specs: [
            { label: 'NAPĘD CHWYTAKA', val: 'Pneumatyczny' },
            { label: 'CZUJNIK SIŁY', val: '6-Osiowy F/T' },
            { label: 'WIZJA', val: 'Kamera 2D/3D' },
            { label: 'ZŁĄCZE', val: 'Szybkowymienne' }
        ]
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const listItems = document.querySelectorAll('.module-list li');
    const svgNodes = document.querySelectorAll('.interactive-node');
    const scrollBtn = document.getElementById('scroll-btn');
    
    function updateData(nodeId) {
        // Menu
        listItems.forEach(li => li.classList.remove('active'));
        document.querySelector(`.module-list li[data-target="${nodeId}"]`).classList.add('active');

        // SVG
        svgNodes.forEach(node => node.classList.remove('active'));
        document.getElementById(nodeId).classList.add('active');

        const data = projectData[nodeId];
        if(!data) return;

        // Prawy Panel (Góra)
        document.getElementById('preview-tag').innerText = data.tag;
        document.getElementById('preview-title').innerText = data.previewTitle;
        document.getElementById('preview-desc').innerText = data.previewDesc;

        // Sekcja na dole
        document.getElementById('detail-main-title').innerText = data.mainTitle;
        document.getElementById('detail-full-desc').innerText = data.fullDesc;
        document.getElementById('blueprint-text').innerText = `WIZUALIZACJA: ${data.tag}`;

        const specsGrid = document.getElementById('detail-specs-grid');
        specsGrid.innerHTML = '';
        data.specs.forEach(spec => {
            specsGrid.innerHTML += `
                <div class="spec-item glass-panel">
                    <span class="spec-label">${spec.label}</span>
                    <span class="spec-val">${spec.val}</span>
                </div>
            `;
        });
    }

    function scrollToDetails() {
        document.getElementById('product-details').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }

    listItems.forEach(li => {
        li.addEventListener('click', function() {
            updateData(this.getAttribute('data-target'));
            scrollToDetails();
        });
    });

    svgNodes.forEach(node => {
        node.addEventListener('click', function() {
            updateData(this.id);
            scrollToDetails();
        });
    });

    if(scrollBtn) {
        scrollBtn.addEventListener('click', scrollToDetails);
    }
});
