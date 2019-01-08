export const required = value => (value || typeof value === 'number' ? undefined : 'Необходимое поле')
export const multiRequired = value => value && value.length ? undefined : 'Необходимое поле';
export const minMulti = min => value => value && value.length < min ? `Минимальное количество : ${min}` : undefined;
export const maxMulti = max => value => value && value.length > max ? `Максимальное количество : ${max}` : undefined; 
export const maxLength = max => value => value && value.length > max ? `Максимальная длина ${max} символов` : undefined
export const minLength = min => value => value && value.length < min ? `Минимальная длина ${min} символов` : undefined
export const number = value => value && isNaN(Number(value)) ? 'Только цифры' : undefined
export const letters = value => value && !/[a-zA-ZА-Яа-я ]+/g.test(value) ? 'Только буквы' : undefined
export const minValue = min => value => value && value < min ? `Минимальная длина ${min} символов` : undefined
export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Неверный email'
    : undefined