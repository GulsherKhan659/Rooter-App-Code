// import React from 'react';
// import { Container, Row } from 'react-bootstrap';
// import CategoryCard from './CategoryCard';

// import CategoryImage1 from '../assets/images/categoryimage/xhdpi1.png';
// import CategoryImage2 from '../assets/images/categoryimage/xhdpi2.png';
// import CategoryImage3 from '../assets/images/categoryimage/xhdpi3.png';
// import CategoryImage4 from '../assets/images/categoryimage/xhdpi4.png';
// import CategoryImage5 from '../assets/images/categoryimage/xhdpi5.png';
// import CategoryImage6 from '../assets/images/categoryimage/xhdpi6.png';
// import CategoryImage7 from '../assets/images/categoryimage/xhdpi7.png';
// import CategoryImage8 from '../assets/images/categoryimage/xhdpi8.png';

// // Category Data
// const categories = [
//   { image: CategoryImage1 , title: 'Mobile Games' },
//   { image: CategoryImage2 , title: 'PC Games' },
//   { image: CategoryImage3 , title: 'Consoles' },
//   { image: CategoryImage4 , title: 'Dating' },
//   { image: CategoryImage5 , title: 'Entertainment' },
//   { image: CategoryImage6 , title: 'Fashion & Apparel' },
//   { image: CategoryImage7 , title: 'Beauty & Personal Care' },
//   { image: CategoryImage8 , title: 'Travel & Accommodation' },
// ];

// const Categories = () => {
//   return (
//     <Container>
//       <Row>
//         <h5 className="fw-bold mb-3">Shop By Product Categories</h5>
//       </Row>
//       <Row className="my-2">
//         {categories.map((category, index) => (
//           <CategoryCard key={index} image={category.image} title={category.title} />
//         ))}
//       </Row>
//     </Container>
//   );
// };

// export default Categories;



import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import CategoryCard from './CategoryCard';
import { API_BASE_URL } from '../config';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/categories`);
        const data = await response.json();
        const filteredCategories = data.filter(category => category.categoryName && category.mainImage);
        setCategories(filteredCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Container>
      <Row>
        <h5 className="fw-bold mb-3">Shop By Product Categories</h5>
      </Row>
      <Row className="my-2">
        {categories.map((category) => (
          <CategoryCard key={category._id} image={category.mainImage} title={category.categoryName} />
        ))}
      </Row>
    </Container>
  );
};

export default Categories;
