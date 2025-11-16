export class Validators {

  static get userName() {
    //nombre de usuario: letras (mayúsculas y minúsculas), entre 2 y 40 caracteres.
    return /^[a-zA-Z0-9._-]{2,40}$/;
  }

  static get userEmail() {
    //formato básico de email
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  }

  static get userPassword() {
    //mínimo 6 caracteres, al menos una letra y un número
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  }

}