import db from "../db.server";
import  shopify  from "../shopify.server";
import { json } from "@remix-run/node";
export async function loader({request}) {
  const shop = "shasky2.myshopify.com";
  const accessToken = "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";
  const response = await fetch(`https://${shop}/admin/api/2024-01/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken,
    },
    body: JSON.stringify({
      query: `
        query {
    products(first: 50) {
      edges {
        node {
          id
          title
          variants(first: 50) {
            edges {
              node {
                id
                title
                sku
                inventoryItem {
                  id
                  inventoryLevels(first: 10) {
                    edges {
                      node {
                        quantities(names: ["available"]){
                        id 
                        name
                        quantity
                        }
                        location {
                          id
                          name
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }`,
    }),
  });
  const productList = await response.json();
  const products = productList.data.products.edges;
  for (const product of products) {
    for (const variant of product.node.variants.edges) {
      const variantData = variant.node;
      const inventoryItem = variantData.inventoryItem;
      
      if (inventoryItem && inventoryItem.inventoryLevels.edges.length > 0) {
        for (const level of inventoryItem.inventoryLevels.edges) {
          const stockData = {
            shopifyProductId: product.node.id,
            shopifyVariantId: variantData.id,
            sku: product.node.title,
            inventoryItemId: inventoryItem.id,
            availableStock : level.node.quantities[0].quantity,
            locationId: level.node.location.id
          };
          

          // Update or Insert into Prisma
          await db.productStock.upsert({
            where: { shopifyVariantId: stockData.shopifyVariantId },
            update: { availableStock: stockData.availableStock, updatedAt: new Date() },
            create: stockData,
          });
        }
      }
    }
  }
  
  return {status:true};
}
