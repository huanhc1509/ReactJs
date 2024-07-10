import { useForm } from "react-hook-form";
import { IProduct } from "../interface/Product";
import axios from "axios";
import { IFormInput } from "../App";

type Props = {
  name: string;
  products: IProduct[];
  setProducts: (data: IProduct[]) => void;
};
const Add = ({ name, products, setProducts }: Props) => {
  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const onSubmit = async (formData: IFormInput) => {
    try {
      const {data} = await axios.post<IProduct>("http://localhost:3000/products", formData);
      setProducts([...products, data])
      reset();
      alert("Thêm thành công!");
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  };
  return (
    <>
      <h1 className="text-4xl font-semibold mb-8">{name}</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mb-8"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Tên sản phẩm
          </label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Tên sản phẩm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Giá sản phẩm
          </label>
          <input
            type="number"
            {...register("price", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Giá sản phẩm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Ảnh sản phẩm
          </label>
          <input
            type="text"
            {...register("image", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Ảnh sản phẩm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Mô tả sản phẩm
          </label>
          <input
            type="text"
            {...register("desc", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Mô tả sản phẩm"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Thêm sản phẩm
        </button>
      </form>
    </>
  );
};

export default Add;
