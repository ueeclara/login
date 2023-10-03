const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Porta do servidor

app.use(express.json());
document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('register-form');

    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');

        const username = usernameInput.value;
        const password = passwordInput.value;

        // Crie um objeto com os dados do usuário
        const userData = {
            username: username,
            password: password,
        };

        // Enviar os dados para o servidor
        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
        .then(response => response.json())
        .then(data => {
            // Verificar a resposta do servidor
            if (data.success) {
                alert('Registro bem-sucedido!');
                // Redirecionar o usuário para a página de login ou outra página
                window.location.href = '/login.html';
            } else {
                alert('Erro no registro. Tente novamente.');
            }
        })
        .catch(error => {
            console.error('Erro ao registrar usuário:', error);
        });

        // Limpar os campos do formulário
        usernameInput.value = '';
        passwordInput.value = '';
    });
});

// Dados de exemplo (simulando um banco de dados)
let users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' },
  ];
  
  // Rotas CRUD para Usuários
  app.get('/api/users', (req, res) => {
    res.json(users);
  });
  
  app.get('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find((u) => u.id === userId);
    if (!user) return res.status(404).send('Usuário não encontrado.');
    res.json(user);
  });
  
  app.post('/api/users', (req, res) => {
    const newUser = {
      id: users.length + 1,
      username: req.body.username,
      password: req.body.password,
    };
    users.push(newUser);
    res.status(201).json(newUser);
  });
  
  app.put('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find((u) => u.id === userId);
    if (!user) return res.status(404).send('Usuário não encontrado.');
  
    user.username = req.body.username;
    user.password = req.body.password;
    res.json(user);
  });
  
  app.delete('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex((u) => u.id === userId);
    if (userIndex === -1) return res.status(404).send('Usuário não encontrado.');
  
    users.splice(userIndex, 1);
    res.sendStatus(204);
  });
  const apiUrl = 'http://localhost:3000/api/users'; // Atualize com o URL da sua API

  // Função para buscar e exibir usuários
  function fetchAndDisplayUsers() {
      fetch(apiUrl)
          .then((response) => response.json())
          .then((users) => {
              // Atualize o código para exibir os usuários conforme necessário
          })
          .catch(error => {
              console.error('Erro ao listar usuários:', error);
          });
  }
  
  // Função para adicionar um novo usuário
  function addUser(username, password) {
      fetch(apiUrl, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
      })
          .then(() => fetchAndDisplayUsers());
  }
  
  // Função para atualizar um usuário
  function updateUser(userId, username, password) {
      fetch(`${apiUrl}/${userId}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
      })
          .then(() => fetchAndDisplayUsers());
  }
  
  // Função para excluir um usuário
  function deleteUser(userId) {
      fetch(`${apiUrl}/${userId}`, {
          method: 'DELETE',
      })
          .then(() => fetchAndDisplayUsers());
  }

  
  
  // ... código para manipular o DOM e eventos de clique ...
  document.addEventListener('DOMContentLoaded', function () {
    const userList = document.getElementById('user-list');
    const updateUserForm = document.getElementById('update-user-form');
    const deleteUserButton = document.getElementById('delete-user-button');

    // Função para listar usuários
    function listUsers() {
        // Fazer uma solicitação à API para obter a lista de usuários
        fetch('/api/users')
            .then(response => response.json())
            .then(users => {
                userList.innerHTML = ''; // Limpar a lista atual

                users.forEach(user => {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `
                        <span>${user.username}</span>
                        <button class="update-button" data-user-id="${user.id}">Atualizar</button>
                        <button class="delete-button" data-user-id="${user.id}">Excluir</button>
                    `;
                    userList.appendChild(listItem);
                });

                // Adicionar ouvintes de evento para os botões de atualização e exclusão
                const updateButtons = document.querySelectorAll('.update-button');
                const deleteButtons = document.querySelectorAll('.delete-button');

                updateButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        const userId = button.getAttribute('data-user-id');
                        // Preencher o formulário de atualização com os dados do usuário
                        // e exibir o formulário de atualização.
                    });
                });

                deleteButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        const userId = button.getAttribute('data-user-id');
                        // Enviar uma solicitação para excluir o usuário com o ID userId.
                    });
                });
            })
            .catch(error => {
                console.error('Erro ao listar usuários:', error);
            });
    }

    // Chamar a função para listar usuários quando a página é carregada
    listUsers();

    // ... código para manipular o formulário de atualização ...

    // ... código para manipular a exclusão de usuário ...
});

  
  // Inicializa a lista de usuários
  fetchAndDisplayUsers();
  
  // Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
    