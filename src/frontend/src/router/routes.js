import Index from "@/views/Index";
import CartView from "@/views/CartView";
import OrdersView from "@/views/OrdersView";

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
      layout: "AppLayoutMain",
    },
  },
];
