const endpointurl='https://laenutaotlus.bigbank.ee/api/v1/loan/calculate'



const requestbody=
      {
        "maturity": 14,
        "amount": 7000,
        "productType": "SMALL_LOAN_EE01",
        "interestRate": 13.8,
        "monthlyPaymentDay": 15,
        "administrationFee": 2.99,
        "conclusionFee": 100,
        "currency": "EUR"  
       }
 
const headers = 
    { 
      'content-type':'application/json; charset=utf-8','server':'cloudflare',
    
    }

describe('Calculations endpoint',()=>{

      it('loan application session healthcheck', ()=>{
    
        cy.request({
            method: 'GET',
            url: "https://laenutaotlus.bigbank.ee/api/v1/session",
            body: requestbody

        }).then(response => {
            
            expect(response.status).eq(204)
            expect(response.body).to.not.be.null;

        })

    })


    it('Happy Path', ()=>{
      
  

        cy.request({
            method: 'POST',
            url: endpointurl,
            body: requestbody

        }).then(response => {
             
             expect(response.status).eq(200)
             expect(response.headers).to.include(headers)
             expect(response.body.totalRepayableAmount).to.be.greaterThan(7000)
             expect(response.body.monthlyPayment).to.be.greaterThan(30)
             expect(response.body.apr).to.be.greaterThan(0)

        })

    })
  


    it('Non-happy path', ()=>{
        
        
        cy.request({
          method: 'POST',
          url: endpointurl,
          body: requestbody
      }).then(response => {
              expect(response.status).eq(200)
              expect(response.headers).to.include(headers)
              expect(response.body.totalRepayableAmount).equals(7699.7)
              expect(response.body.monthlyPayment).equals(0)
              expect(response.body.apr).to.be.greaterThan(0)

          })

      })
    }) 
 


    it('body is missing', ()=>{
        

        cy.request({
            method: 'POST',
            url: endpointurl,
            body: requestbody

        }).then(response => {
             expect(response.status).eq(400)
             expect(response.headers).to.include({'content-type':'application/json; charset=utf-8','server':'cloudflare'})
             expect(response.body[0].message).equals("should have required property 'maturity'")
             expect(response.body[14].message).equals("should match exactly one schema in oneOf")
        })
    })


