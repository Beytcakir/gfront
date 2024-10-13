'use client';

import PageHeader from '@/components/common/page-header'
import Spacer from '@/components/common/spacer';
import React from 'react'
import Container from 'react-bootstrap/Container'
import OrderForOperation from '@/components/common/form-fields/order-for-operation';
import OperationButton from '@/components/dashboard/polisaj-amiri/operation-fields/OperationButton';

const PolisajProduction = ({ order }) => {

    const { returnBody, returnBody2, returnBody3 } = order
    console.log('returnBody', returnBody2)

  return (
      <Container fluid>
          <PageHeader>Polisaj Amiri </PageHeader>
          <Spacer height={5} />
          <OrderForOperation order={returnBody} />
          <Spacer height={5} />
          <OperationButton
              order={returnBody}
              operation={returnBody2}
              productionProcess={returnBody3}
          />

      </Container>
  );
}

export default PolisajProduction;