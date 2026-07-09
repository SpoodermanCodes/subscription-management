document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // THEME TOGGLE LOGIC
    // ==========================================================================
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem('subflow-theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeToggleUI(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('subflow-theme', newTheme);
        updateThemeToggleUI(newTheme);
        showToast('Info', `Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
    });

    function updateThemeToggleUI(theme) {
        const icon = themeToggle.querySelector('i');
        const text = themeToggle.querySelector('span');
        if (theme === 'dark') {
            icon.className = 'ph ph-moon';
            text.textContent = 'Dark Theme';
        } else {
            icon.className = 'ph ph-sun';
            text.textContent = 'Light Theme';
        }
    }

    // ==========================================================================
    // DATE AND CLOCK BADGE
    // ==========================================================================
    const currentDateEl = document.getElementById('currentDate');
    if (currentDateEl) {
        const options = { month: 'long', year: 'numeric', day: 'numeric' };
        currentDateEl.textContent = new Date().toLocaleDateString('en-US', options);
    }

    // ==========================================================================
    // NAVIGATION SMOOTH SCROLL & SCROLLSPY
    // ==========================================================================
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');

    // Click handler for sidebar links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            
            // Check if it is normal ID scroll
            if (targetId && targetId.startsWith('#') && targetId.length > 1) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    // Smooth scroll to target
                    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    
                    // Update active state
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    });

    // ScrollSpy: highlight link based on scrolling position
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 150; // Offset for header/top spacing

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href === `#${currentSectionId}` || 
                    (currentSectionId === 'welcome' && href === '#welcome') || 
                    (currentSectionId === 'features-services' && href === '#features-services') ||
                    (currentSectionId === 'modules' && href === '#modules') ||
                    (currentSectionId === 'register' && href === '#register')) {
                    link.classList.add('active');
                }
            });
        }
    });

    // Mock Logout handler
    const logoutBtn = document.getElementById('nav-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showToast('Session Ended', 'You have successfully logged out of SubFlow dashboard.', 'info');
        });
    }

    // ==========================================================================
    // STATS COUNT-UP ANIMATION
    // ==========================================================================
    const statsData = [
        { id: 'stat-total-users', target: 1482, prefix: '', suffix: '' },
        { id: 'stat-active-users', target: 1240, prefix: '', suffix: '' },
        { id: 'stat-revenue', target: 14250, prefix: '$', suffix: '' },
        { id: 'stat-transactions', target: 384, prefix: '', suffix: '' },
        { id: 'stat-notifications', target: 7, prefix: '', suffix: '' },
        { id: 'stat-pending-tasks', target: 5, prefix: '', suffix: '' }
    ];

    function animateStats() {
        statsData.forEach(stat => {
            const el = document.getElementById(stat.id);
            if (!el) return;

            let start = 0;
            const end = stat.target;
            const duration = 1200; // ms
            const stepTime = Math.max(Math.floor(duration / end), 10);
            
            const timer = setInterval(() => {
                start += Math.ceil(end / 40); // Increment step
                if (start >= end) {
                    start = end;
                    clearInterval(timer);
                }
                
                // Format with commas if large
                const formattedNum = start.toLocaleString('en-US');
                el.textContent = `${stat.prefix}${formattedNum}${stat.suffix}`;
            }, stepTime);
        });
    }

    // Run stats animation on load
    animateStats();

    // ==========================================================================
    // FORM VALIDATION & INTERACTIVE ALERTS
    // ==========================================================================
    const registrationForm = document.getElementById('registrationForm');
    const resetBtn = document.getElementById('resetBtn');

    if (registrationForm) {
        registrationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isFormValid = true;
            
            // 1. Name validation
            const nameInput = document.getElementById('reg-name');
            if (nameInput.value.trim().length < 2) {
                showInputError(nameInput, true);
                isFormValid = false;
            } else {
                showInputError(nameInput, false);
            }

            // 2. Email validation
            const emailInput = document.getElementById('reg-email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                showInputError(emailInput, true);
                isFormValid = false;
            } else {
                showInputError(emailInput, false);
            }

            // 3. Phone validation
            const phoneInput = document.getElementById('reg-phone');
            if (phoneInput.value.trim().length < 8) {
                showInputError(phoneInput, true);
                isFormValid = false;
            } else {
                showInputError(phoneInput, false);
            }

            // 4. Password validation
            const passwordInput = document.getElementById('reg-password');
            if (passwordInput.value.length < 8) {
                showInputError(passwordInput, true);
                isFormValid = false;
            } else {
                showInputError(passwordInput, false);
            }

            // 5. Gender validation
            const genderSelect = document.getElementById('reg-gender');
            if (!genderSelect.value) {
                showInputError(genderSelect, true);
                isFormValid = false;
            } else {
                showInputError(genderSelect, false);
            }

            // 6. DOB validation
            const dobInput = document.getElementById('reg-dob');
            if (!dobInput.value) {
                showInputError(dobInput, true);
                isFormValid = false;
            } else {
                showInputError(dobInput, false);
            }

            // 7. Address validation
            const addressInput = document.getElementById('reg-address');
            if (addressInput.value.trim().length < 5) {
                showInputError(addressInput, true);
                isFormValid = false;
            } else {
                showInputError(addressInput, false);
            }

            // Processing submission
            if (isFormValid) {
                const managerName = nameInput.value.trim();
                showToast('Registration Successful', `Admin account created for ${managerName}!`, 'success');
                
                // Reset form
                registrationForm.reset();
                clearAllValidationStates();
            } else {
                showToast('Registration Failed', 'Please correct the highlighted form errors.', 'error');
            }
        });

        // Clear error states on input keypress/change
        const inputs = registrationForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                if (input.value.trim() !== '') {
                    showInputError(input, false);
                }
            });
            input.addEventListener('change', () => {
                if (input.value !== '') {
                    showInputError(input, false);
                }
            });
        });

        // Reset button behavior
        resetBtn.addEventListener('click', () => {
            clearAllValidationStates();
            showToast('Form Cleared', 'Registration inputs have been reset.', 'info');
        });
    }

    function showInputError(inputEl, isError) {
        const group = inputEl.closest('.form-group');
        if (isError) {
            group.classList.add('invalid');
        } else {
            group.classList.remove('invalid');
        }
    }

    function clearAllValidationStates() {
        const groups = registrationForm.querySelectorAll('.form-group');
        groups.forEach(group => group.classList.remove('invalid'));
    }

    // ==========================================================================
    // TOAST NOTIFICATION SYSTEM
    // ==========================================================================
    const toast = document.getElementById('toast');
    const toastTitle = document.getElementById('toastTitle');
    const toastMsg = document.getElementById('toastMsg');
    const toastIcon = document.getElementById('toastIcon');
    let toastTimeout;

    function showToast(title, message, type = 'success') {
        // Clear active timeout
        clearTimeout(toastTimeout);

        // Update content
        toastTitle.textContent = title;
        toastMsg.textContent = message;

        // Reset classes
        toast.className = 'toast';
        toast.classList.add(type);

        // Update icon based on type
        let iconMarkup = '<i class="ph ph-check-circle"></i>';
        if (type === 'error') iconMarkup = '<i class="ph ph-x-circle"></i>';
        if (type === 'info') iconMarkup = '<i class="ph ph-info"></i>';
        toastIcon.innerHTML = iconMarkup;

        // Present Toast
        toast.classList.remove('hidden');

        // Dismiss Toast after 4.5 seconds
        toastTimeout = setTimeout(() => {
            toast.classList.add('hidden');
        }, 4500);
    }
});
