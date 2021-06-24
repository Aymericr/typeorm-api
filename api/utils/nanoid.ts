import {customAlphabet} from 'nanoid';

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

const nanoid = (size) => customAlphabet(alphabet, size)();

export default nanoid;