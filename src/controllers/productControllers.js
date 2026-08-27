import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService.js";

// Control Ambil semua product
export const getProducts = async (req, res, next) => {
  try {
    const products = await getAllProducts();

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// Control Ambil product berdasarkan id
export const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!/^\d+$/.test(id) || Number(id) < 1) {
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

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// Control Tambah product
export const addProduct = async (req, res) => {
  try {
    const { category_id, name, sku, stock, min_stock, price } = req.body;

    if (
      !category_id ||
      !name ||
      !sku ||
      stock === undefined ||
      min_stock === undefined ||
      price === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Category,Name,SKU,stock,min_stock, dan price wajib diisi",
      });
    }

    if (stock < 0) {
      return res.status(400).json({
        success: false,
        message: "Stock tidak boleh kurang dari 0",
      });
    }

    if (price < 0) {
      return res.status(400).json({
        success: false,
        message: "Price tidak boleh kurang dari 0",
      });
    }

    const product = await createProduct(req.body);
    res.status(201).json({
      success: true,
      message: "Produk berhasil ditambahkan",
      data: product,
    });
  } catch (error) {
    console.error(error);
    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "SKU sudah digunakan",
      });
    }

    res.status(500).json({                   
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
};

// Control Update product
export const updateProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!/^\d+$/.test(id) || Number(id) < 1) {
      return res.status(400).json({
        success: false,
        message: "ID product tidak valid",
      });
    }

    const { category_id, name, sku, stock, min_stock, price } = req.body;
    if (
      !category_id ||
      !name ||
      !sku ||
      stock === undefined ||
      min_stock === undefined ||
      price === undefined
    ) {
      return req.status(400).json({
        success: false,
        message: "Data product belum ditemukan",
      });
    }

    const product = await updateProduct(id, {
      category_id,
      name,
      sku,
      stock,
      min_stock,
      price,
    });

    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product berhasil diperbarui",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// Control Delete Product
export const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await deleteProduct(id);

    if (!deletedProduct) {
      return res.status(400).json({
        message: "Product tidak ditemukan",
      });
    }

    res.status(200).json({
      message: "Product berhasil dihapus",
      data: deletedProduct,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Gagagl menghapus product",
    });
  }
};
