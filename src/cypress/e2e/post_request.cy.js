describe('Test API POST request', () => {
  it('Wysyła żądanie POST i sprawdza odpowiedź', () => {
    // Dane do wysłania w żądaniu POST
    const payload = {
      page_id: 'default_page', // ID strony, której liczba wizyt ma być zaktualizowana
    };

    // Wysyłanie żądania POST
    cy.request({
      method: 'POST',
      url: 'https://790kk9cdeb.execute-api.eu-central-1.amazonaws.com/visit',
      body: payload,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      // Sprawdzanie statusu odpowiedzi (200 OK)
      expect(response.status).to.eq(200);

      // Sprawdzanie, czy odpowiedź zawiera poprawną strukturę
      const expectedMessage = `Visit count for ${payload.page_id}:`;
      expect(response.body).to.include(expectedMessage);

      const visitCountMatch = response.body.match(/Visit count for .*: (\d+)/);
      if (visitCountMatch) {
        const visitCount = parseInt(visitCountMatch[1], 10);
        expect(visitCount).to.be.a('number');
        expect(visitCount).to.be.gte(0); // Liczba wizyt powinna być większa lub równa 0
      } else {
        throw new Error('Nie udało się znaleźć liczby wizyt w odpowiedzi API');
      }
    });
  });
});
