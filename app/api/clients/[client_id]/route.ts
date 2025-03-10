import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// The GET Request, but the client id is given as a query argument (in the URL)
export async function GET(req: Request, { params }: { params: { client_id: string } }) {
    const { client_id } = await params
    try {
        const client = await prisma.client.findUnique({ where: { id: client_id } })
        if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 })
        return NextResponse.json(client)
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 })
    }
}
