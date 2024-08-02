describe('CRUD - Posts', () => {

    before(() => {
        
        
        cy.request({
            method: 'POST',
            url: '/api/auth',
            body: {
                email:'testepost@teste.com',
                password: '1234567890'
            }
        })
    })

    it('teste', () => {
        cy.log('teste')
    })
})