import livros from "../models/Livro";

class LivroController {
  static listarLivros = (req: any, res: any) => {
    livros
      .find()
      .populate("autor")
      .exec((err, livros) => {
        res.status(200).json(livros);
      });
  };

  static listarLivroPorId = (req: any, res: any) => {
    const id = req.params.id;

    livros
      .findById(id)
      .populate("autor", "nome")
      .exec((err, livros) => {
        if (err) {
          res
            .status(400)
            .send({ message: `${err.message} - Id do livro não localizado.` });
        } else {
          res.status(200).send(livros);
        }
      });
  };

  static cadastrarLivro = (req: any, res: any) => {
    let livro = new livros(req.body);

    livro.save((err: any) => {
      if (err) {
        res
          .status(500)
          .send({ message: `${err.message} - falha ao cadastrar livro.` });
      } else {
        res.status(201).send(livro.toJSON());
      }
    });
  };

  static atualizarLivro = (req: any, res: any) => {
    const id = req.params.id;

    livros.findByIdAndUpdate(id, { $set: req.body }, (err: any) => {
      if (!err) {
        res.status(200).send({ message: "Livro atualizado com sucesso" });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  };

  static excluirLivro = (req: any, res: any) => {
    const id = req.params.id;

    livros.findByIdAndDelete(id, (err: any) => {
      if (!err) {
        res.status(200).send({ message: "Livro removido com sucesso" });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  };

  static listarLivroPorEditora = (req: any, res: any) => {
    const editora = req.query.editora;

    livros.find({ editora: editora }, {}, (err: any, livros: any) => {
      res.status(200).send(livros);
    });
  };
}

export default LivroController;
