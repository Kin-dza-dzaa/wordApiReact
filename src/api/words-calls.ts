export interface Words {
    words: string[],
}

export const GetWords = async function(options: RequestInit): Promise<any> {
    const response: Response = await fetch("http://localhost:8000/words", options);
    return response.json();
}