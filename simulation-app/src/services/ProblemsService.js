export const postPi = async (data) => {
    const response = await fetch('/api/Pi', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    return response.json();
}

export const postVolados = async (data) => {
    const response = await fetch('/api/Volados', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    return response.json();
}

export const postTinas = async (data) => {
    const response = await fetch('/api/Tinas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    return response.json();
}