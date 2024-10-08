import { Suspense } from 'react';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { AcceptedLanguages, useLanguage } from '../../domain/locales/Language';
import { Loader } from '../components/Loader';
import Product from '../components/Product/Product';
import { Products } from '../components/Products/Products';
import { DefaultLayout } from '../layout/DefaultyLayout';
import { About } from '../screens/About';
import { BlogPost } from '../screens/BlogPost';
import { NotFound } from '../screens/NotFound';
import { Page } from '../screens/Page';

export function BrowserRouter() {
  const { currentLang } = useLanguage();

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={
              <Navigate to={`/${currentLang || AcceptedLanguages.pt}`} />
            }
          />
          <Route path="/:lang" element={<DefaultLayout />}>
            <Route index element={<Page />} />
            <Route path="produtos" element={<Products />} />
            <Route path="blog/:id" element={<BlogPost />} />
            <Route path="produto" element={<Product />} />
            <Route path="sobre-nos" element={<About />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
