// // @ts-ignore
// import chaiHttp = require('chai-http');
// import * as sinon from 'sinon';
// import * as chai from 'chai';
// import {App} from '../app';
// import SequelizeTeam from '../database/models/SequelizeTeam';
// import listTeamsMock from './mock/listTeamsMock';
// import StatusHTTP from '../utils/StatusHTTP';
// import SequelizeUser from '../database/models/SequelizeUser';
// import { userMock } from './mock/userMock';
// chai.use(chaiHttp);

// const { app } = new App();
// const { expect } = chai;

// describe('integration tests', () => {
//   describe('Teams Test', () => {
//     it('return all teams', async () => {
//       sinon.stub(SequelizeTeam, 'findAll').resolves(listTeamsMock as any);
//       const {status, body} = await chai.request(app).get('/teams');
      
//       expect(status).to.equal(StatusHTTP.success);
//       expect(body).to.deep.equal(listTeamsMock);
//     })
  
//     it('returns the team selected by id', async () => {
//       sinon.stub(SequelizeTeam, 'findByPk').resolves(listTeamsMock[0] as any);
//       const {status, body} = await chai.request(app).get('/teams/1');
  
//       expect(status).to.equal(StatusHTTP.success);
//       expect(body).to.deep.equal(listTeamsMock[0]);
//     })
  
//   }),

//   describe('Login route test', () => {
//     it
//   })
// })
