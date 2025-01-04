// @mui icons
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FolderIcon from "@mui/icons-material/Folder";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Products from "layouts/products";
import Customers from "layouts/customers";
import Delivery from "layouts/delivery";
import Order from "layouts/order";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import MainCategories from "layouts/categories/main-category";
import SubCategories from "layouts/categories/sub-category";

// @mui icons
import Icon from "@mui/material/Icon";
import ProductDetails from "layouts/products/data/ProductDetails";
import VendorManagement from "layouts/authentication/VendorManagement";

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
    name: <> التصنيفات {<ExpandMoreIcon fontSize="small" />} </>,
    key: "categories",
    icon: <CategoryIcon fontSize="small" />,
    collapse: [
      {
        type: "collapse",
        name: "التصنيفات الأساسية",
        key: "MAINcategories",
        route: "/categories/main-category",
        icon: <FolderIcon fontSize="small" />,
        component: <MainCategories />,
      },
      {
        type: "collapse",
        name: "التصنيفات الفرعية",
        key: "subcategories",
        route: "/categories/sub-category",
        icon: <SubdirectoryArrowRightIcon fontSize="small" />,
        component: <SubCategories />,
      },
    ],
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
    name: "العملاء",
    key: "customers",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/customers",
    component: <Customers />,
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
    route: "/delivery",
    component: <Delivery />,
  },
  {
    type: "collapse",
    name: "إنشاء حساب جديد",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
    visibleToMainVendor: true,
  },
  {
    type: "collapse",
    name: "ادارة البائعين",
    key: "vendor-management",
    icon: <Icon fontSize="small">groups</Icon>, // Updated icon
    route: "/authentication/vendor-management",
    component: <VendorManagement />,
    visibleToMainVendor: true,
  },
  {
    type: "collapse",
    name: "تسجيل خروج",
    key: "log-out",
    icon: <ExitToAppIcon fontSize="small">Logout</ExitToAppIcon>,
    route: "/",
    component: <SignIn />,
  },
  {
    route: "/products/:id",
    component: <ProductDetails />,
  },
];

export default routes;
