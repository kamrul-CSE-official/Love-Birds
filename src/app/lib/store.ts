import toast from "react-hot-toast";
import { create } from "zustand";

interface IProduct {
  name: string;
  category: string;
  brand?: string;
  images?: string[];
  image: string;
  price: string;
  _id: string;
  from?: string;
  quantity?: number;
}

// Define the store interface
interface StoreState {
  products: IProduct[];
  wishlist: IProduct[];
  orderList: IProduct[];
  addToCart: (product: IProduct) => void;
  removeFromCart: (id: string) => void;
  addToWishlist: (product: IProduct) => void;
  removeFromWishlist: (id: string) => void;
  addToOrderList: (products: IProduct[]) => void;
  removeFromOrderList: (id: string) => void;
}

// Create the Zustand store
const useStore = create<StoreState>((set, get) => ({
  products: [],
  wishlist: [],
  orderList: [],

  // Add product to cart and remove from wishlist if it exists
  addToCart: (product: IProduct) => {
    const { products, wishlist, removeFromWishlist } = get();
    const existsInCart = products.find((item) => item._id === product._id);

    if (!existsInCart) {
      // Remove from wishlist if it exists there
      const existsInWishlist = wishlist.find(
        (item) => item._id === product._id
      );
      if (existsInWishlist) {
        removeFromWishlist(product._id);
      }

      toast.success("Product added to cart.");
      product.from = "addToCart"; // Mark the source as cart
      set((state) => ({
        products: [...state.products, product],
      }));
    } else {
      toast.error("Product is already in the cart!");
    }
  },

  // Remove product from cart
  removeFromCart: (id: string) => {
    toast.success("Product removed from cart!");
    set((state) => ({
      products: state.products.filter((product) => product._id !== id),
    }));
  },

  // Add product to wishlist and remove from cart if it exists
  addToWishlist: (product: IProduct) => {
    const { wishlist, products, removeFromCart } = get();
    const existsInWishlist = wishlist.find((item) => item._id === product._id);

    if (!existsInWishlist) {
      // Remove from cart if it exists there
      const existsInCart = products.find((item) => item._id === product._id);
      if (existsInCart) {
        removeFromCart(product._id);
      }

      toast.success("Product added to wishlist.");
      product.from = "wishlist"; // Mark the source as wishlist
      set((state) => ({
        wishlist: [...state.wishlist, product],
      }));
    } else {
      toast.error("Product is already in the wishlist!");
    }
  },

  // Remove product from wishlist
  removeFromWishlist: (id: string) => {
    toast.success("Product removed from wishlist!");
    set((state) => ({
      wishlist: state.wishlist.filter((product) => product._id !== id),
    }));
  },

  // Add products to order list and remove from cart if they exist
  addToOrderList: (products: IProduct[]) => {
    const { orderList, products: cartProducts, removeFromCart } = get();

    // Filter out products already in the order list
    const newProducts = products.filter(
      (product) => !orderList.some((item) => item._id === product._id)
    );

    // Remove from cart if they exist there
    newProducts.forEach((product) => {
      const existsInCart = cartProducts.find(
        (item) => item._id === product._id
      );
      if (existsInCart) {
        removeFromCart(product._id);
      }
    });

    if (newProducts.length > 0) {
      toast.success("Products added to order list.");
      set((state) => ({
        orderList: [...state.orderList, ...newProducts],
      }));
    } else {
      toast.error("Some products are already in the order list!");
    }
  },

  // Remove product from order list
  removeFromOrderList: (id: string) => {
    toast.success("Product removed from order list!");
    set((state) => ({
      orderList: state.orderList.filter((product) => product._id !== id),
    }));
  },
}));

export default useStore;
