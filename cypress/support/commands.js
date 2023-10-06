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
// Cypress.Commands.add('login',() =>{
          
// })
Cypress.on('uncaught:exception', (err, runnable) => {
          return false
})

Cypress.Commands.add('login', (username, password) => {
                    cy.get("#login2").should("have.text", 'Log in').click();
                    cy.get('.modal-content').should('have.class', 'modal-content').first().within(()=>{
                        cy.get('.modal-header').children().should('have.class', 'modal-title').and('have.class', 'close');
                        cy.get('.modal-body').children().children()
                        .should('have.class', 'form-group').children().next()
                        .should('have.attr', 'type', 'text');
                        cy.xpath("//input[@id='loginusername']").type(username, {force: true}, {delay: 2000})
                        cy.xpath("//label[@for='log-pass'][normalize-space()='Password:']").should("have.text", 'Password:')
                        cy.xpath("//input[@id='loginpassword']").should('have.attr','type', 'password').type(password, {force: true}, {delay: 2000})
                        cy.get('.modal-footer').should('have.class', 'modal-footer');
                        cy.xpath("//button[normalize-space()='Log in']").should('have.attr', 'onClick', 'logIn()').click();
                    })
});      
