import test from 'ava'
import request from 'supertest'
import app from '../../app'

test('Get creation page', async t => {
    let input = {name: 'Ze Name', status: true}

    const create = await request(app)
        .post('/r/create')
        .send(input)
    
    const res = await request(app)
        .get('/r/create')
    
    t.is(create.status, 302)
    t.is(res.status, 200)
})