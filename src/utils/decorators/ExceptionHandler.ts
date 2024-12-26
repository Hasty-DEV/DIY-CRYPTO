/* eslint-disable @typescript-eslint/no-explicit-any */
import { isAxiosError } from 'axios';
import { EfiDatasourceImpl } from '../../data/datasource/Efi.datasource';
import { RemoteDataSource } from '../../data/datasource/Remote.datasource';
import { Http } from '../../domain/HttpClient';
import { Result } from '../Result';

export function ExceptionHandler() {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        if (error instanceof Error) {
          Http.checkError(error);
          EfiDatasourceImpl.checkError(error);
        }

        if (isAxiosError(error)) {
          RemoteDataSource.checkError(error);
        }

        console.error(error);

        return Result.Error({ code: 'UNKNOWN' });
      }
    };

    return descriptor;
  };
}
