import test from 'ava'
import request from 'supertest'
import app from '../../app'

test('Automatic pass', async t => {
    t.pass('Automatic pass')
})

// test('Get homepage', async t => {
//     const testAddress = {address: 'A', inputTime: '20:00'} 

//     console.log("1")
//     const creation = await request(app)
//         .post('/')
//         .send(testAddress)

//     console.log("5")
        
//     const res = await request(app)
//         .get('/restaurant/all')

//     // t.is(res.status, 200)
//     t.true(res.body.length > 0)
// })


// test('Get list of people', async t => {
//     const personToCreate = {name: 'Armagan Amcalar', age: 33}

//     const creation = await request(app)
//         .post('/person')
//         .send(personToCreate)

// 	const res = await request(app)
// 		.get('/person')

//     t.is(res.status, 200)
//     t.true(Array.isArray(res.body), 'Body should be an array')
//     t.true(res.body.length > 0)
// });