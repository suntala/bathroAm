import test from 'ava'
import request from 'supertest'
import app from '../../app'
// import restaurant from '../../routes/restaurant'


test('Automatic pass', async t => {
    t.pass('Automatic pass')
})

test('Get list of restaurants', async t => {
    const restoToCreate = {name: 'Ze Test', address: 'Ze Address'}

    const creation = await request(app)
        .post('/restaurant/all')
        .send(restoToCreate)
    
    const res = await request(app)
        .get('/restaurant/all')
    
    t.is(res.status, 200)
})

test('Create new restaurant', async t => {
    const restoToCreate = {name: 'Ze Test', status: true, address: 'Ze Address'}

    const res = await request(app)
        .post('/all')
        .send(restoToCreate)
    
    t.is(res.status, 200)
    // t.is(res.body.name, restoToCreate.name)
    // t.is(res.body.status, restoToCreate.status)
    // t.is(res.body.address, restoToCreate.address)    
})

// test('Create new person', async t => {
//     const personToCreate = {name: 'Armagan Amcalar', age: 33}

//     const res = await request(app)
//         .post('/person')
//         .send(personToCreate)

//     t.is(res.status, 200)
//     t.is(res.body.name, personToCreate.name)
//     t.is(res.body.age, personToCreate.age)
// })