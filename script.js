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
    const languageSwitcher = new LanguageSwitcher();

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

    // AI Perspective expand/collapse functionality
    const aiExpandBtn = document.getElementById('aiExpandBtn');
    const aiContentShort = document.getElementById('aiContentShort');
    const aiContentLong = document.getElementById('aiContentLong');

    if (aiExpandBtn && aiContentShort && aiContentLong) {
        let isExpanded = false;

        aiExpandBtn.addEventListener('click', () => {
            const currentLang = languageSwitcher.currentLang;

            if (isExpanded) {
                // Hide long version, keep short version
                aiContentLong.classList.remove('show');

                const expandText = aiExpandBtn.getAttribute(`data-${currentLang}-expand`);
                aiExpandBtn.textContent = expandText;

                isExpanded = false;
            } else {
                // Show long version below short version
                aiContentLong.classList.add('show');

                const collapseText = aiExpandBtn.getAttribute(`data-${currentLang}-collapse`);
                aiExpandBtn.textContent = collapseText;

                isExpanded = true;
            }
        });

        // Initialize button text based on current language
        const initializeExpandButton = () => {
            const currentLang = languageSwitcher.currentLang;
            const expandText = aiExpandBtn.getAttribute(`data-${currentLang}-expand`);
            aiExpandBtn.textContent = expandText;
        };

        // Initialize button text
        setTimeout(initializeExpandButton, 100);

    }

    // SVG Modal functionality
    const viewDiagramBtn = document.getElementById('viewDiagramBtn');
    const svgModal = document.getElementById('svgModal');
    const svgModalClose = document.getElementById('svgModalClose');
    const svgModalOverlay = document.getElementById('svgModalOverlay');

    if (viewDiagramBtn && svgModal && svgModalClose && svgModalOverlay) {
        // Open modal
        viewDiagramBtn.addEventListener('click', (e) => {
            e.preventDefault();
            svgModal.classList.add('active');
            svgModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden'; // Prevent scrolling

            // Focus on close button for accessibility
            setTimeout(() => {
                svgModalClose.focus();
            }, 300);
        });

        // Close modal function
        const closeModal = () => {
            svgModal.classList.remove('active');
            svgModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = ''; // Restore scrolling
            viewDiagramBtn.focus(); // Return focus to trigger button
        };

        // Close modal with close button
        svgModalClose.addEventListener('click', closeModal);

        // Close modal with overlay click
        svgModalOverlay.addEventListener('click', closeModal);

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && svgModal.classList.contains('active')) {
                closeModal();
            }
        });

        // Prevent modal content click from closing modal
        const svgModalContent = svgModal.querySelector('.svg-modal-content');
        if (svgModalContent) {
            svgModalContent.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
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