/* ============================================================
   Portfolio interactions
   ============================================================ */

// Disable right-click / context menu
document.addEventListener('contextmenu', (e) => e.preventDefault());

// Navbar scroll state
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// Mobile menu
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.getElementById('navLinks');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// Active nav link highlighting
const navItems = navLinks.querySelectorAll('a');
const sections = ['home', 'about', 'projects', 'certificates', 'contact'];

document.addEventListener('scroll', () => {
    const offset = window.scrollY + 120;
    let current = 'home';

    sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= offset) {
            current = id;
        }
    });

    navItems.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
});

// Reveal on scroll
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// Certificate filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const certificateCards = document.querySelectorAll('.certificate-card');

filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        certificateCards.forEach((card) => {
            const show = filter === 'all' || card.dataset.category === filter;
            card.classList.toggle('hidden', !show);
        });
    });
});

// Contact form via EmailJS
document.querySelector('.contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const data = {
        from_name: this.querySelector('input[type="text"]').value,
        from_email: this.querySelector('input[type="email"]').value,
        subject: this.querySelector('input[placeholder="Subject"]').value,
        message: this.querySelector('textarea').value,
        to_email: window.emailConfig ? window.emailConfig.toEmail : ''
    };

    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    if (window.emailConfig && window.emailjs) {
        emailjs.send(window.emailConfig.serviceId, window.emailConfig.templateId, data)
            .then(() => {
                alert(`Thank you ${data.from_name}! Your message has been sent successfully.`);
                this.reset();
            })
            .catch((error) => {
                console.error('EmailJS error:', error);
                alert('Sorry, there was an error sending your message. Please try again.');
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
    } else {
        alert('Email configuration not found. Please set up your EmailJS credentials.');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});