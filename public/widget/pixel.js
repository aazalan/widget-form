(function() {
    // адрес сервиса на котором будет находиться сервис хранящий информацию о посещениях сайтов и оставленных контактов
    const serviceURL = 'http://localhost';

    const setCookie = (name, value, days) => {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + (value || '')  + expires + '; path=/';
    }

    const checkCookie = (name) => {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for(let i= 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

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

        });
    };

    const  isCurrentDomainExists = async () =>  {
        const currentDomain = window.location.host;
        try {
            const response = await fetch(serviceURL + '/domains');
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
        // let isFirstTime = checkCookie('isFirstTime');

        if (isDomainExistsInList) {
            //     setCookie('firstVisitFlag', 'yes', 7);
            addWidgetFormToWebsite();
        }
    })();

})();
