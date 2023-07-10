// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('requestWith', (maturity, amount) => {
    const endpointurl='https://laenutaotlus.bigbank.ee/api/v1/loan/calculate'
    const headers = { 'content-type':'application/json; charset=utf-8','server':'cloudflare' }
    const requestbody= { 
      maturity,                 
      amount,               
      "productType": "SMALL_LOAN_EE01",
      "interestRate": 13.8,
      "monthlyPaymentDay": 15,
      "administrationFee": 2.99,
      "conclusionFee": 100,
      "currency": "EUR"    
    } 
    return cy.request({
      url: endpointurl,
      body: requestbody,
    })

  })