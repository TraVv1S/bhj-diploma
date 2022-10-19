/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    let formData = null;

    let url = options.url;
    
    if (options.data) {
        if (options.method === 'GET') {
            url += '?' + Object.entries(options.data).map(entry => entry.map(encodeURIComponent).join('=')).join('&')
        } else {
            formData = new FormData;
            Object.entries(options.data).forEach(([key, value]) => formData.append(key, value));
        }
    }
    
    if (options.callback) {

        xhr.onload = function() {
            let err = null;
            let resp = null;
            
            if (xhr.response && xhr.response.success) {
                resp = xhr.response;
            } else {
                err = xhr.response;
            }
    
            options.callback(err,resp);
        };

        xhr.onerror = function () {
            throw new Error('Ошибка получения данных');
        }
    }

    try {
        xhr.open(options.method, url);
        xhr.send(formData);
    } catch (e) {
        callback(e);
    }
    
};
