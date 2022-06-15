describe('Проверка оформления заказа Stellar burgers', () => {
    beforeEach(() => {
        cy.viewport(1400, 1000)
    })

    it('Должно быть доступно на localhost:3000', function () {
        cy.visit('http://localhost:3000');
    });

    it('Добавление ингредиентов в конструктор', () => {
        cy.get('[data-test="60d3b41abdacab0026a733c6"]').trigger('dragstart');
        cy.get('[data-test="selected"]').trigger('drop');
        cy.get('[data-test="60d3b41abdacab0026a733cc"]').trigger('dragstart');
        cy.get('[data-test="selected"]').trigger('drop');
        cy.get('[data-test="60d3b41abdacab0026a733d4"]').trigger('dragstart');
        cy.get('[data-test="selected"]').trigger('drop');
        cy.get('[data-test="60d3b41abdacab0026a733cb"]').trigger('dragstart');
        cy.get('[data-test="selected"]').trigger('drop');
        cy.get('[data-test="60d3b41abdacab0026a733d3"]').trigger('dragstart');
        cy.get('[data-test="selected"]').trigger('drop');
    });

    it('Открытие модального окна с описанием ингредиента', () => {
        cy.get('[data-test="60d3b41abdacab0026a733c6"]').click();
        cy.location('pathname').should('eq', '/react-burger/ingredients/60d3b41abdacab0026a733c6');
        cy.get('#modal').as('modal').should('exist');
        cy.get('@modal').contains('Детали ингредиента');
        cy.get('@modal').contains('Краторная булка N-200i');
    });

    it('Закрытие модального окна с описанием ингредиента', function () {
        cy.get('#modal').find('svg').click();
        cy.get('#modal').should('not.exist');
    });

    it('Оформление заказа без авторизации', function () {
        cy.get('button').contains('Оформить заказ').click();
        cy.location('pathname').should('eq', '/react-burger/login');
    });

    it('Оформление заказа с авторизацией и с открытием модального окна с номером заказа', function () {
        cy.location('pathname').should('eq', '/react-burger/login');
        cy.get('input[name="email"]').type('nightmare-on@elm.street');
        cy.get('input[name="password"]').type('12FreddysComingForYou');
        cy.get('button').contains('Войти').click();
        cy.location('pathname').should('eq', '/react-burger/');
        cy.get('button').contains('Оформить заказ').click(); 
        cy.get('#modal').should('exist');
        cy.intercept('POST','https://norma.nomoreparties.space/api/orders').as('getOrder');
        cy.wait('@getOrder').its('response.statusCode').should('eq', 200);
        cy.contains('Дождитесь готовности на орбитальной станции');
    });

    it('Закрытие модального окна с номером заказа', function () {
        cy.get('#modal').find('svg').click();
        cy.get('#modal').should('not.exist');
    });
})
