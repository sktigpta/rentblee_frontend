import { Routes, Route } from "react-router-dom"
import Home from "../pages/home/Home"
import { Logout } from "./authentication/Logout"
import { LoginPage } from "../pages/login/LoginPage"
import { RegisterPage } from "../pages/register/RegisterPage"
import ForgotPassword from "./authentication/ForgotPassword"
import ResetPassword from "./authentication/ResetPassword"
import BusinessRegistration from "../pages/business/BusinessRegistration"
import BusinessDashboard from "../pages/business/BusinessDashboard"
import CategoryPage from "../pages/categories/CategoryPage"
import BusinessPage from "../pages/business/BusinessPage"
import ProductPage from "../pages/product/ProductPage"

export const PageRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/logout" element={<Logout />} />


                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset/:token" element={<ResetPassword />} />


                <Route path="/business-registration" element={<BusinessRegistration />} />
                <Route path="/business-dashboard" element={<BusinessDashboard />} />


                <Route path="/category/:categoryId" element={<CategoryPage/>} />
                <Route path="/business/:businessId" element={<BusinessPage/>} />
                <Route path="/product/:productId" element={<ProductPage />} />
            </Routes>
        </>
    )
}