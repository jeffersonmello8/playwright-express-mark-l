import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'

import { deleteTaskByHelper, postTask } from './support/helpers'

import { TaskModel } from './fixtures/task.model'

test('deve poder cadastrar uma nova tarefa usando dados dinâmicos', async ({ page }) => {

    const task: TaskModel = {
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

    const task: TaskModel = {
        name: 'Ler um livro de Javascript',
        is_done: false
    }

    deleteTaskByHelper(request, task.name)

    await page.goto('http://localhost:3000')

    const inputTaskName = page.locator('input[class*=InputNewTask]')
    await inputTaskName.fill(task.name)

    await page.click('css=button >> text=Create')

    const target = page.locator(`css=.task-item p >> text=${task.name}`)
    await expect(target).toBeVisible()
})

test('não deve permitir cadastro de tarefa duplicada', async ({ page, request }) => {

    const task: TaskModel = {
        name: 'Comprar pão carioquinha',
        is_done: false
    }

    deleteTaskByHelper(request, task.name)
    
    postTask(request, task)

    await page.goto('http://localhost:3000')

    const inputTaskName = page.locator('input[class*=InputNewTask]')
    await inputTaskName.fill(task.name)

    await page.click('css=button >> text=Create')

    const target = page.locator('.swal2-html-container')
    await expect(target).toHaveText('Task already exists!')
})