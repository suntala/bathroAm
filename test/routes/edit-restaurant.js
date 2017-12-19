import test from 'ava'
import request from 'supertest'
import app from '../../app'

test('Get creation page', async t => {
    let input = {name: 'Ze Name', status: true}

    const create = await request(app)
        .post('/inputform/create')
        .send(input)
    
    const res = await request(app)
        .get('/inputform/create')
    
    t.is(create.status, 302)
    t.is(res.status, 200)
})

test('Get editing page', async t => {
    let resto = {name: 'Ze Name', status: true}

    const restaurant = (await request(app)
        .post('/restaurant')
        .send(resto))
        .body

    const res = await request(app)
        .get(`/inputform/${restaurant.id}/edit`)
    
    t.is(res.status, 200)
    t.regex(res.text, /Ze Name/)
})

test('Edit a restaurant', async t => {
    let resto = {name: 'Ze Name', status: true}
    let restoNew = {name: 'Ze New Name', status: true}

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
//le dernier marche a chaque fois??















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