# User Stories

## US 002: [API] Reservando Ingressos

**Sendo** um usuário da API de Ingressos  
**Gostaria** de reservar ingressos para assistir a um filme em um cinema  
**Para** poder garantir meu lugar na sessão desejada  


### DoR (Definition of Ready)
- Infraestrutura para desenvolvimento disponibilizados
- Endpoint da API para reserva de ingressos definido
- Ambiente de testes configurado e acessível

### DoD (Definition of Done)
- Implementação do endpoint de reserva de ingressos (`POST /tickets`)
- Testes unitários e de integração cobrindo a funcionalidade de reserva de ingressos
- Documentação da API e do endpoint de reserva concluída, incluindo formatos de dados e exemplos de resposta
- Automação de testes implementada e verificada
- Evidências dos testes e matriz de rastreabilidade dos requisitos atualizada
- Testes de carga e performance realizados com sucesso

### Acceptance Criteria

- **Acesso por Usuário**: Apenas usuários administradores podem realizar operações `PUT` e `DELETE`.
- **Requisição de Reserva**:
  - O usuário envia uma solicitação `POST` para o endpoint `/tickets` com os seguintes dados:
    - **ID do Filme** (`movieId`): Identifica o filme para o qual o ingresso está sendo reservado.
    - **ID do Usuário** (`userId`): Identifica o usuário que está fazendo a reserva.
    - **Número do Assento** (`seatNumber`): O número do assento que o usuário deseja reservar.
    - **Preço do Ingresso** (`price`): O preço do ingresso para o filme.
    - **Data de Apresentação** (`showtime`): A data e hora da apresentação do filme.
- **Validação de Dados**:
  - O sistema valida se todos os campos obrigatórios estão presentes e preenchidos corretamente.
  - O **número do assento** deve estar dentro do intervalo de 0 a 99. Caso contrário, o sistema retorna status `400 Bad Request`.
  - O **preço do ingresso** deve estar dentro do intervalo de 0 a 60. Caso contrário, o sistema retorna status `400 Bad Request`.
- **Criação da Reserva**:
  - Se todas as validações passarem, o sistema cria uma reserva de ingresso, atribui um ID único e retorna uma resposta de sucesso com status `201 Created`, incluindo o ID da reserva.
- **Performance**:
  - O sistema deve ser capaz de processar pelo menos 50 solicitações de reserva de ingressos por segundo.
  - O tempo médio de resposta para a reserva de um ingresso não deve exceder 300 milissegundos.
