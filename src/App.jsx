import { useState } from "react";
import "./App.css";
import Table from "./components/Table";
import Test from "./components/Test";
import Declaration from "./components/Declaration";
import { Routes, Route, Navigate } from "react-router-dom";
import { Formik } from "formik";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="table" />} />
        <Route path="table" element={<Table />} />
        <Route path="declaration" element={<Declaration />} />
        <Route path="test" element={<Test />} />
      </Routes>
    </div>
  );
}

export default App;
