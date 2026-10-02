/**
 * Único conjunto de destinos (enlaces, repos, emails) que puede aparecer en el README, los SVG
 * y las escenas. Se usa una lista de permitidos y no una de bloqueo: una lista de bloqueo tiene
 * que NOMBRAR lo que quiere ocultar, y eso ya es una fuga.
 */
export const ALLOWED = [
  'https://prismo.digital/',
  'https://laestanteriaoculta.es/',
  'https://www.correctorarmonia.com/',
  'https://github.com/Quirciano15/claude-skills-collection',
  'mailto:quirciano@gmail.com',
  'quirciano@gmail.com',
  'http://www.w3.org/2000/svg',
];

const TARGETS = [
  /(?:https?:\/\/|mailto:)[^\s)"'<>\]]+/gi, // URLs y mailto
  /(?<![\w/.:@-])github\.com\/[^\s)"'<>\]]+/gi, // github.com sin esquema
  /(?<![\w.+-]|mailto:)[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g, // emails sueltos
];

export function disallowedTargets(text) {
  const out = [];
  for (const re of TARGETS) {
    for (const [hit] of text.matchAll(re)) if (!ALLOWED.includes(hit)) out.push(hit);
  }
  return [...new Set(out)];
}
