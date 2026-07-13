document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // THEME TOGGLE LOGIC
    // ==========================================================================
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem('subflow-theme') || 'light';
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
    // TICKING DATE AND CLOCK BADGE (DYNAMIC TIME)
    // ==========================================================================
    const currentDateEl = document.getElementById('currentDate');
    if (currentDateEl) {
        const updateClock = () => {
            const now = new Date();
            const dateOptions = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
            const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
            const dateStr = now.toLocaleDateString('en-US', dateOptions);
            const timeStr = now.toLocaleTimeString('en-US', timeOptions);
            currentDateEl.innerHTML = `<i class="ph ph-calendar"></i> ${dateStr} &nbsp;&bull;&nbsp; <i class="ph ph-clock"></i> ${timeStr}`;
        };
        updateClock();
        setInterval(updateClock, 1000);
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
        const scrollPosition = window.scrollY + 180; // Offset for header/top spacing

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
                if (href === `#${currentSectionId}`) {
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
    // STATS COUNT-UP ANIMATION & PROGRESS BAR
    // ==========================================================================
    const statsData = [
        { id: 'stat-total-users', target: 1482, prefix: '', suffix: '' },
        { id: 'stat-active-users', target: 1240, prefix: '', suffix: '' },
        { id: 'stat-revenue', target: 14250, prefix: '$', suffix: '' },
        { id: 'stat-transactions', target: 384, prefix: '', suffix: '' },
        { id: 'stat-notifications', target: 3, prefix: '', suffix: '' },
        { id: 'stat-pending-tasks', target: 5, prefix: '', suffix: '' },
        { id: 'stat-audit-score', target: 85, prefix: '', suffix: '%' }
    ];

    function animateStats() {
        statsData.forEach(stat => {
            const el = document.getElementById(stat.id);
            if (!el) return;

            let start = 0;
            const end = stat.target;
            const duration = 1200; // ms
            const stepTime = Math.max(Math.floor(duration / end), 12);
            
            // Reset and animate progress bar
            const isAudit = stat.id === 'stat-audit-score';
            const progressBar = document.getElementById('auditProgressBar');
            if (isAudit && progressBar) {
                progressBar.style.width = '0%';
            }

            const timer = setInterval(() => {
                start += Math.ceil(end / 30); // Increment step
                if (start >= end) {
                    start = end;
                    clearInterval(timer);
                    if (isAudit && progressBar) {
                        progressBar.style.width = `${end}%`;
                    }
                }
                
                const formattedNum = start.toLocaleString('en-US');
                el.textContent = `${stat.prefix}${formattedNum}${stat.suffix}`;
            }, stepTime);
        });
    }

    // Run stats animation on load
    animateStats();

    // Stats Dynamic Synchronize (Triggered by Sync Stats action button)
    const syncStatsBtn = document.getElementById('syncStatsBtn');
    if (syncStatsBtn) {
        syncStatsBtn.addEventListener('click', () => {
            const icon = syncStatsBtn.querySelector('i');
            if (icon) {
                icon.style.transform = 'rotate(360deg)';
                icon.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            }
            
            // Randomly increment dashboard statistics dynamically
            statsData[0].target = 1480 + Math.floor(Math.random() * 20); // total users
            statsData[1].target = 1230 + Math.floor(Math.random() * 20); // active users
            statsData[2].target = 14200 + Math.floor(Math.random() * 400); // revenue
            statsData[3].target = 380 + Math.floor(Math.random() * 15); // transactions
            statsData[6].target = 80 + Math.floor(Math.random() * 16); // audit score
            
            animateStats();
            showToast('Sync Complete', 'Dashboard statistics synchronized successfully.', 'success');
            
            setTimeout(() => {
                if (icon) {
                    icon.style.transform = 'none';
                    icon.style.transition = 'none';
                }
            }, 800);
        });
    }

    // ==========================================================================
    // IMAGE/BANNER CAROUSEL SLIDER
    // ==========================================================================
    const sliderWrapper = document.getElementById('sliderWrapper');
    const slides = document.querySelectorAll('.slide');
    const prevSlide = document.getElementById('prevSlide');
    const nextSlide = document.getElementById('nextSlide');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let sliderInterval;

    function showSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        
        currentSlide = index;
        
        if (sliderWrapper) {
            sliderWrapper.style.transform = `translateX(-${currentSlide * 33.333}%)`;
        }
        
        slides.forEach((slide, i) => {
            if (i === currentSlide) slide.classList.add('active');
            else slide.classList.remove('active');
        });
        
        indicators.forEach((indicator, i) => {
            if (i === currentSlide) indicator.classList.add('active');
            else indicator.classList.remove('active');
        });
    }

    function startSliderAutoPlay() {
        clearInterval(sliderInterval);
        sliderInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    }

    if (prevSlide && nextSlide) {
        prevSlide.addEventListener('click', () => {
            showSlide(currentSlide - 1);
            startSliderAutoPlay();
        });
        
        nextSlide.addEventListener('click', () => {
            showSlide(currentSlide + 1);
            startSliderAutoPlay();
        });
        
        indicators.forEach((indicator) => {
            indicator.addEventListener('click', () => {
                const idx = parseInt(indicator.getAttribute('data-index'));
                showSlide(idx);
                startSliderAutoPlay();
            });
        });
        
        startSliderAutoPlay();
    }

    // ==========================================================================
    // NOTIFICATION DROPDOWN PANEL
    // ==========================================================================
    const bellBtn = document.getElementById('bellBtn');
    const notificationDropdown = document.getElementById('notificationDropdown');
    const closeNotificationDropdown = document.getElementById('closeNotificationDropdown');
    const notiStatCard = document.getElementById('notiStatCard');
    const clearNotifications = document.getElementById('clearNotifications');
    const notificationList = document.getElementById('notificationList');
    const bellBadge = document.getElementById('bellBadge');
    const statNotifications = document.getElementById('stat-notifications');

    function toggleNotificationDropdown(e) {
        if (e) e.stopPropagation();
        if (notificationDropdown) {
            notificationDropdown.classList.toggle('hidden');
        }
    }

    if (bellBtn) {
        bellBtn.addEventListener('click', toggleNotificationDropdown);
    }
    
    if (notiStatCard) {
        notiStatCard.addEventListener('click', toggleNotificationDropdown);
    }

    if (closeNotificationDropdown) {
        closeNotificationDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
            if (notificationDropdown) {
                notificationDropdown.classList.add('hidden');
            }
        });
    }

    // Hide dropdown on click outside
    document.addEventListener('click', (e) => {
        if (notificationDropdown && !notificationDropdown.classList.contains('hidden')) {
            if (!notificationDropdown.contains(e.target) && !bellBtn.contains(e.target) && (!notiStatCard || !notiStatCard.contains(e.target))) {
                notificationDropdown.classList.add('hidden');
            }
        }
    });

    // Mark single notification as read
    if (notificationList) {
        notificationList.addEventListener('click', (e) => {
            const readBtn = e.target.closest('.noti-read-btn');
            if (!readBtn) return;
            e.stopPropagation();

            const item = readBtn.closest('.notification-item');
            if (item && item.classList.contains('unread')) {
                item.classList.remove('unread');
                readBtn.style.opacity = '0.2';
                readBtn.disabled = true;

                // Update badge and stat count
                let count = parseInt(bellBadge.textContent) || 0;
                if (count > 0) {
                    count--;
                    bellBadge.textContent = count;
                    if (statNotifications) statNotifications.textContent = count;
                    
                    if (count === 0) {
                        bellBadge.style.display = 'none';
                        const notiFooterText = notiStatCard ? notiStatCard.querySelector('.trend-label') : null;
                        if (notiFooterText) notiFooterText.textContent = 'All notifications cleared';
                    }
                }
                showToast('Notification Read', 'Marked notification as read.', 'info');
            }
        });
    }

    // Clear all notifications
    if (clearNotifications) {
        clearNotifications.addEventListener('click', (e) => {
            e.stopPropagation();
            if (notificationList) {
                notificationList.innerHTML = `
                    <div class="empty-notifications" style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.75rem;">
                        <i class="ph ph-bell-slash" style="font-size: 1.5rem; margin-bottom: 0.4rem; display: block; color: var(--text-muted);"></i>
                        No new notifications
                    </div>
                `;
            }
            if (bellBadge) {
                bellBadge.textContent = '0';
                bellBadge.style.display = 'none';
            }
            if (statNotifications) {
                statNotifications.textContent = '0';
            }
            const notiFooter = notiStatCard ? notiStatCard.querySelector('.stat-footer') : null;
            if (notiFooter) {
                notiFooter.innerHTML = `<span class="trend-info"><i class="ph ph-check"></i> Clean</span><span class="trend-label">No alerts pending</span>`;
            }
            showToast('Cleared All', 'All notifications cleared.', 'info');
        });
    }

    // ==========================================================================
    // TAGLINE TYPEWRITER EFFECT
    // ==========================================================================
    const typingTarget = document.getElementById('typing-effect');
    if (typingTarget) {
        const phrases = [
            'analyzing active SaaS license seats...',
            'reconciling global billing transactions...',
            'auditing and reducing software waste.',
            'alerting upcoming renewal deadlines.'
        ];
        let phraseIdx = 0;
        let charIdx = 0;
        let isDeleting = false;
        let typingSpeed = 70;

        function type() {
            const currentPhrase = phrases[phraseIdx];
            
            if (isDeleting) {
                typingTarget.textContent = currentPhrase.substring(0, charIdx - 1);
                charIdx--;
                typingSpeed = 35;
            } else {
                typingTarget.textContent = currentPhrase.substring(0, charIdx + 1);
                charIdx++;
                typingSpeed = 70;
            }

            if (!isDeleting && charIdx === currentPhrase.length) {
                isDeleting = true;
                typingSpeed = 2200; // Pause at the end
            } else if (isDeleting && charIdx === 0) {
                isDeleting = false;
                phraseIdx = (phraseIdx + 1) % phrases.length;
                typingSpeed = 400; // Pause before typing next
            }

            setTimeout(type, typingSpeed);
        }
        
        setTimeout(type, 800);
    }

    // ==========================================================================
    // FLOATING SCROLL TO TOP BUTTON
    // ==========================================================================
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.remove('hidden');
            } else {
                scrollTopBtn.classList.add('hidden');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

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
            const phoneRegex = /^\+?[0-9\s\-()]{8,20}$/;
            if (!phoneRegex.test(phoneInput.value.trim())) {
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
        if (group) {
            if (isError) {
                group.classList.add('invalid');
            } else {
                group.classList.remove('invalid');
            }
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
        clearTimeout(toastTimeout);

        toastTitle.textContent = title;
        toastMsg.textContent = message;

        toast.className = 'toast';
        toast.classList.add(type);

        let iconMarkup = '<i class="ph ph-check-circle"></i>';
        if (type === 'error') iconMarkup = '<i class="ph ph-x-circle"></i>';
        if (type === 'info') iconMarkup = '<i class="ph ph-info"></i>';
        toastIcon.innerHTML = iconMarkup;

        toast.classList.remove('hidden');

        toastTimeout = setTimeout(() => {
            toast.classList.add('hidden');
        }, 4500);
    }


    // ==========================================================================
    // ASSIGNMENT 4: DRAG AND DROP FUNCTIONALITY
    // Uses HTML5 Drag and Drop API: dragstart, dragover, drop events
    // Subscription bill cards with live running total in the review queue
    // ==========================================================================

    const dndSourceGrid = document.getElementById('dndSourceGrid');
    const dndDropZone   = document.getElementById('dndDropZone');
    const dndPlaceholder = document.getElementById('dndPlaceholder');
    const dndResetBtn   = document.getElementById('dndResetBtn');
    const sourceCount   = document.getElementById('sourceCount');
    const queueCount    = document.getElementById('queueCount');
    const summaryCount  = document.getElementById('summaryCount');
    const summaryTotal  = document.getElementById('summaryTotal');
    const summaryAnnual = document.getElementById('summaryAnnual');

    if (dndSourceGrid && dndDropZone) {
        let draggedItem = null;

        // Store original HTML for reset
        const originalSourceHTML = dndSourceGrid.innerHTML;

        // Update the running total summary from all cards currently in the drop zone
        function updateSummary() {
            const droppedCards = dndDropZone.querySelectorAll('.dnd-bill-card');
            const count = droppedCards.length;
            let total = 0;
            droppedCards.forEach(card => {
                total += parseFloat(card.dataset.amount) || 0;
            });
            if (summaryCount)  summaryCount.textContent  = count;
            if (summaryTotal)  summaryTotal.textContent  = `$${total.toFixed(2)}`;
            if (summaryAnnual) summaryAnnual.textContent = `$${(total * 12).toFixed(2)}`;
            if (queueCount)    queueCount.textContent    = count;
            if (sourceCount)   sourceCount.textContent   = dndSourceGrid.querySelectorAll('.dnd-bill-card').length;

            // Show/hide placeholder
            if (dndPlaceholder) {
                dndPlaceholder.classList.toggle('hidden', count > 0);
            }
        }

        // REQUIREMENT 7: dragstart event
        dndSourceGrid.addEventListener('dragstart', (e) => {
            const item = e.target.closest('.dnd-bill-card');
            if (!item) return;
            draggedItem = item;
            item.classList.add('dragging');
            e.dataTransfer.setData('text/plain', item.dataset.id);
            e.dataTransfer.effectAllowed = 'move';
        });

        dndSourceGrid.addEventListener('dragend', (e) => {
            const item = e.target.closest('.dnd-bill-card');
            if (item) item.classList.remove('dragging');
        });

        // REQUIREMENT 7: dragover event (must preventDefault to allow drop)
        dndDropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            dndDropZone.classList.add('drag-over');
        });

        dndDropZone.addEventListener('dragleave', (e) => {
            if (!dndDropZone.contains(e.relatedTarget)) {
                dndDropZone.classList.remove('drag-over');
            }
        });

        // REQUIREMENT 7: drop event
        dndDropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dndDropZone.classList.remove('drag-over');

            if (draggedItem) {
                // Clone into drop zone (compact queued style)
                const clone = draggedItem.cloneNode(true);
                clone.removeAttribute('draggable');
                clone.classList.remove('dragging');
                clone.classList.add('queued');

                // Remove original from source
                draggedItem.remove();

                dndDropZone.appendChild(clone);
                updateSummary();

                const name   = clone.dataset.name   || clone.querySelector('.bill-name')?.textContent || 'Item';
                const amount = parseFloat(clone.dataset.amount || 0).toFixed(2);
                showToast('Added to Queue', `${name} ($${amount}/mo) added to review queue.`, 'success');
                draggedItem = null;
            }
        });

        // Reset button – restore all items back to source
        if (dndResetBtn) {
            dndResetBtn.addEventListener('click', () => {
                dndSourceGrid.innerHTML = originalSourceHTML;
                dndDropZone.querySelectorAll('.dnd-bill-card').forEach(item => item.remove());
                updateSummary();
                showToast('Reset', 'All bills restored to the active subscriptions list.', 'info');
            });
        }

        // Initial summary state
        updateSummary();
    }


    // ==========================================================================
    // ASSIGNMENT 4: WEB STORAGE FUNCTIONALITY
    // REQUIREMENT 8: localStorage, REQUIREMENT 9: sessionStorage,
    // REQUIREMENT 10: Retrieve data, REQUIREMENT 11: Clear data
    // ==========================================================================

    const storageKeyInput = document.getElementById('storageKey');
    const storageValueInput = document.getElementById('storageValue');
    const saveLocalBtn = document.getElementById('saveLocalBtn');
    const saveSessionBtn = document.getElementById('saveSessionBtn');
    const retrieveDataBtn = document.getElementById('retrieveDataBtn');
    const clearLocalBtn = document.getElementById('clearLocalBtn');
    const clearSessionBtn = document.getElementById('clearSessionBtn');
    const storageDisplay = document.getElementById('storageDisplay');
    const localStorageBody = document.getElementById('localStorageBody');
    const sessionStorageBody = document.getElementById('sessionStorageBody');

    if (saveLocalBtn && saveSessionBtn) {

        // Helper: validate key/value inputs
        function validateStorageInputs() {
            const key = storageKeyInput.value.trim();
            const value = storageValueInput.value.trim();
            if (!key || !value) {
                showToast('Missing Data', 'Please enter both a key and a value.', 'error');
                return null;
            }
            return { key, value };
        }

        // REQUIREMENT 8: Save to localStorage
        saveLocalBtn.addEventListener('click', () => {
            const data = validateStorageInputs();
            if (!data) return;
            localStorage.setItem(data.key, data.value);
            showToast('Saved to Local Storage', `Key "${data.key}" saved permanently.`, 'success');
            storageKeyInput.value = '';
            storageValueInput.value = '';
            if (!storageDisplay.classList.contains('hidden')) {
                renderStorageData();
            }
        });

        // REQUIREMENT 9: Save to sessionStorage
        saveSessionBtn.addEventListener('click', () => {
            const data = validateStorageInputs();
            if (!data) return;
            sessionStorage.setItem(data.key, data.value);
            showToast('Saved to Session Storage', `Key "${data.key}" saved for this session.`, 'info');
            storageKeyInput.value = '';
            storageValueInput.value = '';
            if (!storageDisplay.classList.contains('hidden')) {
                renderStorageData();
            }
        });

        // REQUIREMENT 10: Retrieve and display stored data
        retrieveDataBtn.addEventListener('click', () => {
            storageDisplay.classList.remove('hidden');
            renderStorageData();
            showToast('Data Retrieved', 'Displaying all stored data below.', 'info');
        });

        // REQUIREMENT 11: Clear localStorage
        clearLocalBtn.addEventListener('click', () => {
            if (confirm('Clear all data from Local Storage?')) {
                // Only clear user-created keys (preserve theme preference)
                const themeVal = localStorage.getItem('subflow-theme');
                localStorage.clear();
                if (themeVal) localStorage.setItem('subflow-theme', themeVal);
                showToast('Local Storage Cleared', 'All local storage data has been removed.', 'info');
                if (!storageDisplay.classList.contains('hidden')) {
                    renderStorageData();
                }
            }
        });

        // REQUIREMENT 11: Clear sessionStorage
        clearSessionBtn.addEventListener('click', () => {
            if (confirm('Clear all data from Session Storage?')) {
                sessionStorage.clear();
                showToast('Session Storage Cleared', 'All session storage data has been removed.', 'info');
                if (!storageDisplay.classList.contains('hidden')) {
                    renderStorageData();
                }
            }
        });

        // Render all stored data into tables
        function renderStorageData() {
            // Render localStorage
            renderTable(localStorage, localStorageBody, 'local');
            // Render sessionStorage
            renderTable(sessionStorage, sessionStorageBody, 'session');
        }

        function renderTable(storage, tbody, type) {
            tbody.innerHTML = '';
            const keys = [];
            for (let i = 0; i < storage.length; i++) {
                const key = storage.key(i);
                // Skip the theme preference key for cleaner display
                if (type === 'local' && key === 'subflow-theme') continue;
                keys.push(key);
            }

            if (keys.length === 0) {
                tbody.innerHTML = '<tr><td colspan="3" class="empty-row">No data stored</td></tr>';
                return;
            }

            keys.forEach(key => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><span class="badge-mono">${escapeHTML(key)}</span></td>
                    <td>${escapeHTML(storage.getItem(key))}</td>
                    <td><button class="delete-key-btn" data-type="${type}" data-key="${escapeHTML(key)}"><i class="ph ph-trash"></i> Delete</button></td>
                `;
                tbody.appendChild(tr);
            });

            // Attach delete handlers
            tbody.querySelectorAll('.delete-key-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const keyToDelete = btn.dataset.key;
                    const storageType = btn.dataset.type;
                    if (storageType === 'local') {
                        localStorage.removeItem(keyToDelete);
                    } else {
                        sessionStorage.removeItem(keyToDelete);
                    }
                    showToast('Deleted', `Key "${keyToDelete}" removed.`, 'info');
                    renderStorageData();
                });
            });
        }

        function escapeHTML(str) {
            const div = document.createElement('div');
            div.textContent = str;
            return div.innerHTML;
        }
    }

});
