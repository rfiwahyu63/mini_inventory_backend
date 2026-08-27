import {
  getAllCategories
} from "../services/categoryService.js";

export const getCategories = async (req,res) => {
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