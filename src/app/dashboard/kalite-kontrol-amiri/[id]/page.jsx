import React from 'react'
import { getMultipleResponses } from '@/services/kalitekontrol-service';
import KaliteKontrolOperations from '@/components/dashboard/kalite-kontrol-amiri/KaliteKontrolOperations';

const KaliteKontrolPage = async ({params}) => {
  if (!params.id) throw new Error("id is required" ,params.id);

  console.log('params from KaliteKontrolPage', params);

  const res = await getMultipleResponses(params.id); // This returns a Response object

  const responses = await res.json();

  console.log('order from KaliteKontrolPage', responses);

  if (!res.ok) throw new Error(responses.message || 'Failed to fetch order data');
  return (
    <>
      <KaliteKontrolOperations responses={responses} />
    </>
  )
}

export default KaliteKontrolPage