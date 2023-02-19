import { expect, test } from '@playwright/test'
import { faker } from '@faker-js/faker'

import { TasksPage } from './support/pages/tasks/'
import { deleteTaskByHelper, postTask } from './support/helpers'

import { TaskModel } from './fixtures/task.model'

test('deve poder cadastrar uma nova tarefa usando dados dinâmicos', async ({ page }) => {

    const task: TaskModel = {
        name: `Traduzir a música ${faker.music.songName()}`,
        is_done: false
    }

    const tasksPage: TasksPage = new TasksPage(page)

    await tasksPage.go()
    await tasksPage.createSubmitingForm(task)
    await tasksPage.shouldHaveText(task.name)
})

test('deve poder cadastrar uma nova tarefa usando massa de dados fixa', async ({ page, request }) => {

    const task: TaskModel = {
        name: 'Ler um livro de Javascript',
        is_done: false
    }

    deleteTaskByHelper(request, task.name)

    const tasksPage: TasksPage = new TasksPage(page)

    await tasksPage.go()
    await tasksPage.createPressingButton(task)
    await tasksPage.shouldHaveText(task.name)
})

test('não deve permitir cadastro de tarefa duplicada', async ({ page, request }) => {

    const task: TaskModel = {
        name: 'Comprar pão carioquinha',
        is_done: false
    }

    deleteTaskByHelper(request, task.name)

    postTask(request, task)

    const tasksPage: TasksPage = new TasksPage(page)

    await tasksPage.go()
    await tasksPage.createPressingButton(task)
    await tasksPage.alertHaveText('Task already exists!')
})

test.only('campo nome é obrigatório', async ({ page }) => {
    const task: TaskModel = {
        name: '',
        is_done: false
    }

    const tasksPage: TasksPage = new TasksPage(page)

    await tasksPage.go()
    await tasksPage.createPressingButton(task)

    // converte o elemento para um objeto HTML para ter acesso a mensagem de validação que o browser exibe
    const validationMessage = await tasksPage.inputTaskName.evaluate(e => (e as HTMLInputElement).validationMessage)
    
    expect(validationMessage).toEqual('This is a required field')
})