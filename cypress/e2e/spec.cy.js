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

describe('Calculate API Endpoint Test',()=>{

    it('Happy Path Scenario where amount and period are given in defined range', ()=>{
      
  

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
  }) 

    it('Happy Path Scenario where amount and period are in mid ranges', ()=>{
      
        cy.request({
            method: 'POST',
            url: endpointurl,
            body: requestbody
        }).then(response => {
             expect(response.status).eq(200)
             expect(response.headers).to.include(headers)
             expect(response.body.totalRepayableAmount).to.be.greaterThan(7500)
             expect(response.body.monthlyPayment).to.be.greaterThan(500)
             expect(response.body.apr).to.be.greaterThan(0)

        })

    })

//     it('Happy Path Scenario where amount and period  are max', ()=>{
      
//         let b1=new CalculatorDataAPI()
//         b1.maturity=144
//         b1.amount=250000
//         const requestbody=reqbody(b1)

//         cy.request({
//             method: 'POST',
//             url: endpointurl,
//             body: requestbody

//         }).then(response => {
//              expect(response.status).eq(200)
//              expect(response.headers).to.include({'content-type':'application/json; charset=utf-8','server':'cloudflare'})
//              expect(response.body.totalRepayableAmount).to.be.greaterThan(b1.amount)
//              expect(response.body.monthlyPayment).to.be.greaterThan(b1.amount/b1.maturity)
//              expect(response.body.apr).to.be.greaterThan(0)

//         })

//     })
  
    it('Unhappy Scenario where period is below 0', ()=>{
      
      
      cy.request({
        method: 'POST',
        url: endpointurl,
        body: requestbody
    }).then(response => {
            expect(response.status).eq(200)
            expect(response.headers).to.include(headers)
             expect(response.body.totalRepayableAmount).equals(0)
             expect(response.body.monthlyPayment).equals(0)
             expect(response.body.apr).to.be.greaterThan(0)

        })

    })

//     it('Unhappy Scenario where amount is 0', ()=>{
      
//         let b1=new CalculatorDataAPI()
//         b1.amount=0
//         const requestbody=reqbody(b1)

//         cy.request({
//             method: 'POST',
//             url: endpointurl,
//             body: requestbody,
//             failOnStatusCode: false

//         }).then(response => {
//              expect(response.status).eq(400)
//              expect(response.headers).to.include({'content-type':'application/json; charset=utf-8','server':'cloudflare'})
//              expect(response.body[2].message).equals("should have required property 'amount'")

//              //expect(response.body.error.code).eq(500)
//            //  expect(response.body.monthlyPayment).equals(0)
//              //expect(response.body.apr).to.be.greaterThan(0)

//         })
//     })

//     it('Unhappy Scenario where period is 0', ()=>{
      
//         let b1=new CalculatorDataAPI()
//         b1.maturity=0
//         const requestbody=reqbody(b1)

//         cy.request({
//             method: 'POST',
//             url: endpointurl,
//             body: requestbody

//         }).then(response => {
//              expect(response.status).eq(400)
//              expect(response.headers).to.include({'content-type':'application/json; charset=utf-8','server':'cloudflare'})
//              expect(response.body[0].message).equals("should have required property 'maturity'")

//         })
//     })


//     it('Unhappy Scenario where amount and period is float', ()=>{
      
//         let b1=new CalculatorDataAPI()
//         b1.maturity=0.6
//         b1.amount=0.98
//         const requestbody=reqbody(b1)

//         cy.request({
//             method: 'POST',
//             url: endpointurl,
//             body: requestbody

//         }).then(response => {
//              expect(response.status).eq(400)
//              expect(response.headers).to.include({'content-type':'application/json; charset=utf-8','server':'cloudflare'})
//              expect(response.body[0].message).equals("should have required property 'maturity'")
//              expect(response.body[2].message).equals("should have required property 'amount'")

//         })
//     })

//     it('Unhappy Scenario where amount is string', ()=>{
      
//         let b1=new CalculatorDataAPI()
//         b1.amount="^%^&34as"
//         const requestbody=reqbody(b1)

//         cy.request({
//             method: 'POST',
//             url: endpointurl,
//             body: requestbody

//         }).then(response => {
//              expect(response.status).eq(400)
//              expect(response.headers).to.include({'content-type':'application/json; charset=utf-8','server':'cloudflare'})
//              expect(response.body[2].message).equals("should have required property 'amount'")
//              expect(response.body[14].message).equals("should match exactly one schema in oneOf")
//         })
//     })

//     it('Unhappy Scenario where period is string', ()=>{
      
//         let b1=new CalculatorDataAPI()
//         b1.maturity="^%^&34as"
//         const requestbody=reqbody(b1)

//         cy.request({
//             method: 'POST',
//             url: endpointurl,
//             body: requestbody

//         }).then(response => {
//              expect(response.status).eq(400)
//              expect(response.headers).to.include({'content-type':'application/json; charset=utf-8','server':'cloudflare'})
//              expect(response.body[0].message).equals("should have required property 'maturity'")
//              expect(response.body[14].message).equals("should match exactly one schema in oneOf")
//         })
//     })

//     it('Unhappy Scenario where monthly payment day is wrong', ()=>{
      
//         let b1=new CalculatorDataAPI()
//         b1.monthlyPaymentDay=1
//         const requestbody=reqbody(b1)

//         cy.request({
//             method: 'POST',
//             url: endpointurl,
//             body: requestbody

//         }).then(response => {
//              expect(response.status).eq(200)
//              expect(response.headers).to.include({'content-type':'application/json; charset=utf-8','server':'cloudflare'})
//              expect(response.body.totalRepayableAmount).to.be.greaterThan(b1.amount)
//              expect(response.body.monthlyPayment).to.be.greaterThan(b1.amount/b1.maturity)
//              expect(response.body.apr).to.be.greaterThan(0)
             
//         })
//     })


//     it('Unhappy Scenario where Loan amount is above maximum', ()=>{
      
//         let b1=new CalculatorDataAPI()
//         b1.amount=300000
//         const requestbody=reqbody(b1)

//         cy.request('POST', endpointurl, requestbody).then(function(response)
//         {
             
//              expect(response.status).eq(200)
//              expect(response.headers).to.include({'content-type':'application/json; charset=utf-8','server':'cloudflare'})
//              expect(response.body.totalRepayableAmount).to.be.greaterThan(b1.amount)
//              expect(response.body.monthlyPayment).to.be.greaterThan(b1.amount/b1.maturity)
//              expect(response.body.apr).to.be.greaterThan(0)
             
//         })
//     })



//     it('Unhappy Scenario where Loan period is above maximum', ()=>{
      
//         let b1=new CalculatorDataAPI()
//         b1.maturity=150
//         const requestbody=reqbody(b1)

//         cy.request('POST', endpointurl, requestbody).then(function(response)
//         {
             
//              expect(response.status).eq(200)
//              expect(response.headers).to.include({'content-type':'application/json; charset=utf-8','server':'cloudflare'})
//              expect(response.body.totalRepayableAmount).to.be.greaterThan(b1.amount)
//              expect(response.body.monthlyPayment).to.be.greaterThan(b1.amount/b1.maturity)
//              expect(response.body.apr).to.be.greaterThan(0)
             
//         })
//     })

// 