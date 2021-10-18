import { createComponent, html } from "../utils/createComponent.js";
import "../utils/types.js";

/**
 * @returns {Task}
 */
const createData = (dataset) => {
  return {
    title: dataset.title,
    id: dataset.id,
    completed: dataset.completed === "" || !!dataset.completed,
  };
};

createComponent(
  // Config
  {
    name: "task-item",
    listeners: ["click"],
  },

  // Data
  createData,

  // Render
  ({ title, completed }) => html`
    <style>
      div {
        width: 100%;
        padding: 1rem;
        justify-content: space-between;
        border: 1px solid #aaa;
        border-radius: 2px;
        display: flex;
        align-items: center;
      }
    </style>

    <div>
      <input type="checkbox" data-app-id="toggle" ${completed && "checked"} />
      <h3>${title}</h3>
      <button data-app-id="delete">X</button>
    </div>
  `,

  ({ data, payload, dispatch }) => {
    if (payload.id === "delete") {
      dispatch("delete", { id: data.id });
    }

    if (payload.id === "toggle") {
      dispatch("toggle", { id: data.id });
    }
  }
);
