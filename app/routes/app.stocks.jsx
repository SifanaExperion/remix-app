import {
  IndexTable,
  LegacyCard,
  useIndexResourceState,
  Text,
  Badge,
} from '@shopify/polaris';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import db from "../db.server";

// Loader function to fetch order data
export const loader = async () => {
  const orders = await db.productStock.findMany();
  // Fetch orders from Shopify API or database
  return json({ orders });
};

export default function SimpleIndexTableExample() {
  const { orders } = useLoaderData();

  const resourceName = {
    singular: 'order',
    plural: 'orders',
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(orders);

  const rowMarkup = orders.map(
    ({ id,sku,availableStock, updatedAt}, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {sku}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{sku}</IndexTable.Cell>
        <IndexTable.Cell>{availableStock}</IndexTable.Cell>
        <IndexTable.Cell> {updatedAt}</IndexTable.Cell>
       
      </IndexTable.Row>
    )
  );

  return (
    <LegacyCard>
      <IndexTable
        resourceName={resourceName}
        itemCount={orders.length}
        selectedItemsCount={allResourcesSelected ? 'All' : selectedResources.length}
        onSelectionChange={handleSelectionChange}
        headings={[
          { title: 'Product' },
          { title: 'Sku' },
          { title: 'Available Stock' },
          { title: 'Updated Date' },
        ]}
      >
        {rowMarkup}
      </IndexTable>
    </LegacyCard>
  );
}
