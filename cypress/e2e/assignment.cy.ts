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
    cy.visit("http://localhost:1234");
    cy.get("input").type("born");
    cy.get("button").click();
  });
  it("Should find first h3", () => {
    cy.visit("http://localhost:1234");
    cy.intercept("GET", "http://omdbapi.com/*");
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
  });

  it("should display empty list when user writes no-name movie", () => {
    cy.visit("http://localhost:1234");
    cy.get("input").clear(); //clearar min input igen
    cy.get("input").type("there is no movie here");
    cy.get("input").should("have.value", "there is no movie here");
    cy.get("button").click();
    cy.get("p").should("have.length", 0);
  });
});

describe("the site in itself", () => {
  //lägger till denna igen annars fungerar inte koden nedanför. Försökt hitta en clearkod som "startar om/laddar om" sidan
  it("should update page everytime I try a new test", () => {
    cy.visit("http://localhost:1234");
  });
});

describe("exploring movies with an error", () => {
  it("Should simulate server error", () => {
    cy.visit("http://localhost:1234");
    cy.get("#searchText")
      .type("error movie")
      .should("have.value", "error movie");
    cy.intercept("GET", "http://omdbapi.com/*", { statusCode: 500 }).as(
      "serverError"
    );
    cy.get("#search").click();
    cy.wait("@serverError");
    cy.contains("Inga sökresultat att visa");
  });
});

describe("movieApp checkup, looking for two divs", () => {
  it("should click for the movie", () => {
    cy.visit("http://localhost:1234");
    cy.get("input").type("Wedding Singer");
    cy.get("#search").click(); //mitt anrop
    cy.get("#movie-container>div").should("have.length", 2);
  });
});
