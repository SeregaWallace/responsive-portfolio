const form = document.querySelector('.form'),
        inputs = document.querySelectorAll('.contact__input');

const message = {
    saccess: 'You will be contacted shortly!',
    failure: 'Error...',
};

const postData = async (url, data) => {
    let result = await fetch(url, {
        method: 'POST',
        body: data,
    });

    return await result.json();
};

const clearInputs = () => {
    inputs.forEach(input => {
        input.value = '';
    });
};


form.addEventListener('submit', ev => {
    ev.preventDefault();

    let statusMessage = document.createElement('div');
    form.append(statusMessage);

    const formData = new FormData(form);
    

    postData('assets/server.php', formData)
        .then(result => {
            console.log(result);
            statusMessage.textContent = message.saccess;
        })
        .catch(() => statusMessage.textContent = message.failure)
        .finally(() => {
            clearInputs();
            setTimeout(() => {
                statusMessage.remove();
            }, 5000);
        })
});