import { API_URL } from '@/lib/soli/consts/envs.const';
import { getErrorMessage } from '@/lib/soli/utils/api/get-error-message';

export async function GET() {
  const res = await fetch(`${API_URL}v1/users/countries`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
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
