import {Notify} from 'quasar'

export const showNotification = (type, message) => {
  Notify.create({
    type: type,
    message: message,
    actions: [{icon: 'close', color: 'white'}],
    position: 'top-right'
  })
};

export const showNegative = (message) => showNotification('negative', message);
export const showPositive = (message) => showNotification('positive', message);
