import { test, expect } from '@jest/globals';
import { logCleaner } from '../index';

import {
    mockMultiKeyStr, mockMultiKeyStrMasked, mockPasswordStr,
    mockPasswordStrMasked, mockSimpleObjWithHits, mockSimpleObjWithMask,
    mockSimpleMapWithHits, mockSimpleMapWithMask, mockComplexObjWithHits,
    mockComplexObjWithMask, mockComplexMapWithHits, mockComplexMapWithMask,
    mockStringWithNoHit, mockObjWithNoHit, mockArrWithNoHit, mockDictionaryOverride,
    mockDictionaryOverrideStrHit, mockDictionaryOverrideStrMasked, mockDictionaryOverrideObjHit,
    mockDictionaryOverrideObjMask
} from './mockData'


describe('Confirm that cleanString() acts as expected', () => {

    test('Sending an empty string returns an empty string', () => {
        expect(
            logCleaner.cleanString('')
        ).toStrictEqual('');
    });


    test('Sending string of just keyword password and a password masks the password', () => {
        expect(
            logCleaner.cleanString(mockPasswordStr)
        ).toStrictEqual(mockPasswordStrMasked);
    });

    test('Sending string with multiple matches and varying case fixes all instances', () => {
        expect(
            logCleaner.cleanString(mockMultiKeyStr)
        ).toStrictEqual(mockMultiKeyStrMasked)
    });

});

describe('Confirm that cleanObj() acts as expected', () => {

    test('Sending an empty object returns an empty object', () => {
        expect(
            logCleaner.cleanObj({})
        ).toStrictEqual({});

        expect(
            logCleaner.cleanObj([])
        ).toStrictEqual([]);

        expect(
            logCleaner.cleanObj(new Map())
        ).toStrictEqual(new Map());
    });

    test('Sending an object with a key in the dictionary, masks the value', () => {
        expect(
            logCleaner.cleanObj(mockSimpleObjWithHits)
        ).toStrictEqual(mockSimpleObjWithMask)

        expect(
            logCleaner.cleanObj(mockSimpleMapWithHits)
        ).toStrictEqual(mockSimpleMapWithMask);
    });

    test('Sending an object with nested objects containing keys and strings with hits masks the value', () => {
        expect(
            logCleaner.cleanObj(mockComplexObjWithHits)
        ).toStrictEqual(mockComplexObjWithMask);

        expect(
            logCleaner.cleanObj(mockComplexMapWithHits)
        ).toStrictEqual(mockComplexMapWithMask);
    });
});

describe('Confirm that cleanLogs() acts as expected', () => {

    test('Send undefined receive undefined', () => {
        expect(
            logCleaner.cleanLogs(undefined)
        ).toStrictEqual(undefined);

        expect(
            logCleaner.cleanLogs()
        ).toStrictEqual(undefined);
    });

    test('Send null receive null', () => {
        expect(
            logCleaner.cleanLogs(null)
        ).toStrictEqual(null);
    });

    test('Send one argument with no hits receive exact copy back', () => {

        expect(
            logCleaner.cleanLogs(mockStringWithNoHit)
        ).toStrictEqual(mockStringWithNoHit)

        expect(
            logCleaner.cleanLogs(mockObjWithNoHit)
        ).toEqual(mockObjWithNoHit)

        expect(
            logCleaner.cleanLogs(mockArrWithNoHit)
        ).toEqual(mockArrWithNoHit)

    });

    test('Send one argument with hits receive mask back', () => {

        expect(
            logCleaner.cleanLogs(mockSimpleObjWithHits)
        ).toEqual(mockSimpleObjWithMask)

        expect(
            logCleaner.cleanLogs(mockPasswordStr)
        ).toEqual(mockPasswordStrMasked);

    });

    test('Send multiple arguments with and without hits. Receive mask where fitting', () => {
        let logArr = logCleaner.cleanLogs(mockMultiKeyStr, mockObjWithNoHit, mockStringWithNoHit);
        expect(logArr.length).toStrictEqual(3);
        expect(logArr[0]).toEqual(mockMultiKeyStrMasked);
        expect(logArr[1]).toEqual(mockObjWithNoHit);
        expect(logArr[2]).toEqual(mockStringWithNoHit);
    });
});

describe('Dictionary override works', () => {

    test('importDictionary() works', () => {
        try {
            logCleaner.importDictionary(mockDictionaryOverride);
        } catch (error: any) {
            fail('importDictionary() threw an error')
        }
    });

    test('Imported dictionary works with cleanString()', () => {
        expect(
            logCleaner.cleanString(mockDictionaryOverrideStrHit)
        ).toStrictEqual(mockDictionaryOverrideStrMasked);
    });

    test('Imported dictionary works with cleanObj()', () => {
        expect(
            logCleaner.cleanObj(mockDictionaryOverrideObjHit)
        ).toStrictEqual(mockDictionaryOverrideObjMask);
    });

});