describe('API - Profile', () => {

    let urlPerfis = '/api/profile'

    // DRY - don't repeat yourself

    context('todos os perfis', () => {
        it('valida a API de perfis', () => {

            cy.log('Teste de texto')
            cy.request({
                method: 'GET',
                url: urlPerfis,
            }).then(({ status,duration,body,headers }) => {
                expect(status).to.eq(200)
                expect(duration).to.be.lessThan(10000)
                expect(body[0].status).to.eq('QA Pleno')
                expect(body[0].company).to.eq( 'Itau')
                expect(body[0].education[0].degree).to.eq('Tecnico')
                expect(body[0].education[0].school).to.eq('Etec')
                expect(body[0].skills[0]).to.eq('Ccypress')
                expect(body[0].skills).to.have.lengthOf(1)
                expect(body[0].date).to.not.be.string
                expect(body[0].date).to.not.be.null
                expect(body[0].date).to.not.be.NaN
                //Wrong way:
                //expect(respostaAPI.headers.x-powered-by).to.eq('Express')
                //Correct way:
                expect(headers['x-powered-by']).to.eq('Express')
            })
        });
    });

    context('Specific Profile', () => {

        let urlPerfil = '/api/profile/user'
        it('Select an invalid user', () => {
            cy.request({
                method: 'GET',
                url:`${urlPerfil}/1`,
                failOnStatusCode: false
            }).then(respostaAPI => {
                expect(respostaAPI.status).to.eq(404)
                expect(respostaAPI.body.errors[0].msg).to.eq('Perfil não encontrado')
                expect(respostaAPI.duration).to.be.lessThan(10000)
                expect(respostaAPI.duration).to.be.greaterThan(1)
            })
        })
        it('validates a validated user', () => {
            let usuarioId = '66a829478ba90c27884e77b6'
            cy.request({
                method: 'GET',
                url: `${urlPerfil}/${usuarioId}`
            }).then(({ status,body}) => {
                expect(status).to.eq(200)
                expect(body.company).to.eq('Itau')
                expect(body.bio).to.eq('QA pleno')
                expect(body.education[0].degree).to.eq('Tecnico')
                expect(body.education[0].fieldofstudy).to.eq('DS')
                expect(body.experience[0].company).to.eq('WKL solutions')
                expect(body.experience[0].description).to.eq('QA junior')
                expect(body.githubusername).to.eq('DevBruno316')
                expect(body.status).to.eq('QA Pleno')
            })
        })
        it('validates a validated user searching in the base', () => {
            let usuarioId = ''
            cy.request({
                method: 'GET',
                url: urlPerfis
            }).then(({ body }) => {
                usuarioId = body[0].user._id

                cy.request({
                    method: 'GET',
                    url:`/api/profile/user/${usuarioId}`
                }).then(({ status,body }) => {
                    expect(status).to.eq(200)
                    expect(body.location).to.eq('Sao paulo')
                    expect(body.skills[0]).to.eq('Ccypress')
                })
            })

        })
        
    })
});