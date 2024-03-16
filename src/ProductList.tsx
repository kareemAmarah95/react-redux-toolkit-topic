import { useEffect } from "react";
import ProductCard from "./components/ProductCard";
import { IProduct } from "./interface/index";
import { getProductList } from "./app/features/products/productsSlice";
import { useAppDispatch } from "../src/app/store";

const ProductList = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProductList());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md">
      {[].map((product: IProduct) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
