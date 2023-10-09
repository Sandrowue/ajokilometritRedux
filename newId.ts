let counter = 0;

export function newId() {
    ++counter;
    return `${new Date().getTime()}-${counter}-${Math.random()}`;
}