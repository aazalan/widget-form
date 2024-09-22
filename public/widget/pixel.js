(function() {
    // адрес сервиса на котором будет находиться сервис хранящий информацию о посещениях сайтов и оставленных контактов
    const serviceURL = 'http://localhost';

    const setCookie = (name, value, days) => {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + (value || '')  + expires + '; path=/';
    }

    const checkCookie = (name) => {
        const nameEQ = name + '=';
        const cookiesArray = document.cookie.split(';');
        for(let i= 0; i < cookiesArray.length; i++) {
            let c = cookiesArray[i];
            while (c.charAt(0) === ' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    const collectSiteData = () => {
        let page = window.location.href;
        let domain = window.location.hostname;

        let time = new Date().toLocaleString();
        let ip = window.location.host;
        let user_agent = navigator.userAgent;
        let browser = navigator.userAgent;
        let device = navigator.platform;
        let platform = navigator.appVersion;

        return {
            page,
            domain,
            time,
            ip,
            user_agent,
            browser,
            device,
            platform
        };
    };

    const addWidgetFormToWebsite = () => {
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = '/widget/pixel.css';

        document.head.appendChild(cssLink);

        const formContainer = document.createElement('div');
        formContainer.className = 'widget-form__container';

        const form = document.createElement('form');
        const inputName = document.createElement('input');
        inputName.type = 'text';
        inputName.placeholder = 'Введите имя';
        inputName.className = 'widget-form__input';

        const inputPhone = document.createElement('input');
        inputPhone.type = 'text';
        inputPhone.placeholder = 'Введите email или номер телефона';
        inputPhone.className = 'widget-form__input';


        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Отправить';
        submitButton.className = 'widget-form__button';

        form.appendChild(inputName);
        form.appendChild(inputPhone);
        form.appendChild(submitButton);

        formContainer.appendChild(form);
        document.body.appendChild(formContainer);

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const data = {
                contact_name: inputName.value,
                contact_data: inputPhone.value,
                ...collectSiteData(),
            };
            fetch(serviceURL + '/api/visits', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(data),
            });
        });
    };

    const  isCurrentDomainExists = async () =>  {
        const currentDomain = window.location.host;
        try {
            const response = await fetch(serviceURL + '/api/domains');
            const { data } = await response.json();
            const domains = await data.map(d => d.domain);
            return domains.includes(currentDomain);
        } catch (error) {
            console.log('Не удалось получить список доменов');
            return false;
        }
    }

    (async () => {
        const  isDomainExistsInList = await isCurrentDomainExists();
        let isFirstTime = checkCookie('first_time_visit');

        if (isDomainExistsInList && !isFirstTime) {
            setCookie('first_time_visit', 'yes', 7);
            addWidgetFormToWebsite();
        }
    })();
})();
