
function keydownHandler() {
    let wordsArray = [];
    return {
        pushWord(key) {
            wordsArray.push(key);
        },
        getWords(key) {
            return wordsArray.join('');
        }
    }
}