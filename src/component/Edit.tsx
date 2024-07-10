// src/component/Edit.tsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IProduct } from "../interface/Product";
import { IFormInput } from "../App";
import axios from "axios";

type Props = {
  product: IProduct;
  products: IProduct[];
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
  onCancel: () => void;
};

const Edit = ({ product, products, setProducts, onCancel }: Props) => {
  const { register, handleSubmit, reset } = useForm<IFormInput>();

  useEffect(() => {
    reset({
      name: product.name,
      price: product.price,
      image: product.image,
      desc: product.desc,
    });
  }, [product, reset]);

  const onSubmitUpdate = async (formData: IFormInput) => {
    try {
      const { data } = await axios.put(
        `http://localhost:3000/products/${product.id}`,
        formData
      );
      const newProductList = products.map((prod: IProduct) => {
        if (prod.id === product.id) {
          return data;
        }
        return prod;
      });
      alert("Sửa thành công!");
      setProducts(newProductList);
      onCancel();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitUpdate)} className="flex flex-col">
      <input
        className="shadow appearance-none border rounded py-2 px-3 m-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        {...register("name", { required: true })}
      />
      <input
        className="shadow appearance-none border rounded py-2 px-3 m-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        {...register("image", { required: true })}
      />
      <input
        className="shadow appearance-none border rounded py-2 px-3 m-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="number"
        {...register("price", { required: true })}
      />
      <input
        className="shadow appearance-none border rounded py-2 px-3 m-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        {...register("desc", { required: true })}
      />
      <div className="text-center">
        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline mr-2"
        >
          Update
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
        >
          Hủy
        </button>
      </div>
    </form>
  );
};

export default Edit;
