---
title: UT Connect Super App
description: Comparison between Expo Monorepo and Callstack/Repack
tags:
  - frontend
  - work
  - mobile
published: true
publishedAt: 2025-01-30
author:  
  - ayyub-ainr
---
# UT Connect Super App
## What is a Super App?

A **mobile super app** is a single mobile application that integrates a wide range of services and features, allowing users to perform multiple tasks within one ecosystem. Instead of using separate apps for different purposes, a super app combines various functionalities, making it a one-stop solution for users.

---

## 📌 Our Current Setup

Our current setup consists of two separate applications:

- **React Native CLI App** (for major UT Connect features)
    - Order tracking
    - Equipment monitoring
    - Ticketing
    - Financing dashboard
    - etc
- **React Native Expo App** (for maintenance management)
    - Developed using Expo
    - Uses different libraries from the first app

### 🚨 Limitations of the Current Setup

❌ No unified architecture – apps are siloed, making cross-team collaboration harder.  
❌ Duplicate dependencies and code.  
❌ Harder to scale – each app requires separate maintenance and updates.  
✅ Native flexibility – React Native CLI allows direct native code modifications.

To transition into a **super app**, we are evaluating two potential tech stacks:

- `@callstack/repack`
- Expo Router with Monorepo

---

# 📊 Tech Stack Evaluation

## 1️⃣ `@callstack/repack`

`@callstack/repack` is a Webpack-based module bundler that supports advanced features like **Module Federation** for a micro-frontend architecture.

### ✅ Pros:

- **Module Federation Support** – Enables independent teams to develop and deploy features dynamically.
- **Full Control Over Bundling** – Fine-tune app bundling for better performance.
- **Integration Flexibility** – Works well with React Native CLI for native code modifications.
- **Scalability** – Facilitates integrating multiple features or services without tight coupling.
- **Dynamic Updates** – Supports independent deployment of app features.

### ❌ Cons:

- **Steeper Learning Curve** – Teams need to understand Webpack and Module Federation.
- **Manual Configurations** – Requires more setup compared to Expo.
- **Build Complexity** – Managing multiple modules dynamically introduces runtime challenges.
- **Dependency Compatibility** – Some libraries may require adjustments for Webpack.

---

## 2️⃣ Expo Router + Monorepo

Expo Router is a file-based routing system built on React Navigation. Using a **monorepo** allows teams to collaborate while sharing common code.

### ✅ Pros:

- **Developer Experience** – Simplified file-based routing.
- **Expo Ecosystem** – Handles native modules easily, ideal for teams with less native expertise.
- **Monorepo Benefits:**
    - Centralizes shared libraries and components.
    - Reduces duplication and ensures consistency across teams.
- **Over-the-Air Updates** – Simplifies updates without app store resubmissions.
- **Lower Setup Overhead** – Easier to start compared to `@callstack/repack`.
- **Good Library Support** – Excellent compatibility with Expo-managed libraries.

### ❌ Cons:

- **Limited Native Customization** – Less flexibility compared to React Native CLI.
- **Dependency Lock-In** – Tied to Expo's managed workflow.
- **Scalability Challenges** – Not as modular as `@callstack/repack` with Module Federation.

---

## 🔍 Feature Comparison Table

|Feature/Criteria|`@callstack/repack`|Expo Router + Monorepo|
|---|---|---|
|**Learning Curve**|Steeper|Easier|
|**Ease of Setup**|Moderate (requires Webpack setup)|High (Expo handles much of it)|
|**Flexibility**|High (full control over native code)|Medium (some limitations in Expo)|
|**Modularity**|Excellent (supports Module Federation)|Good (monorepo supports modularity)|
|**Over-the-Air Updates**|Possible but requires extra setup|Built-in with Expo|
|**Scalability**|Excellent (dynamic federation)|Good (monorepo + shared packages)|
|**Library Compatibility**|May require adjustments for Webpack|Excellent with Expo-managed libs|
|**Performance Optimization**|High (customizable)|Medium (Expo’s bundler optimizations)|

---

# 🛠 Creating a New React Native Base

## 1️⃣ Current Setup Issues

- **Independent apps** – No shared architecture.
- **Separate dependencies** – Each team uses different libraries.
- **No cross-app feature sharing** – Apps don’t share services or components.

### 📂 Project Structure
```
mobile-utconnect/
│── src/
│   │── assets/
│   │── hooks/
│   │── navigator/
│   │── screens/
│   │── services/
│── package.json
│── babel.config.js
│── metro.config.js
│── webpack.config.js
```

## 2️⃣ New Base with `@callstack/repack`

### 📂 Project Structure

```
super-app/
│── packages/
│   ├── app-shell/   # Core app shell (host)
│   ├── order-tracking/   # Independent module (remote)
│   ├── maintenance-management/   # Independent module (remote)
│── mobile/   # Main entry for mobile
│── package.json
│── babel.config.js
│── metro.config.js
│── webpack.config.js
```

---

## 3️⃣ New Base with Expo Router + Monorepo

### 📂 Project Structure

```
super-app/
│── apps/
│   ├── mobile/   # Main app
│   ├── maintenance/   # Maintenance app (child app)
│── packages/
│   ├── ui/   # Shared UI components
│   ├── services/   # Shared API and state management
│   ├── features/   # Feature modules (e.g., order tracking)
│── package.json
│── babel.config.js
│── expo-router.config.js
```

---

# 🏆 Recommendation

### Choose `@callstack/repack` if:

✅ You prioritize **modularity, scalability, and independent deployments**.  
✅ Your team has expertise in **Webpack and Module Federation**.  
✅ You need **tight control over bundling and native configurations**.

### Choose Expo Router + Monorepo if:

✅ Your team values **simplicity and faster development workflows**.  
✅ You can work within **Expo’s managed workflow limitations**.  
✅ You need **quick integration of features with minimal setup effort**.

### 🏁 Final Verdict

For a **super app with multiple independent teams**, **`@callstack/repack`** is the **more scalable and future-proof choice**. 🚀

- **True Modular Architecture** – Each team can build, maintain, and deploy features independently without affecting the core app.
- **Better Performance & Native Control** – Unlike Expo’s managed workflow, `@callstack/repack` allows fine-grained control over optimizations and native modules.
- **Versioning & Deployment Flexibility** – Teams can work on different versions of features without forcing the entire app to update simultaneously.

If your team lacks Webpack experience, starting with **Expo Router** can be an option for quick iteration, but investing in `@callstack/repack` ensures **better scalability, independence, and maintainability**. 💡

---

## 📚 References

1. [Callstack - `@callstack/repack` Documentation](https://re-pack.dev/)
2. [Expo Router Documentation](https://expo.github.io/router)
3. [React Native Official Documentation](https://reactnative.dev/)
4. [Callstack - Micro-Frontends in React Native](https://callstack.com/blog/micro-frontends-in-react-native)
5. [Expo - Managed vs. Bare Workflow](https://docs.expo.dev/introduction/managed-vs-bare)
