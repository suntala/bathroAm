import test from 'ava'
import request from 'supertest'
import app from '../../app'

test('Get creation page', async t => {
    let input = {name: 'Ze Name', status: true, timeFrom1: '10:00', timeTo1: '15:00' , weekday: ['mon'], confirmation: true, address: "Bergmannstr. 102, 10961 "}

    const create = await request(app)
        .post('/inputform/create')
        .send(input)
    
    const res = await request(app)
        .get('/inputform/create')
    
    t.is(create.status, 302)
    t.is(res.status, 200)
})
//why didn't we add '.body' here also?? 

test('Get editing page with 4 digit time', async t => {
    let resto = {name: 'Ze Name', status: true, openingHours: [{weekday: 'fri', intervals: [{from: 1400, to: 1900}]}]}

    const restaurant = (await request(app)
        .post('/restaurant')
        .send(resto))
        .body

    const res = await request(app)
        .get(`/inputform/${restaurant.id}/edit`)
    
    t.is(res.status, 200)
    t.regex(res.text, /Ze Name/)
})

test('Get editing page with 3 digit time', async t => {
    let resto = {name: 'Ze Name', status: true, openingHours: [{weekday: 'fri', intervals: [{from: 700, to: 1900}]}]}

    const restaurant = (await request(app)
        .post('/restaurant')
        .send(resto))
        .body

    const res = await request(app)
        .get(`/inputform/${restaurant.id}/edit`)
    
    t.is(res.status, 200)
    t.regex(res.text, /Ze Name/)
})


test('Edit a restaurant with confirmation = true', async t => {
    let resto = {name: 'Ze Name', status: true, openingHours: [{weekday: 'fri', intervals: [{from: 1400, to: 1900}]}]}
    let restoNew = {name: 'Ze New Name', status: true, timeFrom1: '10:00', timeTo1: '15:00' , weekday: ['mon'], confirmation: true, address: "Bergmannstr. 102, 10961 "}

    const restaurant = (await request(app)
        .post('/restaurant')
        .send(resto))
        .body

    const res = await request(app)
        .post(`/inputform/${restaurant.id}/edit`)
        .send(restoNew)
    
    const newRes = await request(app)
        .get(`/inputform/${restaurant.id}/edit`)

    t.is(res.status, 302)
    t.regex(newRes.text, /Ze New Name/)
})
// //le dernier marche a chaque fois??


test('Edit a restaurant with confirmation = false', async t => {
    let resto = {name: 'Ze Name', status: true, openingHours: [{weekday: 'fri', intervals: [{from: 1400, to: 1900}]}]}
    let restoNew = {name: 'Ze New Name', status: true, timeFrom1: '10:00', timeTo1: '15:00' , timeFrom2: '18:00', timeTo2: '22:00' , weekday: ['mon'], confirmation: false, address: "Bergmannstr. 102, 10961 "}

    const restaurant = (await request(app)
        .post('/restaurant')
        .send(resto))
        .body

    const res = await request(app)
        .post(`/inputform/${restaurant.id}/edit`)
        .send(restoNew)
    
    const newRes = await request(app)
        .get(`/inputform/${restaurant.id}/edit`)

    t.is(res.status, 302)
    t.regex(newRes.text, /Ze New Name/)
})


test('Get main editing page', async t => {
    let participant = {name: 'Ze Name', status: true, timeFrom1: '10:00', timeTo1: '15:00' , weekday: ['mon'], confirmation: true, address: "Bergmannstr. 102, 10961 "}
//add second maybe...
    const create = await request(app)
        .post('/restaurant')
        .send(participant)
    
    const res = await request(app)
        .get('/inputform/edit')
    
    t.is(create.status, 200)
    t.is(res.status, 200)
})











// test('Get main editing page', async t => {
//     let participant = {name: 'Ze Name', status: true, timeFrom1: '10:00', timeTo1: '15:00' , weekday: ['mon'], confirmation: true, address: "Bergmannstr. 102, 10961 "}

//     const create = await request(app)
//         .post('/inputform/create')
//         .send(input)
    
//     const res = await request(app)
//         .get('/inputform/create')
    
//     t.is(create.status, 302)
//     t.is(res.status, 200)
// })



///////////////////////////

// test('Get creation page', async t => {
//     let input = {name: 'Ze Name', status: true}

//     const create = await request(app)
//         .post('/inputform/create')
//         .send(input)
    
//     const res = await request(app)
//         .get('/inputform/create')
    
//     t.is(create.status, 302)
//     t.is(res.status, 200)
// })

// test('Get editing page', async t => {
//     let resto = {name: 'Ze Name', status: true}

//     const restaurant = (await request(app)
//         .post('/restaurant')
//         .send(resto))
//         .body

//     const res = await request(app)
//         .get(`/inputform/${restaurant.id}/edit`)
    
//     t.is(res.status, 200)
//     t.regex(res.text, /Ze Name/)
// })

// test('Edit a restaurant', async t => {
//     let resto = {name: 'Ze Name', status: true}
//     let restoNew = {name: 'Ze New Name', status: true}

//     const restaurant = (await request(app)
//         .post('/restaurant')
//         .send(resto))
//         .body

//     const res = await request(app)
//         .post(`/inputform/${restaurant.id}/edit`)
//         .send(restoNew)
    
//     const newRes = await request(app)
//         .get(`/inputform/${restaurant.id}/edit`)

//     t.is(res.status, 302)
//     t.regex(newRes.text, /Ze New Name/)
// })
// //le dernier marche a chaque fois??



// .get(`/restaurant/${restaurant.id}`)


// test('Edit a restaurant', async t => {
//     let resto = {name: 'Ze Name', status: true}

//     const restaurant = (await request(app)
//         .post('/restaurant')
//         .send(resto))
//         .body

//     const req = {name: 'Ze New Name', status: true}

//     const res = await request(app)
//         .post(`/r/${restaurant.id}/edit`)

//     t.is(res.status, 302)
    

// })