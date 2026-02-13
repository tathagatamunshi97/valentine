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

    // Refined No Button: No dodge, just shake and explode
    noBtn.addEventListener('click', () => {
        // Shake logic
        noBtn.classList.add('shake');
        setTimeout(() => noBtn.classList.remove('shake'), 500);

        // Emoji explosion (Angry, Heartbroken, Crying)
        const scalar = 3;
        const angry = confetti.shapeFromText({ text: '😠', scalar });
        const broken = confetti.shapeFromText({ text: '💔', scalar });
        const cry = confetti.shapeFromText({ text: '😭', scalar });

        confetti({
            shapes: [angry, broken, cry],
            particleCount: 50,
            spread: 90,
            origin: { y: 0.6 },
            colors: ['#ff0000', '#ff69b4', '#3498db']
        });

        // Show "Please" message
        if (pleaseMsg) {
            pleaseMsg.classList.add('visible');
        }
    });

    // Yes Button: Celebratory transition and deeper button
    yesBtn.addEventListener('click', () => {
        page2.classList.remove('active');
        finalScreen.classList.add('active');

        // Show the deeper button after a short delay
        if (deeperBtn) {
            setTimeout(() => {
                deeperBtn.classList.remove('hidden');
                deeperBtn.classList.add('active');
            }, 1500);
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
