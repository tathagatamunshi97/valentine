document.addEventListener('DOMContentLoaded', () => {
    const beginBtn = document.getElementById('begin-btn');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const page1 = document.getElementById('page-1');
    const page2 = document.getElementById('page-2');
    const finalScreen = document.getElementById('final-screen');
    const pleaseMsg = document.getElementById('please-msg');
    const deeperBtn = document.getElementById('dive-deeper-btn');
    const page3 = document.getElementById('page-3');
    const storyImg = document.getElementById('story-image');
    const storyCaption = document.getElementById('story-caption');
    const progressBar = document.querySelector('.story-progress-bar');
    const closeStory = document.getElementById('close-story');

    // Initialize Particles
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#ff69b4" },
                shape: { type: "heart" },
                opacity: { value: 0.5, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
                size: { value: 10, random: true, anim: { enable: true, speed: 40, size_min: 0.1, sync: false } },
                line_linked: { enable: false },
                move: { enable: true, speed: 2, direction: "top", random: true, straight: false, out_mode: "out", bounce: false }
            },
            interactivity: {
                detect_on: "canvas",
                events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
                modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
            },
            retina_detect: true
        });
    }

    const moments = [
        {
            image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=2070&auto=format&fit=crop",
            caption: "The day it all began... ❤️"
        },
        {
            image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=1974&auto=format&fit=crop",
            caption: "Every moment with you is a gift ✨"
        },
        {
            image: "https://images.unsplash.com/photo-1522673607200-1648832cee98?q=80&w=2074&auto=format&fit=crop",
            caption: "To many more laughs and adventures together!"
        },
        {
            image: "https://images.unsplash.com/photo-1516589174184-c685266d430c?q=80&w=1974&auto=format&fit=crop",
            caption: "You are already my valentine and I Love You !!!"
        }
    ];

    let currentMomentIndex = 0;
    let storyInterval;
    const momentDuration = 5000; // 5 seconds

    // Transitions from Landing to Question
    beginBtn.addEventListener('click', () => {
        page1.classList.remove('active');
        setTimeout(() => {
            page2.classList.add('active');
        }, 100);
    });

    // Refined No Button: NO DODGING.
    noBtn.addEventListener('click', () => {
        // 1. Shake the button
        noBtn.classList.add('shake');
        setTimeout(() => noBtn.classList.remove('shake'), 500);

        // 2. Emoji explosion logic with fallback
        try {
            if (typeof confetti.shapeFromText === 'function') {
                const scalar = 3;
                const angry = confetti.shapeFromText({ text: '😠', scalar });
                const broken = confetti.shapeFromText({ text: '💔', scalar });
                const cry = confetti.shapeFromText({ text: '😭', scalar });

                confetti({
                    shapes: [angry, broken, cry],
                    particleCount: 60,
                    spread: 100,
                    origin: { y: 0.6 },
                    colors: ['#ff0000', '#ff69b4', '#3498db']
                });
            } else {
                // Fallback to regular colorful confetti if shapeFromText is missing
                confetti({
                    particleCount: 80,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#ff0000', '#2c1a4d', '#3498db']
                });
            }
        } catch (e) {
            console.error("Confetti error:", e);
        }

        // 3. Show "Please" message (Force visibility)
        if (pleaseMsg) {
            pleaseMsg.style.opacity = '1';
            pleaseMsg.style.transform = 'translateY(0)';
            pleaseMsg.classList.add('visible');
        }
    });

    // Yes Button: Celebratory transition and reveal "Dive Deeper" button
    yesBtn.addEventListener('click', () => {
        page2.classList.remove('active');
        finalScreen.classList.add('active');

        // Show the deeper button after a short delay
        if (deeperBtn) {
            setTimeout(() => {
                deeperBtn.classList.remove('hidden');
                deeperBtn.style.display = 'inline-block';
                deeperBtn.style.opacity = '1';
            }, 1000);
        }

        // Full celebration confetti
        const duration = 15 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    });

    // Story Logic
    deeperBtn.addEventListener('click', () => {
        finalScreen.classList.remove('active');
        page3.classList.add('active');
        initStory();
    });

    function initStory() {
        currentMomentIndex = 0;
        showMoment(0);
    }

    function showMoment(index) {
        if (index >= moments.length) {
            // End of story - loop back to start or stay on last
            currentMomentIndex = 0;
        } else {
            currentMomentIndex = index;
        }

        const moment = moments[currentMomentIndex];

        // Fade effect
        storyImg.style.opacity = '0';
        setTimeout(() => {
            storyImg.src = moment.image;
            storyCaption.innerText = moment.caption;
            storyImg.style.opacity = '1';
        }, 300);
    }

    document.getElementById('story-next').addEventListener('click', () => {
        showMoment(currentMomentIndex + 1);
    });
});
