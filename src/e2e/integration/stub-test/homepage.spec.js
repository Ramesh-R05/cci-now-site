describe('@stub @high homepage', () => {
    before(() => {
        cy.visit('/');
    });

    it('loads', () => {
        cy.url().should('contain', '/');
    });
});
