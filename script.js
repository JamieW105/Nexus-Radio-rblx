// JavaScript for Nexus Radio Website

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Download button click tracking
document.querySelector('.download-btn').addEventListener('click', function() {
    console.log('Download button clicked');
    // Add analytics or tracking here if needed
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(31, 31, 31, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = '#1f1f1f';
        navbar.style.backdropFilter = 'none';
    }
});

// Mobile menu toggle (for future mobile responsiveness)
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
}

// Feature cards hover animation
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Animate stats on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all feature cards and sections
document.querySelectorAll('.feature-card, .section-header, .download-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Copy to clipboard functionality for Discord token instructions
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Could add a toast notification here
        console.log('Copied to clipboard');
    });
}

// Add click handlers for any copy buttons if needed
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const textToCopy = this.getAttribute('data-copy');
        copyToClipboard(textToCopy);
    });
});

// Form validation for any future contact forms
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Add loading state to download button
document.querySelector('.download-btn').addEventListener('click', function() {
    const originalText = this.innerHTML;
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
    
    // Reset after 3 seconds
    setTimeout(() => {
        this.innerHTML = originalText;
    }, 3000);
});

// Dark mode toggle (if needed in the future)
function toggleDarkMode() {
    document.body.classList.toggle('light-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('light-mode') ? 'false' : 'true');
}

// Initialize dark mode from localStorage
if (localStorage.getItem('darkMode') === 'false') {
    document.body.classList.add('light-mode');
}

// FAQ accordion (if we add FAQ section)
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        const isOpen = answer.style.display === 'block';
        
        // Close all other answers
        document.querySelectorAll('.faq-answer').forEach(ans => {
            ans.style.display = 'none';
        });
        
        // Toggle current answer
        answer.style.display = isOpen ? 'none' : 'block';
    });
});

// Lazy loading for images (if we add more images)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Nexus Radio website loaded');
    
    // Add any initialization code here
    
    // Show/hide elements based on screen size
    function handleResize() {
        const screenWidth = window.innerWidth;
        
        if (screenWidth < 768) {
            // Mobile adjustments
            document.querySelectorAll('.feature-card').forEach(card => {
                card.style.margin = '10px 0';
            });
        } else {
            // Desktop adjustments
            document.querySelectorAll('.feature-card').forEach(card => {
                card.style.margin = '0';
            });
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
}
