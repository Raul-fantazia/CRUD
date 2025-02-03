const form = document.getElementById('Form');
const frmregister = document.getElementById('Form-register');

//login

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

// redireciona para a pagina de cadastro
const mudadepagina = document.getElementById('redirecionar');

mudadepagina.addEventListener('click', () => {
  window.location.href = 'register.html'; 
});

//cadastro 

frmregister.addEventListener('submit', async (event) => {
    event.preventDefault();

    // pegando as informaçoes do usuario 
    const nome = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    //conectando ao backend
    const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ nome, email, password})
    });

    if(response.ok) {
        alert('Usuário cadastrado com sucesso!');
        window.location.href = "index.html";
    } 
    else {
        const errorData = await response.json();
        alert('falha ao cadastrar usuario');
    }

});