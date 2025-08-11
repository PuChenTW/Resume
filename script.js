// Multi-language support for the resume site
class LanguageSwitcher {
    constructor() {
        this.currentLang = localStorage.getItem('preferredLang') || 'en';
        this.init();
    }

    init() {
        this.bindEvents();
        this.setLanguage(this.currentLang);
    }

    bindEvents() {
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const selectedLang = e.target.getAttribute('data-lang');
                this.setLanguage(selectedLang);
            });
        });
    }

    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('preferredLang', lang);

        // Update active button
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(button => {
            button.classList.remove('active');
            if (button.getAttribute('data-lang') === lang) {
                button.classList.add('active');
            }
        });

        // Update content
        const elementsWithTranslation = document.querySelectorAll('[data-en][data-zh]');
        elementsWithTranslation.forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                element.textContent = text;
            }
        });

        // Update document language attribute
        document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-TW' : 'en');

        // Update page title
        const title = lang === 'zh' ? '陳璞 - 軟體工程師' : 'Pu Chen - Software Engineer';
        document.title = title;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LanguageSwitcher();

    // AI Perspective toggle functionality
    const ANIMATION_DURATION = 400;
    const SCROLL_DELAY = 50;
    
    const aiToggleBtn = document.getElementById('aiToggleBtn');
    const aiPerspective = document.getElementById('aiPerspective');
    
    if (aiToggleBtn && aiPerspective) {
        aiToggleBtn.addEventListener('click', () => {
            // Add click animation
            aiToggleBtn.classList.add('clicked');
            setTimeout(() => {
                aiToggleBtn.classList.remove('clicked');
            }, ANIMATION_DURATION);
            
            const isHidden = aiPerspective.classList.contains('hidden');
            
            if (isHidden) {
                aiPerspective.classList.remove('hidden');
                aiToggleBtn.setAttribute('aria-expanded', 'true');
                setTimeout(() => {
                    aiPerspective.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, SCROLL_DELAY);
            } else {
                aiPerspective.classList.add('hidden');
                aiToggleBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Add smooth scrolling for better UX
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
});