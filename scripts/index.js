const hamburgerMenu = document.querySelector('.hamburgerMenu');
const navbar = document.querySelector('nav');
const registerForm = document.querySelector('.register');
const registerBtn = document.querySelector('.registerButton');


let formVisible = false;


const showMenuOnMobile = hamburgerMenu.addEventListener('click',()=>{
    navbar.classList.toggle('active');
})
const showRegisterForm = registerBtn.addEventListener('click',()=>{
    formVisible = !formVisible;
    if (formVisible){
        registerForm.style.display = 'flex';
    } else{
        registerForm.style.display = 'none';
    }
})