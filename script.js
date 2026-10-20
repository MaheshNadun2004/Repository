function initMatrixRain() {
    const canvas = document.getElementById('matrix-bg');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const chars = '01';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    for(let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    function drawMatrix() {
        ctx.fillStyle = 'rgba(10, 14, 23, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff88';
        ctx.font = `${fontSize}px monospace`;
        
        for(let i = 0; i < drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            
            ctx.fillText(char, x, y);
            
            if(y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            drops[i]++;
        }
    }
    setInterval(drawMatrix, 50);
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}
function handleScroll() {
    const header = document.getElementById('header');
    const backToTop = document.getElementById('backToTop');
    
    if(window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    if(window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> SENDING...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                formStatus.textContent = '✓ Message sent successfully! I\'ll respond within 24 hours.';
                formStatus.style.color = '#00ff88';
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                setTimeout(() => {
                    formStatus.textContent = '';
                }, 5000);
            }, 1500);
        });
    }
}
function animateSkillLevels() {
    const levelDots = document.querySelectorAll('.level-dot.active');
    levelDots.forEach((dot, index) => {
        setTimeout(() => {
            dot.style.transform = 'scale(1.2)';
            dot.style.boxShadow = '0 0 10px #00ff88';
            setTimeout(() => {
                dot.style.transform = 'scale(1)';
                dot.style.boxShadow = 'none';
            }, 300);
        }, index * 100);
    });
}
function observeSkillsSection() {
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillLevels();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        skillsObserver.observe(skillsSection);
    }
}
function terminalAnimation() {
    const commands = [
        '> scanning network...',
        '> vulnerability assessment in progress...',
        '> penetration testing initiated...',
        '> security protocols verified ✓'
    ];
    const terminalDiv = document.createElement('div');
    terminalDiv.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        background: rgba(5, 8, 17, 0.9);
        border: 1px solid #00d4ff;
        border-radius: 4px;
        padding: 15px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 12px;
        color: #00ff88;
        z-index: 1000;
        max-width: 300px;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
    `
    document.body.appendChild(terminalDiv);
    let currentCommand = 0;
    let currentChar = 0;
    function typeCommand() {
        if (currentCommand < commands.length) {
            if (currentChar === 0) {
                terminalDiv.style.opacity = '1';
                terminalDiv.style.transform = 'translateY(0)';
                terminalDiv.innerHTML = '';
            }
            if (currentChar < commands[currentCommand].length) {
                terminalDiv.innerHTML += commands[currentCommand].charAt(currentChar);
                currentChar++;
                setTimeout(typeCommand, 50);
            } else {
                currentCommand++;
                currentChar = 0;
                setTimeout(() => {
                    terminalDiv.style.opacity = '0';
                    terminalDiv.style.transform = 'translateY(20px)';
                    setTimeout(typeCommand, 1000);
                }, 1500);
            }
        } else {
            setTimeout(() => {
                terminalDiv.remove();
            }, 1000);
        }
    }
    setTimeout(typeCommand, 3000);
}
function updateCopyrightYear() {
    const copyrightElement = document.querySelector('.copyright p');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.innerHTML = copyrightElement.innerHTML.replace('2024', currentYear);
    }
}

function initScrambleText() {
    const container = document.getElementById("scramble-text");
    if (!container) return;
    
    const originalText = container.textContent;
    container.textContent = ""; 
    const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&";
    originalText.split("").forEach(() => {
        const span = document.createElement("span");
        span.textContent = "";
        container.appendChild(span);
    });
    const spans = container.querySelectorAll("span");
    let iterations = 0;
    const maxIterations = 15;
    function startScramble() {
        iterations = 0;
        const scrambleInterval = setInterval(() => {
            spans.forEach((span, index) => {
                if (iterations < maxIterations) {
                    span.textContent = scrambleChars.charAt(Math.floor(Math.random() * scrambleChars.length));
                    span.style.color = '#00ff88';
                } else {
                    span.textContent = originalText[index]; 
                    span.style.color = ''; 
                }
            });
            iterations++;
            if (iterations > maxIterations) {
                clearInterval(scrambleInterval);
                spans.forEach((span, index) => {
                    setTimeout(() => {
                        span.style.transform = 'scale(1.1)';
                        span.style.color = '#00d4ff';
                        setTimeout(() => {
                            span.style.transform = 'scale(1)';
                            span.style.color = '';
                        }, 150);
                    }, index * 30);
                });
            }
        }, 60);
    }
    setTimeout(startScramble, 500);
    container.addEventListener('mouseenter', () => {
        spans.forEach(span => {
            span.textContent = '';
        });
        startScramble();
    });
}
function initSectionTitleScramble() {
    const sectionTitles = document.querySelectorAll('.section-title[id]');
    
    sectionTitles.forEach(title => {
        const originalText = title.textContent;
        const titleId = title.id;
        title.setAttribute('data-original', originalText);
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    scrambleSectionTitle(element);
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(title);
    });
}
function scrambleSectionTitle(titleElement) {
    const originalText = titleElement.getAttribute('data-original') || titleElement.textContent;
    const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&";
    titleElement.textContent = "";
    
    originalText.split("").forEach(() => {
        const span = document.createElement("span");
        span.textContent = "";
        titleElement.appendChild(span);
    });
    const spans = titleElement.querySelectorAll("span");
    let iterations = 0;
    const maxIterations = 12;
    const scrambleInterval = setInterval(() => {
        spans.forEach((span, index) => {
            if (iterations < maxIterations) {
                span.textContent = scrambleChars.charAt(Math.floor(Math.random() * scrambleChars.length));
                span.style.color = '#00ff88';
            } else {
                span.textContent = originalText[index];
                span.style.color = '';
            }
        });
        iterations++;
        
        if (iterations > maxIterations) {
            clearInterval(scrambleInterval);
        }
    }, 50);
}
window.addEventListener('load', () => {
    initMatrixRain();
    updateCopyrightYear();
    setupContactForm();
    observeSkillsSection();
    terminalAnimation();
    initScrambleText();
    initSectionTitleScramble();
});
window.addEventListener('scroll', handleScroll);
// Mobile menu toggle
function setupMobileMenu() {
    const header = document.querySelector('.header');
    const navLinks = document.querySelector('.nav-links');
    
    // Create mobile menu button if it doesn't exist
    if (!document.querySelector('.mobile-menu-btn') && window.innerWidth <= 992) {
        const menuBtn = document.createElement('button');
        menuBtn.className = 'mobile-menu-btn';
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        menuBtn.style.cssText = `
            background: transparent;
            border: 1px solid var(--cyber-blue);
            color: var(--cyber-blue);
            width: 44px;
            height: 44px;
            border-radius: 4px;
            font-size: 1.2rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        `;
        
        document.querySelector('.nav-container').appendChild(menuBtn);
        
        menuBtn.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'rgba(10, 14, 23, 0.95)';
            navLinks.style.backdropFilter = 'blur(10px)';
            navLinks.style.padding = '1rem';
            navLinks.style.borderBottom = '1px solid rgba(0, 212, 255, 0.2)';
            navLinks.style.zIndex = '1000';
            
            menuBtn.innerHTML = navLinks.style.display === 'flex' ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }
}

// Call this in your load event
window.addEventListener('load', () => {
    // ... existing code ...
    setupMobileMenu();
});

// Handle resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 992) {
        const menuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        if (menuBtn) menuBtn.remove();
        if (navLinks) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = '';
            navLinks.style.position = '';
            navLinks.style.width = '';
            navLinks.style.background = '';
            navLinks.style.padding = '';
            navLinks.style.borderBottom = '';
        }
    }
});
// Scroll indicator for certificates
function setupCertScrollIndicator() {
    const certsWrapper = document.querySelector('.certs-wrapper');
    if (!certsWrapper) return;
    
    certsWrapper.addEventListener('scroll', function() {
        const scrollTop = this.scrollTop;
        const scrollHeight = this.scrollHeight;
        const clientHeight = this.clientHeight;
        
        // Check if scrolled to bottom
        if (scrollTop + clientHeight >= scrollHeight - 10) {
            this.classList.add('scrolled-bottom');
        } else {
            this.classList.remove('scrolled-bottom');
        }
    });
}

// Call this in your load event
window.addEventListener('load', () => {
    // ... existing code ...
    setupCertScrollIndicator();
});

/* ===== CERTIFICATES AUTO-SCROLL ===== */

document.addEventListener("DOMContentLoaded", () => {
    const wrapper = document.getElementById("certs-wrapper");
    const grid = document.getElementById("certs-grid");

    if (!wrapper || !grid || grid.children.length === 0) return;

    // Disable automatic movement if reduced motion is preferred
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    // Duplicate certificates for seamless continuous scrolling
    const originalCards = Array.from(grid.children);

    originalCards.forEach((card) => {
        const clone = card.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");

        // Prevent duplicated cards from receiving keyboard focus
        clone.querySelectorAll("a, button, input, [tabindex]").forEach((el) => {
            el.setAttribute("tabindex", "-1");
        });

        grid.appendChild(clone);
    });

    let paused = false;
    let animationFrame;
    let previousTime = 0;
    const speed = 35; // pixels per second

    function animate(time) {
        if (!previousTime) previousTime = time;

        const delta = Math.min((time - previousTime) / 1000, 0.05);
        previousTime = time;

        if (!paused) {
            wrapper.scrollLeft += speed * delta;

            // Return to the beginning without a visible jump
            const loopPoint = grid.scrollWidth / 2;

            if (loopPoint > 0 && wrapper.scrollLeft >= loopPoint) {
                wrapper.scrollLeft -= loopPoint;
            }
        }

        animationFrame = requestAnimationFrame(animate);
    }

    wrapper.addEventListener("mouseenter", () => {
        paused = true;
    });

    wrapper.addEventListener("mouseleave", () => {
        paused = false;
        previousTime = 0;
    });

    wrapper.addEventListener("focusin", () => {
        paused = true;
    });

    wrapper.addEventListener("focusout", () => {
        paused = false;
        previousTime = 0;
    });

    wrapper.addEventListener("touchstart", () => {
        paused = true;
    }, { passive: true });

    wrapper.addEventListener("touchend", () => {
        paused = false;
        previousTime = 0;
    }, { passive: true });

    // Pause auto-scroll while the user manually scrolls
    wrapper.addEventListener("wheel", () => {
        paused = true;
        clearTimeout(wrapper._scrollResumeTimer);

        wrapper._scrollResumeTimer = setTimeout(() => {
            paused = false;
            previousTime = 0;
        }, 1800);
    }, { passive: true });

    animationFrame = requestAnimationFrame(animate);

    // Clean up if the section is removed dynamically
    window.addEventListener("pagehide", () => {
        cancelAnimationFrame(animationFrame);
        clearTimeout(wrapper._scrollResumeTimer);
    }, { once: true });
});

document.querySelectorAll('#skills .thm-rooms, #skills .thm-badges')
    .forEach((slider) => {
        let isDragging = false;
        let startX = 0;
        let startScrollLeft = 0;
        let moved = false;
        let pauseAutoScroll = false;
        let animationFrame;

        const speed = 0.35;

        // Detect scroll direction
        const isBadges = slider.classList.contains('thm-badges');

        function autoScroll() {
            if (!isDragging && !pauseAutoScroll) {
                const maxScroll =
                    slider.scrollWidth - slider.clientWidth;

                if (maxScroll > 0) {
                    if (isBadges) {
                        // Earned Badges: right to left
                        slider.scrollLeft -= speed;

                        if (slider.scrollLeft <= 0) {
                            slider.scrollLeft = maxScroll;
                        }
                    } else {
                        // Completed Rooms: left to right
                        slider.scrollLeft += speed;

                        if (slider.scrollLeft >= maxScroll) {
                            slider.scrollLeft = 0;
                        }
                    }
                }
            }

            animationFrame = requestAnimationFrame(autoScroll);
        }

        slider.addEventListener('pointerdown', (event) => {
            if (event.pointerType === 'mouse' && event.button !== 0) return;

            isDragging = true;
            moved = false;
            startX = event.clientX;
            startScrollLeft = slider.scrollLeft;

            slider.classList.add('dragging');
        });

        slider.addEventListener('pointermove', (event) => {
            if (!isDragging) return;

            const distance = event.clientX - startX;

            if (Math.abs(distance) > 5) {
                moved = true;
            }

            if (moved) {
                slider.scrollLeft = startScrollLeft - distance;
            }
        });

        function stopDragging() {
            isDragging = false;
            slider.classList.remove('dragging');
        }

        slider.addEventListener('pointerup', stopDragging);
        slider.addEventListener('pointercancel', stopDragging);
        window.addEventListener('pointerup', stopDragging);

        // Pause auto-scroll while hovering
        slider.addEventListener('mouseenter', () => {
            pauseAutoScroll = true;
        });

        slider.addEventListener('mouseleave', () => {
            pauseAutoScroll = false;
            stopDragging();
        });

        // Prevent accidental badge link opening after dragging
        slider.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', (event) => {
                if (moved) {
                    event.preventDefault();
                    event.stopPropagation();
                }
            });
        });

        // Start auto-scroll
        animationFrame = requestAnimationFrame(autoScroll);
    });

/* ==================================
   PROJECT SLIDER - DRAG + AUTO SCROLL
================================== */

(() => {
    const slider = document.getElementById("projectsSlider");
    const track = document.getElementById("projectsTrack");

    if (!slider || !track) return;

    // Duplicate the cards for continuous automatic scrolling.
    const originalCards = Array.from(track.children);

    if (originalCards.length === 0) return;

    originalCards.forEach((card) => {
        const clone = card.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");

        // Avoid keyboard focus on duplicated links.
        clone.querySelectorAll("a").forEach((link) => {
            link.setAttribute("tabindex", "-1");
        });

        track.appendChild(clone);
    });

    let isDragging = false;
    let startX = 0;
    let startScrollLeft = 0;
    let isHovering = false;
    let isTouching = false;
    let animationFrame = null;
    let previousTime = 0;

    const speed = 35; // Pixels per second

    function getLoopWidth() {
        return track.scrollWidth / 2;
    }

    function normalizeScroll() {
        const loopWidth = getLoopWidth();

        if (loopWidth <= 0) return;

        if (slider.scrollLeft >= loopWidth) {
            slider.scrollLeft -= loopWidth;
        } else if (slider.scrollLeft < 0) {
            slider.scrollLeft += loopWidth;
        }
    }

    function animate(time) {
        if (!previousTime) previousTime = time;

        const delta = Math.min((time - previousTime) / 1000, 0.05);
        previousTime = time;

        if (!isDragging && !isHovering && !isTouching) {
            slider.scrollLeft += speed * delta;
            normalizeScroll();
        }

        animationFrame = requestAnimationFrame(animate);
    }

    // Pause auto-scroll when the mouse is over the projects.
    slider.addEventListener("mouseenter", () => {
        isHovering = true;
    });

    slider.addEventListener("mouseleave", () => {
        isHovering = false;
        isDragging = false;
        slider.classList.remove("is-dragging");
    });

    // Mouse drag.
    slider.addEventListener("mousedown", (event) => {
        if (event.button !== 0) return;
        if (event.target.closest("a, button")) return;

        isDragging = true;
        startX = event.clientX;
        startScrollLeft = slider.scrollLeft;
        slider.classList.add("is-dragging");
        event.preventDefault();
    });

    window.addEventListener("mousemove", (event) => {
        if (!isDragging) return;

        const distance = event.clientX - startX;
        slider.scrollLeft = startScrollLeft - distance;
        normalizeScroll();
    });

    window.addEventListener("mouseup", () => {
        isDragging = false;
        slider.classList.remove("is-dragging");
    });

    // Pause auto-scroll while touching on a phone.
    slider.addEventListener("touchstart", () => {
        isTouching = true;
    }, { passive: true });

    slider.addEventListener("touchend", () => {
        isTouching = false;
    }, { passive: true });

    slider.addEventListener("touchcancel", () => {
        isTouching = false;
    }, { passive: true });

    // Keep scrolling paused while the page is in another tab.
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
                animationFrame = null;
            }
            previousTime = 0;
        } else if (!animationFrame) {
            animationFrame = requestAnimationFrame(animate);
        }
    });

    animationFrame = requestAnimationFrame(animate);
})();
/* =========================================
   INFINITE PROJECT SLIDER
   Auto-scroll + Mouse Drag + Touch
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById("projectsSlider");
    const track = document.getElementById("projectsTrack");

    if (!slider || !track) return;

    // Duplicate cards for a seamless loop
    if (!track.dataset.loopReady) {
        track.innerHTML += track.innerHTML;
        track.dataset.loopReady = "true";
    }

    let position = 0;
    let speed = 0.6;
    let isDragging = false;
    let startX = 0;
    let startPosition = 0;
    let lastTime = 0;

    function animate(time) {
        if (!lastTime) lastTime = time;

        const delta = Math.min(time - lastTime, 40);
        lastTime = time;

        if (!isDragging && !window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches) {
            position += speed * delta / 16.67;

            const loopWidth = track.scrollWidth / 2;

            if (loopWidth > 0 && position >= loopWidth) {
                position -= loopWidth;
            }

            slider.scrollLeft = position;
        }

        requestAnimationFrame(animate);
    }

    // Mouse drag
    slider.addEventListener("mousedown", (event) => {
        if (event.button !== 0) return;

        isDragging = true;
        startX = event.clientX;
        startPosition = slider.scrollLeft;
        slider.style.cursor = "grabbing";
    });

    window.addEventListener("mousemove", (event) => {
        if (!isDragging) return;

        const distance = event.clientX - startX;
        slider.scrollLeft = startPosition - distance;
        position = slider.scrollLeft;
    });

    window.addEventListener("mouseup", () => {
        isDragging = false;
        slider.style.cursor = "grab";
        position = slider.scrollLeft;
    });

    // Touch support
    slider.addEventListener("touchstart", () => {
        position = slider.scrollLeft;
    }, { passive: true });

    slider.addEventListener("touchmove", () => {
        position = slider.scrollLeft;
    }, { passive: true });

    // Manual horizontal wheel scrolling
    slider.addEventListener("wheel", (event) => {
        if (Math.abs(event.deltaX) > 0 ||
            event.shiftKey) {
            event.preventDefault();

            const movement = event.shiftKey
                ? event.deltaY
                : event.deltaX;

            slider.scrollLeft += movement;
            position = slider.scrollLeft;
        }
    }, { passive: false });

    // Pause when hovering so links can be clicked comfortably
    slider.addEventListener("mouseenter", () => {
        speed = 0;
    });

    slider.addEventListener("mouseleave", () => {
        speed = 0.6;
        position = slider.scrollLeft;
    });

    requestAnimationFrame(animate);
});
