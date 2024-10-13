'use client';
import { Container } from 'react-bootstrap';
import React, { useState } from 'react';
import PageHeader from '@/components/common/page-header';
import Spacer from '@/components/common/spacer';
import OrderForOperation from '@/components/common/form-fields/order-for-operation';
import './kalitekontrolstage.scss';
import OperationButton from '@/components/dashboard/kalite-kontrol-amiri/operation-fields/operation-button';

const KaliteKontrolStage = ({ responses }) => {
    const { returnBody, returnBody3 } = responses;

    return (
        <>
            <Container fluid>
                <PageHeader>Kalite Kontrol amİrİ</PageHeader>
                <Spacer height={5} />
                <OrderForOperation order={returnBody} />
                <Spacer height={0} />
                <OperationButton
                    order={returnBody}
                    stage={returnBody3}
                />
            </Container>
        </>
    );
};

export default KaliteKontrolStage;
