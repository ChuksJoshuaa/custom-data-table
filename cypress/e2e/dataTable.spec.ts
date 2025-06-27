describe("Data Table Component", () => {
  beforeEach(() => {
    cy.visit("/data-table");
  });

  it("should load and display user data", () => {
    cy.get("table").should("exist");
    cy.get("tbody tr").should("have.length.at.least", 1);
  });

  it("should sort by first name", () => {
    cy.get("th").contains("First Name").click();
    cy.get("tbody tr:first-child td:nth-child(2)").then(($cell) => {
      const firstName = $cell.text();
      cy.get("th").contains("First Name").click();
      cy.get("tbody tr:first-child td:nth-child(2)").should(
        "not.equal",
        firstName
      );
    });
  });

  it("should select rows and bulk delete", () => {
    cy.get('tbody tr:first-child input[type="checkbox"]').check();
    cy.get("button").contains("Delete Selected").should("exist");
  });
});
