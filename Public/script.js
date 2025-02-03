const form = document.getElementById('Form').value;

//adcionando botão de click no formulario

form.addEventListener('submit', (event) => {
    event.preventDefault();

    // informações passadas pelo usuario
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    //conectando ao backend

    fetch('http://localhost:3000/api/auth/login' , {

        method: 'POST',
        headers: {
           'Content-Type':'application/json'
        },

        body: JSON.stringify({ email, password})

    })
    .then(response => {
        //caso não encontre 
        if(!response.ok) {
            throw new Error('Erro ao fazer login');
        }
        return response.json();
    })
    .then(data => {
        // caso encontre
        if(data.message === 'Login efetuado com sucesso'){
            localStorage.setItem('token', data.token);
        } else {
            alert('Credenciais Inválidas');
        }
    })
    .catch(error => {
        console.log('Erro', error);
        alert('Erro ao fazer login');
    })
});

