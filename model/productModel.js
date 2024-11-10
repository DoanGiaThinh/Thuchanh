import pool from "../connectDB";  // Kết nối với cơ sở dữ liệu

const getAllProduct = async () => {
    try {
        const [rows] = await pool.execute('SELECT * FROM `sanpham`');  
        return rows;  // Trả về kết quả của truy vấn
    } catch (error) {
        console.error("Error fetching products from database:", error);
        throw error;  // Đảm bảo lỗi được ném ra ngoài để controller có thể xử lý
    }
};
//bảng nhóm
const getAllCategories = async() => {
    try {
        const [rows] = await pool.execute('SELECT * FROM `nhom`');  
        return rows;  // Trả về kết quả của truy vấn
    } catch (error) {
        console.error("Error fetching products from database:", error);
        throw error;  // Đảm bảo lỗi được ném ra ngoài để controller có thể xử lý
    }
}
const getProductByCategories = async (idnhom) => {
    const [rows] = await pool.execute('SELECT * FROM sanpham WHERE idnhom = ?', [idnhom]);
    return rows;
};

export { getAllProduct, getAllCategories, getProductByCategories };
