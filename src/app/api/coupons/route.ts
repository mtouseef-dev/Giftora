import { NextResponse } from 'next/server';
import { COUPONS } from '@/data/mockData';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: COUPONS,
  });
}

export async function POST(request: Request) {
  try {
    const { code, subtotal } = await request.json();
    const cleanCode = code?.trim().toUpperCase();
    const coupon = COUPONS.find((c) => c.code === cleanCode && c.active);

    if (!coupon) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired coupon code.' },
        { status: 400 }
      );
    }

    if (subtotal && subtotal < coupon.minimumAmount) {
      return NextResponse.json(
        {
          success: false,
          message: `This coupon requires a minimum subtotal of ₹${coupon.minimumAmount}.`,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: coupon,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid coupon request' }, { status: 400 });
  }
}
