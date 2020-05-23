describe("nafin.gob.mx", () => {
  it("Sould complete use-case", () => {
    cy.visit(
      "https://www.nafin.com/portalnf/content/herramientas-de-negocio/simulador-de-creditos/simulador-de-creditos.do"
    );
    cy.get("#dispDate").type("05/05/2020").should('have.value',"05/05/2020");
    cy.get("#btn").click(); // Hack to dismiss datepicker

    cy.get("#creditAmount").clear().type("20000").should('have.value',"20000");

    cy.get("#paymentMethod").select("Mensual").should('have.value',"1");

    cy.get("#period").select("2 años").should('have.value', "2");
    cy.get("#rate").clear().type(15.0).should('have.value', 15.0);

    cy.contains("Calcular").click();

    cy.get("#encuestaWindow").then(($modal) => {
      if ($modal.is(":visible")) {
        cy.contains("Ahora no").click();
      }
    });
    cy.get(".modal-encuesta-body").should("not.be.visible");

    cy.get("#resultadosSimulador")
      .get("tbody")
      .find("tr")
      .should("have.length", 24);
  });
});
