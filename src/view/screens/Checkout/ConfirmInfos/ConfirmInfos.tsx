import { useFormContext } from 'react-hook-form';
import { GetCheckout } from '../../../../domain/entities/payment.entity';

export function ConfirmInfos() {
  const form = useFormContext<GetCheckout>();

  const infos = form.getValues();

  const formatCurrency = (value: number | string | undefined) => {
    if (value === undefined || value === null || isNaN(Number(value))) {
      return '0,00';
    }
    return Number(value).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col border-b border-solid border-black dark:border-white pb-4">
        <h2 className="text-2xl leading-6 dark:text-white">
          {infos.firstName} {infos.lastName}
        </h2>
        <span className="dark:text-white">{infos.payerEmail}</span>
        <span className="dark:text-white">
          Data de Nascimento: {infos.birthday}
        </span>
        <span className="dark:text-white">
          {infos.identification.type}: {infos.identification.number}
        </span>
        <span className="dark:text-white">
          +55 ({infos.phone.areaCode}) {infos.phone.number}
        </span>
      </div>
      <div className="flex flex-col border-b border-solid border-black dark:border-white py-4">
        <span className="dark:text-white">
          Endereço: {infos.address.street}, {infos.address.number} -{' '}
          {infos.address.complement}
        </span>
        <span className="dark:text-white">CEP: {infos.address.zipCode}</span>
        <span className="dark:text-white">
          Estado: {infos.address.state}, {infos.address.uf}
        </span>
        <span className="dark:text-white">
          Bairro: {infos.address.neighborhood}
        </span>
      </div>
      <div className="flex flex-col border-b border-solid border-black dark:border-white py-4">
        <span className="dark:text-white">
          Valor Total: R$ {formatCurrency(infos.total)}
        </span>
        {infos.shipping && (
          <span className="dark:text-white">
            {infos.shipping.name}: R$ {formatCurrency(infos.shipping.price)}.
            Entrega em: {infos.shipping.deliveryTime} dias
          </span>
        )}
        <span className="dark:text-white">
          Pagamento: {infos.selectedPaymentLabel}{' '}
          {infos.paymentOption === 'creditCard' &&
            `- ${infos.selectInstallments}X`}
        </span>
      </div>
    </div>
  );
}
