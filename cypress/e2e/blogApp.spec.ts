describe("Blog App", () => {
  beforeEach(() => {
    cy.visit("/blog");
  });

  it("should display list of posts", () => {
    cy.get("ul li").should("have.length.at.least", 1);
  });

  it("should create new post", () => {
    cy.get("a").contains("New Post").click();
    cy.get('input[name="title"]').type("New Test Post");
    cy.get('textarea[name="body"]').type("This is test content");
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/blog");
    cy.contains("New Test Post");
  });

  it("should delete post", () => {
    cy.get("ul li:first-child button").contains("Delete").click();
    cy.on("window:confirm", () => true);
    cy.get("ul li:first-child").should("not.contain", "Updated Title");
  });
});
