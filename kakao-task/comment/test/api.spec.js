import chai from 'chai';
import chaiHttp from 'chai-http';

import { expect } from 'chai';

chai.use(chaiHttp);

describe('Test Comment API', () => {
  it('Should GET to /api/comments', async () => {
    const res = await chai
      .request('http://localhost:9999')
      .get('/api/comments');

    expect(res).to.be.a('object');
    expect(res.body).to.be.a('array');
  }).timeout(10000);

  it('Should GET to /api/comments/page/:page', async () => {
    const res = await chai
      .request('http://localhost:9999')
      .get('/api/comments/page/1');

    expect(res).to.be.a('object');
    expect(res.body).to.be.a('array');
  }).timeout(10000);

  it('Should GET []to /api/comments/page/{ Infinity }', async () => {
    const res = await chai
      .request('http://localhost:9999')
      .get('/api/comments/page/99999');

    expect(res).to.be.a('object');
    expect(res.body).to.be.a('array');
  }).timeout(10000);

  it('Should POST to /api/comments', async () => {
    const TEST_FORM = {
      author: 'test001',
      comment: 'test from chai',
    };

    await chai
      .request('http://localhost:9999')
      .post('/api/comments/')
      .send(TEST_FORM);

    const res = await chai
      .request('http://localhost:9999')
      .get('/api/comments/page/1');

    expect(res).to.be.a('object');
    expect(res.body).to.be.a('array');
    expect(res.body[0].author).to.be.eql(TEST_FORM.author);
    expect(res.body[0].comment).to.be.eql(TEST_FORM.comment);
  }).timeout(10000);
});
