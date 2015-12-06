var assert = require('assert'),
    http = require('http');
    request = require('supertest');
var app = require('./config/lib/app');
describe('/', function () {
  it('test server-error', function (done) {
    http.get('http://127.0.0.1:3000/server-error', function (res) {
      assert.equal(500, res.statusCode);
      done();
    });
  });

  it('test api 404"', function (done) {
    http.get('http://127.0.0.1:3000/api/sadfa', function (res) {
      assert.equal(404, res.statusCode);
      done();
    });
  });
  it('test lib 404"', function (done) {
    http.get('http://127.0.0.1:3000/lib/sadfa', function (res) {
      assert.equal(404, res.statusCode);
      done();
    });
  });
  it('test modules 404"', function (done) {
    http.get('http://127.0.0.1:3000/modules/sadfa', function (res) {
      assert.equal(404, res.statusCode);
      done();
    });
  });
  it('test homepage"', function (done) {
    http.get('http://127.0.0.1:3000/', function (res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });
  it('test signup page"', function (done) {
    http.get('http://127.0.0.1:3000/authentication/signup', function (res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });
  it('test signin page"', function (done) {
    http.get('http://127.0.0.1:3000/authentication/signin', function (res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});

describe('SIGN UP /user', function(){
  it('test signup', function(done){
    request('http://127.0.0.1:3000')
      .post('/api/auth/signup')
      .set('Accept', 'application/json')
      .send({ firstName: 'test',
            lastName: 'test',
            email: 'test@gmail.com',
            username: 'test',
            password: '1234567890qQ!' })
      .expect(200)
      .end(function(err,res){
        done()
      });
  });
});
describe('SIGN IN /user', function(){
  it('test signin', function(done){
    request('http://127.0.0.1:3000')
      .post('/api/auth/signin')
      .set('Accept', 'application/json')
      .send({ username: 'test', password: '1234567890qQ!' })
      .expect(200)
      .end(function(err,res){
        console.log(res)
        assert.equal(res.body.email,'test@gmail.com')
        assert.equal(res.body.firstName,'test')
        assert.equal(res.body.lastName,'test')
        assert.equal(res.body.username,'test')
        done();
      });
  });
});
describe('SIGN IN /user', function(){
  it('test signin', function(done){
    request('http://127.0.0.1:3000')
      .post('/api/auth/signin')
      .set('Accept', 'application/json')
      .send({ username: 'test', password: '1234567890qQ!' })
      .expect(200)
      .end(function(err,res){
        assert.equal(res.body.email,'test@gmail.com')
        assert.equal(res.body.firstName,'test')
        assert.equal(res.body.lastName,'test')
        assert.equal(res.body.username,'test')
        done();
      });
  });
});