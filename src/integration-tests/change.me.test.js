const chai = require('chai');
const { expect } = chai;

// simulando requests http
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

// mock de banco de dados em memoria

const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

//

const server = require('../api/app');

const user = {
  "name": "Murilo",
  "email": "murilorsv14@gmail.com",
  "password": "123451",
};

describe('POST /users', () => {
  describe('É esperado ao se cadastrar um usuário:', () => {
    describe('quando é criado com sucesso', () => {
      let response = {};
      
      const DBServer = new MongoMemoryServer();

      before(async () => {
        const URLMock = await DBServer.getUri();
        const connectionMock = await MongoClient.connect(URLMock,
          { useNewUrlParser: true, useUnifiedTopology: true });

        sinon.stub(MongoClient, 'connect')
          .resolves(connectionMock);
      
        response = await chai.request(server)
          .post('/users')
          .set('content-type', 'application/json',)
          .send(user);
      });

      after(async () => {
        MongoClient.connect.restore();
        await DBServer.stop();
      });

      console.log(response);

      it('retorna o código de status 201', () => {
        expect(response).to.have.status(201);
      });

      it('retorna um objeto', () => {
        expect(response.body).to.be.a('object');
      });

      it('o objeto possui a propriedade "user"', () => {
        expect(response.body).to.have.property('user');
      });

      it('a propriedade "user" possui o objeto de usuário',
        () => {
          expect(response.body.user)
            .to.be.equal(user);
        });
    });
  });
});
