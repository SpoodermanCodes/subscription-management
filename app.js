document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. DYNAMIC DATE & TIME TICKER (Requirement 9)
    // ==========================================================================
    const clockDisplay = document.getElementById('clockDisplay');
    if (clockDisplay) {
        const updateClock = () => {
            const now = new Date();
            const dateOptions = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
            const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
            const dateStr = now.toLocaleDateString('en-US', dateOptions);
            const timeStr = now.toLocaleTimeString('en-US', timeOptions);
            clockDisplay.innerHTML = `<i class="fa-regular fa-calendar-days"></i> ${dateStr} &nbsp;&bull;&nbsp; <i class="fa-regular fa-clock"></i> ${timeStr}`;
        };
        updateClock();
        setInterval(updateClock, 1000);
    }

    // ==========================================================================
    // 2. THEME SWITCHER (Requirement 10: Light Mode and Dark Mode using JS)
    // ==========================================================================
    const themeToggleBtn = document.getElementById('themeToggle');
    const htmlEl = document.documentElement;

    // Load theme from localStorage, or default to light
    const savedTheme = localStorage.getItem('subflow-theme') || 'light';
    htmlEl.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlEl.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlEl.setAttribute('data-theme', newTheme);
        localStorage.setItem('subflow-theme', newTheme);
        updateThemeIcon(newTheme);
        showToast('Theme Changed', `Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
    });

    function updateThemeIcon(theme) {
        const icon = themeToggleBtn.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fa-solid fa-sun';
            themeToggleBtn.setAttribute('data-tooltip', 'Switch to Light Mode');
        } else {
            icon.className = 'fa-solid fa-moon';
            themeToggleBtn.setAttribute('data-tooltip', 'Switch to Dark Mode');
        }
    }

    // ==========================================================================
    // 3. RESPONSIVE MOBILE NAVIGATION MENU (Requirement 2 & 24)
    // ==========================================================================
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navigationBar = document.getElementById('navigationBar');

    if (hamburgerBtn && navigationBar) {
        hamburgerBtn.addEventListener('click', () => {
            navigationBar.classList.toggle('active');
            const isOpen = navigationBar.classList.contains('active');
            hamburgerBtn.querySelector('i').className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
        });

        // Close menu when link is clicked
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navigationBar.classList.remove('active');
                hamburgerBtn.querySelector('i').className = 'fa-solid fa-bars';
            });
        });
    }

    // ==========================================================================
    // 4. NOTIFICATION PANEL DISPLAY (Requirement 11: Show/Hide Notification Panel)
    // ==========================================================================
    const bellBtn = document.getElementById('bellBtn');
    const notificationPanel = document.getElementById('notificationPanel');
    const closeNotificationBtn = document.getElementById('closeNotificationBtn');
    const bellBadge = document.getElementById('bellBadge');
    const clearAllNotiBtn = document.getElementById('clearAllNotiBtn');

    if (bellBtn && notificationPanel && closeNotificationBtn) {
        bellBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            notificationPanel.classList.toggle('active');
        });

        closeNotificationBtn.addEventListener('click', () => {
            notificationPanel.classList.remove('active');
        });

        // Close notification panel when clicking outside
        document.addEventListener('click', (e) => {
            if (!notificationPanel.contains(e.target) && e.target !== bellBtn && !bellBtn.contains(e.target)) {
                notificationPanel.classList.remove('active');
            }
        });

        clearAllNotiBtn.addEventListener('click', () => {
            bellBadge.style.display = 'none';
            showToast('Read Alerts', 'All active alerts marked as read.', 'success');
            notificationPanel.classList.remove('active');
        });
    }

    // ==========================================================================
    // 5. AUTOMATIC & MANUAL SLIDER (Requirement 8)
    // ==========================================================================
    const sliderContainer = document.getElementById('sliderContainer');
    const prevSlideBtn = document.getElementById('prevSlideBtn');
    const nextSlideBtn = document.getElementById('nextSlideBtn');
    const indicators = document.querySelectorAll('.indicator');
    const totalSlides = indicators.length;
    let currentSlide = 0;
    let slideTimer;

    const updateSlider = (index) => {
        currentSlide = index;
        // Translate slider container (Requirement 26: translate transform)
        sliderContainer.style.transform = `translateX(-${currentSlide * 33.333}%)`;
        
        // Update indicators
        indicators.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentSlide);
        });
    };

    const nextSlide = () => {
        let index = (currentSlide + 1) % totalSlides;
        updateSlider(index);
    };

    const prevSlide = () => {
        let index = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider(index);
    };

    if (sliderContainer && prevSlideBtn && nextSlideBtn) {
        // Click events
        nextSlideBtn.addEventListener('click', () => {
            nextSlide();
            resetSlideTimer();
        });

        prevSlideBtn.addEventListener('click', () => {
            prevSlide();
            resetSlideTimer();
        });

        // Indicators click events
        indicators.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                updateSlider(idx);
                resetSlideTimer();
            });
        });

        // Start Auto Slider
        const startSlideTimer = () => {
            slideTimer = setInterval(nextSlide, 4500); // 4.5 seconds auto duration
        };

        const resetSlideTimer = () => {
            clearInterval(slideTimer);
            startSlideTimer();
        };

        startSlideTimer();
    }

    // ==========================================================================
    // 6. HERO TYPING EFFECT ANIMATION (Requirement 14)
    // ==========================================================================
    const typingTextEl = document.getElementById('typingEffect');
    if (typingTextEl) {
        const words = [
            "Monitor recurring budgets.", 
            "Detect unallocated licenses.", 
            "Optimize software spend.", 
            "Automate renewal warnings."
        ];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 75;

        const type = () => {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                typingTextEl.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 35; // delete speed faster
            } else {
                typingTextEl.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 75;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typingSpeed = 1500; // pause before deleting
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingSpeed = 500; // pause before typing next word
            }

            setTimeout(type, typingSpeed);
        };
        setTimeout(type, 1000);
    }

    // ==========================================================================
    // 7. SCROLLSPY NAVIGATION & STICKY HIGHLIGHTING (Requirement 2 & 30)
    // ==========================================================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120; // offset for sticky header
            const sectionId = current.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // ==========================================================================
    // 8. FLOATING BACK TO TOP BUTTON (Requirement 16)
    // ==========================================================================
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================================================
    // 9. DYNAMIC NUMERICAL COUNTERS & PROGRESS BAR ANIMATION (Requirement 5 & 31)
    // ==========================================================================
    const counterElements = document.querySelectorAll('.counter-value');
    let countersAnimated = false;

    const animateCounters = () => {
        if (countersAnimated) return;
        countersAnimated = true;

        counterElements.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            const prefix = counter.getAttribute('data-prefix') || '';
            const suffix = counter.getAttribute('data-suffix') || '';
            const duration = 1500; // ms
            const stepTime = Math.max(Math.floor(duration / target), 10);
            let startVal = 0;

            // Handle larger numbers gracefully
            const increment = Math.ceil(target / (duration / stepTime));

            const timer = setInterval(() => {
                startVal += increment;
                if (startVal >= target) {
                    startVal = target;
                    clearInterval(timer);
                }
                
                // Format numbers with commas
                counter.textContent = prefix + startVal.toLocaleString() + suffix;
            }, stepTime);
        });

        // Trigger CSS progress bar animation synchronously (Requirement 31)
        const spendProgressBar = document.getElementById('spendProgressBar');
        const progressPctText = document.getElementById('progressPct');
        if (spendProgressBar && progressPctText) {
            const targetPercent = 62; // Mapped utilization percentage
            spendProgressBar.style.width = `${targetPercent}%`;
            
            // Count up percent number
            let curPercent = 0;
            const pctTimer = setInterval(() => {
                curPercent++;
                if (curPercent >= targetPercent) {
                    curPercent = targetPercent;
                    clearInterval(pctTimer);
                }
                progressPctText.textContent = `${curPercent}%`;
            }, 20);
        }
    };

    // Use IntersectionObserver to animate stats when visible
    const statsSection = document.querySelector('.dashboard-section');
    if (statsSection && 'IntersectionObserver' in window) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        statsObserver.observe(statsSection);
    } else {
        // Fallback if IntersectionObserver is not supported
        setTimeout(animateCounters, 800);
    }

    // ==========================================================================
    // 10. RESERVATION FORM VALIDATION (Requirement 12 & 13)
    // ==========================================================================
    const resForm = document.getElementById('reservationForm');

    if (resForm) {
        // Real-time input listener to clear error states
        resForm.querySelectorAll('input, select').forEach(input => {
            input.addEventListener('input', () => {
                const group = input.closest('.form-group');
                if (group) group.classList.remove('invalid');
            });
        });

        resForm.addEventListener('reset', () => {
            resForm.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('invalid');
            });
            showToast('Form Reset', 'All reservation input fields cleared.', 'info');
        });

        resForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;

            const nameInput = document.getElementById('resName');
            const emailInput = document.getElementById('resEmail');
            const phoneInput = document.getElementById('resPhone');
            const seatingSelect = document.getElementById('resSeating');
            const dateInput = document.getElementById('resDate');
            const timeInput = document.getElementById('resTime');
            const guestsInput = document.getElementById('resGuests');

            // 1. Name validation
            if (!nameInput.value || nameInput.value.trim().length < 3) {
                invalidateField(nameInput);
                isValid = false;
            }

            // 2. Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value || !emailRegex.test(emailInput.value)) {
                invalidateField(emailInput);
                isValid = false;
            }

            // 3. Phone validation
            const phoneRegex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
            if (!phoneInput.value || !phoneRegex.test(phoneInput.value)) {
                invalidateField(phoneInput);
                isValid = false;
            }

            // 4. Seating Platform select
            if (!seatingSelect.value) {
                invalidateField(seatingSelect);
                isValid = false;
            }

            // 5. Date validation
            if (!dateInput.value) {
                invalidateField(dateInput);
                isValid = false;
            } else {
                const selectedDate = new Date(dateInput.value);
                const today = new Date();
                today.setHours(0,0,0,0);
                if (selectedDate < today) {
                    invalidateField(dateInput);
                    isValid = false;
                }
            }

            // 6. Time validation
            if (!timeInput.value) {
                invalidateField(timeInput);
                isValid = false;
            }

            // 7. Guests validation
            const guestsVal = parseInt(guestsInput.value, 10);
            if (isNaN(guestsVal) || guestsVal < 1 || guestsVal > 100) {
                invalidateField(guestsInput);
                isValid = false;
            }

            if (isValid) {
                // Success submit
                showToast(
                    'Booking Confirmed!', 
                    `Consultation booked on ${dateInput.value} at ${timeInput.value} via ${seatingSelect.value} for ${guestsInput.value} members.`,
                    'success'
                );
                resForm.reset();
            } else {
                showToast('Validation Error', 'Please check reservation form fields and correct highlighted errors.', 'error');
            }
        });
    }

    function invalidateField(inputElement) {
        const group = inputElement.closest('.form-group');
        if (group) {
            group.classList.add('invalid');
        }
    }

    // ==========================================================================
    // 11. DYNAMIC SYSTEM TOAST NOTIFICATIONS
    // ==========================================================================
    const toastPanel = document.getElementById('toastPanel');
    const toastIndicator = document.getElementById('toastIndicator');
    const toastIcon = document.getElementById('toastIcon');
    const toastTitle = document.getElementById('toastTitle');
    const toastMessage = document.getElementById('toastMessage');
    let toastTimer;

    window.showToast = (title, message, type = 'success') => {
        clearTimeout(toastTimer);
        
        toastTitle.textContent = title;
        toastMessage.textContent = message;
        
        // Setup visual indicators based on alert type
        if (type === 'success') {
            toastIndicator.style.backgroundColor = 'var(--success)';
            toastIcon.innerHTML = '<i class="fa-solid fa-circle-check" style="color: var(--success);"></i>';
        } else if (type === 'error') {
            toastIndicator.style.backgroundColor = 'var(--error)';
            toastIcon.innerHTML = '<i class="fa-solid fa-triangle-exclamation" style="color: var(--error);"></i>';
        } else if (type === 'info') {
            toastIndicator.style.backgroundColor = 'var(--accent)';
            toastIcon.innerHTML = '<i class="fa-solid fa-circle-info" style="color: var(--accent);"></i>';
        }

        toastPanel.classList.add('active');
        
        // Auto hide after 4.5 seconds
        toastTimer = setTimeout(() => {
            toastPanel.classList.remove('active');
        }, 4500);
    };

    // Trigger basic welcome toast
    setTimeout(() => {
        showToast('Welcome to SubFlow', 'Start monitoring and optimizing SaaS expenses.', 'info');
    }, 1500);

    // Logout Mock Action
    const logoutLink = document.getElementById('link-logout');
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            showToast('Sign Out Success', 'You have been logged out of the dashboard session.', 'info');
        });
    }
});
