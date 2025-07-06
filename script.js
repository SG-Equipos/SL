// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize i18n for multilingual support
    i18next
        .use(i18nextHttpBackend)
        .init({
            lng: navigator.language || navigator.userLanguage || 'es',
            fallbackLng: 'es',
            debug: false,
            backend: {
                loadPath: 'locales/{{lng}}/translation.json'
            }
        }, function(err, t) {
            // Initialized and ready to go!
            updateContent();
        });

    // Language selector functionality
    document.getElementById('language-selector').addEventListener('change', function(e) {
        i18next.changeLanguage(e.target.value, function(err, t) {
            updateContent();
        });
    });

    function updateContent() {
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(function(element) {
            element.textContent = i18next.t(element.getAttribute('data-i18n'));
        });
        
        // Update all placeholders with data-i18n-placeholder attribute
        document.querySelectorAll('[data-i18n-placeholder]').forEach(function(element) {
            element.setAttribute('placeholder', i18next.t(element.getAttribute('data-i18n-placeholder')));
        });
    }

    // Mobile menu toggle
    document.querySelector('.mobile-menu').addEventListener('click', function() {
        document.querySelector('.nav-links').classList.toggle('active');
    });

    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked button and corresponding tab
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Sample professionals data (in a real app, this would come from an API)
    const professionals = [
        {
            id: 1,
            name: "Carlos Méndez",
            specialization: "Ingeniero Informático",
            location: "Ciudad de México, México",
            experience: 5,
            rating: 4.8,
            bio: "Especializado en desarrollo web y aplicaciones móviles con 5 años de experiencia.",
            image: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
            id: 2,
            name: "Anna Müller",
            specialization: "Diseñadora UX/UI",
            location: "Berlín, Alemania",
            experience: 3,
            rating: 4.9,
            bio: "Diseñadora de experiencia de usuario con enfoque en interfaces intuitivas y accesibles.",
            image: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        // Add more professionals as needed
    ];

    // Display professionals
    const professionalsGrid = document.getElementById('professionals-grid');
    
    function displayProfessionals(professionalsToDisplay) {
        professionalsGrid.innerHTML = '';
        
        professionalsToDisplay.forEach(professional => {
            const card = document.createElement('div');
            card.className = 'professional-card';
            card.innerHTML = `
                <div class="professional-image" style="background-image: url('${professional.image}')"></div>
                <div class="professional-info">
                    <h3>${professional.name}</h3>
                    <p class="professional-specialty">${professional.specialization}</p>
                    <p class="professional-location"><i class="fas fa-map-marker-alt"></i> ${professional.location}</p>
                    <p class="professional-rating"><i class="fas fa-star"></i> ${professional.rating}/5 (${Math.floor(Math.random() * 50) + 10} reseñas)</p>
                    <p class="professional-bio">${professional.bio}</p>
                    <button class="contact-btn" onclick="contactProfessional(${professional.id})">
                        <i class="fas fa-envelope"></i> Contactar
                    </button>
                </div>
            `;
            professionalsGrid.appendChild(card);
        });
    }

    // Initial display
    displayProfessionals(prof