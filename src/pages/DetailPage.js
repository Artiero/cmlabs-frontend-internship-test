import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardImg, CardTitle } from 'reactstrap';
import '../pages/index.css' // Pastikan CSS untuk styling sudah tersedia

export default function DetailPage() {
  const { category } = useParams(); // Ambil parameter kategori dari URL
  const [detailMeal, setDetailMeal] = useState([]); // State untuk menyimpan detail makanan
  const [loading, setLoading] = useState(true); // State untuk mengelola status loading

    // Ambil data makanan berdasarkan kategori yang diklik
    useEffect(() => {
        const fetchDetail = async () => {
        try {
            const response = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
            );
            console.log('Detail Meal:', response.data);
            setDetailMeal(response.data.meals);
            setLoading(false); // Set loading ke false setelah data diambil
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
        };
        fetchDetail();
    }, [category]);

    return (
        <div className="App">
        <span className="circle"></span>
        <h1>Explore Dishes in {category}</h1>
        <h2>TheOrder</h2>

        {/* Breadcrumb untuk navigasi */}
        <Breadcrumb className="breadcrumb-costum" listTag="div" style={{ alignItems:'center' }}>
            <BreadcrumbItem href="/" tag="a">Home</BreadcrumbItem>
            <BreadcrumbItem active>{category}</BreadcrumbItem>
        </Breadcrumb>

        {/* Tampilkan loading jika data belum siap */}
        {loading ? (
            <p>Loading...</p>
        ) : (
            <div className="meal-list">
            {detailMeal.map((item, index) => (
                <Card key={index} className="meal-card">
                <CardImg
                    alt={item.strMeal}
                    src={item.strMealThumb}
                    top
                    style={{ height: '200px', objectFit: 'cover' }}
                />
                <CardBody style={{ backgroundColor: '#800000', borderRadius:'10px', marginTop: '10px' }}>
                    <CardTitle style={{ fontFamily:'Merriweather Serif', color: '#FFD700' }} tag="h5">{item.strMeal}</CardTitle>
                </CardBody>
                </Card>
            ))}
            </div>
        )}
        </div>
    );
}
