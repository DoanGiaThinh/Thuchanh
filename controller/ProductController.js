import { getAllCategories, getAllProduct } from "../model/productModel"; 

const getListProduct = async (req, res) => {
    try {
        const products = await getAllProduct();  
        
        return res.render('layout/default', {
            title: "Product Page",
            data: { 
                path: "views/products/listproduct",
                props: { sanpham: products }  
            },
            user: req.session.user
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).send("An error occurred while fetching products: " + error.message);
    }
};
//bảng nhóm
const getListCategories = async (req, res) => {
    try {
        const categories = await getAllCategories();  
        
        return res.render('layout/default', {
            title: "Categories Page",
            data: { 
                path: "views/categories",
                props: { nhom: categories }  
            },
            user: req.session.user
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).send("An error occurred while fetching products: " + error.message);
    }
};
export default { getListProduct, getListCategories };
