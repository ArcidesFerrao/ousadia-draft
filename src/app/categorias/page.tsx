import React from "react";

export default function CategoriesPage() {
  return (
    <main className="py-4">
      <div className="shirts-list">
        <div className="title">
          <h2>T-shirts</h2>
        </div>
        <div className="products-list flex flex-auto justify-between"></div>
      </div>
      <div className="hats-list">
        <div className="title">
          <h2>Bonés</h2>
        </div>
        <div className="products-list flex flex-auto justify-between"></div>
      </div>
      <div className="collabs-list">
        <div className="title">
          <h2>Collabs</h2>
        </div>
        <div className="products-list flex flex-auto justify-between"></div>
      </div>
      <div className="brands-list">
        <div className="title">
          <h2>Marcas</h2>
        </div>
        <div className="products-list flex flex-auto justify-between"></div>
      </div>
    </main>
  );
}
