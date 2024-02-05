import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server';
 
export function GET(req: Request | NextRequest) {
    console.log("API : /api/ being called");

    return NextResponse.json({
        message : "success"
    })
}