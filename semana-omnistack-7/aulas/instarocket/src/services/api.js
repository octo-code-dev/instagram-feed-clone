import axios from 'axios';
/*
O IP a ser configurado depende do dispositivo:
Emulador iOS: localhost
USB (iOS ou Android): IP do seu PC, no meu caso, 192.168.1.5
Emulador Genymotion: 10.0.3.2
Emulador Android Studio: 10.0.2.2
*/
const api = axios.create({
    baseURL: 'http://10.0.2.2:3333',
})

export default api;
