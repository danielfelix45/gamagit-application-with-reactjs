import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as S from './styled';

function Repositories() {
  const history = useHistory();
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const repositoriesName = localStorage.getItem('repositoriesName');

    if (repositoriesName !== null) {
      const parsedRepositories = JSON.parse(repositoriesName);
      setRepositories(parsedRepositories);
      localStorage.removeItem('repositoriesName');
    } else {
      history.push('/');
    }
  }, [history]);

  return (
    <S.Container>
      <S.Title>Repositórios</S.Title>
      <S.List>
        {repositories.map((repository, index) => (
          <S.ListItem key={index}>Repositório: {repository}</S.ListItem>
        ))}
      </S.List>
      <S.LinkHome to="/">Voltar</S.LinkHome>
    </S.Container>
  );
}

export default Repositories;
