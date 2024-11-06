import { dictionaryAsRegex, dictionary } from './dictionary'

function cleanString(str: string) {
    return str.replaceAll(dictionaryAsRegex, '$1*****')
}


function cleanObj(obj: Record<any, any>) {
    const isMap = (obj instanceof Map);

    if (isMap) {
        for (const key of obj.keys()) {
            if (dictionary.has(key)) {
                obj.set(key, '*****');
            } else {
                const val = obj.get(key);
                if (typeof val === 'object') {
                    obj.set(key, cleanObj(val));
                } else if (typeof val === 'string') {
                    obj.set(key, cleanString(val));
                }
            }
        }
    } else {
        for (const key of Object.keys(obj)) {
            if (dictionary.has(key) && typeof obj[key] !== 'function') {
                obj[key] = '*****';
            } else {
                if (typeof obj[key] === 'object') {
                    obj[key] === cleanObj(obj[key]);
                } else if (typeof obj[key] === 'string') {
                    obj[key] = cleanString(obj[key]);
                }
            }
        }
    }

    return obj;
}


function cleanLogs<T extends any[]>(...args: T): T[] {
    if (!args?.length) {
        return args[0]
    }

    const cleanArgs: T[] = args.map((arg) => {

        if (typeof arg === 'string') {
            return cleanString(arg);
        }

        if (typeof arg === 'object' && arg) {
            let deepCopy = structuredClone(arg);
            return cleanObj(deepCopy);
        }

        return arg
    })


    return (cleanArgs.length <= 1 ? cleanArgs[0] : cleanArgs)
}

export {
    cleanLogs,
    cleanString,
    cleanObj
}