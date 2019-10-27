import React from 'react';
import Button from 'react-bootstrap/Button';

function App() {
  return (
    <div className="App">
      <h1>Welcome</h1>
      <h6>You can sign in via</h6>
      <Button href="/auth/google">Google+</Button>
    </div>
  );
}

export default App;
