import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardImg, CardTitle } from 'reactstrap';
import '../pages/index.css'

export default function DetailPage() {
  const { category } = useParams(); 
  const [detailMeal, setDetailMeal] = useState([]);
  const [loading, setLoading] = useState(true); 

    
    useEffect(() => {
        const fetchDetail = async () => {
        try {
            const response = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
            );
            console.log('Detail Meal:', response.data);
            setDetailMeal(response.data.meals);
            setLoading(false); 
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

    
        <Breadcrumb className="breadcrumb-costum" listTag="div" style={{ alignItems:'center' }}>
            <BreadcrumbItem href="/" tag="a">Home</BreadcrumbItem>
            <BreadcrumbItem active>{category}</BreadcrumbItem>
        </Breadcrumb>

        
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
