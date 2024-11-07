import { dictionary } from './dictionary'

class LogCleaner {

    private dictionary = dictionary;

    private dictionaryAsRegex;

    constructor() {
        this.dictionaryAsRegex = this.buildRegexFromDictionary(this.dictionary);
    }

    cleanString(str: string) {
        return str.replaceAll(this.dictionaryAsRegex, '$1*****');
    }

    cleanObj(obj: Record<any, any>) {
        const isMap = (obj instanceof Map);

        if (isMap) {
            for (const key of obj.keys()) {
                if (this.dictionary.has(key)) {
                    obj.set(key, '*****');
                } else {
                    const val = obj.get(key);
                    if (typeof val === 'object') {
                        obj.set(key, this.cleanObj(val));
                    } else if (typeof val === 'string') {
                        obj.set(key, this.cleanString(val));
                    }
                }
            }
        } else {
            for (const key of Object.keys(obj)) {
                if (this.dictionary.has(key) && typeof obj[key] !== 'function') {
                    obj[key] = '*****';
                } else {
                    if (typeof obj[key] === 'object') {
                        obj[key] === this.cleanObj(obj[key]);
                    } else if (typeof obj[key] === 'string') {
                        obj[key] = this.cleanString(obj[key]);
                    }
                }
            }
        }

        return obj;
    }

    cleanLogs<T extends any[]>(...args: T): T[] {
        if (!args?.length) {
            return args[0]
        }

        const cleanArgs: T[] = args.map((arg) => {

            if (typeof arg === 'string') {
                return this.cleanString(arg);
            }

            if (typeof arg === 'object' && arg) {
                let deepCopy = structuredClone(arg);
                return this.cleanObj(deepCopy);
            }

            return arg;
        })

        return (cleanArgs.length <= 1 ? cleanArgs[0] : cleanArgs);
    }

    importDictionary(dictionary: string[]) {
        this.dictionary = new Set(dictionary);
        this.dictionaryAsRegex = this.buildRegexFromDictionary(this.dictionary);
    }

    private buildRegexFromDictionary(dict: Set<string>): RegExp {
        let keyStr = '(('
        for (let key of dict) {
            keyStr += key + '|';
        }
        keyStr = keyStr.replace(/\|$/, ')');
        keyStr += '[\\+\\-:=\\s]+)([\\S]+)';

        return new RegExp(keyStr, 'gi');
    }

}


export const logCleaner = new LogCleaner();