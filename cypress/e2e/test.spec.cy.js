function sumProducts(){
  let totalSum = 0;

  cy.get('#tbodyid td:nth-child(3)').should('have.length',2).each(($el,index,array) => {
    const itemPrice = parseInt($el.text());
    cy.log(itemPrice);

    totalSum += itemPrice;
    cy.wrap(totalSum)
  });

  cy.get('#totalp').invoke('text').then(($toText)=>{
    cy.wrap(totalSum).should('eq',Number($toText))
  })
}

describe('Demo Blaze', () => {
  beforeEach('passes', () => {
    cy.visit('/')
    cy.wait(2000)
  })

  it('Add a product to cart', () => {
    cy.xpath("//a[text()='Samsung galaxy s6']").click().should('have.text','Samsung galaxy s6')
    cy.get('.product-content').find('#tbodyid').last().find('a').click().should('have.class','btn')
    cy.on('window:alert', (DemoAlert) => {
      expect(DemoAlert).to.contains('Product added');
    });
    cy.screenshot('.product-content')
    cy.xpath('//a[text()="Cart"]').should('have.id','cartur').and('have.text','Cart').click()
    cy.get(".modal").invoke('css','opacity','100', {force : true})
    cy.get(".modal").invoke('css','display','block', {force : true})
    cy.get('#videoModal > .modal-dialog > .modal-content > .modal-footer > .btn').click({force: true})
    cy.get(".modal-dialog").find('.modal-content').find('form')
    .find('[type="text"]')
    .get("#name").type("Joel Bamfo", {force:true})
    .get("#country").type("Ghana", {force:true})
    .get("#city").type("Takoradi", {force:true})
    .get("#card").type("12345678910", {force:true})
    .get("#month").type("June", {force:true})
    .get("#year").type("2024", {force:true})
    .xpath("//button[normalize-space()='Purchase']").click({force: true})
    // .parents('form').submit()
    cy.get('.sweet-alert').should('be.visible').and('have.attr','style', 'display: block; margin-top: -219px;')
  });

  it.only('Assert that sum of all products is correct', ()=>{ 
    cy.xpath("//a[text()='Samsung galaxy s6']").click().should('have.text','Samsung galaxy s6')
    cy.get('.product-content').find('#tbodyid').last().find('a').click().should('have.class','btn')
    cy.xpath("//a[text()='Home ']").click().should('have.attr','href')    
    
    cy.xpath("//a[text()='Nokia lumia 1520']").click().should('have.text','Nokia lumia 1520')
    cy.get('.product-content').find('#tbodyid').last().find('a').click().should('have.class','btn')
    cy.xpath('//a[text()="Cart"]').should('have.id','cartur').and('have.text','Cart').click()
    cy.url().should('include','cart.html')
    sumProducts();
  })

})

