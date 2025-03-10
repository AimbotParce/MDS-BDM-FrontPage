import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// The GET Request, but the client id is given as a query argument (in the URL)
export async function GET(req: Request, { params }: { params: { case_id: string } }) {
    const { case_id } = await params
    try {
        const c = await prisma.case.findUnique({ where: { id: case_id } })
        if (!c) return NextResponse.json({ error: "Case not found" }, { status: 404 })
        const keyWords = await prisma.keyWord.findMany({ where: { caseID: case_id } })
        c.keyWords = keyWords.map((keyWord) => keyWord.word)
        return NextResponse.json(c)
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch case" }, { status: 500 })
    }
}
