function errorHandler(error, errorMessage) {
  if (error.name === 'TypeError') errorMessage = error; //'Соединение с сервером не установлено'
  if (error.status === 500) errorMessage = 'Сервер не отвечает';

  return `Ошибка: ${ errorMessage }`;
}

export default errorHandler;
