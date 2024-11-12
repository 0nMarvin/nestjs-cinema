describe('Teste Get para API de Filmes', () => {
    const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  
    let movieId; // Variável para armazenar o id do filme criado
    let ticketId; // Variável para armazenar o id do ticket criado
  
    const movie = {
      title: 'Inception',
      description: 'A mind-bending thriller',
      launchdate: '2010-07-16',
      showtimes: ['2024-11-12T10:00:00', '2024-11-12T14:00:00', '2024-11-12T18:00:00']
    };
  
    const ticket = {
      movieId: movieId,  // Usando o movieId obtido anteriormente
      userId: 'user123',  // Exemplo de userId
      seatNumber: randomNumber(1, 60),
      price: randomNumber(10, 60),
      showtime: '2024-11-12T10:00:00'  // Usando o showtime do filme
    };
  
    before(() => {
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
  
          // Atualiza o ticket com o movieId obtido
          ticket.movieId = movieId;
  
          // Criação do ticket com o movieId atualizado
          cy.api({
            url: '/tickets',
            method: 'POST',
            body: ticket
          }).then(ticketResponse => {
            expect(ticketResponse.status).to.eql(201);
            cy.log('Resposta do POST /tickets:', ticketResponse.body);  // Log da resposta
  
            // Buscar o ticket criado pelo movieId e userId
            cy.api({
              url: '/tickets',
              method: 'GET'
            }).then(ticketListResponse => {
              cy.log('Resposta do GET /tickets:', ticketListResponse.body);  // Log da resposta
              const createdTicket = ticketListResponse.body.find(t => t.movieId === movieId && t.userId === ticket.userId);
              if (createdTicket) {
                ticketId = createdTicket._id;  // Captura o _id do ticket criado
                cy.log(`Ticket encontrado com _id: ${ticketId}`);
              } else {
                throw new Error('Ticket não encontrado após criação');
              }
            });
          });
        });
      });
    });
  
    it('Verifica Persistência de Dados', () => {
      cy.api({
        url: '/movies',
        method: 'GET'
      }).then(response => {
        expect(response.status).to.eql(200);
        // Verificar se o filme ainda está presente com os dados corretos
        const createdMovie = response.body.find(m => m._id === movieId);
        expect(createdMovie).to.exist;
        expect(createdMovie.title).to.equal(movie.title);
        expect(createdMovie.description).to.equal(movie.description);
      });
  
      cy.api({
        url: '/tickets',
        method: 'GET'
      }).then(response => {
        expect(response.status).to.eql(200);
        // Verificar se o ticket ainda está presente com os dados corretos
        const createdTicket = response.body.find(t => t._id === ticketId);
        expect(createdTicket).to.exist;
        expect(createdTicket.movieId).to.equal(movieId);
        expect(createdTicket.userId).to.equal(ticket.userId);
        expect(createdTicket.seatNumber).to.equal(ticket.seatNumber);
        expect(createdTicket.price).to.equal(ticket.price);
        expect(createdTicket.showtime).to.equal(ticket.showtime);
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
  