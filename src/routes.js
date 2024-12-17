/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// @mui icons
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Products from "layouts/products";
import Billing from "layouts/billing";
import Order from "layouts/order";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";
import MainCategories from "layouts/categories/main-category";
import SubCategories from "layouts/categories/sub-category";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import CoverLayout from "layouts/authentication/components/CoverLayout";

const routes = [
  {
    key: "dashboard",
    route: "/dashboard",
    component: <Dashboard />,
    name: "لوحة التحكم",
    icon: "dashboard",
  },
  {
    type: "collapse",
    name: "المنتجات", // "Products" in Arabic
    key: "products",
    icon: <ShoppingCartIcon fontSize="small" />,
    route: "/products",
    component: <Products />,
  },
  {
    type: "collapse",
    name: "التصنيفات", // "Categories" in Arabic
    key: "categories",
    icon: <CategoryIcon fontSize="small" />,
    collapse: [
      {
        type: "collapse",
        name: "التصنيفات الاساسية", // "Main Categories" in Arabic
        key: "MAINcategories",
        route: "/categories/main-category",
        component: <MainCategories />,
      },
      {
        type: "collapse",
        name: "التصنيفات الثانوية", // "Sub Categories" in Arabic
        key: "subcategories",
        route: "/categories/sub-category",
        component: <SubCategories />,
      },
    ],
  },
  {
    type: "collapse",
    name: "الطلبات", // "Orders" in Arabic
    key: "order",
    icon: <ShoppingBagIcon fontSize="small" />,
    route: "/orders",
    component: <Order />,
  },
  {
    type: "collapse",
    name: "التوصيل", // "Delivery" in Arabic
    key: "delivery",
    icon: <DeliveryDiningIcon fontSize="small" />,
    route: "/billing",
    component: <Billing />,
  },
  {
    type: "collapse",
    name: "تسجيل دخول", // "Sign In" in Arabic
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "إنشاء حساب جديد", // "Sign Up" in Arabic
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
];

export default routes;
