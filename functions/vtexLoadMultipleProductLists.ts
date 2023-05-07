import type { LoaderFunction } from "$live/types.ts";

import { withSegment } from "deco-sites/std/commerce/vtex/withSegment.ts";
import { withISFallback } from "deco-sites/std/commerce/vtex/withISFallback.ts";
import { toProduct } from "deco-sites/std/commerce/vtex/transform.ts";
import { createClient } from "deco-sites/std/commerce/vtex/client.ts";
import type { StateVTEX } from "deco-sites/std/commerce/vtex/types.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import type { SearchArgs, Sort } from "deco-sites/std/commerce/vtex/types.ts";

export interface QueryProps {
  /** @description query to use on search */
  query: string;
  /** @description total number of items to display */
  count: number;
  //* @enumNames ["relevance", "greater discount", "arrivals", "name asc", "name desc", "most ordered", "price asc", "price desc"]
  /**
   * @description search sort parameter
   */
  sort?:
    | ""
    | "price:desc"
    | "price:asc"
    | "orders:desc"
    | "name:desc"
    | "name:asc"
    | "release:desc"
    | "discount:desc";

  // TODO: pattern property isn't being handled by RJSF
  /**
   * @description Collection ID or (Product Cluster id). For more info: https://developers.vtex.com/docs/api-reference/search-api#get-/api/catalog_system/pub/products/search .
   * @pattern \d*
   */
  collection?: string[];
}
export interface Props {
  queries: Array<QueryProps>;
}

/**
 * @title Product list loader
 * @description Usefull for shelves and static galleries.
 */
const multipleProductListLoader: LoaderFunction<
  Props,
  Product[][] | null,
  StateVTEX
> = withSegment(withISFallback(async (
  req,
  ctx,
  props,
) => {
  const { global: { configVTEX }, segment } = ctx.state;
  const url = new URL(req.url);
  const vtex = createClient(configVTEX);

  const productsList = [];

  for (const prop of props.queries) {
    const count = prop.count ?? 12;
    const query = prop.query || "";
    const sort: Sort = prop.sort || "";
    const selectedFacets: SearchArgs["selectedFacets"] = [];

    if (prop.collection) {
      prop.collection.forEach((productClusterId) => {
        selectedFacets.push({
          key: "productClusterIds",
          value: productClusterId,
        });
      });
    }

    // search products on VTEX. Feel free to change any of these parameters
    const { products: vtexProducts } = await vtex.search.products({
      query,
      page: 0,
      count,
      sort,
      selectedFacets,
      segment,
    });

    // Transform VTEX product format into schema.org's compatible format
    // If a property is missing from the final `products` array you can add
    // it in here
    const products = vtexProducts.map((p) =>
      toProduct(p, p.items[0], 0, { url, priceCurrency: vtex.currency() })
    );

    productsList.push(products);
  }

  return {
    data: productsList,
  };
}));

export default multipleProductListLoader;
