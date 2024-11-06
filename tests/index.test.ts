import { test, expect } from '@jest/globals';
import { cleanString, cleanObj, cleanLogs } from '../index';

import {
    mockMultiKeyStr, mockMultiKeyStrMasked, mockPasswordStr,
    mockPasswordStrMasked, mockSimpleObjWithHits, mockSimpleObjWithMask,
    mockSimpleMapWithHits, mockSimpleMapWithMask, mockComplexObjWithHits,
    mockComplexObjWithMask, mockComplexMapWithHits, mockComplexMapWithMask,
    mockStringWithNoHit, mockObjWithNoHit, mockArrWithNoHit
} from './mockData'


describe('Confirm that cleanString() acts as expected', () => {

    test('Sending an empty string returns an empty string', () => {
        expect(
            cleanString('')
        ).toStrictEqual('');
    })


    test('Sending string of just keyword password and a password masks the password', () => {
        expect(
            cleanString(mockPasswordStr)
        ).toStrictEqual(mockPasswordStrMasked);
    })

    test('Sending string with multiple matches and varying case fixes all instances', () => {
        expect(
            cleanString(mockMultiKeyStr)
        ).toStrictEqual(mockMultiKeyStrMasked)
    })

})

describe('Confirm that cleanObj() acts as expected', () => {

    test('Sending an empty object returns an empty object', () => {
        expect(
            cleanObj({})
        ).toStrictEqual({});

        expect(
            cleanObj([])
        ).toStrictEqual([]);

        expect(
            cleanObj(new Map())
        ).toStrictEqual(new Map());
    })

    test('Sending an object with a key in the dictionary, masks the value', () => {
        expect(
            cleanObj(mockSimpleObjWithHits)
        ).toStrictEqual(mockSimpleObjWithMask)

        expect(
            cleanObj(mockSimpleMapWithHits)
        ).toStrictEqual(mockSimpleMapWithMask);
    })

    test('Sending an object with nested objects containing keys and strings with hits masks the value', () => {
        expect(
            cleanObj(mockComplexObjWithHits)
        ).toStrictEqual(mockComplexObjWithMask);

        expect(
            cleanObj(mockComplexMapWithHits)
        ).toStrictEqual(mockComplexMapWithMask);
    })
})

describe('Confirm that cleanLogs() acts as expected', () => {

    test('Send undefined receive undefined', () => {
        expect(
            cleanLogs(undefined)
        ).toStrictEqual(undefined);

        expect(
            cleanLogs()
        ).toStrictEqual(undefined);
    })

    test('Send null receive null', () => {
        expect(
            cleanLogs(null)
        ).toStrictEqual(null);
    })

    test('Send one argument with no hits receive exact copy back', () => {

        expect(
            cleanLogs(mockStringWithNoHit)
        ).toStrictEqual(mockStringWithNoHit)

        expect(
            cleanLogs(mockObjWithNoHit)
        ).toEqual(mockObjWithNoHit)

        expect(
            cleanLogs(mockArrWithNoHit)
        ).toEqual(mockArrWithNoHit)

    })

    test('Send one argument with hits receive mask back', () => {

        expect(
            cleanLogs(mockSimpleObjWithHits)
        ).toEqual(mockSimpleObjWithMask)

        expect(
            cleanLogs(mockPasswordStr)
        ).toEqual(mockPasswordStrMasked);

    })

    test('Send multiple arguments with and without hits. Receive mask where fitting', () => {
        let logArr = cleanLogs(mockMultiKeyStr, mockObjWithNoHit, mockStringWithNoHit);
        expect(logArr.length).toStrictEqual(3);
        expect(logArr[0]).toEqual(mockMultiKeyStrMasked);
        expect(logArr[1]).toEqual(mockObjWithNoHit);
        expect(logArr[2]).toEqual(mockStringWithNoHit);
    })

})