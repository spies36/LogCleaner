export const dictionary = new Map<string, boolean>([
    ['pwd', true],
    ['password', true],
    ['ssn', true],
    ['socialsecuritynumber', true],
    ['token', true],
    ['key', true]
])

export function buildRegexFromDictionary(dict: Map<string, boolean>): RegExp {

    let keyStr = '(('
    for (let [key, val] of dict) {
        keyStr += key + '|'
    }
    keyStr = keyStr.replace(/\|$/, ')');
    keyStr += '[\\+\\-:\\s]+)([\\S]+)';

    return new RegExp(keyStr, 'gi');
}

export const dictionaryAsRegex = buildRegexFromDictionary(dictionary);