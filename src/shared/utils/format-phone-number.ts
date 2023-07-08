export function formatPhoneNumber(phone: string): string {
  const phoneFormatted =
    phone.substr(0, 3) + "-" + phone.substr(3, 3) + "-" + phone.substr(6, 4);
  return phoneFormatted;
}
