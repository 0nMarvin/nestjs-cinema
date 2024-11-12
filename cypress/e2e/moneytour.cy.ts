describe('Money Tour - Rota Principal', () => {
  const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  let movieId; // Variável para armazenar o id do filme criado
  let ticketId; // Variável para armazenar o id do ticket criado

  before(() => {
    const movie = {
      title: 'Inception',
      description: 'A mind-bending thriller',
      launchdate: '2010-07-16',
      showtimes: ['2024-11-12T10:00:00', '2024-11-12T14:00:00', '2024-11-12T18:00:00']
    };

    // Criação do filme
    cy.api({
      url: '/movies',
      method: 'POST',
      body: movie
    }).then(response => {
      expect(response.status).to.eql(201);
      // Após criar, busca o filme pela descrição (ou outro identificador único)
      cy.api({
        url: '/movies',
        method: 'GET',
      }).then(getResponse => {
        // Buscar o filme recém-criado na lista (com base na descrição, título, etc.)
        const createdMovie = getResponse.body.find(m => m.description === movie.description);
        if (createdMovie) {
          movieId = createdMovie._id;  // Captura o _id do filme criado
          cy.log(`Filme criado com _id: ${movieId}`);
        } else {
          throw new Error('Filme não encontrado após criação');
        }
      });
    });
  });

  it('Cadastrando/Comprando Ingresso e Verificando Resposta', () => {
    const ticket = {
      movieId: movieId,  // Usando o movieId obtido anteriormente
      userId: 'user123',  // Exemplo de userId
      seatNumber: randomNumber(1, 60),
      price: randomNumber(10, 60),
      showtime: '2024-11-12T10:00:00'  // Usando o showtime do filme
    };

    // Criação do ticket
    cy.api({
      url: '/tickets',
      method: 'POST',
      body: ticket
    }).then(response => {
      expect(response.status).to.eql(201);
      ticketId = response.body._id;  // Captura o _id do ticket criado
      cy.log(`Ticket criado com _id: ${ticketId}`);

      // Verificar se a resposta contém todos os parâmetros esperados
      expect(response.body).to.be.an('object').and.to.have.all.keys('movieId', 'userId', 'seatNumber', 'price', 'showtime', '_id');
      expect(response.body.movieId).to.be.a('string').and.to.not.be.empty;
      expect(response.body.userId).to.be.a('string').and.to.not.be.empty;
      expect(response.body.seatNumber).to.be.a('number');
      expect(response.body.price).to.be.a('number');
      expect(response.body.showtime).to.be.a('string').and.to.not.be.empty;
      expect(response.body._id).to.be.a('string').and.to.not.be.empty;
    });
  });

  after(() => {
    // Verificar se os ids foram capturados corretamente
    cy.log(`ID do filme para exclusão: ${movieId}`);
    cy.log(`ID do ticket para exclusão: ${ticketId}`);

    // Excluir o ticket se o ticketId estiver definido
    if (ticketId) {
      cy.api({
        url: `/tickets/${ticketId}`,
        method: 'DELETE'
      }).then(response => {
        expect(response.status).to.eql(200);  // Espera status 200 para a exclusão
        cy.log(`Ticket com _id: ${ticketId} excluído com sucesso`);
      });
    }

    // Excluir o filme se o movieId estiver definido
    if (movieId) {
      cy.api({
        url: `/movies/${movieId}`,
        method: 'DELETE'
      }).then(response => {
        expect(response.status).to.eql(200);  // Espera status 200 para a exclusão
        cy.log(`Filme com _id: ${movieId} excluído com sucesso`);
      });
    }
  });
});
