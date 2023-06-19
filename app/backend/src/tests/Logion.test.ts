import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeUser from '../database/models/SequelizeUser';
import { userMock } from './mock/userMock';
import StatusHTTP from '../utils/StatusHTTP';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login route test', () => {
  it('returns a valid token', async () => {
    const LoginBuild = SequelizeUser.build(userMock);
    sinon.stub(SequelizeUser, 'findOne').resolves(LoginBuild);
    const {email} = userMock;
    const { status, body } = await chai.request(app)
      .post('/login')
      .send({email, password: 'secret_admin'});
  
    expect(status).to.equal(StatusHTTP.success);
    expect(body).to.deep.property('token');
  })

  it("returns an error message if you don't have email or password", async () => {
    const { status, body } = await chai.request(app)
      .post('/login')
      .send({ password: 'secret_admin'});
  
    expect(status).to.equal(StatusHTTP.badRequest);
    expect(body).to.deep.equal({ message: 'All fields must be filled' });
  })

  it('returns an unauthorized error message', async () => {
    const {email} = userMock;
    const { status, body } = await chai.request(app)
      .post('/login')
      .send({ email: 'email@invalid.com', password:  'secret_admin'});
      
    expect(status).to.equal(StatusHTTP.unauthorized);
    expect(body).to.deep.equal({ message: 'Invalid email or password' });
  })

  it('returns an unauthorized error message case 2', async () => {
    const LoginBuild = SequelizeUser.build(userMock);
    sinon.stub(SequelizeUser, 'findOne').resolves(LoginBuild);
    const {email} = userMock;
    const { status, body } = await chai.request(app)
      .post('/login')
      .send({email, password: 'password_invalid'});
  
    expect(status).to.equal(StatusHTTP.unauthorized);
    expect(body).to.deep.equal({ message: 'Invalid email or password' });
  })

  it('returns an unauthorized error message case 3', async () => {
    const {email} = userMock;
    const { status, body } = await chai.request(app)
      .post('/login')
      .send({ email: 'email_invalid', password:  'secret_admin'});
      
    expect(status).to.equal(StatusHTTP.unauthorized);
    expect(body).to.deep.equal({ message: 'Invalid email or password' });
  })

  it('returns an unauthorized error message case 4', async () => {
    const {email} = userMock;
    const { status, body } = await chai.request(app)
      .post('/login')
      .send({ email, password:  '123'});
      
    expect(status).to.equal(StatusHTTP.unauthorized);
    expect(body).to.deep.equal({ message: 'Invalid email or password' });
  })

  afterEach(sinon.restore);
})