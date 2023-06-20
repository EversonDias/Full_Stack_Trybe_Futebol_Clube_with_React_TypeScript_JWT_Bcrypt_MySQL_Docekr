// @ts-ignore
import chaiHttp = require('chai-http');
import * as sinon from 'sinon';
import * as chai from 'chai';
import {App} from '../app';
import StatusHTTP from '../utils/StatusHTTP';
import {listMatchesMockModel, listMatchesResolver, listMatchesTrue, listMatchesTrueModel } from './mock/listMatchesMock';
import SequelizeMatch from '../database/models/SequelizeMatch';
chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('Matches test', () => {
  it('return all matches', async () => {
    sinon.stub(SequelizeMatch, 'findAll').resolves(listMatchesMockModel as any);
    const {status, body} = await chai.request(app).get('/matches');

    expect(status).to.equal(StatusHTTP.success);
    expect(body).to.deep.equal(listMatchesResolver);
  })

  it('return query inProgress', async () => {
    sinon.stub(SequelizeMatch, 'findAll').resolves(listMatchesTrueModel as any);
    const {status, body} = await chai.request(app).get('/matches').query({inProgress: true});

    expect(status).to.equal(StatusHTTP.success);
    expect(body).to.deep.equal(listMatchesTrue);
  })

  afterEach(sinon.restore);
})