import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // Definir base URL para facilitar uso nos testes
    env: {
      movieTitle: 'The Enchanted Avocado',
      movieDescr: 'An avocado with magical properties that influence creativity.',
      movieDate: '2025-01-10T12:00:00.000Z',
      movieShow: {
        showtime1: '2024-12-01T15:00:00.000Z',
        showtime2: '2024-12-01T18:00:00.000Z',
        showtime3: '2024-12-02T11:00:00.000Z'
      },
      movieTitle2: 'The Enchanted Forest',
      movieDescr2: 'A magical journey through an ancient forest where mythical creatures come to life.',
      movieDate2: '2024-07-15T10:00:00.000Z',
      movieShow2: [
        '2024-11-05T20:00:00.000Z',
        '2024-11-06T12:00:00.000Z'
      ],
      userId: '0002389091',
      userId2: '0002389099',
      ticketId: 'algumvalor'
    },
    setupNodeEvents(on, config) {
      // Aqui você pode adicionar eventos personalizados, se necessário
    },
  },
});
