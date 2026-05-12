import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';

import SingleCustomerDetailsPage from "../components/app_components/CustomerDetailsPage/SingleCustomerDetailsPage";
import CustomerDetailProjectLayoutPage from "../components/app_components/CustomerDetailsPage/CustomerDetailProjectLayoutPage";
import SingleProductDetailsPage from "../components/app_components/ProductDetailsPage/SingleProductDetailsPage";
import ProductDetailProjectLayoutPage from "../components/app_components/ProductDetailsPage/ProductDetailProjectLayoutPage";
import SingleSalesDetailsPage from "../components/app_components/SalesDetailsPage/SingleSalesDetailsPage";
import SalesDetailProjectLayoutPage from "../components/app_components/SalesDetailsPage/SalesDetailProjectLayoutPage";
//  ~cb-add-import~

const AppRouter = () => {
    return (
        <Routes>
            {/* ~cb-add-unprotected-route~ */}
<Route path="/customerDetails/:singleCustomerDetailsId" exact element={<SingleCustomerDetailsPage />} />
<Route path="/customerDetails" exact element={<CustomerDetailProjectLayoutPage />} />
<Route path="/productDetails/:singleProductDetailsId" exact element={<SingleProductDetailsPage />} />
<Route path="/productDetails" exact element={<ProductDetailProjectLayoutPage />} />
<Route path="/salesDetails/:singleSalesDetailsId" exact element={<SingleSalesDetailsPage />} />
<Route path="/salesDetails" exact element={<SalesDetailProjectLayoutPage />} />
            <Route element={<ProtectedRoute redirectPath={'/login'} />}>{/* ~cb-add-protected-route~ */}</Route>
        </Routes>
    );
};

const mapState = (state) => {
    const { isLoggedIn } = state.auth;
    return { isLoggedIn };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data)
});

export default connect(mapState, mapDispatch)(AppRouter);
