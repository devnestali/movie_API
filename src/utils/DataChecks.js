const AppError = require('./AppError');

class DataChecks {
  stringCheck(string, message) {
    const stringEmpty = !string;
    
    if (stringEmpty) throw new AppError(message);
  };

  arrayCheck(array, message) {
    const arrayEmpty = array.length < 1;

    if(arrayEmpty) throw new AppError(message);
  };

  userExists(user) {
    const errorMessage = "Usuário não encontrado! Confira os dados fornecidos e tente novamente.";

    this.stringCheck(user, errorMessage);
  };

  usersExists(usersInfo) {
    const errorMessage = "Nenhum usuário encontrado! Por favor, registre um usuário e tente novamente."

    this.arrayCheck(usersInfo, errorMessage);
  };

  hadAllDataSent(data) {
    const errorMessage = "Dados necessários não foram enviados! Verifique as informações e tente novamente."

    const missedData = data.every(info => info != false);

    this.stringCheck(missedData, errorMessage);
  };

  emailAlreadyExists(email) {
    if (email) {
      throw new AppError("Este e-mail já está cadastrado! Por favor, tente outro");
    }
  };

  thisEmailBelongToThisUser(user, email) {
    if(user.id != email.id) {
      throw new AppError("Este e-mail não pertence ao seu usuário");
    }
  };

  ThisTheCurrentPassword(password) {
    const errorMessage = "Para criar uma nova senha, é necessário informar sua senha atual! Por favor, tente novamente."

    this.stringCheck(password, errorMessage);
  }

  thePasswordsHasAMatch(passwordCompared) {
    if(!passwordCompared) {
      throw new AppError("As senhas atuais não conferem! Por favor, tente novamente.");
    }
  }

  dataWasNotSent() {
    const errorMessage = "Para atualizar as informações, é obrigatório fornecer pelo menos um dado.";

    this.stringCheck(undefined, errorMessage);
  }

  thisTitleIsEmpty(title) {
    const errorMessage = "O título é obrigatório! Por favor, preencha o campo de titulo.";

    this.stringCheck(title, errorMessage);
  }

  isANumber(value) {
    if(isNaN(value)) {
      throw new AppError("Apenas um valor numérico é permitido no campo de avaliação. Por favor, tente novamente.");
    }
  }


}

module.exports = DataChecks;