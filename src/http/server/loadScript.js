class LoadScript {

    loadWindowScript(name){
        return new Promise((resolve) => {
            if (window[name]) {
                resolve(window[name]);
            } else {
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.defer = true;
                script.src =
                    'https://';
                document.head.appendChild(script);
                script.onload = function(){
                    resolve(window[name])
                }
            }
        })
    }
}

export default LoadScript
