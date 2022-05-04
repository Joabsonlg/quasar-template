const rules = {
  required: value => !!value || 'Este campo é obrigatório!',
  minLength: (value, length) => (value && value.length >= length) || `Este campo deve ter no mínimo ${length} caracteres!`,
  maxLength: (value, length) => (value && value.length <= length) || `Este campo deve ter no máximo ${length} caracteres!`,
  email: value => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'Este campo deve ser um e-mail válido!',
  confirmPassword: password => value => value === password || 'As senhas não conferem!',
  cnpj: value => /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/.test(value) || 'CNPJ inválido!',
  phone: value => /^\(\d{2}\)\d{4,5}\-\d{4}$/.test(value) || 'Telefone inválido!',
  number: value => /^\d+$/.test(value) || 'Este campo deve ser numérico!',
}

export default rules
