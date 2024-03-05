import { addDocument } from 'burnbase/firestore';
import { addFile } from 'burnbase/storage';

import { IClient, IOrder } from '../../interface';
import { orderCollectionName } from './orders.utis';

const addOrder = async ({
  precal,
  recipe,
  ...order
}: IOrder & Pick<IClient, 'clientId'> & { total: number }): Promise<void> => {
  const recipes = await Promise.all(
    Array.from(recipe ?? []).map((file) =>
      addFile(file, 'recipes', { prefix: '', suffix: '' })
    )
  );
  const precals = await Promise.all(
    Array.from(precal ?? []).map((file) =>
      addFile(file, 'precals', { prefix: '', suffix: '' })
    )
  );

  addDocument(orderCollectionName, {
    ...order,
    precals,
    recipes,
    createdAt: Date.now(),
  });
};

export default addOrder;
