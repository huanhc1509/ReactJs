// src/App.tsx
import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { IProduct } from "./interface/Product";
import Add from "./component/Add";
import Edit from "./component/Edit";

export type IFormInput = Pick<IProduct, "name" | "price" | "image" | "desc">;

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get<IProduct[]>(
        "http://localhost:3000/products"
      );
      setProducts(data);
    })();
  }, []);

  const onDelete = async (id: number) => {
    try {
      if (confirm("Bạn có muốn xóa không!")) {
        await axios.delete(`http://localhost:3000/products/${id}`);
        alert("Xóa thành công");
        setProducts(products.filter((product: IProduct) => product.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onEdit = (product: IProduct) => {
    setEditingProduct(product);
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 flex-col p-4">
      <Add name="Thêm sản phẩm" products={products} setProducts={setProducts} />
      <h2 className="text-3xl font-semibold mb-5">Danh sách sản phẩm</h2>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="w-full bg-blue-500 text-white text-left">
            <th className="py-3 px-4 uppercase font-semibold text-sm">STT</th>
            <th className="py-3 px-4 uppercase font-semibold text-sm">Name</th>
            <th className="py-3 px-4 uppercase font-semibold text-sm">Price</th>
            <th className="py-3 px-4 uppercase font-semibold text-sm">Image</th>
            <th className="py-3 px-4 uppercase font-semibold text-sm">Desc</th>
            <th className="py-3 px-4 uppercase font-semibold text-sm">
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: IProduct, index) =>
            product.id === (editingProduct?.id || 0) ? (
              <tr key={product.id}>
                <td colSpan={7} className="py-2">
                  <Edit
                    product={product}
                    products={products}
                    setProducts={setProducts}
                    onCancel={() => setEditingProduct(null)}
                  />
                </td>
              </tr>
            ) : (
              <tr
                key={product.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{product.name}</td>
                <td className="py-3 px-4">{product.price}</td>
                <td className="py-3 px-4">
                  <img src={product.image} alt="" className="w-12" />
                </td>
                <td className="py-3 px-4">{product.desc}</td>
                <td className="py-3 px-4">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline mr-2"
                    onClick={() => onEdit(product)}
                  >
                    Sửa
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => onDelete(product.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
