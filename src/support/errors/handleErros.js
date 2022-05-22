import {Notify} from 'quasar'

export const handleErros = (error) => {
  if (!error.response)
    if (error.hasOwnProperty('message')) notify(error.message)
    else notify('Falha de conexão, tente novamente mais tarde!')
  else if (error.response.hasOwnProperty('message')) notify(error.response.message)
  else if (error.response.hasOwnProperty('data')) {
    const errorData = error.response.data
    if (errorData && Array.isArray(errorData))
      errorData.forEach((error, index) => notify(error[error.keys(errorData)[index]]))
    else if (errorData) {
      const object = errorData[Object.keys(errorData)[0]]
      if (Array.isArray(object)) return object.forEach((error) => notify(error))
      const customError = customMessageByErrorType(error)
      if (customError) notify(customError)
      else notify(errorData[Object.keys(errorData)[0]])
    }
  } else notify('Ocorreu um erro inesperado, tente novamente mais tarde!')
}

const notify = (message) => {
  Notify.create({
    message: message,
    color: 'negative',
    textColor: 'white'
  })
}

const customMessageByErrorType = (error) => {
  const messages = {
    401: 'Usuário não autorizado! Verifique seu login e senha.',
    403: 'Acesso negado! Este usuário não tem permissão para acessar este recurso!',
    404: 'Recurso não encontrado!',
    422: 'Falha de validação!',
    500: 'Ocorreu um erro inesperado, tente novamente mais tarde!'
  }
  return messages[error.response.status]
}
