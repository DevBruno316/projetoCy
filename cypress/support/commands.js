import Ajv from 'ajv'


Cypress.Commands.add('login', (email,password) => {
    cy.request({
        method: 'POST',
        url: '/api/auth',
        body: {
                email:email,
                password: password
              }
        })
    
})

Cypress.Commands.add('testeContrato', () => {

    // Função que mostra os erros 
    const getSchemaError = (ajvErrors) => {
        return cy.wrap(
            `Campo: ${ajvErrors[0]['instancePath']} is invalid. Error: ${ajvErrors[0]['message']}`
        )
    }
})

