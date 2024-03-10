document.querySelectorAll('[data-goto]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetElement = document.querySelector(this.getAttribute('data-goto'));
    
        if (targetElement) {
            window.scroll({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});
  

window.addEventListener('scroll', function() {
    let closestAnchor = null;
    let closestDistance = Infinity;
    
    document.querySelectorAll('[data-goto]').forEach(item => {
        const targetElement = document.querySelector(item.getAttribute('data-goto'));
        
        if (targetElement) {
            const targetOffset = targetElement.offsetTop + 150;
            const distance = Math.abs(window.scrollY - targetOffset);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestAnchor = item;
            }
        }
    });

    if (closestAnchor) {
        document.querySelectorAll('[data-goto]').forEach(item => {
            item.classList.remove('current_anchor');
        });
        
        closestAnchor.classList.add('current_anchor');
    }
});