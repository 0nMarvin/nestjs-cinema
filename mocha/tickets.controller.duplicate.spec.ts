import { Test, TestingModule } from '@nestjs/testing';
import { TicketsController } from '../src/tickets/tickets.controller';
import { TicketsService } from '../src/tickets/tickets.service';
import { ConflictException } from '@nestjs/common';
import { expect } from 'chai';

describe('TicketsController - Duplicate Ticket Test', () => {
  let controller: TicketsController;
  let serviceMock: Partial<TicketsService>;

  beforeEach(async () => {
    // Mock para TicketsService
    serviceMock = {
      create: async (ticket) => {
        const existingShowtime = new Date('2024-12-12T18:00:00').toISOString();
        if (
          ticket.userId === 'user123' &&
          ticket.showtime.toISOString() === existingShowtime
        ) {
          throw new ConflictException('Ticket already exists');
        }
        return ticket;
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketsController],
      providers: [{ provide: TicketsService, useValue: serviceMock }],
    }).compile();

    controller = module.get<TicketsController>(TicketsController);
  });

  it('should throw ConflictException for duplicate ticket', async () => {
    const duplicateTicket = {
      userId: 'user123',
      movieId: '9JPOOjKchdHMBX4p',
      seatNumber: 20,
      price: 55,
      showtime: new Date('2024-12-12T18:00:00'),
    };

    await expect(async () => await controller.create(duplicateTicket)).to.throw(ConflictException);
  });

  it('should allow creating a new, unique ticket', async () => {
    const newTicket = {
      userId: 'user124',
      movieId: '9JPOOjKchdHMBX4p',
      seatNumber: 25,
      price: 60,
      showtime: new Date('2024-12-12T20:00:00'),
    };

    const result = await controller.create(newTicket);
    expect(result).to.eql(newTicket);
  });
});