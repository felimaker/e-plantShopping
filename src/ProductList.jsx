import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

function ProductList() {
    const dispatch = useDispatch();
    const [addedToCart, setAddedToCart] = useState({});

    // Categorized plants array with at least 6 unique plants
    const plantsArray = [
        {
            category: "Air Purifying",
            plants: [
                { name: "Snake Plant", image: "https://images.unsplash.com/photo-1593482892290-f54927ae1b7e?w=500", cost: "$15", description: "Purifies air naturally" },
                { name: "Spider Plant", image: "https://images.unsplash.com/photo-1596724890698-1e43c52a8b98?w=500", cost: "$12", description: "Great for beginners" },
            ]
        },
        {
            category: "Aromatic",
            plants: [
                { name: "Lavender", image: "https://images.unsplash.com/photo-1595846171787-8490a07186ce?w=500", cost: "$20", description: "Calming scent" },
                { name: "Mint", image: "https://images.unsplash.com/photo-1600858178120-0a256a7351c2?w=500", cost: "$10", description: "Fresh aroma" },
            ]
        },
        {
            category: "Succulents",
            plants: [
                { name: "Aloe Vera", image: "https://images.unsplash.com/photo-1596225251877-9d7a221f753e?w=500", cost: "$14", description: "Healing properties" },
                { name: "Jade Plant", image: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=500", cost: "$18", description: "Symbol of luck" },
            ]
        }
    ];

    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
        setAddedToCart((prevState) => ({
           ...prevState,
           [plant.name]: true,
        }));
    };

    return (
        <div className="product-list-page">
            <h2>Our Plants</h2>
            <div className="product-list">
                {plantsArray.map((category, index) => (
                    <div key={index}>
                        <h3>{category.category}</h3>
                        <div className="plant-grid" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                            {category.plants.map((plant, plantIndex) => (
                                <div className="plant-card" key={plantIndex} style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>
                                    <img src={plant.image} alt={plant.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                                    <h4>{plant.name}</h4>
                                    <p>{plant.description}</p>
                                    <p>{plant.cost}</p>
                                    <button
                                        onClick={() => handleAddToCart(plant)}
                                        disabled={addedToCart[plant.name]}
                                        style={{ backgroundColor: addedToCart[plant.name] ? 'grey' : '#4CAF50', color: 'white', padding: '10px', cursor: 'pointer' }}
                                    >
                                        {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
