export interface SimpleChange<T> {
    propertyKey: PropertyKey;
    firstChange: boolean;
    previousValue: T;
    currentValue: T;
    isFirstChange: () => boolean;
}
export declare type CallBackFunction<T> = (value: T, change?: SimpleChange<T>) => void;
export declare function OnChange<T = any>(callback: CallBackFunction<T> | string): (target: any, key: PropertyKey) => void;
