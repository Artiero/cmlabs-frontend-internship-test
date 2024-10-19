import React from 'react';
import { Card } from 'reactstrap';
import '../Card/index.css';
import Badge from 'react-bootstrap/Badge';
import { useNavigate } from 'react-router-dom';

export default function CardComponent({ data }) {
  const navigate = useNavigate(); 

    const handleClick = (category) => {
        navigate(`/detail/${category}`); 
    };

    return (
        <div className="card-costum">
        {data.map((item, index) => (
            <div key={index} className="imgCostum" onClick={() => handleClick(item.strCategory)}>
            <div className="badgeCostum" style={{ position: 'absolute', zIndex: '999' }}>
                <Badge bg="#800000" style={{ color: '#FFD700' }}>
                {item.strCategory}
                </Badge>
            </div>
            <Card>
                <img alt={item.strCategory} src={item.strCategoryThumb} style={{ cursor: 'pointer' }} />
            </Card>
            </div>
        ))}
        </div>
    );
}
