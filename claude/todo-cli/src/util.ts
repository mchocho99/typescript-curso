import { STATUS } from "./types";

export function showMessage(code : STATUS, message : string){
    console.log(`${code}: ${message}`)
}