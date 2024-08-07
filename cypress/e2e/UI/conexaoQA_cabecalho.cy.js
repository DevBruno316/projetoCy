describe('Header page home', () => {

    const validarMenu = (seletor,link, menu) => {
        cy.getElement(seletor)
            .should('have.attr', 'href' , link)
            .and('not.have.attr', 'target' , '_blank')
            .and('have.text', menu)
    }

    context('Not logged', () => {

        beforeEach(() => {
            cy.visit('/')
        })

        it('Validate header', () => {
            cy.getElement('navbar-conexaoQA')
                .should('have.attr', 'href', '/')
                .and('not.have.attr', 'target', '_blank')

            cy.getElement('navbar-QAs')
                .should('have.attr', 'href', '/perfis')
                .and('not.have.attr', 'target', '_blank')

            cy.getElement('navbar-about')
                .should('have.attr', 'href', '/sobre')
                .and('not.have.attr', 'target', '_blank')

            cy.getElement('navbar-register')
                .should('have.attr', 'href', '/cadastrar')
                .and('not.have.attr', 'target', '_blank')

            cy.getElement('navbar-login')
                .should('have.attr', 'href', '/login')
                .and('not.have.attr', 'target', '_blank')
        })

        it.skip('validate header using object', () => {
            
            const menus = [
                {seletor : 'navbar-conexaoQA', link:'/'},
                {seletor : 'navbar-QAs', link:'/perfis'},
                {seletor : 'navbar-about', link:'/sobre'},
                {seletor : 'navbar-register', link:'/cadastrar'},
                {seletor : 'navbar-login', link:'/login'}
            ]

            menus.forEach(({seletor,link}) => {
                validarMenu(seletor,link)
            })
        })

        ;[
            {seletor : 'navbar-conexaoQA', link:'/', menu: 'conexão QA'},
            {seletor : 'navbar-QAs', link:'/perfis', menu: 'QAs'},
            {seletor : 'navbar-about', link:'/sobre', menu: 'Sobre'},
            {seletor : 'navbar-register', link:'/cadastrar', menu: 'Cadastrar'},
            {seletor : 'navbar-login', link:'/login', menu: 'Login'}
        ].forEach(({seletor, link, menu}) => {

            it(`Validate menu ${menu} - Teste dinâmico`, () => {

                validarMenu(seletor,link,menu)
            })
        })
    })

    context('logged in', () => {
        

       
        beforeEach(() => {
            cy.login(Cypress.env('email'), Cypress.env('password'))
        })

        beforeEach(() => {
            cy.visit('/')
            
           
        })

       

        ;[
            { seletor: 'navbar-conexaoQA', link: '/', menu: ' ConexãoQA' },
            { seletor: 'navbar-QAs', link: '/perfis', menu: 'QAs' },
            { seletor: 'navbar-posts', link: '/posts', menu: 'Posts' },
            { seletor: 'navbar-dashboard', link: '/dashboard', menu: ' Dashboard' },
            { seletor: 'navbar-about', link: '/sobre', menu: 'Sobre' },
            { seletor: 'navbar-logout', link: '/', menu: ' Sair' },
        ].forEach(({seletor,link,menu}) => {

            it.only(`Validate menu ${menu} - Teste dinâmico`, () => {
                validarMenu(seletor,link,menu)
            })
        })
        
    })
    
})