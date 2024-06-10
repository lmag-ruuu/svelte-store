import { supplier } from './../../db/supplier.entity';
import { orders, type InsertOrder, type SelectOrder, type SelectOrderByBundleId } from "$lib/db/order.entity";
import { db } from "$lib/db";
import { product } from "$lib/db/product.entity";
import { eq, inArray } from "drizzle-orm";
import { OrderProduct } from '$lib/db/order_product.entity';
import { v4 as uuidv4 } from 'uuid';

export interface IOrderPayload {
  customer_id: number;
  order_date: string;
  postal_code: string;
  city: string;
  country: string;
  state: string;
  products: Array<{ id: string, quantity: number, supplier_id: string }>
}

export const placeOrder = async (data: IOrderPayload) => {
  await db.transaction(async (trx) => {
    const bundle_order_id = uuidv4();
    const products = await trx.select().from(product).where(inArray(product.id, data.products.map((p) => +p.id)));
    const products_by_supplier = data.products.reduce((acc, current) => {
      const existing = acc.find((p) => p.supplier_id === current.supplier_id);
      if (existing) {
        existing.products.push({ id: current.id, quantity: current.quantity });
      } else {
        acc.push({ supplier_id: current.supplier_id, products: [{ id: current.id, quantity: current.quantity }] });
      }
      return acc;
    }, [] as unknown as Array<{ supplier_id: string, products: Array<{ id: string, quantity: number }> }>);

    const newOrders: InsertOrder[] = products_by_supplier.map((p) => ({
      customer_id: +data.customer_id,
      supplier_id: +p.supplier_id,
      order_date: data.order_date,
      total: products
        .filter((i) => +i.id === +p.supplier_id)
        .reduce((acc, current) => acc + +current.price * data?.products?.find((p) => +p?.id === current?.id)?.quantity!, 0).toString(),
      postal_code: data.postal_code,
      city: data.city,
      country: data.country,
      state: data.state,
      status: 'pending',
      order_bundle_id: bundle_order_id
    }));

    const promises = newOrders.map(async (o) => {
      const order = await trx.insert(orders).values(o).returning();
      await trx.insert(OrderProduct).values(
        data.products
          .filter((i) => +i.supplier_id === +order[0].supplier_id)
          .map((p) => ({
            order_id: order[0]?.id,
            product_id: +p.id,
            quantity: p.quantity
          }))
      );
    });

    await Promise.all(promises);
  });
  return {
    status: 200,
    message: 'Order placed successfully'
  }
}

export const getOrdersByCustomer = async (customer_id: number) => {
  const ordersByCustomer = await db.query.orders.findMany({
    where: eq(orders.customer_id, customer_id),
    with: {
      products_in_order: {
        columns: {
          quantity: true
        },
        with: {
          product: true
        },
        extras: {

        }
      }
    }
  });

  const ordersByOrderBundleId = ordersByCustomer
    .reduce((acc, current) => {
      const existing = acc.find((o) => o.name === current.order_bundle_id);
      if (existing) {
        existing.orders.push(current);
      } else {
        acc.push({ name: current.order_bundle_id, orders: [current] });
      }
      return acc;
    }, [] as unknown as SelectOrderByBundleId);

  return ordersByOrderBundleId;
};

export const getOrdersBySupplier = async (supplier_id: number) => {
  const ordersBySupplier = await db.query.orders.findMany({
    where: eq(orders.supplier_id, supplier_id),
    with: {
      products_in_order: {
        columns: {
          quantity: true
        },
        with: {
          product: true
        }
      }
    }
  });

  return ordersBySupplier;
};