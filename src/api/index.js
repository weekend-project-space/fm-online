/**
 * fetchSource
 * @param {*} url 
 * @returns 
 */
export function fetchSource(url) {
    return fetch(url)
        .then(response => {
            return response.text()
        });
}