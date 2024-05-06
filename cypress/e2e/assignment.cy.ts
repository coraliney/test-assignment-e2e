describe("the site in itself", () => {
  it("should update page everytime I try a new test", () => {
    cy.visit("http://localhost:1234");
  });
});

describe("exploring search field", () => {
  it("should type two letters", () => {
    cy.visit("http://localhost:1234");
    cy.get("input").type("fo").should("have.value", "fo");
  });
});

describe("exploring movies", () => {
  it("should search for movies with born in title", () => {
    cy.intercept("GET", "http://omdbapi.com/*").as("getmovie")
    cy.visit("http://localhost:1234");
    cy.get("input").type("born");
    cy.get("button").click();
    cy.wait("@getmovie").its("request.url").should("contain", "s=born");
  });
  it("Should find first h3", () => {
    cy.intercept("GET", "http://omdbapi.com/*");
    cy.visit("http://localhost:1234");
    cy.get("input").type("Star");
    cy.get("button").click();
    cy.get("h3:first").contains("New");
  });
});

describe("exploring movies with an error", () => {
  it("should display a message of error when user have nothing as input", () => {
    cy.visit("http://localhost:1234");
    cy.get("input").clear(); //clearar min input
    cy.get("button").click();
    cy.get("input").should("have.value", "");
    cy.get("p").contains("Inga sökresultat att visa");
  });

  it("should display empty list when user writes no-name movie", () => {
    cy.visit("http://localhost:1234");
    cy.get("input").clear(); //clearar min input igen
    cy.get("input").type("there is no movie here");
    cy.get("input").should("have.value", "there is no movie here");
    cy.get("button").click();
    cy.get("div#movie-container > div").should("have.length", 0);
  });
});


describe("exploring movies with an error", () => {
  it("should get errormsg400", () => {
    cy.request({
    method: "GET",
    url: "http://omdbapi.com/*",
    failOnStatusCode: false,    
  }).as("error");
  cy.get("@error").its("status").should("equal", 400);
  });
})


describe("movieApp checkup, looking for two divs", () => {
  it("should click for the movie", () => {
    cy.visit("http://localhost:1234");
    cy.get("input").type("Wedding Singer");
    cy.get("#search").click(); //mitt anrop
    cy.get("#movie-container>div").should("have.length", 2);
  });
});
