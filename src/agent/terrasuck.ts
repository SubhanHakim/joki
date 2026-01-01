export async function terrasuck(message: string, mode: string = "project") {
    const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message, mode })
    })

    const data = await res.json();
    return data.result;
}