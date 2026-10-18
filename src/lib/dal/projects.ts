import { query } from "@/lib/db/neon";

export interface ProjectEntity {
  id: string;
  contractor_id: string;
  client_id: string;
  client_name?: string;
  title: string;
  contract_value_cad: number;
  paid_cad: number;
  retainage_pct: number;
  start_date: string;
  target_end_date: string;
  status: "In Progress" | "Completed" | "Pending Approval";
  milestones?: any[];
  created_at: string;
  updated_at: string;
}

export async function getProjects(contractorId: string): Promise<ProjectEntity[]> {
  const res = await query<ProjectEntity>(
    `SELECT p.*, COALESCE(c.name, 'Direct Client') as client_name
     FROM projects p
     LEFT JOIN clients c ON p.client_id = c.id
     WHERE p.contractor_id = $1
     ORDER BY p.start_date DESC`,
    [contractorId]
  );
  return res.rows;
}

export async function getProjectById(
  contractorId: string,
  projectId: string
): Promise<{ project: ProjectEntity; milestones: any[]; invoices: any[] } | null> {
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(projectId);
  let pRes;
  if (isUuid) {
    pRes = await query<ProjectEntity>(
      `SELECT p.*, COALESCE(c.name, 'Direct Client') as client_name
       FROM projects p
       LEFT JOIN clients c ON p.client_id = c.id
       WHERE p.id = $1 AND p.contractor_id = $2
       LIMIT 1`,
      [projectId, contractorId]
    );
  } else {
    // Alias or title fallback
    const slug = projectId.toLowerCase().replace(/[^a-z0-9]/g, "%");
    pRes = await query<ProjectEntity>(
      `SELECT p.*, COALESCE(c.name, 'Direct Client') as client_name
       FROM projects p
       LEFT JOIN clients c ON p.client_id = c.id
       WHERE p.contractor_id = $1 AND (LOWER(p.title) LIKE $2 OR p.id::text LIKE $2)
       LIMIT 1`,
      [contractorId, `%${slug}%`]
    );
  }

  if (pRes.rows.length === 0) return null;

  const realProjectId = pRes.rows[0].id;

  const milestonesRes = await query(
    `SELECT * FROM project_milestones WHERE project_id = $1 ORDER BY due_date ASC`,
    [realProjectId]
  );

  const invoicesRes = await query(
    `SELECT * FROM invoices WHERE project_id = $1 AND contractor_id = $2 ORDER BY issued_date DESC`,
    [realProjectId, contractorId]
  );

  return {
    project: pRes.rows[0],
    milestones: milestonesRes.rows,
    invoices: invoicesRes.rows,
  };
}

export async function createProject(
  contractorId: string,
  data: {
    clientId: string;
    title: string;
    contractValueCAD: number;
    startDate: string;
    targetEndDate: string;
    retainagePct?: number;
  }
): Promise<ProjectEntity> {
  const insertRes = await query<{ id: string }>(
    `INSERT INTO projects (
       contractor_id, client_id, title, contract_value_cad, paid_cad, retainage_pct, start_date, target_end_date, status
     ) VALUES (
       $1, $2, $3, $4, 0.00, $5, $6, $7, 'In Progress'
     ) RETURNING id`,
    [
      contractorId,
      data.clientId,
      data.title.trim(),
      data.contractValueCAD,
      data.retainagePct !== undefined ? data.retainagePct : 10,
      data.startDate,
      data.targetEndDate,
    ]
  );

  const res = await query<ProjectEntity>(
    `SELECT p.*, COALESCE(c.name, 'Direct Client') as client_name
     FROM projects p
     LEFT JOIN clients c ON p.client_id = c.id
     WHERE p.id = $1`,
    [insertRes.rows[0].id]
  );

  return res.rows[0];
}
