import { useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  CalculatedShipping,
  CalculateShipping,
} from '../../../domain/entities/Shipping.entity';
import { LanguageTexts } from '../../../domain/locales/Language';
import { UseCases } from '../../../domain/usecases/UseCases';
import Bitkit8 from '../../assets/Bitkit/3.png';
import Bitkit9 from '../../assets/Bitkit/6.png';
import Bitkit1 from '../../assets/Bitkit/Bitkit 1.png';
import Bitkit2 from '../../assets/Bitkit/Bitkit 2.png';
import Bitkit3 from '../../assets/Bitkit/Bitkit 3.png';
import Bitkit4 from '../../assets/Bitkit/Bitkit 4.png';
import Bitkit5 from '../../assets/Bitkit/Bitkit 5.png';
import Bitkit6 from '../../assets/Bitkit/Bitkit 6.png';
import Bitkit7 from '../../assets/Bitkit/Bitkit 7.png';
import Seedkit1 from '../../assets/seedkit/1.png';
import Seedkit2 from '../../assets/seedkit/2.png';
import Seedkit3 from '../../assets/seedkit/3.png';
import Seedkit4 from '../../assets/seedkit/4.png';
import Seedkit5 from '../../assets/seedkit/5.png';
import Seedkit6 from '../../assets/seedkit/6.png';
import Seedkit7 from '../../assets/seedkit/7.png';
import Seedkit8 from '../../assets/seedkit/8.png';
import { useCartContext } from '../../context/CartContext';
import { ROUTES } from '../../routes/Routes';
import { useCurrentLang } from '../../utils/useCurrentLang';

type Product = {
  id: number;
  name: string;
  title: string;
  price: number;
  originalPrice: number;
  description: string;
  images: string[];
};

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  category_id: string;
};

type Infos = {
  title: string;
  description: string;
};

export function useProductPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  const { currentLang } = useCurrentLang();
  const { add } = useCartContext();

  const form = useForm<CalculateShipping>();
  const { register, handleSubmit } = form;

  const [product, setProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { id } = useParams<{ id: string }>();
  const [shippingOptions, setShippingOptions] = useState<CalculatedShipping[]>(
    [],
  );
  const [, setError] = useState<string | null>(null);

  const infos = useMemo(() => {
    return t(LanguageTexts.products.infos, {
      returnObjects: true,
    }) as Infos[];
  }, [t]);

  const resources = useMemo(() => {
    return t(LanguageTexts.products.resources, {
      returnObjects: true,
    }) as string[];
  }, [t]);

  useEffect(() => {
    const products: Product[] = [
      {
        id: 1,
        title: 'SEEDKIT',
        name: infos[0].title,
        price: 150,
        originalPrice: 180,
        description: infos[0].description,
        images: [
          Seedkit7,
          Seedkit1,
          Seedkit2,
          Seedkit3,
          Seedkit4,
          Seedkit5,
          Seedkit6,
          Seedkit8,
        ],
      },
      {
        id: 2,
        title: 'BITKIT',
        name: infos[2].title,
        price: 800,
        originalPrice: 850,
        description: infos[2].description,
        images: [
          Bitkit7,
          Bitkit1,
          Bitkit2,
          Bitkit3,
          Bitkit4,
          Bitkit5,
          Bitkit6,
          Bitkit8,
          Bitkit9,
        ],
      },
    ];

    const selectedProduct = products.find((p) => p.id === Number(id));
    setProduct(selectedProduct || null);
    setCurrentImageIndex(0);
  }, [id, infos]);

  const handleNextImage = () => {
    if (product) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === product.images.length - 1 ? 0 : prevIndex + 1,
      );
    }
  };

  const handlePrevImage = () => {
    if (product) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? product.images.length - 1 : prevIndex - 1,
      );
    }
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const onSubmit: SubmitHandler<CalculateShipping> = async (data) => {
    setLoading(true);
    setError(null);
    try {
      if (data.postalCode.length < 8) {
        return;
      }

      const { result } = await UseCases.shipping.calculate.execute(data);

      if (result.type === 'ERROR') {
        switch (result.error.code) {
          case 'SERIALIZATION':
            alert('ERRO DE SERIALIZAÇÃO!');
            setError('Erro ao calcular o frete. Tente novamente.');
            return;
          default:
            alert('ERRO DESCONHECIDO');
            setError('Erro ao calcular o frete. Tente novamente.');
            return;
        }
      }
      setShippingOptions(result.data);
    } finally {
      setLoading(false);
    }
  };

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (product) {
      const productToAdd: CartItem = {
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        quantity,
        imageUrl: product.images[0],
        category_id: product.name,
      };

      add(productToAdd);

      Swal.fire({
        title: t('products.addToCartButton'),
        text: `${productToAdd.name} (${t('products.quantity')}: ${quantity})`,
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: t('products.goToCart'),
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        } else if (result.isDismissed) {
          window.location.href = ROUTES.cart.call(currentLang);
        }
      });
    }
  };

  useEffect(() => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      console.log('Carrinho carregado:', JSON.parse(storedCart));
    }
  }, []);

  return {
    t,
    form,
    product,
    loading,
    resources,
    currentLang,
    register,
    cart: {
      add: handleAddToCart,
    },
    image: {
      next: handleNextImage,
      prev: handlePrevImage,
      current: currentImageIndex,
      thumbnail: handleThumbnailClick,
    },
    quantity: {
      value: quantity,
      set: setQuantity,
    },
    shipping: {
      calculate: handleSubmit(onSubmit),
      options: shippingOptions,
    },
  };
}
