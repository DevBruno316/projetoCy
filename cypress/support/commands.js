import Ajv from 'ajv'
import { definitionHelper  } from '../utils/schemaDefinitions'

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

Cypress.Commands.add('testeContrato', (schema, response) => {

    // Função que mostra os erros 
    const getSchemaError = ajvErrors => {
        return cy.wrap(
            `Campo: ${ajvErrors[0]['instancePath']} is invalid. Error: ${ajvErrors[0]['message']}`
        )
    }

    //start AJV
    const ajv = new Ajv()
    const validation = ajv.addSchema(definitionHelper).compile(schema)
    const valido = validation(response)

    if(!valido) {
        getSchemaError(validation.errors).then(schemaError => {
            throw new Error(schemaError)
        })
    } else
        expect(valido, 'Validação de contrato').to.be.true
    
})

Cypress.Commands.add('getElement', (selector) => {
    return cy.get(`[data-test=${selector}]`)
})

