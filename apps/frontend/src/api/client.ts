const API = "/api"

const baseFetch = (url: string, options: RequestInit = {}) =>
    fetch(url, {
        ...options,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
        },
    })

export const setUsername = (username: string) =>
    baseFetch(`${API}/session/username`, {
        method: "POST",
        body: JSON.stringify({ username }),
    })

export const getTopics = async () => {
    const res = await baseFetch(`${API}/topics`)
    if (!res.ok) throw new Error("Failed to load topics")
    return res.json()
}

export const createTopic = (topic: string) =>
    baseFetch(`${API}/topics`, {
        method: "POST",
        body: JSON.stringify({ topic }),
    })

export const vote = (id: number, value: "up" | "down") =>
    baseFetch(`${API}/topics/${id}/vote`, {
        method: "POST",
        body: JSON.stringify({ value }),
    })

export const deleteTopic = (id: number) =>
    baseFetch(`${API}/topics/${id}`, { method: "DELETE" })
