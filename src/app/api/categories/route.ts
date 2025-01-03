import db from "@/db/db";


export async function GET(req: Request) {
    try {
        const categories = await db.category.findMany();
        return new Response(JSON.stringify(categories), { status: 200 })
        console.log(req)
    } catch (error) {
        return new Response(JSON.stringify({error: `Error fetching categories: ${error}`}), {status: 500})
    }
}