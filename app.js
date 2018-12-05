document.getElementById('loan-form').addEventListener('submit', function(e){
    // skrivanje rezultata
    document.getElementById('results').style.display = 'none';
    // prikaži loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

// Calculate Results - funkcija se poziva klikom na submit gumbić i izračunava potrebne iznose

function calculateResults() {
    console.log('Calculating...');

    // UI varijable

    // input polja u koja unosimo iznose
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    // polja u koja dolaze rezultati
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value); // iznos kredita pretvaramo iz stringa u decimalni broj pomoću funkcije parseFloat()
    const calculatedInterest = parseFloat(interest.value) / 100 / 12; // kamate pretvaramo u decimalni broj i dijelimo sa 100 i onda s 12
    const calculatedPayments = parseFloat(years.value) * 12; // rok otplate pretvaramo u decimalni broj i množimo sa 12

    // Izračun mjesečne otplate
    const x = Math.pow(1 + calculatedInterest, calculatedPayments) // izračunu kamata (vidi gore) dodajemo 1 i stavljamo na potenciju Math.pow() koja je iznos izračuna roka otplate (vidi gore)
    const monthly = (principal*x*calculatedInterest)/(x-1); // formula za izračun mjesečne otplate
    
    // funkcija isFinite vraća false ako je broj beskonačan (+infinity, -infinity) ili nije broj (NaN)
    if(isFinite(monthly)) {
        // u polje "mjesečni iznos" dolazi rezultat dobiven gornjom formulom (monthly)
        monthlyPayment.value = monthly.toFixed(2); // metoda toFixed() omogućije da odredimo koliko decimala želimo i pretvara broj u string

        // u polje "ukupan iznos otplate" 
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);

        // u polje "ukupna kamata"
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        // prikazivanje rezultata
        document.getElementById('results').style.display = 'block';

        // skrivanje loadera
        document.getElementById('loading').style.display = 'none';

    }
    else {
        showError('Provjerite brojke koje ste unijeli');
    }
}

// Show Error funkcija
function showError(error) {

    // skrivanje rezultata, ako ih ima
    document.getElementById('results').style.display = 'none';
        
    // skrivanje loadera
    document.getElementById('loading').style.display = 'none';

    // kreiramo div
    const errorDiv = document.createElement('div');

    // dohvaćamo elemente
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');


    // dodajemo klase iz Bootstrapa
    errorDiv.className = 'alert alert-danger';

    // kreiramo text node i appendamo u div
    errorDiv.appendChild(document.createTextNode(error));

    // umećemo iznad headinga
    card.insertBefore(errorDiv, heading); // metoda insertBefore() stavlja se na parenta i umeće child node ispred nekog postojećeg childea (errorDiv ispred headinga)

    // poruka o grešci nestaje nakon 3 sekunde
    setTimeout(clearError, 3000);

    // Clear Error funkcija
    function clearError(){
        document.querySelector('.alert').remove();
    }
}
