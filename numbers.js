// Number-to-words generators for Spanish and Portuguese, 0–9,999.
// Used by the standalone Numbers Trainer (separate from the phrase deck's
// small numbers section, which just covers the words from the guide).

const NUMBER_WORDS = (function () {
  "use strict";

  /* ---------------- Spanish ---------------- */

  const onesES = ["", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve"];
  const teensES = ["diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve"];
  const tensES = ["", "", "veinte", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
  const veintiES = ["veintiuno", "veintidós", "veintitrés", "veinticuatro", "veinticinco", "veintiséis", "veintisiete", "veintiocho", "veintinueve"];
  const hundredsES = ["", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos", "seiscientos", "setecientos", "ochocientos", "novecientos"];

  function belowHundredES(n) {
    if (n < 10) return onesES[n];
    if (n < 20) return teensES[n - 10];
    if (n === 20) return "veinte";
    if (n < 30) return veintiES[n - 21];
    const t = Math.floor(n / 10), u = n % 10;
    return tensES[t] + (u ? " y " + onesES[u] : "");
  }

  function belowThousandES(n) {
    const h = Math.floor(n / 100), r = n % 100;
    const parts = [];
    if (h > 0) parts.push(h === 1 ? (r === 0 ? "cien" : "ciento") : hundredsES[h]);
    if (r > 0) parts.push(belowHundredES(r));
    return parts.join(" ");
  }

  function toWordsES(n) {
    if (n === 0) return "cero";
    const th = Math.floor(n / 1000), r = n % 1000;
    const parts = [];
    if (th > 0) parts.push(th === 1 ? "mil" : onesES[th] + " mil");
    if (r > 0) parts.push(belowThousandES(r));
    return parts.join(" ");
  }

  /* ---------------- Portuguese (European) ---------------- */

  const onesPT = ["", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove"];
  const teensPT = ["dez", "onze", "doze", "treze", "catorze", "quinze", "dezasseis", "dezassete", "dezoito", "dezanove"];
  const tensPT = ["", "", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"];
  const hundredsPT = ["", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"];

  function belowHundredPT(n) {
    if (n < 10) return onesPT[n];
    if (n < 20) return teensPT[n - 10];
    const t = Math.floor(n / 10), u = n % 10;
    return tensPT[t] + (u ? " e " + onesPT[u] : "");
  }

  function belowThousandPT(n) {
    const h = Math.floor(n / 100), r = n % 100;
    if (h === 0) return belowHundredPT(r);
    const hw = h === 1 ? (r === 0 ? "cem" : "cento") : hundredsPT[h];
    return r > 0 ? hw + " e " + belowHundredPT(r) : hw;
  }

  function toWordsPT(n) {
    if (n === 0) return "zero";
    const th = Math.floor(n / 1000), r = n % 1000;
    if (th === 0) return belowThousandPT(r);
    const thousandsWord = th === 1 ? "mil" : onesPT[th] + " mil";
    if (r === 0) return thousandsWord;
    const r2 = r % 100;
    // "e" connects thousands to the remainder when the remainder is purely
    // tens/units (< 100), or purely a round hundred (e.g. "mil e cem");
    // when the remainder has both a hundreds digit and tens/units
    // (e.g. 345), no "e" goes between the thousand and the hundred word —
    // the hundred word supplies its own internal "e" before the tens/units.
    const useE = r < 100 || r2 === 0;
    return thousandsWord + (useE ? " e " : " ") + belowThousandPT(r);
  }

  function toWords(langKey, n) {
    return langKey === "pt" ? toWordsPT(n) : toWordsES(n);
  }

  return { toWords };
})();
