export function findIndexById<I, T extends {id: I}>(
    array: T[],
    id: I | null | undefined
): number | null {
    if (id == null) return null;
    const index = array.findIndex((x) => x.id === id);
    return index != -1 ? index : null;
}