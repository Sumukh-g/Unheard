document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const sectionDelay = 250; // Delay between each section's animation (in milliseconds)
    const totalSections = sections.length;
    const loadingDuration = sectionDelay * totalSections; // Total duration for the entire animation

    sections.forEach((section, index) => {
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, sectionDelay * index); // Stagger the animation for each section
    });

    // Optional: Hide the loading screen after the animation is complete
    setTimeout(() => {
        document.querySelector('.loading-container').style.display = 'none';
    }, loadingDuration + 500); // 500ms hold time after the last section is in place
});
