export interface HttpMetaData {
  method: string,
  mode: RequestMode,
  headers: [string, string][],
  body: string|undefined,
}

export interface UserData {
  email: string|undefined,
  user_name: string|undefined,
    password: string|undefined,
}

// const fetchWords = ():void => {
//   fetch("http://127.0.0.1:8000/words", options
//   ).then((response) => response.json() 
//   ).then((dataJson) => console.log(dataJson)
//   ).catch((err) => console.log(err))
// }
