export const config = {
    api: {
        baseUrl: 'http://localhost:8080'
    },
    project: {
        name: 'Start School',
        slogan: 'Right Time Right Now',
        description:
            'At Start Schools, we empower individuals with the skills and knowledge they need to thrive in the dynamic world of cloud technologies. Our comprehensive bootcamps equip you with the expertise to master essential cloud platforms like AWS, Azure, and Google Cloud Platform, enabling you to confidently navigate the ever-evolving landscape of cloud computing.',
        version: '1.0.0'
    },
    userRightsOnRoutes: [
        {
            urlRegex: /\/dashboard\/talasli-imalat-amiri$/,
            roles: ['TalasliImalatAmiri']
        },
        {
            urlRegex: /\/dashboard\/polisaj-amiri$/,
            roles: ['PolisajAmiri']
        },
        {
            urlRegex: /\/dashboard\/lift-montaj-amiri$/,
            roles: ['LiftMontajAmiri']
        },
        {
            urlRegex: /\/dashboard\/bloklift-montaj-amiri$/,
            roles: ['BlMontajAmiri']
        },
        {
            urlRegex: /\/dashboard\/boyama-ve-paketleme-amiri$/,
            roles: ['BoyamaPaketlemeAmiri']
        },
        {
            urlRegex: /\/dashboard\/kalite-kontrol-amiri$/,
            roles: ['KaliteKontrol']
        },
        {
            urlRegex: /\/dashboard\/kalite-kontrol-amiri\/[0-9]+$/,
            roles: ['KaliteKontrol']
        },
        {
            urlRegex: /\/dashboard\/kalite-kontrol-amiri\/stage\/[0-9]+$/,
            roles: ['KaliteKontrol']
        },
        {
            urlRegex: /\/dashboard\/uretim-planlama$/,
            roles: ['UretimPlanlama']
        },
        {
            urlRegex: /\/dashboard\/yonetici-menu$/,
            roles: ['Yonetici']
        },
        {
            urlRegex: /\/dashboard\/password-update$/,
            roles: ['Yonetici']
        },
        {
            urlRegex: /\/dashboard\/get-orders$/,
            roles: ['Yonetici']
        },
        {
            urlRegex: /\/dashboard\/yonetici-menu\/update-password$/,
            roles: ['Yonetici']
        },
        {
            urlRegex: /\/dashboard\/uretim-planlama\/[0-9]+$/,
            roles: ['UretimPlanlama']
        },
        {
            urlRegex: /\/dashboard\/uretim\/[0-9]+$/,
            roles: ['UretimPlanlama']
        },
        {
            urlRegex: /\/dashboard\/uretim$/,
            roles: ['UretimPlanlama']
        },
        {
            urlRegex: /\/dashboard\/uretim\/new$/,
            roles: ['UretimPlanlama']
        },
        {
            urlRegex: /\/dashboard\/polisaj-amiri\/[0-9]+$/,
            roles: ['PolisajAmiri']
        },
        {
            urlRegex: /\/dashboard\/talasli-imalat-amiri\/lift\/[0-9]+$/,
            roles: ['TalasliImalatAmiri']
        }
    ]
};