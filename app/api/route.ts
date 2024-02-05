import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server';
 
export function GET(req: NextApiRequest) {
    console.log("API : /api/ being called");

    return NextResponse.json({
        message : "success"
    })
}