import { expect, test } from '@playwright/test'
import { faker } from '@faker-js/faker'

import { TasksPage } from './support/pages/tasks/'
import { deleteTaskByHelper, postTask } from './support/helpers'

import { TaskModel } from './fixtures/task.model'
import dataTest from './fixtures/tasks.json'

let tasksPage: TasksPage

test.beforeEach(({ page }) => {
    tasksPage = new TasksPage(page)
})

test.describe('testes de cadastro', () => {
    test('deve poder cadastrar uma nova tarefa usando dados dinâmicos e submetendo dados', async () => {
        const task = dataTest.success as TaskModel
        task.name = `Traduzir a música ${faker.music.songName()}`

        await tasksPage.go()
        await tasksPage.createSubmitingForm(task)

        await tasksPage.shouldHaveText(task.name)
    })

    test('deve poder cadastrar uma nova tarefa usando massa de dados fixa e clicando no botão', async ({ request }) => {
        const task = dataTest.success as TaskModel

        deleteTaskByHelper(request, task.name)

        await tasksPage.go()
        await tasksPage.createPressingButton(task)

        await tasksPage.shouldHaveText(task.name)
    })

    test('não deve permitir cadastro de tarefa duplicada', async ({ request }) => {
        const task = dataTest.duplicate as TaskModel

        deleteTaskByHelper(request, task.name)
        postTask(request, task)

        await tasksPage.go()
        await tasksPage.createPressingButton(task)

        await tasksPage.alertHaveText('Task already exists!')
    })

    test('campo nome é obrigatório', async () => {
        const task = dataTest.required as TaskModel

        await tasksPage.go()
        await tasksPage.createPressingButton(task)

        // converte o elemento para um objeto HTML para ter acesso a mensagem de validação que o browser exibe
        const validationMessage = await tasksPage.inputTaskName.evaluate(e => (e as HTMLInputElement).validationMessage)

        expect(validationMessage).toEqual('This is a required field')
    })
})

test.describe('testes de atualização', () => {
    test('deve concluir uma tarefa', async ({ request }) => {
        const task = dataTest.update as TaskModel

        await deleteTaskByHelper(request, task.name)
        await postTask(request, task)

        await tasksPage.go()
        await tasksPage.toogle(task.name)

        await tasksPage.shouldBeDone(task.name)
    })
})

test.describe('exclusão de tarefas', () => {
    test('deve excluir uma tarefa', async ({ request }) => {
        const task = dataTest.delete as TaskModel

        await deleteTaskByHelper(request, task.name)
        await postTask(request, task)

        await tasksPage.go()
        await tasksPage.remove(task.name)

        await tasksPage.shouldNotExists(task.name)
    })
})