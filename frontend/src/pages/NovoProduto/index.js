import React, { useEffect, useState } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { MdReply } from "react-icons/md";
import M from "materialize-css/dist/js/materialize.min.js";
import api from "../../services/Api";

import Button from "../../components/Button";

import "./styles.css";

const validates = yup.object().shape({
  nome: yup
    .string("O nome do produto deve ser um texto")
    .trim()
    .required("O nome do produto não deve ser vazio"),
  preco: yup
    .number("O preco do produto deve ser um numero")
    .required("O preco não deve ser vazio"),
  descricao: yup.string("A descricao deve ser um texto").trim().optional(),
  possuiEstoque: yup.string().required("O produto tem estoque"),
  quantidade: yup
    .number("A quantidade deve ser um numero")
    .positive("A quantidade deve ser positiva")
    .optional(),
});

function NovoProduto() {
  const [dadosProdutos, setDadosProdutos] = useState({});
  const [categorias, setCategorias] = useState([]);
  const { idComercio } = useParams();

  useEffect(() => {
    (async function () {
      const dataCategorias = await api.get("/categorias");

      setCategorias(dataCategorias.data);

      M.AutoInit();
    })();
  }, [idComercio]);

  return (
    <>
      <div className="container-cadastro-produto">
        <Button
          text="VOLTAR"
          tipo="Link"
          to={`/produto/vendedor/${idComercio}`}
          typeButton="secundaria"
          Icon={MdReply}
          tooltip="Voltar para pagina de produtos"
        />
      </div>
      <Formik
        initialValues={dadosProdutos}
        onSubmit={(values) => {
          const valuesProdutos = {
            nome: values.nome,
            descricao: values.descricao,
            preco: values.preco,
            possuiEstoque: values.possuiEstoque,
            quantidade: values.quantidade,
            categoria: values.categoria,
          };
          setDadosProdutos(valuesProdutos);
        }}
        validationSchema={validates}
      >
        {({ values, handleSubmit }) => (
          <form className="form-dados-novo-produto" onSubmit={handleSubmit}>
            <div className="container-form">
              <img src="" alt="Previa de foto" className="previa-foto" />
              <div className="file-field input-field input-file-upload-foto">
                <div className="btn btn-upload-foto">
                  <span>Foto</span>
                  <input type="file" />
                </div>
                <div className="file-path-wrapper">
                  <input className="file-path validate" type="text" />
                </div>
              </div>
            </div>
            <div className="container-form-dados-produtos">
              <div className="input-field">
                <label htmlFor="nome">Nome do produto</label>
                <Field name="nome" type="text" id="nome" />
                <ErrorMessage
                  className="helper-text"
                  name="nome"
                  component="span"
                />
              </div>
              <div className="input-field">
                <label htmlFor="preco">Preço unitario</label>
                <Field name="preco" type="text" id="preco" />
                <ErrorMessage
                  className="helper-text"
                  name="preco"
                  component="span"
                />
              </div>
              <div className="input-field">
                <div className="input-field ">
                  <Field as="select" id="categoria" name="categoria">
                    <option value={false}>Selecione uma categoria</option>
                    {categorias.map((categoria) => (
                      <option value={categoria.id} key={categoria.id}>
                        {categoria.nome}
                      </option>
                    ))}
                  </Field>
                </div>
                <ErrorMessage
                  className="helper-text"
                  name="categoria"
                  component="span"
                />
              </div>
              <div className="input-field">
                <div className="div-radio radio-possui-estoque">
                  <p>
                    <label htmlFor="estoque">
                      <Field
                        name="possuiEstoque"
                        type="radio"
                        value="estoque"
                        id="estoque"
                      />
                      <span>Estoque</span>
                    </label>
                  </p>
                  <p>
                    <label htmlFor="demanda">
                      <Field
                        name="possuiEstoque"
                        type="radio"
                        value="demanda"
                        id="demanda"
                      />
                      <span>Demanda</span>
                    </label>
                  </p>
                </div>
                <ErrorMessage
                  className="helper-text"
                  name="possuiEstoque"
                  component="span"
                />
                <label htmlFor="quantidade" className="lbl-possui-estoque">
                  Esse produto é por estoque ou demanda
                </label>
              </div>
              {values.possuiEstoque === "estoque" && (
                <div className="input-field">
                  <label htmlFor="quantidade">Quantidade</label>
                  <Field name="quantidade" type="text" id="quantidade" />
                  <ErrorMessage
                    className="helper-text"
                    name="quantidade"
                    component="span"
                  />
                </div>
              )}
              <div className="input-field">
                <Field
                  as="textarea"
                  name="descricao"
                  type="text"
                  id="descricao"
                  className="materialize-textarea"
                />
                <label htmlFor="descricao">Descrição</label>
                <ErrorMessage
                  className="helper-text"
                  name="descricao"
                  component="span"
                />
              </div>
              <div className="input-field div-botao-cadastrar">
                <Button
                  submit="submit"
                  text="Cadastrar"
                  tooltip="Cadatrar novo produto"
                />
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}

export default NovoProduto;