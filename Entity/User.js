

module.exports = class User{
  constructor(){
    this.id = null;
    this.name = null;
    this.surname = null;
    this.username = null;
    this.password = null;
    this.email = null;
    this.isEnabled = null;
  }
  save(callback){
    fetch('http://digimenu.herokuapp.com/user/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.username,
        name: this.name,
        surname: this.surname,
        email: this.email,
        password: this.password
      }),
    });
  }
}
