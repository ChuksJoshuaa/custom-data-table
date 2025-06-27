describe("Form Builder Component", () => {
  beforeEach(() => {
    cy.visit("/form-builder");
  });

  it("should render form fields from config", () => {
    cy.get("form").should("exist");
    cy.contains("label", "Name");
    cy.contains("label", "Email");
    cy.contains("label", "Gender");
  });

  it("should validate required fields", () => {
    cy.get('button[type="submit"]').click();
    cy.contains("Name is required");
    cy.contains("Email is required");
  });

  it("should show conditional field", () => {
    cy.get('select[name="gender"]').select("Female");
    cy.contains("label", "Phone Number").should("exist");
  });

  it("should submit valid form data", () => {
    cy.get('input[name="name"]').type("Test User");
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('button[type="submit"]').click();
    cy.get("pre").should("contain", "Test User");
  });
});
