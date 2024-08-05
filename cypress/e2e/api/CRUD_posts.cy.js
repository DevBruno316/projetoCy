import { testeContratoPOSTPosts } from "../../fixtures/schema_POST-posts"
import { testeContratoGETPosts } from "../../fixtures/schema_GET-posts"

describe('CRUD - Posts', () => {

    let postId = ''
    let message = 'This post was made from Cypress'


    beforeEach(() => {
        
        
       cy.login(Cypress.env('email'), Cypress.env('password'))
    })

    it.only('Create a post', () => {
        cy.request({
            method: 'POST',
            url: '/api/posts' ,
            body: {
                text: message
            }
        }).then(({status,body}) => {
            expect(status).to.eq(201)
            expect(body.name).to.eq('Teste POST')
            expect(body.user).to.eq('66ac3d09b7343c204c93cd38')
            postId = body._id

            cy.testeContrato(testeContratoPOSTPosts, body)
        })
    })
    it.only('Read post', () => {
        
        cy.request({
            method: 'GET',
            url: `/api/posts/${postId}`
        }).then(({ status,body}) => {
            expect(status).to.eq(200)
            expect(body.text).to.eq(message)
            expect(body.likes).to.have.lengthOf(0)
            cy.testeContrato(testeContratoGETPosts, body)
        })
    })

    it('Update Post', () => {
        cy.request({
            method: 'PUT',
            url: `/api/posts/like/${postId}`
        }).then(({status}) => {
            expect(status).to.eq(200)

            cy.request({
                method: 'GET',
                url: `/api/posts/${postId}`
            }).then(({body}) => {
                expect(body.likes).to.have.lengthOf(1)
            })
        })
    })

    it('Delete Post', () => {
        cy.request({
            method: 'DELETE',
            url:`/api/posts/${postId}`

        }).then(({status, body}) => {
            expect(status).to.eq(200)
            expect(body.msg).to.eq('Post removido')


            cy.request({
                method: 'GET',
                url: `/api/posts/${postId}`,
                failOnStatusCode: false
            }).then(({status}) => {
                expect(status).to.eq(404)
            })
        })
    })

   
})