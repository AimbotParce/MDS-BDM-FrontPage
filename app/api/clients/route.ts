import { prisma } from "@/lib/prisma" // Assuming Prisma is used
import { NextResponse } from "next/server"

// GET all users
export async function GET() {
    try {
        const clients = await prisma.client.findMany()
        return NextResponse.json(clients)
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch clients" }, { status: 500 })
    }
}

// POST a new user
export async function POST(req: Request) {
    try {
        const data = await req.json()
        const newUser = await prisma.client.create({ data })
        return NextResponse.json(newUser, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: "Failed to create client" }, { status: 500 })
    }
}
