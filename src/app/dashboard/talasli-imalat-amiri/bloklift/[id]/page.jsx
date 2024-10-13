import React from 'react'
import { fetchOrderById } from '@/services/talasliimalamiri-service'
import LiftOrder from '@/components/dashboard/talasli-imalat-amiri/lift';

const BlokLiftPage = async ({params}) => {
  if (!params.id) throw new Error("id is required" ,params.id);

  console.log('params from LiftPage', params);

  const res = await fetchOrderById(params.id); // This returns a Response object

  const order = await res.json();

  console.log('order from LiftPage', order);

  if (!res.ok) throw new Error(order.message || 'Failed to fetch order data');
  return (
    <>
      <LiftOrder order={order} />
    </>
  )
}

export default BlokLiftPage