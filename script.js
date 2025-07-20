// Smooth scrolling para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Função para calcular NPS
function calculateNPS() {
    const promoters = parseInt(document.getElementById('promoters').value) || 0;
    const neutrals = parseInt(document.getElementById('neutrals').value) || 0;
    const detractors = parseInt(document.getElementById('detractors').value) || 0;
    
    const total = promoters + neutrals + detractors;
    
    if (total === 0) {
        alert('Por favor, insira pelo menos um valor válido.');
        return;
    }
    
    const promoterPercentage = (promoters / total) * 100;
    const detractorPercentage = (detractors / total) * 100;
    const nps = Math.round(promoterPercentage - detractorPercentage);
    
    // Atualizar resultado
    document.getElementById('calculated-nps').textContent = nps;
    
    // Determinar interpretação
    let interpretation = '';
    let color = '';
    
    if (nps >= 76) {
        interpretation = 'Zona de Excelência';
        color = '#059669';
    } else if (nps >= 51) {
        interpretation = 'Zona de Qualidade';
        color = '#2563eb';
    } else if (nps >= 1) {
        interpretation = 'Zona de Aperfeiçoamento';
        color = '#d97706';
    } else {
        interpretation = 'Zona Crítica';
        color = '#dc2626';
    }
    
    const interpretationElement = document.getElementById('nps-interpretation');
    interpretationElement.textContent = interpretation;
    interpretationElement.style.color = color;
    
    // Animar o resultado
    const resultElement = document.getElementById('nps-result');
    resultElement.style.transform = 'scale(1.05)';
    setTimeout(() => {
        resultElement.style.transform = 'scale(1)';
    }, 200);
}

// Animações de entrada para elementos
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observar cards e elementos animáveis
    document.querySelectorAll('.content-card, .benefit-card, .step, .zone').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Efeito de hover nos números da escala de avaliação
function addRatingHoverEffect() {
    const ratingNumbers = document.querySelectorAll('.rating-numbers span');
    ratingNumbers.forEach((number, index) => {
        number.addEventListener('mouseenter', () => {
            // Destacar o número e todos os anteriores
            ratingNumbers.forEach((num, i) => {
                if (i <= index) {
                    num.style.borderColor = '#2563eb';
                    num.style.backgroundColor = '#2563eb';
                    num.style.color = 'white';
                } else {
                    num.style.borderColor = '#e5e7eb';
                    num.style.backgroundColor = 'transparent';
                    num.style.color = '#374151';
                }
            });
        });
        
        number.addEventListener('mouseleave', () => {
            // Resetar todos os números
            ratingNumbers.forEach(num => {
                num.style.borderColor = '#e5e7eb';
                num.style.backgroundColor = 'transparent';
                num.style.color = '#374151';
            });
        });
    });
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar animações e efeitos
    observeElements();
    addRatingHoverEffect();
    
    // Calcular NPS inicial
    calculateNPS();
    
    // Adicionar listeners para inputs da calculadora
    const inputs = document.querySelectorAll('#promoters, #neutrals, #detractors');
    inputs.forEach(input => {
        input.addEventListener('input', calculateNPS);
    });
    
    // Efeito de fade-in para o header ao fazer scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
});

