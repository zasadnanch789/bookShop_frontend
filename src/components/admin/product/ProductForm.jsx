import React, { Fragment, useState, useEffect } from "react";
import { getCategories } from "../ApiAdmin";
import Input from "../../common/Input";
import TextArea from "../../common/TextArea";
import Select from "../../common/Select";
import { ShowError } from "../../helper/helper";
import { ShowSuccess } from "../../helper/helper";
import http from "../../../services/httpService";

import { getCurrentUser } from "../../helper/helper";
import { API } from "../../../config";

function ProductForm() {
  const user = getCurrentUser();
  const str = localStorage.getItem("jwt");

  // to remove  double quotes from the sring
  const token = str.replace(/^"(.+(?="$))"$/, "$1");

  const [values, setValues] = useState({
    name: "",
    description: "",
    categories: [],
    price: "",
    quantity: "",
    photo: "",
    formData: "",
    loading: false,
    error: false,
    success: false,
  });

  const {
    name,
    description,
    price,
    quantity,
    categories,
    loading,
    formData,
    success,
    error,
  } = values;

  const init = async () => {
    const { data } = await getCategories();
    setValues({ ...values, categories: data, formData: new FormData() });
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await http.post(`${API}/product/create/${user._id}`, formData, config);
      setValues({ ...values, error: false, success: true });
    } catch (ex) {
      if (ex) {
        console.log(ex.response);
        setValues({ ...values, error: ex.response.data, success: false });
      }
    }
  };

  return (
    <Fragment>
      <ShowError error={error} />
      <ShowSuccess
        success={success}
        successMessage="New Product is Created.."
      />
      <form onSubmit={handleSubmit} className="mt-2">
        <div>
          <Input
            name="name"
            label="Name"
            value={name}
            onChange={handleChange("name")}
          />
        </div>
        <div>
          <TextArea
            name="description"
            label="Description"
            value={description}
            onChange={handleChange("description")}
          />
        </div>
        <div>
          <Select
            name="category"
            label="Category"
            categories={categories}
            onChange={handleChange("category")}
            // value={categories}
          />
        </div>
        <div>
          <Input
            name="price"
            label="Price"
            type="number"
            value={price}
            onChange={handleChange("price")}
          />
        </div>
        <div>
          <Input
            name="quantity"
            label="Quantity"
            type="number"
            value={quantity}
            onChange={handleChange("quantity")}
          />
        </div>

        <div className="form-group mt-3">
          <input type="file" name="photo" onChange={handleChange("photo")} />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Create Product
        </button>
      </form>
    </Fragment>
  );
}

export default ProductForm;
