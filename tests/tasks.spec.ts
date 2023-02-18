import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'

test('deve poder cadastrar uma nova tarefa usando dados dinâmicos', async ({ page }) => {
    const taskName = `Traduzir a música ${faker.music.songName()}`
    
    await page.goto('http://localhost:3000')

    const inputTaskName = page.locator('input[class*=InputNewTask]')
    await inputTaskName.fill(taskName)

    await inputTaskName.press('Enter')

    const target = page.locator(`css=.task-item p >> text=${taskName}`)
    await expect(target).toBeVisible()
})

test('deve poder cadastrar uma nova tarefa usando massa de dados fixa', async ({ page, request }) => {
    const taskName = 'Ler um livro de Javascript'
    await request.delete(`http://localhost:3333/helper/tasks/${taskName}`)
    
    await page.goto('http://localhost:3000')

    const inputTaskName = page.locator('input[class*=InputNewTask]')
    await inputTaskName.fill(taskName)

    await page.click('css=button >> text=Create')

    const target = page.locator(`css=.task-item p >> text=${taskName}`)
    await expect(target).toBeVisible()
})