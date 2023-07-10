




describe('Calculations endpoint',()=>{
 
      it('loan application session healthcheck', ()=>{
    
        cy.request({
            method: 'GET',
            url: "https://laenutaotlus.bigbank.ee/api/v1/session"

        }).then(response => {
            
            expect(response.status).eq(204)
            expect(response.body).to.not.be.null;

        })

    })


    it('Happy Path', ()=>{
        
        cy.requestWith(3, 200)}).then(response => {

            
             
             expect(response.status).eq(200)
             expect(response.headers).to.include(headers)
             expect(response.body.totalRepayableAmount).to.be.greaterThan(7000)
             expect(response.body.monthlyPayment).to.be.greaterThan(30)
             expect(response.body.apr).to.be.greaterThan(0)

        })
 
    })
