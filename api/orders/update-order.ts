import '../init';

import { updateDocument } from 'burnbase/firestore';
import { addFile, deleteFile } from 'burnbase/storage';

import { IOrder } from '../../interface';
import { orderCollectionName } from './orders.utis';

const updateOrder = async ({
  docId,
  precal,
  recipe,
  ...order
}: Partial<IOrder> & {
  total: number;
  docId: string;
}): Promise<void> => {
  const recipes = await Promise.all(
    Array.from(recipe ?? []).map((file) =>
      addFile(file, 'recipes', { prefix: '', suffix: '' })
    )
  ).then(() => {
    if (order.recipes)
      Promise.all(order.recipes.map((file) => deleteFile(file)));
  });

  const precals = await Promise.all(
    Array.from(precal ?? []).map((file) =>
      addFile(file, 'precals', { prefix: '', suffix: '' })
    )
  ).then(() => {
    if (order.precals)
      Promise.all(order.precals.map((file) => deleteFile(file)));
  });

  updateDocument(orderCollectionName, docId, {
    ...order,
    precals,
    recipes,
    updatedAt: Date.now(),
  });
};

export default updateOrder;
