document.addEventListener('DOMContentLoaded', () => {
    // Rating Widget Logic
    const starsContainer = document.getElementById('star-container');
    const avgRatingEl = document.getElementById('avg-rating');
    const voteCountEl = document.getElementById('vote-count');
    
    if (starsContainer) {
        // Create 5 stars interactively
        starsContainer.innerHTML = '';
        const stars = [];
        
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('span');
            star.innerHTML = '★';
            star.style.cursor = 'pointer';
            star.style.display = 'inline-block';
            star.style.color = i <= 4 ? '#ffd966' : '#ccc';
            star.dataset.value = i;
            
            // For the 5th star, we initially want it to look 0.6 full (since 4.6 rating)
            if (i === 5) {
                star.style.position = 'relative';
                star.innerHTML = `
                    <span style="color: #ccc;">★</span>
                    <span style="color: #ffd966; position: absolute; left: 0; width: 60%; overflow: hidden; pointer-events: none;">★</span>
                `;
            }
            
            starsContainer.appendChild(star);
            stars.push(star);
            
            // Hover effect
            star.addEventListener('mouseenter', () => {
                stars.forEach((s, index) => {
                    if (index < i) {
                        s.style.color = '#ffd966';
                        if (index === 4) s.innerHTML = '★'; // remove half-star styling
                    } else {
                        s.style.color = '#ccc';
                        if (index === 4) s.innerHTML = '★'; // remove half-star styling
                    }
                });
            });
        }
        
        // Return to default state
        starsContainer.addEventListener('mouseleave', () => {
            stars.forEach((s, index) => {
                if (index < 4) {
                    s.style.color = '#ffd966';
                    s.innerHTML = '★';
                } else {
                    s.style.position = 'relative';
                    s.innerHTML = `
                        <span style="color: #ccc;">★</span>
                        <span style="color: #ffd966; position: absolute; left: 0; width: 60%; overflow: hidden; pointer-events: none;">★</span>
                    `;
                }
            });
        });
        
        // Click effect (fake voting)
        stars.forEach((star, i) => {
            star.addEventListener('click', () => {
                const currentVotes = parseInt(voteCountEl.innerText.replace(/,/g, ''), 10);
                const currentAvg = parseFloat(avgRatingEl.innerText);
                const newValue = i + 1;
                
                // Calculate new average
                const newAvg = ((currentAvg * currentVotes) + newValue) / (currentVotes + 1);
                
                avgRatingEl.innerText = newAvg.toFixed(1);
                voteCountEl.innerText = (currentVotes + 1).toString();
                
                alert('Thank you for rating this post!');
            });
        });
    }
});
