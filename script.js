const stories = document.querySelectorAll('.story');
const bars = document.querySelectorAll('.bar span');
const unmuteBtn = document.getElementById('unmute');

let current = 0;
let duration = 5000;
let timer = null;
let soundEnabled = false;

/* Enable sound */
unmuteBtn.addEventListener('click', () => {
    soundEnabled = true;
    unmuteBtn.style.display = 'none';

    const video = stories[current].querySelector('video');
    video.muted = false;
    video.play();
});

/* Show story */
function showStory(index) {
    stories.forEach((story, i) => {
        story.classList.remove('active');
        bars[i].style.width = '0%';

        const vid = story.querySelector('video');
        vid.pause();
        vid.currentTime = 0;
        vid.muted = !soundEnabled;
    });

    stories[index].classList.add('active');

    const video = stories[index].querySelector('video');
    video.muted = !soundEnabled;
    video.play();

    startProgress(index);
}

/* Progress */
function startProgress(index) {
    let width = 0;
    clearInterval(timer);

    timer = setInterval(() => {
        width++;
        bars[index].style.width = width + '%';

        if (width >= 100) {
            clearInterval(timer);
            nextStory();
        }
    }, duration / 100);
}

/* Navigation */
function nextStory() {
    current = (current + 1) % stories.length;
    showStory(current);
}

function prevStory() {
    current = (current - 1 + stories.length) % stories.length;
    showStory(current);
}

/* Swipe */
let startX = 0;

document.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
}, { passive: true });

document.addEventListener('touchend', e => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) nextStory();
    if (endX - startX > 50) prevStory();
}, { passive: true });

/* Tap left / right */
document.addEventListener('click', e => {
    if (!soundEnabled) return;

    if (e.clientX > window.innerWidth / 2) nextStory();
    else prevStory();
});

showStory(current);
