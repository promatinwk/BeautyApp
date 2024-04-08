const hamburgerMenu = document.querySelector('.hamburgerMenu');
const navbar = document.querySelector('nav');
const registerForm = document.querySelector('.register');
const registerBtn = document.querySelector('.registerButton');
const workers = document.querySelectorAll('.worker');


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


let currentWorker = null;
workers.forEach((worker)=>{
    let workerPhoto = worker.querySelector('.worker-photo');
    let workerDescription = worker.querySelector('.worker-description');
        workerPhoto.addEventListener('click', () => {
        // Jeśli wcześniej był wybrany inny pracownik, ukryj jego opis
        if (currentWorker !== null) {
            currentWorker.description.style.display = 'none';
           // currentWorker.description.classList.remove('selected-worker-description')
            currentWorker.photo.classList.remove('selected-worker');
        }
        currentWorker = {
            photo: workerPhoto,
            description: workerDescription
        };
        currentWorker.description.style.display = 'flex';
        //currentWorker.description.classList.add('selected-worker-description');
        currentWorker.photo.classList.add('selected-worker');
    });
    
})


