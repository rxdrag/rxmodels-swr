import { DataError } from "..";

export interface QueryOrPostOption<T>{
  onCompleted?:(data:{[key:string]:T}|T)=>void,
  onError?:(error:DataError)=>void,
}