import { Pool } from "@neondatabase/serverless";

// Determine if DATABASE_URL is configured
export function isDatabaseConfigured(): boolean {
  const url = process.env.DATABASE_URL;
  return Boolean(url && url.trim().length > 0 && !url.includes("ep-sample"));
}

let poolInstance: Pool | null = null;

export function getPool(): Pool | null {
  if (!isDatabaseConfigured()) {
    return null;
  }

  if (!poolInstance) {
    const connectionString = process.env.DATABASE_URL!;
    poolInstance = new Pool({ connectionString });
  }

  return poolInstance;
}

/**
 * Execute a parameterized SQL query against NeonDB.
 * Supports parameterized inputs ($1, $2, etc.) to prevent SQL injection.
 */
export async function query<T = any>(
  text: string,
  params?: any[]
): Promise<{ rows: T[]; rowCount: number }> {
  const pool = getPool();

  if (!pool) {
    console.warn(
      "[ONcue NeonDB] DATABASE_URL is not configured yet. Set it in .env.local"
    );
    throw new Error(
      "DATABASE_NOT_CONFIGURED: Please provide your NeonDB connection string in .env.local"
    );
  }

  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return {
      rows: res.rows as T[],
      rowCount: res.rowCount ?? 0,
    };
  } catch (error: any) {
    console.error("[ONcue NeonDB Query Error]", {
      query: text,
      params,
      message: error.message,
    });
    throw error;
  } finally {
    client.release();
  }
}
