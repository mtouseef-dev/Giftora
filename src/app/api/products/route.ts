import { NextResponse } from 'next/server';
import { PRODUCTS } from '@/data/mockData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const occasion = searchParams.get('occasion');

  let results = [...PRODUCTS];

  if (category && category !== 'all') {
    results = results.filter((p) => p.categoryId === category || p.slug === category);
  }

  if (occasion && occasion !== 'all') {
    results = results.filter((p) =>
      p.occasion.some((o) => o.toLowerCase() === occasion.toLowerCase())
    );
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  return NextResponse.json({
    success: true,
    count: results.length,
    data: results,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newProduct = {
      id: `prod-${Date.now()}`,
      ...body,
      createdAt: new Date().toISOString(),
    };
    return NextResponse.json({ success: true, data: newProduct }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid product payload' }, { status: 400 });
  }
}
