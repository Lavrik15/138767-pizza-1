import Index from "@/views/Index";
import CartView from "@/views/CartView";

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
];
