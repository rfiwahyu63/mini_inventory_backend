import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} from "../services/categoryService.js";

export const getCategoriesController = async (req,res) => {
  try {
    const categories = await getAllCategories();

     res.status(200).json({
      message: "Berhasil mengambil data kategori",
      data: categories,
    })
  } catch (error) {
    console.error(error);

    res.status(500).json ({
      message: "Gagal mengambil data kategori",
    });
  }
}

export const getCategoryByIdController = async (req,res) => {
  try {
    const { id } = req.params;
    
    const category = await getCategoryById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "kategori ID tidak ditemukan",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Kategori ID ditemukan",
      data: category,
    });
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server"
    });
  }
}

export const addCategory = async (req,res) => {
  try {
    const { name } = req.body;
    
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Nama kategori harus terisi",
      });
    }

    const newCategory = await createCategory(name.trim())
    return res.status(200).json({
      success: true,
      message: "Kategori berhasil ditambahkan",
      data: newCategory,
    });
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      succes: false,
      message: "Terjadi kesalahan pada server"
    });
  }
}


export const updateCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Nama kategori wajib diisi",
      });
    }

    const category = await updateCategory(id, {
      name: name.trim(),
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Kategori tidak ditemukan",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Kategori berhasil diperbarui",
      data: category,
    });
  } catch (error) {
    console.error(error);

    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "Nama kategori sudah digunakan",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
};


export const deleteCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await deleteCategory(id);

    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: "Kategori tidak ditemukan",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Kategori berhasil dihapus",
      data: deletedCategory,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
};