import { createComponent, html } from "../utils/createComponent.js";
import { items } from "../api/items.js";
import "../utils/types.js";

/**
 * @typedef {object} Data
 * @property {Task[]} items
 */

/**
 * @returns {Data}
 */
const createData = () => {
  return {
    items: items.get(),
  };
};

/**
 * @param {Task[]} items
 * @returns {string}
 */
const createItemsMarkup = (items) => {
  const result = items.map(
    ({ id, completed, title }) => html`
      <task-item
        data-title="${title}"
        data-id="${id}"
        ${completed && "data-completed"}
      ></task-item>
    `
  );

  return result.join("");
};

createComponent(
  // Config
  {
    name: "todo-app",
    listeners: ["add", "delete", "toggle"],
  },

  // Data
  createData,

  // Render
  ({ items }) => {
    return html`
      <add-item data-app-id="add-item"></add-item>
      <div>${createItemsMarkup(items)}</div>
    `;
  },

  // Handler
  ({ payload, update }) => {
    if (payload.id === "add-item") {
      const { title } = payload.detail;
      const newItems = items.add(title);
      update({ items: newItems });
    }

    if (payload.type === "delete") {
      const { id } = payload.detail;
      const newItems = items.remove(id);
      update({ items: newItems });
    }

    if (payload.type === "toggle") {
      const { id } = payload.detail;
      items.toggle(id);
    }
  }
);
