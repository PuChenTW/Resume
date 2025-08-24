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

    // Initialize Presentation Mode
    const presentationMode = new PresentationMode(languageSwitcher);
});

// Presentation Mode implementation
class PresentationMode {
    constructor(languageSwitcher) {
        this.languageSwitcher = languageSwitcher;
        this.currentSlide = 0;
        this.slides = [];
        this.isActive = false;
        this.maxSlidesPerComponent = 5;

        // DOM elements
        this.presentationBtn = document.getElementById('presentationBtn');
        this.presentationModal = document.getElementById('presentationModal');
        this.presentationClose = document.getElementById('presentationClose');
        this.presentationOverlay = document.getElementById('presentationModalOverlay');
        this.presentationBody = document.getElementById('presentationBody');
        this.prevBtn = document.getElementById('presentationPrev');
        this.nextBtn = document.getElementById('presentationNext');
        this.slideIndicators = document.getElementById('slideIndicators');
        this.progressBar = document.getElementById('presentationProgressBar');

        this.init();
    }

    init() {
        this.bindEvents();
        this.generateSlides();
    }

    bindEvents() {
        // Open presentation mode
        this.presentationBtn.addEventListener('click', () => {
            this.openPresentation();
        });

        // Close presentation mode
        this.presentationClose.addEventListener('click', () => {
            this.closePresentation();
        });

        this.presentationOverlay.addEventListener('click', () => {
            this.closePresentation();
        });

        // Navigation buttons
        this.prevBtn.addEventListener('click', () => {
            this.previousSlide();
        });

        this.nextBtn.addEventListener('click', () => {
            this.nextSlide();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.isActive) return;

            switch (e.key) {
                case 'Escape':
                    this.closePresentation();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    this.previousSlide();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.nextSlide();
                    break;
                case ' ': // Spacebar
                    e.preventDefault();
                    this.nextSlide();
                    break;
            }
        });

        // Prevent modal content click from closing
        const modalContent = this.presentationModal.querySelector('.presentation-modal-content');
        if (modalContent) {
            modalContent.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    }

    generateSlides() {
        this.slides = [
            this.createIntroSlide(),
            this.createAIRecommendationSlide(),
            this.createExperienceOverviewSlide(),
            ...this.createExperienceDetailSlides(),
            this.createProjectsOverviewSlide(),
            ...this.createProjectDetailSlides()
        ];
    }

    createIntroSlide() {
        return {
            id: 'intro',
            generate: () => {
                const currentLang = this.languageSwitcher.currentLang;
                const headerElement = document.querySelector('.header');
                const nameElement = headerElement.querySelector('h1');
                const titleElement = headerElement.querySelector('.title');
                const contactElement = headerElement.querySelector('.contact');
                const summaryElement = document.querySelector('.summary p');

                return `
                    <div class="presentation-slide">
                        <h1>${nameElement.textContent}</h1>
                        <h3>${titleElement.textContent}</h3>
                        <div class="contact">
                            ${Array.from(contactElement.children).map(item => `
                                <div class="contact-item">
                                    ${item.innerHTML}
                                </div>
                            `).join('')}
                        </div>
                        <p>${summaryElement.textContent}</p>
                    </div>
                `;
            }
        };
    }

    createAIRecommendationSlide() {
        return {
            id: 'ai-recommendation',
            generate: () => {
                const currentLang = this.languageSwitcher.currentLang;
                const aiTitle = currentLang === 'zh' ? 'AI 推薦信' : 'AI Perspective';
                const aiShortContent = document.getElementById('aiContentShort');

                return `
                    <div class="presentation-slide">
                        <h2>${aiTitle}</h2>
                        <blockquote style="border-left: 4px solid rgba(255,255,255,0.5); padding-left: 2rem; font-style: italic; margin: 2rem 0;">
                            ${aiShortContent.innerHTML}
                        </blockquote>
                    </div>
                `;
            }
        };
    }

    createExperienceOverviewSlide() {
        return {
            id: 'experience-overview',
            generate: () => {
                const currentLang = this.languageSwitcher.currentLang;
                const title = currentLang === 'zh' ? '工作經歷' : 'Experience';
                const jobs = document.querySelectorAll('.job');

                return `
                    <div class="presentation-slide">
                        <h2>${title}</h2>
                        <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 1000px;">
                            ${Array.from(jobs).slice(0, this.maxSlidesPerComponent).map(job => {
                    const jobTitle = job.querySelector('h3').textContent;
                    const company = job.querySelector('.company').textContent;
                    const period = job.querySelector('.period').textContent;

                    return `
                                    <div style="text-align: left; padding: 1.5rem; background: rgba(255,255,255,0.1); border-radius: 8px; backdrop-filter: blur(10px);">
                                        <h3 style="color: white; margin-bottom: 0.5rem;">${jobTitle}</h3>
                                        <div class="company">${company}</div>
                                        <div class="period">${period}</div>
                                    </div>
                                `;
                }).join('')}
                        </div>
                    </div>
                `;
            }
        };
    }

    createExperienceDetailSlides() {
        const jobs = document.querySelectorAll('.job');
        return Array.from(jobs).slice(0, this.maxSlidesPerComponent).map((job, index) => ({
            id: `experience-detail-${index}`,
            generate: () => {
                const jobTitle = job.querySelector('h3').textContent;
                const company = job.querySelector('.company').textContent;
                const period = job.querySelector('.period').textContent;
                const achievements = job.querySelectorAll('li');

                return `
                    <div class="presentation-slide">
                        <h2>${jobTitle}</h2>
                        <div class="company">${company}</div>
                        <div class="period">${period}</div>
                        <ul style="margin-top: 2rem;">
                            ${Array.from(achievements).map(li => `<li>${li.textContent}</li>`).join('')}
                        </ul>
                    </div>
                `;
            }
        }));
    }

    createProjectsOverviewSlide() {
        return {
            id: 'projects-overview',
            generate: () => {
                const currentLang = this.languageSwitcher.currentLang;
                const title = currentLang === 'zh' ? '專案' : 'Projects';
                const projects = document.querySelectorAll('.project');

                return `
                    <div class="presentation-slide">
                        <h2>${title}</h2>
                        <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 1000px;">
                            ${Array.from(projects).slice(0, this.maxSlidesPerComponent).map(project => {
                    const projectTitle = project.querySelector('h3').textContent;
                    const company = project.querySelector('.company').textContent;

                    return `
                                    <div style="text-align: left; padding: 1.5rem; background: rgba(255,255,255,0.1); border-radius: 8px; backdrop-filter: blur(10px);">
                                        <h3 style="color: white; margin-bottom: 0.5rem;">${projectTitle}</h3>
                                        <div class="company">${company}</div>
                                    </div>
                                `;
                }).join('')}
                        </div>
                    </div>
                `;
            }
        };
    }

    createProjectDetailSlides() {
        const projects = document.querySelectorAll('.project');
        return Array.from(projects).slice(0, this.maxSlidesPerComponent).map((project, index) => ({
            id: `project-detail-${index}`,
            generate: () => {
                const projectTitle = project.querySelector('h3').textContent;
                const company = project.querySelector('.company').textContent;
                const description = project.querySelector('p').textContent;

                return `
                    <div class="presentation-slide">
                        <h2>${projectTitle}</h2>
                        <div class="company">${company}</div>
                        <p style="margin-top: 2rem; text-align: left; max-width: 900px;">${description}</p>
                    </div>
                `;
            }
        }));
    }

    openPresentation() {
        this.isActive = true;
        this.currentSlide = 0;
        this.renderSlides();
        this.presentationModal.classList.add('active');
        this.presentationModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        // Focus on close button for accessibility
        setTimeout(() => {
            this.presentationClose.focus();
        }, 300);
    }

    closePresentation() {
        this.isActive = false;
        this.presentationModal.classList.remove('active');
        this.presentationModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        this.presentationBtn.focus();
    }

    renderSlides() {
        // Clear previous slides
        this.presentationBody.innerHTML = '';

        // Generate and add all slides
        this.slides.forEach((slide, index) => {
            const slideElement = document.createElement('div');
            slideElement.innerHTML = slide.generate();
            const slideContent = slideElement.firstElementChild;

            if (index === this.currentSlide) {
                slideContent.classList.add('active');
            }

            this.presentationBody.appendChild(slideContent);
        });

        // Generate slide indicators
        this.renderSlideIndicators();

        // Update navigation buttons
        this.updateNavigationButtons();

        // Update progress bar
        this.updateProgressBar();
    }

    renderSlideIndicators() {
        this.slideIndicators.innerHTML = '';

        this.slides.forEach((slide, index) => {
            const indicator = document.createElement('div');
            indicator.className = 'slide-indicator';
            if (index === this.currentSlide) {
                indicator.classList.add('active');
            }

            indicator.addEventListener('click', () => {
                this.goToSlide(index);
            });

            this.slideIndicators.appendChild(indicator);
        });
    }

    updateNavigationButtons() {
        this.prevBtn.disabled = this.currentSlide === 0;
        this.nextBtn.disabled = this.currentSlide === this.slides.length - 1;
    }

    updateProgressBar() {
        const progress = ((this.currentSlide + 1) / this.slides.length) * 100;
        this.progressBar.style.width = `${progress}%`;
    }

    previousSlide() {
        if (this.currentSlide > 0) {
            this.goToSlide(this.currentSlide - 1);
        }
    }

    nextSlide() {
        if (this.currentSlide < this.slides.length - 1) {
            this.goToSlide(this.currentSlide + 1);
        }
    }

    goToSlide(index) {
        if (index < 0 || index >= this.slides.length) return;

        // Remove active class from current slide
        const currentSlideElement = this.presentationBody.children[this.currentSlide];
        if (currentSlideElement) {
            currentSlideElement.classList.remove('active');
        }

        // Update current slide index
        this.currentSlide = index;

        // Add active class to new slide
        const newSlideElement = this.presentationBody.children[this.currentSlide];
        if (newSlideElement) {
            newSlideElement.classList.add('active');
        }

        // Update indicators
        const indicators = this.slideIndicators.children;
        Array.from(indicators).forEach((indicator, i) => {
            indicator.classList.toggle('active', i === this.currentSlide);
        });

        // Update navigation and progress
        this.updateNavigationButtons();
        this.updateProgressBar();
    }
}