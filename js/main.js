// ===================================
// CAFÉ AKATSUKI - JavaScript Principal
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // Navigation Mobile
    // ===================================
    
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle menu mobile
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Fermer le menu lors du clic sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // ===================================
    // Navigation Scrollspy
    // ===================================
    
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    
    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Active nav link based on section
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // ===================================
    // Smooth Scroll
    // ===================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===================================
    // Scroll to Top Button
    // ===================================
    
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ===================================
    // Formulaire de Contact
    // ===================================
    
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupération des données du formulaire
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };
        
        // Validation
        if (!formData.name || !formData.email || !formData.message) {
            showNotification('Veuillez remplir tous les champs obligatoires', 'error');
            return;
        }
        
        // Validation email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showNotification('Veuillez entrer une adresse email valide', 'error');
            return;
        }
        
        // Simulation d'envoi (à remplacer par un vrai backend)
        console.log('Données du formulaire:', formData);
        
        // Afficher le message de succès
        contactForm.style.display = 'none';
        formSuccess.classList.add('show');
        
        // Log pour debug
        console.log('Message envoyé avec succès!');
        
        // Réinitialiser le formulaire après 5 secondes
        setTimeout(() => {
            contactForm.reset();
            contactForm.style.display = 'block';
            formSuccess.classList.remove('show');
        }, 5000);
        
        showNotification('Message envoyé avec succès!', 'success');
    });
    
    // ===================================
    // Animations au Scroll
    // ===================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observer les éléments à animer
    const animatedElements = document.querySelectorAll('.menu-card, .galerie-item, .info-card, .mission-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // ===================================
    // Fonction de Notification
    // ===================================
    
    function showNotification(message, type = 'info') {
        // Créer l'élément notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Styles inline pour la notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            background: type === 'success' ? '#25d366' : '#dc143c',
            color: '#ffffff',
            padding: '15px 25px',
            borderRadius: '10px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            zIndex: '10000',
            animation: 'slideIn 0.3s ease',
            fontWeight: '500'
        });
        
        document.body.appendChild(notification);
        
        // Supprimer après 3 secondes
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // Ajouter les animations CSS pour les notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // ===================================
    // Galerie - Modal d'Image (Optionnel)
    // ===================================
    
    const galerieItems = document.querySelectorAll('.galerie-item');
    
    galerieItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const imgAlt = this.querySelector('img').alt;
            openImageModal(imgSrc, imgAlt);
        });
    });
    
    function openImageModal(src, alt) {
        // Créer le modal
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <img src="${src}" alt="${alt}">
                <p>${alt}</p>
            </div>
        `;
        
        // Styles du modal
        Object.assign(modal.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            zIndex: '9999',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        });
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Fermer le modal
        const closeModal = () => {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                modal.remove();
                document.body.style.overflow = '';
            }, 300);
        };
        
        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
        
        // ESC pour fermer
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escHandler);
            }
        });
    }
    
    // Styles pour le modal d'image
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        .image-modal {
            animation: fadeIn 0.3s ease;
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
        }
        
        .modal-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
            z-index: 10000;
            text-align: center;
        }
        
        .modal-content img {
            max-width: 100%;
            max-height: 80vh;
            border-radius: 10px;
            box-shadow: 0 8px 40px rgba(220, 20, 60, 0.3);
        }
        
        .modal-content p {
            color: #ffffff;
            margin-top: 20px;
            font-size: 1.2rem;
        }
        
        .modal-close {
            position: absolute;
            top: -50px;
            right: 0;
            background: #dc143c;
            color: #ffffff;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .modal-close:hover {
            transform: rotate(90deg);
            background: #b01030;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(modalStyle);
    
    // ===================================
    // Lazy Loading des Images
    // ===================================
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // ===================================
    // Parallax Effect sur Hero
    // ===================================
    
    window.addEventListener('scroll', function() {
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrolled = window.scrollY;
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        }
    });
    
    // ===================================
    // Console Welcome Message
    // ===================================
    
    console.log('%cCafé AKATSUKI 🌩️', 'font-size: 30px; font-weight: bold; color: #dc143c;');
    console.log('%cLe café qui vient à vous - Kinshasa', 'font-size: 16px; color: #8e8e8e;');
    console.log('%cWebsite développé avec ❤️', 'font-size: 14px; color: #ffffff;');
    
});

// ===================================
// Gestion du Resize
// ===================================

let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Fermer le menu mobile si on agrandit l'écran
        if (window.innerWidth > 768) {
            document.getElementById('hamburger').classList.remove('active');
            document.getElementById('navMenu').classList.remove('active');
            document.body.style.overflow = '';
        }
    }, 250);
});