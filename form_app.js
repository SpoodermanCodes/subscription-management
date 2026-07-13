/* ==========================================================================
   SUBFLOW FORM PAGE – JAVASCRIPT
   Handles: Theme Toggle, Navigation, Form Validation, Toast, Scroll-to-Top
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ─── THEME TOGGLE ────────────────────────────────────────────────────────
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const html = document.documentElement;

    // Load saved theme preference
    const savedTheme = localStorage.getItem('subflow-theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('subflow-theme', next);
        updateThemeIcon(next);
    });

    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'dark' ? 'ph ph-sun' : 'ph ph-moon';
    }


    // ─── MOBILE HAMBURGER MENU ───────────────────────────────────────────────
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navLinks = document.getElementById('navLinks');

    hamburgerBtn.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });


    // ─── ACTIVE NAV LINK ON SCROLL ───────────────────────────────────────────
    const sections = document.querySelectorAll('.content-section');
    const allNavLinks = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 160;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        allNavLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.substring(1) === currentSection) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });


    // ─── SCROLL TO TOP BUTTON ────────────────────────────────────────────────
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.remove('hidden');
        } else {
            scrollTopBtn.classList.add('hidden');
        }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    // ─── TOAST NOTIFICATION SYSTEM ───────────────────────────────────────────
    const toast = document.getElementById('toast');
    const toastIcon = document.getElementById('toastIcon');
    const toastTitle = document.getElementById('toastTitle');
    const toastMsg = document.getElementById('toastMsg');
    let toastTimer = null;

    function showToast(type, title, message, duration = 4000) {
        // Remove old classes
        toast.classList.remove('success', 'error', 'info', 'hidden');

        // Set type
        toast.classList.add(type);

        // Set icon
        const icons = {
            success: 'ph ph-check-circle',
            error: 'ph ph-warning-circle',
            info: 'ph ph-info'
        };
        toastIcon.innerHTML = `<i class="${icons[type] || icons.info}"></i>`;

        // Set content
        toastTitle.textContent = title;
        toastMsg.textContent = message;

        // Animate in
        requestAnimationFrame(() => {
            toast.classList.add('visible');
        });

        // Auto-dismiss
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
            toast.classList.remove('visible');
            toast.classList.add('hidden');
        }, duration);
    }


    // ─── FORM VALIDATION ─────────────────────────────────────────────────────
    const form = document.getElementById('registrationForm');
    const cancelBtn = document.getElementById('cancelBtn');

    // Helper: set field state
    function setFieldState(group, state) {
        group.classList.remove('error', 'success');
        if (state) group.classList.add(state);
    }

    // Helper: find parent form-group
    function getFormGroup(el) {
        return el.closest('.form-group');
    }

    // Validate a single field
    function validateField(field) {
        const group = getFormGroup(field);
        if (!group) return true;

        // Text / email / tel / date / time / number / textarea
        if (field.tagName === 'INPUT' || field.tagName === 'TEXTAREA') {
            if (field.hasAttribute('required') && !field.value.trim()) {
                setFieldState(group, 'error');
                return false;
            }
            // Pattern check for tel
            if (field.type === 'tel' && field.value.trim()) {
                const pattern = new RegExp(field.getAttribute('pattern'));
                if (!pattern.test(field.value.trim())) {
                    setFieldState(group, 'error');
                    return false;
                }
            }
            // Email check
            if (field.type === 'email' && field.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value.trim())) {
                    setFieldState(group, 'error');
                    return false;
                }
            }
            // Number range check
            if (field.type === 'number' && field.value.trim()) {
                const val = parseInt(field.value);
                const min = parseInt(field.min) || 0;
                const max = parseInt(field.max) || 999;
                if (isNaN(val) || val < min || val > max) {
                    setFieldState(group, 'error');
                    return false;
                }
            }
            // Min length check
            if (field.hasAttribute('minlength') && field.value.trim()) {
                if (field.value.trim().length < parseInt(field.getAttribute('minlength'))) {
                    setFieldState(group, 'error');
                    return false;
                }
            }

            setFieldState(group, 'success');
            return true;
        }
        return true;
    }

    // Validate radio group
    function validateRadioGroup() {
        const genderGroup = document.getElementById('genderGroup');
        const group = getFormGroup(genderGroup);
        const checked = form.querySelector('input[name="gender"]:checked');
        if (!checked) {
            setFieldState(group, 'error');
            return false;
        }
        setFieldState(group, 'success');
        return true;
    }

    // Validate checkbox group
    function validateCheckboxGroup() {
        const skillsGroup = document.getElementById('skillsGroup');
        const group = getFormGroup(skillsGroup);
        const checked = form.querySelectorAll('input[name="skills"]:checked');
        if (checked.length === 0) {
            setFieldState(group, 'error');
            return false;
        }
        setFieldState(group, 'success');
        return true;
    }

    // Live validation on blur for text inputs
    const formInputs = form.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            const group = getFormGroup(input);
            if (group && group.classList.contains('error')) {
                validateField(input);
            }
        });
    });

    // Live validation for radios
    form.querySelectorAll('input[name="gender"]').forEach(radio => {
        radio.addEventListener('change', validateRadioGroup);
    });

    // Live validation for checkboxes
    form.querySelectorAll('input[name="skills"]').forEach(cb => {
        cb.addEventListener('change', () => {
            const skillsGroup = document.getElementById('skillsGroup');
            const group = getFormGroup(skillsGroup);
            if (group && group.classList.contains('error')) {
                validateCheckboxGroup();
            }
        });
    });

    // Submit handler
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Validate all text/email/tel/date/time/number/textarea fields
        formInputs.forEach(input => {
            if (!validateField(input)) isValid = false;
        });

        // Validate radio group
        if (!validateRadioGroup()) isValid = false;

        // Validate checkbox group
        if (!validateCheckboxGroup()) isValid = false;

        if (isValid) {
            showToast('success', 'Registration Submitted!', 'Your SubFlow administrator account has been created successfully.');

            // Simulate submission delay then reset
            setTimeout(() => {
                form.reset();
                // Clear contenteditable
                const editableArea = document.getElementById('editableComments');
                if (editableArea) editableArea.innerHTML = '';
                // Clear all validation states
                form.querySelectorAll('.form-group').forEach(g => {
                    g.classList.remove('error', 'success');
                });
            }, 1500);
        } else {
            showToast('error', 'Validation Error', 'Please fix the highlighted fields before submitting.');
            // Scroll to first error
            const firstError = form.querySelector('.form-group.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });

    // Reset handler
    form.addEventListener('reset', () => {
        // Delay to let the browser reset first
        setTimeout(() => {
            form.querySelectorAll('.form-group').forEach(g => {
                g.classList.remove('error', 'success');
            });
            const editableArea = document.getElementById('editableComments');
            if (editableArea) editableArea.innerHTML = '';
            showToast('info', 'Form Reset', 'All fields have been cleared.');
        }, 50);
    });

    // Cancel handler
    cancelBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to cancel? All entered data will be lost.')) {
            form.reset();
            form.querySelectorAll('.form-group').forEach(g => {
                g.classList.remove('error', 'success');
            });
            const editableArea = document.getElementById('editableComments');
            if (editableArea) editableArea.innerHTML = '';
            showToast('info', 'Cancelled', 'Registration has been cancelled.');
        }
    });


    // ─── HERO STAT COUNTER ANIMATION ─────────────────────────────────────────
    function animateValue(el, start, end, duration, prefix = '', suffix = '') {
        const startTime = performance.now();
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.floor(start + (end - start) * eased);
            el.textContent = prefix + value.toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }

    // Run counter animations on page load
    const stat1 = document.getElementById('heroStat1');
    const stat2 = document.getElementById('heroStat2');
    const stat3 = document.getElementById('heroStat3');

    if (stat1) animateValue(stat1, 0, 1482, 2000, '', '');
    if (stat2) animateValue(stat2, 0, 99, 1800, '', '.9%');
    if (stat3) animateValue(stat3, 0, 2, 1600, '$', '.4M');


    // ─── INTERSECTION OBSERVER FOR SECTION ANIMATIONS ────────────────────────
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.animationPlayState = 'paused';
        sectionObserver.observe(section);
    });

});
