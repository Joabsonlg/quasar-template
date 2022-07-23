import { i18n } from "boot/i18n";

const { t } = i18n.global;

const rules = {
  required: (value: string) => !!value || t("This field is required!"),
  email: (value: string) =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
    t("This field must be a valid e-mail address!"),
  confirmPassword: (password: string) => (value: string) =>
    value === password || "Passwords do not match!",
  cnpj: (value: string) =>
    /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(value) || "Invalid CNPJ!",
  cpf: (value: string) =>
    /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value) || "Invalid CPF!",
  phone: (value: string) =>
    /^\(\d{2}\)\d{4,5}-\d{4}$/.test(value) || "Invalid  phone!",
  number: (value: string) =>
    /^\d+$/.test(value) || "This field must be numeric!",
};

export default rules;
