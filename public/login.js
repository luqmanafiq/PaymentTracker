document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if(username === 'ambanixx' && password === 'abc123') {
            window.location.href = 'employee-home.html';
        } else {
            alert('Incorrect username or password!');
        }
    });
});
