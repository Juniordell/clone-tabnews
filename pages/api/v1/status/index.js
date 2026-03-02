function status(request, response) {
  response.status(200).json({ msg: "Curso.dev é fora da curva!" });
}

export default status;
