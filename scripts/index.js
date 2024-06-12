const hamburgerMenu = document.querySelector('.hamburgerMenu');
const navbar = document.querySelector('nav');
const registerBox = document.querySelector('.register');
const loginBox = document.querySelector('.login');
const registerBtn = document.querySelector('.registerButton');
const registerForm  = document.querySelector('.registerForm');
const workers = document.querySelectorAll('.worker');
const loginForm = document.getElementById('loginForm');
const loginBtn = document.querySelector('.loginButton');
const userProfileBtn = document.getElementById('welcomeMessage');
const userProfileBox = document.querySelector('.user');

const visitBox = document.querySelector('.visit');
const visitBtn = document.querySelector('.visitButton');
const visitForm = document.getElementById('bookingForm');


let formVisible = false;


const showMenuOnMobile = hamburgerMenu.addEventListener('click',()=>{
    navbar.classList.toggle('active');
})
const showRegisterForm = registerBtn.addEventListener('click',()=>{
    formVisible = !formVisible;
    if (formVisible){
        registerBox.style.display = 'flex';
    } else{
        registerBox.style.display = 'none';
    }
})

const showLoginForm = loginBtn.addEventListener('click',()=>{
    formVisible = !formVisible;
    if (formVisible){
        loginBox.style.display = 'flex';
    } else{
        loginBox.style.display = 'none';
    }
})

const showVisitForm = visitBtn.addEventListener('click',()=>{
    formVisible = !formVisible;
    if (formVisible){
        visitBox.style.display = 'flex';
    } else{
        visitBox.style.display = 'none';
    }
})

const showUserProfile = userProfileBtn.addEventListener('click', async ()=>{
    formVisible = !formVisible;
    if (formVisible){
        userProfileBox.style.display = 'flex';
    } else{
        userProfileBox.style.display = 'none';
    }

    const userData = await fetchUserData();
    const userVisits = await fetchUserVisits();

     displayUserProfile(userData);
     displayBookedVisits(userVisits);
})


let currentWorker = null;

workers.forEach((worker)=>{
    let workerPhoto = worker.querySelector('.worker-photo');
    let workerDescription = worker.querySelector('.worker-description');
        workerPhoto.addEventListener('click', () => {
        // Jeśli wcześniej był wybrany inny pracownik, ukryj jego opis
        if (currentWorker !== null) {
            currentWorker.description.style.display = 'none';
            currentWorker.photo.classList.remove('selected-worker');
        }
        currentWorker = {
            photo: workerPhoto,
            description: workerDescription
        };
        currentWorker.description.style.display = 'flex';
        currentWorker.photo.classList.add('selected-worker');
    });
    
})


registerForm.addEventListener('submit', async(e)=>{
    e.preventDefault();

    const username = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const phoneNumber = document.getElementById('phone').value;


    const response = await fetch('http://localhost:3000/users/register',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstName, lastName, username, password, phoneNumber, email })
    });

    const data = await response.json();
    console.log(data);
    
})

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    try {
        const response = await fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            const errorMessage = await response.json();
            throw new Error(errorMessage.message);
        }

        const { token } = await response.json();
        // Zapisz token w lokalnym składowisku (np. localStorage) lub w ciasteczku
        localStorage.setItem('token', token);
        alert('Logowanie udane!');
        // Przekieruj użytkownika na inną stronę lub wykonaj inne akcje po zalogowaniu
        window.location.href = '/'; // Przykładowe przekierowanie na stronę główną po zalogowaniu
    } catch (error) {
        console.error('Błąd logowania:', error.message);
        // Wyświetl komunikat o błędzie na stronie
        const errorContainer = document.getElementById('loginError');
        errorContainer.textContent = error.message;
    }
    console.log('Token:', tokenWithoutBearer);
})

async function fetchUserData() {
    const token = localStorage.getItem('token'); // Zakładam, że token jest przechowywany w localStorage
    if (!token) {
        alert('Uzytkownik niezalogowany!');
            return null;
        }

        const response = await fetch('http://localhost:3000/users/profile/:id', {
            headers: {
                'Authorization': `Bearer ${token}`
                    }
        });

        if (!response.ok) {
            alert('Failed to fetch user profile');
            return null;
        }

            const userData = await response.json();
            return userData;
        }

//Powitanie uzytkownika
async function displayWelcomeMessage() {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('Brak tokena JWT');
        return;
    }

    const userData = await fetchUserData(token);
    if (!userData) {
        console.error('Brak danych użytkownika');
        return;
    }

    const welcomeMessage = `Witaj, ${userData.firstName}!`;
    const welcomeElement = document.getElementById('welcomeMessage');
    welcomeElement.textContent = welcomeMessage;
}


// Wywołaj funkcję do wyświetlenia komunikatu powitalnego po załadowaniu strony
window.addEventListener('DOMContentLoaded', displayWelcomeMessage);

//Pobieranie informacji o uslugach
async function fetchServices() {
            const response = await fetch('http://localhost:3000/services');
            const services = await response.json();
            const serviceSelect = document.getElementById('serviceSelect');

            services.forEach(service => {
                const option = document.createElement('option');
                option.value = service._id;
                option.textContent = service.name;
                serviceSelect.appendChild(option);
});
}

//Pobieranie uzytkownikow dla konkretnej uslugi
async function fetchWorkers(serviceId) {
            const response = await fetch(`http://localhost:3000/workers/by-service/${serviceId}`);
            const workers = await response.json();
            const workerSelect = document.getElementById('workerSelect');

            workerSelect.innerHTML = ''; // Clear previous options

            workers.forEach(worker => {
                const option = document.createElement('option');
                option.value = worker._id;
                option.textContent = `${worker.firstName} ${worker.lastName}`;
                workerSelect.appendChild(option);
            });
}

// Funkcja do pobierania rezerwacji użytkownika za pomocą zapytania AJAX
async function fetchUserVisits() {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Authorization token is missing');
        }

        const response = await fetch('http://localhost:3000/visits', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const userVisits = await response.json();
        console.log(userVisits); // Sprawdź, czy otrzymane dane są poprawne
        return userVisits;
    } catch (error) {
        console.error('Error fetching user visits:', error.message);
        throw new Error('Failed to fetch user visits');
    }
}
visitBtn.addEventListener('click', async ()=>{
    
    fetchServices();
    
    const userProfile = await fetchUserData();
    if (!userProfile) {
               alert('Nie udało się pobrać profilu użytkownika'); // Komunikat o błędzie, jeśli nie uda się pobrać profilu
                return; // Zatrzymuje dalsze wykonywanie kodu, jeśli nie uda się pobrać profilu
            }
    
     document.getElementById('serviceSelect').addEventListener('change', (event) => {
                fetchWorkers(event.target.value);
            });
    visitForm.addEventListener('submit', async (e)=>{
        e.preventDefault();

        const serviceId = document.getElementById('serviceSelect').value;
        const workerId = document.getElementById('workerSelect').value;
        const clientId = userProfile._id; // Use the client ID from the fetched user profile
        const date = document.getElementById('visitDate').value;

        const response = await fetch('http://localhost:3000/visits', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({serviceId, workerId, clientId, date })
                });

                if (response.ok) {
                    alert('Wizyta zapisana!!');
                } else {
                    const error = await response.json();
                    alert(`Error: ${error.message}`);
                }
    })
})


async function displayUserProfile(userData) {

    // Wybieramy elementy, do których będziemy dodawać dane użytkownika
    const firstNameElement = document.querySelector('.userFirstName');
    const lastNameElement = document.querySelector('.userLastName');
    const emailElement = document.querySelector('.userEmail');
    const phoneNumberElement = document.querySelector('.userPhoneNumber');

    // Ustawiamy tekst dla każdego elementu na podstawie danych użytkownika
    firstNameElement.textContent = `Imię: ${userData.firstName}`;
    lastNameElement.textContent = `Nazwisko: ${userData.lastName}`;
    emailElement.textContent = `Email: ${userData.email}`;
    phoneNumberElement.textContent = `Numer telefonu: ${userData.phoneNumber}`;
}

function displayBookedVisits(bookedVisits) {
    const bookedVisitsList = document.getElementById('bookedVisits');
    bookedVisitsList.innerHTML = '';
    bookedVisits.forEach(visit => {
        const visitItem = document.createElement('li');
        const date = new Date(visit.date);
        const formattedDate = date.toLocaleDateString('pl-PL'); 
        visitItem.textContent = `Kosmetyczka: ${visit.worker.firstName} ${visit.worker.lastName}, Data rezerwacji: ${formattedDate}`;
        bookedVisitsList.appendChild(visitItem);
    });
}