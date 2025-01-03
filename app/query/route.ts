import { db } from "@vercel/postgres";
import { invoices, customers, revenue, users } from "../lib/placeholder-data";

const client = await db.connect();

async function query() {
  const result = await client.sql`SELECT invoices.amount, customers.name
                FROM invoices
                JOIN customers ON invoices.customer_id = customers.id
                WHERE invoices.amount = 666;`;

  return result.rows;
}

export async function GET() {
  try {
    const resp = await query();
    return Response.json({
      data: resp,
      message: "Data fetched successfully",
      status: 200
    });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
