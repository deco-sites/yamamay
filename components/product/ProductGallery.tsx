import { Product } from "deco-sites/std/commerce/types.ts";

import ProductCardSearch from "./ProductCardSearch.tsx";

export interface Columns {
  mobile?: number;
  desktop?: number;
}

export interface Props {
  products: Product[] | null;
}

function ProductGallery({ products }: Props) {
  return (
    <div class="grid grid-cols-2 gap-2 items-stretch sm:grid-cols-4 sm:gap-10">
      {products?.map((product, index) => (
        <ProductCardSearch product={product} preload={index === 0} />
      ))}
    </div>
  );
}

export default ProductGallery;
