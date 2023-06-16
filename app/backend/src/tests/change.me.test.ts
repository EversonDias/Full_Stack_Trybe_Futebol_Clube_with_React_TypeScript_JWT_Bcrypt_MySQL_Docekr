import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeTeam from '../../src/database/models/TeamModel';
import SequelizeUser from '../../src/database/models/UserModel';
import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import listTeamsMock from './mock/listTeamsMock';
import { userMock } from './mock/userMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('tests', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  it('function getAll return all teams', async () => {
    sinon.stub(SequelizeTeam, 'findAll').resolves(listTeamsMock as any)
    const {status, body} = await chai.request(app)
    .post('/teams')
    .send()

    expect(status).to.equal(200);
    expect(body).to.deep.equal(listTeamsMock);
  });

  it('function getId return team', async () => {
    sinon.stub(SequelizeTeam, 'findOne').resolves(listTeamsMock[1] as any)
    const {status, body} = await chai.request(app)
    .post('/teams/1')
    .send()

    expect(status).to.equal(200);
    expect(body).to.deep.equal(listTeamsMock[1]);
  })

  it('login return token valid', async () => {
    sinon.stub(SequelizeUser, 'findOne').resolves(userMock as any)
    const {status, body} = await chai.request(app)
    .post('/login')
    .send({
      email: 'test@test.com',
      password: '123456'
    })

    expect(status).to.equal(200);
    expect(body).to.haveOwnProperty('token');
  })

  it('not has email or password', async () => {
    sinon.stub(SequelizeUser, 'findOne').resolves(userMock as any)
    const {status, body} = await chai.request(app)
    .post('/login')
    .send({
      password: '123456'
    })

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ message: "All fields must be filled" });
  })

  it('email not authorized', async () => {
    sinon.stub(SequelizeUser, 'findOne').resolves(userMock as any)
    const {status, body} = await chai.request(app)
    .post('/login')
    .send({
      email: 'notTest@test.com',
      password: '123456'
    })

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: "Invalid email or password" });
  })

  afterEach(sinon.restore);


});
