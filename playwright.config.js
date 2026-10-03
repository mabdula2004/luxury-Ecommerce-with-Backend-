import { defineConfig, devices } from '@playwright/test'
export default defineConfig({
  testDir:'./tests', timeout:90000, retries:1,
  use:{baseURL:'http://127.0.0.1:4173',trace:'retain-on-failure',screenshot:'only-on-failure',video:'on'},
  webServer:{command:'npm run preview',url:'http://127.0.0.1:4173',reuseExistingServer:true,timeout:120000},
  projects:[{name:'desktop-chromium',use:{...devices['Desktop Chrome'],viewport:{width:1440,height:1000}}},{name:'mobile-chromium',use:{...devices['iPhone 13']}}]
})
