import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// The GET Request, but the client id is given as a query argument (in the URL)
export async function GET(req: Request, { params }: { params: { client_id: string } }) {
    const { client_id } = await params
    try {
        const cases = await prisma.case.findMany({ where: { clientID: client_id } })
        if (!cases) return NextResponse.json({ error: "Cases not found" }, { status: 404 })

        // For each case, get the KeyWords
        for (let i = 0; i < cases.length; i++) {
            const keyWords = await prisma.keyWord.findMany({ where: { caseID: cases[i].id } })
            cases[i].keyWords = keyWords
        }

        return NextResponse.json(cases)
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch cases" }, { status: 500 })
    }
}

export async function POST(req: Request, { params }: { params: { client_id: string } }) {
    const { client_id } = await params
    console.log(client_id, req)
    try {
        const data = await req.json()
        const keyWords = data.keyWords
        delete data.keyWords
        const new_data = { ...data, clientID: client_id }
        console.log(new_data)
        const new_case = await prisma.case.create({ data: new_data })

        keyWords.forEach(async (keyWord: string) => {
            await prisma.keyWord.create({ data: { caseID: new_case.id, word: keyWord } })
        })

        return NextResponse.json(new_case, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: "Failed to create case" }, { status: 500 })
    }
}
