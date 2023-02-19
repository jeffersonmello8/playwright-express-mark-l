import { Page, expect, Locator } from "@playwright/test";
import { TaskModel } from "../../../fixtures/task.model";


export class TasksPage {
    readonly page: Page
    readonly inputTaskName: Locator

    constructor(page: Page) {
        this.page = page
        this.inputTaskName = page.locator('input[class*=InputNewTask]')
    }

    async go() {
        await this.page.goto('http://localhost:3000')
    }

    async putTaskName(task: TaskModel){
        const inputTaskName = this.inputTaskName
        await inputTaskName.fill(task.name)

        return inputTaskName
    }

    async createPressingButton(task: TaskModel) {
        await this.putTaskName(task)

        await this.page.click('css=button >> text=Create')
    }

    async createSubmitingForm(task: TaskModel) {
        const inputTaskName = await this.putTaskName(task)
        
        await inputTaskName.press('Enter')
    }

    async shouldHaveText(taskName: string) {
        const target = this.page.locator(`css=.task-item p >> text=${taskName}`)
        await expect(target).toBeVisible()
    }

    async alertHaveText(text: string) {
        const target = this.page.locator('.swal2-html-container')
        await expect(target).toHaveText(text)
    }
}