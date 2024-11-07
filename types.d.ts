
/**
 * Class implementing methods to clean data. All returned data will be a deep copy to preserve original data.
 */
interface LogCleaner {
    /**
     * **Secondary Method**
     * 
     * Return a new String with masked values based on dictionary
     */
    cleanString(str: string): string;
    /**
     * **Secondary Method**
     * 
     * Return a new Object with masked values based on dictionary
     */
    cleanObj(obj: Record<any, any>): Record<any, any>;
    /**
     * **Primary Method**
     * 
     * Return a new deep copy of each argument with masked values based on dictionary
     */
    cleanLogs<T extends any[]>(args: T): T[];
    /**
     * Set a dictionary instead of using the default
     */
    importDictionary(dictionary: string[]): void;
}

/**
 * Clean data based on dictionary keys
 */
declare const logCleaner: LogCleaner

export {
    logCleaner
}
