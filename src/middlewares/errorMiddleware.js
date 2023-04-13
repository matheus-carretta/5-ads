
const errorMiddleware = (error, req, res, next) => {
  console.log(error);
  res.status(500).json({message: "Erro interno do servidor"})
};

module.exports = errorMiddleware;