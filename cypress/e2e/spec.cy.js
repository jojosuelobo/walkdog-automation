/// <reference types="cypress" />
import { faker } from '@faker-js/faker'


describe('walkdog E2E tests', () => {
  context('Inital page', () => {
    it('validate inital page', () => {
      cy.visit('/')
      cy.contains('h1', 'Cuidado e diversão em cada passo')
        .should('exist')
        .and('be.visible')
      cy.get('a')
        .should('have.attr', 'href', '/signup')
        .and('contain', 'Quero ser Dog Walker');
    })
  })

  context('User registration', () => {
    it('should register a new user', () => {
      const cpf = require('validation-br/dist/cpf')
      cy.visit('/signup')
      cy.contains('h1', 'Faça seu cadastro')
        .should('exist')
        .and('be.visible')

      // Preenche campo de dados
      cy.get('input[name="name"]')
        .type(faker.person.fullName())
      cy.get('input[name="email"]')
        .type(faker.internet.email())
      cy.get('input[name="cpf"]')
        .type(cpf.fake())

      // Preenche campo de endereço
      cy.get('input[name="cep"]')
        .type(Cypress.env('cep'))
      cy.get('input[value="Buscar CEP"]')
        .click();

      // Valida se o campos foram preenchidos pelo CEP
      cy.get('input[name="addressStreet"]')
        .should('have.value', Cypress.env('rua'))
      cy.get('input[name="addressDistrict"]')
        .should('have.value', Cypress.env('bairro'))
      cy.get('input[name="addressCityUf"]')
        .should('have.value', Cypress.env('cidade'))

      // Preenche o restante dos campos
      cy.get('input[name="addressNumber"]')
        .type(faker.number.int(99))
      cy.get('input[name="addressDetails"]')
        .type(faker.lorem.sentence(3))

      cy.get('ul.walker-service li').then($lis => {
        const randomIndex = Math.floor(Math.random() * $lis.length);
        cy.wrap($lis[randomIndex])
          .click();
      });
      cy.get('div.dropzone input[type="file"]')
        .selectFile('cypress/fixtures/doc.png', { force: true })
        .then(input => {
          expect(input[0].files[0].name).to.eq('doc.png')
        })
      cy.get('button[type="submit"]')
        .click()

      // Valida mensagem de sucesso
      cy.contains('Recebemos o seu cadastro e em breve retornaremos o contato.')
        .should('be.visible')
      cy.contains('button', 'Voltar')
        .click()
      cy.url()
        .should('eq', 'https://walkdog.vercel.app/');

    })
  })


})