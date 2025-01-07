describe('Test API GET request', () => {
  it('Wysyła żądanie GET i sprawdza odpowiedź', () => {
    // ID strony, dla której pobieramy dane
    const pageId = 'default_page';

    // Wysyłanie żądania GET
    cy.request({
      method: 'GET',
      url: `https://790kk9cdeb.execute-api.eu-central-1.amazonaws.com/visit?page_id=${pageId}`, // Zmień na swój endpoint API
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      // Sprawdzanie statusu odpowiedzi (200 OK)
      expect(response.status).to.eq(200);

      // Sprawdzanie nagłówków odpowiedzi
      expect(response.headers['content-type']).to.include('application/json');

      // Parsowanie ciała odpowiedzi jako JSON
      const responseBody = response.body;

      // Sprawdzanie, czy ciało odpowiedzi zawiera oczekiwane dane
      expect(responseBody).to.have.property('PageID', pageId); // Sprawdzanie poprawnego ID strony
      expect(responseBody).to.have.property('VisitCount'); // Sprawdzanie, czy 'VisitCount' istnieje
      expect(responseBody.VisitCount).to.be.a('number'); // Sprawdzanie, czy 'VisitCount' jest liczbą
      expect(responseBody.VisitCount).to.be.gte(0); // Sprawdzanie, czy 'VisitCount' jest >= 0
    });
  });
});
