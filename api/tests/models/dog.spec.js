const { dogData, breed, temperament, conn } = require('../../src/db.js');
const { expect } = require('chai');
const temp = require('../../src/models/temp.js');

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => dogData.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        dogData.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        dogData.create({ name: 'Scooby' });
      })
    describe('Builder', function () {
        let dog;
        // before(function(){
          dogData = dog.build({
            raza: 'Pug',
            name: 'Scooby',
          });
      });
  
      describe('Hooks', function () {
        it('setea urlTitle basado en title antes de validar ', function() {
          return dogData.create({
            raza: 'Pug',
            name: 'Scooby',
          })
            .then(dog => {
              expect(dog.name).to.equal('Scooby');
            })
        });
      });
    });
  
    describe('Temp Model', function () {
      beforeEach(function() {
        return temperament.sync({ force: true });
      })
      describe('Validations', function () {
        it('error sin name', function(done) {
           temperament.create({
            id: '1'
           })
            .then(() => done('No debería haberse creado'))
            .catch(() => done());
        });
        it('error, el id no coincide', function(done) {
          temperament.create({
            name: 'amigable',
          })
          .then(() => done('No deberia haberse creado'))
          .catch(() => done());
        });
        it('error, nombre invalido', function(done) {
          temperament.create({
            name: 'hola',
            id: 'chau'
          })
            .then(() => done('No debería haberse creado'))
            .catch(() => done());
        });
      });
    });
  
    });
  });
