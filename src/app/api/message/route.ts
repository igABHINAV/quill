import { db } from "@/db";
import { sendMessageValidator } from "@/lib/validators/sendMessageValidator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest } from "next/server";

export const POST =  async(req : NextRequest)=>{
    const body = await req.json()
    const {getUser} = getKindeServerSession();
    const user = await getUser();
    if(!user || !user.id) return new Response("User not logged in (unauthorized)!" , {status : 401});
    const {id : userId} = user;

    const {fileId , message} = sendMessageValidator.parse(body);
    const file = await db.file.findFirst({
        where :{
            id : fileId ,
            userId
        }
    })
    if(!file) return new Response("not found" , {status : 404});
    await db.message.create({
        data : {
            text : message ,
            isUserMessage : true ,
            userId,
            fileId
        }
    })

    //AI part here !

}