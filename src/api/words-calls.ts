export interface Words {
    words: string[],
}

export const GetWords = async function(options: RequestInit): Promise<Response> {
    const response: Response = await fetch("http://localhost:8000/words", options);
    if (!response.ok) {
        throw Error("Unauthorized")
    }
    return response;
}