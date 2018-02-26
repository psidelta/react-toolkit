export default function removeFromArray(arr, el) {
    const idx = arr.indexOf(el);
    if ( idx === -1 ) { return arr }
    return [...arr.slice(0,idx), ...arr.slice(idx+1)];
}