import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { amount, currency = 'INR', orderId } = await request.json();

    // Simulated Razorpay order creation & signature verification
    const simulatedRazorpayOrder = {
      id: `order_rzp_${Date.now()}`,
      entity: 'order',
      amount: amount * 100, // paise
      amount_paid: 0,
      amount_due: amount * 100,
      currency,
      receipt: orderId || `rcpt_${Date.now()}`,
      status: 'created',
      attempts: 0,
      created_at: Math.floor(Date.now() / 1000),
    };

    return NextResponse.json({
      success: true,
      data: simulatedRazorpayOrder,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Payment initialization failed' },
      { status: 500 }
    );
  }
}
