import React from "react";
import { budgetItems } from "@/data/data";

const BudgetGrid = () => {
  return (
    <section className="budget-section">
      <h2 className="budget-title">Style Under Your Budget</h2>

      <div className="budget-grid">
        {budgetItems.map((item) => (
          <div className="budget-card" key={item.id}>
            <img src={item.image} alt={item.label} className="budget-img" />
            <div className="budget-label">
              <span>{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BudgetGrid;
