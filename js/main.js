// ========== SIVA TYPE & COMPUTERS - COMPREHENSIVE INTERACTIVE JAVASCRIPT ==========

document.addEventListener('DOMContentLoaded', function() {

    // ===== 1. Initialize AOS (Animate on Scroll) =====
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50,
            disable: window.innerWidth < 640 ? 'phone' : false
        });
    }

    // ===== 2. Reading / Scroll Progress Bar =====
    const scrollProgress = document.getElementById('scroll-progress');
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (docHeight > 0) {
                const scrollPercent = (scrollTop / docHeight) * 100;
                scrollProgress.style.width = scrollPercent + '%';
            }
        });
    }

    // ===== 3. Sticky Navbar Shadow Enhancement =====
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                navbar.classList.add('shadow-lg', 'bg-white/98');
                navbar.classList.remove('shadow-sm');
            } else {
                navbar.classList.remove('shadow-lg', 'bg-white/98');
                navbar.classList.add('shadow-sm');
            }
        });
    }

    // ===== 4. Mobile Menu Drawer Toggle =====
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');

    if (menuToggle && mobileMenu && menuIcon) {
        menuToggle.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.toggle('hidden');
            if (isHidden) {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            } else {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
            }
        });

        // Close mobile drawer when any link is clicked
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            });
        });
    }

    // ===== 5. Scroll Active Nav Link Indicator =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNav() {
        const scrollY = window.scrollY + 120;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('text-primary-600', 'font-bold');
                    link.classList.add('text-gray-700');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('text-primary-600', 'font-bold');
                        link.classList.remove('text-gray-700');
                    }
                });
            }
        });
    }
    window.addEventListener('scroll', highlightNav);

    // ===== 6. Animated Number Counters =====
    const counters = document.querySelectorAll('.counter');
    let countersAnimated = false;

    function checkCounters() {
        if (countersAnimated) return;
        counters.forEach(counter => {
            const rect = counter.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                countersAnimated = true;
                const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
                const duration = 2000;
                const startTime = performance.now();

                function step(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const currentVal = Math.floor(eased * target);
                    counter.textContent = currentVal.toLocaleString();
                    if (progress < 1) {
                        requestAnimationFrame(step);
                    } else {
                        counter.textContent = target.toLocaleString() + '+';
                    }
                }
                requestAnimationFrame(step);
            }
        });
    }
    window.addEventListener('scroll', checkCounters);
    checkCounters();

    // ===== 7. Dynamic Typewriter Effect =====
    const typewriterEl = document.getElementById('typewriter-text');
    if (typewriterEl) {
        const phrases = [
            'Certified Computer Courses',
            'Telugu & Hindi Keyboard Typing',
            'MS Office & Advanced Excel',
            'DCA & PGDCA Diplomas',
            'Tally Prime with GST',
            'Python & Java Coding',
            'Digital India & CSC Services',
            'Aadhaar, PAN & Passport',
            'High Speed Color Xerox & DTP',
            'Online Job Applications'
        ];
        let pIndex = 0;
        let cIndex = 0;
        let isDeleting = false;
        let speed = 90;

        function runTypewriter() {
            const current = phrases[pIndex];
            if (isDeleting) {
                typewriterEl.textContent = current.substring(0, cIndex - 1);
                cIndex--;
                speed = 45;
            } else {
                typewriterEl.textContent = current.substring(0, cIndex + 1);
                cIndex++;
                speed = 85;
            }

            if (!isDeleting && cIndex === current.length) {
                speed = 2200;
                isDeleting = true;
            } else if (isDeleting && cIndex === 0) {
                isDeleting = false;
                pIndex = (pIndex + 1) % phrases.length;
                speed = 400;
            }
            setTimeout(runTypewriter, speed);
        }
        setTimeout(runTypewriter, 800);
    }

    // ===== 8. Course Filtering System =====
    const courseFilters = document.querySelectorAll('.course-filter');
    const courseCards = document.querySelectorAll('.course-card');

    courseFilters.forEach(btn => {
        btn.addEventListener('click', () => {
            courseFilters.forEach(b => {
                b.classList.remove('bg-primary-600', 'text-white', 'shadow-md');
                b.classList.add('bg-white', 'text-gray-700', 'border', 'border-gray-200');
            });
            btn.classList.add('bg-primary-600', 'text-white', 'shadow-md');
            btn.classList.remove('bg-white', 'text-gray-700', 'border', 'border-gray-200');

            const filter = btn.getAttribute('data-filter');

            courseCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                        card.style.transition = 'all 0.3s ease';
                    }, 40);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });

    // ===== 9. Service Category Filtering =====
    const serviceFilters = document.querySelectorAll('.service-filter-btn');
    const serviceItems = document.querySelectorAll('.service-catalog-item');

    serviceFilters.forEach(btn => {
        btn.addEventListener('click', () => {
            serviceFilters.forEach(b => {
                b.classList.remove('bg-accent-500', 'text-primary-950', 'font-bold', 'shadow');
                b.classList.add('bg-white', 'text-gray-700', 'border', 'border-gray-200');
            });
            btn.classList.add('bg-accent-500', 'text-primary-950', 'font-bold', 'shadow');
            btn.classList.remove('bg-white', 'text-gray-700', 'border', 'border-gray-200');

            const targetCategory = btn.getAttribute('data-service-cat');

            serviceItems.forEach(item => {
                const itemCat = item.getAttribute('data-cat');
                if (targetCategory === 'all' || itemCat === targetCategory) {
                    item.style.display = 'flex';
                    item.style.opacity = '1';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // ===== 10. Inquiry Cart Feature =====
    const inquiryCart = new Set();
    const cartCountBadge = document.getElementById('cart-count-badge');
    const cartFloatingBtn = document.getElementById('cart-floating-btn');
    const cartModal = document.getElementById('cart-modal');
    const cartItemsList = document.getElementById('cart-items-list');
    const closeCartModal = document.getElementById('close-cart-modal');
    const cartWhatsappSubmit = document.getElementById('cart-whatsapp-submit');

    function updateCartUI() {
        const count = inquiryCart.size;
        if (cartCountBadge) cartCountBadge.textContent = count;
        if (cartFloatingBtn) {
            if (count > 0) {
                cartFloatingBtn.classList.remove('hidden');
                cartFloatingBtn.classList.add('flex');
            } else {
                cartFloatingBtn.classList.add('hidden');
                cartFloatingBtn.classList.remove('flex');
            }
        }
        // Update all buttons that correspond to items
        document.querySelectorAll('.add-to-inquiry-btn').forEach(btn => {
            const title = btn.getAttribute('data-title');
            if (inquiryCart.has(title)) {
                btn.innerHTML = '<i class="fas fa-check text-green-400 mr-1"></i> In Cart';
                btn.classList.add('bg-green-700', 'text-white');
                btn.classList.remove('bg-primary-600', 'bg-accent-500');
            } else {
                btn.innerHTML = '<i class="fas fa-plus-circle text-xs mr-1"></i> Add to Inquiry';
                btn.classList.remove('bg-green-700');
                btn.classList.add('bg-primary-600', 'text-white');
            }
        });
    }

    document.querySelectorAll('.add-to-inquiry-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const title = btn.getAttribute('data-title');
            if (inquiryCart.has(title)) {
                inquiryCart.delete(title);
            } else {
                inquiryCart.add(title);
            }
            updateCartUI();
        });
    });

    function renderCartModal() {
        if (!cartItemsList) return;
        cartItemsList.innerHTML = '';
        if (inquiryCart.size === 0) {
            cartItemsList.innerHTML = '<p class="text-xs text-gray-500 text-center py-6">Your inquiry list is empty. Browse our courses & services above!</p>';
            if (cartWhatsappSubmit) cartWhatsappSubmit.classList.add('opacity-50', 'pointer-events-none');
            return;
        }

        if (cartWhatsappSubmit) cartWhatsappSubmit.classList.remove('opacity-50', 'pointer-events-none');

        inquiryCart.forEach(item => {
            const div = document.createElement('div');
            div.className = 'flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs';
            div.innerHTML = `
                <span class="font-semibold text-gray-800 flex items-center gap-2">
                    <i class="fas fa-check-circle text-green-500"></i> ${item}
                </span>
                <button class="remove-cart-item text-red-500 hover:text-red-700 font-bold p-1 text-sm leading-none" data-title="${item}">&times;</button>
            `;
            cartItemsList.appendChild(div);
        });

        document.querySelectorAll('.remove-cart-item').forEach(rBtn => {
            rBtn.addEventListener('click', () => {
                const t = rBtn.getAttribute('data-title');
                inquiryCart.delete(t);
                renderCartModal();
                updateCartUI();
            });
        });

        // WhatsApp submit generator
        if (cartWhatsappSubmit) {
            const itemsArray = Array.from(inquiryCart);
            const message = `Hello Siva Type & Computers, Piduguralla!\n\nI want inquiry and fee details for the following services/courses:\n- ${itemsArray.join('\n- ')}\n\nPlease send me details and schedule. Thank you!`;
            cartWhatsappSubmit.href = `https://wa.me/918511204304?text=${encodeURIComponent(message)}`;
        }
    }

    if (cartFloatingBtn && cartModal) {
        cartFloatingBtn.addEventListener('click', () => {
            renderCartModal();
            cartModal.classList.remove('hidden');
            cartModal.classList.add('flex');
            document.body.style.overflow = 'hidden';
        });
    }

    const headerCartBtn = document.getElementById('header-cart-btn');
    if (headerCartBtn && cartModal) {
        headerCartBtn.addEventListener('click', () => {
            renderCartModal();
            cartModal.classList.remove('hidden');
            cartModal.classList.add('flex');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeCartModal && cartModal) {
        closeCartModal.addEventListener('click', () => {
            cartModal.classList.add('hidden');
            cartModal.classList.remove('flex');
            document.body.style.overflow = 'auto';
        });

        cartModal.addEventListener('click', (e) => {
            if (e.target === cartModal) {
                cartModal.classList.add('hidden');
                cartModal.classList.remove('flex');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // ===== 11. Course Details Modal =====
    const courseDetailBtns = document.querySelectorAll('.course-detail-btn');
    const courseModal = document.getElementById('course-modal');
    const closeModal = document.getElementById('close-modal');

    if (courseModal) {
        courseDetailBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const card = btn.closest('.course-card');
                const title = card.querySelector('.course-title')?.textContent || '';
                const desc = card.querySelector('.course-desc')?.textContent || '';
                const duration = card.querySelector('.course-duration')?.textContent || '';
                const level = card.querySelector('.course-level')?.textContent || '';
                const syllabus = card.getAttribute('data-syllabus') || '';

                document.getElementById('modal-title').textContent = title;
                document.getElementById('modal-desc').textContent = desc;
                document.getElementById('modal-duration').textContent = duration;
                document.getElementById('modal-level').textContent = level;

                const syllabusList = document.getElementById('modal-syllabus');
                syllabusList.innerHTML = '';
                if (syllabus) {
                    syllabus.split('|').forEach(item => {
                        const li = document.createElement('li');
                        li.className = 'flex items-start gap-2 text-gray-700';
                        li.innerHTML = '<i class="fas fa-check-circle text-green-500 mt-0.5 flex-shrink-0"></i><span>' + item.trim() + '</span>';
                        syllabusList.appendChild(li);
                    });
                }

                // WhatsApp deep link for this specific course
                const modalWa = document.getElementById('modal-wa-btn');
                if (modalWa) {
                    modalWa.href = `https://wa.me/918511204304?text=${encodeURIComponent('Hi Siva Type & Computers, I want to join the ' + title + ' course. Please send batch timings and fee details.')}`;
                }

                courseModal.classList.remove('hidden');
                courseModal.classList.add('flex');
                document.body.style.overflow = 'hidden';
            });
        });

        if (closeModal) {
            closeModal.addEventListener('click', () => {
                courseModal.classList.add('hidden');
                courseModal.classList.remove('flex');
                document.body.style.overflow = 'auto';
            });
        }

        courseModal.addEventListener('click', (e) => {
            if (e.target === courseModal) {
                courseModal.classList.add('hidden');
                courseModal.classList.remove('flex');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // ===== 12. Testimonial Slider =====
    const testimonialTrack = document.getElementById('testimonial-track');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    let currentSlide = 0;
    const slides = document.querySelectorAll('.testimonial-slide');
    const slideCount = slides.length;
    let autoSlideInterval;

    function goToSlide(index) {
        if (!testimonialTrack || slideCount === 0) return;
        currentSlide = index;
        const offset = -(index * 100);
        testimonialTrack.style.transform = `translateX(${offset}%)`;

        testimonialDots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('bg-accent-500', 'w-8');
                dot.classList.remove('bg-white/40', 'w-3');
            } else {
                dot.classList.remove('bg-accent-500', 'w-8');
                dot.classList.add('bg-white/40', 'w-3');
            }
        });
    }

    function nextSlide() {
        goToSlide((currentSlide + 1) % slideCount);
    }

    testimonialDots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            goToSlide(i);
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(nextSlide, 5000);
        });
    });

    if (slideCount > 0) {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    // ===== 13. Interactive Contact Form with WhatsApp Direct Dispatch =====
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const name = (formData.get('name') || '').toString().trim();
            const phone = (formData.get('phone') || '').toString().trim();
            const course = (formData.get('course') || '').toString().trim();
            const timing = (formData.get('timing') || '').toString().trim();
            const message = (formData.get('message') || '').toString().trim();

            if (!name || !phone) {
                alert('Please enter your full name and phone number.');
                return;
            }

            const cleanPhone = phone.replace(/[\s-]/g, '');
            if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
                alert('Please provide a valid 10-digit Indian phone number (starting with 6-9).');
                return;
            }

            const successDiv = document.getElementById('form-success');
            const waRedirect = document.getElementById('wa-redirect');

            let waText = `*New Admission/Service Inquiry - Siva Type & Computers*\n`;
            waText += `👤 *Name:* ${name}\n`;
            waText += `📱 *Phone:* ${phone}\n`;
            if (course) waText += `📚 *Course/Service:* ${course}\n`;
            if (timing) waText += `⏰ *Preferred Time:* ${timing}\n`;
            if (message) waText += `💬 *Message:* ${message}\n`;
            waText += `\nSent via sivacomputers website`;

            const waUrl = `https://wa.me/918511204304?text=${encodeURIComponent(waText)}`;

            if (successDiv) {
                successDiv.classList.remove('hidden');
                if (waRedirect) {
                    waRedirect.href = waUrl;
                    waRedirect.classList.remove('hidden');
                }
                contactForm.reset();

                // Open WhatsApp automatically in a new tab
                window.open(waUrl, '_blank');

                setTimeout(() => {
                    successDiv.classList.add('hidden');
                }, 10000);
            }
        });
    }

    // ===== 14. Back to Top Button =====
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTop.classList.remove('hidden');
                backToTop.classList.add('flex');
            } else {
                backToTop.classList.add('hidden');
                backToTop.classList.remove('flex');
            }
        });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== 15. Canvas Particle Atmosphere in Hero Section =====
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = 35;

        function resizeCanvas() {
            const hero = canvas.parentElement;
            if (hero) {
                canvas.width = hero.offsetWidth;
                canvas.height = hero.offsetHeight;
            }
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * (canvas.width || 800);
                this.y = Math.random() * (canvas.height || 600);
                this.size = Math.random() * 2.5 + 1;
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.speedY = (Math.random() - 0.5) * 0.4;
                this.opacity = Math.random() * 0.4 + 0.15;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(245, 158, 11, ${this.opacity})`;
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function renderParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Connect nearby particles
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(245, 158, 11, ${0.08 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            requestAnimationFrame(renderParticles);
        }
        renderParticles();
    }

    // ===== 16. Smooth Scroll for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId.startsWith('#')) return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                const navHeight = document.getElementById('navbar')?.offsetHeight || 75;
                const targetPos = targetEl.offsetTop - navHeight;
                window.scrollTo({ top: targetPos, behavior: 'smooth' });
            }
        });
    });

    console.log('✅ Siva Type & Computers Web App loaded with Telugu & Hindi Keyboard Typing services.');
});
