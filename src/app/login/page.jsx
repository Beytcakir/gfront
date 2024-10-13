import PageHeader from '@/components/common/page-header';
import Spacer from '@/components/common/spacer';
import LoginForm from '@/components/login/login-form';

const LoginPage = () => {
    return (
        <>
            <PageHeader>Giriş</PageHeader>
            <Spacer height={150} />
            <LoginForm />
            <Spacer />
        </>
    );
};

export default LoginPage;
