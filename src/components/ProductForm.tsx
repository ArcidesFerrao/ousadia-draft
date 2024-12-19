import React from "react";

export default function ProductForm() {
  return (
    <div className="form-section">
      <h2>Adicionar Produto</h2>
      <div className="form-product">
        <form action="">
          <div className="name-price">
            <div className="name">
              <label htmlFor="name">Nome:</label>
              <input type="text" id="name" name="name" />
            </div>
            <div className="price">
              <label htmlFor="price">Preco</label>
              <input type="number" id="price" name="price" />
            </div>
          </div>
          <div className="category">
            <h3>Categoria</h3>
            <label className="radio">
              <input
                type="radio"
                name="category"
                id="shirts"
                value="T-shirts"
              />
              <span className="radio-option">T-Shirts</span>
            </label>
            <label className="radio">
              <input type="radio" name="category" id="bones" value="bones" />
              <span className="radio-option">Bones</span>
            </label>
            <label className="radio">
              <input
                type="radio"
                name="category"
                id="collabs"
                value="collabs"
              />
              <span className="radio-option">Collabs</span>
            </label>
            <label className="radio">
              <input type="radio" name="category" id="marcas" value="marcas" />
              <span className="radio-option">Marcas</span>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}
