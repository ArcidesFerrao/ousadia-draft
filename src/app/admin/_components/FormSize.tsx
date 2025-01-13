import React from "react";

export const FormSize = () => {
  return (
    <div>
      <h3>Tamanho</h3>
      <div className="sizeInput">
        <label htmlFor="small">
          <span>S</span>
          <input type="number" id="small" name="S" />
        </label>
        <label htmlFor="medium">
          <span>M</span>
          <input type="number" id="medium" name="M" />
        </label>
        <label htmlFor="large">
          <span>L</span>
          <input type="number" id="large" name="L" />
        </label>
        <label htmlFor="extra-large">
          <span>XL</span>
          <input type="number" id="estra-large" name="XL" />
        </label>
      </div>
    </div>
  );
};
