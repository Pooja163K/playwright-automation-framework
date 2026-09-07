import { test, expect } from '@playwright/test';

test('GET test', async ({ request }) => {

    const response = await request.get(
        'https://jsonplaceholder.typicode.com/posts/1'
    );

    const body = await response.json();
    expect (response.status()).toBe(200);
    //console.log(body);
    expect (body.id).toBe(1);
    expect (body.userId).toBe(1);
    expect (body.title).toBeTruthy();
});

 test ('post test',async ({request})=>{
   const response = await request.post('https://jsonplaceholder.typicode.com/posts',
          {
            data: {
                title: 'Playwright API Test',
                body: 'Learning API testing with Playwright',
                userId: 1
                  }
          });

const body = await response.json();
//console.log(body);
expect (response.status()).toBe(201);
    expect (body.userId).toBe(1);
    expect (body.title).toBeTruthy();
});

test('patch test', async({request})=>{
    const response = await request.patch('https://jsonplaceholder.typicode.com/posts/1',
                     {
                        data:{
                            title:'Pooja patched this title'
                        }
                     }
    );

    const body = await response.json();
    console.log(body);
    expect (response.status()).toBe(200);
        expect (body.userId).toBe(1);
     expect (body.title).toBe('Pooja patched this title');
})