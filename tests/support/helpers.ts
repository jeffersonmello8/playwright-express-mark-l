import { APIRequestContext, expect } from "@playwright/test";
import { TaskModel } from "../fixtures/task.model";

require('dotenv').config()

const BASE_API = process.env.BASE_API

export async function deleteTaskByHelper(request: APIRequestContext, taskName: string) {
    var resp = await request.delete(`${BASE_API}/helper/tasks/${taskName}`)
    expect(resp.ok()).toBeTruthy()
}

export async function postTask(request: APIRequestContext, task: TaskModel) {
    var resp = await request.post(`${BASE_API}/tasks/`, { data: task })
    expect(resp.ok()).toBeTruthy()
}