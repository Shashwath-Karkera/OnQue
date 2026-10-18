import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/dal/auth";
import { getPayments, recordPayment } from "@/lib/dal/payments";

export async function GET(request: Request) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const payments = await getPayments(user.id);
    return NextResponse.json({ success: true, payments });
  } catch (error: any) {
    console.error("[GET /api/payments Error]", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    if (!body.invoiceId || !body.amountCAD || !body.paymentMethod) {
      return NextResponse.json(
        { success: false, error: "Invoice ID, amount, and payment method are required." },
        { status: 400 }
      );
    }

    const payment = await recordPayment(user.id, {
      invoiceId: body.invoiceId,
      amountCAD: parseFloat(body.amountCAD),
      paymentMethod: body.paymentMethod,
      transactionRef: body.transactionRef,
      settledAt: body.settledAt,
    });

    return NextResponse.json({ success: true, payment }, { status: 201 });
  } catch (error: any) {
    console.error("[POST /api/payments Error]", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
