import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
	try {
		const { permalink } = req.query as { permalink?: string };
		if (!permalink) return res.status(400).json({ error: 'permalink is required' });
		const clean = String(permalink).startsWith('/') ? String(permalink) : `/${permalink}`;
		const url = `https://www.reddit.com${clean}.json`;
		const r = await fetch(url, {
			headers: { 'User-Agent': 'reddit-client-demo/1.0 (https://vercel.app)' },
			cache: 'no-store',
		});
		if (!r.ok) return res.status(r.status).json({ error: `Reddit upstream returned ${r.status}` });
		const data = await r.json();
		res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
		return res.status(200).json(data);
	} catch (e: any) {
		return res.status(500).json({ error: e?.message || 'Unknown error' });
	}
}
