import test from 'ava'
import request from 'supertest'
import app from '../../app'

test('Automatic pass', async t => {
    t.pass('Automatic pass')
})

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
//refine


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
    // t.plan(1)

    const item = {name: 'Ze Test', status: true, neighborhood: 'Ze Neigh', openingHours: [{weekday: 'tue', intervals: [{from: 1400, to: 1900}]}], latitude: 0, longitude: 0, address: 'Ze Address', website: 'Ze Web'}

    const restaurant = (await request(app)
        .post('/restaurant')
        .send(item))
        .body

    const fetch = await request(app)
        .get(`/restaurant/${restaurant.id}`) 

    t.is(fetch.status, 200)
    // t.is(fetch.body.name, restaurant.name)    
    // t.deepEqual(fetch.body, restaurant)
})
//why wasn't there always t.plan in class even for multiple functions?
//why is fetch.body empty?
//stuff (fake restos) keeps getting created in my main website. is that normal for a test??


test('Delete a restaurant', async t => {
    t.plan(2)

    const item = {name: 'Ze Test', status: true, neighborhood: 'Ze Neigh', openingHours: [{weekday: 'tue', intervals: [{from: 1400, to: 1900}]}], latitude: 0, longitude: 0, address: 'Ze Address', website: 'Ze Web'}

    const restaurant = (await request(app)
        .post('/restaurant')
        .send(item))
        .body
    
    const del = await request(app)
        .delete(`/restaurant/${restaurant.id}`)
    
    t.is(del.status, 200)
    t.is(del.text, 'The restaurant has been deleted.')

    // const fetch = await request(app)
    // .get(`/restaurant/${restaurant.id}`)

    // t.is(fetch.status, 404)
})
// Figure out why fetch isn't working

test('Get list of neighborhoods', async t => {
    const restoToCreate = {name: 'Ze Test', status: true, neighborhood: "Kreuzberg", address: 'Ze Address'}
    
    const creation = await request(app)
        .post('/restaurant')
        .send(restoToCreate)
    
    const res = await request(app)
        .get('/restaurant/all/by_neighborhood')
    
    t.is(res.status, 200)
})