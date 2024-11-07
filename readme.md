# Log Cleaner

[![LogCleaner Test](https://github.com/spies36/LogCleaner/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/spies36/LogCleaner/actions/workflows/test.yml)

A powerful library designed to safeguard sensitive information within your logs. By effectively masking sensitive data like passwords, API keys, and SSNs, Log Cleaner ensures data privacy and security.

### Key Features


- **Deep Masking**: Recursively scans and masks sensitive information within complex data structures.

- **Data Integrity**: Returns a deep copy of the original data, preserving the original object for further processing.

- **Flexible Usage**: Supports string, Object, Record, Map, Set, and Array.

- **Dictionary Override**: Easily import word lists to mask specific words or sensitive data.

### Usage

```
    import { logCleaner } from 'logcleaner';
    
    const myErrorWithSensitiveData = 'superSecretValue - 12345abc foo bar';
    const errorObjWithSensitiveData = {superSecetValue: 12345, foo: 'bar'};

    //Mask a string
    const maskedErrorWithSensitiveData = logCleaner.cleanLogs(myErrorWithSensitiveData);
    console.log(maskedErrorWithSensitiveData) //'superSecretValue - ***** foo bar'

    //Mask an Object
    const maskedErrorObjWithSensitiveData = logCleaner.cleanLogs(errorObjWithSensitiveData);
    console.log(maskedErrorObjWithSensitiveData)// {superSecetValue: '*****', foo: 'bar'}

    //Mask multiple params at once
    const myMaskedErrors = logCleaner.cleanLogs(myErrorWithSensitiveData, errorObjWithSensitiveData);
    console.log(...myMaskedErrors)// 'superSecretValue - ***** foo bar' {superSecetValue: '*****', foo: 'bar'}

```

#### Default Dictionary

- pwd
- password
- ssn
- socialsecuritynumber
- token
- key
- secret
- creditcard
- cvv
- routingnumber
- accountnumber
- apikey
- authtoken
- secretkey
- privatekey
- code
- cert
- private_key
- access_token

