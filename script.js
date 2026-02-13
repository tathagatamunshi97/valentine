document.addEventListener('DOMContentLoaded', () => {
    const beginBtn = document.getElementById('begin-btn');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const page1 = document.getElementById('page-1');
    const page2 = document.getElementById('page-2');
    const finalScreen = document.getElementById('final-screen');

    // Transitions
    beginBtn.addEventListener('click', () => {
        page1.classList.remove('active');
        setTimeout(() => {
            page2.classList.add('active');
        }, 100);
    });

    // Playful No Button
    noBtn.addEventListener('mouseover', () => {
        const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
        const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);

        noBtn.style.position = 'fixed';
        noBtn.style.left = `${x}px`;
        noBtn.style.top = `${y}px`;
    });

    noBtn.addEventListener('click', () => {
        // Angry/Heartbroken burst
        const scalar = 2;
        const angry = confetti.shapeFromText({ text: '😠', scalar });
        const broken = confetti.shapeFromText({ text: '💔', scalar });

        confetti({
            shapes: [angry, broken],
            particleCount: 30,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff0000', '#ff69b4']
        });
    });

    // Yes Button Celebration
    yesBtn.addEventListener('click', () => {
        page2.classList.remove('active');
        finalScreen.classList.add('active');

        // Confetti effect
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
            // since particles fall down, start a bit higher than random
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    });
});
