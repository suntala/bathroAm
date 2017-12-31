import test from 'ava'
import request from 'supertest'
import app from '../../app'


test('Get list of restaurants', async t => {
    const restoToCreate = {name: 'Ze Test', address: 'Ze Address'}

    const creation = await request(app)
        .post('/restaurant')
        .send(restoToCreate)
    
    const res = await request(app)
        .get('/restaurant/all')
    
    t.is(res.status, 200)
    t.regex(res.text, /Ze Address/)
})


test('Create new restaurant', async t => {
    const restoToCreate = {name: 'Ze Test', status: true, address: 'Ze Address'}

    const res = await request(app)
        .post('/restaurant')
        .send(restoToCreate)

    t.is(res.status, 200)
    t.is(res.body.name, restoToCreate.name)
    t.is(res.body.status, restoToCreate.status)
    t.is(res.body.address, restoToCreate.address)    
})


test('Fetch a restaurant', async t => {
    const item = {name: 'Ze Test', status: true, neighborhood: 'Ze Neigh', openingHours: [{weekday: 'tue', intervals: [{from: 1400, to: 1900}]}], latitude: 0, longitude: 0, address: 'Ze Address', website: 'Ze Web'}

    const restaurant = (await request(app)
        .post('/restaurant')
        .send(item))
        .body

    const fetch = await request(app)
        .get(`/restaurant/${restaurant.id}`) 

    t.is(fetch.status, 200)
    t.regex(fetch.text, /Ze Test/)
})


test('Delete a restaurant', async t => {
    t.plan(3)

    const item = {name: 'Ze Test', status: true, neighborhood: 'Ze Neigh', openingHours: [{weekday: 'tue', intervals: [{from: 1400, to: 1900}]}], latitude: 0, longitude: 0, address: 'Ze Address', website: 'Ze Web'}

    const restaurant = (await request(app)
        .post('/restaurant')
        .send(item))
        .body
    
    const del = await request(app)
        .delete(`/restaurant/${restaurant.id}`)
    
    t.is(del.status, 200)
    t.is(del.text, 'The restaurant has been deleted.')

    const fetch = await request(app)
    .get(`/restaurant/${restaurant.id}`)

    t.is(fetch.status, 404)
})

test('Get list of neighborhoods', async t => {
    const restoToCreate = {name: 'Ze Test', status: true, neighborhood: "Kreuzberg", address: 'Ze Address'}
    
    const creation = await request(app)
        .post('/restaurant')
        .send(restoToCreate)
    
    const res = await request(app)
        .get('/restaurant/all/by_neighborhood')
    
    t.is(res.status, 200)
})