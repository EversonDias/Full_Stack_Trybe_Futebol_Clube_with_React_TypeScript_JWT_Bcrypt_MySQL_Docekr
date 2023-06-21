// @ts-ignore
import chaiHttp = require('chai-http');
import * as sinon from 'sinon';
import * as chai from 'chai';
import {App} from '../app';
import StatusHTTP from '../utils/StatusHTTP';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { listTeamsHome, listTeamsAway, listTeamsHomeMock, listTeamsAwayMock } from './mock/listTeamsStatisticsMock';
chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('Matches test', () => {
  it('return all statistics team home', async () => {
    sinon.stub(SequelizeMatch, 'findAll').resolves(listTeamsHomeMock as any);
    const {status, body} = await chai.request(app).get('/leaderboard/home');
    
    expect(status).to.equal(StatusHTTP.success);
    expect(body).to.deep.equal(listTeamsHome);
  })
  
  it('return all statistics team away', async () => {
    sinon.stub(SequelizeMatch, 'findAll').resolves(listTeamsAwayMock as any);
    const {status, body} = await chai.request(app).get('/leaderboard/away');

    expect(status).to.equal(StatusHTTP.success);
    expect(body).to.deep.equal(listTeamsAway);
  })

  afterEach(sinon.restore);
})