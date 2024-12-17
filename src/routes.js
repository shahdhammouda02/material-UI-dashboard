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
    name: "المنتجات",
    key: "products",
    icon: <ShoppingCartIcon fontSize="small" />,
    route: "/products",
    component: <Products />,
  },
  {
    type: "collapse",
    name: "التصنيفات",
    key: "categories",
    icon: <CategoryIcon fontSize="small" />,
    collapse: [
      {
        type: "collapse",
        name: "التصنيفات الاساسية",
        key: "MAINcategories",
        route: "/categories/main-category",
        component: <MainCategories />,
      },
      {
        type: "collapse",
        name: "التصنيفات الثانوية",
        key: "subcategories",
        route: "/categories/sub-category",
        component: <SubCategories />,
      },
    ],
  },
  {
    type: "collapse",
    name: "الطلبات",
    key: "order",
    icon: <ShoppingBagIcon fontSize="small" />,
    route: "/orders",
    component: <Order />,
  },
  {
    type: "collapse",
    name: "التوصيل",
    key: "delivery",
    icon: <DeliveryDiningIcon fontSize="small" />,
    route: "/billing",
    component: <Billing />,
  },
  {
    type: "collapse",
    name: "تسجيل دخول",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "إنشاء حساب جديد",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
];

export default routes;
