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
    const stockList = await db.productStock.findMany();
    return json({ stockList });
  };
  
 