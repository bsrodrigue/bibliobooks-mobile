export function getWordCount(str) {
    return str.split(' ').filter(function (num) {
        return num != ''
    }).length;
}