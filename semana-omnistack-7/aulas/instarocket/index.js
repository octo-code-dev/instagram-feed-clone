/**
 * @format
 */

import {AppRegistry} from 'react-native';
//Local onde será procurado (pasta src) o arquivo index.js, que nada mais é do que a página inicial do nosso app mobile
import App from './src';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
