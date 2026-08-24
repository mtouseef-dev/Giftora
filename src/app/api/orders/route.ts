import { NextResponse } from 'next/server';
import { generateOrderId } from '@/lib/utils';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const orderNumber = generateOrderId();
    const order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      status: 'CONFIRMED',
      paymentStatus: body.paymentMethod === 'COD' ? 'PENDING' : 'PAID',
      createdAt: new Date().toISOString(),
      ...body,
    };

    return NextResponse.json({
      success: true,
      message: 'Order created successfully',
      data: order,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create order' }, { status: 400 });
  }
}
