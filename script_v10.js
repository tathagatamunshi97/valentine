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
    const storyNextBtn = document.getElementById('story-next');
    const collectGiftsBtn = document.getElementById('collect-gifts-btn');
    const page4 = document.getElementById('page-4');
    const giftTitle = document.getElementById('gift-title');
    const giftDirection = document.getElementById('gift-direction');
    const giftNextBtn = document.getElementById('gift-next-btn');

    const gifts = [
        {
            title: "Gift 1: Something sweet",
            direction: "Look where the hidden chocolate bar usually hides... or check the pantry shelf you reach for most!"
        },
        {
            title: "Gift 2: A taste of Switzerland",
            direction: "Brrr! This one is staying cool. Check near the snacks that need a little chill to stay perfect."
        },
        {
            title: "Gift 3: Somebody to love",
            direction: "The final piece of the puzzle isn't a thing, but a feeling. Look behind your favorite pillow or where you rest your head at night."
        }
    ];

    let currentGiftIndex = 0;

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

    // Transitions from Landing to Question
    beginBtn.addEventListener('click', () => {
        page1.classList.remove('active');
        setTimeout(() => {
            page2.classList.add('active');
        }, 100);
    });

    // Refined No Button
    noBtn.addEventListener('click', () => {
        noBtn.classList.add('shake');
        setTimeout(() => noBtn.classList.remove('shake'), 500);

        try {
            const scalar = 3;
            const shapes = [
                confetti.shapeFromText({ text: '😠', scalar }),
                confetti.shapeFromText({ text: '💔', scalar }),
                confetti.shapeFromText({ text: '😭', scalar })
            ];

            confetti({
                shapes: shapes,
                particleCount: 60,
                spread: 100,
                origin: { y: 0.6 },
                colors: ['#ff0000', '#ff69b4', '#3498db']
            });
        } catch (e) {
            confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#ff0000', '#2c1a4d', '#3498db']
            });
        }

        if (pleaseMsg) {
            pleaseMsg.style.opacity = '1';
            pleaseMsg.style.transform = 'translateY(0)';
            pleaseMsg.classList.add('visible');
        }
    });

    // Yes Button
    yesBtn.addEventListener('click', () => {
        page2.classList.remove('active');
        finalScreen.classList.add('active');

        if (deeperBtn) {
            setTimeout(() => {
                deeperBtn.classList.remove('hidden');
                deeperBtn.style.opacity = '1';
            }, 1000);
        }

        const duration = 15 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);

            const particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: Math.random() * 0.2 + 0.1, y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: Math.random() * 0.2 + 0.7, y: Math.random() - 0.2 } }));
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
            // End of memories - show Gift button
            storyNextBtn.classList.add('hidden');
            collectGiftsBtn.classList.remove('hidden');
            return;
        } else {
            currentMomentIndex = index;
            storyNextBtn.classList.remove('hidden');
            collectGiftsBtn.classList.add('hidden');
        }

        const moment = moments[currentMomentIndex];

        storyImg.style.opacity = '0';
        setTimeout(() => {
            storyImg.src = moment.image;
            storyCaption.innerText = moment.caption;
            storyImg.style.opacity = '1';
        }, 300);
    }

    storyNextBtn.addEventListener('click', () => {
        showMoment(currentMomentIndex + 1);
    });

    // Gift Hunt Logic
    collectGiftsBtn.addEventListener('click', () => {
        page3.classList.remove('active');
        page4.classList.add('active');
        showGift(0);
    });

    function showGift(index) {
        if (index >= gifts.length) {
            giftTitle.innerText = "All Gifts Collected! ❤️";
            giftDirection.innerText = "You've successfully completed the hunt. I hope these little surprises make your day as bright as you make mine!";
            giftNextBtn.innerText = "Start Over?";
            giftNextBtn.onclick = () => window.location.reload();

            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 }
            });
            return;
        }

        currentGiftIndex = index;
        const gift = gifts[index];

        const giftCard = document.querySelector('.gift-card');
        if (giftCard) {
            giftCard.style.opacity = '0';
            giftCard.style.transform = 'scale(0.9)';

            setTimeout(() => {
                giftTitle.innerText = gift.title;
                giftDirection.innerText = gift.direction;
                giftCard.style.opacity = '1';
                giftCard.style.transform = 'scale(1)';

                if (index >= 0) {
                    confetti({
                        particleCount: 40,
                        spread: 50,
                        origin: { y: 0.8 }
                    });
                }
            }, 300);
        }
    }

    giftNextBtn.addEventListener('click', () => {
        showGift(currentGiftIndex + 1);
    });
});
