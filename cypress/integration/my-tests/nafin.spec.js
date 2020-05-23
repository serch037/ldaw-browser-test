describe("nafin.gob.mx", () => {
    describe('Page loads', () => {
        it('Sould complete use-case', () => {
            cy.visit("https://www.nafin.com/portalnf/content/herramientas-de-negocio/simulador-de-creditos/simulador-de-creditos.do");
            cy.get('#dispDate')
                .type('05/05/2020');
            cy.get('#btn').click(); // Hack to dismiss datepicker
            cy.get('#creditAmount').clear().type("20000");
            cy.get('#paymentMethod').select("Mensual");

            cy.get('#period').select("2 años");
            cy.get('#rate').clear().type(15.0);

            cy.contains('Calcular').click()

            cy.get('#encuestaWindow').then($modal => {
            if ($modal.is(':visible')) {
                cy.contains('Ahora no').click()
            }
            })
            cy.get('.modal-encuesta-body')
            .should('not.be.visible')

            cy.get('#resultadosSimulador').get('tbody').find('tr').should('have.length', 24)

        })
    });
});