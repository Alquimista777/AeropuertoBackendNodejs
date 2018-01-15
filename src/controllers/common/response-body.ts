import{Response}from'express';

export class ResponseBody<T>{
    constructor( public success:boolean,
        public data:T=null,
        public err:string=null){}
}
export function resFail(
    res:Response,
    code:number,
    err:any){
    res.status(code).send(new ResponseBody(false,null,err));
    }

export function resSuccess<T>(res:Response,data:T=null){
    res.send(new ResponseBody(true,data));
}