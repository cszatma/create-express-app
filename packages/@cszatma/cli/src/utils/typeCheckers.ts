import { cloneDeep } from 'lodash';

export const isString = (val: any): boolean => typeof val === 'string';
export const isFunction = (val: any): boolean => typeof val === 'function';
export const isObject = (val: any): boolean => val && typeof val === 'object';
export const isArray = (val: any): boolean => Array.isArray(val);

export const copyValue = <T>(val: T): T =>
  isObject(val) ? cloneDeep(val) : val;
