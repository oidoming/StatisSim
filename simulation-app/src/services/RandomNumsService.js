
export const getRandomNums = async () => {
    const result = await fetch('/api/RandomNums');

    return result.json();
}

export const postRandomNums = async (data) => {
    const response = await fetch('/api/RandomNums', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    return response.json();
}