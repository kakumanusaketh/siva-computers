// ========== SIVA TYPE & COMPUTERS - COMPREHENSIVE INTERACTIVE JAVASCRIPT ==========

document.addEventListener('DOMContentLoaded', function () {

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
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
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
            'All Digital Services',
            'Prints & General Works',
            'Document Translations',
            'Official E-Stamps & Affidavits',
            'CSC Works & Digi Seva',
            'Bulk Voice Calls & Bulk WhatsApp',
            'Ai Posters',
            'Computer Courses',
            'Tally ERP 9.0 & Tally Prime',
            'Anu Script Keyboard Typing'
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

    // ===== 11B. FAQ Accordion Toggle =====
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        // Open the first item by default
        faqItems[0].classList.add('active');

        faqItems.forEach(item => {
            const questionBtn = item.querySelector('.faq-question');
            if (questionBtn) {
                questionBtn.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    // Optional: Close others
                    faqItems.forEach(otherItem => otherItem.classList.remove('active'));
                    if (!isActive) {
                        item.classList.add('active');
                    }
                });
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
        contactForm.addEventListener('submit', function (e) {
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
        anchor.addEventListener('click', function (e) {
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

    console.log('✅ Siva Type & Computers: All Digital Services, CSC & SiCE Computer Coaching loaded.');

    // ===== DARK MODE TOGGLE =====
    const darkToggle = document.getElementById('dark-toggle');
    const darkToggleMobile = document.getElementById('dark-toggle-mobile');
    const darkIcon = document.getElementById('dark-icon');
    const darkIconMobile = document.getElementById('dark-icon-mobile');

    function setDarkMode(isDark) {
        if (isDark) {
            document.documentElement.classList.add('dark');
            if (darkIcon) { darkIcon.classList.remove('fa-moon'); darkIcon.classList.add('fa-sun'); }
            if (darkIconMobile) { darkIconMobile.classList.remove('fa-moon'); darkIconMobile.classList.add('fa-sun'); }
            localStorage.setItem('stc-dark-mode', 'true');
        } else {
            document.documentElement.classList.remove('dark');
            if (darkIcon) { darkIcon.classList.remove('fa-sun'); darkIcon.classList.add('fa-moon'); }
            if (darkIconMobile) { darkIconMobile.classList.remove('fa-sun'); darkIconMobile.classList.add('fa-moon'); }
            localStorage.setItem('stc-dark-mode', 'false');
        }
    }

    // Load saved preference
    const savedDark = localStorage.getItem('stc-dark-mode');
    if (savedDark === 'true') {
        setDarkMode(true);
    }

    if (darkToggle) {
        darkToggle.addEventListener('click', () => {
            setDarkMode(!document.documentElement.classList.contains('dark'));
        });
    }
    if (darkToggleMobile) {
        darkToggleMobile.addEventListener('click', () => {
            setDarkMode(!document.documentElement.classList.contains('dark'));
        });
    }

    // ===== LANGUAGE TOGGLE (English ↔ Telugu) - FULL PAGE TRANSLATION ENGINE =====
    const langToggle = document.getElementById('lang-toggle');
    const langToggleMobile = document.getElementById('lang-toggle-mobile');
    const langLabel = document.getElementById('lang-label');
    let currentLang = localStorage.getItem('stc-lang') || 'en';

    // Comprehensive Telugu dictionary for instant, authentic local translation
    const teluguDict = {
        // Navigation & General UI
        'Home': 'హోమ్',
        'About Us': 'మా గురించి',
        'Prints & General Works': 'ప్రింట్లు & సాధారణ పనులు',
        'E-Stamps & Notary Affidavits': 'ఈ-స్టాంపులు & నోటరీ అఫిడవిట్లు',
        'CSC Works': 'CSC పనులు',
        'CSC Works (Digi Seva)': 'CSC పనులు (డిజి సేవా)',
        'Computer Courses': 'కంప్యూటర్ కోర్సులు',
        'Bulk Voice Calls, Bulk WhatsApp, Ai Posters': 'బల్క్ వాయిస్ కాల్స్, బల్క్ WhatsApp, Ai పోస్టర్లు',
        'FAQ': 'తరచుగా అడిగే ప్రశ్నలు',
        'Location': 'స్థానం',
        'Contact': 'సంప్రదించండి',
        'Get Service / Enroll': 'సేవ పొందండి / చేరండి',
        'Request Service / Admission': 'సేవను అభ్యర్థించండి / చేరండి',
        'Add to Inquiry': 'విచారణకు జోడించండి',
        'In Cart': 'కార్టులో ఉంది',
        'View Inquiry Cart': 'విచారణ కార్టును చూడండి',
        'Inquiry Cart': 'విచారణ కార్ట్',
        'Chat on WhatsApp': 'WhatsAppలో చాట్ చేయండి',
        'SERVICES ACTIVE': 'సేవలు అందుబాటులో ఉన్నాయి',

        // Top Header & Info
        'Established 1999 • 27+ Years of Trusted Digital Services': 'స్థాపన 1999 • 27+ సంవత్సరాల నమ్మకమైన డిజిటల్ సేవలు',
        'Backside of Amaron Battery building, Masjid Center, Main Road, Piduguralla - 522413': 'అమరాన్ బ్యాటరీ భవనం వెనుక, మసీద్ సెంటర్, మెయిన్ రోడ్డు, పిడుగురాళ్ల - 522413',
        'Digital India & CSC Digi Seva Authorised Center': 'డిజిటల్ ఇండియా & CSC డిజి సేవా అధీకృత కేంద్రం',

        // Hero Section
        'Your One-Stop Destination for': 'మీ సమగ్ర సేవా కేంద్రం -',
        'All Digital Services': 'అన్ని డిజిటల్ సేవలు',
        'Serving Piduguralla & Palnadu District Since 1999': '1999 నుండి పిడుగురాళ్ల & పల్నాడు జిల్లాకు విశ్వసనీయ సేవ',
        'Explore All Services': 'అన్ని సేవలను చూడండి',
        'View Computer Courses': 'కంప్యూటర్ కోర్సులను చూడండి',
        'Digital & CSC Services': 'డిజిటల్ & CSC సేవలు',
        'Color Xerox, e-Stamps, Digi Seva, Bulk Marketing': 'కలర్ జిరాక్స్, ఈ-స్టాంపులు, డిజి సేవా, బల్క్ మార్కెటింగ్',
        'Computer Coaching (SiCE)': 'కంప్యూటర్ కోచింగ్ (SiCE)',
        'SiCE Certified Courses, Telugu & Hindi Typing': 'SiCE సర్టిఫైడ్ కోర్సులు, తెలుగు & హిందీ టైపింగ్',
        'Masjid Center, Piduguralla': 'మసీద్ సెంటర్, పిడుగురాళ్ల',
        'View Center Location →': 'కేంద్రం స్థానాన్ని చూడండి →',

        // Stats
        'Years of Service': 'సేవా సంవత్సరాలు',
        'Happy Customers': 'సంతోషకరమైన కస్టమర్లు',
        'Services Available': 'అందుబాటులో ఉన్న సేవలు',
        'Certified Courses': 'సర్టిఫైడ్ కోర్సులు',

        // Section Badges & Headings
        'ABOUT SIVA TYPE & COMPUTERS': 'శివ టైప్ & కంప్యూటర్స్ గురించి',
        'Leading Digital Citizen Services & SiCE Computer Education in Palnadu': 'పల్నాడులో ప్రముఖ డిజిటల్ పౌర సేవలు & SiCE కంప్యూటర్ విద్య',
        'OUR COMPLETE CAPABILITIES': 'మా సమగ్ర సామర్థ్యాలు',
        'Prints & General Works': 'ప్రింట్లు & సాధారణ పనులు',
        'Fast turnaround commercial printing, typing, binding, and official document translation services in Piduguralla.': 'పిడుగురాళ్లలో వేగవంతమైన కమర్షియల్ ప్రింటింగ్, టైపింగ్, బైండింగ్, మరియు అధికారిక డాక్యుమెంట్ అనువాద సేవలు.',
        'LEGAL & REVENUE SERVICES': 'చట్టపరమైన & రెవెన్యూ సేవలు',
        'Official e-Stamps & Notary Legal Drafting': 'అధికారిక ఈ-స్టాంపులు & నోటరీ లీగల్ డ్రాఫ్టింగ్',
        'Government-authorized non-judicial e-Stamps, legal affidavits, and revenue documentation under one roof.': 'ప్రభుత్వ అధీకృత నాన్-జ్యుడీషియల్ ఈ-స్టాంపులు, లీగల్ అఫిడవిట్లు మరియు రెవెన్యూ డాక్యుమెంటేషన్ ఒకే చోట.',
        'DIGITAL INDIA & CSC DIGI SEVA AUTHORISED CITIZEN SERVICE CENTER': 'డిజిటల్ ఇండియా & CSC డిజి సేవా అధీకృత పౌర సేవా కేంద్రం',
        'Full Catalog of Citizen & Digital Services': 'పౌర & డిజిటల్ సేవల పూర్తి జాబితా',
        'All government applications, documentation, online ticketing, digital payments, and commercial printing services available in Piduguralla.': 'పిడుగురాళ్లలో అన్ని ప్రభుత్వ దరఖాస్తులు, డాక్యుమెంటేషన్, ఆన్‌లైన్ టికెటింగ్, డిజిటల్ చెల్లింపులు మరియు వాణిజ్య ప్రింటింగ్ సేవలు అందుబాటులో ఉన్నాయి.',
        'MARKETING & AI SOLUTIONS': 'మార్కెటింగ్ & AI పరిష్కారాలు',
        'Bulk Voice Calls, Bulk WhatsApp & Ai Posters': 'బల్క్ వాయిస్ కాల్స్, బల్క్ WhatsApp & Ai పోస్టర్లు',
        'Next-generation digital marketing and automated broadcasting tools for local businesses, political leaders, events, and schools.': 'స్థానిక వ్యాపారాలు, నాయకులు, వేడుకలు మరియు పాఠశాలల కోసం ఆధునిక డిజిటల్ మార్కెటింగ్ మరియు ప్రచార సాధనాలు.',
        'GOVERNMENT-RECOGNIZED EDUCATION': 'ప్రభుత్వ గుర్తింపు పొందిన విద్య',
        'Computer Courses': 'కంప్యూటర్ కోర్సులు',
        'SiCE Authorized Franchise Training Partner. Job-oriented IT education with ISO verified course certificates.': 'SiCE అధీకృత ఫ్రాంచైజ్ ట్రైనింగ్ భాగస్వామి. ISO సర్టిఫికేట్‌తో ఉద్యోగావకాశాలు కల్పించే IT విద్య.',
        'SPECIALIZED SKILL TRAINING': 'ప్రత్యేక నైపుణ్య శిక్షణ',
        'Telugu & Hindi Keyboard Typing': 'తెలుగు & హిందీ కీబోర్డ్ టైపింగ్',
        'Anu Script with Apple & DOE Keyboards Only': 'అను స్క్రిప్ట్ - ఆపిల్ & DOE కీబోర్డులు మాత్రమే',
        'Master government and commercial touch-typing on modern PC keyboards. Essential for court, Secretariat, and government typing jobs.': 'ఆధునిక PC కీబోర్డులపై ప్రభుత్వ మరియు వాణిజ్య టచ్ టైపింగ్ నేర్చుకోండి. కోర్టు, సచివాలయ మరియు ప్రభుత్వ ఉద్యోగాలకు ఎంతో అవసరం.',
        'HELP & SUPPORT': 'సహాయం & మద్దతు',
        'Frequently Asked Questions': 'తరచుగా అడిగే ప్రశ్నలు',
        'Everything you need to know about our digital services, SiCE courses, typing training, and admissions.': 'మా డిజిటల్ సేవలు, SiCE కోర్సులు, టైపింగ్ శిక్షణ మరియు ప్రవేశాల గురించి పూర్తి వివరాలు.',
        'VISIT OUR CENTER': 'మా కేంద్రాన్ని సందర్శించండి',
        'Conveniently located at Masjid Center on Main Road, Piduguralla with easy access and full parking.': 'పిడుగురాళ్ల మెయిన్ రోడ్డులోని మసీద్ సెంటర్ వద్ద సులభమైన ప్రవేశం మరియు పార్కింగ్ సదుపాయంతో కలదు.',
        'GET IN TOUCH': 'మమ్మల్ని సంప్రదించండి',
        'Contact Siva Type & Computers': 'శివ టైప్ & కంప్యూటర్స్‌ను సంప్రదించండి',
        'Send us a message or inquiry directly via WhatsApp or visit our center in Piduguralla. We respond promptly!': 'WhatsApp ద్వారా నేరుగా సందేశం పంపండి లేదా పిడుగురాళ్లలోని మా కేంద్రాన్ని సందర్శించండి. మేము వెంటనే స్పందిస్తాము!',

        // Specific Service Cards
        'High-Speed Color Xerox': 'హై-స్పీడ్ కలర్ జిరాక్స్',
        'Document Translations': 'డాక్యుమెంట్ అనువాదాలు',
        'Photostat & B/W Copies': 'ఫోటోస్టాట్ & నలుపు-తెలుపు కాపీలు',
        'DTP (Telugu & English Typing)': 'DTP (తెలుగు & ఇంగ్లీష్ టైపింగ్)',
        'Spiral & Book Binding': 'స్పైరల్ & బుక్ బైండింగ్',
        'Lamination Services': 'లామినేషన్ సేవలు',
        'Scan & E-mail Services': 'స్కాన్ & ఈ-మెయిల్ సేవలు',
        'Passport Size Photos & Prints': 'పాస్‌పోర్ట్ సైజ్ ఫోటోలు & ప్రింట్లు',

        'Non-Judicial e-Stamps': 'నాన్-జ్యుడీషియల్ ఈ-స్టాంపులు',
        'Notary Affidavits & Legal Drafting': 'నోటరీ అఫిడవిట్లు & లీగల్ డ్రాఫ్టింగ్',
        'Rental & Commercial Agreements': 'అద్దె & వాణిజ్య ఒప్పందాలు',
        'Private EC & Certified Copies': 'ప్రైవేట్ EC & సర్టిఫైడ్ కాపీలు (CC)',
        'Treasury Challans & Court Fees': 'ట్రెజరీ చలానాలు & కోర్టు ఫీజులు',

        'PAN Card Applications & Seeding': 'PAN కార్డ్ దరఖాస్తులు & సీడింగ్',
        'Aadhaar PVC Smart Card Print': 'ఆధార్ PVC స్మార్ట్ కార్డ్ ప్రింట్',
        'Passport Online Services': 'పాస్‌పోర్ట్ ఆన్‌లైన్ సేవలు',
        'Online Job Applications': 'ఆన్‌లైన్ ఉద్యోగ దరఖాస్తులు',
        'TTD, Srisailam & Shirdi Darshan': 'తిరుమల, శ్రీశైలం & షిర్డీ దర్శనం',
        'Electricity & Utility Bills': 'విద్యుత్ & యుటిలిటీ బిల్లులు',
        'MSME & Govt Loan Schemes': 'MSME & ప్రభుత్వ రుణ పథకాలు',
        'EPF / PF Services': 'EPF / PF సేవలు',

        'Bulk Voice Calls': 'బల్క్ వాయిస్ కాల్స్',
        'Bulk WhatsApp Marketing': 'బల్క్ WhatsApp మార్కెటింగ్',
        'Ai Posters & Flyer Design': 'Ai పోస్టర్లు & ఫ్లయర్ డిజైన్',
        'DLT Bulk SMS Broadcasting': 'DLT బల్క్ SMS ప్రసారం',

        // Computer Courses
        'Tally ERP 9.0': 'ట్యాలీ ERP 9.0',
        'Tally Prime with GST': 'ట్యాలీ ప్రైమ్ విత్ GST',
        'Python Programming': 'పైథాన్ ప్రోగ్రామింగ్',
        'Core Java Programming': 'కోర్ జావా ప్రోగ్రామింగ్',
        'C & C++ Programming': 'C & C++ ప్రోగ్రామింగ్',
        'DCA (Diploma)': 'DCA (డిప్లొమా ఇన్ కంప్యూటర్ అప్లికేషన్స్)',
        'PGDCA (Post Graduate Diploma)': 'PGDCA (పోస్ట్ గ్రాడ్యుయేట్ డిప్లొమా)',
        'MS Office Suite': 'MS ఆఫీస్ సూట్ (Word, Excel, PPT)',
        'Computer Basics & Windows': 'కంప్యూటర్ బేసిక్స్ & విండోస్',
        'Spoken English & Communication': 'స్పోకెన్ ఇంగ్లీష్ & కమ్యూనికేషన్',
        'Spoken Hindi': 'స్పోకెన్ హిందీ',

        // Filter Tabs
        'All Services (20+)': 'అన్ని సేవలు (20+)',
        'Printing & Xerox': 'ప్రింటింగ్ & జిరాక్స్',
        'Aadhaar, PAN & Identity': 'ఆధార్, PAN & గుర్తింపు కార్డులు',
        'Online Job & Govt Forms': 'ఆన్‌లైన్ ఉద్యోగాలు & ప్రభుత్వ ఫారమ్‌లు',
        'Bills & Financial': 'బిల్లులు & ఫైనాన్షియల్',
        'All Courses': 'అన్ని కోర్సులు',
        'Accounting': 'అకౌంటింగ్',
        'Programming': 'ప్రోగ్రామింగ్',
        'Diplomas': 'డిప్లొమా కోర్సులు',
        'Office & Basics': 'ఆఫీస్ & బేసిక్స్',
        'Languages': 'భాషలు',

        // Form Fields
        'Your Full Name': 'మీ పూర్తి పేరు',
        'WhatsApp / Mobile Number': 'WhatsApp / మొబైల్ నంబర్',
        'Select Service or Course of Interest': 'మీకు కావలసిన సేవ లేదా కోర్సును ఎంచుకోండి',
        'Preferred Time / Urgency': 'ప్రాధాన్య సమయం / అత్యవసరం',
        'Your Message (Optional)': 'మీ సందేశం (ఐచ్ఛికం)',
        'Submit Request via WhatsApp': 'WhatsApp ద్వారా అభ్యర్థనను పంపండి',

        // Footer
        'Quick Links': 'ముఖ్యమైన లింకులు',
        'Center Timings': 'కేంద్రం పని వేళలు',
        'Monday to Saturday': 'సోమవారం నుండి శనివారం',
        'Sunday': 'ఆదివారం',
        'All rights reserved.': 'అన్ని హక్కులు రక్షించబడ్డాయి.'
    };

    // DOM text node translator with clean caching of original English text
    function translateDOM(targetLang) {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
            acceptNode: function (node) {
                const parent = node.parentElement;
                if (!parent) return NodeFilter.FILTER_REJECT;
                const tag = parent.tagName;
                if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT' || parent.id === 'google_translate_element') {
                    return NodeFilter.FILTER_REJECT;
                }
                return NodeFilter.FILTER_ACCEPT;
            }
        }, false);

        let node;
        while ((node = walker.nextNode())) {
            const raw = node.nodeValue;
            const trimmed = raw.trim();
            if (!trimmed || trimmed.length < 2) continue;

            // Cache original English text
            if (node.__stcOrig === undefined) {
                node.__stcOrig = raw;
            }

            if (targetLang === 'te') {
                // Exact phrase match
                if (teluguDict[trimmed]) {
                    node.nodeValue = raw.replace(trimmed, teluguDict[trimmed]);
                } else {
                    // Check if any key exists as a substring
                    for (const [en, te] of Object.entries(teluguDict)) {
                        if (en.length > 3 && raw.includes(en)) {
                            raw_replaced = node.nodeValue.split(en).join(te);
                            node.nodeValue = raw_replaced;
                        }
                    }
                }
            } else {
                // Restore pristine English
                if (node.__stcOrig !== undefined) {
                    node.nodeValue = node.__stcOrig;
                }
            }
        }

        // Also translate placeholders
        document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(input => {
            if (!input.__stcOrigPlaceholder) {
                input.__stcOrigPlaceholder = input.getAttribute('placeholder');
            }
            if (targetLang === 'te') {
                const ph = input.__stcOrigPlaceholder.trim();
                if (teluguDict[ph]) {
                    input.setAttribute('placeholder', teluguDict[ph]);
                }
            } else {
                input.setAttribute('placeholder', input.__stcOrigPlaceholder);
            }
        });
    }

    // Trigger Google Translate engine to translate any remaining paragraphs and dynamic elements
    function triggerGoogleTranslate(lang) {
        const combo = document.querySelector('.goog-te-combo');
        if (combo) {
            combo.value = lang;
            combo.dispatchEvent(new Event('change'));
            return true;
        }
        return false;
    }

    function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('stc-lang', lang);

        // Update toggle button labels
        if (langLabel) {
            langLabel.textContent = lang === 'en' ? 'తెలుగు' : 'English';
        }
        if (langToggle) {
            langToggle.setAttribute('title', lang === 'en' ? 'తెలుగులోకి మార్చండి' : 'Switch to English');
        }
        if (langToggleMobile) {
            langToggleMobile.setAttribute('title', lang === 'en' ? 'తెలుగు' : 'English');
        }

        // 1. Run local high-speed dictionary translation on all DOM text nodes
        translateDOM(lang);

        // 2. Trigger Google Translate engine (translates any remaining long paragraphs & FAQs)
        triggerGoogleTranslate(lang);

        // 3. Update document title
        if (lang === 'te') {
            document.title = 'శివ టైప్ & కంప్యూటర్స్ | అన్ని డిజిటల్ సేవలు, CSC & SiCE కంప్యూటర్ కోచింగ్ | పిడుగురాళ్ల';
            document.body.classList.add('font-telugu');
        } else {
            document.title = 'Siva Type & Computers | All Digital Services, CSC & SiCE Computer Coaching | Piduguralla';
            document.body.classList.remove('font-telugu');
        }
    }

    // Check if user previously saved Telugu
    if (currentLang === 'te') {
        // Wait a slight tick for DOM to settle
        setTimeout(() => applyLanguage('te'), 200);
    }

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            applyLanguage(currentLang === 'en' ? 'te' : 'en');
        });
    }
    if (langToggleMobile) {
        langToggleMobile.addEventListener('click', () => {
            applyLanguage(currentLang === 'en' ? 'te' : 'en');
        });
    }
});
