export const postNBAPlayers = async (data) => {
    const response = await fetch('/api/NBAPlayerStats', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    return response.json();
}