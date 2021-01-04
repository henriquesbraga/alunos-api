import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { isEmail, isInt, isFloat } from 'validator';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaEdit } from 'react-icons/fa';
import { Container } from '../../styles/globalStyles';
import { Form, ProfilePicture, Title } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';
import Loading from '../../components/Loading';
import * as actions from '../../store/modules/auth/actions';

// eslint-disable-next-line react/prop-types
export default function Aluno({ match }) {
  const dispatch = useDispatch();
  const id = get(match, 'params.id', '');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [foto, setFoto] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line no-useless-return
    if (!id) return;

    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        const Foto = get(data, 'Fotos[0].url', '');
        setFoto(Foto);
        setNome(data.nome);
        setSobrenome(data.sobrenome);
        setEmail(data.email);
        setIdade(data.idade);
        setPeso(data.peso);
        setAltura(data.altura);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);

        if (status === 400) errors.map((error) => toast.error(error));
        history.push('/');
      }
    }

    getData();
  }, [id]);

  const handleSubmit = async (e) => {
    let formErrors = false;
    e.preventDefault();

    if (nome.length < 3 || nome.length > 255) {
      formErrors = true;
      toast.error('Nome deve ter entre 3 e 255 caracteres!');
    }

    if (sobrenome.length < 3 || sobrenome.length > 255) {
      formErrors = true;
      toast.error('Sobrenome deve ter entre 3 e 255 caracteres!');
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('Email Inválido!');
    }

    if (!isInt(String(idade))) {
      formErrors = true;
      toast.error('Idade Inválida!');
    }

    if (!isFloat(String(peso))) {
      formErrors = true;
      toast.error('Peso Inválido!');
    }

    if (!isFloat(String(altura))) {
      formErrors = true;
      toast.error('Altura Inválida!');
    }

    // eslint-disable-next-line no-useless-return
    if (formErrors) return;

    try {
      setIsLoading(true);
      if (id) {
        // editando
        await axios.put(`/alunos/${id}`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success('Aluno(a) editado com sucesso!');
        history.push('/');
      } else {
        // criando
        await axios.post(`/alunos/`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success('Aluno(a) criado com sucesso!');
        history.push('/');
      }
      setIsLoading(false);
    } catch (err) {
      const status = get(err, 'response.status', 0);
      const data = get(err, 'response.data', {});
      const errors = get(data, 'errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Erro Desconhecido.');
      }

      if (status === 401) {
        dispatch(actions.loginFailure());
      }
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title>{id ? 'Editar Aluno' : 'Novo Aluno'}</Title>
      {id && (
        <ProfilePicture>
          {foto ? <img src={foto} alt={nome} /> : <FaUserCircle size={180} />}
          <Link to={`/fotos/${id}`}>
            <FaEdit size={24} />
          </Link>
        </ProfilePicture>
      )}
      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome:
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome do aluno"
          />
        </label>

        <label htmlFor="sobrenome">
          Sobrenome:
          <input
            type="text"
            id="sobrenome"
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
            placeholder="Sobrenome do aluno"
          />
        </label>

        <label htmlFor="email">
          Email:
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email do aluno"
          />
        </label>

        <label htmlFor="idade">
          Idade:
          <input
            type="number"
            id="idade"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            placeholder="Idade do aluno"
          />
        </label>

        <label htmlFor="peso">
          Peso:
          <input
            type="text"
            id="peso"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            placeholder="Peso do aluno"
          />
        </label>

        <label htmlFor="altura">
          Altura:
          <input
            type="text"
            id="altura"
            value={altura}
            onChange={(e) => setAltura(e.target.value)}
            placeholder="Altura do aluno"
          />
        </label>

        <button type="submit">{id ? 'Salvar' : 'Salvar Aluno'}</button>
      </Form>
    </Container>
  );
}

Aluno.prototypes = {
  match: PropTypes.shape({}).isRequired,
};
