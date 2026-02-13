document.addEventListener('DOMContentLoaded', () => {
    const beginBtn = document.getElementById('begin-btn');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const page1 = document.getElementById('page-1');
    const page2 = document.getElementById('page-2');
    const finalScreen = document.getElementById('final-screen');
    const pleaseMsg = document.getElementById('please-msg');
    const deeperBtn = document.getElementById('dive-deeper-btn');

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
});
