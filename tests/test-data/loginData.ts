export const loginData = [
    {
        username: 'standard_user',
        password: process.env.TEST_PASSWORD!,
        expectedResult: 'success'
    },
    {
        username: 'locked_out_user',
        password: process.env.TEST_PASSWORD!,
         expectedResult: 'locked'
    }
];