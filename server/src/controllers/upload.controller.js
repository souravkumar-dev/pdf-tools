import uploadFile from "../services/upload.service.js";

function uploadController(req, res) {

  const response = uploadFile(req.file);

  res.status(200).json(response);

}

export default uploadController;