export interface WordStruct {
    word: string,
    source_language: string,
    destination_language: string,
    transltions: Map<string, string[]>,
    definitions_with_examples: Map<string, string[][]>,
    examples: string[],
    time_of_last_repeating: number,
    state: number,
}

interface UpdateState {
    word: string,
    new_state: number,
}

interface WordsToAdd {
    word: string,
    collection_name: string,
}

interface WordsToDelete {
    words: WordToDelete[]
}

interface WordToDelete {
    collection_name: string,
    word: string,
}


export const GetWords = async function(): Promise<Map<string, WordStruct[]>> {
    const OptionsGetWords: RequestInit = {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: [["Content-Type", "application/json"], ["X-Csrf-Token", sessionStorage.getItem("X-Csrf-Token")!]],
    }
    const response: Response = await fetch("http://localhost:8000/words", OptionsGetWords);
    const data = await response.json();
    let words: Map<string, WordStruct[]> = new(Map<string, WordStruct[]>);
    if (!response.ok) {
        return words;
    }
    if (data.response.words) {
        data.response.words.map((element: any) => {
            const tranData: WordStruct = {
                word: element.word,
                source_language: element.trans_data.source_language,
                destination_language: element.trans_data.destination_language,
                transltions: new Map<string, string[]>(Object.entries(element.trans_data.transltions || {})),
                definitions_with_examples: new Map<string, string[][]>(Object.entries(element.trans_data.definitions_with_examples || {})),
                examples: element.trans_data.examples,
                time_of_last_repeating: Date.parse(element.time_of_last_repeating),
                state: element.state,
            };
            if (words.get(element.collection_name)) {
                words.get(element.collection_name)?.push(tranData);
            } else {
                words.set(element.collection_name, [tranData]);
            }
            return;
        }); 
    }
    return words;
}

export const UpdateState = async function(wordsArray: WordStruct, collectionName: string) {
    const options: RequestInit = {
        method: "PUT",
        mode: "cors",
        headers: [["Content-Type", "application/json"], ["X-Csrf-Token", sessionStorage.getItem("X-Csrf-Token")!]],
        credentials: "include",
        body: JSON.stringify(
            {
                "collection_name": collectionName,
                "words": [
                    {
                        word: wordsArray.word,
                        new_state: wordsArray.state*2 + 1,
                    }
                ] as UpdateState[],
            }
        ),
    }
    fetch("http://localhost:8000/words/state", options);
}

export const AddWords = async function(words: string[], collectionName: string): Promise<any> {
    const wordsToAdd: {words: WordsToAdd[]} = {
        words: [],
    }
    words.map((value) => {
        wordsToAdd.words.push({word: value, collection_name: collectionName});
    })
    const options: RequestInit = {
        method: "POST",
        mode: "cors",
        headers: [["Content-Type", "application/json"], ["X-Csrf-Token", sessionStorage.getItem("X-Csrf-Token")!]],
        credentials: "include",
        body: JSON.stringify(wordsToAdd),
    }
    const res = await fetch("http://localhost:8000/words", options);
    return res.json();
}

export const DeleteWords = async function(words: string[], collectionName: string) {
    const WordsToDelete: WordsToDelete = {
        words: words.map((value) => {
            return {
                word: value, 
                collection_name: collectionName,
            };
        })
    }
    const options: RequestInit = {
        method: "DELETE",
        mode: "cors",
        headers: [["Content-Type", "application/json"], ["X-Csrf-Token", sessionStorage.getItem("X-Csrf-Token")!]],
        credentials: "include",
        body: JSON.stringify(WordsToDelete),
    }
    fetch("http://localhost:8000/words", options);
}

export const UpdateWord = async function(oldWord: string, newWord:string, collectionName: string): Promise<any> {
    const options: RequestInit = {
        method: "PUT",
        mode: "cors",
        headers: [["Content-Type", "application/json"], ["X-Csrf-Token", sessionStorage.getItem("X-Csrf-Token")!]],
        credentials: "include",
        body: JSON.stringify({
            old_word: oldWord,
            new_word: newWord,
            collection_name: collectionName
        }),
    }
    const res = await fetch("http://localhost:8000/words", options);
    return res.json();
}