"use client"
import { useEffect, useState } from "react"

export default function Home() {
    const [clients, setClients] = useState([])

    const fetchClients = async () => {
        const res = await fetch("/api/clients", {
            method: "GET",
        })
        const data = await res.json()
        setClients(data)
    }

    useEffect(() => {
        fetchClients()
    }, [])

    return (
        <div className="flex flex-col gap-y-4 items-center p-16">
            <h1 className="font-bold text-2xl">Clients</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client) => (
                        <tr key={client.id}>
                            <td>
                                <a href={`/clients/${client.id}`} className="text-blue-500">
                                    {client.id}
                                </a>
                            </td>
                            <td>{client.name}</td>
                            <td>
                                <a href={`mailto:${client.email}`} className="text-blue-500">
                                    {client.email}
                                </a>
                            </td>
                            <td>{client.phone}</td>
                            <td>{client.createdAt}</td>
                            <td>{client.updatedAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h1 className="font-bold text-2xl">Add Client</h1>
            <form
                onSubmit={async (e) => {
                    e.preventDefault()
                    const name = document.getElementById("client-name").value
                    const email = document.getElementById("client-email").value
                    const phone = document.getElementById("client-phone").value

                    const res = await fetch("/api/clients", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ name, email, phone }),
                    })

                    if (res.status === 201) {
                        fetchClients()
                        // Clear input fields
                        document.getElementById("client-name").value = ""
                        document.getElementById("client-email").value = ""
                        document.getElementById("client-phone").value = ""
                    }
                }}
                className="flex flex-col gap-y-4 items-end border rounded-md p-4"
            >
                <div className="grid grid-cols-[min-content_min-content] text-nowrap gap-x-4 gap-y-2">
                    <label htmlFor="client-name">Client Name</label>
                    <input type="text" placeholder="Client Name" id="client-name" className="border rounded-md px-2" />
                    <label htmlFor="client-email">Client Email</label>
                    <input
                        type="email"
                        placeholder="Client Email"
                        id="client-email"
                        className="border rounded-md px-2"
                    />
                    <label htmlFor="client-phone">Client Phone</label>
                    <input type="tel" placeholder="Client Phone" id="client-phone" className="border rounded-md px-2" />
                </div>
                <button type="submit" className="border rounded-md px-2">
                    Add Client
                </button>
            </form>
        </div>
    )
}
