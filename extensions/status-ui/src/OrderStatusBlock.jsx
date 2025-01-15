import React, { useEffect } from "react";
import {
  reactExtension,
  Banner,
  BlockStack,
  Text,
  useAppMetafields
} from "@shopify/ui-extensions-react/customer-account";

export default reactExtension(
  "customer-account.order-status.block.render",
  () => <ItemStatus/>
);

function ItemStatus() {
  // order metafield values, specified in shopify.extension.toml
  const inStockDate = useAppMetafields({namespace: "custom", key: "item_in_stock_date"})[0]?.metafield?.value;
  const itemStatus = useAppMetafields({namespace: "custom", key: "order_status"})[0]?.metafield?.value.replace(/\["|\"]/g, ""); // Remove [" and "]
  // banner style based on item status
  const bannerStyle = itemStatus.includes("EXPIRED") ? "critical" : "success";

  return (
    <Banner status={bannerStyle}>
      <BlockStack>
        <Text size="large">Status: {itemStatus}</Text>
        <Text size="large">In Stock Date: {inStockDate}</Text>
      </BlockStack>
    </Banner>
  );
}

