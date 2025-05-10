/**
 * Verifica si el correo electrónico tiene el formato correcto donde el usuario es la parte
 * antes del arroba (@)
 */
export function isValidEmailUsername(email: string, username: string): boolean {
  if (!email || !username || !email.includes('@')) {
    return false;
  }
  
  const emailUsername = email.split('@')[0];
  return emailUsername === username;
}

/**
 * Extrae la parte del usuario (antes del @) de un correo electrónico
 */
export function extractUsernameFromEmail(email: string): string {
  if (!email || !email.includes('@')) {
    return '';
  }
  
  return email.split('@')[0];
}

/**
 * Genera un correo electrónico a partir del nombre de usuario
 * Si no se proporciona un dominio, usa un dominio predeterminado
 */
export function generateEmailFromUsername(username: string, domain: string = 'example.com'): string {
  if (!username) {
    return '';
  }
  
  return `${username}@${domain}`;
}
