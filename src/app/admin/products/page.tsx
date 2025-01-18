import db from "@/db/db";
import { AddButton } from "@/components/AddButton";
import {
  Active,
  DeleteDropdownItem,
  EditItem,
} from "../_components/DropdownMenu";

export default function ProductsAdminPage() {
  return (
    <main className="admin-products text-zinc-300">
      <div className="products-header p-4 flex items-center justify-between w-full max-w-4xl">
        <h2>Lista de Productos</h2>
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
      discounted: true,
      discountAmount: true,
      color: true,
      ProductSize: {
        select: {
          size: true,
          stock: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (products.length === 0) {
    console.log("nenhum producto encontrado");
    return <p className="text-xl">nenhum producto encontrado...</p>;
  }

  return (
    <table className=" max-w-4xl w-full">
      <thead>
        <tr>
          <th className="flex items-center gap-2">
            Productos <p>({products.length})</p>
          </th>
          <th>Cor</th>
          <th>Tamanho</th>
          <th>Stock</th>
          <th className="flex items-center gap-1">
            Preco <p>(MZN)</p>
          </th>
          <th>Desconto</th>
          <th>
            <span className="sr-only">Edit</span>
          </th>
          <th>
            <span className="sr-only">Delete</span>
          </th>
          <th>
            <span className="sr-only">Active</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.color}</td>
            <td className="table-sizes">
              {product.ProductSize.map((size, index) => (
                <p key={index}>
                  {size.size}: {size.stock}
                </p>
              ))}{" "}
            </td>
            <td>
              {product.ProductSize.reduce(
                (total, size) => total + size.stock,
                0
              )}
            </td>
            <td>{product.price}.00</td>
            <td>
              {product.discountAmount
                ? 100 * (1 - product.discountAmount / 100)
                : 0}
              .00
            </td>
            <td>
              <EditItem id={product.id} />
            </td>
            <td>
              <DeleteDropdownItem id={product.id} />
            </td>
            <td>
              <Active stock={5} />
            </td>
          </tr>
        ))}
        {/* 
        <tr>
          <td>Maningue Cenas</td>
          <td>Preta</td>
          <td>M</td>
          <td>36</td>
          <td>900.00</td>
          <td>/</td>
          <td>-</td>
        </tr> 
        */}
      </tbody>
    </table>
  );
};
