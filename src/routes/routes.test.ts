import request from 'supertest';
import createServer from '../createServer';

const app = request(createServer(1));

describe('Routes', () => {
  it('It should show a welcome message', (done) => {
    app.get('/api/v1')
      .expect(200)
      .then((res) => {
        expect(res.text).toBe('Welcome to my chat server api, please use GET /messages to get all messages');
        done();
      }).catch(done);
  });

  const sampleMessage = {
    text: 'Hello',
    from: 'John',
  };
  it('It should add a message and return it', (done) => {
    app.post('/api/v1/messages')
      .send(sampleMessage)
      .expect(200)
      .then((res) => {
        expect(res.body.text).toBe(sampleMessage.text);
        expect(res.body.from).toBe(sampleMessage.from);
        done();
      })
      .catch(done);
  });

  it('It should return a message when requested by id', (done) => {
    app.get('/api/v1/messages/0')
      .expect(200)
      .then((res) => {
        expect(res.body.text).toBe(sampleMessage.text);
        expect(res.body.from).toBe(sampleMessage.from);
        expect(res.body.id).toBe(0);
        done();
      })
      .catch(done);
  });

  it('should add multple messages with multiple requests', (done) => {
    app.post('/api/v1/messages')
      .send(sampleMessage)
      .expect(200)
      .then(() => {
        app.get('/api/v1/messages')
          .expect(200)
          .then((res) => {
            expect(res.body).toHaveLength(2);
            done();
          })
          .catch(done);
      })
      .catch(done);
  });

  it('It should edit a message and return it', (done) => {
    const newMessage = {
      text: 'Hello again',
      from: 'Jane',
    };
    app.put('/api/v1/messages/0')
      .send(newMessage)
      .expect(200)
      .then((res) => {
        expect(res.body.text).toBe(newMessage.text);
        expect(res.body.from).toBe(newMessage.from);
        done();
      })
      .catch(done);
  });

  it('It should delete a message', async () => {
    await app.post('/api/v1/messages')
      .send(sampleMessage)
      .expect(200);

    await app.post('/api/v1/messages')
      .send(sampleMessage)
      .expect(200);

    const currentMessages = await app.get('/api/v1/messages')
      .expect(200)
      .then((res) => res.body);

    const deleteMessage = await app.delete('/api/v1/messages/0')
      .expect(200)
      .then((res) => res.text);

    expect(deleteMessage).toBe('Message with id 0 deleted');

    const newMessages = await app.get('/api/v1/messages')
      .expect(200)
      .then((res) => res.body);

    expect(currentMessages.length).toBe(newMessages.length + 1);
  });
});
