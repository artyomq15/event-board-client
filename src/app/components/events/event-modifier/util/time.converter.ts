export function convertToInputString (time: Date) {
    const newTime = new Date(time);
    newTime.setMinutes(newTime.getMinutes() - newTime.getTimezoneOffset());
    return newTime.toISOString().slice(0, 16);
}
