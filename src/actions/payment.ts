
export default async function payProduct() {
    // console.log("ENV" ,process.env.NEXT_PUBLIC_MOZPAYMENT_ID)
    const response = await fetch('/api/payment', {
    method: "POST",
    headers: {
        'Content-type': 'application/json',
    },
    body: JSON.stringify({
        carteira: process.env.NEXT_PUBLIC_MOZPAYMENT_ID,
        numero: 852740554,
        quem_comprou: "Guest",
        valor: 10,
    }),
  });

  if (response.ok) {
    const data = await response.json();

    if (data.status === 200) {
        console.log('Pagamento efectuado com sucesso');
    } else if (data.status === 201) {
        console.log('Erro na transacao');
    } else if (data.status === 422) {
        console.log('Saldo Insuficiente');
    } else if (data.status === 400) {
        console.log('PIN incorrecto');
    } 
  } 
}
