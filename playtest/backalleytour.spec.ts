import { test, expect } from '@playwright/test';

let movieId: string;
let ticketId: string;

test.describe('API Routes - Less Common Endpoints', () => {
  // Antes de todos os testes, deletar todos os filmes e tickets
  test.beforeAll(async ({ request }) => {
    // Deleta todos os filmes
    await request.delete('/movies');
    // Deleta todos os tickets
    await request.delete('/tickets');
  });

  test.describe('Movies Endpoint', () => {
    test('Edição de Filme', async ({ request }) => {
      const newMovie = {
        title: "Filme de Teste",
        description: "Descrição do Filme",
        launchdate: "2024-12-01",
        showtimes: ["2024-12-02T14:00:00"]
      };

      const movieResponse = await request.post('/movies', { data: newMovie });
      expect(movieResponse.status()).toBe(201);

      // Agora, buscamos o ID do filme usando um GET
      const getMoviesResponse = await request.get('/movies');
      const movies = await getMoviesResponse.json();
      const movie = movies.find((movie: { title: string }) => movie.title === "Filme de Teste");
      expect(movie).toBeDefined();
      movieId = movie._id;

      // Verifica se o ID do filme foi encontrado
      expect(movieId).toBeDefined();
   
      const updatedMovie = {
        title: "Filme de Teste Atualizado",
        description: "Descrição Atualizada",
        launchdate: "2024-12-10",
        showtimes: ["2024-12-12T16:00:00"]
      };

      const updateResponse = await request.put(`/movies/${movieId}`, { data: updatedMovie });
      expect(updateResponse.status()).toBe(200);

      const updatedMovieBody = await updateResponse.json();
      // Verifica se as informações foram atualizadas
      expect(updatedMovieBody.title).toBe("Filme de Teste Atualizado");
      expect(updatedMovieBody.description).toBe("Descrição Atualizada");
    });
  });

  test.describe('Tickets Endpoint', () => {
    test('Edição de ticket', async ({ request }) => {
      const newTicket = {
        movieId: movieId,
        userId: "user123",
        seatNumber: 15,
        price: 50,
        showtime: "2024-12-12T16:00:00"
      };

      const ticketResponse = await request.post('/tickets', { data: newTicket });
      expect(ticketResponse.status()).toBe(201);

      const ticketResponseBody = await ticketResponse.json();
      ticketId = ticketResponseBody._id;

      // Verifica se o ID do ticket foi criado
      expect(ticketResponseBody).toHaveProperty('_id');
      
      const updatedTicket = {
        movieId: movieId,
        userId: "user123",
        seatNumber: 20,
        price: 55,
        showtime: "2024-12-12T18:00:00"
      };

      const updateTicketResponse = await request.put(`/tickets/${ticketId}`, { data: updatedTicket });
      expect(updateTicketResponse.status()).toBe(200);

      const updatedTicketBody = await updateTicketResponse.json();
      // Verifica se as informações do ticket foram atualizadas
      expect(updatedTicketBody.seatNumber).toBe(20);
      expect(updatedTicketBody.price).toBe(55);
    });
  });
});
