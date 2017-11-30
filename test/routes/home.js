import test from 'ava'
import request from 'supertest'
import app from '../../app'


test('Get homepage', async t => {
    let input = {address: 'Rosa Luxemburg Str. 7, 10178', time: '15:00', weekday: "tue", threshold: 5}

    const creation = (await request(app)
        .post('/')
        .send(input))
        .body
        
    const res = await request(app)
        .get('/')

    t.is(res.status, 200)
})