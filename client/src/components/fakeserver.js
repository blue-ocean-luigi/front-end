import { createServer } from 'miragejs';
const makeServer = () => {
  createServer({
    routes() {
      this.urlPrefix = 'http://localhost:3007';
      //this.namespace='api';
      this.get('/messages', () => {
        return { text: 'hello', to: 1, from: 2, date: new Date() }
      });
      this.passthrough();
    }
  });
}
export default makeServer;
/* fake server */
  
    //this.urlPrefix = 'http://localhost:3001';
    /*
    this.get('/movies', () => {
      return {
        movies: [
          { id: 1, name: 'Inception', year: 2010 },
          { id: 2, name: 'Interstellar', year: 2014 },
          { id: 3, name: 'Dunkirk', year: 2017 },
        ]
      }
    });
    */
    //this.passthrough('https://auth-test364204.appspot.com/**', 'https://auth-test-364204.firebaseapp.com/**');
    //this.passthrough();
