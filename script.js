// Espera o documento HTML carregar completamente
document.addEventListener("DOMContentLoaded", function () {

    // Seleciona os elementos
    const slides = document.querySelectorAll(".slide");
    const dotsContainer = document.querySelector(".slider-dots");
    const sliderInner = document.createElement("div"); // Cria o novo contêiner interno

    // Adiciona uma classe ao novo contêiner
    sliderInner.classList.add("slider-inner");

    // Move todos os slides para dentro do novo contêiner sliderInner
    slides.forEach(slide => {
        sliderInner.appendChild(slide);
    });

    // Insere o sliderInner dentro do slider-container
    document.querySelector(".slider-container").prepend(sliderInner);


    let slideIndex = 0; // Variável para guardar o índice do slide atual
    let intervalId = null; // Variável para guardar o ID do timer

    // --- 1. CRIAR AS BOLINHAS ---
    slides.forEach((slide, index) => {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        dot.dataset.index = index;
        dotsContainer.appendChild(dot);

        dot.addEventListener("click", () => {
            jumpToSlide(index);
        });
    });

    const dots = document.querySelectorAll(".dot");

    // --- 2. FUNÇÃO PARA ATUALIZAR O SLIDER (CORRIGIDA) ---
    function updateSlider(newIndex) {
        // Remove a classe 'active' da bolinha antiga
        dots[slideIndex].classList.remove("active");

        // Atualiza o índice global
        slideIndex = newIndex;

        // Adiciona a classe 'active' na nova bolinha
        dots[slideIndex].classList.add("active");

        // SOLUÇÃO DO PROBLEMA:
        // Pega a largura exata do slide atual na tela do usuário
        const currentSlideWidth = slides[0].clientWidth;

        // Move o slider usando pixels exatos baseados nessa largura
        sliderInner.style.transform = `translateX(-${slideIndex * currentSlideWidth}px)`;
    }

    //corrigir o slider se o usuário girar a tela
    window.addEventListener('resize', () => {
        updateSlider(slideIndex);
    });

    // --- 3. FUNÇÃO PARA O PRÓXIMO SLIDE (automático) ---
    function nextSlide() {
        const newIndex = (slideIndex + 1) % slides.length;
        updateSlider(newIndex);
    }

    // --- 4. FUNÇÃO PARA PULAR PARA UM SLIDE (clique na bolinha) ---
    function jumpToSlide(index) {
        if (index === slideIndex) {
            return;
        }
        updateSlider(index);
        resetInterval();
    }

    // --- 5. FUNÇÕES DE CONTROLE DO TIMER (iguais ao anterior) ---
    function startInterval() {
        intervalId = setInterval(nextSlide, 5000);
    }

    function resetInterval() {
        clearInterval(intervalId);
        startInterval();
    }

    // --- 6. INICIAR O SLIDER ---

    // Mostra o primeiro slide (índice 0)
    updateSlider(0);

    // Inicia o timer automático
    startInterval();
});