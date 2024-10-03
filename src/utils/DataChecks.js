const AppError = require('./AppError');

class DataChecks {
  stringCheck(string, message) {
    const stringEmpty = !string;
    
    if (stringEmpty) throw new AppError(message);
  }

  arrayCheck(array, message) {
    const arrayEmpty = array.length < 1;

    if(arrayEmpty) throw new AppError(message);
  }

  userExists(user) {
    const errorMessage = "Usuário não encontrado! Confira os dados fornecidos e tente novamente.";

    this.stringCheck(user, errorMessage);
  }

  usersExists(usersInfo) {
    const errorMessage = "Nenhum usuário encontrado! Por favor, registre um usuário e tente novamente."

    this.arrayCheck(usersInfo, errorMessage);
  }

  hadAllDataSent(data) {
    const errorMessage = "Dados necessários não foram enviados! Verifique as informações e tente novamente."

    const missedData = data.every(info => info != false);

    this.stringCheck(missedData, errorMessage);
  }

  emailAlreadyExists(email) {
    if (email) {
      throw new AppError("Este e-mail já está cadastrado! Por favor, tente outro");
    }
  }


}

module.exports = DataChecks;