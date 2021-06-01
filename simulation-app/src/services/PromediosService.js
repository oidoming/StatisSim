
export const postPromediosData = async (data) => {
    const response = await fetch('/api/Means', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    return response.json();
}

export const postChiData = async (data) => {
    const response = await fetch('/api/ChiSquare', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    return response.json();
}