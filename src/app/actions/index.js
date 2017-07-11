export const DO_SOMETHING = 'DO_SOMETHING';

export function doSomething(text) {
    return { type: DO_SOMETHING, text }
}
