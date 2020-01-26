//import base64 from 'react-native-base64';
import base64 from 'base-64';
module.exports = class User{

  constructor(){
    this.id = null;
    this.name = null;
    this.surname = null;
    this.username = null;
    this.password = null;
    this.email = null;
    this.isEnabled = null;
    this.token = null;
  }
  signUp(){
    return fetch('https://digimenu.herokuapp.com/user/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.username,
        name: this.name,
        surname: this.surname,
        email: this.email,
        password: this.password
      }),
    }).then(function(response){
      console.log("register response");
          return response.text();
    }).then(function(body){
      return body;
    });
  }

  signupAjax(){
      $.ajax({
        type:'POST'

      })
  }

  forgetPassword(){
    return fetch('https://digimenu.herokuapp.com/user/forgetpassword/' + this.email , {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      }),
    }).then(function(response){
      console.log(response);
          return response.text();
    }).then(function(body){
        return body;
    });
  }

  login(){
   return fetch('https://digimenu.herokuapp.com/user/login', {
      method: 'POST',
      headers: {

        'Authorization': 'Basic ' + base64.encode(this.username + ":" + this.password),
      }
    }).then(function(response){
          return response.status;
    });
  }
}
