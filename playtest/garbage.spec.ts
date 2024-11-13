import { test, expect } from '@playwright/test';

let movieId: string;
let ticketId: string;

test.describe('API Routes', () => {

  // Antes de todos os testes, pegue um id de filme e um id de ticket já existentes
  test.beforeAll(async ({ request }) => {
    const moviesResponse = await request.get('/movies');
    const moviesData = await moviesResponse.json();
    if (moviesData && moviesData.length > 0) {
      movieId = moviesData[0].id;  // Pega o primeiro filme da lista
    } else {
      console.warn("Nenhum filme encontrado para obter o ID.");
    }

    const ticketsResponse = await request.get('/tickets');
    const ticketsData = await ticketsResponse.json();
    if (ticketsData && ticketsData.length > 0) {
      ticketId = ticketsData[0].id;  // Pega o primeiro ticket da lista
    } else {
      console.warn("Nenhum ticket encontrado para obter o ID.");
    }
  });

  // Teste de criação de um filme válido e verificação dos dados retornados
  test('[POST] Criação de um filme válido e verificação dos dados retornados', async ({ request }) => {
    const newMovie = {
      title: "Novo Filme",
      description: "Descrição do novo filme",
      launchdate: "2024-01-01",
      showtimes: ["2024-01-01T10:00:00", "2024-01-01T15:00:00"]
    };

    const response = await request.post('/movies', { data: newMovie });
    expect(response.status()).toBe(201);

    const responseBody = await response.json();
    console.log(responseBody); // Exibe a resposta para verificação

    // Caso o ID seja retornado na resposta, armazena ele
    if (responseBody._id) {
      movieId = responseBody._id;
    }

    // Verificar outras informações
    expect(responseBody.title).toBe(newMovie.title);
    expect(responseBody.description).toBe(newMovie.description);
    expect(responseBody.launchdate).toBe(newMovie.launchdate);
    expect(responseBody.showtimes).toEqual(newMovie.showtimes);
  });

  // Teste de criação de um ticket válido e verificação dos dados retornados
  test('[POST] Criação de um ticket válido e verificação dos dados retornados', async ({ request }) => {
    const newTicket = {
      movieId: movieId,
      userId: "12345",
      seatNumber: 50,
      price: 20.0,
      showtime: "2024-01-01T10:00:00"
    };

    const response = await request.post('/tickets', { data: newTicket });
    expect(response.status()).toBe(201);

    const responseBody = await response.json();
    console.log(responseBody); // Exibe a resposta para verificação

    // Caso o ID seja retornado na resposta, armazena ele
    if (responseBody._id) {
      ticketId = responseBody._id;
    }

    // Verificar outras informações
    expect(responseBody.movieId).toBe(newTicket.movieId);
    expect(responseBody.userId).toBe(newTicket.userId);
    expect(responseBody.seatNumber).toBe(newTicket.seatNumber);
    expect(responseBody.price).toBe(newTicket.price);
    expect(responseBody.showtime).toBe(newTicket.showtime);
  });

  // Seus testes de verificação de erro (sem modificações)
  test.describe('API de Cinema - Endpoint POST /movies', () => {
    test('[POST] Retorno erro 400, mensagens de erro específicas.', async ({ request }) => {
      const newMovie = {
        title: "",
        description: "",
        launchdate: "",
        showtimes: []
      };

      const response = await request.post('/movies', { data: newMovie });
      expect(response.status()).toBe(400);

      const responseBody = await response.json();
      console.log(responseBody);

      expect(responseBody.message).toContain('Título do filme é mandatório');
      expect(responseBody.message).toContain('Descrição do filme é mandatória');
      expect(responseBody.message).toContain('Data de lançamento é mandatória');
      expect(responseBody.error).toBe('Bad Request');
    });
  });

  test.describe('API de Cinema - Endpoint PUT /movies', () => {
    test('[PUT] Retorno erro 400, mensagens de erro específicas.', async ({ request }) => {
      const updatedMovie = {
        title: "",
        description: "",
        launchdate: "",
        showtimes: []
      };
  
      const response = await request.put(`/movies/${movieId}`, { data: updatedMovie });
      expect(response.status()).toBe(404);
  
      const responseBody = await response.json();
      console.log(responseBody);
  
      expect(responseBody.message).toContain('Movie not found or not updated');
    });
  });

  test.describe('API de Tickets - Endpoint POST /tickets', () => {
    test('[POST] Retorno erro 400, mensagens de erro específicas.', async ({ request }) => {
      const newTicket = {
        movieId: "",
        userId: "",
        seatNumber: '',
        price: '',
        showtime: ''
      };

      const response = await request.post('/tickets', { data: newTicket });
      expect(response.status()).toBe(400);

      const responseBody = await response.json();
      console.log(responseBody);

      expect(responseBody.message).toContain('Valor do assento deve ser menor ou igual a 100');
      expect(responseBody.message).toContain('Valor do assento deve ser maior ou igual a 0');
      expect(responseBody.message).toContain('seatNumber must be a number conforming to the specified constraints');
      expect(responseBody.message).toContain('Número do assento é mandatório');
      expect(responseBody.message).toContain('Preço deve ser menor ou igual a 60');
      expect(responseBody.message).toContain('Preço deve ser maior ou igual a 0');
      expect(responseBody.message).toContain('price must be a number conforming to the specified constraints');
      expect(responseBody.message).toContain('Preço do ingresso é mandatório');
      expect(responseBody.message).toContain('Data de apresentação é mandatória');
      expect(responseBody.message).toContain('ID do usuário é mandatório');
      expect(responseBody.message).toContain('ID do filme é mandatório');
      expect(responseBody.error).toBe('Bad Request');
    });
  });

  test.describe('API de Ticket - Endpoint PUT /ticket', () => {
    test('[PUT] Retorno erro 400, mensagens de erro específicas.', async ({ request }) => {
      const updatedMovie = {
        title: "",
        description: "",
        launchdate: "",
        showtimes: []
      };
  
      const response = await request.put(`/tickets/${ticketId}`, { data: updatedMovie });
      expect(response.status()).toBe(404);
  
      const responseBody = await response.json();
      console.log(responseBody);
  
      expect(responseBody.message).toContain('Ticket not found or not updated');
    });
  });

  // Após todos os testes, tente buscar os IDs do filme e ticket criados e delete-os
  test.afterAll(async ({ request }) => {
    // Verificar se os IDs foram definidos no POST; caso contrário, faça um GET para obtê-los
    if (!movieId) {
      const moviesResponse = await request.get('/movies');
      const moviesData = await moviesResponse.json();
      if (moviesData && moviesData.length > 0) {
        movieId = moviesData[moviesData.length - 1].id;
      }
    }

    if (!ticketId) {
      const ticketsResponse = await request.get('/tickets');
      const ticketsData = await ticketsResponse.json();
      if (ticketsData && ticketsData.length > 0) {
        ticketId = ticketsData[ticketsData.length - 1].id;
      }
    }

    // Delete os recursos se os IDs estiverem disponíveis
    if (movieId) {
      await request.delete(`/movies/${movieId}`);
      console.log(`Filme com ID ${movieId} deletado.`);
    } else {
      console.warn("ID do filme não encontrado para deleção.");
    }

    if (ticketId) {
      await request.delete(`/tickets/${ticketId}`);
      console.log(`Ticket com ID ${ticketId} deletado.`);
    } else {
      console.warn("ID do ticket não encontrado para deleção.");
    }
  });
});
