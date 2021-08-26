function errorHandler(error, errorMessage) {
  if (error.name === 'TypeError') errorMessage = 'Соединение с сервером не установлено';
  if (error.status === 500) errorMessage = 'Сервер не отвечает';

  return console.log(`Ошибка: ${ errorMessage }`);
}

export default errorHandler;
