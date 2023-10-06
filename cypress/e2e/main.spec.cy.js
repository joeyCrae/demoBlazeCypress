const randomUsername = require('../randomInfo/randomUsername');
const randomPassword = require('../randomInfo/randomPassword');

// Use the random usernames functions
let username = randomUsername();

//Use the password function
let password = randomPassword();


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
  beforeEach('Login', () => {
        cy.fixture('data.json').then(function (data) {
              cy.visit('/');
              cy.login(data.loginUsername, data.loginPassword);
          
              cy.url().should('eq', 'https://www.demoblaze.com/');
        });
          
    })

  //Signup to DemoBlaze
  // it('SignUp', () => {
  //       cy.get("#signin2").should('have.text', 'Sign up').click();
  //       cy.get('.modal-content').should('have.class', 'modal-content').first().within(()=>{
  //               cy.get('.modal-header').children().should('have.class', 'modal-title').and('have.class', 'close');
  //               cy.get('.modal-body').children().children()
  //               .should('have.class', 'form-group').children().next()
  //               .should('have.attr', 'type', 'text');
  //               cy.xpath("//input[@id='sign-username']").type(username, {force: true}, {delay: 2000})
  //               cy.xpath("//label[@for='sign-password']").should("have.text", 'Password:')
  //               cy.xpath("//input[@id='sign-password']").should('have.attr','type', 'password').type(password, {force: true}, {delay: 2000})
  //               cy.get('.modal-footer').should('have.class', 'modal-footer');
  //               cy.xpath("//button[normalize-space()='Sign up']").should('have.attr', 'onClick', 'register()').click();
  //   })
  // });
  

  it('Add a product to cart', () => {
        cy.xpath("//a[normalize-space()='Samsung galaxy s6']").should('have.text','Samsung galaxy s6').click({force: true});
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

  it('Assert that sum of all products is correct', ()=>{ 
        cy.xpath("//a[normalize-space()='Samsung galaxy s6']").should('have.text','Samsung galaxy s6').click({force: true});
        cy.get('.product-content').find('#tbodyid').last().find('a').click().should('have.class','btn')
        cy.xpath("//a[text()='Home ']").click().should('have.attr','href')    
    
        cy.xpath("//a[text()='Nokia lumia 1520']").click().should('have.text','Nokia lumia 1520')
        cy.get('.product-content').find('#tbodyid').last().find('a').click().should('have.class','btn')
        cy.xpath('//a[text()="Cart"]').should('have.id','cartur').and('have.text','Cart').click()
        cy.url().should('include','cart.html')
        sumProducts();
  })

})

