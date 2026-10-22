(() => {
    'use strict';

    // Совпадение паролей (есть только на форме регистрации)
    function checkPasswords(form) {
        const password = form.querySelector('#password');
        const repeat = form.querySelector('#password_repeat');
        if (!password || !repeat) return;
        repeat.setCustomValidity(password.value !== repeat.value ? 'Пароли не совпадают' : '');
    }

    document.querySelectorAll('.needs-validation').forEach((form) => {
        form.addEventListener('submit', (event) => {
            checkPasswords(form);
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        });

        // Обновляем проверку совпадения паролей при вводе
        form.querySelectorAll('#password, #password_repeat').forEach((input) => {
            input.addEventListener('input', () => checkPasswords(form));
        });
    });
})();