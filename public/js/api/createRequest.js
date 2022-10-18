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

        xhr.onreadystatechange = function() {
            let err = null;
            let resp = null;
            
            try {
                if (xhr.response && xhr.response.success) {
                    resp = xhr.response;
                } else {
                    err = xhr.response;
                }
            }
            catch (e) {
                err = e;
            }
    
            options.callback(err,resp);

            // if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            //     let responce = JSON.parse(xhr.responseText);
            //     render(responce);
            // };
        };
    }
    
    xhr.open(options.method, url);
    xhr.send(formData);
};
