import { t } from 'i18next';
import { useFormContext } from 'react-hook-form';
import { GetCheckout } from '../../../../domain/entities/payment.entity';

export function usePaymentOptions() {
  const form = useFormContext<GetCheckout>();

  const selectedPaymentLabel = form.watch('selectedPaymentLabel');

  const handlePaymentSelection = (
    method: 'MP' | 'EFI' | 'BTC',
    label: string,
  ) => {
    form.setValue('method', method);
    form.setValue('selectedPaymentLabel', label);

    switch (method) {
      case 'EFI':
        form.setValue(
          'paymentOption',
          label === t('paymentForm.creditCard') ? 'creditCard' : 'pix',
        );
        break;
      case 'MP':
        form.setValue('paymentOption', 'pix');
        break;
    }
  };

  return {
    handlePaymentSelection,
    selectedPaymentLabel,
  };
}