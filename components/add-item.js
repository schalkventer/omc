import { createComponent, html } from "../utils/createComponent.js";
import "../utils/types.js";

createComponent(
  // Config
  {
    name: "add-item",
    listeners: ["submit"],
  },

  // Data
  null,

  // Render
  () => html`
    <style>
      form {
        background: #eee;
        padding: 1rem;
        margin: 2rem;
      }

      label {
        display: flex;
      }
    </style>
    <form id="add-item" data-app-id="add-item">
      <label for="item-title">
        <div>Title</div>
        <input id="item-title" />
      </label>

      <button type="submit" form="add-item">ADD ITEM</button>
    </form>
  `,

  //Handler
  ({ dispatch, payload }) => {
    const { element } = payload;
    const { value: title } = element.querySelector("input");
    dispatch("add", { title });
  }
);
