import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { shopDataContext } from '../context/ShopContext';
import { FaStar, FaStarHalf } from "react-icons/fa";

function ProductDetail() {
    const { productId } = useParams();
    const { product, currency ,addToCart } = useContext(shopDataContext);
    const [productData, setProductData] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [mainImage, setMainImage] = useState('');
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (product) {
            const found = product.find(item => item._id === productId);
            if (found) {
                setProductData(found);
                setImages([found.image1, found.image2, found.image3, found.image4].filter(Boolean));
                setMainImage(found.image1);
            }
        }
    }, [productId, product]);

    if (!productData) return <div className='min-h-screen bg-gray-900'></div>;

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-900 to-black text-white py-40 px-4 sm:px-8 lg:px-16'>
            <div className="max-w-8xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16">
                
                {/* Left Side: Thumbnails + Main Image */}
                <div className='flex flex-row lg:flex-col gap-4 lg:gap-6 lg:w-1/2'>
                    
                    {/* Thumbnails */}
                    <div className='flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible justify-center lg:justify-start'>
                        {images.map((img, index) => (
                            <div
                                key={index}
                                className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${mainImage === img ? 'ring-2 ring-blue-500' : 'opacity-80 hover:opacity-100'}`}
                                onClick={() => setMainImage(img)}
                            >
                                <img src={img} alt={`Product view ${index + 1}`} className='w-full h-full object-cover' />
                            </div>
                        ))}
                    </div>

                    {/* Main Image */}
                    <div className='flex-1 lg:mt-[-350px] lg:ml-[40px]  rounded-xl overflow-hidden shadow-lg'>
                        <img 
                            src={mainImage} 
                            alt={productData.name} 
                            className='w-full h-auto max-h-[500px] object-contain'
                        />
                    </div>
                </div>

                {/* Right Side: Product Details */}
                <div className='lg:w-1/2 flex flex-col gap-6 lg:gap-8'>
                    <div>
                        <h1 className='text-3xl sm:text-4xl font-bold tracking-tight mb-4'>
                            {productData.name.toUpperCase()}
                        </h1>

                        {/* Ratings */}
                        <div className='flex items-center gap-2 mb-4'>
                            <div className='flex gap-1'>
                                <FaStar className='text-yellow-400' />
                                <FaStar className='text-yellow-400' />
                                <FaStar className='text-yellow-400' />
                                <FaStar className='text-yellow-400' />
                                <FaStarHalf className='text-yellow-400' />
                            </div>
                            <span className="text-gray-400">(128 reviews)</span>
                        </div>

                        {/* Price */}
                        <p className='text-3xl font-bold text-blue-400 mb-6'>
                            {currency}{productData.price}
                        </p>
                    </div>

                    {/* Description */}
                    <div className="mb-6 font-semibold text-l">
                        <p className='text-gray-300 leading-relaxed'>
                            {productData.description || "No description available."}
                        </p>
                    </div>

                    {/* Sizes */}
                    <div className="mb-8">
                        <h2 className='text-lg font-semibold mb-3'>Select Size</h2>
                        <div className='flex flex-wrap gap-3'>
                            {productData.size?.map((item, idx) => (
                                <button
                                    key={idx}
                                    className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                                        selectedSize === item 
                                            ? 'bg-blue-600 text-white' 
                                            : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                                    }`}
                                    onClick={() => setSelectedSize(item)}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button onClick={()=>addToCart(productData._id,selectedSize)}
                        className={`py-4 px-8 text-lg font-bold rounded-xl transition-all duration-300 ${
                            selectedSize 
                                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        }`}
                        disabled={!selectedSize}
                    >
                        ADD TO CART
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
