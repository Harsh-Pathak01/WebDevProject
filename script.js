document.addEventListener('DOMContentLoaded', function() {
    const welcomeHeading = document.querySelector('.welcome-heading');
    const trackerBtn = document.getElementById('tracker-btn');

    // Animate the welcome heading
    welcomeHeading.style.opacity = 0;
    welcomeHeading.style.transform = 'translateY(-20px)';
    welcomeHeading.style.transition = 'opacity 1s, transform 1s';
    setTimeout(() => {
        welcomeHeading.style.opacity = 1;
        welcomeHeading.style.transform = 'translateY(0)';
    }, 500);

    // Animate the button
    trackerBtn.style.opacity = 0;
    trackerBtn.style.transform = 'translateY(20px)';
    trackerBtn.style.transition = 'opacity 1s, transform 1s';
    setTimeout(() => {
        trackerBtn.style.opacity = 1;
        trackerBtn.style.transform = 'translateY(0)';
    }, 800);

    // Additional animation: pulsating effect on the button
    setInterval(() => {
        trackerBtn.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.3)';
        setTimeout(() => {
            trackerBtn.style.boxShadow = 'none';
        }, 500);
    }, 1500);
});

// Redirect to the IP tracker page when the button is clicked
document.getElementById('tracker-btn').addEventListener('click', function() {
    window.location.href = 'ip-finder.html';
});
