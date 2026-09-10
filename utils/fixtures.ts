import { Page, test as base } from '@playwright/test';
import {login} from '../utils/login';


 type Fixtures = {
                loggedInPage : Page
                };

                export const test = base.extend<Fixtures>({
                    loggedInPage : async ({page}, use)=> {
                        await login(page,'standard_user','secret_sauce');
                        await use(page);
                       },
                       });

    

