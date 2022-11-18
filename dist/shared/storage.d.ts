import { StorageKeyType } from "../types";
export declare function saveLocally(key: StorageKeyType, value: any): Promise<void>;
export declare function getLocally(key: StorageKeyType): Promise<any>;
export declare function saveSync(key: StorageKeyType, value: any): Promise<void>;
export declare function getSync(key: StorageKeyType): Promise<any>;
