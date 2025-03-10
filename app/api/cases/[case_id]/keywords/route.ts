import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request, { params }: { params: { case_id: string } }) {
    const { case_id } = await params
    try {
        const data = await req.json()
        const new_keyword = await prisma.keyWord.create({ data: { caseID: case_id, word: data.keyWord } })

        return NextResponse.json(new_keyword, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: "Failed to create case" }, { status: 500 })
    }
}
