export function convertPrivateEmail(email: string) {
  return email.replace(/(\w{1})(\w+)(\w{1}@)/, "$1****$3");
}
