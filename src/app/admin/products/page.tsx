import db from "@/db/db";
import { AddButton } from "@/components/AddButton";

export default function ProductsAdminPage() {
  return (
    <main className="admin-products text-zinc-300">
      <div className="products-header p-4 flex items-center justify-between w-full max-w-2xl">
        <h2>Lista de productos</h2>
        <AddButton href="/admin/products/new" />
      </div>

      <ProductsTable />
    </main>
  );
}

const ProductsTable = async () => {
  const products = await db.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      stock: true,
      color: true,
      size: true,
    },
  });

  if (products.length === 0) {
    console.log("nenhum producto encontrado");
    return <p className="text-xl">nenhum producto encontrado...</p>;
  }

  return (
    <table className=" max-w-2xl w-full">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Cor</th>
          <th>Tamanho</th>
          <th>Quantidade</th>
          <th>Preco</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.color}</td>
            <td>{product.size}</td>
            <td>{product.stock}</td>
            <td>{product.price}</td>
          </tr>
        ))}
        <tr>
          <td>Maningue Cenas</td>
          <td>Preta</td>
          <td>M</td>
          <td>36</td>
          <td>900.00 MZN</td>
        </tr>
      </tbody>
    </table>
  );
};
