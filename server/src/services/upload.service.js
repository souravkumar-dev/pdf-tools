function uploadFile(file) {

    return {
  
      success: true,
  
      fileName: file.filename,
  
      originalName: file.originalname,
  
      size: file.size,
  
    };
  
  }
  
  export default uploadFile;