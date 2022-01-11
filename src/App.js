import 'bootstrap/dist/css/bootstrap.css';
import { Link, Outlet, useLocation } from "react-router-dom";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { PokemonList } from "./routes/pokemon-list";
import { createStore } from "redux";
import PokemonReducer from "./reducers/PokemonReducer";
import { Provider } from 'react-redux'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from "redux-persist/integration/react";
import { Container, Nav, Navbar } from "react-bootstrap";
import './index.css'

export default function App() {

const client = new ApolloClient({
  uri: 'https://graphql-pokeapi.graphcdn.app/'
});

const location = useLocation();

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, PokemonReducer)

const store = createStore(persistedReducer);
const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={client} >
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <Navbar.Brand href="#"><Link className='text-decoration-none text-light' to="/pokemon"><h1>Mokepon!</h1></Link></Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="#"><Link className='text-decoration-none text-light' to="/pokemon/my-pokemon">My Mokepon</Link></Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <div>
            { location.pathname === '/pokemon' || location.pathname === '/pokemon/' ? <PokemonList /> : ''}
          </div>
          <Outlet />
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
}