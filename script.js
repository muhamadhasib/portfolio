// Utility Functions
const addEvent = (element, event, handler) => {
    if (element.addEventListener) {
        element.addEventListener(event, handler, false);
    } else if (element.attachEvent) {
        element.attachEvent(`on${event}`, handler);
    }
};

const throttle = (func, limit) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// DOM Content Loaded Event Listener
document.addEventListener('DOMContentLoaded', () => {
    // Element Selectors
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const smoothScrollTargets = document.querySelectorAll('.nav-link, .contact-me-btn');
    const contactForm = document.getElementById('contact-form');
    const skillBars = document.querySelectorAll('.skill-progress');
    const downloadCVBtn = document.getElementById('downloadCV');
    const contactMeBtn = document.getElementById('contactMe');
    const blogCloseBtn = document.querySelector('.blog-close-btn');
    const cartLink = document.querySelector('.nav-link[data-section="cart"]');
    const themeToggle = document.getElementById('theme-toggle');
    const backToTopButton = document.getElementById('back-to-top');
    const homeSection = document.getElementById('home');

    // Mobile Menu Functions
    const toggleMobileMenu = () => {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    };

    const closeMobileMenu = () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    };

    // Navigation Functions
    const setActiveLink = () => {
        const currentPage = window.location.pathname.split('/').pop();
        const currentSection = window.location.hash.slice(1);

        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkSection = link.getAttribute('data-section');

            if ((currentPage === '' || currentPage === 'index.html') && linkSection === 'home') {
                link.classList.add('active');
            } else if (currentPage === 'blog.html' && linkSection === 'blog') {
                link.classList.add('active');
            } else if (currentSection && linkSection === currentSection) {
                link.classList.add('active');
            }
        });
    };

    // Smooth Scrolling Function
    const smoothScroll = function(e) {
        const href = this.getAttribute('href');

        if (href.includes('.html')) {
            return; // Let the default behavior handle page navigation
        }

        e.preventDefault();
        const targetId = href.replace(/^.*#/, '');
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        } else if (href.startsWith('#') && !window.location.pathname.includes('index.html')) {
            window.location.href = `index.html${href}`;
        }
    };

    // Skill Bars Animation
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = progress;
            }, 100);
        });
    };

    // Circle Animation
    const createCircles = () => {
        const container = document.getElementById('circle-animation-container');
        if (!container) return; // Exit if the container doesn't exist
        
        const circleCount = 20;

        for (let i = 0; i < circleCount; i++) {
            const circle = document.createElement('div');
            circle.classList.add('animated-circle');
            
            const size = Math.random() * 5 + 3;
            circle.style.width = `${size}px`;
            circle.style.height = `${size}px`;
            
            circle.style.left = `${Math.random() * 100}%`;
            circle.style.top = `${Math.random() * 100}%`;
            
            const moveX = Math.random() * 200 - 100;
            const moveY = Math.random() * 200 - 100;
            circle.style.setProperty('--move-x', `${moveX}px`);
            circle.style.setProperty('--move-y', `${moveY}px`);
            circle.style.setProperty('--move-x2', `${-moveY}px`);
            circle.style.setProperty('--move-y2', `${moveX}px`);
            circle.style.setProperty('--move-x3', `${moveY}px`);
            circle.style.setProperty('--move-y3', `${-moveX}px`);
            
            const duration = Math.random() * 10 + 10;
            circle.style.animationDuration = `${duration}s`;
            circle.style.animationDelay = `${Math.random() * -duration}s`;
            
            container.appendChild(circle);
        }
    };

    // Theme Functions
    const setTheme = (theme) => {
        const body = document.body;
        if (theme === 'light') {
            body.classList.add('light-mode');
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-mode');
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
        updateThemeIcon();
    };

    const updateThemeIcon = () => {
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('light-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    };

    // Event Listeners
    addEvent(mobileMenu, 'click', toggleMobileMenu);
    addEvent(mobileMenu, 'touchstart', (e) => {
        e.preventDefault();
        toggleMobileMenu();
    });

    navLinks.forEach(link => {
        addEvent(link, 'click', closeMobileMenu);
    });

    addEvent(window, 'hashchange', setActiveLink);

    smoothScrollTargets.forEach(anchor => {
        addEvent(anchor, 'click', smoothScroll);
    });

    addEvent(document, 'click', (e) => {
        if (!navMenu.contains(e.target) && !mobileMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });

    if (contactForm) {
        addEvent(contactForm, 'submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message. We will get back to you soon!');
            this.reset();
        });
    }

    if (downloadCVBtn) {
        addEvent(downloadCVBtn, 'click', (e) => {
            e.preventDefault();
            const cvUrl = 'Muhammad_Hasib_Resume.pdf';
            window.open(cvUrl, '_blank');
        });
    }

    if (contactMeBtn) {
        addEvent(contactMeBtn, 'click', (e) => {
            e.preventDefault();
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth'
                });
            } else {
                console.error('Contact section not found. Make sure the #contact element exists.');
            }
        });
    }

    if (blogCloseBtn) {
        addEvent(blogCloseBtn, 'click', (e) => {
            e.preventDefault();
            const referrer = document.referrer;
            if (referrer.includes('blog.html')) {
                window.location.href = 'blog.html#blog';
            } else {
                window.location.href = 'index.html#blog';
            }
        });
    }

    if (cartLink) {
        addEvent(cartLink, 'click', (e) => {
            e.preventDefault();
            alert('Cart functionality coming soon!');
        });
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const newTheme = document.body.classList.contains('light-mode') ? 'dark' : 'light';
            setTheme(newTheme);
        });
    }

    // Accessibility
    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                el.click();
            }
        });
    });

    // Back to top functionality
    if (backToTopButton && homeSection) {
        // Show/hide the button based on scroll position
        window.addEventListener('scroll', throttle(() => {
            if (window.pageYOffset > 500) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        }, 300));

        // Scroll to home section when the button is clicked
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            homeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    } else {
        console.error('Back to top button or home section not found in the DOM');
    }

    // Initialization
    setActiveLink();
    createCircles();

    // Skill Bars Animation with Intersection Observer
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const skillsSection = document.querySelector('.skills-container');
        if (skillsSection) {
            observer.observe(skillsSection);
        }
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        animateSkillBars();
    }

    // Apply theme immediately when the script runs
    (function() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
    })();

    // Fix for contact me button in home screen and navigation menu
    const contactMeButtons = document.querySelectorAll('.home-contact-me-btn, .nav-link[data-section="contact"]');
    const contactSection = document.querySelector('#contact');

    if (contactMeButtons.length && contactSection) {
        contactMeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });
    } else {
        console.error('Contact me button or contact section not found. Make sure the elements exist in the DOM.');
    }

    // Cart icon functionality
    const cartIcon = document.getElementById('cart-icon');

    if (cartIcon) {
        addEvent(cartIcon, 'click', (e) => {
            e.preventDefault();
            alert('Cart functionality coming soon!'); // Placeholder for cart functionality
        });
    }
});

// Apply theme on page load (outside of DOMContentLoaded)
(function() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
})();
