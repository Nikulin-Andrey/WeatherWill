import React from 'react';
import { Provider } from 'react-redux';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import store from './store';
import theme from './theme';

const App: React.FC = () => (
    <>
        <ColorModeScript initialColorMode={ theme.config.initialColorMode } />
        <ChakraProvider>
            <Provider store={ store }>
                <BrowserRouter>
                    <Router />
                </BrowserRouter>
            </Provider>
        </ChakraProvider>
    </>
)

export default App;
