import fs from 'node:fs'
import { test, expect } from '@playwright/test'

test('premium storefront core journey', async ({ page }, testInfo) => {
  fs.mkdirSync('artifacts',{recursive:true})
  await page.goto('/')
  await expect(page.getByText('Quiet forms.')).toBeVisible()
  await page.screenshot({path:`artifacts/${testInfo.project.name}-home.png`,fullPage:true})
  await page.getByRole('link',{name:/Explore the collection/i}).click()
  await expect(page.getByText(/Objects of/)).toBeVisible()
  await page.getByPlaceholder('Search the collection').fill('Arc')
  await expect(page.getByText('Arc Leather Bag')).toBeVisible()
  await page.getByText('Arc Leather Bag').first().click()
  await expect(page.getByRole('button',{name:/Add to bag/i})).toBeVisible()
  await page.screenshot({path:`artifacts/${testInfo.project.name}-product.png`,fullPage:true})
})

test('showcase walkthrough', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium','single showcase recording')
  await page.goto('/'); await page.waitForTimeout(3500)
  await page.evaluate(()=>window.scrollTo({top:document.body.scrollHeight*.28,behavior:'smooth'})); await page.waitForTimeout(3500)
  await page.evaluate(()=>window.scrollTo({top:document.body.scrollHeight*.63,behavior:'smooth'})); await page.waitForTimeout(3500)
  await page.goto('/shop'); await page.waitForTimeout(3000)
  await page.getByPlaceholder('Search the collection').fill('Arc'); await page.waitForTimeout(2500)
  await page.getByText('Arc Leather Bag').first().click(); await page.waitForTimeout(3500)
  await page.getByRole('button',{name:'Espresso'}).click(); await page.getByRole('button',{name:'One Size'}).click(); await page.waitForTimeout(2500)
  await page.goto('/account'); await page.waitForTimeout(3500)
  await page.goto('/wishlist'); await page.waitForTimeout(2500)
  await page.goto('/'); await page.waitForTimeout(2500)
})
