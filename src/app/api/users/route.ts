import { getErrorMessage } from '@/lib/soli/utils/api/get-error-message';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const text = req.nextUrl.searchParams.get('q') || '';
  const limit = req.nextUrl.searchParams.get('limit') || 0;
  const res = await fetch(
    `https://dummyjson.com/users/search?q=${text}&limit=${limit}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await res.json();
  if (!res.ok) {
    const errorMessage = getErrorMessage(data);
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: res.status,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
