const endpointurl='https://laenutaotlus.bigbank.ee/api/v1/loan/calculate'



const requestbody=
        {
        "maturity": 1,
        "amount": 2,
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
            url: "https://laenutaotlus.bigbank.ee/api/v1/session"

        }).then(response => {
            
            expect(response.status).eq(204)
            expect(response.body).to.not.be.null;

        })

    })

    it('Happy Path', ()=>{
     
        requestbody.maturity = 10;       
        requestbody.amount = 7000;
        cy.request({
            method: 'POST',
            url: endpointurl,
            body: requestbody,
        }).then(response => {    
             expect(response.status).eq(200)
             expect(response.headers).to.include(headers)
             expect(response.body.totalRepayableAmount).to.be.greaterThan(7000)
             expect(response.body.monthlyPayment).to.be.greaterThan(requestbody.maturity/requestbody.amount)
             expect(response.body.apr).to.be.greaterThan(0)

        })
 
    })


    it('Non-happy scenario with amount 0', ()=>{
      
        requestbody.amount = 0;

        cy.request({
            method:'POST', 
            url:endpointurl, 
            requestbody,failOnStatusCode: false})
            .then(function(response)
        {
             
             expect(response.status).eq(400)
             expect(response.headers).to.include(headers)
             expect(response.body[2].message).equals("should have required property 'amount'")

        })
    })

    it('Non-happy scenario with incorrect amount format', ()=>{
      
 
        requestbody.amount = "zü";

        cy.request({method:'POST', url:endpointurl, requestbody,failOnStatusCode: false}).then(function(response)
        {
             
             expect(response.status).eq(400)
             expect(response.headers).to.include(headers)
             expect(response.body[2].message).equals("should have required property 'amount'")
             expect(response.body[14].message).equals("should match exactly one schema in oneOf")
        })
    })

    it('Non-happy scenario with amount too large', ()=>{
      
        
        requestbody.amount=600000

        cy.request('POST', endpointurl, requestbody).then(function(response)
        {
             
             expect(response.status).eq(200)
             expect(response.headers).to.include(headers)
             expect(response.body.totalRepayableAmount).to.be.greaterThan(requestbody.amount)
             expect(response.body.monthlyPayment).to.be.greaterThan(requestbody.amount/requestbody.maturity)
             expect(response.body.apr).to.be.greaterThan(0)
             
        })
    })

})