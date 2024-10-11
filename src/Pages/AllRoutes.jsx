import React from 'react';
import {Routes, Route} from 'react-router-dom'
import AddToCart from './AddToCart';
import Checkout from './Checkout';
import Home from './Home';
import NotFound from './NotFound';
import Products from './Products';
import SingleProduct from './SingleProduct';
import CreateAccount from '../Components/CreateAccount';
import Signup from '../Components/Signup';



const AllRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/products' element={<Products />}></Route>
            <Route path='/products/:id' element={<SingleProduct />}></Route>
            <Route path='/addtocart' element={<AddToCart/>}></Route>
            <Route path='/checkout' element={<Checkout />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/createaccount' element={<CreateAccount />}></Route>
            <Route path='*' element={<NotFound />}></Route>
        </Routes>
    );

}

export default AllRoutes