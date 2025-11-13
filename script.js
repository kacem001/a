// ===================================
// STATE MANAGEMENT
// ===================================
const state = {
    buttonsPressedCount: 0,
    pressedButtons: new Set(),
    musicPlaying: false,
    currentTheme: 'pink',
    isMobile: false
};

const loveMessages = [
    "Every moment with you is a treasure I hold close to my heart 💝",
    "You light up my world in ways words can never fully capture ✨",
    "Your smile is my favorite sight in the entire universe 🌟",
    "I fall in love with you more and more each day 💕",
    "You are my today and all of my tomorrows 💖",
    "With you, every day feels like a beautiful adventure 🎈",
    "You make my heart skip a beat every single time 💓",
    "Being with you feels like coming home 🏡💕"
];

const moods = [
    { greeting: "Good Morning!", emoji: "🌅" },
    { greeting: "Hello Beautiful!", emoji: "🌹" },
    { greeting: "Hi Sunshine!", emoji: "☀️" },
    { greeting: "Hey Gorgeous!", emoji: "✨" },
    { greeting: "Bonjour Mon Amour!", emoji: "💕" },
    { greeting: "Sweet Dreams!", emoji: "🌙" }
];

// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', function () {
    // Detect mobile
    state.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    initializeControls();
    initializeInteractiveButtons();
    initializeMoodChanger();
    startFloatingEmojis();

    // Show welcome message
    setTimeout(() => {
        showNotification('👆 Press ALL the buttons! 💕');
    }, 1500);
});

// ===================================
// CONTROL BUTTONS
// ===================================
function initializeControls() {
    // Music Toggle
    const musicToggle = document.getElementById('musicToggle');
    const backgroundMusic = document.getElementById('backgroundMusic');

    musicToggle.addEventListener('click', function () {
        if (state.musicPlaying) {
            backgroundMusic.pause();
            state.musicPlaying = false;
            musicToggle.classList.remove('active');
        } else {
            backgroundMusic.play()
                .then(() => {
                    state.musicPlaying = true;
                    musicToggle.classList.add('active');
                    showNotification('Music playing! 🎶');
                })
                .catch(() => {
                    showNotification('Tap again to play music 🎵');
                });
        }
    });

    backgroundMusic.volume = 0.25;

    // Color Theme Toggle
    const colorToggle = document.getElementById('colorToggle');
    const themes = ['pink', 'purple', 'blue', 'green', 'sunset'];
    let themeIndex = 0;

    colorToggle.addEventListener('click', function () {
        themeIndex = (themeIndex + 1) % themes.length;
        const newTheme = themes[themeIndex];

        document.body.classList.remove('theme-purple', 'theme-blue', 'theme-green', 'theme-sunset');

        if (newTheme !== 'pink') {
            document.body.classList.add(`theme-${newTheme}`);
        }

        state.currentTheme = newTheme;
        createColorExplosion();
        colorToggle.classList.add('active');

        setTimeout(() => {
            colorToggle.classList.remove('active');
        }, 300);
    });

    // Surprise Button
    const surpriseBtn = document.getElementById('surpriseBtn');
    surpriseBtn.addEventListener('click', function () {
        createMassiveConfetti();
        showNotification('💖 Surprise! You are AMAZING! 💖');
        surpriseBtn.classList.add('active');

        setTimeout(() => {
            surpriseBtn.classList.remove('active');
        }, 500);
    });
}

// ===================================
// INTERACTIVE BUTTONS
// ===================================
function initializeInteractiveButtons() {
    const buttons = document.querySelectorAll('.interactive-btn');
    const buttonCounter = document.getElementById('buttonCounter');
    const progressFill = document.getElementById('progressFill');
    const counterEmoji = document.getElementById('counterEmoji');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const action = this.dataset.action;

            // Mark button as pressed
            if (!state.pressedButtons.has(action)) {
                state.pressedButtons.add(action);
                state.buttonsPressedCount++;

                // Update counter
                buttonCounter.textContent = state.buttonsPressedCount;

                // Update progress bar
                const progress = (state.buttonsPressedCount / buttons.length) * 100;
                progressFill.style.width = progress + '%';

                // Change emoji based on progress
                if (state.buttonsPressedCount === 2) {
                    counterEmoji.textContent = '🎉';
                } else if (state.buttonsPressedCount === 4) {
                    counterEmoji.textContent = '🌟';
                } else if (state.buttonsPressedCount === 6) {
                    counterEmoji.textContent = '💖';
                } else if (state.buttonsPressedCount === 8) {
                    counterEmoji.textContent = '🏆';
                }

                // Check for achievements
                checkAchievements(state.buttonsPressedCount);
            }

            // Add pressed animation
            this.classList.add('pressed');
            setTimeout(() => {
                this.classList.remove('pressed');
            }, 600);

            // Execute action
            executeButtonAction(action);
        });
    });
}

// ===================================
// BUTTON ACTIONS
// ===================================
function executeButtonAction(action) {
    switch (action) {
        case 'hearts':
            createEmojiRain(['❤️', '💕', '💖', '💗', '💓']);
            showNotification('Sending you all my love! 💕');
            break;
        case 'stars':
            createEmojiRain(['⭐', '✨', '🌟', '💫', '⚡']);
            showNotification('You shine brighter than any star! ✨');
            break;
        case 'confetti':
            createEmojiRain(['🎊', '🎉', '🎈', '🎁', '🎀']);
            showNotification('Let\'s celebrate YOU! 🎉');
            break;
        case 'message':
            showSecretMessage();
            break;
        case 'flowers':
            createEmojiRain(['🌸', '🌺', '🌷', '🌹', '🌻']);
            showNotification('Fresh flowers for my flower! 🌸');
            break;
        case 'sunshine':
            createEmojiRain(['☀️', '🌤️', '⛅', '🌈', '🌞']);
            showNotification('You are my sunshine! ☀️');
            break;
        case 'kiss':
            createEmojiRain(['💋', '😘', '😍', '🥰', '💏']);
            showNotification('Sending you kisses! 💋');
            break;
        case 'sparkle':
            createEmojiRain(['✨', '💎', '👑', '🦋', '🎭']);
            showNotification('You sparkle like magic! ✨');
            break;
    }
}

// ===================================
// MOOD CHANGER
// ===================================
function initializeMoodChanger() {
    const changeMoodBtn = document.getElementById('changeMoodBtn');
    const greetingText = document.getElementById('greetingText');
    let moodIndex = 0;

    changeMoodBtn.addEventListener('click', function () {
        moodIndex = (moodIndex + 1) % moods.length;
        const mood = moods[moodIndex];

        greetingText.style.transform = 'scale(0.8)';
        greetingText.style.opacity = '0';

        setTimeout(() => {
            greetingText.textContent = mood.greeting + ' ' + mood.emoji;
            greetingText.style.transform = 'scale(1)';
            greetingText.style.opacity = '1';
        }, 300);

        createSmallExplosion(changeMoodBtn);
    });
}

// ===================================
// EMOJI RAIN EFFECT
// ===================================
function createEmojiRain(emojis) {
    const container = document.getElementById('floatingContainer');
    const count = state.isMobile ? 12 : 20;

    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');
            emoji.className = 'floating-emoji';
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.left = Math.random() * 100 + '%';
            emoji.style.fontSize = (1.5 + Math.random() * 1) + 'rem';

            container.appendChild(emoji);

            setTimeout(() => {
                emoji.remove();
            }, 8000);
        }, i * 100);
    }
}

// ===================================
// SECRET MESSAGE POPUP
// ===================================
function showSecretMessage() {
    const secretCard = document.getElementById('secretCard');
    const secretText = document.getElementById('secretText');
    const closeBtn = document.getElementById('closeSecret');

    const randomMessage = loveMessages[Math.floor(Math.random() * loveMessages.length)];
    secretText.textContent = randomMessage;

    secretCard.classList.add('show');

    closeBtn.onclick = function () {
        secretCard.classList.remove('show');
    };

    secretCard.onclick = function (e) {
        if (e.target === secretCard) {
            secretCard.classList.remove('show');
        }
    };
}

// ===================================
// ACHIEVEMENTS SYSTEM
// ===================================
function checkAchievements(count) {
    const achievement = document.getElementById('achievement');
    const achievementText = document.getElementById('achievementText');

    let message = '';

    if (count === 1) {
        message = 'First Click!';
    } else if (count === 3) {
        message = 'Getting Curious!';
    } else if (count === 5) {
        message = 'Halfway There!';
    } else if (count === 8) {
        message = 'Button Master!';
        showFinalMessage();
    }

    if (message) {
        achievementText.textContent = message;
        achievement.classList.add('show');

        setTimeout(() => {
            achievement.classList.remove('show');
        }, 3000);
    }
}

// ===================================
// FINAL MESSAGE REVEAL
// ===================================
function showFinalMessage() {
    const finalMessage = document.getElementById('finalMessage');

    setTimeout(() => {
        finalMessage.classList.add('show');
        createMassiveConfetti();

        finalMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 500);
}

// ===================================
// EXPLOSION EFFECTS
// ===================================
function createSmallExplosion(element) {
    const emojis = ['✨', '💫', '⭐', '🌟'];
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 8; i++) {
        const emoji = document.createElement('div');
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.position = 'fixed';
        emoji.style.left = centerX + 'px';
        emoji.style.top = centerY + 'px';
        emoji.style.fontSize = '1.5rem';
        emoji.style.pointerEvents = 'none';
        emoji.style.zIndex = '9999';
        emoji.style.transition = 'all 1s ease-out';

        document.body.appendChild(emoji);

        setTimeout(() => {
            const angle = (Math.PI * 2 * i) / 8;
            const distance = 80;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            emoji.style.transform = `translate(${x}px, ${y}px) scale(0)`;
            emoji.style.opacity = '0';
        }, 10);

        setTimeout(() => {
            emoji.remove();
        }, 1100);
    }
}

function createColorExplosion() {
    const emojis = ['🎨', '🌈', '💜', '💙', '💚', '💛', '🧡'];
    createScreenWideExplosion(emojis, 15);
}

function createMassiveConfetti() {
    const emojis = ['🎊', '🎉', '🎈', '✨', '🌟', '💖', '💕', '⭐'];
    createScreenWideExplosion(emojis, state.isMobile ? 20 : 30);
}

function createScreenWideExplosion(emojis, count) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.position = 'fixed';
            emoji.style.left = Math.random() * 100 + '%';
            emoji.style.top = '-50px';
            emoji.style.fontSize = (1.5 + Math.random()) + 'rem';
            emoji.style.pointerEvents = 'none';
            emoji.style.zIndex = '9999';
            emoji.style.transition = 'all 2s ease-out';

            document.body.appendChild(emoji);

            setTimeout(() => {
                emoji.style.top = '120vh';
                emoji.style.transform = `rotate(${Math.random() * 720}deg)`;
                emoji.style.opacity = '0';
            }, 10);

            setTimeout(() => {
                emoji.remove();
            }, 2100);
        }, i * 50);
    }
}

// ===================================
// FLOATING EMOJIS (CONTINUOUS)
// ===================================
function startFloatingEmojis() {
    const container = document.getElementById('floatingContainer');
    const emojis = ['❤️', '💕', '✨', '🌟'];

    setInterval(() => {
        if (Math.random() > 0.6) {
            const emoji = document.createElement('div');
            emoji.className = 'floating-emoji';
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.left = Math.random() * 100 + '%';
            emoji.style.fontSize = '1.5rem';

            container.appendChild(emoji);

            setTimeout(() => {
                emoji.remove();
            }, 8000);
        }
    }, 2000);
}

// ===================================
// NOTIFICATION SYSTEM
// ===================================
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(255, 182, 193, 0.95);
        color: white;
        padding: 15px 30px;
        border-radius: 50px;
        box-shadow: 0 4px 20px rgba(255, 182, 193, 0.5);
        z-index: 10000;
        font-family: Poppins, sans-serif;
        font-size: 0.95rem;
        font-weight: 500;
        max-width: 90%;
        text-align: center;
        animation: slideUp 0.5s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideDown 0.5s ease';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 2500);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from {
            bottom: -100px;
            opacity: 0;
        }
        to {
            bottom: 30px;
            opacity: 1;
        }
    }
    
    @keyframes slideDown {
        from {
            bottom: 30px;
            opacity: 1;
        }
        to {
            bottom: -100px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
