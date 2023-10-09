export function parseNumber(value: string): number | null {
    /* Jäsennä teksti numeroksi siten, että epäonnistuessa palautetaan
    null. Esim. sytteellä "123" palauttaa 123, mutta syötteellä "moi"
    palauttaa null.*/

    const result = parseInt(value);
    return Number.isNaN(result) ? null : result;
}

export function cleanNumberText(x: string): string {
    /* Muuta teksit joka sisältää numeron uudeksi tekstiksi, jossa on pelkkä numero.
    Esim. "123 moi" -> "123". Jos syötteestä ei löydy numeroa, palauttaa tyhjän stringin "". */
    return parseNumber(x)?.toString() ?? '';
}