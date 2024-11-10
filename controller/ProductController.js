import { getAllCategories, getAllProduct, getProductByCategories } from "../model/productModel";

// Hiển thị tất cả sản phẩm
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

// Hiển thị tất cả nhóm sản phẩm
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
        console.error("Error fetching categories:", error);
        return res.status(500).send("An error occurred while fetching categories: " + error.message);
    }
};
// Hiển thị sản phẩm theo nhóm
const getListProductByCt = async (req, res) => {
    try {
        const { category } = req.query;  // Lấy id nhóm từ query string
        const products = category ? await getProductByCategories(category) : await getAllProduct(); // Nếu có category, lọc theo nhóm

        const categories = await getAllCategories();  // Lấy tất cả nhóm sản phẩm

        return res.render('layout/default', {
            title: "Product by Category",
            data: { 
                path: "views/products/listproduct",
                props: { 
                    sanpham: products,  // Sản phẩm lọc theo nhóm
                    nhom: categories    // Nhóm sản phẩm
                }  
            },
            user: req.session.user
        });
    } catch (error) {
        console.error("Error fetching products by category:", error);
        return res.status(500).send("An error occurred while fetching products by category: " + error.message);
    }
};

export default { getListProduct, getListCategories, getListProductByCt };
