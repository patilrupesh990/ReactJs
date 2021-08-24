import { createBrowserHistory } from 'history';

let newHistory = () => {
    try {
        const xhr = new XMLHttpRequest();
        xhr.abort();
    } catch(err) {}
    return createBrowserHistory();
}
export const History = newHistory();