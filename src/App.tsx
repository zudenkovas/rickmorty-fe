import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'state/store';
import Layout from 'components/Layout';
import Footer from 'components/Footer';
import Header from 'components/Header';
import AuthTracker from 'components/AuthTracker';
import MainRouter from 'navigation';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthTracker>
          <Layout footer={<Footer />} header={<Header />}>
            <MainRouter />
          </Layout>
        </AuthTracker>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
