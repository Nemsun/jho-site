document.addEventListener('DOMContentLoaded', function() {
    
    let state = 'play';

    const playIconContainer = document.getElementById('play-button');
    const seekSliderContainer = document.querySelector('.seek-slider-container');
    const seekSlider = document.getElementById('seek-slider');

    const audio = document.querySelector('audio');
    audio.volume = 0.1;
    const durationContainer = document.getElementById('duration');
    const currentTimeContainer = document.getElementById('current-time');
    let raf = null;

    playIconContainer.addEventListener('click', () => {
        if (state === 'play') {
            audio.play();
            playIconContainer.innerHTML = '<svg id="play-icon" viewBox="0 0 67 67" xmlns="http://www.w3.org/2000/svg"><circle cx="33.5" cy="33.5" r="33.5"/><rect x="38" y="20" width="6" height="26" fill="#222222"/><rect x="23" y="20" width="6" height="26" fill="#222222"/></svg>';
            requestAnimationFrame(whilePlaying);
            state = 'pause';
        } else {
            audio.pause();
            playIconContainer.innerHTML = '<svg id="play-icon" viewBox="0 0 59 59" xmlns="http://www.w3.org/2000/svg"><circle cx="29.5" cy="29.5" r="29.5"/><path d="M22 41L41 29.5L22 18V41Z" fill="#222222"/></svg>';
            cancelAnimationFrame(raf);
            state = 'play';
        }
    });

    const showRangeProgress = (rangeInput) => {
        if (rangeInput === seekSlider) {
            seekSliderContainer.style.setProperty('--seek-before-width', rangeInput.value / rangeInput.max * 100 + '%');
        }
    }
    
    seekSlider.addEventListener('input', (e) => {
        showRangeProgress(e.target);
    });

    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${minutes}:${returnedSeconds}`;
    }

    const displayDuration = () => {
        durationContainer.textContent = calculateTime(audio.duration);
    }

    const setSliderMax = () => {
        seekSlider.max = Math.floor(audio.duration);
    }

    const whilePlaying = () => {
        seekSlider.value = Math.floor(audio.currentTime);
        currentTimeContainer.textContent = calculateTime(seekSlider.value);
        seekSliderContainer.style.setProperty('--seek-before-width', `${seekSlider.value / seekSlider.max * 100}%`);
        raf = requestAnimationFrame(whilePlaying);
    }
    
    if(audio.readyState > 0) {
        displayDuration();
        setSliderMax();
    } else {
        audio.addEventListener('loadedmetadata', () => {
            displayDuration();
            setSliderMax();
        });
    }

    seekSlider.addEventListener('input', () => {
        currentTimeContainer.textContent = calculateTime(seekSlider.value);
        if(!audio.paused) {
            cancelAnimationFrame(raf);
        }
    });

    seekSlider.addEventListener('change', () => {
        audio.currentTime = seekSlider.value;
        if(!audio.paused) {
            raf = requestAnimationFrame(whilePlaying);
        }
    });
});