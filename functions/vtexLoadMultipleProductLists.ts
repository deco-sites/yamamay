import { withISFallback } from "deco-sites/std/commerce/vtex/withISFallback.ts";
import loader from "deco-sites/std/functions/vtexProductList.ts";
import type { LoaderFunction } from "$live/types.ts";
import type { StateVTEX } from "deco-sites/std/packs/vtex/types.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";

export interface UnitProp {
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
   * @title Collection ID
   * @pattern \d*
   */
  collection?: string[];
}

export interface Props {
  queries: Array<UnitProp>;
}

/**
 * @title VTEX product list - Intelligent Search (deprecated)
 * @description Usefull for shelves and static galleries.
 * @deprecated true
 */
const loaderV0: LoaderFunction<
  Props,
  Product[][] | null,
  StateVTEX
> = withISFallback(async (
  req,
  ctx,
  props,
) => {
  const productsList = [];

  if (!props.queries.length) return { data: null, status: 404 };

  for (const prop of props.queries) {
    const p = prop.query
      ? { query: prop.query, count: prop.count }
      : { collection: prop.collection?.[0], count: prop.count };

    const data = await loader(
      p,
      req,
      ctx.state,
    );

    if (!data) return { data: null };

    productsList.push(data);
  }

  return { data: productsList, status: productsList.length > 0 ? 200 : 404 };
});

export default loaderV0;
