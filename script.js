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