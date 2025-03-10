"use client"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Home() {
    const [cse, setCase] = useState({})
    const [client, setClient] = useState({})

    const params = useParams()
    const case_id = params.case_id

    const fetchCase = async () => {
        const res = await fetch(`/api/cases/${case_id}`, {
            method: "GET",
        })
        const data = await res.json()
        setCase(data)
        const res2 = await fetch(`/api/clients/${data.clientID}`, {
            method: "GET",
        })
        const data2 = await res2.json()
        setClient(data2)
    }

    console.log(cse)

    useEffect(() => {
        fetchCase()
    }, [])

    return (
        <div className="flex flex-col gap-y-4 items-center p-16">
            <h1 className="font-bold text-2xl">Case Page</h1>
            <div className="grid grid-cols-[min-content_min-content] text-nowrap gap-x-24 gap-y-2">
                <div className="grid grid-cols-[min-content_min-content] text-nowrap gap-x-4 gap-y-2">
                    <p className="font-bold">Product</p>
                    <p>{cse.product}</p>
                    <p className="font-bold">ID</p>
                    <a href={`/cases/${cse.id}`} className="text-blue-500">
                        {cse.id}
                    </a>
                    <p className="font-bold">Description</p>
                    <p>{cse.description}</p>
                    <p className="font-bold">Created At</p>
                    <p>{cse.createdAt}</p>
                    <p className="font-bold">Updated At</p>
                    <p>{cse.updatedAt}</p>
                    <p className="font-bold">Status</p>
                    <p>{cse.status}</p>
                    <p className="font-bold">Enabled</p>
                    <p>{cse.enabled ? "✅" : "❌"}</p>
                    <p className="font-bold">Key Words</p>
                    <ul className="flex">{cse.keyWords?.join(", ")}</ul>
                </div>

                <div className="grid grid-cols-[min-content_min-content] text-nowrap gap-x-4 gap-y-2">
                    <p className="font-bold">Client Name</p>
                    <p>{client.name}</p>
                    <p className="font-bold">Client ID</p>
                    <a href={`/clients/${client.id}`} className="text-blue-500">
                        {client.id}
                    </a>
                    <p className="font-bold">Client Email</p>
                    <a href={`mailto:${client.email}`} className="text-blue-500">
                        {client.email}
                    </a>
                    <p className="font-bold">Client Phone</p>
                    <p>{client.phone}</p>
                </div>
            </div>

            <h1 className="font-bold text-2xl">Add Key Word</h1>
            <form
                onSubmit={async (e) => {
                    e.preventDefault()
                    const keyWord = document.getElementById("key-word").value.trim()
                    if (!keyWord) return

                    const res = await fetch(`/api/cases/${case_id}/keywords`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ keyWord }),
                    })

                    if (res.status === 201) {
                        fetchCase()
                        // Clear input fields
                        document.getElementById("key-word").value = ""
                    }
                }}
                className="flex flex-col gap-y-4 items-end border rounded-md p-4"
            >
                <div className="grid grid-cols-[min-content_min-content] text-nowrap gap-x-4 gap-y-2">
                    <label htmlFor="key-word">Key Word</label>
                    <input type="text" placeholder="Key Word" id="key-word" className="border rounded-md px-2" />
                </div>
                <button type="submit" className="border rounded-md px-2">
                    Add Key Word
                </button>
            </form>
        </div>
    )
}
