import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'

import { taskModel } from './fixtures/task.model'

test('deve poder cadastrar uma nova tarefa usando dados dinâmicos', async ({ page }) => {

    const task: taskModel = {
        name: `Traduzir a música ${faker.music.songName()}`,
        is_done: false
    }

    await page.goto('http://localhost:3000')

    const inputTaskName = page.locator('input[class*=InputNewTask]')
    await inputTaskName.fill(task.name)

    await inputTaskName.press('Enter')

    const target = page.locator(`css=.task-item p >> text=${task.name}`)
    await expect(target).toBeVisible()
})

test('deve poder cadastrar uma nova tarefa usando massa de dados fixa', async ({ page, request }) => {

    const task: taskModel = {
        name: 'Ler um livro de Javascript',
        is_done: false
    }

    await request.delete(`http://localhost:3333/helper/tasks/${task.name}`)

    await page.goto('http://localhost:3000')

    const inputTaskName = page.locator('input[class*=InputNewTask]')
    await inputTaskName.fill(task.name)

    await page.click('css=button >> text=Create')

    const target = page.locator(`css=.task-item p >> text=${task.name}`)
    await expect(target).toBeVisible()
})

test('não deve permitir cadastro de tarefa duplicada', async ({ page, request }) => {

    const task: taskModel = {
        name: 'Comprar pão carioquinha',
        is_done: false
    }

    var resp = await request.delete(`http://localhost:3333/helper/tasks/${task.name}`)
    expect(resp.ok()).toBeTruthy()

    var resp = await request.post('http://localhost:3333/tasks/', { data: task })
    expect(resp.ok()).toBeTruthy()

    await page.goto('http://localhost:3000')

    const inputTaskName = page.locator('input[class*=InputNewTask]')
    await inputTaskName.fill(task.name)

    await page.click('css=button >> text=Create')

    const target = page.locator('.swal2-html-container')
    await expect(target).toHaveText('Task already exists!')
})