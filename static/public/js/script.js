//? Menu

const hamburger = document.querySelector('.hamburger'),
    menu = document.querySelector('.menu'),
    closeElem = document.querySelector('.menu__close');

hamburger.addEventListener('click', () => {
    menu.classList.add('active');
});

closeElem.addEventListener('click', () => {
    menu.classList.remove('active');
});

const countersValue = document.querySelectorAll('.skills__progress-value'),
    lines = document.querySelectorAll('.skills__progress-line');

countersValue.forEach((item, i) => {
    lines[i].style.width = item.innerHTML;
});

//? Form

const form = document.querySelector('form')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const message = {
        success: 'Ваше письмо отправлено!',
        failure: 'Что-то пошло не так...'
    }

    const formData = new FormData(form)

    const object = {}
    formData.forEach((value, key) => object[key] = value)

    fetch('../../../app.js', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(object)
    })
        .then(() => showModal(message.success))
        .catch(() => showModal(message.failure))
        .finally(() => form.reset())
})

//? Modal

const modal = document.querySelector('.modal')

function showModal(message) {
    document.querySelector('.modal__title').textContent = message

    modal.style.display = 'block'
    setTimeout(() => modal.style.display = 'none', 1500)
}

