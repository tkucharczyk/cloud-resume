document.getElementById("downloadPdf").addEventListener("click", function () {
    // Element, który chcemy zapisać jako PDF
    const element = document.getElementById("doc2");

    // Opcje dla html2pdf
    const options = {
        margin: 10,
        filename: 'moja_strona.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Generowanie PDF
    html2pdf().set(options).from(element).save();
});

async function fetchVisitCount() {
    const apiEndpoint = 'https://790kk9cdeb.execute-api.eu-central-1.amazonaws.com/visit'; 

    try {
        // Wykonaj zapytanie do API
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Pobierz dane jako JSON
        const data = await response.json();

        // Zaktualizuj licznik w HTML
        const visitCount = data.VisitCount; 
        document.getElementById('visit-counter').innerText = `Visits: ${visitCount}`;
    } catch (error) {
        console.error('Error fetching visit count:', error);
        document.getElementById('visit-counter').innerText = 'Error loading visits';
    }
}

// Funkcja do wysyłania żądania POST do API w celu zwiększenia liczby wizyt
async function registerVisit() {
    const apiEndpoint = 'https://790kk9cdeb.execute-api.eu-central-1.amazonaws.com/visit'; 

    try {
        // Wyślij żądanie POST
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({}) 
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log('Visit registered successfully');
    } catch (error) {
        console.error('Error registering visit:', error);
    }
}

// Wywołaj funkcję po załadowaniu strony
window.onload = function () {
    registerVisit(); // Wywołanie metody POST do zarejestrowania wizyty
    fetchVisitCount(); // Pobranie aktualnej liczby odwiedzin
};