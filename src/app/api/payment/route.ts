import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body= await req.json();
        console.log('Request body', body.carteira);
        const { carteira, numero, quem_comprou, valor } = body;

        const response = await  fetch('https://mozpayment.co.mz/api/1.1/wf/pagamentorotativompesa', {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                carteira,
                numero,
                'quem comprou': quem_comprou,
                valor,
            }),
          });

          const data = await response.json();
          return NextResponse.json(data, {  status: response.status })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal server error"}, { status: 500})
    }
}