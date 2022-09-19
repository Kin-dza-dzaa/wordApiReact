export interface Words {
    words: string[],
}

export interface WordStruct {
    word: string,
    state: number,
    trans_data: TranslationStruct,
}

interface TranslationStruct {
    word: string,
    source_language: string,
    destination_language: string,
    transltions: Map<string, string[]>,
    definitions_with_examples: Map<string, string[]>,
    examples: string[],
}

const options: RequestInit = {
    method: "GET",
    mode: "cors",
    credentials: "include",
  }

export const GetWords = async function(): Promise<Map<string, WordStruct[]>> {
    const response: Response = await fetch("http://localhost:8000/words", options);
    const data = await response.json();
    let words: Map<string, WordStruct[]> = new Map<string, WordStruct[]>;
    data.words.words.forEach((element: any) => {
        const tranData: TranslationStruct = {
            word: element.word,
            source_language: element.trans_data.source_language,
            destination_language: element.trans_data.destination_language,
            transltions: new Map<string, string[]>(Object.entries(element.trans_data.transltions)),
            definitions_with_examples: new Map<string, string[]>(Object.entries(element.trans_data.definitions_with_examples)),
            examples: element.trans_data.examples
        };
        const word: WordStruct = {
            word: element.word,
            state: element.state,
            trans_data: tranData
        };
        if (words.get(element.collection_name)) {
            words.get(element.collection_name)?.push(word);
        } else {
            words.set(element.collection_name, [word]);
        }
    }); 
    return words;
}