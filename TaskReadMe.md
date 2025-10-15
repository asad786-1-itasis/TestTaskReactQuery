# 🛍️ Product Listing App (React Native + TypeScript)

This project is a **React Native mobile application** built with **TypeScript**, designed to display and navigate product listings using **React Query**, **React Navigation**, and a **centralized theming system**.  

The app follows **clean architecture**, **type safety**, and **scalable UI practices** for enterprise-level maintainability.

---

## 🚀 Features Implemented

### 1. **Product List Screen**
- Implemented a **dynamic product list** using `FlatList` with lazy loading (`visibleCount` logic).
- Added **API data fetching** with `React Query` using `GETAPICALL` utility for reusable API integration.
- Integrated **pull-to-refresh** and **infinite scroll** to load more products.
- Added **loading state handling** with custom `ActivityIndicator` loader.
- Created **type-safe navigation** between screens using `@react-navigation/native-stack`.
- Used **TouchableOpacity** with controlled `activeOpacity` for better UX.
- Fixed card shadow behavior on both Android and iOS using a wrapper (`cardWrapper`) with unified shadow styles.

---

### 2. **Product Detail Screen**
- Implemented a **detailed product view** with:
  - Product image, title, category, price, and description.
  - Back navigation button (`navigation.goBack()`).
  - “Add to Cart” button with clean styling.
- Used **ScrollView** to handle large content.
- Consistent card and layout styling aligned with the global theme.
- Type-safe routing with `RouteProp` ensuring the correct `product` data type is passed.

---

### 3. **API Integration**
- Added a reusable **API calling file (`ApiCalling.ts`)** for handling network requests.
- Included **error handling** for scenarios like:
  - Network failure (e.g., when the user turns off the internet).
  - Invalid response or server issues.
- Structured `GETAPICALL` and other methods for clean separation of concerns.

---

### 4. **React Query Integration**
- Integrated `@tanstack/react-query` for:
  - Caching API data.
  - Handling refetch logic.
  - Showing refresh indicators while fetching new data.
- Prevented hook order errors by using `useRef` and `useEffect` cleanup for safe unmounting.

---

### 5. **Theme System**
- Added a **centralized `theme.ts` file** to remove all magic numbers and hardcoded styles.
- Includes reusable tokens for:
  - 🎨 **Colors** – `primary`, `background`, `surface`, `muted`, etc.
  - 📏 **Spacing** – `xs`, `sm`, `md`, `lg`, `xl`.
  - 🔤 **Typography** – `small`, `medium`, `large`, `title`, `heading`.
  - 🧱 **Border Radius** – `sm`, `md`, `lg`.
  - 🌫️ **Shadow Tokens** – platform-consistent shadow presets.
- All components (`ProductList` & `ProductDetail`) are now fully styled using theme tokens.

---

### 6. **Code Quality Improvements**
- Converted all screens to **TypeScript** with strict typing.
- Used `useMemo` for optimized render performance.
- Added **clean folder structure** for scalability:
  ```
  src/
  ├── ApiCalling/
  │   └── ApiCalling.ts
  ├── screens/
  │   ├── ProductList.tsx
  │   └── ProductDetail.tsx
  ├── theme/
  │   └── theme.ts
  └── ...
  ```

---

## 🧩 Future Enhancements (Optional)
- Add **Dark Mode** support using theme variants.
- Implement a **ThemeProvider** for global theme switching.
- Add **“Add to Cart” functionality** with a cart screen and local state management.
- Integrate **offline caching** with React Query’s persistence layer.

---

## 🛠️ Tech Stack

| Category | Tool / Library |
|-----------|----------------|
| **Language** | TypeScript |
| **Framework** | React Native |
| **State / Data** | React Query |
| **Navigation** | React Navigation |
| **Styling** | Custom theme tokens (`theme.ts`) |
| **API Calls** | Axios (via `GETAPICALL`) |

---

## 📱 Current Status
✅ Product listing and detail navigation completed  
✅ API integration and error handling done  
✅ Theming and spacing system implemented  
✅ Clean, scalable folder and code structure finalized  
