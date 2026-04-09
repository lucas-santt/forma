function toggleDropDownMenu() {
    const menu = document.getElementById("dropdown-menu");
    menu.classList.toggle("active");
}

function toggleFavorite(elementId) {
    console.log("Toggling favorite for element ID:", elementId);
    fetch(`/favorite/${elementId}`, {
        method: "POST",
    })
    .then(response => response.json())
    .then(data => {
        console.log(`btn--${elementId} favorite status:`, data);
        const btn = document.getElementById(`btn--${elementId}`);
        if (data) {
            btn.classList.add("btn--gray");
            btn.classList.remove("btn--white");
            btn.innerHTML = "Unsave"
        } else {
            btn.classList.remove("btn--gray");
            btn.classList.add("btn--white");
            btn.innerHTML = "Save"
        }
    })
}
let msnry; 

function initMasonry() {
    const elem = document.querySelector('.grid');
    
    if (!elem) return;

    // Inicializa o Masonry apontando para as classes Sizer
    msnry = new Masonry(elem, {
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',   // <-- Alterado
        gutter: '.gutter-sizer',      // <-- Alterado
        percentPosition: true
    });

    imagesLoaded(elem).on('progress', function() {
        msnry.layout();
    });
}

document.addEventListener("DOMContentLoaded", initMasonry);

// Escuta as injeções do HTMX
document.addEventListener('htmx:afterSettle', function() {
    
    if (msnry && msnry.element) {
        // Encontra os novos itens inseridos pelo HTMX
        msnry.reloadItems();
        
        // Aplica a mesma regra: espera as NOVAS imagens carregarem
        imagesLoaded(msnry.element).on('progress', function() {
            msnry.layout();
        });
    } else {
        initMasonry();
    }
});