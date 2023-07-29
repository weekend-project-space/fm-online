/**
 * fetchSource
 * @param {*} url 
 * @returns 
 */
export function fetchSource(url) {
    return fetch(url)
        .then(response => {
            console.log(response);
            return response.text()
        });
}