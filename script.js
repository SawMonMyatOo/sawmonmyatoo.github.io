// Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Smooth scrolling for navigation links
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

        // Scroll reveal animation
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.scroll-reveal').forEach(el => {
            observer.observe(el);
        });

        // Typing animation for code window
        function typeCode() {
            const codeLines = document.querySelectorAll('.code-line');
            codeLines.forEach((line, index) => {
                setTimeout(() => {
                    line.style.opacity = '1';
                }, index * 500);
            });
        }

        // Trigger typing animation when about section is visible
        const aboutObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeCode();
                    aboutObserver.unobserve(entry.target);
                }
            });
        });

        aboutObserver.observe(document.querySelector('.about'));

        // Form submission with multiple options
        document.querySelector('.contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelector('input[placeholder="Subject"]').value;
            const message = this.querySelector('textarea').value;
            
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // OPTION 1: EmailJS (Recommended - No backend needed)
            // Load credentials from config file
            if (window.emailConfig) {
                const { serviceId, templateId, toEmail } = window.emailConfig;
                
                emailjs.send(serviceId, templateId, {
                    from_name: name,
                    from_email: email,
                    subject: subject,
                    message: message,
                    to_email: toEmail
                }).then((response) => {
                    console.log('SUCCESS!', response.status, response.text);
                    alert(`Thank you ${name}! Your message has been sent successfully.`);
                    this.reset();
                }).catch((error) => {
                    console.error('EmailJS error:', error);
                    alert('Sorry, there was an error sending your message. Please try again.');
                }).finally(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
            } else {
                // Fallback if config not loaded
                alert('Email configuration not found. Please set up your EmailJS credentials.');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
            
            // OPTION 2: Mailto link (Opens email client)
            // Uncomment to use default email client
            /*
            const mailtoLink = `mailto:your-email@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
            window.location.href = mailtoLink;
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            */
            
            // OPTION 3: Send to your backend API
            // Uncomment and replace with your API endpoint
            /*
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    subject: subject,
                    message: message
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(`Thank you ${name}! Your message has been sent successfully.`);
                    this.reset();
                } else {
                    alert('Sorry, there was an error sending your message. Please try again.');
                }
            })
            .catch(error => {
                alert('Sorry, there was an error sending your message. Please try again.');
                console.error('Error:', error);
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
            */
            
            // OPTION 4: Formspree (Third-party form service)
            // Replace 'your-form-id' with your Formspree form ID
            /*
            fetch('https://formspree.io/f/your-form-id', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    subject: subject,
                    message: message
                })
            })
            .then(response => {
                if (response.ok) {
                    alert(`Thank you ${name}! Your message has been sent successfully.`);
                    this.reset();
                } else {
                    alert('Sorry, there was an error sending your message. Please try again.');
                }
            })
            .catch(error => {
                alert('Sorry, there was an error sending your message. Please try again.');
                console.error('Error:', error);
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
            */
            
            // Current: Simulated submission (REMOVE THIS SECTION AFTER SETTING UP EMAILJS)
            /*
            setTimeout(() => {
                alert(`Thank you ${name}! Your message has been sent successfully.\n\n⚠️ This is currently a demo. To receive real emails, please implement one of the options in the JavaScript code.`);
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
            */
        });

        // Parallax effect for floating shapes
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const shapes = document.querySelectorAll('.shape');
            
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.5;
                shape.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });

        // Interactive skill items
        document.querySelectorAll('.skill-item').forEach(skill => {
            skill.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.05)';
            });
            
            skill.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Project card hover effects
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                const techTags = this.querySelectorAll('.tech-tag');
                techTags.forEach((tag, index) => {
                    setTimeout(() => {
                        tag.style.transform = 'scale(1.1)';
                        tag.style.boxShadow = '0 5px 15px rgba(131, 56, 236, 0.3)';
                    }, index * 100);
                });
            });
            
            card.addEventListener('mouseleave', function() {
                const techTags = this.querySelectorAll('.tech-tag');
                techTags.forEach(tag => {
                    tag.style.transform = 'scale(1)';
                    tag.style.boxShadow = 'none';
                });
            });
        });

        // Add some interactive cursor effects
        document.addEventListener('mousemove', (e) => {
            const cursor = document.querySelector('.cursor');
            if (!cursor) {
                const newCursor = document.createElement('div');
                newCursor.className = 'cursor';
                newCursor.style.cssText = `
                    position: fixed;
                    width: 20px;
                    height: 20px;
                    background: radial-gradient(circle, var(--primary-color), transparent);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    opacity: 0.5;
                    transition: all 0.1s ease;
                `;
                document.body.appendChild(newCursor);
            }
            
            document.querySelector('.cursor').style.left = e.clientX - 10 + 'px';
            document.querySelector('.cursor').style.top = e.clientY - 10 + 'px';
        });

        // Mobile menu functionality
        const mobileMenu = document.querySelector('.mobile-menu');
        const navLinks = document.querySelector('.nav-links');

        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        // Add mobile menu styles dynamically
        const mobileStyles = document.createElement('style');
        mobileStyles.textContent = `
            @media (max-width: 768px) {
                .nav-links.active {
                    display: flex;
                    flex-direction: column;
                    position: fixed;
                    top: 70px;
                    left: 0;
                    width: 100%;
                    background: rgba(10, 10, 10, 0.95);
                    backdrop-filter: blur(10px);
                    padding: 2rem;
                    gap: 1rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    animation: slideDown 0.3s ease;
                }
                
                .mobile-menu.active span:nth-child(1) {
                    transform: rotate(-45deg) translate(-5px, 6px);
                }
                
                .mobile-menu.active span:nth-child(2) {
                    opacity: 0;
                }
                
                .mobile-menu.active span:nth-child(3) {
                    transform: rotate(45deg) translate(-5px, -6px);
                }
                
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            }
        `;
        document.head.appendChild(mobileStyles);

        // Add loading animation
        window.addEventListener('load', () => {
            const loader = document.createElement('div');
            loader.className = 'loader';
            loader.innerHTML = `
                <div class="loader-content">
                    <div class="loader-logo">SMMO</div>
                    <div class="loader-progress">
                        <div class="loader-bar"></div>
                    </div>
                </div>
            `;
            
            const loaderStyles = document.createElement('style');
            loaderStyles.textContent = `
                .loader {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: var(--bg-dark);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 10000;
                    opacity: 1;
                    transition: opacity 0.5s ease;
                }
                
                .loader-content {
                    text-align: center;
                }
                
                .loader-logo {
                    font-size: 3rem;
                    font-weight: bold;
                    background: var(--gradient);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    margin-bottom: 2rem;
                    animation: pulse 1.5s ease-in-out infinite;
                }
                
                .loader-progress {
                    width: 200px;
                    height: 4px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 2px;
                    overflow: hidden;
                }
                
                .loader-bar {
                    width: 0;
                    height: 100%;
                    background: var(--gradient);
                    border-radius: 2px;
                    animation: loading 2s ease-out forwards;
                }
                
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
                
                @keyframes loading {
                    to { width: 100%; }
                }
            `;
            
            document.head.appendChild(loaderStyles);
            document.body.appendChild(loader);
            
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(loader);
                    document.head.removeChild(loaderStyles);
                }, 500);
            }, 2500);
        });

        // Easter egg - Konami code
        let konamiCode = [];
        const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

        document.addEventListener('keydown', (e) => {
            konamiCode.push(e.keyCode);
            
            if (konamiCode.length > konamiSequence.length) {
                konamiCode.shift();
            }
            
            if (konamiCode.length === konamiSequence.length && 
                konamiCode.every((code, i) => code === konamiSequence[i])) {
                
                // Activate matrix rain effect
                activateMatrixEffect();
                konamiCode = [];
            }
        });

        function activateMatrixEffect() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            canvas.style.position = 'fixed';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.pointerEvents = 'none';
            canvas.style.zIndex = '9998';
            canvas.style.opacity = '0.8';
            
            document.body.appendChild(canvas);
            
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()'.split('');
            const fontSize = 14;
            const columns = canvas.width / fontSize;
            const drops = [];
            
            for (let i = 0; i < columns; i++) {
                drops[i] = 1;
            }
            
            function draw() {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                ctx.fillStyle = '#00f5ff';
                ctx.font = fontSize + 'px monospace';
                
                for (let i = 0; i < drops.length; i++) {
                    const text = chars[Math.floor(Math.random() * chars.length)];
                    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                    
                    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                        drops[i] = 0;
                    }
                    
                    drops[i]++;
                }
            }
            
            const matrixInterval = setInterval(draw, 33);
            
            setTimeout(() => {
                clearInterval(matrixInterval);
                canvas.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(canvas);
                }, 1000);
            }, 5000);
            
            // Show easter egg message
            const message = document.createElement('div');
            message.textContent = '🎉 You found the secret! Matrix mode activated!';
            message.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: var(--gradient);
                padding: 1rem 2rem;
                border-radius: 10px;
                color: white;
                font-weight: bold;
                z-index: 9999;
                animation: fadeInUp 0.5s ease;
            `;
            
            document.body.appendChild(message);
            
            setTimeout(() => {
                message.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(message);
                }, 500);
            }, 3000);
        }

        // Performance optimization - lazy loading for project images
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });

        // Add theme toggle functionality
        const themeToggle = document.createElement('button');
        themeToggle.innerHTML = '🌙';
        themeToggle.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            border: none;
            background: var(--gradient);
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            z-index: 1000;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        `;
        
        document.body.appendChild(themeToggle);

        let isDarkMode = true;

        themeToggle.addEventListener('click', () => {
            isDarkMode = !isDarkMode;
            
            if (isDarkMode) {
                themeToggle.innerHTML = '🌙';
                document.documentElement.style.setProperty('--bg-dark', '#0a0a0a');
                document.documentElement.style.setProperty('--bg-light', '#1a1a2e');
                document.documentElement.style.setProperty('--text-light', '#ffffff');
            } else {
                themeToggle.innerHTML = '☀️';
                document.documentElement.style.setProperty('--bg-dark', '#f8f9fa');
                document.documentElement.style.setProperty('--bg-light', '#e9ecef');
                document.documentElement.style.setProperty('--text-light', '#212529');
            }
            
            themeToggle.style.transform = 'scale(0.9)';
            setTimeout(() => {
                themeToggle.style.transform = 'scale(1)';
            }, 150);
        });

        // Add scroll progress indicator
        const scrollProgress = document.createElement('div');
        scrollProgress.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0;
            height: 3px;
            background: var(--gradient);
            z-index: 1001;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(scrollProgress);

        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            scrollProgress.style.width = scrollPercent + '%';
        });

        // Certificate filtering functionality
        const filterButtons = document.querySelectorAll('.filter-btn');
        const certificateCards = document.querySelectorAll('.certificate-card');

        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                certificateCards.forEach(card => {
                    if (filter === 'all') {
                        card.classList.remove('hidden');
                        card.style.animation = 'fadeInUp 0.6s ease forwards';
                    } else {
                        const category = card.getAttribute('data-category');
                        if (category === filter) {
                            card.classList.remove('hidden');
                            card.style.animation = 'fadeInUp 0.6s ease forwards';
                        } else {
                            card.classList.add('hidden');
                        }
                    }
                });
            });
        });

        // Certificate modal functionality
        function openCertModal(certTitle) {
            const modal = document.getElementById('certModal');
            const modalTitle = document.getElementById('modalCertTitle');
            modalTitle.textContent = certTitle;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }

        function closeCertModal() {
            const modal = document.getElementById('certModal');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        // Close modal when clicking outside
        document.getElementById('certModal').addEventListener('click', (e) => {
            if (e.target.id === 'certModal') {
                closeCertModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeCertModal();
            }
        });

        // Animate certificates on scroll
        const certificateObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 200);
                }
            });
        }, { threshold: 0.1 });

        // Initialize certificate cards animation
        document.querySelectorAll('.certificate-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            card.style.transition = 'all 0.6s ease';
            certificateObserver.observe(card);
        });

        console.log('🚀 Portfolio loaded successfully! Try the Konami code: ↑↑↓↓←→←→BA');