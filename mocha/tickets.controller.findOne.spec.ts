import { expect } from 'chai';
import { TicketsController } from '../src/tickets/tickets.controller';
import { NotFoundException } from '@nestjs/common';

describe('TicketsController - findOne', () => {
    let ticketsController: TicketsController;
    let ticketsServiceMock: any;

    beforeEach(() => {
        // Mock para o serviço ticketsService
        ticketsServiceMock = {
            findOne: (id: string) => {
                // Retorna um ticket fictício se o ID for "valid-id", caso contrário, retorna null
                return id === 'valid-id' ? { id: 'valid-id', title: 'Sample Ticket' } : null;
            },
        };

        // Inicializa o TicketsController com o mock
        ticketsController = new TicketsController(ticketsServiceMock);
    });

    it('deve retornar o ticket quando um ID válido é fornecido', async () => {
        const ticket = await ticketsController.findOne('valid-id');
        expect(ticket).to.be.an('object');
        expect(ticket).to.have.property('id', 'valid-id');
        expect(ticket).to.have.property('title', 'Sample Ticket');
    });

    it('deve lançar NotFoundException quando um ID inválido é fornecido', async () => {
        try {
            await ticketsController.findOne('invalid-id');
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundException);
            expect(error.message).to.equal('Ticket not found or not updated');
        }
    });
});
