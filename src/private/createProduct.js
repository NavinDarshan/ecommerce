import React, { useState, useEffect } from 'react';
import axios from 'axios'


const CreateProduct = () => {
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    shipping: '',
    quantity: '',
    photo: '',
    loading: false,
    error: '',
    createdProduct: '',

    formData: ''
  });
  const {
    name,
    description,
    price,
    category,
    quantity,
    loading,
    error,
    createdProduct,
    formData
  } = values;

  const init = () => {
       {
        setValues({
          ...values,
          formData: new FormData()
        });
      }
  }

  useEffect(() => {
    init();
    // eslint-disable-next-line
  }, []);

  const handleChange = name => event => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

const createProduct = (product) => {
    console.log("i recived")
     axios.post("/api/product/photo" , product)
     console.log("success")
}

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: '', loading: true });
    createProduct(formData);
    console.log("sent success");
  };

  const newPostForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
      <h4>Post Photo</h4>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input
            onChange={handleChange('photo')}
            type="file"
            name="photo"
            accept="image/*"
          />
        </label>
      </div>

      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange('name')}
          type="text"
          className="form-control"
          value={name}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Description</label>
        <textarea
          onChange={handleChange('description')}
          className="form-control"
          value={description}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">category</label>
        <textarea
          onChange={handleChange('category')}
          className="form-control"
          value={category}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Price</label>
        <input
          onChange={handleChange('price')}
          type="number"
          className="form-control"
          value={price}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Shipping</label>
        <select onChange={handleChange('shipping')} className="form-control">
          <option>Please select</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Quantity</label>
        <input
          onChange={handleChange('quantity')}
          type="number"
          className="form-control"
          value={quantity}
        />
      </div>
      <button className="btn btn-outline-primary float-right mb-3">
        Create
      </button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: createdProduct ? '' : 'none' }}
    >
      <h2>{`${createdProduct}`} is created!</h2>
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );

  return (
    <div className="container w-50">
      <h1 className="title p-2 text-center">New Product</h1>
      {showLoading()}
      {showSuccess()}
      {showError()}
      {newPostForm()}
    </div>
  );
};
export default CreateProduct;
