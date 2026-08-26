import { 
  getAllProducts,
  getProductById
} from "../services/productService.js";

export const getProducts = async (req,res,next) => {
  try {
    const products = await getAllProducts();

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    next (error);
  }
};

export const getProduct = async (req,res,next) => {
  try {
    const {id} = req.params;
    
    if (!/^\d+$/.test(id) || Number(id) <1){
        return res.status(400).json({
          success: false,
          message: "ID product tidak valid",
        });
    }

    const product = await getProductById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product tidak ditemukan",
      });
    }

    res.status(200).json ({
      success: true,
      data: product,
    });
    
  } catch (error){
    next (error)};
}