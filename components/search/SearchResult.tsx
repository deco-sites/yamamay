import Filters from "deco-sites/fashion/components/search/Filters.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import SearchControls from "deco-sites/fashion/islands/SearchControls.tsx";
import { SendEventOnLoad } from "deco-sites/fashion/sdk/analytics.tsx";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { useOffer } from "deco-sites/fashion/sdk/useOffer.ts";
import ProductGallery, { Columns } from "../product/ProductGallery.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";
import Breadcrumb from "deco-sites/fashion/components/ui/Breadcrumb.tsx";
import Pagination from "deco-sites/yamamay/components/search/Pagination.tsx";

export interface Props {
  page: LoaderReturnType<ProductListingPage | null>;
  /**
   * @description Use drawer for mobile like behavior on desktop. Aside for rendering the filters alongside the products
   */
  variant?: "aside" | "drawer";
  /**
   * @description Number of products per line on grid
   */
  columns: Columns;
}

function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-10">
      <span>Not Found!</span>
    </div>
  );
}

const irrelevantFilter = ["Brand", "Category 2", "Category 4"];

function Result({
  page,
  variant,
}: Omit<Props, "page"> & { page: ProductListingPage }) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;

  const relevantFilters = filters.filter((filter) =>
    !irrelevantFilter.includes(filter.label)
  );
  // console.log(filters);

  return (
    <>
      <div class="container px-4 sm:py-10">
        <div class="flex flex-row items-center sm:p-0 mb-2 border-b">
          <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
        </div>
        <SearchControls
          sortOptions={sortOptions}
          filters={relevantFilters}
          breadcrumb={breadcrumb}
          displayFilter={variant === "drawer"}
        />

        <div class="flex flex-row">
          <div class="flex-grow">
            <ProductGallery products={products} />
          </div>
        </div>
        {console.log(pageInfo)}
        <Pagination pageInfo={pageInfo} maxItems={7} />
      </div>
      <SendEventOnLoad
        event={{
          name: "view_item_list",
          params: {
            // TODO: get category name from search or cms setting
            item_list_name: "",
            item_list_id: "",
            items: page.products?.map((product) =>
              mapProductToAnalyticsItem({
                ...(useOffer(product.offers)),
                product,
                breadcrumbList: page.breadcrumb,
              })
            ),
          },
        }}
      />
    </>
  );
}

function SearchResult({ page, ...props }: Props) {
  if (!page) {
    return <NotFound />;
  }

  return <Result {...props} page={page} />;
}

export default SearchResult;
