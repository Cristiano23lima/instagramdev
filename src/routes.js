import React from 'react';
import {Switch, Route} from "react-router-dom";

import Feed from './pages/Feed';//está importando minha classe Feed do arquivo Feed.js
import New from './pages/New';//está importando minha classe New do arquivo New.js

function Routes(){
    return(
        <Switch>{/* Garante que apenas uma rota seja chamada na url */}
            <Route path="/" exact component={Feed} />{/*exact irá comparar se a rota em path é igual a url digitada;na pagina inicial ele irá chamar meu Feed(classe)*/}
            <Route path="/new" exact component={New} />{/*/na pagina new ele irá chamar meu New(classe)*/}
        </Switch>
    );
}

export default Routes;//exporta as minhas rotas(função Routes)