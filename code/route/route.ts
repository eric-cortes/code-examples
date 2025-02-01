import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/authConfig';
export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        const date = request.nextUrl.searchParams.get("bookingDate")
        const response = await fetch(`${process.env.API_BASE_URL}/tour?plannedDate=${date}`, {
            headers: {
                'Content-Type': 'application/json',
                'x-injected-oid': (session?.user as any).profile.oid,
            }
        });
        const data = await response.json();
        return NextResponse.json(data);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: err, success: false });
    }
}