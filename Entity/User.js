

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
  signUp(callback){
    fetch('https://digimenu.herokuapp.com/user/register', {
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
          response.status == "201" ? callback(true, "Bilgileriniz kaydedildi!\nE-Posta adresinize gelen Aktivasyon Bağlantısına tıklayarak E-Posta adresinizi doğrulamanız gerekmektedir!") : callback(false, "Bu mail adresine kayıtlı kullanıcı bulunmaktadır!");
    });
  }

  login(callback){
    fetch('https://digimenu.herokuapp.com/user/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.username,
        password: this.password
      }),
    }).then(function(response){
          callback(response.status);
    });
  }
}
