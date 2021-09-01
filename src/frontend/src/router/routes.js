import Index from "@/views/Index";
import CartView from "@/views/CartView";
import OrdersView from "@/views/OrdersView";
import ProfileView from "@/views/ProfileView";
import SignInView from "@/views/SignInView";

export default [
  {
    path: "",
    component: Index,
    meta: {
      layout: "AppLayoutMain",
    },
  },
  {
    path: "/cart",
    component: CartView,
    meta: {
      layout: "AppLayoutMain",
    },
  },
  {
    path: "/orders",
    component: OrdersView,
    meta: {
      layout: "AppLayoutDefault",
      title: "История заказов",
    },
  },
  {
    path: "/profile",
    component: ProfileView,
    meta: {
      layout: "AppLayoutMain",
      title: "Мои данные",
    },
  },
  {
    path: "/sign-in",
    component: SignInView,
    meta: {
      layout: "AppLayoutEmpty",
    },
  },
];
