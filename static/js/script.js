(() => {
    const menuButton = document.querySelector('.menu-toggle');
    const navigation = document.querySelector('.primary-nav');
    const navigationLinks = [...document.querySelectorAll('.primary-nav a')];
    const backToTop = document.querySelector('.back-to-top');
    const year = document.querySelector('#current-year');

    if (year) year.textContent = new Date().getFullYear();

    const teamLinkedInProfiles = {
        'Priyanka Dhamane': 'https://www.linkedin.com/in/priyanka-dhamane-b02b1b37b/',
        'Mayur Dhamane': 'https://www.linkedin.com/in/mayur-dhamane-cmrp-vibration-analyst-cat-iii-9492a8101/',
        'Rupali Kumbhalkar': 'https://www.linkedin.com/in/rupali-kumbhalkar-021441181/',
        'Laxman Dhotre': 'https://www.linkedin.com/in/laxman-dhotre-554439253/',
        'Omkar Pagade': 'https://www.linkedin.com/in/omkarpagade/',
        'Akshay Landage': 'https://www.linkedin.com/in/akshay-landage-27b911372/',
        'Sagar Chandgude': 'https://www.linkedin.com/in/sagar-chandgude-7b4719211/',
        'Nikita Dhiwar': 'https://www.linkedin.com/in/nikita-dhiwar-99a514292/',
        'Atharva Dalvi': 'https://www.linkedin.com/in/atharva-dalvi-607254259/',
        'Shruti Varma': 'https://www.linkedin.com/in/shruti-varma-a32b76288/',
        'Atharv Kulkarni': 'https://www.linkedin.com/in/atharv-k/'
    };

    document.querySelectorAll('.team-card').forEach((card) => {
        const memberName = card.querySelector('h3')?.textContent.trim();
        const linkedInUrl = teamLinkedInProfiles[memberName];
        const linkedInLink = card.querySelector('.team-social a[aria-label^="LinkedIn link"]');
        if (!linkedInUrl || !linkedInLink) return;
        linkedInLink.href = linkedInUrl;
        linkedInLink.target = '_blank';
        linkedInLink.rel = 'noopener noreferrer';
        linkedInLink.setAttribute('aria-label', `LinkedIn profile for ${memberName} (opens in a new tab)`);
    });

    const closeMenu = () => {
        if (!menuButton || !navigation) return;
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Open navigation');
        navigation.classList.remove('is-open');
        document.body.classList.remove('menu-open');
    };

    if (menuButton && navigation) {
        menuButton.addEventListener('click', () => {
            const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
            menuButton.setAttribute('aria-expanded', String(!isExpanded));
            menuButton.setAttribute('aria-label', isExpanded ? 'Open navigation' : 'Close navigation');
            navigation.classList.toggle('is-open', !isExpanded);
            document.body.classList.toggle('menu-open', !isExpanded);
        });
        navigationLinks.forEach((link) => link.addEventListener('click', closeMenu));
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') closeMenu();
        });
    }

    const revealItems = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.12 });
        revealItems.forEach((item) => revealObserver.observe(item));
    } else {
        revealItems.forEach((item) => item.classList.add('is-visible'));
    }

    const sections = [...document.querySelectorAll('main section[id]')];
    if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                navigationLinks.forEach((link) => {
                    const active = link.getAttribute('href') === `#${entry.target.id}`;
                    link.classList.toggle('is-active', active);
                    if (active) link.setAttribute('aria-current', 'location');
                    else link.removeAttribute('aria-current');
                });
            });
        }, { rootMargin: '-30% 0px -60% 0px' });
        sections.forEach((section) => sectionObserver.observe(section));
    }

    const filterButtons = document.querySelectorAll('.filter-button');
    const eventItems = document.querySelectorAll('.event-item');
    const eventCount = document.querySelector('.event-count');
    const filterEvents = (category) => {
        let visibleCount = 0;
        eventItems.forEach((item) => {
            const visible = category === 'all' || item.dataset.category === category;
            item.classList.toggle('is-hidden', !visible);
            if (visible) visibleCount += 1;
        });
        if (eventCount) eventCount.textContent = `${visibleCount} ${visibleCount === 1 ? 'moment' : 'moments'}`;
    };
    filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            filterButtons.forEach((filter) => {
                const active = filter === button;
                filter.classList.toggle('is-active', active);
                filter.setAttribute('aria-pressed', String(active));
            });
            filterEvents(button.dataset.filter);
        });
    });
    filterEvents('all');

    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    document.querySelectorAll('.gallery-tile').forEach((tile) => {
        tile.addEventListener('click', () => {
            if (!lightbox || !lightboxImage || !lightboxCaption) return;
            lightboxImage.src = tile.dataset.full;
            lightboxImage.alt = tile.dataset.caption;
            lightboxCaption.textContent = tile.dataset.caption;
            if (typeof lightbox.showModal === 'function') lightbox.showModal();
        });
    });
    if (lightbox && lightboxClose) {
        lightboxClose.addEventListener('click', () => lightbox.close());
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && lightbox.open) lightbox.close();
        });
        lightbox.addEventListener('click', (event) => {
            if (event.target === lightbox) lightbox.close();
        });
        lightbox.addEventListener('close', () => {
            if (lightboxImage) lightboxImage.removeAttribute('src');
        });
    }

    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('is-visible', window.scrollY > 500);
        }, { passive: true });
        backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
})();