import './App.css';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import CardComponent from './component/Card/CardComponent';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBSpinner } from 'mdb-react-ui-kit';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DetailPage from './pages/DetailPage';

function App() {
  const [meal, setMeal] = useState([]);

  // Ambil data kategori saat aplikasi pertama kali dimuat
  useEffect(() => {
    const datameal = async () => {
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
        console.log(response);
        setMeal(response.data.categories);  // Simpan kategori di state
      } catch (error) {
        console.log(error);
      }
    };
    datameal();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Halaman Utama */}
        <Route
          path="/"
          element={
            meal.length === 0 ? (
              <MDBSpinner grow>
                <span className="visually-hidden">Loading...</span>
              </MDBSpinner>
            ) : (
              <div className="App">
                <span className="circle"></span>
                <h1>
                  Discover the Best Culinary Delights! <br /> Easily Order <br /> Your Favorite Food
                </h1>
                <h2>TheOrder</h2>
                <Breadcrumb className="breadcrumb-costum" listTag="div">
                  <BreadcrumbItem href="#" tag="a">Home</BreadcrumbItem>
                </Breadcrumb>
                {/* Kirim data dan path navigasi */}
                <CardComponent data={meal} />
              </div>
            )
          }
        />

        {/* Halaman Detail */}
        <Route path="/detail/:category" element={<DetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
