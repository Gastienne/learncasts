describe('test api post', ()  => {
it('create user test', () => {
    cy.request({
        method:'POST',
        url:'https://reqres.in/api/users ',
        body:{
            "name": "morpheus",
            "job": "leader"
        }
    }).then((res)=> {
        expect(res.status).to.eq(201)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        expect(res.body.data).has.property('name','morpheus')
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        expect(res.body.data).has.property('job','leader')
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        expect(res.body.data).has.property('name','morpheus')
    })
})

});