import { expect, test } from '@playwright/test'
import { faker } from '@faker-js/faker'

import { TasksPage } from './support/pages/tasks/'
import { deleteTaskByHelper, postTask } from './support/helpers'

import { TaskModel } from './fixtures/task.model'
import dataTest from './fixtures/tasks.json'

test('deve poder cadastrar uma nova tarefa usando dados dinâmicos', async ({ page }) => {
    const task = dataTest.success as TaskModel
    task.name = `Traduzir a música ${faker.music.songName()}`

    const tasksPage: TasksPage = new TasksPage(page)

    await tasksPage.go()
    await tasksPage.createSubmitingForm(task)
    await tasksPage.shouldHaveText(task.name)
})

test('deve poder cadastrar uma nova tarefa usando massa de dados fixa', async ({ page, request }) => {
    const task = dataTest.success as TaskModel
    
    deleteTaskByHelper(request, task.name)

    const tasksPage: TasksPage = new TasksPage(page)

    await tasksPage.go()
    await tasksPage.createPressingButton(task)
    await tasksPage.shouldHaveText(task.name)
})

test('não deve permitir cadastro de tarefa duplicada', async ({ page, request }) => {

    const task = dataTest.duplicate as TaskModel

    deleteTaskByHelper(request, task.name)

    postTask(request, task)

    const tasksPage: TasksPage = new TasksPage(page)

    await tasksPage.go()
    await tasksPage.createPressingButton(task)
    await tasksPage.alertHaveText('Task already exists!')
})

test('campo nome é obrigatório', async ({ page }) => {
    const task = dataTest.required as TaskModel

    const tasksPage: TasksPage = new TasksPage(page)

    await tasksPage.go()
    await tasksPage.createPressingButton(task)

    // converte o elemento para um objeto HTML para ter acesso a mensagem de validação que o browser exibe
    const validationMessage = await tasksPage.inputTaskName.evaluate(e => (e as HTMLInputElement).validationMessage)
    
    expect(validationMessage).toEqual('This is a required field')
})