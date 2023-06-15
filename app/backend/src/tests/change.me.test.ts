import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import TeamModel from '../../src/database/models/TeamModel';
import ITeams from '../Interfaces/Teams';

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import listTeamsMock from './mock/listTeamsMock';

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
    sinon.stub(TeamModel, 'findAll').resolves(listTeamsMock as any)
    const {status, body} = await chai.request(app)
    .post('/teams')
    .send()

    expect(status).to.equal(200);
    expect(body).to.deep.equal(listTeamsMock);
  });

  it('function getId return team', async () => {
    sinon.stub(TeamModel, 'findOne').resolves(listTeamsMock[1] as any)
    const {status, body} = await chai.request(app)
    .post('/teams/1')
    .send()

    expect(status).to.equal(200);
    expect(body).to.deep.equal(listTeamsMock[1]);
  })

  afterEach(sinon.restore);


});
