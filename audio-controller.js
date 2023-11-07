document.addEventListener('DOMContentLoaded', function() {
    let state = 'play';

    const playIconContainer = document.getElementById('play-button');

    playIconContainer.addEventListener('click', () => {
        if (state === 'play') {
            playIconContainer.innerHTML = '<svg id="play-icon" viewBox="0 0 67 67" xmlns="http://www.w3.org/2000/svg"><circle cx="33.5" cy="33.5" r="33.5"/><rect x="38" y="20" width="6" height="26" fill="#222222"/><rect x="23" y="20" width="6" height="26" fill="#222222"/></svg>';
            state = 'pause';
        } else {
            playIconContainer.innerHTML = '<svg id="play-icon" viewBox="0 0 59 59" xmlns="http://www.w3.org/2000/svg"><circle cx="29.5" cy="29.5" r="29.5"/><path d="M22 41L41 29.5L22 18V41Z" fill="#222222"/></svg>';
            state = 'play';
        }
    });
});
