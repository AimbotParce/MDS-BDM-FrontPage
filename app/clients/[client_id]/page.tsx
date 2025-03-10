"use client"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Home() {
    const [client, setClient] = useState({})
    const [cases, setCases] = useState([])

    const params = useParams()
    const client_id = params.client_id

    const fetchClient = async () => {
        const res = await fetch(`/api/clients/${client_id}`, {
            method: "GET",
        })
        const data = await res.json()
        setClient(data)
    }

    const fetchCases = async () => {
        const res = await fetch(`/api/clients/${client_id}/cases`, {
            method: "GET",
        })
        const data = await res.json()
        console.log(data)
        setCases(data)
    }

    useEffect(() => {
        fetchClient()
    }, [])

    useEffect(() => {
        fetchCases()
    }, [])

    console.log(client)

    return (
        <div className="flex flex-col gap-y-4 items-center p-16">
            <h1 className="font-bold text-2xl">Client Page</h1>
            <div className="grid grid-cols-[min-content_min-content] text-nowrap gap-x-24 gap-y-2">
                <div className="grid grid-cols-[min-content_min-content] text-nowrap gap-x-4 gap-y-2">
                    <p className="font-bold">Name</p>
                    <p>{client.name}</p>
                    <p className="font-bold">ID</p>
                    <a href={`/client/${client.id}`} className="text-blue-500">
                        {client.id}
                    </a>
                </div>
                <div className="grid grid-cols-[min-content_min-content] text-nowrap gap-x-4 gap-y-2">
                    <p className="font-bold">Email</p>
                    <a href={`mailto:${client.email}`} className="text-blue-500">
                        {client.email}
                    </a>
                    <p className="font-bold">Phone</p>
                    <p>{client.phone}</p>
                </div>
            </div>

            <h1 className="font-bold text-2xl">Client Cases</h1>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product</th>
                        <th>Description</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Status</th>
                        <th>Enabled</th>
                        <th>Key Words</th>
                    </tr>
                </thead>
                <tbody>
                    {cases.map((c) => (
                        <tr key={c.id}>
                            <td>
                                <a href={`/cases/${c.id}`} className="text-blue-500">
                                    {c.id}
                                </a>
                            </td>
                            <td>{c.product}</td>
                            <td>{c.description}</td>
                            <td>{c.createdAt}</td>
                            <td>{c.updatedAt}</td>
                            <td>{c.status}</td>
                            <td className="text-center">{c.enabled ? "✅" : "❌"}</td>
                            <td>
                                <ul>
                                    {c.keyWords.map((k) => (
                                        <li key={k.id}>{k.word}</li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h1 className="font-bold text-2xl">Add Case</h1>
            <form
                onSubmit={async (e) => {
                    e.preventDefault()
                    const product = document.getElementById("product-name").value
                    const description = document.getElementById("product-description").value
                    const keyWords = document
                        .getElementById("case-key-words")
                        .value.split(",")
                        .map((k) => k.trim())

                    const res = await fetch(`/api/clients/${client_id}/cases`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ product, description, keyWords }),
                    })

                    if (res.status === 201) {
                        fetchCases()
                        // Clear input fields
                        document.getElementById("product-name").value = ""
                        document.getElementById("product-description").value = ""
                        document.getElementById("case-key-words").value = ""
                    }
                }}
                className="flex flex-col gap-y-4 items-end border rounded-md p-4"
            >
                <div className="grid grid-cols-[min-content_min-content] text-nowrap gap-x-4 gap-y-2">
                    <label htmlFor="product-name">Product Name</label>
                    <input
                        type="text"
                        placeholder="Product Name"
                        id="product-name"
                        className="border rounded-md px-2"
                    />
                    <label htmlFor="product-description">Product Description</label>
                    <input
                        type="text"
                        placeholder="Product Description"
                        id="product-description"
                        className="border rounded-md px-2"
                    />

                    <label htmlFor="case-key-words">Case Key Words (CSV)</label>
                    <input type="text" placeholder="Key Words" id="case-key-words" className="border rounded-md px-2" />
                </div>
                <button type="submit" className="border rounded-md px-2">
                    Add Client
                </button>
            </form>
        </div>
    )
}
