import * as React from "react";
import Header from "./components/header/Header";
import Products from "./components/main/Products"
import RedeemHistory from "./components/redeemHistory/RedeemHistory";
import { ProductsProvider } from "./components/contexto/ProductsProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App: React.FC = () => {
  return (
      <ProductsProvider>
        <BrowserRouter>
          <main>
            <Header/>
            <Routes>
              <Route path='/' element={<Products/>}></Route>
              <Route path='/history' element={<RedeemHistory/>}></Route>
            </Routes>
          </main>
        </BrowserRouter>
      </ProductsProvider>

    
  );
};

export default App;
