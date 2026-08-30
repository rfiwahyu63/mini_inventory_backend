import {
  getAllStockMovements,
  getStockMovementById,
  createStockIn,
} from "../services/stockMovementService.js";

export const getStockMovementscontroller = async (req, res) => {
  try {
    const stockMovements = await getAllStockMovements();

    res.status(200).json({
      success: true,
      message: "Riwayat stock berhasil diambil",
      data: stockMovements,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
};

export const getStockMovementByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const stockMovement = await getStockMovementById(id);

    if (!stockMovement) {
      return res.status(404).json({
        success: false,
        message: "ID riwayat pergerakan stok tidak ditemukan",
      });
    }

    return res.status(200).json({
      success: true,
      message: "ID riwayat pergerakan stok ditemukan",
      data: stockMovement,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Terjadi kendala pada server",
    });
  }
};

export const addStockIn = async (req, res) => {
  try {
    const { product_id, user_id, quantity, note } = req.body;

    if (!product_id || !user_id || !quantity) {
      return res.status(400).json({
        success: false,
        messsage: "Produc_id,User_id,Quantity wajib diisi",
      });
    }

    const result = await createStockIn(product_id, user_id, quantity, note);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Product tidak ditemukan",
      });
    }
    return res.status(201).json({
      success: true,
      message: "Stok masuk berhasil ditambahkan",
      data: result,
    });
  } catch (error) {
    if (error.message === "Quantity harus lebih dari 0") {
      return res.status(400).json({
        success: false,
        message: "error.messsage",
      });
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
};
