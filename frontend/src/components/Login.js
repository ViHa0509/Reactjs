import React from 'react';

function Login() {   
    return (
      <div>
        Login<br /><br />
        <div>
          Username<br />
          <input type="text"/>
        </div>
        <div style={{ marginTop: 10 }}>
          Password<br />
          <input type="password"/>
        </div>
        <input type="button" value="Login"/><br />
      </div>
    );
}

export default Login;
   
