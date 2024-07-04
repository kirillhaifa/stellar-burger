import configureStore from 'redux-mock-store';
import { setCookie } from '../../src/utils/cookie';

// Создайте моковый стор
const mockStore = configureStore([]);
const initialState = {
  auth: {
    user: { name: '', email: '' },
    authIsChecking: false,
    authorized: false,
    orders: [],
    ordersIsLoading: false,
    desiredUrl: null
  }
};

describe('неавторизированная часть', function () {
  beforeEach(() => {
    // Загружаем данные из файла fixtures/ingredients.json
    cy.fixture('ingredients').then((mockIngredients) => {
      // Перехватываем запрос на получение ингредиентов и подставляем моковые данные
      cy.intercept('GET', '/api/ingredients', {
        statusCode: 200,
        body: { success: true, data: mockIngredients }
      }).as('getIngredients');

      // Посещаем страницу и ждем загрузки ингредиентов
      cy.visit('http://localhost:4000');
      cy.wait('@getIngredients');
    });
  });

  it('сервис должен быть доступен по адресу localhost:4000', function () {
    cy.visit('http://localhost:4000');
  });

  it('открытие модального окна ингредиента', function () {
    // Убедимся, что элементы с ингредиентами отрисовались
    cy.get('[data-cy=ingredient-item]').should('have.length.greaterThan', 0);

    // Находим первый ингредиент по атрибуту data-cy
    cy.get('[data-cy=ingredient-item]').first().click();

    // Проверяем, что модальное окно открылось
    cy.get('[data-cy=modal]').should('be.visible');
  });

  it('закрытие модального окна', function () {
    // Убедимся, что элементы с ингредиентами отрисовались
    cy.get('[data-cy=ingredient-item]').should('have.length.greaterThan', 0);

    // Находим первый ингредиент по атрибуту data-cy
    cy.get('[data-cy=ingredient-item]').first().click();

    // Проверяем, что модальное окно открылось
    cy.get('[data-cy=modal]').should('be.visible');

    //находим кнопку закрытия и кликаем
    cy.get('[data-cy=modal-close-button]').first().click();

    //проверяем что можального окна нет
    cy.get('[data-cy=modal]').should('not.exist');
  });

  it('добавление ингридиента', function () {
    //добавляем первый ингридиент
    cy.contains('Добавить').click();

    //проверяеем что элемент добавлен
    cy.get('[data-cy=added-ingridient]').should('exist');
  });
});

describe('авторизированная часть', function () {
  let store;

  beforeEach(() => {
    // Инициализация сторе с моковыми данными авторизации
    cy.fixture('authResponse').then((mockAuthResponse) => {
      store = mockStore({
        auth: {
          ...initialState.auth,
          user: mockAuthResponse.user,
          authorized: mockAuthResponse.success
        }
      });

      cy.window().then((win) => {
        win.__store__ = store;
      });

      // Устанавливаем куки с accessToken
      setCookie('accessToken', mockAuthResponse.accessToken);
      localStorage.setItem('refreshToken', mockAuthResponse.refreshToken);

      // Перехватываем запросы до визита на страницу
      cy.fixture('ingredients').then((mockIngredients) => {
        cy.intercept('GET', '/api/ingredients', {
          statusCode: 200,
          body: { success: true, data: mockIngredients }
        }).as('getIngredients');
      });

      cy.intercept('GET', '/api/auth/user', {
        statusCode: 200,
        body: mockAuthResponse
      }).as('getUser');

      // Посещаем страницу и ждем загрузки данных
      cy.visit('http://localhost:4000');
      cy.wait('@getIngredients');
      cy.wait('@getUser');
    });
  });

  it('создаем заказ', function () {
    //добавляем булку
    cy.get('[data-cy="ingredient-item"]')
      .first()
      .find('button')
      .contains('Добавить')
      .click();

    //добавляем начинку
    cy.get('[data-cy="ingredient-item"]')
      .eq(2)
      .find('button')
      .contains('Добавить')
      .click();

    // Перехват запроса для оформления заказа и ответ замоканными данными
    cy.fixture('order').then((mockOrderResponse) => {
      cy.wrap(mockOrderResponse).as('orderData');
      cy.intercept('POST', '/api/orders', {
        statusCode: 200,
        body: mockOrderResponse
      }).as('postOrder');
    });

    cy.contains('Оформить заказ').click();
    cy.wait('@postOrder');

    cy.get('[data-cy=modal]').should('be.visible');
    cy.get('@orderData').then((order) => {
      cy.contains(order.order.number);
    });

    //находим кнопку закрытия и кликаем
    cy.get('[data-cy=modal-close-button]').first().click();

    //проверяем что модального окна нет
    cy.get('[data-cy=modal]').should('not.exist');

    //проверяеем что нет добавленных элементов
    cy.get('[data-cy=added-ingridient]').should('not.exist');
    cy.contains('Выберите булки').should('exist');
    cy.contains('Выберите начинку').should('exist');
  });
});
