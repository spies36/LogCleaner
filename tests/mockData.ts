

export const mockPasswordStr = 'password: 123456';
export const mockPasswordStrMasked = 'password: *****';


export const mockMultiKeyStr = 'password: 123456 TOKEN - mySecretApi';
export const mockMultiKeyStrMasked = 'password: ***** TOKEN - *****';


export const mockSimpleObjWithHits = {
    password: '123456',
    ssn: '123456',
    foo: 'bar'
}

export const mockSimpleObjWithMask = {
    password: '*****',
    ssn: '*****',
    foo: 'bar'
}

export const mockSimpleMapWithHits = new Map([['password', '12345'], ['foo', 'bar']]);

export const mockSimpleMapWithMask = new Map([['password', '*****'], ['foo', 'bar']]);

export const mockComplexObjWithHits = {
    foo: 'bar',
    bar: [1, 2, 3, 4],
    nested: {
        password: '12345',
        myKey: 'token: 12345'
    }
}

export const mockComplexObjWithMask = {
    foo: 'bar',
    bar: [1, 2, 3, 4],
    nested: {
        password: '*****',
        myKey: 'token: *****'
    }
}

export const mockComplexMapWithHits = new Map<string, any>([
    ['foo', 'bar'],
    ['nested',
        {
            foo: 'bar',
            password: '12345',
            myKey: 'token- 12345',
        }
    ]
]);

export const mockComplexMapWithMask = new Map<string, any>([
    ['foo', 'bar'],
    ['nested',
        {
            foo: 'bar',
            password: '*****',
            myKey: 'token- *****',
        }
    ]
]);

export const mockStringWithNoHit = 'Foo-Bar Foo:Bar Foo Bar 12345'

export const mockObjWithNoHit = { foo: 'bar', bar: '12345' }

export const mockArrWithNoHit = [1, 2, 4, 5, 'foo', 'bar']

export const mockDictionaryOverride = ['myTestKeyword', 'MyExtraKeyWordTest']

export const mockDictionaryOverrideStrHit = 'myTestKeyword - 12345 MyExtraKeyWordTest= ajlhkasdf';

export const mockDictionaryOverrideStrMasked = 'myTestKeyword - ***** MyExtraKeyWordTest= *****';

export const mockDictionaryOverrideObjHit = {
    myTestKeyword: 12345,
    foo: 'bar'
}

export const mockDictionaryOverrideObjMask = {
    myTestKeyword: '*****',
    foo: 'bar'
}