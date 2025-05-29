---
applyTo: '**'
---
Coding standards, domain knowledge, and preferences that AI should follow.
## Coding Standards, Domain Knowledge, and Preferences

### 🧠 Framework and Libraries

* Use **Vue 3 Composition API** for all components.
* Handle state management with **Pinia** using `defineStore`.
* Use **TailwindCSS** for all styling — avoid inline styles and scoped CSS.
* Employ **Vue Router** for navigation with named routes and programmatic navigation (`router.push({ name: 'RouteName' })`).

### 🗂️ Project Structure

```
src/
├── components/     # UI components
├── views/          # Pages/views linked to routes
├── stores/         # Pinia stores
├── router/         # Route definitions
└── App.vue         # Main layout
```

### 💡 Component Design

* Name components using **PascalCase**.
* Keep components **modular**, **reusable**, and **single-responsibility**.
* Validate props with types and default values.

### 🔄 State Management

* Use one store per domain (e.g., `useAuthStore`, `useProductStore`).
* Persist state if needed using `pinia-plugin-persistedstate`.

### 🎨 Styling

* Use utility classes from TailwindCSS.
* Apply responsive design with Tailwind's breakpoint utilities.
* Avoid `style` tags and `scoped` styles — prefer class-based styling.

### 🚦 Routing

* Define all routes in `src/router/index.js`.
* Use `defineAsyncComponent` for lazy loading.
* Group routes with nested layouts when appropriate.

### 📦 Best Practices

* Use `async/await` for all asynchronous operations.
* Always wrap async logic in `try/catch` blocks.
* Use environment variables (`import.meta.env`) for config/API keys.
* Keep logic separated: state in stores, rendering in components, navigation in routes.

### 🧹 Code Style

* Use 2-space indentation.
* Use **descriptive** and **consistent** naming conventions.
* Minimize comments, but document complex logic when necessary.

### ✅ Optional Enhancements

* Integrate ESLint + Prettier for linting and formatting.
* Consider using VueUse for composition utilities.
* Use `defineExpose` carefully to limit component API surface.

---

This guide ensures all AI-generated Vue code is clean, modular, and adheres to modern web development standards using Vue 3 + Pinia + TailwindCSS.
