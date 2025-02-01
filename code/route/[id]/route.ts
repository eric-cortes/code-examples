import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../auth/authConfig';
export const dynamic = "force-dynamic"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id: tourId } = params;
        const session = await getServerSession(authOptions);
        const response = await fetch(`${process.env.API_BASE_URL}/tour/${tourId}`, {
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


export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions);
        const { id: tourId } = params;
        const response = await fetch(`${process.env.API_BASE_URL}/tour/${tourId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-injected-oid': (session?.user as any).profile.oid,
            },
        });
        const responseBody = await response.json();
        if (response.status === 204) {
            return NextResponse.json({ message: 'Resource deleted successfully', success: true, responseBody });
        } else {
            return NextResponse.json({ message: 'Failed to delete resource', success: false, responseBody });
        }
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: err, success: false });
    }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions);
        const { id: tourId } = params;
        const data = await request.json();
        const response = await fetch(`${process.env.API_BASE_URL}/tour/${tourId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'x-injected-oid': (session?.user as any).profile.oid,
            },
            body: JSON.stringify(data),
        });
        const responseBody = await response.json();
        return NextResponse.json(responseBody);
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: err, success: false });
    }
}
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        const data = await request.json();

        const response = await fetch(`${process.env.API_BASE_URL}/tour`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-injected-oid': (session?.user as any).profile.oid,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Failed to create tour');
        }

        const responseBody = await response.json();
        return NextResponse.json(responseBody);
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: err, success: false }, { status: 500 });
    }
}