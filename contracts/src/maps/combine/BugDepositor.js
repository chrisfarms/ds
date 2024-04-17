import { wrapper } from './genericwrapper';

export default async function update(state, block) {
    const TOKEN_NAME = 'Bugs';
    const TOKEN_ADDRESS = '0xB58a3E142c1845a9B990aee53D7429A2FD717d87';
    const ITEM_ID = BigInt('0x6a7a67f0488fca7c00000001000000000000000000000064');
    return wrapper({ TOKEN_NAME, TOKEN_ADDRESS, ITEM_ID, MODE: 'deposit' }, state, block);
}