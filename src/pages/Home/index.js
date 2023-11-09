import { useState } from 'react';
import axios from 'axios';
import * as S from './styled';
import {useHistory} from 'react-router-dom';

function App(props) {
  const history = useHistory();
  const [user, setUser] = useState('');
  const [error, setError] = useState(false)

  async function handlePesquisa() {
    try {
      const response = await axios.get(`https://api.github.com/users/${user}/repos`);
      const repositoriesName = response.data.map((repository) => repository.name);
      localStorage.setItem('repositoriesName', JSON.stringify(repositoriesName));
      setError(false);
      history.push('/repositories');
    } catch (err) {
      setError(true);
    }
  };

  return (
    <S.HomeContainer>
      <S.Content>
        <S.Input
          className="usuarioInput"
          placeholder="Usuário"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <S.Button type="button" onClick={handlePesquisa}>
          Pesquisar
        </S.Button>
      </S.Content>
      {error ? <S.ErrorMsg>Ocorreu um erro. Tente novamente.</S.ErrorMsg> : null}
    </S.HomeContainer>
  );
}

export default App;
